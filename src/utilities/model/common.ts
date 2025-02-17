export type TObjectKeyString = Record<string, string>
export interface TObjectKeyValue<T, K>{
  key: T;
  value: never | any
}