import { View, FlatList, ListRenderItemInfo } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { DraftCard, ModalInformation, ModalMenu, TCommonConstantData, TConfigCard, emptyDraft, plaiStyles } from 'plai_common_frontend';
import { useEposRealm, useQuery } from '../../../database';
import { EposState, ProspectDetailLead, SummaryDraft, defaultSqsDataSlice, resetRMessaging, resetRMicrosite, updateEposState } from '../../../redux';
import { LHComponent } from './landing-doksul.screen';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ModalButtonType, TButtonConfig } from '../../landing/type/landing.type';
import { CONFIG_CARD } from '../../landing/landing.data';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { Button } from 'common_ui_components/app/components-ui';
import { DraftListStatus } from '../../landing/components';
import { checkMicrositeStatus, sendPaydiSMS } from '../../../network';
import { DEFAULT_OPTIONAL_DATA, ISummaryProposal, showModalMaintenance, sortPolicyHolderName, summaryDraftFilter } from '../../../utilities';
import { statusDoksulProposal, typeModalAlert, dataSummary } from './doksul-sqsspaj.data';
import { useAgentDorman } from "./../../../hooks";

type TDoksulSQSSPAJ = {
  paramSearch: string,
  paramFilter: any
}
export const DOksulSQSSPAJ = ({ paramSearch = '', paramFilter = {} }: TDoksulSQSSPAJ) => {
  const { isAgentDormanValid } = useAgentDorman();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { deleteProposalbyID, updateSummaryByKey } = useEposRealm();
  const SummaryDataProposal = useQuery('SummaryProposal');
  const { RMicrosite } = useSelector((state: any) => state.epos as EposState);
  const [additionalMenu, setAdditionalMenu] = useState<boolean>(false);
  const [modalButton, setModalButton] = useState<ModalButtonType[] | []>([]);
  const [getProposal, setGetProposal] = useState<ISummaryProposal | undefined>();
  const { defaultData, removeDraft, sendSMS, successSMS, submittedDraft } = typeModalAlert(getProposal)
  const [modalAlert, setModalAlert] = useState(defaultData)

  const sortDate = (data: SummaryDraft[], labelCategory: string, key?: boolean) =>
    data.sort((a, b) => {
      const DateA = new Date(a[labelCategory]).getTime();
      const DateB = new Date(b[labelCategory]).getTime();
      return key ? DateA - DateB : DateB - DateA;
    });

  const filterSummaryProposal = () => {
    let filterByStatusProposal = SummaryDataProposal?.filter((value: any) =>
      statusDoksulProposal.includes(value.statusProposal),
    )

    //@ts-ignore
    return sortDate(filterByStatusProposal, 'createdDate')
  }


  const _SummaryDataProposal = filterSummaryProposal();


  // Delete handler
  const deleteProposalHandler = (proposalId: string, allSQSId: string) => {
    if (proposalId && allSQSId) {
      deleteProposalbyID(proposalId, allSQSId);
      setGetProposal(undefined)
    }
  };

  const sendSMSAgain = async (data: ISummaryProposal) => {
    try {

      const paramMessage = await JSON.parse(data?.paramSendMessage)
      const result = await sendPaydiSMS(paramMessage)

      if (result?.problem === '' && result?.status === 201) {
        updateSummaryByKey(data.proposalId, [
          //@ts-ignore
          { key: 'cekatanId', value: result?.data?.data?.data?.transactionId },
        ]);
      } else {
        showModalMaintenance();
      }

    } catch (error) {
      showModalMaintenance();
    }
  }


  const createButton = (text: string, action: () => void) => {
    return { text, action }
  }


  const lihatIlustrasiFunction = (item: ISummaryProposal) => {
    return createButton('Lihat Ilustrasi', () => {
      dispatch(
        updateEposState({
          selectedSQSId: item.selectedSQSId,
          proposalId: item.proposalId,
          allSQSId: item.allSQSId.split(','),
          sqsData: defaultSqsDataSlice,
          sqsState: '',
        }),
      );
      navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.ILLUSTRATION, flagIllustration: true })
    })
  }


  const removeFunction = (item: ISummaryProposal) => {
    return createButton('Hapus', () => {
      setGetProposal(item)
      setModalAlert(removeDraft)
    })
  }


  const audioRecordFunction = (item: ISummaryProposal) => {
    return createButton('Kirim SMS', () => {
      setGetProposal(item)
      setModalAlert(sendSMS)
      sendSMSAgain(item)
    })
  }


  const continueFunction = (item: ISummaryProposal) => {
    return createButton('Lanjutkan', () => {
      const dormantValidation = agentDormanValidationCheck();
      if (dormantValidation) {
        dispatch(
          updateEposState({
            selectedSQSId: item?.selectedSQSId,
            proposalId: item?.proposalId,
            isDoksul: item?.isDoksul,
            isDoksulCTA: item?.isDoksulCTA,
            spajId: item?.spajId,
            additionalFormsId: item?.additionalFormsId,
            statusDoksul: item.statusDoksul,
            allSQSId: item?.allSQSId.split(','),
            spajNumber: item?.spajNumber,
            sqsData: defaultSqsDataSlice,
            sqsState: '',
            ProspectDetail: ProspectDetailLead
          }),
        );
        //convert object to array & check if laststate from doksul navigation
        if (Object.values(EposDoksulRoutes).some((items) => items === item.lastState)) {
          navigation.dispatch(StackActions.replace(item.lastState));

        } else {
          navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: item.lastState })
        }
      }
    })
  }


  const doksulFunction = (item: ISummaryProposal) => {
    return createButton('Dokumen Susulan', () => {
      dispatch(updateEposState({
        selectedSQSId: item?.selectedSQSId,
        proposalId: item?.proposalId,
        spajNumber: item?.spajNumber,
        spajId: item?.spajId,
        isDoksulCTA: true,
      }))
      navigation.dispatch(StackActions.replace(EposDoksulRoutes.DOKSUL))
    });
  }


  const statusProposalDoksul = (item: ISummaryProposal) => {
    return ['Draft', 'Submitted', 'Change PH Submitted'].includes(item?.statusProposal)
  }


  const checkSideTitle = (item: ISummaryProposal) => {
    const { sideTitle, ..._CONFIG_CARD } = CONFIG_CARD;
    // if status proposal "spaj pending uw" then remove icon sideTitle
    if (statusProposalDoksul(item)) {
      return _CONFIG_CARD
    } else {
      return CONFIG_CARD
    }
  }


  const createConfigCard = ({ item }: { item: ISummaryProposal }) => {
    const buttonConfig: TButtonConfig = {};

    buttonConfig.left = statusProposalDoksul(item) ? removeFunction(item) : lihatIlustrasiFunction(item)
    //@ts-ignore
    buttonConfig.right = (item.statusDoksul === 'Audio Recording Virtual Tatap Muka' || item.statusProposal == 'Change PH Submitted')
      ? audioRecordFunction(item)
      : item.statusProposal === 'SPAJ Pending UW'
        ? doksulFunction(item)
        : item.statusProposal === 'Submitted'
          ? null
          : continueFunction(item)

    return {
      ...checkSideTitle(item),
      button: buttonConfig,
      dataSummary
    } as TConfigCard;
  };


  const renderListDraft = ({ item, index }: ListRenderItemInfo<ISummaryProposal>) => {
    const configCardFunction = createConfigCard({ item });

    return (
      <DraftCard
        wrapperStyle={plaiStyles.mt12}
        config={configCardFunction}
        data={item}
        isMultipleSync={false}
        key={index}
        selected={false}
        isDoksulCard={true}
        onSelected={() => { }}
        onIconMore={() => {
          modalHandler(item);
          setAdditionalMenu(true);
        }}
      />
    );
  };

  const agentDormanValidationCheck = () => {
    return isAgentDormanValid({ conditionalCourse: 'DRM' });
  }

  const onCreateProposal = () => {
    const dormantValidation = agentDormanValidationCheck();
    if (dormantValidation) {
      dispatch(resetRMessaging({ payload: 'reset' }))
      dispatch(
        updateEposState({
          selectedSQSId: '',
          proposalId: '',
          sqsData: defaultSqsDataSlice,
          sqsState: '',
          spajId: '',
          additionalFormsId: '',
          statementDoksul: DEFAULT_OPTIONAL_DATA,
          spajNumber: '',
          ProspectDetail: ProspectDetailLead
        }),
      );
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL })
    }
  };


  // Modal Handler
  const modalHandler = (item: ISummaryProposal) => {

    const normalButton: ModalButtonType[] = [
      {
        text: 'Hapus', onPress: () => {
          setGetProposal(item)
          setModalAlert(removeDraft)
        }
      },
    ];
    setModalButton(normalButton);
  };


  useEffect(() => {
    if (RMicrosite?.data?.responseCode === '99') {
      setModalAlert(successSMS)
    } else if (RMicrosite?.data?.responseCode === '00') {
      setModalAlert(submittedDraft)
    }
  }, [RMicrosite])


  const textPrimaryButton = modalAlert?.type === 'remove'
    ? "Ya, Hapus Dokumen"
    : modalAlert?.type === 'send'
      ? "Ya, Kirim SMS"
      : "Tutup"


  const onPressPrimaryButton = () => {
    if (modalAlert?.type === 'send') {
      dispatch(resetRMessaging({ payload: 'reset' }))
      dispatch(checkMicrositeStatus({ cekatanId: getProposal?.proposalId }))

    }
    else if (modalAlert?.type === 'remove' && getProposal) {
      deleteProposalHandler(getProposal?.proposalId, getProposal?.allSQSId)
      setModalAlert(defaultData);

    } else {
      setModalAlert(defaultData);
      setGetProposal(undefined)
      dispatch(resetRMicrosite({ payload: 'reset' }))
    }
  }


  const buttonModalInfo = {
    primary: {
      text: textPrimaryButton,
      onPress: onPressPrimaryButton
    },
    secondary: modalAlert?.type === 'send' || modalAlert?.type === 'remove'
      ? {
        text: 'Batal',
        onPress: () => setModalAlert(defaultData)
      }
      : null
  }


  // // SEARCH
  const SummaryDataSearch = useMemo(() =>
    _SummaryDataProposal.filter((value: any) => {
      const data = paramSearch.toLocaleLowerCase();
      return (
        value.policyHolderName.toLocaleLowerCase().includes(data) ||
        value.lifeAssuredName.toLocaleLowerCase().includes(data) ||
        value.productName.toLocaleLowerCase().includes(data) ||
        value.currency.toLocaleLowerCase().includes(data)
      );
    })
    , [paramSearch, _SummaryDataProposal]);


  // //FILTER
  const { labelCategory, key } = paramFilter?.sortByValue ?? { labelCategory: undefined, key: undefined };
  const periodDate = (period: string) => {
    const now = new Date();

  }

  const dataSortir = useMemo(() => {
    const summaryProposal = _SummaryDataProposal

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

  }, [labelCategory, key, _SummaryDataProposal])


  const filterData = useMemo(() => {
    const data = {
      statusProposal: paramFilter?.statusProposal?.map((item: any) => item.key),
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


  const result = paramSearch ? SummaryDataSearch : _SummaryDataFilter

  useEffect(() => {
    dispatch(updateEposState({
      isDoksulCTA: false
    }))
  }, [])



  return (
    <>
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
            ListHeaderComponent={<LHComponent />}
          />
        ) : (
          <DraftListStatus
            image={emptyDraft}
            type="emptyDraft"
            title="Belum Ada Dokumen Susulan"
            subTitle="Saat ini belum ada Dokumen Susulan yang dibuat. Klik tombol di bawah untuk membuat Dokumen Susulan."
          />
        )}
      </View>
      <View style={[plaiStyles.bgwhite, plaiStyles.spacingp]}>
        <Button
          style={[plaiStyles.bgBtnRed]}
          textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
          text={'Buat Dokumen Susulan'}
          onPress={onCreateProposal}
        />
      </View>
      <ModalMenu visible={additionalMenu} onClose={() => setAdditionalMenu(false)} data={modalButton} />
      <ModalInformation
        visible={modalAlert?.visible}
        title={modalAlert?.title}
        desc={modalAlert?.desc}
        buttonPrimary={buttonModalInfo.primary}
        //@ts-ignore
        buttonSecondary={buttonModalInfo.secondary}
      />
    </>
  );
};
