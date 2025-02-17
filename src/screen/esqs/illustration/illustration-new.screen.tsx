import { View, Text, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PruActivityIndicator, PruScreen } from 'common_ui_components';
import PDF from 'react-native-pdf';
import { Divider, LoadingFull, plaiStyles } from 'plai_common_frontend';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/reducer';
import { useEposRealm } from '../../../database';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { EposHeader } from '../../../components';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { ISummaryProposal, productType, RealmISQSDetail } from '../../../utilities';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { Button } from 'common_ui_components/app/components-ui';
import { pruTestID } from 'common_services_frontend';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { LineChartPDF } from './line-chart-pdf';
import Share, { ShareOptions } from 'react-native-share';
import moment from 'moment';
import { generateBodyMessageEmail } from './email-message/generate-body-message';
import RNFS from 'react-native-fs';
import Toast from 'react-native-root-toast';
import { defaultTableChartData, generatePDF, onCreateDocIllustration, onMergeFFS, onMergeITSFFS, setDataTableChart, TTableChartData, TTableData } from 'epos_utilities/src/newbusiness';

export const IllustrationNewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params: any = route.params;
  const isSharePage = route.name === 'SQSIllustrationShare';
  const chartRef: any = useRef(null);
  const {
    getFundFactSheetDocRealm,
    getMultipleCustomer,
    updateSummaryByKey,
    updateSQSByKey,
    getSQSById,
    getSPAJById,
    getSummaryProposalById,
  } = useEposRealm();
  const { selectedSQSId, proposalId, isDoksul, agentProfile, spajId, campaignDate } = useSelector<RootState, any>(
    (state) => {
      return {
        selectedSQSId: state.epos.selectedSQSId,
        spajId: state.epos.spajId || '',
        proposalId: state.epos.proposalId,
        isDoksul: state.epos.isDoksul,
        agentProfile: state.auth.agentProfile,
        campaignDate: state.common?.appConfigs['ID.AGENCY']?.Sales?.newbusiness?.campaignDate || undefined,
      };
    },
  );

  const [tableChartData, setTableChartData] = useState<TTableChartData>(defaultTableChartData);
  const [loading, setLoading] = useState(true);
  const [loadingOnShare, setLoadingOnShare] = useState(false);
  const [pdfBase64, setPdfBase64] = useState('');
  const [pdfAll, setPdfAll] = useState('');
  const [pdfViewBase64, setPdfViewBase64] = useState('');
  const [FFSBase64, setFFSBase64] = useState('');
  const [nextPage, setNextPage] = useState(false);
  const [headerPageState, setHeaderPageState] = useState('Ilustrasi');
  const [titleMessage, setTitleMessage] = useState<string>('Ilustrasi');
  const [pdfScale, setPdfScale] = useState(1);
  const [pagePdf, setPagePdf] = useState({
    count: 0,
    total: 0,
  });
  const summaryProposalById = getSummaryProposalById(proposalId) as ISummaryProposal;

  const { SQSData, SPAJData, allCustomerData, isTraditionalProduct, ffsList, createdDate } = useMemo(() => {
    const _sqsData = getSQSById(selectedSQSId);
    const _spajData = getSPAJById(spajId);
    return {
      // @ts-ignore
      SQSData: _sqsData!,
      SPAJData: _spajData,
      allCustomerData: getMultipleCustomer(_sqsData?.clientIdSelected!),
      isTraditionalProduct: productType(_sqsData?.product?.key!) == 'TRD',
      ffsList: getFundFactSheetDocRealm(),
      createdDate: moment(getSummaryProposalById(proposalId)?.createdDate || new Date()).format('DD-MM-YYYY'),
    };
  }, []);

  useEffect(() => {
    if (isSharePage) {
      setLoadingOnShare(true);
    }
    setTimeout(() => {
      onSetTableChartData();
    }, 50);
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  const onSetTableChartData = async () => {
    if (!isTraditionalProduct) {
      const dataChartTable = await setDataTableChart(
        SQSData.resultIlustration,
        SQSData.calculator!,
        SQSData.calculatorTopup,
        SQSData.calculatorWithdrawl,
      );
      if (dataChartTable) setTableChartData(dataChartTable);
    } else {
      onCreatePdfIllustration();
    }
  };

  const onCreatePdfIllustration = async () => {
    try {
      let _base64Chart = '';
      if (!isTraditionalProduct) {
        _base64Chart = await captureRef(chartRef, {
          result: 'data-uri',
        });
      }
      const docIllustration = await onCreateDocIllustration({
        SQSData,
        SPAJData,
        allCustomerData,
        agentName: agentProfile.name.id.displayName,
        agentCode: agentProfile.agentCode,
        type: 'VIEW',
        tableData: tableChartData.table,
        chartImage: _base64Chart,
        createdDate: summaryProposalById?.createdDate!,
        campaignDate: campaignDate,
      });
      if (docIllustration) {
        saveDocsData(_base64Chart, tableChartData.table);
        const [_pdfBase64, pdfFFS] = await Promise.all([
          await generatePDF(docIllustration as TDocumentDefinitions),
          isTraditionalProduct ? '' : await onMergeFFS(ffsList, SQSData.fund!),
        ]);
        if (_pdfBase64) {
          setPdfBase64(_pdfBase64 as string);
          setPdfViewBase64(_pdfBase64 as string);
        }
        setLoading(false);
        let PDFWFFS = '';
        if (pdfFFS) {
          setFFSBase64(pdfFFS as string);
          PDFWFFS = await onMergeITSFFS(_pdfBase64 as string, pdfFFS);
          setPdfAll(PDFWFFS);
        }
        if (isSharePage) {
          const _pdfBase64OnShare = _pdfBase64;
          onShare(_pdfBase64OnShare as string);
        }
      } else {
        if (isSharePage) {
          setLoadingOnShare(false);
        }
        setLoading(false);
      }
    } catch (error) {
      if (isSharePage) {
        setLoadingOnShare(false);
      }
      setLoading(false);
    }
  };

  const saveDocsData = async (chartImage: string, dataTable: TTableData) => {
    const mapIlustrationDocs: RealmISQSDetail.Item['ilustrationDocs'] = [
      {
        document: chartImage,
        typeDocument: { key: 'object', label: 'object' },
        name: 'base64Data',
      },
      {
        document: JSON.stringify(dataTable),
        typeDocument: { key: 'object', label: 'object' },
        name: 'dataTable',
      },
    ];
    await updateSQSByKey(selectedSQSId, { key: 'ilustrationDocs', value: JSON.stringify(mapIlustrationDocs) });
  };

  const onPdfPageChange = (page: number, totalPage: number) => {
    setPagePdf({
      count: page,
      total: totalPage,
    });
  };

  const onZoomInOut = (type: string) => {
    if (type == 'in' && pdfScale < 3) {
      setPdfScale((prev) => prev + 0.25);
    }
    if (type == 'out' && pdfScale > 1) {
      setPdfScale((prev) => prev - 0.25);
    }
  };

  const onShare = async (pdfBase64All?: string) => {
    try {
      setLoadingOnShare(true);
      const PHName = allCustomerData[0]?.clientName;
      const TUName = allCustomerData.length > 1 ? allCustomerData[1]?.clientName : PHName;
      const fileName = `${PHName}-${TUName}_${moment().format('DDMMMYYYY')}_${moment().format('hhmmss')}`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;
      const pdfDownloadBase64 = pdfBase64All
        ? pdfBase64All
        : isTraditionalProduct
          ? pdfBase64
          : nextPage
            ? FFSBase64
            : pdfBase64;
      await RNFS.writeFile(filePath, pdfDownloadBase64, 'base64');
      const _options: ShareOptions = {
        filename: fileName,
        url: `file://${filePath}`,
        // url: `data:application/pdf;base64,${pdfBase64}`,
        message: generateBodyMessageEmail(SQSData!, allCustomerData, agentProfile, proposalId),
        failOnCancel: false,
        showAppsToView: true,
        subject: 'Ilustrasi Manfaat Perlindungan Asurasni Jiwa dan Hasil Analisa Resiko',
        type: 'application/pdf',
      };
      const resShare = await Share.open(_options);
      if (resShare) {
        if (isSharePage) {
          navigation.dispatch(StackActions.replace(EposRoutes.QUICK_QUOTE));
        }
        if (resShare.success) {
          Toast.show(`${titleMessage} berhasil diunduh`, {
            duration: 3000,
            position: Toast.positions.BOTTOM,
            containerStyle: {
              marginBottom: 120,
            },
          });
        }
        setLoadingOnShare(false);
      }
    } catch (error) {
      if (error) {
        setLoadingOnShare(false);
        if (isSharePage) {
          navigation.dispatch(StackActions.replace(EposRoutes.QUICK_QUOTE));
        }
      }
    }
  };

  const onBack = () => {
    if (nextPage) {
      setNextPage(false);
      setPdfViewBase64(pdfBase64);
      setHeaderPageState('Ilustrasi');
      return true;
    }
    const routes = isTraditionalProduct ? EposRoutes.QUICK_QUOTE : EposRoutes.INVESTMENT_FUND_CONFIRMATION;
    navigation.dispatch(StackActions.replace(routes));
    if (params?.flagIllustration) navigation.dispatch(StackActions.replace(EposRoutes.LANDING));
    return true;
  };

  const onSave = () => {
    const nextRoute = isDoksul
      ? EposDoksulRoutes.CONFIRM_PRODUCT_DOKSUL
      : isTraditionalProduct
        ? EposRoutes.SIGNATURE_PRODUCT_PWM
        : EposRoutes.CONFIRMATION_RECOMMENDATION_PRODUCT;
    updateSummaryByKey(proposalId, { key: 'lastState', value: nextRoute });
    if (isDoksul) {
      // @ts-ignore
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: nextRoute });
    } else {
      navigation.dispatch(StackActions.replace(nextRoute));
    }
    // setNextPage(false);
  };

  const onContinue = () => {
    if (!isTraditionalProduct && !nextPage) {
      //   setLoadingOnShare(true);
      setTimeout(() => {
        setPdfViewBase64(FFSBase64);
        setNextPage(true);
        setHeaderPageState('Fund Fact Sheet');
        setTitleMessage('Fund Fact Sheet');
      }, 100);
    } else {
      onSave();
    }
  };

  return (
    <PruScreen>
      {loadingOnShare && <LoadingFull />}
      {!isSharePage && (
        <EposHeader title={headerPageState} variant="back-button" onBack={onBack} wrapperStyle={[plaiStyles.px16]} />
      )}
      <View style={plaiStyles.flex}>
        {loading && !isSharePage && (
          <View style={[plaiStyles.flex, plaiStyles.alignCenter, plaiStyles.justifyCenter]}>
            <PruActivityIndicator />
          </View>
        )}
        {!loading && pdfViewBase64 && (
          <>
            <PDF
              style={plaiStyles.flex}
              source={{ uri: `data:application/pdf;base64,${pdfViewBase64}` }}
              onPageChanged={onPdfPageChange}
              scale={pdfScale}
            />
            {/* PDF Action Section */}
            <View
              style={[
                plaiStyles.row,
                plaiStyles.justifyBetween,
                plaiStyles.alignCenter,
                plaiStyles.px16,
                plaiStyles.py8,
                { backgroundColor: 'rgba(51, 51, 51, 0.70)' },
              ]}
            >
              <View style={plaiStyles.row}>
                <IconAnt name="pluscircleo" color="white" size={24} onPress={() => onZoomInOut('in')} />
                <Divider width={16} />
                <IconAnt name="minuscircleo" color="white" size={24} onPress={() => onZoomInOut('out')} />
              </View>
              <Text style={plaiStyles.fontWhite}>{`${pagePdf.count}/${pagePdf.total}`}</Text>
              <View>
                <Icon name="share-square-o" color="white" size={24} onPress={() => onShare()} />
              </View>
            </View>
          </>
        )}
      </View>
      {/* GENERATE TABLE FOR PDF */}
      {(tableChartData.chart.alive10Low.length > 1 && !isTraditionalProduct) && (
        <View ref={chartRef} collapsable={false} style={{ position: 'absolute', top: 2000 }}>
          <ViewShot captureMode="mount" onCapture={onCreatePdfIllustration}>
            <LineChartPDF data={tableChartData.chart} />
          </ViewShot>
        </View>
      )}
      {!params?.flagIllustration && !isSharePage && (
        <View style={plaiStyles.spacingp}>
          <Button text="Selanjutnya" onPress={onContinue} disabled={loading} {...pruTestID(`button-next-illustrasi`)} />
        </View>
      )}
    </PruScreen>
  );
};
