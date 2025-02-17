export function setStateDisableByKey(keyEnabled: string, itemKey: string){
  if(keyEnabled === itemKey){
    return false
  }
  return true
}