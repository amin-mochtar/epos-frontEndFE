import { TOptionalCardData } from "../../components";
import { TCommonOptionalData } from "../epos.type";
import { ICustomerStorage, ISQSDetail, ISummaryProposal } from "./realm-model";
import { TObjectKeyValue } from "./common";

  export type TPOJK = {
    indonesianLanguageCapability: TOptionalCardData;
    lastEducationalStatus: TOptionalCardData;
    disabilityCategoryStatus: TOptionalCardData;
    validateDisabilityCategoryStatus: TOptionalCardData;
    selectedCitySumatraUtara: TOptionalCardData;
  }
  export type TVulnerable = {
    vulnerableCustomerPrimary: TOptionalCardData[];
    vulnerableCustomerSub: {
      pergerakan: TCommonOptionalData[];
      intelect: TCommonOptionalData[];
      mental: TCommonOptionalData[];
      none: TCommonOptionalData[];
    };
    vulnerableCustomerAdditional: TCommonOptionalData;
  }
  export type TClientJob = {
    code: string,
    descriptionEng: string,
    descriptionInd: string,
    gender: string,
    minAge: string,
    nameEng: string,
    nameInd: string,
    clazz: string,
  }

  export type TClientPhoneCode = {
    name: string;
    dial_code: string;
    emoji: string;
    code: string;
  }
  export type TClientData = Omit<ICustomerStorage, 'clientAnb' | 'clientId'>
  export type TRegisteredCustomer = ICustomerStorage & {
    registeredCustomer?: ICustomerStorage
  }

//#region REALM SQS
export type TSQSKey = keyof ISQSDetail;
export type TSummaryProposalKey = keyof ISummaryProposal;
export type TCustomerStorageKey = keyof ICustomerStorage;

export type TObjectSQSByKey = TObjectKeyValue<TSQSKey, ISQSDetail>;
export type TObjectSummaryByKey = TObjectKeyValue<TSummaryProposalKey, ISummaryProposal>;
export type TObjectCustomerByKey = TObjectKeyValue<TCustomerStorageKey, ICustomerStorage>;
//#endregion

export type TProfileRiskResult = 'moderate' | 'aggressive' | 'conservative'