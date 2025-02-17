import { TCommonOptionalData } from '../../../utilities';

export type TFormSPAJTopup = {
  additionalTopup: string | TCommonOptionalData;
  currency: string;
  topup: string;
  topupGoal: {
    invesmentType: string | any;
    persentace: string
  }[];
};

export const defaultFormSPAJTopup = {
  additionalTopup: '',
  currency: '',
  topup: '',
  topupGoal: [
    {
      invesmentType: '',
      persentace: '0',
    },
  ],
};
