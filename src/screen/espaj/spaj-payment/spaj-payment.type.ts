export type TCart = {
  type: string;
  amount: number;
}

export type TParamGenerateLink = {
  cart: TCart[];
  cust_no: string;
  currency: string;
  apps_code: string;
  source_app: string;
  owner_name: string;
  life_assured_name: string;
  premium_amount: number;
  void_flag: boolean;
  pay_option: string;
  email: string;
  phone: string;
  is_sharia: boolean;
}

export type TPaymentStatus = {
  resp_code: number,
  resp_desc: string
}

export type TPaymentLink = {
  resp_code: number | null;
  resp_desc: string;
  url_paylink: string;
  ref_no: string
}

export const defaultCart = {
  type: '',
  amount: 0
} as TCart

export const defaultParam = {
  cart: [defaultCart],
  cust_no: '',
  currency: 'IDR',
  apps_code: 'PFN',
  source_app: 'PRUforce NB',
  owner_name: '',
  life_assured_name: '',
  premium_amount: 0,
  void_flag: false,
  pay_option: '',
  email: '',
  phone: '',
  is_sharia: false
} as TParamGenerateLink

export const defaultTOptionCard = {
  key: '',
  label: ''
}
