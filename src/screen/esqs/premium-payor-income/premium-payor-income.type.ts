import { TCheckboxData } from 'plai_common_frontend';

export const defaultForm = {
  totalIncome: undefined,
  source: [],
  other: '',
  personalBusiness: '',
  investment: '',
};

export type TFormPayorIncome = {
  totalIncome: { [key: string]: string } | any;
  source: TCheckboxData[];
  other: string;
  personalBusiness: string;
  investment: string;
};
