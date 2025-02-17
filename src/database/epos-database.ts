import { Realm, createRealmContext } from '@realm/react';
//@ts-ignore
import { ENCRYPTION_KEY } from '@env';
import { Dictionary, Mixed } from 'realm';
import {
  IAddressCustom,
  ICommonObjectData,
  ICustomerStorage,
  IRiskProfileAnswer,
  ISPAJData,
  ISPAJDataCompleteness,
  ISQSDetail,
  ISummaryProposal,
} from '../utilities';

class CommonObjectData extends Realm.Object<ICommonObjectData> {
  key!: Mixed;
  label?: Mixed;
  desc?: string;

  static schema = {
    name: 'CommonObjectData',
    embedded: true,
    properties: {
      key: 'mixed',
      label: 'string?',
      desc: 'string?',
    },
  };
}

class SummaryProposal extends Realm.Object<ISummaryProposal> {
  proposalId!: string;
  allSQSId!: string;
  createdBy!: string;
  createdDate!: string;
  currency?: string;
  digitalSign?: string;
  lifeAssuredName!: string;
  lifeAssuredDob!: string;
  lifeAssuredPhone!: string;
  policyHolderName!: string;
  policyHolderDob!: string;
  policyHolderPhone!: string;
  productCode?: string;
  productName?: string;
  selectedSQSId!: string;
  spajNumber?: string;
  spajId?: string;
  statusProposal?: string;
  statusSubmit?: boolean;
  submitDate?: string;
  sumAssured?: number;
  updatedBy?: string;
  updatedDate?: string;
  yearlyPremium?: number;
  lastState!: string;
  paramSendMessage?: string;
  cekatanId?: string;
  additionalFormsId?: string;
  isDoksul?: boolean;
  isDoksulCTA?: boolean;
  statusDoksul?: string;
  shariaFlag!: string;
  leadId?: string;
  agenCode!: string;
  doksulType?: string;
  convData?: string
  hasAdditionalLA?: boolean

  static schema = {
    name: 'SummaryProposal',
    properties: {
      proposalId: 'string',
      allSQSId: 'string',
      createdBy: 'string',
      createdDate: 'string',
      currency: 'string',
      digitalSign: 'string',
      lifeAssuredName: 'string',
      lifeAssuredDob: 'string',
      lifeAssuredPhone: 'string',
      policyHolderName: 'string',
      policyHolderDob: 'string',
      policyHolderPhone: 'string',
      productCode: 'string',
      productName: 'string',
      selectedSQSId: 'string',
      spajNumber: 'string',
      spajId: 'string',
      statusProposal: 'string',
      statusSubmit: 'bool',
      submitDate: 'string',
      sumAssured: 'float',
      updatedBy: 'string',
      updatedDate: 'string',
      yearlyPremium: 'float',
      lastState: 'string',
      paramSendMessage: 'string',
      cekatanId: 'string?',
      additionalFormsId: 'string?',
      isDoksul: 'bool?',
      isDoksulCTA: 'bool?',
      statusDoksul: 'string?',
      shariaFlag: 'string',
      leadId: 'string',
      agentCode: 'string',
      doksulType: 'string?',
      convData: 'string?',
      hasAdditionalLA: 'bool?',
    },
    primaryKey: 'proposalId',
  };
}
class AddressCustom extends Realm.Object<IAddressCustom> {
  line1?: string;
  line2?: string;
  line3?: string;

  static schema = {
    name: 'AddressCustom',
    embedded: true,
    properties: {
      line1: 'string?',
      line2: 'string?',
      line3: 'string?',
    },
  };
}

class CustomerStorage extends Realm.Object<ICustomerStorage> {
  clientType!: Dictionary;
  clientName!: string;
  clientDateBirth!: string;
  clientPhoneCode!: Dictionary;
  clientPhone!: string;
  clientGender!: Dictionary;
  clientMarriageStatus!: Dictionary;
  clientSmokeStatus!: Dictionary;
  clientDependents!: string;
  clientJob!: Dictionary;
  clientIncome!: Dictionary;
  clientExpenses!: Dictionary;
  clientPayment!: Dictionary;
  clientCurrency!: Dictionary;
  clientBudget!: string;
  clientId!: string;
  clientAnb!: number;
  clientNationality?: string;
  clientEmail?: string;
  clientAddress?: IAddressCustom;
  clientJobDescription!: string;

  static schema = {
    name: 'CustomerStorage',
    properties: {
      clientType: 'mixed{}',
      clientName: 'string',
      clientDateBirth: 'string',
      clientPhoneCode: 'mixed{}',
      clientPhone: 'string',
      clientGender: 'mixed{}',
      clientMarriageStatus: 'mixed{}',
      clientSmokeStatus: 'mixed{}',
      clientDependents: 'string',
      clientJob: 'mixed{}',
      clientIncome: 'mixed{}',
      clientExpenses: 'mixed{}',
      clientPayment: 'mixed{}',
      clientCurrency: 'mixed{}',
      clientBudget: 'string',
      clientId: 'string',
      clientAnb: 'int',
      clientNationality: 'string?',
      clientEmail: 'string?',
      clientAddress: 'AddressCustom?',
      clientJobDescription: 'string'
    },
    primaryKey: 'clientId',
  };
}
class RiskProfileAnswer extends Realm.Object<IRiskProfileAnswer> {
  investmentOwned!: string[];
  investmentKnowledge!: string;
  investmentTarget!: string;
  acceptableRisk!: string;
  invesmentMajority!: string;
  invesmentPeriod!: string;
  otherValue?: string;

  static schema = {
    name: 'RiskProfileAnswer',
    embedded: true,
    properties: {
      investmentOwned: 'string[]',
      investmentKnowledge: 'string',
      investmentTarget: 'string',
      acceptableRisk: 'string',
      invesmentMajority: 'string',
      invesmentPeriod: 'string',
      otherValue: 'string',
    },
  };
}

class SQSDetail extends Realm.Object<ISQSDetail> {
  sqsId!: string;
  clientIdSelected!: string[];
  existingPolicy!: string[];
  otherPolicy?: string;
  hasActivePolicy?: boolean;
  lifeAssuredSelf!: string;
  additionalLifeAssuredSelf?: string;
  insuranceGoal!: string[];
  isDomicileAceh!: boolean;
  isDomicileSumatraUtara!: boolean;
  SelectedCitySumatraUtara?: string;
  vulnerablityCustomer!: string;
  policyType!: string;
  riskProfileResult?: string;
  riskProfileAnswer!: IRiskProfileAnswer;
  additionalValidationPolicyInformation?: string;
  productRecommendation?: string;
  product!: Dictionary;
  additionalBenefits?: CommonObjectData[];
  mainAdditionalBenefits?: ICommonObjectData[];
  topupAdditionalBenefits?: ICommonObjectData[];
  productCategory?: string;
  waitingPeriodType?: string;
  policyHolderIsPremiumPayor?: string;
  prospectivePremiumPayor?: string;
  otherSourceIncome?: string;
  premiumPayorIncomeData?: string;
  fund?: string;
  fundTopup?: string;
  waitingPeriod?: string;
  confirmationProductRecommendation?: string;
  clientPayment?: string;
  clientCurrency?: string;
  clientBudget?: string;
  calculator?: string;
  resultCalculator?: string;
  resultIlustration?: string;
  confirmationProductDoksul?: string;
  additionalInsuranceStatement?: string;
  calculatorTopup?: string;
  calculatorWithdrawl?: string;
  substandar?: string;
  additionalSubstandar?: string;
  convDiscountData!: string;
  convDataResult!: string;
  isGIO?: boolean;
  ilustrationDocs?: string;
  isChangePH?: boolean

  static schema = {
    name: 'SQSDetail',
    properties: {
      sqsId: 'string',
      clientIdSelected: 'string[]',
      existingPolicy: 'string[]',
      otherPolicy: 'string?',
      hasActivePolicy: 'bool?',
      lifeAssuredSelf: 'string',
      additionalLifeAssuredSelf: 'string?',
      insuranceGoal: 'string[]',
      isDomicileAceh: 'bool',
      isDomicileSumatraUtara: 'bool',
      SelectedCitySumatraUtara: 'string',
      vulnerablityCustomer: 'string',
      policyType: 'string',
      riskProfileResult: 'string?',
      riskProfileAnswer: 'RiskProfileAnswer',
      additionalValidationPolicyInformation: 'string?',
      productRecommendation: 'string?',
      product: 'mixed{}',
      additionalBenefits: 'CommonObjectData[]',
      mainAdditionalBenefits: 'CommonObjectData[]',
      topupAdditionalBenefits: 'CommonObjectData[]',
      productCategory: 'string?',
      waitingPeriodType: 'string?',
      policyHolderIsPremiumPayor: 'string?',
      prospectivePremiumPayor: 'string?',
      otherSourceIncome: 'string?',
      premiumPayorIncomeData: 'string?',
      waitingPeriod: 'string?',
      fund: 'string?',
      fundTopup: 'string?',
      confirmationProductRecommendation: 'string?',
      clientPayment: 'string?',
      clientCurrency: 'string?',
      clientBudget: 'string?',
      calculator: 'string?',
      resultCalculator: 'string?',
      resultIlustration: 'string?',
      confirmationProductDoksul: 'string?',
      additionalInsuranceStatement: 'string?',
      calculatorTopup: 'string?',
      calculatorWithdrawl: 'string?',
      substandar: 'string?',
      additionalSubstandar: 'string?',
      convDiscountData: 'string',
      convDataResult: 'string',
      isGIO: 'bool',
      ilustrationDocs: 'string?',
      isChangePH: 'bool?'
    },
    primaryKey: 'sqsId',
  };
}

class SPAJData extends Realm.Object<ISPAJData> {
  spajId!: string;
  confirmationSQS!: string;
  policyHolderData?: string;
  primaryInsured?: string;
  additionalInsured?: string;
  DataCompleteness!: SPAJDataCompleteness[];
  activePolicy?: string;
  additionalActivePolicy?: string;
  premiumPayor?: string;
  topup?: string;
  topupPremiumPyor?: string;
  beneficiary?: string;
  policyHolderDocs?: string;
  primaryInsuredDocs?: string;
  additionalInsuredDocs?: string;
  amandment?: string;
  policyHolderAccount!: string;
  sqsSignature?: string;
  premiumPayorDoc?: string;
  topupPayorDoc?: string;
  spajSignature?: string;
  spajPayment?: string;
  spajOcr?: string;
  spajLiveness?: string;
  additionalValidationSPAJOfferingProduct?: Dictionary;
  privyData?: string;
  flagForm?: string;
  upfrontDecisionResult?: Dictionary;
  rateUsd?: string;

  static schema = {
    name: 'SPAJData',
    properties: {
      spajId: 'string',
      confirmationSQS: 'string',
      policyHolderData: 'string?',
      primaryInsured: 'string?',
      additionalInsured: 'string?',
      DataCompleteness: 'SPAJDataCompleteness[]',
      activePolicy: 'string?',
      additionalActivePolicy: 'string?',
      premiumPayor: 'string?',
      topup: 'string?',
      topupPremiumPyor: 'string?',
      beneficiary: 'string?',
      policyHolderDocs: 'string?',
      primaryInsuredDocs: 'string?',
      additionalInsuredDocs: 'string?',
      amandment: 'string?',
      policyHolderAccount: 'string?',
      sqsSignature: 'string?',
      premiumPayorDoc: 'string?',
      topupPayorDoc: 'string?',
      spajSignature: 'string?',
      spajPayment: 'string?',
      spajOcr: 'string?',
      spajLiveness: 'string?',
      additionalValidationSPAJOfferingProduct: 'mixed{}',
      privyData: 'string?',
      flagForm: 'string?',
      upfrontDecisionResult: 'mixed{}',
      rateUsd: "string?",
    },
    primaryKey: 'spajId',
  };
}
class SPAJDataCompleteness extends Realm.Object<ISPAJDataCompleteness> {
  key!: string;
  categoryKey!: string;
  name!: string;
  status!: boolean;
  route!: string;
  params?: any;

  static schema = {
    name: 'SPAJDataCompleteness',
    embedded: true,
    properties: {
      key: 'string',
      categoryKey: 'string',
      name: 'string',
      status: 'bool',
      route: 'string',
      params: 'mixed?{}'
    },
  };
}

export interface IAdditionalForms {
  additionalFormId: string;
  lampungForm: string;
  policyBookPrintForm: string;
  waqfInsuranceBenefits: string;
  insuranceAttachmentLetter: string;
  marketersInteraction: string;
  formConversion?: string;
}

class AdditionalForms extends Realm.Object<IAdditionalForms> {
  additionalFormId!: string;
  lampungForm!: string;
  policyBookPrintForm!: string;
  waqfInsuranceBenefits!: string;
  insuranceAttachmentLetter!: string;
  marketersInteraction!: string;
  formConversion?: string;

  static schema = {
    name: 'AdditionalForms',
    properties: {
      additionalFormId: 'string',
      lampungForm: 'string',
      policyBookPrintForm: 'string',
      waqfInsuranceBenefits: 'string',
      insuranceAttachmentLetter: 'string',
      marketersInteraction: 'string',
      formConversion: 'string?',
    },
    primaryKey: 'additionalFormId',
  };
}

export interface IFundFactSheet {
  fundId: string;
  period: string;
  data: string;
  nameDoc: string;
}

class FundFactSheet extends Realm.Object<IFundFactSheet> {
  fundId!: string;
  period!: string;
  data!: string;
  nameDoc!: string;

  static schema = {
    name: 'FundFactSheet',
    properties: {
      fundId: 'string',
      period: 'string',
      data: 'string',
      nameDoc: 'string',
    },
    primaryKey: 'fundId',
  };
}

export interface IProspectDetailLead {
  // common leads params
  leadId: string;
  customerFlag: string;
  fullName: string;
  countryCode: string;
  phoneNumber: string;
  campaignId: string;
  birthDate?: string;
  email: string;
  clientNumber: string;
  // personal info leads params
  gender?: string;
  maritalStatus?: string;
  smokerIndicator?: boolean;
  education?: string;
  countryNationalId?: string;
  periodOfResidentCard?: string;
  religion?: string;
  citizenship?: string;
  residentCardTypes?: string;
  birthCountry?: string;
  birthCountryOther?: string;
  // address information
  residenceAddressArea?: string;
  address?: string;
  rt?: string;
  rw?: string;
  km?: string;
  zipCode?: string;
  district?: string;
  province?: string;
  city?: string;
  homePhoneNumber?: string;
  // job information
  occupation?: string;
  company?: string;
  income?: string;
  percentageTotalExpensesToIncome?: string;
  companyAddressInIndonesia?: string;
  companyAddress?: string;
  companyRt?: string;
  companyRw?: string;
  companyKm?: string;
  companyZipcode?: string;
  companyDistrict?: string;
  companyProvince?: string;
  companyCity?: string;
  workPhoneNumber?: string;
  // other information
  mailingAddress?: string;
  otherIncomePerMonth: string;
  otherAddress?: string;
  otherRegionAddress?: string;
  otherRt?: string;
  otherRw?: string;
  otherKm?: string;
  otherZipcode?: string;
  otherDistrict?: string;
  otherProvince?: string;
  otherCity?: string;
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
}

class ProspectDetailLeadIntegration extends Realm.Object<IProspectDetailLead> {
  // common leads params
  leadId!: string;
  customerFlag!: string;
  fullName!: string;
  countryCode!: string;
  phoneNumber!: string;
  campaignId!: string;
  birthDate?: string;
  email!: string;
  clientNumber!: string;
  // personal info leads params
  gender?: string;
  maritalStatus?: string;
  smokerIndicator?: boolean;
  education?: string;
  countryNationalId?: string;
  periodOfResidentCard?: string;
  religion?: string;
  citizenship?: string;
  residentCardTypes?: string;
  birthCountry?: string;
  birthCountryOther?: string;
  // address information
  residenceAddressArea?: string;
  address?: string;
  rt?: string;
  rw?: string;
  km?: string;
  zipCode?: string;
  district?: string;
  province?: string;
  city?: string;
  homePhoneNumber?: string;
  // job information
  occupation?: string;
  company?: string;
  income?: string;
  percentageTotalExpensesToIncome?: string;
  companyAddressInIndonesia?: string;
  companyAddress?: string;
  companyRt?: string;
  companyRw?: string;
  companyKm?: string;
  companyZipcode?: string;
  companyDistrict?: string;
  companyProvince?: string;
  companyCity?: string;
  workPhoneNumber?: string;
  // other information
  mailingAddress?: string;
  otherIncomePerMonth?: string;
  otherAddress?: string;
  otherRegionAddress?: string;
  otherRt?: string;
  otherRw?: string;
  otherKm?: string;
  otherZipcode?: string;
  otherDistrict?: string;
  otherProvince?: string;
  otherCity?: string;
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

  static schema = {
    name: 'ProspectDetailLeadIntegration',
    properties: {
      // common leads params
      leadId: 'string',
      customerFlag: 'string',
      fullName: 'string',
      countryCode: 'string',
      phoneNumber: 'string',
      campaignId: 'string',
      birthDate: 'string?',
      email: 'string',
      clientNumber: 'string',
      // personal info leads params
      gender: 'string?',
      maritalStatus: 'string?',
      smokerIndicator: 'bool?',
      education: 'string?',
      countryNationalId: 'string?',
      periodOfResidentCard: 'string?',
      religion: 'string?',
      citizenship: 'string?',
      residentCardTypes: 'string?',
      birthCountry: 'string?',
      birthCountryOther: 'string?',
      // address information
      residenceAddressArea: 'string?',
      address: 'string?',
      rt: 'string?',
      rw: 'string?',
      km: 'string?',
      zipCode: 'string?',
      district: 'string?',
      province: 'string?',
      city: 'string?',
      homePhoneNumber: 'string?',
      // job information
      occupation: 'string?',
      company: 'string?',
      income: 'string?',
      percentageTotalExpensesToIncome: 'string?',
      companyAddressInIndonesia: 'string?',
      companyAddress: 'string?',
      companyRt: 'string?',
      companyRw: 'string?',
      companyKm: 'string?',
      companyZipcode: 'string?',
      companyDistrict: 'string?',
      companyProvince: 'string?',
      companyCity: 'string?',
      workPhoneNumber: 'string?',
      // other information
      mailingAddress: 'string?',
      otherIncomePerMonth: 'string?',
      otherAddress: 'string?',
      otherRegionAddress: 'string?',
      otherRt: 'string?',
      otherRw: 'string?',
      otherKm: 'string?',
      otherZipcode: 'string?',
      otherDistrict: 'string?',
      otherProvince: 'string?',
      otherCity: 'string?',
      // customer campaign params
      campaignType: 'string?',
      dataAdditional1: 'string?',
      dataAdditional2: 'string?',
      dataAdditional3: 'string?',
      dataAdditional4: 'string?',
      dataAdditional5: 'string?',
      campaignSARDeath: 'string?',
      campaignSARAdd: 'string?',
      selectedPlan: 'string?',
      campaignCode: 'string?',
      id: 'string?',
      selectedRiderCode: 'string?',
      campaignClientNumber: 'string?',
      campaignPHNumber: 'string?',
      campaignTUNumber: 'string?',
    },
    primaryKey: 'leadId',
  };
}

export const {
  useRealm,
  useQuery,
  useObject,
  RealmProvider: EposRealmProvider,
} = createRealmContext({
  schemaVersion: 19,
  onMigration: (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < 19) {
      const sqsOld = oldRealm.objects('SQSDetail')
      const sqsNew = newRealm.objects('SQSDetail')
      for (let index = 0; index < sqsOld.length; index++) {
        sqsNew[index].hasActivePolicy = false;
        sqsNew[index].isChangePH = false;
        sqsNew[index].additionalLifeAssuredSelf = '';
        sqsNew[index].additionalSubstandard = '';
      }

      const summaryOld = oldRealm.objects('SummaryProposal')
      const summaryNew = newRealm.objects('SummaryProposal')
      for (let index = 0; index < summaryOld.length; index++) {
        summaryNew[index].doksulType = '';
        summaryNew[index].isDoksulCTA = false;
        summaryNew[index].convData = '';
        summaryNew[index].hasAdditionalLA = false;
      }

      const prospectOld = oldRealm.objects('ProspectDetailLeadIntegration')
      const prospectNew = newRealm.objects('ProspectDetailLeadIntegration')
      for (let index = 0; index < prospectOld.length; index++) {
        delete prospectNew[index].state;
        delete prospectNew[index].nationality;
        prospectNew[index].customerFlag = '';
        prospectNew[index].periodOfResidentCard = '';
        prospectNew[index].religion = '';
        prospectNew[index].citizenship = '';
        prospectNew[index].residentCardTypes = '';
        prospectNew[index].birthCountry = '';
        prospectNew[index].birthCountryOther = '';
        prospectNew[index].residenceAddressArea = '';
        prospectNew[index].rt = '';
        prospectNew[index].rw = '';
        prospectNew[index].km = '';
        prospectNew[index].district = '';
        prospectNew[index].province = '';
        prospectNew[index].homePhoneNumber = '';
        prospectNew[index].company = '';
        prospectNew[index].percentageTotalExpensesToIncome = '';
        prospectNew[index].companyAddressInIndonesia = '';
        prospectNew[index].companyAddress = '';
        prospectNew[index].companyRt = '';
        prospectNew[index].companyRw = '';
        prospectNew[index].companyKm = '';
        prospectNew[index].companyZipcode = '';
        prospectNew[index].companyDistrict = '';
        prospectNew[index].companyProvince = '';
        prospectNew[index].companyCity = '';
        prospectNew[index].workPhoneNumber = '';
        prospectNew[index].mailingAddress = '';
        prospectNew[index].otherIncomePerMonth = '';
        prospectNew[index].otherAddress = '';
        prospectNew[index].otherRegionAddress = '';
        prospectNew[index].otherRt = '';
        prospectNew[index].otherRw = '';
        prospectNew[index].otherKm = '';
        prospectNew[index].otherZipcode = '';
        prospectNew[index].otherDistrict = '';
        prospectNew[index].otherProvince = '';
        prospectNew[index].otherCity = '';
        prospectNew[index].rateUsd = '';
      }

      const spajOld = oldRealm.objects('SPAJData')
      const spajNew = newRealm.objects('SPAJData')
      spajOld.forEach((_, index) => {
        spajNew[index].additionalInsured = '';
        spajNew[index].additionalActivePolicy = '';
        spajNew[index].additionalInsuredDocs = '';
        spajNew[index].rateUsd = '';
      });
    } else if (oldRealm.schemaVersion === 17) {
      const oldCustomer = oldRealm.objects('CustomerStorage')
      const newCustomer = newRealm.objects('CustomerStorage')
      oldCustomer.forEach((_, index) => {
        newCustomer[index].clientJobDescription = '';
      });
    }
  },
  schema: [
    SQSDetail,
    SummaryProposal,
    SPAJData,
    SPAJDataCompleteness,
    AdditionalForms,
    AddressCustom,
    CustomerStorage,
    FundFactSheet,
    RiskProfileAnswer,
    CommonObjectData,
    ProspectDetailLeadIntegration,
  ],
  path: 'epos.realm',
  encryptionKey: new Int8Array(ENCRYPTION_KEY.split(',')),
});
