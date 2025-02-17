import { View, Text, ScrollView, Pressable, BackHandler, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  DropdownField,
  InputField,
  LoadingFull,
  ShapeItem,
  plaiStyles,
} from 'plai_common_frontend';
import {
  EposFooter,
  EposHeader,
  SectionField,
  OptionCard,
  DoksulHeader,
  TOptionalCardData,
} from '../../../components';
import { useTranslation } from 'react-i18next';
import { IAdditionalForms, useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
// @ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { TBeneficiaryCandidateInfo } from '../../espaj/spaj-beneficiary-candidate/spaj-beneficiary-candidate.type';
import { SKADocumentAttachment, SKAList, benefiteList, checkMainParticipant, generateRelationPHwithTU, relationshipPH, ISPAJData, ISQSDetail, ISummaryProposal, DEFAULT_OPTIONAL_DATA, showModalFailedSubmitDoksul, showModalDialogSubmitDoksul, validateObject, TCommonOptionalData, getConditionLampung } from '../../../utilities';
import { Controller, SubmitHandler, useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { ValidationForm, calculateAge } from '../../../utilities/common-function';
import { DEFAULT_MAINFAMILIES, TInsuranceAttachmentLetter, defaultInsuranceAttachmentLetter } from './insurance-attachment-letter.type';
import { Button } from 'common_ui_components/app/components-ui';
import moment from 'moment';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { SignatureForm } from '../../../components/signature-form/signature-form';
import { useDoksulSubmission } from '../../../hooks';
import RNFS from 'react-native-fs';
import { setStateDisableByKey } from './insurance-attachment-letter.function';
import { postSubmissionDoksul } from '../../../network/services';

export const InsuranceAttachmentLetterScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useRoute().params as any
  const { onUpdateAdditionalForms, updateSummaryByKey, updateSPAJByKey } = useEposRealm();
  const { spajId, additionalFormsId, proposalId, selectedSQSId, isDoksul } = useSelector<
    RootState,
    EposState
  >((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const policyType = RSQSData ? RSQSData.policyType : '';
  const _policyType = policyType === 'conventional' ? 'konven' : 'syariah';
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const phGender = policyHolderData?.clientGender?.key;
  const phBirthDate = policyHolderData?.clientDateBirth;
  const clientResidenceProvince = policyHolderData?.clientResidenceProvince;
  const clientReceiveSummary = policyHolderData?.clientReceiveSummary;
  const maritalStatusPH = policyHolderData?.clientMaritalStatus;
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : '';
  const MaritalStatusLA = lifeAssuredSelf == 'self' ? maritalStatusPH : primaryInsured?.clientMaritalStatus;
  const laBirthDate = primaryInsured?.clientDateBirth;
  const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
  const beneficiaryCandidateInfo = beneficiary?.beneficiaryCandidateInfo;
  const benefitList = beneficiaryCandidateInfo?.map(
    (value: TBeneficiaryCandidateInfo) => value.relationshipCandidate[_policyType],
  );
  const benefitCodeList = beneficiaryCandidateInfo?.map(
    (value: TBeneficiaryCandidateInfo) => value.relationshipCandidate['code'],
  );
  const waqfProgram = beneficiary?.waqfProgram;
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const insuranceAttachmentLetter = AdditionalForms?.insuranceAttachmentLetter
    ? JSON.parse(AdditionalForms.insuranceAttachmentLetter)
    : '';
  const [tempRelationshipLA, setTempRelationshipLA] = useState<TOptionalCardData>(
    insuranceAttachmentLetter ? insuranceAttachmentLetter?.relationshipPHLA : null,
  );
  const [loading, setLoading] = useState(false)
  const [disableOnlyMainFam, setDisableOnlyMainFam] = useState(false)
  const relationshipLA =
    (isDoksul && tempRelationshipLA) ||
    (isDoksul && primaryInsured == '' && tempRelationshipLA) ||
    primaryInsured?.clientPolicyHolder;

  const ageLA = useMemo(() => calculateAge(SummaryProposalById?.lifeAssuredDob ? SummaryProposalById.lifeAssuredDob : ''),
    [SummaryProposalById?.lifeAssuredDob]);

  const summaryProposalShariaFlag = SummaryProposalById?.shariaFlag || 'conventional';

  const mainParticipant = useMemo(() => checkMainParticipant(RSQSData?.product?.key ?? '', summaryProposalShariaFlag), []);

  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');
  const isProductPWM = useMemo(() => {
    return RSQSData?.product?.key === 'H14' || RSQSData?.product?.key === 'H15';
  }, []);

  const { generateDoksulSubmission } = useDoksulSubmission();

  const relationShipWithPH = generateRelationPHwithTU(summaryProposalShariaFlag as 'sharia' | 'conventional', phGender, maritalStatusPH?.key, phBirthDate, laBirthDate, mainParticipant);
  const titleHeader = 'Surat Keterikatan Asuransi'
  const isLifeAssuredSelf = useMemo(() => {
    return SummaryProposalById?.policyHolderName === SummaryProposalById?.lifeAssuredName
  }, [SummaryProposalById])


  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TInsuranceAttachmentLetter>({
    defaultValues: useMemo(() => {
      let result = defaultInsuranceAttachmentLetter;
      if (AdditionalForms && AdditionalForms?.insuranceAttachmentLetter) {
        result = insuranceAttachmentLetter;
      }
      return result as TInsuranceAttachmentLetter;
    }, []),
  });

  const formContext = {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods,
  };

  const relationBenef = watch('relationshipLABeneficiarys')
  const isBenefNotSelected = relationBenef.some(item => item.relationshipLABeneficiary.code === undefined)
  const otherFamE = watch('otherFamiliesE');
  const otherFamF = watch('otherFamiliesF');
  const relationshipPHLA = watch('relationshipPHLA');
  const eSignPH = watch('signPolicyHolder');
  const eSignPHDate = watch('policyHolderSignDate');
  const eSignPHLocation = watch('policyHolderSignLocation');
  const mainFamilies = watch('mainFamilies');
  const skaStatement = watch('statementSKA');

  const { fields, append, remove } = useFieldArray({
    name: 'relationshipLABeneficiarys',
    control,
  });


  const handleMaritalStatus = (status: string, codes: string[]) => {
    const checkMainFamily = benefitCodeList?.every((item: string) => codes.includes(item)); //  check only main family
    const checkOutsiteFamily = !benefitCodeList?.some((item: string) => codes.includes(item)); // check only outsite main family

    if (!checkMainFamily && !checkOutsiteFamily) { // main + outsite family
      if (otherFamE?.key == '' || otherFamE?.key == undefined) {
        setDisableOnlyMainFam(true);
        setValue('otherFamiliesF', SKAList[5]);
        setOtherFamiliesF('F');
      }
    }

    if (checkMainFamily || (!checkMainFamily && !checkOutsiteFamily)) {
      setDisableOnlyMainFam(true)
    } else {
      setDisableOnlyMainFam(false)
    }
  };

  useEffect(() => {
    switch (relationshipLA?.key) {
      case 'FA':
        if ((maritalStatusPH?.key === 'M' || maritalStatusPH?.key === 'W') && ageLA >= 21) {
          setValue('mainFamilies', SKAList[0]);
        }
        break;

      case 'GP':
        if (ageLA < 21) {
          setValue('mainFamilies', SKAList[1]);
        }
        break;

      case 'UA':
        if (ageLA < 21) {
          setValue('mainFamilies', SKAList[2]);
        }
        break;

      case 'MM':
        setValue('mainFamilies', SKAList[3]);
        break;

      case 'O':
        setValue('mainFamilies', DEFAULT_MAINFAMILIES);
        break;

      default:
        break;
    }


    switch (MaritalStatusLA?.key) {
      case 'S':
        handleMaritalStatus('S', ['MO', 'FA', 'BS']);
        break;

      case 'M':
        handleMaritalStatus('M', ['HU', 'WI', 'SO', 'DA']);
        break;

      case 'W':
        handleMaritalStatus('W', ['SO', 'DA']);
        break;

      default:
        break;
    }

    if (lifeAssuredSelf == 'self') {
      setValue('mainFamilies', DEFAULT_MAINFAMILIES);
    }

    // check TU = LA
    if (primaryInsured) {
      setValue('relationshipPHLA', primaryInsured?.clientPolicyHolder);
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (SummaryProposalById?.isDoksulCTA && params?.defaultBenef) {
      setValue('relationshipLABeneficiarys', params.defaultBenef.beneficiaryCandidateInfo.map((item: any) => (
        {
          relationshipLABeneficiary: item.relationshipCandidate
        })
      ));
    }
  }, [])


  const [otherFamiliesE, setOtherFamiliesE] = useState(
    insuranceAttachmentLetter ? insuranceAttachmentLetter?.otherFamiliesE?.key : getValues('otherFamiliesE'),
  );
  const [otherFamiliesF, setOtherFamiliesF] = useState(
    insuranceAttachmentLetter ? insuranceAttachmentLetter?.otherFamiliesF?.key : getValues('otherFamiliesF'),
  );


  const onBack = () => {
    if (additionalFormsId) {
      onSave(getValues());
    }
    const isLampungForm = getConditionLampung(RSQSData, RSPAJData, isHealth)
    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
    } else {
      const backRoute = waqfProgram?.key === 'Y'
        ? EposRoutes.WAKAF
        : isLampungForm
          ? EposRoutes.LAMPUNG_FORM
          : clientReceiveSummary?.key === 'Y'
            ? EposRoutes.PRINT_ELECTRONIC_POLICY
            : EposRoutes.SQS_SIGNATURE;

      navigation.dispatch(StackActions.replace(backRoute));
    }
    return null;
  };


  const onSave = async (data: TInsuranceAttachmentLetter) => {
    const _AdditionalForms = {
      ...AdditionalForms?.toJSON(),
      insuranceAttachmentLetter: JSON.stringify(data),
    } as IAdditionalForms;
    await onUpdateAdditionalForms(_AdditionalForms);

    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.INSURANCE_ATTACHMENT_LETTER,
    });
  };


  const nextRoutes = () => {
    const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData.convDataResult) : '';
    if (isProductPWM && (convDataResult.convFlag == 'GIO' || convDataResult.convFlag == 'FUW')) {
      return EposRoutes.FORM_CONVERSION;
    } else {
      return EposRoutes.SPAJ_SIGNATURE;
    }
  };

  const onContinue: SubmitHandler<TInsuranceAttachmentLetter> = async (data) => {
    setDisableOnlyMainFam(false)
    setLoading(true)
    await onSave(data);
    if (isDoksul) {
      const doksulData = await generateDoksulSubmission('SKA');
      postSubmissionDoksul({
        params: doksulData,
        onSuccess: (resp) => {
          setLoading(false)
          if (resp?.responseCode == '00') {
            updateSummaryByKey(proposalId, { key: 'statusProposal', value: 'Submitted' });
            updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
            updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
            navigation.dispatch(StackActions.replace(EposRoutes.LINK_SUBMITTED));
            return
          }
          showModalFailedSubmitDoksul(() => {
            const data = getValues();
            onContinue(data);
          });
        }
      }).catch((err) => {
        setLoading(false)
      })
    }
    else {
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: nextRoutes(),
      })
      navigation.dispatch(StackActions.replace(nextRoutes()));
    }
  };

  // if ph other need validation field relationship PH & LA
  const validatePHLA = (data: TCommonOptionalData) => {
    const mainFamiliesOptions = SKAList.slice(0, 4);
    const isMainOptionsDisabled = mainFamiliesOptions.every(mainFamilies => getDisabledMainFamOptions(mainFamilies, mainFamilies))

    if (lifeAssuredSelf !== 'self' && !isMainOptionsDisabled) {
      return validateObject(data)
    }
  }

  // if beneficiary only outsite family / otherFamE & otherFamF enable  then need validation
  const validateOtherFam = (data: TCommonOptionalData) => {
    if (disableOnlyMainFam === false && otherFamE?.key == '' && otherFamF.key == '') {
      return validateObject(data)
    }
  }


  const getDisabledMainFamOptions = useCallback((item: any, selected: any) => {
    if (isDoksul) {
      const isDisabledRelationLA = relationshipLA?.key === '' || relationshipLA?.key === '-' || relationshipLA?.key === undefined
      if (isDisabledRelationLA) {
        return true
      }
      if (selected?.key === 'A') {
        return setStateDisableByKey('A', item.key)
      } else if (selected?.key === 'B') {
        return setStateDisableByKey('B', item.key)
      } else if (selected?.key === 'C') {
        return setStateDisableByKey('C', item.key)
      } else if (selected?.key === 'D') {
        return setStateDisableByKey('D', item.key)
      }
      return false
    }
    return !(relationshipLA?.key === 'O')
  }, [relationshipLA?.key, isDoksul])

  const getDisabledOtherFamE = useCallback(() => {
    if (isDoksul) {
      if (isBenefNotSelected) {
        return true
      }
      if (otherFamE?.key !== '') {
        return false
      }
      return otherFamF?.key !== ''
    }
    if (disableOnlyMainFam) {
      return disableOnlyMainFam
    } else {
      return Boolean(otherFamiliesF?.key)
    }
  }, [otherFamiliesF, isBenefNotSelected, isDoksul, otherFamF, otherFamE, disableOnlyMainFam])

  const getDisabledOtherFamF = useCallback(() => {
    if (isDoksul) {
      if (isBenefNotSelected) {
        return true
      }
      if (otherFamF?.key !== '') {
        return false
      }
      return otherFamE?.key !== ''
    }
    if (disableOnlyMainFam) {
      return disableOnlyMainFam
    } else {
      return Boolean(otherFamiliesE?.key)
    }
  }, [otherFamiliesE, isBenefNotSelected, isDoksul, otherFamE, otherFamF, disableOnlyMainFam])

  const onChangeItemMainFam = (item: TOptionalCardData, value: TOptionalCardData, onChange: (item: TOptionalCardData) => void) => {
    if (item.key === value.key) {
      onChange(DEFAULT_OPTIONAL_DATA)
      return
    }
    onChange(item)
  }

  const onChangeItemOtherFamE = (item: TOptionalCardData, value: TOptionalCardData, onChange: (item: TOptionalCardData) => void) => {
    onChange(item);
    setValue('otherFamiliesF', DEFAULT_OPTIONAL_DATA);
    setValue('reasonOtherFamiliesF', '');
  }
  const onChangeItemOtherFamF = (item: TOptionalCardData, value: TOptionalCardData, onChange: (item: TOptionalCardData) => void) => {
    onChange(item);
    setValue('otherFamiliesE', DEFAULT_OPTIONAL_DATA);
    setValue('reasonOtherFamiliesE', '');
  }

  const onSubmit = useCallback(() => {
    showModalDialogSubmitDoksul(handleSubmit(onContinue))
  }, [handleSubmit, onContinue])

  const isEmptySignPH = useMemo(() => {
    return eSignPH === '' || eSignPHDate === '' || eSignPHLocation === '' || skaStatement === false
  }, [eSignPH, eSignPHDate, eSignPHLocation, skaStatement,])

  const isButtonDisabledForPHLA = useMemo(() => {
    if (relationshipPHLA?.key) {
      if (mainFamilies?.key !== '') {
        return mainFamilies?.key === '' || isEmptySignPH
      }
      return true
    }
    return true
  }, [mainFamilies?.key, relationshipPHLA?.key, isEmptySignPH])


  const isButtonDisabledForBenef = useMemo(() => {
    if (!isBenefNotSelected) {
      const isEmptyFamE = otherFamE?.key === ''
      const isEmptyFamF = otherFamF?.key === ''
      if (!isEmptyFamE || !isEmptyFamF) {
        return isEmptySignPH
      }
      return true
    }
    return true
  }, [isBenefNotSelected, otherFamE, otherFamF, isEmptySignPH])


  const isButtonDisabled = useMemo(() => {
    //CASE ONLY MAIN FAMILY
    if (relationshipPHLA?.key && (isBenefNotSelected && relationBenef.length === 1)) {
      return isButtonDisabledForPHLA
    } else if (!isBenefNotSelected && !relationshipPHLA?.key) {
      //CASE ONLY BENEF
      return isButtonDisabledForBenef
    }
    //CASE BOTH
    return isButtonDisabledForBenef || isButtonDisabledForPHLA
  }, [relationshipPHLA?.key, isBenefNotSelected, isButtonDisabledForPHLA, isButtonDisabledForBenef, relationBenef])

  const getDisabledPHLARelationOption = useCallback(() => {
    if (SummaryProposalById?.isDoksulCTA && isLifeAssuredSelf || !isDoksul) {
      return true
    }
    return false
  }, [isDoksul, SummaryProposalById?.isDoksulCTA, isLifeAssuredSelf])

  const HeaderContent = () => {
    if (isDoksul) {
      return (
        <DoksulHeader
          title={'Formulir Pendukung'}
          onPress={onBack}
        />
      )
    }
    return (
      <EposHeader />
    )
  }

  const ButtonContent = () => {
    if (isDoksul) {
      return (
        <View style={plaiStyles.bgwhite}>
          <Button
            style={[!isButtonDisabled ? plaiStyles.bgBtnRed : plaiStyles.bgBtnDisabled, plaiStyles.mt24, plaiStyles.mb16, plaiStyles.mx24]}
            textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
            text={'Submit'}
            onPress={onSubmit}
            disabled={isButtonDisabled}
          />
        </View>
      )
    }
    return (
      <EposFooter
        position={6}
        leftButton={{
          onPress: onBack
        }}
        rightButton={{
          disabled: !isValid,
          onPress: handleSubmit(onContinue),
        }}
      />
    )
  }

  const BenefContent = () => {
    if (isDoksul) {
      return (
        <>
          {fields?.map((field: any, index: number) => (
            <View key={field.id}>
              <Controller
                name={`relationshipLABeneficiarys.${index}.relationshipLABeneficiary`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DropdownField
                    labelMap={{
                      title: `Hubungan ${mainParticipant} dengan Calon Penerima Manfaat ${index + 1}`,
                      placeholder: t('Epos:select_relationship'),
                    }}
                    keyMap={{
                      value: 'code',
                      label: SummaryProposalById?.shariaFlag === 'conventional' ? 'konven' : 'syariah',
                      search: SummaryProposalById?.shariaFlag === 'conventional' ? 'konven' : 'syariah',
                    }}
                    search={{
                      isOnChangeSearch: true,
                    }}
                    data={benefiteList?.filter((item) => item.code !== 'PH')}
                    selected={value}
                    onSelected={(item) => onChange(item)}
                    error={errors?.relationshipLABeneficiarys?.[index]?.relationshipLABeneficiary}
                  />
                )}
              />
              {fields.length > 1 && (
                <Button
                  style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                  textStyle={plaiStyles.fontGrey33}
                  text={t('Calculator:remove')}
                  onPress={() => remove(index)}
                />
              )}
            </View>
          ))}
          {fields.length < 10 && <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24, plaiStyles.mb16]}
            textStyle={plaiStyles.fontRed}
            text={'Tambah Penerima Manfaat Asuransi'}
            onPress={() =>
              append({
                relationshipLABeneficiary: DEFAULT_OPTIONAL_DATA,
              })
            }
          />}
        </>
      )
    }
    return (
      benefitList?.map((key: string) => (
        <SectionField title={`Hubungan ${mainParticipant} dengan Calon Penerima Manfaat`} value={key} />
      ))
    )
  }

  const ReasonOtherFamilyE = ({ isShow }: { isShow?: boolean }) => {
    if (isShow) {
      return (
        <Controller
          name={`reasonOtherFamiliesE`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              required={false}
              label={'Alasan'}
              placeholder={'Masukan alasan'}
              value={value}
              setValue={onChange}
            />
          )}
        />
      )
    }
    return (
      <></>
    )
  }

  const ReasonOtherFamilyF = ({ isShow }: { isShow?: boolean }) => {
    if (isShow) {
      return (
        <Controller
          name={`reasonOtherFamiliesF`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              required={false}
              label={'Alasan'}
              placeholder={'Masukan alasan'}
              value={value}
              setValue={onChange}
            />
          )}
        />
      )
    }
    return (
      <></>
    )
  }

  // const SonInLawSignature = ({ isShow }: { isShow?: boolean }) => {
  //   if (isShow) {
  //     return (
  //       <>
  //         <SignatureForm
  //           title='Tanda Tangan Pasangan (Jika Calon Tertanggung/Peserta Utama Menantu)'
  //           signature='signSonDaughterInLaw'
  //           location='sonDaughterInLawSignLocation'
  //           signatureDate='sonDaughterInLawSignDate'
  //         />
  //       </>
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }

  const renderSKAttachmentItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt16]} key={index}>
          <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr4]}>{`${index + 1}. `}</Text>
          <Text
            style={[
              plaiStyles.fontGrey33Thin,
              plaiStyles.flex,
              plaiStyles.flexWrap,
              plaiStyles.lineH20,
            ]}
          >
            {item.key}
          </Text>
        </View>
      )
    },
    [],
  )


  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing, plaiStyles.flex]}>
            <HeaderContent />
            <Text style={[plaiStyles.fontHeaderTitle]}>{titleHeader}</Text>
            <ScrollView scrollEnabled={true}>
              <SectionField title={`Nama ${t('Epos:prospective_policyholder')}`} value={SummaryProposalById?.policyHolderName} />
              <SectionField
                title="Tanggal Lahir Calon Pemegang Polis"
                value={SummaryProposalById?.policyHolderDob}
              />

              <View style={[plaiStyles.mt8]}>
                <SectionField title={`Nama Calon Tertanggung/Peserta Utama`} value={SummaryProposalById?.lifeAssuredName} />
                <SectionField
                  title={`Tanggal Lahir Calon Tertanggung/Peserta Utama`}
                  value={SummaryProposalById?.lifeAssuredDob}
                />
              </View>

              <View style={[plaiStyles.mt8]}>
                {lifeAssuredSelf === 'self' ?
                  (<SectionField
                    title={t('Epos:relationship_ph_la')}
                    value={'-'}
                  />)
                  : (
                    <Controller
                      name={'relationshipPHLA'}
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const isDisabled = getDisabledPHLARelationOption();
                        return (
                          <DropdownField
                            labelMap={{
                              title: t('Epos:relationship_ph_la'),
                              placeholder: t('Epos:select_relationship'),
                            }}
                            data={relationShipWithPH}
                            onDisabled={isDisabled}
                            selected={value}
                            onSelected={(item) => {
                              setTempRelationshipLA(item as any);
                              onChange(item);
                            }}
                            error={errors.relationshipPHLA}
                          />
                        )
                      }}
                    />
                  )}
                <BenefContent />
              </View>

              <Text style={[plaiStyles.mt32, plaiStyles.mb16, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Dengan ini Saya sebagai Calon Pemegang Polis menyatakan bahwa:
              </Text>

              <Controller
                name={'mainFamilies'}
                control={control}
                rules={ValidationForm({ validate: validatePHLA })}
                render={({ field: { value, onChange } }) => (
                  <OptionCard
                    theme="simpleborder"
                    data={SKAList.slice(0, 4)}
                    selected={value}
                    onSelected={(item) => onChangeItemMainFam(item, value, onChange)}
                    onDisabled={(item) => getDisabledMainFamOptions(item, value)}
                    translation={true}
                    error={errors?.mainFamilies}
                  />
                )}
              />

              <Controller
                name={'otherFamiliesE'}
                control={control}
                rules={ValidationForm({ validate: validateOtherFam })}
                render={({ field: { value, onChange } }) => (
                  <OptionCard
                    required={false}
                    theme="simpleborder"
                    data={SKAList.slice(4, 5)}
                    onDisabled={() => getDisabledOtherFamE()}
                    selected={value}
                    onSelected={(item) => {
                      onChangeItemOtherFamE(item, value, onChange);
                    }}
                    translation={true}
                  />
                )}
              />
              <ReasonOtherFamilyE isShow={otherFamE.key === 'E'} />

              <Controller
                name={'otherFamiliesF'}
                control={control}
                rules={ValidationForm({ validate: validateOtherFam })}
                render={({ field: { value, onChange } }) => (
                  <OptionCard
                    required={false}
                    theme="simpleborder"
                    data={SKAList.slice(5, 6)}
                    onDisabled={() => getDisabledOtherFamF()}
                    selected={value}
                    onSelected={(item) => {
                      onChangeItemOtherFamF(item, value, onChange);
                    }}
                    error={errors?.otherFamiliesF}
                  />
                )}
              />
              <ReasonOtherFamilyF isShow={otherFamF.key === 'F'} />

              <Text style={[plaiStyles.mt32, plaiStyles.mb16, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Demikian SAYA telah memberikan pernyataan dan keterangan dalam Surat Keterikatan Asuransi ini dengan
                sebenar-benarnya dan tanpa unsur paksaan. SAYA tidak menyembunyikan informasi apa pun yang dapat
                memengaruhi penerimaan Surat Pengajuan Asuransi Jiwa (SPAJ) SAYA. SAYA menyetujui Surat Keterikatan
                Asuransi ini akan menjadi bagian yang tidak terpisahkan dari SPAJ SAYA pada PT Prudential Life Assurance.
                SAYA memahami bahwa pertanggungan (dalam hal SPAJ disetujui) akan batal apabila keterangan, pernyataan
                atau pemberitahuan yang SAYA sampaikan ternyata keliru yang sifatnya sedemikian rupa sehingga
                pertanggungan tidak akan diadakan atau tidak diadakan dengan syarat-syarat yang sama bila Penanggung
                mengetahui keadaan yang sesungguhnya dari hal itu.
              </Text>

              <FormProvider {...formContext}>
                <SignatureForm
                  title={t('Epos:candidate_policyholder_signature')}
                  signature='signPolicyHolder'
                  location='policyHolderSignLocation'
                  signatureDate='policyHolderSignDate'
                />

                {relationshipLA?.key === 'MM' && (
                  <SignatureForm
                    title='Tanda Tangan Pasangan (Jika Calon Tertanggung/Peserta Utama Menantu)'
                    signature='signSonDaughterInLaw'
                    location='sonDaughterInLawSignLocation'
                    signatureDate='sonDaughterInLawSignDate'
                  />
                )}
              </FormProvider>

              <Text
                style={[plaiStyles.fontGrey33, plaiStyles.lineH24, plaiStyles.font16, plaiStyles.mt16, plaiStyles.mb16]}
              >
                Dokumen yang perlu dilampirkan jika pilihan b atau c:
              </Text>
              <FlatList data={SKADocumentAttachment} renderItem={renderSKAttachmentItem} />

              <Text style={[plaiStyles.mt32, plaiStyles.fontGrey33, plaiStyles.lineH24, plaiStyles.font16]}>
                Dokumen yang perlu dilampirkan jika pilihan d:
              </Text>

              <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.my24]} >
                <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr4]}>{`1. `}</Text>
                <Text
                  style={[
                    plaiStyles.fontGrey33Thin,
                    plaiStyles.flex,
                    plaiStyles.flexWrap,
                    plaiStyles.lineH20,
                  ]}
                >
                  {`Kartu Keluarga (Calon) Pemegang Polis dan (Calon) Tertanggung/Peserta Utama Jika pilihan pada pernyataan di atas tidak ada yang sesuai, mohon ubah Pemegang atau Penerima Manfaat.`}
                </Text>
              </View>

              <Controller
                name={`statementSKA`}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Pressable
                      style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt8, plaiStyles.mb24]}
                      onPress={() => onChange(!value)}
                    >
                      <View style={[plaiStyles.justifyCenter]}>
                        <ShapeItem type="box" isSelected={value} />
                      </View>
                      <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.flex, plaiStyles.ml16]}>
                        Segala risiko yang timbul akibat ditandatanganinya Surat Keterikatan Asuransi ini dalam keadaan
                        kosong akan menjadi tanggung jawab (Calon) Pemegang Polis.
                      </Text>
                    </Pressable>
                    {errors?.statementSKA && (
                      <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
                        {t('Epos:required')}
                      </Text>
                    )}
                  </>
                )}
              />
            </ScrollView>
          </View>
        </>
        <ButtonContent />
      </PruScreen>
    </>
  );
};
