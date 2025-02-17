import { initProposalData, IProspectDetailLead, useEposRealm } from '../../../../database';
import { SQSDetail } from '../../../../redux';
import { ICustomerStorage, ISQSDetail, ISummaryProposal, TClientData, TPolicyType } from '../../../../utilities';

type TGenerateSQSandSummaryParams = {
  productRecommendation: string;
  lifeAssuredData: ICustomerStorage;
  sqsData: SQSDetail;
  dataForm: TClientData;
  nextRoute: string;
  policyType: TPolicyType;
  leadId: string | null;
  agentCode: string | null;
  proposalId: string | null;
};

type TSaveLeadParams = {
  leadId: string | null;
  dataForm: TClientData;
};

type TUpdateExistingParams = {
  RSQSData: (ISQSDetail & Realm.Object<ISQSDetail>) | null;
  selectedProduct: string[];
  isDoksul: boolean;
  lifeAssuredData: ICustomerStorage;
  clientIdCustomer: string;
};

export default function usePolicyOwnerData() {
  const { getSummaryProposalById, getCustomerStorageById, onUpdateSQS } = useEposRealm();

  const generateSqsAndSummaryProposal = async ({
    productRecommendation,
    lifeAssuredData,
    agentCode,
    dataForm,
    leadId,
    nextRoute,
    policyType,
    proposalId,
    sqsData,
  }: TGenerateSQSandSummaryParams) => {
    const { summaryProposal, sqsDetail } = await initProposalData();
    const _sqsDetail = {
      ...{
        ...sqsDetail,
        productRecommendation: productRecommendation,
        clientIdSelected: [lifeAssuredData.clientId],
      },
      ...sqsData,
    } as ISQSDetail;

    const summaryProposalMap = {
      policyHolderName: dataForm.clientName,
      policyHolderDob: dataForm.clientDateBirth,
      policyHolderPhone: `${dataForm.clientPhoneCode?.dial_code}${dataForm.clientPhone}`,
      lifeAssuredName: dataForm.clientName,
      lifeAssuredDob: dataForm.clientDateBirth,
      lifeAssuredPhone: `${dataForm.clientPhoneCode?.dial_code}${dataForm.clientPhone}`,
      lastState: nextRoute as string,
      currency: dataForm.clientCurrency?.key,
      shariaFlag: policyType,
      leadId,
      agentCode,
    };

    let _summaryProposal = { ...summaryProposal, ...summaryProposalMap } as ISummaryProposal;

    // Check If Add Another SQS or Initial
    if (proposalId) {
      const tempProposal = await getSummaryProposalById(proposalId);
      _summaryProposal = {
        ...tempProposal?.toJSON(),
        ...summaryProposalMap,
        allSQSId: `${tempProposal?.allSQSId},${sqsDetail.sqsId}`,
        selectedSQSId: sqsDetail.sqsId,
        leadId,
      } as ISummaryProposal;
    }
    return { _sqsDetail, _summaryProposal };
  };

  const generateLeadData = async ({ dataForm, leadId }: TSaveLeadParams) => {
    //save lead integration data
    const prospectDetailLead = await initProposalData();
    const _prospectDetailLead = {
      ...prospectDetailLead,
      leadId,
      fullName: dataForm.clientName,
      countryCode: dataForm.clientPhoneCode.dial_code,
      phoneNumber: dataForm.clientPhone,
      smokerIndicator: dataForm.clientSmokeStatus?.key === 'S',
      birthDate: dataForm.clientDateBirth,
      gender: dataForm.clientGender?.key,
      maritalStatus:
        dataForm.clientMarriageStatus?.key == 'M'
          ? 'married'
          : dataForm.clientMarriageStatus?.key == 'M'
            ? 'single'
            : 'widowed',
      occupation: dataForm.clientJob?.nameInd,
      income: dataForm.clientIncome.key,
      homePhoneNumber: '',
      clientNumber: '',
      email: '',
      customerFlag: '',
      otherIncomePerMonth: '',
      campaignId: '',
    } as IProspectDetailLead;
    return _prospectDetailLead;
  };

  const generateExistingData = async ({
    RSQSData,
    isDoksul,
    lifeAssuredData,
    selectedProduct,
    clientIdCustomer,
  }: TUpdateExistingParams) => {
    let changeProduct = false;
    if (RSQSData?.product && !selectedProduct.includes(RSQSData?.product.key!)) {
      changeProduct = true;
    }
    let mergeData;
    const isSelf = RSQSData?.lifeAssuredSelf === 'self';
    const clientIdSelected = isSelf && RSQSData?.clientIdSelected?.length === 2
      ? RSQSData?.clientIdSelected?.slice(0, -1)
      : RSQSData?.clientIdSelected;
    const _clientId: string[] = [...clientIdSelected!];

    if (isDoksul && _clientId[0] == undefined) {
      _clientId[0] = lifeAssuredData.clientId;
      mergeData = lifeAssuredData;
    } else {
      _clientId[0] = clientIdCustomer!;
      if (_clientId[0]) lifeAssuredData.clientId = clientIdCustomer ? clientIdCustomer : _clientId[0];
      const _custometData = getCustomerStorageById(RSQSData?.clientIdSelected[0]!);
      const _tempCustomerData = _custometData ? JSON.parse(JSON.stringify(_custometData?.toJSON())) : [];
      // Condition to reset premiumPayorIncomeData when clientIncome Change to avoid bug on calculator Premi
      const _sqsData = {
        ...RSQSData?.toJSON(),
        premiumPayorIncomeData: '',
      } as ISQSDetail;
      if (_custometData?.clientIncome?.key! !== lifeAssuredData.clientIncome?.key!) {
        await onUpdateSQS(_sqsData!)
      };
      mergeData = { ..._tempCustomerData, ...lifeAssuredData };
    }
    return { mergeData, changeProduct, _clientId };
  };

  return { generateSqsAndSummaryProposal, generateLeadData, generateExistingData };
}
