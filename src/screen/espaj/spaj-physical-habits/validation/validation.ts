import { RegisterOptions } from 'react-hook-form';
import i18n from 'i18next';
import { TFormPhysicalHabits } from '../spaj-physical-habits.type';

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormPhysicalHabits;
    rule: RegisterOptions;
  };
} = {
  height: {
    name: 'height',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  weight: {
    name: 'weight',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  smokerStatus: {
    name: 'smokerStatus',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  averageCigarettes: {
    name: 'averageCigarettes',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  durationtotalAlcohol: {
    name: 'durationtotalAlcohol',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  averageTotalAlcohol: {
    name: 'averageTotalAlcohol',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  totalAlcoholconsumed: {
    name: 'totalAlcoholconsumed',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  questionOfMedicine: {
    name: 'questionOfMedicine',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  medicineName: {
    name: 'medicineName',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
};
