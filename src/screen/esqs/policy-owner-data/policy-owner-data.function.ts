import {
  MARRIAGE_STATUS_MAP,
  OCCUPATION_FULL_DATA,
  SALARY_RANGE_DATA,
  TCommonConstantData,
  REGION_PHONE_CODE,
} from 'plai_common_frontend';
import { ProspectDetailLeads, SQSDetail } from '../../../redux';
import {
  getProduct,
  ISQSDetail,
  TClientData,
  TLifeAssuredSelf,
  TPolicyType,
  paymentFreqList,
  calculateAge
} from '../../../utilities';
import moment from 'moment';

type TAssuredSelfParams = {
  selectedSQSId?: string;
  sqsLifeAssuredSelf?: TLifeAssuredSelf;
  realmSqsLifeAssuredSelf?: TLifeAssuredSelf;
  isDoksul: boolean;
};

type TPolicyTypeParams = {
  selectedSQSId?: string;
  sqsPolicyType?: TPolicyType;
  realmSqsPolicyType?: TPolicyType;
};

export const findIsSelfAssured = ({
  selectedSQSId,
  realmSqsLifeAssuredSelf,
  sqsLifeAssuredSelf,
  isDoksul
}: TAssuredSelfParams) => {
  if (isDoksul) {
    return sqsLifeAssuredSelf == 'self';
  } else if (selectedSQSId) {
    return realmSqsLifeAssuredSelf === 'self'
  } else {
    return sqsLifeAssuredSelf == 'self';
  }
};

export const findPolicyType = ({ selectedSQSId, realmSqsPolicyType, sqsPolicyType }: TPolicyTypeParams) => {
  if (selectedSQSId) {
    return realmSqsPolicyType;
  } else {
    return sqsPolicyType;
  }
};

export function getDefaultValuesFromRedux(clientData: TClientData, prospectData: ProspectDetailLeads) {
  clientData.clientName = clientData.clientName || prospectData?.fullName;
  clientData.clientDateBirth = clientData.clientDateBirth || prospectData?.birthDate?.slice(0, 10) || '';
  clientData.clientPhone = clientData.clientPhone || prospectData?.phoneNumber;
  if (clientData.clientGender.key == '' && prospectData?.gender) {
    clientData.clientGender = prospectData?.gender == 'M' ? { label: 'Pria', key: 'M' } : { label: 'Wanita', key: 'F' };
  }
  if (clientData.clientMarriageStatus.key == '' && prospectData?.maritalStatus) {
    clientData.clientMarriageStatus = MARRIAGE_STATUS_MAP[prospectData?.maritalStatus || 'single'];
  }
  if (clientData.clientSmokeStatus.key == '' && prospectData?.smokerIndicator !== undefined) {
    clientData.clientSmokeStatus = prospectData?.smokerIndicator
      ? { label: 'Perokok', key: 'S' }
      : { label: 'Bukan Perokok', key: 'NS' };
  }
  const occupation = OCCUPATION_FULL_DATA.find((item) => item.code == prospectData?.occupation);
  if (occupation) {
    clientData.clientJob = occupation;
  }
  const income = SALARY_RANGE_DATA.find((item) => item.key == prospectData?.income) as TCommonConstantData;
  if (income) {
    clientData.clientIncome = income;
  }
  return clientData;
}

export const registeredDataTransformer = (data: any) => {
  const mappings: any = {
    maritalStatus: {
      Married: { label: 'Menikah', key: 'M' },
      Single: { label: 'Belum Menikah', key: 'S' },
      Widowed: { label: 'Duda/Janda', key: 'W' },
    },
    gender: {
      Male: { label: 'Pria', key: 'M' },
      Female: { label: 'Wanita', key: 'F' },
    },
    smokeStatus: {
      true: { label: 'Perokok', key: 'S' },
      false: { label: 'Bukan Perokok', key: 'NS' },
    },
  };

  const defaultPhoneCode = {
    code: 'ID',
    dial_code: '+62',
    emoji: '🇮🇩',
    name: 'Indonesia',
  };

  const foundPhoneCode = REGION_PHONE_CODE.find((el) => el.dial_code.includes(data?.contact?.Mobile?.countryCode));
  const mappingPhoneCode = foundPhoneCode ? foundPhoneCode : defaultPhoneCode;
  const nationalityCondition = data?.nationality! ? data?.nationality! : 'Indonesia';
  const emailyCondition = data?.contact?.email! ? data?.contact?.email! : '';
  const { line1, line2, line3 } = data?.residentialAddress;
  const addressConstruct = data?.residentialAddress ? { line1, line2, line3 } : {};

  // semua data kosong ini untuk reset datanya.
  return {
    clientType: { label: 'Nasabah Lama', key: 'O' },
    clientCode: data.clientCode,
    clientName: data.clientName,
    clientDateBirth: data.dob,
    clientGender: mappings.gender[data.sex],
    clientMarriageStatus: mappings.maritalStatus[data.maritalStatus],
    clientSmokeStatus: mappings.smokeStatus[data.isSmoker],
    clientPhone: data?.contact?.Mobile?.value,
    clientPhoneCode: mappingPhoneCode,
    clientNationality: nationalityCondition,
    clientEmail: emailyCondition,
    clientAddress: addressConstruct,
    // datanya memang harus kosong
    clientExpenses: { key: '', label: '' },
    clientIncome: { key: '', label: '' },
    clientJob: {
      code: '',
      descriptionEng: '',
      descriptionInd: '',
      gender: '',
      minAge: '',
      nameEng: '',
      nameInd: '',
      clazz: '',
    },
    clientPayment: { key: '', label: '' },
    clientCurrency: { key: '', label: '' },
    clientDependents: '',
    clientBudget: '',
  };
};

export function generateClientId(
  oldCustomer: boolean,
  registeredState: boolean,
  clientIdState: string | undefined,
  clientIdSelected: string,
) {
  // logic untuk Nasabah Terdaftar
  const clientIdDraft = `C${new Date().getTime()}`;
  const clientIdSelectedValidation = !oldCustomer && !registeredState ? clientIdDraft : clientIdSelected;
  const clientIdSelectedFiltered = oldCustomer && !registeredState ? clientIdDraft : clientIdSelectedValidation;
  const clientIdCustomer = oldCustomer && clientIdState && registeredState ? clientIdState : clientIdSelectedFiltered;
  return {
    clientId: !oldCustomer || !clientIdCustomer ? clientIdDraft : clientIdCustomer,
    clientIdCustomer,
  };
}

export async function generateProductValue(sqsData: SQSDetail, dataForm: TClientData, RSQSData: ISQSDetail | null) {
  const insuranceGoal = RSQSData?.insuranceGoal || sqsData.insuranceGoal;
  const policyType = RSQSData?.policyType || sqsData.policyType;
  const lifeAssuredSelf = RSQSData?.lifeAssuredSelf || sqsData.lifeAssuredSelf;
  /** Check Product */
  const { selectedProduct, errorMessage } = await getProduct(
    insuranceGoal,
    policyType,
    parseFloat(dataForm.clientBudget.replace(/\./g, '')),
    lifeAssuredSelf,
    dataForm.clientCurrency,
    dataForm.clientPayment.key || '12',
    calculateAge(dataForm.clientDateBirth, true),
  );
  return { selectedProduct, errorMessage };
}

export const isValidRegistered = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const getPaymentFrequencyList = (insuranceGoals: string[]) => {
  const oneTimePaymentGoals = ['investasi'];

  // return all
  if (insuranceGoals.some((insuranceGoal) => oneTimePaymentGoals.includes(insuranceGoal))) {
    return paymentFreqList;
  }

  // return all list except the "00" key (Sekali Bayar)
  return paymentFreqList.filter((i) => i.key !== '00');
};