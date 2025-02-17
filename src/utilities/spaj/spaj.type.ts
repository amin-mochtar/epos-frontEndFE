import { TCommonConstantData } from "plai_common_frontend";

export const defaultPhoneCode = {
  name: 'Indonesia',
  dial_code: '+62',
  emoji: '🇮🇩',
  code: 'ID',
};

export const defaultCode = {
  name: '',
  dial_code: '',
  emoji: '',
  code: '',
};

export type TPhoneCode = {
  [key: string]: string;
};

export type TConditionMapping = {
  condition: any;
  fields: string[];
  result?: { [key: string]: string }[] | string | TPhoneCode | TCommonConstantData;
};

export type TZipCode = {
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  province: string;
  province_cd: string;
  zipcode: string;
};