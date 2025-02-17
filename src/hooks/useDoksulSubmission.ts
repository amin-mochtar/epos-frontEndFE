import { useCallback, useMemo } from "react";
import { IAdditionalForms, IProspectDetailLead, useObject, useEposRealm, IFundFactSheet } from '../database';
import { Agent, CHANNEL, Client, RealmISQSDetail, RealmSPAJ, TBenefitsValue, TForm, TSignature, UpfrontMapping, WR_SHARIA_CONVENT, checkMainParticipant, magnumGetCaseAnswers, magnumGetSubmitPackage, magnumStartUp, productType, ISPAJData, ISQSDetail, ISummaryProposal, ICommonObjectData, IRiskProfileAnswer, minMaxSalaryData, UpfrontDecisionModel, TAttachment, TCalculatorData, } from '../utilities';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../redux';
import { useSelector } from "react-redux";
import moment from "moment";
import { TInsuranceAttachmentLetter } from "../screen/additional-forms/insurance-attachment-letter/insurance-attachment-letter.type";
import { TBeneficiaryCandidateInfo } from "../screen/espaj/spaj-beneficiary-candidate/spaj-beneficiary-candidate.type";
import { TWakaf } from "../screen/additional-forms/wakaf/wakaf.type";
import { defaultFormAmendment, TFOrmAmendment } from "../screen/espaj/spaj-amandement/spaj-amendment.type";
import { defaultFormDoc, TDocData, TFormDoc } from "../screen/doksul/doksul-document/doksul-docs.type";
import { defaultFormSpajSignature, TFormSpajSignature } from "../screen/espaj/spaj-signature/spaj-signature.type";
import { TOptionalCardData } from "epos_frontend/src/components";
import { TFormDataPolicyHolder } from "epos_frontend/src/screen/espaj/spaj-policy-owner-data/spaj-policy-owner-data.type";
import { TFormDataPremiumPayor } from "epos_frontend/src/screen/espaj/spaj-premium-payer-candidate/spaj-premium-payer-candidate.type";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { defaultFormConfirmProductDoksul, TFormConfirmProductDoksul } from "epos_frontend/src/screen/doksul/confirm-product-doksul/confirm-product-doksul.type";
import { defaultFormAddInsuranceStatement, TFormAddInsuranceStatement } from "../screen/doksul/additional-insurance-statement/additional-insurance-statement.type";
import { generatePDF, onCreateDocIllustration } from 'epos_utilities/src/newbusiness';


type TMarketersInteraction = {
  interactionType: string | TOptionalCardData;
  otherInteractionType: string;
  marketersInteraction: string;
  placeOfInteraction: string;
};
type TAgent = {
  agentProfile: Agent.Profile;
};
type TTypeSubmissionKey = 'DOC_UPL' | 'SQS' | 'AMEND' | 'UW61' | 'WAKAF' | 'WAKAF-HIDUP' | 'UW6' | 'AMEND_AGENT' | 'SKA' | 'FORM-CONV' | 'SU' | 'PRIVY' | 'UPFRONT'

export default function () {
  const { spajId, proposalId, spajNumber, selectedSQSId, additionalFormsId, leadId } = useSelector<RootState, EposState>((state) => state.epos);
  const { getMultipleCustomer, getFundFactSheetDocRealm } = useEposRealm();
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const summaryById = useObject<ISummaryProposal>('SummaryProposal', proposalId);
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const substandar: RealmISQSDetail.Item['substandar'] = RSQSData?.substandar ? JSON.parse(RSQSData.substandar) : {};
  const { agentProfile, campaignDate } = useSelector<RootState, TAgent>((state) => ({
    agentProfile: state.auth.agentProfile,
    campaignDate: state.common?.appConfigs['ID.AGENCY']?.Sales?.newbusiness?.campaignDate || undefined,
  }));
  const sqsIlustrationDocs: RealmISQSDetail.Item['ilustrationDocs'] = RSQSData?.ilustrationDocs
    ? JSON.parse(RSQSData.ilustrationDocs)
    : {};
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
      type: 'AMEND_AGENT',
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
    formPayor: {
      type: 'UW6',
      docIdConven: '17060265',
      docIdSharia: '17060418'
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
  const enumNetwoth: { [key: string]: string } = {
    '2500000': '100000000',
    '305000000': '500000000',
    '850000000': '1000000000',
    '2500000000': '3000000000',
    '4500000000': '5000000000',
    '5000000000': '9999999999',
  }


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

  const clientMap = (doksulType: TTypeSubmissionKey) => {
    let tempClient = [];
    let wakafForm = AdditionalForms?.waqfInsuranceBenefits ? JSON.parse(AdditionalForms.waqfInsuranceBenefits) : "";

    tempClient.push({
      role: 'PH',
      name: {
        full: summaryById?.policyHolderName
      },
      identification: [
        {
          type: 'KTP',
          number: wakafForm ? wakafForm.idNumber : '',
          expiryDate: ''
        }
      ],

      dateOfBirth: formaterDateSubmission(summaryById?.policyHolderDob, true),
    })
    let _clientLA = {
      role: 'LA',
      name: {
        full: summaryById?.lifeAssuredName
      },
      dateOfBirth: formaterDateSubmission(summaryById?.lifeAssuredDob, true),
      relation: '',
      descRelation: '',
    }
    let _clientBenef: any[] = []
    let clientPYDataTemp: any;
    if (RSPAJData?.beneficiary && doksulType !== 'SKA') {
      const benefData = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary).beneficiaryCandidateInfo : [];
      benefData.map((clientBenef: TBeneficiaryCandidateInfo, index: number) => {
        let tempClinetBenef = {
          role: `BENEF${index + 1}`,
          name: {
            full: clientBenef.fullname || ''
          },
          gender: clientBenef.gender.key || typeof clientBenef.gender == 'object' ? clientBenef.gender.key : clientBenef.gender,
          dateOfBirth: formaterDateSubmission(clientBenef.dateBirth),
          benefitAllocation: Number(clientBenef.percentage),
          relation: clientBenef.relationshipCandidate.code,
          descRelation: summaryById?.shariaFlag == 'conventional' ? clientBenef.relationshipCandidate.konven : clientBenef.relationshipCandidate.syariah,
          identification: [
            {
              type: 'KTP',
              number: clientBenef?.idNumber,
              expiryDate: ''
            }
          ]
        }

        _clientBenef.push(tempClinetBenef)
      })

    }
    if (doksulType == 'SKA') {
      if (AdditionalForms?.insuranceAttachmentLetter) {
        const additionalForms = JSON.parse(JSON.stringify(AdditionalForms))
        const skaData: TInsuranceAttachmentLetter = JSON.parse(additionalForms.insuranceAttachmentLetter)
        _clientLA = {
          ..._clientLA,
          relation: skaData.relationshipPHLA?.key,
          descRelation: skaData.relationshipPHLA?.label,
        }

        if (_clientBenef.length == 0) {
          skaData.relationshipLABeneficiarys.map((relationData: any, index: number) => {
            _clientBenef.push({
              role: `BENEF${index + 1}`,
              name: {
                full: ''
              },
              relation: relationData.relationshipLABeneficiary.code,
              descRelation: summaryById?.shariaFlag == 'conventional' ? relationData.relationshipLABeneficiary.konven : relationData.relationshipLABeneficiary.syariah,
            })
          })
        }
      }
    }

    if (doksulType == 'UW6') {
      if (RSPAJData?.premiumPayor) {
        const clientPYData: TFormDataPremiumPayor = JSON.parse(RSPAJData.premiumPayor);
        const clientCompanyLocationPY = clientPYData.clientCompanyLocation;
        const businessEntityLocationPY = clientPYData.businessEntityLocation;
        const clientResidenceLocationPY = clientPYData.clientResidenceLocation;

        clientPYDataTemp = {
          name: {
            full: clientPYData.clientName
          },
          relation: clientPYData.clientRelationshipPH.key,
          descRelation: clientPYData.clientRelationshipPH?.label,
          placeOfBirth: clientPYData.clientCityBirth,
          dateOfBirth: formaterDateSubmission(clientPYData.clientDateBirth),
          countryOfBirth: clientPYData.clientCountryBirth.code,
          descCountryOfBirth: clientPYData.clientCountryBirth.name,
          identification: [
            {
              type: 'KTP',
              number: clientPYData.clientIdCardNumber,
              expiryDate: clientPYData.clientMassValidUntil ? formaterDateSubmission(clientPYData.clientMassValidUntil) : ''
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
            number: clientPYData.clientRelationshipPH.key == 'B' ? clientPYData.businessEntityNpwpNumber : clientPYData.ClientNpwpNumber,
            reason: clientPYData.clientAsideFromNpwp.label || "",
            name: clientPYData.clientNpwpHolder
          },
          occupation: {},
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
            amount: minMaxSalaryData[clientPYData?.clientIncome?.key].max,
            amountCode: clientPYData.clientIncome.key,
            amountDesc: clientPYData.clientIncome.label,
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
        if (clientPYData.clientRelationshipPH.key == 'B') {
          clientPYDataTemp.occupation = {
            companyName: clientPYData.businessEntityName,
            type: clientPYData.fromBusinessEntity.label,
            businessType: clientPYData.typeBusinessEntity,
            address: {
              type: 'OF',
              line1: clientPYData.clientCompanyAddress,
              line2: '',
              line3: '',
              rt: clientPYData.businessEntityNeighbourhood1,
              rw: clientPYData.businessEntityNeighbourhood2,
              km: clientPYData.businessEntityKilometer,
              kelurahan: clientPYData.businessEntityUrbanVillage,
              kecamatan: clientPYData.businessEntityDistrict,
              city: clientPYData.businessEntityCity,
              province: clientPYData.businessEntityProvice.key,
              descProvince: clientPYData.businessEntityProvice.label,
              postalCode: clientPYData.businessEntityPostCode,
              country: businessEntityLocationPY?.key === 'AB' ? clientPYData.businessEntityAbroad?.code : businessEntityLocationPY?.key,
              descCountry: businessEntityLocationPY?.key === 'AB' ? clientPYData.businessEntityAbroad?.name : businessEntityLocationPY?.title,
            }
          }
          clientPYDataTemp.contact?.phone.push({
            "type": `office1`,
            "number": clientPYData.businessEntityPhones.businessEntityPhone ? clientPYData.businessEntityPhones.businessEntityPhoneCode.dial_code.replace('+', '') + clientPYData.businessEntityPhones.businessEntityPhone : '',
            "countryCode": clientPYData.businessEntityPhones.businessEntityPhoneCode.dial_code.replace('+', '')
          })
          clientPYDataTemp.contact.fax = clientPYData.businessEntityFaxs.businessEntityFax ? clientPYData.businessEntityFaxs.businessEntityFaxCode.dial_code.replace('+', '') + clientPYData.businessEntityFaxs.businessEntityFax : ''
        } else {
          clientPYDataTemp.occupation = {
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
          }
          clientPYDataTemp.address?.push({
            type: 'H',
            line1: clientPYData.clientResidenceAdress,
            line2: '',
            line3: '',
            rt: clientPYData?.clientResidenceNeighbourdhood1 || '',
            rw: clientPYData?.clientResidenceNeighbourdhood2 || '',
            km: clientPYData?.clientResideceKilometer || '',
            kelurahan: clientPYData.clientResidenceUrbanVillage,
            kecamatan: clientPYData.clientResidenceDistrict,
            city: clientPYData.clientResidenceCity,
            province: clientPYData.clientResidenceProvince.key,
            descProvince: clientPYData.clientResidenceProvince.label,
            postalCode: clientPYData.clientResidencePostCode,
            country: clientResidenceLocationPY?.key === 'AB' ? clientPYData.clientResidenceAbroad.code : clientResidenceLocationPY?.key,
            descCountry: clientResidenceLocationPY?.key === 'AB' ? clientPYData.clientResidenceAbroad.name : clientResidenceLocationPY?.title,
            residenceType: clientPYData.clientResidenceStatus.key == 'O' ? clientPYData.clientResidenceStatusOther : clientPYData.clientResidenceStatus.label
          })
          typeof clientPYData.clientCompanyPhones != 'string' && clientPYData.clientCompanyPhones?.map((contactData, index) => {
            clientPYDataTemp.contact?.phone.push({
              "type": `office${index + 1}`,
              "number": contactData.clientCompanyPhone ? contactData.clientCompanyPhoneCode.dial_code.replace('+', '') + contactData.clientCompanyPhone : '',
              "countryCode": contactData.clientCompanyPhoneCode.dial_code.replace('+', '')
            })
          })
        }


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
        tempClient.push(clientPYDataTemp)
      }
    }

    tempClient.push(_clientLA)
    tempClient = [...tempClient, ..._clientBenef]
    return tempClient;
  }

  const attachmentMap = (doksulType: TTypeSubmissionKey, SPAJData?: ISPAJData) => {
    if (doksulType == 'DOC_UPL') {
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
          name: 'MCU / Medical Check up',
          type: 'K',
          docId: '17060468'
        },
        {
          name: 'Kartu Keluarga',
          docId: '11010207',
          type: 'G'
        },
        {
          name: 'Passport',
          docId: '11010208',
          type: 'C'

        },
        {
          name: 'Akta Lahir / Kartu Identitas Anak',
          docId: '11010203',
          type: 'F'

        },
        {
          name: 'KIMS / KITAS / KITAP',
          docId: '11010302',
          type: 'D'

        }
      ]
      let _docs: TDocData[] = [];
      let _docsReturn: TAttachment[] = [];

      if (SPAJData?.policyHolderDocs) {
        const policyHolderDocs: TFormDoc = SPAJData?.policyHolderDocs ? JSON.parse(SPAJData?.policyHolderDocs) : defaultFormDoc
        if (policyHolderDocs.statementMarketer) _docs = [..._docs, ...policyHolderDocs.docs]

      }
      if (SPAJData?.primaryInsuredDocs) {
        const primaryInsuredDocs: TFormDoc = SPAJData?.primaryInsuredDocs ? JSON.parse(SPAJData?.primaryInsuredDocs) : defaultFormDoc
        if (primaryInsuredDocs.statementMarketer) _docs = [..._docs, ...primaryInsuredDocs.docs]

      }
      if (SPAJData?.premiumPayorDoc) {
        const premiumPayorDoc: TFormDoc = SPAJData?.premiumPayorDoc ? JSON.parse(SPAJData?.premiumPayorDoc) : defaultFormDoc
        if (premiumPayorDoc.statementMarketer) _docs = [..._docs, ...premiumPayorDoc.docs]
      }
      if (SPAJData?.topupPayorDoc) {
        const topupPayorDoc: TFormDoc = SPAJData?.topupPayorDoc ? JSON.parse(SPAJData?.topupPayorDoc) : defaultFormDoc
        if (topupPayorDoc.statementMarketer) _docs = [..._docs, ...topupPayorDoc.docs]
      }

      _docs.map((_doc: TDocData) => {
        const docDetailData = MAP_DOC_SPAJ.find((data) => { return data.name === _doc.typeDocument.label })
        _docsReturn.push(
          {
            name: `${_doc.typeDocument.label}-document`,
            type: docDetailData?.type || '',
            docId: docDetailData?.docId || '',
            base64: _doc.document || '',
          }
        );
      });
      return _docsReturn;
    }
    return [];
  }

  const productMap = useCallback((doksulType: TTypeSubmissionKey) => {
    if (getIsObjectExist(RSQSData?.product) && doksulType === 'SQS') {
      let productTempMapping = {
        name: RSQSData?.product?.label,
        code: RSQSData?.product?.key,
        currency: 'IDR',
        type: CHANNEL[RSQSData?.product?.key].productCategory || 'TRD',

      }
      return productTempMapping;

    } else if (doksulType === 'FORM-CONV') {
      let productTempMapping = {
        name: summaryById?.productName,
        code: summaryById?.productCode,
        currency: 'IDR',
        type: summaryById?.productCode ? CHANNEL[summaryById?.productCode].productCategory || 'TRD' : 'TRD',

      }
      return productTempMapping;
    }
    return {};
  }, [RSQSData?.product, summaryById?.productName]);

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
    const convDataResult = JSON.parse(summaryById?.convData!);
    if (convDataResult) {
      return docIdConv[convDataResult.productCode][convDataResult?.isGio ? 'GIO' : 'FUW'];
    }
    return '17060610'
  }
  const getRemarkAmendementForm = (amendCategory: string) => {
    let tempAmend: string[] = [];
    if (RSPAJData?.amandment) {
      const amendData: TFOrmAmendment = JSON.parse(RSPAJData.amandment);
      if (amendData.fillAmendment.key == 'Y') {
        amendData.amendmentDetail.map((amendDetail: any) => {
          if (amendDetail.category.label == amendCategory) {
            tempAmend.push(amendDetail.category.label);
            amendDetail.detailCategory.map((amendDetailCategory: any) => {
              tempAmend.push(amendDetailCategory.amendment);
            })
          }
        })
      }
    }

    return tempAmend.length > 0 ? tempAmend.join('\n\n') : ''
  }
  const getAttributesAgentForm = (amandementAgent: TMarketersInteraction) => {

    const time = moment().format('HH:mm:ss')
    return [
      {
        key: 'remark',
        value: amandementAgent.marketersInteraction,
      },
      {
        key: 'transactionType',
        value: amandementAgent.interactionType.key == 'E' ? amandementAgent.otherInteractionType : amandementAgent.interactionType.label,
      },
      {
        key: 'submitTime',
        value: time,
      },
      {
        key: 'location',
        value: amandementAgent.placeOfInteraction,
      },
    ]
  }

  const ilustrationSQSMap = async (doksulType: TTypeSubmissionKey) => {
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
      if (doksulType == 'SQS') {
        const base64Data = sqsIlustrationDocs[0].document
        const dataTable = sqsIlustrationDocs[1]?.document ? JSON.parse(sqsIlustrationDocs[1]?.document) : undefined
        const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);

        const docIllustration = await onCreateDocIllustration({ SQSData: RSQSData!, SPAJData: RSPAJData, allCustomerData, agentName: agentProfile?.displayName.enUs, agentCode: agentProfile.agentCode, type: 'DOKSUL', tableData: dataTable, chartImage: base64Data, campaignDate: campaignDate })
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
  const getAdditionalForm = () => {
    let _docId = '';
    if (RSQSData?.product?.key == 'U12') {
      _docId = '17060577'
    } else {
      _docId = '17060578'
    }
    const riderName = RSQSData?.additionalBenefits?.length != 0 ? RSQSData?.additionalBenefits![0].label : '';

    let _atributes: any[] = [
      {
        key: 'plan',
        value: ''
      },
      {
        key: 'desc',
        value: ''
      },
      {
        key: 'age',
        value: ''
      },
      {
        key: 'saver',
        value: ''
      }
    ]
    const calculatorData: TCalculatorData = JSON.parse(RSQSData?.calculator!);
    calculatorData.benefits.map((benefitData: TBenefitsValue) => {
      if (benefitData.benefitsCode) {
        _atributes = [
          {
            key: 'plan',
            value: benefitData.planRider.label
          },
          {
            key: 'desc',
            value: riderName?.replace('PRU', '')
          },
          {
            key: 'age',
            value: benefitData.periodRider.label
          },
          {
            key: 'saver',
            value: benefitData.saverRider.label == 'Tidak dipilih' ? '-' : benefitData.saverRider.label
          }
        ]
      }

    })
    return { docId: _docId, atributtes: _atributes }
  }
  const formMap = async (doksulType: TTypeSubmissionKey) => {
    let dataFormsMappingTemp: any;
    if (doksulType != 'DOC_UPL') {
      const dataChannel = CHANNEL[RSQSData?.product?.key!]
      let formMappingTemp = [];
      const tempAdditionalForm = AdditionalForms ? JSON.parse(JSON.stringify(AdditionalForms)) : undefined;
      //additional form start
      if (tempAdditionalForm) {
        Object.keys(tempAdditionalForm).map((keys, index) => {

          if (keys != 'additionalFormId' && tempAdditionalForm[keys] != '') {
            const dataForms = JSON.parse(tempAdditionalForm[keys])
            let dataFormsMappingTemp: TForm = {
              type: typeFormMapping[keys].type,
              docId: keys == 'formConversion' ? getDocIdConversion() : summaryById?.shariaFlag == 'conventional' ? typeFormMapping[keys].docIdConven : typeFormMapping[keys].docIdSharia,
              signature: [
                {
                  esign: {
                    role: 'PH',
                    location: dataForms.policyHolderSignLocation,
                    date: formaterDateSubmission(dataForms.policyHolderSignDate),
                    base64: dataForms.signPolicyHolder
                  },
                  digital: {}
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
                digital: {}
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
                digital: {}
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
              const convDataResult = JSON.parse(summaryById?.convData!);
              const _convType = convDataResult?.product?.productCode == 'H11' ? 'SYARIAH_PSSS_PWM' : convDataResult.product?.productCode == 'H13' ? 'SYARIAH_PSSSPRO_PWM' : convDataResult.product?.productCode == 'H10' ? 'KONVENSIONAL_PSS_PWM' : 'KONVENSIONAL_PSSPRO_PWM'
              dataFormsMappingTemp.attributes = [
                {
                  key: 'isGIO',
                  value: convDataResult.isGio ? 'Y' : 'N'
                },
                {
                  key: 'policyNumber',
                  value: convDataResult.policyNumber
                },
                {
                  key: 'convType',
                  value: _convType
                }

              ]
            } else if (keys == 'marketersInteraction') {
              dataFormsMappingTemp.attributes = getAttributesAgentForm(dataForms) as any
            }

            formMappingTemp.push(dataFormsMappingTemp)
          }
        })
      }
      //amend start
      if (RSPAJData?.amandment) {
        const amendData: TFOrmAmendment = RSPAJData?.amandment ? JSON.parse(RSPAJData?.amandment) : defaultFormAmendment;
        const signData: TFormSpajSignature = RSPAJData?.spajSignature ? JSON.parse(RSPAJData.spajSignature) : defaultFormSpajSignature
        if (amendData.fillAmendment.key == 'Y') {
          const amendRemarkAdministration = getRemarkAmendementForm("Administrasi");
          const amendRemarkMedical = getRemarkAmendementForm("Medical");

          if (amendRemarkAdministration) {
            const typeForm = typeFormMapping['formAmend'];
            let tempAmendForm: TForm = {
              type: typeForm.type,
              docId: summaryById?.shariaFlag == 'conventional' ? typeForm.docIdConven : typeForm.docIdSharia,
              signature: [],
              attributes: [
                {
                  key: 'remark',
                  value: amendRemarkAdministration
                }
              ]
            }
            formMappingTemp.push(tempAmendForm)
          }
          if (amendRemarkMedical) {
            const typeForm = typeFormMapping['formAmendMedical'];
            let tempAmendForm: TForm = {
              type: typeForm.type,
              docId: summaryById?.shariaFlag == 'conventional' ? typeForm.docIdConven : typeForm.docIdSharia,
              signature: [],
              attributes: [
                {
                  key: 'remark',
                  value: amendRemarkMedical
                }
              ]
            }
            formMappingTemp.push(tempAmendForm)
          }
        }
      }

      //ilustration start
      if (doksulType == 'SQS') {
        const ilustDoc = await ilustrationSQSMap(doksulType);
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
          const tempSqsSignature: TFormConfirmProductDoksul = RSQSData?.confirmationProductDoksul ? JSON.parse(RSQSData?.confirmationProductDoksul) : defaultFormConfirmProductDoksul;
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
              digital: {}
            })
            tempFormSqs.signature?.push({
              esign: {
                role: 'AG',
                date: formaterDateSubmission(tempSqsSignature?.marketerSignDate),
                location: tempSqsSignature?.marketerSignLocation,
                base64: tempSqsSignature?.signMarketer,
              },
              digital: {}
            })
          } else if (item.name.split('-')[1] == 'RiskProfile') {
            tempFormSqs.signature?.push({
              esign: {
                role: 'PH',
                date: formaterDateSubmission(tempSqsSignature?.riskProfilePolicyHolderDate),
                location: tempSqsSignature?.riskProfilePolicyHolderLocation,
                base64: tempSqsSignature?.signRiskProfilePolicyHolder,
              },
              digital: {}
            })
            tempFormSqs.signature?.push({
              esign: {
                role: 'AG',
                date: formaterDateSubmission(tempSqsSignature?.riskProfilemarketerDate),
                location: tempSqsSignature?.riskProfilemarketerLocation,
                base64: tempSqsSignature?.signRiskProfilemarketer,
              },
              digital: {}
            })
          } else {

          }
          formMappingTemp.push(tempFormSqs);
        })

        if (['U12', 'U13'].includes(RSQSData?.product?.key!)) {
          const dataFormAdditional = getAdditionalForm();
          const _additionalFormSQS: TFormAddInsuranceStatement = RSQSData?.additionalInsuranceStatement ? JSON.parse(RSQSData?.additionalInsuranceStatement!) : defaultFormAddInsuranceStatement
          formMappingTemp.push({
            type: "ADDITIONAL",
            docId: dataFormAdditional.docId,
            signature: [
              {
                esign: {
                  role: 'PH',
                  location: _additionalFormSQS.policyHolderSignLocation,
                  date: formaterDateSubmission(_additionalFormSQS.policyHolderSignDate),
                  base64: _additionalFormSQS.signPolicyHolder
                },
                digital: {}
              },
              {
                esign: {
                  role: 'AG',
                  location: _additionalFormSQS.marketerSignLocation,
                  date: formaterDateSubmission(_additionalFormSQS.marketerSignDate),
                  base64: _additionalFormSQS.signMarketer
                },
                digital: {}
              }
            ],
            attributes: dataFormAdditional.atributtes
          })
        }

      }


      if (doksulType == 'UW6') {
        const typeFormPayor = typeFormMapping['formPayor'];
        formMappingTemp.push({
          type: typeFormPayor.type,
          docId: summaryById?.shariaFlag == 'sharia' ? typeFormPayor.docIdSharia : typeFormPayor.docIdConven
        } as TForm)
      }

      return formMappingTemp
    }

    return []
  }

  const signMap = (doksulType: TTypeSubmissionKey) => {
    if (['UW6', 'AMEND'].includes(doksulType)) {
      let _signMap = [];
      const signData: TFormSpajSignature = RSPAJData?.spajSignature ? JSON.parse(RSPAJData?.spajSignature!) : defaultFormSpajSignature
      _signMap.push(
        {
          esign: {
            role: 'PH',
            date: formaterDateSubmission(signData.policyHolderSignDate),
            location: signData.policyHolderSignLocation,
            base64: signData.signPolicyHolder
          }
        }
      )
      _signMap.push(
        {
          esign: {
            role: 'AG',
            date: formaterDateSubmission(signData.marketerSignDate),
            location: signData.marketerSignLocation,
            base64: signData.signMarketer
          }
        }
      )
      if (doksulType == 'UW6') {
        _signMap.push({
          esign: {
            role: 'PY',
            date: formaterDateSubmission(signData.premiumPayorSignDate),
            location: signData.premiumPayorSignLocation,
            base64: signData.signPremiumPayor

          }
        })
      }
      return _signMap;
    }
    return [];
  }

  const generateDoksulSubmission = useCallback(async (doksulType: TTypeSubmissionKey) => {
    try {
      return {
        quotation: {
          id: proposalId,
          createdDate: formaterDateSubmission(summaryById?.createdDate),
          substandard: [],
          calculator: {},
          product: productMap(doksulType),
          riskProfile: {},
        },
        submission: {
          id: summaryById?.spajNumber,
          submitDate: formaterDateSubmission((new Date()).toString()),
          docId: '',
          type: doksulType,
          agent: agentMap,
          attachment: attachmentMap(doksulType, (RSPAJData!)),
          bankAccount: [],
          client: clientMap(doksulType), //TODO: JERI
          disclaimer: [],
          magnum: {}, //TODO: JERI
          previousSubmissionId: '',
          form: await formMap(doksulType),
          signature: signMap(doksulType),
          topUp: {},
          flag: {},
          flagBoMapping: [],
          payment: [],
          upfront: {}
        },
      }
    } catch (err) {
      // TODO CATCH ERROR
    }

  }, [])
  return {
    generateDoksulSubmission
  }
}

//#region FUNCTION HELPER
function getIsObjectExist(item?: unknown) {
  if (item) {
    return Object.keys(item).length > 0;
  }
  return false;
}

function formaterDateSubmission(date?: string, withFormat?: boolean) {
  if (date) {
    const dateResult = withFormat ? moment(date, 'LL') : moment(date)
    return dateResult.format('YYYYMMDD').toString()
  }
  return '';
}
//#endregion