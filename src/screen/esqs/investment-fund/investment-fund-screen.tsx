import { PruColor, PruScreen } from 'common_ui_components';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { EposFooter } from '../../../components/epos-footer/epos-footer';
import { ScrollView } from 'react-native-gesture-handler';
import { BackHandler, Linking, Text, View } from 'react-native';
import { CardFundList, RiskProfileCard } from './components';
import { IFStyle } from './invesment-fund.style';
import { EposRoutes } from '../../../navigation';
import { EposHeader, HeaderTitle } from '../../../components';
import { plaiStyles, setMultipleSelect, LoadingFull, ModalInformation, GlobalPromptModal } from 'plai_common_frontend';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, updateSqs } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { CHANNEL, FUND, ISQSDetail } from '../../../utilities';
import { FundListCategoryType } from './components/accordion-fund/accordion-fund.type';
import { isEmpty } from 'lodash';
import { FundType } from './investment-fund.type';
import { LoadingFundFactSheet } from '../../../utilities/common-data/loadingFundFactSheet';
import { calculationIlustration, generateParamME } from "epos_utilities/src/newbusiness";

export const InvestmentFundScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFundConfirmationPage = route.name === EposRoutes.INVESTMENT_FUND_CONFIRMATION;
  const dispatch = useDispatch();
  const { sqsData, selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { onUpdateSQS, updateSummaryByKey, getMultipleCustomer, updateSQSByKey } = useEposRealm();
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const fund = useMemo(() => (RSQSData?.fund ? JSON.parse(RSQSData?.fund) : []), []);
  const fundTopup = useMemo(() => (RSQSData?.fundTopup ? JSON.parse(RSQSData?.fundTopup) : []), []);
  const calculatorTopup = RSQSData?.calculatorTopup ? JSON.parse(RSQSData?.calculatorTopup) : [];
  const isCalculatorTopupExist = useMemo(() => {
    if (calculatorTopup.length > 0) {
      return Boolean(calculatorTopup.find((item) => item?.value !== '' && item?.year !== ''));
    }
    return false;
  }, [calculatorTopup]);
  const [fundList, setFundList] = useState<FundListCategoryType[]>([]);
  const [selectedFund, setSelectedFund] = useState<FundType[]>(RSQSData?.fund ? JSON.parse(RSQSData?.fund) : []);
  const [totalValueFund, setTotalValueFund] = useState(0);
  const [fundListTopUp, setFundListTopUp] = useState<FundListCategoryType[]>([]);
  const [selectedFundTopUp, setSelectedFundTopUp] = useState<FundType[]>(
    RSQSData?.fundTopup ? JSON.parse(RSQSData?.fundTopup) : [],
  );
  const [totalValueFundTopUp, setTotalValueFundTopUp] = useState(0);
  const [nextEnable, setNextEnable] = useState(false);
  const [fundFactSheetVisible, setFundFactSheetFormVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleChanges, setVisibleChanges] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const isNeedTopupBlocking = isFundConfirmationPage && isCalculatorTopupExist && selectedFundTopUp.length == 0;
  /**
   * Set Data Dependency Not Change
   */
  const { PRODUCT, resultRP, valueRiskProfile } = useMemo(() => {
    const _resultRP = RSQSData?.riskProfileResult || '';
    return {
      PRODUCT: RSQSData?.product,
      resultRP: _resultRP,
      valueRiskProfile: _resultRP == 'conservative' ? 1 : _resultRP == 'moderate' ? 2 : 3,
    };
  }, []);

  useEffect(() => {
    if (RSQSData && PRODUCT.key) {
      if (isEmpty(fundList)) {
        getFundList('basic');
      }
      if (isEmpty(fundListTopUp)) {
        getFundList('topup');
      }
    }
    checkNextEnable(selectedFund, selectedFundTopUp);
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, [fundList, fundListTopUp]);

  const getFundList = (fundType: 'topup' | 'basic') => {
    const tempFundList = [
      {
        categoryName: 'Konservatif',
        totalValueFund: 0,
        isExpand: false,
        data: [] as FundType[],
      },
      {
        categoryName: 'Moderat',
        totalValueFund: 0,
        isExpand: false,
        data: [] as FundType[],
      },
      {
        categoryName: 'Agresif',
        totalValueFund: 0,
        isExpand: false,
        data: [] as FundType[],
      },
    ];
    CHANNEL[PRODUCT.key]?.CURRENCY.FUND.map((item: any) => {
      const tempFundData = FUND[item];
      const tempFundSelected = fundType == 'basic' ? selectedFund : selectedFundTopUp;
      const indexFundSelected = tempFundSelected.findIndex((item) => {
        return item.type == tempFundData.code;
      });
      const codeUi = tempFundData.code.substring(0, tempFundData.code.length - 1);
      const tempFundListData =
        indexFundSelected == -1
          ? {
              type_fund: tempFundData.fundRisk,
              type: tempFundData.code,
              type_ui: tempFundData.code_ui || codeUi,
              desc_fund: tempFundData.descriptionInd,
              percent: 0,
              lowRate: tempFundData.lowRate,
              mediumRate: tempFundData.mediumRate,
              highRate: tempFundData.highRate,
              benRate: tempFundData.benRate,
            }
          : tempFundSelected[indexFundSelected];

      let index = 0;
      if (tempFundData.fundRisk == 'moderat') {
        index = 1;
      } else if (tempFundData.fundRisk == 'agresif') {
        index = 2;
      }

      tempFundList[index].data.push(tempFundListData);
    });

    // yang masih ragu ini buat set data ketika back atau masuk lagi ke halaman kaya kurang aja
    setTotalFundValue(0, tempFundList, fundType);
    setTotalFundValue(1, tempFundList, fundType);
    setTotalFundValue(2, tempFundList, fundType);

    if (fundType == 'basic') {
      setFundList([...tempFundList]);
    } else {
      setFundListTopUp([...tempFundList]);
    }
  };

  const showModalTopupBlocking = () => {
    GlobalPromptModal.show({
      title: 'Perhatian',
      subtitle: 'Mohon mengisi Fund Top-up',
      buttonPrimary: {
        text: 'OK',
        onPress: () => {
          GlobalPromptModal.close();
        },
      },
    });
  };

  const onBack = async () => {
    if (isNeedTopupBlocking) {
      showModalTopupBlocking();
      return;
    }
    const backRoutes = isFundConfirmationPage ? EposRoutes.QUICK_QUOTE : EposRoutes.PRODUCT_RECOMMENDATION;
    await onSave(backRoutes);
    updateSummaryByKey(proposalId, { key: 'lastState', value: backRoutes });
    navigation.dispatch(StackActions.replace(backRoutes));
    return true;
  };

  const selectFund = (value: FundType, section: 'topup' | 'basic') => {
    let tempFundList = fundList;
    let indexCategory = -1;
    let indexFund = -1;
    let tempSelectedFund = selectedFund;
    let tempSelectedFundTopUp = selectedFundTopUp;
    if (section == 'basic') {
      if (selectedFund.findIndex((item: FundType) => item.type == value.type) != -1) {
        tempFundList = fundList;
        indexCategory = tempFundList.findIndex(
          (TFundList: FundListCategoryType) => TFundList.categoryName.toLowerCase() == value.type_fund,
        );
        indexFund = tempFundList[indexCategory].data.findIndex(
          (TFundSelected: FundType) => TFundSelected.type === value.type,
        );
      }
      tempSelectedFund = setMultipleSelect(selectedFund, value);
      setSelectedFund([...tempSelectedFund]);
    } else {
      if (selectedFundTopUp.findIndex((item: FundType) => item.type == value.type) != -1) {
        tempFundList = fundListTopUp;
        indexCategory = tempFundList.findIndex(
          (TFundList: FundListCategoryType) => TFundList.categoryName.toLowerCase() == value.type_fund,
        );
        indexFund = tempFundList[indexCategory].data.findIndex(
          (TFundSelected: FundType) => TFundSelected.type === value.type,
        );
      }
      tempSelectedFundTopUp = setMultipleSelect(selectedFundTopUp, value);
      setSelectedFundTopUp([...tempSelectedFundTopUp]);
    }
    if (indexCategory != -1) onSlideChange(0, indexFund, section, indexCategory);
    checkNextEnable(tempSelectedFund, tempSelectedFundTopUp);
  };

  const onSlideChange = (value: number, index: number, section: 'topup' | 'basic', indexCategory: number) => {
    const tempFundList = section == 'basic' ? fundList : fundListTopUp;
    tempFundList[indexCategory].data[index].percent = value;
    setTotalFundValue(indexCategory, tempFundList, section);
  };

  const setTotalFundValue = (indexCategory: number, fundList: FundListCategoryType[], section: 'topup' | 'basic') => {
    let tempValueByCategory = 0;
    fundList[indexCategory].data.map((item) => {
      tempValueByCategory += item.percent;
    });
    fundList[indexCategory].totalValueFund = tempValueByCategory;
    let tempValueFund = 0;
    fundList.map((item) => {
      tempValueFund += item.totalValueFund;
    });
    if (section == 'basic') {
      setFundList([...fundList]);
      setTotalValueFund(tempValueFund);
    } else {
      setFundListTopUp([...fundList]);
      setTotalValueFundTopUp(tempValueFund);
    }
    checkNextEnable(selectedFund, selectedFundTopUp);
  };

  const onSave = async (_route?: string) => {
    let _nextRoute = _route || EposRoutes.VALIDATION_INCOME;
    let _calcIllustration = '';
    const updateSQSData = [
      {
        key: 'fund',
        value: JSON.stringify(selectedFund),
      },
      {
        key: 'fundTopup',
        value: JSON.stringify(selectedFundTopUp),
      },
    ];
    if (!_route && isFundConfirmationPage) {
      _nextRoute = EposRoutes.ILLUSTRATION;
      const isValidChanges = validationHandlerChangesFunds();
      if (isValidChanges) {
        const paramME = await generateParamME(RSQSData, allCustomerData, JSON.parse(RSQSData?.calculator!), PRODUCT);
        const resCalcIllustration = calculationIlustration(paramME);
        _calcIllustration = JSON.stringify(resCalcIllustration);

        updateSQSData.push({
          key: 'resultIlustration',
          value: _calcIllustration,
        });
      }
    }
    await updateSQSByKey(RSQSData?.sqsId!, updateSQSData);
    updateSummaryByKey(proposalId, { key: 'lastState', value: _nextRoute });
    navigation.dispatch(StackActions.replace(_nextRoute));
    setFundFactSheetFormVisible(false);
    setLoading(false);
  };

  const checkNextEnable = useCallback(
    (fundBasic: FundType[], fundTopUp: FundType[]) => {
      let tempNextEnableBasic = false;
      let tempNextEnableTopUp = false;
      const tempLengthFundTopUp = fundTopUp.length;
      fundBasic.map((item: FundType) => {
        tempNextEnableBasic = getTotalValue(fundList) == 100;
      });

      if (tempLengthFundTopUp > 0) {
        fundTopUp.map((item: FundType) => {
          tempNextEnableTopUp = getTotalValue(fundListTopUp) == 100;
        });
      } else {
        tempNextEnableTopUp = true;
      }

      setNextEnable(tempNextEnableBasic && tempNextEnableTopUp);
    },
    [fundList, fundListTopUp],
  );

  const getTotalValue = (tempFundList: FundListCategoryType[]) => {
    let totalValue = 0;
    tempFundList.map((item: FundListCategoryType) => {
      totalValue += item.totalValueFund;
    });
    return totalValue;
  };

  const dataFundChecker = (currentData: FundType[], selectedData: FundType[]): boolean => {
    if (currentData.length !== selectedData.length) return true;
    return currentData.some(
      (originalItem, index) =>
        originalItem.type_ui !== selectedData[index].type_ui || originalItem.percent !== selectedData[index].percent,
    );
  };

  const validationHandlerChangesFunds = (): boolean => {
    return dataFundChecker(fund, selectedFund) || dataFundChecker(fundTopup, selectedFundTopUp);
  };

  const onContinue = useCallback(async () => {
    if (isNeedTopupBlocking) {
      showModalTopupBlocking();
      return;
    }
    const valid = validationHandlerChangesFunds();
    if (isFundConfirmationPage) {
      setVisibleChanges(valid);
      setFundFactSheetFormVisible(!valid);
    } else {

      let nextRoute = EposRoutes.VALIDATION_INCOME;

      if(PRODUCT?.key && ['U17R', 'U17D'].includes(PRODUCT.key)) {
          nextRoute = EposRoutes.CALCULATOR;
      }

      await onSave(nextRoute);
    }
  }, [isNeedTopupBlocking, isFundConfirmationPage, validationHandlerChangesFunds, onSave]);

  const onChangeRiskProfile = async () => {
    const _sqsData = {
      ...RSQSData?.toJSON(),
      fund: JSON.stringify([]),
      fundTopup: JSON.stringify([]),
    } as ISQSDetail;
    await onUpdateSQS(_sqsData);
    dispatch(updateSqs({ key: 'changeRiskProfile', payload: true }));
    navigation.dispatch(StackActions.replace(EposRoutes.INVESTMENT_RISK_PROFILE));
  };

  const openFundFactSheet = (selectedFund: FundType) => {
    const fund = selectedFund;
    const today = new Date();
    let currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const currentDate = today.getDate();
    let monthName = '';

    if (currentDate <= 20) {
      if (currentMonth > 1) {
        monthName = monthsList[currentMonth - 2];
      } else if (currentMonth === 1) {
        monthName = 'Dec';
        currentYear--;
      } else {
        monthName = 'Nov';
        currentYear--;
      }
    } else {
      if (currentMonth === 0) {
        monthName = 'Dec';
        currentYear--;
      } else {
        monthName = monthsList[currentMonth - 1];
      }
    }

    const fundName = fund.desc_fund.toLowerCase().split(' ').join('-');
    const fileName = `${fundName}-${fund.type.toLowerCase()}-${monthName.toLowerCase()}-${currentYear}-factsheet.pdf`;
    const pdfUrl = `https://www.prudential.co.id/export/sites/prudential-id/id/.galleries/pdf/fundfact-sheet/${currentYear}/${fileName}`;
    // factsheet for syariah fund
    const pdfSyariahUrl = `https://www.prudentialsyariah.co.id/export/sites/syariahcorp-id/id/.galleries/pdf/fundfact-sheet/${currentYear}/${fileName}`;

    if (fundName.includes('syariah')) {
      Linking.openURL(pdfSyariahUrl);
    } else {
      Linking.openURL(pdfUrl);
    }
  };

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      {/* LOADING */}
      {loading && <LoadingFull />}
      <View style={plaiStyles.px16}>
        <EposHeader />
      </View>
      <ScrollView style={[plaiStyles.px16, plaiStyles.flex]}>
        <HeaderTitle
          tagTitle={true}
          title={'Pilihan Dana Investasi'}
          titleStyle={plaiStyles.fontHeaderTitle}
          descriptionTitle={
            isFundConfirmationPage
              ? 'Pilihan Dana Investasi yang ditampilkan disesuaikan dengan toleransi profil risiko nasabah dan ketersediaan pilihan Dana Investasi'
              : 'Pilihan Dana Investasi yang ditampilkan disesuaikan dengan profil risiko nasabah'
          }
          descriptionStyle={plaiStyles.fontHeaderSubTitle}
        />
        <RiskProfileCard
          resultRiskProfile={resultRP}
          confirmPage={isFundConfirmationPage}
          onClick={onChangeRiskProfile}
        />
        {isFundConfirmationPage && (
          <View style={[IFStyle.wrapperWarning, plaiStyles.mb16]}>
            <Text style={IFStyle.textWarning}>
              Pilihan dana investasi diambil dari Quick Quote Calon Nasabah dapat mengganti pilihan sesuai profil risiko
            </Text>
          </View>
        )}

        <View style={plaiStyles.pb16}>
          <Text style={[plaiStyles.font18, plaiStyles.fontGrey33Bold]}>Saldo Unit Premi Berkala</Text>
        </View>
        <View style={[plaiStyles.row, plaiStyles.px16, IFStyle.boxGreyE6]}>
          <Text style={[plaiStyles.flex, plaiStyles.font16, plaiStyles.fontGrey33, plaiStyles.lineH20]}>
            Total Dana Investasi
          </Text>
          <Text style={[plaiStyles.font18, plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>{totalValueFund}%</Text>
        </View>
        {totalValueFund != 100 && (
          <View style={[IFStyle.wrapperWarning, plaiStyles.mb16]}>
            <Text style={IFStyle.textWarning}>Total persentase dana investasi harus 100%</Text>
          </View>
        )}

        <CardFundList
          onSelectedFund={selectFund}
          onSlideChange={onSlideChange}
          openFactSheet={openFundFactSheet}
          data={fundList}
          selectedFund={selectedFund}
          valueRiskProfile={valueRiskProfile}
          section="basic"
          setVisible={setVisible}
        />

        <View style={plaiStyles.py16}>
          <Text style={[plaiStyles.font18, plaiStyles.fontGrey33Bold]}>Saldo Unit Premi Top-Up</Text>
        </View>
        <View style={[plaiStyles.row, plaiStyles.px16, IFStyle.boxGreyE6]}>
          <Text style={[plaiStyles.flex, plaiStyles.font16, plaiStyles.fontGrey33, plaiStyles.lineH20]}>
            Total Dana Investasi
          </Text>
          <Text style={[plaiStyles.font18, plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>{totalValueFundTopUp}%</Text>
        </View>

        <CardFundList
          onSelectedFund={selectFund}
          onSlideChange={onSlideChange}
          openFactSheet={openFundFactSheet}
          data={fundListTopUp}
          selectedFund={selectedFundTopUp}
          valueRiskProfile={valueRiskProfile}
          section="topup"
          setVisible={setVisible}
        />
      </ScrollView>
      {isFundConfirmationPage && !loading && (
        <LoadingFundFactSheet
          selectedFund={selectedFund}
          fundFactSheetVisible={fundFactSheetVisible}
          setFundFactSheetFormVisible={setFundFactSheetFormVisible}
          finishDownloadConfirmation={async () => await onSave()}
          setLoading={setLoading}
        />
      )}
      <ModalInformation
        visible={visible}
        title={'Informasi'}
        desc={
          'Risiko dana investasi ini lebih tinggi dari profil risiko Anda. Silakan mengkaji ulang profil risiko Anda jika ingin memilih dana investasi ini.'
        }
        buttonPrimary={{
          text: 'Tutup',
          onPress: () => setVisible(false),
        }}
      />
      {/* Di bikin 2 karena Modal information yang di atas terikat sama CardFundList  */}
      <ModalInformation
        visible={visibleChanges}
        title={'Informasi'}
        desc={'Terdapat perubahan dana investasi. Apakah Anda yakin ingin melakukan perubahan?'}
        buttonPrimary={{
          text: 'Ya, Lanjutkan',
          onPress: () => {
            setVisibleChanges(false);
            setFundFactSheetFormVisible(true);
          },
        }}
        buttonSecondary={{
          text: 'Tidak',
          onPress: () => setVisibleChanges(false),
        }}
      />
      <EposFooter
        position={8}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: !nextEnable,
          // Debounce ga bisa di pake di sini, nanti di coba tracing kenapa bisa error
          onPress: onContinue,
        }}
      />
    </PruScreen>
  );
};
