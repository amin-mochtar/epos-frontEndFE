import {
  ModalInformation,
  plaiStyles,
  setMultipleSelect,
  TCheckboxData,
  ModalContainer,
  TCommonConstantData,
  LoadingFull,
  underMaintaince,
} from 'plai_common_frontend';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { BackHandler, ImageSourcePropType, ScrollView, Text, View } from 'react-native';
import { EposFooter, EposHeader, OptionCard, TOptionalCardData, HeaderTitle, ModalAgentDorman } from '../../../components';
import { DescCustomerCard, RiderList, TRiderData } from './components';
import { EposRoutes } from '../../../navigation';
import { isEmpty } from 'lodash';
import { PruColor, PruScreen } from 'common_ui_components';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { CHANNEL, COVERAGE, COVERAGERULE, ISQSDetail, ICustomerStorage, ICommonObjectData, ISummaryProposal, ISPAJData, INSURANCE_GOALS_OPTION } from '../../../utilities';
import { deepCompare, productType } from '../../../utilities/common-function';
import { getEligibleDiscount, getProductRecommendationConversionData } from '../../../network';
import { SQS_STATE } from './../../../redux';
import { useTranslation } from 'react-i18next';
import { useAgentDorman, useAnnualRefreshment } from "./../../../hooks";
import { formatProductLabel } from './product-recommendation.function';

type CoverageRule = {
  [key: string]: string[];
};
type CoverageRuleDesc = {
  [key: string]: {
    errorMessageEng: string[];
    errorMessageId: string[];
  };
};
type TActionButton = {
  text: string;
  onPress: () => void;
};

type TAlertOptions = {
  title: string;
  desc: string;
};

export const ProductRecommendationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { isAgentDormanValid } = useAgentDorman();
  const { isAnnualRefreshmentValid, isAnnualLoading } = useAnnualRefreshment();
  let params = route.params as {
    sqsState?: string;
    isChanged?: boolean
  } | undefined;
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const { selectedSQSId, proposalId, spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { onUpdateSQS, updateSummaryByKey, getCustomerStorageById, updateSQSByKey, getSummaryProposalById, getSPAJById } = useEposRealm();
  const [productList, setProductList] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<TCommonConstantData>(RSQSData?.product!);
  const [riderList, setRiderList] = useState<TRiderData[]>([]);
  const [selectedRider, setselectedRider] = useState<TRiderData[]>([]);
  const [selectedLastEducation, setselectedLastEducation] = useState<string>('');
  const [waitingPeriodType, setWaitingPeriodType] = useState(JSON.parse(RSQSData?.waitingPeriodType!));
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<{ image?: ImageSourcePropType; title: string; desc: string; }>({
    image: undefined,
    title: 'Tidak Ada Produk Rekomendasi',
    desc: '',
  });

  //Logic untuk coverageRule
  const [coverageRuleList, setCoverageRuleList] = useState<CoverageRule>({});
  const [coverageRuleSelected, setCoverageRuleSelected] = useState<CoverageRuleDesc>({});
  // const [changeBenefit, setChangeBenefit] = useState<TCheckboxData[]>([]);
  const [changeBenefitBefore, setChangeBenefitBefore] = useState<TCheckboxData[]>([]);
  //Logic untuk coverageRule end

  //Logic untuk tooltip
  const [visibleRiderDetail, setVisibleRiderDetail] = useState(false);
  const [riderCodeDetail, setRiderCodeDetail] = useState<string>('U12R');
  const [loadingConversionCheck, setLoadingConversionCheck] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const libraryProductConversion: any = {
    H10: 'PRUSolusi Sehat',
    H11: 'PRUSolusi Sehat Syariah',
    H12: 'PRUSolusi Sehat Plus Pro',
    H13: 'PRUSolusi Sehat Plus Pro Syariah',
    H14: 'PRUWell Medical',
    H15: 'PRUWell Medical Syariah',
  };

  const [primaryButton, setPrimaryButton] = useState<TActionButton>({
    text: 'Tutup',
    onPress: () => setShowAlert(false),
  });

  const [secondaryButton, setSecondaryButton] = useState<TActionButton | undefined>(undefined);
  /** Initial Data Not Change */
  const { lifeAssuredData, mainInsuredData } = useMemo(() => {
    const lifeAssuredData: unknown = getCustomerStorageById(RSQSData?.clientIdSelected[0] as string)?.toJSON();
    let mainInsuredData: unknown = { ...(lifeAssuredData as ICustomerStorage) };
    if (RSQSData?.clientIdSelected[1]) {
      mainInsuredData = getCustomerStorageById(RSQSData?.clientIdSelected[1] as string)?.toJSON();
    }
    return {
      lifeAssuredData,
      mainInsuredData,
    };
  }, []);

  const { isPrucerah, productTraditional } = useMemo(() => {
    return {
      isPrucerah: ['E1O', 'E1OP'].includes(selectedProduct.key!),
      productTraditional: productType(selectedProduct?.key!) == 'TRD',
    };
  }, [RSQSData, selectedProduct]);

  const renderRiderList = useMemo(() => {
    return riderList.filter((i) => !i.hide);
  }, [riderList]);

  useEffect(() => {
    initProductList();
    if (isEmpty(renderRiderList) && RSQSData && RSQSData.product) {
      setListRider(RSQSData?.product!);
    }

    if (RSQSData?.additionalValidationPolicyInformation!) {
      const additionalValidationPolicyInformation = JSON.parse(RSQSData.additionalValidationPolicyInformation);
      setselectedLastEducation(additionalValidationPolicyInformation.lastEducationalStatus.key);
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  const onBack = () => {
    let route = RSQSData?.lifeAssuredSelf == 'other' ? EposRoutes.MAIN_INSURED_DATA : EposRoutes.POLICY_OWNER_DATA;
    if (params?.sqsState && !params?.isChanged) {
      route = EposRoutes.QUICK_QUOTE;
      navigation.dispatch(StackActions.replace(route));
    } else {
      onSave(route);
    }

    return true;
  };

  const onProductSelected = useCallback((value: TOptionalCardData) => {
    // if change product then remove rider of previously product
    if (selectedProduct?.key !== value?.key && selectedProduct?.key) {
      setRiderList([]);
      setselectedRider([]);

      // untuk sementara masukin di sini karena behaviour dari OptionCard yang ngebuat ke reset semuanya.
      setCoverageRuleList({});
      setCoverageRuleSelected({});
      setChangeBenefitBefore([]);
    }

    const isUnitLink = CHANNEL[value.key as string].productCategory === 'UL'
    const hasAutoSelected = CHANNEL[value.key as string].CURRENCY.COVERAGE.filter(item => item.autoSelected)

    if ((isEmpty(renderRiderList) && value.key && isUnitLink) || hasAutoSelected) {
      setListRider(value.key as string, true);
    }

    // set new product & rider if choose rider
    setSelectedProduct(value);
  }, [selectedProduct]);

  // countermeassure kasar tapi works untuk mencegah health nya muble jumble
  useEffect(() => {
    if (!Array.isArray(selectedRider) || !selectedRider.length) {
      setWaitingPeriodType([]);
    }
  }, [selectedRider]);

  const onRiderSelected = (value: TRiderData, coverageRule?: CoverageRule) => {
    const tempTakenBenefit = COVERAGE[value.key];
    const tempCoverageRule = coverageRule || coverageRuleList;
    const tempSelectedRider = setMultipleSelect([...selectedRider], value, 'key');

    let tempWaitingPeriodType = waitingPeriodType;
    if (tempTakenBenefit.properties.WP_FLAG_HEALTH) {
      tempWaitingPeriodType = setMultipleSelect(tempWaitingPeriodType, 'HEALTH');
    } else if (tempTakenBenefit.properties.WP_FLAG_CI) {
      tempWaitingPeriodType = setMultipleSelect(tempWaitingPeriodType, 'CI');
    } else if (tempTakenBenefit.properties.WP_FLAG_WOP) {
      tempWaitingPeriodType = setMultipleSelect(tempWaitingPeriodType, 'WOP');
    }
    // setChangeBenefit(tempRiderSelected);
    setWaitingPeriodType([...tempWaitingPeriodType]);
    setselectedRider(tempSelectedRider);

    coverageRuleHandler(value, tempCoverageRule, tempSelectedRider);
  };

  const showModalAlertWithOptions = (
    options: TAlertOptions,
    primaryButtonText: string,
    onPressPrimary: () => void,
    secondaryButton?: any,
  ) => {
    setMessageAlert(options);
    setShowAlert(true);
    setPrimaryButton({
      text: primaryButtonText,
      onPress: onPressPrimary,
    });
    secondaryButton;
  };

  const coverageRuleHandler = (value: TRiderData, coverageRule: CoverageRule, tempSelectedRider: TRiderData[]) => {
    const riderCodeList = Object.keys(coverageRule);

    let tempRule: CoverageRuleDesc = {};
    if (!isEmpty(tempSelectedRider)) {
      riderCodeList
        .filter((item: string) => item != value.key)
        .map((riderCode: string) => {
          const tempRuleId: string[] = [];
          const tempRuleEng: string[] = [];
          coverageRule[value.key as string].map((rule: string) => {
            if (coverageRule[riderCode].includes(rule)) {
              COVERAGERULE.COVERAGE_GROUP[rule].RULE.map((rules: any) => {
                tempRuleId.push(rules.errorMessageInd);
                tempRuleEng.push(rules.errorMessageEng);
              });
            }
          });
          tempRule = {
            ...tempRule,
            [riderCode]: {
              errorMessageEng: tempRuleEng,
              errorMessageId: tempRuleId,
            },
          };
        });
    } else {
      setCoverageRuleSelected({});
    }

    setCoverageRuleSelected(tempRule);
  };

  const setListRider = (product: string | TCommonConstantData, isCode?: boolean) => {
    const _productCode = isCode ? (product as string) : ((product as TCommonConstantData).key as string);
    const temp = CHANNEL[_productCode];
    const tempRiderList: TRiderData[] = [];

    let tempRuleCoverage: CoverageRule = {};
    let tempSelectedRider: TRiderData[] = [];
    temp?.CURRENCY.COVERAGE.map((item: any) => {
      if (COVERAGE[item.coverageCd].type === 'rider') {
        tempRiderList.push({
          key: item.coverageCd,
          label: COVERAGE[item.coverageCd].longDescription,
          hide: item.autoSelected,
        });
        tempRuleCoverage = {
          ...tempRuleCoverage,
          [item.coverageCd]: COVERAGE[item.coverageCd].COVERAGE_GROUP,
        };
      }
      if (item.autoSelected) {
        tempSelectedRider.push({
          key: item.coverageCd,
          label: COVERAGE[item.coverageCd].longDescription,
        });
      }
    });

    RSQSData?.additionalBenefits?.map((item: ICommonObjectData) => {
      onRiderSelected({ key: item.key!, label: item.label! }, tempRuleCoverage);
      setChangeBenefitBefore(setMultipleSelect([...changeBenefitBefore], { key: item.key, label: item.label }, 'key'));
    });

    setRiderList(tempRiderList);
    setCoverageRuleList(tempRuleCoverage);
    setselectedRider(tempSelectedRider);
  };

  const initProductList = () => {
    const _productList: {
      key: string; label: string; mainCoverageCode?: string; isHideTitleIcon: boolean;
      insuranceGoal: string;
      detail: string;
    }[] = [];
    RSQSData?.productRecommendation!.split(',').map((item) => {
      const product = CHANNEL[item];
      const mainCoverageCode = product?.CURRENCY.COVERAGE.map((item: any) => item.coverageCd).find((item: any) => {
        return COVERAGE[item].type === 'main'
      })
      _productList.push({
        key: item,
        label: formatProductLabel(product, item),
        mainCoverageCode,
        isHideTitleIcon: !COVERAGE[mainCoverageCode]?.description,
        insuranceGoal: (RSQSData?.insuranceGoal || [])
          .map((result: any) => {
            return INSURANCE_GOALS_OPTION.find((item) => item.key === result)?.label || '';
          })
          .join(', '),
        detail: (RSQSData?.insuranceGoal || [])
          .map((result: any) => {
            return INSURANCE_GOALS_OPTION.find((item) => item.key === result)?.label || '';
          })
          .join(', '),
      });
    });
    setProductList(_productList);
  };

  const getDefaultRider = () => {
    const tempMainBenefit: TRiderData[] = [];
    const tempTopUpBenefit: TRiderData[] = [];
    const _productCode = selectedProduct.key;
    const temp = CHANNEL[_productCode as string];

    temp?.CURRENCY.COVERAGE.map((item: any) => {
      if (COVERAGE[item.coverageCd].type === 'main') {
        tempMainBenefit.push({
          key: item.coverageCd,
          label: COVERAGE[item.coverageCd].longDescription,
        });
      }

      if (COVERAGE[item.coverageCd].type === 'topup') {
        tempTopUpBenefit.push({
          key: item.coverageCd,
          label: COVERAGE[item.coverageCd].longDescription,
        });
      }
    });

    const defaultRider = {
      mainBenefit: tempMainBenefit,
      topUpBenefit: tempTopUpBenefit,
    };
    return defaultRider;
  };

  const onSave = async (nextRoute?: string, routeParams?: any) => {
    let _nextRoute = nextRoute;
    const defaultRider = getDefaultRider();
    const dataSummary = [
      {
        key: 'productCode',
        value: selectedProduct.key,
      },
      {
        key: 'productName',
        value: selectedProduct.label,
      },
      {
        key: 'lastState',
        value: nextRoute || EposRoutes.CALCULATOR,
      },
    ];

    const _sqsData = {
      ...RSQSData?.toJSON(),
      additionalBenefits: selectedRider,
      mainAdditionalBenefits: defaultRider.mainBenefit,
      topupAdditionalBenefits: defaultRider.topUpBenefit,
      waitingPeriodType: JSON.stringify(waitingPeriodType),
      calculator: validateField('calculator'),
      resultCalculator: validateField('resultCalculator'),
      fund: validateField('fund'),
      fundTopup: validateField('fundTopup'),
    } as ISQSDetail;
    _sqsData.product = { ...selectedProduct };
    /* maybe can use autoSelected in future (discussable) */
    if (isPrucerah) {
      _sqsData.mainAdditionalBenefits = [...defaultRider.mainBenefit, ...selectedRider];
      _sqsData.additionalBenefits = [];
    }

    let isDifference = false
    const state = {
      isChanged: params?.isChanged,
      onChangeQQ: params?.sqsState === SQS_STATE.CHANGE_QQ,
    }

    if (params?.sqsState) {
      const newSqsData = JSON.parse(JSON.stringify(_sqsData));

      // Need to Add this on sqs form because of in realm there is value desc with value null;
      // Only for Comparing only
      newSqsData.additionalBenefits = newSqsData.additionalBenefits.map((val: any) => {
        return { ...val, desc: null }
      });

      newSqsData.mainAdditionalBenefits = newSqsData.mainAdditionalBenefits.map((val: any) => {
        return { ...val, desc: null }
      });

      newSqsData.topupAdditionalBenefits = newSqsData.topupAdditionalBenefits.map((val: any) => {
        return { ...val, desc: null }
      });


      const formData = {
        additionalBenefits: newSqsData.additionalBenefits,
        mainAdditionalBenefits: newSqsData.mainAdditionalBenefits,
        topupAdditionalBenefits: newSqsData.topupAdditionalBenefits,
      }

      const RSQSDataJSON = RSQSData?.toJSON();
      const realmData = {
        additionalBenefits: RSQSDataJSON?.additionalBenefits,
        mainAdditionalBenefits: RSQSDataJSON?.mainAdditionalBenefits,
        topupAdditionalBenefits: RSQSDataJSON?.topupAdditionalBenefits,
      }

      isDifference = deepCompare(formData, realmData)

      if (isDifference) {
        params = {
          ...params,
          isChanged: true,
          sqsState: ""
        }
      }

      if (isDifference === false && !state.isChanged && state.onChangeQQ) {
        _nextRoute = EposRoutes.QUICK_QUOTE;
      }
    }

    await onUpdateSQS(_sqsData);

    if (!state.onChangeQQ) {
      // reset calculator
      updateSQSByKey(RSQSData?.sqsId ?? '', [
        {
          key: 'calculator',
          value: null
        },
        {
          key: 'resultCalculator',
          value: ''
        },
        {
          key: 'confirmationProductRecommendation',
          value: ''
        },
        {
          key: 'resultIlustration',
          value: ''
        },
        {
          key: 'substandar',
          value: ''
        },
        {
          key: 'ilustrationDocs',
          value: ''
        },
      ])
    }

    await updateSummaryByKey(proposalId, dataSummary);
    if (routeParams) {
      params = {
        ...params,
        ...routeParams
      }
    }
    if (_nextRoute) navigation.dispatch(StackActions.replace(_nextRoute, params));
  };

  const validateField = (field: keyof ISQSDetail) => {
    const fundValid = field == 'fund' || field == 'fundTopup'
    if (fundValid) return RSQSData?.product!.key !== selectedProduct.key ? '[]' : RSQSData?.[field]!;
    else return RSQSData?.product!.key !== selectedProduct.key ? '' : RSQSData?.[field]!;
  };

  const hasRequiredCourses = (
    productCode: string,
    passedCourse: string[],
    productCourseRequirements: { [key: string]: string[]; },
  ) => {
    const requiredCourses = productCourseRequirements[productCode] || [];
    return requiredCourses.every((course) => passedCourse.includes(course));
  };

  const checkLicense = (productCode: string) => {
    const passedCourse = authState?.agentProfile?.passedCourse || [];
    const mainCoursePassed = passedCourse.includes('MFC');

    // double validation kalo license nya ga ada dan MFC nya ga ada langsung FAIL.
    if (!authState?.agentProfile?.license?.length) return false;
    if (!mainCoursePassed) return false;

    const productCourseRequirements: { [key: string]: string[]; } = {
      // PNG
      U12R: ['ILP', 'RPP'],
      U13R: ['ILP', 'RPP'],
      // PWH PWHS
      H161: ['ILP', 'RPP', 'SWH'],
      H165: ['ILP', 'RPP', 'SWH'],
      // PPH PPHS + CERMAT
      H1H7: ['ILP', 'RPP', 'PPH'],
      H1H5: ['ILP', 'RPP', 'PPH'],
      // PPH & PPHS +
      H1H1: ['ILP', 'RPP', 'PPH'],
      H1H3: ['ILP', 'RPP', 'PPH'],
      // PWM
      H14: ['SWM'],
      H15: ['SWM'],
      // PruAnugerah Syariah
      L1Q: ['SWS'],
      // PruCerah & PruCerah +
      E1O1: ['SCH'],
      E1OR: ['SCH'],
    };

    const normalizedProductCode = productCode.toUpperCase();
    return hasRequiredCourses(normalizedProductCode, passedCourse, productCourseRequirements);
  };

  // start doksul (changePH) config
  const summaryProposalById = getSummaryProposalById(proposalId) as ISummaryProposal;
  const isUnitLink = productType(selectedProduct?.key!) == 'UL';

  const comparePolicyHolderName = () => {
    if (spajId) {
      const RSPAJData = getSPAJById(spajId) as ISPAJData;
      const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : ''; // get policy holder name from esub data
      const _lifeAssuredData = lifeAssuredData as ICustomerStorage; // get policy holder name newest

      return policyHolderData?.clientName !== _lifeAssuredData?.clientName // if different name then showing popup block change PH
    }
  }

  // popup blocking change PH will show if the condition is (product UL, doksul CTA, different name from esub & field "isChangePH" = false)
  const validateChangePH = () => {
    return isUnitLink && summaryProposalById?.isDoksulCTA && comparePolicyHolderName() && !RSQSData?.isChangePH
  }
  // end doksul (changePH) config

  const validationCheck = () => {
    const currentProductSelected = selectedProduct?.key
      ? selectedProduct?.key.includes('U')
      : RSQSData?.productRecommendation!.includes('U');
    const selectedKey = selectedRider[0]?.key! ? selectedRider[0]?.key! : selectedProduct?.key!;
    // Check license function
    const isPassedCourse = checkLicense(selectedKey);
    // @ts-ignore
    const clientAge: number | undefined = lifeAssuredData?.clientAnb;

    // Validation matrix
    let educationValidation =
      (selectedLastEducation === 'A')

    if (clientAge !== undefined && currentProductSelected && clientAge > 71) {
      const wording = {
        title: 'Information',
        desc: 'Mohon maaf, usia Calon Pemegang Polis telah melebihi ketentuan yang berlaku.',
      };
      showModalAlertWithOptions(wording, 'Tutup', () => setShowAlert(false));
      return false;
    } else if (educationValidation && currentProductSelected) {
      const wording = {
        title: 'Tidak Dapat Melanjutkan',
        desc: 'Anda tidak dapat melanjutkan Pengajuan SPAJ. Silakan cek Pendidikan Calon Pemegang Polis.',
      };
      showModalAlertWithOptions(wording, 'Ubah Pendidikan', () =>
        navigation.dispatch(StackActions.replace(EposRoutes.INSURANCE_GOALS)),
      );
      return false;
      // check if agent dont have license
    } else if (!isPassedCourse) {
      const wording = {
        title: 'Tidak Dapat Melanjutkan',
        desc: 'Mohon Maaf, Produk / Rider belum dapat dipilih. Pastikan anda lulus training atau sertifikasi untuk Produk / Rider di modul Training PRUForce.',
      };
      showModalAlertWithOptions(wording, 'Tutup', () => setShowAlert(false));
      return false;
    }
    else if (validateChangePH()) {
      const wording = {
        title: 'Nomor Tidak Sesuai',
        desc: 'Silakan ganti nomor Telepon sesuai dengan data Calon Pemegang Polis Terbaru.',
      };
      showModalAlertWithOptions(wording, 'Tutup', () => setShowAlert(false));
      return false;
    }
    return true;
  };

  const onContinueSkipConversion = async (validate: boolean) => {
    let nextRoutes = productTraditional ? EposRoutes.CALCULATOR : EposRoutes.INVESTMENT_FUND;

    if (isPrucerah) {
      nextRoutes = productTraditional ? EposRoutes.POLICY_HOLDER_TARGET : EposRoutes.INVESTMENT_FUND;
    }

    if (validate) {
      let params = undefined;
      if (nextRoutes === EposRoutes.POLICY_HOLDER_TARGET) {
        params = {
          lifeAssuredIndex: 0,
        };
      }

      await onSave(nextRoutes, params);
    }
  };

  const isValidConversion = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  const annualRefreshmentValidationCheck = async () => {
    if (productType(selectedProduct?.key!) == 'TRD') {
      setIsLoading(true)
      try {
        const valid = await isAnnualRefreshmentValid();
        setIsLoading(false);
        return valid;
      } catch (error) {
        // TODO CATCH ERROR
      }

    }

    setIsLoading(false);
    return true;
  }

  const onContinueSaveData = async () => {
    // untuk sementara ini logicnya jangan di apa2 in dulu, soalnya buat conversion
    // ini comment atas galih yang buat ya, dan logic bawah.
    const validate = validationCheck();
    const isSelf = RSQSData?.lifeAssuredSelf! === 'other' ? false : true;
    const clientIds = {
      clientIdPH: RSQSData?.clientIdSelected[0]!,
      clientIdTU: !isSelf ? RSQSData?.clientIdSelected[1]! : '',
    };

    const isPHValid = isValidConversion(clientIds.clientIdPH);
    const isTUValid = isValidConversion(clientIds.clientIdTU);

    const isValidContinue = isSelf ? isPHValid : isPHValid && isTUValid;

    if ((selectedProduct?.key === 'H14' || selectedProduct?.key === 'H15') && isValidContinue && validate) {
      const validSkip = await converionHandler(clientIds, validate, isSelf);
      if (validSkip) await onContinueSkipConversion(validate);
    } else await onContinueSkipConversion(validate);
  }

  const onContinue = async () => {
    // cek validasi dulu baru conversion
    if (isAgentDormanValid({ conditionalCourse: 'DRM' })) {
      const isAnnualRefreshmentValid = await annualRefreshmentValidationCheck();
      if (isAnnualRefreshmentValid) {
        onContinueSaveData()
      }
    }
  };

  const converionHandler = async (clientIds: any, validate: boolean, isSelf: boolean) => {
    setLoadingConversionCheck(true);
    const isSelectedProductSharia = RSQSData?.policyType! === 'conventional' ? false : true;
    const agentCode = authState?.agentCode!;
    let isValidConversion: boolean = false;

    // sebenernya ini masih jadi perdebatan karena tio bilang pake TU dan dev P1 bilang pake PH, kalo jenis lainnya.
    // const clientIdFetch = isSelf ? clientIds.clientIdPH : clientIds.clientIdTU;

    // First step API HIT and go to validasi cek
    const conversionDatas = await getProductRecommendationConversionData(agentCode, clientIds.clientIdPH);

    if (Array.isArray(conversionDatas)) {
      // di P1 juga di hardcode soalnya, kenapa index 0 karena data di index 0 adalah data yang terbaru
      const data = conversionDatas[0];
      if (!data) {
        return true;
      }
      const existingProductSelect = libraryProductConversion[data?.productCode!] || '';
      const currentProductSelect = libraryProductConversion[selectedProduct?.key! as string];
      const isSharia = existingProductSelect.includes('Syariah');
      const onlyWordingSlicing = existingProductSelect;
      const currentProductWordingSlicing = currentProductSelect;
      const validProductConversion = ['H10', 'H11', 'H12', 'H13']
      const productChecker = validProductConversion.includes(data?.productCode)

      if (!productChecker) {
        onContinueSkipConversion(validate)
        return false
      }

      // ClientIds check with data result
      const alertMessage = {
        title: 'Perhatian',
        desc: `Anda telah terdaftar di ${onlyWordingSlicing}. Untuk berlangganan ${currentProductSelect}, polis lama perlu dibatalkan. Nama pemegang polis harus sama dengan polis yang ada. Silakan perbarui informasi pemegang polis.`,
      };
      if (isSelf) {
        if (data.clientNumOW !== data.clientNumLife01) {
          showModalAlertWithOptions(alertMessage, 'Setuju', () => setShowAlert(false));
          return false;
        }
      } else {
        if (clientIds.clientIdPH !== data.clientNumOW && clientIds.clientIdTU === data.clientNumLife01) {
          showModalAlertWithOptions(alertMessage, 'Setuju', () => setShowAlert(false));
          return false;
        }
        if (clientIds.clientIdPH === data.clientNumOW && clientIds.clientIdTU !== data.clientNumLife01) {
          return true;
        }
      }
      //Product Check with result
      if (['H10', 'H11', 'H12', 'H13'].includes(data?.productCode!) && isSharia !== isSelectedProductSharia) {
        const changesMessageProductType = {
          title: '',
          desc: `Anda telah terdaftar di ${onlyWordingSlicing}. Jika ingin melakukan konversi harus dengan ${currentProductWordingSlicing}. Silakan ubah jenis polis yang ingin Anda ajukan.`,
        };
        showModalAlertWithOptions(
          changesMessageProductType,
          'Ubah Jenis Polis ',
          () => {
            setShowAlert(false);
            navigation.dispatch(StackActions.replace(EposRoutes.POLICY_SUBMISSION_TYPE));
          },
          setSecondaryButton({
            text: 'Tutup',
            onPress: () => {
              setLoadingConversionCheck(false);
              setShowAlert(false);
            },
          }),
        );
        return false;
      }
      // policyStatus check condition
      if (data.policyStatus !== 'IF') {
        return true;
      }
      // discount check condition
      if (data.convFlag !== 'GIO') {
        isValidConversion = true;
      }
      if (data.convFlag === 'GIO') {
        // Second step API HIT and go to Save result
        const eligibleDiscountData = await getEligibleDiscount(clientIds.clientIdPH, agentCode, data.policyNumber);
        await updateSQSByKey(selectedSQSId, {
          key: 'convDiscountData',
          value: JSON.stringify(eligibleDiscountData[0]),
        });
        isValidConversion = true;
      }
      // Kalo semua nya valid.
      if (isValidConversion) {
        const successMessageConversion = {
          title: 'Perhatian',
          desc: `Anda memiliki Polis ${existingProductSelect}. Sebelum mendaftar ${currentProductSelect}, polis ${onlyWordingSlicing} harus dibatalkan.`,
        };
        await updateSQSByKey(selectedSQSId, {
          key: 'convDataResult',
          value: JSON.stringify(data),
        });
        showModalAlertWithOptions(successMessageConversion, 'Setuju', () => {
          setShowAlert(false);
          onContinueSkipConversion(validate);
        });
      }
    } else if (conversionDatas === 500) {
      // untuk sementara handler nya masih gini kalo data nya selain array karena pasti balikannya status response.
      setLoadingConversionCheck(false);
      const alertMessage = {
        image: underMaintaince,
        title: 'Terjadi Masalah',
        desc: `Maaf, terjadi masalah saat menghubungkan ke Server, silahkan coba beberapa saat lagi.`,
      };
      showModalAlertWithOptions(alertMessage, 'Coba Lagi', () => setShowAlert(false));
      setShowAlert(true);
    } else {
      return true;
    }
  };

  const handlerTooltip = (riderCode: string) => {
    setRiderCodeDetail(riderCode);
    setVisibleRiderDetail(true);
  };

  const handleTooltipMainItem = (product: { key: string, label: string, mainCoverageCode?: string }) => {
    if (product?.mainCoverageCode) {
      setRiderCodeDetail(product.mainCoverageCode)
      setVisibleRiderDetail(true)
    }
  }

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      {loadingConversionCheck && <LoadingFull />}
      <View style={[plaiStyles.px16, plaiStyles.flex]}>
        <EposHeader />
        <HeaderTitle
          tagTitle={true}
          title={'Pilih Produk dan Asuransi Tambahan'}
          titleStyle={plaiStyles.fontHeaderTitle}
        />
        <ScrollView>
          <DescCustomerCard
            data={RSQSData?.toJSON() as any}
            lifeAssuredData={lifeAssuredData! as ICustomerStorage}
            mainInsuredData={mainInsuredData as ICustomerStorage}
            onPress={() => { }}
          />
          <OptionCard
            data={productList}
            selected={selectedProduct as TOptionalCardData}
            onSelected={onProductSelected}
            icon={"info"}
            handlerTooltip={handleTooltipMainItem}
            uniqueTestId='product-reccomendation'
          >
            {renderRiderList && renderRiderList?.length > 0 && (
              <RiderList
                data={renderRiderList}
                selected={selectedRider}
                onSelected={(value: TRiderData) => onRiderSelected(value)}
                errorMessage={coverageRuleSelected}
                handlerTooltip={handlerTooltip}
              />
            )}
          </OptionCard>
        </ScrollView>
        <ModalContainer
          titleHeader={'Detail Rider'}
          visible={visibleRiderDetail}
          styleWrapper={plaiStyles.w100}
          onClose={() => setVisibleRiderDetail(false)}
        >
          <ScrollView>
            <View style={[plaiStyles.pb16]}>
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.lineH24, plaiStyles.pb8]}>
                {COVERAGE[riderCodeDetail].longDescription}
              </Text>
              <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.font14, plaiStyles.lineH20]}>
                {COVERAGE[riderCodeDetail].description}
              </Text>
            </View>
          </ScrollView>
        </ModalContainer>
      </View>

      <EposFooter
        position={7}
        loading={isLoading || isAnnualLoading}
        leftButton={{
          text: params?.sqsState && !params?.isChanged ? 'Batalkan' : undefined,
          onPress: onBack,
        }}
        rightButton={{
          disabled: !selectedProduct.key,
          onPress: onContinue,
        }}
      />
      <ModalInformation
        visible={showAlert && !visibleRiderDetail}
        image={messageAlert.image}
        title={messageAlert.title}
        desc={messageAlert.desc}
        buttonPrimary={primaryButton}
        buttonSecondary={secondaryButton}
      />
    </PruScreen>
  );
};
