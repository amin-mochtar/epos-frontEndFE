import { PruColor, PruScreen } from 'common_ui_components';
import { View, Text, ScrollView, BackHandler, Image } from 'react-native';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import {
  EposFooter,
  EposHeader,
  SectionTitle,
  OptionCard,
  TOptionalCardData,
  NumberTitle,
  InfoBar,
} from '../../../components';
import { EposRoutes } from '../../../navigation';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  TFormDataPolicyHolder,
  defaultFormDataPolicyHolder,
} from './spaj-policy-owner-data.type';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { VALIDATION } from './validation/validation';
import { useTranslation } from 'react-i18next';
import {
  CheckboxGroup,
  DropdownField,
  InputField,
  plaiStyles,
  sanitizedLetterText,
  sanitizedText,
  setMultipleSelect,
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
  religionList,
  educationList,
  mailingAddressList,
  asideFromNPWPList,
  locationList,
  statusTaxList,
  statement,
  regionList,
  regionNias,
  summaryPolicyList,
  WR_SHARIA_CONVENT,
  netWorthList,
  OCCUPATION_SIMPLE,
  phoneCodeSettings,
  onShowModalCantContinueSPAJ,
  checkMainParticipant,
  DEFAULT_OPTIONAL_DATA,
  validatePhoneCell,
  validateFormatCompanyName,
  sanitizedLetterTextNoSpace,
  sanitizedTextNoSpace,
  fieldArrayHandlers,
  TConditionMapping,
  TPhoneCode,
  defaultCode,
  defaultPhoneCode,
  ISQSDetail,
  ISPAJData,
  validateObject,
} from '../../../utilities';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { defaultClientCivics, defaultOptionalData, npwpFormatText, residenceAddressFormatText, sanitizeTextLetterAndNumber, sanitizeTextWithSymbol, ValidationForm } from '../../../utilities/common-function';
import { Button } from 'common_ui_components/app/components-ui';
import { infoBlue } from '../../../assets';
import { AgreementPolicyElectronic, NoticeBar, PolicyPrintConditions } from './components';
import { getSPAJPolicyOwnerList } from './spaj-policy-owner-data.data';
import { isEmpty } from 'lodash';
import { defaultTFormDataClient } from '../../esqs/policy-owner-data/policy-owner-data.type';
import { useZipCode } from '../../../hooks';
import { pruTestID } from 'common_services_frontend';
import { TCategories } from '../spaj-before-proceeding/config-data-completeness';
import { NoticeBar as CalculatorCompNoticeBar } from './../../esqs/calculator/components/notice-bar/notice-bar'

export const SPAJPolicyOwnerDataScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu, getCustomerStorageById, getSummaryProposalById } = useEposRealm();
  const { selectedSQSId, proposalId, spajId, ProspectDetail } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const RSummaryProposal = getSummaryProposalById(proposalId);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData: any = useObject<ISPAJData>('SPAJData', spajId as never);
  const lifeAssuredData = useMemo(() => {
    return RSQSData?.clientIdSelected[0]
      ? getCustomerStorageById(RSQSData.clientIdSelected[0])
      : defaultTFormDataClient;
  }, [RSQSData?.clientIdSelected[0]]);
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const isSelf = lifeAssuredSelf === 'self';
  const isWithoutPolis = ['U17R', 'U17D'].includes(RSQSData?.product?.key!);
  const defaultPolicyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData!) : null;
  const SPAJDataInfo = RSPAJData?.DataCompleteness?.filter((item: TCategories) => item.categoryKey == 'Data Informasi');
  const ocrData = RSPAJData?.spajOcr ? JSON.parse(RSPAJData.spajOcr!) : '';
  const isOCRFinish = ocrData?.polis?.isFinish && ocrData?.isManualDocument === false;
  const premiumPayorIncomeDataSQS = RSQSData?.premiumPayorIncomeData
    ? JSON.parse(RSQSData.premiumPayorIncomeData!)
    : null;
  const premiumPaymentCandidate = useMemo(() => {
    const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData?.confirmationSQS) : '';
    return confirmationSQS?.premiumPaymentCandidate;
  }, [RSPAJData?.confirmationSQS]);
  const [maxPhone, setMaxPhone] = useState({
    isMaxPhone: false,
    message: ''
  });
  const [isModalPolicySummary, setIsModalPolicySummary] = useState(false);
  const [isModalVulnerableWNA, setIsModalVulnerableWNA] = useState(false);
  const { onZipCodeAutoFill } = useZipCode();

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<TFormDataPolicyHolder>({
    defaultValues: useMemo(() => {
      let result;
      if (RSPAJData?.policyHolderData == null || RSPAJData?.policyHolderData == '') {
        result = defaultFormDataPolicyHolder;
      } else if (!isEmpty(RSPAJData?.policyHolderData) && !RSPAJData?.policyHolderData?.clientTaxDomicileStatus) {
        result = { ...defaultFormDataPolicyHolder, ...defaultPolicyHolderData };
      } else {
        result = defaultPolicyHolderData;
      }
      return result as TFormDataPolicyHolder;
    }, []),
  });

  const { clientValidationIsEmployee, clientValidationRelationStatus, catatanSPAJotherInformation } = useMemo(
    () => getSPAJPolicyOwnerList(RSQSData?.policyType || 'conventional'),
    [],
  );

  //dynamic input-phonne
  const clientCompanyPhones = fieldArrayHandlers('clientCompanyPhones', control);
  const clientResidencePhoneNumbers = fieldArrayHandlers('clientResidencePhoneNumbers', control);
  const clientResidenceHandphone = fieldArrayHandlers('clientResidencePhoneCells', control);
  const clientOtherResidencePhoneNumbers = fieldArrayHandlers('clientOtherResidencePhoneNumbers', control);

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

  const toggleVulnerableWNA = useCallback(() => {
    setIsModalVulnerableWNA(!isModalVulnerableWNA);
  }, [isModalVulnerableWNA]);

  // default value when first render
  useEffect(() => {
    if (RSQSData && RSQSData.additionalValidationPolicyInformation) {
      const additionalValidationPolicyInformation = JSON.parse(RSQSData.additionalValidationPolicyInformation);
      setValue('clientLastEducation', additionalValidationPolicyInformation.lastEducationalStatus);
    }
    if (!getValues('clientNpwp')) {
      setValue('clientNpwp', { label: t('Epos:yes'), key: 'Y' });
    }
    setValue('clientName', lifeAssuredData?.clientName);
    setValue('clientGender', lifeAssuredData?.clientGender);
    setValue('clientDateBirth', lifeAssuredData?.clientDateBirth);
    setValue('clientCivics', defaultClientCivics());
    setValue('clientMaritalStatus', lifeAssuredData?.clientMarriageStatus);
    setValue('clientIdcardType', { label: 'KTP', key: 'idcard' });
    setValue('clientIncome', lifeAssuredData.clientIncome);

    // if data emphty then autopopulate from sqs policy-owner-data
    if (!getValues('clientResidencePhoneCells')[0]?.clientResidencePhoneCell) {
      setValue('clientResidencePhoneCells', [
        {
          clientResidencePhoneCellCode: lifeAssuredData?.clientPhoneCode,
          clientResidencePhoneCell: lifeAssuredData?.clientPhone,
        },
      ]);
    }

    // if insurance payor is PH and there's data on premium_payor_income screen, it will be automatically filled in
    if (premiumPaymentCandidate == 'Y' && !!premiumPayorIncomeDataSQS) {
      setValue('clientSecondIncome', premiumPayorIncomeDataSQS?.totalIncome);
      if (Array.isArray(premiumPayorIncomeDataSQS?.source)) {
        setValue('clientSecondSourceIncome', premiumPayorIncomeDataSQS?.source);
        setValue('clientSecondInvesmentSourceIncome', premiumPayorIncomeDataSQS?.investment);
        setValue('clientSecondPersonalBusinessSourceIncome', premiumPayorIncomeDataSQS?.personalBusiness);
        setValue('clientSecondOtherSourceIncome', premiumPayorIncomeDataSQS?.other);
        setSecondSourceIncome(premiumPayorIncomeDataSQS?.source);
      }
    }

    if (isSelf) {
      setValue('clientJob', lifeAssuredData?.clientJob);
    } else if (RSQSData?.additionalLifeAssuredSelf == 'self') {
      const additionalLAData = getCustomerStorageById(RSQSData.clientIdSelected[2])
      setValue('clientJob', additionalLAData?.clientJob);
    }

    // if data form is empty then autopopulate with lead data
    if (!defaultPolicyHolderData) {
      setValue('clientEmail', ProspectDetail?.email);
      setValue('clientIdCardNumber', ProspectDetail?.countryNationalId ?? '');
      setValue('clientResidenceAdress', ProspectDetail?.address ?? '');
      setValue('clientResidencePostCode', ProspectDetail?.zipCode ?? '');
    } else {
      setValue('clientEmail', defaultPolicyHolderData?.clientEmail);
      setValue('clientIdCardNumber', defaultPolicyHolderData?.clientIdCardNumber);
      setValue('clientResidenceAdress', defaultPolicyHolderData?.clientResidenceAdress);
      setValue('clientResidencePostCode', defaultPolicyHolderData?.clientResidencePostCode);
    }

    if (getValues('clientCountryBirth')?.code == '') {
      setValue('clientCountryBirth', defaultPhoneCode);
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, [isValid]);

  const useOptionalDataState = (
    propertyKey: string,
    defaultValue?: TCommonConstantData,
  ): [TCommonConstantData | TPhoneCode, React.Dispatch<React.SetStateAction<TCommonConstantData | TPhoneCode>>] => {
    const initialState = defaultPolicyHolderData
      ? defaultPolicyHolderData[propertyKey]
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
    const initialState = defaultPolicyHolderData
      ? defaultPolicyHolderData[propertyKey]
      : defaultValue
        ? defaultValue
        : [];
    const [state, setState] = useState<TOptionalCardData[]>(initialState);
    return [state, setState];
  };

  // Usage
  const [religion, setReligion] = useOptionalDataState('clientReligion');
  const [mailingAddress, setMailingAddress] = useOptionalDataState('clientResidenceMailingAddress');
  const [AdditionalQuestionOtherInformation, setAdditionalQuestionOtherInformation] = useOptionalDataState(
    'clientValidationRelationStatus',
  );
  const [validationIsEmployee, setValidationIsEmployee] = useOptionalDataState('clientValidationIsEmployee');
  const [anotherAddress, setAnotherAddress] = useOptionalDataState('clientResidenceAnotherAddress');
  const [residenceRegion, setResidenceRegion] = useOptionalDataState('clientResidenceRegion');
  const [massApplies, setMassApplies] = useOptionalDataState('clientMassApplies');
  const [residenceSumatera, setResidenceSumatera] = useOptionalDataState('clientResidenceSumatera');
  const [residenceNiasIdcard, setResidenceNiasIdcard] = useOptionalDataState('clientResidenceNiasIdCard');
  const [npwpStatus, setNpwpStatus] = useOptionalDataState('clientNpwp');
  const [isNpwpHolder, setIsNpwpHolder] = useOptionalDataState('clientIsNpwpHolder');
  const [companyLocation, setCompanyLocation] = useOptionalDataState('clientCompanyLocation');
  const [residenceLocation, setResidenceLocation] = useOptionalDataState('clientResidenceLocation');
  const [otherresidenceLocation, setOtherResidenceLocation] = useOptionalDataState('clientOtherResidenceLocation');
  const [IdCardType, setIdCardType] = useOptionalDataState('clientIdcardType');
  const [occupation, setOccupation] = useOptionalDataState('clientJob', lifeAssuredData.clientJob);
  const [income, setIncome] = useOptionalDataState('clientIncome');
  const [taxStatus, setTaxStatus] = useArrayDataState('clientTaxDomicileStatus');
  const [sourceIncome, setSourceIncome] = useArrayDataState('clientSourceIncome');
  const [secondSourceIncome, setSecondSourceIncome] = useArrayDataState('clientSecondSourceIncome');

  const [alert, setAlert] = useState<TOptionalCardData>();
  const occupationCode = occupation?.code;
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
        condition: taxStatus?.find((item) => item.key == 'IT') == undefined,
        fields: ['ClientNpwpNumber', 'clientIsNpwpHolder', 'clientNpwpHolder', 'clientAsideFromNpwp'],
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
        condition: isNpwpHolder?.key === 'Y',
        fields: ['clientNpwpHolder'],
      },
      {
        condition: mailingAddress?.key !== 'OT',
        fields: [
          'clientOtherResidenceLocation',
          'clientOtherResidenceAdress',
          'clientOtherResidenceNeighbourdhood1',
          'clientOtherResidenceNeighbourdhood2',
          'clientOtherResideceKilometer',
          'clientOtherResidencePostCode',
          'clientOtherResidenceDistrict',
          'clientOtherResidenceUrbanVillage',
          'clientOtherResidenceProvince',
          'clientOtherResidenceCity',
        ],
      },
      {
        condition: mailingAddress?.key !== 'OT',
        fields: ['clientOtherResidencePhoneNumbers'],
        result: [{
          clientOtherResidencePhoneNumberCode: defaultPhoneCode,
          clientOtherResidencePhoneNumber: ''
        }],
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
        condition: otherresidenceLocation?.key !== 'AB',
        fields: ['clientOtherResidenceAbroad'],
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
          clientCompanyPhone: ''
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
    ];

    conditionsMapping?.forEach(({ condition, fields, result }: TConditionMapping) => {
      if (condition) {
        fields.forEach((field: any) => {
          const _field = result ? result : typeof defaultFormDataPolicyHolder[field] == 'object' ? DEFAULT_OPTIONAL_DATA : '';
          setValue(field, _field);
        });
      }
    });

    conditionsMapping;

    // Fixing condition for changing data seamelessly
    if (validationIsEmployee?.key !== 'Y1') {
      setAdditionalQuestionOtherInformation(DEFAULT_OPTIONAL_DATA);
    }

    //if have other address, field cleintOtherResidencePhoneNumber with index 0 added
    if (mailingAddress?.key === 'OT') {
      if (clientOtherResidencePhoneNumbers?.fields?.length === 0)
        clientOtherResidencePhoneNumbers?.append({
          clientOtherResidencePhoneNumberCode: defaultPhoneCode,
          clientOtherResidencePhoneNumber: '',
        });
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
    npwpStatus,
    taxStatus,
    isNpwpHolder,
    mailingAddress,
    religion,
    companyLocation,
    residenceLocation,
    otherresidenceLocation,
    IdCardType,
    checkOccupation,
    anotherAddress,
    residenceRegion,
    residenceSumatera,
    residenceNiasIdcard,
    AdditionalQuestionOtherInformation,
    validationIsEmployee,
    sourceIncome,
  ]);

  const onBack = () => {
    const clientCivics = getValues('clientCivics') as TOptionalCardData;
    if (clientCivics?.code === 'ID') {
      if (spajId) {
        onSave(getValues());
        updateSummaryByKey(proposalId, {
          key: 'lastState',
          value: EposRoutes.SPAJ_DATA_COMPLETENESS,
        });
      }

      if (RSPAJData?.policyHolderData) {
        if (isValid) {
          updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_POLICY_OWNER_DATA, { key: 'status', value: true });
        } else {
          updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_POLICY_OWNER_DATA, { key: 'status', value: false });
        }
      }

      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
      return true;
    } else {
      setIsModalVulnerableWNA(true);
    }
  };

  const handleIsUseSameAddressOnMainInsuredAndPayor = async (spajDataForm: any) => {
    const spajIsUseSameAddressMainInsured = RSPAJData?.primaryInsured && JSON.parse(RSPAJData?.primaryInsured);
    const spajIsUseSameAddressPayor = RSPAJData?.premiumPayor && JSON.parse(RSPAJData?.premiumPayor);

    const addressInformationSPAJPH = {
      clientResidenceAdress: spajDataForm.clientResidenceAdress,
      clientResidenceNeighbourdhood1: spajDataForm.clientResidenceNeighbourdhood1,
      clientResidenceNeighbourdhood2: spajDataForm.clientResidenceNeighbourdhood2,
      clientResideceKilometer: spajDataForm.clientResideceKilometer,
      clientResidencePostCode: spajDataForm.clientResidencePostCode,
      clientResidenceDistrict: spajDataForm.clientResidenceDistrict,
      clientResidenceUrbanVillage: spajDataForm.clientResidenceUrbanVillage,
      clientResidenceProvince: spajDataForm.clientResidenceProvince,
      clientResidenceCity: spajDataForm.clientResidenceCity,
    };

    // Handle Case Bolak Balik jika Step 1 bagian Polis di lewat
    if (spajIsUseSameAddressPayor && spajIsUseSameAddressPayor?.clientIsSameAddress?.key === 'Y') {
      const newPremiumPayor = {
        ...spajIsUseSameAddressPayor,
        ...addressInformationSPAJPH,
      };
      updateSPAJByKey(RSPAJData.spajId, {
        key: 'premiumPayor',
        value: JSON.stringify(newPremiumPayor)
      });

    }

    // Handle Case Bolak Balik jika Step 1 bagian Polis di lewat
    if (spajIsUseSameAddressMainInsured && spajIsUseSameAddressMainInsured?.clientIsSameAddress?.key === 'Y') {
      const newPrimaryInsured = {
        ...spajIsUseSameAddressMainInsured,
        ...addressInformationSPAJPH,
      };

      updateSPAJByKey(RSPAJData.spajId, {
        key: 'primaryInsured',
        value: JSON.stringify(newPrimaryInsured)
      });
    }
  };

  const onSave = (data: TFormDataPolicyHolder) => {
    handleIsUseSameAddressOnMainInsuredAndPayor(data);
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'policyHolderData',
      value: JSON.stringify(data)
    });
  };

  const onContinue: SubmitHandler<TFormDataPolicyHolder> = async (data) => {
    const clientCivics = data.clientCivics as TOptionalCardData;
    const phoneCell = data.clientResidencePhoneCells[0];
    if (clientCivics?.code === 'ID') {
      await onSave(data);

      const _route = (await isSelf)
        ? EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE
        : EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE;

      await updateSummaryByKey(proposalId, [
        {
          key: 'lastState',
          value: _route,
        },
        {
          key: 'policyHolderPhone',
          value: `${phoneCell?.clientResidencePhoneCellCode?.dial_code}${phoneCell?.clientResidencePhoneCell}`
        }
      ]);
      await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_POLICY_OWNER_DATA, { key: 'status', value: true });

      navigation.dispatch(StackActions.replace(_route));
    } else {
      setIsModalVulnerableWNA(true);
    }
  };

  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const vulnerableWNANumber = useMemo(() => RSQSData?.policyType === 'conventional' ? '150' : '062', [RSQSData?.policyType]);
  const mainParticipant = useMemo(() => checkMainParticipant(RSummaryProposal?.productCode, RSQSData?.policyType, isSelf, true), []);
  const lifeAssured = useMemo(() => checkMainParticipant(RSummaryProposal?.productCode, RSQSData?.policyType), []);

  const handleSummaryPolicy = () => {
    setValue('clientReceiveSummary', { label: t('Epos:yes'), key: 'Y' });
    setIsModalPolicySummary(!isModalPolicySummary);
  };

  const isProductPWM = useMemo(() => {
    const product = RSQSData?.product;
    return product?.key === 'H14' || product?.key === 'H15';
  }, []);

  const onDisableSourceIncome = (item: TCommonConstantData | undefined) => {
    return useMemo(() => {
      if (income?.key !== '0') {
        return item?.key === 'noIncome';
      }
      else if (income?.key == '0') {
        setValue('clientSourceIncome', [
          {
            key: 'noIncome',
            label: 'Tidak Berpenghasilan',
          },
        ]);
        return true;
      } else {
        return premiumPaymentCandidate == 'Y' && !!premiumPayorIncomeDataSQS;
      }
    }, [income]);
  };

  const mailingAddressHandler = (value: string) => {
    const clientCompanyAddress = getValues('clientCompanyAddress');
    const clientCompanyAbroad = getValues('clientCompanyAbroad');
    const clientCompanyPostCode = getValues('clientCompanyPostCode');
    const clientCompanyDistrict = getValues('clientCompanyDistrict');
    const clientCompanyUrbanVillage = getValues('clientCompanyUrbanVillage');
    const clientCompanyProvice = getValues('clientCompanyProvice');
    const clientCompanyCity = getValues('clientCompanyCity');
    const clientResidenceAdress = getValues('clientResidenceAdress');
    const clientResidenceAbroad = getValues('clientResidenceAbroad');
    const clientResidencePostCode = getValues('clientResidencePostCode');
    const clientResidenceDistrict = getValues('clientResidenceDistrict');
    const clientResidenceUrbanVillage = getValues('clientResidenceUrbanVillage');
    const clientResidenceProvince = getValues('clientResidenceProvince');
    const clientResidenceCity = getValues('clientResidenceCity');

    const companyAboard = companyLocation.key === 'AB' ? clientCompanyAbroad : clientCompanyAddress;
    const residenceAboard = residenceLocation.key === 'AB' ? clientResidenceAbroad : clientResidenceAdress;

    const officeAddressInformation =
      companyLocation.key === ''
      || clientCompanyAddress === ''
      || companyAboard === ''
      || clientCompanyPostCode === ''
      || clientCompanyDistrict === ''
      || clientCompanyUrbanVillage === ''
      || clientCompanyProvice?.key === ''
      || clientCompanyCity === '';

    const residenceAddressInformation =
      residenceLocation.key === ''
      || clientResidenceAdress === ''
      || residenceAboard === ''
      || clientResidencePostCode === ''
      || clientResidenceDistrict === ''
      || clientResidenceUrbanVillage === ''
      || clientResidenceProvince?.key === ''
      || clientResidenceCity === '';


    if (officeAddressInformation && value === 'O') {
      alertHandler(true, 'Kantor');
      setValue('clientResidenceMailingAddress', DEFAULT_OPTIONAL_DATA);
    }
    if (residenceAddressInformation && value === 'H') {
      alertHandler(true, 'Tempat Tinggal');
      setValue('clientResidenceMailingAddress', DEFAULT_OPTIONAL_DATA);
    }
  };

  const alertHandler = (status: boolean, detailDesc?: string) => {
    let value = {
      key: false,
      title: '',
      label: '',
    };
    if (status) value = {
      key: true,
      title: 'Perhatian',
      label: `Silahkan mengisi Alamat ${detailDesc} terlebih dahulu sebelum dapat memilih Alamat ${detailDesc} sebagai Alamat Surat Menyurat.`

    };
    setAlert(value);
  };

  const onChangeRegionSumatra = useCallback((value: TOptionalCardData, onChange: any) => {
    if (value?.key === 'N') {
      onShowModalCantContinueSPAJ();
      setResidenceSumatera(DEFAULT_OPTIONAL_DATA);
      onChange(DEFAULT_OPTIONAL_DATA);
      return;
    }
    setResidenceSumatera(value);
    onChange(value);
  }, [setResidenceSumatera]);

  const onChangeNiasCard = useCallback((value: TOptionalCardData, onChange: any) => {
    if (value?.key === 'Y') {
      onShowModalCantContinueSPAJ();
      setResidenceNiasIdcard(DEFAULT_OPTIONAL_DATA);
      onChange(DEFAULT_OPTIONAL_DATA);
      return;
    }
    setResidenceNiasIdcard(value);
    onChange(value);
  }, [setResidenceNiasIdcard]);

  const onChangeClientCompanyLocation = (value: TCommonConstantData, onChange: (value: TCommonConstantData) => void) => {
    setCompanyLocation(value);
    onChange(value);
  };
  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          <NumberTitle number="1" text={`1/${SPAJDataInfo?.length} ${t('Epos:data_information')}`} />
          <Text style={plaiStyles.fontHeaderTitle}>
            {isSelf ? `${t('Epos:prospective_policyholder')} (${mainParticipant})` : t('Epos:prospective_policyholder')}
          </Text>
          <ScrollView>
            <SectionTitle text={t('Epos:personal_information')} />

            <Controller
              name={VALIDATION?.clientName.name}
              control={control}
              rules={VALIDATION.clientName.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:fullname')}
                  placeholder={t('Epos:enter_customer_name')}
                  disabled={true}
                  value={value}
                  setValue={(val) => onChange(onChangeNameFormating(val))}
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
                  disabled={true}
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
                  search={{
                    isOnChangeSearch: true,
                  }}
                  data={REGION_PHONE_CODE}
                  selected={value}
                  onSelected={onChange}
                  error={errors.clientCountryBirth}
                  onDisabled={isOCRFinish}
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
                  search={{
                    isOnChangeSearch: true,
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
                  onDisabled={true}
                  error={errors.clientMaritalStatus}
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
                  onDisabled={true}
                  id="dropdown-client-last-education"
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
                  value={value}
                  setValue={onChange}
                  error={errors.clientEmail}
                  additionalInfo={
                    <TextDecoration
                      label={wording.email_disclaimer.ph}
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
                    label={t('Epos:idcard_type')}
                    required={true}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={idcard?.filter((item) => item.key === 'idcard')}
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
              <>
                <Controller
                  name={VALIDATION.clientIdCardNumber.name}
                  control={control}
                  rules={VALIDATION.clientIdCardNumber.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:idcard_number')}
                      placeholder={t('Epos:enter_number')}
                      value={value}
                      maxLength={16}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      error={errors.clientIdCardNumber}
                      keyboardType="phone-pad"
                      editable={!isOCRFinish}
                      additionalInfo={!errors.clientIdCardNumber?.message ? 'Pastikan No. Kartu Identitas Diri Anda sesuai dengan KTP' : ''}
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
                    setMassApplies(value);
                    onChange(value);
                  }}
                  error={errors?.clientMassApplies}
                  onDisabled={() => isOCRFinish}
                  uniqueTestId='lifetime-validity-period'
                />
              )}
            />

            {massApplies?.key == 'N' && (
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
              name={VALIDATION.clientTaxDomicileStatus.name}
              control={control}
              rules={VALIDATION.clientTaxDomicileStatus.rule}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <OptionCard
                      label={t('Epos:tax_domicile_status')}
                      required={true}
                      data={statusTaxList?.filter((item) => (isProductPWM ? item?.key === 'IT' : item))}
                      type="checkbox"
                      theme="border"
                      selected={value}
                      onSelected={(item) => {
                        setTaxStatus(setMultipleSelect([...value], item, 'key'));
                        onChange(setMultipleSelect([...value], item, 'key'));
                      }}
                      error={errors?.clientTaxDomicileStatus}
                      uniqueTestId='tax-domicile-status'
                    />

                    {value.map(
                      (item: TOptionalCardData) =>
                        item.key === 'TOI' && (
                          <View
                            style={[
                              plaiStyles.bgOrangeThin,
                              plaiStyles.mt12,
                              plaiStyles.br8,
                              plaiStyles.px12,
                              plaiStyles.py8,
                              plaiStyles.br4,
                            ]}
                          >
                            <Text style={[plaiStyles.fontYellow, plaiStyles.font12]}>
                              {t('Epos:fiil_self_declaration')}
                            </Text>
                          </View>
                        ),
                    )}
                  </>
                );
              }}
            />

            {taxStatus?.map(
              (item) =>
                item.key === 'IT' && (
                  <>
                    <Controller
                      name={VALIDATION.clientNpwp.name}
                      control={control}
                      rules={VALIDATION.clientNpwp.rule}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <OptionCard
                            label="NPWP"
                            required={true}
                            style={[plaiStyles.flex, plaiStyles.row]}
                            insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                            theme="border"
                            data={statement}
                            selected={value}
                            onSelected={(value: TOptionalCardData) => {
                              setNpwpStatus(value);
                              onChange(value);
                            }}
                            error={errors?.clientNpwp}
                            uniqueTestId={`client-npwp-${item.title}`}
                          />
                        </>
                      )}
                    />

                    {npwpStatus?.key === 'N' ? (
                      <>
                        <Controller
                          name={VALIDATION.clientAsideFromNpwp.name}
                          control={control}
                          rules={VALIDATION.clientAsideFromNpwp.rule}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <OptionCard
                                label={t('Epos:reason_not_having_npwp')}
                                required={true}
                                theme="border"
                                data={asideFromNPWPList}
                                selected={value}
                                onSelected={onChange}
                                error={errors?.clientAsideFromNpwp}
                                uniqueTestId={`client-reason-npwp-${item.title}`}
                              />
                              <NoticeBar message={wording?.not_having_npwp_disclaimer} />
                            </>
                          )}
                        />
                      </>
                    ) : npwpStatus?.key === 'Y' ? (
                      <>
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
                              id={`input-client-npwp-number-${item.title}`}
                            />
                          )}
                        />

                        <Controller
                          name={VALIDATION.clientIsNpwpHolder.name}
                          control={control}
                          rules={VALIDATION.clientIsNpwpHolder.rule}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <OptionCard
                                label="Apakah Nama di NPWP sama dengan Pemegang Polis ?"
                                required={true}
                                style={[plaiStyles.flex, plaiStyles.row]}
                                insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                                theme="border"
                                data={statement}
                                selected={value}
                                onSelected={(value: TOptionalCardData) => {
                                  setIsNpwpHolder(value);
                                  onChange(value);
                                }}
                                error={errors?.clientIsNpwpHolder}
                                uniqueTestId={`is-npwp-name-same-as-ph-${item.title}`}
                              />
                            </>
                          )}
                        />

                        {isNpwpHolder?.key === 'N' && (
                          <Controller
                            name={VALIDATION.clientNpwpHolder.name}
                            control={control}
                            rules={VALIDATION.clientNpwpHolder.rule}
                            render={({ field: { onChange, value } }) => (
                              <InputField
                                label={t('Epos:npwp_holder')}
                                placeholder={t('Epos:enter_name')}
                                maxLength={60}
                                value={value}
                                setValue={(value) => onChange(onChangeNameFormating(value))}
                                error={errors.clientNpwpHolder}
                                id={`input-client-npwp-holder-${item.title}`}
                              />
                            )}
                          />
                        )}
                      </>
                    ) : null}
                  </>
                ),
            )}

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
                  onSelected={(value) => {
                    setOccupation(value);
                    onChange(value);
                  }}
                  onDisabled={isSelf}
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
                  disabled={checkOccupation}
                  value={value}
                  setValue={onChange}
                  error={errors?.clientCompanyName}
                  maxLength={60}
                  additionalInfo={errors.clientCompanyName?.message ? '' : t('Epos:company_name_info')}
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
                  required={!checkOccupation}
                  style={[plaiStyles.flex, plaiStyles.row]}
                  insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                  theme="border"
                  data={locationList}
                  onDisabled={() => checkOccupation}
                  selected={value}
                  onSelected={(value) => {
                    onChangeClientCompanyLocation(value as TCommonConstantData, onChange);
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
                  label={t('Epos:company_address')}
                  placeholder={t('Epos:enter_address')}
                  disabled={checkOccupation}
                  maxLength={44}
                  value={value}
                  setValue={(value) => onChange(residenceAddressFormatText(value))}
                  error={errors.clientCompanyAddress}
                  additionalInfo={t('Epos:company_address_info')}
                  rightItem={'counter'}
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
              rules={ValidationForm({ isRequired: !checkOccupation })}
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
                  selected={value}
                  onSelected={onChange}
                  error={errors.clientCompanyProvice}
                  required={!checkOccupation}
                  onDisabled={checkOccupation}
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
                        style={[plaiStyles.py8, plaiStyles.borderGreycc]}
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

            <SectionTitle text={t('Epos:residence_information')} />

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
                  maxLength={44}
                  value={value}
                  setValue={(val) => onChange(residenceAddressFormatText(val))}
                  error={errors.clientResidenceAdress}
                  rightItem="counter"
                  id='input-client-residence-address'
                />
              )}
            />

            <Controller
              name={VALIDATION.clientResidenceNeighbourdhood1.name}
              control={control}
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
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:neighbourdhood2')}
                  required={false}
                  placeholder={t('Epos:enter_neighbourdhood2')}
                  maxLength={3}
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
                    onZipCodeAutoFill(setValue, ['clientResidenceDistrict', 'clientResidenceProvince', 'clientResidenceCity'], value);
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
                          required={false}
                          maxLength={12}
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
                        style={[plaiStyles.py8, plaiStyles.borderGreycc]}
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

            <View style={[plaiStyles.bgBlue, plaiStyles.flex, plaiStyles.row, plaiStyles.py8, plaiStyles.pr32, plaiStyles.pl14, plaiStyles.mt24, plaiStyles.br8]}>
              <Image style={[plaiStyles.mr8, plaiStyles.mt4]} source={infoBlue} />
              <Text style={[plaiStyles.fontBlue]}>
                <TextDecoration label={t('Epos:info_blue_phone_number')} />
              </Text>
            </View>

            <Controller
              name={VALIDATION.clientResidenceMailingAddress.name}
              control={control}
              rules={VALIDATION.clientResidenceMailingAddress.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: t('Epos:mailing_address'),
                    placeholder: t('Epos:select_address'),
                  }}
                  data={mailingAddressList}
                  selected={value}
                  onSelected={(value) => {
                    setMailingAddress(value);
                    onChange(value);
                    mailingAddressHandler(value.key);
                  }}
                  error={errors.clientResidenceMailingAddress}
                  id="dropdown-mailing-address"
                />
              )}
            />

            {mailingAddress?.key === 'OT' && (
              <>
                <Controller
                  name={VALIDATION.clientOtherResidenceLocation.name}
                  control={control}
                  rules={VALIDATION.clientOtherResidenceLocation.rule}
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
                        setOtherResidenceLocation(value);
                        onChange(value);
                      }}
                      error={errors?.clientOtherResidenceLocation}
                      uniqueTestId='other-residence-location'
                    />
                  )}
                />

                {otherresidenceLocation?.key === 'AB' && (
                  <Controller
                    name={VALIDATION.clientOtherResidenceAbroad.name}
                    control={control}
                    rules={VALIDATION.clientOtherResidenceAbroad.rule}
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
                        error={errors.clientOtherResidenceAbroad}
                        id="dropdown-abroad-location"
                      />
                    )}
                  />
                )}

                <Controller
                  name={VALIDATION.clientOtherResidenceAdress.name}
                  control={control}
                  rules={VALIDATION.clientOtherResidenceAdress.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:residence_address')}
                      placeholder={t('Epos:enter_address')}
                      maxLength={44}
                      value={value}
                      setValue={(val) => onChange(residenceAddressFormatText(val))}
                      error={errors.clientOtherResidenceAdress}
                      rightItem="counter"
                      id="input-other-residence"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResidenceNeighbourdhood1.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:neighbourdhood1')}
                      required={false}
                      placeholder={t('Epos:enter_neighbourdhood1')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      error={errors.clientOtherResidenceNeighbourdhood1}
                      keyboardType="phone-pad"
                      id="input-other-residence-neighbourhood1"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResidenceNeighbourdhood2.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:neighbourdhood2')}
                      required={false}
                      placeholder={t('Epos:enter_neighbourdhood2')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      error={errors.clientOtherResidenceNeighbourdhood2}
                      keyboardType="phone-pad"
                      id="input-other-residence-neighbourhood2"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResideceKilometer.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'KM'}
                      required={false}
                      placeholder={t('Epos:enter_km')}
                      maxLength={3}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value, true))}
                      error={errors.clientOtherResideceKilometer}
                      keyboardType="phone-pad"
                      id="input-other-residence-kilometer"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResidencePostCode.name}
                  control={control}
                  rules={VALIDATION.clientOtherResidencePostCode.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:post_code')}
                      placeholder={t('Epos:enter_post_code')}
                      maxLength={5}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value))}
                      onBlur={() => {
                        onZipCodeAutoFill(setValue, ['clientOtherResidenceDistrict', 'clientOtherResidenceProvince', 'clientOtherResidenceCity'], value);
                      }}
                      error={errors.clientOtherResidencePostCode}
                      keyboardType="phone-pad"
                      id="input-other-residence-postcode"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResidenceDistrict.name}
                  control={control}
                  rules={VALIDATION.clientOtherResidenceDistrict.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:district')}
                      placeholder={t('Epos:enter_district')}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientOtherResidenceDistrict}
                      id="input-other-residence-district"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResidenceUrbanVillage.name}
                  control={control}
                  rules={VALIDATION.clientOtherResidenceUrbanVillage.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:urban_village')}
                      placeholder={t('Epos:enter_urban_village')}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientOtherResidenceUrbanVillage}
                      id="input-other-residence-urban-village"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResidenceProvince.name}
                  control={control}
                  rules={VALIDATION.clientOtherResidenceProvince.rule}
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
                      error={errors.clientOtherResidenceProvince}
                      id="dropdown-other-residence-province"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientOtherResidenceCity.name}
                  control={control}
                  rules={VALIDATION.clientOtherResidenceCity.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:city_regency')}
                      placeholder={t('Epos:enter_city')}
                      value={value}
                      maxLength={40}
                      setValue={(value) => onChange(sanitizedLetterText(value))}
                      error={errors.clientOtherResidenceCity}
                      id="input-other-residence-city"
                    />
                  )}
                />

                {clientOtherResidencePhoneNumbers?.fields?.map((field: any, index: number) => {
                  return (
                    <React.Fragment key={field.id}>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                        {t('Epos:home_phone_number')}
                      </Text>
                      <View style={[plaiStyles.flex, plaiStyles.row]}>
                        <Controller
                          name={`clientOtherResidencePhoneNumbers.${index}.clientOtherResidencePhoneNumberCode`}
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
                                id={`dropdown-other-residence-phone-code-${index}`}
                              />
                            );
                          }}
                        />
                        <Controller
                          name={`clientOtherResidencePhoneNumbers.${index}.clientOtherResidencePhoneNumber`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <InputField
                              maxLength={12}
                              containerStyle={[plaiStyles.flex, plaiStyles.ml8, plaiStyles.mt0]}
                              placeholder={t('Epos:enter_phone_number')}
                              value={value}
                              setValue={(item) => onChange(sanitizedText(item))}
                              keyboardType="phone-pad"
                              id={`input-other-residence-phone-number-${index}`}
                            />
                          )}
                        />
                        {clientOtherResidencePhoneNumbers?.fields?.length > 1 && (
                          <Button
                            style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                            textStyle={plaiStyles.fontGrey33}
                            text={t('Calculator:remove')}
                            onPress={() => clientOtherResidencePhoneNumbers?.remove(index)}
                          />
                        )}
                      </View>
                      <Text style={[plaiStyles.fontGrey99, plaiStyles.font12]}>Contoh: 21xxxxxxx</Text>
                      {errors?.clientOtherResidencePhoneNumbers?.[index]?.clientOtherResidencePhoneNumber && (
                        <Text style={[plaiStyles.mt8, plaiStyles.fontRed, plaiStyles.font12]}>
                          {errors?.clientOtherResidencePhoneNumbers?.[index]?.clientOtherResidencePhoneNumber?.message}
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
                      clientOtherResidencePhoneNumbers?.fields,
                      clientOtherResidencePhoneNumbers?.append,
                      { clientOtherResidencePhoneNumberCode: defaultPhoneCode, clientOtherResidencePhoneNumber: '' },
                      'Maksimal Nomor Telepon Rumah 5'
                    )
                  }
                />
              </>
            )}

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
                            onChangeRegionSumatra(value, onChange);
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
                            onChangeNiasCard(value, onChange);
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
                  onDisabled={true}
                  selected={value}
                  onSelected={(item) => {
                    onChange(item);
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
            />
            <Controller
              name={VALIDATION.clientSourceIncome.name}
              control={control}
              rules={VALIDATION.clientSourceIncome.rule}
              render={({ field: { onChange, value } }) => (
                <View style={[plaiStyles.mt24]}>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                    {String(t('Epos:source_income_fund_per_month'))}
                  </Text>
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
                    // onDisabled={() => premiumPaymentCandidate == 'Y' && !!premiumPayorIncomeDataSQS}
                    onDisabled={(item) => onDisableSourceIncome(item) as boolean}
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
                        setValue={(val) => onChange(sanitizeTextLetterAndNumber(val))}
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
                        setValue={(val) => onChange(sanitizeTextLetterAndNumber(val))}
                        error={errors.clientOtherSourceIncome}
                        id="input-income-other-source"
                      />
                    )}
                  />
                )}
              </>
            ))}

            {premiumPaymentCandidate == 'Y' && !!premiumPayorIncomeDataSQS && (
              <>
                <Controller
                  name={VALIDATION.clientSecondIncome.name}
                  control={control}
                  rules={VALIDATION.clientSecondIncome.rule}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:total_other_income_per_month'),
                        placeholder: t('Epos:select_total_income'),
                      }}
                      keyMap={{
                        search: 'label',
                      }}
                      data={SALARY_RANGE_DATA}
                      onDisabled={true}
                      selected={value}
                      onSelected={(item) => {
                        onChange(item);
                        setIncome(item);
                      }}
                      error={errors.clientSecondIncome}
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.clientSecondSourceIncome.name}
                  control={control}
                  rules={VALIDATION.clientSecondSourceIncome.rule}
                  render={({ field: { onChange, value } }) => (
                    <View style={[plaiStyles.mt24]}>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                        {String(t('Epos:other_source_income_per_month'))}
                      </Text>
                      <CheckboxGroup
                        data={OCCUPATION_SIMPLE}
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
                        onDisabled={() => true}
                        error={errors?.clientSecondSourceIncome}
                      />
                    </View>
                  )}
                />

                {secondSourceIncome?.map((item) => (
                  <>
                    {item.key === 'investment' && (
                      <Controller
                        name={VALIDATION.clientSecondInvesmentSourceIncome.name}
                        control={control}
                        rules={VALIDATION.clientSecondInvesmentSourceIncome.rule}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:invesment')}
                            placeholder={t('Epos:enter_invesment')}
                            value={value}
                            setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                            disabled={true}
                            error={errors.clientSecondInvesmentSourceIncome}
                          />
                        )}
                      />
                    )}
                    {item.key === 'personalBusiness' && (
                      <Controller
                        name={VALIDATION.clientSecondPersonalBusinessSourceIncome.name}
                        control={control}
                        rules={VALIDATION.clientSecondPersonalBusinessSourceIncome.rule}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:personal_business')}
                            placeholder={t('Epos:enter_personal_business')}
                            value={value}
                            setValue={(val) => onChange(sanitizeTextLetterAndNumber(val))}
                            disabled={true}
                            error={errors.clientSecondPersonalBusinessSourceIncome}
                          />
                        )}
                      />
                    )}

                    {item.key === 'other' && (
                      <Controller
                        name={VALIDATION.clientSecondOtherSourceIncome.name}
                        control={control}
                        rules={VALIDATION.clientSecondOtherSourceIncome.rule}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:other')}
                            placeholder={t('Epos:enter_other')}
                            value={value}
                            setValue={(val) => onChange(sanitizeTextLetterAndNumber(val))}
                            disabled={true}
                            error={errors.clientSecondOtherSourceIncome}
                          />
                        )}
                      />
                    )}
                  </>
                ))}
              </>
            )}

            <InfoBar variant='warn' withIcon={true} iconStyle='style 2' isUseHtmlFormatText={true} content={wording.pdp_notice_bar_PH} />

            <SectionTitle text={t('Epos:policy')} />

            <OptionCard
              label='Format Polis'
              required={true}
              style={[plaiStyles.flex, plaiStyles.row]}
              insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
              theme="border"
              data={[{ label: 'Polis Elektronik', key: 'polisElektronik' }]}
              selected={{ label: 'Polis Elektronik', key: 'polisElektronik' }}
              onSelected={() => { }}
            />

            <Controller
              name={VALIDATION.clientPolicyType.name}
              control={control}
              rules={VALIDATION.clientPolicyType.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <AgreementPolicyElectronic
                    label={t('Epos:you_agreeto_have_your_policy_sent_electronic', { spaj: wording.spaj })}
                    isSelected={value}
                    onPress={() => onChange(!value)}
                    {...pruTestID('button-electronic-policy')}
                    error={errors?.clientPolicyType}
                  />
                </>
              )}
            />


            <NoticeBar message={t('Epos:prospective_policyholders_have_fourteen_calendar_days', { lifeAssured })} />

            <Text style={[plaiStyles.fontGrey33, plaiStyles.mt24, plaiStyles.lineH24]}>
              <>
                {t('Epos:questions_receiving_summary')}
                <Text style={plaiStyles.fontRed}> *</Text>
              </>
            </Text>

            <PolicyPrintConditions
              onOpenModal={() => setIsModalPolicySummary(true)}
              visible={isModalPolicySummary}
              setVisibe={() => setIsModalPolicySummary(!isModalPolicySummary)}
              data={summaryPolicyList(wording?.premiContribution)}
              onCloseModal={handleSummaryPolicy}
            />

            <Controller
              name={VALIDATION.clientReceiveSummary.name}
              control={control}
              rules={VALIDATION.clientReceiveSummary.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    required={true}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={statement}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.clientReceiveSummary}
                    uniqueTestId='receive-summary'
                  />
                </>
              )}
            />

            {/* Other Information Section */}
            <SectionTitle text={t('Epos:another_information')} />
            <View style={[plaiStyles.flex]}>
              <Text style={[plaiStyles.fontGrey33, plaiStyles.mt24, plaiStyles.lineH20]}>
                {t('Epos:other_infromation_relation_question',
                  {
                    companyName: `${wording.companyName}${wording.additionalCompanyName ? ` ${wording.additionalCompanyName}` : ''}`,
                    mainParticipant
                  })}
              </Text>
              {/* <Text style={plaiStyles.fontRed}> *</Text> */}
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
                <NoticeBar img={true} message={t('Epos:employee_notes', { companyName: `${wording.companyName}${wording.additionalCompanyName ? ` ${wording.additionalCompanyName}` : ''}` })} />
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
                      keyboardType='numeric'
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
              })
                : maxPhone.message}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => {
                  isModalVulnerableWNA ? toggleVulnerableWNA() : setMaxPhone({ isMaxPhone: false, message: maxPhone.message });
                },
              }}
            />
            <ModalInformation
              visible={alert?.key as boolean}
              title={alert?.title as string}
              desc={alert?.label as string}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => {
                  alertHandler(false);
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
