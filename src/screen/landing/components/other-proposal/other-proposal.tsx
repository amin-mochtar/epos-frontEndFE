import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CONFIG_CARD } from '../../landing.data';
import { DraftCard, TCommonConstantData, TConfigCard, disconnect, emptyDraft, loadingGif, plaiStyles, setMultipleSelect, underMaintaince, useGetNetInfo } from 'plai_common_frontend';
import { AllDataResponseDraft } from '../../../../redux';
import { useSelector } from 'react-redux';
import { DraftListStatus } from '../draft-list-status/draft-list-status';
import { DataAdditionalForms, generateSPAJData, initProposalData, useEposRealm, useQuery } from '../../../../database';
import { getSummaryProposal, getProposalByProposalId } from '../../../../network';
import { LFComponent, LHComponent } from '../sub-component/subComponent';
import { magnumImportCase } from '../../../../utilities/magnum-service';
import { TResponseData } from '../../landing.screen';
import { ISummaryProposal, showModalMaintenance } from '../../../../utilities';
import { responseModalInformation } from '../../landing.screen';

type TOtherProposal = {
  setResponseData: (value: TResponseData) => void;
  search: string,
  filter: any
}

const defaultListDraft = {
  data: [],
  page: 1,
  size: 20,
  totalRow: 0
}

export const OtherProposal = ({ setResponseData, search = '', filter = {} }: TOtherProposal) => {
  const { connectionStatus } = useGetNetInfo();
  const SummaryDataProposal = useQuery('SummaryProposal');
  const authState = useSelector((state: any) => { return state.auth });
  let _SummaryDataProposal = SummaryDataProposal?.filter((value: any) => (
    value.isDoksul !== true && value.agentCode == authState?.agentCode
  ));
  const [selectedDraftSync, setSelectedDraftSync] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const {
    initEpos,
    onUpdateSPAJ,
    onUpdateAdditionalForms,
    onUpdateCustomer
  } = useEposRealm();

  const [paramFilter, setParamFilter] = useState(filter);
  const [listDraft, setListDraft] = useState<AllDataResponseDraft>(defaultListDraft);
  const [loadingDraft, setLoadingDraft] = useState(false)

  const paramSearch = useMemo(() => {
    if (search) {
      let num = Number(search);
      if (!isNaN(num)) {
        return { spajNumber: search }
      } else {
        return { policyHolderName: search }
      }
    }
  }, [search])


  const paramDefaultSummaryDraft = {
    size: listDraft?.size,
    agentCode: authState?.agentCode,
    descending: true,
    orderBy: 'updatedDate',
  }


  const getSummaryDraft = async (param: any) => {
    setLoadingDraft(true)
    const result = await getSummaryProposal(param)
    const _result = result?.data?.data as AllDataResponseDraft
    if (result?.data?.code === '200') {
      setLoadingDraft(false)
      setListDraft({
        data: [...listDraft?.data, ..._result?.data],
        page: _result?.page,
        size: 20,
        totalRow: _result?.totalRow
      })
    } else {
      setLoadingDraft(false)
      showModalMaintenance();
    }
  }


  useEffect(() => {
    if (paramSearch) {
      setListDraft(defaultListDraft)
      getSummaryDraft({
        ...paramDefaultSummaryDraft,
        ...paramSearch,
        page: 1
      })

    } else if (Object.keys(paramFilter).length > 0) {
      const periodCreatedList = paramFilter?.periodCreated?.key;
      // get the biggest number
      const createdPeriod = periodCreatedList;
      getSummaryDraft({
        currency: paramFilter?.currency?.key,
        statusProposalList: paramFilter?.statusProposal?.map((value: TCommonConstantData) => value.label),
        orderBy: paramFilter?.sortByValue?.labelCategory,
        descending: paramFilter?.sortByValue?.key !== 'terbaru',
        productName: paramFilter?.productGoals?.label,
        createdPeriod: createdPeriod,
        submitPeriod: paramFilter?.periodSubmission?.key,
        minSumAssured: paramFilter?.minSumAssured && parseInt(paramFilter.minSumAssured),
        maxSumAssured: paramFilter?.minSumAssured && parseInt(paramFilter.maxSumAssured),
        minYearlyPremium: paramFilter?.yearlyPremium?.key[0],
        // maxYearlyPremium: paramFilter?.yearlyPremium?.key.pop(),
      })

    } else {
      getSummaryDraft({ ...paramDefaultSummaryDraft, page: listDraft?.page })
    }
  }, [paramSearch, paramFilter])


  const onRefresh = useCallback(async () => {
    await setRefreshing(true);
    setListDraft(defaultListDraft);

    await getSummaryDraft({
      ...paramDefaultSummaryDraft, page: 1
    })

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing])


  const importMagnumOnSyncData = async (data: any) => {
    const caseImportJson = data?.[0].magnumData;
    if (caseImportJson && caseImportJson.length > 0) {
      const resultImport: any = await magnumImportCase(JSON.stringify(caseImportJson[0]));
      if (resultImport?.Success) {
        return true
      }
      return false;
    }
    return false;
  }


  const isMagnumCompleted = (dataCompleteness: any[]) => {
    if (dataCompleteness && dataCompleteness.length > 0) return dataCompleteness.filter(data => data.categoryKey === 'Data Kesehatan' && data.status === true).length > 0 ? true : false;
    return false;
  }


  const synchronization = async (item: ISummaryProposal) => {
    const { loading, isSuccess, defaultData } = responseModalInformation([item]);

    if (!item || !item.proposalId) {
      return;
    }

    try {
      setResponseData(loading)
      const isExistingDraft = _SummaryDataProposal.some((val: any) => val.proposalId == item.proposalId);
      const getProposalById = await getProposalByProposalId({ proposalId: item.proposalId });
      const isStepPassedMagnum = isMagnumCompleted(getProposalById?.data[0]?.spajDetailData[0]?.DataCompleteness);
      if (isStepPassedMagnum) {
        const isMagnumImportSuccess = await importMagnumOnSyncData(getProposalById?.data);
        if (!isMagnumImportSuccess) {
          console.error('magnum import error!');
          setResponseData(defaultData)
          return;
        }
      }

      if (!isExistingDraft) {
        const { summaryProposal, sqsDetail } = await initProposalData();
        const sqsDetailData = getProposalById?.data[0]?.sqsDetailData[0];
        const _summaryProposal: ISummaryProposal = {
          ...summaryProposal,
          ...item,
          sumAssured: parseInt(item.sumAssured),
          yearlyPremium: parseInt(item.yearlyPremium),
          submitDate: item.submitDate || '',
          lifeAssuredDob: item.lifeAssuredDob || '',
          lifeAssuredPhone: item.lifeAssuredPhone || '',
          policyHolderDob: item.policyHolderDob || '',
          policyHolderPhone: item.policyHolderPhone || '',
          shariaFlag: item.shariaFlag || '',
          leadId: item.leadId || '',
          hasAdditionalLA: item.hasAdditionalLA || false,
        };
        const _sqsDetail = {
          ...sqsDetail,
          ...sqsDetailData
        };
        await initEpos(_sqsDetail, _summaryProposal);
        if (item.spajId) {
          const spajDetailData = getProposalById?.data[0]?.spajDetailData[0];
          const _SPAJData = await generateSPAJData();
          const SPAJData = {
            ..._SPAJData,
            ...spajDetailData
          };
          onUpdateSPAJ(SPAJData);
        }
        if (item.additionalFormsId) {
          const _DataAdditionalForms = DataAdditionalForms();
          const additionalFormData = getProposalById?.data[0]?.additionalFormData[0];
          const _additionalFormData = {
            ..._DataAdditionalForms,
            ...additionalFormData
          };
          onUpdateAdditionalForms(_additionalFormData);
        }

        if (getProposalById?.data[0]?.sqsDetailData[0]?.clientIdSelected[0]) {
          onUpdateCustomer(getProposalById?.data[0]?.customerStorageData[0]);
          if (sqsDetailData?.lifeAssuredSelf !== 'self') {
            onUpdateCustomer(getProposalById?.data[0]?.customerStorageData[1]);
            if(sqsDetailData.additionalLifeAssuredSelf) {
              onUpdateCustomer(getProposalById?.data[0]?.customerStorageData[2]);
            }
          }
        }
        setResponseData(isSuccess)

      } else {
        setResponseData(defaultData)
      }
    } catch (error) {
      // TODO CATCH ERROR
    }
  };


  const configCard = useMemo(() => {
    const { sideTitle, ..._CONFIG_CARD } = CONFIG_CARD;
    return {
      ..._CONFIG_CARD,
      button: {
        one: {
          text: 'Sinkronisasi',
          action: (item: ISummaryProposal) => synchronization(item)
        }
      },
    } as TConfigCard;
  }, [synchronization]);


  const onSelectedDraftSync = useCallback(
    (value: string) => {
      setSelectedDraftSync(setMultipleSelect([...selectedDraftSync], value));
    },
    [selectedDraftSync],
  );


  const handleLoadMore = () => {
    if (listDraft?.data?.length < listDraft?.totalRow) {
      if (paramSearch) {
        getSummaryDraft({
          ...paramSearch,
          ...paramDefaultSummaryDraft,
          page: listDraft?.page + 1,
        })
      } else {
        getSummaryDraft({
          ...paramDefaultSummaryDraft,
          page: listDraft?.page + 1,
        })
      }
    }
  };


  const RenderListDraft = ({ item, index }: { item: ISummaryProposal; index: number }) => {
    return (
      <DraftCard
        wrapperStyle={plaiStyles.mt12}
        config={configCard}
        data={item}
        isMultipleSync={false}
        key={index}
        selected={selectedDraftSync.includes(item.proposalId)}
        onSelected={onSelectedDraftSync}
      />
    );
  };


  return (
    <>
      <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.my20, plaiStyles.alignCenter, plaiStyles.mx16]}>
        <View>
          <Text style={[plaiStyles.fontGrey66Thin]}>
            {listDraft?.data?.length} Proposal
          </Text>
        </View>
      </View>
      <View style={[plaiStyles.flex, plaiStyles.bgGrey, plaiStyles.px16]}>
        {!connectionStatus ? (
          <DraftListStatus
            image={disconnect}
            type="disconnect"
            title="Tidak Dapat Terhubung"
            subTitle="Tidak dapat terhubung ke server, mohon periksa kembali jaringan Anda dan coba lagi."
          />
        ) : loadingDraft && listDraft?.data?.length === 0 ? (
          <DraftListStatus
            image={loadingGif}
            type="pending"
            title="Memuat Data"
            subTitle="Data proposal & draft sedang dimuat untuk pertama kalinya. Mohon menunggu beberapa saat."
          />
        ) : listDraft?.data?.length === 0 ? (
          <DraftListStatus
            image={emptyDraft}
            type="emptyDraft"
            title="Belum Ada Proposal"
            subTitle="Saat ini belum ada Proposal yang dibuat. Klik tombol di bawah untuk membuat proposal baru."
          />
          // ) : massage === 'error' ? (
          //   <DraftListStatus
          //     image={underMaintaince}
          //     type="underMaintaince"
          //     title="Terjadi Masalah"
          //     subTitle="Maaf, terjadi masalah saat menghubungkan ke Server, silahkan coba beberapa saat lagi."
          //   />
        ) : (
          <FlatList
            data={listDraft?.data}
            style={[plaiStyles.flex, plaiStyles.mb8]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={RenderListDraft}
            onEndReached={handleLoadMore}
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={false}
            refreshControl={
              <RefreshControl
                refreshing={false} onRefresh={onRefresh} colors={['transparent']}
                style={{ backgroundColor: 'transparent' }}
              />
            }
            ListHeaderComponent={<LHComponent isMultipleSync={false} />}
            ListFooterComponent={<LFComponent allDataloaded={listDraft?.data?.length == listDraft?.totalRow} loading={loadingDraft} />}
          />
        )}
      </View>
    </>
  )
}