import { RegisterOptions } from 'react-hook-form';
import { TFormDataPremiumPayor } from '../spaj-premium-payer-candidate.type';
import { ValidationForm } from '../../../../utilities/common-function';
import i18n from 'i18next';
import { validateCode, validateObject, validatIdCard } from '../../../../utilities';

export const VALIDATION: {
  [key: string]: {
    name: keyof TFormDataPremiumPayor;
    rule?: RegisterOptions;
  };
} = {
  clientRelationshipPH: {
    name: 'clientRelationshipPH',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientName: {
    name: 'clientName',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 60,
      minLength: 1,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
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
      minLength: 16,
    }),
  },
  clientPassportNumber: {
    name: 'clientPassportNumber',
    rule: ValidationForm({
      isRequired: true,
      minLength: 6,
      maxLength: 20,
      validate: (value: string) => {
        if (!value || value?.length < 6) {
          return 'Passport harus 6 digit';
        }
      }
    }),
  },
  clientKiaNumber: {
    name: 'clientKiaNumber',
    rule: ValidationForm({
      isRequired: true,
      minLength: 6,
      maxLength: 20,
      validate: (value: string) => {
        if (!value || value?.length < 6) {
          return 'KIA harus 6 digit';
        }
      }
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
    rule: ValidationForm({ isRequired: true, validate: validateObject }),
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
  clientResidenceStatus: {
    name: 'clientResidenceStatus',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceStatusOther: {
    name: 'clientResidenceStatusOther',
    rule: ValidationForm({ maxLength: 60 }),
  },
  // clientCompanyPhone: {
  //   name: 'clientCompanyPhone',
  //   rule: ValidationForm({
  //     isRequired: true,
  //     maxLength: 13,
  //     minLength: 9,
  //   }),
  // },
  clientIsSameAddress: {
    name: 'clientIsSameAddress',
    rule: ValidationForm({ isRequired: true }),
  },
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
  clientResidenceStatus: {
    name: 'clientResidenceStatus',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientResidenceStatusOther: {
    name: 'clientResidenceStatusOther',
    rule: ValidationForm({ maxLength: 60 }),
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
  businessEntityName: {
    name: 'businessEntityName',
    rule: ValidationForm({ isRequired: true, maxLength: 60 }),
  },
  fromBusinessEntity: {
    name: 'fromBusinessEntity',
    rule: ValidationForm({ validate: validateObject }),
  },
  typeBusinessEntity: {
    name: 'typeBusinessEntity',
    rule: ValidationForm({ isRequired: true, maxLength: 40 }),
  },
  businessEntityLocation: {
    name: 'businessEntityLocation',
    rule: ValidationForm({ validate: validateObject }),
  },
  businessEntityAbroad: {
    name: 'businessEntityAbroad',
    rule: ValidationForm({ validate: validateCode }),
  },
  businessEntityAddress: {
    name: 'businessEntityAddress',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 100,
    }),
  },
  businessEntityNeighbourhood1: {
    name: 'businessEntityNeighbourhood1',
  },
  businessEntityNeighbourhood2: {
    name: 'businessEntityNeighbourhood2',
  },
  businessEntityKilometer: {
    name: 'businessEntityKilometer',
  },
  businessEntityPostCode: {
    name: 'businessEntityPostCode',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 5,
    }),
  },
  businessEntityDistrict: {
    name: 'businessEntityDistrict',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  businessEntityUrbanVillage: {
    name: 'businessEntityUrbanVillage',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  businessEntityProvice: {
    name: 'businessEntityProvice',
    rule: ValidationForm({ validate: validateObject }),
  },
  businessEntityCity: {
    name: 'businessEntityCity',
    rule: ValidationForm({
      isRequired: true,
      pattern: {
        value: /^[a-z ,.'-]+$/i,
        message: i18n.t('Epos:no_numbers_special_characters'),
      },
    }),
  },
  businessEntitytNpwp: {
    name: 'businessEntitytNpwp',
    rule: ValidationForm({ validate: validateObject }),
  },
  businessEntityNpwpNumber: {
    name: 'businessEntityNpwpNumber',
    rule: ValidationForm({ isRequired: true }),
  },
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
  clientOtherJob: {
    name: 'clientOtherJob',
    rule: ValidationForm({ validate: validateObject }),
  },
  clientOtherJobDetail: {
    name: 'clientOtherJobDetail',
    rule: ValidationForm({
      isRequired: true,
      maxLength: 40,
    }),
  },
  clientAgreementProvieData: {
    name: 'clientAgreementProvieData',
    rule: ValidationForm({ isRequired: true })
  }
};
