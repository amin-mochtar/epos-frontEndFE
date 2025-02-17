import { TCommonOptionalData } from "../../../utilities";

export const defaultCommonValue = { label: '', key: '' };

export type TFormOCRCompare = {
  clientName: string;
  clientGender: TCommonOptionalData;
  clientDateBirth: any;
  clientCityBirth: string;
  clientCivics: TCommonOptionalData;
  clientMaritalStatus: TCommonOptionalData;
  clientReligion: TCommonOptionalData;
  clientIdCardNumber: string;
  lifetimeValidityPeriod: TCommonOptionalData;
  clientMassApplies: TCommonOptionalData;
  residanceAddress: string;
  neighbourdhood1: string;
  neighbourdhood2: string;
  district: string;
  urbanVillage: string;
  province: string;
  cityRegency: string;
  clientMassValidUntil: string;
};

export const defaultFormOCRCompare = {
  clientName: '',
  clientGender: defaultCommonValue,
  clientDateBirth: '',
  clientCityBirth: '',
  clientCivics: defaultCommonValue,
  clientMaritalStatus: defaultCommonValue,
  clientReligion: defaultCommonValue,
  clientIdCardNumber: '',
  lifetimeValidityPeriod: '',
  clientMassApplies: defaultCommonValue,
  residanceAddress: '',
  neighbourdhood1: '',
  neighbourdhood2: '',
  district: '',
  urbanVillage: '',
  province: '',
  cityRegency: '',
  clientMassValidUntil: ''
};
