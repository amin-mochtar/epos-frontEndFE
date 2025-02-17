import { TCommonConstantData } from 'plai_common_frontend';
import { TOptionalCardData } from '../../../components';
import { defaultCommonValue } from '../spaj-amandement/spaj-amendment.type';
import { TPolicyType, ProductType } from '../../../utilities';

export type TFormDisclaimer = {
  surplusUnderwriting: TOptionalCardData;
  policyholderAccountInfo: TCommonConstantData;
  bankName: TCommonConstantData;
  accountHolder: string;
  city: string;
  branch: string;
  accountNumber: string;
  additionalValidationSPAJModal: TOptionalCardData;
  additionalValidationSPAJOfferingProduct: any;
};

export const defaultFormDisclaimer = {
  surplusUnderwriting: { label: '', key: '', detail: '' },
  policyholderAccountInfo: defaultCommonValue,
  bankName: defaultCommonValue,
  accountHolder: '',
  city: '',
  branch: '',
  accountNumber: '',
  additionalValidationSPAJModal: defaultCommonValue,
  additionalValidationSPAJOfferingProduct: null,
};

export type PCPPParams = {
  policyType: TPolicyType;
  productType: ProductType;
  productCode: string;
  productName: string;
  spaj: string;
  spajT: string;
  companyName: string;
  rider: Record<string, string>;
};

export type SKKPKPParams = {
  productType: ProductType;
  policyType: TPolicyType;
  productCode: string;
  productName: string;
  spaj: string;
};

export type TDisclaimerDescItem = {
  id?: string;
  key?: string;
  subid?: string;
  subkey?: string;
  termid?: string;
  termkey?: string;
}

export type TDisclaimerItem = {
  label: string;
  key: string;
  desc: TDisclaimerDescItem[];
  information: string;
  additionalValidation?: boolean;
  adiitionalQuestion?: boolean;
};
export type TShowAccountPH = {
  sectionAccount?: boolean;
  detailAccount?: boolean;
};

export type TShow = { isShow: boolean };