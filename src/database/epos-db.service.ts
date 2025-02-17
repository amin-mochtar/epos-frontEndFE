import { UpdateMode } from 'realm';
import { IAdditionalForms, useRealm, useObject, IFundFactSheet, IProspectDetailLead } from './epos-database';
import moment from 'moment';
import {
  TObjectCustomerByKey,
  TObjectSPAJbyKey,
  TObjectSQSByKey,
  TObjectSummaryByKey,
  UpfrontDecisionModel,
  ISPAJData,
  ISQSDetail,
  ISummaryProposal,
  ICustomerStorage,
  TSPAJDataCompletenessKey,
  TObjectSPAJDataCompleteness,
  TClientData,
} from '../utilities';

export const DataAdditionalForms = () => {
  return {
    additionalFormId: `A${new Date().getTime()}`,
    lampungForm: '',
    policyBookPrintForm: '',
    waqfInsuranceBenefits: '',
    insuranceAttachmentLetter: '',
    marketersInteraction: '',
    formConversion: '',
  } as IAdditionalForms;
};

export const generateSPAJData = () => {
  return {
    spajId: `S${new Date().getTime()}`,
    confirmationSQS: '',
    policyHolderData: '',
    primaryInsured: '',
    DataCompleteness: [
      {
        key: '',
        categoryKey: '',
        name: '',
        status: false,
        route: '',
      },
    ],
    activePolicy: '',
    premiumPayor: '',
    topup: '',
    topupPremiumPyor: '',
    beneficiary: '',
    policyHolderDocs: '',
    primaryInsuredDocs: '',
    amandment: '',
    policyHolderAccount: '',
    sqsSignature: '',
    premiumPayorDoc: '',
    topupPayorDoc: '',
    spajSignature: '',
    spajPayment: '',
    privyData: '{}',
    flagForm: '[]',
    rateUsd: '',
  } as ISPAJData;
};

export const getDefaultSQSData = () => {
  return {
    sqsId: `Q${new Date().getTime()}`,
    clientIdSelected: [],
    existingPolicy: [],
    otherPolicy: '',
    hasActivePolicy: false,
    lifeAssuredSelf: '',
    insuranceGoal: [],
    isDomicileAceh: undefined,
    isDomicileSumatraUtara: undefined,
    SelectedCitySumatraUtara: '',
    vulnerablityCustomer: '',
    policyType: '',
    riskProfileResult: '',
    riskProfileAnswer: {
      investmentOwned: [],
      investmentKnowledge: '',
      investmentTarget: '',
      acceptableRisk: '',
      invesmentMajority: '',
      invesmentPeriod: '',
      otherValue: '',
    },
    productRecommendation: '',
    product: {
      key: '',
      label: '',
    },
    additionalBenefits: [],
    productCategory: '',
    policyHolderIsPremiumPayor: '',
    prospectivePremiumPayor: '',
    otherSourceIncome: '',
    premiumPayorIncomeData: '',
    waitingPeriod: '',
    confirmationProductRecommendation: '',
    mainAdditionalBenefits: [],
    topupAdditionalBenefits: [],
    waitingPeriodType: '[]',
    fund: '[]',
    fundTopup: '[]',
    // Need Discussion
    clientPayment: '',
    clientCurrency: '',
    clientBudget: '',
    // End Need Discussion
    calculator: '',
    resultCalculator: '',
    resultIlustration: '',
    confirmationProductDoksul: '',
    additionalInsuranceStatement: '',
    calculatorTopup: '',
    calculatorWithdrawl: '',
    substandar: '',
    convDiscountData: '',
    convDataResult: '',
    isGIO: false,
    isChangePH: false
  } as ISQSDetail;
}

export const generateDefaultFormCustomer = async () => {
  const defaultOptionalData = {
    label: '',
    key: '',
  };
  return {
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
  } as TClientData;
}

export const initProposalData = async () => {

  const sqsDetail: ISQSDetail = getDefaultSQSData();

  const summaryProposal: ISummaryProposal = {
    proposalId: `P${new Date().getTime()}`,
    allSQSId: sqsDetail.sqsId,
    createdBy: '',
    createdDate: moment().toISOString(),
    currency: '',
    digitalSign: '',
    lifeAssuredName: '',
    lifeAssuredDob: '',
    lifeAssuredPhone: '',
    policyHolderName: '',
    policyHolderDob: '',
    policyHolderPhone: '',
    productCode: '',
    productName: '',
    selectedSQSId: sqsDetail.sqsId,
    spajNumber: '',
    spajId: '',
    statusProposal: 'SQS Illustration',
    statusSubmit: false,
    submitDate: '',
    sumAssured: 0,
    updatedBy: '',
    isDoksulCTA: false,
    updatedDate: '',
    yearlyPremium: 0,
    lastState: '',
    paramSendMessage: '',
    cekatanId: '',
    additionalFormsId: '',
    isDoksul: false,
    statusDoksul: '',
    shariaFlag: '',
    leadId: '',
    agentCode: '',
    doksulType: '',
    convData: '',
  };

  return { sqsDetail, summaryProposal };
};

export const initProspectDetailLead = () => {
  return {
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
  } as IProspectDetailLead;
};

export function useEposRealm() {
  const realm = useRealm();

  const initEpos = async (sqsData: ISQSDetail, summaryProposal: ISummaryProposal) => {
    await onUpdateSQS(sqsData);
    await onUpdateSummary(summaryProposal);
  };

  const onUpdateSQS = async (data: ISQSDetail) => {
    try {
      realm.write(() => {
        realm.create('SQSDetail', data, UpdateMode.All);
      });
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  /**
   *
   * @param id Proposal ID
   * @param allSQSId SQS ID
   *
   * NOT IMPLEMENT
   * SPAJ NOT DELETED YET AND CUSTOMER DATA
   *
   */
  const deleteProposalbyID = async (id: string, allSQSId: string) => {
    try {
      const _allSQSId = allSQSId.split(',');

      // Data yang sudah di temukan kemudian di delete per object.
      const deleteSummaryProposal = await getSummaryProposalById(id);
      const deleteSQSDetails = await Promise.all(_allSQSId.map((sqsId) => getSQSById(sqsId)));

      // Perform deletion within a single write transaction
      realm.write(() => {
        if (deleteSummaryProposal) {
          realm.delete(deleteSummaryProposal);
        }
        deleteSQSDetails.forEach((deleteSQSDetail) => {
          if (deleteSQSDetail) {
            realm.delete(deleteSQSDetail);
          }
        });
      });
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  const onUpdateSummary = async (data: ISummaryProposal) => {
    realm.write(() => {
      realm.create('SummaryProposal', data, UpdateMode.All);
    });
  };

  const getSQSById = (id: string) => {
    return realm.objectForPrimaryKey<ISQSDetail>('SQSDetail', id);
  };

  const updateSQSByKey = async (sqsId: string, data: TObjectSQSByKey | TObjectSQSByKey[]) => {
    const applyUpdate = (target: any, source: any) => {
      Object.keys(source).forEach((key) => {
        if (Array.isArray(source[key])) {
          target[key] = Array.isArray(target[key]) ? [...source[key]] : source[key];
        } else if (typeof source[key] === 'object' && source[key] !== null) {
          if (!target[key]) target[key] = {};

          // recursive update buat child array atau subchild
          applyUpdate(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      });
    };

    realm.write(async () => {
      const _sqs = realm.objectForPrimaryKey<ISQSDetail>('SQSDetail', sqsId);
      if (_sqs) {
        if (Array.isArray(data)) {
          data.forEach((item) => {
            applyUpdate(_sqs, { [item.key]: item.value });
          });
        } else {
          applyUpdate(_sqs, { [data.key]: data.value });
        }
      }
    });
  };

  const getSummaryProposalById = (id: string) => {
    return realm.objectForPrimaryKey<ISummaryProposal>('SummaryProposal', id);
  };

  const updateSummaryByKey = async (proposalId: string, data: TObjectSummaryByKey | TObjectSummaryByKey[]) => {
    realm.write(() => {
      const _summaryProposal = realm.objectForPrimaryKey<ISummaryProposal>('SummaryProposal', proposalId);
      if (_summaryProposal) {
        if (Array.isArray(data)) {
          data.map((item) => {
            _summaryProposal[item.key] = item.value as never;
          });
        } else {
          _summaryProposal[data.key] = data.value as never;
        }
      }
    });
  };

  const onUpdateCustomer = async (data: ICustomerStorage) => {
    try {
      realm.write(async () => {
        realm.create('CustomerStorage', data, UpdateMode.All);
      });
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  const deleteCustomerById = async (clientId: string) => {
    const _customerData = realm.objectForPrimaryKey<ICustomerStorage>('CustomerStorage', clientId);
    try {
      realm.write(() => {
        realm.delete(_customerData);
      });
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  const onUpdateCustomerByKey = async (
    clientId: string,
    data: TObjectCustomerByKey | TObjectCustomerByKey[] | ICustomerStorage,
  ) => {
    realm.write(async () => {
      try {
        const _customerData = realm.objectForPrimaryKey<ICustomerStorage>('CustomerStorage', clientId);
        if (_customerData) {
          if (Array.isArray(data)) {
            data.map((item) => {
              if (item.key != 'clientId') _customerData[item.key as never] = item.value as never;
            });
          } else {
            if (Object.keys(data).length > 2) {
              for (let key in data) {
                //@ts-ignore
                if (key != 'clientId') _customerData[key as never] = data[key] as never;
              }
            } else {
              // @ts-ignore
              _customerData[data.key as never] = data.value as never;
            }
          }
        } else {
          realm.create('CustomerStorage', data as ICustomerStorage);
        }
      } catch (error) {
        // TODO CATCH ERROR
      }
    });
  };

  const getCustomerStorageById = (id: string) => {
    return realm.objectForPrimaryKey<ICustomerStorage>('CustomerStorage', id);
  };

  const getCustomerAllStorage = async () => {
    return await realm.objects<ICustomerStorage>('CustomerStorage');
  };

  const getSPAJById = (id: string) => {
    return realm.objectForPrimaryKey<ISPAJData>('SPAJData', id);
  };

  const onUpdateSPAJ = async (data: ISPAJData) => {
    try {
      realm.write(() => {
        realm.create('SPAJData', data, UpdateMode.All);
      });
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  const updateSPAJByKey = async (spajId: string, data: TObjectSPAJbyKey | TObjectSPAJbyKey[]) => {
    realm.write(async () => {
      try {
        const _spaj = realm.objectForPrimaryKey<ISPAJData>('SPAJData', spajId);
        if (_spaj) {
          if (Array.isArray(data)) {
            data.map((item) => {
              _spaj[item.key] = item.value;
            });
          } else {
            _spaj[data.key] = data.value;
          }
        }
      } catch (error) {
        // TODO CATCH ERROR
      }
    });
  };

  const updateSPAJStatusSubMenu = async (
    spajId: string,
    key: TSPAJDataCompletenessKey,
    data: TObjectSPAJDataCompleteness | TObjectSPAJDataCompleteness[],
  ) => {
    realm.write(() => {
      const SPAJData = realm.objectForPrimaryKey<ISPAJData>('SPAJData', spajId);
      const FoundItem = SPAJData?.DataCompleteness.find((obj) => obj.key === key);
      if (FoundItem) {
        if (Array.isArray(data)) {
          data.map((item) => {
            FoundItem[item.key] = item.value as never;
          });
        } else {
          FoundItem[data.key] = data.value as never;
        }
      }
    });
  };

  const getAdditionalFormById = (id: string) => {
    return realm.objectForPrimaryKey<IAdditionalForms>('AdditionalForms', id);
  };

  const onUpdateAdditionalForms = async (data: IAdditionalForms) => {
    realm.write(() => {
      realm.create('AdditionalForms', data, UpdateMode.All);
    });
  };

  const getMultipleCustomer = (customerId: string[]) => {
    const tempCustomerData: ICustomerStorage[] = [];
    customerId?.map((item: string) => {
      const customerData = realm.objectForPrimaryKey<ICustomerStorage>('CustomerStorage', item) as ICustomerStorage;
      tempCustomerData.push(customerData);
    });
    return tempCustomerData;
  };

  const getAllSQSData = (sqsId: string[]) => {
    return new Promise((resolve, reject) => {
      try {
        const tempSqsData: ISQSDetail[] = [];
        sqsId.map((item: string) => {
          const sqsData = useObject<ISQSDetail>('SQSDetail', item as never);
          tempSqsData.push(sqsData!);
        });
        resolve(tempSqsData);
      } catch (err) {
        reject(err);
      }
    });
  };

  //Fund fact sheet realm
  const updateFundFactSheetDoc = async (data: IFundFactSheet) => {
    realm.write(() => {
      realm.create('FundFactSheet', data, UpdateMode.All);
    });
  };

  const getFundFactSheetDocRealm = () => {
    return realm.objects<IFundFactSheet>('FundFactSheet');
  };

  const deleteAllFundFactSheetDocRealm = () => {
    realm.write(() => {
      const allFundDoc = realm.objects('FundFactSheet');
      realm.delete(allFundDoc);
    });
  };

  const onUpdateProspectDetailLead = async (data: IProspectDetailLead) => {
    try {
      realm.write(() => {
        realm.create('ProspectDetailLeadIntegration', data, UpdateMode.All);
      });
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  const onUpdateUpfrontDecision = async (spajId: string, key: UpfrontDecisionModel.KeyRealmUpdate, data: string) => {
    realm.write(() => {
      const objectToUpdate = realm.objectForPrimaryKey<ISPAJData>('SPAJData', spajId);
      if (objectToUpdate) {
        objectToUpdate.upfrontDecisionResult = {
          ...objectToUpdate.upfrontDecisionResult,
          [key]: data,
        };
      }
    });
  };

  const deleteSQSById = async (sqsId: string) => {
    const deleteSQSDetail = await getSQSById(sqsId);
    try {
      realm.write(() => {
        realm.delete(deleteSQSDetail);
      });
    } catch (error) {
      // TODO CATCH ERROR
    }
  };

  const getRealmPath = async (sqsId: string) => {
    const deleteSQSDetail = await realm.path;
  };

  return {
    initEpos,
    onUpdateSummary,
    onUpdateSQS,
    getSQSById,
    getSummaryProposalById,
    updateSummaryByKey,
    onUpdateCustomer,
    getCustomerStorageById,
    getCustomerAllStorage,
    getMultipleCustomer,
    getSPAJById,
    onUpdateSPAJ,
    updateSPAJStatusSubMenu,
    getAdditionalFormById,
    onUpdateAdditionalForms,
    deleteProposalbyID,
    getAllSQSData,
    updateFundFactSheetDoc,
    getFundFactSheetDocRealm,
    deleteAllFundFactSheetDocRealm,
    onUpdateProspectDetailLead,
    updateSQSByKey,
    deleteSQSById,
    updateSPAJByKey,
    onUpdateCustomerByKey,
    onUpdateUpfrontDecision,
    getRealmPath,
    deleteCustomerById
  };
}
