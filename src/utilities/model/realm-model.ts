import { TCommonConstantData } from 'plai_common_frontend';
import { TClientJob, TClientPhoneCode } from './sqs-model';
import { TOptionalCardData } from '../../components';

export type KeyLabel = {
  key: string;
  label: string;
};

export type KeyLabelValue = KeyLabel & {
  value: string;
};
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RealmSPAJ {
  export interface ClientCode {
    name: string;
    dial_code: string;
    emoji: string;
    code: string;
  }
  export interface PolicyHolderData {
    clientPolicyHolder: string;
    clientName: string;
    clientGender: TCommonConstantData;
    clientDateBirth: Date;
    clientCountryBirth: TCommonConstantData;
    clientCityBirth: string;
    clientCivics: TCommonConstantData;
    clientMaritalStatus: TCommonConstantData;
    clientReligion: TCommonConstantData;
    clientOtherReligion: string;
    clientLastEducation: TCommonConstantData;
    clientMotherVirginName: string;
    clientEmail: string;
    clientIdCardType: string;
    clientIdCardNumber: string;
    clientPassportNumber: string;
    clientMassApplies: TCommonConstantData;
    clientMassValidUntil: string;
    clientTaxDomicileStatus: TCommonConstantData[];
    clientNpwp: TCommonConstantData;
    clientAsideFromNpwp: TCommonConstantData;
    ClientNpwpNumber: string;
    clientIsNpwpHolder: string;
    clientNpwpHolder: string;
    clientJob: {
      code: string;
      descriptionEng: string;
      descriptionInd: string;
      gender: string;
      minAge: string;
      nameEng: string;
      nameInd: string;
      clazz: string;
    };
    clientCompanyName: string;
    clientCompanyLocation: {
      title: string;
      key: string;
    };
    clientCompanyAbroad: string;
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
      clientCompanyPhoneCode: ClientCode;
      clientCompanyPhone: string;
    }[];
    clientResidenceLocation: {
      title: string;
      key: string;
    };
    clientResidenceAbroad: string;
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
      clientResidencePhoneNumberCode: ClientCode;
      clientResidencePhoneNumber: string;
    }[];
    clientResidencePhoneCells: {
      clientResidencePhoneCellCode: ClientCode;
      clientResidencePhoneCell: string;
    }[];
    clientResidenceMailingAddress: TCommonConstantData;
    clientResidenceAnotherAddress: TCommonConstantData;
    clientResidenceRegion: string;
    clientResidenceSumatera: string;
    clientResidenceNiasIdCard: string;
    clientResidenceNIasNumberIdCard: string;
    clientOtherResidenceLocation: string;
    clientOtherResidenceAbroad: string;
    clientOtherResidenceAdress: string;
    clientOtherResidenceNeighbourdhood1: string;
    clientOtherResidenceNeighbourdhood2: string;
    clientOtherResideceKilometer: string;
    clientOtherResidencePostCode: string;
    clientOtherResidenceDistrict: string;
    clientOtherResidenceUrbanVillage: string;
    clientOtherResidenceProvince: string;
    clientOtherResidenceCity: string;
    clientOtherResidencePhoneNumbers: string;
    clientIncome: TCommonConstantData;
    clientNetWorth: TCommonConstantData;
    clientSourceIncome: TCommonConstantData[];
    clientInvesmentSourceIncome: string;
    clientPersonalBusinessSourceIncome: string;
    clientOtherSourceIncome: string;
    clientPolicyType: boolean;
    clientReceiveSummary: TCommonConstantData;
    clientValidationIsEmployee: TCommonConstantData;
    clientValidationRelationStatus: string;
    clientValidationRelationStatusAdditional: string;
    clientEmployeeName: string;
    clientEmployeeNIK: string;
    clientIdcardType: TCommonConstantData;
  }
  export type PolicyHolderAccount = {
    policyholderAccountInfo: TCommonConstantData;
    additionalValidationSPAJOfferingProduct: TCommonConstantData;
    additionalValidationSPAJModal?: TCommonConstantData;
    accountHolder: string;
    accountNumber: string;
    bankName: { codeBank: string; nameBank: string };
    branch: string;
    city: string;
  };
  export type PolicyHolderDocs = {
    docPolicyholder: { typeDocument: TCommonConstantData; document: string; name?: string }[];
    statementMarketer: boolean;
  };
  export type Item = {
    policyHolderDocs: PolicyHolderDocs;
    policyHolderAccount: PolicyHolderAccount;
    policyHolderData: PolicyHolderData;
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RealmISQSDetail {
  type CalculatorMainBenefit = {
    benefitsCode: string;
    periodInsured: KeyLabel;
    periodRider: KeyLabel;
    planRider: KeyLabelValue;
    premiRider: string;
    regularTopupPremium?: string;
    roomRider: KeyLabelValue;
    saverRider: KeyLabelValue;
    sumInsured?: string;
  };
  type Calculator = {
    age1: string;
    age2: string;
    age3: string;
    annualPremium: string;
    approvalSubstandard: KeyLabel;
    backdate: KeyLabel;
    backdateValue?: string;
    bank: KeyLabel;
    bankAccountName?: string;
    bankAccountNumber?: string;
    bankCurrency?: KeyLabel;
    benefits: [];
    branchBank?: string;
    feeAdministration: KeyLabel;
    frequencyPayment: KeyLabel;
    mainBenefits: CalculatorMainBenefit[];
    periodInsured: KeyLabel;
    regularPremium: string;
    regularTopupPremium?: string;
    sumInsured?: string;
    topupBenefits: [];
    // product variant temp key
    educationBenefitPeriod?: TOptionalCardData;
    contributionPaymentPeriod?: TOptionalCardData;
  };

  export type Fund = {
    type_fund: string;
    type: string;
    type_ui: string;
    desc_fund: string;
    percent: number;
    lowRate: string;
    mediumRate: string;
    highRate: string;
    benRate: string;
  };
  export type Item = {
    calculator: Calculator;
    product?: TCommonConstantData;
    substandar: {
      substandard: { code: TCommonConstantData; type: TCommonConstantData }[];
    };
    ilustrationDocs: RealmSPAJ.PolicyHolderDocs['docPolicyholder'];
    fund: Fund[];
    fundTopup: Fund[];
  };
}

export type TPolicyType = 'sharia' | 'conventional' | '';
export type ProductType = 'UL' | 'TRD';
export type TLifeAssuredSelf = 'self' | 'other' | '';
export type TProductCode =
  | 'U12'
  | 'H14'
  | 'T1P'
  | 'T1Q'
  | 'L1WR'
  | 'L1WD'
  | 'U13'
  | 'H15'
  | 'L1Q'
  | 'E1O'
  | 'E1OP'
  | 'C16';

export interface ICustomerStorage {
  clientType: TCommonConstantData;
  clientName: string;
  clientDateBirth: string;
  clientPhoneCode: TClientPhoneCode;
  clientPhone: string;
  clientGender: TCommonConstantData;
  clientMarriageStatus: TCommonConstantData;
  clientSmokeStatus: TCommonConstantData;
  clientDependents: string;
  clientJob: TClientJob;
  clientIncome: TCommonConstantData;
  clientExpenses: TCommonConstantData;
  clientPayment: TCommonConstantData;
  clientCurrency: TCommonConstantData;
  clientBudget: string;
  clientNationality: string;
  clientEmail: string;
  clientAddress?: IAddressCustom;
  clientId: string;
  clientAnb: number;
  clientJobDescription: string;
}
export interface IAddressCustom {
  line1?: string;
  line2?: string;
  line3?: string;
}

export interface ICommonObjectData {
  key: string;
  label?: string;
  desc?: string;
}
export interface IRiskProfileAnswer {
  investmentOwned: string[];
  investmentKnowledge: string;
  investmentTarget: string;
  acceptableRisk: string;
  invesmentMajority: string;
  invesmentPeriod: string;
  otherValue: string;
}
export interface ISummaryProposal {
  proposalId: string;
  // multiple using , e.g "AAA,BBB"
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
  lastState: string;
  paramSendMessage: string;
  cekatanId: string;
  additionalFormsId: string;
  isDoksul: boolean;
  isDoksulCTA: boolean;
  statusDoksul: string;
  shariaFlag: string;
  leadId: string;
  agentCode: string;
  doksulType: string;
  convData: string;
  hasAdditionalLA: boolean
}
export interface ISQSDetail {
  // NEED IMPROVE FOR ARRAY TO BE ARRAY
  sqsId: string;
  clientIdSelected: string[];
  // Existing policy client have before
  // 'Other', 'study', 'bpjs
  existingPolicy: string[];
  // if exisiting policy include 'other'
  // otherPolicy field will have value
  otherPolicy?: string | null;
  hasActivePolicy?: boolean;
  // for who will use this proposal
  lifeAssuredSelf: TLifeAssuredSelf;
  additionalLifeAssuredSelf?: string;
  insuranceGoal: string[];
  isDomicileAceh: boolean | undefined;
  isDomicileSumatraUtara: boolean | undefined;
  SelectedCitySumatraUtara: string;
  vulnerablityCustomer: string; //TVulnerable
  policyType: TPolicyType;
  // 'moderate' | 'aggressive' | 'conservative'
  riskProfileResult?: string | null;
  riskProfileAnswer?: IRiskProfileAnswer;
  additionalValidationPolicyInformation?: string | null;
  productRecommendation?: string;
  // stringfy object and can stringify array object if bundling
  product?: TCommonConstantData;
  additionalBenefits?: ICommonObjectData[];
  mainAdditionalBenefits?: ICommonObjectData[];
  topupAdditionalBenefits?: ICommonObjectData[];
  productCategory?: string;
  waitingPeriodType?: string;
  // Stringify data from object policy holder data
  policyHolderIsPremiumPayor?: string;
  // 'lifeAssured' | 'other'
  prospectivePremiumPayor?: string;
  // stringify from object
  otherSourceIncome?: string;
  premiumPayorIncomeData?: string;
  waitingPeriod?: string;
  confirmationProductRecommendation?: string;
  clientPayment?: string;
  clientCurrency?: string;
  clientBudget?: string;
  fund?: string;
  fundTopup?: string;
  calculator?: string;
  resultCalculator?: string;
  resultIlustration?: string;
  confirmationProductDoksul?: string;
  additionalInsuranceStatement?: string; //TPOJK
  calculatorWithdrawl?: string;
  calculatorTopup?: string;
  substandar?: string;
  additionalSubstandar?: string;

  // Not Implement
  // Data Config
  /**
   * Stringify from {
   *  conservatif: [],
   *  moderate: [],
   *  aggressive: []
   * }
   */
  totalIncome?: string;
  sourceIncome?: string[];
  convDiscountData: string;
  convDataResult: string;
  isGIO?: boolean;
  ilustrationDocs?: string;
  isChangePH?: boolean;
}

export interface ISPAJDataCompleteness {
  key: string;
  categoryKey: string;
  name: string;
  status: boolean;
  route: string;
  // TODO
  params?: any;
}
export interface ISPAJData {
  spajId: string;
  confirmationSQS: string;
  policyHolderData: string;
  primaryInsured: string;
  additionalInsured?: string;
  DataCompleteness: ISPAJDataCompleteness[];
  activePolicy: string;
  additionalActivePolicy?: string;
  premiumPayor: string;
  topup: string;
  topupPremiumPyor: string;
  beneficiary: string;
  policyHolderDocs: string;
  primaryInsuredDocs: string;
  additionalInsuredDocs?: string;
  amandment: string;
  policyHolderAccount: string;
  sqsSignature: string;
  premiumPayorDoc: string;
  topupPayorDoc: string;
  spajSignature: string;
  spajPayment?: string;
  spajOcr?: string;
  spajLiveness?: string;
  additionalValidationSPAJOfferingProduct?: TCommonConstantData;
  privyData?: string;
  flagForm?: string;
  upfrontDecisionResult?: { [k in string]: string };
  rateUsd: string;
}

export type TSubstandard = {
  substandard: {
    type: string;
    code: string;
  }[];
  information: string;
  noSpaj: any;
};

export type TBenefitsValue = {
  benefitsCode: string;
  planRider: TCommonConstantData;
  roomRider: TCommonConstantData;
  saverRider: TCommonConstantData;
  periodRider: TCommonConstantData;
  premiRider: string;
  sumInsured: string;
  periodInsured: TCommonConstantData;
  regularTopupPremium: string;
};

export type TCalculatorData = {
  frequencyPayment: TCommonConstantData;
  annualPremium: string;
  regularPremium: string;
  regularTopupPremium: string;
  feeAdministration: TCommonConstantData;
  age1: string;
  age2: string;
  age3: string;
  backdate: TCommonConstantData;
  backdateValue: string;
  sumInsured: string;
  periodInsured: TCommonConstantData;
  approvalSubstandard: TOptionalCardData;
  bank: TOptionalCardData;
  branchBank: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankCurrency: TOptionalCardData;
  benefits: TBenefitsValue[];
  mainBenefits: TBenefitsValue[];
  topupBenefits: TBenefitsValue[];
  contributionPaymentPeriod?: TCommonConstantData;
  educationBenefitPeriod?: TCommonConstantData;
  paymentPeriod?: TCommonConstantData
};

export interface IFundFactSheet {
  fundId: string;
  period: string;
  data: string;
  nameDoc: string;
}
