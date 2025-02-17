import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { groupedData, plaiStyles, ModalInformation, LoadingFull } from 'plai_common_frontend';
import { EposFooter, EposHeader } from '../../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { CompletenessDataCard } from './completeness-data-card/completeness-data-card';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, TCheckStatusMicrosite } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { benefiteList, calculateAge, checkMainParticipant, getConditionLampung, ISPAJData, ISPAJDataCompleteness, ISQSDetail, ISummaryProposal, magnumGetCaseAnswers, showModalMaintenance, WR_SHARIA_CONVENT } from '../../../utilities';
import { TBeneficiaryCandidateInfo } from '../spaj-beneficiary-candidate/spaj-beneficiary-candidate.type';
import { getLicenses, getValidateContact } from '../../../network';
import { fieldNias } from '../spaj-amandement/spaj-amendment.type';
import moment from 'moment';

export const SpajDataCompletenessScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [modal, setModal] = useState({
    title: "",
    description: "",
    visible: false
  })
  const currentDate = moment();
  const { updateSPAJStatusSubMenu, updateSPAJByKey, getMultipleCustomer, updateSummaryByKey} = useEposRealm();
  const { selectedSQSId, spajId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const isProductPWM = RSQSData?.product?.key === 'H14' || RSQSData?.product?.key === 'H15';
  const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData.convDataResult) : '';
  const haveOtherInsurance = RSPAJData?.activePolicy ? JSON.parse(RSPAJData.activePolicy) : '';
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : null;
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : '';
  const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
  const waqfProgram = beneficiary?.waqfProgram;
  const beneficiaryCandidateInfo = beneficiary?.beneficiaryCandidateInfo;
  const MaritalStatusLA = lifeAssuredSelf == 'self' ? policyHolderData?.clientMaritalStatus : primaryInsured?.clientMaritalStatus;
  const topup = RSPAJData?.topup ? JSON.parse(RSPAJData.topup) : '';
  const topupPremiumPyor = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData.topupPremiumPyor) : '';
  const mainParticipant = useMemo(() => checkMainParticipant(SummaryProposalById?.productCode, RSQSData?.policyType), []);
  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');
  const premiumPayor = RSPAJData?.premiumPayor ? JSON.parse(RSPAJData.premiumPayor) : ''
  const additionalInsured = RSPAJData?.additionalInsured ? JSON.parse(RSPAJData.additionalInsured) : '';
  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const [loadingValidate, setLoadingValidate] = useState(false)
  const _DataCompleteness = useMemo(() => {
    const DataCompleteness = RSPAJData?.DataCompleteness as ISPAJDataCompleteness[];

    // Helper function to filter out unwanted keys
    const filterDataCompleteness = (keysToExclude: string[]) => {
      return DataCompleteness?.filter((value: ISPAJDataCompleteness) =>
        !keysToExclude.includes(value?.key)
      );
    };

    // Determine which keys to exclude based on conditions
    if (confirmationSQS?.premiumPaymentCandidate !== 'N' && topup?.additionalTopup?.key !== 'Y' && !topupPremiumPyor) {
      return filterDataCompleteness([
        'SPAJDocPremiumPayor',
        'SPAJTopup_Premium_payer',
        'SPAJDocTopupPayor'
      ]);
    }
    if (confirmationSQS?.premiumPaymentCandidate === 'N' && topup?.additionalTopup?.key !== 'Y' && !topupPremiumPyor) {
      return filterDataCompleteness([
        'SPAJTopup_Premium_payer',
        'SPAJDocTopupPayor'
      ]);
    }
    if (confirmationSQS?.premiumPaymentCandidate !== 'N' && topupPremiumPyor?.topupPremiPayer?.key !== 'O') {
      return filterDataCompleteness([
        'SPAJDocPremiumPayor',
        'SPAJDocTopupPayor'
      ]);
    }
    if (confirmationSQS?.premiumPaymentCandidate === 'N' && topupPremiumPyor?.topupPremiPayer?.key !== 'O') {
      return filterDataCompleteness([
        'SPAJDocTopupPayor'
      ]);
    }
    if (confirmationSQS?.premiumPaymentCandidate !== 'N') {
      return filterDataCompleteness([
        'SPAJDocPremiumPayor',
      ]);
    }

    // Return the original DataCompleteness if no conditions
    return DataCompleteness;
  }, [RSPAJData, topup, topupPremiumPyor, confirmationSQS]);


  const ConfigSPAJDataCompleteness = groupedData(_DataCompleteness, 'categoryKey');


  const onBack = () => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_BEFORE_PROCEEDING));
    return null;
  };

  // Convert grouped data to an array with sequence numbers
  let sequenceNumber = 1;
  const groupedArray = Object.entries(ConfigSPAJDataCompleteness).map(([categoryKey, data]) => ({
    sequenceNumber: sequenceNumber++,
    categoryKey,
    data: data as ISPAJDataCompleteness[],
  }));

  useEffect(() => {

    if (RSQSData?.lifeAssuredSelf === 'self') {
      updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_POLICY_OWNER_DATA, {
        key: 'name',
        value: `${t('Epos:prospective_policyholder')} (${mainParticipant})`,
      });
    }
    const primaryInsuredActiveStatus = haveOtherInsurance?.haveOtherInsurance !== undefined;
    updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE, {
      key: 'status',
      value: primaryInsuredActiveStatus,
    });
  }, []);

  const isValid = _DataCompleteness.every((item: any) => item.status === true);

  const validationSKAForm = () => {

    // relationship PH & LA
    const ageLA = calculateAge(SummaryProposalById?.lifeAssuredDob ? SummaryProposalById.lifeAssuredDob : '')

    let relationship = false
    if (lifeAssuredSelf !== 'self') {
      switch (primaryInsured?.clientPolicyHolder?.key) {
        case 'FA':
          if ((policyHolderData?.clientMaritalStatus?.key === 'M' || policyHolderData?.clientMaritalStatus?.key === 'W') && ageLA >= 21) {
            relationship = true;
          }
          break;

        case 'GP':
          if (ageLA < 21) {
            relationship = true;
          }
          break;

        case 'UA':
          if (ageLA < 21) {
            relationship = true;
          }
          break;

        case 'MM':
          relationship = true;
          break;

        case 'O':
          if (MaritalStatusLA?.key === 'S') {
            relationship = true;
          }
          break;

        default:
          break;
      }
    }


    // relationship LA & Beneficiary
    const mainFamily = {
      S: ['MO', 'FA', 'BS'],
      M: ['HU', 'WI', 'SO', 'DA'],
      W: ['SO', 'DA']
    }
    const outsiteFamily = benefiteList.filter((item: any) => !mainFamily[MaritalStatusLA?.key]?.includes(item?.code));
    const getBenefitCode = beneficiaryCandidateInfo?.map(
      (value: TBeneficiaryCandidateInfo) => value.relationshipCandidate['code'],
    );

    const filteredBenefits = outsiteFamily?.filter((item: any) => getBenefitCode?.includes(item?.code));

    return {
      relationshipPHLA: relationship,
      relationshipPHBenefite: filteredBenefits
    }
  }

  const checkValidateAdditionalForm = () => {
    const additionalForms = []

    if (policyHolderData?.clientReceiveSummary?.key === 'Y') {
      additionalForms.push({
        key: '6',
        label: 'Form Cetak Polis',
        documentName: 'Form-Cetak-Polis'
      })
    }
    if (getConditionLampung(RSQSData, RSPAJData, isHealth)) {
      additionalForms.push({
        key: '5',
        label: 'Form Lampung',
        documentName: 'FORM'
      })
    }
    if (waqfProgram?.key === 'Y') {
      additionalForms.push({
        key: '7',
        label: 'Form Wakaf',
        documentName: 'WakafEform'
      })
    }
    if (validationSKAForm()?.relationshipPHLA || validationSKAForm()?.relationshipPHBenefite?.length > 0) {
      additionalForms.push({
        key: '4',
        label: 'SKA',
        documentName: 'SKA'
      })
    }
    if (isProductPWM && (convDataResult?.convFlag == 'GIO' || convDataResult?.convFlag == 'FUW')) {
      additionalForms.push({
        key: '9',
        label: 'Formulir Konversi',
        documentName: 'Konversi,Form-Konversi'
      })
    }

    return additionalForms
  }

  const responseError = (value: any) => {
    if (!value?.ok && value?.problem) {
      // setloadingValidate(false);
      setModal({
        title: t('Epos:unable_to_connect'),
        description: t('Epos:unable_to_connect_to_the_server'),
        visible: true
      })
    }
  }

  // CONTACT VALIDATION
  const contact = policyHolderData ? policyHolderData?.clientResidencePhoneCells[0] : null;
  const paramsContactValidate = {
    ktp: policyHolderData?.clientIdCardNumber,
    type: "pruforce",
    number_phone: contact?.clientResidencePhoneCellCode?.dial_code + contact?.clientResidencePhoneCell,
    email_address: policyHolderData?.clientEmail
  };


  const getValidationContact = async () => {
    try {
      const _validateContact = await getValidateContact(paramsContactValidate);
      const result = _validateContact?.data as TCheckStatusMicrosite
      if (result) {
        return result?.responseCode
      }
      responseError(_validateContact)
    } catch (error) {
      setLoadingValidate(false)
    }
  }


  // LICENSE
  const getLicense = async () => {
    try {
      const _license = await getLicenses();
      const result = _license?.data as any
      if (result) {
        return result?.license
      }
      responseError(_license)
    } catch (error) {
      setLoadingValidate(false)
    }
  }

  // VULNARABLE NIAS
  // check the city of PH & LA (NIAS))
  const isCityInList = (city: string) => {
    const keyOfCity = ['GUNUNGSITOLI', 'NIAS BARAT', 'NIAS UTARA', 'NIAS', 'NIAS SELATAN'];
    return keyOfCity.includes(city?.toLocaleUpperCase());
  };
  const getNiasCity = (value: fieldNias) => [
    isCityInList(value?.clientCompanyCity),
    isCityInList(value?.clientResidenceCity),
    isCityInList(value?.clientOtherResidenceCity)
  ]

  const validationNias = () => {
    // concat data PH & LA
    const checkNiasCity = [
      ...getNiasCity(policyHolderData),
      ...getNiasCity(primaryInsured),
      ...getNiasCity(additionalInsured)
    ]
    // check if there is one of them
    return checkNiasCity.some(Boolean);
  }
  const checkValidation = async () => {
    setLoadingValidate(true)
    const validateContact = await getValidationContact();
    const license = await getLicense();

    const conditions = [
      {
        condition: validationNias(),
        message: t('Epos:SPAJ_application_cannot_be_processed')
      },
      {
        condition: RSQSData?.policyType === 'conventional' && currentDate > moment(license[0]?.licenseExpiredDate),
        message: t('Epos:popup_blocking_convenLicense')
      },
      {
        condition: RSQSData?.policyType === 'sharia' && currentDate > moment(license[1]?.licenseExpiredDate),
        message: t('Epos:popup_blocking_shariaLicense')
      },
      {
        condition: validateContact == '01',
        message: t('Epos:popup_blocking_phoneNumber')
      },
      {
        condition: validateContact == '02',
        message: t('Epos:popup_blocking_email')
      },
      {
        condition: validateContact == '03',
        message: t('Epos:popup_blocking_existingPH', { spaj: wording.spaj })
      },
      {
        condition: validateContact == '00',
        message: 'passed'
      },
    ];
    setLoadingValidate(false)
    if (Array.isArray(license) && validateContact) {
      const result = conditions.find(item => item.condition)?.message
      return result
    }
  }
  const checkBlockingValidation = async () => {
    try {
      const clientIndex =
        RSQSData?.lifeAssuredSelf === 'self'
          ? 0
          : RSQSData?.additionalLifeAssuredSelf === 'self'
            ? 2
            : 1;
      const smokingStatus = allCustomerData[clientIndex]?.clientSmokeStatus?.key;
      const result = await magnumGetCaseAnswers(proposalId)
      let counterResult = 0;
      for (let i = 0; i < result.Data.LifeList.length; i++) {
        for (let j = 0; j < result.Data.LifeList[i].Forms.length; j++) {
          if (result.Data.LifeList[i].Forms[j].Title == 'Fisik dan kebiasaan') {
            for (let k = 0; k < result.Data.LifeList[i].Forms[j].ChildElements.length; k++) {
              if (result.Data.LifeList[i].Forms[j].ChildElements[k].Title == 'Status Merokok') {
                for (let l = 0; l < result.Data.LifeList[i].Forms[j].ChildElements[k].ChildElements.length; l++) {
                  let smokeStatus = result.Data.LifeList[i].Forms[j].ChildElements[k].ChildElements[0].Answer == 'Ya' ? "S" : "NS";
                  if (smokingStatus != smokeStatus) {
                    counterResult++;
                  }
                }
              }
            }
            break;
          }
        }
      }

      if (counterResult != 0) {
        setModal({
          title: "Perhatian",
          description: `Status merokok pada SQS beda dengan ${wording.spaj}. Silakan mengisi kembali dengan status merokok yang benar.`,
          visible: true
        })
        return false
      }
      const blockPremiumPayor = premiumPayor?.clientIncome?.key === "0";
      if (blockPremiumPayor) {
        setModal({
          title: t('Epos:unable_to_continue'),
          description: t('Epos:jobless'),
          visible: true
        })
        return false
      }

      const validation = await checkValidation()
      if (validation != 'passed') {
        if (!validation) {
          showModalMaintenance();
        } else {
          setModal({
            title: t('Epos:attention'),
            description: validation,
            visible: true
          })
        }
        return false
      }

      if (counterResult == 0 && !blockPremiumPayor && validation == 'passed') {
        return true;
      }

      return false

    } catch (err) {
      showModalMaintenance();
      setLoadingValidate(false)
      return false
    }
  }

  const closeModal = () => {
    setModal({ title: "", description: "", visible: false })
  }


  const onContinue = async () => {
    const result = await checkBlockingValidation()
    if (result) {
      updateSPAJByKey(RSPAJData.spajId, [
        {
          key: 'flagForm',
          value: JSON.stringify(checkValidateAdditionalForm())
        }
      ]);
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.DISCLAIMER,
      });
      navigation.dispatch(StackActions.replace(EposRoutes.DISCLAIMER));
    }
  };

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      {loadingValidate && <LoadingFull />}
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:spaj_completeness')}</Text>
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>{t('Epos:fill_in_spaj')}</Text>

          <ScrollView>
            {groupedArray.map((item) => (
              <CompletenessDataCard
                sequenceNumber={item.sequenceNumber}
                categoryKey={item.categoryKey}
                data={item.data}
                productKey={RSQSData?.product?.key ?? ''}
              />
            ))}
          </ScrollView>
        </View>
        <EposFooter
          position={6}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: !isValid,
            onPress: onContinue
          }}
        />
      </>
      <ModalInformation
        title={modal.title}
        desc={modal.description}
        visible={modal.visible}
        buttonPrimary={{
          text: 'Oke',
          onPress: closeModal
        }}
      />
    </PruScreen>
  );
};
