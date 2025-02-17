import { TCommonOptionalData } from '../../../utilities';
export const defaultCommonValue = { label: '', key: '' };

export type TFormAdditionalInsuredActive = {
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

export const defaultFormAdditionalInsuredActive = {
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

