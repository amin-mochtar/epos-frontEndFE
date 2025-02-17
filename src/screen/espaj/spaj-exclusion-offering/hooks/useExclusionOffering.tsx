import { StackActions, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EposRoutes } from '../../../../navigation';
import { useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../../../../redux';
import { useEposRealm, useObject } from '../../../../database';
import { TOptionalCardData } from '../../../../components';
import moment from 'moment';
import { ISPAJData, showModalFailedSubmitDoksul, showModalMaintenance, UpfrontDecisionModel } from '../../../../utilities';
import { useSubmission } from '../../../../hooks';
import { submissionProposal } from '../../../../network';

type TOnChange = (...event: any[]) => void;

type FormExclusionOffering = {
  'exclustion-offering-agreement': {
    key: string;
    label: string;
  };
  'policy-holder-agreement': string;
  'e-signature': string;
  'signature-location': string;
  'signature-date': string;
};

const defaultForm = {
  'exclustion-offering-agreement': {
    key: '',
    label: '',
  },
  'policy-holder-agreement': '',
  'e-signature': '',
  'signature-location': '',
  'signature-date': '',
};

function cleanResponse(exclusionDesc: string) {
  let cleaned = exclusionDesc.replace(/<\/?p>/g, '');
  cleaned = cleaned.replace(/<\/?br\s*\/?>/gi, '\n');
  return cleaned;
}

export function useExclusionOffering() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { onUpdateUpfrontDecision, updateSummaryByKey } = useEposRealm();
  const { generateSubmission } = useSubmission()
  const { spajId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const { result, signatureExclusionOffering } = RSPAJData?.upfrontDecisionResult ?? {};
  const upfrontResult = result
    ? (JSON.parse(result) as UpfrontDecisionModel.RealmData['result'])
    : ({} as UpfrontDecisionModel.RealmData['result']);
  const signatureExclusion = signatureExclusionOffering
    ? (JSON.parse(signatureExclusionOffering) as UpfrontDecisionModel.RealmData['signatureExclusionOffering'])
    : {};
  const defaultValues = useMemo(() => {
    return signatureExclusion ? signatureExclusion : defaultForm;
  }, []);

  const regexHealth = new RegExp('\\bkesehatan\\b', 'i');
  const regexJob = new RegExp('\\bpekerjaan\\b', 'i');

  const exclusionContent = useMemo(() => {
    return {
      health: t('Epos:upfront_decision:exclusion_offer_health'),
      job: t('Epos:upfront_decision:exclusion_offer_job'),
      hobby: t('Epos:upfront_decision:exclusion_offer_hobby'),
    };
  }, [t]);

  const content =
    upfrontResult?.response_detail?.exclusion && upfrontResult?.response_detail?.exclusion?.[0]?.exclusion_desc
      ? cleanResponse(upfrontResult?.response_detail?.exclusion?.[0]?.exclusion_desc ?? '')
      : regexHealth.test(upfrontResult?.response_detail?.decision_description ?? '')
        ? exclusionContent['health']
        : regexJob.test(upfrontResult?.response_detail?.decision_description ?? '')
          ? exclusionContent['job']
          : exclusionContent['hobby'];

  const {
    control,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<FormExclusionOffering>({ defaultValues });
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [showSignatureDate, setShowSignatureDate] = useState<boolean>(false);
  const [isAgreePolicyHolderNotice, setisAgreePolicyHolderNotice] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showSignature, setShowSignature] = useState<boolean>(false);

  const signatureDate = getValues('signature-date');
  const showContent = getValues('exclustion-offering-agreement.key') !== undefined;
  const signature = getValues('e-signature');
  const isButtonValid = useMemo(() => {
    return isValid && showSignature;
  }, [isValid, showSignature]);

  const onChangeAgreement = (value: TOptionalCardData) => {
    if (value.key === 'Y') {
      setShowNotice(false);
    } else {
      setShowNotice(true);
    }
  };

  const onPolicyHolderAgreement = (onChange: TOnChange) => {
    setisAgreePolicyHolderNotice((prev) => {
      if (prev) {
        onChange('');
        return false;
      }
      onChange('agree');
      return true;
    });
  };

  const onChangeSignature = (base64Uri: string | null, onChange: TOnChange) => {
    onChange(base64Uri);
    const date = new Date().toString();
    setValue('signature-date', date);
    setShowSignatureDate(Boolean(base64Uri ?? ''));
  };

  const onSave = useCallback(
    async (data: FormExclusionOffering) => {
      await onUpdateUpfrontDecision(spajId, 'signatureExclusionOffering', JSON.stringify(data));
    },
    [result, spajId, RSPAJData, onUpdateUpfrontDecision],
  );

  const onBack = useCallback(() => {
    onSave(getValues());
    updateSummaryByKey(proposalId, { key: 'lastState', value: EposRoutes.SPAJ_EXCLUSTION_OFFERING });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_UNDERWRITING_DECISION));
    return true;
  }, [proposalId]);

  const onContinue = useCallback(
    async (data: FormExclusionOffering) => {
      onSave(data);
      await updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
      await updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PAYMENT));
    },
    [proposalId],
  );

  const onNext = useCallback(() => {
    const data = getValues();
    if (data['exclustion-offering-agreement'].key === 'Y') {
      onContinue(data);
      return;
    }
    setShowModalConfirm(true);
  }, []);

  const submission = async () => {
    await onSave(getValues());
    const privyIdData = JSON.parse(RSPAJData?.privyData!);
    const submissionData = await generateSubmission({
      privyPh: privyIdData.privyIdPH == 'failed' ? '' : privyIdData.privyIdPH,
      privyAgent: privyIdData.privyIdAgent == 'failed' ? '' : privyIdData.privyIdAgent,
      privyLA: privyIdData.privyIdLA == 'failed' ? '' : privyIdData.privyIdLA,
      privyPY: privyIdData.privyIdPY == 'failed' ? '' : privyIdData.privyIdPY,
    })
    if (!submissionData.submission.id) {
      showModalMaintenance()
    } else {
      const submissionProposalResult = await submissionProposal(submissionData);
      if (submissionProposalResult.responseCode == '00') {
        await updateSummaryByKey(proposalId, { key: 'statusProposal', value: 'SPAJ Pending UW' });
        navigation.dispatch(StackActions.replace(EposRoutes.LINK_SUBMITTED));
      } else {
        showModalFailedSubmitDoksul();
      }
    }
  }
  const buttonModalPrimary = useMemo(() => {
    return {
      text: 'Ya, Ajukan',
      onPress: () => {
        setShowModalConfirm(false);
        submission();
      },
    };
  }, []);
  const buttonModalSecondary = useMemo(() => {
    return {
      text: 'Batal',
      onPress: () => {
        setShowModalConfirm(false);
      },
    };
  }, []);

  useEffect(() => {
    if (getValues()['e-signature']) {
      setShowSignatureDate(true);
      setShowSignature(true);
    }
    if (getValues()['policy-holder-agreement'] === 'agree') {
      setisAgreePolicyHolderNotice(true);
    }
    if (getValues()?.['exclustion-offering-agreement']?.key === 'N') {
      setShowNotice(true);
    }
  }, []);

  return {
    isButtonValid,
    showNotice,
    control,
    t,
    errors,
    signatureDate,
    showSignature,
    showModalConfirm,
    isAgreePolicyHolderNotice,
    setShowSignature,
    onBack,
    onContinue,
    onChangeAgreement,
    onPolicyHolderAgreement,
    onChangeSignature,
    onNext,
    content,
    buttonModalPrimary,
    buttonModalSecondary,
    showSignatureDate,
    showContent,
    signature,
  };
}
