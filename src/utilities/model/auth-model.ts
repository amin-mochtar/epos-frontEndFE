// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Agent {
  export type Profile = {
    aajiLicenceType: string;
    aasiLicenceType: string;
    address: Address;
    adsName: string;
    agentCode: string;
    agentLeader: AgentLeader;
    agentType: AgentType;
    appointedDate: Date;
    channel: string;
    contract: Contract[];
    convContractDate: Date;
    designation: AgentType;
    displayName: DisplayName;
    dob: Date;
    email: string;
    idNumber: string;
    isActive: boolean;
    joinDate: Date;
    kpmList?: [];
    leaderConvContractDate: string;
    leaderShariaContractDate: string;
    license: License[];
    maritalStatus: string;
    office: string;
    officeCode: string;
    passedCourse: string[];
    phone: Phone;
    raddName: string;
    region: string;
    role: string;
    shariaContractDate: Date;
    uplineAgent: UplineAgent;
  };

  export interface Address {
    enUs: AddressItem;
    zhHk: AddressItem;
  }

  export interface AddressItem {
    address: string;
  }

  export interface AgentLeader {
    contract: Contract[];
  }

  export interface AgentType {
    code: string;
    name: string;
  }

  export interface Contract {
    contractDate: Date;
    contractType: string;
  }

  export interface DisplayName {
    enUs: string;
    zhHk: string;
  }

  export interface License {
    cpdCode: string;
    licenseExpiredDate: Date;
    licenseNumber: string;
    licenseType: string;
  }

  export interface Phone {
    direct: string;
    general: string;
    mobile: string;
  }

  export interface UplineAgent {
    code: string;
    name: {
      enUs: {
        displayName: string;
        firstName: string;
        nickName: string;
        otherName: string;
        surname: string;
      };
      kmKm: {
        firstName: string;
        surname: string;
      };
      thTh: {
        firstName: string;
        surname: string;
      };
      zhHk: {
        firstName: string;
        surname: string;
      };
    };
  }
}
