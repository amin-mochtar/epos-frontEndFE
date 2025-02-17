import { TOptionalCardData } from '../../../components';
import { TCheckboxData } from 'plai_common_frontend';

export type TFormConfirmProductDoksul = {
  agreementIlustration: TCheckboxData[];
  agreementRecommendation: string | TOptionalCardData;

  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: any;

  signRiskProfilePolicyHolder: string;
  riskProfilePolicyHolderLocation: string;
  riskProfilePolicyHolderDate: any;

  signWaitingPeriodPolicyHolder: string;
  waitingPeriodPolicyHolderLocation: string;
  waitingPeriodPolicyHolderDate: any;

  signRiskProfilemarketer: string;
  riskProfilemarketerLocation: string;
  riskProfilemarketerDate: any;

  signMarketer: string;
  marketerSignLocation: string;
  marketerSignDate: any;

  vurnableCustomerValidation: string;
};

export const defaultFormConfirmProductDoksul = {
  agreementIlustration: [],
  agreementRecommendation: '',

  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',

  signRiskProfilePolicyHolder: '',
  riskProfilePolicyHolderLocation: '',
  riskProfilePolicyHolderDate: '',

  signWaitingPeriodPolicyHolder: '',
  waitingPeriodPolicyHolderLocation: '',
  waitingPeriodPolicyHolderDate: '',

  signRiskProfilemarketer: '',
  riskProfilemarketerLocation: '',
  riskProfilemarketerDate: '',

  signMarketer: '',
  marketerSignLocation: '',
  marketerSignDate: '',

  vurnableCustomerValidation: '',
};
