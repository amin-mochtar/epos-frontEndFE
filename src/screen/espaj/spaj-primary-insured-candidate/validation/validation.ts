import { RegisterOptions } from 'react-hook-form';
import { TFormDataPrimaryInsured } from '../spaj-primary-insured-candidate.type';
import { ValidationForm } from '../../../../utilities/common-function';
import i18n from 'i18next';
import { validateCode, validateObject } from '../../../../utilities';

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormDataPrimaryInsured;
    rule?: RegisterOptions;
  };
} = {
  clientPolicyHolder: {
    name: 'clientPolicyHolder',
    rule: ValidationForm({ isRequired: true }),
  },
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
      isRequired: true,
      maxLength: 20,
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
  },
  clientPassportNumber: {
    name: 'clientPassportNumber',
    rule: ValidationForm({
      isRequired: true,
      minLength: 6,
      maxLength: 20,
    }),
  },
  clientKiaNumber: {
    name: 'clientKiaNumber',
  },
  clientMassApplies: {
    name: 'clientMassApplies',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientMassValidUntil: {
    name: 'clientMassValidUntil',
    rule: ValidationForm({ isRequired: true }),
  },
  clientNpwp: {
    name: 'clientNpwp',
    rule: ValidationForm({ validate: validateObject }),
  },
  ClientNpwpNumber: {
    name: 'ClientNpwpNumber',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 24,
    }),
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
    rule: ValidationForm({ isRequired: true,validate: validateObject }),
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
  clientIsSameAddress: {
    name: 'clientIsSameAddress',
    rule: ValidationForm({ isRequired: true }),
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
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  clientOtherResidenceUrbanVillage: {
    name: 'clientOtherResidenceUrbanVillage',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  clientOtherResidenceProvince: {
    name: 'clientOtherResidenceProvince',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientOtherResidenceCity: {
    name: 'clientOtherResidenceCity',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
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
  clientSourceIncome: {
    name: 'clientSourceIncome',
    rule: ValidationForm({ isRequired: true })
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
        message: 'Format penulisan tidak sesuai',
      },
    }),
  },
  clientEmployeeNIK: {
    name: 'clientEmployeeNIK',
    rule: ValidationForm({ isRequired: true, minLength: 6 }),
  },
};
