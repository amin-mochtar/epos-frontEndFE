import { TCheckboxData, TCommonConstantData } from 'plai_common_frontend';
import { DEFAULT_OPTIONAL_DATA, defaultCode, defaultPhoneCode, TPhoneCode } from '../../../utilities';

export type TFormDataPremiumPayor = {
  //personal info
  clientRelationshipPH: TCommonConstantData;
  clientName: string;
  clientGender: TCommonConstantData;
  clientDateBirth: string;
  clientCountryBirth: TPhoneCode;
  clientCityBirth: string;
  clientCivics: TCommonConstantData;
  clientMaritalStatus: TCommonConstantData;
  clientMotherVirginName: string;
  clientEmail: string;

  // idcard info
  clientIdcardType: TCommonConstantData;
  clientIdCardNumber: string;
  clientPassportNumber: string;
  clientKiaNumber: string;
  clientMassApplies: TCommonConstantData;
  clientMassValidUntil: string;

  // tax info
  clientNpwp: TCommonConstantData;
  clientAsideFromNpwp: TCommonConstantData;
  ClientNpwpNumber: string;
  clientNpwpHolder: string;

  // job info
  clientJob: any;
  clientCompanyName: string;
  clientCompanyLocation: TCommonConstantData;
  clientCompanyAbroad: TPhoneCode;
  clientCompanyAddress: string;
  clientCompanyNeighbourhood1: string;
  clientCompanyNeighbourhood2: string;
  clientCompanyKilometer: string;
  clientCompanyPostCode: string;
  clientCompanyDistrict: string;
  clientCompanyUrbanVillage: string;
  clientCompanyProvice: TCommonConstantData;
  clientCompanyCity: string;
  clientCompanyPhones: {
    clientCompanyPhoneCode: TPhoneCode;
    clientCompanyPhone: string;
  }[];

  // residence information
  clientIsSameAddress: boolean;
  clientResidenceLocation: TCommonConstantData;
  clientResidenceAbroad: TPhoneCode;
  clientResidenceAdress: string;
  clientResidenceNeighbourdhood1: string;
  clientResidenceNeighbourdhood2: string;
  clientResideceKilometer: string;
  clientResidencePostCode: string;
  clientResidenceDistrict: string;
  clientResidenceUrbanVillage: string;
  clientResidenceProvince: TCommonConstantData;
  clientResidenceCity: string;
  clientResidencePhoneNumbers: {
    clientResidencePhoneNumberCode: TPhoneCode;
    clientResidencePhoneNumber: string;
  }[];
  clientResidencePhoneCells: {
    clientResidencePhoneCellCode: TPhoneCode;
    clientResidencePhoneCell: string;
  }[];
  clientResidenceStatus: TCommonConstantData;
  clientResidenceStatusOther: string;

  //business entity
  businessEntityName: string;
  fromBusinessEntity: TCommonConstantData;
  typeBusinessEntity: string;
  businessEntityLocation: TCommonConstantData;
  businessEntityAbroad: TPhoneCode;
  businessEntityAddress: string;
  businessEntityNeighbourhood1: string;
  businessEntityNeighbourhood2: string;
  businessEntityKilometer: string;
  businessEntityPostCode: string;
  businessEntityDistrict: string;
  businessEntityUrbanVillage: string;
  businessEntityProvice: TCommonConstantData;
  businessEntityCity: string;
  businessEntityPhones: {
    businessEntityPhoneCode: TPhoneCode;
    businessEntityPhone: string;
  };
  businessEntityFaxs: {
    businessEntityFaxCode: TPhoneCode;
    businessEntityFax: string;
  };
  businessEntitytNpwp: TCommonConstantData;
  businessEntityNpwpNumber: string;

  // income info
  clientIncome: TCommonConstantData;
  clientNetWorth: TCommonConstantData;
  clientSourceIncome: TCheckboxData[];
  clientInvesmentSourceIncome: string,
  clientPersonalBusinessSourceIncome: string,
  clientOtherSourceIncome: string;

  // other occupation
  clientOtherJob: TCommonConstantData;
  clientOtherJobDetail: string;

  // Agreement on Doksul
  clientAgreementProvieData?: TCheckboxData[];
};

export const defaultFormDataPremiumPayor: TFormDataPremiumPayor = {
  //personal info
  clientRelationshipPH: DEFAULT_OPTIONAL_DATA,
  clientName: '',
  clientGender: DEFAULT_OPTIONAL_DATA,
  clientDateBirth: '',
  clientCountryBirth: defaultPhoneCode,
  clientCityBirth: '',
  clientCivics: DEFAULT_OPTIONAL_DATA,
  clientMaritalStatus: DEFAULT_OPTIONAL_DATA,
  clientMotherVirginName: '',
  clientEmail: '',

  // idcard info
  clientIdcardType: DEFAULT_OPTIONAL_DATA,
  clientIdCardNumber: '',
  clientPassportNumber: '',
  clientKiaNumber: '',
  clientMassApplies: DEFAULT_OPTIONAL_DATA,
  clientMassValidUntil: '',

  // tax info
  clientNpwp: DEFAULT_OPTIONAL_DATA,
  clientAsideFromNpwp: DEFAULT_OPTIONAL_DATA,
  ClientNpwpNumber: '',
  clientNpwpHolder: '',

  // job info
  clientJob: {
    code: '',
    descriptionEng: '',
    descriptionInd: '',
    gender: '',
    minAge: '',
    nameEng: '',
    nameInd: '',
    clazz: '',
  },
  clientCompanyName: '',
  clientCompanyLocation: DEFAULT_OPTIONAL_DATA,
  clientCompanyAbroad: defaultCode,
  clientCompanyAddress: '',
  clientCompanyNeighbourhood1: '',
  clientCompanyNeighbourhood2: '',
  clientCompanyKilometer: '',
  clientCompanyPostCode: '',
  clientCompanyDistrict: '',
  clientCompanyUrbanVillage: '',
  clientCompanyProvice: DEFAULT_OPTIONAL_DATA,
  clientCompanyCity: '',
  clientCompanyPhones: [
    {
      clientCompanyPhoneCode: defaultPhoneCode,
      clientCompanyPhone: '',
    },
  ],


  // residence information
  clientIsSameAddress: false,
  clientResidenceLocation: DEFAULT_OPTIONAL_DATA,
  clientResidenceAbroad: defaultCode,
  clientResidenceAdress: '',
  clientResidenceNeighbourdhood1: '',
  clientResidenceNeighbourdhood2: '',
  clientResideceKilometer: '',
  clientResidencePostCode: '',
  clientResidenceDistrict: '',
  clientResidenceUrbanVillage: '',
  clientResidenceProvince: DEFAULT_OPTIONAL_DATA,
  clientResidenceCity: '',
  clientResidencePhoneNumbers: [
    {
      clientResidencePhoneNumberCode: defaultPhoneCode,
      clientResidencePhoneNumber: '',
    },
  ],
  clientResidencePhoneCells: [
    {
      clientResidencePhoneCellCode: defaultPhoneCode,
      clientResidencePhoneCell: '',
    },
  ],
  clientResidenceStatus: DEFAULT_OPTIONAL_DATA,
  clientResidenceStatusOther: '',

  //business entity
  businessEntityName: '',
  fromBusinessEntity: DEFAULT_OPTIONAL_DATA,
  typeBusinessEntity: '',
  businessEntityLocation: DEFAULT_OPTIONAL_DATA,
  businessEntityAbroad: defaultCode,
  businessEntityAddress: '',
  businessEntityNeighbourhood1: '',
  businessEntityNeighbourhood2: '',
  businessEntityKilometer: '',
  businessEntityPostCode: '',
  businessEntityDistrict: '',
  businessEntityUrbanVillage: '',
  businessEntityProvice: DEFAULT_OPTIONAL_DATA,
  businessEntityCity: '',
  businessEntityPhones: {
    businessEntityPhoneCode: defaultPhoneCode,
    businessEntityPhone: ''
  },
  businessEntityFaxs: {
    businessEntityFaxCode: defaultPhoneCode,
    businessEntityFax: ''
  },
  businessEntitytNpwp: DEFAULT_OPTIONAL_DATA,
  businessEntityNpwpNumber: '',


  // income info
  clientIncome: DEFAULT_OPTIONAL_DATA,
  clientNetWorth: DEFAULT_OPTIONAL_DATA,
  clientSourceIncome: [],
  clientInvesmentSourceIncome: '',
  clientPersonalBusinessSourceIncome: '',
  clientOtherSourceIncome: '',

  // other occupation
  clientOtherJob: DEFAULT_OPTIONAL_DATA,
  clientOtherJobDetail: '',
  clientAgreementProvieData: []
};
