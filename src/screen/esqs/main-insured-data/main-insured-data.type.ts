import { DEFAULT_OPTIONAL_DATA, ICustomerStorage, TCommonOptionalData } from '../../../utilities';

export const defaultTFormDataClientTU = {
  clientType: DEFAULT_OPTIONAL_DATA,
  clientName: '',
  clientDateBirth: '',
  clientPhone: '',
  clientGender: DEFAULT_OPTIONAL_DATA,
  clientSmokeStatus: DEFAULT_OPTIONAL_DATA,
  clientJob: '',
  clientJobDescription: ''
};

export type TFormDataClientTU = {
  clientType: TCommonOptionalData;
  clientName: string;
  clientDateBirth: string;
  clientPhone: string;
  clientGender: TCommonOptionalData;
  clientSmokeStatus: TCommonOptionalData;
  clientJob: any;
  clientJobDescription: any;
};

export type TMainInsured = TFormDataClientTU & {
  registeredCustomer: ICustomerStorage;
}