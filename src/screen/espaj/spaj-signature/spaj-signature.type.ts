import { TCheckboxData } from "plai_common_frontend";

export type TFormSpajSignature = {
  statementSpaj: TCheckboxData[]
  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: any;
  signPrimaryInsured: string;
  primaryInsuredSignLocation: string;
  primaryInsuredSignDate: any;
  signAdditionalInsured: string;
  additionalInsuredSignLocation: string;
  additionalInsuredSignDate: any;
  signPremiumPayor: string;
  premiumPayorSignLocation: string;
  premiumPayorSignDate: any;
  signTopupPayor: string;
  topupPayorSignLocation: string;
  topupPayorSignDate: any;
  signMarketer: string;
  marketerSignLocation: string;
  marketerSignDate: any;
  statementMarketer: string;
};

export const defaultFormSpajSignature = {
  statementSpaj: [],
  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',
  signPrimaryInsured: '',
  primaryInsuredSignLocation: '',
  primaryInsuredSignDate: '',
  signAdditionalInsured: '',
  additionalInsuredSignLocation: '',
  additionalInsuredSignDate: '',
  signPremiumPayor: '',
  premiumPayorSignLocation: '',
  premiumPayorSignDate: '',
  signTopupPayor: '',
  topupPayorSignLocation: '',
  topupPayorSignDate: '',
  signMarketer: '',
  marketerSignLocation: '',
  marketerSignDate: '',
  statementMarketer: '',
};
