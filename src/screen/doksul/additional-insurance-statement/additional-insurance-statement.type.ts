export type TFormAddInsuranceStatement = {
  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: any;
  signMarketer: string;
  marketerSignLocation: string;
  marketerSignDate: any;
};

export const defaultFormAddInsuranceStatement = {
  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',
  signMarketer: '',
  marketerSignLocation: '',
  marketerSignDate: '',
};
