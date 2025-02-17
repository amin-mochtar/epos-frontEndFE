import i18n from 'i18next';
export type TDocData = {
  typeDocument: string | any;
  document: string;
}
export type TFormDocPolicyholder = {
  docPolicyholder: TDocData[];
  statementMarketer: boolean;
  attachForeignCurrencyAccount: boolean;
};

export const defaultFormDocPolicyholder = {
  docPolicyholder: [
    {
      typeDocument: { label: i18n.t('Epos:idcard'), key: i18n.t('Epos:idcard') },
      document: '',
    },
    {
      typeDocument: { label: i18n.t('Epos:photo_selfie'), key: i18n.t('Epos:photo_selfie') },
      document: '',
    },
  ],
  statementMarketer: false,
};


export const defaultFormChangePolicyholder = {
  docPolicyholder: [
    {
      typeDocument: { label: i18n.t('Epos:idcard'), key: i18n.t('Epos:idcard') },
      document: '',
    },
  ],
  statementMarketer: false,
};
