import { View, ScrollView, Text } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PruActivityIndicator, PruColor, PruScreen } from 'common_ui_components';
import {
  ModalContainer,
  ModalInformation,
  emptySearch,
  plaiStyles,
  sanitizedText,
  LoadingFull,
  TCommonConstantData
} from 'plai_common_frontend';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { CHANNEL, WR_SHARIA_CONVENT, statement, ISQSDetail, ISummaryProposal, showModalMaintenance, ISPAJData, productType, showModalConnectionOffline, showModalIquaryAgentFailed, filterOnlyDigitNumber } from '../../../utilities';
import { DoksulHeader, OptionCard, SectionTitle, TOptionalCardData } from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, responseData, TDoksulData, updateEposState } from '../../../redux';
import {
  DataAdditionalForms,
  generateSPAJData,
  initProposalData,
  useEposRealm,
} from '../../../database';
import { DraftListStatus } from '../../landing/components';
import { failure } from '../../../assets';
import { checkAgentInquary, getProductRecommendationConversionData, searchByNoSPAJ, sendPaydiSMS } from '../../../network';
import { CardDoksul } from './components/card-doksul';
import { PersonalInfoDoksul } from './components/personal-info-doksul';
import { useTranslation } from 'react-i18next';
import { SearchDoksulForm } from './components/search-data-doksul-form';
import NetInfo from '@react-native-community/netinfo';
import { getTabRoutes } from '../doksul-document/doksul-docs.function';
import { ENV, PROJECT_NAME } from '@env';

type TOptionFormSupport = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export type TResponseData = {
  loading: boolean,
  responseCode: string,
  data: TDoksulData[]
}

type TDataConversion = {
  product: any,
  eligible: boolean
  isGio: boolean,
  policyNumber: string
  productCode: string
}

type TModalALert = {
  visible: boolean,
  title: string,
  desc: string
}

type TParams = {
  [key: string]: any
}

export const DoksulScreen = () => {
  const isDEV = ENV === "DEV"
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const param = useRoute();
  const paramRoutes = param?.params as TParams
  const { statementDoksul, spajNumber, spajId, selectedSQSId, proposalId, isDoksulCTA } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const {
    initEpos,
    onUpdateAdditionalForms,
    onUpdateSPAJ,
    updateSummaryByKey,
    getSQSById,
    getSPAJById,
    getSummaryProposalById
  } = useEposRealm();

  const summaryById = getSummaryProposalById(proposalId) as ISummaryProposal;
  const RSQSData = getSQSById(selectedSQSId) as ISQSDetail;
  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');
  const RSPAJData = getSPAJById(spajId) as ISPAJData;
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData!) : null;
  const isLampungAddress = policyHolderData?.clientResidenceProvince?.key === 'LAMPUNG';
  const [createSummaryLoading, setcreateSummaryLoading] = useState(false)

  const [doksulAggrement, setDoksulAggrement] = useState<TCommonConstantData>(statementDoksul);
  const [searchSpajNumber, setSearchSpajNumber] = useState<string>(spajNumber);
  const [hasAdditionalLA, setHasAdditionalLA] = useState<boolean>(Boolean(RSPAJData?.additionalInsured))
  const [modalDocs, setModalDocs] = useState(false);
  const agentCode = authState?.agentCode!;

  const [dataConversion, setDataConversion] = useState<TDataConversion>({
    product: null,
    eligible: false,
    isGio: false,
    policyNumber: '',
    productCode: '',
  })

  const [responseData, setResponseData] = useState<TResponseData>({
    loading: false,
    responseCode: '',
    data: []
  })

  const [modalAlert, setModalAlert] = useState<TModalALert>({
    visible: false,
    title: '',
    desc: ''
  })

  const {
    policyHolderName,
    policyHolderPhone,
    policyHolderDob,
    lifeAssuredName,
    lifeAssuredDob,
    productCode,
    productName,
    currency,
    leadId,
    shariaFlag
  } = summaryById ?? ''
  const isSelf = RSQSData?.lifeAssuredSelf === 'self'
  const draftInfo = useMemo(() => {
    const {
      name: namePH,
      phoneNumber: phoneNumberPH,
      dob: dobPH,
      email: emailPH,
      productCode: productCodePH,
      syariahFlag,
      currency: currencyPH
    } = responseData?.data[0] ?? {}

    const {
      name: nameLA,
      dob: dobLA
    } = responseData?.data[1] ?? {}

    return {
      policyHolderName: spajNumber ? policyHolderName : namePH,
      policyHolderPhone: spajNumber ? policyHolderPhone : phoneNumberPH,
      policyHolderDob: spajNumber ? policyHolderDob : dobPH,
      policyHolderEmail: spajNumber ? policyHolderData?.clientEmail : emailPH,
      lifeAssuredName: spajNumber ? isSelf ? policyHolderName : lifeAssuredName : nameLA,
      lifeAssuredDob: spajNumber ? isSelf ? policyHolderDob : lifeAssuredDob : dobLA,
      shariaFlag: spajNumber ? shariaFlag : syariahFlag === 'Y' ? 'sharia' : 'conventional',
      productCode: spajNumber ? productCode : productCodePH,
      productName: spajNumber ? productName : CHANNEL[productCodePH]?.longName,
      currency: spajNumber ? currency : currencyPH,
    }

  }, [spajNumber, summaryById, responseData?.data, RSQSData?.policyType])


  const wording = useMemo(() => WR_SHARIA_CONVENT[draftInfo?.shariaFlag || 'conventional'], [draftInfo?.shariaFlag]);

  const checkProductPWM = (productCode: string) => {
    return ['H14', 'H15'].includes(productCode)
  }

  const isUnitLink = productType(draftInfo?.productCode) == 'UL';

  const filterWakafFunction = (item: TOptionFormSupport) => (draftInfo?.shariaFlag == 'sharia' || isUnitLink ? item : item.label !== 'Formulir Pendukung Wakaf')

  const isPWM_PWMS = checkProductPWM(draftInfo.productCode);

  const productTypeDoksul = productType(draftInfo?.productCode);

  const isProductTraditional = useMemo(() => productTypeDoksul === 'TRD', [draftInfo]);

  // variable for sending message
  const jsonSubmit = {
    clientName: draftInfo?.policyHolderName,
    emailClient: draftInfo?.policyHolderEmail,
    rider: [],
    productCode: draftInfo?.productCode,
    productName: draftInfo?.productName,
    currency: draftInfo?.currency,
    spajNumber: searchSpajNumber || ''
  };

  // nanti gw masukin ke API.ts kelar beberapa bugfixing major

  const getConversionData = async (data: TDoksulData[]) => {
    const conversionDatas = await getProductRecommendationConversionData(agentCode, data[0]?.clientNumber!);

    if (Array.isArray(conversionDatas) && conversionDatas?.length) {
      let _isGio = false;
      let _policyNumber = '';
      let _productCode = ''
      conversionDatas.map((convData) => {
        _policyNumber = convData.policyNumber;
        _productCode = convData?.currentData?.currRiderCode.substr(0, 3);
        if (convData.convFlag == 'GIO') {
          _isGio = true;
        }
      })
      setDataConversion({
        product: conversionDatas[0],
        eligible: true,
        isGio: _isGio,
        policyNumber: _policyNumber,
        productCode: _productCode
      })

    } else if (conversionDatas === 500) {
      setResponseData({
        loading: false,
        responseCode: '',
        data: []
      })
      showModalMaintenance();
    }
  }

  const _searchByNoSPAJ = async () => {
    try {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        try {
          setResponseData({
            loading: true,
            responseCode: '',
            data: []
          })

          const response = await searchByNoSPAJ({ proposalNo: searchSpajNumber, agentNo: agentCode });
          const responseData = response as any;

          const data = responseData?.data?.data;
          const responsCode = responseData?.data?.responseCode;

          if (responseData?.status === 200) {
            //data founded
            if (responsCode === '00') {
              setResponseData({
                loading: false,
                responseCode: responsCode,
                data: data
              })

              // if product PWM/PWMS then check data conversion
              if (checkProductPWM(data[0]?.productCode)) {
                getConversionData(data)
              }

              // check if spaj has additional LA (TT)
              if (data.length > 2) {
                setHasAdditionalLA(true)
              }

              // data not found
            } else if (['99', '01'].includes(responsCode)) {
              setResponseData({
                loading: false,
                responseCode: responsCode,
                data: []
              })
            }

          } else if (responseData?.problem !== '') {
            showModalMaintenance();
            setResponseData({
              loading: false,
              responseCode: responsCode,
              data: []
            })
          }
        } catch (error) {
          showModalMaintenance();
        }
        return
      }
      showModalConnectionOffline(_searchByNoSPAJ);
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  const disableButton = spajNumber ? true : responseData?.responseCode === '00' && responseData?.data?.length > 0;

  const restNoSpaj = () => {
    setSearchSpajNumber('');
    setResponseData({
      loading: false,
      responseCode: '',
      data: []
    })
    setDataConversion({
      product: null,
      eligible: false,
      isGio: false,
      policyNumber: '',
      productCode: ''
    })
  };


  const sendSMS = async (data: any) => {
    try {
      const responseSMS = await sendPaydiSMS(data) as responseData

      if (responseSMS?.problem === '' && responseSMS?.status === 201) {
        setResponseData({
          loading: false,
          responseCode: '',
          data: []
        })
        updateSummaryByKey(proposalId, [
          //@ts-ignore
          { key: 'cekatanId', value: responseSMS?.data?.data?.data?.transactionId }
        ]);
        dispatch(updateEposState({ RMessaging: responseSMS }));
        navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.LINK_SUBMITTED });

      } else {
        setModalAlert({
          visible: true,
          title: 'Gagal Kirim SMS',
          desc: 'Silakan mencoba kembali dan pastikan koneksi internet Anda dalam keadaan baik.'
        })
        // setModalInternetError(true);
      }

    } catch (error) {
      showModalMaintenance();
    }
  }
  let timeout: any = null;
  const debounce = (func: (lastState: string, statusDoksul: string) => void, delay: number) => {
    return (lastState: string, statusDoksul: string) => {
      if (timeout) clearTimeout(timeout);
      setcreateSummaryLoading(true)
      timeout = setTimeout(() => {
        func(lastState, statusDoksul);
      }, delay);
    };
  };

  const createSUmmaryProposal = debounce(async (lastState: string, statusDoksul: string) => {
    const isAudioRecording = statusDoksul === 'Audio Recording Virtual Tatap Muka';

    if (modalDocs) {
      setModalDocs(!modalDocs);
    }
    const status = [
      'SQS',
      'Formulir Pendukung Lampung',
      'Formulir Pendukung Wakaf',
      'Formulir Surat Keterikatan Asuransi',
    ];

    enum enumDoksulType {
      "SQS" = "SQS",
      "Amandemen" = "AMEND",
      "Dokumen Pendukung" = "DOC_UPL",
      "Interaksi Tenaga Pemasar" = "AMEND_AGENT",
      "Formulir Campaign GIO PRUWell Medical" = "FORM-CONV",
      "Formulir Konversi PRUWell Medical (Full UW)" = "FORM-CONV",
      "Formulir Pendukung Lampung" = "UW61",
      "Formulir Pendukung Wakaf" = "WAKAF",
      "Formulir Surat Keterikatan Asuransi" = "SKA",
      "Formulir Pembayar Premi" = "UW6",
      "Formulir Pembayar Kontribusi" = "UW6",
    }

    const needExistingData = status.includes(statusDoksul);

    //spaj
    const _SPAJData = generateSPAJData();
    const spajId = { ..._SPAJData }.spajId;

    //create additionalFormId
    const _DataAdditionalForms = DataAdditionalForms();
    onUpdateAdditionalForms(_DataAdditionalForms);
    const additionalFormsId = { ..._DataAdditionalForms }.additionalFormId;

    // summary proposal
    const { summaryProposal, sqsDetail } = await initProposalData();
    const _summaryProposal: ISummaryProposal = {
      ...summaryProposal,
      isDoksul: true,
      isDoksulCTA,
      statusProposal: isAudioRecording ? 'Submitted' : 'Draft',
      lastState,
      statusDoksul,
      spajId,
      additionalFormsId,
      policyHolderName: draftInfo?.policyHolderName,
      policyHolderDob: draftInfo?.policyHolderDob,
      policyHolderPhone: draftInfo?.policyHolderPhone,
      lifeAssuredName: draftInfo?.lifeAssuredName,
      lifeAssuredDob: draftInfo?.lifeAssuredDob,
      productCode: draftInfo?.productCode,
      productName: draftInfo?.productName,
      spajNumber: searchSpajNumber,
      // temporary of currency PNG PNGS
      currency: 'IDR',
      shariaFlag: draftInfo?.shariaFlag,
      leadId: spajNumber ? leadId : '',
      agentCode: authState?.agentCode,
      doksulType: enumDoksulType[statusDoksul],
      submitDate: isAudioRecording ? moment().toISOString() : '',
      convData: JSON.stringify(dataConversion),
      hasAdditionalLA: isDoksulCTA ? hasAdditionalLA : true
    };

    // doksul CTA & need esub data
    if (spajNumber && needExistingData) {
      // spaj
      let JSONSPAJData = JSON.parse(JSON.stringify(RSPAJData));
      JSONSPAJData = {
        ...JSONSPAJData,
        spajId: spajId,
        policyHolderDocs: statusDoksul == 'SQS' ? '' : JSONSPAJData?.policyHolderDocs

      };
      onUpdateSPAJ(JSONSPAJData);

      // sqs
      let _RSQSData = JSON.parse(JSON.stringify(RSQSData));
      _RSQSData = {
        ..._RSQSData,
        sqsId: sqsDetail.sqsId,
      };

      // summaryproposal & sqs
      await initEpos(_RSQSData, _summaryProposal);

      // save to redux state
      await dispatch(
        updateEposState({
          proposalId: _summaryProposal.proposalId,
          selectedSQSId: _summaryProposal.selectedSQSId,
          allSQSId: _summaryProposal.allSQSId.split(','),
          isDoksul: true,
          statusProposal: 'Draft',
          statusDoksul,
          spajId: _SPAJData.spajId,
          additionalFormsId: _DataAdditionalForms.additionalFormId,
          shariaFlag: draftInfo?.shariaFlag,
          customerStorageId: _RSQSData?.clientIdSelected,
          statementDoksul: doksulAggrement
        }),
      );

      // doksul buta & cta doesn't need esub data
    } else {
      // create spajId
      onUpdateSPAJ(_SPAJData);

      //sqs
      const _sqsDetail = {
        ...{
          ...sqsDetail,
          isDomicileSumatraUtara: false,
          SelectedCitySumatraUtara: '',
          convDataResult: dataConversion?.product ? JSON.stringify(dataConversion.product) : ''
        },
      } as ISQSDetail;

      // summaryproposal & sqs
      await initEpos(_sqsDetail, _summaryProposal);

      await dispatch(
        updateEposState({
          proposalId: _summaryProposal.proposalId,
          selectedSQSId: _summaryProposal.selectedSQSId,
          allSQSId: _summaryProposal.allSQSId.split(','),
          isDoksul: true,
          statusProposal: 'Draft',
          statusDoksul,
          spajId: _SPAJData.spajId,
          additionalFormsId: _DataAdditionalForms.additionalFormId,
          shariaFlag: draftInfo?.shariaFlag,
          spajNumber,
          statementDoksul: doksulAggrement
        }),
      );
    }

    // redirect to next page
    const keyOfStatusDoksul = ['Interaksi Tenaga Pemasar', 'Dokumen Pendukung'];
    if (!isAudioRecording) {
      if (lastState === EposRoutes.INSURANCE_ATTACHMENT_LETTER && isDoksulCTA) {
        const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
        navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.INSURANCE_ATTACHMENT_LETTER, params: { defaultBenef: beneficiary } });
        return
      }

      // if from doksul navigation
      if (keyOfStatusDoksul.includes(statusDoksul)) {
        let formDoksulExisted: string[] = [];
        if (isDoksulCTA) {
          const clonedRSPAJData = JSON.parse(JSON.stringify(RSPAJData));
          formDoksulExisted = getTabRoutes(clonedRSPAJData);
        }

        navigation.dispatch(StackActions.replace(lastState, { formDoksulExisted }));
      } else {
        navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: lastState });
      }
    }

    // sending message for audio recording
    const data = {
      proposalId: _summaryProposal.proposalId,
      phoneNo: filterOnlyDigitNumber(draftInfo.policyHolderPhone),
      dob: moment(draftInfo.policyHolderDob).format('YYYYMMDD'),
      isDoksul: true,
      jsonSubmit: JSON.stringify(jsonSubmit),
    };

    if (isAudioRecording) {
      setResponseData({
        loading: true,
        responseCode: '',
        data: []
      })
      sendSMS(data);
    }
    setcreateSummaryLoading(false)

  }, 500);

  const createAgentInquary = () => {
    const params = {
      proposalNumber: spajNumber,
      agentNumber: agentCode
    }
    checkAgentInquary(params).then((res) => {
      if (res?.data?.data?.responseCode == '00') {
        createSUmmaryProposal(EposDoksulRoutes.MARKETERS_INTERACTION, 'Interaksi Tenaga Pemasar')
      } else {
        showModalIquaryAgentFailed(res?.data?.data?.responseCode as string)
      }
    }).catch(() => {
      showModalConnectionOffline()
    })
  }


  const allDoksulList = {
    cardDoksul: [
      {
        label: 'SQS',
        onPress: () => createSUmmaryProposal(EposRoutes.PREVIOUSLY_OWNED_POLICY, 'SQS')
      },
      {
        label: 'Amendemen',
        onPress: () => createSUmmaryProposal(EposRoutes.SPAJ_AMANDEMENT, 'Amandemen')
      },
      {
        label: 'Dokumen Pendukung',
        onPress: () => createSUmmaryProposal(EposDoksulRoutes.DOKSUL_DOCUMENT, 'Dokumen Pendukung')
      },
      {
        label: 'Formulir Pendukung',
        onPress: () => setModalDocs(true)
      },
    ],
    agentInteraction: [
      {
        label: 'Interaksi Tenaga Pemasar',
        onPress: () => createAgentInquary()
      }
    ],
    formPendukung: [
      {
        label: 'Formulir Pendukung Lampung',
        onPress: () => {
          // if doksul cta with product pwm/pwms without lampung adress
          if (spajNumber && (isPWM_PWMS || isHealth) && !isLampungAddress) {
            setModalAlert({
              visible: true,
              title: 'Tidak Dapat Melanjutkan',
              desc: 'Nasabah ini tidak dapat mengisi Formulir Lampung, karena belum memenuhi syarat Kebijakan Internal.'
            })
          } else {
            createSUmmaryProposal(EposRoutes.LAMPUNG_FORM, 'Formulir Pendukung Lampung')
          }
        },
      },
      {
        label: 'Formulir Pendukung Wakaf',
        onPress: () => createSUmmaryProposal(EposRoutes.SPAJ_BENEFICIARY_CANDIDATE, 'Formulir Pendukung Wakaf'),
      },
      {
        label: `Formulir Pembayar ${wording.premiContribution}`,
        onPress: () =>
          createSUmmaryProposal(
            EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE,
            `Formulir Pembayar ${wording.premiContribution}`,
          ),
      },
      {
        label: 'Formulir Surat Keterikatan Asuransi',
        onPress: () =>
          createSUmmaryProposal(EposRoutes.INSURANCE_ATTACHMENT_LETTER, 'Formulir Surat Keterikatan Asuransi'),
      },
    ],
    formConversion: [
      {
        label: 'Formulir Campaign GIO PRUWell Medical',
        onPress: () => createSUmmaryProposal(EposRoutes.FORM_CONVERSION, 'Formulir Campaign GIO PRUWell Medical'),
        disabled: !dataConversion?.isGio,
      },
      {
        label: 'Formulir Konversi PRUWell Medical (Full UW)',
        onPress: () => createSUmmaryProposal(EposRoutes.FORM_CONVERSION, 'Formulir Konversi PRUWell Medical (Full UW)'),
        disabled: dataConversion?.isGio,
      }
    ]
  }

  const { cardDoksul, agentInteraction, formConversion, formPendukung } = allDoksulList

  const newCardDoksul = spajNumber ? cardDoksul.concat(agentInteraction) : cardDoksul
  const formLampung = ['H14', 'H15'].includes(draftInfo?.productCode)
  let formulirPendukung = isPWM_PWMS ? formPendukung.concat(formConversion) : formPendukung;
  formulirPendukung = formLampung ? formulirPendukung : formulirPendukung.filter((item) => item.label !== "Formulir Pendukung Lampung")

  useEffect(() => {
    if (paramRoutes?.isBackHomeDoksul) {
      setcreateSummaryLoading(false)
    }

    if (isProductTraditional && draftInfo?.policyHolderName) {
      setDoksulAggrement({ key: 'N', label: t('Epos:no') })
      if (RSQSData?.convDataResult) {
        const convData = JSON.parse(RSQSData.convDataResult)
        let _isGio = false;
        let _policyNumber = '';
        let _productCode = ''
        _policyNumber = convData.policyNumber;
        _productCode = convData?.currentData?.currRiderCode.substr(0, 3);
        if (convData.convFlag == 'GIO') {
          _isGio = true;
        }
        setDataConversion({
          product: convData,
          eligible: true,
          isGio: _isGio,
          policyNumber: _policyNumber,
          productCode: _productCode
        })
      }
    }

  }, [paramRoutes, draftInfo?.policyHolderName, isProductTraditional]);


  const primaryButton = {
    text: modalAlert?.title === 'Gagal Kirim SMS' ? 'Coba Lagi' : modalAlert?.title === 'Kirim SMS' ? 'Ya' : 'Tutup',
    onPress: () => {
      setModalAlert({
        visible: false,
        title: '',
        desc: ''
      })
      if (modalAlert?.title === 'Gagal Kirim SMS') {
        _searchByNoSPAJ();
      } else if (modalAlert?.title === 'Kirim SMS') {
        createSUmmaryProposal(EposDoksulRoutes.DOKSUL, 'Audio Recording Virtual Tatap Muka');
      }
    },
  };

  const secondaryButton = modalAlert?.title === 'Tidak Dapat Melanjutkan'
    ? null
    : {
      text: modalAlert?.title === 'Kirim SMS' ? 'Tidak' : 'Batal',
      onPress: () => {
        setModalAlert({
          visible: false,
          title: '',
          desc: ''
        })
        setResponseData({
          loading: false,
          responseCode: '',
          data: []
        })
      },
    }

  // only product png/s & pwm/s
  const isProductValid = useMemo(() => {
    let includedProduct = ['U12', 'U13', 'H14', 'H15'];
    //doksul for product variant
    includedProduct = [...includedProduct, 'T1Q', 'T1P', 'L1Q', 'C16', 'E1O1', 'E1OR', 'E1O', 'E1OP', 'L1WR'];
    return includedProduct.includes(draftInfo?.productCode)
  }, [responseData, PROJECT_NAME])

  const isFoundData = draftInfo?.policyHolderName !== undefined && draftInfo?.policyHolderName !== '' && isProductValid && doksulAggrement?.key

  return (
    <>
      {createSummaryLoading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <View style={[plaiStyles.px16, plaiStyles.mt16]}>
          <DoksulHeader
            title={'Dokumen Susulan'}
            onPress={() => {
              restNoSpaj();
              navigation.dispatch(StackActions.replace(EposDoksulRoutes.LANDING_DOKSUL));
            }}
          />
        </View>
        <ScrollView style={plaiStyles.bgGrey}>
          <View style={[plaiStyles.bgwhite, plaiStyles.px16, plaiStyles.pb16]}>
            <OptionCard
              required={true}
              label={
                'Apakah Anda ingin mengirim dan menerima persetujuan dokumen susulan kepada nasabah dengan Tatap Muka Virtual?'
              }
              style={[plaiStyles.flex, plaiStyles.row]}
              insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
              theme="border"
              data={statement}
              selected={doksulAggrement}
              onSelected={setDoksulAggrement}
              // if there one of data & product traditional then disable
              onDisabled={() => (draftInfo?.policyHolderName && isProductTraditional)}
            />

            {/* <View>
            <InputField
              containerStyle={[plaiStyles.borderF0, plaiStyles.px8]}
              border={false}
              placeholder={'Terendah'}
              keyboardType="phone-pad"
              leftItem={(<Text>IDR</Text>)}
              value={"" as string}
              setValue={(value: string) => {
              }}
              id='input-annual-premium'
            />
          </View> */}
          </View>

          {(doksulAggrement?.key === 'Y' || doksulAggrement?.key === 'N') && (
            <View style={[plaiStyles.bgwhite, plaiStyles.mt8, plaiStyles.spacingp]}>
              <SearchDoksulForm
                spajNumber={spajNumber}
                value={searchSpajNumber}
                onChangeText={(item) => setSearchSpajNumber(sanitizedText(item))}
                editable={disableButton}
                data={responseData}
                onPressReset={restNoSpaj}
                onPressSearch={_searchByNoSPAJ}
              />

              {(!responseData.data?.length && ['01', '99'].includes(responseData?.responseCode) || (!!responseData?.data?.length && !isProductValid)) && (
                <DraftListStatus
                  image={emptySearch}
                  type="emptyDraft"
                  title="Nomor SPAJ Tidak Ditemukan"
                  subTitle="Tidak ada polis yang sesuai dengan nomor pencarian Anda. Silahkan ubah nomor SPAJ yang ingin anda cari"
                />
              )}
            </View>
          )}

          {responseData?.loading ? (
            <PruActivityIndicator style={[plaiStyles.mt32, plaiStyles.flex, plaiStyles.justifyCenter]} />
          ) :
            isFoundData && (
              <View style={[plaiStyles.bgwhite, plaiStyles.mt8, plaiStyles.spacingp]}>
                <PersonalInfoDoksul data={draftInfo} />

                <SectionTitle text={'Pilih Jenis Doksul'} />

                {doksulAggrement?.key === 'N' && (
                  newCardDoksul.map((item) => (
                    <CardDoksul
                      label={item.label}
                      onPress={item.onPress}
                    />
                  ))
                )}

                {doksulAggrement?.key === 'Y' && (
                  <CardDoksul label="Audio Recording" onPress={() => setModalAlert({
                    visible: true,
                    title: 'Kirim SMS',
                    desc: 'Apakah Anda ingin mengirim tautan melalui SMS untuk Rekaman Suara Calon Pemegang Polis?'
                  })} />
                )}
              </View>
            )}
        </ScrollView>

        <ModalContainer
          titleHeader={'Formulir Pendukung'}
          visible={modalDocs}
          onClose={() => {
            setModalDocs(!modalDocs);
          }}
        >
          <View style={[plaiStyles.mb12]}>
            {formulirPendukung
              .filter(filterWakafFunction)
              .map((item: TOptionFormSupport) => {
                const textStyle = item.disabled ? [plaiStyles.fontGreycc] : [plaiStyles.fontBlackThin];
                return (
                  <Button
                    style={[plaiStyles.borderGreycc, plaiStyles.btnSmall, plaiStyles.mb12]}
                    textStyle={textStyle}
                    onPress={item.onPress}
                    text={item.label}
                    disabled={item.disabled}
                  />
                );
              })}
          </View>
        </ModalContainer>

        <ModalInformation
          visible={modalAlert?.visible}
          title={modalAlert?.title}
          desc={modalAlert?.desc}
          image={modalAlert?.title === 'Gagal Kirim SMS' ? failure : null}
          buttonPrimary={primaryButton}
          buttonSecondary={secondaryButton}
        />

      </PruScreen>
    </>
  );
};
