import { TOptionalCardData } from '../../../components';
import { TCheckboxData } from 'plai_common_frontend';

export type TFormTopupPremiPayer = {
  topupPremiPayer: string;
  goals: TOptionalCardData[];
  otherGoals: string;
  payorRelationship: string | TOptionalCardData;
  payorName: string;
  payorJob: any;
  payorCompanyName: string | undefined;
  payorIncome: string | TOptionalCardData;
  payorSourceIncome: TCheckboxData[];
  invesmentSourceIncome: string;
  personalBusinessSourceIncome: string;
  otherSourceIncome: string;
  anyOtherIncome: string;
  nonRoutineIncome: string | TOptionalCardData;
  nonRoutineSourceIncome: TCheckboxData[];
  additionalInvestmentGoals: string;
  additionalOtherGoals: string;
  nonRoutingSourceIncome: TCheckboxData[];
  additionalInvestmentNonRoutineIncome: string;
  aditionalOtherNonRoutineIncome: string;
};

export const defaultFormTopupPremiumPayer = {
  topupPremiPayer: '',
  goals: [],
  otherGoals: '',
  payorRelationship: '',
  payorName: '',
  payorJob: '',
  payorCompanyName: '',
  payorIncome: '',
  payorSourceIncome: [],
  invesmentSourceIncome: '',
  personalBusinessSourceIncome: '',
  otherSourceIncome: '',
  anyOtherIncome: '',
  nonRoutineIncome: '',
  nonRoutineSourceIncome: [],
  additionalInvestmentGoals: '',
  additionalOtherGoals: '',
  nonRoutingSourceIncome: [],
  additionalInvestmentNonRoutineIncome: '',
  aditionalOtherNonRoutineIncome: ''
};
