import { TOptionalCardData } from "../../../components";

export type SubstandardData = {
  substandard: {
    type: TOptionalCardData | string;
    code: TOptionalCardData | string;
  }[];
  information: string;
  noSpaj: any;
}

export type FormValues = {
  substandards: SubstandardData[]
};

type TRefData = {
  loadCd: string;
  loadClass: string | null;
};

type TSubValue = {
  output: string;
  ref: TRefData;
  code: string;
  divider: string;
  level: string;
  linkTerm: string;
  value: string;
  linkedRider: string | null;
  $$hashKey: string;
};

export type TSubstandardData = {
  code: string;
  level: string;
  linkTerm: string;
  value: TSubValue[];
  linkedRider: string | null;
  $$hashKey: string;
};