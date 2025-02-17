import i18n from 'i18next';

import { RegisterOptions } from 'react-hook-form';
import { TFormPayorIncome } from './premium-payor-income.type';

const validateObject = (_data: { [key: string]: any }) => {
  const message = i18n.t('Epos:required') as string;
  return (_data != undefined && _data?.key != '') || message;
};

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormPayorIncome;
    rule?: RegisterOptions;
  };
} = {
  totalIncome: {
    name: 'totalIncome',
    rule: {
      validate: validateObject,
    },
  },
  source: {
    name: 'source',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  other: {
    name: 'other',
  },
  personalBusiness: {
    name: 'personalBusiness',
  },
  investment: {
    name: 'investment',
  },
};
