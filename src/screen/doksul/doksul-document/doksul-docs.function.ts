import { GlobalPromptModal } from 'plai_common_frontend';
import { defaultFormDoc, TFormVariant } from './doksul-docs.type';
import { checkMainParticipant, ISPAJData, TPolicyType, WR_SHARIA_CONVENT } from '../../../utilities';

export const showModalCantContinue = () => {
  GlobalPromptModal.show({
    title: 'Tidak Dapat Melanjutkan',
    subtitle: 'Silakan Lengkapi Dokumen yang Anda isi.',
    buttonPrimary: {
      text: 'Ok',
      onPress: () => {
        GlobalPromptModal.close();
      },
    },
  });
};

export const getTitle = (variant: TFormVariant, productCode: string, policyType: TPolicyType) => {
  const wording = WR_SHARIA_CONVENT[policyType];
  const mainParticipant = checkMainParticipant(productCode, policyType);
  switch (variant) {
    case 'primary_insured':
      return mainParticipant;
    case 'additional_insured':
      return wording.additionalParticipant;
    case 'premium_payor':
      return `Calon Pembayar ${wording.premiContribution}`;
    case 'topup_payor':
      return 'Calon Pembayar Top-up';
    default:
      return 'Calon Pemegang Polis';
  }
};

export const getIsDocsComplete = (docs: any, statement: boolean) => {
  const docState = docs?.some((item: any) => item?.typeDocument?.key != '') ?? false;
  const docFill = docs?.some((item: any) => item?.document != '') ?? false;

  if (statement) {
    return Boolean(docState) && Boolean(docFill);
  }
  if (docState && docFill) {
    return Boolean(statement);
  }
  if (docs?.some((item: any) => item?.typeDocument?.key === '') && !statement) {
    return true
  }
  return false;
};

export const getIsCanContinue = (RSPAJData: ISPAJData | null, hasTT?: boolean | undefined) => {
  const defaultPolicyHolderDocs = RSPAJData?.policyHolderDocs ? JSON.parse(RSPAJData.policyHolderDocs!) : defaultFormDoc;
  const defaultFormLA = RSPAJData?.primaryInsuredDocs ? JSON.parse(RSPAJData.primaryInsuredDocs) : defaultFormDoc;
  const defaultFormTT = RSPAJData?.additionalInsuredDocs ? JSON.parse(RSPAJData.additionalInsuredDocs) : defaultFormDoc;
  const defaultFormPP = RSPAJData?.premiumPayorDoc ? JSON.parse(RSPAJData.premiumPayorDoc) : defaultFormDoc;
  const defaultFormTP = RSPAJData?.topupPayorDoc ? JSON.parse(RSPAJData.topupPayorDoc) : defaultFormDoc;
  const phState = getIsDocsComplete(defaultPolicyHolderDocs?.docs, defaultPolicyHolderDocs.statementMarketer)
  const laState = getIsDocsComplete(defaultFormLA?.docs, defaultFormLA.statementMarketer)
  const ttState = getIsDocsComplete(defaultFormTT?.docs, defaultFormTT.statementMarketer)
  const ppState = getIsDocsComplete(defaultFormPP?.docs, defaultFormPP.statementMarketer)
  const tpState = getIsDocsComplete(defaultFormTP?.docs, defaultFormTP.statementMarketer)
  let state = phState && laState && ppState && tpState;
  if(hasTT && state) {
    state = ttState
  }
  return state;
};

export const getDefaultFormDoc = (key: TFormVariant, RSPAJData: ISPAJData | null) => {
  const defaultPolicyHolderDocs = RSPAJData?.policyHolderDocs ? JSON.parse(RSPAJData.policyHolderDocs!) : defaultFormDoc;
  const defaultFormLA = RSPAJData?.primaryInsuredDocs ? JSON.parse(RSPAJData.primaryInsuredDocs) : defaultFormDoc;
  const defaultFormTT = RSPAJData?.additionalInsuredDocs ? JSON.parse(RSPAJData.additionalInsuredDocs) : defaultFormDoc;
  const defaultFormPP = RSPAJData?.premiumPayorDoc ? JSON.parse(RSPAJData.premiumPayorDoc) : defaultFormDoc;
  const defaultFormTP = RSPAJData?.topupPayorDoc ? JSON.parse(RSPAJData.topupPayorDoc) : defaultFormDoc;
  const enumDefault = {
    policy_holder: defaultPolicyHolderDocs,
    primary_insured: defaultFormLA,
    additional_insured: defaultFormTT,
    premium_payor: defaultFormPP,
    topup_payor: defaultFormTP,
  };
  return enumDefault[key];
};

export const getTabRoutes = (RSPAJData: ISPAJData | null) => {
  const defaultPolicyHolderDocs = RSPAJData?.policyHolderDocs ? JSON.parse(RSPAJData.policyHolderDocs!) : '';
  const defaultFormLA = RSPAJData?.primaryInsuredDocs ? JSON.parse(RSPAJData.primaryInsuredDocs) : '';
  const defaultFormTT = RSPAJData?.additionalInsuredDocs ? JSON.parse(RSPAJData.additionalInsuredDocs) : '';
  const defaultFormPP = RSPAJData?.premiumPayorDoc ? JSON.parse(RSPAJData.premiumPayorDoc) : '';
  const defaultFormTP = RSPAJData?.topupPayorDoc ? JSON.parse(RSPAJData.topupPayorDoc) : '';
  let routes = [];
  if (defaultPolicyHolderDocs) {
    routes.push('ph')
  }
  if (defaultFormLA) {
    routes.push('la')
  }
  if (defaultFormTT) {
    routes.push('tt')
  }
  if (defaultFormPP) {
    routes.push('pp')
  }
  if (defaultFormTP) {
    routes.push('tp')
  }
  return routes
}
