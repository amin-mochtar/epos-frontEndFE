import i18n from 'i18next';

export type TFormDocTopupPayor = {
  docPolicyholder: {
    typeDocument: string | any;
    document: string;
  }[];
  statementMarketer: boolean;
};

export const defaultFormDocTopupPayor = {
  docPolicyholder: [
    {
      typeDocument: { label: '', key: '' },
      document: '',
    },
  ],
  statementMarketer: false,
};
