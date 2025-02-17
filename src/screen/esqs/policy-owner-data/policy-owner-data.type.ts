import { TClientData } from "../../../utilities";


const defaultOptionalData = {
  label: '',
  key: '',
};

export const defaultTFormDataClient: TClientData = {
  clientType: defaultOptionalData,
  clientName: '',
  clientDateBirth: '',
  clientPhoneCode: {
    name: 'Indonesia',
    dial_code: '+62',
    emoji: '🇮🇩',
    code: 'ID',
  },
  clientPhone: '',
  clientGender: defaultOptionalData,
  clientMarriageStatus: defaultOptionalData,
  clientSmokeStatus: defaultOptionalData,
  clientDependents: '',
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
  clientIncome: defaultOptionalData,
  clientExpenses: defaultOptionalData,
  clientPayment: defaultOptionalData,
  clientCurrency: { label: 'IDR', key: 'IDR' },
  clientBudget: '',
  clientNationality: '',
  clientEmail: '',
  clientAddress: {},
};


