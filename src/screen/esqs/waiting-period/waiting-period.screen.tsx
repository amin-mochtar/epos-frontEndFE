import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { EposFooter, EposHeader, OptionCard, SectionTitle } from '../../../components';
import { isEmpty } from 'lodash';
import { EposRoutes } from '../../../navigation';
import { plaiStyles } from 'plai_common_frontend';
import { PruColor, PruScreen } from 'common_ui_components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { ImportantNotes } from './important-notes/important-notes';
import { getWaitingPeriodList } from './waiting-period.data';
import { ISQSDetail } from '../../../utilities';

export const WaitingPeriodScreen = () => {
  const navigation = useNavigation();
  const { selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const additionalBenefits = RSQSData?.additionalBenefits || [];
  const { updateSQSByKey, updateSummaryByKey } = useEposRealm();
  const [selectedWaitingPeriod, setSelectedWaitingPeriod] = useState<string>(RSQSData?.waitingPeriod || '');

  const waitingPeriodList = getWaitingPeriodList({
    riderCode: additionalBenefits[0]?.key,
  });

  useEffect(() => {
    setSelectedWaitingPeriod(RSQSData?.waitingPeriod || '');
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  const onBack = () => {
    onSave(EposRoutes.CALCULATOR);
    return true;
  };

  const onSave = async (_route?: string) => {
    const nextRoute = _route || EposRoutes.QUICK_QUOTE;
    await updateSQSByKey(RSQSData?.sqsId, {
      key: 'waitingPeriod',
      value: selectedWaitingPeriod
    });
    await updateSummaryByKey(proposalId, { key: 'lastState', value: nextRoute });
    navigation.dispatch(StackActions.replace(nextRoute));
  };

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      <View style={[plaiStyles.flex]}>
        <EposHeader wrapperStyle={plaiStyles.px16} />
        <ScrollView>
          <View style={[plaiStyles.px16]}>
            <Text style={plaiStyles.fontHeaderTitle}>Pernyataan Persetujuan Ketentuan Masa Tunggu</Text>
            <SectionTitle text="Sehubungan dengan Masa Tunggu pengajuan klaim pada Polis, apakah Anda (pilih jawaban yang sesuai):" />
            <OptionCard
              style={[plaiStyles.mt12, plaiStyles.pb16]}
              data={waitingPeriodList}
              selected={selectedWaitingPeriod}
              onSelected={(value) => setSelectedWaitingPeriod(value.key as string)}
              translation={true}
            />
          </View>
          {/* <ImportantNotes /> */}
          <ImportantNotes
            policyType={RSQSData?.policyType as string}
            riderCode={additionalBenefits[0]?.key as string}
          />
        </ScrollView>
      </View>
      <EposFooter
        position={10}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: isEmpty(selectedWaitingPeriod),
          onPress: () => onSave(),
        }}
      />
    </PruScreen>
  );
};
