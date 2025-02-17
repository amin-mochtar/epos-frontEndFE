export type TWakaf = {
  idNumber: string;
  waqfDonation: string;
  waqfCashValue: string;
  waqfInstitution: any;
  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: any;
  beneficiaryCandidateInfo: {
    btnSignBeneficiary: boolean;
    beneficiaryName: string;
    IdBeneficiary: string;
    signBeneficiary: string;
    beneficiaryDate: any;
  }[];
};

export const defaultWakaf = {
  idNumber: '',
  waqfDonation: '',
  waqfCashValue: '',
  waqfInstitution: '',
  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',
  beneficiaryCandidateInfo: [
    {
      btnSignBeneficiary: false,
      beneficiaryName: '',
      IdBeneficiary: '',
      signBeneficiary: '',
      beneficiaryDate: '',
    },
  ],
};
