import { TCommonOptionalData } from '../../../utilities/common-function';
export const defaultCommonValue = { label: '', key: '' };

export type TFormPrimaryInsuredActive = {
  haveOtherInsurance: string | TCommonOptionalData;
  insuredDetail: {
    insuredBenefit: TCommonOptionalData;
    otherInsuranceBenefite: string;
    company: string;
    currency: string;
    sumInsured: string;
    substandard: string;
  }[];
};

export const defaultFormPrimaryInsuredActive = {
  haveOtherInsurance: '',
  insuredDetail: [
    {
      insuredBenefit: defaultCommonValue,
      otherInsuranceBenefite: '',
      company: '',
      currency: '',
      sumInsured: '',
      substandard: '',
    },
  ],
};
