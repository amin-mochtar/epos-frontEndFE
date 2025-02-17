import { RegisterOptions } from 'react-hook-form';
import i18n from 'i18next';
import { TFormBeforeProceeding } from '../spaj-before-proceeding.type';
import { ValidationForm } from '../../../../utilities/common-function';

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormBeforeProceeding;
    rule: RegisterOptions;
  };
} = {
  // confirmProspectivePolicyholder: {
  //   name: 'confirmProspectivePolicyholder',
  //   rule: ValidationForm({ isRequired: true }),
  // },
  premiumPaymentCandidate: {
    name: 'premiumPaymentCandidate',
    rule: ValidationForm({ isRequired: true }),
  },
  policyOwnershipInfo: {
    name: 'policyOwnershipInfo',
    rule: ValidationForm({ isRequired: true }),
  },
  consequencesPolicy: {
    name: 'consequencesPolicy',
    rule: ValidationForm({ isRequired: true }),
  },
  spajApproval: {
    name: 'spajApproval',
    rule: ValidationForm({ isRequired: true }),
  },
  previousSpajId: {
    name: 'previousSpajId',
    rule: ValidationForm({ isRequired: true }),
  },
};
