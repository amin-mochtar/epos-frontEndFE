import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { checkMicrositeStatus, checkStatusPayment, fetchListDraft, generateLinkPayment } from '../network/api';
import {
  EposState,
  ResponseSqs,
  SQSDetail,
  TCheckStatusMicrosite,
  ProspectDetailLeads,
} from './type';
import { defaultTFormDataClient } from '../screen/esqs/policy-owner-data/policy-owner-data.type';

export const defaultResponseSendMessage = {
  responseCode: '',
  responseMessage: '',
  content: null,
  data: {
    message: '',
    responseCode: '',
    data: {
      phoneNumber: '',
      url: '',
      cekatanId: '',
      status: '',
      createdDate: '',
    },
  },
  propNo: null,
};

export const responseData = {
  headers: null,
  data: defaultResponseSendMessage,
  problem: '',
  ok: false,
  status: 0,
};

export const defaultResponstPaymnetGenerate = {
  resp_code: null,
  resp_desc: '',
  url_paylink: '',
  ref_no: '',
};

const defaultCheckStatusPayment = {
  resp_code: null,
  resp_desc: '',
};

export const defaultSqsDataSlice: SQSDetail = {
  existingPolicy: [],
  otherPolicy: '',
  hasActivePolicy: false,
  lifeAssuredSelf: '',
  insuranceGoal: [],
  isDomicileAceh: undefined,
  isDomicileSumatraUtara: undefined,
  SelectedCitySumatraUtara: '',
  vulnerablityCustomer: '',
  additionalValidationPolicyInformation: '',
  policyType: '',
  productRecomendation: [],
  productCode: '',
  coverageCode: [],
  riskProfileResult: '',
  changeRiskProfile: false,
  riskProfileAnswer: {
    investmentOwned: [],
    investmentKnowledge: '',
    investmentTarget: '',
    acceptableRisk: '',
    invesmentMajority: '',
    invesmentPeriod: '',
    otherValue: '',
  },
  lifeAssuredData: defaultTFormDataClient,
  confirmationProductDoksul: '',
  additionalInsuranceStatement: '',
};

export const defaultMicrositeStatus: TCheckStatusMicrosite = {
  responseCode: '',
  responseMessage: '',
  content: null,
  data: null,
  propNo: null,
};

export const ProspectDetailLead: ProspectDetailLeads = {
  // common leads params
  leadId: '',
  customerFlag: '',
  fullName: '',
  countryCode: '',
  phoneNumber: '',
  campaignId: '',
  birthDate: '',
  email: '',
  clientNumber: '',
  // personal info leads params
  gender: '',
  maritalStatus: '',
  smokerIndicator: false,
  education: '',
  countryNationalId: '',
  periodOfResidentCard: '',
  religion: '',
  citizenship: '',
  residentCardTypes: '',
  birthCountry: '',
  birthCountryOther: '',
  // address information
  residenceAddressArea: '',
  address: '',
  rt: '',
  rw: '',
  km: '',
  zipCode: '',
  district: '',
  province: '',
  city: '',
  homePhoneNumber: '',
  // job information
  occupation: '',
  company: '',
  income: '',
  percentageTotalExpensesToIncome: '',
  companyAddressInIndonesia: '',
  companyAddress: '',
  companyRt: '',
  companyRw: '',
  companyKm: '',
  companyZipcode: '',
  companyDistrict: '',
  companyProvince: '',
  companyCity: '',
  workPhoneNumber: '',
  // other information
  mailingAddress: '',
  otherIncomePerMonth: '',
  otherAddress: '',
  otherRegionAddress: '',
  otherRt: '',
  otherRw: '',
  otherKm: '',
  otherZipcode: '',
  otherDistrict: '',
  otherProvince: '',
  otherCity: '',
  // customer campaign params
  campaignType: '',
  dataAdditional1: '',
  dataAdditional2: '',
  dataAdditional3: '',
  dataAdditional4: '',
  dataAdditional5: '',
  campaignSARDeath: '',
  campaignSARAdd: '',
  selectedPlan: '',
  campaignCode: '',
  id: '',
  selectedRiderCode: '',
  campaignClientNumber: '',
  campaignPHNumber: '',
  campaignTUNumber: '',
};

const defaultStatementDoksul = {label: '', key: ''}

const initialState: EposState = {
  sumaryDraftData: [],
  selectedSQSId: '',
  allSQSId: [],
  proposalId: '',
  spajNumber: '',
  spajId: '',
  sqsData: defaultSqsDataSlice,
  sqsState: '',
  loading: false,
  error: null,
  massage: '',
  page: 1,
  totalRow: 0,
  allDataloaded: false,
  additionalFormsId: '',
  isDoksul: false,
  isDoksulCTA: false,
  statusDoksul: '',
  statementDoksul: defaultStatementDoksul,
  responseCheckPayment: defaultCheckStatusPayment,
  responsePaymentGenerate: defaultResponstPaymnetGenerate,
  spajDisclaimerUrlListed: [],
  RMessaging: responseData,
  RMicrosite: defaultMicrositeStatus,
  progressSync: 0,
  leadId: '',
  ProspectDetail: ProspectDetailLead,
  paramSearch: '',
  paramFilter: {},
};

const eposSlice = createSlice({
  name: 'epos',
  initialState,
  reducers: {
    updateEposState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateSqs: (state, action: PayloadAction<ResponseSqs>) => {
      const { key, payload: newState } = action.payload;
      state.sqsData[key] = newState as never;
    },
    resetSqs: (state) => {
      state.sqsData = { ...defaultSqsDataSlice };
    },
    updateProspectDetailLead: (state, action) => {
      if (action?.payload) {
        state.ProspectDetail = action.payload;
      }
    },
    // reset previous data when filter or search action is triggered
    resetSummaryDraftData: (state, action: PayloadAction<{ payload: string }>) => {
      if (action.payload) {
        state.loading = true;
        state.sumaryDraftData = [];
        state.massage = 'pending';
        state.page = 1;
        state.totalRow = 0;
      }
    },
    resetResponsePayment: (state, action: PayloadAction<{ payload: string }>) => {
      if (action.payload) {
        state.responsePaymentGenerate = defaultResponstPaymnetGenerate;
        state.responseCheckPayment = defaultCheckStatusPayment;
      }
    },
    resetRMessaging: (state, action: PayloadAction<{ payload: string }>) => {
      if (action.payload) {
        state.RMessaging = responseData;
        state.massage = 'pending';
      }
    },
    resetRMicrosite: (state, action: PayloadAction<{ payload: string }>) => {
      if (action.payload) {
        state.RMicrosite = defaultMicrositeStatus;
        state.massage = 'pending';
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListDraft.pending, (state, { meta }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (state.page === 1 && action.payload?.data.length === 0) {
          state.massage = 'emptyDraft';
        } else {
          state.massage = 'filled';
          if (action.payload?.data.length === 0) {
            state.allDataloaded = true;
          } else if (action.payload) {
            //with pagination
            // state.sumaryDraftData = [...state.sumaryDraftData, ...(action.payload?.data || [])];
            // without pagination
            state.sumaryDraftData = action?.payload?.data;
            state.totalRow = action.payload?.totalRow;
            state.page += 1;
          }
        }
      })
      .addCase(fetchListDraft.rejected, (state, action) => {
        state.sumaryDraftData = [];
        state.massage = 'error';
        state.loading = false;
        state.error = '404';
      });

    builder
      .addCase(generateLinkPayment.pending, (state, action) => {
        state.loading = true;
        state.massage = 'pending message';
      })
      .addCase(generateLinkPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.massage = 'fulfilled message';
        state.responsePaymentGenerate = action?.payload;
      })
      .addCase(generateLinkPayment.rejected, (state, action) => {
        state.responsePaymentGenerate = null;
        state.error = '404';
        state.massage = 'rejected message';
      });

    builder
      .addCase(checkStatusPayment.pending, (state, action) => {
        state.loading = true;
        state.massage = 'pending message';
      })
      .addCase(checkStatusPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.massage = 'fulfilled message';
        state.responseCheckPayment = action?.payload;
      })
      .addCase(checkStatusPayment.rejected, (state, action) => {
        state.responseCheckPayment = null;
        state.error = '404';
        state.massage = 'rejected message';
      });

    builder
      .addCase(checkMicrositeStatus.pending, (state, action) => {
        state.loading = true;
        state.massage = 'pending message';
      })
      .addCase(checkMicrositeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.massage = 'fulfilled message';
        state.RMicrosite = action?.payload;
      })
      .addCase(checkMicrositeStatus.rejected, (state, action) => {
        state.RMicrosite = null;
        state.error = '404';
        state.massage = 'rejected message';
      });
  },
});

export const {
  updateEposState,
  updateSqs,
  resetSqs,
  updateProspectDetailLead,
  resetSummaryDraftData,
  resetResponsePayment,
  resetRMessaging,
  resetRMicrosite,
} = eposSlice.actions;

export const EposSlice = eposSlice.reducer;
