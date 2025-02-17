import i18n from 'i18next';
export type TDocData = {
  typeDocument: string | any;
  document: string;
}
export type TFormDoc = {
  docs: TDocData[];
  statementMarketer: boolean;
};

export const defaultCommonValue = { label: '', key: '' }
export const defaultFormDoc = {
  docs: [
    {
      typeDocument: defaultCommonValue,
      document: '',
    }
  ],
  statementMarketer: false,
};

export type TFormVariant = 'policy_holder' | 'primary_insured' | 'additional_insured' | 'premium_payor' | 'topup_payor'

export type TRoutes = {
  key: TFormVariant,
  title: string
}[]