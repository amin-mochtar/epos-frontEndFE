import { ICustomerStorage, ISQSDetail } from "../../../../../utilities";


type CustomerDataType = {
  name: string;
  age: number;
  gender: string;
  smokingStatus: boolean;
  job: string;
  goal: Array<string>;
};

export type DescCustomerCardType = {
  data?: ISQSDetail;
  lifeAssuredData?: ICustomerStorage
  mainInsuredData?: ICustomerStorage
  onPress: () => void;
};
