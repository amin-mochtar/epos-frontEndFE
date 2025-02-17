import { View, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IRiskProfileAnswer,
  ISQSDetail,
  QEXPERIENCE_INVESTMENT,
  QINVESTMENT_OWNED,
  QKNOWLEDGE_INVESTMENT,
  QPERIOD_INVESTMENT,
  QPURPOSE_INVESTMENT,
  QRISK,
  TProfileRiskResult,
} from '../../../utilities';
import { EposFooter, EposHeader, OptionCard, SectionTitle, TOptionalCardData, HeaderTitle } from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { StackActions, useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import { EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import { InputField, plaiStyles, setMultipleSelect } from 'plai_common_frontend';
import { useDispatch, useSelector } from 'react-redux';
import { EposState, updateSqs } from '../../../redux';
import { CardResult } from './card-result/card-result';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { useEposRealm, useObject } from '../../../database';
import { SECTION_TITLE } from './investment-risk-profile.data';

export const InvestmentRiskProfileScreen = () => {
  const navigation = useNavigation();
  const { sqsData, selectedSQSId, proposalId, isDoksul } = useSelector<RootState, EposState>((state) => state.epos);
  const { onUpdateSQS, updateSummaryByKey } = useEposRealm();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId)?.toJSON();
  const [changeRiskProfile, setChangeRiskProfile] = useState(sqsData.changeRiskProfile);

  const [answerRiskProfile, setAnsweRiskProfile] = useState<IRiskProfileAnswer>({
    investmentOwned: [],
    investmentKnowledge: '',
    investmentTarget: '',
    acceptableRisk: '',
    invesmentMajority: '',
    invesmentPeriod: '',
    otherValue: '',
  });
  const [resultRiskProfile, setResultRiskProfile] = useState<TProfileRiskResult>(
    'conservative',
  );
  const [visibleResult, setVisibleResult] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let answer = sqsData.riskProfileAnswer;
    if (RSQSData?.riskProfileAnswer) {
      answer = RSQSData.riskProfileAnswer as IRiskProfileAnswer;
    }
    setAnsweRiskProfile(answer);
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  const onAnswerChange = (key: keyof IRiskProfileAnswer, value: string) => {
    const _value = key == 'investmentOwned' ? setMultipleSelect([...answerRiskProfile.investmentOwned], value) : value;
    if (key == 'investmentOwned' && value == '5') {
      setAnsweRiskProfile((prevState) => ({ ...prevState, [key]: _value, otherValue: '' }));
    } else if (key == 'investmentOwned' && value == '4') {
      setAnsweRiskProfile((prevState) => {
        const newState = { ...prevState };
        if (!newState.investmentOwned.includes('4')) {
          newState.investmentOwned = ['4'];
        } else {
          newState.investmentOwned.pop();
        }
        return newState;
      });
    } else {
      setAnsweRiskProfile((prevState) => ({ ...prevState, [key]: _value }));
    }
  };

  const onChangeOtherValue = (value: string) => {
    setAnsweRiskProfile((prevState) => ({ ...prevState, otherValue: value }));
  };

  const onBack = () => {
    onSave(EposRoutes.POLICY_SUBMISSION_TYPE);
    navigation.dispatch(StackActions.replace(EposRoutes.POLICY_SUBMISSION_TYPE));
    return true;
  };

  const isDisabledOtherValue = useMemo(() => {
    if (answerRiskProfile.investmentOwned?.includes('5')) {
      return answerRiskProfile.otherValue?.length === 0;
    }
    return isEmpty(answerRiskProfile.investmentOwned);
  }, [answerRiskProfile]);

  const disableOnNext = isDisabledOtherValue ||
    isEmpty(answerRiskProfile.investmentOwned) ||
    isEmpty(answerRiskProfile.investmentKnowledge) ||
    isEmpty(answerRiskProfile.investmentTarget) ||
    isEmpty(answerRiskProfile.acceptableRisk) ||
    isEmpty(answerRiskProfile.invesmentMajority) ||
    isEmpty(answerRiskProfile.invesmentPeriod);

  const onResultRiskProfile = useCallback((): TProfileRiskResult => {
    const sum =
      +answerRiskProfile.investmentKnowledge +
      +answerRiskProfile.investmentTarget +
      +answerRiskProfile.acceptableRisk +
      +answerRiskProfile.invesmentMajority +
      +answerRiskProfile.invesmentPeriod;
    let result = 'conservative';
    if (sum >= 4 && sum <= 6) {
      result = 'moderate';
    } else if (sum > 6) {
      result = 'aggressive';
    }
    return result as TProfileRiskResult;
  }, [answerRiskProfile]);

  const onSave = useCallback(async (route?: string) => {
    const result = onResultRiskProfile();
    setResultRiskProfile(result);
    if (selectedSQSId && !isDoksul) {
      const currentRP = RSQSData?.riskProfileResult! || '';
      const fundResult = '[]';
      const fundTopUpResult = '[]';

      const _sqsData = {
        ...RSQSData,
        riskProfileResult: result,
        riskProfileAnswer: answerRiskProfile,
        fund: currentRP !== result ? fundResult : RSQSData?.fund!,
        fundTopup: currentRP !== result ? fundTopUpResult : RSQSData?.fundTopup!
      } as ISQSDetail;

      onUpdateSQS(_sqsData!);
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: route || EposRoutes.POLICY_OWNER_DATA,
      });
      if (!route) setVisibleResult(true);
    } else {
      dispatch(updateSqs({ key: 'riskProfileResult', payload: result }));
      dispatch(
        updateSqs({
          key: 'riskProfileAnswer',
          payload: answerRiskProfile,
        }),
      );
      if (!route) setVisibleResult(true);
    }
  }, [selectedSQSId, answerRiskProfile, RSQSData, proposalId, onUpdateSQS, updateSummaryByKey]);

  const answerRiskProfileDisable = useCallback((item: TOptionalCardData) => {
    if (answerRiskProfile?.investmentOwned.includes('4') && item?.key !== '4') return true;
    return false;
  }, [answerRiskProfile, answerRiskProfile]);

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      <View style={[plaiStyles.px16, plaiStyles.flex]}>
        <EposHeader />
        <ScrollView style={[plaiStyles.flex]}>
          <HeaderTitle
            tagTitle={true}
            title='Profil Risiko'
            titleStyle={plaiStyles.fontHeaderTitle}
            descriptionTitle='Jawab pertanyaan di bawah untuk menentukan profil Risiko dari nasabah'
          />
          <SectionTitle text={SECTION_TITLE.INVESTMENT_OWNED} />
          <OptionCard
            type="checkbox"
            data={QINVESTMENT_OWNED}
            onDisabled={answerRiskProfileDisable}
            selected={answerRiskProfile.investmentOwned}
            onSelected={(value) => onAnswerChange('investmentOwned', value.key as string)}
            uniqueTestId='owned-investment'
          />
          {answerRiskProfile.investmentOwned.includes('5') && (
            <InputField
              containerStyle={[
                plaiStyles.flex,
                plaiStyles.mt12,
                plaiStyles.bgwhite,
                plaiStyles.spacingp,
                plaiStyles.br12,
              ]}
              label={'Lainnya'}
              required={true}
              placeholder={'Masukkan Lainnya'}
              value={answerRiskProfile.otherValue}
              setValue={(value: string) => onChangeOtherValue(value)}
              id='input-other-owned-investment'
            // error={errors.clientPhone}
            />
          )}
          <SectionTitle text={SECTION_TITLE.KNOWLADGE_INVESTMENT} />
          <OptionCard
            data={QKNOWLEDGE_INVESTMENT}
            selected={answerRiskProfile.investmentKnowledge}
            onSelected={(value) => onAnswerChange('investmentKnowledge', value.key as string)}
            translation={true}
            uniqueTestId='investment-knowledge'
          />
          <SectionTitle text={SECTION_TITLE.PURPOSE_INVESTMENT} />
          <OptionCard
            data={QPURPOSE_INVESTMENT}
            selected={answerRiskProfile.investmentTarget}
            onSelected={(value) => onAnswerChange('investmentTarget', value.key as string)}
            uniqueTestId='investment-purpose'
          />
          <SectionTitle text={SECTION_TITLE.RISK} />
          <OptionCard
            data={QRISK}
            selected={answerRiskProfile.acceptableRisk}
            onSelected={(value) => onAnswerChange('acceptableRisk', value.key as string)}
            uniqueTestId='acceptable-risk'
          />
          <SectionTitle text={SECTION_TITLE.EXPERIENCE_INVESTMENT} />
          <OptionCard
            data={QEXPERIENCE_INVESTMENT}
            selected={answerRiskProfile.invesmentMajority}
            onSelected={(value) => onAnswerChange('invesmentMajority', value.key as string)}
            translation={true}
            uniqueTestId='investment-experience'
          />
          <SectionTitle text={SECTION_TITLE.PERIOD_INVESTMENT} />
          <OptionCard
            style={plaiStyles.mb14}
            data={QPERIOD_INVESTMENT}
            selected={answerRiskProfile.invesmentPeriod}
            onSelected={(value) => onAnswerChange('invesmentPeriod', value.key as string)}
            uniqueTestId='investment-period'
          />
        </ScrollView>
      </View>
      <CardResult
        visible={visibleResult}
        onClose={() => setVisibleResult(false)}
        result={resultRiskProfile}
        changeRiskProfile={changeRiskProfile}
      />
      {changeRiskProfile ? (
        <View style={plaiStyles.spacingp}>
          <Button style={[plaiStyles.btnMedium]} onPress={() => onSave()} text="Lihat Hasil" />
        </View>
      ) : (
        <EposFooter
          position={5}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: disableOnNext,
            onPress: () => onSave(),
          }}
        />
      )}
    </PruScreen>
  );
};