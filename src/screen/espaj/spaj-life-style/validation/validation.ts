import { RegisterOptions } from 'react-hook-form';
import i18n from 'i18next';
import { TFormLifeStyle } from '../spaj-life-style.type';

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormLifeStyle;
    rule: RegisterOptions;
  };
} = {
  activities: {
    name: 'activities',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  activitiesPlace: {
    name: 'activitiesPlace',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  activitiesInsured: {
    name: 'activitiesInsured',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  question1: {
    name: 'question1',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  question2: {
    name: 'question2',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  question3: {
    name: 'question3',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
};
