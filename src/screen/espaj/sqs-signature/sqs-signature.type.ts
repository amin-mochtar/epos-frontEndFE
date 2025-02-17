import { TCheckboxData } from 'plai_common_frontend';

// masih butuh di enhacement lagi, nanti bakal di enhance lebih

export type TFormSqsSignature = {
  signMarketer: string;
  marketerSignLocation: string;
  marketerSignDate: any;

  signRiskProfilemarketer: string;
  riskProfilemarketerLocation: string;
  riskProfilemarketerDate: any;

  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: any;

  signRiskProfilePolicyHolder: string;
  riskProfilePolicyHolderLocation: string;
  riskProfilePolicyHolderDate: any;

  signWaitingPeriodPolicyHolder: string;
  waitingPeriodPolicyHolderLocation: string;
  waitingPeriodPolicyHolderDate: any;

  agreementIlustration: TCheckboxData[];
};

export const defaultFormSqsSignature = {
  signMarketer: '',
  marketerSignLocation: '',
  marketerSignDate: '',

  signRiskProfilemarketer: '',
  riskProfilemarketerLocation: '',
  riskProfilemarketerDate: '',

  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',

  signRiskProfilePolicyHolder: '',
  riskProfilePolicyHolderLocation: '',
  riskProfilePolicyHolderDate: '',

  signWaitingPeriodPolicyHolder: '',
  waitingPeriodPolicyHolderLocation: '',
  waitingPeriodPolicyHolderDate: '',

  agreementIlustration: [],
};
