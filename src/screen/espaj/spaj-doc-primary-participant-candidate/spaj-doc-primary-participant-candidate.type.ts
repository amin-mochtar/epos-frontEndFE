import i18n from 'i18next';

export type TFormDocPrimaryParticipant = {
  docPolicyholder: {
    typeDocument: string | any;
    document: string;
  }[];
  statementMarketer: boolean;
};

export const defaultFormPrimaryParticipant = (ageLA: number) => {
  return {
    docPolicyholder:
      ageLA >= 17
        ? [
            {
              typeDocument: { label: i18n.t('Epos:idcard'), key: i18n.t('Epos:idcard') },
              document: '',
            },
            {
              typeDocument: { label: i18n.t('Epos:photo_selfie'), key: i18n.t('Epos:photo_selfie') },
              document: '',
            },
          ]
        : [
            {
              typeDocument: { label: i18n.t('Epos:child_idcard'), key: 'KIA' },
              document: '',
            },
          ],
    statementMarketer: false,
  };
};
