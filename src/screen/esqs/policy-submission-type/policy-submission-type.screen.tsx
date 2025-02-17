import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { QPOLICY_TYPE, TPolicyType, ISQSDetail } from '../../../utilities';
import { EposFooter, EposHeader, OptionCard, TOptionalCardData, HeaderTitle, EposPMKModal } from '../../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { plaiStyles } from 'plai_common_frontend';
import { PruColor, PruScreen } from 'common_ui_components';
import { useDispatch, useSelector } from 'react-redux';
import { EposState, updateSqs } from '../../../redux';
// @ts-ignore
import { RootState } from 'redux/reducer';
import { useEposRealm, useObject } from '../../../database';

export const PolicySubmissionTypeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const agentProfileState = useSelector((state: any) => {
    return state.auth?.agentProfile;
  });
  const { sqsData, selectedSQSId, proposalId, isDoksul } = useSelector<RootState, EposState>((state) => state.epos);
  const { updateSummaryByKey, updateSQSByKey } = useEposRealm();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const [selectedPolicyType, setSelectedPolicyType] = useState<TPolicyType>('');
  const [isDomicileAceh, setIsDomicileAceh] = useState<boolean | undefined>(undefined);
  const [isShowPMKModal, setIsShowPMKModal] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false)

  const nextRoute = useMemo(() => {
    const insuranceGoal = !RSQSData?.insuranceGoal.length ? sqsData.insuranceGoal : RSQSData.insuranceGoal
    const isProdcutPNG = insuranceGoal.some((item) => item === 'investasi')
    return isProdcutPNG ? EposRoutes.INVESTMENT_RISK_PROFILE : EposRoutes.POLICY_OWNER_DATA
  }, [RSQSData, sqsData]);

  useEffect(() => {
    let answer = sqsData.policyType as TPolicyType;
    let isAceh = sqsData.isDomicileAceh;
    if (RSQSData?.policyType) {
      answer = RSQSData.policyType;
      isAceh = RSQSData.isDomicileAceh;
    }
    if (isAceh && answer == 'conventional') {
      answer = '';
    }
    setSelectedPolicyType(answer);
    setIsDomicileAceh(isAceh);
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => {
      backHandler.remove();
    }
  }, []);
  useEffect(() => {
    if (isDomicileAceh) {
      setSelectedPolicyType("sharia")
    }
  }, [isDomicileAceh])
  const onSave = useCallback((route?: string) => {
    if (selectedSQSId && !isDoksul && RSQSData) {
      updateSQSByKey(selectedSQSId, {
        key: 'policyType',
        value: selectedPolicyType,
      })
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: route || EposRoutes.POLICY_SUBMISSION_TYPE,
      });
      setloading(false)
    } else {
      dispatch(updateSqs({ key: 'policyType', payload: selectedPolicyType }));
      setloading(false)
    }
    setloading(false)
  }, [selectedSQSId, selectedPolicyType, proposalId, loading]);

  const onBack = useCallback(() => {
    onSave(EposRoutes.INSURANCE_GOALS);
    navigation.dispatch(StackActions.replace(EposRoutes.INSURANCE_GOALS));
    return true;
  }, [onSave]);

  const onContinue = useCallback(() => {
    setloading(true)
    onSave();
    navigation.dispatch(StackActions.replace(nextRoute));
  }, [onSave, nextRoute]);

  const onChangePolicyType = useCallback((value: TOptionalCardData) => {
    if (value?.key === 'conventional' && !agentProfileState?.contract[0]?.contractDate) {
      setIsShowPMKModal(true);
    }
    if (value?.key === 'sharia' && !agentProfileState?.contract[1]?.contractDate) {
      setIsShowPMKModal(true);
    }
    setSelectedPolicyType(value.key as TPolicyType);
  }, [agentProfileState, setSelectedPolicyType, setIsShowPMKModal])

  const onPressModal = () => {
    setSelectedPolicyType('');
    setIsShowPMKModal(false);
  }

  const onDisabledCard = (item: TOptionalCardData) => (isDomicileAceh && item.key == 'conventional') as boolean

  const rightButtonConfig = useMemo(() => {
    return {
      disabled: selectedPolicyType === '',
      onPress: onContinue,
    }
  }, [selectedPolicyType, onContinue]);

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      <View style={[plaiStyles.px16, plaiStyles.flex]}>
        <EposHeader />
        <ScrollView style={[plaiStyles.flex]}>
          <HeaderTitle
            tagTitle={true}
            title='Tipe Pengajuan Polis'
            titleStyle={plaiStyles.fontHeaderTitle}
            descriptionTitle='Pilih Tipe Pengajuan Polis'
          />
          <OptionCard
            style={plaiStyles.mt12}
            data={QPOLICY_TYPE}
            selected={selectedPolicyType}
            onSelected={onChangePolicyType}
            onDisabled={onDisabledCard}
            uniqueTestId='policy-type'
          />
          {isDomicileAceh && (
            <View style={[plaiStyles.bgBlue, plaiStyles.mt20, plaiStyles.px16, plaiStyles.py14, { borderRadius: 14 }]}>
              <Text style={[plaiStyles.fontBlue]}>Nasabah yang berdomisili di Aceh hanya dapat memilih produk Syariah</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <EposPMKModal
        isSharia={selectedPolicyType === 'sharia' ? true : false}
        isShow={isShowPMKModal}
        onPressModal={onPressModal}
      />
      <EposFooter
        loading={loading}
        position={4}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={rightButtonConfig}
      />
    </PruScreen>
  );
};
