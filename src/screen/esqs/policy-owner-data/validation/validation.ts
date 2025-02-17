import i18n from 'i18next';
import { RegisterOptions } from 'react-hook-form';
import { TClientData, TCommonOptionalData } from '../../../../utilities';

const validateObject = (_data: TCommonOptionalData) => {
  const message = i18n.t('Epos:required') as string;
  return _data.key != '' || message;
};

const validateThousand = (value: string) => {
  const numericValue = Number(value.replace(/\./g, ''));
  return numericValue % 1000 === 0 || 'Anggaran harus kelipatan 1.000';
};

const validateUSD = (value: string) => {
  const numericValue = Number(value.replace(/\./g, ''));
  return numericValue % 1 === 0 || 'Anggaran harus kelipatan 1';
};

export const VALIDATION: {
  [key: string]: {
    name: keyof TClientData;
    rule?: RegisterOptions;
  };
} = {
  clientType: {
    name: 'clientType',
    rule: {
      validate: validateObject,
    },
  },
  clientName: {
    name: 'clientName',
    rule: {
      pattern: {
        value: /^[,./'()a-zA-Z\s][a-zA-Z\s,./'()]*$/,
        message: 'Tidak Boleh Angka dan Karakter Khusus',
      },
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      minLength: {
        value: 1,
        message: i18n.t('Epos:client_name_min'),
      },
      maxLength: {
        value: 60,
        message: i18n.t('Epos:client_name_max'),
      },
    },
  },
  clientDateBirth: {
    name: 'clientDateBirth',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  clientPhoneCode: {
    name: 'clientPhoneCode',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      minLength: {
        value: 12,
        message: i18n.t('Epos:phone_min'),
      },
    },
  },
  clientPhone: {
    name: 'clientPhone',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      minLength: {
        value: 9,
        message: i18n.t('Epos:phone_min'),
      },
    },
  },
  clientGender: {
    name: 'clientGender',
    rule: {
      validate: validateObject,
    },
  },
  clientMarriageStatus: {
    name: 'clientMarriageStatus',
    rule: {
      validate: validateObject,
    },
  },
  clientSmokeStatus: {
    name: 'clientSmokeStatus',
  },
  clientDependents: {
    name: 'clientDependents',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      maxLength: {
        value: 3,
        message: 'Maksimal 3 Digit Angka',
      },
    },
  },
  clientJob: {
    name: 'clientJob',
  },
  clientIncome: {
    name: 'clientIncome',
    rule: {
      validate: validateObject,
    },
  },
  clientExpenses: {
    name: 'clientExpenses',
    rule: {
      validate: validateObject,
    },
  },
  clientPayment: {
    name: 'clientPayment',
    rule: {
      validate: validateObject,
    },
  },
  clientCurrency: {
    name: 'clientCurrency',
    rule: {
      validate: validateObject,
    },
  },
  clientBudget: {
    name: 'clientBudget',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      validate: {
        ...validateObject,
        validateThousand
      },
    },
  },
  clientBudgetUSD: {
    name: 'clientBudget',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      validate: {
        ...validateObject,
        validateUSD
      },
    },
  },
};
