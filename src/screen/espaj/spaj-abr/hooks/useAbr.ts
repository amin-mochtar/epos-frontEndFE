import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { EposState } from '../../../../redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { useEposRealm, useObject } from '../../../../database';
import { AgentProfile } from '../../../../../../Profile/types/profile-types';
import { EposRoutes } from '../../../../navigation';
import moment from 'moment';
import { defaultFormAbr } from '../config';
import { ISPAJData, UpfrontDecisionModel } from '../../../../utilities';
type TAgent = {
  agentProfile?: AgentProfile;
};

export default function useAbr() {
  const navigation = useNavigation();
  const route = useRoute();
  const [showSignatureDate, setShowSignatureDate] = useState<boolean>(false);
  const [showSignature, setShowSignature] = useState<boolean>(false);
  const { spajId, proposalId, spajNumber } = useSelector<RootState, EposState>((state) => state.epos);
  const pageParams = route.params as { params: boolean };
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const primaryInsuredData = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : '';
  const { onUpdateUpfrontDecision, updateSummaryByKey } = useEposRealm();
  const { agentProfile } = useSelector<RootState, TAgent>((state) => ({
    agentProfile: state.auth.agentProfile,
  }));
  const agentNameEn = agentProfile?.displayName?.enUs ?? ''
  const agentCode = agentProfile?.agentCode;
  const phName = policyHolderData?.clientName;
  const piName = primaryInsuredData?.clientName;
  const { abr } = RSPAJData?.upfrontDecisionResult ?? {};
  const upfrontAbr = abr ? (JSON.parse(abr) as UpfrontDecisionModel.RealmAbr) : ({} as UpfrontDecisionModel.RealmAbr);

  const {
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpfrontDecisionModel.FormAbr>({ defaultValues: upfrontAbr || defaultFormAbr });

  const agentSignDate = getValues('agent_signature.time');
  const agentSignature = watch('agent_signature.e_sign');

  const isPolicyHolderEqualtoPrimaryInsured = useMemo(() => {
    if (phName?.toLowerCase().trim() === piName?.toLowerCase().trim() || !piName) {
      return true;
    }
    return false;
  }, [policyHolderData, primaryInsuredData]);

  const isButtonValid = useMemo(() => {
    return isValid && showSignature;
  }, [isValid, showSignature]);

  const generateData = useCallback((): UpfrontDecisionModel.RealmAbr => {
    return {
      spaj_number: spajNumber ?? '',
      policy_holder_name: phName,
      policy_insured_name: piName ?? phName,
      ...getValues(),
    };
  }, [spajNumber, phName, piName, getValues]);

  const onSave = useCallback(
    (abr: UpfrontDecisionModel.RealmAbr) => {
      onUpdateUpfrontDecision(spajId, 'abr', JSON.stringify(abr));
    },
    [spajId, RSPAJData],
  );

  const onBack = useCallback(() => {
    onSave(generateData());
    updateSummaryByKey(proposalId, { key: 'lastState', value: EposRoutes.SPAJ_ABR });
    if (pageParams?.params) {
      navigation.dispatch(StackActions.pop());
      return true;
    }
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_UNDERWRITING_DECISION));
    return true;
  }, [proposalId, pageParams]);

  const onContinue = useCallback(async () => {
    onSave(generateData());
    await updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
    await updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PAYMENT));
  }, [proposalId]);

  const onChangeSignatureAgent = (base64Uri: string | null, onChange: any) => {
    onChange(base64Uri);
    const date = new Date().toString();
    setValue('agent_signature.time', date);
    setShowSignatureDate(Boolean(base64Uri ?? ''));
  };

  const onChangeShowSignature = () => {
    setShowSignature(true);
  };

  useEffect(() => {
    if (upfrontAbr?.agent_signature?.name) {
      setValue('agent_signature.name', upfrontAbr?.agent_signature?.name);
      setValue('agent_signature.code', upfrontAbr?.agent_signature?.code);
    } else {
      //@ts-ignore
      setValue('agent_signature.name', agentNameEn);
      setValue('agent_signature.code', agentCode ?? '');
    }
  }, []);

  useEffect(() => {
    if (getValues('agent_signature.e_sign')) {
      setShowSignatureDate(true);
      setShowSignature(true);
    }
  }, []);

  return {
    onBack,
    onContinue,
    control,
    errors,
    isButtonValid,
    isPolicyHolderEqualtoPrimaryInsured,
    onChangeSignatureAgent,
    onChangeShowSignature,
    agentSignDate,
    spajNumber,
    agentNameEn,
    agentCode,
    phName,
    piName,
    showSignatureDate,
    showSignature,
    agentSignature,
    handleSubmit,
  };
}
