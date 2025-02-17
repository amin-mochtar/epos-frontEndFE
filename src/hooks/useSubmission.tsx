import { useCallback, useMemo } from 'react';
import { Agent, CHANNEL, Client, getDisclaimerProtection, RealmISQSDetail, RealmSPAJ, TBenefitsValue, TForm, TSignature, UpfrontMapping, WR_SHARIA_CONVENT, checkMainParticipant, magnumGetCaseAnswers, magnumGetSubmitPackage, magnumStartUp, productType, ISPAJData, ISQSDetail, ISummaryProposal, ICommonObjectData, IRiskProfileAnswer, minMaxSalaryData, UpfrontDecisionModel, TSubmissionType, TPrivyData, } from '../utilities';
import { useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../redux';
import { IAdditionalForms, IProspectDetailLead, useObject, useEposRealm, IFundFactSheet } from '../database';
import { TFormDataPolicyHolder } from '../screen/espaj/spaj-policy-owner-data/spaj-policy-owner-data.type';
import { defaultFormSqsSignature, TFormSqsSignature } from '../screen/espaj/sqs-signature/sqs-signature.type';
import moment from 'moment';
import { TInsuranceAttachmentLetter } from '../screen/additional-forms/insurance-attachment-letter/insurance-attachment-letter.type';
import { TBeneficiaryCandidateInfo } from '../screen/espaj/spaj-beneficiary-candidate/spaj-beneficiary-candidate.type';
import { TWakaf } from '../screen/additional-forms/wakaf/wakaf.type';
import { TFOrmAmendment } from '../screen/espaj/spaj-amandement/spaj-amendment.type';
import { REGION_PHONE_CODE } from 'plai_common_frontend/src/utilities/phone-list.data';
import useSpajNumber from './useSpajNumber';
import useMappingBootstrap from './useBootstrapMapping';
import { useTranslation } from 'react-i18next';
import { defaultBenefitsValue } from '../screen/esqs/calculator/calculator.type';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import useUpfrontValidation from './useUpfrontValidation';
import { generatePDF, onCreateDocIllustration } from 'epos_utilities/src/newbusiness';

type TAgent = {
  agentProfile: Agent.Profile;
};
type enumType = {
  [key: string]: string
}
type FormExclusionOffering = {
  'exclustion-offering-agreement': {
    key: string;
    label: string;
  };
  'policy-holder-agreement': string;
  'e-signature': string;
  'signature-location': string;
  'signature-date': string;
};
export default function () {
  const { spajId, proposalId, spajNumber, selectedSQSId, additionalFormsId, shariaFlag, leadId } = useSelector<RootState, EposState>((state) => state.epos);
  const { agentProfile, campaignDate } = useSelector<RootState, TAgent>((state) => ({
    agentProfile: state.auth.agentProfile,
    campaignDate: state.common?.appConfigs['ID.AGENCY']?.Sales?.newbusiness?.campaignDate || undefined,
  }));
  const { getMultipleCustomer, getSummaryProposalById, getFundFactSheetDocRealm } = useEposRealm();
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const currency = allCustomerData?.[0]?.clientCurrency?.key || "IDR"
  const oneTimePayment = ['T1P', 'U17R', 'U17D'].includes(RSQSData?.product?.key!)
  const isPrucerah = ['E1O', 'E1OP'].includes(RSQSData?.product?.key!)
  const { _generateSpajNumber } = useSpajNumber();
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const summaryById = useObject<ISummaryProposal>('SummaryProposal', proposalId);
  const { getValidationUpfront } = useUpfrontValidation()
  const calculator: RealmISQSDetail.Item['calculator'] = RSQSData?.calculator ? JSON.parse(RSQSData.calculator) : {};
  const substandar: RealmISQSDetail.Item['substandar'] = RSQSData?.substandar ? JSON.parse(RSQSData.substandar) : {};
  const policyHolderAccount: RealmSPAJ.PolicyHolderAccount = RSPAJData?.policyHolderAccount
    ? JSON.parse(RSPAJData.policyHolderAccount)
    : {};
  const policyHolderDocs: RealmSPAJ.PolicyHolderDocs = RSPAJData?.policyHolderDocs
    ? JSON.parse(RSPAJData.policyHolderDocs)
    : {};
  const sqsIlustrationDocs: RealmISQSDetail.Item['ilustrationDocs'] = RSQSData?.ilustrationDocs
    ? JSON.parse(RSQSData.ilustrationDocs)
    : {};
  //additionalValidationSPAJOfferingProduct
  const fund: RealmISQSDetail.Fund[] = RSQSData?.fund ? JSON.parse(RSQSData.fund) : {};
  const fundTopup: RealmISQSDetail.Fund[] = RSQSData?.fundTopup ? JSON.parse(RSQSData.fundTopup) : {};
  const disclaimerData = RSPAJData?.policyHolderAccount
    ? JSON.parse(RSPAJData.policyHolderAccount)
    : {};

  const payorTopUp = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData?.topupPremiumPyor) : {};
  const RProspectDetail = useObject<IProspectDetailLead>('ProspectDetailLeadIntegration', summaryById?.leadId);
  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const { t } = useTranslation();
  /** this is Step 0 before to SPAJ Data
   * payload:
   * {"consequencesPolicy": {"key": "Y", "label": "Ya"},
   * "policyOwnershipInfo": {"key": "Y", "label": "Ya"},
   * "premiumPaymentCandidate": "Y",
   * "previousSpajId": "2121341213",
   * "spajApproval": {"key": "Y", "label": "Ya"}}
   */
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : {};
  /**
   * Active Policy on Step 1.5
   * insured Active
   * Additional Benefits
   */
  const activePolicy = RSPAJData?.activePolicy ? JSON.parse(RSPAJData.activePolicy) : {};

  const RSummaryProposal = getSummaryProposalById(proposalId);
  const { _mappingBootstrap } = useMappingBootstrap()

  const typeFormMapping: {
    [key: string]: {
      type: string,
      docIdConven: string,
      docIdSharia: string
    }
  } = {
    lampungForm: {
      type: 'LAMPUNG',
      docIdConven: '17060369',
      docIdSharia: '17060417',
    },
    policyBookPrintForm: {
      type: 'CETAKPOLIS',
      docIdConven: '17060466',
      docIdSharia: '17060467',
    },
    waqfInsuranceBenefits: {
      type: 'WAKAF',
      docIdConven: '14393333',
      docIdSharia: '14393333',
    },
    insuranceAttachmentLetter: {
      type: 'SKA',
      docIdConven: '17060264',
      docIdSharia: '17060419',
    },
    marketersInteraction: {
      type: 'AGENT',
      docIdConven: '17060395',
      docIdSharia: '17060395',
    },
    //docid belum dapet
    formConversion: {
      type: 'CONV',
      docIdConven: '17060395',
      docIdSharia: '17060395',
    },
    formAmend: {
      type: 'AMEND',
      docIdConven: '17060330',
      docIdSharia: '17060416'
    },
    formAmendMedical: {
      type: 'AMEND_MEDICAL',
      docIdConven: '17060412',
      docIdSharia: '17060415'
    },
    formTopUp: {
      type: 'TOPUP',
      docIdConven: '17060332',
      docIdSharia: '17060451'
    },
    // UPFRONT_LSAR,UPFRONT_ABR,UPFRONT_SUBSTANDARD_EXCLUSION
    formLSAR: {
      type: 'UPFRONT_LSAR',
      docIdConven: '17060499',
      docIdSharia: '17060499'
    },
    formABR: {
      type: 'UPFRONT_ABR',
      docIdConven: '17060498',
      docIdSharia: '17060498'
    },
    formEXCLUSION: {
      type: 'UPFRONT_SUBSTANDARD_EXCLUSION',
      docIdConven: '12011301',
      docIdSharia: '12011301'
    },
  }

  const mappingPTRole: {
    [key: string]: string
  } = {
    PP: 'PH',
    CP: 'LA',
    PK: 'PY',
    O: 'O'
  }
  const enumSurplus: enumType = {
    transferDana: 'O',
    pengembalianDana: 'T',
    donasiDana: 'C'
  }
  const netWorthList = [
    { label: '</= Rp.100 Juta', key: '2500000' },
    { label: 'Rp. 101 Juta s/d </= Rp. 500 Juta', key: '305000000' },
    { label: 'Rp. 501 Juta s/d < Rp. 1 Miliar', key: '850000000' },
    { label: 'Rp. 1 Miliar s/d < Rp. 3 Miliar', key: '2500000000' },
    { label: 'Rp. 3 Miliar s/d < Rp. 5 Miliar', key: '4500000000' },
    { label: '>/= Rp. 5 Miliar', key: '5000000000' },
  ];
  const enumNetwoth: enumType = {
    '2500000': '100000000',
    '305000000': '500000000',
    '850000000': '1000000000',
    '2500000000': '3000000000',
    '4500000000': '5000000000',
    '5000000000': '9999999999',
  }
  const tExpenses = [
    { label: '20%', key: '20' },
    { label: '30%', key: '30' },
    { label: '50%', key: '50' },
    { label: '70%', key: '70' },
  ];
  const enumSpending: enumType = {
    '20': '1',
    '30': '2',
    '50': '3',
    '70': '4'
  }
  const getSKAAttributes = (tempAdditionalForm: TInsuranceAttachmentLetter): any => {
    const data = tempAdditionalForm;
    const indexAttributes = ['A', 'B', 'C', 'D', 'E', 'F'];
    let newAttr = [
      {
        key: 'skaAnswerA',
        value: 'N'
      },
      {
        key: 'skaAnswerB',
        value: 'N'
      },
      {
        key: 'skaAnswerC',
        value: 'N'
      },
      {
        key: 'skaAnswerD',
        value: 'N'
      },
      {
        key: 'skaAnswerE',
        value: 'N'
      },
      {
        key: 'skaAnswerF',
        value: 'N'
      },
      {
        key: 'skaReasonE',
        value: ''
      },
      {
        key: 'skaReasonF',
        value: ''
      }

    ];
    if (data.mainFamilies) {
      const tempIndexAttribute = indexAttributes.findIndex((answer) => { return answer == data?.mainFamilies?.key })
      if (tempIndexAttribute != -1) {
        newAttr[tempIndexAttribute].value = 'Y';
      }
      // skaAns = data?.mainFamilies?.key;
      // skaReason = ''
    }
    if (data.otherFamiliesE && data?.reasonOtherFamiliesE) {
      newAttr[4].value = 'Y';
      newAttr[6].value = data?.reasonOtherFamiliesE;
    }
    if (data.otherFamiliesF && data?.otherFamiliesF) {
      newAttr[5].value = 'Y';
      newAttr[7].value = data?.reasonOtherFamiliesE;
    }

    return newAttr;
  }

  const getWakafAttributes = (tempAdditionalForm: TWakaf): any => {
    const data = tempAdditionalForm;
    let newAttr = [
    ];

    newAttr.push(
      {
        key: 'waqfInstitution',
        value: data?.waqfInstitution.label
      }
    )
    newAttr.push(
      {
        key: 'waqfCashValue',
        value: data.waqfCashValue
      }
    )
    newAttr.push(
      {
        key: 'donation',
        value: data.waqfDonation
      }
    )

    return newAttr;
  }

  const getDocIdConversion = () => {
    const docIdConv: {
      [key: string]: {
        FUW: string,
        GIO: string
      }
    } = {
      H10: {
        FUW: '17060610',
        GIO: '17060611'
      },
      H11: {
        FUW: '17060612',
        GIO: '17060613'
      },
      H12: {
        FUW: '17060614',
        GIO: '17060615'
      },
      H13: {
        FUW: '17060616',
        GIO: '17060617'
      }
    }
    const convDataResult = JSON.parse(RSQSData.convDataResult);
    if (convDataResult) {
      return docIdConv[convDataResult.productCode][RSQSData?.isGIO ? 'GIO' : 'FUW'];
    }
    return '17060610'
  }

  const getRemarkAmendementForm = () => {
    const tempAmend: string[] = [];
    if (RSPAJData?.amandment) {
      const amendData: TFOrmAmendment = JSON.parse(RSPAJData.amandment);
      if (amendData.fillAmendment.key == 'Y') {
        amendData.amendmentDetail.map((amendDetail: any) => {
          if (amendDetail.category.key !== 'HD') {
            tempAmend.push(amendDetail.category.label);
          }
          if (amendDetail.category.key == 'PFB') {
            tempAmend.push(amendDetail.paymentFrequency.label)
          } else {
            amendDetail.detailCategory.map((amendDetailCategory: any) => {
              tempAmend.push(amendDetailCategory.subCategory.label);
              if (amendDetailCategory.amendment) tempAmend.push(amendDetailCategory.amendment)
              else if (amendDetailCategory.birthDate) tempAmend.push(formaterDateSubmission(amendDetailCategory.birthDate))
              else if (amendDetailCategory.gender) tempAmend.push(amendDetailCategory.gender.label)
              else if (amendDetailCategory.maritalStatus) tempAmend.push(amendDetailCategory.maritalStatus.label)
            })
          }
        })
      }
    }

    return tempAmend.length > 0 ? tempAmend.join('\n\n') : ''
  }

  const getRemarksSpesificAmendForm = (amendCategoryKey: string) => {
    const tempAmend: string[] = [];
    if (RSPAJData?.amandment) {
      const amendData: TFOrmAmendment = JSON.parse(RSPAJData.amandment);
      if (amendData.fillAmendment.key == 'Y') {
        amendData.amendmentDetail.map((amendDetail: any) => {
          if (amendDetail.category.key == amendCategoryKey) {
            tempAmend.push(amendDetail.category.label);
            //ADD FREETEXT VALUE FOR MEDICAL
            if (amendDetail.category.key == 'HD') {
              tempAmend.push(amendDetail.healthData);
            }
            amendDetail.detailCategory.map((amendDetailCategory: any) => {
              tempAmend.push(amendDetailCategory.amendment);
            })
          }
        })
      }
    }

    return tempAmend.length > 0 ? tempAmend.join('\n\n') : ''
  }

  const substandardMap = useMemo(() => {
    if (getIsObjectExist(substandar)) {
      return substandar.substandard.map(({ code, type }) => {
        return {
          class: type?.key,
          code: code?.key,
          role: '01',
        };
      });
    }
    return [];
  }, [RSQSData?.substandar]);

  const calculatorMap = useMemo(() => {
    if (getIsObjectExist(calculator)) {
      return {
        backdate: calculator?.backdate.key,
        billingFrequency: oneTimePayment ? "00" : calculator?.frequencyPayment.key,
        budget: (
          Number(calculator?.regularPremium.replace(/\./g, '')) * 100
        ).toString(),
      };
    }
    return {};
  }, [calculator]);

  const agentMap = useMemo(() => {
    if (getIsObjectExist(agentProfile)) {
      return {
        number: agentProfile?.agentCode,
        name: {
          full: agentProfile?.displayName.enUs,
        },
        office: {
          code: agentProfile?.officeCode,
          name: agentProfile?.office,
        },
        unit: agentProfile?.uplineAgent.name.enUs?.displayName,
        dateOfBirth: formaterDateSubmission(agentProfile?.dob.toString()),
        contact: {
          phone: [
            {
              type: 'gsm1',
              number: agentProfile?.phone?.mobile.charAt(0) == '0' ? agentProfile?.phone?.mobile.slice(1, agentProfile?.phone?.mobile.length) : agentProfile?.phone?.mobile,
              countryCode: '62',
            }
          ],
        },
        email: agentProfile?.email,
      };
    }
    return {};
  }, [agentProfile]);

  const bankMap = useMemo(() => {
    const banks = [] as UpfrontMapping.Submission['bankAccount'];
    if (getIsObjectExist(policyHolderAccount)) {
      const mainAccount = {
        reason: 'REF',
        type: 'REFUND',
        accountName: policyHolderAccount?.accountHolder,
        accountNumber: policyHolderAccount?.accountNumber,
        bankName: policyHolderAccount?.bankName?.nameBank,
        branch: policyHolderAccount?.branch,
        city: policyHolderAccount?.city,
        code: policyHolderAccount?.bankName?.codeBank
      } as UpfrontMapping.BankAccount;
      banks.push(mainAccount);
    }
    if (calculator?.bankAccountName) {
      const secACcount = {
        reason: 'SUBSTANDARD',
        type: 'SUBSTANDARD',
        accountName: calculator?.bankAccountName,
        accountNumber: calculator?.bankAccountNumber,
        bankName: calculator?.bank?.key,
        branch: calculator?.branchBank,
        city: calculator?.branchBank,
        code: calculator?.bank?.label
      } as UpfrontMapping.BankAccount;
      banks.push(secACcount);
    }
    return banks;
  }, [calculator, RSPAJData?.policyHolderAccount]);

  const spajDocsMap = useMemo(() => {
    const MAP_DOC_SPAJ = [
      {
        name: 'KTP',
        type: 'A',
        docId: '11010201'
      },
      {
        name: 'Foto Selfie',
        type: 'I',
        docId: '17130102'
      },
      {
        name: 'MCU',
        type: 'K',
        docId: '17060468'
      },
      {
        label: 'Kartu Keluarga',
        docId: '11010207',
        type: 'G'
      },
      {
        label: 'Passport',
        docId: '11010208',
        type: 'C'

      },
      {
        label: 'KIA',
        docId: '11010203',
        type: 'F'

      },
      {
        label: 'KIMS / KITAS / KITAP',
        docId: '11010302',
        type: 'D'

      }
    ]
    if (getIsObjectExist(policyHolderDocs)) {
      return policyHolderDocs?.docPolicyholder?.map(({ document, typeDocument }) => {
        const docDetailData = MAP_DOC_SPAJ.find((data) => { return data.name === typeDocument?.key }) || {
          name: 'MCU',
          type: 'K',
          docId: '17060468'
        }
        return {
          name: `${typeDocument?.key}-document`,
          type: docDetailData.type,
          docId: docDetailData.docId,
          base64: document,
        };
      });
    }
    return [];
  }, [policyHolderDocs]);

  const isValidPrivy = (submissionType: TSubmissionType, privyData: TPrivyData) => {
    // Condition when one or more privyData exist will be return true only for submission type SU;
    const isPrivyDataValid = privyData?.privyIdPH || privyData?.privyIdLA || privyData?.privyIdPY || privyData?.privyIdTT || privyData?.privyIdAgent;
    if (submissionType === 'SU' && !isPrivyDataValid) return true;
    return false;
  }

  const ilustrationSQSMap = async (submissionType: TSubmissionType, privyData: TPrivyData) => {
    if (getIsObjectExist(sqsIlustrationDocs)) {
      let docIlustration = [
        {
          name: `ANTXXXXX-Summary`,
          type: 'pdf',
          base64: '',
        },
        {
          name: `ANTXXXXX-Standard`,
          type: 'pdf',
          base64: '',
        },
        {
          name: `ANTXXXXX-RiskProfile`,
          type: 'pdf',
          base64: '',
        },

      ]

      if (submissionType == 'PRIVY' || isValidPrivy(submissionType, privyData)) {
        const base64Data = sqsIlustrationDocs[0].document
        const dataTable = sqsIlustrationDocs[1]?.document ? JSON.parse(sqsIlustrationDocs[1]?.document) : undefined

        const docIllustration = await onCreateDocIllustration({ SQSData: RSQSData!, SPAJData: RSPAJData, allCustomerData, agentName: agentProfile?.displayName.enUs, agentCode: agentProfile.agentCode, type: 'SUBMIT', tableData: dataTable, chartImage: base64Data, campaignDate: campaignDate })
        const [pdfbase64summary, pdfbase64standar, pdfbase64rp] = await Promise.all(
          [
            await generatePDF(docIllustration[0] as TDocumentDefinitions),
            await generatePDF(docIllustration[1] as TDocumentDefinitions),
            await generatePDF(docIllustration[2] as TDocumentDefinitions)
          ]
        )

        docIlustration = [
          {
            name: `ANTXXXXX-Summary`,
            type: 'pdf',
            base64: `data:application/pdf;base64,${pdfbase64summary}`,
          },
          {
            name: `ANTXXXXX-Standard`,
            type: 'pdf',
            base64: `data:application/pdf;base64,${pdfbase64standar}`,
          },
          {
            name: `ANTXXXXX-RiskProfile`,
            type: 'pdf',
            base64: `data:application/pdf;base64,${pdfbase64rp}`,
          },

        ]
      }

      return docIlustration;
    }
    return [];
  };

  const additionalInsuranceMap = useMemo(() => {
    let defaultAdditionalInsurance = {
      prefix: 'PRU',
      desc: '',
      planType: '',
      type: '',
      saver: '',
      age: ''
    }

    const calculateData = JSON.parse(RSQSData?.calculator!);
    let additionalData = RSQSData?.additionalBenefits;
    let dataBenefits = calculateData.benefits;
    if (productType(RSQSData?.product?.key) == 'TRD') {
      additionalData = RSQSData?.mainAdditionalBenefits;
      dataBenefits = calculateData.mainBenefits;
    }
    const productPiloting = ["H15", "H14", "U12", "U13"]
    additionalData?.map((data: ICommonObjectData) => {
      defaultAdditionalInsurance.desc = data.label!.replace('PRU', '');
      defaultAdditionalInsurance.planType = dataBenefits[0].planRider.label!;
      defaultAdditionalInsurance.type = dataBenefits[0].planRider.key!;
      defaultAdditionalInsurance.saver = productPiloting.includes(RSQSData?.product?.key!) ? dataBenefits[0].saverRider.key == 'Tidak dipilih' ? 'Tidak' : 'Ya' : "Tidak";
      defaultAdditionalInsurance.age = dataBenefits[0].periodRider.label!;
    })
    return defaultAdditionalInsurance
  }, [RSQSData?.additionalBenefits, RSQSData?.calculator])

  const mappingOtherInfo = useMemo(() => {
    const mainParticipant = checkMainParticipant(RSummaryProposal?.productCode!, RSQSData?.policyType!);
    const deepCloneConfirmationSQS = JSON.parse(JSON.stringify(confirmationSQS));
    const otherInfo = [];

    // policyOwnershipInfo
    otherInfo.push({
      answ: deepCloneConfirmationSQS.policyOwnershipInfo?.key == 'Y' ? 'TRUE' : 'FALSE',
      quest: t('Epos:question_for_insurance_ownership', { companyName: wording.companyName, spaj: wording?.spaj, day: '365' }),
      bo_mapping: '1'
    });

    // consequencesPolicy
    otherInfo.push({
      answ: deepCloneConfirmationSQS.consequencesPolicy?.key == 'Y' ? 'TRUE' : 'FALSE',
      quest: t('Epos:consequences_as_stipulated_in_the_policy', { spaj: wording.spaj }),
      bo_mapping: '2'
    })

    // spajApproval
    otherInfo.push({
      answ: deepCloneConfirmationSQS.spajApproval?.key == 'Y' ? 'TRUE' : 'FALSE',
      quest: t('Epos:approval_of_spaj',
        { spaj: `SPAJ ${wording.additionalLabel}`, label: mainParticipant }),
      bo_mapping: '3'
    })

    return {
      other_Info: otherInfo,
      previousSubmissionId: deepCloneConfirmationSQS.previousSpajId
    };

  }, []);
  /**
   * Mapping xIns for lifeAss
   * Additional on Step 1.5
   * @return xIns mapping [{name, type, substandard,curr,sar, benefit, ces_date}]
  */
  const mappingAdditionalInsuredBenefits = useMemo(() => {
    // const dummy = {
    //   "haveOtherInsurance": { "key": "Y", "label": "Ya" },
    //   "insuredDetail": [{
    //     "insuredBenefit": { "label": "Meninggal", "key": "D" },
    //     "otherInsuranceBenefite": "",
    //     "company": "ffdsafdsafdasdasf",
    //     "currency": { "title": "IDR", "key": "IDR" },
    //     "sumInsured": "2.100.000",
    //     "substandard": { "key": "Y", "label": "Ya" }
    //   },
    //   {
    //     "insuredBenefit": { "label": "Kondisi Penyakit Kritis", "key": "CIC" },
    //     "otherInsuranceBenefite": "", "company": "fdsafdsafddfas",
    //     "currency": { "title": "USD", "key": "USD" },
    //     "sumInsured": "300",
    //     "substandard": { "key": "N", "label": "Tidak" }
    //   }]
    // }

    const deepCloneActivePolicy = JSON.parse(JSON.stringify(activePolicy));
    const xIns: any[] = [];
    deepCloneActivePolicy?.insuredDetail?.map((activePolicy: any) => {
      xIns.push({
        "name": "",
        "type": activePolicy.insuredBenefit.label || "",
        "substandard": activePolicy.substandard.key || "",
        "curr": activePolicy.currency.title || "IDR",
        "sar": activePolicy.sumInsured || "0",
        "benefit": [],
        "ces_date": ""
      })
    })

    return xIns;
  }, [])

  const productMap = useMemo(() => {
    if (!getIsObjectExist(RSQSData?.product)) return {};

    const getSumInsured = (sar: string) => {
      if (sar) {
        return (Number(sar.replace(/\./g, '')) * 100).toString();
      }
      return '0';
    };

    const mapFundData = (fundData: any) =>
      fundData?.map(({ type, percent, type_fund, desc_fund }: any) => ({
        code: type,
        name: desc_fund,
        allocation: String(percent),
        type: type_fund,
      })) || [];

    const mapCoverage = (role: string, code: string, name: string, attributes: any) => ({
      role,
      code: code || '',
      name: name || '',
      coverageAttributes: attributes,
    });

    const getCoverageAttributes = ({ periodKey, sar, premium, premKey }: any) => {
      const defaults = {
        riskAge: periodKey || '99',
        riskTerm: '00',
        sar: sar || '',
        premium: premium || '0',
        premAge: premKey || '99',
        premTerm: '00',
      };

      // product variant rule mapping (if necessary ya)
      const productRules: Record<string, Partial<typeof defaults>> = {
        E1O: {
          riskAge: '00',
          riskTerm: String(calculator?.educationBenefitPeriod?.key),
          premAge: '00',
          premTerm: String(calculator?.contributionPaymentPeriod?.key),
        },
        E1OP: {
          riskAge: '00',
          riskTerm: String(calculator?.educationBenefitPeriod?.key),
          premAge: '00',
          premTerm: String(calculator?.contributionPaymentPeriod?.key),
        },
        L1Q: {
          riskAge: '120',
          riskTerm: "00",
          premAge: '00',
          premTerm: String(calculator?.paymentPeriod?.key.length === 1 ? `0${calculator.paymentPeriod.key}` : calculator.paymentPeriod.key),
        },
        T1Q: {
          riskAge: '88',
          riskTerm: "00",
          premAge: '00',
          premTerm: String(calculator?.paymentPeriod?.key.length === 1 ? `0${calculator.paymentPeriod.key}` : calculator.paymentPeriod.key),
        },
        T1P: {
          riskAge: '88',
          riskTerm: "00",
          premAge: '00',
          premTerm: "01",
        }
      };

      const rules = RSQSData?.product?.key ? productRules[RSQSData?.product?.key] : {};

      return [
        { key: 'riskAge', value: rules?.riskAge || defaults.riskAge },
        { key: 'riskTerm', value: rules?.riskTerm || defaults.riskTerm },
        { key: 'sar', value: rules?.sar || sar || defaults.sar },
        { key: 'premium', value: rules?.premium || premium || defaults.premium },
        { key: 'premAge', value: rules?.premAge || premKey || defaults.premAge },
        { key: 'premTerm', value: rules?.premTerm || defaults.premTerm },
      ];
    };

    const topupBenefits = calculator?.topupBenefits?.[0];
    const benefits = calculator?.benefits?.[0] || defaultBenefitsValue;

    const coverages = RSQSData?.mainAdditionalBenefits?.map((benefit: any, index: number) => {
      return mapCoverage(
        index === 0 ? '01' : '02',
        benefit?.key ?? '',
        benefit?.label ?? '',
        getCoverageAttributes({
          periodKey: calculator?.mainBenefits?.[0]?.periodInsured?.key,
          sar: getSumInsured(
            calculator?.mainBenefits?.[0]?.sumInsured || calculator?.mainBenefits?.[0]?.roomRider?.key,
          ),
          premium: getSumInsured(calculator?.regularPremium),
          premKey: calculator?.mainBenefits?.[0]?.periodInsured?.key,
        }),
      );
    });

    // hardcode prucerah * will be moved to sqs initialize in future
    let periodPlan = calculator?.mainBenefits?.[0]?.periodInsured?.key || '99'
    let fundData = mapFundData(fund)

    if (isPrucerah) {
      periodPlan = String(calculator?.contributionPaymentPeriod?.key)
      const fundPrucerah = [{
        type_fund: "moderat",
        type: "PRMF",
        desc_fund: "PRUlink Rupiah Managed Fund",
        percent: 100
      }]

      fundData = mapFundData(fundPrucerah)
    }

    let productCode = RSQSData?.product?.key;

    if (isPrucerah && productCode?.length === 4) {
      productCode = productCode.slice(0, 3);
    }

    if (RSQSData?.product?.key === "L1Q" && coverages?.length) {
      coverages.push({
        code: "W13R",
        role: "01",
        name: "Waiver PRUAnugerah Syariah",
        coverageAttributes: [
          {
            key: "riskAge",
            value: "120"
          },
          {
            key: "riskTerm",
            value: "00"
          },
          {
            key: "sar",
            value: "00"
          },
          {
            key: "premium",
            value: "00"
          },
          {
            key: "premAge",
            value: "99"
          },
          {
            key: "premTerm",
            value: "00"
          }
        ]
      })
    }

    const productTempMapping = {
      name: RSQSData?.product?.label,
      code: productCode,
      currency: currency,
      type: RSQSData?.product?.key ? CHANNEL[RSQSData?.product?.key]?.productCategory : 'TRD',
      principleType: RSQSData?.policyType.toUpperCase(),
      totalPremi: getSumInsured(calculator?.regularPremium),
      periodPlan: oneTimePayment ? "01" : String(calculator?.mainBenefits?.[0]?.periodInsured?.key || 99),
      coverage: coverages ?? [],
      fund: fundData,
      fundTopUp: mapFundData(fundTopup),
      additionalInsurance: additionalInsuranceMap,
    };

    // handle additional benefits
    if (RSQSData?.additionalBenefits && RSQSData?.additionalBenefits?.length > 0) {
      productTempMapping.coverage.push(
        mapCoverage(
          '01',
          RSQSData?.additionalBenefits?.[0]?.key,
          RSQSData?.additionalBenefits?.[0]?.label ?? '',
          getCoverageAttributes({
            periodKey: benefits?.periodRider?.key,
            sar: (Number(benefits?.roomRider?.key) * 100).toString(),
            premium: getSumInsured(calculator?.regularPremium),
            premKey: benefits?.periodRider?.key,
          }),
        ),
      );
    }

    // handle top-up additional benefits
    if (RSQSData?.topupAdditionalBenefits && RSQSData?.topupAdditionalBenefits?.length > 0) {
      const premiSaverBerkala = Math.round(
        Number(topupBenefits?.regularTopupPremium?.replace(/\./g, '')) / Number(calculator?.frequencyPayment?.key),
      )
        .toFixed(2)
        .toString();

      if (topupBenefits?.regularTopupPremium && topupBenefits?.regularTopupPremium !== '0') {
        productTempMapping.coverage.push(
          mapCoverage(
            '01',
            RSQSData?.topupAdditionalBenefits?.[0]?.key,
            RSQSData?.topupAdditionalBenefits?.[0]?.label ?? '',
            getCoverageAttributes({
              periodKey: calculator?.mainBenefits?.[0]?.periodInsured?.key,
              premium: getSumInsured(premiSaverBerkala),
            }),
          ),
        );
      }
    }

    return productTempMapping;
  }, [
    RSQSData?.product,
    RSQSData?.policyType,
    RSQSData?.mainAdditionalBenefits,
    RSQSData?.topupAdditionalBenefits,
    RSQSData?.additionalBenefits,
    fund,
    fundTopup,
    calculator,
  ]);

  const isTypeTax = useMemo(() => (clientPH: TFormDataPolicyHolder, typeTax: string) => {
    const clientTax = clientPH.clientTaxDomicileStatus;

    // Example for data tax
    // const clientTaxDomicileStatus = [
    //   {
    //     "key": "TOI",
    //     "label": "Memiliki domisili pajak selain di Indonesia"
    //   },
    //   {
    //     "key": "IT",
    //     "label": "Wajib pajak Indonesia"
    //   },
    //   {
    //     "key": "TUS",
    //     "label": "Melakukan pelaporan pajak di Amerika Serikat"
    //   }
    // ],

    const isOther = clientTax.findIndex(tax => tax.key === typeTax);
    return isOther != -1;
  }, [])

  const vulnerableMapping = (vulnerableData: any) => {
    let vulnerableObj = {};
    vulnerableData.vulnerableCustomerPrimary.map((val: any, index: number) => {
      const propName = `vulnerable${index + 1}Desc`;
      let tempSubVulnarble: string[] = []
      let vulnarableLable = `${val.label}`
      vulnerableData.vulnerableCustomerSub[val.key].map((subVal: any) => {
        tempSubVulnarble.push(subVal.label)
      })
      if (tempSubVulnarble.length > 0) {
        vulnarableLable += ' : '
      }
      vulnerableObj = {
        ...vulnerableObj,
        ...{ [propName]: `${vulnarableLable}${tempSubVulnarble.join(', ')}` }
      }
    })

    return vulnerableObj;
  }

  const custStaffRealtionMapping = (clientData: TFormDataPolicyHolder) => {
    let relationObj = {}
    let tempRelation2 = '';
    if (clientData.clientValidationIsEmployee?.key == 'Y1') {
      tempRelation2 = clientData.clientValidationRelationStatus?.label;
      if (clientData.clientValidationRelationStatus?.key == 'L') {
        tempRelation2 = clientData.clientValidationRelationStatusAdditional as string;
      }
    }

    let tempRelation3 = '';
    if (['Y1', 'Y2'].includes(clientData.clientValidationIsEmployee?.key)) {
      tempRelation3 = `${clientData.clientEmployeeName} dan ${clientData.clientEmployeeNIK}`
    }

    relationObj = {
      ...relationObj,
      relationshipEmployee1: clientData.clientValidationIsEmployee?.label,
      relationshipEmployee2: tempRelation2,
      relationshipEmployee3: tempRelation3
    }

    return relationObj;
  }

  const clientMap = useMemo(() => {
    const clientData: any[] = [];

    const vulnerbleCust = JSON.parse(RSQSData?.additionalValidationPolicyInformation!);
    const vulnerbleCustDetail = JSON.parse(RSQSData?.vulnerablityCustomer!);

    //PH
    if (RSPAJData?.policyHolderData) {
      const clientPHData: TFormDataPolicyHolder = JSON.parse(RSPAJData.policyHolderData);
      const clientCompanyLocationPH = clientPHData.clientCompanyLocation;
      const clientResidenceLocationPH = clientPHData.clientResidenceLocation;
      const clientOtherResidenceLocationPH = clientPHData.clientOtherResidenceLocation;

      const enumMonthlySpending = {
        '20': 'A',
        '30': 'B',
        '50': 'C',
        '70': 'D',

      }
      const monthlySpending = {
        code: enumMonthlySpending[allCustomerData[0].clientExpenses.key],
        label: allCustomerData[0].clientExpenses.label,
        value: allCustomerData[0].clientExpenses.key
      }
      let tempClientPH: any = {
        id: RSQSData?.clientIdSelected[0],
        name: {
          full: clientPHData.clientName
        },
        placeOfBirth: clientPHData.clientCityBirth,
        dateOfBirth: formaterDateSubmission(clientPHData.clientDateBirth),
        countryOfBirth: clientPHData.clientCountryBirth.code,
        descCountryOfBirth: clientPHData.clientCountryBirth.name,
        identification: [
          {
            type: 'KTP',
            number: clientPHData.clientIdCardNumber,
            expiryDate: formaterDateSubmission(clientPHData.clientMassValidUntil)
          }
        ],
        smokeStatus: allCustomerData[0]?.clientSmokeStatus?.key,
        nationality: clientPHData.clientCivics.code,
        descNationality: clientPHData.clientCivics.name,
        gender: clientPHData.clientGender.key,
        maritalStatus: clientPHData.clientMaritalStatus.key,
        descMaritalStatus: clientPHData.clientMaritalStatus.label,
        religion: clientPHData.clientReligion.label,
        education: clientPHData.clientLastEducation.key,
        descEducation: clientPHData.clientLastEducation.label,
        taxpayer: {
          type: isTypeTax(clientPHData, 'IT') ? 'NPWP' : '',
          number: clientPHData.ClientNpwpNumber || "",
          reason: clientPHData.clientAsideFromNpwp?.label || "",
          name: clientPHData.clientNpwpHolder || "",
          otherTax: isTypeTax(clientPHData, 'TOI'),
          usTax: isTypeTax(clientPHData, 'TUS')
        },
        occupation: {
          code: clientPHData.clientJob.code,
          desc: clientPHData.clientJob.nameInd,
          classOccupation: clientPHData.clientJob.clazz,
          companyName: clientPHData.clientCompanyName,
          address: {
            type: 'OF',
            line1: clientPHData.clientCompanyAddress,
            line2: '',
            line3: '',
            rt: clientPHData.clientCompanyNeighbourhood1,
            rw: clientPHData.clientCompanyNeighbourhood2,
            km: clientPHData.clientCompanyKilometer,
            kelurahan: clientPHData.clientCompanyUrbanVillage,
            kecamatan: clientPHData.clientCompanyDistrict,
            city: clientPHData.clientCompanyCity,
            province: clientPHData.clientCompanyProvice?.key,
            descProvince: clientPHData.clientCompanyProvice?.label,
            postalCode: clientPHData.clientCompanyPostCode,
            country: clientCompanyLocationPH?.key === 'AB' ? clientPHData.clientCompanyAbroad?.code : clientCompanyLocationPH?.key,
            descCountry: clientCompanyLocationPH?.key === 'AB' ? clientPHData.clientCompanyAbroad?.name : clientCompanyLocationPH?.title
          }
        },
        contact: {
          phone: [],
          fax: ''
        },
        address: [],
        motherName: clientPHData.clientMotherVirginName,
        email: clientPHData.clientEmail,
        income: [{
          frequency: 'bulan',
          amount: minMaxSalaryData[clientPHData.clientIncome.key].max,
          amountCode: clientPHData.clientIncome.key,
          amountDesc: clientPHData.clientIncome.label,
          source:
            clientPHData.clientSourceIncome.map(({ key, label }) => ({
              code: key,
              desc: label,
            })) || []
        }
        ],
        staffRelation: clientPHData.clientValidationIsEmployee.key,
        networth: enumNetwoth[clientPHData.clientNetWorth?.key],
        networthRangeDesc: clientPHData.clientNetWorth?.label,
        type: 'person',
        role: 'PH',
        relation: '',
        benefitAllocation: 0,
        totalMonthlySpending: monthlySpending,
        declaration: {
          hasSensoryDisabilityDesc: vulnerbleCust.disabilityCategoryStatus.key,
          ...custStaffRealtionMapping(clientPHData),
          ...vulnerableMapping(vulnerbleCustDetail)
        },
        niasCorrespondence: {
          hasAnotherAddress: clientPHData?.clientResidenceAnotherAddress?.key,
          biggerArea: clientPHData?.clientResidenceRegion?.label
        },
      };

      tempClientPH.address?.push({
        type: 'H',
        line1: clientPHData.clientResidenceAdress,
        line2: '',
        line3: '',
        rt: clientPHData.clientResidenceNeighbourdhood1,
        rw: clientPHData.clientResidenceNeighbourdhood2,
        km: clientPHData.clientResideceKilometer,
        kelurahan: clientPHData.clientResidenceUrbanVillage,
        kecamatan: clientPHData.clientResidenceDistrict,
        city: clientPHData.clientResidenceCity,
        province: clientPHData.clientResidenceProvince.key,
        descProvince: clientPHData.clientResidenceProvince.label,
        postalCode: clientPHData.clientResidencePostCode,
        country: clientResidenceLocationPH?.key === 'AB' ? clientPHData.clientResidenceAbroad?.code : clientResidenceLocationPH.key,
        descCountry: clientResidenceLocationPH?.key === 'AB' ? clientPHData.clientResidenceAbroad?.name : clientResidenceLocationPH.title
      })

      if (clientPHData.clientResidenceMailingAddress.key == 'H') {
        tempClientPH.address?.push({
          ...tempClientPH.address[0],
          type: 'O'
        })
      } else if (clientPHData.clientResidenceMailingAddress.key == 'O') {
        tempClientPH.address?.push({
          ...tempClientPH.occupation.address,
          type: 'O'
        })
      } else {
        if (clientPHData.clientOtherResidenceAdress) {
          tempClientPH.address?.push({
            type: 'O',
            line1: clientPHData.clientOtherResidenceAdress,
            line2: '',
            line3: '',
            rt: clientPHData.clientOtherResidenceNeighbourdhood1,
            rw: clientPHData.clientOtherResidenceNeighbourdhood2,
            km: clientPHData.clientResideceKilometer,
            kelurahan: clientPHData.clientOtherResidenceUrbanVillage,
            kecamatan: clientPHData.clientOtherResidenceDistrict,
            city: clientPHData.clientOtherResidenceCity,
            province: clientPHData.clientOtherResidenceProvince.key,
            descProvince: clientPHData.clientOtherResidenceProvince.label,
            postalCode: clientPHData.clientOtherResidencePostCode,
            country: clientOtherResidenceLocationPH?.key === 'AB' ? clientPHData.clientOtherResidenceAbroad.code : clientOtherResidenceLocationPH.key,
            descCountry: clientOtherResidenceLocationPH?.key === 'AB' ? clientPHData.clientOtherResidenceAbroad.name : clientOtherResidenceLocationPH.title
          })
        }
      }
      typeof clientPHData.clientCompanyPhones != 'string' && clientPHData.clientCompanyPhones?.map((contactData, index) => {
        tempClientPH.contact.phone.push({
          "type": `office${index + 1}`,
          "number": contactData.clientCompanyPhone ? contactData.clientCompanyPhoneCode.dial_code.replace('+', '') + contactData.clientCompanyPhone : '',
          "countryCode": contactData.clientCompanyPhoneCode.dial_code.replace('+', '')
        })
      })
      clientPHData.clientResidencePhoneCells?.map((contactData, index) => {
        tempClientPH.contact.phone.push({
          "type": `gsm${index + 1}`,
          "number": contactData.clientResidencePhoneCellCode.dial_code.replace('+', '') + contactData.clientResidencePhoneCell,
          "countryCode": contactData.clientResidencePhoneCellCode.dial_code.replace('+', '')
        })
      })
      clientPHData.clientResidencePhoneNumbers.map((contactData, index) => {
        if (contactData.clientResidencePhoneNumber) {
          tempClientPH.contact.phone.push({
            "type": `home${index + 1}`,
            "number": contactData.clientResidencePhoneNumber ? contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '') + contactData.clientResidencePhoneNumber : '',
            "countryCode": contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '')
          })
        }
      })

      tempClientPH.otherInfo = mappingOtherInfo.other_Info;

      clientData.push(tempClientPH)

    }

    //LA
    if (RSPAJData?.primaryInsured) {
      const clientLAData: TFormDataPolicyHolder = JSON.parse(RSPAJData.primaryInsured);
      const clientCompanyLocationLA = clientLAData.clientCompanyLocation;
      const clientResidenceLocationLA = clientLAData.clientResidenceLocation;

      let tempClientLA: any = {
        name: {
          full: clientLAData.clientName
        },
        relation: clientLAData.clientPolicyHolder?.key,
        descRelation: clientLAData.clientPolicyHolder?.label,
        placeOfBirth: clientLAData.clientCityBirth,
        dateOfBirth: formaterDateSubmission(clientLAData.clientDateBirth),
        countryOfBirth: clientLAData.clientCountryBirth.code,
        descCountryOfBirth: clientLAData.clientCountryBirth.name,
        identification: [
          {
            type: 'KTP',
            number: clientLAData.clientIdCardNumber,
            expiryDate: formaterDateSubmission(clientLAData.clientMassValidUntil)
          }
        ],
        smokeStatus: allCustomerData[1]?.clientSmokeStatus?.key,
        nationality: clientLAData.clientCivics.code,
        descNationality: clientLAData.clientCivics.name,
        gender: clientLAData.clientGender.key,
        maritalStatus: clientLAData.clientMaritalStatus.key,
        descMaritalStatus: clientLAData.clientMaritalStatus.label,
        religion: clientLAData.clientReligion.label,
        education: clientLAData.clientLastEducation.key,
        descEducation: clientLAData.clientLastEducation.label,
        taxpayer: {
          type: 'NPWP',
          number: clientLAData.ClientNpwpNumber,
          reason: clientLAData.clientAsideFromNpwp?.label || "",
          name: clientLAData.clientNpwpHolder
        },
        occupation: {
          code: clientLAData.clientJob.code,
          desc: clientLAData.clientJob.nameInd,
          classOccupation: clientLAData.clientJob.clazz,
          companyName: clientLAData.clientCompanyName,
          address: {
            type: 'OF',
            line1: clientLAData.clientCompanyAddress!,
            line2: '',
            line3: '',
            rt: clientLAData.clientCompanyNeighbourhood1,
            rw: clientLAData.clientCompanyNeighbourhood2,
            km: clientLAData.clientCompanyKilometer,
            kelurahan: clientLAData.clientCompanyUrbanVillage,
            kecamatan: clientLAData.clientCompanyDistrict,
            city: clientLAData.clientCompanyCity,
            province: clientLAData.clientCompanyProvice?.key || '',
            descProvince: clientLAData.clientCompanyProvice?.label || '',
            postalCode: clientLAData.clientCompanyPostCode,
            country: clientCompanyLocationLA?.key === 'AB' ? clientLAData.clientCompanyAbroad?.code : clientCompanyLocationLA?.key || '',
            descCountry: clientCompanyLocationLA?.key === 'AB' ? clientLAData.clientCompanyAbroad?.name : clientCompanyLocationLA?.title || ''
          }
        },
        contact: {
          phone: [],
          fax: ''
        },
        address: [],
        motherName: '',
        email: clientLAData.clientEmail,
        networth: '',
        networthRangeDesc: '',
        income: [
          {
            frequency: 'bulan',
            amount: minMaxSalaryData[clientLAData.clientIncome.key]?.max ?? '',
            amountCode: clientLAData.clientIncome.key,
            amountDesc: clientLAData.clientIncome.label,
            source:
              clientLAData.clientSourceIncome.map(({ key, label }) => ({
                code: key,
                desc: label,
              })) || []
          }
        ],
        type: 'person',
        role: 'LA',
        benefitAllocation: 0,
        activePolicy: [],
        niasCorrespondence: {
          hasAnotherAddress: clientLAData?.clientResidenceAnotherAddress?.key,
          biggerArea: clientLAData?.clientResidenceRegion?.label
        },
        declaration: {
          ...custStaffRealtionMapping(clientLAData)
        }
      };
      tempClientLA.address?.push({
        type: 'H',
        line1: clientLAData.clientResidenceAdress,
        line2: '',
        line3: '',
        rt: clientLAData.clientResidenceNeighbourdhood1,
        rw: clientLAData.clientResidenceNeighbourdhood2,
        km: clientLAData.clientResideceKilometer,
        kelurahan: clientLAData.clientResidenceUrbanVillage,
        kecamatan: clientLAData.clientResidenceDistrict,
        city: clientLAData.clientResidenceCity,
        province: clientLAData.clientResidenceProvince.key,
        descProvince: clientLAData.clientResidenceProvince.label,
        postalCode: clientLAData.clientResidencePostCode,
        country: clientResidenceLocationLA?.key === 'AB' ? clientLAData.clientResidenceAbroad?.code : clientResidenceLocationLA?.key,
        descCountry: clientResidenceLocationLA?.key === 'AB' ? clientLAData.clientResidenceAbroad?.name : clientResidenceLocationLA?.title,
      })
      typeof clientLAData.clientCompanyPhones != 'string' && clientLAData.clientCompanyPhones?.map((contactData, index) => {
        tempClientLA.contact?.phone.push({
          "type": `office${index + 1}`,
          "number": contactData?.clientCompanyPhone ? contactData?.clientCompanyPhoneCode?.dial_code.replace('+', '') + contactData?.clientCompanyPhone : '',
          "countryCode": contactData?.clientCompanyPhoneCode?.dial_code.replace('+', '')
        })
      })
      clientLAData.clientResidencePhoneCells?.map((contactData, index) => {

        tempClientLA.contact?.phone.push({
          "type": `gsm${index + 1}`,
          "number": contactData.clientResidencePhoneCellCode.dial_code.replace('+', '') + contactData.clientResidencePhoneCell,
          "countryCode": contactData.clientResidencePhoneCellCode.dial_code.replace('+', '')
        })
      })
      clientLAData.clientResidencePhoneNumbers.map((contactData, index) => {
        if (contactData.clientResidencePhoneNumber) {
          tempClientLA.contact?.phone.push({
            "type": `home${index + 1}`,
            "number": contactData.clientResidencePhoneNumber ? contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '') + contactData.clientResidencePhoneNumber : '',
            "countryCode": contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '')
          })
        }
      })

      tempClientLA.activePolicy = mappingAdditionalInsuredBenefits;

      clientData.push(tempClientLA)

    }

    //TT
    if (RSPAJData?.additionalInsured) {
      const clientTTData: TFormDataPolicyHolder = JSON.parse(RSPAJData.additionalInsured);
      const clientCompanyLocationTT = clientTTData.clientCompanyLocation;
      const clientResidenceLocationTT = clientTTData.clientResidenceLocation;

      const tempClientTT: any = {
        name: {
          full: clientTTData.clientName,
        },
        relation: clientTTData.clientPolicyHolder?.key,
        descRelation: clientTTData.clientPolicyHolder?.label,
        placeOfBirth: clientTTData.clientCityBirth,
        dateOfBirth: formaterDateSubmission(clientTTData.clientDateBirth),
        countryOfBirth: clientTTData.clientCountryBirth.code,
        descCountryOfBirth: clientTTData.clientCountryBirth.name,
        identification: [
          {
            type: 'KTP',
            number: clientTTData.clientIdCardNumber,
            expiryDate: formaterDateSubmission(clientTTData.clientMassValidUntil),
          },
        ],
        smokeStatus: allCustomerData[1]?.clientSmokeStatus?.key,
        nationality: clientTTData.clientCivics.code,
        descNationality: clientTTData.clientCivics.name,
        gender: clientTTData.clientGender.key,
        maritalStatus: clientTTData.clientMaritalStatus.key,
        descMaritalStatus: clientTTData.clientMaritalStatus.label,
        religion: clientTTData.clientReligion.label,
        education: clientTTData.clientLastEducation.key,
        descEducation: clientTTData.clientLastEducation.label,
        taxpayer: {
          type: 'NPWP',
          number: clientTTData.ClientNpwpNumber,
          reason: clientTTData.clientAsideFromNpwp?.label || '',
          name: clientTTData.clientNpwpHolder,
        },
        occupation: {
          code: clientTTData.clientJob?.code,
          desc: clientTTData.clientJob?.nameInd,
          classOccupation: clientTTData.clientJob?.clazz,
          companyName: clientTTData.clientCompanyName,
          address: {
            type: 'OF',
            line1: clientTTData.clientCompanyAddress!,
            line2: '',
            line3: '',
            rt: clientTTData.clientCompanyNeighbourhood1,
            rw: clientTTData.clientCompanyNeighbourhood2,
            km: clientTTData.clientCompanyKilometer,
            kelurahan: clientTTData.clientCompanyUrbanVillage,
            kecamatan: clientTTData.clientCompanyDistrict,
            city: clientTTData.clientCompanyCity,
            province: clientTTData.clientCompanyProvice?.key || '',
            descProvince: clientTTData.clientCompanyProvice?.label || '',
            postalCode: clientTTData.clientCompanyPostCode,
            country: clientCompanyLocationTT?.key === 'AB' ? clientTTData.clientCompanyAbroad?.code : clientCompanyLocationTT?.key || '',
            descCountry: clientCompanyLocationTT?.key === 'AB' ? clientTTData.clientCompanyAbroad?.name : clientCompanyLocationTT?.title || '',
          },
        },
        contact: {
          phone: [],
          fax: '',
        },
        address: [],
        motherName: '',
        email: clientTTData.clientEmail,
        networth: '',
        networthRangeDesc: '',
        income: [
          {
            frequency: 'bulan',
            amount: minMaxSalaryData[clientTTData?.clientIncome?.key]?.max ?? '',
            amountCode: clientTTData.clientIncome.key,
            amountDesc: clientTTData.clientIncome.label,
            source:
              clientTTData.clientSourceIncome.map(({ key, label }) => ({
                code: key,
                desc: label,
              })) || [],
          },
        ],
        type: 'person',
        role: 'TT',
        benefitAllocation: 0,
        activePolicy: [],
        niasCorrespondence: {
          hasAnotherAddress: clientTTData?.clientResidenceAnotherAddress?.key,
          biggerArea: clientTTData?.clientResidenceRegion?.label,
        },
        declaration: {
          ...custStaffRealtionMapping(clientTTData),
        },
      };
      tempClientTT.address?.push({
        type: 'H',
        line1: clientTTData.clientResidenceAdress,
        line2: '',
        line3: '',
        rt: clientTTData.clientResidenceNeighbourdhood1,
        rw: clientTTData.clientResidenceNeighbourdhood2,
        km: clientTTData.clientResideceKilometer,
        kelurahan: clientTTData.clientResidenceUrbanVillage,
        kecamatan: clientTTData.clientResidenceDistrict,
        city: clientTTData.clientResidenceCity,
        province: clientTTData?.clientResidenceProvince?.key ?? '',
        descProvince: clientTTData?.clientResidenceProvince?.label ?? '',
        postalCode: clientTTData?.clientResidencePostCode ?? '',
        country: clientResidenceLocationTT?.key === 'AB' ? clientTTData.clientResidenceAbroad?.code : clientResidenceLocationTT?.key ?? '',
        descCountry: clientResidenceLocationTT?.key === 'AB' ? clientTTData.clientResidenceAbroad?.name : clientResidenceLocationTT?.title ?? '',
      });
      typeof clientTTData.clientCompanyPhones != 'string' &&
        clientTTData.clientCompanyPhones?.map((contactData, index) => {
          tempClientTT.contact?.phone.push({
            type: `office${index + 1}`,
            number: contactData?.clientCompanyPhone
              ? contactData?.clientCompanyPhoneCode?.dial_code.replace('+', '') + contactData?.clientCompanyPhone
              : '',
            countryCode: contactData?.clientCompanyPhoneCode?.dial_code.replace('+', ''),
          });
        });
      clientTTData.clientResidencePhoneCells?.map((contactData, index) => {
        tempClientTT.contact?.phone.push({
          type: `gsm${index + 1}`,
          number:
            contactData.clientResidencePhoneCellCode.dial_code.replace('+', '') + contactData.clientResidencePhoneCell,
          countryCode: contactData.clientResidencePhoneCellCode.dial_code.replace('+', ''),
        });
      });
      clientTTData.clientResidencePhoneNumbers.map((contactData, index) => {
        if (contactData.clientResidencePhoneNumber) {
          tempClientTT.contact?.phone.push({
            type: `home${index + 1}`,
            number: contactData?.clientResidencePhoneNumber
              ? contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '') +
              contactData.clientResidencePhoneNumber
              : '',
            countryCode: contactData.clientResidencePhoneNumberCode.dial_code.replace('+', ''),
          });
        }
      });

      tempClientTT.activePolicy = mappingAdditionalInsuredBenefits;

      clientData.push(tempClientTT);
    }


    //TT
    if (RSPAJData?.additionalInsured) {
      const clientTTData: TFormDataPolicyHolder = JSON.parse(RSPAJData.additionalInsured);
      const tempClientTT: any = {
        name: {
          full: clientTTData.clientName,
        },
        relation: clientTTData.clientPolicyHolder?.key,
        descRelation: clientTTData.clientPolicyHolder?.label,
        placeOfBirth: clientTTData.clientCityBirth,
        dateOfBirth: formaterDateSubmission(clientTTData.clientDateBirth),
        countryOfBirth: clientTTData.clientCountryBirth.code,
        descCountryOfBirth: clientTTData.clientCountryBirth.name,
        identification: [
          {
            type: 'KTP',
            number: clientTTData.clientIdCardNumber,
            expiryDate: formaterDateSubmission(clientTTData.clientMassValidUntil),
          },
        ],
        smokeStatus: allCustomerData[1]?.clientSmokeStatus?.key,
        nationality: clientTTData.clientCivics.code,
        descNationality: clientTTData.clientCivics.name,
        gender: clientTTData.clientGender.key,
        maritalStatus: clientTTData.clientMaritalStatus.key,
        descMaritalStatus: clientTTData.clientMaritalStatus.label,
        religion: clientTTData.clientReligion.label,
        education: clientTTData.clientLastEducation.key,
        descEducation: clientTTData.clientLastEducation.label,
        taxpayer: {
          type: 'NPWP',
          number: clientTTData.ClientNpwpNumber,
          reason: clientTTData.clientAsideFromNpwp?.label || '',
          name: clientTTData.clientNpwpHolder,
        },
        occupation: {
          code: clientTTData.clientJob.code,
          desc: clientTTData.clientJob.nameInd,
          classOccupation: clientTTData.clientJob.clazz,
          companyName: clientTTData.clientCompanyName,
          address: {
            type: 'OF',
            line1: clientTTData.clientCompanyAddress!,
            line2: '',
            line3: '',
            rt: clientTTData.clientCompanyNeighbourhood1,
            rw: clientTTData.clientCompanyNeighbourhood2,
            km: clientTTData.clientCompanyKilometer,
            kelurahan: clientTTData.clientCompanyUrbanVillage,
            kecamatan: clientTTData.clientCompanyDistrict,
            city: clientTTData.clientCompanyCity,
            province: clientTTData.clientCompanyProvice?.key || '',
            descProvince: clientTTData.clientCompanyProvice?.label || '',
            postalCode: clientTTData.clientCompanyPostCode,
            country: clientTTData.clientCompanyLocation?.key === 'AB' ? clientTTData.clientCompanyAbroad?.code : clientTTData.clientCompanyLocation?.key || '',
            descCountry: clientTTData.clientCompanyLocation?.key === 'AB' ? clientTTData.clientCompanyAbroad?.name : clientTTData.clientCompanyLocation?.title || '',
          },
        },
        contact: {
          phone: [],
          fax: '',
        },
        address: [],
        motherName: '',
        email: clientTTData.clientEmail,
        networth: '',
        networthRangeDesc: '',
        income: [
          {
            frequency: 'bulan',
            amount: minMaxSalaryData[clientTTData.clientIncome.key].max,
            amountCode: clientTTData.clientIncome.key,
            amountDesc: clientTTData.clientIncome.label,
            source:
              clientTTData.clientSourceIncome.map(({ key, label }) => ({
                code: key,
                desc: label,
              })) || [],
          },
        ],
        type: 'person',
        role: 'LA',
        benefitAllocation: 0,
        activePolicy: [],
        niasCorrespondence: {
          hasAnotherAddress: clientTTData?.clientResidenceAnotherAddress?.key,
          biggerArea: clientTTData?.clientResidenceRegion?.label,
        },
        declaration: {
          ...custStaffRealtionMapping(clientTTData),
        },
      };
      tempClientTT.address?.push({
        type: 'H',
        line1: clientTTData.clientResidenceAdress,
        line2: '',
        line3: '',
        rt: clientTTData.clientResidenceNeighbourdhood1,
        rw: clientTTData.clientResidenceNeighbourdhood2,
        km: clientTTData.clientResideceKilometer,
        kelurahan: clientTTData.clientResidenceUrbanVillage,
        kecamatan: clientTTData.clientResidenceDistrict,
        city: clientTTData.clientResidenceCity,
        province: clientTTData.clientResidenceProvince.key,
        descProvince: clientTTData.clientResidenceProvince.label,
        postalCode: clientTTData.clientResidencePostCode,
        country: clientTTData.clientResidenceLocation.key === 'AB' ? clientTTData.clientResidenceAbroad?.code : clientTTData.clientResidenceLocation.key,
        descCountry: clientTTData.clientResidenceLocation.key === 'AB' ? clientTTData.clientResidenceAbroad?.name : clientTTData.clientResidenceLocation.title,
      });
      typeof clientTTData.clientCompanyPhones != 'string' &&
        clientTTData.clientCompanyPhones?.map((contactData, index) => {
          tempClientTT.contact?.phone.push({
            type: `office${index + 1}`,
            number: contactData?.clientCompanyPhone
              ? contactData?.clientCompanyPhoneCode?.dial_code.replace('+', '') + contactData?.clientCompanyPhone
              : '',
            countryCode: contactData?.clientCompanyPhoneCode?.dial_code.replace('+', ''),
          });
        });
      clientTTData.clientResidencePhoneCells?.map((contactData, index) => {
        tempClientTT.contact?.phone.push({
          type: `gsm${index + 1}`,
          number:
            contactData.clientResidencePhoneCellCode.dial_code.replace('+', '') + contactData.clientResidencePhoneCell,
          countryCode: contactData.clientResidencePhoneCellCode.dial_code.replace('+', ''),
        });
      });
      clientTTData.clientResidencePhoneNumbers.map((contactData, index) => {
        if (contactData.clientResidencePhoneNumber) {
          tempClientTT.contact?.phone.push({
            type: `home${index + 1}`,
            number: contactData.clientResidencePhoneNumber
              ? contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '') +
              contactData.clientResidencePhoneNumber
              : '',
            countryCode: contactData.clientResidencePhoneNumberCode.dial_code.replace('+', ''),
          });
        }
      });

      tempClientTT.activePolicy = mappingAdditionalInsuredBenefits;

      clientData.push(tempClientTT);
    }

    //PY
    if (RSPAJData?.premiumPayor) {
      const clientPYData: TFormDataPolicyHolder = JSON.parse(RSPAJData.premiumPayor);
      const clientCompanyLocationPY = clientPYData.clientCompanyLocation;
      const clientResidenceLocationPY = clientPYData.clientResidenceLocation;

      let clientPYDataTemp: any = {
        name: {
          full: clientPYData.clientName
        },
        relation: clientPYData.clientRelationshipPH?.key,
        descRelation: clientPYData.clientRelationshipPH?.label,
        placeOfBirth: clientPYData.clientCityBirth,
        dateOfBirth: formaterDateSubmission(clientPYData.clientDateBirth),
        countryOfBirth: clientPYData.clientCountryBirth.code,
        descCountryOfBirth: clientPYData.clientCountryBirth.name,
        identification: [
          {
            type: 'KTP',
            number: clientPYData.clientIdCardNumber,
            expiryDate: formaterDateSubmission(clientPYData.clientMassValidUntil)
          }
        ],
        nationality: clientPYData.clientCivics.code,
        descNationality: clientPYData.clientCivics.name,
        gender: clientPYData.clientGender.key,
        maritalStatus: clientPYData.clientMaritalStatus.key,
        descMaritalStatus: clientPYData.clientMaritalStatus.label,
        religion: '',
        education: '',
        descEducation: '',
        taxpayer: {
          type: 'NPWP',
          number: clientPYData.ClientNpwpNumber,
          reason: clientPYData.clientAsideFromNpwp.label || "",
          name: clientPYData.clientNpwpHolder
        },
        occupation: {
          code: clientPYData.clientJob.code,
          desc: clientPYData.clientJob.nameInd,
          classOccupation: clientPYData.clientJob.clazz,
          companyName: clientPYData.clientCompanyName,
          isOtherOccupation: clientPYData.clientOtherJob?.key == 'Y',
          otherOccupation: clientPYData.clientOtherJobDetail,
          address: {
            type: 'OF',
            line1: clientPYData.clientCompanyAddress,
            line2: '',
            line3: '',
            rt: clientPYData.clientCompanyNeighbourhood1,
            rw: clientPYData.clientCompanyNeighbourhood2,
            km: clientPYData.clientCompanyKilometer,
            kelurahan: clientPYData.clientCompanyUrbanVillage,
            kecamatan: clientPYData.clientCompanyDistrict,
            city: clientPYData.clientCompanyCity,
            province: clientPYData.clientCompanyProvice.key,
            descProvince: clientPYData.clientCompanyProvice.label,
            postalCode: clientPYData.clientCompanyPostCode,
            country: clientCompanyLocationPY?.key === 'AB' ? clientPYData.clientCompanyAbroad?.code : clientCompanyLocationPY?.key,
            descCountry: clientCompanyLocationPY?.key === 'AB' ? clientPYData.clientCompanyAbroad?.name : clientCompanyLocationPY?.title,
          }
        },
        contact: {
          phone: [],
          fax: ''
        },
        address: [],
        motherName: clientPYData.clientMotherVirginName,
        email: clientPYData.clientEmail,
        networth: enumNetwoth[clientPYData.clientNetWorth.label as string],
        networthRangeDesc: clientPYData.clientNetWorth?.label,
        income: [{
          frequency: 'bulan',
          amount: minMaxSalaryData[clientPYData?.clientIncome?.key]?.max ?? '',
          amountCode: clientPYData.clientIncome?.key,
          amountDesc: clientPYData.clientIncome?.label,
          source:
            clientPYData.clientSourceIncome.map(({ key, label }) => ({
              code: key,
              desc: label,
            })) || []
        }],
        type: 'person',
        role: 'PY',
        benefitAllocation: 0
      };
      clientPYDataTemp.address?.push({
        type: 'H',
        line1: clientPYData.clientResidenceAdress,
        line2: '',
        line3: '',
        rt: clientPYData.clientResidenceNeighbourdhood1,
        rw: clientPYData.clientResidenceNeighbourdhood2,
        km: clientPYData.clientResideceKilometer,
        kelurahan: clientPYData.clientResidenceUrbanVillage,
        kecamatan: clientPYData.clientResidenceDistrict,
        city: clientPYData.clientResidenceCity,
        province: clientPYData.clientResidenceProvince.key,
        descProvince: clientPYData.clientResidenceProvince.label,
        postalCode: clientPYData.clientResidencePostCode,
        country: clientResidenceLocationPY?.key == 'AB' ? clientPYData.clientResidenceAbroad?.code : clientResidenceLocationPY?.key,
        descCountry: clientResidenceLocationPY?.key == 'AB' ? clientPYData.clientResidenceAbroad?.name : clientResidenceLocationPY?.title,
      })

      typeof clientPYData.clientCompanyPhones != 'string' && clientPYData.clientCompanyPhones?.map((contactData, index) => {
        clientPYDataTemp.contact?.phone.push({
          "type": `office${index + 1}`,
          "number": contactData.clientCompanyPhone ? contactData.clientCompanyPhoneCode.dial_code.replace('+', '') + contactData.clientCompanyPhone : '',
          "countryCode": contactData.clientCompanyPhoneCode.dial_code.replace('+', '')
        })
      })
      clientPYData.clientResidencePhoneCells?.map((contactData, index) => {

        clientPYDataTemp.contact?.phone.push({
          "type": `gsm${index + 1}`,
          "number": contactData.clientResidencePhoneCellCode.dial_code.replace('+', '') + contactData.clientResidencePhoneCell,
          "countryCode": contactData.clientResidencePhoneCellCode.dial_code.replace('+', '')
        })
      })
      clientPYData.clientResidencePhoneNumbers?.map((contactData, index) => {
        if (contactData.clientResidencePhoneNumber) {
          clientPYDataTemp.contact?.phone.push({
            "type": `home${index + 1}`,
            "number": contactData.clientResidencePhoneNumber ? contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '') + contactData.clientResidencePhoneNumber : '',
            "countryCode": contactData.clientResidencePhoneNumberCode.dial_code.replace('+', '')
          })
        }
      })

      clientData.push(clientPYDataTemp)

    }

    //PT
    if (RSPAJData?.topupPremiumPyor) {
      const dataPTPayor = JSON.parse(RSPAJData?.topupPremiumPyor);
      if (dataPTPayor.topupPremiPayer.key == 'O') {
        let tempCLientPT = {
          role: `PYT`,
          name: {
            full: dataPTPayor.payorName
          },
          relation: dataPTPayor.payorRelationship.key,
          descRelation: dataPTPayor.payorRelationship.label,
          income: [
            {
              frequency: 'bulan',
              amount: minMaxSalaryData[dataPTPayor.payorIncome.key].max,
              amountCode: dataPTPayor.payorIncome.key,
              amountDesc: dataPTPayor.payorIncome.label,
              source:
                dataPTPayor.payorSourceIncome.map(({ key, label }) => ({
                  code: key,
                  desc: label,
                })) || []
            }
          ],
          occupation: {
            code: dataPTPayor.payorJob.code,
            desc: dataPTPayor.payorJob.nameInd,
            classOccupation: dataPTPayor.payorJob.clazz,
            companyName: dataPTPayor.payorCompanyName,
          },
          iseOtherIncome: dataPTPayor.anyOtherIncome.key == 'Y'
        }
        if (dataPTPayor.anyOtherIncome.key == 'Y') {
          tempCLientPT.income.push({
            frequency: 'tahun',
            amount: dataPTPayor.nonRoutineIncome.key,
            amountCode: dataPTPayor.nonRoutineIncome.key,
            amountDesc: dataPTPayor.nonRoutineIncome.label,
            source:
              dataPTPayor?.nonRoutineSourceIncome.map(({ key, label }) => ({
                code: key,
                desc: label,
              })) || []
          })
        }
        clientData.push(tempCLientPT)
      }

    }

    //BENEF
    if (RSPAJData?.beneficiary) {
      const benefData = JSON.parse(RSPAJData.beneficiary).beneficiaryCandidateInfo;
      benefData.map((clientBenef: TBeneficiaryCandidateInfo, index: number) => {
        let tempClinetBenef = {
          role: `BENEF${index + 1}`,
          name: {
            full: clientBenef.fullname
          },
          gender: typeof clientBenef.gender == 'object' ? clientBenef.gender.key || "" : clientBenef.gender,
          dateOfBirth: formaterDateSubmission(clientBenef.dateBirth),
          benefitAllocation: Number(clientBenef.percentage),
          relation: clientBenef.relationshipCandidate.code,
          descRelation: shariaFlag == 'conventional' ? clientBenef.relationshipCandidate.konven : clientBenef.relationshipCandidate.syariah,
          identification: [
            {
              type: 'KTP',
              number: clientBenef.idNumber,
              expiryDate: ''
            }
          ]
        }

        clientData.push(tempClinetBenef)
      })
    }

    return clientData;


  }, [RSPAJData?.policyHolderData])

  const generateDisclaimer = useCallback(() => {
    const surplusData = RSPAJData?.policyHolderAccount ? JSON.parse(RSPAJData?.policyHolderAccount) : '';
    const disclaimerProtection = getDisclaimerProtection({
      productKey: RSQSData?.product?.key || '',
      policyType: RSQSData?.policyType,
    })
    const disclaimer = disclaimerProtection.map(({ code, value }) => ({
      code,
      value: code === 'dataProtection1' ? `${value} Ya` : `${value} ${'YA'}`,
    }))
    let valueSurplus = ''
    if (disclaimerData) {
      if (disclaimerData.surplusUnderwriting) {
        valueSurplus = enumSurplus[disclaimerData.surplusUnderwriting.key]
      }
    }
    disclaimer.push({
      code: 'surplus',
      value: valueSurplus
    })
    return disclaimer;
  }, [disclaimerData]);

  const formMap = useCallback(async (privyData: TPrivyData, submissionType: 'UPFRONT' | 'PRIVY' | 'SU' | 'CO') => {
    const dataChannel = CHANNEL[RSQSData?.product.key]
    let formMappingTemp = [];
    const tempAdditionalForm = JSON.parse(JSON.stringify(AdditionalForms));
    //additional form start
    if (tempAdditionalForm) {
      Object.keys(tempAdditionalForm).map((keys, index) => {

        if (keys != 'additionalFormId' && tempAdditionalForm[keys] != '') {
          const dataForms = JSON.parse(tempAdditionalForm[keys])
          let dataFormsMappingTemp: TForm = {
            type: typeFormMapping[keys].type,
            docId: keys == 'formConversion' ? getDocIdConversion() : RSQSData?.policyType == 'conventional' ? typeFormMapping[keys].docIdConven : typeFormMapping[keys].docIdSharia,
            signature: [
              {
                esign: {
                  role: 'PH',
                  location: dataForms.policyHolderSignLocation,
                  date: formaterDateSubmission(dataForms.policyHolderSignDate),
                  base64: dataForms.signPolicyHolder
                },
                digital: privyData?.privyPh ? {
                  role: 'PH',
                  provider: {
                    id: privyData?.privyPh
                  }
                } : {}
              }
            ]
          }

          if (dataForms.signMarketer) {
            dataFormsMappingTemp.signature?.push({
              esign: {
                role: 'AG',
                date: formaterDateSubmission(dataForms.marketerSignDate),
                location: dataForms.marketerSignLocation,
                base64: dataForms.signMarketer
              },
              digital: privyData?.privyAgent ? {
                role: 'AG',
                provider: {
                  id: privyData?.privyAgent
                }
              } : {}
            })
          }

          if (dataForms.signSonDaughterInLaw) {
            dataFormsMappingTemp.signature?.push({
              esign: {
                role: 'LA',
                date: formaterDateSubmission(dataForms.sonDaughterInLawSignDate),
                location: dataForms.sonDaughterInLawSignLocation,
                base64: dataForms.signSonDaughterInLaw
              },
              digital: privyData?.privyLA ? {
                role: 'LA',
                provider: {
                  id: privyData?.privyLA
                }
              } : {}
            })
          }
          if (keys === 'insuranceAttachmentLetter') {
            dataFormsMappingTemp.attributes = getSKAAttributes(dataForms);
          } else if (keys === 'waqfInsuranceBenefits') {
            const dataFormWakaf: TWakaf = dataForms;
            dataFormWakaf.beneficiaryCandidateInfo.map((dataBenefWakaf, index) => {
              dataFormsMappingTemp.signature?.push(
                {
                  esign: {
                    role: `BENEF${index + 1}`,
                    base64: dataBenefWakaf.signBeneficiary,
                    date: formaterDateSubmission(dataBenefWakaf.beneficiaryDate),
                    location: ''
                  }
                }
              )
            })
            dataFormsMappingTemp.attributes = getWakafAttributes(dataForms);
          } else if (keys === 'formConversion') {
            const convDataResult = JSON.parse(RSQSData?.convDataResult!);
            const _convType = convDataResult?.productCode == 'H11' ? 'SYARIAH_PSSS_PWM' : convDataResult.productCode == 'H13' ? 'SYARIAH_PSSSPRO_PWM' : convDataResult.productCode == 'H10' ? 'KONVENSIONAL_PSS_PWM' : 'KONVENSIONAL_PSSPRO_PWM'
            dataFormsMappingTemp.attributes = [
              {
                key: 'isGIO',
                value: RSQSData?.isGIO ? 'Y' : 'N'
              },
              {
                key: 'policyNumber',
                value: convDataResult?.policyNumber
              },
              {
                key: 'convType',
                value: _convType
              }
            ]
          }

          formMappingTemp.push(dataFormsMappingTemp)
        }
      })
    }
    //amend start
    if (RSPAJData?.amandment) {
      const amendData: TFOrmAmendment = JSON.parse(RSPAJData.amandment);
      if (amendData.fillAmendment.key == 'Y') {
        const amendRemarks = getRemarkAmendementForm()
        const isAmendMedicalExist = amendData.amendmentDetail.find((amendDetail: any) => amendDetail.category.key == 'HD');
        const docIdAmend = RSQSData?.policyType == 'conventional' ? typeFormMapping['formAmend'].docIdConven : typeFormMapping['formAmend'].docIdSharia
        if (amendRemarks) {
          formMappingTemp.push(
            {
              type: 'AMEND',
              docId: docIdAmend,
              signature: [],
              attributes: [
                {
                  key: 'remark',
                  value: amendRemarks
                }
              ]
            } as TForm
          )
        }
        if (isAmendMedicalExist) {
          const { docIdConven, docIdSharia, type } = typeFormMapping['formAmendMedical']
          const docIdAmendMedical = RSQSData?.policyType == 'conventional' ? docIdConven : docIdSharia
          formMappingTemp.push(
            {
              type,
              docId: docIdAmendMedical,
              signature: [],
              attributes: [
                {
                  key: 'remark',
                  value: getRemarksSpesificAmendForm('HD')
                }
              ]
            } as TForm
          )
        }
      }
    }
    //paydi form start
    if (CHANNEL[RSQSData?.product?.key].productCategory == 'UL') {
      formMappingTemp.push({
        type: 'ILP',
        docId: RSQSData?.policyType == 'conventional' ? '17060484' : '17060485',
        signature: [
          {
            esign: {
              role: 'PH',
              location: '',
              date: '',
              base64: ''
            },
            digital: privyData?.privyPh ? {
              role: 'PH',
              provider: {
                id: privyData?.privyPh
              }
            } : {}
          }
        ]
      } as TForm)

      formMappingTemp.push({
        type: 'VIDEO_PAYDI',
        docId: RSQSData?.policyType == 'conventional' ? '17060596' : '17060597',
        signature: [
          {
            esign: {
              role: 'PH',
              location: '',
              date: '',
              base64: ''
            },
            digital: privyData?.privyPh ? {
              role: 'PH',
              provider: {
                id: privyData?.privyPh
              }
            } : {}
          }
        ]
      } as TForm)
    }
    //form topup
    if (RSPAJData?.topupPremiumPyor) {
      const topupData = JSON.parse(RSPAJData.topup);
      if (topupData.additionalTopup.key == 'Y') {
        formMappingTemp.push({
          type: 'TOPUP',
          docId: RSQSData?.policyType == 'conventional' ? typeFormMapping['formTopUp'].docIdConven : typeFormMapping['formTopUp'].docIdSharia,
        } as TForm)
      }
    }
    //ilustration start
    const ilustDoc = await ilustrationSQSMap(submissionType, privyData);
    ilustDoc?.map((item: any) => {
      const MAPPING_SQS_FORM = {
        Summary: {
          type: 'Summary',
          docId: dataChannel.CURRENCY.docIdRi
        },
        RiskProfile: {
          type: 'RP',
          docId: dataChannel.CURRENCY.docIdRiskProfile
        },
        Standard: {
          type: 'STD',
          docId: getIsObjectExist(substandar) ? dataChannel.CURRENCY.docIdSubstandard : dataChannel.CURRENCY.docIdStandard
        }

      }
      const tempSqsSignature: TFormSqsSignature = RSPAJData?.sqsSignature ? JSON.parse(RSPAJData?.sqsSignature) : defaultFormSqsSignature;
      let tempFormSqs: TForm;
      tempFormSqs = {
        type: MAPPING_SQS_FORM[item.name.split('-')[1]].type,
        docId: MAPPING_SQS_FORM[item.name.split('-')[1]].docId,
        attributes: [
          {
            key: 'document',
            value: item?.base64 || ''
          }
        ],
        signature: []
      }
      if (item.name.split('-')[1] == 'Summary') {
        tempFormSqs.signature?.push({
          esign: {
            role: 'PH',
            date: formaterDateSubmission(tempSqsSignature?.policyHolderSignDate),
            location: tempSqsSignature?.policyHolderSignLocation,
            base64: tempSqsSignature?.signPolicyHolder,
          },
          digital: privyData?.privyPh ? {
            role: 'PH',
            provider: {
              id: privyData?.privyPh
            }
          } : {}
        })
        tempFormSqs.signature?.push({
          esign: {
            role: 'AG',
            date: formaterDateSubmission(tempSqsSignature?.marketerSignDate),
            location: tempSqsSignature?.marketerSignLocation,
            base64: tempSqsSignature?.signMarketer,
          },
          digital: privyData?.privyAgent ? {
            role: 'AG',
            provider: {
              id: privyData?.privyAgent
            }
          } : {}
        })
      } else if (item.name.split('-')[1] == 'RiskProfile') {
        tempFormSqs.signature?.push({
          esign: {
            role: 'PH',
            date: formaterDateSubmission(tempSqsSignature?.riskProfilePolicyHolderDate),
            location: tempSqsSignature?.riskProfilePolicyHolderLocation,
            base64: tempSqsSignature?.signRiskProfilePolicyHolder,
          },
          digital: privyData?.privyPh ? {
            role: 'PH',
            provider: {
              id: privyData?.privyPh
            }
          } : {}
        })
        tempFormSqs.signature?.push({
          esign: {
            role: 'AG',
            date: formaterDateSubmission(tempSqsSignature?.riskProfilemarketerDate),
            location: tempSqsSignature?.riskProfilemarketerLocation,
            base64: tempSqsSignature?.signRiskProfilemarketer,
          },
          digital: privyData?.privyAgent ? {
            role: 'AG',
            provider: {
              id: privyData?.privyAgent
            }
          } : {}
        })
      } else {

      }
      formMappingTemp.push(tempFormSqs);
    })
    //ilustration end

    //upfront form map start
    if (RSPAJData?.upfrontDecisionResult) {
      if (RSPAJData?.upfrontDecisionResult?.signatureExclusionOffering) {

        const exclusionData: FormExclusionOffering = JSON.parse(RSPAJData?.upfrontDecisionResult?.signatureExclusionOffering!);
        formMappingTemp.push({
          type: typeFormMapping['formEXCLUSION'].type,
          docId: typeFormMapping['formEXCLUSION'].docIdConven,
          signature: [
            {
              esign: {
                role: 'PH',
                location: exclusionData['signature-location'],
                date: formaterDateSubmission(exclusionData['signature-date']),
                base64: exclusionData['e-signature']
              },
              digital: {}
            }
          ],
          attributes: [
            {
              key: 'agreeSubstandard',
              value: exclusionData['exclustion-offering-agreement'].key
            }
          ]
        } as TForm)
      } else {
        if (RSPAJData?.upfrontDecisionResult?.lsar) {
          const lsarData: UpfrontDecisionModel.RealmLSAR = JSON.parse(RSPAJData?.upfrontDecisionResult?.lsar)
          let _lsarForm: TForm = {
            type: typeFormMapping['formLSAR'].type,
            docId: typeFormMapping['formLSAR'].docIdConven,
            signature: [
              {
                esign: {
                  role: 'PH',
                  location: lsarData.customer_signature.policy_holder.location,
                  date: formaterDateSubmission(lsarData.customer_signature.policy_holder.time),
                  base64: lsarData.customer_signature.policy_holder.e_sign
                },
                digital: {}
              },
              {
                esign: {
                  role: 'AG',
                  location: lsarData.marketer_signature.location,
                  date: formaterDateSubmission(lsarData.marketer_signature.time),
                  base64: lsarData.marketer_signature.e_sign
                },
                digital: {}
              }
            ]
          }
          if (RSQSData?.lifeAssuredSelf == 'other') {
            _lsarForm.signature?.push({
              esign: {
                role: 'LA',
                location: lsarData.customer_signature.insured.location,
                date: formaterDateSubmission(lsarData.customer_signature.insured.time),
                base64: lsarData.customer_signature.insured.e_sign
              },
              digital: {}
            })
          }
          formMappingTemp.push(_lsarForm)
        }
        if (RSPAJData?.upfrontDecisionResult?.abr) {
          const abrData: UpfrontDecisionModel.RealmAbr = JSON.parse(RSPAJData?.upfrontDecisionResult?.abr);
          formMappingTemp.push({
            type: typeFormMapping['formABR'].type,
            docId: typeFormMapping['formABR'].docIdConven,
            signature: [
              {
                esign: {
                  role: 'AG',
                  location: abrData.agent_signature.location,
                  date: formaterDateSubmission(abrData.agent_signature.time),
                  base64: abrData.agent_signature.e_sign
                },
                digital: {}
              }
            ]
          } as TForm)
        }
      }
    }
    //upfront form map end


    return formMappingTemp;
  }, [AdditionalForms])

  const spajSignature = useCallback((privyData: TPrivyData) => {
    if (RSPAJData.spajSignature) {
      const spajSignatureData = JSON.parse(RSPAJData.spajSignature);
      let spajSignatureTemp = [];
      //PH
      spajSignatureTemp.push({
        esign: {
          role: 'PH',
          date: formaterDateSubmission(spajSignatureData.policyHolderSignDate),
          location: spajSignatureData.policyHolderSignLocation,
          base64: spajSignatureData.signPolicyHolder
        },
        digital: privyData?.privyPh ? {
          role: 'PH',
          provider: {
            id: privyData?.privyPh
          }
        } : {}
      })
      //Agent
      spajSignatureTemp.push({
        esign: {
          role: 'AG',
          date: formaterDateSubmission(spajSignatureData.marketerSignDate),
          location: spajSignatureData.marketerSignLocation,
          base64: spajSignatureData.signMarketer
        },
        digital: privyData?.privyAgent ? {
          role: 'AG',
          provider: {
            id: privyData?.privyAgent
          }
        } : {}
      })
      //LA
      if (spajSignatureData.signPrimaryInsured) {
        let tempLASign: TSignature = {
          esign: {
            role: 'LA',
            date: formaterDateSubmission(spajSignatureData.primaryInsuredSignDate),
            location: spajSignatureData.primaryInsuredSignLocation,
            base64: spajSignatureData.signPrimaryInsured
          }
        }

        if (privyData?.privyLA) {
          tempLASign.digital = {
            role: 'LA',
            provider: {
              id: privyData?.privyLA
            }

          }
        }
        spajSignatureTemp.push(tempLASign)
      }
      //TT
      if (spajSignatureData.signAdditionalInsured) {
        let tempTTSign: TSignature = {
          esign: {
            role: 'TT',
            date: formaterDateSubmission(spajSignatureData.additionalInsuredSignDate),
            location: spajSignatureData.additionalInsuredSignLocation,
            base64: spajSignatureData.signPrimaryInsured
          }
        }

        if (privyData?.privyTT) {
          tempTTSign.digital = {
            role: 'TT',
            provider: {
              id: privyData?.privyTT
            }

          }
          spajSignatureTemp.push(tempTTSign)
        }
      }
      //PY
      if (spajSignatureData.signPremiumPayor) {
        let tempPYSign: TSignature = {
          esign: {
            role: 'PY',
            date: formaterDateSubmission(spajSignatureData.premiumPayorSignDate),
            location: spajSignatureData.premiumPayorSignLocation,
            base64: spajSignatureData.signPremiumPayor
          }
        }
        if (privyData?.privyPY) {
          tempPYSign.digital = {
            role: 'PY',
            provider: {
              id: privyData?.privyPY
            }
          }
          spajSignatureTemp.push(tempPYSign)
        }
      }
      //PYT
      if (spajSignatureData.signTopupPayor) {
        spajSignatureTemp.push({
          esign: {
            role: 'PYT',
            date: formaterDateSubmission(spajSignatureData.topupPayorSignDate),
            location: spajSignatureData.topupPayorSignLocation,
            base64: spajSignatureData.signTopupPayor
          }
        })
      }

      return spajSignatureTemp;
    }

    return [];
  }, [RSPAJData?.spajSignature])


  const generateMappingHpx = (magnumData: HpxMagnumPure) => {
    const magnumDataList: MagnumHPX[] = [];
    const dataList: MagnumHpxQuest[] = [];

    magnumData.LifeList.map((magnumList) => {
      let role = '0' + (Number(magnumList.LifeIndex) + 1).toString()
      if (isPrucerah) {
        role = '02'
      }
      magnumDataList.push({
        role,
        quest: dataMagnumMapping(magnumList.Forms, dataList)
      })
    })

    return magnumDataList;
  }

  const dataMagnumMapping = (dataForm: HPXFormMagnum[], dataList: MagnumHpxQuest[]) => {
    dataForm.map((formList) => {
      if (formList.Title) {
        dataList.push({
          question: formList.Title,
          answer: formList.Answer || ''
        })
      }
      if (formList.ChildElements.length > 0) {
        dataChildMagnumMapping(formList.ChildElements, dataList)
      }
    })
    return dataList;
  }

  const dataChildMagnumMapping = (dataForm: HPXFormMagnum[], dataList: MagnumHpxQuest[]) => {
    dataForm.map((formList) => {
      if (formList.Title) {
        dataList.push({
          question: formList.Title,
          answer: formList.Answer
        })
      }

      if (formList.ChildElements && formList.ChildElements.length > 0) {
        dataChildMagnumMapping(formList.ChildElements, dataList);
      }
    })
    return dataList;
  }

  const generateUwQuest = (magnumData: HpxMagnumPure) => {
    let role = '01'
    let smokingRoleList = ['01']

    if (isPrucerah) {
      role = '02'
      smokingRoleList.push('02')
    }

    let uwQuestTemp = {
      bmiheight: [
        {
          role,
          questionid: 'DK01',
          height: ''
        }
      ],
      bmiweight: [
        {
          role,
          questionid: 'DK01',
          weight: ''
        }
      ],
      smoking: smokingRoleList.map((role) => {
        return {
          role,
          questionid: 'DK01',
          stat: '',
          behavior: {
            freq: '',
            desc_freq: '',
            questionid: ''
          },
          perDay: {
            amount: '',
            desc_amount: '',
            questionid: 'DK01'
          },
          stop: {
            since: '',
            reason: '',
            desc_reason: '',
            questionid: ''
          }
        }
      })
    }
    magnumData.LifeList[0].Forms.map((magnumForm: HPXFormMagnum) => {
      if (magnumForm.Title == 'Fisik dan kebiasaan') {
        magnumForm.ChildElements.map((magnumChildElements: HPXFormMagnum) => {
          if (magnumChildElements.Title == 'Data Fisik') {
            magnumChildElements.ChildElements.map((physicChild: HPXFormMagnum) => {
              if (physicChild.PostText == 'cm') {
                uwQuestTemp.bmiheight[0].height = physicChild.Answer;
              }
              if (physicChild.PostText == 'kg') {
                uwQuestTemp.bmiweight[0].weight = physicChild.Answer;
              }
            })
          } else if (magnumChildElements.Title == 'Status Merokok') {
            magnumChildElements.ChildElements.map((smokeChild: HPXFormMagnum) => {
              uwQuestTemp.smoking[0].stat = smokeChild.Answer == 'Ya' ? 'S' : 'NS';
            })
          }
        })
      }
    })

    return uwQuestTemp;
  }

  const generateMagnumData = async () => {
    let formMagnum: HpxMagnumPure;
    let dataMagnum: any;
    let uwQuest: any;
    let hpxData: HpxMagnumPure;
    let fullyRecoveredCondition: any;

    try {
      await magnumStartUp();

      const { Data } = await magnumGetCaseAnswers(proposalId);
      hpxData = Data;

      formMagnum = generateMappingHpx(Data);
      uwQuest = generateUwQuest(Data);

      fullyRecoveredCondition = Data.LifeList?.flatMap(life =>
        life.Forms?.filter(form => form.Title === 'Pertanyaan Riwayat kesehatan')
      ).find(form => form)?.Preamble;

      try {
        const res2 = await magnumGetSubmitPackage(proposalId);
        dataMagnum = JSON.parse(res2.Data).dataPackages;

        const magnumData = {
          data: {
            dataPackages: dataMagnum,
          },
          bootstrap: await _mappingBootstrap(),
          form: formMagnum,
          uwQuestionnaire: uwQuest,
          hpx: hpxData,
          externalCaseUuid: hpxData?.CaseUuid,
          fullyRecoveredCondition,
        };

        return magnumData;
      } catch (error) {
        console.error("Error getting submit package:", error);
      }

    } catch (error) {
      console.error("Error during Magnum data generation:", error);
    }
  };

  const topUpSPAJMapping = useMemo(() => {
    if (RSPAJData?.topup) {
      const topupData = JSON.parse(RSPAJData.topup);
      const dataPTPayor = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData?.topupPremiumPyor) : {};
      let topUpMapping = {
        isTopUp: topupData.additionalTopup.key == 'Y',
        fund: topupData.topupGoal?.map(({ invesmentType, persentace }) => ({
          code: invesmentType.key,
          name: invesmentType.label,
          allocation: String(persentace),
        })) || [],
        annualTopUp: {
          year: 1,
          amount: Number(topupData.topup.replace(/\./g, ''))
        },
        topUpPayorRole: getIsObjectExist(dataPTPayor) ? mappingPTRole[dataPTPayor.topupPremiPayer.key as string] : '',
        topUpReason: [] as string[]
      }

      const whyTopUp: string[] = []
      dataPTPayor.goals?.map(({ label, key }) => {
        whyTopUp.push(label as string)
      })
      topUpMapping.topUpReason = whyTopUp;
      return topUpMapping;
    }
    return ({
      isTopUp: false
    })
  }, [])

  const mappingLeadsData = (
    prospectDetailData: IProspectDetailLead,
    agentProfile: any
  ) => {
    let countryCode: ({ name: string, dial_code: string, emoji: string, code: string, } | undefined) = { name: '', dial_code: '', emoji: '', code: '', };
    if (prospectDetailData) {
      countryCode = REGION_PHONE_CODE.find(phoneCode => phoneCode?.dial_code === prospectDetailData?.countryCode);
    }
    const currentLeadsData = {
      "slaDisableConsent": "",
      "prospectCreatedDateFormatted": "",
      "allowSwitching": "",
      "isDisablePhoneNumber": "",
      "prospectCreatedDate": "",
      "score": "",
      "leadsId": prospectDetailData?.leadId || "",
      "disableResendButtonUntil": "",
      "customerCategory": "",
      "totalProposalCreated": "",
      "homeAddress": prospectDetailData?.address || "",
      "leadsChannelCode": "",
      "agentNumber": agentProfile?.number || "",
      "workAddress": "",
      "customerName": "",
      "prospectCategoryLabel": "",
      "leadsCampaignCode": prospectDetailData?.campaignId || "",
      "hasPolicy": "",
      "phoneNumber": prospectDetailData?.phoneNumber || "",
      "showResendButton": "",
      "prospectCategoryColor": "",
      "isClosing": "",
      "maritalStatus": prospectDetailData?.maritalStatus || "",
      "status": "",
      "prospectId": prospectDetailData?.id,
      "gender": prospectDetailData?.gender || "",
      "encryptedProspectId": "",
      "clientName": prospectDetailData?.fullName || "",
      "takeLeadsExpired": "",
      "isRead": "",
      "currentMilestoneStatus": "",
      "leadsChannelName": "",
      "idNumber": "",
      "slaExpiryDate": "",
      "leadsCreatedDate": "",
      "ltsCampaignCode": "",
      "activityDate": "",
      "email": prospectDetailData?.email || "",
      "deleteDate": "",
      "leadsType": "",
      "clientId": prospectDetailData?.clientNumber || "",
      "activityLog": [],
      "birthDate": prospectDetailData?.birthDate || "",
      "religion": {
        "religion": "",
        "desc_religion": ""
      },
      "uncontactableCustomer": "",
      "lastInteractionDate": "",
      "lastActivity": {},
      "hasConsent": "",
      "prospectName": prospectDetailData?.fullName || "",
      "fullName": prospectDetailData?.fullName || "",
      "contactedPhone": prospectDetailData?.phoneNumber || "",
      "leadsDate": "",
      "leadsChannel": "",
      "indonesiaLetter": "",
      "occupation": prospectDetailData?.occupation || "",
      "lastEducation": prospectDetailData?.education || "",
      "rwOffice": "",
      "rtLetter": "",
      "companyName": '',
      "expensesPerMonth": "",
      "phoneHome": [
        {
          "phoneNumber": prospectDetailData?.phoneNumber || "",
          "countryCode": {
            "label": countryCode?.dial_code || ''
              ? `${countryCode?.dial_code || ''} (${countryCode?.name || ''})`
              : "",
            "value": countryCode?.code || ""
          }
        }
      ],
      "phoneOffice": [],
      "postcodeLetter": "",
      "countryLetter": "",
      "rwLetter": "",
      "rtHome": "",
      "expiryDateIdCard": "",
      "countryOffice": "",
      "provinceLetter": "",
      "indonesiaOffice": "",
      "cityOfBirth": '',
      "indonesiaHome": '',
      "revenue": [],
      "provinceOffice": "",
      "countryOfBirth": prospectDetailData?.birthCountry || '',
      "districtHome": "",
      "kmHome": "",
      "subdistrictOffice": "",
      "districtLetter": "",
      "addressLetter": "",
      "postcodeOffice": "",
      "cityOffice": "",
      "phoneLetter": [],
      "rtOffice": "",
      "cityHome": "",
      "identityCard": prospectDetailData?.countryNationalId || "",
      "postcodeHome": prospectDetailData?.zipCode || "",
      "countryHome": "",
      "provinceHome": "",
      "isSmoker": prospectDetailData?.smokerIndicator || "",
      "rwHome": "",
      "kmLetter": "",
      "nationality": "",
      "addressLetterOption": "",
      "cityLetter": "",
      "subdistrictHome": "",
      "districtOffice": "",
      "subdistrictLetter": "",
      "incomePerMonth": prospectDetailData?.income || "",
      "kmOffice": ""
    }

    return currentLeadsData;
  }

  const generateBoMapping = useMemo(() => {
    const PHData: TFormDataPolicyHolder = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData?.policyHolderData) : ''
    const surplusData = RSPAJData?.policyHolderAccount ? JSON.parse(RSPAJData?.policyHolderAccount) : ''
    const deepCloneConfirmationSQS = JSON.parse(JSON.stringify(confirmationSQS));
    const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
    const resultCalculator = RSQSData?.resultCalculator ? JSON.parse(RSQSData?.resultCalculator) : ''
    const isBlockCash = resultCalculator ? ['BLOCKCSASHNEW', 'BLOCKCSASH', 'BLOCKCASHPREM'].includes(resultCalculator?.rule[0]?.ruleCd) : false;
    const customerPH = allCustomerData[0];
    const vulnerbleCustDetail = RSQSData?.vulnerablityCustomer ? JSON.parse(RSQSData?.vulnerablityCustomer) : '';
    let vulnerable: enumType = vulnerableMapping(vulnerbleCustDetail);
    let tempValueField19: string[] = [];
    Object.keys(vulnerable).map((vulnerableType) => {
      const vulnarableData = vulnerable[vulnerableType].split(':');
      if (vulnarableData.length > 1) {
        tempValueField19.push(vulnarableData[1])
      }
    })
    let tempFlag4 = 'N';
    let tempFlag5 = 'N';
    if (deepCloneConfirmationSQS.policyOwnershipInfo?.key == 'Y') {
      tempFlag4 = 'Y'
      if (deepCloneConfirmationSQS.consequencesPolicy?.key == 'Y') {
        tempFlag5 = 'Y'
      }
    }
    let tempBoMapping = [
      {
        desc: '',
        value: PHData?.clientReceiveSummary?.key,
        bo_mapping: 'polis_elektronik'
      }, {
        desc: 'Sum Assured Increase Flag',
        value: 'N',
        bo_mapping: 'saauto_increase'
      },
      {
        desc: 'Campaign Type',
        value: 'N',
        bo_mapping: 'campaign_type',
      },
      {
        desc: 'Surplus UW',
        value: surplusData ? surplusData.surplusUnderwriting ? enumSurplus[surplusData.surplusUnderwriting.key] : '' : '',
        bo_mapping: 'surplus_uw',
      },
      {
        desc: '',
        value: '0',
        bo_mapping: 'fund_ual'
      },
      {
        desc: '',
        value: '0',
        bo_mapping: 'sqs_ver'
      },
      {
        desc: '',
        value: '0',
        bo_mapping: 'sqs'
      },
      {
        desc: '',
        value: '0',
        bo_mapping: 'spaj'
      },
      {
        desc: '',
        value: '0',
        bo_mapping: 'temp_flag_1'
      },
      {
        desc: '',
        value: 'E',
        bo_mapping: 'temp_flag_2'
      },
      {
        desc: 'Twisting 1',
        value: tempFlag4,
        bo_mapping: 'temp_flag_4'
      },
      {
        desc: 'Twisting 2',
        value: tempFlag5,
        bo_mapping: 'temp_flag_5'
      },
      {
        desc: 'STP Flag',
        value: 'Y',
        bo_mapping: 'temp_flag_6'
      },
      {
        desc: 'OTP',
        value: 'N',
        bo_mapping: 'temp_flag_7'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_flag_8'
      },
      {
        desc: ['H14', 'H15'].includes(RSQSData?.product?.key!) && RSQSData?.isGIO ? 'Campaign PWM' : '',
        value: ['H14', 'H15'].includes(RSQSData?.product?.key!) && RSQSData?.isGIO ? 'K' : '',
        bo_mapping: 'temp_flag_9'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_flag_8'
      },
      /* ----------- Nias Case Questions Start ------------ */
      {
        desc: 'Nias',
        value: 'N',
        bo_mapping: 'temp_flag_10'
      },
      /* ----------- Nias Case Questions End ------------ */
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_flag_11'
      },
      {
        desc: 'Wakaf Flag',
        value: beneficiary?.waqfProgram ? beneficiary?.waqfProgram?.key : 'N',
        bo_mapping: 'temp_flag_12'
      },
      {
        desc: 'Waiting Period',
        value: RSQSData?.waitingPeriod || '',
        bo_mapping: 'temp_flag_13'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_flag_14'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_flag_15'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_field_1'
      },
      {
        desc: '',
        value: 'N',
        bo_mapping: 'temp_field_3'
      },
      {
        desc: customerPH.clientExpenses.label,
        value: enumSpending[customerPH.clientExpenses.key!],
        bo_mapping: 'temp_field_6'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_field_7'
      },
      {
        desc: 'Kurir/Pos',
        value: 'C',
        bo_mapping: 'temp_field_8'
      },
      {
        desc: ['H14', 'H15'].includes(RSQSData?.product?.key!) ? RSQSData?.isGIO ? 'GIO' : 'FUW' : '',
        value: ['H14', 'H15'].includes(RSQSData?.product?.key!) ? RSQSData?.isGIO ? 'B' : 'A' : '',
        bo_mapping: 'temp_field_9'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_field_10'
      },
      {
        desc: '',
        value: mappingOtherInfo.previousSubmissionId || '',
        bo_mapping: 'temp_field_11'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_field_12'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'temp_field_13'
      },
      {
        desc: isBlockCash ? 'Block Cash Payment' : '',
        value: isBlockCash ? 'Y' : 'N',
        bo_mapping: 'temp_field_14'
      },
      {
        desc: 'Form Lampung UW61',
        value: PHData.clientResidenceProvince?.key === 'LAMPUNG' ? 'Y' : 'N',
        bo_mapping: 'temp_field_15'
      },
      {
        desc: 'Senior Citizen',
        value: customerPH.clientAnb >= 61 ? 'Y' : 'N',
        bo_mapping: 'temp_field_18'
      },
      {
        desc: 'Vulnerable Flag',
        value: tempValueField19.length != 0 ? tempValueField19.join(', ') : '',
        bo_mapping: 'temp_field_18'
      },
      {
        desc: 'Y',
        value: '',
        bo_mapping: 'id_processable_1'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'id_processable_2'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'id_processable_3'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'id_processable_4'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'id_processable_5'
      },
      {
        desc: '',
        value: 'Y',
        bo_mapping: 'sign_cmplt_ow'
      },
      {
        desc: '',
        value: 'Y',
        bo_mapping: 'sign_cmplt_lifeAss_1'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sign_cmplt_lifeAss_2'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sign_cmplt_lifeAss_3'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sign_cmplt_lifeAss_4'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sign_cmplt_lifeAss_5'
      },
      {
        desc: '',
        value: 'Y',
        bo_mapping: 'spaj_cmplt'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'spaj_incmplt_page1'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'spaj_incmplt_page2'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'spaj_incmplt_page3'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'spaj_incmplt_page4'
      },
      {
        desc: '',
        value: 'Y',
        bo_mapping: 'sqs_cmplt'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sqs_incmplt_page1'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sqs_incmplt_page2'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sqs_incmplt_page3'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'sqs_incmplt_page4'
      },
      {
        desc: '',
        value: 'Y',
        bo_mapping: 'support_doc_cmplt'
      },
      {
        desc: '',
        value: 'N',
        bo_mapping: 'sign_fraud'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'prod_syariah'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'quest_fulluw'
      },
      {
        desc: '',
        value: 'Y',
        bo_mapping: 'disclaimer_flag'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'counter_offer'
      },
      {
        desc: '',
        value: RSQSData?.substandar ? 'Y' : 'N',
        bo_mapping: 'substandard'
      },
      {
        desc: '',
        value: '1',
        bo_mapping: 'dmc_sub'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'edd'
      },
      {
        desc: '',
        value: 'Y',
        bo_mapping: 'hq_cmplt_1'
      },
      {
        desc: '',
        value: RSQSData?.lifeAssuredSelf == 'other' ? 'Y' : '',
        bo_mapping: 'hq_cmplt_2'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'hq_cmplt_3'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'hq_cmplt_4'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'hq_cmplt_5'
      },
      {
        desc: '',
        value: 'N',
        bo_mapping: 'med_doc_1'
      },
      {
        desc: '',
        value: RSQSData?.lifeAssuredSelf == 'other' ? 'N' : '',
        bo_mapping: 'med_doc_2'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'med_doc_3'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'med_doc_4'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'med_doc_5'
      },
      {
        desc: 'EDD',
        value: 'Y',
        bo_mapping: 'policy_temp6'
      },
      {
        desc: 'PWD',
        value: 'Y',
        bo_mapping: 'policy_temp7'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp8'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp9'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp10'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp11'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp12'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp13'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp14'
      },
      {
        desc: '',
        value: '',
        bo_mapping: 'policy_temp15'
      },
      {
        desc: '',
        value: calculator?.approvalSubstandard?.key || 'N',
        bo_mapping: 'agree-substandard'
      }
    ]

    if (['H14', 'H15'].includes(RSQSData?.product?.key!)) {
      const totalDiscount = String(resultCalculator?.discount) || '0.05';
      const splitedDiscount = totalDiscount.split('.')[1];
      const discount = splitedDiscount?.length == 2 ? splitedDiscount + 'D' : splitedDiscount + '0D'

      tempBoMapping.push({
        desc: discount == '05D' ? 'Non Campaign' : discount == '10D' ? 'Campaign Non Deduc' : 'Campaign Deduc',
        value: discount == '05D' ? 'A' : discount == '10D' ? 'B' : 'C',
        bo_mapping: 'premium_discount'
      })
    }
    return tempBoMapping;
  }, [])

  const paymentMap = useMemo(() => {
    let paymentData = [];
    paymentData.push({
      type: 'premi',
      amount: (calculator?.regularPremium).replace(/\./g, ''),
      curr: 'IDR',
      method: 'TT',
      bilFreq: oneTimePayment ? "00" : calculator?.frequencyPayment.key,
      descBilFreq: oneTimePayment ? "Sekali Bayar" : calculator?.frequencyPayment.label,
      bankCode: RSPAJData?.spajPayment ? JSON.parse(RSPAJData.spajPayment)?.bankName?.key : ""
    })
    if (RSPAJData?.topup) {
      const topupData = JSON.parse(RSPAJData.topup);
      if (topupData.topup) {
        paymentData.push({
          type: 'topup',
          amount: topupData?.topup.replace(/\./g, ''),
          curr: 'IDR',
          method: 'TT',
          bilFreq: calculator?.frequencyPayment.key,
          descBilFreq: calculator?.frequencyPayment.label
        })
      }
    }
    return paymentData;
  }, [calculator, RSPAJData?.topup, RSPAJData?.spajPayment])

  const riskProfileMap = useMemo(() => {
    const goalMap:
      {
        [key: string]: {
          data: string,
          desc: string
        }
      } = {
      kesehatan: {
        data: 'A',
        desc: 'Kesehatan'
      },
      kecelakaan: {
        data: '2',
        desc: 'Kecelakaan'
      },
      danaPensiun: {
        data: 'D',
        desc: 'Dana Pensiun'
      },
      investasi: {
        data: '4',
        desc: 'Investasi'
      },
      jiwa: {
        data: 'Y',
        desc: 'Perlindungan Jiwa'
      },
      penyakitKritis: {
        data: 'Z',
        desc: 'Penyakit Kritis'
      },
      pendidikan: {
        data: 'C',
        desc: 'Dana Pendidikan'
      },
      danaWarisan: {
        data: '3',
        desc: 'Dana Warisan'
      },
    }

    const resultRp = RSQSData?.riskProfileResult || 'conservative'
    const riskProfileAnswer: IRiskProfileAnswer = RSQSData?.riskProfileAnswer;

    const resultRPMap = {
      conservative: 'L',
      moderate: 'M',
      aggressive: 'H'
    }

    const enumRpResult = {
      conservative: 'konservatif',
      moderate: 'moderat',
      aggressive: 'agresif'
    }
    let tempSuitability = 'Y';
    fund.map(({ type_fund }) => {
      if (type_fund != enumRpResult[resultRp]) {
        tempSuitability = 'N'
        return;
      }
    })

    if (tempSuitability == 'Y') {
      fundTopup.map(({ type_fund }) => {
        if (type_fund != enumRpResult[resultRp]) {
          tempSuitability = 'N'
          return;
        }
      })
    }

    let dataRp: { data: string, desc: string }[] = [];

    RSQSData?.insuranceGoal.map((goal: string) => {
      dataRp.push(goalMap[goal])
    })

    let _totalScore = 0;
    if (riskProfileAnswer.investmentKnowledge) {
      _totalScore =
        +riskProfileAnswer.investmentKnowledge +
        +riskProfileAnswer.investmentTarget +
        +riskProfileAnswer.acceptableRisk +
        +riskProfileAnswer.invesmentMajority +
        +riskProfileAnswer.invesmentPeriod
    }




    const RiskProfileData = {
      result: resultRPMap[resultRp],
      descResult: enumRpResult[resultRp],
      suitability: tempSuitability,
      goals: dataRp,
      totalScore: _totalScore
    }

    return RiskProfileData;



  }, [RSQSData?.insuranceGoal])
  const lsarMapping = () => {
    if (RSPAJData?.upfrontDecisionResult?.lsar) {
      const lsarData: UpfrontDecisionModel.RealmLSAR = JSON.parse(RSPAJData?.upfrontDecisionResult?.lsar);
      const incomeLsar = lsarData.income.map((data: UpfrontDecisionModel.IncomeItem) => {
        return {
          year: data.year,
          salary: data.salary,
          personalBusiness: data.private_business,
          others: data.others,
          totalAnnual: data.total_salary_per_year,
        }
      })
      const _sharesBusinessDetail = lsarData.customer_company_financial.map((data: UpfrontDecisionModel.CompanyFinancial) => {
        return {
          year: data.year,
          revenue: data.turnover,
          grossProfit: data.gross_profit,
          netProfit: data.net_profit
        }
      })
      const _lsarData = {
        sourceAssets: {
          businessEquity: lsarData.customer_wealth.share_ownership_value,
          property: lsarData.customer_wealth.private_property,
          savings: lsarData.customer_wealth.saving,
          invesment: lsarData.customer_wealth.invest_amount
        },
        termSalesForce: lsarData.customer_confirmation.years_known_marketers,
        bankruptcyFlag: lsarData.bankruptcy_info?.key,
        bankruptcyDesc: lsarData.bankruptcy_info?.label,
        sourceIncomes: {
          sourceIncome: incomeLsar
        },
        sourceDebt: {
          propertyLoan: lsarData.customer_debt.kpr_kpa,
          personalLoan: lsarData.customer_debt.private_loan,
          businessLoan: lsarData.customer_debt.business_loan
        },
        companyProfile: {
          sharesBusinessDetail: _sharesBusinessDetail,
          companyName: lsarData.customer_company_profile.name,
          totalEmployee: lsarData.customer_company_profile.total_employee,
          sharesBusiness: lsarData.customer_company_profile.share_holder_percentage,
          established: formaterDateSubmission(lsarData.customer_company_profile.company_establishment_date),
          position: lsarData.customer_company_profile.position,
          jobDuty: lsarData.customer_company_profile.job_description,
          companyAddress: lsarData.customer_company_profile.location,
          typeBusiness: lsarData.customer_company_profile.company_type,
          officialWebsite: lsarData.customer_company_profile.official_site
        }

      }
      return _lsarData;
    }
    return {};
  }
  const abrMapping = () => {
    if (RSPAJData?.upfrontDecisionResult?.abr) {
      const abrData: UpfrontDecisionModel.RealmAbr = JSON.parse(RSPAJData?.upfrontDecisionResult?.abr);
      const abrPH = abrData.policy_holder_info;
      const abrLA = abrData.primary_insured_info;
      const _otherInformation = {
        otherInformationClipha: abrPH.life_style,
        otherInformationCliphb: abrPH.family_background,
        otherInformationCliphc: abrPH.educational_background,
        otherInformationClilifeassa: abrLA ? abrLA.life_style : '',
        otherInformationClilifeassb: abrLA ? abrLA.family_background : '',
        otherInformationClilifeassc: abrLA ? abrLA.educational_background : '',
      }
      const _abrData = {
        otherInformation: _otherInformation,
        observeInsurance: abrData.agent_pov_review,
        explainInsurance: abrData.policy_application_reason
      }
      return _abrData
    }
    return {}
  }
  const exclusionMapping = () => {
    if (RSPAJData?.upfrontDecisionResult?.signatureExclusionOffering) {
      const exclusionData: FormExclusionOffering = JSON.parse(RSPAJData?.upfrontDecisionResult?.signatureExclusionOffering!);
      // upfrontResult?.response_detail?.exclusion?.[0]?.exclusion_desc
      const upfrontResult: UpfrontDecisionModel.RealmData['result'] = JSON.parse(RSPAJData?.upfrontDecisionResult.result);
      let underwritingWording = upfrontResult?.response_detail?.exclusion?.[0]?.exclusion_desc as string;
      underwritingWording = underwritingWording.replace('<p>', '');
      underwritingWording = underwritingWording.replace('</p>', '');
      const segments = underwritingWording.split(/<br\/>/);
      const _underWritingWording = [];
      for (const segment of segments) {
        _underWritingWording.push({ underwritingValue: segment.trim() });
        _underWritingWording.push({ underwritingValue: " " });
      }
      _underWritingWording.pop();
      const dataReturn = {
        insuranceType: RSQSData?.product?.label?.replace('PRU', ''),
        flagDisclaimer: exclusionData['exclustion-offering-agreement'].key,
        underwriting: _underWritingWording,
        flagApproval: exclusionData['exclustion-offering-agreement'].key,
      }
      return dataReturn;
    }
    return {};
  }

  const upfrontMapping = (submissionType: 'UPFRONT' | 'PRIVY' | 'SU' | 'CO') => {
    if (submissionType == 'SU') {
      const dataReturn = {
        lsar: lsarMapping(),
        abr: abrMapping(),
        exclusion: exclusionMapping()
      }
      return dataReturn;
    }
    return {};
  }



  const generateRequestUpfront = useCallback(async (privyData: any = {}, submissionType: 'UPFRONT' | 'PRIVY' | 'SU' | 'CO', _spajNumber?: string) => {
    try {
      return {
        quotation: {
          id: proposalId,
          createdDate: formaterDateSubmission(summaryById?.createdDate),
          substandard: substandardMap,
          calculator: calculatorMap,
          product: productMap,
          riskProfile: riskProfileMap,
        },
        submission: {
          id: spajNumber || _spajNumber || await _generateSpajNumber(),
          submitDate: formaterDateSubmission((new Date()).toString()),
          docId: CHANNEL[productMap.code].CURRENCY.docIdSpaj,

          type: submissionType,
          agent: agentMap,
          attachment: spajDocsMap,
          bankAccount: bankMap,
          client: clientMap, //TODO: JERI
          disclaimer: generateDisclaimer(),
          magnum: await generateMagnumData(), //TODO: JERI
          previousSubmissionId: mappingOtherInfo.previousSubmissionId || '',
          form: await formMap(privyData, submissionType),
          signature: Object.keys(privyData).length > 0 ? spajSignature(privyData) : [],
          topUp: topUpSPAJMapping,
          flag: {
            isLA: RSQSData?.lifeAssuredSelf == 'other',
            isTT: RSQSData?.additionalLifeAssuredSelf == 'other',
            isPayorPH: JSON.parse(RSPAJData?.confirmationSQS!).premiumPaymentCandidate == 'Y',
            isPayorLA: JSON.parse(RSPAJData?.confirmationSQS!).premiumPaymentCandidate == 'TertanggungUtama',
            isAddressTTEqualsPH: RSPAJData?.primaryInsured ? JSON.parse(RSPAJData?.additionalInsured!)?.clientIsSameAddress?.key == 'Y' : false,
            isAddressLAEqualsPH: RSPAJData?.primaryInsured ? JSON.parse(RSPAJData?.primaryInsured!)?.clientIsSameAddress?.key == 'Y' : false,
            isAddressPayorEqualsPH: RSPAJData?.premiumPayor ? JSON.parse(RSPAJData?.premiumPayor!)?.clientIsSameAddress?.key == 'Y' : false,
            isProdOffer: disclaimerData?.additionalValidationSPAJOfferingProduct?.key == 'Y',
            validUpfront: submissionType == 'SU' ? getValidationUpfront() : false
          },
          flagBoMapping: generateBoMapping,
          payment: paymentMap,
          upfront: submissionType == 'SU' ? upfrontMapping(submissionType) : {}
        },
      };
    } catch (error) {
      throw new Error(`An error occurred when generating upfront request: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [
    proposalId,
    summaryById?.createdDate,
    substandardMap,
    calculatorMap,
    productMap,
    riskProfileMap,
    generateDisclaimer,
    agentMap,
    spajDocsMap,
    bankMap,
    formMap,
    spajSignature,
    spajNumber,
    clientMap,
    topUpSPAJMapping,
    RSQSData?.lifeAssuredSelf,
    RSQSData?.prospectivePremiumPayor,
    disclaimerData,
    generateMagnumData,
    generateBoMapping,
    paymentMap,
    additionalInsuranceMap
  ]);

  const generateSubmission = async (privyData: TPrivyData) => {
    const prospectDetail: any = RProspectDetail && RProspectDetail.toJSON();
    const requestUpfrontPayload = await generateRequestUpfront(privyData, 'SU');
    const leadData = mappingLeadsData(prospectDetail, agentMap);
    const submission = {
      ...requestUpfrontPayload,
      leads: leadData
    }
    return submission;
  }

  return {
    generateRequestUpfront,
    generateSubmission
  };
}

//#region FUNCTION HELPER
function getIsObjectExist(item?: unknown) {
  if (item) {
    return Object.keys(item).length > 0;
  }
  return false;
}

function formaterDateSubmission(date?: string) {
  if (date) {
    return moment(date).format('YYYYMMDD').toString()
  }
  return '';
}
//#endregion
