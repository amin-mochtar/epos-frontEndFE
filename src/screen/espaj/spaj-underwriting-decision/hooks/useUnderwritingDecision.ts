import { StackActions, useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { useEposRealm, useObject } from '../../../../database';
import { useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../../../../redux';
import moment from 'moment';
import { EposRoutes } from '../../../../navigation';
import { useTranslation } from 'react-i18next';
import { UpfrontDecisionModel, ISPAJData, ISQSDetail } from '../../../../utilities';

function checkNeedDocument(array: string[]) {
  let isNeedLSAR = false;
  let isNeedABR = false;
  array.forEach((item) => {
    if (item.includes('LSAR')) {
      isNeedLSAR = true;
    }
    if (item.includes('ABR')) {
      isNeedABR = true;
    }
  });

  return { isNeedLSAR, isNeedABR };
}

export default function useUnderwritingDecision() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { updateSummaryByKey } = useEposRealm();
  const [showModalDocument, setShowModalDocument] = useState<boolean>(false);
  const { spajId, proposalId, spajNumber, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const isSharia = RSQSData?.policyType === 'sharia';
  const { result, timeSubmitted } = RSPAJData?.upfrontDecisionResult ?? {};
  const resultUpfront = JSON.parse(result) as UpfrontDecisionModel.RealmData['result'];
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : '';

  const infoUpfrontDecision = useMemo(() => {
    const info = [
      {
        label: t('Epos:upfront_decision:proposal_number'),
        value: spajNumber,
      },
      {
        label: t('Epos:upfront_decision:decision_date'),
        value: moment(resultUpfront?.response_detail?.decision_date).format('dddd, DD MMMM YYYY'),
      },
      {
        label: t('Epos:upfront_decision:time'),
        value: moment(timeSubmitted).format('HH:mm:ss'),
      },
      {
        label: t('Epos:upfront_decision:polcy_holder'),
        value: policyHolderData.clientName,
      },
      {
        label: `${isSharia ? 'Peserta' : 'Tertanggung'} utama`,
        value: primaryInsured?.clientName ?? policyHolderData.clientName,
      },
    ];
    return info;
  }, [resultUpfront, policyHolderData, primaryInsured, t]);

  const notesContent = useMemo<string[]>(() => {
    const notes = [t('Epos:upfront_decision:notes_point_one')];
    if (resultUpfront?.response_detail?.decision !== 'JET_CASE') {
      return notes;
    }
    return [...notes, t('Epos:upfront_decision:notes_point_two')];
  }, [resultUpfront, t]);

  const onBack = useCallback(() => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DIGITAL_SIGN));
    updateSummaryByKey(proposalId, { key: 'lastState', value: EposRoutes.SPAJ_UNDERWRITING_DECISION });
    return true;
  }, [proposalId]);

  const onContinueDocument = useCallback(() => {
    setShowModalDocument(false);
    const { isNeedABR, isNeedLSAR } = checkNeedDocument(resultUpfront?.response_detail?.need_additional_form ?? []);
    if (isNeedLSAR) {
      navigation.dispatch(StackActions.push(EposRoutes.SPAJ_LSAR, { params: isNeedABR }));
      return;
    }
    if (isNeedABR) {
      navigation.dispatch(StackActions.push(EposRoutes.SPAJ_ABR));
      return;
    }
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PAYMENT));
  }, [resultUpfront]);

  const onDeclineDocument = useCallback(async () => {
    setShowModalDocument(false);
    await updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
    await updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PAYMENT));
  }, [proposalId]);

  const onContinue = useCallback(async () => {
    const isExclusionOffering = resultUpfront?.response_detail.decision === 'SUBSTANDARD_EXCLUSION';
    const isNeedDocument =
      (resultUpfront?.response_detail.decision === 'AUTO_REQUIREMENT' ||
        resultUpfront?.response_detail.decision === 'AUTO_REQUIREMENT_ON') &&
      !!resultUpfront?.response_detail.need_additional_form?.length;
    const isDeclineAdmin = resultUpfront?.response_detail.decision === 'DECLINE_ADMIN';

    if (isExclusionOffering) {
      navigation.dispatch(StackActions.push(EposRoutes.SPAJ_EXCLUSTION_OFFERING));
      return;
    }
    if (isNeedDocument) {
      setShowModalDocument(true);
      return;
    }
    if (isDeclineAdmin) {
      navigation.dispatch(StackActions.replace(EposRoutes.LANDING));
      //TODO: ASK LATER IF NEED UPDATE SOME STATUS OR NOT
      return;
    }
    await updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
    await updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PAYMENT));
  }, [result, proposalId]);

  const buttonPrimary = useMemo(() => {
    return {
      text: 'Ya',
      onPress: onContinueDocument,
    };
  }, [onContinueDocument]);

  const buttonSecondary = useMemo(() => {
    return {
      text: 'Tidak',
      onPress: onDeclineDocument,
    };
  }, [onDeclineDocument]);

  return {
    onBack,
    onContinue,
    infoUpfrontDecision,
    notesContent,
    showModalDocument,
    buttonPrimary,
    buttonSecondary,
    result: resultUpfront as UpfrontDecisionModel.Item,
  };
}
