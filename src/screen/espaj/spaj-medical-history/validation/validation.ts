import { RegisterOptions } from 'react-hook-form';
import i18n from 'i18next';
import { TFormMedicalHistory } from '../spaj-medical-history.screen';

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormMedicalHistory;
    rule: RegisterOptions;
  };
} = {
  questionDisease: {
    name: 'questionDisease',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  healthConditions: {
    name: 'healthConditions',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  diseaseInLastFiveYear: {
    name: 'diseaseInLastFiveYear',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  diseaseType: {
    name: 'diseaseType',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
};
