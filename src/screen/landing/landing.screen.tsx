import { Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { PruHeader, PruScreen } from 'common_ui_components';
import { Button, TabView } from 'common_ui_components/app/components-ui';
import { useNavigation } from '@react-navigation/native';
import {
  FilterSort,
  LoadingFull,
  ModalContainer,
  ModalInformation,
  plaiStyles,
  SearchInput,
} from 'plai_common_frontend';
import { CONFIG_FILTER_SORT } from './landing.data';
import { OtherProposal } from './components/other-proposal/other-proposal';
import Proposal from './components/proposal/proposal';
import { useDispatch } from 'react-redux';
import { updateEposState } from '../../redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export const responseModalInformation = (data?: any) => {
  return {
    loading: {
      loading: true,
      isSuccess: false,
      isError: false,
      data: null
    },
    isSuccess: {
      loading: false,
      isSuccess: true,
      isError: false,
      data: data
    },
    isError: {
      loading: false,
      isSuccess: false,
      isError: true,
      data: null
    },
    defaultData: {
      loading: false,
      isSuccess: false,
      isError: false,
      data: null
    }
  }
}

export type TResponseData = {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: any;
}


export const LandingScreen = () => {
  const { defaultData } = responseModalInformation()
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [responseData, setResponseData] = useState<TResponseData>(defaultData);
  const [searchProposal, setSearchProposal] = useState('');
  const [filterProposal, setFilterProposal] = useState()


  const indexs = useRef<number>(0)
  const handleActiveIndex = (idx: number) => {
    indexs.current = idx
  }

  const onCLoseModal = {
    text: 'Ok',
    onPress: () => setResponseData(defaultData),
  }
  const emptyData = (data: any) => {
    Object.keys(data).map((id: string) => {
      if (Array.isArray(data[id]) && data[id].length == 0) {
        delete data[id]
      } else if (typeof data[id] == 'object' && !data[id]?.key && !Array.isArray(data[id])) {
        delete data[id]
      }
    })
    return data
  }

  return (
    <>
      <PruScreen>
        {responseData?.loading && <LoadingFull />}
        <PruHeader headerText="E-SQS & E-SPAJ" leftIcon="arrow_back" onLeftPress={() => navigation.navigate('home')} />
        <View style={[plaiStyles.px16, plaiStyles.pt16, plaiStyles.bgwhite]}>
          <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
            <SearchInput style={plaiStyles.flex} onSubmitEditing={(value) => {
              setSearchProposal(value as string);
            }} />
            <FilterSort config={CONFIG_FILTER_SORT} onApply={(value) => {
              setFilterProposal(emptyData(value) as any)
            }
            } />
          </View>
        </View>
        <TabView
          onIndexChange={handleActiveIndex}
          selectedIndex={indexs.current}
          routes={[
            {
              title: 'Proposal',
              screen: () => <Proposal setResponseData={setResponseData} paramSearch={searchProposal} paramFilter={filterProposal} />,
              props: {},
              key: 'TAB-PROPOSAL',
            },
            {
              title: 'Proposal Lainnya',
              screen: () => <OtherProposal setResponseData={setResponseData} search={searchProposal} filter={filterProposal} />,
              props: {},
              key: 'TAB-OTHER-PROPOSAL',
            },
          ]}
        />

        <ModalContainer
          visible={responseData?.isSuccess}
        >
          {Array.isArray(responseData?.data) ?
            <View style={[plaiStyles.my16, plaiStyles.mx16]}>
              <Text style={[plaiStyles.fontBold, plaiStyles.fontBlack, plaiStyles.font18, plaiStyles.mb12]}>Sinkronisasi Berhasil</Text>
              <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.mb8, plaiStyles.flexWrap]}>{`Data ${responseData?.data?.length} Proposal atau Draft telah berhasil di Sinkronisasikan.`}</Text>
              {responseData?.data?.map((item) => (
                <View style={[plaiStyles.row, plaiStyles.px16, plaiStyles.justifyBetween, plaiStyles.borderbf0, plaiStyles.pb16, plaiStyles.pt8]}>
                  <Text style={[plaiStyles.flex, plaiStyles.fontBlackBold, plaiStyles.font14, plaiStyles.flexWrap]}>{item?.policyHolderName}</Text>
                  <Text style={[plaiStyles.flex, plaiStyles.justifyEnd, plaiStyles.textEnd, plaiStyles.font14, plaiStyles.fontGrey66, plaiStyles.flexWrap]}>{moment(item?.createdDate).format('DD MMM YYYY') + ', ' + moment(item?.createdDate).format("hh.mm")}</Text>
                </View>
              ))}
            </View>
            : <View style={[plaiStyles.my16, plaiStyles.mx16]}>
              <Text style={[plaiStyles.fontBold, plaiStyles.fontBlack, plaiStyles.font18, plaiStyles.mb12]}>Berhasil Mengirimkan SMS</Text>
              <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>{responseData?.data}</Text>
            </View>
          }
          <Button style={[plaiStyles.mt12, plaiStyles.mb12, plaiStyles.ml8, plaiStyles.mr8]} text='Lanjutkan' preset='primary' onPress={onCLoseModal.onPress} />
        </ModalContainer>

        <ModalInformation
          visible={responseData?.isError}
          title={t('Epos:unable_to_connect')}
          desc={t('Epos:unable_to_connect_to_the_server')}
          buttonPrimary={onCLoseModal}
        />
      </PruScreen>
    </>
  );
};