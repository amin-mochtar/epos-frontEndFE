import i18n from 'i18next';
import { TCommonOptionalData } from '../../../utilities';
import { RegisterOptions } from 'react-hook-form';
import { TFormDataClientTU } from './main-insured-data.type';
import { TCommonConstantData } from 'plai_common_frontend';

type TValidateFormSelfRes = boolean | string

const validateObject = (_data: TCommonOptionalData) => {
  const message = i18n.t('Epos:required') as string;
  if ('code' in _data) {
    return _data?.code !== '' || message;
  }

  return _data?.key != '' || message;
};

const onValidateFormSelf = (_data: TCommonConstantData | string): TValidateFormSelfRes => {
  const isValid =
    typeof _data === "object"
      ? Boolean(_data?.key || _data?.code)
      : Boolean(_data);

  return isValid || String(i18n.t('Epos:required'));
}

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormDataClientTU;
    rule: RegisterOptions;
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
  clientSmokeStatus: {
    name: 'clientSmokeStatus',
    rule: {
      validate: validateObject,
    },
  },
  clientJob: {
    name: 'clientJob',
    rule: {
      validate: onValidateFormSelf,
    },
  },
  clientJobDescription: {
    name: 'clientJobDescription',
    rule: {}
  },
};
