import i18n from 'i18next';

import { TOptionalCardData } from '../../../../components';
import { RegisterOptions } from 'react-hook-form';
import { TPOJK } from '../../../../utilities';

const validateObject = (_data: TOptionalCardData) => {
  const message = i18n.t('Epos:required') as string;
  return _data.key != '' || message;
};

export const VALIDATION: {
  [key: string]: {
    name: keyof TPOJK;
    rule?: RegisterOptions;
  };
} = {
  indonesianLanguageCapability: {
    name: 'indonesianLanguageCapability',
    rule: {
      validate: validateObject,
    },
  },
  lastEducationalStatus: {
    name: 'lastEducationalStatus',
    rule: {
      validate: validateObject,
    },
  },
  disabilityCategoryStatus: {
    name: 'disabilityCategoryStatus',
    rule: {
      validate: validateObject,
    },
  },
  validateDisabilityCategoryStatus: {
    name: 'validateDisabilityCategoryStatus',
    rule: {
      validate: validateObject,
    },
  },
  selectedCitySumatraUtara: {
    name: 'selectedCitySumatraUtara',
    rule: {
      validate: validateObject,
    },
  },
};
