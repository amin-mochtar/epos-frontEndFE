import { TObjectKeyValue } from "./common";
import { ISPAJData, ISPAJDataCompleteness } from "./realm-model";

//#region SPAJ REALM

export type TSPAJDataCompletenessKey = keyof ISPAJDataCompleteness;
export type TSPAJKey = keyof ISPAJData;
export type TObjectSPAJbyKey = TObjectKeyValue<TSPAJKey, ISPAJData>
export type TObjectSPAJDataCompleteness = TObjectKeyValue<TSPAJDataCompletenessKey, ISPAJDataCompleteness>
//#endregion