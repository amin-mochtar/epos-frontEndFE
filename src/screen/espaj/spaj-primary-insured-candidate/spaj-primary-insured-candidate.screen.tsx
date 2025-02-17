import { PruColor, PruScreen } from 'common_ui_components';
import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EposFooter,
  EposHeader,
  SectionTitle,
  OptionCard,
  TOptionalCardData,
  NumberTitle,
} from '../../../components';
import { EposRoutes } from '../../../navigation';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { VALIDATION } from './validation/validation';
import { useTranslation } from 'react-i18next';
import {
  CheckboxGroup,
  DropdownField,
  InputField,
  plaiStyles,
  sanitizedText,
  setMultipleSelect,
  sanitizedLetterText,
  InputDate,
  ModalInformation,
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
  religionList,
  educationList,
  locationList,
  statement,
  OCCUPATION_SIMPLE,
  WR_SHARIA_CONVENT,
  regionList,
  regionNias,
  phoneCodeSettings,
  generateRelationPHwithTU,
  checkMainParticipant,
  onShowModalCantContinueSPAJ,
  validateFormatCompanyName,
  validatePhoneCell,
  TConditionMapping,
  defaultPhoneCode,
  sanitizedLetterTextNoSpace,
  sanitizedTextNoSpace,
  fieldArrayHandlers,
  TPhoneCode,
  DEFAULT_OPTIONAL_DATA,
  defaultCode,
  ISQSDetail,
  ISPAJData,
  validateObject,
} from '../../../utilities';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { ValidationForm, calculateAge, defaultClientCivics, defaultOptionalData, npwpFormatText, residenceAddressFormatText, sanitizeTextLetterAndNumber } from '../../../utilities/common-function';
import { Button } from 'common_ui_components/app/components-ui';
import { defaultTFormDataClient } from '../../esqs/policy-owner-data/policy-owner-data.type';
import { getSPAJPolicyOwnerList } from './spaj-primary-insured-data.data';
import { NoticeBar } from './notice-bar/notice-bar';
import { useZipCode } from '../../../hooks';
import { idCardAdditionalInfo } from './spaj-primary-insured-candidate.function'
import { defaultTFormDataClientSPAJ, TFormDataClientSPAJ } from './spaj-primary-insured-candidate.type';
type TPolicyType = 'sharia' | 'conventional'


export const SPAJPrimaryInsuredCandidateScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const routes = useRoute();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu, getCustomerStorageById } = useEposRealm();
  const { selectedSQSId, proposalId, spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const SPAJDataInfo = RSPAJData?.DataCompleteness?.filter((item) => item.categoryKey == 'Data Informasi');
  const ocrData = RSPAJData?.spajOcr ? JSON.parse(RSPAJData.spajOcr!) : '';
  const isOCRFinish = ocrData?.polis?.isFinish && ocrData?.isManualDocument === false;
  const policyHolderData = useMemo(() => {
    return RSPAJData?.policyHolderData
      ? JSON.parse(RSPAJData.policyHolderData)
      : RSQSData
        ? getCustomerStorageById(RSQSData?.clientIdSelected[0])
        : {};
  }, []);

  const [isModalVulnerableWNA, setIsModalVulnerableWNA] = useState(false);
  const [maxPhone, setMaxPhone] = useState({
    isMaxPhone: false,
    message: '',
  });

  const isAdditionalAssured = routes.params?.isAdditionalAssured!;
  const isWithoutPolis = [''].includes(RSQSData?.product?.key!);
  const mainInsuredData = useMemo(() => {
    const insuredData = isAdditionalAssured ? RSQSData?.clientIdSelected[2] : RSQSData?.clientIdSelected[1];
    return insuredData ? getCustomerStorageById(insuredData) : defaultTFormDataClient;
  }, [RSQSData]);

  const defaultInsured = useMemo(() => {
    if (isAdditionalAssured) {
      return RSPAJData?.additionalInsured ? JSON.parse(RSPAJData.additionalInsured!) : null;
    }
    return RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured!) : null;
  }, []);

  const checkAge = calculateAge(mainInsuredData?.clientDateBirth || '');

  const { onZipCodeAutoFill } = useZipCode();

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TFormDataClientSPAJ>({
    defaultValues: useMemo(() => {
      let result = defaultTFormDataClientSPAJ;
      result = { ...result, ...defaultInsured };
      return result;
    }, []),
  });

  const [income, setIncome] = useState<TCommonConstantData>(getValues('clientIncome'));

  const { clientValidationIsEmployee, clientValidationRelationStatus, catatanSPAJotherInformation } = useMemo(
    () => getSPAJPolicyOwnerList(RSQSData?.policyType || 'conventional'),
    [],
  );

  const clientDateBirth = watch('clientDateBirth');
  const validatIdCard = (value: string) => {
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

  //dynamic input-phonne
  const clientCompanyPhones = fieldArrayHandlers('clientCompanyPhones', control);
  const clientResidencePhoneNumbers = fieldArrayHandlers('clientResidencePhoneNumbers', control);
  const clientResidenceHandphone = fieldArrayHandlers('clientResidencePhoneCells', control);

  const toggleVulnerableWNA = useCallback(() => {
    setIsModalVulnerableWNA(!isModalVulnerableWNA);
  }, [isModalVulnerableWNA]);

  const onAddPhone = (
    field: any,
    appendFunction: (data: any) => void,
    appendData: { [key: string]: { [key: string]: string; } | string; },
    message: string
  ) => {
    if (field?.length && field.length < 5) {
      appendFunction(appendData);
    } else {
      setMaxPhone({ isMaxPhone: true, message: message })
    }
  };

  const policyType: TPolicyType = RSQSData?.policyType as TPolicyType ?? 'conventional'

  const wording = useMemo(() => WR_SHARIA_CONVENT[policyType], []);
  const vulnerableWNANumber = useMemo(() => RSQSData?.policyType === 'conventional' ? '150' : '062', [RSQSData?.policyType]);
  const mainParticipant = useMemo(() => checkMainParticipant(RSQSData?.product?.key, RSQSData?.policyType,), []);

  // default value when first render
  useEffect(() => {
    setValue('clientName', mainInsuredData?.clientName ?? '');
    setValue('clientGender', mainInsuredData?.clientGender ?? DEFAULT_OPTIONAL_DATA);
    setValue('clientDateBirth', mainInsuredData?.clientDateBirth ?? '');
    setValue('clientCivics', defaultClientCivics());

    if (checkAge < 17) {
      setValue('clientIdcardType', { label: 'KIA/AKTA', key: 'KA' });
    } else {
      setValue('clientIdcardType', { label: 'KTP', key: 'idcard' });
    }
    setValue('clientJob', mainInsuredData?.clientJob);

    if (getValues('clientCountryBirth')?.code == '') {
      setValue('clientCountryBirth', defaultPhoneCode)
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid])

  const useOptionalDataState = (
    propertyKey: string,
    defaultValue?: TCommonConstantData,
  ): [TCommonConstantData | TPhoneCode, React.Dispatch<React.SetStateAction<TCommonConstantData | TPhoneCode>>] => {
    const initialState = defaultInsured
      ? defaultInsured[propertyKey]
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
    const initialState = defaultInsured ? defaultInsured[propertyKey] : defaultValue ? defaultValue : [];
    const [state, setState] = useState<TOptionalCardData[]>(initialState);
    return [state, setState];
  };

  // Usage
  const [validationIsEmployee, setValidationIsEmployee] = useOptionalDataState('clientValidationIsEmployee');
  const [massApplies, setMassApplies] = useOptionalDataState('clientMassApplies');
  const [religion, setReligion] = useOptionalDataState('clientReligion');
  const [anotherAddress, setAnotherAddress] = useOptionalDataState('clientResidenceAnotherAddress');
  const [residenceRegion, setResidenceRegion] = useOptionalDataState('clientResidenceRegion');
  const [residenceSumatera, setResidenceSumatera] = useOptionalDataState('clientResidenceSumatera');
  const [residenceNiasIdcard, setResidenceNiasIdcard] = useOptionalDataState('clientResidenceNiasIdCard');
  const [companyLocation, setCompanyLocation] = useOptionalDataState('clientCompanyLocation');
  const [residenceLocation, setResidenceLocation] = useOptionalDataState('clientResidenceLocation');
  const [IdCardType, setIdCardType] = useOptionalDataState('clientIdcardType', { label: 'KTP', key: 'idcard' });
  const [sourceIncome, setSourceIncome] = useArrayDataState('clientSourceIncome')
  const [AdditionalQuestionOtherInformation, setAdditionalQuestionOtherInformation] = useOptionalDataState(
    'clientValidationRelationStatus',
  );
  const [isUsePHAddress, setIsUsePHAddress] = useOptionalDataState('clientIsSameAddress', statement[1]);
  const [npwpStatus, setNpwpStatus] = useOptionalDataState('clientNpwp');

  const occupationCode = mainInsuredData?.clientJob?.code;
  const checkOccupation =
    typeof occupationCode === 'string' && ['UNEM', 'NSTN', 'STDN', 'RETI', 'HSWF'].includes(occupationCode);

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
        condition: religion?.key !== 'O',
        fields: ['clientOtherReligion']
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
      {
        condition: anotherAddress?.key === 'N',
        fields: [
          'clientResidenceRegion',
          'clientResidenceSumatera',
          'clientResidenceNiasIdCard',
          'clientResidenceNIasNumberIdCard',
        ],
      },
      {
        condition: residenceRegion?.key !== 'S',
        fields: ['clientResidenceSumatera', 'clientResidenceNiasIdCard', 'clientResidenceNIasNumberIdCard'],
      },
      {
        condition: residenceSumatera?.key !== 'BN',
        fields: ['clientResidenceNiasIdCard', 'clientResidenceNIasNumberIdCard'],
      },
      {
        condition: residenceNiasIdcard?.key !== 'N',
        fields: ['clientResidenceNIasNumberIdCard']
      },
      {
        condition: AdditionalQuestionOtherInformation?.key !== 'L',
        fields: ['clientValidationRelationStatusAdditional'],
      },
      {
        condition: validationIsEmployee?.key !== 'Y1',
        fields: ['clientValidationRelationStatus']
      },
      {
        condition: sourceIncome?.find((item) => item.key == 'investment') == undefined,
        fields: ['clientInvesmentSourceIncome'],
      },
      {
        condition: sourceIncome?.find((item) => item.key == 'personalBusiness') == undefined,
        fields: ['clientPersonalBusinessSourceIncome'],
      },
      {
        condition: sourceIncome?.find((item) => item.key == 'other') == undefined,
        fields: ['clientOtherSourceIncome'],
      },
    ];

    conditionsMapping?.forEach(({ condition, fields, result }: TConditionMapping) => {
      if (condition) {
        fields.forEach((field: any) => {
          // @ts-ignore
          const _field = result ? result : typeof defaultTFormDataClientSPAJ[field] == 'object' ? DEFAULT_OPTIONAL_DATA : '';
          setValue(field, _field);
        });
      }
    });
    conditionsMapping;

    // Fixing condition for changing data seamelessly
    if (validationIsEmployee?.key !== 'Y1') {
      setAdditionalQuestionOtherInformation(DEFAULT_OPTIONAL_DATA);
    }

    // reset all data if dont have other address
    if (anotherAddress?.key === 'N') {
      setResidenceRegion(defaultOptionalData);
      setResidenceSumatera(defaultOptionalData);
      setResidenceNiasIdcard(defaultOptionalData);
    }
    if (residenceRegion?.key !== 'S') {
      setResidenceSumatera(defaultOptionalData);
      setResidenceNiasIdcard(defaultOptionalData);
    }
    if (residenceSumatera?.key !== 'BN') {
      setResidenceNiasIdcard(defaultOptionalData);
    }
  }, [
    massApplies,
    religion,
    companyLocation,
    residenceLocation,
    IdCardType,
    checkOccupation,
    anotherAddress,
    residenceRegion,
    residenceSumatera,
    residenceNiasIdcard,
    sourceIncome,
  ]);

  useEffect(() => {
    if (income.key != '0') {
      setValue('clientSourceIncome', getValues('clientSourceIncome').filter(i => i.key != 'noIncome'))
    }
  }, [income]);

  const onBack = () => {
    const clientCivics = getValues('clientCivics') as TOptionalCardData;
    if (clientCivics?.code === 'ID') {
      if (spajId) {
        onSave(getValues());
        updateSummaryByKey(proposalId, {
          key: 'lastState',
          value: EposRoutes.SPAJ_POLICY_OWNER_DATA,
        });
      }

      let _backRoute = EposRoutes.SPAJ_POLICY_OWNER_DATA;
      let params = undefined;

      if (isAdditionalAssured) {
        _backRoute = EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE;
        params = {
          isAdditionalAssured: false,
        };
      } else {
        _backRoute = EposRoutes.SPAJ_POLICY_OWNER_DATA;
      }

      if (RSPAJData?.primaryInsured) {
        if (isValid) {
          updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE, {
            key: 'status',
            value: true,
          });
        } else {
          updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE, {
            key: 'status',
            value: false,
          });
        }
      }

      if (RSPAJData?.additionalInsured) {
        if (isValid) {
          updateSPAJStatusSubMenu(spajId, `${EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE}_copy`, {
            key: 'status',
            value: true,
          });
        } else {
          updateSPAJStatusSubMenu(spajId, `${EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE}_copy`, {
            key: 'status',
            value: false,
          });
        }
      }

      navigation.dispatch(StackActions.replace(_backRoute, params));
      return true;
    } else {
      setIsModalVulnerableWNA(true);
    }
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

  const onDisableSourceIncome = (item: TCommonConstantData | undefined) => {
    return useMemo(() => {
      const clientNoIncome = income?.key !== '0';
      // const source = getValues('clientSourceIncome');
      if (clientNoIncome) {
        // if (source.length && source[0].key === 'noIncome') {
        //   setValue('clientSourceIncome', []);
        // }
        return item?.key === 'noIncome';
      } else if (!clientNoIncome) {
        setValue('clientSourceIncome', [
          {
            key: 'noIncome',
            label: 'Tidak Berpenghasilan',
          },
        ]);
        return true;
      } else {
        return false;
      }
    }, [income?.key]);
  };

  const onSave = (data: TFormDataClientSPAJ) => {
    let newData = data;
    if (isUsePHAddress?.key === 'Y') {
      newData = handleIsUseSameAddressSave(newData);
    }
    updateSPAJByKey(RSPAJData?.spajId!, {
      key: isAdditionalAssured ? 'additionalInsured' : 'primaryInsured',
      value: JSON.stringify(newData),
    });
  };

  const onContinue: SubmitHandler<TFormDataClientSPAJ> = async (data) => {
    const clientCivics = data.clientCivics as TOptionalCardData;

    if (clientCivics?.code === 'ID') {
      await onSave(data);

      let _updateKey: string = EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE;
      if (isAdditionalAssured) _updateKey = `${EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE}_copy`;

      await updateSPAJStatusSubMenu(spajId, _updateKey, {
        key: 'status',
        value: true,
      });

      let _nextRoute = EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE;
      let params = undefined;

      if (isWithoutPolis) {
        _nextRoute = EposRoutes.SPAJ_DATA_COMPLETENESS;
      } else {
        if (RSQSData?.additionalLifeAssuredSelf) {
          if (RSQSData?.additionalLifeAssuredSelf === 'self') {
            _nextRoute = EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE;
          } else if (!isAdditionalAssured) {
            _nextRoute = EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE;
            params = {
              isAdditionalAssured: true,
            };
          }
        }
      }

      await updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: _nextRoute,
      });

      navigation.dispatch(StackActions.replace(_nextRoute, params));
    } else {
      setIsModalVulnerableWNA(true);
    }
  };

  const relationShipwithPH = useMemo(() => {
    let lifeAssured = mainParticipant
    if (isAdditionalAssured) {
      lifeAssured = t('Epos:additional_insured_candidate')
    }

    return generateRelationPHwithTU(
      policyType,
      policyHolderData?.clientGender?.key,
      policyHolderData?.clientMarriageStatus?.key ?? policyHolderData?.clientMaritalStatus?.key,
      policyHolderData?.clientDateBirth,
      clientDateBirth,
      lifeAssured,
    )
  }
    , [
      policyHolderData?.clientGender?.key,
      policyHolderData?.clientMarriageStatus?.key,
      policyHolderData?.clientMaritalStatus?.key,
      policyHolderData?.clientDateBirth,
      clientDateBirth,
      mainParticipant
    ]);

  const onChangeRegionSumatra = useCallback((value: TOptionalCardData, onChange: any) => {
    if (value?.key === 'N') {
      onShowModalCantContinueSPAJ()
      setResidenceSumatera({ key: '', label: '' });
      onChange({ key: '', label: '' });
      return
    }
    setResidenceSumatera(value);
    onChange(value);
  }, [setResidenceSumatera])

  const onChangeNiasCard = useCallback((value: TOptionalCardData, onChange: any) => {
    if (value?.key === 'Y') {
      onShowModalCantContinueSPAJ()
      setResidenceNiasIdcard({ key: '', label: '' });
      onChange({ key: '', label: '' });
      return
    }
    setResidenceNiasIdcard(value);
    onChange(value);
  },
    [setResidenceNiasIdcard],
  );

  const onChangeIdCardNumber = (item: string) => {
    if (checkAge < 17) {
      setValue('clientIdCardNumber', sanitizeTextLetterAndNumber(item))
    } else {
      setValue('clientIdCardNumber', sanitizedText(item))
    }

  }

  const HeaderText = () => {
    const page = isAdditionalAssured ? 3 : 2;
    const text = isAdditionalAssured ? wording.candidateTitleOne : mainParticipant;

    return (
      <>
        <NumberTitle number="1" text={`${page}/${SPAJDataInfo?.length} ${t('Epos:data_information')}`} />
        <Text style={plaiStyles.fontHeaderTitle}>{text}</Text>
      </>
    );
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          <HeaderText />

          <ScrollView>
            <SectionTitle text={t('Epos:personal_information')} />

            <Controller
              name={VALIDATION.clientPolicyHolder.name}
              control={control}
              rules={VALIDATION.clientPolicyHolder.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: t('Epos:prospective_policyholder_is'),
                    placeholder: t('Epos:select_relationship'),
                  }}
                  data={relationShipwithPH}
                  selected={value}
                  onSelected={onChange}
                  error={errors.clientPolicyHolder}
                  id='dropdown-client-relationship-policyholder'
                />
              )}
            />

            <Controller
              name={VALIDATION.clientName.name}
              control={control}
              rules={VALIDATION.clientName.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:fullname')}
                  placeholder={t('Epos:enter_customer_name')}
                  disabled={true}
                  maxLength={60}
                  value={value}
                  setValue={(value) => onChange(onChangeNameFormating(value))}
                  error={errors.clientName}
                  id="input-client-name"
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
                  required={true}
                  style={[plaiStyles.flex, plaiStyles.row]}
                  insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                  theme="border"
                  data={GenderList}
                  selected={value}
                  onSelected={onChange}
                  onDisabled={() => true}
                  error={errors?.clientGender}
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
                  maxDate={`${new Date().getFullYear()}-12-31`}
                  minDate='1954-12-31'
                  value={value}
                  setValue={onChange}
                  error={errors.clientDateBirth}
                  disabled={true}
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
                  placeholder={t('Epos:enter_city_birth')}
                  maxLength={20}
                  value={value}
                  setValue={(value) => onChange(sanitizedLetterText(value))}
                  error={errors.clientCityBirth}
                  editable={!isOCRFinish}
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
                  onDisabled={isOCRFinish}
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
                  onDisabled={isOCRFinish}
                  id="dropdown-client-marital-status"
                />
              )}
            />

            <Controller
              name={VALIDATION.clientReligion.name}
              control={control}
              rules={VALIDATION.clientReligion.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: t('Epos:religion'),
                    placeholder: t('Epos:select_religion'),
                  }}
                  data={religionList}
                  selected={value}
                  onSelected={(value) => {
                    setReligion(value);
                    onChange(value);
                  }}
                  error={errors.clientReligion}
                  onDisabled={isOCRFinish}
                  id="dropdown-client-religion"
                />
              )}
            />

            {religion?.key === 'O' && (
              <Controller
                name={VALIDATION.clientOtherReligion.name}
                control={control}
                rules={VALIDATION.clientOtherReligion.rule}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    label={t('Epos:other_religion')}
                    placeholder={t('Epos:enter_other_religion')}
                    value={value}
                    setValue={(val) => onChange(sanitizedLetterText(val))}
                    error={errors.clientOtherReligion}
                    editable={!isOCRFinish}
                    id="input-client-other-religion"
                  />
                )}
              />
            )}

            <Controller
              name={VALIDATION.clientLastEducation.name}
              control={control}
              rules={VALIDATION.clientLastEducation.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: t('Epos:last_education'),
                    placeholder: t('Epos:select_education'),
                  }}
                  data={educationList}
                  selected={value}
                  onSelected={onChange}
                  error={errors.clientLastEducation}
                  id="dropdown-client-last-education"
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
                  value={value}
                  setValue={onChange}
                  error={errors.clientEmail}
                  additionalInfo={
                    <TextDecoration
                      label={t('Epos:conv_email_disclaimer_tu', { mainParticipant })}
                      additionalStyle={{ italic: [plaiStyles.fontBold] }}
                    />
                  }
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
                    required={true}
                    label={t('Epos:idcard_type')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={idcard?.filter((item) => (checkAge < 17 ? item.key === 'KA' : item.key === 'idcard'))}
                    selected={value}
                    onSelected={(value) => {
                      setIdCardType(value);
                      onChange(value);
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
              <Controller
                name={VALIDATION.clientIdCardNumber.name}
                control={control}
                rules={{ validate: validatIdCard }}
                render={({ field: { value } }) => {
                  const maxLength = checkAge < 17 ? 35 : 16
                  const keyboardType = checkAge < 17 ? "default" : "phone-pad"
                  return (
                    <>
                      <InputField
                        label={t('Epos:idcard_number')}
                        placeholder={t('Epos:enter_number')}
                        value={value}
                        maxLength={maxLength}
                        setValue={onChangeIdCardNumber}
                        error={errors.clientIdCardNumber}
                        keyboardType={keyboardType}
                        editable={!isOCRFinish}
                        additionalInfo={idCardAdditionalInfo(errors.clientIdCardNumber?.message, checkAge, value)}
                        id="input-client-idcard-number"
                      />
                    </>
                  )
                }}
              />
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
                    setMassApplies(value);
                    onChange(value);
                  }}
                  error={errors?.clientMassApplies}
                  onDisabled={() => isOCRFinish}
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
                    disabled={isOCRFinish}
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
                      setNpwpStatus(value);
                      onChange(value);
                    }}
                    error={errors?.clientNpwp}
                    uniqueTestId={`client-npwp`}
                  />
                </>
              )}
            />
            {npwpStatus?.key === 'Y' ? (
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
            ) : null}

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
                  data={OCCUPATION_FULL_DATA}
                  selected={value}
                  onSelected={onChange}
                  onDisabled={true}
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
                  error={errors.clientCompanyName}
                  maxLength={60}
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
                  label={t('Epos:company_location')}
                  style={[plaiStyles.flex, plaiStyles.row]}
                  insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                  theme="border"
                  data={locationList}
                  onDisabled={() => checkOccupation}
                  selected={value}
                  onSelected={(value) => {
                    setCompanyLocation(value);
                    onChange(value);
                  }}
                  error={errors?.clientCompanyLocation}
                  required={!checkOccupation}
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
                  label={t('Epos:company_address')}
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
                    onZipCodeAutoFill(setValue, ['clientCompanyDistrict', 'clientCompanyProvice', 'clientCompanyCity'], value)
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
                  label={t('Epos:city_regency')}
                  placeholder={t('Epos:enter_city')}
                  disabled={checkOccupation}
                  value={value}
                  maxLength={40}
                  setValue={(value) => onChange(sanitizedLetterText(value))}
                  error={errors.clientCompanyCity}
                  required={!checkOccupation}
                  id="input-client-company-city"
                />
              )}
            />

            {/* Company Phone */}
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
                      render={({ field: { onChange, value: codePhone } }) => {
                        return (
                          <DropdownField
                            containerStyle={[plaiStyles.mt0, { width: 75 }]}
                            data={REGION_PHONE_CODE}
                            labelMap={phoneCodeSettings.title}
                            keyMap={phoneCodeSettings.keyMap}
                            selected={codePhone}
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
                        style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                        textStyle={plaiStyles.fontGrey33}
                        text={t('Calculator:remove')}
                        onPress={() => clientCompanyPhones?.remove(index)}
                      />
                    )}
                  </View>
                  <Text style={[plaiStyles.fontGrey99, plaiStyles.font12]}>Contoh: 21xxxxxxx</Text>
                  {errors?.clientCompanyPhones?.[index]?.clientCompanyPhone && (
                    <Text style={[plaiStyles.mt8, plaiStyles.fontRed, plaiStyles.font12]}>
                      {errors?.clientCompanyPhones?.[index]?.clientCompanyPhone?.message}
                    </Text>
                  )}
                </React.Fragment>
              );
            })}
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

            {/* Start of Address */}
            <SectionTitle text={t('Epos:residence_information')} />
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
                    setIsUsePHAddress(value);
                    onChange(value);
                  }}
                  error={errors?.clientIsSameAddress}
                  uniqueTestId='input-client-residence-location'
                />
              )}
            />

            {/* Handle if insured Data same with PH data */}
            {isUsePHAddress?.key === 'N' && (
              <>
                <Controller
                  name={VALIDATION.clientResidenceLocation.name}
                  control={control}
                  rules={VALIDATION.clientResidenceLocation.rule}
                  render={({ field: { onChange, value } }) => (
                    <OptionCard
                      label={t('Epos:residence_location')}
                      required={true}
                      style={[plaiStyles.flex, plaiStyles.row]}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                      theme="border"
                      data={locationList}
                      selected={value}
                      onSelected={(value) => {
                        setResidenceLocation(value);
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
                      value={value}
                      setValue={(val) => onChange(residenceAddressFormatText(val))}
                      error={errors.clientResidenceAdress}
                      maxLength={44}
                      rightItem={'counter'}
                      id='input-client-residence-address'
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientResidenceNeighbourdhood1.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={t('Epos:neighbourdhood1')}
                      required={false}
                      placeholder={t('Epos:enter_neighbourdhood1')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id='input-client-residence-neighbourdhood1'
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientResidenceNeighbourdhood2.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={t('Epos:neighbourdhood2')}
                      required={false}
                      placeholder={t('Epos:enter_neighbourdhood2')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      keyboardType="phone-pad"
                      id='input-client-residence-neighbourdhood2'
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientResideceKilometer.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      required={false}
                      label={'KM'}
                      required={false}
                      placeholder={t('Epos:enter_km')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
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
                        ], value)
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
                      label={t('Epos:city_regency')}
                      placeholder={t('Epos:enter_city')}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientResidenceCity}
                      id='dropdown-client-residence-city'
                    />
                  )}
                />
                {/* End of Addresss */}
              </>
            )}

            {/* Residence Phone Number */}
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
                      render={({ field: { onChange, value: codePhone } }) => {
                        return (
                          <DropdownField
                            containerStyle={[plaiStyles.mt0, { width: 75 }]}
                            data={REGION_PHONE_CODE}
                            labelMap={phoneCodeSettings.title}
                            keyMap={phoneCodeSettings.keyMap}
                            selected={codePhone}
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
                          containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                          placeholder={t('Epos:enter_phone_number')}
                          value={value}
                          setValue={(item) => onChange(sanitizedText(item))}
                          keyboardType="phone-pad"
                          required={false}
                          id={`input-residence-phone-number-${index}`}
                        />
                      )}
                    />
                    {clientResidencePhoneNumbers?.fields?.length > 1 && (
                      <Button
                        style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                        textStyle={plaiStyles.fontGrey33}
                        text={t('Calculator:remove')}
                        onPress={() => clientResidencePhoneNumbers?.remove(index)}
                      />
                    )}
                  </View>
                  <Text style={[plaiStyles.fontGrey99, plaiStyles.font12]}>Contoh: 21xxxxxxx</Text>
                  {errors?.clientResidencePhoneNumbers?.[index]?.clientResidencePhoneNumber && (
                    <Text style={[plaiStyles.mt8, plaiStyles.fontRed, plaiStyles.font12]}>
                      {errors?.clientResidencePhoneNumbers?.[index]?.clientResidencePhoneNumber?.message}
                    </Text>
                  )}
                </React.Fragment>
              );
            })}
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

            {/* Handphone Number */}
            {clientResidenceHandphone?.fields?.map((field: any, index: number) => {
              const clientResidencePhoneCells = watch(`clientResidencePhoneCells.${index}.clientResidencePhoneCell`);
              return (
                <React.Fragment key={field.id}>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                    <TextDecoration label={t('Epos:phone_number')} />
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

            <Controller
              name={VALIDATION.clientResidenceAnotherAddress.name}
              control={control}
              rules={VALIDATION.clientResidenceAnotherAddress.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    label={t('Epos:another_address', { wordingSharia: wording?.spaj })}
                    required={true}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={statement}
                    selected={value}
                    onSelected={(value) => {
                      setAnotherAddress(value);
                      onChange(value);
                    }}
                    error={errors?.clientResidenceAnotherAddress}
                    uniqueTestId='another-address'
                  />
                </>
              )}
            />

            {anotherAddress?.key === 'Y' && (
              <>
                <Controller
                  name={VALIDATION.clientResidenceRegion.name}
                  control={control}
                  rules={VALIDATION.clientResidenceRegion.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:region_residence'),
                        placeholder: t('Epos:select_region'),
                      }}
                      data={regionList}
                      selected={value}
                      onSelected={(value) => {
                        setResidenceRegion(value);
                        onChange(value);
                      }}
                      error={errors.clientResidenceRegion}
                      id="dropdown-residence-region"
                    />
                  )}
                />

                {residenceRegion?.key === 'S' && (
                  <Controller
                    name={VALIDATION.clientResidenceSumatera.name}
                    control={control}
                    rules={VALIDATION.clientResidenceSumatera.rule}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <OptionCard
                          required={true}
                          label={t('Epos:region_sumatera')}
                          style={[plaiStyles.flex, plaiStyles.row]}
                          insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                          theme="border"
                          data={regionNias}
                          selected={value}
                          onSelected={(value) => {
                            onChangeRegionSumatra(value, onChange)
                          }}
                          error={errors?.clientResidenceSumatera}
                          uniqueTestId='residence-region-sumatera'
                        />
                      </>
                    )}
                  />
                )}

                {residenceSumatera?.key === 'BN' && (
                  <Controller
                    name={VALIDATION.clientResidenceNiasIdCard.name}
                    control={control}
                    rules={VALIDATION.clientResidenceNiasIdCard.rule}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <OptionCard
                          required={true}
                          label={t('Epos:have_national_idcard')}
                          style={[plaiStyles.flex, plaiStyles.row]}
                          insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                          theme="border"
                          data={statement}
                          selected={value}
                          onSelected={(value) => {
                            onChangeNiasCard(value, onChange)
                          }}
                          error={errors?.clientResidenceNiasIdCard}
                          uniqueTestId='residence-nias-idcard'
                        />
                      </>
                    )}
                  />
                )}

                {residenceNiasIdcard?.key === 'N' && (
                  <Controller
                    name={VALIDATION.clientResidenceNIasNumberIdCard.name}
                    control={control}
                    rules={VALIDATION.clientResidenceNIasNumberIdCard.rule}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <OptionCard
                          required={true}
                          label={t('Epos:have_a_nias_national_identification_number')}
                          style={[plaiStyles.flex, plaiStyles.row]}
                          insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                          theme="border"
                          data={statement}
                          selected={value}
                          onSelected={onChange}
                          error={errors?.clientResidenceNIasNumberIdCard}
                          uniqueTestId='residence-nias-number-idcard'
                        />
                      </>
                    )}
                  />
                )}
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
                  selected={value}
                  onSelected={(item) => {
                    onChange(item);
                    setSourceIncome([])
                    setIncome(item);
                  }}
                  error={errors.clientIncome}
                  id="dropdown-income"
                  search={{
                    isOnChangeSearch: true
                  }}
                />
              )}
            />

            <Controller
              name={VALIDATION.clientSourceIncome.name}
              control={control}
              rules={VALIDATION.clientSourceIncome.rule}
              render={({ field: { onChange, value } }) => (
                <View style={[plaiStyles.mt24]}>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>{t('Epos:source_income_per_month')}</Text>
                  <CheckboxGroup
                    data={OCCUPATION_SIMPLE}
                    onSelected={(item) => {
                      setSourceIncome(setMultipleSelect([...value], item, 'key'));
                      onChange(setMultipleSelect([...value], item, 'key'));
                    }}
                    selected={value}
                    insideStyle={[
                      plaiStyles.justifyBetween,
                      plaiStyles.rowReverse,
                      plaiStyles.borderbf0,
                      plaiStyles.py16,
                    ]}
                    onDisabled={(item) => onDisableSourceIncome(item)}
                    error={errors?.clientSourceIncome}
                  />
                </View>
              )}
            />

            {sourceIncome?.map((item) => (
              <>
                {item.key === 'investment' && (
                  <Controller
                    name={VALIDATION.clientInvesmentSourceIncome.name}
                    control={control}
                    rules={VALIDATION.clientInvesmentSourceIncome.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:invesment')}
                        placeholder={t('Epos:enter_invesment')}
                        value={value}
                        setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                        error={errors.clientInvesmentSourceIncome}
                        id="input-income-invesment"
                      />
                    )}
                  />
                )}
                {item.key === 'personalBusiness' && (
                  <Controller
                    name={VALIDATION.clientPersonalBusinessSourceIncome.name}
                    control={control}
                    rules={VALIDATION.clientPersonalBusinessSourceIncome.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:personal_business')}
                        placeholder={t('Epos:enter_personal_business')}
                        value={value}
                        setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                        error={errors.clientPersonalBusinessSourceIncome}
                        id="input-income-personal-business"
                      />
                    )}
                  />
                )}

                {item.key === 'other' && (
                  <Controller
                    name={VALIDATION.clientOtherSourceIncome.name}
                    control={control}
                    rules={VALIDATION.clientOtherSourceIncome.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:other')}
                        placeholder={t('Epos:enter_other')}
                        value={value}
                        setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                        error={errors.clientOtherSourceIncome}
                        id="input-income-other-source"
                      />
                    )}
                  />
                )}
              </>
            ))}

            {/* Other Information Section */}
            <SectionTitle text={t('Epos:another_information')} />
            <View style={[plaiStyles.flex]}>
              <Text style={[plaiStyles.fontGrey33, plaiStyles.mt24, plaiStyles.lineH20]}>
                {t('Epos:other_infromation_relation_question', { companyName: `${wording.companyName}${wording.additionalCompanyName ? ` ${wording.additionalCompanyName}` : ''}`, mainParticipant })}
              </Text>
            </View>
            <Controller
              name={VALIDATION.clientValidationIsEmployee.name}
              control={control}
              rules={VALIDATION.clientValidationIsEmployee.rule}
              render={({ field: { onChange, value } }) => (
                <OptionCard
                  theme="border"
                  data={clientValidationIsEmployee}
                  selected={value}
                  onSelected={(value) => {
                    onChange(value);
                    setValue(VALIDATION.clientEmployeeName.name, '');
                    setValue(VALIDATION.clientEmployeeNIK.name, '');
                    setValidationIsEmployee(value);
                  }}
                  error={errors?.clientValidationIsEmployee}
                  uniqueTestId='validation-is-employee'
                />
              )}
            />

            {/* condition Scenario start here */}

            {validationIsEmployee?.key === 'Y1' && (
              <>
                <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt24]}>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                    {t('Epos:other_infromation_relation_employe_question', { companyName: `${wording.companyName}${wording.additionalCompanyName ? ` ${wording.additionalCompanyName}` : ''}` })}
                  </Text>
                  <Text style={plaiStyles.fontRed}> *</Text>
                </View>
                <Controller
                  name={VALIDATION.clientValidationRelationStatus.name}
                  control={control}
                  rules={VALIDATION.clientValidationRelationStatus.rule}
                  render={({ field: { onChange, value } }) => (
                    <OptionCard
                      theme="border"
                      data={clientValidationRelationStatus}
                      selected={value}
                      onSelected={(value) => {
                        setAdditionalQuestionOtherInformation(value);
                        onChange(value);
                      }}
                      error={errors?.clientValidationRelationStatus}
                      uniqueTestId='validation-relation-status'
                    />
                  )}
                />
                {(AdditionalQuestionOtherInformation?.key == 'L' || validationIsEmployee?.key !== 'Y1') && (
                  <Controller
                    name={VALIDATION.clientValidationRelationStatusAdditional.name}
                    control={control}
                    rules={VALIDATION.clientValidationRelationStatusAdditional.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:other')}
                        placeholder={t('Epos:other_placeholder')}
                        value={value}
                        setValue={(value) => onChange(sanitizedLetterTextNoSpace(value))}
                        error={errors.clientValidationRelationStatusAdditional}
                        id="validation-relation-status-additional"
                      />
                    )}
                  />
                )}
              </>
            )}

            {/* Informasi Karyawan */}
            {(validationIsEmployee?.key === 'Y1' || validationIsEmployee?.key === 'Y2') && (
              <>
                <SectionTitle text={t('Epos:another_information')} />
                <NoticeBar message={t('Epos:employee_notes', { companyName: `${wording.companyName}${wording.additionalCompanyName ? ` ${wording.additionalCompanyName}` : ''}` })} />
                <Controller
                  name={VALIDATION.clientEmployeeName.name}
                  control={control}
                  rules={VALIDATION.clientEmployeeName.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:employee_name')}
                      placeholder={t('Epos:employee_name_placeholder')}
                      value={value}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      onBlur={() => onChange(value.toUpperCase())}
                      error={errors.clientEmployeeName}
                      id="employee-name"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientEmployeeNIK.name}
                  control={control}
                  rules={VALIDATION.clientEmployeeNIK.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:employee_id')}
                      placeholder={t('Epos:employee_id_placeholder')}
                      value={value}
                      setValue={(value) => onChange(sanitizedTextNoSpace(value))}
                      error={errors.clientEmployeeNIK}
                      maxLength={6}
                      id="employee-nik"
                    />
                  )}
                />
              </>
            )}

            <NoticeBar message={t('Epos:note')} data={catatanSPAJotherInformation} list="•" />

            <ModalInformation
              visible={isModalVulnerableWNA ? isModalVulnerableWNA : maxPhone.isMaxPhone}
              title={isModalVulnerableWNA ? t('Epos:attention') : t('Epos:info')}
              desc={isModalVulnerableWNA ? t('Epos:desc_vulnerable_wna', {
                vulnerableWNANumber,
                lifeAssured: wording.lifeAssured
              }) : maxPhone.message}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => {
                  isModalVulnerableWNA
                    ? toggleVulnerableWNA()
                    : setMaxPhone({ isMaxPhone: false, message: maxPhone.message });
                },
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
