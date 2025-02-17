import { TCommonConstantData } from "plai_common_frontend";
import { DEFAULT_OPTIONAL_DATA } from "../../../utilities";

export type TBeneficiaryCandidateInfo = {
  fullname: string;
  relationshipCandidate: TCommonConstantData;
  gender: TCommonConstantData;
  dateBirth: string;
  percentage: string;
  idNumber: string;
}

export type TFormBeneficiaryCandidate = {
  waqfProgram: TCommonConstantData;
  waqfPledge: TCommonConstantData;
  beneficiaryCandidateInfo: TBeneficiaryCandidateInfo[];
};

export const defaultFormBeneficiaryCandidate = {
  waqfProgram: DEFAULT_OPTIONAL_DATA,
  waqfPledge: DEFAULT_OPTIONAL_DATA,
  beneficiaryCandidateInfo: [
    {
      fullname: '',
      relationshipCandidate: DEFAULT_OPTIONAL_DATA,
      gender: DEFAULT_OPTIONAL_DATA,
      dateBirth: '',
      percentage: '0',
      idNumber: ''
    },
  ],
};
