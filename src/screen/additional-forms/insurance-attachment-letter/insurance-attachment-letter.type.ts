import { TCommonConstantData } from "plai_common_frontend";
import { DEFAULT_OPTIONAL_DATA } from "../../../utilities";
import { TOptionalCardData } from "../../../components";

export const DEFAULT_MAINFAMILIES = {
  key: '',
  title: '',
  detail: '',
}

export type TInsuranceAttachmentLetter = {
  relationshipPHLA: TCommonConstantData;
  relationshipLABeneficiarys: {
    relationshipLABeneficiary: TCommonConstantData;
  }[]
  mainFamilies: TOptionalCardData;
  otherFamiliesE: TOptionalCardData;
  reasonOtherFamiliesE: string;
  otherFamiliesF: TOptionalCardData;
  reasonOtherFamiliesF: string;
  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: string;
  signSonDaughterInLaw: string;
  sonDaughterInLawSignLocation: string;
  sonDaughterInLawSignDate: string;
  statementSKA: boolean
}

export const defaultInsuranceAttachmentLetter = {
  relationshipPHLA: DEFAULT_OPTIONAL_DATA,
  relationshipLABeneficiarys: [{
    relationshipLABeneficiary: DEFAULT_OPTIONAL_DATA
  }],
  mainFamilies: DEFAULT_MAINFAMILIES,
  otherFamiliesE: DEFAULT_MAINFAMILIES,
  reasonOtherFamiliesE: '',
  otherFamiliesF: DEFAULT_MAINFAMILIES,
  reasonOtherFamiliesF: '',
  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',
  signSonDaughterInLaw: '',
  sonDaughterInLawSignLocation: '',
  sonDaughterInLawSignDate: '',
  statementSKA: false,
}