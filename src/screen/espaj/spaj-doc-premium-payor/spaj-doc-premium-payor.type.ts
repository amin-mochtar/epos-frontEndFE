import i18n from 'i18next';

export type TFormDocPremiumPayor = {
  docPolicyholder: {
    typeDocument: string | any;
    document: string;
  }[];
  statementMarketer: boolean;
};

export const defaultFormDocPremiumPayor = {
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
