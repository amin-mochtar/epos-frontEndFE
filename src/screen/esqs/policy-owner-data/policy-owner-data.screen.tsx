import { Text, View, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { EposRoutes } from '../../../navigation';
import {
  GenderList,
  SmokerList,
  currencyList,
  maritalStatusList,
  paymentFreqList,
  tExpenses,
  typeCust,
  calculateAge,
  TRegisteredCustomer,
  TObjectKeyString,
  ICustomerStorage,
  ISQSDetail,
  TObjectSQSByKey,
  TObjectSummaryByKey,
  TPolicyType,
  TClientPhoneCode,
  TClientJob,
  IAddressCustom,
  deepCompare,
  phoneCodeSettings,
  ValidationForm,
  productType,
  ISummaryProposal,
  ISPAJData,
  maxAgetDateBirth,
} from '../../../utilities';
import { EposFooter, EposHeader, OptionCard, SectionTitle, HeaderTitle, TOptionalCardData } from '../../../components';
import { useForm, Controller, SubmitHandler, RegisterOptions, useWatch, DefaultValues, Validate } from 'react-hook-form';
import { defaultTFormDataClient } from './policy-owner-data.type';
import { validateObject, validateThousand, VALIDATION } from './validation/validation';
import { useTranslation } from 'react-i18next';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  DropdownField,
  InputField,
  plaiStyles,
  onChangeNumber,
  sanitizedText,
  ModalInformation,
  InputDate,
  TCommonConstantData,
  ICustomerExistingStorage,
  OCCUPATION_FULL_DATA,
  SALARY_RANGE_DATA,
  onChangeNameFormating,
  useCommonDataRealm,
  TextDecoration,
  REGION_PHONE_CODE,
  GlobalPromptModal
} from 'plai_common_frontend';
import { ConversionClientSelection } from './components/policy-owner-data.conversion.component';
import {
  useEposRealm,
  useObject,
} from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState, updateEposState, updateSqs } from '../../../redux';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { TSelectionData } from './components/selection.type';
import { findIsSelfAssured, findPolicyType, generateClientId, generateProductValue, getDefaultValuesFromRedux, isValidRegistered, registeredDataTransformer, getPaymentFrequencyList } from './policy-owner-data.function';
import { DEFAULT_CLIENT_JOB, MESSAGE_USD } from './policy-owner-data.data';
import usePolicyOwnerData from './hooks/usePolicyOwnerData';
import { useAfterInteraction } from '../../../hooks';

export const PolicyOwnerDataScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { getCustomerPureData } = useCommonDataRealm()
  const params = route.params as { sqsState: string; isSyncEpos: boolean } | undefined;
  const { sqsData, selectedSQSId, proposalId, isDoksul, ProspectDetail, isDoksulCTA, spajId } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const authState = useSelector((state: { auth: { agentCode: string } }) => {
    return state.auth;
  });
  const {
    initEpos,
    onUpdateSQS,
    updateSQSByKey,
    updateSummaryByKey,
    onUpdateProspectDetailLead,
    onUpdateCustomer,
    getCustomerAllStorage,
    getCustomerStorageById,
    onUpdateCustomerByKey,
    getSummaryProposalById,
    getSPAJById
  } = useEposRealm();
  const { generateSqsAndSummaryProposal, generateLeadData, generateExistingData } = usePolicyOwnerData()
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const [visibleAlert, setVisibleAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [customerData, setCustomerData] = useState<TSelectionData>({
    registered: [],
    draft: [],
  });
  const [disableStateField, setDisableStateField] = useState<boolean>(false);
  const [visibleModalCustomer, setVisibleModalCustomer] = useState<boolean>(false);
  const [clientIdState, setClientIdState] = useState<string | undefined>('');
  const [registeredState, setRegisteredState] = useState<boolean>(false);
  const [visibleSyncDesc, setVisibleSyncDesc] = useState<boolean>(false);

  const isSelf = useMemo(
    () => findIsSelfAssured({
      selectedSQSId,
      realmSqsLifeAssuredSelf: RSQSData?.lifeAssuredSelf,
      sqsLifeAssuredSelf: sqsData?.lifeAssuredSelf,
      isDoksul: isDoksul,
    }),
    [RSQSData, sqsData],
  );

  const policyType = useMemo(
    () => findPolicyType({
      selectedSQSId,
      realmSqsPolicyType: RSQSData?.policyType,
      sqsPolicyType: sqsData?.policyType
    }),
    [RSQSData, sqsData]
  );

  const { paymentFreqList } = useMemo(() => {
    const insuranceGoal = RSQSData?.insuranceGoal || sqsData.insuranceGoal;
    const paymentFreqList = getPaymentFrequencyList(insuranceGoal);

    return { paymentFreqList };
  }, []);

  const descriptionTitle = useMemo(() => {
    if (isSelf) {
      const translateResult = policyType == 'sharia' ? t('Epos:primary_Insured_candidate') : t('Epos:main_insured_candidate');
      return `(${translateResult})`;
    }
    return undefined;
  }, [isSelf, policyType])

  /** Initial Data Not Change */
  const { product, rider, mainrider, topUprider, defaultEmptyProduct } = useMemo(() => {
    return {
      product: RSQSData?.product,
      rider: RSQSData?.additionalBenefits,
      mainrider: RSQSData?.mainAdditionalBenefits,
      topUprider: RSQSData?.topupAdditionalBenefits,
      defaultEmptyProduct: 'Berdasarkan anggaran atau tujuan asuransi Anda, kami tidak memiliki rekomendasi produk. Silakan sesuaikan anggaran atau tujuan asuransi yang Anda masukkan.'
    };
  }, [RSQSData]);

  const defaultValues = useMemo(() => {
    let result = { ...sqsData.lifeAssuredData };
    if (RSQSData != null && RSQSData.clientIdSelected.length != 0) {
      const _customerData = getCustomerStorageById(RSQSData.clientIdSelected[0]);
      // @ts-ignore
      result = _customerData?.toJSON();
    } else {
      result = getDefaultValuesFromRedux(result, ProspectDetail)
    }
    return result as DefaultValues<TRegisteredCustomer>;;
  }, [RSQSData, ProspectDetail])

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    reset,
    clearErrors
  } = useForm<TRegisteredCustomer>({
    defaultValues,
  });

  const clientType = getValues('clientType');
  const clientTypeInfo = useWatch({ control, name: 'clientType' });
  const clientCurrency = watch("clientCurrency")
  const oldCustomer = clientType?.key === 'O';


  // start doksul config  CTA (change PH)
  const summaryProposalById = getSummaryProposalById(proposalId) as ISummaryProposal;
  const productCode = summaryProposalById?.productCode;
  const isUnitLink = productType(productCode) == 'UL';


  const getPolicyHolderDataSPAJ = useMemo(() => {
    if (spajId && isDoksulCTA) {
      const RSPAJData = getSPAJById(spajId) as ISPAJData;
      const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : ''; // get policy holder name from esub data
      const _handphone = policyHolderData?.clientResidencePhoneCells[0] // get policy holder phone from esub data

      return {
        clientName: policyHolderData?.clientName,
        phoneCode: _handphone?.clientResidencePhoneCellCode,
        phoneNumber: _handphone?.clientResidencePhoneCell
      }
    }
  }, [spajId, isDoksulCTA])

  const showClientSyncModal = useCallback(() => {
    if (!params?.sqsState) {
      if (!params?.isSyncEpos) {
        GlobalPromptModal.show({
          title: 'Informasi',
          subtitle: 'Pastikan Anda melakukan Sync Client untuk Nasabah Terdaftar sebelum membuat Proposal atau Pengajuan Konversi.',
          buttonPrimary: {
            text: 'Tutup',
            onPress: () => {
              GlobalPromptModal?.close()
            },
          }
        })
      }
    };
  }, [])

  const comparePolicyHolderName = () => {
    const handphoneOld = getPolicyHolderDataSPAJ?.phoneCode?.dial_code + getPolicyHolderDataSPAJ?.phoneNumber
    const handphoneNew = watch('clientPhoneCode.dial_code') + watch('clientPhone')

    return getPolicyHolderDataSPAJ?.clientName !== watch('clientName') && handphoneOld !== handphoneNew;

  }
  // end dok



  useAfterInteraction({
    onCompleted: showClientSyncModal
  })

  useEffect(() => {
    if (isValidRegistered(RSQSData?.clientIdSelected[0]!)) {
      setRegisteredState(true);
      setDisableStateField(true);
    }
    if (!clientType?.key) setValue('clientType', { label: 'Nasabah Baru', key: 'N' });

    setValue('clientCurrency', {
      label: getValues('clientCurrency').label || 'IDR',
      key: getValues('clientCurrency').key || 'IDR',
    });

    // start doksul config  CTA (change PH)
    if (spajId && isDoksulCTA) {
      setValue('clientPhoneCode', getPolicyHolderDataSPAJ?.phoneCode);
      setValue('clientPhone', getPolicyHolderDataSPAJ?.phoneNumber);
    }
    // end doksul config  CTA (change PH)


    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {


    /** This is condition for epos sync from client existing (Policy Frontend) */
    if (params?.isSyncEpos && oldCustomer) {
      if (clientType?.key == 'O') {
        getClientData();
      }
      /** ini wajib di bolak balik state nya karena Component Conversion pake Memo, harus di trigger re-render */
      setVisibleModalCustomer(false);
      setTimeout(() => setVisibleModalCustomer(true), 300)
    }
  }, [params])

  useEffect(() => {
    if (clientType?.key == 'O') getClientData();
  }, [clientTypeInfo]);

  const transformHandler = (item: ICustomerStorage) => {
    setValue('clientType', { label: 'Nasabah Terdaftar', key: 'O' });
    setValue('clientCurrency', { label: 'IDR', key: 'IDR' });

    for (const key in item) {
      if (!['clientType', 'clientCurrency'].includes(key)) {
        const value = item[key as keyof ICustomerStorage];
        setValue(key as keyof TRegisteredCustomer, value || '');
      }
    }
  };

  const handlerTransformDataCustomer = () => {
    const registeredCustomerValues = getValues('registeredCustomer');
    const isValid = isValidRegistered(registeredCustomerValues?.clientId ?? '');
    const customerExistDB = getCustomerStorageById(registeredCustomerValues?.clientId ?? '');
    if (isValid) {
      const dataRegistered = customerExistDB ? customerExistDB : registeredDataTransformer(registeredCustomerValues);
      setClientIdState(registeredCustomerValues?.clientId);
      setRegisteredState(true);
      transformHandler(dataRegistered as any);
      setDisableStateField(true);
    } else {
      // buat draft masih ongoing
      setClientIdState(undefined);
      setRegisteredState(false);
      transformHandler(registeredCustomerValues as any);
      setDisableStateField(false);
    }
  };

  const onBack = useCallback(() => {
    // if choose other than png/pngs product direct to policy submission type
    const checkDataSQS = RSQSData ? RSQSData : sqsData;
    const isProductPNG = checkDataSQS?.insuranceGoal.some((item) => item === 'investasi');
    const _route = params?.sqsState
      ? EposRoutes.QUICK_QUOTE
      : isProductPNG
        ? EposRoutes.INVESTMENT_RISK_PROFILE
        : EposRoutes.POLICY_SUBMISSION_TYPE;
    if (selectedSQSId && !params?.sqsState && isProductPNG) {
      const clientId: string[] | undefined = clientIdState ? [clientIdState!] : undefined;
      onSave([], false, '', EposRoutes.INVESTMENT_RISK_PROFILE, clientId);
    } else {
      dispatch(
        updateSqs({
          key: 'lifeAssuredData',
          payload: getValues(),
        }),
      );
    }
    navigation.dispatch(StackActions.replace(_route));
    return true;
  }, [RSQSData, sqsData, selectedSQSId, params?.sqsState, clientIdState]);

  const onSave = useCallback(async (
    productRecommendation?: string[],
    changeProduct?: boolean,
    clientIdSelected?: string,
    nextRoute?: string,
    clientId?: string[],
  ) => {
    const _product = changeProduct ? { key: '', label: '' } : product;
    const updateByKeyData: TObjectSQSByKey[] = [
      {
        key: 'productRecommendation',
        value: productRecommendation?.join()
      }, {
        key: 'additionalBenefits',
        value: changeProduct ? [] : rider
      }, {
        key: 'mainAdditionalBenefits',
        value: changeProduct ? [] : mainrider
      }, {
        key: 'topupAdditionalBenefits',
        value: changeProduct ? [] : topUprider
      }, {
        key: 'clientIdSelected',
        value: isDoksul && !isDoksulCTA ? [clientIdSelected] : clientId
      },
    ];
    if (RSQSData?.product?.key != _product?.key) {
      updateByKeyData.push({
        key: 'product',
        value: _product
      });
    }
    updateSQSByKey(RSQSData?.sqsId ?? '', updateByKeyData);
    const updateByKeySummary: TObjectSummaryByKey[] = [
      {
        key: 'lastState',
        value: nextRoute || EposRoutes.PRODUCT_RECOMMENDATION,
      },
      {
        key: 'policyHolderName',
        value: getValues('clientName')
      },
      {
        key: 'policyHolderDob',
        value: getValues('clientDateBirth')
      }
    ]
    if (RSQSData?.lifeAssuredSelf == 'self') {
      updateByKeySummary.push({
        key: 'lifeAssuredName',
        value: getValues('clientName')
      },
        {
          key: 'lifeAssuredDob',
          value: getValues('clientDateBirth')
        })
    }
    updateSummaryByKey(proposalId, updateByKeySummary);
  }, [rider, mainrider, topUprider, product, RSQSData, proposalId, isDoksul]);

  const quickQuoteNavigationByParamsSqs = (currentRoutes: EposRoutes) => {
    let newRoutes = currentRoutes;
    if (params?.sqsState) {
      newRoutes = EposRoutes.QUICK_QUOTE;
      if (!isSelf) newRoutes = EposRoutes.MAIN_INSURED_DATA;
    }

    return newRoutes;
  }
  // handle submit
  const onContinue: SubmitHandler<TRegisteredCustomer> = async (dataForm) => {
    let params = route.params;
    const { registeredCustomer, ...dataFormObj } = dataForm;
    // buat default Data biar ga error, karena emang UI nya belum ada.
    dataFormObj.clientNationality = '';
    dataFormObj.clientEmail = '';
    dataFormObj.clientAddress = {};

    const dataFormSlicing = JSON.parse(JSON.stringify(dataFormObj));
    const { clientId, clientIdCustomer } = generateClientId(oldCustomer, registeredState, clientIdState, RSQSData?.clientIdSelected[0] || '')
    const { selectedProduct, errorMessage } = await generateProductValue(sqsData, dataForm, RSQSData);

    if (selectedProduct.length != 0) {
      let _nextRoute = isSelf ? EposRoutes.PRODUCT_RECOMMENDATION : EposRoutes.MAIN_INSURED_DATA;
      const productRecommendation = selectedProduct.join();
      const _lifeAssuredData: ICustomerStorage = {
        ...dataFormSlicing,
        clientId,
        clientAnb: calculateAge(dataFormSlicing.clientDateBirth, true),
      } as ICustomerStorage;
      /** Check if new proposal or not | check jira for detail*/
      if (selectedSQSId && (!isDoksul || isDoksulCTA) && RSQSData) {
        const { mergeData, _clientId, changeProduct } = await generateExistingData({
          RSQSData,
          clientIdCustomer,
          isDoksul,
          lifeAssuredData: _lifeAssuredData,
          selectedProduct
        });

        // Comparing Data for NextNavigation Need
        const _customerData = RSQSData?.clientIdSelected[0] ? getCustomerStorageById(RSQSData.clientIdSelected[0])?.toJSON() : null;
        const newLifeAssuredData = JSON.parse(JSON.stringify(_lifeAssuredData));
        const newCustomerData = _customerData ? JSON.parse(JSON.stringify(_customerData)) : [];
        if (newCustomerData) newCustomerData.clientAddress = {};
        delete newLifeAssuredData.clientId;
        delete newCustomerData.clientId;

        newCustomerData.clientNationality = newCustomerData.clientNationality ?? '';
        newCustomerData.clientEmail = newCustomerData.clientEmail ?? '';

        const isDifference = deepCompare(newLifeAssuredData, newCustomerData);

        if (isDifference) {
          params = {
            ...params,
            isChanged: true,
          };
        } else {
          _nextRoute = quickQuoteNavigationByParamsSqs(_nextRoute);
        }

        await onUpdateCustomer(mergeData);
        await onSave(selectedProduct, changeProduct, _lifeAssuredData.clientId, _nextRoute, _clientId);

      } else {
        let { _sqsDetail, _summaryProposal } = await generateSqsAndSummaryProposal({
          productRecommendation,
          agentCode: authState?.agentCode,
          dataForm,
          leadId: ProspectDetail?.leadId,
          lifeAssuredData: _lifeAssuredData,
          nextRoute: _nextRoute,
          policyType: policyType as TPolicyType,
          proposalId,
          sqsData,

        })

        // start doksul config  CTA (change PH)
        // udpdate field isChangePH if doksul CTA, field name & phone updated & product UL
        if (isDoksulCTA && comparePolicyHolderName() && isUnitLink) {
          _sqsDetail = {
            ..._sqsDetail,
            isChangePH: comparePolicyHolderName()
          }
        }
        // end doksul config  CTA (change PH)


        await initEpos(_sqsDetail, _summaryProposal);
        await onUpdateCustomerByKey(_lifeAssuredData.clientId, _lifeAssuredData);
        dispatch(
          updateEposState({
            proposalId: _summaryProposal.proposalId,
            selectedSQSId: _summaryProposal.selectedSQSId,
            allSQSId: _summaryProposal.allSQSId.split(','),
            leadId: ProspectDetail?.leadId,
          }),
        );
      }
      setVisibleAlert(false);
      const prospectLeadData = await generateLeadData({ dataForm, leadId: ProspectDetail?.leadId });
      await onUpdateProspectDetailLead(prospectLeadData);
      navigation.dispatch(StackActions.replace(_nextRoute, params));
    } else {
      setVisibleAlert(true);
      setErrorMessage(dataForm.clientCurrency.key == 'USD' ? MESSAGE_USD : (errorMessage || defaultEmptyProduct));
    }
  };

  // Validation for Min Age 18 or 21 if Marriage
  const onValidateAge = (dateOfBirth: string) => {
    const _marriageStatus = getValues('clientMarriageStatus');
    const _age = calculateAge(dateOfBirth);
    // case for age < 18
    if (_age < 18) {
      return 'Minimum usia pemegang polis adalah 21 atau 18 (Jika sudah menikah)';
    }

    // case for age 18
    if (_age === 18) {
      if (_marriageStatus?.key === 'S') {
        return 'Minimum usia pemegang polis adalah 21 atau 18 (Jika sudah menikah)';
      }
      return true; // No warning for 'M' or 'W'
    }

    // case for age 19-20
    if (_age >= 19 && _age < 21) {
      if (_marriageStatus?.key === 'S') {
        return 'Minimum usia pemegang polis adalah 21 atau 18 (Jika sudah menikah)';
      }
      return true; // No warning for 'M' or 'W'
    }

    // case for age 21 and above
    if (_age >= 21) {
      return true; // No warning regardless of marriage status
    }
  };

  const onValidateFormSelf = useCallback(
    (_data: TCommonConstantData | string) => {
      if (!isSelf) return true;
      const isValid =
        typeof _data === "object"
          ? Boolean(_data?.key || _data?.code)
          : Boolean(_data);
      return isValid || t('Epos:required');
    },
    [isSelf],
  );

  const onRegisteredValidate = useCallback(
    (_data: any) => {
      if (!isSelf) return true;
      const isValid = typeof _data === "object" && _data.clientCode ? true : false;
      return isValid || t('Epos:required');
    },
    [isSelf],
  );

  const getClientData = async () => {
    try {
      const customerDataRealm: any = await getCustomerAllStorage();
      const customerExisting: any = (await getCustomerPureData())?.customerExisting;
      const customerSyncData = customerExisting?.data ? JSON.parse(customerExisting.data) : [];
      const customerDataMap: any = customerSyncData.map((customer: any) => {
        return {
          ...customer,
          clientId: customer?.clientCode,
          clientName: customer?.surname?.en || '' + customer?.firstName?.en || '',
        };
      });

      const customerDataRealmMap = customerDataRealm.filter((item: ICustomerStorage) => {
        if (!isValidRegistered(item.clientId)) {
          return item;
        }
      });

      setCustomerData({
        draft: customerDataRealmMap,
        registered: customerDataMap,
      });
    } catch (err) {
      // TODO CATCH ERROR
    }
  };

  // Function tambahan untuk memastikan modal ga keluar kalo cuman ClientType Nasabah Terdaftar
  const onChangeHandlerModal = useCallback((value: TOptionalCardData) => {
    if (value.key === 'O') {
      setVisibleModalCustomer(true);
    }
    if (value.key === 'N') {
      reset(defaultTFormDataClient);
      setClientIdState('');
      setRegisteredState(false);
      setVisibleModalCustomer(false);
      setValue('clientType', { label: 'Nasabah Baru', key: 'N' });
    }
  }, [defaultTFormDataClient]);

  const onCloseModalListClient = useCallback(() => {
    if (isValidRegistered((RSQSData?.clientIdSelected[0] ?? '') || (clientIdState ?? ''))) {
      setValue('clientType', { label: 'Nasabah Terdaftar', key: 'O' });
    } else setValue('clientType', { label: 'Nasabah Baru', key: 'N' });
  }, [RSQSData?.clientIdSelected, clientIdState]);

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
            <HeaderTitle
              tagTitle={true}
              title={t('Epos:prospective_policyholder_data')}
              titleStyle={plaiStyles.fontHeaderTitle}
              descriptionStyle={plaiStyles.fontHeaderTitle}
              descriptionTitle={descriptionTitle}
            />
            <Text style={[plaiStyles.mt8, plaiStyles.font14, plaiStyles.fontHeaderSubTitle]}>Data Pribadi Anda akan digunakan untuk pengajuan SPAJ dan keperluan pelayanan setelah Polis terbit.</Text>
            <SectionTitle text={t('Epos:personal_information')} />
            <Controller
              name={VALIDATION.clientType.name}
              defaultValue={t('Epos:new_customer')}
              control={control}
              rules={VALIDATION.clientType.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                    {t('Epos:customer_type')}
                    <Text style={plaiStyles.fontRed}> *</Text>
                  </Text>
                  <OptionCard
                    data={typeCust}
                    theme="border"
                    selected={value as TOptionalCardData}
                    onSelected={(item) => {
                      onChange(item);
                      onChangeHandlerModal(item);
                    }}
                    uniqueTestId='client-type'
                  />
                </>
              )}
            />

            {oldCustomer && visibleModalCustomer && (
              <Controller
                name={'registeredCustomer'}
                control={control}
                rules={{
                  validate: onRegisteredValidate as Validate<
                    string | TCommonConstantData | TClientPhoneCode | TClientJob | IAddressCustom | undefined,
                    TRegisteredCustomer
                  >
                }}
                render={({ field: { onChange, value } }) => (
                  <ConversionClientSelection
                    labelMap={{
                      title: 'Pilih Nasabah Terdaftar',
                      placeholder: 'Pilih Nasabah Terdaftar',
                    }}
                    keyMap={{
                      value: 'clientId',
                      label: 'clientName',
                      subLabel: 'clientId',
                      search: 'clientName',
                    }}
                    search={{
                      isOnChangeSearch: true,
                    }}
                    data={customerData}
                    selected={value}
                    onSelected={onChange}
                    required={oldCustomer}
                    lastPage={EposRoutes.POLICY_OWNER_DATA}
                    onPressClose={onCloseModalListClient}
                    handlerTransformDataCustomer={handlerTransformDataCustomer}
                    onDisabled={true}
                    id='conversion-client-selection'
                  />
                )}
              />
            )}

            <Controller
              name={'clientName'}
              control={control}
              rules={VALIDATION.clientName.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:Customer_Name')}
                  placeholder={t('Epos:enter_customer_name')}
                  value={value}
                  setValue={(item) => onChange(onChangeNameFormating(item))}
                  error={errors.clientName}
                  disabled={oldCustomer && disableStateField}
                  // onDisabled={true}
                  maxLength={60}
                  id='input-client-name'
                />
              )}
            />

            <Controller
              name={'clientDateBirth'}
              control={control}
              rules={
                {
                  ...VALIDATION.clientDateBirth.rule,
                  ...{
                    validate: onValidateAge,
                  },
                } as RegisterOptions
              }
              render={({ field: { onChange, value } }) => (
                <InputDate
                  formatDate="YYYY-MM-DD"
                  maxDate={`${new Date().getFullYear()}-12-31`}
                  label={t('Epos:date_of_birth')}
                  placeholder={t('Epos:select_date_of_birth')}
                  value={value}
                  setValue={(dobVal: string) => {
                    onChange(dobVal);
                  }}
                  minDate={maxAgetDateBirth(isSelf ? 75 : 99, isSelf)}
                  error={errors.clientDateBirth}
                  disabled={oldCustomer && disableStateField}
                  id='inputdate-client-dob'
                />
              )}
            />

            {isDoksul && (
              <View>
                <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                  <TextDecoration label={t('Epos:phone_number')} />
                  <Text style={plaiStyles.fontRed}> *</Text>
                </Text>
                <View style={[plaiStyles.flex, plaiStyles.row]}>
                  <Controller
                    name={`clientPhoneCode`}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DropdownField
                          containerStyle={[plaiStyles.mt0, { width: 75 }]}
                          data={REGION_PHONE_CODE}
                          labelMap={phoneCodeSettings.title}
                          keyMap={phoneCodeSettings.keyMap}
                          selected={value}
                          search={{
                            isOnChangeSearch: true,
                          }}
                          onSelected={onChange}
                          id={`client-phone-code`}
                        />
                      );
                    }}
                  />

                  <Controller
                    name={'clientPhone'}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        maxLength={13}
                        containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                        placeholder={t('Epos:enter_phone_number')}
                        value={value}
                        setValue={(item) => onChange(sanitizedText(item))}
                        keyboardType="phone-pad"
                        id={`input-phone-number`}
                      />
                    )}
                  />
                </View>
                {errors?.clientPhone && (
                  <Text style={[plaiStyles.mt8, plaiStyles.fontRed, plaiStyles.font12]}>
                    {errors?.clientPhone?.message}
                  </Text>
                )}
              </View>

            )}

            <Controller
              name={VALIDATION.clientGender.name}
              control={control}
              rules={VALIDATION.clientGender.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                    {t('Epos:gender')}
                    <Text style={plaiStyles.fontRed}> *</Text>
                  </Text>
                  <OptionCard
                    data={GenderList}
                    theme="border"
                    style={[plaiStyles.row]}
                    spaceItem={8}
                    insideStyle={[plaiStyles.flex]}
                    selected={value as TOptionalCardData}
                    onSelected={onChange}
                    error={errors.clientGender}
                    onDisabled={() => oldCustomer && disableStateField}
                    uniqueTestId='client-gender'
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.clientMarriageStatus.name}
              control={control}
              rules={VALIDATION.clientMarriageStatus.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: t('Epos:marital_status'),
                    placeholder: t('Epos:select_marital_status'),
                  }}
                  data={maritalStatusList}
                  selected={value as TObjectKeyString}
                  onSelected={(value) => onChange(value)}
                  error={errors.clientMarriageStatus}
                  onDisabled={oldCustomer && disableStateField}
                  id='dropdown-client-marital-status'
                />
              )}
            />
            {isSelf && (
              <Controller
                name={VALIDATION.clientSmokeStatus.name}
                control={control}
                rules={{ validate: onValidateFormSelf as Validate<string | TCommonConstantData | TClientPhoneCode | TClientJob | IAddressCustom | undefined, TRegisteredCustomer> }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                      {t('Epos:smoking_status')}
                      <Text style={plaiStyles.fontRed}> *</Text>
                    </Text>
                    <OptionCard
                      data={SmokerList}
                      theme="border"
                      style={[plaiStyles.row]}
                      insideStyle={[plaiStyles.flex]}
                      spaceItem={8}
                      selected={value as TOptionalCardData}
                      onSelected={onChange}
                      error={errors.clientSmokeStatus}
                      onDisabled={() => oldCustomer && disableStateField}
                      uniqueTestId='smoking-status'
                    />
                  </>
                )}
              />
            )}

            <Controller
              name={VALIDATION.clientDependents.name}
              control={control}
              rules={VALIDATION.clientDependents.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:number_of_dependents')}
                  placeholder={t('Epos:enter_number_of_dependents')}
                  keyboardType="numeric"
                  value={value as string}
                  setValue={(value) => onChange(sanitizedText(value, true))}
                  error={errors.clientDependents}
                  maxLength={3}
                  id='input-client-dependents'
                />
              )}
            />
            {isSelf && (
              <>
                <SectionTitle text={t('Epos:job_information')} />
                <Controller
                  name={VALIDATION.clientJob.name}
                  control={control}
                  rules={ValidationForm({ validate: onValidateFormSelf })}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:job_type'),
                        placeholder: t('Epos:select_job_type'),
                        group: 'Kelas',
                      }}
                      keyMap={{
                        value: 'code',
                        label: t('Epos:job_type') == 'Job Type' ? 'nameEng' : 'nameInd',
                        group: 'clazz',
                        search: t('Epos:job_type') == 'Job Type' ? 'nameEng' : 'nameInd',
                      }}
                      search={{
                        isOnChangeSearch: true,
                      }}
                      data={OCCUPATION_FULL_DATA}
                      selected={value as TObjectKeyString}
                      onSelected={onChange}
                      error={errors.clientJob}
                      id='dropdown-client-job'
                    />
                  )}
                />
              </>
            )}

            <SectionTitle text={t('Epos:income_information')} />

            <Controller
              name={VALIDATION.clientIncome.name}
              control={control}
              rules={VALIDATION.clientIncome.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: t('Epos:total_income_per_month'),
                    placeholder: t('Epos:select_total_income'),
                  }}
                  keyMap={{
                    search: 'label',
                  }}
                  data={SALARY_RANGE_DATA}
                  selected={value as TObjectKeyString}
                  onSelected={onChange}
                  error={errors.clientIncome}
                  id='dropdown-client-income'
                />
              )}
            />

            <Controller
              name={VALIDATION.clientExpenses.name}
              control={control}
              rules={VALIDATION.clientExpenses.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: t('Epos:percentage_of_total_expenditure'),
                    placeholder: t('Epos:select_percentage'),
                  }}
                  data={tExpenses}
                  selected={value as TObjectKeyString}
                  onSelected={onChange}
                  error={errors.clientExpenses}
                  id='dropdown-client-expenses'
                />
              )}
            />

            <SectionTitle text={t('Epos:budget_for_policy_premiums')} />

            <Controller
              name={VALIDATION.clientPayment.name}
              control={control}
              rules={VALIDATION.clientPayment.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                    {t('Epos:frequency_of_payment')}
                    <Text style={plaiStyles.fontRed}> *</Text>
                  </Text>
                  <OptionCard
                    data={paymentFreqList}
                    theme="border"
                    selected={value as TOptionalCardData}
                    onSelected={onChange}
                    error={errors.clientPayment}
                    uniqueTestId='frequency-of-payment'
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.clientCurrency.name}
              control={control}
              rules={VALIDATION.clientCurrency.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                    {t('Epos:currency')}
                    <Text style={plaiStyles.fontRed}> *</Text>
                  </Text>
                  <OptionCard
                    data={currencyList}
                    theme="border"
                    style={[plaiStyles.row]}
                    insideStyle={[plaiStyles.flex]}
                    spaceItem={8}
                    selected={value as TOptionalCardData}
                    onSelected={onChange}
                    error={errors.clientCurrency}
                    uniqueTestId='client-currency'
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.clientBudget.name}
              control={control}
              rules={clientCurrency?.key === 'USD' ? VALIDATION.clientBudgetUSD.rule : VALIDATION.clientBudget.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:budget')}
                  placeholder={t('Epos:enter_budget')}
                  keyboardType="phone-pad"
                  value={value as string}
                  setValue={(value: any) => {
                    if (value?.key === 'USD') {
                      onChange(sanitizedText(value));
                    } else {
                      onChangeNumber(value, onChange);
                    }
                  }}
                  error={errors.clientBudget}
                  id='input-client-budget'
                />
              )}
            />
          </ScrollView>
        </View>

        <EposFooter
          position={6}
          leftButton={{
            text: params?.sqsState ? 'Batalkan' : undefined,
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: handleSubmit(onContinue),
          }}
        />

        <ModalInformation
          visible={visibleAlert}
          desc={errorMessage}
          title="Tidak Ada Produk Rekomendasi"
          buttonPrimary={{
            text: 'Tutup',
            onPress: () => setVisibleAlert(false),
          }}
        />
      </>
    </PruScreen>
  );
};
