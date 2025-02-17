import { TOptionalCardData } from '../../../components';
import { TBenefitsValue, TBenefitsType } from '../../../utilities';

type TCommonOptionalData = { label?: string; key?: string;[key: string]: any };
const defaultOptionalData = {
  label: '',
  key: '',
};

export type TCalculateForm = {
  frequencyPayment: TCommonOptionalData;
  annualPremium: string;
  regularPremium: string;
  regularTopupPremium: string;
  feeAdministration: TCommonOptionalData;
  age1: string;
  age2: string;
  age3: string;
  backdate: TCommonOptionalData;
  backdateValue: string;
  sumInsured: string;
  periodInsured: TCommonOptionalData;
  approvalSubstandard: TOptionalCardData;
  bank: TOptionalCardData;
  branchBank: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankCurrency: TOptionalCardData;
  benefits: TBenefitsValue[];
  mainBenefits: TBenefitsValue[];
  topupBenefits: TBenefitsValue[];
  paymentPeriod: TOptionalCardData;
  educationBenefitPeriod: TOptionalCardData;
  contributionPaymentPeriod: TOptionalCardData;
};

export const defaultBenefitsValue: TBenefitsValue = {
  benefitsCode: '',
  planRider: defaultOptionalData,
  roomRider: defaultOptionalData,
  saverRider: defaultOptionalData,
  periodRider: defaultOptionalData,
  premiRider: '',
  sumInsured: '',
  periodInsured: {
    key: '99',
    label: '99',
  },
  regularTopupPremium: '',
};

export const defaultTCalculateForm: TCalculateForm = {
  frequencyPayment: defaultOptionalData,
  annualPremium: '',
  regularPremium: '',
  regularTopupPremium: '',
  feeAdministration: {
    key: 'Y',
    label: 'Ya',
  },
  age1: '65',
  age2: '75',
  age3: '85',
  backdate: defaultOptionalData,
  backdateValue: '',
  sumInsured: '',
  periodInsured: {
    key: '99',
    label: '99',
  },
  approvalSubstandard: defaultOptionalData,
  bank: defaultOptionalData,
  branchBank: '',
  bankAccountNumber: '',
  bankAccountName: '',
  bankCurrency: defaultOptionalData,
  benefits: [],
  mainBenefits: [],
  topupBenefits: [],
  paymentPeriod: defaultOptionalData,
  educationBenefitPeriod: defaultOptionalData,
  contributionPaymentPeriod: defaultOptionalData,
};

export interface MEParam {
  currCd: string;
  channelCode: string;
  adminFee: string;
  prodCd: string;
  age: number;
  custAgeDay: number;
  custAgeMonth: number;
  gender: string;
  smokerStatus: string;
  clazz: string;
  customerList: CustomerList[];
  manfaat: Manfaat;
  campaignType?: string;
  AMOUNTSAR_DB_CLIENT: number;
  AMOUNTSAR_ADDAD_CLIENT: number;
  manfaatListFromNonSales?: any[];
  manfaatList: ManfaatList[];
  paymentFrequency: string;
  flagFreeAdmin: string;
  flagSaIncrease: string;
  topupList: any[];
  withdrawalList: any[];
  mainCoverage: string;
  custSA: number;
  custSaver: number;
  productCdCat: string;
  year: number;
  ageEntry: number;
  process: string;
  manfaatListObsolete: any[];
  issuedDate: string;
  ManfaatListCVCalc: ManfaatListCvcalc[];
  ManfaatListCovCalc: ManfaatListCovCalc[];
  PREMIUMINCREASEBEFOREROUNDINGCLIENT: number;
  PREMIUMINCREASEBEFOREROUNDINGALT: number;
  TOTALPREMIUMWITHACCPREMIUMLBDBALT: number;
  TOTALPREMIUMWITHACCPREMIUMLBDBCLIENT: number;
  LoopForFifo: number;
  OF_CUSTAGEPOLICY: number;
  ALLOCATEDSAVERALT: number;
  ALLOCATEDSAVERCLIENT: number;
  MAIN_PDSA: string;
  TOTALSAWITHACCSACLIENT: number;
  TOTALSAWITHACCSAALT: number;
  TOTALPREMIUMWITHACCPREMIUM: number;
  DIFFLVPREMI: number;
  fundList: FundList[];
  rencanaPembayaran: string;
  alternatifRencanaPembayaran: number;
}

export interface CustomerList {
  address1?: string;
  Dob: string;
  mobile: string;
  customerId: string;
  isExisting: boolean;
  name: string;
  MaritalStatus: string;
  pekerjaanCode: string;
  codeTelp: string;
  age: number;
  anb: number;
  custAge: number;
  custAgeDay: number;
  custAgeMonth: number;
  sex: string;
  smokeStatus: string;
  clazz: string;
  Departement: string;
  Position: string;
  Business: string;
  id: string;
  isLeads: boolean;
  workAddress: string;
  email: string;
  religion?: Religion;
  totalMonthlyIncome: TotalMonthlyIncome;
  totalMonthlySpending: TotalMonthlySpending;
}

export interface Religion {
  religion: string;
  desc_religion: string;
}

export interface TotalMonthlyIncome {
  label: string;
  key: string;
}

export interface TotalMonthlySpending {
  label: string;
  key: string;
}

export interface Manfaat {
  premiUnapplied: number;
  minimumUangPertanggungan: number;
  maksimumUangPertanggungan: number;
  premi: string;
  totalPremi: number;
  rencanaPembayaran: string;
  alternatifRencanaPembayaran: number;
  halamanRingkasanTahun1: number;
  halamanRingkasanTahun2: number;
  halamanRingkasanTahun3: number;
}

export interface ManfaatList {
  code: string;
  seq: string;
  name: string;
  disabled: boolean;
  coverageType: string;
  type: string;
  lifeAssureCd: string;
  custList: CustList[];
  approvalTypeConversion: string;
  showCode: string;
  cumulativeCalculateUsingNewRate?: boolean;
  cumulativeRemainingSA?: string;
}

export interface CustList {
  customerId: string;
  name: string;
  anb: number;
  key: number;
  loadList: LoadList[];
  itemInput: ItemInput[];
  coi: any;
  annualPremi: string;
  code: string;
  biayaBulanan: number;
}

export interface LoadList {
  code: string;
  selectedCode: string;
  selectedValue: string;
  divider: string;
}

export interface ItemInput {
  code: string;
  description: string;
  type: string;
  value: string;
  inputValue: string;
  key: string;
  coi?: number;
  annualPremi?: number;
  hsplan: string;
  tmpTerm?: number;
}

export interface ManfaatListCvcalc {
  showCode: string;
  code: string;
  name: string;
  disabled: boolean;
  coverageType: string;
  type: string;
  lifeAssureCd: string;
  tertanggungName: string;
  tertanggungAge: number;
  tertanggungKey: number;
  tertanggungCustomerId: string;
  itemInput: ItemInput2[];
  loadMap: LoadMap;
  approvalTypeConversion: string;
  age: number;
  isPPH: string;
  cumulativeCalculateUsingNewRate?: boolean;
  cumulativeRemainingSA?: string;
}

export interface ItemInput2 {
  code: string;
  description: string;
  type: string;
  value: string;
  inputValue: string;
  key: string;
  coi?: number;
  annualPremi?: number;
  hsplan: string;
  tmpTerm?: number;
}

export interface LoadMap {
  N1: number;
}

export interface ManfaatListCovCalc {
  showCode: string;
  code: string;
  name: string;
  disabled: boolean;
  coverageType: string;
  type: string;
  lifeAssureCd: string;
  tertanggungName: string;
  tertanggungAge: number;
  tertanggungKey: number;
  tertanggungCustomerId: string;
  itemInput: ItemInput3[];
  loadMap: LoadMap2;
  approvalTypeConversion: string;
  age: number;
  isPPH: string;
  cumulativeCalculateUsingNewRate?: boolean;
  cumulativeRemainingSA?: string;
}

export interface ItemInput3 {
  code: string;
  description: string;
  type: string;
  value: string;
  inputValue: string;
  key: string;
  coi?: number;
  annualPremi?: number;
  hsplan: string;
  tmpTerm?: number;
}

export interface LoadMap2 {
  N1: number;
}

export interface FundList {
  code: string;
  name: string;
  checked: boolean;
  taken: boolean;
  flagSearch: boolean;
  itemInput: ItemInput4[];
  type: string;
}

export interface ItemInput4 {
  code: string;
  description: string;
  type: string;
  value: string;
  key: string;
  inputValue: number;
  inputValueTopup: number;
}

export type TAlertBar = {
  key: string;
  message: string;
  type: 'BLOCKED' | 'WARNING';
  ruleType: string;
  value?: string | number;
  code?: string
};


export type TCoverageRule = {
  [key: string]: string[];
};

export type TCoverageRuleMessage = {
  [key: string]: {
    errorMessageEng: string[];
    errorMessageId: string[];
  };
};

export type TMasterData = {
  benefits: TBenefitsType[];
  minBackDate: string;
  paymentFrequency: TOptionalCardData[];
  coverageRule: TCoverageRule;
};

export type RuleTypes = 'periodMain' | 'planRider' | 'premiTopup';

export type TCheckPremiParams = {
  lifeAssured: string,
  productKey: string,
  clientBudget: number,
  income: {
    client: number,
    payer: number
  },
  isPolicyHolderIsPremiumPayorSelf: boolean,
}