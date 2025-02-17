import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import { plaiStyles } from 'plai_common_frontend';
import { ModalIcon } from '../../../../components';
import { UpfrontDecisionModel } from '../../../../utilities';

type TBackgroundProps = {
  children: React.ReactNode;
  from: string;
  to: string;
};

type TStatus = UpfrontDecisionModel.DecisionStatus;

type TResultCardProps = UpfrontDecisionModel.Item['response_detail'];

type TMapStatus = { title: string; from: string; to: string; icon: 'success' | 'failure' | 'notice' | 'policy' };

const mappingStatus: Record<TStatus, TMapStatus> = {
  JET_CASE: {
    icon: 'success',
    from: '#198109',
    to: '#A4B829',
    title: 'Pengajuan Anda Disetujui',
  },
  DECLINE: {
    icon: 'notice',
    from: '#E16C15',
    to: '#F68C3C',
    title: 'Analisa Underwriting',
  },
  NON_JET: {
    icon: 'notice',
    from: '#E16C15',
    to: '#F68C3C',
    title: 'Analisa Underwriting',
  },
  SUBSTANDARD_EXCLUSION: {
    icon: 'notice',
    from: '#42309F',
    to: '#7B61FF',
    title: 'Exclusion Offering',
  },
  AUTO_REQUIREMENT: {
    icon: 'policy',
    from: '#047087',
    to: '#009CBD',
    title: 'Kelengkapan Dokumen',
  },
  AUTO_REQUIREMENT_ON: {
    icon: 'policy',
    from: '#047087',
    to: '#009CBD',
    title: 'Kelengkapan Dokumen',
  },
  DECLINE_ADMIN: {
    icon: 'failure',
    from: '#B31120',
    to: '#E8192C',
    title: 'Pengajuan Ditolak',
  },
};

const ResultCard: FC<TResultCardProps> = ({ decision = 'JET_CASE', decision_description, follow_up }) => {
  const _decision = useMemo(() => {
    if(Object.keys(mappingStatus).includes(decision)) return decision
    return 'NON_JET'
  }, [decision])
  return (
    <BackgroundCard from={mappingStatus[_decision].from} to={mappingStatus[_decision].to}>
      <View style={[plaiStyles.br8, plaiStyles.px16, plaiStyles.py24, plaiStyles.overflowHidden]}>
        <ModalIcon name={mappingStatus[_decision].icon} size={40} fillColor={mappingStatus[_decision].from} />
        <Text
          style={[plaiStyles.fontWhiteBold, plaiStyles.font16, plaiStyles.lineH24, plaiStyles.mb8, plaiStyles.mt16]}
        >
          {mappingStatus[_decision].title}
        </Text>
        <Text style={[plaiStyles.fontWhiteThin, plaiStyles.lineH20]}>{decision_description}</Text>
        {!!follow_up?.length && (
          <FlatList
            data={follow_up}
            renderItem={({ item }) => <FollowupItem item={item} />}
            ItemSeparatorComponent={() => <View style={plaiStyles.mt16} />}
            style={plaiStyles.mt16}
          />
        )}
      </View>
    </BackgroundCard>
  );
};

export default ResultCard;

//#region CHILD COMPONENT
const BackgroundCard: FC<TBackgroundProps> = ({ children, from, to }) => {
  return (
    <View style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor={from} />
            <Stop offset="1" stopColor={to} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
};

const FollowupItem = ({ item }: { item: UpfrontDecisionModel.Followup }) => {
  return (
    <View style={[plaiStyles.pt16, plaiStyles.borderTWhite]}>
      <Text style={[plaiStyles.fontWhiteBold, plaiStyles.mb8]}>{item.client_name}</Text>
      <FlatList
        data={item.pending_req}
        renderItem={({ item }) => {
          return (
            <View style={[plaiStyles.row, plaiStyles.alignCenter]}>
              <View style={[plaiStyles.br50, plaiStyles.h3, plaiStyles.w3, plaiStyles.bgwhite, plaiStyles.ml4, plaiStyles.mr8]} />
              <Text style={plaiStyles.fontWhiteThin}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
//#endregion
