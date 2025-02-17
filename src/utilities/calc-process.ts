export type TParamME = {
  AMOUNTSAR_DB_CLIENT: number;
  AMOUNTSAR_ADDAD_CLIENT: number;
  adminFee: string;
  age: number;
  alternatifRencanaPembayaran: number;
  campaignType: string;
  channelCode: string;
  clazz: string;
  currCd: string;
  custAgeDay: number;
  custIncome: string;
  custSA: number;
  custSaver: number;
  customerList: TCustomerList[];
  flagFreeAdmin: string;
  flagSaIncrease: string;
  fundList: TFundList[];
  gender: string;
  isPPH: boolean;
  mainCoverage: string;
  manfaat: TManfaat;
  manfaatList: TManfaatList[];
  manfaatListFromNonSales: any[];
  paymentFrequency: string;
  process: string;
  prodCd: string;
  productCdCat: string;
  rencanaPembayaran: string;
  smokerStatus: string;
  topupList: any[];
  withdrawalList: any[];
  custAgeMonth?: number;
  year?: number;
  flagRepricing?: boolean;
  OF_ANNUALPREMIUMPAS?: number;
  premiumPaymentTerm?: number | string;
};

type TCustomerList = {
  smokeStatus: string;
  anb: number;
  customerId: string;
  sex: string;
};

type TFundList = {
  code: string;
  itemInput: TItemInput[];
  type: string;
};

type TItemInput = {
  key: string;
  inputValue: number;
  inputValueTopup: number;
};

type TManfaat = {
  premi: number;
  totalPremi: number;
  rencanaPembayaran: string;
  alternatifRencanaPembayaran: number;
  halamanRingkasanTahun1?: number;
  halamanRingkasanTahun2?: number;
  halamanRingkasanTahun3?: number;
};

type TManfaatList = {
  code: string;
  seq: string;
  name: string;
  disabled: boolean;
  coverageType: string;
  type: string;
  lifeAssureCd: string;
  custList: TCustList[];
  planAlreadyProcessed?: boolean;
};

type TCustList = {
  customerId: string;
  name: string;
  anb: number;
  key: number;
  loadList: any[];
  itemInput: TItemInput2[];
};

type TItemInput2 = {
  code: string;
  type: string;
  inputValue: string;
  key: string;
  annualPremi?: number;
  coi?: number;
  value?: string;
  description?: string;
  inputValueForRate?: string;
  inputAdvance?: string;
  inputAdvanceFull?: string;
  pdplan1?: string;
};
