import { RegisterOptions } from 'react-hook-form';
import { TFormDataPolicyHolder } from '../spaj-policy-owner-data.type';
import { ValidationForm } from '../../../../utilities/common-function';
import i18n from 'i18next';
import { validateCode, validateObject, validatIdCard } from '../../../../utilities';

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormDataPolicyHolder;
    rule?: RegisterOptions;
  };
} = {
  clientName: {
    name: 'clientName',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 60,
      minLength: 1,
    }),
  },
  clientGender: {
    name: 'clientGender',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientDateBirth: {
    name: 'clientDateBirth',
    rule: ValidationForm({ isRequired: true }),
  },
  clientCountryBirth: {
    name: 'clientCountryBirth',
    rule: ValidationForm({ validate: validateCode }),
  },
  clientCityBirth: {
    name: 'clientCityBirth',
    rule: ValidationForm({
      maxLength: 20,
      isRequired: true,
    }),
  },
  clientCivics: {
    name: 'clientCivics',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientMaritalStatus: {
    name: 'clientMaritalStatus',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientReligion: {
    name: 'clientReligion',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientOtherReligion: {
    name: 'clientOtherReligion',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 20,
    }),
  },
  clientLastEducation: {
    name: 'clientLastEducation',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientMotherVirginName: {
    name: 'clientMotherVirginName',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 60,
      minLength: 3,
      pattern: {
        value: /^[a-zA-Z]+(?:\s?[a-zA-Z]+)*$/,
        message: 'Format penulisan tidak sesuai'
      }
    }),
  },
  clientEmail: {
    name: 'clientEmail',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 40,
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: i18n.t('Epos:invalid_email'),
      },
    }),
  },
  clientIdcardType: {
    name: 'clientIdcardType',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientIdCardNumber: {
    name: 'clientIdCardNumber',
    rule: ValidationForm({
      validate: validatIdCard,
      maxLength: 16,
    }),
  },
  clientPassportNumber: {
    name: 'clientPassportNumber',
    rule: ValidationForm({
      isRequired: true,
      minLength: 6,
      maxLength: 20,
    }),
  },
  clientMassApplies: {
    name: 'clientMassApplies',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientMassValidUntil: {
    name: 'clientMassValidUntil',
    rule: ValidationForm({ isRequired: true }),
  },
  clientTaxDomicileStatus: {
    name: 'clientTaxDomicileStatus',
    rule: ValidationForm({ isRequired: true }),
  },
  clientNpwp: {
    name: 'clientNpwp',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientAsideFromNpwp: {
    name: 'clientAsideFromNpwp',
    rule: ValidationForm({ validate: validateObject }),
  },
  ClientNpwpNumber: {
    name: 'ClientNpwpNumber',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 25,
    }),
  },
  clientIsNpwpHolder: {
    name: 'clientIsNpwpHolder',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientNpwpHolder: {
    name: 'clientNpwpHolder',
    rule: ValidationForm({ isRequired: true }),
  },

  clientJob: {
    name: 'clientJob',
    rule: ValidationForm({ validate: validateCode }),
  },
  clientCompanyName: {
    name: 'clientCompanyName',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 50,
    }),
  },
  clientCompanyLocation: {
    name: 'clientCompanyLocation',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientCompanyAbroad: {
    name: 'clientCompanyAbroad',
    rule: ValidationForm({ validate: validateCode }),
  },
  clientCompanyAddress: {
    name: 'clientCompanyAddress',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 100,
    }),
  },
  clientCompanyNeighbourhood1: {
    name: 'clientCompanyNeighbourhood1',
  },
  clientCompanyNeighbourhood2: {
    name: 'clientCompanyNeighbourhood2',
  },
  clientCompanyKilometer: {
    name: 'clientCompanyKilometer',
  },
  clientCompanyPostCode: {
    name: 'clientCompanyPostCode',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 5,
    }),
  },
  clientCompanyDistrict: {
    name: 'clientCompanyDistrict',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  clientCompanyUrbanVillage: {
    name: 'clientCompanyUrbanVillage',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  clientCompanyProvice: {
    name: 'clientCompanyProvice',
    rule: ValidationForm({isRequired: true,validate: validateObject }),
  },
  clientCompanyCity: {
    name: 'clientCompanyCity',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  // clientCompanyPhone: {
  //   name: 'clientCompanyPhone',
  //   rule: ValidationForm({
  //     isRequired: true,
  //     maxLength: 13,
  //     minLength: 9,
  //   }),
  // },
  clientResidenceLocation: {
    name: 'clientResidenceLocation',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceAbroad: {
    name: 'clientResidenceAbroad',
    rule: ValidationForm({ validate: validateCode }),
  },
  clientResidenceAdress: {
    name: 'clientResidenceAdress',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 100,
    }),
  },
  clientResidenceNeighbourdhood1: {
    name: 'clientResidenceNeighbourdhood1',
  },
  clientResidenceNeighbourdhood2: {
    name: 'clientResidenceNeighbourdhood2',
  },
  clientResideceKilometer: {
    name: 'clientResideceKilometer',
  },
  clientResidencePostCode: {
    name: 'clientResidencePostCode',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 5,
    }),
  },
  clientResidenceDistrict: {
    name: 'clientResidenceDistrict',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  clientResidenceUrbanVillage: {
    name: 'clientResidenceUrbanVillage',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  clientResidenceProvince: {
    name: 'clientResidenceProvince',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceCity: {
    name: 'clientResidenceCity',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  // clientResidencePhoneNumber: {
  //   name: 'clientResidencePhoneNumber',
  //   rule: ValidationForm({
  //     isRequired: true,
  //     maxLength: 13,
  //     minLength: 9,
  //   }),
  // },
  // clientResidencePhoneCell: {
  //   name: 'clientResidencePhoneCell',
  //   rule: ValidationForm({
  //     isRequired: true,
  //     maxLength: 13,
  //     minLength: 9,
  //   }),
  // },
  clientResidenceMailingAddress: {
    name: 'clientResidenceMailingAddress',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceAnotherAddress: {
    name: 'clientResidenceAnotherAddress',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceRegion: {
    name: 'clientResidenceRegion',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceSumatera: {
    name: 'clientResidenceSumatera',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceNiasIdCard: {
    name: 'clientResidenceNiasIdCard',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceNIasNumberIdCard: {
    name: 'clientResidenceNIasNumberIdCard',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientOtherResidenceLocation: {
    name: 'clientOtherResidenceLocation',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientOtherResidenceAbroad: {
    name: 'clientOtherResidenceAbroad',
    rule: ValidationForm({ validate: validateCode }),
  },
  clientOtherResidenceAdress: {
    name: 'clientOtherResidenceAdress',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 100,
    }),
  },
  clientOtherResidenceNeighbourdhood1: {
    name: 'clientOtherResidenceNeighbourdhood1',
  },
  clientOtherResidenceNeighbourdhood2: {
    name: 'clientOtherResidenceNeighbourdhood2',
  },
  clientOtherResideceKilometer: {
    name: 'clientOtherResideceKilometer',
  },
  clientOtherResidencePostCode: {
    name: 'clientOtherResidencePostCode',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 5,
    }),
  },
  clientOtherResidenceDistrict: {
    name: 'clientOtherResidenceDistrict',
    rule: ValidationForm({ isRequired: true }),
  },
  clientOtherResidenceUrbanVillage: {
    name: 'clientOtherResidenceUrbanVillage',
    rule: ValidationForm({ isRequired: true }),
  },
  clientOtherResidenceProvince: {
    name: 'clientOtherResidenceProvince',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientOtherResidenceCity: {
    name: 'clientOtherResidenceCity',
    rule: ValidationForm({ isRequired: true }),
  },
  // clientOtherResidencePhoneNumber: {
  //   name: 'clientOtherResidencePhoneNumber',
  //   rule: ValidationForm({
  //     isRequired: true,
  //     maxLength: 13,
  //     minLength: 9,
  //   }),
  // },
  clientIncome: {
    name: 'clientIncome',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientNetWorth: {
    name: 'clientNetWorth',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientSourceIncome: {
    name: 'clientSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientInvesmentSourceIncome: {
    name: 'clientInvesmentSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientPersonalBusinessSourceIncome: {
    name: 'clientPersonalBusinessSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientOtherSourceIncome: {
    name: 'clientOtherSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientSecondIncome: {
    name: 'clientSecondIncome',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientSecondSourceIncome: {
    name: 'clientSecondSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientSecondInvesmentSourceIncome: {
    name: 'clientSecondInvesmentSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientSecondPersonalBusinessSourceIncome: {
    name: 'clientSecondPersonalBusinessSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientSecondOtherSourceIncome: {
    name: 'clientSecondOtherSourceIncome',
    rule: ValidationForm({ isRequired: true }),
  },
  clientPolicyType: {
    name: 'clientPolicyType',
    rule: ValidationForm({ isRequired: true }),
  },
  clientReceiveSummary: {
    name: 'clientReceiveSummary',
    rule: ValidationForm({ validate: validateObject }),
  },

  // Other information
  clientValidationIsEmployee: {
    name: 'clientValidationIsEmployee',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientValidationRelationStatus: {
    name: 'clientValidationRelationStatus',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientValidationRelationStatusAdditional: {
    name: 'clientValidationRelationStatusAdditional',
    rule: ValidationForm({ isRequired: true }),
  },
  clientEmployeeName: {
    name: 'clientEmployeeName',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 60,
      minLength: 3,
      pattern: {
        value: /^[a-zA-Z]+(?:\s?[a-zA-Z]+)*$/,
        message: 'Format penulisan tidak sesuai'
      }
    }),
  },
  clientEmployeeNIK: {
    name: 'clientEmployeeNIK',
    rule: ValidationForm({ isRequired: true, minLength: 6 }),
  },
};
