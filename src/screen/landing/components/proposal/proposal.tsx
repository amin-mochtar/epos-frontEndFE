import { View, Text } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { DraftCard, ModalMenu, TConfigCard, plaiStyles, setMultipleSelect, ModalInformation, emptyDraft, TCommonConstantData, LoadingFull } from 'plai_common_frontend'
import { FlatList } from 'react-native'
import { initProposalData, useEposRealm, useQuery } from '../../../../database';
import { CONFIG_CARD } from '../../landing.data';
import { useDispatch, useSelector } from 'react-redux';
import { ProspectDetailLead, SummaryDraft, defaultSqsDataSlice, resetRMicrosite, resetResponsePayment, updateEposState, updateProspectDetailLead } from '../../../../redux';
import { ModalButtonType, TButtonConfig } from '../../type/landing.type';
import { EposRoutes } from '../../../../navigation';
import { StackActions, useNavigation } from '@react-navigation/native';
import { defaultTFormDataClient } from '../../../esqs/policy-owner-data/policy-owner-data.type';
import { checkStatusMicrosite, getPaydiSMS, sendPaydiSMS, syncLocaltoService } from '../../../../network';
import { Button } from 'common_ui_components/app/components-ui';
import { LHComponent } from '../sub-component/subComponent';
import { DraftListStatus } from '../draft-list-status/draft-list-status';
import { bulkMagnumExport } from '../../../../utilities/magnum-service';
import { responseModalInformation, TResponseData } from '../../landing.screen';
import { anbUpdated, ICustomerStorage, isEmailAutomation, ISummaryProposal, productType, sortPolicyHolderName, summaryDraftFilter, validMagnumData, WR_SHARIA_CONVENT } from '../../../../utilities';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-community/clipboard';
import { PruUI } from 'common_ui_components';
import { ENV } from '@env';
import { useAgentDorman } from './../../../../hooks'

type TOtherProposal = {
  setResponseData: (value: TResponseData) => void;
  paramSearch: string,
  paramFilter: any
}

type TresponseModal = {
  visible: boolean,
  title: string,
  desc: string
}


export default function Proposal({ setResponseData, paramSearch = '', paramFilter = {} }: TOtherProposal) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isAgentDormanValid } = useAgentDorman();
  const { t } = useTranslation();
  const SummaryDataProposal = useQuery<ISummaryProposal>('SummaryProposal');
  const authState = useSelector((state: any) => { return state.auth });
  const {
    initEpos,
    getSQSById,
    deleteProposalbyID,
    getSummaryProposalById,
    updateSummaryByKey,
    getSPAJById,
    getAdditionalFormById,
    getCustomerStorageById,
    onUpdateSQS,
  } = useEposRealm();
  const [isMultipleSync, setIsMultipleSync] = useState<boolean>(false);
  const [selectedDraftSync, setSelectedDraftSync] = useState<string[]>([]);
  const [additionalMenu, setAdditionalMenu] = useState<boolean>(false);
  const [responseModal, setResponseModal] = useState<TresponseModal>({
    visible: false,
    title: '',
    desc: ''
  });
  const [responseCodePaydi, setResponseCodePaydi] = useState('')
  const [modalLinkOtp, setModalLinkOtp] = useState({
    visible: false,
    title: '',
    desc: '',
    link: '',
    otp: ''
  })
  const [modalBlockingContinue, setModalBlockingContinue] = useState({
    visible: false,
    title: t('Epos:info'),
    desc: '',
    primaryButton: {
      text: '',
      onPress: () => { }
    }
  })
  const [modalButton, setModalButton] = useState<ModalButtonType[] | []>([]);
  const [selectedProposalId, setSelectedProposalId] = useState<string>('');

  const sortDate = (data: SummaryDraft[], labelCategory: string, key?: boolean) =>
    data.sort((a, b) => {
      const DateA = new Date(a[labelCategory]).getTime();
      const DateB = new Date(b[labelCategory]).getTime();
      return key ? DateA - DateB : DateB - DateA;
    });


  //get all proposal esub
  const _SummaryDataProposal = () => {
    let filterByAgenCode = SummaryDataProposal?.filter((value: any) => (
      value.isDoksul !== true && value.agentCode == authState?.agentCode
    ));

    return sortDate(filterByAgenCode, 'createdDate')
  }


  // get param for sync local to server
  let summaryProposalList = selectedDraftSync?.map((item) => getSummaryProposalById(item));

  summaryProposalList?.forEach(async (obj: any) => {
    const sqsDetailData = getSQSById(obj?.selectedSQSId)
    const spajDetailData = getSPAJById(obj?.spajId)
    const additionalFormData = getAdditionalFormById(obj?.additionalFormsId)
    const dataPH = getCustomerStorageById(sqsDetailData?.clientIdSelected[0]!)
    const customerStorageData = [dataPH]

    if (sqsDetailData?.lifeAssuredSelf != 'self') {
      const dataTU = getCustomerStorageById(sqsDetailData?.clientIdSelected[1]!)
      customerStorageData.push(dataTU)

      if (sqsDetailData?.additionalLifeAssuredSelf) {
        const dataTT = getCustomerStorageById(sqsDetailData?.clientIdSelected[2]!)
        customerStorageData.push(dataTT)
      }
    }

    obj.sqsDetailData = [sqsDetailData]
    obj.spajDetailData = [spajDetailData]
    obj.additionalFormData = [additionalFormData]
    obj.customerStorageData = customerStorageData
  });

  const ResponseSuccess = 'Tautan untuk pengisian deklarasi video produk dan asuransi tambahan (jika ada), Formulir Pernyataan Pemahaman PAYDI dan rekaman suara telah terkirim ke nomor handphone Calon Pemegang Polis.'

  const { loading, isError, isSuccess: successSMS } = responseModalInformation(ResponseSuccess);

  const { isSuccess: successSync } = responseModalInformation(summaryProposalList);


  const renderListDraft = ({ item, index }: { item: ISummaryProposal; index: number }) => {
    // Solution 2 Function
    const configCardFunction = createConfigCard({ item });

    return (
      <DraftCard
        wrapperStyle={plaiStyles.mt12}
        config={configCardFunction}
        data={item}
        isMultipleSync={isMultipleSync}
        key={index}
        selected={selectedDraftSync.includes(item[CONFIG_CARD.key as never])}
        onSelected={onSelectedDraftSync}
        onIconMore={() => {
          modalHandler(item)
          setAdditionalMenu(true)
        }}
      />
    );
  };


  const checkSideTitle = (item: ISummaryProposal) => {
    const { sideTitle, dataDetail, ..._CONFIG_CARD } = CONFIG_CARD;
    const skipDoksul = dataDetail.filter((value) => value.keyValue !== 'statusDoksul');
    // if status proposal "spaj pending uw" then remove icon sideTitle
    if (item?.statusProposal === 'SPAJ Pending UW') {
      return { dataDetail: skipDoksul, ..._CONFIG_CARD }
    } else {
      return { dataDetail: skipDoksul, sideTitle, ..._CONFIG_CARD }
    }
  }


  const updateDraftProposal = (item: ISummaryProposal) => {
    const { proposalId, spajId, selectedSQSId, additionalFormsId, spajNumber, isDoksul } = item
    setSelectedProposalId(proposalId);
    dispatch(
      updateEposState({
        spajId,
        selectedSQSId,
        additionalFormsId,
        proposalId,
        spajNumber,
        isDoksul,
      }),
    );
  }


  const headerAutomation = async (spajId: string) => {
    const RSPAJData = await getSPAJById(spajId);
    const policyHolderData = await RSPAJData?.policyHolderData ? JSON.parse(RSPAJData?.policyHolderData!) : '';
    const isEmailTest = await policyHolderData && isEmailAutomation(policyHolderData);

    return { isAutomation: isEmailTest ? 'Y' : 'N' };
  }


  const checkMicrositePaydi = async (cekatanId: string, spajId: string) => {
    const headers = await headerAutomation(spajId);
    const paramSMS = { cekatanId: cekatanId };

    const result = await checkStatusMicrosite(paramSMS, headers);
    setResponseCodePaydi(result?.data?.responseCode);
    if (result?.data?.responseCode === '00') {
      setResponseModal({
        visible: true,
        title: 'Sudah Melengkapi',
        desc: 'Calon Pemegang Polis sudah melengkapi pengisian deklarasi video produk dan asuransi tambahan (jika ada), Formulir Pernyataan Pemahaman PAYDI'
      })
    } else if (result?.data?.responseCode === '99') {
      setResponseModal({
        visible: true,
        title: 'Belum Melengkapi',
        desc: 'Calon pemegang polis belum melengkapi pengisian deklarasi video, formulir PAYDI, dan rekaman suara.'
      })
    }
  }

  const checkStatusFunction = (item: ISummaryProposal) => {
    return {
      text: 'Cek Status',
      action: () => {
        checkMicrositePaydi(item?.proposalId, item?.spajId);
        updateDraftProposal(item);
      }
    }
  }


  const lanjutKanFunction = (item: ISummaryProposal) => {
    return {
      text: 'Lanjutkan',
      action: () => {
        onContinueProposal(item);
        updateDraftProposal(item)
      },
    };
  }


  const createConfigCard = ({ item }: { item: ISummaryProposal }) => {
    const buttonConfig: TButtonConfig = {};
    const sideTitle = checkSideTitle(item)
    const statusProposal = item.statusProposal.toLowerCase();

    const lanjutKanButton = lanjutKanFunction(item);
    const salinButton = salinIlustrasiFunction(item);
    const lihatButton = lihatIlustrasiFunction(item);
    const checkStatusBUtton = checkStatusFunction(item);


    buttonConfig.left = (statusProposal === 'spaj pending submit' || statusProposal === 'spaj pending uw') ? lihatButton : salinButton;
    buttonConfig.right = (statusProposal === 'spaj pending uw') ? salinButton : (statusProposal === 'waiting for paydi') ? checkStatusBUtton : lanjutKanButton

    return {
      ...sideTitle,
      button: buttonConfig,
    } as TConfigCard;
  };


  const onSelectedDraftSync = useCallback(
    (value: string) => {
      setSelectedDraftSync(setMultipleSelect([...selectedDraftSync], value));
    },
    [selectedDraftSync],
  );

  const generateAllSqsId = (prevAllSqsId: string, newSqsId: string) => {
    const qqAmount = prevAllSqsId.split(',')
    return qqAmount.map((item, index) => {
      if (index === 0) {
        return newSqsId
      }
      const newId = `Q${new Date().getTime()}`
      const RSQSData = getSQSById(item)
      let IRSQSData = JSON.parse(JSON.stringify(RSQSData));
      IRSQSData = {
        ...IRSQSData,
        sqsId: newId,
        confirmationProductDoksul: ''
      };
      onUpdateSQS(IRSQSData)
      return newId
    }).join()
  }

  // Function salin proposal by ID
  const salinIlustrasiFunction = (item: ISummaryProposal, additionalStatus?: string) => {
    return {
      text: 'Salin Ilustrasi',
      action: async () => {
        // Bikin Proposal baru dengan ID baru
        const { summaryProposal, sqsDetail } = await initProposalData();
        const RSQSData = await getSQSById(JSON.parse(JSON.stringify(item)).allSQSId.split(',')[0]);
        // Kemudian datanya di pilih2 mana yang mesti di bawa dan tidak di bawa.
        if (summaryProposal && sqsDetail) {
          let IsummaryProposal = JSON.parse(JSON.stringify(item));
          const rootValues = Object.keys(EposRoutes).map((key) => EposRoutes[key as keyof typeof EposRoutes]);
          const indexFind = rootValues.indexOf(IsummaryProposal.lastState);
          const unitLinkProduct = IsummaryProposal.productCode === 'U12' || IsummaryProposal.productCode === 'U13';
          const isPWM = IsummaryProposal.productCode === 'H14' || IsummaryProposal.productCode === 'H15';
          let lastStateCondition: string = IsummaryProposal.lastState;
          const newAllSqsId = generateAllSqsId(IsummaryProposal.allSQSId, summaryProposal.selectedSQSId)
          if (!unitLinkProduct && indexFind >= 24) {
            lastStateCondition = 'SQSConfirmationRecommendationProduct';
            if (isPWM) lastStateCondition = 'SignatureProductPWM';
          }
          if (unitLinkProduct && indexFind >= 19) lastStateCondition = 'SQSInvestmentFundConfirmation';
          IsummaryProposal = {
            ...IsummaryProposal,
            createdDate: summaryProposal.createdDate,
            proposalId: summaryProposal.proposalId,
            statusProposal: summaryProposal.statusProposal,
            statusSubmit: summaryProposal.statusSubmit,
            selectedSQSId: summaryProposal.selectedSQSId,
            allSQSId: newAllSqsId,
            lastState: additionalStatus ? additionalStatus : lastStateCondition,
            spajId: '',
            spajNumber: '',
            additionalFormsId: '',
            paramSendMessage: '',
            cekatanId: '',
          };

          let IRSQSData = JSON.parse(JSON.stringify(RSQSData));
          IRSQSData = {
            ...IRSQSData,
            sqsId: sqsDetail.sqsId,
            confirmationProductDoksul: ''
          };
          // Kirim deh ke datanya.
          initEpos(IRSQSData, IsummaryProposal);
        }
      },
    };
  };


  // Perlu di enchancement dari segi flag di illustrasi. butuh saran dari leksa
  // ini baru do the jobs done but not finish the program.
  const lihatIlustrasiFunction = (item: ISummaryProposal) => {
    return {
      text: 'Lihat Ilustrasi',
      action: () => {
        const selectedSQSId = item.selectedSQSId;
        const proposalId = item.proposalId;
        const allSQSId = item.allSQSId.split(',');
        dispatch(
          updateEposState({
            selectedSQSId,
            proposalId,
            spajId: item?.spajId,
            allSQSId,
            sqsData: defaultSqsDataSlice,
            sqsState: '',
          }),
        );
        navigation.dispatch(StackActions.replace(EposRoutes.ILLUSTRATION, { flagIllustration: true }));
      },
    };
  };


  const onCreateProposal = () => {
    dispatch(
      updateEposState({
        selectedSQSId: '',
        proposalId: '',
        sqsData: defaultSqsDataSlice,
        sqsState: '',
        lifeAssuredData: defaultTFormDataClient,
        additionalFormsId: '',
      }),
    );
    dispatch(resetResponsePayment({ payload: 'reset' }));
    dispatch(
      updateProspectDetailLead(ProspectDetailLead)
    )
    navigation.dispatch(StackActions.replace(EposRoutes.PREVIOUSLY_OWNED_POLICY));
  };

  const validationContinueProposal = (proposalId: string, sqsId: string) => {
    const sqsData = getSQSById(sqsId);
    let customerData: ICustomerStorage | null;
    if (sqsData?.lifeAssuredSelf == 'self') {
      customerData = getCustomerStorageById(sqsData?.clientIdSelected[0])
    } else {
      customerData = getCustomerStorageById(sqsData?.clientIdSelected[1] || '')
    }
    if (customerData) {
      const validAnb = anbUpdated(customerData?.clientDateBirth, customerData?.clientAnb)
      if (!validAnb.anbChange) {
        return { blockValidation: 'anb', status: validAnb.anbChange, newValue: validAnb.newAnb, lifeAssuredSelf: sqsData?.lifeAssuredSelf }
      }
    }
    // if (dataCompletenessMagnum(proposalId)) {
    //   return { blockValidation: 'magnum', status: validMagnumData(proposalId), newValue: null }
    // }
    return { blockValidation: '', status: true, newValue: null, lifeAssuredSelf: null }
    // dataCompletenessMagnum
  }

  const onContinueProposal = async (data: ISummaryProposal) => {
    const selectedSQSId = data.selectedSQSId;
    const proposalId = data.proposalId;
    const allSQSId = data.allSQSId.split(',');
    const validContinue = validationContinueProposal(proposalId, selectedSQSId);
    if (isAgentDormanValid({ conditionalCourse: 'DRM' })) {
      if (validContinue.status) {
        continueProposal(selectedSQSId, proposalId, allSQSId, data.lastState);
      } else {
        if (validContinue.blockValidation == 'anb') {
          // WR_SHARIA_CONVENT
          //@ts-ignore
          const lifeAssured = WR_SHARIA_CONVENT[data.shariaFlag || 'conventional'].lifeAssured_2;
          if (data.spajId) {
            setModalBlockingContinue({
              ...modalBlockingContinue,
              visible: true,
              desc: t('Epos:blocking_anb_spaj', { lifeAssured_2: lifeAssured }),
              primaryButton: {
                text: 'Tutup',
                onPress: () => setModalBlockingContinue({ ...modalBlockingContinue, visible: false })
              }
            })
          } else {
            setModalBlockingContinue({
              ...modalBlockingContinue,
              visible: true,
              desc: t('Epos:blocking_anb_sqs', { lifeAssured_2: lifeAssured }),
              primaryButton: {
                text: 'Ke Data Nasabah',
                onPress: () => continueProposal(selectedSQSId, proposalId, allSQSId, validContinue.lifeAssuredSelf == 'other' ? EposRoutes.MAIN_INSURED_DATA : EposRoutes.POLICY_OWNER_DATA)
              }
            })
          }
        } else if (validContinue.blockValidation == 'magnum') {
          //pop up ketika magnum data corupt
        }
      }

    }
  };

  const continueProposal = (selectedSQSId: string, proposalId: string, allSQSId: string[], lastState: string) => {
    dispatch(
      updateEposState({
        selectedSQSId,
        proposalId,
        allSQSId,
        sqsData: defaultSqsDataSlice,
        sqsState: '',
      }),
    );
    dispatch(resetResponsePayment({ payload: 'reset' }));
    navigation.dispatch(StackActions.replace(lastState));
  }



  const toggleOnClose = useCallback(() => {
    setResponseCodePaydi('');
    setResponseModal({
      visible: false,
      title: '',
      desc: ''
    });
  }, [responseModal]);


  const primaryButton =
    responseCodePaydi === '00'
      ? {
        text: 'Lanjutkan',
        onPress: () => {
          dispatch(resetRMicrosite({ payload: 'reset' }));
          updateSummaryByKey(selectedProposalId, [
            {
              key: 'statusProposal', value: 'SPAJ Pending Submit'
            },
            {
              key: 'lastState', value: EposRoutes.SQS_SIGNATURE
            },
          ]);
          navigation.dispatch(StackActions.replace(EposRoutes.SQS_SIGNATURE));
        },
      }
      : {
        text: 'Ok',
        onPress: () => {
          toggleOnClose();
        },
      };


  const secondaryButton =
    responseCodePaydi === '00'
      ? {
        text: 'Tutup',
        onPress: () => {
          toggleOnClose();
        },
      }
      : null;


  // Delete handler
  const deleteProposalHandler = (proposalId: string, allSQSId: string) => {
    deleteProposalbyID(proposalId, allSQSId);
  };


  // Modal Handler
  const modalHandler = (item: ISummaryProposal) => {
    const { text, action } = salinIlustrasiFunction(item);
    const statusProposal = item.statusProposal.toLocaleLowerCase();

    let normalButton: ModalButtonType[] = [
      { text: 'Kirim SMS', onPress: () => sendSMS(item) },
      { text: text, onPress: action },
      { text: 'Hapus', onPress: () => deleteProposalHandler(item.proposalId, item.allSQSId) },
    ];

    if ((ENV == 'UAT' || ENV === 'DEV') && item.cekatanId) {
      normalButton.push(
        { text: 'Lihat OTP & Link', onPress: () => getLinkOTP(item) }
      )
    }

    handlerIconMenu(statusProposal, normalButton);
  };

  const getLinkOTP = (data: ISummaryProposal) => {
    getPaydiSMS(data.cekatanId).then((response) => {
      //@ts-ignore
      if (response.data?.responseCode == '00') {
        setModalLinkOtp({
          visible: true,
          title: 'Link & OTP Paydi',
          //@ts-ignore
          desc: `Link: ${response.data?.data?.link}\n\nOTP:${response.data?.data?.otp}`,
          //@ts-ignore
          link: response.data?.data?.link,
          //@ts-ignore
          otp: String(response.data?.data?.otp)
        })
      } else {
        setModalLinkOtp({
          visible: true,
          title: 'Link & OTP Paydi',
          desc: `Link dan OTP Tidak Tersedia Atau Service sedang maintenance`,
          link: '',
          otp: ''
        })
      }
    }).catch(() => {
      setModalLinkOtp({
        visible: true,
        title: 'Link & OTP Paydi',
        desc: `Link dan OTP Tidak Tersedia Atau Service sedang maintenance`,
        link: '',
        otp: ''
      })
    })
  }
  const handlerIconMenu = (statusProposal: string, normalButton: ModalButtonType[]) => {
    if (statusProposal == 'sqs illustration') {
      setModalButton(normalButton.slice(2));

    } else if (statusProposal == 'spaj pending submit') {
      setModalButton(normalButton.slice(1));

    } else {
      setModalButton(normalButton);
    }
  };

  const dataCompletenessMagnum = (proposalId: string) => {
    const selectedProposal = findProposalByCaseId(summaryProposalList, proposalId);
    const selectedDataCompleteness = selectedProposal[0]?.spajDetailData[0]?.DataCompleteness || [];
    return selectedDataCompleteness?.filter((data: any) => data.categoryKey === 'Data Kesehatan' && data.status === true).length > 0 ? true : false
  }


  const resultBulkMagnumExport = async (proposalIds: string[]) => {
    const defaultData = {
      successBulkMagnumExport: [],
      failedBulkMagnumExport: []
    }

    try {
      const resultBulkMagnumExport = await bulkMagnumExport(proposalIds);

      if (resultBulkMagnumExport) {
        return {
          successBulkMagnumExport: resultBulkMagnumExport?.successfulExports,
          failedBulkMagnumExport: resultBulkMagnumExport?.failedExports
        }
      }

      return defaultData

    } catch (error) {
      return defaultData
    }
  }


  const mergeResultMagnum = (resultMagnumExport: any) => {
    const mergedArray = mergeArrays(summaryProposalList, resultMagnumExport);

    const newMergedArray = mergedArray.map(data => {
      if (data.isMagnumComplete === true) {
        if (data.statusCase === true) {
          return data;
        }
      } else {
        return data;
      }
    })

    return newMergedArray
  }


  const cleanDataMagnum = (mergeResultMagnumExport: any) => {
    const newMergedArray = mergeResultMagnum(mergeResultMagnumExport)

    const cleanedData = newMergedArray.filter(item => {
      delete item.statusCase;
      delete item.isMagnumComplete;
      if (item !== undefined) return item;
    });

    return cleanedData
  }


  const mergeArrays = (array1: any[], array2: any[]) => {
    const mergedArray = array1.map(obj1 => {
      const match = array2.find(obj2 => obj2.proposalId === obj1.proposalId);
      return match ? { ...obj1, ...match } : obj1;
    });

    return mergedArray;
  };


  const findProposalByCaseId = (summaryProposalList: any, proposalId: string) => summaryProposalList.filter((data: any) => {
    if (data.proposalId == proposalId) {
      return data;
    }
  });


  const magnumExportCaseBeforeSync = async () => {
    // when SyncComplete Assign Magnum Service
    let resultMagnumExport: any = {};
    const proposalIds = summaryProposalList.map(summaryProposal => {
      return summaryProposal?.proposalId
    });

    if (proposalIds && proposalIds.length > 0) {
      const { successBulkMagnumExport, failedBulkMagnumExport } = await resultBulkMagnumExport(proposalIds as string[]);

      if (successBulkMagnumExport?.length > 0) {
        let successResult = successBulkMagnumExport.map((successExport: any) => {
          const selectedDataCompleteness = dataCompletenessMagnum(successExport?.Data?.CaseId)
          return {
            proposalId: successExport?.Data?.CaseId,
            statusCase: successExport?.Success,
            magnumData: [{ ...successExport?.Data }],
            isMagnumComplete: selectedDataCompleteness
          }
        })

        if (!successResult) successResult = []
        resultMagnumExport = { ...resultMagnumExport, listSuccess: successResult || [] };
      }

      if (failedBulkMagnumExport?.length > 0) {
        let failedResult = failedBulkMagnumExport.map((failedExport: any) => {
          const selectedErrorDataCompleteness = dataCompletenessMagnum(failedExport?.ErrorObject?.MessageParameters[0])

          return {
            proposalId: failedExport?.ErrorObject?.MessageParameters[0],
            statusCase: failedExport?.Success || false,
            isMagnumComplete: selectedErrorDataCompleteness
          }
        })
        if (!failedResult) failedResult = [];
        resultMagnumExport = { ...resultMagnumExport, listFailed: failedResult || [] };
      }

      const newResultMagnumExport = [...resultMagnumExport?.listSuccess || [], ...resultMagnumExport?.listFailed || []];

      return cleanDataMagnum(newResultMagnumExport)
    }
    return summaryProposalList;
  }



  const sendSMS = async (data: ISummaryProposal) => {
    try {
      setResponseData(loading)

      const paramMessage = await JSON.parse(data?.paramSendMessage)
      const result = await sendPaydiSMS(paramMessage)

      if (result?.problem === '' && result?.status === 201) {
        updateSummaryByKey(data.proposalId, [
          //@ts-ignore
          { key: 'cekatanId', value: result?.data?.data?.data?.transactionId },
        ]);
        setResponseData(successSMS)
      } else {
        setResponseData(isError)
      }

    } catch (error) {
      setResponseData(isError)

    }
  }


  const syncData = async () => {
    try {
      setResponseData(loading)

      const newSummaryProposalListFilterByMagnum = await magnumExportCaseBeforeSync();
      const responseSyncData = await syncLocaltoService(newSummaryProposalListFilterByMagnum);

      if (responseSyncData?.problem == '' && responseSyncData?.status == 201) {
        setResponseData(successSync)
      } else {
        setResponseData(isError)
      }

    } catch (error) {
      setResponseData(isError)
    }
  };


  // SEARCH
  const SummaryDataSearch = useMemo(() =>
    _SummaryDataProposal().filter((value: any) => {
      const data = paramSearch.toLocaleLowerCase();
      return (
        value.policyHolderName.toLocaleLowerCase().includes(data) ||
        value.lifeAssuredName.toLocaleLowerCase().includes(data) ||
        value.spajNumber.toLocaleLowerCase().includes(data) ||
        value.currency.toLocaleLowerCase().includes(data)
      );
    })
    , [paramSearch, _SummaryDataProposal()])


  //SORT & FILTER
  const { labelCategory, key } = paramFilter?.sortByValue ?? { labelCategory: undefined, key: undefined };

  const dataSortir = useMemo(() => {
    const summaryProposal = _SummaryDataProposal()

    if (!labelCategory) {
      return summaryProposal

    } else {
      if (labelCategory === 'policyHolderName') {
        return sortPolicyHolderName(summaryProposal, key)

      } else {
        return key === 'terbaru'
          ? sortDate(summaryProposal, labelCategory, false) // Sorting by newest date
          : sortDate(summaryProposal, labelCategory, true); // Sorting by oldest date
      }
    }

  }, [labelCategory, key, _SummaryDataProposal()])


  const filterData = useMemo(() => {
    const data = {
      statusProposal: paramFilter?.statusProposal?.map((item: any) => item.label),
      productCode: paramFilter?.productGoals?.map((item: TCommonConstantData) => item.key),
      currency: paramFilter?.currency?.key,
      createdDate: paramFilter?.periodCreated?.key,
      submitDate: paramFilter?.periodSubmission?.key
    }

    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined) // if value is undefined delete attribute and its value
    )
  }, [paramFilter])


  const _SummaryDataFilter = useMemo(() =>
    summaryDraftFilter(dataSortir, filterData),
    [filterData, dataSortir])


  const btnPressCreateProposal = () => {
    if (isMultipleSync) {
      syncData();
    } else {
      onCreateProposal();
    }
  }


  const result = paramSearch ? SummaryDataSearch : _SummaryDataFilter


  return (
    <>
      <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.my16, plaiStyles.alignCenter, plaiStyles.mx16]}>
        {isMultipleSync ? (
          <Text style={[plaiStyles.fontGrey66Thin]}>{selectedDraftSync?.length} Proposal Dipilih</Text>
        ) : (
          <View>
            <Text style={[plaiStyles.fontGrey66Thin]}>
              {result?.length}  Proposal
            </Text>
          </View>
        )}
        <Text style={plaiStyles.fontRedBold} onPress={() => setIsMultipleSync((prev) => !prev)}>
          {isMultipleSync ? 'Batalkan' : 'Sinkronasi Data'}
        </Text>
      </View>
      <View style={[plaiStyles.flex, plaiStyles.bgGrey, plaiStyles.px16]}>
        {result?.length ? (
          <FlatList
            data={result}
            style={[plaiStyles.flex, plaiStyles.mb8]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderListDraft}
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={false}
            ListHeaderComponent={<LHComponent isMultipleSync={isMultipleSync} />}
          />
        ) : (
          <DraftListStatus
            image={emptyDraft}
            type="emptyDraft"
            title="Belum Ada Proposal"
            subTitle="Saat ini belum ada Proposal yang dibuat. Klik tombol di bawah untuk membuat proposal baru."
          />
        )}
      </View>
      {isMultipleSync &&
        <View style={[plaiStyles.bgwhite, plaiStyles.spacingp]}>
          <Button
            testID="landing-btn-create-proposal"
            text={isMultipleSync ? 'Sinkronasikan' : 'Buat Proposal'}
            textStyle={plaiStyles.font14}
            onPress={btnPressCreateProposal}
          />
        </View>
      }

      <ModalMenu visible={additionalMenu} onClose={() => setAdditionalMenu(false)} data={modalButton} />

      <ModalInformation
        visible={responseModal?.visible}
        title={responseModal?.title}
        desc={responseModal?.desc}
        buttonPrimary={primaryButton}
        buttonSecondary={secondaryButton}
      />
      <ModalInformation
        visible={modalBlockingContinue?.visible}
        title={modalBlockingContinue?.title}
        desc={modalBlockingContinue?.desc}
        buttonPrimary={modalBlockingContinue.primaryButton}
      />

      <ModalInformation
        visible={modalLinkOtp?.visible}
        title={modalLinkOtp?.title}
        desc={modalLinkOtp?.desc}
        buttonPrimary={{
          text: modalLinkOtp.link ? 'Copy Link' : 'Tutup',
          onPress: () => {
            if (modalLinkOtp.link) {
              Clipboard.setString(modalLinkOtp.link);
              PruUI.Toast({ message: 'Success Copied', mode: 'success' });
            }
            setModalLinkOtp({
              visible: false,
              title: '',
              desc: '',
              link: '',
              otp: ''
            })
          }
        }}
        buttonSecondary={modalLinkOtp.otp && ({
          text: modalLinkOtp.otp != '0' ? 'Copy OTP' : 'Tutup',
          onPress: () => {
            if (modalLinkOtp.otp != '0') {
              Clipboard.setString(modalLinkOtp.otp.toString());
              PruUI.Toast({ message: 'Success Copied', mode: 'success' });
            }
            setModalLinkOtp({
              visible: false,
              title: '',
              desc: '',
              link: '',
              otp: ''
            })
          }
        })}
      />
    </>
  )

}