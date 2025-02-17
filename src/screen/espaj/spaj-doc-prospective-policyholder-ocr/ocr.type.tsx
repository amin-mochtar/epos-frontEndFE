import { ISPAJData } from '../../../utilities';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { TLivenessData } from '../spaj-doc-prospective-policyholder-liveness/spaj-doc-prospective-policyholder-liveness.type';
import { TFormOCRCompare } from '../spaj-doc-prospective-policyholder-ocr-compare/spaj-doc-prospective-policyholder-ocr-compare.type';

type TOnpressCustom = {
  documentType: {
    key: string;
  };
  routeParams: any;
  ocrData: any;
  livenessData: any;
  navigation: any;
  insuranceType: 'isPrimaryInsurance' | 'isPayor' | 'isPolis' | 'isAdditionalInsurance';
  onSave?: () => void;
};

type TOnPressCustomRedirected = {
  documentTypeKey: string;
  ocrData: any;
  navigation: any;
  insuranceType: 'isPrimaryInsurance' | 'isPayor' | 'isPolis' | 'isAdditionalInsurance';
  onSave?: () => void;
};

type TOnChangeControllerDocument = {
  formVal: string;
  formChange: any;
  routes: RouteProp<{ params: { livenessVerif?: boolean; isOcrManual: boolean } }>;
  onUpdateSPAJ: (data: ISPAJData) => Promise<void>;
  RSPAJData: (ISPAJData & Realm.Object<ISPAJData>) | null;
  spajLiveness: any;
  spajOcr: any;
  insuranceType: 'polis' | 'primaryInsurance' | 'payor' | 'additionalInsurance';
};

type TLabelControl = {
  documentType: { key: string };
  ocrData: TOcrData;
  livenessData: TLivenessData;
  checkingAccountData: { imgBase64: string; isFinish?: boolean; isManualDocument?: boolean };
};

type TValueControl = {
  documentType: { key: string };
  ocrData: TOcrData;
  livenessData: TLivenessData;
  value: string;
  checkingAccountData?: { imgBase64: string; isFinish?: boolean; isManualDocument?: boolean };
};

type TOcrData = {
  imgBase64: string;
  ocrResult: any;
  isFinish?: boolean;
  isManualDocument?: boolean;
  compareResult?: TFormOCRCompare;
};

type IRSPAJUserDataType = 'primaryInsured' | 'premiumPayor' | 'policyHolderData' | 'additionalInsured';
type IOCRUserDataType = 'primaryInsurance' | 'payor' | 'polis' | 'additionalInsurance';
type TFNProcessPrivyOCRKTP = Promise<{
  ocrStatus: string;
  navigationData: {
    route: string;
    params: Record<string, boolean>;
  };
  privyData: {
    data: any;
    status: number | undefined;
  };
}>;

export type {
  TOnpressCustom,
  TOnPressCustomRedirected,
  TOnChangeControllerDocument,
  TValueControl,
  TOcrData,
  TLabelControl,
  IRSPAJUserDataType,
  IOCRUserDataType,
  TFNProcessPrivyOCRKTP,
};
