
type DefaultAttribute = {
  key: string
  value: string
}

export type TSignature = {
  esign: EsignDefault
  digital?: DigitalSignatureDefault
}

type EsignDefault = {
  location: string
  date: string
  role: string
  base64: string
  imageName?: string
}

type DigitalSignatureDefault = {
  role?: string
  provider?: ProviderDigitalSignature
}

type ProviderDigitalSignature = {
  id: string
}
export type TForm = {
  type: 'DROPHS' | 'LAMPUNG' | 'WAKAFHIDUP' | 'WAKAF' | 'AMEND' | 'CETAKPOLIS' | 'SKA' | 'AGENT' | string
  docId: string
  attributes?: DefaultAttribute[]
  signature?: TSignature[]
}

type Name = {
  full: string;
};

type Address = {
  type: string;
  line1: string;
  line2: string;
  line3: string;
  rt: string;
  rw: string;
  km: string;
  kelurahan: string;
  kecamatan: string;
  city: string;
  province: string;
  descProvince: string;
  postalCode: string;
  country: string;
};

type Phone = {
  type: string;
  number: string;
  countryCode: string;
};

type Contact = {
  phone: Phone[];
  fax: string;
};

type Identification = {
  type: string;
  number: string;
  expiryDate: string;
};

type TaxPayer = {
  type: string;
  number: string;
  reason: string;
  name: string;
};

type Occupation = {
  code: string;
  desc: string;
  companyName: string;
  address?: Address;
};

type Income = {
  frequency: string;
  amount: number;
  amountCode: string;
  amountDesc: string;
  source: { desc: string; code: string }[];
};

export type Client = {
  name: Name;
  placeOfBirth: string;
  dateOfBirth: string;
  countryOfBirth: string;
  descCountryOfBirth: string;
  identification: Identification[];
  nationality: string;
  descNationality: string
  gender: 'M' | 'F';
  maritalStatus?: string;
  religion?: string;
  education?: string;
  taxpayer?: TaxPayer;
  occupation?: Occupation;
  motherName?: string;
  address?: Address[];
  contact?: Contact;
  email?: string;
  income?: Income[];
  staffRelation?: string;
  networthRangeDesc?: string;
  declaration?: {
    hasSensoryDisabilityDesc: string;
    canSpeakBahasaDesc: string;
    vulnerable1Desc: string;
  };
  type: string;
  role: 'PH' | 'LA' | 'BE' | 'PY';
  relation: string;
  benefitAllocation: number;
};