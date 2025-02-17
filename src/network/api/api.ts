import { APIM_BASE_URL, APIM_EPOS, APIM_AGENT } from '@env';
import { BaseApiFetchInstance } from 'common_services_frontend';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ResponseDraft,
  ParamSummaryDraft,
  ResponsePaymentGenerate,
  ResponseCheckPaymnet,
} from '../../redux';
import { checkIsExceedIdleTimeAndSessionRefresh } from 'app/modules/Auth/redux/authSlice';
import { TParamSMSPaydi, UpfrontDecisionModel } from '../../utilities';

// const apiUrl = `${APIM_BASE_URL}${APIM_EPOS}/epos/nb`;
const apiUrl = `${APIM_BASE_URL}${APIM_AGENT}/agents`;
// #TODO temporary wait for service complete
const apiAgent = `${APIM_BASE_URL}${APIM_AGENT}/agents`;

const fetchListDraft = createAsyncThunk('draft/list-draft', async (param: ParamSummaryDraft, { rejectWithValue }) => {
  const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/summaryProposal/search`, param);
  const dataResponse = response.data as ResponseDraft;
  if (dataResponse.code == '200') {
    return dataResponse.data;
  } else {
    rejectWithValue(response);
  }
});

const getSummaryProposal = async (param: any) => {
  const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/summaryProposal/search`, param);
  return response;
};

const sendPaydiSMS = async (param: any) => {
  const response = await BaseApiFetchInstance.post(`${apiUrl}/me/newbusiness/cekatan/saveCekatanGenerateLink`, param);
  return response;
};

const getPaydiSMS = async (param: any) => {
  const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/cekatan/getCekatanGenerateLink?cekatanId=${param}`);
  return response;
};

const generateLinkPayment = createAsyncThunk('ppl/getUrlPaymentLink', async (param: any, { rejectWithValue }) => {
  const response = await BaseApiFetchInstance.post(
    `${apiUrl}/me/newbusiness/ppl/getUrlPaymentLink`,
    param,
  );
  const dataResponse = response as any;
  if (dataResponse?.data?.resp_code == 0) {
    return dataResponse?.data as ResponsePaymentGenerate;
  } else {
    rejectWithValue(response);
  }
});

const checkStatusPayment = createAsyncThunk('ppl/checkPaymentPruForce', async (param: any, { rejectWithValue }) => {
  const response = await BaseApiFetchInstance.post(
    `${apiUrl}/me/newbusiness/ppl/checkPaymentPruForce`,
    param,
  );
  const dataResponse = response as any;
  if (dataResponse?.status == 201) {
    return dataResponse?.data as ResponseCheckPaymnet;
  } else {
    rejectWithValue(response);
  }
});

const getFundFactSheetListDoc = async (retryCount = 2): Promise<any> => {
  if (retryCount > 0) {
    const response = await BaseApiFetchInstance.get(
      `${apiUrl}/me/newbusiness/fundreportfile/fund/factSheet/latest`,
    );
    const dataResponse = response as any;
    if (dataResponse?.status == 200) {
      if (dataResponse?.data.body === undefined) {
        return getFundFactSheetListDoc(retryCount - 1);
      } else {
        return dataResponse?.data.body as any;
      }
    } else {
      // TODO CATCH ERROR
    }
  }
};

const getFundFactSheetDoc = async (fundId: string) => {
  const response = await BaseApiFetchInstance.get(
    `${apiUrl}/me/newbusiness/fundreportfile/document/${fundId}`,
  );
  const dataResponse = response as any;
  if (dataResponse?.status == 200) {
    return dataResponse?.data.body as any;
  } else {
    // TODO CATCH ERROR
  }
};

const dataDummyProductRecommendation = {
  H10FUW: {
    "responseCode": "PRU-00",
    "status": "Success",
    "result": {
      "totalData": 1,
      "data": [
        {
          "agentNumber": "00841117",
          "policyNumber": "13031045",
          "batchNumber": null,
          "clientNumOW": "12345678",
          "clientNameOW": "PSS FAKE DATA",
          "clientNumLife01": "12345678",
          "clientNameLife01": "PSS FAKE DATA",
          "clientPhone": "6285632539654   ",
          "clientEmail": "Dikayulyuu@gmail.com                              ",
          "productCode": "H10",
          "policyStatus": "IF",
          "premiumStatus": "PP",
          "chdrBillFreq": "12",
          "billingFreq": "12",
          "annivDate": "20240510",
          "convFlag": "FUW",
          "convExpireDate": "20240630",
          "convExpireFlag": " ",
          "reprFlag": " ",
          "discountAmt": null,
          "remarks": null,
          "incrementValue": null,
          "substandardCode": null,
          "conversionNextCoi": null,
          "option": null,
          "letterDate": null,
          "currentData": {
            "currRiderCode": "H131",
            "currSaverCode": "    ",
            "currWaiveCode": "    ",
            "currTotalPrem": "587000.00",
            "currBasicPrem": "587000.00",
            "currSaverPrem": "0.00",
            "currCoi": "0.00",
            "currPlanCode": "B",
            "currFixedAmt": "1100000.00",
            "currDeductAmt": "0.00",
            "currTerm": "99",
            "currSustainAge": "0"
          },
          "campaignType": [
            {
              "campaignCode": null,
              "totalPrem": null,
              "basicPrem": null,
              "saverPrem": null,
              "topUp": null,
              "planCode": null,
              "fixedAmt": null,
              "deductAmt": null,
              "term": null,
              "sustainAge": null,
              "nextCoi": null,
              "deductAmount": null,
              "coi": null
            },
            {
              "campaignCode": null,
              "totalPrem": null,
              "basicPrem": null,
              "saverPrem": null,
              "topUp": null,
              "planCode": null,
              "fixedAmt": null,
              "deductAmt": null,
              "term": null,
              "sustainAge": null,
              "nextCoi": null,
              "deductAmount": null,
              "coi": null
            }
          ]
        }
      ],
      "page": 0
    },
    "errorMessage": null
  },
  H11FUW: {
    "responseCode": "PRU-00",
    "status": "Success",
    "result": {
      "totalData": 1,
      "data": [
        {
          "agentNumber": "00841117",
          "policyNumber": "13031045",
          "batchNumber": null,
          "clientNumOW": "87654321",
          "clientNameOW": "PSSPlusS FAKE DATA",
          "clientNumLife01": "87654321",
          "clientNameLife01": "PSSPlusS FAKE DATA",
          "clientPhone": "6285632539654   ",
          "clientEmail": "Dikayulyuu@gmail.com                              ",
          "productCode": "H11",
          "policyStatus": "IF",
          "premiumStatus": "PP",
          "chdrBillFreq": "12",
          "billingFreq": "12",
          "annivDate": "20240510",
          "convFlag": "FUW",
          "convExpireDate": "20240630",
          "convExpireFlag": " ",
          "reprFlag": " ",
          "discountAmt": null,
          "remarks": null,
          "incrementValue": null,
          "substandardCode": null,
          "conversionNextCoi": null,
          "option": null,
          "letterDate": null,
          "currentData": {
            "currRiderCode": "H131",
            "currSaverCode": "    ",
            "currWaiveCode": "    ",
            "currTotalPrem": "587000.00",
            "currBasicPrem": "587000.00",
            "currSaverPrem": "0.00",
            "currCoi": "0.00",
            "currPlanCode": "B",
            "currFixedAmt": "1100000.00",
            "currDeductAmt": "0.00",
            "currTerm": "99",
            "currSustainAge": "0"
          },
          "campaignType": [
            {
              "campaignCode": null,
              "totalPrem": null,
              "basicPrem": null,
              "saverPrem": null,
              "topUp": null,
              "planCode": null,
              "fixedAmt": null,
              "deductAmt": null,
              "term": null,
              "sustainAge": null,
              "nextCoi": null,
              "deductAmount": null,
              "coi": null
            },
            {
              "campaignCode": null,
              "totalPrem": null,
              "basicPrem": null,
              "saverPrem": null,
              "topUp": null,
              "planCode": null,
              "fixedAmt": null,
              "deductAmt": null,
              "term": null,
              "sustainAge": null,
              "nextCoi": null,
              "deductAmount": null,
              "coi": null
            }
          ]
        }
      ],
      "page": 0
    },
    "errorMessage": null
  }
};

const getProductRecommendationConversionData = async (
  agentNo: string,
  clientNo: string,
  moduleService: string = 'nb',
  policyNo?: string,
  getAllPolicy?: string,
  page?: string,
) => {
  const baseUrl =
    `${apiUrl}/me/newbusiness/product-recommendation/getEligibleCampaignConversion`;
  const queryParams = {
    agentNo,
    clientNo,
    moduleService,
    policyNo: policyNo ?? '',
    getAllPolicy: getAllPolicy ?? '',
    page: page ?? '',
  };

  if (clientNo === '12345678') {
    return dataDummyProductRecommendation.H10FUW.result.data
  } else if (clientNo === '87654321') {
    return dataDummyProductRecommendation.H11FUW.result.data
  } else {
    const response = await BaseApiFetchInstance.get(baseUrl, queryParams);
    const dataResponse = response as any;

    if (dataResponse?.status == 200) {
      return dataResponse?.data?.result?.data as any;
    } else if (dataResponse?.status == 400) {
      const res = JSON.parse(dataResponse?.data?.message);
      if (res.responseCode === 'ERR-05') return {};
    } else {
      // TODO CATCH ERROR
      return dataResponse?.status;
    }
  }
};

const getEligibleDiscount = async (clientNo: string, agentCode: string, policyNo?: string) => {
  const baseUrl =
    `${apiUrl}/me/newbusiness/product-recommendation/getEliDisc`;

  //butuh dataMock sementara untuk cek biarpun server uda offline.
  const queryParams = {
    clientNo,
    agentCode,
    policyNo: policyNo ?? '',
  };

  const response = await BaseApiFetchInstance.get(baseUrl, queryParams);

  const dataResponse = response as any;
  if (dataResponse?.status == 200) {
    return dataResponse?.data as any;
  } else {
    // TODO CATCH ERROR
    return dataResponse?.status;
  }
};

const checkMicrositeStatus = createAsyncThunk('microsite/status-microsite', async (param: any) => {
  const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/cekatan/getCekatanSubmission`, param);
  return response;
});

const syncLocaltoService = async (param: any) => {
  const response = await BaseApiFetchInstance.post(`${apiUrl}/me/newbusiness/summaryProposalDetail/insertBulk`, param);
  return response;
};

const getPrivyLandingUrlLiveness = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.get(
      `${apiUrl}/me/privy/ocr/liveness`,
      params,
    );
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return { data: dataResponse?.data, status: dataResponse.status, dataResponse: dataResponse };
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const getPrivyQuotaOcr = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.get(
      `${apiUrl}/me/privy/quota/ocr`,
      params,
    );
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return dataResponse?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const privyOcr = async (params: any) => {
  try {
    const response = await BaseApiFetchInstance.post(
      `${apiUrl}/me/privy/ocr`,
      params,
    );

    if (response?.status == 200) {
      return { data: response.data, status: response?.status };
    }

    return { data: response.data, status: response?.status };
  } catch (error) {
    return { error: error };
  }
};

const getProposalByProposalId = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/summaryProposalDetail/search`, params);
    const dataResponse = response as any;
    if (dataResponse.status == 200) {
      return dataResponse?.data?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const getLicenses = async () => {
  try {
    const response = await BaseApiFetchInstance.get(`${apiAgent}/me`, { lang: 'en-US' });
    return response
  } catch (error) {
    // TODO CATCH ERROR
  }
}

const getValidateContact = async (params: any) => {
  try {
    const response = await BaseApiFetchInstance.post(`${apiUrl}/me/newbusiness/ClientComponentService-1/getContactForValidation`, params);
    return response
  } catch (error) {
    // TODO CATCH ERROR
  }
}

const getPrivyIdByOuthPass = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.post(`${apiUrl}/me/privy/privypass/oauth`, params);
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return dataResponse?.data?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const registrationPrivy = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.post(`${apiUrl}/me/privy/registration`, params);
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return dataResponse?.data?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const getStatusRegistrationPrivy = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.post(`${apiUrl}/me/privy/registration/status`, params);
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return dataResponse?.data?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const submissionPrivy = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.post(`${apiUrl}/me/newbusiness/spaj/submissionPrivy`, params);
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return dataResponse?.data?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const submissionProposal = async (params?: any, headers?: Record<string, string>) => {
  try {
    const response = await BaseApiFetchInstance.post(`${apiUrl}/me/newbusiness/spaj/submissionProposal`, params, headers);
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return dataResponse?.data?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};


const submissionDoksul = async (params?: any) => {
  const response = await BaseApiFetchInstance.post(`${apiUrl}/me/newbusiness/spaj/submissionDoksul`, params);
  return response as any
};

const checkAgentInquary = async (params?: any) => {
  const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/spaj/checkAgentInquiry?proposalNumber=${params.proposalNumber}&agentNumber=${params.agentNumber}`);
  return response as any
};

const getStatusDocumentPrivy = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.get(`${apiUrl}/me/privy/document/status/byProposalNumber/${params}`);
    const dataResponse = response as any;
    if (dataResponse.status === 200) {
      return dataResponse?.data;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const generateSpajNumber = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.post(`${apiUrl}/me/newbusiness/spaj/generateSPAJNumber`, params);
    const dataResponse = response?.data as any
    if (response?.status === 201) {
      return dataResponse;
    }

    if (dataResponse.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const searchByNoSPAJ = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/ClientComponentService-1/getClientOdsDoksul`, params);
    return response
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const onCheckBank = async (params?: any) => {
  try {
    const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/checkBankAcc`, params);
    const dataResponse = response?.data as { resp_code: number, resp_desc: string };
    if (response?.status === 200) {
      return dataResponse;
    }

    if (response.status === 401) {
      // TODO CATCH ERROR
    }
  } catch (error) {
    // TODO CATCH ERROR
  }
};

const getUpfrontDecisionAPI = async (transactionId: string) => {
  const response = await BaseApiFetchInstance.get(
    `${apiUrl}/me/newbusiness/spaj/getUpFrontResult?transactionId=${transactionId}`,
  );
  return response as UpfrontDecisionModel.Response;
};

const postUpdrontDecisionAPI = async (params: UpfrontDecisionModel.Request) => {
  const response = await BaseApiFetchInstance.post(
    `${apiUrl}/me/newbusiness/spaj/submissionUpFront`,
    params,
  );
  return response as UpfrontDecisionModel.PostResponse;
};

const getConvertUSDToIDR = (authToken: string, paydate: string) => {
  const url = `${apiUrl}/me/newbusiness/lifeasia-common/callBO?OBJID=FSGETRATE&PAYCURR=USD&PAYDATE=${paydate}`;
  const header = { Authorization: `Bearer ${authToken || ''}` };
  return BaseApiFetchInstance.get(url, undefined, header);
};

const getAnnualRefreshmentStatus = (params: { agentCode: string, trainingCode: string }) => {
  const url = `${apiUrl}/me/newbusiness/licenseChecking/getRefreshmentStatus`;
  // const header = { Authorization: `Bearer ${authToken || ''}` };
  return BaseApiFetchInstance.post(url, params);
}

const getAnnualRefreshmentPopUpSettingSearch = (params: { data: { code: string } }) => {
  const url = `${apiUrl}/me/newbusiness/licenseChecking/popUpSettingSearch`;
  return BaseApiFetchInstance.post(url, params);
}

const checkStatusMicrosite = async (param: TParamSMSPaydi, headers?: Record<string, string>) => {
  const response = await BaseApiFetchInstance.get(`${apiUrl}/me/newbusiness/cekatan/getCekatanSubmission/`, param, headers);
  return response
}

export {
  fetchListDraft,
  getSummaryProposal,
  sendPaydiSMS,
  generateLinkPayment,
  checkStatusPayment,
  getFundFactSheetListDoc,
  getFundFactSheetDoc,
  getProductRecommendationConversionData,
  getEligibleDiscount,
  checkMicrositeStatus,
  syncLocaltoService,
  getPrivyQuotaOcr,
  privyOcr,
  getPrivyLandingUrlLiveness,
  getProposalByProposalId,
  getLicenses,
  getValidateContact,
  getPrivyIdByOuthPass,
  registrationPrivy,
  getStatusRegistrationPrivy,
  submissionPrivy,
  getStatusDocumentPrivy,
  generateSpajNumber,
  searchByNoSPAJ,
  onCheckBank,
  getUpfrontDecisionAPI,
  postUpdrontDecisionAPI,
  submissionProposal,
  submissionDoksul,
  checkAgentInquary,
  getPaydiSMS,
  getConvertUSDToIDR,
  getAnnualRefreshmentStatus,
  getAnnualRefreshmentPopUpSettingSearch,
  checkStatusMicrosite
};
