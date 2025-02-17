import { TOptionalCardData } from '../../../components';
import { TCheckboxData, TCommonConstantData } from 'plai_common_frontend';
import { DEFAULT_OPTIONAL_DATA, defaultCode, defaultPhoneCode, TPhoneCode } from '../../../utilities';


export type TFormDataPolicyHolder = {
  // personal info
  clientPolicyHolder?: string,
  clientName: string;
  clientGender: TCommonConstantData;
  clientDateBirth: string;
  clientCountryBirth: TPhoneCode;
  clientCityBirth: string;
  clientCivics: TCommonConstantData;
  clientMaritalStatus: TCommonConstantData;
  clientReligion: TCommonConstantData;
  clientOtherReligion: string;
  clientLastEducation: TCommonConstantData;
  clientMotherVirginName: string;
  clientEmail: string;

  // idcard info
  clientIdcardType: TCommonConstantData;
  clientIdCardNumber: string;
  clientPassportNumber: string;
  clientMassApplies: TCommonConstantData;
  clientMassValidUntil: string;

  // tax info
  clientTaxDomicileStatus: TOptionalCardData[];
  clientNpwp: TCommonConstantData;
  clientAsideFromNpwp: TCommonConstantData;
  ClientNpwpNumber: string;
  clientIsNpwpHolder: TCommonConstantData;
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
  clientResidenceMailingAddress: TCommonConstantData;
  clientResidenceAnotherAddress: TCommonConstantData;
  clientResidenceRegion: TCommonConstantData;
  clientResidenceSumatera: TCommonConstantData;
  clientResidenceNiasIdCard: TCommonConstantData;
  clientResidenceNIasNumberIdCard: TCommonConstantData;

  // other residence information
  clientOtherResidenceLocation: TCommonConstantData;
  clientOtherResidenceAbroad: TPhoneCode;
  clientOtherResidenceAdress: string;
  clientOtherResidenceNeighbourdhood1: string;
  clientOtherResidenceNeighbourdhood2: string;
  clientOtherResideceKilometer: string;
  clientOtherResidencePostCode: string;
  clientOtherResidenceDistrict: string;
  clientOtherResidenceUrbanVillage: string;
  clientOtherResidenceProvince: TCommonConstantData;
  clientOtherResidenceCity: string;
  clientOtherResidencePhoneNumbers: {
    clientOtherResidencePhoneNumberCode: TPhoneCode;
    clientOtherResidencePhoneNumber: string;
  }[];

  // income info
  clientIncome: TCommonConstantData;
  clientNetWorth: TCommonConstantData;
  clientSourceIncome: TCheckboxData[];
  clientInvesmentSourceIncome: string;
  clientPersonalBusinessSourceIncome: string;
  clientOtherSourceIncome: string;
  clientSecondIncome: TCommonConstantData;
  clientSecondSourceIncome: TCheckboxData[];
  clientSecondInvesmentSourceIncome: string;
  clientSecondPersonalBusinessSourceIncome: string;
  clientSecondOtherSourceIncome: string;



  // policy
  clientPolicyType: boolean;
  clientReceiveSummary: TCommonConstantData;

  // Otherinformation
  clientValidationIsEmployee: TCommonConstantData;
  clientValidationRelationStatus: TCommonConstantData;
  clientValidationRelationStatusAdditional: string;
  clientEmployeeName: TCommonConstantData;
  clientEmployeeNIK: TCommonConstantData;
};

export const defaultFormDataPolicyHolder = {
  // personal info
  clientPolicyHolder: '',
  clientName: '',
  clientGender: DEFAULT_OPTIONAL_DATA,
  clientDateBirth: '',
  clientCountryBirth: defaultCode,
  clientCityBirth: '',
  clientCivics: DEFAULT_OPTIONAL_DATA,
  clientMaritalStatus: DEFAULT_OPTIONAL_DATA,
  clientReligion: DEFAULT_OPTIONAL_DATA,
  clientOtherReligion: '',
  clientLastEducation: DEFAULT_OPTIONAL_DATA,
  clientMotherVirginName: '',
  clientEmail: '',

  // idcard info
  clientIdCardType: DEFAULT_OPTIONAL_DATA,
  clientIdCardNumber: '',
  clientPassportNumber: '',
  clientMassApplies: DEFAULT_OPTIONAL_DATA,
  clientMassValidUntil: '',

  // tax info
  clientTaxDomicileStatus: [],
  clientNpwp: DEFAULT_OPTIONAL_DATA,
  clientAsideFromNpwp: DEFAULT_OPTIONAL_DATA,
  ClientNpwpNumber: '',
  clientIsNpwpHolder: DEFAULT_OPTIONAL_DATA,
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
  clientResidenceMailingAddress: DEFAULT_OPTIONAL_DATA,
  clientResidenceAnotherAddress: DEFAULT_OPTIONAL_DATA,
  clientResidenceRegion: DEFAULT_OPTIONAL_DATA,
  clientResidenceSumatera: DEFAULT_OPTIONAL_DATA,
  clientResidenceNiasIdCard: DEFAULT_OPTIONAL_DATA,
  clientResidenceNIasNumberIdCard: DEFAULT_OPTIONAL_DATA,

  //other residence information
  clientOtherResidenceLocation: DEFAULT_OPTIONAL_DATA,
  clientOtherResidenceAbroad: defaultCode,
  clientOtherResidenceAdress: '',
  clientOtherResidenceNeighbourdhood1: '',
  clientOtherResidenceNeighbourdhood2: '',
  clientOtherResideceKilometer: '',
  clientOtherResidencePostCode: '',
  clientOtherResidenceDistrict: '',
  clientOtherResidenceUrbanVillage: '',
  clientOtherResidenceProvince: DEFAULT_OPTIONAL_DATA,
  clientOtherResidenceCity: '',
  clientOtherResidencePhoneNumbers: [
    {
      clientOtherResidencePhoneNumberCode: defaultPhoneCode,
      clientOtherResidencePhoneNumber: '',
    },
  ],

  // income info
  clientIncome: DEFAULT_OPTIONAL_DATA,
  clientNetWorth: DEFAULT_OPTIONAL_DATA,
  clientSourceIncome: [],
  clientInvesmentSourceIncome: '',
  clientPersonalBusinessSourceIncome: '',
  clientOtherSourceIncome: '',
  clientSecondIncome: DEFAULT_OPTIONAL_DATA,
  clientSecondSourceIncome: [],
  clientSecondInvesmentSourceIncome: '',
  clientSecondPersonalBusinessSourceIncome: '',
  clientSecondOtherSourceIncome: '',

  // policy
  clientPolicyType: false,
  clientReceiveSummary: DEFAULT_OPTIONAL_DATA,

  // Otherinformation
  clientValidationIsEmployee: DEFAULT_OPTIONAL_DATA,
  clientValidationRelationStatus: DEFAULT_OPTIONAL_DATA,
  clientValidationRelationStatusAdditional: '',
  clientEmployeeName: DEFAULT_OPTIONAL_DATA,
  clientEmployeeNIK: DEFAULT_OPTIONAL_DATA
};
