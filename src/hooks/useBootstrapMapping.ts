import { useSelector } from "react-redux";
import { defaultMagnumBootStrap, magnumBootStarpData, MAGNUMMASTER, ISPAJData, ISQSDetail, COVERAGE, TGenderMap, TMaritalMap, TSmokingMap, TGender, TMaritalStatus, TSmokingStatus, Occp, TBootstrapAttributes } from "../utilities";
import moment from "moment";
import { RootState } from "../../../../app/redux/reducer";
import { EposState } from "../redux";
import { useObject, useEposRealm } from '../database';

export default function useMappingBootstrap() {
  let bootstrapData = [...defaultMagnumBootStrap];
  const MAGNUM_MASTER: MAGNUMMASTER = magnumBootStarpData;
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const { selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const {
    getMultipleCustomer,
  } = useEposRealm();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const indexInsured = RSQSData?.lifeAssuredSelf == 'self' ? 0 : 1
  const insuredData = allCustomerData[indexInsured]
  const additionalBenefits = RSQSData?.additionalBenefits;
  const isPrucerah = ['E1O', 'E1OP'].includes(RSQSData?.product?.key!)

  const GENDER_MAPPING: TGenderMap = {
    'M': 'MALE',
    'F': 'FEMALE'
  }
  const MARITAL_STATUS_MAPPING: TMaritalMap = {
    "S": "Single",
    "M": "Marriede",
    "Divorced": "Main Life",
    "W": "Widowed"
  }

  const SMOKING_STATUS_MAPPING: TSmokingMap = {
    "S": "SMOKER",
    "NS": "NON_SMOKER"
  }

  const masterProd: Record<string, string> = {
    "U10": "PAA2",
    "U11": "PSAA2",
    "T1P": "T1PR",
    "T1Q": "T1QR",
    "T1S": "T1SR",
    "T1R": "T1RR",
    "H10": "H101",
    "H11": "H111",
    "L1P": "L1PR",
    "E1O": "E1O1",
    "E1OP": "E1OR",
    "C16": "C16R",
    "H12": "H121",
    "H13": "H131",
    "U12": "U12R",
    "U13": "U13R",
    "U17R": "U17R",
    "U17D": "U17D",
    "U18": "U18R",
    "L1Q": "L1QR",
    "L1WR": "L1WR",
    "L1WD": "L1WD",
    "H14": "H141",
    "H15": "H151",
  }

  const _mappingBootstrap = () => {
    for (var i = 0; i < bootstrapData.length; i++) {
      var txt = "";
      if (bootstrapData[i].attribute.includes('case.life')) {
        txt = bootstrapData[i].attribute.replace(/\[+(\d+)+\]/g, ''); // masukin ke yang lain juga
      } else {
        txt = bootstrapData[i].attribute;
      }

      if (txt == "case.UnderwritingRegion") {
        var attrib = txt;
        bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][0].uuid;
      } else if (txt == "case.TransactionType") {
        var attrib = txt;
        bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][0].uuid;
      } else if (txt == "case.TransactionCode") {
        var attrib = txt;
        bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][0].uuid;
      } else if (txt == "case.CountryOfContract") {
        var attrib = txt;
        bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][0].uuid;
      } else if (txt == "case.SalesChannel") {
        var attrib = txt;
        for (var j = 0; j < MAGNUM_MASTER.basicData[attrib].length; j++) {
          if (MAGNUM_MASTER.basicData[attrib][j].label == 'AG') {
            bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][j].uuid;
            break;
          }
        }

      } else if (txt == "case.Agency") {
        bootstrapData[i].valueAsString = authState?.agentCode;
      } else if (txt == "case.CorporateAgency") {
        var attrib = txt;
        for (var j = 0; j < MAGNUM_MASTER.basicData[attrib].length; j++) {
          if (MAGNUM_MASTER.basicData[attrib][j].label == "No") {
            bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][j].uuid;
          }
        }
      } else if (txt == "case.ClientPresent") {
        var attrib = txt;
        for (var j = 0; j < MAGNUM_MASTER.basicData[attrib].length; j++) {
          if (MAGNUM_MASTER.basicData[attrib][j].label == "Yes") {
            bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][j].uuid;
          }
        }
      } else if (txt == "case.ApplicationSignDate") {
        var attrib = txt;
        //bootstrapData[i].valueAsString = moment(new Date()).format('MM/DD/YYYY');
        bootstrapData[i].valueAsString = moment(new Date()).format('YYYY-MM-DD');
      } else if (txt == "case.SalesBusinessSource") {
        var attrib = txt;
        for (var j = 0; j < MAGNUM_MASTER.basicData[attrib].length; j++) {
          if (RSQSData?.policyType.toUpperCase() == MAGNUM_MASTER.basicData[attrib][j].label.toUpperCase()) {
            bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][j].uuid;
            break;
          }
        }
      } else if (txt == "case.ApplicationType") {
        var attrib = txt;
        if (RSQSData?.isGIO) {
          for (var j = 0; j < MAGNUM_MASTER.basicData[attrib].length; j++) {
            if (MAGNUM_MASTER.basicData[attrib][j].label == "GIO") {
              bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][j].uuid;
              break;
            }
          }
        }
        else {
          for (var j = 0; j < MAGNUM_MASTER.basicData[attrib].length; j++) {
            if (MAGNUM_MASTER.basicData[attrib][j].label == "Normal") {
              bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][j].uuid;
              break;
            }
          }
        }
      } else if (txt == "case.FormClass") {
        var attrib = txt;
        bootstrapData[i].valueAsString = MAGNUM_MASTER.basicData[attrib][0].uuid;
      } else if (txt == "case.FormText") {
        var attrib = txt;
        bootstrapData[i].valueAsString = "";
      }
    }

    let defaultInitialLife: TBootstrapAttributes[] = []

    const clientCount = RSQSData?.clientIdSelected.length ?? 0
    const clientData = []

    let LAIndex = 0;
    let TTIndex = 0;

    if (clientCount > 1) {
      LAIndex = 1
    }

    clientData.push(allCustomerData[LAIndex]);

    if (clientCount === 3) {
      if (RSQSData?.additionalLifeAssuredSelf === 'other') {
        TTIndex = 2;
      }
      clientData.push(allCustomerData[TTIndex]);
    }

    const defaultAttributes: Record<string, string | number> = {
      'Gender': '2c092228-bc36-4208-874f-9c3082f59bab',
      'LifeID': 'LA168879753924319000053752',
      'MaritalStatus': '2836d692-1642-4b6d-978f-6f79287a4318',
      'SmokingStatus': 'e2813798-35a9-4e2f-9715-f90ba5161413',
      'OccupationCode': '0473d7fe-67f8-43c6-8dc2-0e52df9f3dbd',
      'LifeRole': '3f0a276f-b01a-4404-8a96-830643db8184',
      'ProductType': '62b48eaf-f5ca-4574-94eb-91e206bbbb29',
      'ExistingSystemRecords.ClaimCodePresent': '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      'ExistingSystemRecords.ImpairmentCodePresent': '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      'Financial.TotalADBOrADDSumAssuredThisCompany': 1,
      'Financial.TotalCISumAssuredThisCompany': 1,
      'Financial.TotalLIFESumAssuredThisCompany': 1,
      'Financial.TotalTPDSumAssuredThisCompany': 1,
      'NonMedical.TotalCICoverAmountForRoutineMedicalEvaluation': 1,
      'NonMedical.TotalLifeCoverAmountForRoutineMedicalEvaluation': 1,
      'NonMedical.TotalPPHAmountCurrentApplicationForRoutineMedicalEvaluation': 1,
      'PreviousAdverseDecision.DeclinedOrPostponeRecordThisCompany': '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      'PreviousAdverseDecision.SubStandardRecordThisCompany': '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      'product[0].CoverPurpose': '3eae62ed-46c5-4100-a975-fab75a642cab',
    }

    clientData.map((val, clientIndex) => {
      // get client gender
      const gender = val.clientGender.key as TGender;
      const genderMapping = GENDER_MAPPING[gender];
      let resultGender = MAGNUM_MASTER.basicData['case.life.Gender'].find((item) => item.label === genderMapping)?.uuid ?? defaultAttributes['Gender'];

      // get client id
      const clientId = RSQSData?.clientIdSelected[clientIndex] ?? defaultAttributes['LifeID']

      // get client marital status
      const maritalStatus = val.clientMarriageStatus.key as TMaritalStatus
      const marritalMapping = MARITAL_STATUS_MAPPING[maritalStatus];
      let resultMariage = MAGNUM_MASTER.basicData['case.life.MaritalStatus'].find((item) => item.label === marritalMapping)?.uuid ?? defaultAttributes['MaritalStatus'];

      // get client smoke status
      const smokeStatus = val.clientSmokeStatus.key as TSmokingStatus
      const smokeMapping = SMOKING_STATUS_MAPPING[smokeStatus];
      let resultSmoking = MAGNUM_MASTER.basicData['case.life.SmokingStatus'].find((item) => item.label === smokeMapping)?.uuid ?? defaultAttributes['SmokingStatus'];

      // get client occupation
      const occupation = val.clientJob.code as keyof Occp
      let resultOccupation = MAGNUM_MASTER.occp[occupation]?.uuid ?? defaultAttributes['OccupationCode'];

      // get client life role
      let resultLifeRole = MAGNUM_MASTER.basicData['case.life.product.LifeRole'].find((item) => item.label === 'Main Life')?.uuid ?? defaultAttributes['LifeRole'];
      if (clientIndex > 0 && isPrucerah) {
        resultLifeRole = MAGNUM_MASTER.basicData['case.life.product.LifeRole'].find((item) => item.label === 'Second Life')?.uuid ?? defaultAttributes['LifeRole'];
      }

      // get client annual income
      let resultIncome = Number(val.clientIncome.key) * 12

      // get client product
      let productType = masterProd[RSQSData?.product?.key!];
      const resultProductType = MAGNUM_MASTER.basicData['case.life.product.type'].find((item) => item.label === productType)?.uuid ?? defaultAttributes['ProductType'];

      defaultInitialLife.push(
        {
          attribute: `case.life[${clientIndex}].ExistingSystemRecords.ClaimCodePresent`,
          valueAsString: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
        },
        {
          attribute: `case.life[${clientIndex}].ExistingSystemRecords.ImpairmentCodePresent`,
          valueAsString: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
        },
        {
          attribute: `case.life[${clientIndex}].Financial.TotalADBOrADDSumAssuredThisCompany`,
          valueAsString: 1,
        },
        {
          attribute: `case.life[${clientIndex}].Financial.TotalCISumAssuredThisCompany`,
          valueAsString: 1,
        },
        {
          attribute: `case.life[${clientIndex}].Financial.TotalLIFESumAssuredThisCompany`,
          valueAsString: 1,
        },
        {
          attribute: `case.life[${clientIndex}].Financial.TotalTPDSumAssuredThisCompany`,
          valueAsString: 1,
        },
        {
          attribute: `case.life[${clientIndex}].NonMedical.TotalCICoverAmountForRoutineMedicalEvaluation`,
          valueAsString: 1,
        },
        {
          attribute: `case.life[${clientIndex}].NonMedical.TotalLifeCoverAmountForRoutineMedicalEvaluation`,
          valueAsString: 1,
        },
        {
          attribute: `case.life[${clientIndex}].NonMedical.TotalPPHAmountCurrentApplicationForRoutineMedicalEvaluation`,
          valueAsString: 1,
        },
        {
          attribute: `case.life[${clientIndex}].PreviousAdverseDecision.DeclinedOrPostponeRecordThisCompany`,
          valueAsString: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
        },
        {
          attribute: `case.life[${clientIndex}].PreviousAdverseDecision.SubStandardRecordThisCompany`,
          valueAsString: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
        },
        {
          attribute: `case.life[${clientIndex}].product[0].CoverPurpose`,
          valueAsString: '3eae62ed-46c5-4100-a975-fab75a642cab',
        },
        {
          attribute: `case.life[${clientIndex}].DateOfBirth`,
          valueAsString: `${val.clientDateBirth}`
        },
        {
          attribute: `case.life[${clientIndex}].Financial.AnnualIncome`,
          valueAsString: isNaN(resultIncome) ? 0 : resultIncome
        },
        {
          attribute: `case.life[${clientIndex}].Gender`,
          valueAsString: resultGender
        },
        {
          attribute: `case.life[${clientIndex}].GivenName`,
          valueAsString: val.clientName
        },
        {
          attribute: `case.life[${clientIndex}].InsuranceAge`,
          valueAsString: val.clientAnb
        },
        {
          attribute: `case.life[${clientIndex}].LifeID`,
          valueAsString: clientId
        },
        {
          attribute: `case.life[${clientIndex}].MaritalStatus`,
          valueAsString: resultMariage
        },
        {
          attribute: `case.life[${clientIndex}].SmokingStatus`,
          valueAsString: resultSmoking
        },
        {
          attribute: `case.life[${clientIndex}].occupations[0].OccupationCode`,
          valueAsString: resultOccupation
        },
        {
          attribute: `case.life[${clientIndex}].product[0].ID`,
          valueAsString: clientIndex
        },
        {
          attribute: `case.life[${clientIndex}].product[0].LifeRole`,
          valueAsString: resultLifeRole
        },
        {
          attribute: `case.life[${clientIndex}].product[0].type`,
          valueAsString: resultProductType
        }
      )

      let benefitIndex = 0
      if(isPrucerah) {
        benefitIndex = clientIndex
      }

      // mapping product benefit data
      const coverageCode = RSQSData?.mainAdditionalBenefits
        ? RSQSData?.mainAdditionalBenefits[benefitIndex].key
        : '';

      const benefitTypeList = COVERAGE[coverageCode]?.benefitType?.length
        ? COVERAGE[coverageCode].benefitType.split(', ')
        : [];

      const benefitTypeData = MAGNUM_MASTER.basicData['case.life.product.benefit.type'];

      let defaultBenefit: TBootstrapAttributes[] = [
        {
          attribute: `case.life[${clientIndex}].product[0].benefit[0].WOPCategory`,
          valueAsString: 'af59ce86-0f57-4962-8d8e-ab2340a028e0',
        },
        {
          attribute: `case.life[${clientIndex}].product[0].benefit[0].amount`,
          valueAsString: 1100000,
        },
        {
          attribute: `case.life[${clientIndex}].product[0].benefit[0].termBasis`,
          valueAsString: 'de701835-42fc-40ae-b31e-b2388167a1d8',
        },
        {
          attribute: `case.life[${clientIndex}].product[0].benefit[0].type`,
          valueAsString: 'df67ed16-095c-4b27-9d25-b3f429f6fd10',
        },
      ];

      if (benefitTypeList.length > 0) {
        defaultBenefit = benefitTypeList.map((benefitType: any, benefitIndex: number) => {
          const benefitUuid =
            benefitTypeData.find((itemBenef) => itemBenef.label === benefitType)
              ?.uuid ?? '';

          return [
            {
              attribute: `case.life[${clientIndex}].product[0].benefit[${benefitIndex}].WOPCategory`,
              valueAsString: 'af59ce86-0f57-4962-8d8e-ab2340a028e0',
            },
            {
              attribute: `case.life[${clientIndex}].product[0].benefit[${benefitIndex}].amount`,
              valueAsString: 1100000,
            },
            {
              attribute: `case.life[${clientIndex}].product[0].benefit[${benefitIndex}].termBasis`,
              valueAsString: 'de701835-42fc-40ae-b31e-b2388167a1d8',
            },
            {
              attribute: `case.life[${clientIndex}].product[0].benefit[${benefitIndex}].type`,
              valueAsString: benefitUuid,
            },
          ];
        }).flat();

        // if has mainAdditionalBenefits / has Rider for PNG
        if (additionalBenefits && additionalBenefits?.length > 0) {
          additionalBenefits.map((val, index) => {
            const rider = COVERAGE[val.key]?.benefitType;
            defaultBenefit.push(
              {
                attribute: `case.life[${clientIndex}].product[0].benefit[${benefitTypeList.length + index}].WOPCategory`,
                valueAsString: 'af59ce86-0f57-4962-8d8e-ab2340a028e0',
              },
              {
                attribute: `case.life[${clientIndex}].product[0].benefit[${benefitTypeList.length + index}].amount`,
                valueAsString: 1100000,
              },
              {
                attribute: `case.life[${clientIndex}].product[0].benefit[${benefitTypeList.length + index}].termBasis`,
                valueAsString: 'de701835-42fc-40ae-b31e-b2388167a1d8',
              },
              {
                attribute: `case.life[${clientIndex}].product[0].benefit[${benefitTypeList.length + index}].type`,
                valueAsString: benefitTypeData.find((itemBenef) => itemBenef.label === rider)
                  ?.uuid ?? '',
              },
            );
          })
        }
      }

      defaultInitialLife.push(...defaultBenefit);
    })

    return {
      attributes: [...bootstrapData, ...defaultInitialLife]
    };
  }

  return {
    _mappingBootstrap
  }
}
