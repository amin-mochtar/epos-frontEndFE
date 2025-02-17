import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { PruHeader, PruScreen } from 'common_ui_components';
import {
  FilterSort,
  SearchInput,
  emptyDraft,
  plaiStyles,
} from 'plai_common_frontend';
import { TabView } from 'common_ui_components/app/components-ui';
import { DraftListStatus } from '../../landing/components';
import { CONFIG_FILTER_SORT_DOKSUL } from '../../landing/landing.data';
import { DOksulSQSSPAJ } from './doksul-sqsspaj';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateEposState } from '../../../redux';

export const LHComponent = () => {
  return (
    <Text style={[plaiStyles.fontGrey99Thin, plaiStyles.pt16]}>
      Data diperbarui Senin, 27 Februari 2023 pukul 10.59
    </Text>
  );
};

const alteration = () => {
  return (
    <>
      <DraftListStatus
        image={emptyDraft}
        type="emptyDraft"
        title="Belum Ada Dokumen Susulan"
        subTitle="Saat ini belum ada Dokumen Susulan yang dibuat. Klik tombol di bawah untuk membuat Dokumen Susulan."
      />
    </>
  );
};

export const LandingDoksulScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchProposal, setSearchProposal] = useState('');
  const [filterProposal, setFilterProposal] = useState({})
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
        <PruHeader
          headerText="Dokumen Susulan"
          leftIcon="arrow_back"
          onLeftPress={() => navigation.navigate('home')}
        />
        <View style={[plaiStyles.px16, plaiStyles.pt16, plaiStyles.bgwhite]}>
          <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
            <SearchInput style={plaiStyles.flex} onSubmitEditing={(value) => {
              setSearchProposal(value as string)
              dispatch(updateEposState({
                paramSearch: value
              }))
            }
            } />
            <FilterSort config={CONFIG_FILTER_SORT_DOKSUL} onApply={(value) => {
              setFilterProposal(emptyData(value));
              dispatch(updateEposState({ paramFilter: emptyData(value) }))
            }
            }
            />
          </View>
        </View>
        <TabView
          routes={[
            {
              title: 'E-SPAJ & E-SQS',
              screen: () => <DOksulSQSSPAJ paramSearch={searchProposal} paramFilter={filterProposal} />,
              props: {},
              key: 'TAB-SPAJ-SQS',
            },
            {
              title: 'Alteration',
              screen: alteration,
              props: {},
              key: 'TAB-ALTERATION',
            },
          ]}
        />

      </PruScreen>
    </>
  );
};
