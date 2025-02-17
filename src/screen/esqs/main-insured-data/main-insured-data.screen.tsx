import { Text, View, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { EposRoutes } from '../../../navigation';
import { GenderList, SmokerList, typeCust, ICustomerStorage, ISQSDetail, getProduct } from '../../../utilities';
import { EposFooter, EposHeader, OptionCard, SectionTitle, HeaderTitle, TOptionalCardData } from '../../../components';
import { useForm, Controller, SubmitHandler, useWatch, DefaultValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  DropdownField,
  InputField,
  plaiStyles,
  InputDate,
  useCommonDataRealm,
  OCCUPATION_FULL_DATA,
  onChangeNameFormating,
  ModalInformation
} from 'plai_common_frontend';
import { useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
// @ts-ignore
import { RootState } from 'redux/reducer';
import { EposState, SQS_STATE } from '../../../redux';
import { TFormDataClientTU, TMainInsured, defaultTFormDataClientTU } from './main-insured-data.type';
import { VALIDATION } from './validation';
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { calculateAge, deepCompare, maxAgetDateBirth } from '../../../utilities/common-function';
import { ConversionClientSelection } from '../policy-owner-data/components/policy-owner-data.conversion.component';
import { defaultTFormDataClient } from '../policy-owner-data/policy-owner-data.type';
import { findPolicyType, isValidRegistered, registeredDataTransformer } from '../policy-owner-data/policy-owner-data.function';
import { JOB_UNDER_17 } from './main-insured-data.data';
import moment from 'moment';

interface RouteParams {
  sqsState?: any;
  isChanged?: boolean;
  lifeAssuredIndex?: number;
}

type InitRouteProp = RouteProp<{ params: RouteParams }, 'params'>;

export const MainInsuredDataScreen = () => {
  const { t, i18n } = useTranslation();
  const route = useRoute<InitRouteProp>();
  const navigation = useNavigation();

  const { selectedSQSId, proposalId, sqsData, isDoksulCTA, customerStorageId } = useSelector<RootState, EposState>((state) => state.epos);
  const { updateSQSByKey, updateSummaryByKey, onUpdateCustomerByKey, getCustomerAllStorage, getCustomerStorageById, deleteCustomerById } =
    useEposRealm();
  const { getCustomerPureData } = useCommonDataRealm();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const [isUnder17, setIsUnder17] = useState(false);
  const [disableStateField, setDisableStateField] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState({
    registered: [],
    draft: [],
  });
  const [visibleModalCustomer, setVisibleModalCustomer] = useState<boolean>(false);
  const [clientIdState, setClientIdState] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [visibleAlert, setVisibleAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // primary matrix for conditioning
  const lifeAssuredIndex = route.params?.lifeAssuredIndex ?? 1;
  const [visibleSyncDesc, setVisibleSyncDesc] = useState<boolean>(false);
  const params = route.params as { sqsState: string; isSyncEpos: boolean } | undefined;

  const defaultValues = useMemo(() => {
    let result = defaultTFormDataClientTU;
    let mainInsuredId = RSQSData?.clientIdSelected[lifeAssuredIndex]
    if (RSQSData != null && mainInsuredId) {
      if (isDoksulCTA) mainInsuredId = customerStorageId[1]

      const _custometData = getCustomerStorageById(mainInsuredId);
      // @ts-ignore
      result = _custometData?.toJSON();
    }
    return result as DefaultValues<TMainInsured>;
  }, []);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<TMainInsured>({
    defaultValues,
  });

  const clientType = getValues('clientType');
  const clientTypeInfo = useWatch({ control, name: 'clientType' });
  const oldCustomer = clientType?.key === 'O';

  const JOB = useMemo(() => (isUnder17 ? JOB_UNDER_17 : OCCUPATION_FULL_DATA), [isUnder17]);

  const policyType = useMemo(
    () => findPolicyType({
      selectedSQSId,
      realmSqsPolicyType: RSQSData?.policyType,
      sqsPolicyType: sqsData?.policyType
    }),
    [RSQSData, sqsData]
  )

  useEffect(() => {
    onChangeBOD(getValues('clientDateBirth'), false);
    if (isValidRegistered(RSQSData?.clientIdSelected[1]!)) setDisableStateField(true);
    if (!clientType?.key) setValue('clientType', { label: 'Nasabah Baru', key: 'N' });

    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!params?.sqsState) {
      /** This is condition for epos sync from client existing (Policy Frontend) */
      if (params?.isSyncEpos && oldCustomer) {
        if (clientType?.key == 'O') {
          getClientData();
        }
        /** ini wajib di bolak balik state nya karena Component Conversion pake Memo, harus di trigger re-render */
        setVisibleModalCustomer(false);
        setTimeout(() => setVisibleModalCustomer(true), 300)
      } else {
        setTimeout(() => {
          setVisibleSyncDesc(true)
        }, 500);
      }
    };
  }, [params])

  useEffect(() => {
    if (clientType?.key == 'O') getClientData();

  }, [clientTypeInfo]);

  useEffect(() => {
    handleJobDescription(getValues('clientJob'));
  }, [policyType])

  const handleJobDescription = (job?: (typeof JOB)[number]) => {
    const currentLanguage = i18n.language;
    let result = currentLanguage === 'id' ? job?.descriptionInd : job?.descriptionEng;
    if (job?.code === 'NSTN' && policyType === 'sharia') result = result?.replace('Tertanggung', 'Calon Peserta Yang Diasuransikan');
    setJobDescription(result || '');
  };

  const onBack = () => {
    let backRoute = EposRoutes.POLICY_OWNER_DATA;
    if (lifeAssuredIndex != 1) {
      backRoute = EposRoutes.POLICY_HOLDER_TARGET;
    }

    onSave(backRoute);
    return true;
  };

  const onChangeBOD = (dob: string, resetJob = true) => {
    const _age = calculateAge(dob);
    setIsUnder17(_age < 17);
    if (resetJob) {
      setValue('clientJob', '');
      setJobDescription('');
    }
  };

  const isValidFormatDate = (date: string) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }


  const onSave = async (_route?: string) => {
    let clientIdCustomer = oldCustomer && clientIdState ? clientIdState : RSQSData?.clientIdSelected[1];

    if (lifeAssuredIndex != 1) {
      clientIdCustomer = oldCustomer && clientIdState ? clientIdState : RSQSData?.clientIdSelected[lifeAssuredIndex];
    }

    const { registeredCustomer, ..._dataForm } = getValues();
    const dateOfBirthValid = isValidFormatDate(_dataForm?.clientDateBirth) && _dataForm?.clientDateBirth

    // check age validation
    if (RSQSData) {
      const insuranceGoal = RSQSData.insuranceGoal || sqsData.insuranceGoal;
      const policyType = RSQSData.policyType || sqsData.policyType;
      const lifeAssuredSelf = RSQSData.lifeAssuredSelf || sqsData.lifeAssuredSelf;

      const { clientBudget, clientCurrency, clientPayment } = getCustomerStorageById(RSQSData.clientIdSelected[0])?.toJSON() ?? null as any;

      const { selectedProduct } = await getProduct(
        insuranceGoal,
        policyType,
        parseFloat(clientBudget.replace(/\./g, '')),
        lifeAssuredSelf,
        clientCurrency,
        clientPayment.key || '12',
        calculateAge(_dataForm.clientDateBirth, true),
        'LA'
      );

      if (lifeAssuredIndex == 1 && !_route && selectedProduct.length == 0) {
        setVisibleAlert(true)
        // set error message kalo butuh
        // setErrorMessage(errorMessage)
        return;
      }

      if (lifeAssuredIndex == 1) {
        const productRecommendation = RSQSData.productRecommendation?.split(',');
        const isProductUpdated = !productRecommendation?.every(
          item => selectedProduct.includes(item)
        );

        updateSQSByKey(RSQSData?.sqsId ?? '', [
          {
            key: 'productRecommendation',
            value: selectedProduct.join(','),
          },
          // reset product if recommendation updated
          {
            key: 'product',
            value: isProductUpdated ? null : RSQSData.product,
          },
        ]);
      }

    }

    let nextRoute = _route || EposRoutes.PRODUCT_RECOMMENDATION;
    let params = route.params;

    // if life assured index is not on TU state
    if (lifeAssuredIndex != 1) {
      nextRoute = _route || EposRoutes.CALCULATOR;
      params = {
        lifeAssuredIndex: lifeAssuredIndex,
      };
    }
    /** Init default data customer TU */
    const _customerTUData = {
      ...defaultTFormDataClient,
      ..._dataForm,
      clientName: _dataForm.clientName ?? defaultTFormDataClient.clientName,
      clientDateBirth: _dataForm.clientDateBirth ?? defaultTFormDataClient.clientDateBirth,
      clientId: `C${new Date().getTime()}`,
      clientAnb: calculateAge(_dataForm.clientDateBirth, true),
    } as ICustomerStorage;
    const _allCustomer = [...RSQSData?.clientIdSelected!];

    if (lifeAssuredIndex != 1) {
      _allCustomer[2] = _customerTUData.clientId;
    } else {
      _allCustomer[1] = _customerTUData.clientId;
    }

    if (RSQSData?.clientIdSelected[1]) {
      const _customerData = getCustomerStorageById(RSQSData?.clientIdSelected[1])?.toJSON();
      const shallowCopyLifeassuredData = JSON.parse(JSON.stringify(_customerTUData));
      const shallowCopyCustomerData = JSON.parse(JSON.stringify(_customerData));

      const isDifference = deepCompare(shallowCopyLifeassuredData, shallowCopyCustomerData);
      const state = {
        isChanged: route.params?.isChanged,
        onChangeQQ: route.params?.sqsState === SQS_STATE.CHANGE_QQ,
      }

      if (isDifference) {
        params = {
          ...params,
          isChanged: true
        }
      }

      if (isDifference === false && !state.isChanged && state.onChangeQQ && nextRoute != EposRoutes.POLICY_OWNER_DATA) {
        nextRoute = EposRoutes.QUICK_QUOTE;
      }
    }

    /** Check IF BOD NaN */
    if (Number.isNaN(_customerTUData.clientAnb)) _customerTUData.clientAnb = 0;
    await deleteCustomerById(_customerTUData.clientId);
    await onUpdateCustomerByKey(_customerTUData.clientId, _customerTUData);

    await updateSQSByKey(RSQSData?.sqsId || '', {
      key: 'clientIdSelected',
      value: _allCustomer,
    });
    await updateSummaryByKey(proposalId, [{ key: 'lastState', value: nextRoute }]);

    if (lifeAssuredIndex == 1) {
      updateSummaryByKey(proposalId, { key: 'lifeAssuredName', value: _dataForm.clientName });
      updateSummaryByKey(proposalId, { key: 'lifeAssuredDob', value: dateOfBirthValid });
    }
    if (params?.isSyncEpos) {
      params = {
        ...params,
        isSyncEpos: false
      }
    }
    navigation.dispatch(StackActions.replace(nextRoute, params));
  };

  const onContinue: SubmitHandler<TFormDataClientTU> = (_data) => {
    onSave();
  };

  const getClientData = async () => {
    try {
      const customerDataRealm: any = await getCustomerAllStorage();
      // const customerDataPure: any = (await getCustomerPureData()).customerExisting;
      const customerExisting: any = (await getCustomerPureData())?.customerExisting;
      const customerSyncData = customerExisting?.data ? JSON.parse(customerExisting.data) : [];

      const customerDataMap = customerSyncData.map((customer: any) => {
        return {
          ...customer,
          clientId: customer.clientCode,
          clientName: customer.surname?.en || '' + customer.firstName?.en || '',
        };
      });
      const customerDataRealmMap = customerDataRealm.filter((item: any) => {
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
  // Function tambahan untuk memastikan modal ga keluar kalo cuman ClientType Nasabah lama
  const onChangeHandlerModal = (value: TOptionalCardData) => {
    if (value.key === 'O') {
      setVisibleModalCustomer(true);
    }
    if (value.key === 'N') {
      reset(defaultTFormDataClientTU);
      setVisibleModalCustomer(false);
      setValue('clientType', { label: 'Nasabah Baru', key: 'N' });
    }
    setJobDescription('');
  };

  const transformHandler = (item: any) => {
    // Logic nya beda sama yg policy owner data karena memang datanya lebih dikit.
    const { registeredCustomer, ...formData } = getValues();

    for (const key in formData) {
      let value = item[key];
      if (typeof value === 'string') {
        try {
          // Coba untuk parse nilai sebagai objek jika nilai merupakan string yang berformat JSON
          value = JSON.parse(value);
        } catch (error) {
          // Jika gagal di-parse, biarkan nilai tetap sebagai string
        }
      }
      if (typeof value === 'number') value = String(value);

      setValue(key as keyof TFormDataClientTU, value || '');
    }
  };

  const handlerTransformDataCustomer = () => {
    const registeredCustomerValues = getValues('registeredCustomer');

    const isValid = isValidRegistered(registeredCustomerValues?.clientId);

    setClientIdState(registeredCustomerValues?.clientId);
    if (isValid) {
      const dataRegistered = registeredDataTransformer(registeredCustomerValues);
      transformHandler(dataRegistered);
      setDisableStateField(true);
      onChangeBOD(getValues('clientDateBirth'), false);
      handleJobDescription(getValues('clientJob'));
    } else {
      // buat draft masih ongoing
      transformHandler(registeredCustomerValues);
      setDisableStateField(false);
    }
  };

  const descriptionTitle = useMemo(() => {

    if (RSQSData?.policyType == 'sharia' && lifeAssuredIndex != 1) {
      return 'Data Calon Peserta Tambahan 1 Yang Diasuransikan';
    } else if (RSQSData?.policyType == 'sharia') {
      return t('Epos:primary_Insured_candidate');
    } else {
      if (!['U12', 'U13'].includes(RSQSData?.product?.key ?? '')) {
        return t('Epos:prospective_insured');
      }
      return t('Epos:main_insured_candidate');
    }
  }, [policyType]);

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <HeaderTitle tagTitle={true} title={descriptionTitle} descriptionStyle={plaiStyles.fontHeaderTitle} />

          <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
            <SectionTitle text={t('Epos:personal_information')} />
            {!(lifeAssuredIndex != 1) && (
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
                      selected={value}
                      onSelected={(item) => {
                        onChange(item);
                        onChangeHandlerModal(item);
                      }}
                      uniqueTestId="client-type"
                    />
                  </>
                )}
              />
            )}

            {clientType?.key === 'O' && visibleModalCustomer && (
              <Controller
                name={'registeredCustomer'}
                control={control}
                rules={VALIDATION.clientType.rule}
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
                    lastPage={EposRoutes.MAIN_INSURED_DATA}
                    selected={value}
                    onSelected={onChange}
                    required={clientType?.key === 'O'}
                    onPressClose={() => {
                      if (isValidRegistered(RSQSData?.clientIdSelected[0]! || clientIdState)) {
                        setValue('clientType', { label: 'Nasabah Lama', key: 'O' });
                      }
                      else setValue('clientType', { label: 'Nasabah Baru', key: 'N' });
                    }}
                    onDisabled={true}
                    handlerTransformDataCustomer={handlerTransformDataCustomer}
                    id='conversion-client-selection'
                  />
                )}
              />
            )}

            <Controller
              name={VALIDATION.clientName.name}
              control={control}
              rules={VALIDATION.clientName.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:Customer_Name')}
                  placeholder={t('Epos:enter_customer_name')}
                  value={value}
                  setValue={(item) => onChange(onChangeNameFormating(item))}
                  error={errors.clientName}
                  disabled={lifeAssuredIndex === 0 || (oldCustomer && disableStateField)}
                  maxLength={60}
                  id='input-client-name'
                />
              )}
            />

            <Controller
              name={VALIDATION.clientDateBirth.name}
              control={control}
              rules={VALIDATION.clientDateBirth.rule}
              render={({ field: { onChange, value } }) => (
                <InputDate
                  formatDate="YYYY-MM-DD"
                  maxDate={`${new Date().getFullYear()}-12-31`}
                  label={t('Epos:date_of_birth')}
                  placeholder={t('Epos:select_date_of_birth')}
                  value={value}
                  setValue={(value) => {
                    onChangeBOD(value);
                    onChange(value);
                  }}
                  minDate={maxAgetDateBirth(75)}
                  error={errors.clientDateBirth}
                  disabled={lifeAssuredIndex === 0 || (oldCustomer && disableStateField)}
                  id="inputdate-client-dob"
                />
              )}
            />
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
                    selected={value}
                    onSelected={onChange}
                    error={errors.clientGender}
                    onDisabled={() => lifeAssuredIndex === 0 || (oldCustomer && disableStateField)}
                    uniqueTestId="client-gender"
                  />
                </>
              )}
            />
            <Controller
              name={VALIDATION.clientSmokeStatus.name}
              control={control}
              rules={VALIDATION.clientSmokeStatus.rule}
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
                    selected={value}
                    onSelected={onChange}
                    error={errors.clientSmokeStatus}
                    onDisabled={() => oldCustomer && disableStateField}
                    uniqueTestId='smoking-status'
                  />
                </>
              )}
            />

            <SectionTitle text={t('Epos:job_information')} />
            <Controller
              name={VALIDATION.clientJob.name}
              control={control}
              rules={VALIDATION.clientJob.rule}
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
                  data={JOB}
                  selected={value}
                  onSelected={(newValue: any) => {
                    onChange(newValue);
                    handleJobDescription(newValue);
                  }}
                  error={errors.clientJob}
                  id="client-job"
                />
              )}
            />

            <Controller
              name={VALIDATION.clientJobDescription.name}
              control={control}
              render={() => (
                <InputField
                  label={'Deskripsi Pekerjaan'}
                  placeholder={'Tuliskan deskripsi pekerjaan'}
                  style={[plaiStyles.fontGrey33, plaiStyles.my4, plaiStyles.opacity7, plaiStyles.pb10]}
                  value={jobDescription}
                  setValue={setJobDescription}
                  multiline
                  disabled
                />
              )}
            />

          </ScrollView>
        </View>

        <ModalInformation
          visible={visibleAlert}
          desc={errorMessage}
          title="Tidak Ada Produk Rekomendasi"
          buttonPrimary={{
            text: 'Tutup',
            onPress: () => setVisibleAlert(false),
          }}
        />

        <EposFooter
          position={lifeAssuredIndex != 1 ? 9 : 7}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: handleSubmit(onContinue),
          }}
        />
      </>
    </PruScreen>
  );
};
