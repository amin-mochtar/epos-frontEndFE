import { PruColor, PruScreen } from 'common_ui_components';
import { View, Text, ScrollView, BackHandler, KeyboardTypeOptions, Linking } from 'react-native';
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  EposFooter,
  EposHeader,
  SectionTitle,
  OptionCard,
  TOptionalCardData,
  NumberTitle,
  DoksulHeader,
  InfoBar,
} from '../../../components';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  TFormDataPremiumPayor,
  defaultFormDataPremiumPayor,
} from './spaj-premium-payer-candidate.type';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { VALIDATION } from './validation/validation';
import { Trans, useTranslation } from 'react-i18next';
import {
  CheckboxGroup,
  DropdownField,
  InputField,
  plaiStyles,
  sanitizedText,
  setMultipleSelect,
  sanitizedLetterText,
  ModalInformation,
  InputDate,
  REGION_PHONE_CODE,
  PROVINCE_DATA,
  OCCUPATION_FULL_DATA,
  SALARY_RANGE_DATA,
  TCommonConstantData,
  TextDecoration,
  onChangeNameFormating,
} from 'plai_common_frontend';
import {
  GenderList,
  idcard,
  maritalStatusList,
  statement,
  netWorthList,
  relationshipPayerList,
  locationList,
  businessEntityList,
  OCCUPATION_SIMPLE,
  WR_SHARIA_CONVENT,
  phoneCodeSettings,
  validateFormatCompanyName,
  validatePhoneCell,
  defaultPhoneCode,
  TConditionMapping,
  fieldArrayHandlers,
  TPhoneCode,
  DEFAULT_OPTIONAL_DATA,
  defaultCode,
  ISPAJData,
  ISQSDetail,
  ISummaryProposal,
  listStatusResidence,
  validateObject,
} from '../../../utilities';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { ValidationForm, npwpFormatText, calculateAge, sanitizeTextLetterAndNumber, sanitizeTextWithSymbol, residenceAddressFormatText, productType, defaultClientCivics, maxAgetDateBirth } from '../../../utilities/common-function';
import { Button } from 'common_ui_components/app/components-ui';
import moment from 'moment';
import { useZipCode } from '../../../hooks';
import { NoticeBar } from './components';
import ModalAgreementProviderData from './components/modal-agreement-provider-data/modal-agreement-provider-data';

export const SPAJPremiumPayerCandidateScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu } = useEposRealm();
  const { selectedSQSId, proposalId, spajId, isDoksul } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const SummaryById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const defaultPremiumPayor = RSPAJData?.premiumPayor ? JSON.parse(RSPAJData.premiumPayor!) : '';
  const premiumPayorIncomeDataSQS = RSQSData?.premiumPayorIncomeData
    ? JSON.parse(RSQSData.premiumPayorIncomeData!)
    : null;
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData?.confirmationSQS) : '';
  const [isAgreementModalVisible, setIsAgreementModalVisible] = useState<boolean>(false);
  const [openedUrl, setOpenedUrl] = useState<string[]>([]);
  const [isDisableModalAgreementButton, setIsDisableModalAgreementButton] = useState<boolean>(true);

  const [maxPhone, setMaxPhone] = useState({
    isMaxPhone: false,
    message: ''
  });
  const checkAge = calculateAge(defaultPremiumPayor?.clientDateBirth || '');

  const [joblessModal, setJoblessModal] = useState(false)

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<TFormDataPremiumPayor>({
    defaultValues: useMemo(() => {
      let result = defaultFormDataPremiumPayor;
      if (RSPAJData && RSPAJData.premiumPayor) {
        result = defaultPremiumPayor;
      }
      return result as TFormDataPremiumPayor;
    }, []),
  });

  const { wording, isTraditional, isDisabled } = useMemo(() => {
    const policyType = isDoksul ? SummaryById?.shariaFlag : RSQSData?.policyType;
    const productKey = RSQSData?.product?.key ?? '';

    const isTraditional = productType(productKey) === 'TRD';
    const isClientIncomeDisabled = isTraditional
      ? false
      : ['U17R', 'U17D'].includes(productKey)
        ? false
        : !isDoksul;

    const isProductValid = isTraditional || ['U17R', 'U17D'].includes(productKey);
    const isSourceIncomeInputDisabled = !isProductValid && !isDoksul

    return {
      isTraditional,
      wording: WR_SHARIA_CONVENT[policyType || 'conventional'],
      isDisabled: {
        clientIncome: isClientIncomeDisabled,
        sourceIncome: isSourceIncomeInputDisabled
      },
    };
  }, [isDoksul, SummaryById, RSQSData]);


  const { onZipCodeAutoFill } = useZipCode();

  //dynamic input-phonne
  const clientCompanyPhones = fieldArrayHandlers('clientCompanyPhones', control);
  const clientResidencePhoneNumbers = fieldArrayHandlers('clientResidencePhoneNumbers', control);
  const clientResidenceHandphone = fieldArrayHandlers('clientResidencePhoneCells', control);

  const onAddPhone = (
    field: any,
    appendFunction: (data: any) => void,
    appendData: { [key: string]: { [key: string]: string; } | string; },
    message: string
  ) => {
    if (field?.length && field.length < 5) {
      appendFunction(appendData);
    } else {
      setMaxPhone({ isMaxPhone: true, message: message });
    }
  };

  // default value when first render
  useEffect(() => {
    setValue('clientCivics', defaultClientCivics());
    setValue('clientIdcardType', { label: 'KTP', key: 'idcard' });

    // if not doksul & check premium payor is other
    if (isDoksul == false && defaultPremiumPayor == '') {
      if (confirmationSQS?.premiumPaymentCandidate == 'N') {
        // if there's data on premium_payor_income screen, it will be automatically filled in.
        if (Array.isArray(premiumPayorIncomeDataSQS?.source)) {
          setValue('clientSourceIncome', premiumPayorIncomeDataSQS?.source);
          setValue('clientInvesmentSourceIncome', premiumPayorIncomeDataSQS?.investment);
          setValue('clientPersonalBusinessSourceIncome', premiumPayorIncomeDataSQS?.personalBusiness);
          setValue('clientOtherSourceIncome', premiumPayorIncomeDataSQS?.other);
        }
      }
      setValue('clientIncome', premiumPayorIncomeDataSQS?.totalIncome);
    }
    if (getValues('clientCountryBirth')?.code == '') {
      setValue('clientCountryBirth', defaultPhoneCode);
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, [isValid]);

  //custom useState for condition
  const useOptionalDataState = (
    propertyKey: string,
    defaultValue?: TCommonConstantData,
  ): [TCommonConstantData | TPhoneCode, React.Dispatch<React.SetStateAction<TCommonConstantData | TPhoneCode>>] => {
    const initialState = defaultPremiumPayor
      ? defaultPremiumPayor[propertyKey]
      : defaultValue
        ? defaultValue
        : DEFAULT_OPTIONAL_DATA;
    const [state, setState] = useState<TCommonConstantData | TPhoneCode>(initialState);
    return [state, setState];
  };
  const useArrayDataState = (
    propertyKey: string,
    defaultValue?: [],
  ): [TOptionalCardData[], React.Dispatch<React.SetStateAction<TOptionalCardData[]>>] => {
    const initialState = defaultPremiumPayor
      ? defaultPremiumPayor[propertyKey]
      : defaultValue
        ? defaultValue
        : [];
    const [state, setState] = useState<TOptionalCardData[]>(initialState);
    return [state, setState];
  };

  // Usage custom useState for condition
  const residenceStatus = watch('clientResidenceStatus');
  const relationship = watch('clientRelationshipPH');
  const massApplies = watch('clientMassApplies');
  const occupation = watch('clientJob');
  const npwpStatus = watch('clientNpwp');
  const companyLocation = watch('clientCompanyLocation');
  const residenceLocation = watch('clientResidenceLocation');
  const businessEntityLocation = watch('businessEntityLocation');
  const IdCardType = watch('clientIdcardType');
  const otherJob = watch('clientOtherJob');
  const isUsePHAddress = watch('clientIsSameAddress');
  const income = watch('clientIncome');
  const sourceIncome = watch('clientSourceIncome');

  const occupationCode = occupation?.code;
  const checkOccupation =
    typeof occupationCode === 'string' && ['UNEM', 'NSTN', 'STDN', 'RETI', 'HSWF'].includes(occupationCode);
  const keyOfRelationship = ['H', 'W', 'SD', 'M', 'F', 'o'];
  const isCheckedRelationship = typeof relationship?.key === 'string' && keyOfRelationship.includes(relationship?.key);
  const keyOfSourceIncome = ['investment', 'corporateProfits', 'other'];
  const _sourceIncome = OCCUPATION_SIMPLE.filter((item) => keyOfSourceIncome.includes(item?.key));
  const policyType = isDoksul ? SummaryById?.shariaFlag : RSQSData?.policyType;
  const watchClientDateBirth = watch('clientDateBirth');
  const clientAge = calculateAge(watchClientDateBirth);
  const watchCivic = watch('clientCivics');

  useEffect(() => {
    // fields are reset blank when there is a change in a particular field
    const conditionsMapping: TConditionMapping[] = [
      {
        condition: IdCardType?.key === 'idcard',
        fields: ['clientPassportNumber']
      },
      {
        condition: IdCardType?.key === 'other',
        fields: ['clientIdCardNumber']
      },
      {
        condition: massApplies?.key === 'Y',
        fields: ['clientMassValidUntil']
      },
      {
        condition: npwpStatus?.key === 'N',
        fields: ['ClientNpwpNumber', 'clientNpwpHolder'],
      },
      {
        condition: npwpStatus?.key === 'Y',
        fields: ['clientAsideFromNpwp'],
      },
      {
        condition: companyLocation?.key !== 'AB' || checkOccupation,
        fields: ['clientCompanyAbroad'],
        result: defaultCode
      },
      {
        condition: residenceLocation?.key !== 'AB',
        fields: ['clientResidenceAbroad'],
        result: defaultCode
      },
      {
        condition: businessEntityLocation?.key !== 'AB',
        fields: ['businessEntityAbroad'],
        result: defaultCode
      },
      {
        condition: otherJob?.key === 'N',
        fields: ['clientOtherJobDetail']
      },
      {
        condition: checkOccupation,
        fields: [
          'clientCompanyName',
          'clientCompanyLocation',
          'clientCompanyAddress',
          'clientCompanyNeighbourhood1',
          'clientCompanyNeighbourhood2',
          'clientCompanyKilometer',
          'clientCompanyPostCode',
          'clientCompanyDistrict',
          'clientCompanyUrbanVillage',
          'clientCompanyProvice',
          'clientCompanyCity',
        ],
      },
      {
        condition: checkOccupation,
        fields: ['clientCompanyPhones'],
        result: [{
          clientCompanyPhoneCode: defaultPhoneCode,
          clientCompanyPhone: '',
        }],
      },
    ];

    conditionsMapping?.forEach(({ condition, fields, result }: TConditionMapping) => {
      if (condition) {
        fields.forEach((field: any) => {
          const _field = result ? result : typeof defaultFormDataPremiumPayor[field] == 'object' ? DEFAULT_OPTIONAL_DATA : '';
          setValue(field, _field);
        });
      }
    });

    conditionsMapping;

    // except unit link product and clientIncome is noIncome
    if (!isTraditional) {
      if (income?.key == '0') {
        setValue('clientSourceIncome', [
          {
            key: 'noIncome',
            label: 'Tidak Berpenghasilan',
          },
        ]);
      }
    }
  }, [
    massApplies,
    npwpStatus,
    residenceLocation,
    businessEntityLocation,
    IdCardType,
    otherJob,
    checkOccupation,
    income,
  ]);

  const onDisableSourceIncome = useCallback((item: TCommonConstantData | undefined) => {
    const source = getValues('clientSourceIncome');
    if (!isTraditional && income?.key == '0') {
      return true;
    } else if (income?.key !== '0') {
      if (source.length && source[0].key === 'noIncome') setValue('clientSourceIncome', []);
      return item?.key === 'noIncome';
    } else {
      return false;
    }
  }, [isTraditional, income, isDoksul]);

  const onBack = () => {

    if (getValues("clientIncome")?.key === "0") {
      setJoblessModal(true)
      return
    }

    if (spajId) {
      onSave(getValues());
    }

    if (RSPAJData?.premiumPayor) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE, {
          key: 'status',
          value: false,
        });
      }
    }

    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    }
    return true;
  };

  const handleIsUseSameAddressSave = (formData: any) => {
    const RSPAJPolicyHolder = RSPAJData?.policyHolderData && JSON.parse(RSPAJData?.policyHolderData);
    const addressInformationSPAJPH = {
      clientResidenceAdress: RSPAJPolicyHolder.clientResidenceAdress,
      clientResidenceNeighbourdhood1: RSPAJPolicyHolder.clientResidenceNeighbourdhood1,
      clientResidenceNeighbourdhood2: RSPAJPolicyHolder.clientResidenceNeighbourdhood2,
      clientResideceKilometer: RSPAJPolicyHolder.clientResideceKilometer,
      clientResidencePostCode: RSPAJPolicyHolder.clientResidencePostCode,
      clientResidenceDistrict: RSPAJPolicyHolder.clientResidenceDistrict,
      clientResidenceUrbanVillage: RSPAJPolicyHolder.clientResidenceUrbanVillage,
      clientResidenceProvince: RSPAJPolicyHolder.clientResidenceProvince,
      clientResidenceCity: RSPAJPolicyHolder.clientResidenceCity,
    };

    const newFormData = { ...formData, ...addressInformationSPAJPH };
    return newFormData;
  };

  const onSave = (data: TFormDataPremiumPayor) => {
    let newData = data;
    if (isUsePHAddress?.key === 'Y') {
      newData = handleIsUseSameAddressSave(newData);
    }
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'premiumPayor',
      value: JSON.stringify(newData)
    });

    updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE,
    });
  };

  const onContinue: SubmitHandler<TFormDataPremiumPayor> = async (data) => {

    if (getValues("clientIncome").key === "0") {
      setJoblessModal(true)
      return
    }
    await onSave(data);

    if (isDoksul) {
      await updateSummaryByKey(proposalId, {
        key: 'statusProposal',
        value: 'Submitted',
      });
      await updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_SIGNATURE, { isDoksulPayor: true }));
    } else {
      await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE, {
        key: 'status',
        value: true,
      });
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_TOPUP));
    }
  };

  const onChangeRelationShip = (item: TCommonConstantData, onChange: (item: TCommonConstantData) => void) => {
    onChange(item);
    if (isDoksul) {
      reset({
        ...defaultFormDataPremiumPayor,
        clientRelationshipPH: item
      });
    }
  };

  const onChangeIdCardType = (item: TOptionalCardData, onChange: (item: TOptionalCardData) => void) => {
    onChange(item);
  };

  const optionCardType = useMemo(() => {
    if (watchCivic?.code !== 'ID') {
      return idcard?.filter((item) => item.key === 'other');
    }
    if (clientAge < 17) {
      return idcard?.filter((item) => item.key === 'KA');
    }
    return idcard?.filter((item) => item.key === 'idcard');
  }, [watchCivic, idcard, clientAge]);

  const iddCardNumberConfig = useMemo(() => {
    const isPassport = IdCardType?.key === "other";
    return ({
      maxLength: clientAge < 17 || isPassport ? 35 : 16,
      minLength: clientAge < 17 || isPassport ? 6 : 16,
      keyBoardType: clientAge < 17 || isPassport ? 'default' : 'phone-pad'
    });
  }, [IdCardType, clientAge]);

  const onChangeIdCardNumber = useCallback((item: string, onChange: (item: string) => void) => {
    if (clientAge < 17 || IdCardType?.key === "other") {
      onChange(sanitizeTextLetterAndNumber(item));
    } else {
      onChange(sanitizedText(item, true));
    }
  }, [clientAge, IdCardType]);

  const onChangeclientIsSameAddress = (value: TCommonConstantData, onChange: (value: TCommonConstantData) => void) => {
    onChange(value);

    if (value.key === 'N') {
      setValue('clientResidenceLocation', { key: "", title: "" })
      setValue('clientResidenceAbroad', { code: "", dial_code: "", emoji: "", name: "" })
      setValue('clientResidenceAdress', '')
      setValue('clientResidenceNeighbourdhood1', '')
      setValue('clientResidenceNeighbourdhood2', '')
      setValue('clientResideceKilometer', '')
      setValue('clientResidencePostCode', '')
      setValue('clientResidenceDistrict', '')
      setValue('clientResidenceUrbanVillage', '')
      setValue('clientResidenceProvince', { key: "", label: "" })
      setValue('clientResidenceCity', '')
    }
  };

  const validateIdCard = (value: string) => {
    if (checkAge < 17) {
      if (!value || value?.length < 6) {
        return 'KIA/AKTA minimal 6 digit';
      }
    } else {
      if (!value || value?.length < 16) {
        return 'KTP harus 16 digit';
      }
    }
  };

  const onOpenedLinkModalAgreement = useCallback(async (url: string, index: number) => {
    try {
      await Linking.openURL(url);
      const newUrls = openedUrl;
      if (!openedUrl.includes(url)) newUrls.push(url);
      setOpenedUrl([...newUrls]);
    } catch (error) {

    }
  }, []);

  useEffect(() => {
    if (openedUrl.length >= 1) {
      setIsDisableModalAgreementButton(false);
    }
  }, [openedUrl])

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          {isDoksul ? (
            <DoksulHeader title={`Calon Pembayar ${wording.premiContribution}`} onPress={onBack} />
          ) : (
            <>
              <EposHeader onPressSpajCompleteness={onBack} />
              <NumberTitle
                number="3"
                text={`1/1 ${t('Epos:premium_payer', { premiContribution: wording.premiContribution })}`}
              />
              <Text style={plaiStyles.fontHeaderTitle}>{wording.payor}</Text>
              <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
                {t('Epos:enter_premium_payer_data', { premiContribution: wording.premiContribution })}
              </Text>
            </>
          )}

          <ScrollView>
            <SectionTitle text={t('Epos:relationship')} />

            <Controller
              name={VALIDATION.clientRelationshipPH.name}
              control={control}
              rules={VALIDATION.clientRelationshipPH.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <DropdownField
                    labelMap={{
                      title: t('Epos:relationship_between_prospective_premium_payers', {
                        premiContribution: wording.premiContribution,
                      }),
                      placeholder: 'Pilih Hubungan',
                    }}
                    keyMap={{
                      search: 'label',
                    }}
                    data={relationshipPayerList?.filter((item) => (!isDoksul ? item.key != 'B' : item))}
                    selected={value}
                    onSelected={(item) => {
                      onChangeRelationShip(item, onChange);
                    }}
                    error={errors?.clientRelationshipPH}
                    id="dropdown-relationship-ph"
                  />
                </>
              )}
            />

            {isCheckedRelationship && (
              <>
                <SectionTitle text={t('Epos:personal_information')} />

                <Controller
                  name={VALIDATION.clientName.name}
                  control={control}
                  rules={VALIDATION.clientName.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:fullname')}
                      placeholder={t('Epos:enter_customer_name')}
                      maxLength={60}
                      value={value}
                      setValue={(value) => onChange(onChangeNameFormating(value))}
                      error={errors.clientName}
                      id="input-client-name"
                      rightItem=''
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientGender.name}
                  control={control}
                  rules={VALIDATION.clientGender.rule}
                  render={({ field: { onChange, value } }) => (
                    <OptionCard
                      label={t('Epos:gender')}
                      theme="border"
                      style={[plaiStyles.flex, plaiStyles.row]}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                      data={GenderList}
                      selected={value}
                      onSelected={onChange}
                      error={errors.clientGender}
                      uniqueTestId='client-gender'
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
                      label={t('Epos:date_of_birth')}
                      placeholder={t('Epos:select_date')}
                      value={value}
                      setValue={onChange}
                      maxDate={`${new Date().getFullYear()}-12-31`}
                      minDate={maxAgetDateBirth(70)}
                      error={errors.clientDateBirth}
                      id='inputdate-client-dob'
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCountryBirth.name}
                  control={control}
                  rules={VALIDATION.clientCountryBirth.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:country_birth'),
                        placeholder: t('Epos:select_country'),
                      }}
                      keyMap={{
                        label: 'name',
                        search: 'name',
                        value: 'code',
                      }}
                      data={REGION_PHONE_CODE}
                      selected={value}
                      onSelected={onChange}
                      error={errors.clientCountryBirth}
                      id='dropdown-client-country-birth'
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCityBirth.name}
                  control={control}
                  rules={VALIDATION.clientCityBirth.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:city_birth')}
                      placeholder={'Masukkan Kota/Kabupaten Kelahiran'}
                      maxLength={20}
                      value={value}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientCityBirth}
                      rightItem=''
                      id="input-client-city-birth"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCivics.name}
                  control={control}
                  rules={VALIDATION.clientCivics.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:civics'),
                        placeholder: t('Epos:select_civics'),
                      }}
                      keyMap={{
                        label: 'name',
                        search: 'name',
                        value: 'code',
                      }}
                      data={REGION_PHONE_CODE}
                      selected={value}
                      onSelected={onChange}
                      error={errors.clientCivics}
                      id="dropdown-client-civics"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientMaritalStatus.name}
                  control={control}
                  rules={VALIDATION.clientMaritalStatus.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:marital_status'),
                        placeholder: t('Epos:select_marital_status'),
                      }}
                      data={maritalStatusList}
                      selected={value}
                      onSelected={onChange}
                      error={errors.clientMaritalStatus}
                      id="dropdown-client-marital-status"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientMotherVirginName.name}
                  control={control}
                  rules={VALIDATION.clientMotherVirginName.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:mother_virgin_name')}
                      placeholder={t('Epos:enter_mother_virgin_name')}
                      maxLength={60}
                      value={value}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      onBlur={() => {
                        onChange(typeof value === "string" ? value.toUpperCase() : "");
                      }}
                      error={errors.clientMotherVirginName}
                      id="input-client-mother-virgin-name"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientEmail.name}
                  control={control}
                  rules={VALIDATION.clientEmail.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:email')}
                      placeholder={t('Epos:enter_email')}
                      maxLength={40}
                      value={value}
                      setValue={onChange}
                      error={errors.clientEmail}
                      additionalInfo={
                        <TextDecoration
                          label={wording.email_disclaimer.premi}
                          additionalStyle={{ italic: [plaiStyles.fontBold] }}
                        />}
                      id="input-client-email"
                    />
                  )}
                />

                <SectionTitle text={t('Epos:idcard_info')} />
                <Controller
                  name={VALIDATION.clientIdcardType.name}
                  control={control}
                  rules={VALIDATION.clientIdcardType.rule}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <OptionCard
                        label={t('Epos:idcard_type')}
                        required={true}
                        style={[plaiStyles.flex, plaiStyles.row]}
                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                        theme="border"
                        data={optionCardType}
                        selected={value}
                        onSelected={(value) => {
                          onChangeIdCardType(value as TOptionalCardData, onChange);
                        }}
                        error={errors?.clientIdcardType}
                        uniqueTestId='idcard-type'
                      />
                    </>
                  )}
                />

                {IdCardType?.key === 'other' ? (
                  <Controller
                    name={VALIDATION.clientPassportNumber.name}
                    control={control}
                    rules={VALIDATION.clientPassportNumber.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:passport_number')}
                        placeholder={t('Epos:enter_passport_number')}
                        maxLength={20}
                        value={value}
                        setValue={(value) => onChange(sanitizedText(value))}
                        error={errors.clientPassportNumber}
                        keyboardType="phone-pad"
                        id="input-client-passport-number"
                      />
                    )}
                  />
                ) : (
                  <>
                    <Controller
                      name={VALIDATION.clientIdCardNumber.name}
                      control={control}
                      rules={{ validate: validateIdCard }}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:idcard_number')}
                          placeholder={t('Epos:enter_number')}
                          value={value}
                          maxLength={iddCardNumberConfig.maxLength}
                          setValue={(value) => onChangeIdCardNumber(value, onChange)}
                          error={errors.clientIdCardNumber}
                          keyboardType={iddCardNumberConfig.keyBoardType as KeyboardTypeOptions}
                          additionalInfo={!errors.clientIdCardNumber?.message ? `Pastikan No. Kartu Identitas Diri Anda sesuai dengan ${IdCardType.key === 'idcard' ? 'KTP' : 'KIA'}` : ''}
                          id="input-client-idcard-number"
                        />
                      )}
                    />
                  </>
                )}

                <Controller
                  name={VALIDATION.clientMassApplies.name}
                  control={control}
                  rules={VALIDATION.clientMassApplies.rule}
                  render={({ field: { onChange, value } }) => (
                    <OptionCard
                      label={t('Epos:lifetime_validity_period')}
                      required={true}
                      style={[plaiStyles.flex, plaiStyles.row]}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                      theme="border"
                      data={statement}
                      selected={value}
                      onSelected={(value: TOptionalCardData) => {
                        onChange(value);
                      }}
                      error={errors?.clientMassApplies}
                      uniqueTestId='lifetime-validity-period'
                    />
                  )}
                />

                {massApplies?.key === 'N' && (
                  <Controller
                    name={VALIDATION.clientMassValidUntil.name}
                    control={control}
                    rules={VALIDATION.clientMassValidUntil.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputDate
                        formatDate="YYYY-MM-DD"
                        label={t('Epos:mass_valid_until')}
                        placeholder={t('Epos:select_date')}
                        value={value}
                        setValue={onChange}
                        minDate={`${new Date()}`}
                        error={errors.clientMassValidUntil}
                        id="inputdate-client-mass-valid-until"
                      />
                    )}
                  />
                )}

                <SectionTitle text={t('Epos:tax_information')} />

                <Controller
                  name={VALIDATION.clientNpwp.name}
                  control={control}
                  rules={VALIDATION.clientNpwp.rule}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <OptionCard
                        required={true}
                        label="NPWP"
                        style={[plaiStyles.flex, plaiStyles.row]}
                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                        theme="border"
                        data={statement}
                        selected={value}
                        onSelected={(value) => {
                          onChange(value);
                        }}
                        error={errors?.clientNpwp}
                        uniqueTestId="client-npwp"
                      />
                    </>
                  )}
                />

                {npwpStatus?.key === 'Y' && (
                  <Controller
                    name={VALIDATION.ClientNpwpNumber.name}
                    control={control}
                    rules={VALIDATION.ClientNpwpNumber.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:npwp_number')}
                        placeholder={t('Epos:enter_no_npwp')}
                        maxLength={24}
                        value={value}
                        setValue={(value) => onChange(npwpFormatText(value))}
                        error={errors.ClientNpwpNumber}
                        keyboardType="phone-pad"
                        id={`input-client-npwp-number`}
                      />
                    )}
                  />
                )}

                <SectionTitle text={t('Epos:job_information')} />
                <Controller
                  name={VALIDATION.clientJob.name}
                  control={control}
                  rules={VALIDATION.clientJob.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: 'Pekerjaan',
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
                      selected={value}
                      onSelected={(value) => {
                        onChange(value);
                      }}
                      error={errors.clientJob}
                      id="dropwdown-client-job"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyName.name}
                  control={control}
                  rules={ValidationForm({ isRequired: !checkOccupation, validate: validateFormatCompanyName })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:company_name')}
                      placeholder={t('Epos:enter_company_name')}
                      value={value}
                      setValue={onChange}
                      maxLength={60}
                      error={errors.clientCompanyName}
                      additionalInfo={errors.clientCompanyName?.message ? '' : t('Epos:company_name_info')}
                      disabled={checkOccupation}
                      required={!checkOccupation}
                      id="input-client-company-name"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyLocation.name}
                  control={control}
                  rules={ValidationForm({ validate: !checkOccupation ? validateObject : () => { } })}
                  render={({ field: { onChange, value } }) => (
                    <OptionCard
                      required={!checkOccupation}
                      label={'Alamat Kantor'}
                      style={[plaiStyles.flex, plaiStyles.row]}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                      theme="border"
                      data={locationList}
                      onDisabled={() => checkOccupation}
                      selected={value}
                      onSelected={(value) => {
                        onChange(value);
                      }}
                      error={errors?.clientCompanyLocation}
                      uniqueTestId='client-company-location'
                    />
                  )}
                />

                {companyLocation?.key === 'AB' && (
                  <Controller
                    name={VALIDATION.clientCompanyAbroad.name}
                    control={control}
                    rules={VALIDATION.clientCompanyAbroad.rule}
                    render={({ field: { onChange, value } }) => (
                      <DropdownField
                        labelMap={{
                          title: t('Epos:select_abroad_location'),
                          placeholder: t('Epos:select_abroad_location'),
                        }}
                        keyMap={{
                          label: 'name',
                          search: 'name',
                          value: 'code',
                        }}
                        data={REGION_PHONE_CODE}
                        selected={value}
                        onSelected={onChange}
                        onDisabled={checkOccupation}
                        error={errors.clientCompanyAbroad}
                        id="dropdown-abroad-location"
                      />
                    )}
                  />
                )}

                <Controller
                  name={VALIDATION.clientCompanyAddress.name}
                  control={control}
                  rules={ValidationForm({ isRequired: !checkOccupation })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'Alamat'}
                      placeholder={t('Epos:enter_address')}
                      maxLength={44}
                      value={value}
                      setValue={(value) => onChange(residenceAddressFormatText(value))}
                      error={errors.clientCompanyAddress}
                      additionalInfo={t('Epos:company_address_info')}
                      rightItem={'counter'}
                      editable={!checkOccupation}
                      required={!checkOccupation}
                      id="input-client-company-address"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyNeighbourhood1.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={t('Epos:neighbourdhood1')}
                      placeholder={t('Epos:enter_neighbourdhood1')}
                      disabled={checkOccupation}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id="input-client-company-neighbourhood1"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyNeighbourhood2.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={t('Epos:neighbourdhood2')}
                      placeholder={t('Epos:enter_neighbourdhood2')}
                      disabled={checkOccupation}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id="input-client-company-neighbourhood2"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyKilometer.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={'KM'}
                      placeholder={t('Epos:enter_km')}
                      disabled={checkOccupation}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id="input-client-company-kilometer"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyPostCode.name}
                  control={control}
                  rules={ValidationForm({
                    isRequired: !checkOccupation,
                    maxLength: 5,
                  })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:post_code')}
                      placeholder={t('Epos:enter_post_code')}
                      disabled={checkOccupation}
                      maxLength={5}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value))}
                      onBlur={() => {
                        onZipCodeAutoFill(setValue, ['clientCompanyDistrict', 'clientCompanyProvice', 'clientCompanyCity'], value);
                      }}
                      error={errors.clientCompanyPostCode}
                      keyboardType="phone-pad"
                      required={!checkOccupation}
                      id="input-client-company-postcode"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyDistrict.name}
                  control={control}
                  rules={ValidationForm({ isRequired: !checkOccupation })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:district')}
                      placeholder={t('Epos:enter_district')}
                      disabled={checkOccupation}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientCompanyDistrict}
                      required={!checkOccupation}
                      id="input-client-company-district"
                      maxLength={40}
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyUrbanVillage.name}
                  control={control}
                  rules={ValidationForm({ isRequired: !checkOccupation })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:urban_village')}
                      placeholder={t('Epos:enter_urban_village')}
                      disabled={checkOccupation}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientCompanyUrbanVillage}
                      required={!checkOccupation}
                      id="input-client-company-urban-village"
                      maxLength={40}
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyProvice.name}
                  control={control}
                  rules={ValidationForm({ isRequired: !checkOccupation })}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:provice'),
                        placeholder: t('Epos:select_provice'),
                      }}
                      keyMap={{
                        search: 'label',
                      }}
                      search={{
                        isOnChangeSearch: true,
                      }}
                      data={PROVINCE_DATA}
                      onDisabled={checkOccupation}
                      selected={value}
                      onSelected={onChange}
                      error={errors.clientCompanyProvice}
                      required={!checkOccupation}
                      id="dropdown-client-company-province"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientCompanyCity.name}
                  control={control}
                  rules={ValidationForm({ isRequired: !checkOccupation })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'Kota'}
                      placeholder={t('Epos:enter_city')}
                      disabled={checkOccupation}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientCompanyCity}
                      required={!checkOccupation}
                      id="input-client-company-city"
                      maxLength={40}
                    />
                  )}
                />

                {clientCompanyPhones?.fields?.map((field: any, index: number) => {
                  return (
                    <React.Fragment key={field.id}>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                        {t('Epos:office_phone_number')}
                      </Text>
                      <View style={[plaiStyles.flex, plaiStyles.row]}>
                        <Controller
                          name={`clientCompanyPhones.${index}.clientCompanyPhoneCode`}
                          control={control}
                          render={({ field: { onChange, value: companyPhoneCode } }) => {
                            return (
                              <DropdownField
                                containerStyle={[plaiStyles.mt0, { width: 75 }]}
                                data={REGION_PHONE_CODE}
                                labelMap={phoneCodeSettings.title}
                                keyMap={phoneCodeSettings.keyMap}
                                selected={companyPhoneCode}
                                search={{
                                  isOnChangeSearch: true,
                                }}
                                onSelected={onChange}
                                onDisabled={checkOccupation}
                                id={`dropdown-client-company-phone-code-${index}`}
                              />
                            );
                          }}
                        />
                        <Controller
                          name={`clientCompanyPhones.${index}.clientCompanyPhone`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <InputField
                              maxLength={12}
                              containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                              placeholder={t('Epos:enter_phone_number')}
                              value={value}
                              setValue={(item) => onChange(sanitizedText(item))}
                              keyboardType="phone-pad"
                              required={!checkOccupation}
                              disabled={checkOccupation}
                              id={`input-client-company-phone-number-${index}`}
                            />
                          )}
                        />
                        {clientCompanyPhones?.fields?.length > 1 && (
                          <Button
                            preset="secondary"
                            textStyle={plaiStyles.fontGrey33}
                            text={t('Calculator:remove')}
                            onPress={() => clientCompanyPhones?.remove(index)}
                          />
                        )}
                      </View>
                      <Text style={[plaiStyles.fontGrey99, plaiStyles.font12]}>Contoh: 21xxxxxxx</Text>
                    </React.Fragment>
                  );
                })}

                {!isDoksul && (
                  <Button
                    style={[checkOccupation ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
                    textStyle={checkOccupation ? plaiStyles.fontWhite : plaiStyles.fontRed}
                    text={t('Epos:add_office_phone_number')}
                    disabled={checkOccupation}
                    onPress={() =>
                      onAddPhone(
                        clientCompanyPhones?.fields,
                        clientCompanyPhones?.append,
                        { clientCompanyPhoneCode: defaultPhoneCode, clientCompanyPhone: '' },
                        'Maksimal Nomor Telepon Kantor 5',
                      )
                    }
                  />
                )}

                <SectionTitle text={t('Epos:residence_information')} />
                {!isDoksul && (
                  <Controller
                    name={VALIDATION.clientIsSameAddress.name}
                    control={control}
                    rules={VALIDATION.clientIsSameAddress.rule}
                    render={({ field: { onChange, value } }) => (
                      <OptionCard
                        label={'Alamat Sama dengan Pemegang Polis?'}
                        required={true}
                        style={[plaiStyles.flex, plaiStyles.row]}
                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                        theme="border"
                        data={statement}
                        selected={value}
                        onSelected={(value) => {
                          onChangeclientIsSameAddress(value as TCommonConstantData, onChange);
                        }}
                        error={errors?.clientIsSameAddress}
                        uniqueTestId='client-same-address'
                      />
                    )}
                  />
                )}
                {((!isDoksul && isUsePHAddress?.key === 'N') || isDoksul) && (
                  <>
                    <Controller
                      name={VALIDATION.clientResidenceLocation.name}
                      control={control}
                      rules={VALIDATION.clientResidenceLocation.rule}
                      render={({ field: { onChange, value } }) => (
                        <OptionCard
                          required={true}
                          label={t('Epos:residence_location')}
                          style={[plaiStyles.flex, plaiStyles.row]}
                          insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                          theme="border"
                          data={locationList}
                          selected={value}
                          onSelected={(value) => {
                            onChange(value);
                          }}
                          error={errors?.clientResidenceLocation}
                          uniqueTestId='input-client-residence-location'
                        />
                      )}
                    />

                    {residenceLocation?.key === 'AB' && (
                      <Controller
                        name={VALIDATION.clientResidenceAbroad.name}
                        control={control}
                        rules={VALIDATION.clientResidenceAbroad.rule}
                        render={({ field: { onChange, value } }) => (
                          <DropdownField
                            labelMap={{
                              title: t('Epos:select_abroad_location'),
                              placeholder: t('Epos:select_abroad_location'),
                            }}
                            keyMap={{
                              label: 'name',
                              search: 'name',
                              value: 'code',
                            }}
                            data={REGION_PHONE_CODE}
                            selected={value}
                            onSelected={onChange}
                            error={errors.clientResidenceAbroad}
                            id='dropdown-client-residence-abroad'
                          />
                        )}
                      />
                    )}

                    <Controller
                      name={VALIDATION.clientResidenceAdress.name}
                      control={control}
                      rules={VALIDATION.clientResidenceAdress.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:residence_address')}
                          placeholder={t('Epos:enter_address')}
                          maxLength={44}
                          value={value}
                          setValue={(value) => onChange(residenceAddressFormatText(value))}
                          error={errors.clientResidenceAdress}
                          rightItem="counter"
                          id='input-client-residence-address'
                        />
                      )}
                    />
                    {
                      isDoksul && relationship.key != 'BU' && (
                        <Controller
                          name={VALIDATION.clientResidenceStatus.name}
                          control={control}
                          rules={VALIDATION.clientResidenceStatus.rule}
                          render={({ field: { onChange, value } }) => (
                            <DropdownField
                              labelMap={{
                                title: 'Status Tempat Tinggal',
                                placeholder: 'Pilih Status Tempat Tinggal',
                              }}
                              keyMap={{
                                search: 'label',
                              }}
                              search={{
                                isOnChangeSearch: true,
                              }}
                              data={listStatusResidence}
                              selected={value}
                              onSelected={onChange}
                              error={errors.clientResidenceStatus}
                              id='dropdown-client-residence-status'
                            />
                          )}
                        />
                      )
                    }
                    {
                      residenceStatus?.key == 'O' &&
                      <Controller
                        name={VALIDATION.clientResidenceStatusOther.name}
                        control={control}
                        rules={VALIDATION.clientResidenceStatusOther.rule}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={'Status Tempat Tinggal Lainnya'}
                            placeholder={'Masukan Status Tempat Tinggal Lainnya'}
                            maxLength={44}
                            value={value}
                            setValue={(value) => onChange(sanitizeTextWithSymbol(value))}
                            error={errors.clientResidenceStatusOther}
                            rightItem="counter"
                            id='input-client-residence-address'
                          />
                        )}
                      />
                    }
                    <Controller
                      name={VALIDATION.clientResidenceNeighbourdhood1.name}
                      control={control}
                      rules={VALIDATION.clientResidenceNeighbourdhood1.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:neighbourdhood1')}
                          placeholder={t('Epos:enter_neighbourdhood1')}
                          maxLength={3}
                          required={false}
                          value={value}
                          setValue={(value) => onChange(sanitizedText(value, true))}
                          error={errors.clientResidenceNeighbourdhood1}
                          keyboardType="phone-pad"
                          id='input-client-residence-neighbourdhood1'
                        />
                      )}
                    />

                    <Controller
                      name={VALIDATION.clientResidenceNeighbourdhood2.name}
                      control={control}
                      rules={VALIDATION.clientResidenceNeighbourdhood2.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:neighbourdhood2')}
                          placeholder={t('Epos:enter_neighbourdhood2')}
                          maxLength={3}
                          required={false}
                          value={value}
                          setValue={(value) => onChange(sanitizedText(value, true))}
                          error={errors.clientResidenceNeighbourdhood2}
                          keyboardType="phone-pad"
                          id='input-client-residence-neighbourdhood2'
                        />
                      )}
                    />

                    <Controller
                      name={VALIDATION.clientResideceKilometer.name}
                      control={control}
                      rules={VALIDATION.clientResideceKilometer.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={'KM'}
                          placeholder={t('Epos:enter_km')}
                          maxLength={3}
                          required={false}
                          value={value}
                          setValue={(value) => onChange(sanitizedText(value, true))}
                          error={errors.clientResideceKilometer}
                          keyboardType="phone-pad"
                          id='input-client-residence-kilometer'
                        />
                      )}
                    />

                    <Controller
                      name={VALIDATION.clientResidencePostCode.name}
                      control={control}
                      rules={VALIDATION.clientResidencePostCode.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:post_code')}
                          placeholder={t('Epos:enter_post_code')}
                          maxLength={5}
                          value={value}
                          setValue={(value) => onChange(sanitizedText(value))}
                          onBlur={() => {
                            onZipCodeAutoFill(setValue, [
                              'clientResidenceDistrict',
                              'clientResidenceProvince',
                              'clientResidenceCity',
                            ], value);
                          }}
                          error={errors.clientResidencePostCode}
                          keyboardType="phone-pad"
                          id='input-client-residence-postcode'
                        />
                      )}
                    />

                    <Controller
                      name={VALIDATION.clientResidenceDistrict.name}
                      control={control}
                      rules={VALIDATION.clientResidenceDistrict.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:district')}
                          placeholder={t('Epos:enter_district')}
                          value={value}
                          maxLength={40}
                          setValue={(value) => onChange(sanitizedLetterText(value))}
                          error={errors.clientResidenceDistrict}
                          id='input-client-residence-district'
                          maxLength={40}
                        />
                      )}
                    />

                    <Controller
                      name={VALIDATION.clientResidenceUrbanVillage.name}
                      control={control}
                      rules={VALIDATION.clientResidenceUrbanVillage.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:urban_village')}
                          placeholder={t('Epos:enter_urban_village')}
                          value={value}
                          maxLength={40}
                          setValue={(value) => onChange(sanitizedLetterText(value))}
                          error={errors.clientResidenceUrbanVillage}
                          id='input-client-residence-urban-village'
                          maxLength={40}
                        />
                      )}
                    />

                    <Controller
                      name={VALIDATION.clientResidenceProvince.name}
                      control={control}
                      rules={VALIDATION.clientResidenceProvince.rule}
                      render={({ field: { onChange, value } }) => (
                        <DropdownField
                          labelMap={{
                            title: t('Epos:provice'),
                            placeholder: t('Epos:select_provice'),
                          }}
                          keyMap={{
                            search: 'label',
                          }}
                          search={{
                            isOnChangeSearch: true,
                          }}
                          data={PROVINCE_DATA}
                          selected={value}
                          onSelected={onChange}
                          error={errors.clientResidenceProvince}
                          id='dropdown-client-residence-province'
                        />
                      )}
                    />

                    <Controller
                      name={VALIDATION.clientResidenceCity.name}
                      control={control}
                      rules={VALIDATION.clientResidenceCity.rule}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={'Kota'}
                          placeholder={t('Epos:enter_city')}
                          value={value}
                          maxLength={40}
                          setValue={(value) => onChange(sanitizedLetterText(value))}
                          error={errors.clientResidenceCity}
                          id='dropdown-client-residence-city'
                          maxLength={40}
                        />
                      )}
                    />
                  </>
                )}

                {clientResidencePhoneNumbers?.fields?.map((field: any, index: number) => {
                  return (
                    <React.Fragment key={field.id}>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                        {t('Epos:home_phone_number')}
                      </Text>
                      <View style={[plaiStyles.flex, plaiStyles.row]}>
                        <Controller
                          name={`clientResidencePhoneNumbers.${index}.clientResidencePhoneNumberCode`}
                          control={control}
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
                                id={`dropdown-residence-phone-code-${index}`}
                              />
                            );
                          }}
                        />
                        <Controller
                          name={`clientResidencePhoneNumbers.${index}.clientResidencePhoneNumber`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <InputField
                              maxLength={12}
                              required={false}
                              containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                              placeholder={t('Epos:enter_phone_number')}
                              value={value}
                              setValue={(item) => onChange(sanitizedText(item))}
                              keyboardType="phone-pad"
                              id={`input-residence-phone-number-${index}`}
                            />
                          )}
                        />
                        {clientResidencePhoneNumbers?.fields?.length > 1 && (
                          <Button
                            preset="secondary"
                            textStyle={plaiStyles.fontGrey33}
                            text={t('Calculator:remove')}
                            onPress={() => clientResidencePhoneNumbers?.remove(index)}
                          />
                        )}
                      </View>
                      <Text style={[plaiStyles.fontGrey99, plaiStyles.font12]}>Contoh: 21xxxxxxx</Text>
                    </React.Fragment>
                  );
                })}

                {!isDoksul && (
                  <Button
                    style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
                    textStyle={plaiStyles.fontRed}
                    text={t('Epos:add_home_phone_number')}
                    disabled={checkOccupation}
                    onPress={() =>
                      onAddPhone(
                        clientResidencePhoneNumbers?.fields,
                        clientResidencePhoneNumbers?.append,
                        { clientResidencePhoneNumberCode: defaultPhoneCode, clientResidencePhoneNumber: '' },
                        'Maksimal Nomor Telepon Rumah 5'
                      )
                    }
                  />
                )}

                {clientResidenceHandphone?.fields.map((field: any, index: number) => {
                  const clientResidencePhoneCells = watch(`clientResidencePhoneCells.${index}.clientResidencePhoneCell`);
                  return (
                    <React.Fragment key={field.id}>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                        <TextDecoration label={t('Epos:phone_number')} additionalStyle={[plaiStyles.fontBold]} />
                        <Text style={plaiStyles.fontRed}> *</Text>
                      </Text>
                      <View style={[plaiStyles.flex, plaiStyles.row]}>
                        <Controller
                          name={`clientResidencePhoneCells.${index}.clientResidencePhoneCellCode`}
                          control={control}
                          rules={ValidationForm({ isRequired: true })}
                          render={({ field: { onChange, value: codePhoneCell } }) => {
                            return (
                              <DropdownField
                                containerStyle={[plaiStyles.mt0, { width: 75 }]}
                                data={REGION_PHONE_CODE}
                                labelMap={phoneCodeSettings.title}
                                keyMap={phoneCodeSettings.keyMap}
                                selected={codePhoneCell}
                                search={{
                                  isOnChangeSearch: true,
                                }}
                                onSelected={onChange}
                                id={`dropdown-residence-cellphone-code-${index}`}
                              />
                            );
                          }}
                        />
                        <Controller
                          name={`clientResidencePhoneCells.${index}.clientResidencePhoneCell`}
                          control={control}
                          rules={ValidationForm({ validate: validatePhoneCell })}
                          render={({ field: { onChange, value } }) => (
                            <InputField
                              maxLength={12}
                              containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                              placeholder={t('Epos:enter_phone_number')}
                              value={value}
                              setValue={(item) => onChange(sanitizedText(item))}
                              keyboardType="phone-pad"
                              id={`input-residence-cellphone-number-${index}`}
                            />
                          )}
                        />
                        {clientResidenceHandphone?.fields?.length > 1 && (
                          <Button
                            preset="secondary"
                            textStyle={plaiStyles.fontGrey33}
                            text={t('Calculator:remove')}
                            onPress={() => clientResidenceHandphone?.remove(index)}
                          />
                        )}
                      </View>
                      {errors?.clientResidencePhoneCells?.[index]?.clientResidencePhoneCell ? (
                        <Text style={[plaiStyles.mt8, plaiStyles.fontRed, plaiStyles.font12]}>
                          {errors?.clientResidencePhoneCells?.[index]?.clientResidencePhoneCell?.message}
                        </Text>
                      ) : (
                        <Text style={[plaiStyles.fontGrey99, plaiStyles.font12]}>{
                          !clientResidencePhoneCells || clientResidencePhoneCells?.length >= 9
                            ? 'Contoh: 85xxxxxxx'
                            : 'Minimum digit nomor handphone adalah 9 karakter'
                        }</Text>
                      )}
                    </React.Fragment>
                  );
                })}

                {!isDoksul && (
                  <Button
                    style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
                    textStyle={plaiStyles.fontRed}
                    disabled={checkOccupation}
                    onPress={() =>
                      onAddPhone(
                        clientResidenceHandphone?.fields,
                        clientResidenceHandphone?.append,
                        { clientResidencePhoneCellCode: defaultPhoneCode, clientResidencePhoneCell: '' },
                        'Maksimal Nomor Handphone 5'
                      )
                    }>
                    <Text style={[plaiStyles.fontRedBold]}>
                      <TextDecoration label={t('Epos:add_phone_number')} additionalStyle={[plaiStyles.fontRedBold]} />
                    </Text>
                  </Button>
                )}
              </>
            )}

            {relationship?.key === 'B' && (
              <>
                <Controller
                  name={VALIDATION.businessEntityName.name}
                  control={control}
                  rules={VALIDATION.businessEntityName.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'Nama Badan Usaha'}
                      placeholder={'Masukan nama badan usaha'}
                      value={value}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors?.businessEntityName}
                      id="input-business-entity-name"
                      maxLength={60}
                      rightItem="60"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.fromBusinessEntity.name}
                  control={control}
                  rules={VALIDATION.fromBusinessEntity.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: 'Bentuk Badan Usaha',
                        placeholder: 'Pilih bentuk badan usaha',
                      }}
                      data={businessEntityList}
                      selected={value}
                      onSelected={onChange}
                      error={errors?.fromBusinessEntity}
                      id="dropdown-from-business-entity"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.typeBusinessEntity.name}
                  control={control}
                  rules={VALIDATION.typeBusinessEntity.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'Jenis Badan Usaha'}
                      placeholder={'Masukan jenis badan usaha'}
                      value={value}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors?.typeBusinessEntity}
                      id="input-type-business-entity"
                      maxLength={40}
                      rightItem="40"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityLocation.name}
                  control={control}
                  rules={VALIDATION.businessEntityLocation.rule}
                  render={({ field: { onChange, value } }) => (
                    <OptionCard
                      required={true}
                      label={'Alamat Kantor'}
                      style={[plaiStyles.flex, plaiStyles.row]}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                      theme="border"
                      data={locationList}
                      selected={value}
                      onSelected={(value) => {
                        onChange(value);
                      }}
                      error={errors?.businessEntityLocation}
                      uniqueTestId='business-entity-location'
                    />
                  )}
                />

                {businessEntityLocation?.key === 'AB' && (
                  <Controller
                    name={VALIDATION.businessEntityAbroad.name}
                    control={control}
                    rules={VALIDATION.businessEntityAbroad.rule}
                    render={({ field: { onChange, value } }) => (
                      <DropdownField
                        labelMap={{
                          title: t('Epos:select_abroad_location'),
                          placeholder: t('Epos:select_abroad_location'),
                        }}
                        keyMap={{
                          label: 'name',
                          search: 'name',
                          value: 'code',
                        }}
                        data={REGION_PHONE_CODE}
                        selected={value}
                        onSelected={onChange}
                        error={errors?.businessEntityAbroad}
                        id="dropdown-business-entity-abroad"
                      />
                    )}
                  />
                )}

                <Controller
                  name={VALIDATION.businessEntityAddress.name}
                  control={control}
                  rules={VALIDATION.businessEntityAddress.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'Alamat'}
                      placeholder={t('Epos:enter_address')}
                      maxLength={44}
                      value={value}
                      setValue={(value) => onChange(sanitizeTextWithSymbol(value))}
                      error={errors.businessEntityAddress}
                      additionalInfo={t('Epos:company_address_info')}
                      rightItem={'counter'}
                      id="input-business-entity-address"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityNeighbourhood1.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={t('Epos:neighbourdhood1')}
                      placeholder={t('Epos:enter_neighbourdhood1')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id="input-business-entity-neighbourdhood1"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityNeighbourhood2.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={t('Epos:neighbourdhood2')}
                      placeholder={t('Epos:enter_neighbourdhood2')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id="input-business-entity-neighbourdhood2"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityKilometer.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={'KM'}
                      placeholder={t('Epos:enter_km')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id="input-business-entity-kilometer"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityPostCode.name}
                  control={control}
                  rules={VALIDATION.businessEntityPostCode.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:post_code')}
                      placeholder={t('Epos:enter_post_code')}
                      maxLength={5}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value))}
                      onBlur={() => {
                        onZipCodeAutoFill(setValue, ['businessEntityDistrict', 'businessEntityProvice', 'businessEntityCity'], value);
                      }}
                      error={errors?.businessEntityPostCode}
                      keyboardType="phone-pad"
                      id="input-business-entity-postcode"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityDistrict.name}
                  control={control}
                  rules={VALIDATION.businessEntityDistrict.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:district')}
                      placeholder={t('Epos:enter_district')}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors?.businessEntityDistrict}
                      id="input-business-entity-district"
                      maxLength={40}
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityUrbanVillage.name}
                  control={control}
                  rules={VALIDATION.businessEntityUrbanVillage.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:urban_village')}
                      placeholder={t('Epos:enter_urban_village')}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors?.businessEntityUrbanVillage}
                      id="input-business-entity-urban-village"
                      maxLength={40}
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityProvice.name}
                  control={control}
                  rules={VALIDATION.businessEntityProvice.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:provice'),
                        placeholder: t('Epos:select_provice'),
                      }}
                      keyMap={{
                        search: 'label',
                      }}
                      search={{
                        isOnChangeSearch: true,
                      }}
                      data={PROVINCE_DATA}
                      selected={value}
                      onSelected={onChange}
                      error={errors?.businessEntityProvice}
                      id="dropdown-business-entity-province"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.businessEntityCity.name}
                  control={control}
                  rules={VALIDATION.businessEntityCity.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'Kota'}
                      placeholder={t('Epos:enter_city')}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors?.businessEntityCity}
                      id="input-business-entity-city"
                      maxLength={40}
                    />
                  )}
                />

                <View>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                    {t('Epos:office_phone_number')}
                  </Text>
                  <View style={[plaiStyles.flex, plaiStyles.row]}>
                    <Controller
                      name={'businessEntityPhones.businessEntityPhoneCode'}
                      control={control}
                      render={({ field: { value, onChange } }) => {
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
                            id="dropdown-business-entity-phone-code"
                          />
                        );
                      }}
                    />
                    <Controller
                      name={'businessEntityPhones.businessEntityPhone'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          required={false}
                          containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                          placeholder={t('Epos:enter_phone_number')}
                          value={value}
                          setValue={(item) => onChange(sanitizedText(item))}
                          keyboardType="phone-pad"
                          maxLength={12}
                          id="input-business-entity-phone"
                        />
                      )}
                    />
                  </View>
                </View>
                <Text style={[plaiStyles.fontGrey99, plaiStyles.font12]}>Contoh: 21xxxxxxx</Text>

                <View>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                    Nomor Faksimili
                  </Text>
                  <View style={[plaiStyles.flex, plaiStyles.row]}>
                    <Controller
                      name={'businessEntityFaxs.businessEntityFaxCode'}
                      control={control}
                      render={({ field: { value, onChange } }) => {
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
                            id="dropdown-business-entity-fax-code"
                          />
                        );
                      }}
                    />
                    <Controller
                      name={'businessEntityFaxs.businessEntityFax'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          required={false}
                          containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                          placeholder={t('Epos:enter_fax_number')}
                          value={value}
                          setValue={(item) => onChange(sanitizedText(item))}
                          keyboardType="phone-pad"
                          id="input-business-entity-fax"
                          maxLength={13}
                        />
                      )}
                    />
                  </View>
                </View>

                <SectionTitle text={t('Epos:tax_information')} />

                <Controller
                  name={VALIDATION.businessEntitytNpwp.name}
                  control={control}
                  rules={VALIDATION.businessEntitytNpwp.rule}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <OptionCard
                        required={true}
                        label="NPWP"
                        style={[plaiStyles.flex, plaiStyles.row]}
                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                        theme="border"
                        data={statement}
                        selected={value}
                        onSelected={(value) => {
                          onChange(value);
                        }}
                        error={errors?.businessEntitytNpwp}
                        uniqueTestId="business-entity-npwp"
                      />
                    </>
                  )}
                />

                {watch('businessEntitytNpwp').key === 'Y' && (
                  <Controller
                    name={VALIDATION.businessEntityNpwpNumber.name}
                    control={control}
                    rules={VALIDATION.businessEntityNpwpNumber.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:npwp_number')}
                        placeholder={t('Epos:enter_no_npwp')}
                        maxLength={25}
                        value={value}
                        setValue={(value) => onChange(sanitizedText(value))}
                        error={errors?.businessEntityNpwpNumber}
                        keyboardType="phone-pad"
                        id="input-business-entity-npwp-number"
                      />
                    )}
                  />
                )}
              </>
            )}

            {relationship?.key && (
              <>
                <SectionTitle text={t('Epos:income_information')} />

                {relationship?.key !== 'B' && <Controller
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
                      onDisabled={isDisabled.clientIncome}
                      selected={value}
                      onSelected={(item) => {
                        onChange(item);
                      }}
                      error={errors.clientIncome}
                      search={{
                        isOnChangeSearch: true
                      }}
                      id="dropdown-income"
                    />
                  )}
                />}

                {relationship.key != 'B' && <Controller
                  name={VALIDATION.clientNetWorth.name}
                  control={control}
                  rules={VALIDATION.clientNetWorth.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:net_worth'),
                        placeholder: t('Epos:select_net_worth'),
                      }}
                      data={netWorthList}
                      selected={value}
                      onSelected={onChange}
                      error={errors.clientNetWorth}
                      translation={true}
                      id="dropdown-net-worth"
                    />
                  )}
                />}

                <Controller
                  name={VALIDATION.clientSourceIncome.name}
                  control={control}
                  rules={VALIDATION.clientSourceIncome.rule}
                  render={({ field: { onChange, value } }) => (
                    <View style={[plaiStyles.mt24]}>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                        {t('Epos:source_income_fund_per_month')}
                      </Text>
                      <CheckboxGroup
                        data={isDoksul && !isCheckedRelationship ? _sourceIncome : OCCUPATION_SIMPLE}
                        onSelected={(item) => {
                          onChange(setMultipleSelect([...value], item, 'key'));
                        }}
                        selected={value}
                        insideStyle={[
                          plaiStyles.justifyBetween,
                          plaiStyles.rowReverse,
                          plaiStyles.borderbf0,
                          plaiStyles.py16,
                        ]}
                        onDisabled={(item) => onDisableSourceIncome(item) as boolean}
                        error={errors?.clientSourceIncome}
                      />
                    </View>
                  )}
                />

                {sourceIncome?.map((item) => (
                  <>
                    {item?.key === 'investment' && (
                      <Controller
                        name={VALIDATION.clientInvesmentSourceIncome.name}
                        control={control}
                        rules={VALIDATION.clientInvesmentSourceIncome.rule}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={'Investasi'}
                            placeholder={'Masukan investasi'}
                            disabled={isDisabled.sourceIncome}
                            value={value}
                            setValue={(item) => onChange(sanitizeTextWithSymbol(item))}
                            error={errors?.clientInvesmentSourceIncome}
                            id="input-income-invesment"
                            maxLength={50}
                          />
                        )}
                      />
                    )}

                    {item?.key === 'personalBusiness' && (
                      <Controller
                        name={VALIDATION.clientPersonalBusinessSourceIncome.name}
                        control={control}
                        rules={VALIDATION.clientPersonalBusinessSourceIncome.rule}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={'Bisnis Pribadi'}
                            placeholder={'Masukan bisnis pribadi'}
                            disabled={isDisabled.sourceIncome}
                            value={value}
                            setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                            error={errors?.clientPersonalBusinessSourceIncome}
                            id="input-income-personal-business"
                            maxLength={50}
                          />
                        )}
                      />
                    )}

                    {item?.key === 'other' && (
                      <Controller
                        name={VALIDATION.clientOtherSourceIncome.name}
                        control={control}
                        rules={VALIDATION.clientOtherSourceIncome.rule}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={'Lainnya'}
                            placeholder={'Masukkan lainnya'}
                            disabled={isDisabled.sourceIncome}
                            value={value}
                            setValue={(val) => onChange(sanitizeTextWithSymbol(val))}
                            error={errors?.clientOtherSourceIncome}
                            id="input-income-other-source"
                            maxLength={50}
                          />
                        )}
                      />
                    )}
                  </>
                ))}
                {relationship?.key === 'B' && <Controller
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
                      onDisabled={isTraditional ? !isTraditional : !isDoksul}
                      selected={value}
                      onSelected={(item) => {
                        onChange(item);
                      }}
                      error={errors.clientIncome}
                      search={{
                        isOnChangeSearch: true
                      }}
                      id="dropdown-income"
                    />
                  )}
                />}
              </>
            )}

            <InfoBar variant='warn' withIcon={true} iconStyle='style 2' isUseHtmlFormatText={true} content={wording.pdp_notice_bar_Payor} />

            {isCheckedRelationship && (
              <>
                <Controller
                  name={VALIDATION.clientOtherJob.name}
                  control={control}
                  rules={VALIDATION.clientOtherJob.rule}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <OptionCard
                        required={true}
                        label={t('Epos:does_the_prospective_have_another_job', { premiContribution: wording?.premiContribution })}
                        style={[plaiStyles.flex, plaiStyles.row]}
                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                        theme="border"
                        data={statement}
                        selected={value}
                        onSelected={(value) => {
                          onChange(value);
                        }}
                        error={errors?.clientOtherJob}
                        uniqueTestId='other-job'
                      />
                    </>
                  )}
                />

                {otherJob?.key === 'Y' && (
                  <Controller
                    name={VALIDATION.clientOtherJobDetail.name}
                    control={control}
                    rules={VALIDATION.clientOtherJobDetail.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:job_detail')}
                        placeholder={t('Epos:enter_detail')}
                        value={value}
                        setValue={onChange}
                        maxLength={40}
                        error={errors.clientOtherJobDetail}
                        id="input-other-job-detail"
                        rightItem="40"
                      />
                    )}
                  />
                )}

              </>
            )}

            {/* Consent/Agreement to provide data*/}
            {isDoksul && (
              <>
                <SectionTitle text="Persetujuan Pemberian Data" />
                <Controller
                  name={VALIDATION.clientAgreementProvieData.name}
                  control={control}
                  rules={VALIDATION.clientAgreementProvieData.rule}
                  render={({ field: { onChange, value } }) => (
                    <View style={[plaiStyles.mt10]}>
                      <CheckboxGroup
                        data={[
                          { key: 'clientAgreementProvideData', label: `Pernyataan Pembayaran ${policyType === 'sharia' ? 'Kontribusi' : 'Premi'}` }
                        ]}
                        onSelected={(item) => {
                          const newValue = setMultipleSelect([...value || []], item, 'key');
                          onChange(newValue);
                          const clientAgreementValue = newValue;
                          if (clientAgreementValue && clientAgreementValue.length > 0) {
                            setIsAgreementModalVisible(true);
                          }
                        }}
                        selected={value}
                        insideStyle={[
                          plaiStyles.justifyStart,
                          plaiStyles.borderbf0,
                          plaiStyles.pt8,
                          plaiStyles.pb16,
                        ]}
                        textStyle={[
                          plaiStyles.fontRed,
                          plaiStyles.ml10
                        ]}
                        error={errors?.clientSourceIncome}
                      />
                    </View>
                  )}
                />
              </>
            )}

            <ModalAgreementProviderData
              isVisible={isAgreementModalVisible}
              agreementModalItem={{
                information: 'Persetujuan Pemberian Data',
                desc: [
                  { id: '-', key: `<b>Pernyataan Calon Pemegang Polis</b>` },
                  { id: '-', isGreyThinFontColor: true, key: `(Harap dibaca dengan teliti sebelum menandatangani Formulir (Calon) Pembayar ${wording.premiContribution})` },
                  { id: '-', key: `SAYA yang bertanda tangan di bawah ini, dalam kedudukan sebagai Calon Pemegang Polis (selanjutnya disebut “SAYA”), menyatakan telah memahami dan menyetujui bahwa:` },
                  { id: '1. ', key: `SAYA sendiri yang menandatangani Formulir ini setelah terisi lengkap dan benar untuk melengkapi pengajuan ${wording.spaj}, atau perubahan Mayor (<i>Major Alteration</i>) dan/atau pemulihan Polis.` },
                  { id: '2. ', key: `Semua keterangan yang diberikan di dalam Formulir ini adalah benar telah SAYA tuliskan dan tidak ada keterangan maupun hal-hal lain yang SAYA sembunyikan. Segala risiko yang timbul termasuk yang diakibatkan karena Formulir ini ditandatangani dalam keadaan kosong/belum terisi lengkap menjadi tanggung jawab SAYA.` },
                  { id: '3. ', key: `Apabila di kemudian hari diketahui bahwa keterangan dan/atau pernyataan dan/atau pemberitahuan yang disampaikan dalam Formulir ini ternyata keliru, atau ditemukan adanya dokumen lain yang sah secara hukum dan membatalkan dokumen yang telah diberikan, maka SAYA mengerti bahwa ${wording.companyName} (${wording.companyNameShort}) dapat membatalkan pengajuan ${wording.spaj}.` },
                  {
                    id: '4. ',
                    key: `<b>SAYA dan/atau Calon Pembayar ${wording.premiContribution}</b> memahami, menyetujui serta mengizinkan bahwa ${wording.companyNameShort} dari waktu ke waktu dapat mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat <i>e-mail</i>, nomor telepon, kontak, maupun informasi lainnya) yang SAYA berikan dalam Formulir ini, serta informasi terkait Polis SAYA termasuk memberikannya kepada pihak ketiga sepanjang dianggap perlu oleh ${wording.insurerManager} dalam rangka pemrosesan pengajuan Perubahan Pembayar ${policyType === 'sharia' ? 'Kontributor' : 'Premi'} yang SAYA ajukan atau untuk tujuan lain sehubungan dengan ${policyType === 'sharia' ? 'Santunan Asuransi' : 'pertanggungan'} berdasarkan Polis, dengan tunduk pada peraturan perundang-undangan yang berlaku. Adapun rincian mengenai tujuan dan pihak lain yang dapat memperoleh dan/atau memproses data pribadi dapat dilihat pada pemberitahuan privasi yang dapat diakses pada ${policyType === 'sharia' ? 'https://bit.ly/PRUSyariahPemberitahuanPrivasi' : 'https://bit.ly/PRUPemberitahuanPrivasi'} yang dapat diperbaharui oleh ${wording.companyNameShort} dari waktu ke waktu.`,
                    url: true
                  }
                ],
                key: 'agreementModalProvierKeys',
                label: ''
              }}
              onClose={() => {
                setOpenedUrl([]);
                setIsAgreementModalVisible(false);
                setIsDisableModalAgreementButton(true);
                setValue('clientAgreementProvieData', []);
              }}

              onEndReached={() => {
                if (openedUrl.length > 0) {
                  setIsDisableModalAgreementButton(false);
                }
              }}
              onOpenLink={onOpenedLinkModalAgreement}
              isButtonValid={!isDisableModalAgreementButton}
              onAgree={() => {
                setOpenedUrl([]);
                setIsDisableModalAgreementButton(true);
                setIsAgreementModalVisible(false);
              }}
            />

            <ModalInformation
              visible={joblessModal}
              title={t('Epos:unable_to_continue')}
              desc={t('Epos:jobless')}
              buttonPrimary={{
                text: 'Tutup',
                onPress: () => setJoblessModal(false),
              }}
            />
            <ModalInformation
              visible={maxPhone.isMaxPhone}
              title={t('Epos:info')}
              desc={maxPhone.message}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => { setMaxPhone({ isMaxPhone: false, message: maxPhone.message }); },
              }}
            />
          </ScrollView>
        </View>

        <EposFooter
          position={6}
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
