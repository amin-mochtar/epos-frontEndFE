import { View, Text, ScrollView, BackHandler, Pressable, Image } from 'react-native';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import {
  paymentFreqList,
  statement,
  CHANNEL,
  COVERAGE,
  COVERAGERULE,
  statementApproval,
  TCommonOptionalData,
  currencyList,
  defaultOptionalData,
  TBenefitsType,
  BANK_LIST,
  minMaxSalaryData,
  ICommonObjectData,
  ICustomerStorage,
  ISQSDetail,
  TParamME,
  WR_SHARIA_CONVENT,
  TObjectSQSByKey,
  productType,
  calculateAge,
  // calculationUnapplied,
  // calculationIlustration
} from '../../../utilities';
import { EposFooter, EposHeader, OptionCard, SectionTitle, TOptionalCardData, HeaderTitle } from '../../../components';
import { EposRoutes } from '../../../navigation';
import {
  Controller,
  FieldArrayWithId,
  RegisterOptions,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { cStyles } from './calculator.style';
import { useTranslation, Trans } from 'react-i18next';
import { TAlertBar, TCalculateForm, TCheckPremiParams, TCoverageRule, TCoverageRuleMessage, TMasterData, defaultBenefitsValue, defaultTCalculateForm } from './calculator.type';
import { VALIDATION } from './validation/validation';
import { BottomSheet, NoticeBar, PWMAlert, SelectionChangeBenefit } from './components';
import {
  DropdownField,
  InputField,
  ModalContainer,
  TCheckboxData,
  numberWithCommas,
  onChangeNumber,
  plaiStyles,
  setMultipleSelect,
  InputDate,
  sanitizedLetterText,
  sanitizedText,
  TDropdownField,
  TInputField,
  ModalInformation,
  TextDecoration,
  LoadingFull,
  GlobalPromptModal,
} from 'plai_common_frontend';
import { PruColor, PruScreen } from 'common_ui_components';
import { Button } from 'common_ui_components/app/components-ui';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import Icon from 'react-native-vector-icons/Foundation';
import { isEmpty } from 'lodash';
import { LIST_INPUT, INPUT, MASA_PERTANGGUNGAN, MASA_PERTANGGUNGAN_RIDER } from './calculator.data';
import { warning_icon } from '../../../assets';
import { checkMaximumPremi, DISABLED_ANNUAL_PREMI, RELEASE_DATE, replacePlaceholderInMessage, shouldShowNoticeBar } from './calculator.config';
import { pruTestID } from 'common_services_frontend';
import moment from 'moment';
import { calculationUnapplied, calculationIlustration, generateParamME } from "epos_utilities/src/newbusiness";
import { DEFAULT_SUBSTANDARD } from '../substandart/substandard.data';
/**
 * ISSUE OR NO
 * Masa Pertanggungan Benefits masih bisa lebih dari masa pertanggungan product?
 *
 */

export const CalculatorScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const params = route.params as { sqsState: string; } | undefined;
  const navigation = useNavigation();
  const { selectedSQSId, proposalId, isDoksul } = useSelector<RootState, EposState>((state) => state.epos);
  const [visible, setVisible] = useState<boolean>(false);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const {
    onUpdateCustomer,
    updateSummaryByKey,
    getMultipleCustomer,
    getCustomerStorageById,
    getSummaryProposalById,
    updateSQSByKey,
    onUpdateSQS
  } = useEposRealm();
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);

  const [masterData, setMasterData] = useState<TMasterData>({
    benefits: [],
    minBackDate: '',
    paymentFrequency: [],
    coverageRule: {},
  });
  const [calcData, setCalcData] = useState({
    premi: '0',
    premiUnapplied: '0',
    minSumAssured: '0',
    maxSumAssured: '0',
    minusUnapplied: false,
  });
  const [resultCaclulator, setResultCaclulator] = useState('');
  const [benefitsData, setBenefitsData] = useState({
    roomList: [],
    saverList: [],
  });
  const [backDate, setBackDate] = useState<TOptionalCardData>({
    key: '',
    label: '',
  });
  const [benefitsDetail, setBenefitsDetail] = useState({
    visible: false,
    code: 'U12R',
  });
  const [flagCalculate, setFlagCalculate] = useState(false);
  const [feeAdmin, setFeeAdmin] = useState('Y');
  const [coverageRuleSelected, setCoverageRuleSelected] = useState<TCoverageRuleMessage>({});
  const [selectedBenefits, setSelectedBenefits] = useState<{ current: TCheckboxData[]; before: TCheckboxData[]; }>({
    current: [],
    before: [],
  });
  const [visibleChangeBenefits, setVisibleChangeBenefits] = useState(false);
  const [approveSubstandard, setApproveSubstandar] = useState(true);
  const [waitingPeriodType, setWaitingPeriodType] = useState(JSON.parse(RSQSData?.waitingPeriodType!));
  const [alert, setAlert] = useState<{ bar: TAlertBar[]; blocked: number; }>({
    bar: [],
    blocked: 0,
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<string>('');
  const [maximumPremiAlert, setMaximumPremiAlert] = useState(false);
  const [paramMEState, setParamMEState] = useState<TParamME | null>(null);
  const isSharia = useMemo(() => RSQSData?.policyType === 'sharia', []);
  const [loadingIllustrationCalc, setLoadingIllustrationCalc] = useState<boolean>(false);
  const [disableFrequency, setDisableFrequency] = useState<boolean>(false);
  const [allCustomerDataState, setCustomerDataState] = useState<ICustomerStorage[]>([]);
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    watch,
  } = useForm<TCalculateForm>({
    defaultValues: useMemo(() => {
      let result = defaultTCalculateForm;
      if (RSQSData != null && RSQSData.calculator) {
        result = JSON.parse(RSQSData.calculator!);
        if (result?.approvalSubstandard?.key === "N") {
          setApproveSubstandar(false)
        }
      } else {
        const _clientId = RSQSData?.clientIdSelected[0];
        const _customerData = getCustomerStorageById(_clientId as string);
        result.frequencyPayment = _customerData?.clientPayment!;

        result.regularPremium = _customerData?.clientBudget!;
        const clientPayment = _customerData?.clientPayment?.key ? Number(_customerData?.clientPayment?.key) : 12;
        result.annualPremium = numberWithCommas(
          (parseInt(_customerData?.clientBudget.replace(/\./g, '')!) * clientPayment).toString(),
        );
      }
      setFeeAdmin(result.feeAdministration.key as string);
      setCalcData((prev) => {
        return { ...prev, premi: result.regularPremium };
      });

      if (result?.backdate?.key === 'Y') {
        const newBackdate: TOptionalCardData = { key: result.backdate.key, label: result.backdate.label };
        setBackDate(newBackdate);
      }
      return result as TCalculateForm;
    }, []),
  });
  const frequencyPaymentSelected = useMemo(() => getValues('frequencyPayment'), [getValues('frequencyPayment')]);
  const educationBenefitPeriod = watch('educationBenefitPeriod');
  const [ageData, setAge] = useState({
    age1: getValues('age1'),
    age2: getValues('age2'),
    age3: getValues('age3'),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'benefits',
  });

  const {
    fields: mainBenefitsFields,
    append: mainBenefitsAppend,
    replace: mainBenefitsReplace,
  } = useFieldArray({
    control,
    name: 'mainBenefits',
  });

  const {
    fields: topupBenefitsFields,
    append: topupBenefitsAppend,
    replace: topupBenefitsReplace,
  } = useFieldArray({
    control,
    name: 'topupBenefits',
  });


  const removeRiderIsNotExistOnFields = (
    additionalBenefits: ICommonObjectData[] | undefined,
    fields: FieldArrayWithId<TCalculateForm, 'benefits', 'id'>[],
  ) => {
    if (isEmpty(additionalBenefits)) {
      remove();
    } else if (additionalBenefits && fields.length > 0) {
      const additionalBenefitsKey = additionalBenefits.map((val) => val.key);
      fields.map((field, index) => {
        if (!additionalBenefitsKey.includes(field?.benefitsCode)) {
          remove(index);
        }
      });
    }
  };

  /**
   * Set Data Dependency Not Change
   */
  const {
    PRODUCT,
    BENEFITS,
    TOPUP_BENEFITS_DATA,
    SUBSTANDARD,
    Currency,
    PRODUCT_UNIT_LINK,
    MAIN_BENEFITS,
    MAIN_BENEFITS_DATA,
    TOPUP_BENEFITS,
    PRODUCT_PWM,
    isPrucerah,
    MASA_TUNGGU_MANFAAT_PENDIDIKAN,
    FORM_AGE,
    PAYMENT_TERM_PLAN,
    BACK_DATE_PREMI,
    ONE_TIME_PAYMENT,
    WORDING
  } = useMemo(() => {
    const _substandard = RSQSData?.substandar ? JSON.parse(RSQSData.substandar) : DEFAULT_SUBSTANDARD;
    if (_substandard?.substandard?.length == 0 || _substandard?.substandard?.[0]?.code === '') {
      setValue('approvalSubstandard', defaultOptionalData);
    }
    // add service/function that add conditions Additional Benefits with Fields if there is no same key remove it by index slice
    const _product = RSQSData?.product;
    const _benefitsTopup = RSQSData?.topupAdditionalBenefits!;
    let MASA_TUNGGU_MANFAAT_PENDIDIKAN = []
    for (let start = 8; start <= 18; start++) {
      MASA_TUNGGU_MANFAAT_PENDIDIKAN.push({
        label: start.toString(),
        key: start.toString(),
      });
    }
    return {
      PRODUCT: _product,
      BENEFITS: RSQSData?.additionalBenefits || [],
      TOPUP_BENEFITS_DATA: _benefitsTopup.length > 0 ? _benefitsTopup[0] : { key: '', label: '' },
      SUBSTANDARD: RSQSData?.substandar ? JSON.parse(RSQSData.substandar) : DEFAULT_SUBSTANDARD.substandards[0],
      PRODUCT_UNIT_LINK: CHANNEL[_product?.key!]?.productCategory === 'UL',
      PRODUCT_PWM: _product?.key == 'H14' || _product?.key == 'H15',
      Currency: (
        <Text style={[plaiStyles.fontGrey66, plaiStyles.font16]}>
          {allCustomerData?.[0]?.clientCurrency?.label || 'IDR'}
        </Text>
      ),
      MAIN_BENEFITS: LIST_INPUT[RSQSData?.mainAdditionalBenefits![0].key!].inputList,
      MAIN_BENEFITS_DATA: RSQSData?.mainAdditionalBenefits![0]!,
      TOPUP_BENEFITS: _benefitsTopup.length > 0 ? LIST_INPUT[_benefitsTopup[0].key].inputList : [],
      isPrucerah: _product?.key === 'E1O' || _product?.key === 'E1OP',
      MASA_TUNGGU_MANFAAT_PENDIDIKAN,
      FORM_AGE: ['L1Q', 'U13', 'U12', 'T1Q', 'L1WR', 'L1WD'].includes(_product?.key || ''),
      PAYMENT_TERM_PLAN: ['L1Q', 'T1Q', 'L1WR', 'L1WD'].includes(_product?.key || ''),
      BACK_DATE_PREMI: !['L1Q', 'E1O', 'E1OP', 'T1Q', 'T1P', 'L1WR', 'L1WD'].includes(_product?.key || ''),
      ONE_TIME_PAYMENT: ['T1P', 'U17R', 'U17D'].includes(_product?.key || ''),
      WORDING: WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional']
    };
  }, [RSQSData]);

  const paymentPeriodMemo = useMemo(() => {
    let paymentPeriodData: { label: string; key: string }[] = [];
    const age = allCustomerData[RSQSData?.lifeAssuredSelf == 'self' ? 0 : 1]?.clientAnb;
    if (age > 1 && age <= 55) {
      paymentPeriodData.push(
        {
          label: '5 Tahun',
          key: '5',
        },
        {
          label: '10 Tahun',
          key: '10',
        },
        {
          label: '15 Tahun',
          key: '15',
        },
      );
    }
    if (age >= 56 && age <= 60) {
      paymentPeriodData.push(
        {
          label: '5 Tahun',
          key: '5',
        },
        {
          label: '10 Tahun',
          key: '10',
        },
      );
    }
    if ((age >= 61 && age <= 70) || age > 70) {
      paymentPeriodData.push({
        label: '5 Tahun',
        key: '5',
      });
    }
    if (['L1WR'].includes(RSQSData?.product?.key || '')
      && age >= 61 && age <= 65
    ) {
      paymentPeriodData.push(
        {
          label: '5 Tahun',
          key: '5',
        },
        {
          label: '10 Tahun',
          key: '10',
        },
      );
    }

    if (['T1Q'].includes(RSQSData?.product?.key || '')) {
      paymentPeriodData.push(
        {
          label: '5 Tahun',
          key: '5',
        },
        {
          label: '10 Tahun',
          key: '10',
        },
        {
          label: '15 Tahun',
          key: '15',
        },
      );
    }

    return paymentPeriodData.filter((item, index, self) =>
      index === self.findIndex(t => t.key === item.key));
  }, [allCustomerData]);

  const paymentPeriodWording = useMemo(() => {
    if (['T1Q', 'T1P', 'L1WR', 'L1WD'].includes(PRODUCT?.key || '')) {
      return {
        title: 'Ilustrasi Masa Pembayaran Premi (tahun)',
        placeholder: 'Pilih',
        titleHeaeder: 'Rencana Masa Pembayaran',
      };
    }
    return {
      title: VALIDATION.paymentPeriod.label!,
      placeholder: VALIDATION.paymentPeriod.placeholder,
      titleHeaeder: 'Rencana Masa Pembayaran',
    };
  }, [PRODUCT?.key]);

  const masaPembayaranKontribusiMemo: any = useMemo(() => {
    let result: TCommonOptionalData = [
      {
        label: '5',
        key: '5',
      },
    ];

    if (educationBenefitPeriod?.key) {
      result.push({
        label: educationBenefitPeriod.label,
        key: educationBenefitPeriod.key,
      });
    }
    return result;
  }, [educationBenefitPeriod]);

  useEffect(() => {
    setInitialData();

    if (!RSQSData?.calculator) {
      const mainBenefits = RSQSData?.mainAdditionalBenefits!;
      const topupBenefits = RSQSData?.topupAdditionalBenefits!;
      if (mainBenefits.length > 0)
        mainBenefitsReplace([{ ...defaultBenefitsValue, benefitsCode: mainBenefits[0].key }]);
      if (topupBenefits.length > 0)
        topupBenefitsReplace([{ ...defaultBenefitsValue, benefitsCode: topupBenefits[0].key }]);
    }

    // validation for billFrequence
    if (RSQSData?.convDataResult !== '') {
      const convDataParse = JSON.parse(RSQSData?.convDataResult!);
      const isPWMs = PRODUCT?.key === 'H14' || PRODUCT?.key === 'H15';
      const validExistingProductConversion = ['H10', 'H11', 'H12', 'H13'];
      const validConversion = validExistingProductConversion.includes(convDataParse?.productCode) && convDataParse.convFlag !== "" && isPWMs;
      const validFrequecy = paymentFreqList.find((item: TCommonOptionalData) => item.key === convDataParse.chdrBillFreq);
      if (validConversion && validFrequecy) {
        setValue('frequencyPayment', validFrequecy);
        setDisableFrequency(true);
      }
    }

    if (['U17R', 'U17D'].includes(PRODUCT?.key ?? '')) {
      const _clientId = RSQSData?.clientIdSelected[0];
      const _customerData = getCustomerStorageById(_clientId as string);

      const sumInsured = numberWithCommas(
        (parseInt(_customerData?.clientBudget.replace(/\./g, '')!) * 1.25).toString(),
      );
      setValue('mainBenefits.0.sumInsured', sumInsured);
    }


    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (params?.sqsState) {
      setAlert({ "bar": [], "blocked": 0 })
      setFlagCalculate(true);
    }
  }, [params?.sqsState])

  useEffect(() => {
    if (fields.length > 0) {
      removeRiderIsNotExistOnFields(RSQSData?.additionalBenefits, fields);
    }
  }, [fields]);

  useEffect(() => {
    // if statement of approval is agree then infromation of bank will reset & if remove all data from substandar
    if (!getValues('approvalSubstandard')?.key || getValues('approvalSubstandard')?.key === 'Y') {
      setValue('bank', defaultOptionalData);
      setValue('branchBank', '');
      setValue('bankAccountNumber', '');
      setValue('bankAccountName', '');
      setValue('bankCurrency', defaultOptionalData);
    }
  }, [getValues('approvalSubstandard')]);

  useEffect(() => {
    if (allCustomerData[0]) {
      getMaximumPremi();
    }
  }, [getValues('annualPremium')]);

  useEffect(() => {
    const parsedCalculator = RSQSData?.calculator ? JSON.parse(RSQSData.calculator) : '';
    if (parsedCalculator) {
      const _benefits = { ...benefitsData };
      const mainBenefits = parsedCalculator?.mainBenefits[0];
      const planRiderVal = mainBenefits?.planRider;

      if (planRiderVal && !isEmpty(planRiderVal) && planRiderVal.key) {
        const roomRider = INPUT[planRiderVal?.value].value;
        const saverRider = INPUT[roomRider[0]?.value].value;
        if (roomRider && roomRider?.length > 0) _benefits.roomList = roomRider;
        if (saverRider && saverRider?.length > 0) _benefits.saverList = saverRider;
        setBenefitsData(_benefits);
      }
    }
  }, []);

  // validate sequential age (PruAnugrah)
  useEffect(() => {
    if (ageData['age1'] && ageData['age2'] && ageData['age3']) {
      const ages = [ageData['age1'], ageData['age2'], ageData['age3']];
      for (let i = 1; i < ages.length; i++) {
        if (ages[i] < ages[i - 1]) {
          setTimeout(() => {
            setValue('age1', '65');
            setValue('age2', '75');
            setValue('age3', '85');
            setAge({
              age1: '65',
              age2: '75',
              age3: '85',
            });
          }, 1500);
        }
      }
    }
  }, [ageData]);

  const onBack = () => {
    const prodReccomendationRule = ['H14', 'H15', 'L1Q', 'C16', 'T1Q', 'T1P', 'L1WR', 'L1WD', 'U17R', 'U17D'];
    const additionalMainInsuredRule = ['E1O', 'E1OP'];
    if (params?.sqsState) {
      navigation.dispatch(StackActions.replace(EposRoutes.QUICK_QUOTE));
    } else if (prodReccomendationRule.includes(PRODUCT?.key ?? '')) {
      onSave(EposRoutes.PRODUCT_RECOMMENDATION);
    } else if (additionalMainInsuredRule.includes(PRODUCT?.key ?? '')) {

      onSave(EposRoutes.MAIN_INSURED_DATA, undefined, {
        lifeAssuredIndex: !RSQSData?.additionalLifeAssuredSelf
          ? 1
          : RSQSData?.additionalLifeAssuredSelf == 'self'
            ? 0
            : 2,
      });
    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.VALIDATION_INCOME));
      onSave(EposRoutes.VALIDATION_INCOME);
    }
    return true;
  };

  const setInitialData = () => {
    const _benefits = getBenefitsCoverageRule();
    const _minBackDate = getMaximumBackDate();
    const _paymentFrequency = getAvailableFrequencyProduct();

    setMasterData({
      benefits: _benefits.benefits,
      minBackDate: _minBackDate,
      paymentFrequency: _paymentFrequency,
      coverageRule: _benefits.coverageRule,
    });

    setValue("frequencyPayment", allCustomerData[0]?.clientPayment)
    generatePremium('freq', allCustomerData[0]?.clientPayment?.key || "12" as string);
    setCustomerDataState(allCustomerData);
  };

  const getMaximumBackDate = () => {
    const minDate = new Date(new Date().setDate(new Date().getDate() - 180));
    const rilisDate = (PRODUCT?.key && RELEASE_DATE[PRODUCT.key]) ? new Date(RELEASE_DATE[PRODUCT.key]) : null;

    if (!rilisDate) return minDate.toString();
    return minDate > rilisDate ? minDate.toString() : rilisDate.toString();
  };

  const getANBByBackdate = (indexCustomer: number, allCustomerData: ICustomerStorage[]) => {
    const backdateValue = watch('backdateValue');
    const backdate = watch('backdate');
    const newCustomersData = JSON.parse(JSON.stringify(allCustomerData));
    const lifeAssuredData: ICustomerStorage = newCustomersData[indexCustomer];
    if (backdate?.key === 'Y') {
      // get data tertanggung utama for anb only for calculate and illus by backdate
      const calculateAge = () => {
        const birthdate = moment(lifeAssuredData.clientDateBirth, 'YYYY-MM-DD');
        const targetDate = moment(backdateValue, 'YYYY-MM-DD');

        if (!birthdate.isValid() || !targetDate.isValid()) {
          return -1;
        }

        const years = targetDate.diff(birthdate, 'years');
        const realBirth = birthdate.add(years, 'years');
        const isTargetLessThanBirthDate = realBirth.year() < targetDate.year();
        const isMonthMoreThanTarget = targetDate.month() > birthdate.month();
        const isMonthEqualAndTargetMoreThanBirth = targetDate.month() === birthdate.month() && targetDate.date() > birthdate.date();
        const hasBirthdayPassed = isTargetLessThanBirthDate || isMonthMoreThanTarget || isMonthEqualAndTargetMoreThanBirth;
        if (hasBirthdayPassed) return years + 1;
        return years;
      };

      const newAnbForLifeAssured = calculateAge();
      lifeAssuredData.clientAnb = newAnbForLifeAssured >= 0 ? newAnbForLifeAssured : lifeAssuredData.clientAnb;
    } else {
      // this is case for in ID "Case Bolak Balik" so need to handle when use backdate and back remove the backdate
      lifeAssuredData.clientAnb = calculateAge(lifeAssuredData.clientDateBirth, true);
    }

    return newCustomersData;
  }

  const getMaximumPremi = () => {
    const premiumPayorIncomeData = RSQSData?.premiumPayorIncomeData! ? JSON.parse(RSQSData?.premiumPayorIncomeData!) : '';
    const rateUSDPremi = 8000 // info from SAE
    const checkParams: TCheckPremiParams = {
      lifeAssured: RSQSData?.lifeAssuredSelf ?? '',
      productKey: PRODUCT.key,
      income: {
        //@ts-ignore
        client: minMaxSalaryData[allCustomerData[0].clientIncome.key]?.max,
        //@ts-ignore
        payer: premiumPayorIncomeData ? minMaxSalaryData[premiumPayorIncomeData?.totalIncome?.key!].max : 0,
      },
      clientBudget: Number(watch('annualPremium').replace(/\./g, '')) * (allCustomerData[0]?.clientCurrency?.key === "USD" ? rateUSDPremi : 1),
      isPolicyHolderIsPremiumPayorSelf: RSQSData?.policyHolderIsPremiumPayor == 'Y',
    };
    const isAlertShow = checkMaximumPremi(checkParams);

    setMaximumPremiAlert(isAlertShow);
    return isAlertShow
  };

  const getAvailableFrequencyProduct = () => {
    const _paymentFreq = CHANNEL[PRODUCT.key].PAYMENT_FREQUENCY;
    const _selectedPaymentFreq: TOptionalCardData[] = [];
    _paymentFreq?.map((item: any) => {
      const tempFreq = paymentFreqList.find((data) => {
        return data.key === item;
      });
      if (tempFreq) _selectedPaymentFreq.push(tempFreq);
    });
    return _selectedPaymentFreq.reverse();
  };

  const getBenefitsCoverageRule = () => {
    const _productConfig = CHANNEL[PRODUCT.key];
    const _benefitsList: TBenefitsType[] = [];
    let _coverageRule: TCoverageRule = {};
    _productConfig?.CURRENCY.COVERAGE.map((item: any) => {
      if (COVERAGE[item.coverageCd].type === 'rider') {
        _benefitsList.push({
          key: item.coverageCd,
          label: COVERAGE[item.coverageCd].longDescription,
        });
        _coverageRule = {
          ..._coverageRule,
          [item.coverageCd]: COVERAGE[item.coverageCd].COVERAGE_GROUP,
        };
      }
    });

    BENEFITS.map((item: TBenefitsType) => {
      onSelectedChangeRider({ key: item.key!, label: item.label }, _coverageRule, true);
    });

    return {
      coverageRule: _coverageRule,
      benefits: _benefitsList,
    };
  };

  const onChangeAge = (key: 'age1' | 'age2' | 'age3', value: string) => {
    if (['L1Q'].includes(RSQSData?.product?.key || '')) {
      setAge({ ...ageData, [key]: value });
    }
  };

  /** Can Refactor */
  const onSelectedChangeRider = (
    benefits: TOptionalCardData,
    coverageRule?: TCoverageRule,
    init?: boolean,
    formClose?: boolean,
  ) => {
    const _coverageRule = coverageRule || masterData.coverageRule;
    const benefitsConditions = formClose
      ? selectedBenefits?.current[0]?.key !== selectedBenefits?.before[0]?.key
      : true;

    if (benefitsConditions) {
      if (benefits) {
        const _selectedBenefits = setMultipleSelect([...selectedBenefits.current], benefits, 'key');
        let _ruleMessage: TCoverageRuleMessage = {};
        if (!isEmpty(_selectedBenefits)) {
          Object.keys(_coverageRule)
            .filter((item: string) => item != benefits?.key)
            .map((riderCode: string) => {
              const errorMessageId: string[] = [];
              const errorMessageEng: string[] = [];
              _coverageRule[benefits?.key as string] &&
                _coverageRule[benefits?.key as string].map((rule: string) => {
                  if (_coverageRule[riderCode].includes(rule)) {
                    COVERAGERULE.COVERAGE_GROUP[rule].RULE.map((rules: any) => {
                      errorMessageId.push(rules.errorMessageInd);
                      errorMessageEng.push(rules.errorMessageEng);
                    });
                  }
                });
              _ruleMessage = {
                ..._ruleMessage,
                [riderCode]: {
                  errorMessageEng,
                  errorMessageId,
                },
              };
            });
        } else {
          setCoverageRuleSelected({});
        }

        const _benefits = { ...selectedBenefits };
        if (init) {
          _benefits.before = _selectedBenefits;
        }

        _benefits.current = _selectedBenefits;
        if (selectedBenefits?.current[0]?.key !== selectedBenefits?.before[0]?.key && formClose) {
          _benefits.current = _benefits.before;
        }
        setCoverageRuleSelected(_ruleMessage);
        setSelectedBenefits(_benefits);
      } else {
        // if empty array or not benefit choice
        const _benefits = { ...selectedBenefits };
        _benefits.current = _benefits.before;
        setSelectedBenefits(_benefits);
        setCoverageRuleSelected({});
      }
    } else {
      const _benefits = { ...selectedBenefits };
      if (_benefits.current[0]?.key !== _benefits?.before[0]?.key) {
        _benefits.current = _benefits.before;
        setSelectedBenefits(_benefits);
      }
    }
  };

  const generatePremium = (type: 'anual' | 'freq' | 'regular', value: string) => {
    let regularPremiumTemp = '';
    let anualPremiTemp = '';
    if (type == 'regular') {
      anualPremiTemp = numberWithCommas(
        Math.round(Number(value.replace(/\./g, '')) * Number(getValues().frequencyPayment.key)).toString(),
      );
      setValue('annualPremium', anualPremiTemp);
      setValue('regularPremium', value);
      setCalcData((prev) => {
        return { ...prev, premi: numberWithCommas(value as string) };
      });
    } else {
      if (type == 'anual') {
        regularPremiumTemp = numberWithCommas(
          Math.round(Number(value.replace(/\./g, '')) / Number(getValues().frequencyPayment.key)).toString(),
        );
      } else if (type == 'freq') {
        if (frequencyPaymentSelected.key != '00') {
          regularPremiumTemp = numberWithCommas(
            Math.round(Number(getValues().annualPremium.replace(/\./g, '')) / Number(value)).toString(),
          );
        } else {
          regularPremiumTemp = numberWithCommas(getValues('regularPremium'));
        }
      }
      setValue('regularPremium', regularPremiumTemp);
      setCalcData((prev) => {
        return { ...prev, premi: regularPremiumTemp };
      });
    }
  };

  const alertAfterCalculate = (rule: any) => {
    const tempAlertBar: TAlertBar[] = [];

    let tempCountBlock = 0;
    rule.map((item: any) => {
      if (item.errorType == 'BLOCKED') tempCountBlock += 1;
      tempAlertBar.push({
        message: item.errorMessageInd,
        type: item.errorType,
        ruleType: item.ruleShowType == 'SAVER' ? item.ruleShowType : item.ruleCd,
        value: item.value || '',
        code: item?.coverageCd || item?.itemCd,
      } as TAlertBar);
    });
    tempCountBlock = getMaximumPremi() ? tempCountBlock += 1 : tempCountBlock
    setAlert({
      blocked: tempCountBlock,
      bar: tempAlertBar,
    });
  };

  const onSaveChangeBenefit = async (value: TCheckboxData[]) => {
    const tempSaveRider: TBenefitsType[] = [];
    let tempWaitingPeriodType = waitingPeriodType;
    if (value.length <= 0) tempWaitingPeriodType = [];
    value.map((item: TCheckboxData) => {
      tempSaveRider.push({
        key: item.key as string,
        label: item.label as string,
      });

      const tempTakenBenefit = COVERAGE[item.key];
      if (tempTakenBenefit.properties.WP_FLAG_HEALTH) {
        tempWaitingPeriodType = setMultipleSelect(tempWaitingPeriodType, 'HEALTH');
      } else if (tempTakenBenefit.properties.WP_FLAG_CI) {
        tempWaitingPeriodType = setMultipleSelect(tempWaitingPeriodType, 'CI');
      } else if (tempTakenBenefit.properties.WP_FLAG_WOP) {
        tempWaitingPeriodType = setMultipleSelect(tempWaitingPeriodType, 'WOP');
      }
    });

    reset({ benefits: [defaultBenefitsValue] });
    setWaitingPeriodType(tempWaitingPeriodType);
    setFlagCalculate(false);
    setSelectedBenefits((prev) => {
      return { ...prev, before: value };
    });

    const updateSQSData = [
      {
        key: 'additionalBenefits',
        value: tempSaveRider
      },
      {
        key: 'waitingPeriodType',
        value: JSON.stringify(tempWaitingPeriodType)
      }
    ];

    await updateSQSByKey(RSQSData?.sqsId!, updateSQSData);

  };

  const getValidationGIO = (convDataResult: any) => {
    const mainBenefts = getValues('mainBenefits');
    const existingDataPlan = convDataResult?.currentData;
    const existingRiderCode = convDataResult?.currentData?.currRiderCode;
    const currentPlan = mainBenefts[0].planRider.key;
    const currentRoomPrice = mainBenefts[0].roomRider.key!;
    const currentSaverRider = mainBenefts[0].saverRider.key!;

    const dataDB = COVERAGE[MAIN_BENEFITS_DATA.key].COVERAGE_CONVERSION.CAMPAIGN;
    const cleanValue = (value: string) => Number(value).toString().replace(/\.00$/, '');

    const planDB = dataDB.filter((item: any) => existingRiderCode === item.coverageCdFrom);
    if (planDB.length === 0) {
      return false;
    }
    const planDBDetail = JSON.parse(planDB[0].detail);

    const isSaverEmpty =
      cleanValue(existingDataPlan.currDeductAmt) !== '0'
        ? cleanValue(existingDataPlan.currDeductAmt)
        : 'Tidak Dipilih';
    const isSaverCurrentEmpty =
      cleanValue(currentSaverRider) === 'NaN' ? currentSaverRider : cleanValue(currentSaverRider);

    const planExisting: string = `${existingDataPlan.currPlanCode}|${cleanValue(
      existingDataPlan.currFixedAmt,
    )}|${isSaverEmpty}|${currentPlan}|${cleanValue(currentRoomPrice)}|${isSaverCurrentEmpty}`;

    const validation = planDBDetail[planExisting] === 'GIO' ? true : false;

    if (validation === undefined) {
      const planExisting: string = `${existingDataPlan.currPlanCode}|${cleanValue(
        existingDataPlan.currFixedAmt,
      )}|${'Tidak dipilih'}|${currentPlan}|${cleanValue(currentRoomPrice)}|${isSaverCurrentEmpty}`;

      const validation = planDBDetail[planExisting] === 'GIO' ? true : false;
      return validation;
    } else return validation;

  };

  const isValidRegistered = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  const hitung = async () => {
    const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData?.convDataResult) : '';
    const isGIO = convDataResult?.convFlag === 'GIO' ? true : false;
    const isClientExisting = isValidRegistered(RSQSData?.clientIdSelected[0]!);

    // tambahin penjagaan, biarpun dia PWM tapi harus data eligiblebuat jalan function nya
    if (PRODUCT_PWM && isGIO && isClientExisting) {
      const resultValidation = getValidationGIO(convDataResult);
      await updateSQSByKey(selectedSQSId, {
        key: 'isGIO',
        value: resultValidation,
      });
      if (!resultValidation) {
        setShowAlert(true);
        setMessageAlert(
          `${PRODUCT?.label} tidak sesuai dengan informasi pada surat konversi GIO, pastikan Anda memahami dan menyetujui bahwa proses konversi ke plan yang Anda pilih saat ini akan diproses secara Full Underwriting. Silakan mengganti plan ${PRODUCT?.label} yang sesuai jika ingin di proses secara GIO.`,
        );
      } else {
        setShowAlert(false);
        setMessageAlert('');
      }
      setFlagCalculate(true);
    }

    const formValues: TCalculateForm = JSON.parse(JSON.stringify(getValues()));
    if (formValues?.mainBenefits && formValues?.mainBenefits.length > 0) {
      formValues.mainBenefits.map(mainBenefit => {
        if (mainBenefit?.roomRider?.key) {
          mainBenefit.roomRider.label = mainBenefit.roomRider.label?.replace(/\./g, '');
        }
        if (mainBenefit?.saverRider?.key) {
          mainBenefit.saverRider.label = mainBenefit.saverRider.label?.replace(/\./g, '');
        }
      });
    }
    const indexCustomer = RSQSData?.lifeAssuredSelf == 'self' ? 0 : 1;
    const newAllCustomerData = getANBByBackdate(indexCustomer, allCustomerData);
    setCustomerDataState(newAllCustomerData);
    const paramME = await generateParamME(RSQSData as ISQSDetail, newAllCustomerData, formValues, PRODUCT);
    setParamMEState(paramME);
    const responseME = calculationUnapplied(paramME);
    const totalPremium = numberWithCommas(Math.round(responseME.totalPremium).toString());
    const unappliedResult = Math.round(responseME.unapplied) === -0 ? false : responseME.unapplied < 0;
    switch (PRODUCT?.key) {
      case 'U12':
      case 'U13':
        setCalcData((prev) => {
          return {
            ...prev,
            minSumAssured: numberWithCommas(Math.round(responseME.minSA).toString()),
            maxSumAssured: numberWithCommas(Math.round(responseME.maxSA).toString()),
            premiUnapplied: numberWithCommas(Math.round(responseME.unapplied).toString()),
            minusUnapplied: unappliedResult,
          };
        });
        setValue('benefits.0.premiRider', numberWithCommas(Math.round(responseME.totalRiderPremium).toString()) || '0');
        setFlagCalculate(responseME.unapplied < 60000 && responseME.unapplied > -1);
        break;
      case 'H15':
      case 'H14':
        const _regularPremium = numberWithCommas(Math.round(responseME.totalPremium).toString());
        setValue('regularPremium', _regularPremium);
        generatePremium('regular', _regularPremium);
        setFlagCalculate(true);
        break;
      case 'L1Q':
        const _annualPremium = numberWithCommas(Math.round(responseME.totalPremium).toString());
        setValue('annualPremium', _annualPremium);
        generatePremium('anual', _annualPremium);
        setFlagCalculate(true);
        break;
      case 'E1O':
        if (responseME.totalPremium) {
          setValue('annualPremium', numberWithCommas(Math.round(responseME.totalPremium).toString()));
          generatePremium('anual', numberWithCommas(Math.round(responseME.totalPremium).toString()));
          setFlagCalculate(true);
        } else {
          setFlagCalculate(false);
        }
        break;
      case 'E1OP':
        if (responseME.totalPremium) {
          setValue('annualPremium', numberWithCommas(Math.round(responseME.totalPremium).toString()));
          generatePremium('anual', numberWithCommas(Math.round(responseME.totalPremium).toString()));
          setFlagCalculate(true);
        } else {
          setFlagCalculate(false);
        }
        break;
      case 'C16':
        if (responseME.totalPremium) {
          setValue('annualPremium', numberWithCommas(Math.round(responseME.totalPremium).toString()));
          generatePremium('anual', numberWithCommas(Math.round(responseME.totalPremium).toString()));
        }

        setFlagCalculate(
          responseME.totalPremium && responseME.rule.filter((i) => i.errorType == 'BLOCKED').length == 0,
        );
        break;
      case 'U17R':
        setValue('mainBenefits.0.sumInsured', totalPremium);
        setFlagCalculate(
          responseME.totalPremium && responseME.rule.filter((i) => i.errorType == 'BLOCKED').length == 0,
        );
        break;
      case 'U17D':
        setValue('mainBenefits.0.sumInsured', totalPremium);
        setFlagCalculate(
          responseME.totalPremium && responseME.rule.filter((i) => i.errorType == 'BLOCKED').length == 0,
        );
        break;
      case 'T1P':
        if (responseME.totalPremium) {
          const _regularPremium = numberWithCommas(Math.round(responseME.totalPremium).toString());
          setValue('regularPremium', _regularPremium);
          generatePremium('regular', _regularPremium);
          setFlagCalculate(true);
        } else {
          responseME.rule = responseME.rule.map((itemRule) =>
            COVERAGE[itemRule.coverageCd].RULE.filter((itemCoverage: any) =>
              itemCoverage.ruleCd === itemRule.ruleCd)).flat()

          setFlagCalculate(false);
        }
        break;
      case 'T1Q':
        if (responseME.totalPremium) {
          const _annualPremium = numberWithCommas(Math.round(responseME.totalPremium).toString());
          setValue('annualPremium', _annualPremium);
          generatePremium('anual', _annualPremium);
          setFlagCalculate(true);
        } else {
          responseME.rule = responseME.rule.map((itemRule) =>
            COVERAGE[itemRule.coverageCd].RULE.filter((itemCoverage: any) =>
              itemCoverage.ruleCd === itemRule.ruleCd)).flat()

          setFlagCalculate(false);
        }
        break;
      case 'L1WR':
      case 'L1WD':
        if (responseME.totalPremium) {
          const _annualPremium = numberWithCommas(Math.round(responseME.totalPremium).toString());
          setValue('annualPremium', _annualPremium);
          generatePremium('anual', _annualPremium);
          setFlagCalculate(true);
        } else {
          setFlagCalculate(false);
        }
        break;
      default:
        break;
    }
    setResultCaclulator(JSON.stringify(responseME));
    alertAfterCalculate(responseME.rule);
    if (responseME) setVisible(true);
  };

  const setIllustrationCalcProcess = () => {
    if (paramMEState) {
      const resCalcIllustration = calculationIlustration(paramMEState);
      if (resCalcIllustration) return resCalcIllustration;
    }

    return null;
  };

  const blockingCashValue = (data: any) => {
    let responseWording = 'Nilai Tunai pada 20 tahun pertama Polis tidak mencukupi untuk pembayaran Biaya Asuransi, Mohon untuk menambahkan Top-up Tunggal atau PRUsaver'

    if (data?.status === '1') {
      if (data?.year) {
        responseWording = `Nilai Tunai tidak mencukupi untuk pembayaran Biaya Asuransi, maka diperlukan penambahan Top-up Tunggal sebesar Rp${numberWithCommas(data?.topup)} pada tahun ke-${data?.year}`
      } else {

      }
      // need cashValue check for all product but temporarily only png/s products
    } else if (data?.status === '2') {
      if (['U12', 'U13'].includes(PRODUCT?.key!)) {
        responseWording = 'Jumlah minimum Nilai Tunai setelah Penarikan tidak boleh kurang dari 3,000,000'
      }
    }

    setShowAlert(true);
    setMessageAlert(responseWording);
  }

  const onSave = async (_route?: string, isSkipUpdateSummary = false, routesParams?: any) => {
    setLoadingIllustrationCalc(true)
    let route: string = EposRoutes.WAITING_PERIOD;
    if (_route) {
      route = _route;
    }
    if (waitingPeriodType.length < 1) {
      route = EposRoutes.QUICK_QUOTE;
    }
    const keyofRider = ['H161', 'H165'];
    const riderPWH = BENEFITS.find((item) => keyofRider.includes(item.key));
    if (isDoksul && riderPWH) {
      route = EposRoutes.WAITING_PERIOD;
    }
    const _clientId = RSQSData?.clientIdSelected[0];
    const _customerData = getCustomerStorageById(_clientId as string)?.toJSON();
    const indexCustomer = RSQSData?.lifeAssuredSelf == 'self' ? 0 : 1;
    const updatedCustomer = allCustomerDataState.length ? allCustomerDataState[indexCustomer] : allCustomerData[indexCustomer];
    const formValues = JSON.parse(JSON.stringify(getValues()));
    // save to customerData for Sync data freqPayment && RegularPremium
    const newCustomerData = {
      ...JSON.parse(JSON.stringify(updatedCustomer)),
      clientAnb: updatedCustomer.clientAnb,
      clientPayment: formValues.frequencyPayment,
      clientBudget: formValues.regularPremium
    };

    await onUpdateCustomer(newCustomerData as ICustomerStorage);

    const updateSQSData = [
      {
        key: 'resultCalculator',
        value: resultCaclulator
      },
      {
        key: 'calculator',
        value: JSON.stringify(formValues)
      }
    ] as TObjectSQSByKey[];

    await updateSQSByKey(RSQSData?.sqsId!, updateSQSData);

    !isSkipUpdateSummary &&
      (await updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: route,
      }));

    // Add illustration Calculation
    setTimeout(async () => {
      setLoadingIllustrationCalc(false)
      const resp = setIllustrationCalcProcess();
      const _productType = productType(PRODUCT?.key!);
      if (_productType === 'UL' && resp?.content === null && !['SQSTopupWithdrawal', 'SQSSubstandart'].includes(_route!)) {
        setFlagCalculate(false);
        blockingCashValue(resp);

      } else {
        await updateSQSByKey(RSQSData?.sqsId!, {
          key: 'resultIlustration',
          value: JSON.stringify(resp)
        });
        navigation.dispatch(StackActions.replace(_route || route, routesParams));
      }
    }, 500);

  };

  const getFundTopupState = useCallback(() => {
    if (RSQSData?.fundTopup && JSON.parse(RSQSData?.fundTopup).length > 0) {
      return true
    }
    return false
  }, [RSQSData?.fundTopup])

  const onContinue: SubmitHandler<TCalculateForm> = (data) => {
    if (flagCalculate && alert.blocked == 0) {
      onSave();
    } else {
      hitung();
    }
  };

  const onPressContinue = () => {
    const formValues = getValues()
    const isFundTopupExist = getFundTopupState()
    const isPruSaver = ['U1I3', 'U1C5'].includes(formValues?.topupBenefits?.[0]?.benefitsCode ?? '')
    const isPruSaverFilled = isPruSaver ? formValues?.topupBenefits?.[0]?.regularTopupPremium !== '' : false
    if (isPruSaverFilled && !isFundTopupExist) {
      showModalSetBalance();
      return
    }
    onContinue(formValues);
  }

  const resetFlagContinue = (name: string, beforeValue: any, value: any) => {
    const alwaysTrigger = ['regularTopupPremium', 'sumInsured', 'premiRider'];
    if (alwaysTrigger.includes(name)) {
      if (beforeValue != value && flagCalculate) {
        setFlagCalculate(false);
      }
    }
  };

  const ListInput = useCallback(({ data, parentIndex, type, coverageCode }: {
    data: any;
    type: 'benefits' | 'mainBenefits' | 'topupBenefits';
    parentIndex?: number;
    coverageCode?: string;
  }) => {
    return data?.map((item: any, index: number) => {
      const _validation = VALIDATION[item.rule];
      let _name = _validation.name;
      let _error = errors[_validation.name];
      /**
       * Condition form for benefits
       * Know
       */
      if (parentIndex != undefined) {
        _name = `${type}.${parentIndex}.${_validation.name}` as any;
        if (errors[type]) {
          const errorBenefits: any = errors[type];
          if (errorBenefits.length > 0) {
            _error = errorBenefits[parentIndex][_validation.name];
          } else {
            _error == undefined;
          }
        }
      }

      return (
        <Fragment key={index}>
          <Controller
            name={_name}
            control={control}
            defaultValue={item.rule == 'periodMain' ? { key: '99', label: '99' } : undefined}
            rules={VALIDATION[item.rule].rule}
            render={({ field: { onChange, value } }) => {
              /**
               * Dynamic Component
               */
              let _DynamicForm: typeof InputField | typeof DropdownField = InputField;
              /**
               * Default Props
               * ISSUE for Input Field Validation need to use custom not use react-hook-form because re-render
               */
              let _propsForm: TDropdownField | TInputField = {
                label:
                  item.label! +
                  (['contribusiTopup', 'premiTopup'].includes(item.rule) ? ` (${TOPUP_BENEFITS_DATA.label}) ` : ''),
                placeholder: item?.placeholder || _validation.placeholder,
                keyboardType: 'phone-pad',
                // required: item.rule.includes('saMain') ? true : false,
                required: Boolean(VALIDATION[item.rule].rule.required),
                leftItem: item.type.includes('curr') ? Currency : '',
                editable: item.type.includes('disable') ? false : true,
                value: value,
                debounceDelay: 10,
                setValue: (value: any) => {
                  resetFlagContinue(_validation.name, getValues(_name as any), value);
                  onChangeNumber(value, onChange);
                },
                error: _error,
                id: `input-${type}-${_name}-${coverageCode}-${index}`
              } as TInputField;

              /**
               * Default Props
               */
              if (item.type == 'option-dropdown') {
                _DynamicForm = DropdownField;
                _propsForm = {
                  labelMap: {
                    title: item.label!,
                    placeholder: item?.placeholder || _validation.placeholder,
                  },
                  data: [],
                  selected: value,
                  onSelected: (value) => { },
                  error: _error,
                  id: `dropdown-${type}-${_name}-${coverageCode}-${index}`
                } as TDropdownField;
              }

              /**
               * Logic for set needed
               */
              switch (item.rule) {
                case 'planRider':
                  // eslint-disable-next-line
                  const tempCoverage =
                    CHANNEL[PRODUCT?.key!].productCategory == 'UL'
                      ? RSQSData?.additionalBenefits!
                      : RSQSData?.mainAdditionalBenefits!;
                  const _ITEM_INPUT = COVERAGE[tempCoverage[0].key].ITEM_INPUT; // eslint-disable-line
                  (_propsForm as TDropdownField).data = INPUT[_ITEM_INPUT]?.value as never[];
                  (_propsForm as TDropdownField).onSelected = (value) => {
                    if (value?.key) {
                      onChange(value);
                      setBenefitsData((prev) => {
                        const newRoomList = INPUT[value.value].value.map((roomList: any) => {
                          return {
                            ...roomList,
                            label: roomList.label > 0 ? numberWithCommas(roomList.label) : roomList.label,
                          };
                        });

                        return { ...prev, roomList: newRoomList };
                      });
                      // @ts-ignore
                      setValue(`${type}.${parentIndex}.roomRider`, defaultOptionalData);
                      // @ts-ignore
                      setValue(`${type}.${parentIndex}.saverRider`, defaultOptionalData);
                      // @ts-ignore
                      setValue(`${type}.${parentIndex}.periodRider`, defaultOptionalData);
                      setFlagCalculate(false);
                    }
                  };
                  break;
                case 'saverRider':
                  (_propsForm as TDropdownField).data = benefitsData.saverList as never[];
                  (_propsForm as TDropdownField).onSelected = (value: any) => {
                    onChange(value);
                    // @ts-ignore
                    setValue(`${type}.${parentIndex}.periodRider`, defaultOptionalData);
                    setFlagCalculate(false);
                  };
                  break;
                case 'roomRider':
                  (_propsForm as TDropdownField).data = benefitsData.roomList as never[];
                  (_propsForm as TDropdownField).onSelected = (value: any) => {
                    if (value?.key) {
                      onChange(value);
                      const newSaverList = INPUT[value.value].value.map((saverList: any) => {
                        return {
                          ...saverList,
                          label: saverList.label > 0 ? numberWithCommas(saverList.label) : saverList.label,
                        };
                      });
                      setBenefitsData((prev) => {
                        return { ...prev, saverList: newSaverList };
                      });
                      // @ts-ignore
                      setValue(`${type}.${parentIndex}.saverRider`, defaultOptionalData);
                      // @ts-ignore
                      setValue(`${type}.${parentIndex}.periodRider`, defaultOptionalData);
                      setFlagCalculate(false);
                    }
                  };
                  break;
                case "saMain":
                  _propsForm = {
                    ..._propsForm,
                    debounceDelay: 0
                  }
                  break;
                case 'periodMain':
                case 'periodRider':
                  (_propsForm as TDropdownField).data = (
                    item.rule == 'periodMain' ? MASA_PERTANGGUNGAN : MASA_PERTANGGUNGAN_RIDER
                  ) as never[];
                  (_propsForm as TDropdownField).onSelected = (value: any) => {
                    onChange(value);
                    setFlagCalculate(false);
                  };
              }

              // @ts-ignore
              return <_DynamicForm {..._propsForm} {...pruTestID(`list-input-${item.rule}`)} />;
            }}
          />
          {/* ALERT FOR PWM PRODUCT */}
          {PRODUCT_PWM && item.rule == 'planRider' && (
            <PWMAlert
              productType={RSQSData?.policyType!}
              customerData={RSQSData?.lifeAssuredSelf == 'self' ? allCustomerData[0] : allCustomerData[1]}
            />
          )}
          {/* ALERT FROM RESPONSE ME */}
          {alert.bar.filter(item => item.code?.substring(3, 0).includes(coverageCode?.substring(3, 0) ?? '')).map((alertItem: TAlertBar, index) => {
            alertItem.message = replacePlaceholderInMessage(
              alertItem.message,
              alertItem.value ?? ''
            );

            if (shouldShowNoticeBar(alertItem, item)) {
              return (
                <NoticeBar
                  img={true}
                  message={alertItem.message}
                  type={alertItem.type}
                  key={index}
                />
              );
            }

            return null;
          })}
        </Fragment>
      );
    });
  }, [errors, benefitsData, alert, SUBSTANDARD]);

  const setSameBalanceTopupPercentage = useCallback(async () => {
    const fund = RSQSData?.fund ? JSON.parse(RSQSData.fund) : {};
    const params = [
      {
        key: 'fundTopup',
        value: JSON.stringify(fund),
      },
    ];
    //@ts-ignore
    await updateSQSByKey(RSQSData?.sqsId ?? '', params);
  }, [RSQSData?.sqsId, RSQSData?.fund]);

  const showModalSameBalance = () => {
    GlobalPromptModal.show({
      title: 'Informasi',
      subtitle:
        'Pilihan Dana Investasi Saldo Unit Premi Top-up akan disamakan dengan Pilihan Dana Investasi Saldo Unit Premi Berkala',
      buttonPrimary: {
        text: 'OK',
        onPress: () => {
          GlobalPromptModal.close();
          onContinue(getValues());
        },
      },
    });
  };

  const showModalSetBalance = () => {
    GlobalPromptModal.show({
      title: 'Informasi',
      subtitle:
        'Apakah pilihan Dana Investasi Saldo Unit Premi Top-up akan disamakan dengan Pilihan Dana Investasi Saldo Unit Premi Berkala?',
      buttonPrimary: {
        text: 'Ya',
        onPress: () => {
          GlobalPromptModal.close();
          setSameBalanceTopupPercentage();
          setTimeout(() => {
            showModalSameBalance();
          }, 600);
        },
      },
      buttonSecondary: {
        text: 'Tidak',
        onPress: () => {
          GlobalPromptModal.close();
          navigation.dispatch(StackActions.replace(EposRoutes.INVESTMENT_FUND));
        },
      },
    });
  };

  return (
    <PruScreen>
      <View style={[plaiStyles.spacing, plaiStyles.flex]}>
        <EposHeader />
        <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
          <HeaderTitle title={WORDING.premiumAndPayment} titleStyle={plaiStyles.fontHeaderTitle} />
          <SectionTitle wrapperStyle={plaiStyles.mt24} text={t('Epos:payment_information')} />

          {ONE_TIME_PAYMENT ? (
            <Controller
              name={VALIDATION.regularPremium.name}
              control={control}
              rules={VALIDATION.regularPremium.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={'Sekali Bayar (Premi Tunggal)'}
                  containerStyle={plaiStyles.mt24}
                  placeholder={'Premi Tunggal'}
                  keyboardType="phone-pad"
                  leftItem={Currency}
                  editable={false}
                  value={value as string}
                  setValue={(value: any) => {
                    onChangeNumber(value, onChange);
                  }}
                  uniqueTestId='payment-frequency'
                  onDisabled={() => disableFrequency}
                />
              )}
            />
          ) : (
            <>
              <Controller
                name={VALIDATION.frequencyPayment.name}
                control={control}
                rules={VALIDATION.frequencyPayment.rule}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                      {t('Epos:frequency_of_payment')}
                      <Text style={plaiStyles.fontRed}> *</Text>
                    </Text>
                    <OptionCard
                      data={masterData.paymentFrequency}
                      theme="border"
                      insideStyle={[plaiStyles.flex, plaiStyles.mr4]}
                      selected={value as TOptionalCardData}
                      onSelected={(value: TOptionalCardData) => {
                        onChange(value);
                        generatePremium('freq', value.key as string);
                        setFlagCalculate(false);
                      }}
                      uniqueTestId="payment-frequency"
                      onDisabled={() => disableFrequency}
                    />
                  </>
                )}
              />

              <Controller
                name={VALIDATION.annualPremium.name}
                control={control}
                rules={
                  {
                    ...VALIDATION.annualPremium.rule,
                  } as RegisterOptions
                }
                render={({ field: { onChange, value } }) => (
                  <InputField
                    label={WORDING.annualPremium}
                    placeholder={WORDING.enterAnnualPremium}
                    keyboardType="phone-pad"
                    leftItem={Currency}
                    value={value as string}
                    editable={DISABLED_ANNUAL_PREMI.includes(PRODUCT.key) ? false : true}
                    setValue={(value: string) => {
                      onChangeNumber(value, onChange);
                      generatePremium('anual', value);
                      setFlagCalculate(false);
                    }}
                    error={errors.annualPremium}
                    id="input-annual-premium"
                    disabled={disableFrequency}
                  />
                )}
              />
            </>
          )}

          {
            maximumPremiAlert &&
            <NoticeBar message={t('Calculator:maximum_premi_alert')} type={'BLOCKED'} img={maximumPremiAlert} />
          }
          {alert.bar.map((alert: TAlertBar, index: number) => {
            alert.message = replacePlaceholderInMessage(alert.message, alert.value!);

            const ruleType = {
              rule: 'premi',
            };

            if (shouldShowNoticeBar(alert, ruleType)) {
              return <NoticeBar message={alert.message} type={alert.type} img={true} key={index} />;
            }

            return null;
          })}

          {!ONE_TIME_PAYMENT && (
            <Controller
              name={VALIDATION.regularPremium.name}
              control={control}
              rules={VALIDATION.regularPremium.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:regular_premium')}
                  containerStyle={plaiStyles.mt24}
                  placeholder={t('Epos:enter_regular_premium')}
                  keyboardType="phone-pad"
                  leftItem={Currency}
                  editable={false}
                  value={value as string}
                  setValue={(value: any) => {
                    onChangeNumber(value, onChange);
                  }}
                  error={errors.regularPremium}
                  id="input-regular-premium"
                  disabled={disableFrequency}
                />
              )}
            />
          )}

          <NoticeBar message={t('Epos:warning_total_aggregat')} type={'WARNING'} img={true} />
          <NoticeBar message={t('Epos:underwriting_review')} type={'WARNING'} img={true} />

          {isPrucerah && (
            <>
              <Controller
                name={VALIDATION.educationBenefitPeriod.name}
                control={control}
                rules={VALIDATION.educationBenefitPeriod.rule}
                render={({ field: { onChange, value } }) => {
                  const { placeholder, label } = VALIDATION.educationBenefitPeriod;
                  return (
                    <DropdownField
                      labelMap={{
                        title: label,
                        placeholder: placeholder,
                      }}
                      data={MASA_TUNGGU_MANFAAT_PENDIDIKAN}
                      selected={value as TCommonOptionalData}
                      onSelected={onChange}
                      error={errors.educationBenefitPeriod}
                    />
                  );
                }}
              />

              <NoticeBar message={'Masa Tunggu Manfaat Dana Pendidikan adalah jangka waktu yang dipilih oleh Pemegang Polis dimana Manfaat Dana Pendidikan tidak berlaku.'} type={'INFO'} img={true} />

              <Controller
                name={VALIDATION.contributionPaymentPeriod.name}
                control={control}
                rules={VALIDATION.contributionPaymentPeriod.rule}
                disabled={!educationBenefitPeriod}
                render={({ field: { onChange, value } }) => {
                  const { placeholder, label } = VALIDATION.contributionPaymentPeriod;

                  return (
                    <DropdownField
                      labelMap={{
                        title: label,
                        placeholder: placeholder,
                      }}
                      data={masaPembayaranKontribusiMemo}
                      selected={value as TCommonOptionalData}
                      onSelected={onChange}
                      error={errors.contributionPaymentPeriod}
                    />
                  );
                }}
              />
            </>
          )}

          {PAYMENT_TERM_PLAN && paymentPeriodMemo?.length > 0 && (
            <Controller
              name={VALIDATION.paymentPeriod.name}
              control={control}
              rules={VALIDATION.paymentPeriod.rule}
              render={({ field: { onChange, value } }) => (
                <DropdownField
                  labelMap={{
                    title: paymentPeriodWording.title,
                    placeholder: paymentPeriodWording.placeholder,
                    titleHeaeder: paymentPeriodWording.titleHeaeder,
                  }}
                  data={paymentPeriodMemo}
                  selected={value as TCommonOptionalData}
                  onSelected={(value: string) => {
                    onChange(value)
                    setFlagCalculate(false)
                  }}
                  error={errors.paymentPeriod}
                />
              )}
            />
          )}

          {PRODUCT_UNIT_LINK && (
            <>
              <ListInput data={TOPUP_BENEFITS} type="topupBenefits" parentIndex={0} coverageCode={TOPUP_BENEFITS_DATA.key} />

              <SectionTitle wrapperStyle={plaiStyles.mt24} text={isSharia ? t('Epos:is_it_free_admin_sharia') : t('Epos:is_it_free_admin')} />

              <Controller
                name={VALIDATION.feeAdministration.name}
                control={control}
                defaultValue={'Ya'}
                rules={VALIDATION.feeAdministration.rule}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                      <TextDecoration label={isSharia ? t('Epos:free_admin_sharia') : t('Epos:free_admin')} />
                      <Text style={plaiStyles.fontRed}> *</Text>
                    </Text>
                    <OptionCard
                      uniqueTestId='free-admin'
                      data={statement}
                      theme="border"
                      style={plaiStyles.row}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr4]}
                      selected={value as TOptionalCardData}
                      onSelected={(value: TOptionalCardData) => {
                        onChange(value);
                        setFeeAdmin(value.key as string);
                        setFlagCalculate(false);
                      }}
                    />
                  </>
                )}
              />

              <View style={[cStyles.wrapperWarning, plaiStyles.flex, plaiStyles.row]}>
                <Image style={[plaiStyles.mr8, plaiStyles.mt4]} source={warning_icon} />
                {feeAdmin == 'Y' ? (
                  <Text style={cStyles.textWarning}>
                    <TextDecoration label={isSharia ? t('Epos:warning_fee_admin_sharia') : t('Epos:warning_fee_admin')} />
                  </Text>
                ) : (
                  <Text style={cStyles.textWarning}>
                    <TextDecoration label={isSharia ? t('Epos:warning_fee_admin_sharia_opt') : t('Epos:warning_fee_admin_opt')} />
                  </Text>
                )}
              </View>
            </>
          )}

          {FORM_AGE && (
            <>
              <SectionTitle wrapperStyle={plaiStyles.mt24} text={t('Epos:note_benefit')} />
              <View style={plaiStyles.row}>
                <Controller
                  name={VALIDATION.age1.name}
                  control={control}
                  rules={VALIDATION.age1.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      containerStyle={[plaiStyles.flex]}
                      label={t('Epos:age_1')}
                      placeholder={t('Epos:enter_age')}
                      keyboardType="phone-pad"
                      value={value as string}
                      maxLength={2}
                      setValue={(value: string) => {
                        onChangeAge('age1', value);
                        onChangeNumber(value, onChange);
                        setFlagCalculate(false);
                      }}
                      error={errors.age1}
                      id="input-age-1"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.age2.name}
                  control={control}
                  rules={VALIDATION.age2.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      containerStyle={[plaiStyles.flex, plaiStyles.ml10]}
                      label={t('Epos:age_2')}
                      placeholder={t('Epos:enter_age')}
                      keyboardType="phone-pad"
                      maxLength={2}
                      value={value as string}
                      setValue={(value: string) => {
                        onChangeAge('age2', value);
                        onChangeNumber(value, onChange);
                        setFlagCalculate(false);
                      }}
                      error={errors.age2}
                      id="input-age-2"
                    />
                  )}
                />

                <Controller
                  name={VALIDATION.age3.name}
                  control={control}
                  rules={VALIDATION.age3.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      containerStyle={[plaiStyles.flex, plaiStyles.ml10]}
                      label={t('Epos:age_3')}
                      placeholder={t('Epos:enter_age')}
                      keyboardType="phone-pad"
                      maxLength={2}
                      value={value as string}
                      setValue={(value: string) => {
                        onChangeAge('age3', value);
                        onChangeNumber(value, onChange);
                        setFlagCalculate(false);
                      }}
                      error={errors.age3}
                      id="input-age-3"
                    />
                  )}
                />
              </View>
            </>
          )}

          {BACK_DATE_PREMI && (
            <>
              <SectionTitle wrapperStyle={plaiStyles.mt24} text={t('Epos:backdate_premium?')} />
              <Controller
                name={VALIDATION.backdate.name}
                control={control}
                rules={VALIDATION.backdate.rule}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                      {t('Epos:backdate_premium')}
                      <Text style={plaiStyles.fontRed}> *</Text>
                    </Text>
                    <OptionCard
                      uniqueTestId='backdate-premium'
                      data={statement}
                      theme="border"
                      style={plaiStyles.row}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr4]}
                      selected={value as string}
                      error={errors?.backdate}
                      onSelected={(value) => {
                        onChange(value);
                        setBackDate(value as TOptionalCardData);
                        setFlagCalculate(false);
                      }}
                    />
                  </>
                )}
              />

              {backDate?.key == 'Y' && (
                <Controller
                  name={VALIDATION.backdateValue.name}
                  control={control}
                  rules={VALIDATION.backdateValue.rule}
                  render={({ field: { onChange, value } }) => (
                    <InputDate
                      formatDate="YYYY-MM-DD"
                      label={'Tanggal Backdate'}
                      placeholder={'Pilih tanggal'}
                      value={value as string}
                      setValue={(value: string) => {
                        onChange(value);
                        setFlagCalculate(false);
                      }}
                      error={errors?.backdateValue}
                      minDate={masterData.minBackDate}
                      maxDate={new Date().toString()}
                      id="input-backdate"
                    />
                  )}
                />
              )}
            </>
          )}

          <SectionTitle
            wrapperStyle={plaiStyles.mt24}
            text={'Produk & Manfaat Polis'}
          ></SectionTitle>
          <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt24]}>
            <Text style={cStyles.textPru}>
              PRU
              <Text style={cStyles.textBenefit}>
                {COVERAGE[RSQSData?.mainAdditionalBenefits![0].key!].longDescription.replace('PRU', '')}
              </Text>
            </Text>
            <View style={[plaiStyles.selfCenter, plaiStyles.row, plaiStyles.ml4]}>
              <Text>
                {'('}
                {Currency}
                {')'}
              </Text>
              <Pressable
                onPress={() => {
                  setBenefitsDetail({
                    visible: true,
                    code: RSQSData?.mainAdditionalBenefits![0].key!,
                  });
                }}
              >
                <Icon name="info" size={16} color={PruColor.grey99} style={[plaiStyles.lineH20, plaiStyles.ml4]} />
              </Pressable>
            </View>
          </View>

          <ListInput data={MAIN_BENEFITS} type="mainBenefits" parentIndex={0} coverageCode={PRODUCT?.key} />

          {BENEFITS.map((item: any, index: number) => {
            const INPUT_BENEFITS = LIST_INPUT[item.key]?.inputList;
            if (!fields[index]) {
              append({ ...defaultBenefitsValue, benefitsCode: item.key });
            }
            return (
              <Fragment key={index}>
                <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt24]}>
                  <Text style={cStyles.textPru}>
                    PRU<Text style={cStyles.textBenefit}>{item?.label?.replace('PRU', '')}</Text>
                  </Text>
                  <View style={[plaiStyles.row, plaiStyles.alignCenter]}>
                    <Text>
                      {'('}
                      {Currency}
                      {')'}
                    </Text>
                    <Icon
                      onPress={() => {
                        setBenefitsDetail({
                          visible: true,
                          code: item.key,
                        });
                      }}
                      name="info"
                      size={16}
                      color={PruColor.grey99}
                      style={[plaiStyles.lineH20, plaiStyles.ml4]}
                    />
                  </View>
                </View>
                <ListInput key={index} data={INPUT_BENEFITS} parentIndex={index} type="benefits" coverageCode={item.key} />
              </Fragment>
            );
          })}

          {/* SUBSTANDARD */}
          {SUBSTANDARD.substandard[0].code != '' && (
            <>
              <SectionTitle wrapperStyle={plaiStyles.mt24} text="Substandard"></SectionTitle>
              <Controller
                name={VALIDATION.approvalSubstandard.name}
                control={control}
                rules={VALIDATION.approvalSubstandard.rule}
                render={({ field: { onChange, value } }) => (
                  <>
                    <OptionCard
                      label={VALIDATION.approvalSubstandard.label}
                      data={statementApproval}
                      theme="border"
                      style={plaiStyles.row}
                      insideStyle={[plaiStyles.flex]}
                      spaceItem={16}
                      selected={value as TOptionalCardData}
                      error={errors.approvalSubstandard}
                      onSelected={(value) => {
                        onChange(value);
                        setApproveSubstandar(value.key == 'Y');
                      }}
                      uniqueTestId='approval-substandard'
                    />
                  </>
                )}
              />
              {!approveSubstandard && (
                <>
                  <Controller
                    name={VALIDATION.bank.name}
                    control={control}
                    rules={VALIDATION.bank.rule}
                    render={({ field: { onChange, value } }) => (
                      <DropdownField
                        labelMap={{
                          title: VALIDATION.bank.label!,
                          placeholder: VALIDATION.bank.placeholder,
                        }}
                        keyMap={{
                          value: 'codeBank',
                          label: 'nameBank',
                        }}
                        data={BANK_LIST}
                        selected={value as TCommonOptionalData}
                        onSelected={onChange}
                        error={errors.bank}
                        id='dropdown-substandard-bank'
                      />
                    )}
                  />
                  <Controller
                    name={VALIDATION.branchBank.name}
                    control={control}
                    rules={VALIDATION.branchBank.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={VALIDATION.branchBank.label}
                        containerStyle={plaiStyles.mt24}
                        placeholder={VALIDATION.branchBank.placeholder}
                        value={value as string}
                        maxLength={60}
                        setValue={(value) => onChange(sanitizedLetterText(value))}
                        error={errors.branchBank}
                        id='input-substandard-bank-name'
                      />
                    )}
                  />
                  <Controller
                    name={VALIDATION.bankCurrency.name}
                    control={control}
                    rules={VALIDATION.bankCurrency.rule}
                    render={({ field: { onChange, value } }) => (
                      <DropdownField
                        labelMap={{
                          title: VALIDATION.bankCurrency.label!,
                          placeholder: VALIDATION.bankCurrency.placeholder,
                        }}
                        data={currencyList}
                        selected={value as TCommonOptionalData}
                        onSelected={onChange}
                        error={errors.bankCurrency}
                        id="dropdown-substandard-bank-currency"
                      />
                    )}
                  />
                  <Controller
                    name={VALIDATION.bankAccountNumber.name}
                    control={control}
                    rules={VALIDATION.bankAccountNumber.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={VALIDATION.bankAccountNumber.label}
                        containerStyle={plaiStyles.mt24}
                        placeholder={VALIDATION.bankAccountNumber.placeholder}
                        keyboardType="phone-pad"
                        value={value as string}
                        maxLength={30}
                        setValue={(value) => onChange(sanitizedText(value))}
                        error={errors.bankAccountNumber}
                        id='input-substandard-bank-account-number'
                      />
                    )}
                  />
                  <Controller
                    name={VALIDATION.bankAccountName.name}
                    control={control}
                    rules={VALIDATION.bankAccountName.rule}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={VALIDATION.bankAccountName.label}
                        containerStyle={plaiStyles.mt24}
                        placeholder={VALIDATION.bankAccountName.placeholder}
                        value={value as string}
                        maxLength={60}
                        setValue={onChange}
                        error={errors.bankAccountName}
                        id='input-substandard-bank-account-name'
                      />
                    )}
                  />
                </>
              )}
            </>
          )}

          {/* BUTTON CHANGE BENEFITS | TOPUP | SUBSTANDARD */}
          <View style={[plaiStyles.mt32, plaiStyles.mb24]}>
            {PRODUCT_UNIT_LINK && (
              <>
                <Button
                  style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
                  textStyle={plaiStyles.fontRed}
                  text={t('Epos:change_benefits')}
                  onPress={() => setVisibleChangeBenefits(true)}
                  {...pruTestID('change-benefit-button')}
                />
                <SelectionChangeBenefit
                  titleHeader={t('Epos:change_benefits')}
                  productName={PRODUCT?.label ?? ''}
                  visible={visibleChangeBenefits}
                  onClose={() => {
                    // For Now Only can 1 Benefits
                    onSelectedChangeRider(selectedBenefits?.before[0] as TOptionalCardData, undefined, false, true);
                    setVisibleChangeBenefits(false);
                  }}
                  data={masterData.benefits as TOptionalCardData[]}
                  selected={selectedBenefits.current as TOptionalCardData[]}
                  errorMessage={coverageRuleSelected}
                  onSelected={(value: TOptionalCardData) => onSelectedChangeRider(value)}
                  onPress={async () => {
                    await onSaveChangeBenefit(selectedBenefits.current);
                    setVisibleChangeBenefits(false);
                  }}
                />

                <Button
                  style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
                  textStyle={plaiStyles.fontRed}
                  text={t('Epos:topup_withdrawal')}
                  onPress={() => {
                    onSave(EposRoutes.TOPUPWITHDRAWAL, true, {
                      value: Number(getValues('mainBenefits')[0].periodInsured.key),
                    });
                  }}
                  {...pruTestID('top-up-button')}
                />
              </>
            )}
            <Button
              style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
              textStyle={plaiStyles.fontRed}
              text={t('Epos:substandart_button')}
              onPress={() => onSave(EposRoutes.SUBSTANDART, true)}
              {...pruTestID('substandard-button')}
            />
          </View>
        </ScrollView>
      </View>
      <BottomSheet
        premi={calcData.premi}
        minimumSA={calcData.minSumAssured}
        maksimumSA={calcData.maxSumAssured}
        premiUnaplied={calcData.premiUnapplied}
        minusUnaplied={calcData.minusUnapplied}
        visible={visible}
        setVisible={setVisible}
        wordingSelected={frequencyPaymentSelected}
        isSharia={isSharia}
        currency={allCustomerData?.[0]?.clientCurrency?.label === 'IDR' ? 'Rp' : 'USD '}
      />
      <EposFooter
        position={9}
        loading={loadingIllustrationCalc}
        leftButton={{
          text: params?.sqsState ? 'Batalkan' : undefined,
          onPress: onBack,
        }}
        rightButton={{
          text: flagCalculate && alert.blocked == 0 ? 'Selanjutnya' : 'Hitung',
          disabled: false,
          onPress: handleSubmit(onPressContinue),
          // onPress: hitung,
        }}
      />

      <ModalContainer
        titleHeader={'Detail Produk'}
        visible={benefitsDetail.visible}
        styleWrapper={plaiStyles.w100}
        onClose={() => {
          setBenefitsDetail((prev) => {
            return { ...prev, visible: false };
          });
        }}
      >
        <ScrollView>
          <View style={[plaiStyles.pb16]}>
            <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.lineH24, plaiStyles.pb8]}>
              {COVERAGE[benefitsDetail.code].longDescription}
            </Text>
            <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.font14, plaiStyles.lineH20]}>
              {COVERAGE[benefitsDetail.code].description}
            </Text>
          </View>
        </ScrollView>
      </ModalContainer>
      <ModalInformation
        visible={showAlert}
        title={'Informasi'}
        desc={messageAlert}
        buttonPrimary={{
          text: 'Tutup',
          onPress: () => setShowAlert(false),
        }}
      />
    </PruScreen>
  );
};