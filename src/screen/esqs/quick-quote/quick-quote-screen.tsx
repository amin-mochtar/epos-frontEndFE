import { View, Text, BackHandler } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { EposFooter, EposHeader, HeaderTitle } from '../../../components';
import { EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import { CardQuickQoute } from './components';
import { ScrollView } from 'react-native-gesture-handler';
import { LoadingFull, ModalInformation, plaiStyles } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, SQS_STATE, defaultSqsDataSlice, updateEposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { IQuickQuoteResult, generateQuickQuote, ISQSDetail, ISummaryProposal, productType } from '../../../utilities';

export const QuickQuoteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedSQSId, proposalId, allSQSId, ProspectDetail } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const {
    getSummaryProposalById,
    onUpdateSummary,
    getSQSById,
    getCustomerStorageById,
    deleteSQSById,
    updateSummaryByKey,
  } = useEposRealm();
  const [allSQS, setAllSQS] = useState<ISQSDetail[]>([]);
  const [quickQuoteData, setQuickQuoteData] = useState<IQuickQuoteResult[] | []>([]);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  /**
   * Set Data Dependency Not Change
   */
  const { isTraditionalProduct } = useMemo(() => {
    const _product = RSQSData?.product;
    return {
      PRODUCT: _product,
      isTraditionalProduct: productType(_product?.key!) == 'TRD',
    };
  }, [RSQSData?.product]);
  useEffect(() => {
    getSqsData();
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);
  const modalMessage: string =
    allSQS.length === 1
      ? 'Apakah Anda yakin ingin menghapus Quick Quote ini? Jika Ya, Anda harus mengulangi pembuatan ilustrasi.'
      : 'Apakah Anda yakin ingin menghapus Quick Quote ini?';

  const getSqsData = async () => {
    const sqsData: ISQSDetail[] = [];
    const tmpQuickQuote: any = [];
    await allSQSId.map(async (item) => {
      const sqs = await getSQSById(item);
      if (sqs) sqsData.push(sqs?.toJSON() as never);
    });
    setTimeout(async () => {
      await sqsData.map(async (item: ISQSDetail) => {
        const resCalcIllustration = item?.resultIlustration && JSON.parse(item?.resultIlustration);
        const resGenerateQuickQuote = generateQuickQuote(item.product?.key || '', item, resCalcIllustration?.content);

        tmpQuickQuote.push(resGenerateQuickQuote);
      });
      setQuickQuoteData(tmpQuickQuote);
    }, 100);

    setAllSQS(sqsData);
  };

  const onChangeSelectedQQ = (id: string) => {
    dispatch(
      updateEposState({
        selectedSQSId: id,
      }),
    );
  };

  const onBack = () => {
    const waitingPeriodType = RSQSData?.waitingPeriodType ? JSON.parse(RSQSData?.waitingPeriodType) : [];
    let backRoute = EposRoutes.WAITING_PERIOD;
    if (isTraditionalProduct || waitingPeriodType.length < 1) {
      backRoute = EposRoutes.CALCULATOR;
    }
    onSave(backRoute, 'back');
    return true;
  };

  const getProposalJSONData = (proposal: any, nextRoute: string) => {
    const proposalJSON = {
      ...proposal,
      lastState: nextRoute,
    } as ISummaryProposal;

    return proposalJSON;
  };

  const onSave = async (_route?: string, routeButton?: string) => {
    let nextRoute = _route || EposRoutes.INVESTMENT_FUND_CONFIRMATION;
    const proposal = getSummaryProposalById(proposalId)?.toJSON();
    if (isTraditionalProduct) {
      nextRoute = routeButton === 'back' ? EposRoutes.CALCULATOR : EposRoutes.ILLUSTRATION;
    }
    const proposalJSON = getProposalJSONData(proposal, nextRoute);
    // check if selected different for set data in summary proposal
    if (proposalJSON?.selectedSQSId != selectedSQSId) {
      const _sqsData = allSQS.filter((item) => item.sqsId == selectedSQSId)[0];
      const _lifeAssuredData = getCustomerStorageById(_sqsData.clientIdSelected[0]);
      let _mainAssuredData = undefined;
      // Check Policy Holder for Other
      if (_sqsData.lifeAssuredSelf == 'other') {
        _mainAssuredData = getCustomerStorageById(_sqsData.clientIdSelected[1]);
      }
      proposalJSON.lifeAssuredName = _lifeAssuredData?.clientName!;
      proposalJSON.policyHolderName = _mainAssuredData ? _mainAssuredData.clientName : _lifeAssuredData?.clientName!;
      proposalJSON.selectedSQSId = selectedSQSId;
    }
    onUpdateSummary(proposalJSON);
    navigation.dispatch(StackActions.replace(nextRoute));
  };

  const onDelete = (id: string) => {
    const _allSQS = allSQS.filter((item) => item.sqsId != id);
    const _quickQuoteData = quickQuoteData.filter((item) => item.sqsId != id);

    setAllSQS(_allSQS);
    setQuickQuoteData(_quickQuoteData);

    if (_allSQS.length === 0) {
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.PREVIOUSLY_OWNED_POLICY,
      });
      navigation.dispatch(
        StackActions.replace(EposRoutes.PREVIOUSLY_OWNED_POLICY, {
          paramSelectedSQSId: id,
          paramProposalId: proposalId,
          paramAllSQSId: allSQSId,
          paramLeadId: ProspectDetail?.leadId,
        }),
      );
    } else {
      const lengthNotMinus = _allSQS.length - 1 < 0 ? false : true;
      const tempId = lengthNotMinus ? _allSQS[_allSQS.length - 1] : undefined;
      if (tempId) {
        deleteSQSById(id);
        onChangeSelectedQQ(tempId?.sqsId);
      }
    }
    setVisibleModal(false);
  };
  const delayHandler = () => {
    setTimeout(() => {
      setVisibleModal(true);
    }, 500);
  }

  if ((allSQS.length === 0 || quickQuoteData.length === 0) && !visibleModal) {
    return (
      <PruScreen backgroundColor={PruColor.greyeb}>
        <LoadingFull />
      </PruScreen>
    );
  }
  return (
    <PruScreen backgroundColor={PruColor.greyeb}>
      <View style={plaiStyles.px16}>
        <EposHeader />
      </View>
      <ScrollView style={[plaiStyles.px16, plaiStyles.flex]}>
        <HeaderTitle
          title="Quick Quote"
          titleStyle={plaiStyles.fontHeaderTitle}
          descriptionTitle="Quick Quote hanya merupakan alat bantu bagi Tenaga Pemasar untuk memperkirakan kebutuhan nasabah dan bukan merupakan ilustrasi penjualan"
          descriptionStyle={[plaiStyles.fontHeaderSubTitle, plaiStyles.lineH20, plaiStyles.mt8]}
        />
        {(quickQuoteData || []).map((item: IQuickQuoteResult, index: number) => {
          return (
            <CardQuickQoute
              key={index}
              data={item}
              onPress={() => onChangeSelectedQQ(item.sqsId)}
              active={item.sqsId == selectedSQSId}
              quickQouteNumber={index}
              onDelete={() => delayHandler()}
              sqsCount={allSQS.length}
            />
          );
        })}
        {allSQS.length < 3 && (
          <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.btnSmall, plaiStyles.flex, plaiStyles.mt24]}
            textStyle={[plaiStyles.fontRed, plaiStyles.font14]}
            onPress={() => {
              const clientIdSelected: string = allSQS[allSQS.length - 1]?.clientIdSelected[0];
              const _lifeAssuredData = getCustomerStorageById(clientIdSelected!)?.toJSON();
              const parsedLifeAssuredData = _lifeAssuredData ? _lifeAssuredData : '';
              const mergedLifeAssuredData = {
                ...defaultSqsDataSlice.lifeAssuredData,
                ...parsedLifeAssuredData,
              };
              const newSqsData = {
                ...defaultSqsDataSlice,
                lifeAssuredData: mergedLifeAssuredData,
              };

              dispatch(
                updateEposState({
                  selectedSQSId: '',
                  sqsData: newSqsData,
                  sqsState: SQS_STATE.ADD_QQ,
                }),
              );
              navigation.dispatch(StackActions.replace(EposRoutes.PREVIOUSLY_OWNED_POLICY));
            }}
            text={'+ Tambah Quick Quote'}
          />
        )}
        <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.lineH20, plaiStyles.my24]}>
          Besarnya nilai tunai yang dibayarkan (bisa lebih besar atau lebih kecil dari yang diilustrasikan), akan
          bergantung pada perkembangan dari dana investasi yang dipilih oleh Nasabah
        </Text>
        <ModalInformation
          visible={visibleModal}
          title={'Hapus Quick Quote'}
          desc={modalMessage}
          buttonPrimary={{
            text: 'Ya, Hapus',
            onPress: () => {
              onDelete(selectedSQSId);
            },
          }}
          buttonSecondary={{
            text: 'Tidak',
            onPress: () => {
              setVisibleModal(false);
            },
          }}
        />
      </ScrollView>
      <EposFooter
        position={11}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: false,
          onPress: onSave,
        }}
      />
    </PruScreen>
  );
};
