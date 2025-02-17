import { useSelector } from 'react-redux';
import { EposState } from '../../../../redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { useEposRealm, useObject } from '../../../../database';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { EposRoutes } from '../../../../navigation';
import { AgentProfile } from '../../../../../../Profile/types/profile-types';
import { useFieldArray, useForm } from 'react-hook-form';
import moment from 'moment';
import {
  TAction,
  defaultFormLsar,
  defaultIncomeItem,
  defaultValuesItem,
  initialState,
  phSignatureReducer,
} from '../config';
import { UpfrontDecisionModel, ISPAJData, ISQSDetail } from '../../../../utilities';

type TAgent = {
  agentProfile?: AgentProfile;
};

export default function useLsar() {
  const navigation = useNavigation();
  const route = useRoute();
  const [state, dispatch] = useReducer(phSignatureReducer, initialState);
  const pageParams = route.params as { params: boolean };
  const { onUpdateUpfrontDecision, updateSummaryByKey } = useEposRealm();
  const { selectedSQSId, spajId, proposalId, spajNumber } = useSelector<RootState, EposState>((state) => state.epos);
  const { agentProfile } = useSelector<RootState, TAgent>((state) => ({
    agentProfile: state.auth.agentProfile,
  }));
  const agentNameEn = agentProfile?.displayName?.enUs ?? ''
  const agentCode = agentProfile?.agentCode;
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const { lsar } = RSPAJData?.upfrontDecisionResult ?? {};
  const upfrontLsar = lsar
    ? (JSON.parse(lsar) as UpfrontDecisionModel.RealmLSAR)
    : ({} as UpfrontDecisionModel.RealmLSAR);
  const isOther = RSQSData?.lifeAssuredSelf == 'other'

  const {
    control,
    getValues,
    setValue,
    watch,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = useForm<UpfrontDecisionModel.FormLsar>({ defaultValues: upfrontLsar || defaultFormLsar });
  const {
    fields: fieldsIncome,
    append: appendIncome,
    remove: removeIncome,
  } = useFieldArray({
    control,
    name: 'income',
  });

  const {
    fields: fieldsCompanyFinancial,
    append: appendCompanyFinancial,
    remove: removeCompanyFinancial,
  } = useFieldArray({
    control,
    name: 'customer_company_financial',
  });

  const phSignDate = getValues('customer_signature.policy_holder.time');
  const insuredSignDate = getValues('customer_signature.insured.time');
  const marketerSignDate = getValues('marketer_signature.time');
  const bankcruptcyInfo = watch('bankruptcy_info');
  const phSign = watch('customer_signature.policy_holder.e_sign');
  const insuredSign = watch('customer_signature.insured.e_sign');
  const marketerSign = watch('marketer_signature.e_sign');
  const isNeedBankcruptcyDesc = bankcruptcyInfo?.key === 'Y';

  const onDispatchSignature = (type: TAction['type'], payload: boolean) => {
    dispatch({ type, payload });
  };

  const onPressAddCompanyFinancial = () => {
    appendCompanyFinancial(defaultValuesItem);
  };

  const onDeleteCompanyFinancial = (index: number) => {
    removeCompanyFinancial(index);
  };

  const onPressAddIncome = () => {
    appendIncome(defaultIncomeItem);
  };

  const onDeleteIncome = (index: number) => {
    removeIncome(index);
  };

  const onChangeSignaturePolicyHolder = (base64Uri: string | null, onChange: any) => {
    onChange(base64Uri);
    const date = new Date().toString();
    setValue('customer_signature.policy_holder.time', date);
    onDispatchSignature('SET_SHOW_PH_SIGNATURE_DATE', Boolean(base64Uri ?? ''));
  };

  const onChangeSignatureInsured = (base64Uri: string | null, onChange: any) => {
    onChange(base64Uri);
    const date = new Date().toString();
    setValue('customer_signature.insured.time', date);
    onDispatchSignature('SET_SHOW_INSURED_SIGNATURE_DATE', Boolean(base64Uri ?? ''));
  };

  const onChangeSignatureMarketer = (base64Uri: string | null, onChange: any) => {
    onChange(base64Uri);
    const date = new Date().toString();
    setValue('marketer_signature.time', date);
    onDispatchSignature('SET_SHOW_AGENT_SIGNATURE_DATE', Boolean(base64Uri ?? ''));
  };

  const isButtonValid = useMemo(() => {
    return isValid && state.policy_holder.showSignature && state.insured.showSignature && state.agent.showSignature;
  }, [isValid, state]);

  const generateData = useCallback(() => {
    return {
      spaj_number: spajNumber ?? '',
      ...getValues(),
    };
  }, [spajNumber]);

  const onSave = useCallback(
    (lsar: UpfrontDecisionModel.RealmLSAR) => {
      onUpdateUpfrontDecision(spajId, 'lsar', JSON.stringify(lsar));
    },
    [RSPAJData, spajId],
  );

  const onBack = useCallback(() => {
    onSave(generateData());
    updateSummaryByKey(proposalId, { key: 'lastState', value: EposRoutes.SPAJ_LSAR });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_UNDERWRITING_DECISION));
    return true;
  }, [proposalId]);

  const onContinue = useCallback(async () => {
    onSave(generateData());
    if (pageParams?.params) {
      navigation.dispatch(StackActions.push(EposRoutes.SPAJ_ABR, { params: true }));
      return;
    }
    await updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
    await updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PAYMENT));
  }, [pageParams, spajNumber, proposalId]);

  useEffect(() => {
    if (upfrontLsar?.customer_confirmation?.full_name) {
      resetField('customer_confirmation.full_name', { defaultValue: upfrontLsar?.customer_confirmation?.full_name });
    } else {
      resetField('customer_confirmation.full_name', { defaultValue: policyHolderData?.full_name });
    }
  }, []);

  useEffect(() => {
    if (upfrontLsar?.marketer_signature?.name) {
      resetField('marketer_signature.name', { defaultValue: upfrontLsar?.marketer_signature?.name });
      resetField('marketer_signature.code', { defaultValue: upfrontLsar?.marketer_signature?.code });
    } else {
      //@ts-ignore
      resetField('marketer_signature.name', { defaultValue: agentNameEn });
      resetField('marketer_signature.code', { defaultValue: agentCode ?? '' });
    }
  }, []);

  useEffect(() => {
    if (fieldsIncome.length === 0) {
      appendIncome(defaultIncomeItem);
    }
    if (fieldsCompanyFinancial.length === 0) {
      appendCompanyFinancial(defaultValuesItem);
    }
  }, []);

  useEffect(() => {
    const eSign = getValues('customer_signature.policy_holder.e_sign');
    const eSignInsured = getValues('customer_signature.insured.e_sign');
    const eSignAgent = getValues('marketer_signature.e_sign');
    if (eSign) {
      onDispatchSignature('SET_PH_SIGNATURE', Boolean(eSign));
    }
    if (eSignInsured) {
      onDispatchSignature('SET_INSURED_SIGNATURE', Boolean(eSignInsured));
    }
    if (eSignAgent) {
      onDispatchSignature('SET_AGENT_SIGNATURE', Boolean(eSignAgent));
    }
  }, []);


  useEffect(() => {
    const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : {};
    resetField('customer_confirmation.full_name', { defaultValue: primaryInsured.clientName ?? policyHolderData.clientName })
  }, [])

  return {
    onBack,
    onContinue,
    setValue,
    control,
    errors,
    fieldsIncome,
    fieldsCompanyFinancial,
    onDeleteIncome,
    onPressAddIncome,
    onPressAddCompanyFinancial,
    onDeleteCompanyFinancial,
    phSignDate,
    onChangeSignaturePolicyHolder,
    insuredSignDate,
    onChangeSignatureInsured,
    onChangeSignatureMarketer,
    agentCode,
    agentNameEn,
    isButtonValid,
    spajNumber,
    signatureState: state,
    marketerSignDate,
    onDispatchSignature,
    isNeedBankcruptcyDesc,
    insuredSign,
    phSign,
    marketerSign,
    isOther,
    handleSubmit,
  };
}
