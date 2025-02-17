import { TClientData, TLifeAssuredSelf, TPolicyType } from '../utilities';

export enum SQS_STATE {
  ADD_QQ = 'ADD_QQ',
  CHANGE_QQ = 'CHANGE_QQ',
  CONFIRM_FUND = 'CONFIRM_FUND',
}

type TStatementDoksul = {
  label: string,
  key: string
}

export type EposState = {
  proposalId: string;
  selectedSQSId: string;
  allSQSId: string[];
  spajNumber: string;
  spajId: string;
  sumaryDraftData: SummaryDraft[];
  sqsData: SQSDetail;
  sqsState: string;
  loading: boolean;
  error: any;
  massage: string;
  page: number;
  totalRow: number;
  allDataloaded: boolean;
  additionalFormsId?: string;
  isDoksul: boolean;
  isDoksulCTA: boolean;
  statusDoksul: string;
  statementDoksul?: TStatementDoksul;
  responsePaymentGenerate: ResponsePaymentGenerate;
  responseCheckPayment: ResponseCheckPaymnet;
  spajDisclaimerUrlListed: number[];
  RMessaging: responseData;
  RMicrosite: TCheckStatusMicrosite;
  progressSync: number;
  leadId: string;
  ProspectDetail: ProspectDetailLeads;
  paramSearch: string;
  paramFilter: { [key: string]: any };
  customerStorageId: string[]
};

export type ResponseService = {
  meta: any;
  payload: ResponseDraft;
  type: string;
};

export type ResponseDraft = {
  code: string;
  data: AllDataResponseDraft;
  message: string;
};

export type AllDataResponseDraft = {
  data: SummaryDraft[];
  page: number;
  size: number;
  totalRow: number;
};

export type SummaryDraft = {
  allSQSId: string;
  createdBy: string;
  createdDate: string;
  currency: string;
  digitalSign: string;
  lifeAssuredName: string;
  lifeAssuredDob: string;
  lifeAssuredPhone: string;
  policyHolderName: string;
  policyHolderDob: string;
  policyHolderPhone: string;
  productCode: string;
  productName: string;
  proposalId: string;
  selectedSQSId: string;
  spajNumber: string;
  spajId: string;
  statusProposal: string;
  statusSubmit: boolean;
  submitDate: string;
  sumAssured: number;
  updatedBy: string;
  updatedDate: string;
  yearlyPremium: number;
  additionalFormsId?: string;
  isDoksul: boolean;
  statusDoksul: string;
  shariaFlag: string;
  agentCode: string;
};

export type ResponseSqs = {
  key: keyof SQSDetail;
  payload: any;
};

export type SQSDetail = {
  existingPolicy: string[];
  otherPolicy: string;
  hasActivePolicy: boolean;
  lifeAssuredSelf: TLifeAssuredSelf;
  additionalLifeAssuredSelf?: string;
  insuranceGoal: string[];
  isDomicileAceh?: boolean;
  isDomicileSumatraUtara?: boolean;
  SelectedCitySumatraUtara?: string;
  vulnerablityCustomer: string;
  policyType: TPolicyType;
  riskProfileResult: string;
  productRecomendation: string[];
  productCode: string;
  coverageCode: string[];
  changeRiskProfile: boolean;
  additionalValidationPolicyInformation: string;
  riskProfileAnswer: {
    investmentOwned: string[];
    investmentKnowledge: string;
    investmentTarget: string;
    acceptableRisk: string;
    invesmentMajority: string;
    invesmentPeriod: string;
    otherValue: string;
  };
  lifeAssuredData: TClientData;
  confirmationProductDoksul: string;
  additionalInsuranceStatement: string;
};

export type ParamSummaryDraft = {
  page?: number;
  size?: number;
  orderBy?: string;
  descending?: boolean;
  statusProposalList?: string[];
  currency?: string;
  policyHolderName?: string;
  productName?: string;
  minSumAssured?: number;
  maxSumAssured?: number;
  minYearlyPremium?: number;
  maxYearlyPremium?: number;
  overYearlyPremium?: number;
  agentCode?: string;
  createdPeriod?: any;
  submitPeriod?: any;
};

export type ParamsSendMessage = {
  proposalId: string;
  phoneNo: string;
  dob: string;
  jsonSubmit: string;
};

export type responseData = {
  headers: any;
  data: responseDataSendMessage;
  problem: string;
  ok: boolean;
  status: number;
};

export type responseDataSendMessage = {
  responseCode: string;
  responseMessage: string;
  content: any;
  data: {
    message: string;
    responseCode: string;
    data: dataSendMessage;
  };
  propNo: any;
};

export type dataSendMessage = {
  phoneNumber: string;
  url: string;
  cekatanId: string;
  status: string;
  createdDate: string;
};

export type TCheckStatusMicrosite = {
  responseCode: string;
  responseMessage: string;
  content: any;
  data: any;
  propNo: any;
};

export type TLicense = {
  licenseType: string;
  licenseNumber: string;
  cpdCode: string;
  licenseExpiredDate: string;
};

export type TDoksulData = {
  clientNumber: string;
  name: string;
  dob: string;
  phoneNumber: string;
  email: string;
  roleCode: string;
  policyNo: string;
  syariahFlag: string;
  productCode: string;
  nationality: string;
  componentCode: string;
  riskProfile: string;
  currency: string;
  proposalDate: string;
};

export type ResponsePaymentGenerate = {
  resp_code: number | null;
  resp_desc: string;
  url_paylink: string;
  ref_no: string;
};
export type ResponseCheckPaymnet = {
  resp_code: number | null;
  resp_desc: string;
};

export type ProspectDetailLeads = {
  // common leads params
  leadId: string
  customerFlag: string
  fullName: string
  countryCode: string
  phoneNumber: string
  campaignId: string
  birthDate?: string
  email: string
  clientNumber: string
  // personal info leads params
  gender?: string
  maritalStatus?: string
  smokerIndicator?: boolean
  education?: string
  countryNationalId?: string
  periodOfResidentCard?: string
  religion?: string
  citizenship?: string
  residentCardTypes?: string
  birthCountry?: string
  birthCountryOther?: string
  // address information
  residenceAddressArea?: string
  address?: string
  rt?: string
  rw?: string
  km?: string
  zipCode?: string
  district?: string
  province?: string
  city?: string
  homePhoneNumber?: string
  // job information
  occupation?: string
  company?: string
  income?: string
  percentageTotalExpensesToIncome?: string
  companyAddressInIndonesia?: string
  companyAddress?: string
  companyRt?: string
  companyRw?: string
  companyKm?: string
  companyZipcode?: string
  companyDistrict?: string
  companyProvince?: string
  companyCity?: string
  workPhoneNumber?: string
  // other information
  mailingAddress?: string
  otherIncomePerMonth: string
  otherAddress?: string
  otherRegionAddress?: string
  otherRt?: string
  otherRw?: string
  otherKm?: string
  otherZipcode?: string
  otherDistrict?: string
  otherProvince?: string
  otherCity?: string
  // customer campaign params
  campaignType?: string;
  dataAdditional1?: string;
  dataAdditional2?: string;
  dataAdditional3?: string;
  dataAdditional4?: string;
  dataAdditional5?: string;
  campaignSARDeath?: string;
  campaignSARAdd?: string;
  selectedPlan?: string;
  campaignCode?: string;
  id?: string;
  selectedRiderCode?: string;
  campaignClientNumber?: string;
  campaignPHNumber?: string;
  campaignTUNumber?: string;
};
