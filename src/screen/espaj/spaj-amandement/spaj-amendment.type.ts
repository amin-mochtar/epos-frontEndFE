import { TCommonConstantData } from "plai_common_frontend";
import { DEFAULT_OPTIONAL_DATA } from "../../../utilities";
export const defaultCommonValue = { label: '', key: '' };

export type TFOrmAmendment = {
  fillAmendment: TCommonConstantData;
  amendmentDetail: {
    category?: TCommonConstantData;
    detailCategory?: {
      subCategory?: TCommonConstantData;
      amendment?: string;
      birthDate?: string;
      gender?: TCommonConstantData;
      maritalStatus?: TCommonConstantData;
    }[]
    healthData?: string;
    paymentFrequency?: TCommonConstantData;
  }[];
};

export type fieldNias = {
  clientCompanyCity: string;
  clientResidenceCity: string;
  clientOtherResidenceCity: string;
}

export const defaultAmendmentDetail = {
  category: DEFAULT_OPTIONAL_DATA,
  detailCategory: [{
    subCategory: DEFAULT_OPTIONAL_DATA,
    amendment: '',
    birthDate: '',
    gender: DEFAULT_OPTIONAL_DATA,
    maritalStatus: DEFAULT_OPTIONAL_DATA,
  }],
  healthData: '',
  paymentFrequency: DEFAULT_OPTIONAL_DATA,
}

export const defaultFormAmendment = {
  fillAmendment: DEFAULT_OPTIONAL_DATA,
  amendmentDetail: [defaultAmendmentDetail],
};
