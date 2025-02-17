import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  DropdownField,
  InputField,
  LoadingFull,
  ModalInformation,
  SignaturePad,
  plaiStyles,
  sanitizedText,
} from 'plai_common_frontend';
import { DoksulHeader, EposFooter, EposHeader, SectionField, SectionInfoPerson, SignatureTime } from '../../../components';
import { wqfAggrement, wqfNotes, wqfStatement } from './wakaf.data';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { TWakaf, defaultWakaf } from './wakaf.type';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { IAdditionalForms, useEposRealm, useObject } from '../../../database';
import { sanitizeNumberWithDot, ValidationForm } from '../../../utilities/common-function';
import { waqfInstitutionList, ISPAJData, ISQSDetail, ISummaryProposal, showModalFailedSubmitDoksul, getConditionLampung } from '../../../utilities';
import { Button } from 'common_ui_components/app/components-ui';
import moment from 'moment';
import { EposRoutes } from '../../../navigation';
import { TBeneficiaryCandidateInfo, TFormBeneficiaryCandidate } from '../../espaj/spaj-beneficiary-candidate/spaj-beneficiary-candidate.type';
import { SignatureForm } from '../../../components/signature-form/signature-form';
import RNFS from 'react-native-fs';
import { useDoksulSubmission } from '../../../hooks';
import { postSubmissionDoksul } from '../../../network/services';
import { pruTestID } from 'common_services_frontend';


const validationCashValue = (value: string) => {
  const numericValue = parseFloat(value);
  if (numericValue > 33.33) {
    return 'maksimal persentase 33.33%';
  }
};

export const WakafScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { onUpdateAdditionalForms, updateSummaryByKey, updateSPAJByKey, getSQSById, getSPAJById } = useEposRealm();
  const { generateDoksulSubmission } = useDoksulSubmission();
  const { spajId, additionalFormsId, proposalId, isDoksul, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const RSQSData = getSQSById(selectedSQSId) as ISQSDetail;
  const RSPAJData = getSPAJById(spajId) as ISPAJData;
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : ''
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : '';;
  const clientIdCardNumber = policyHolderData ? policyHolderData.clientIdCardNumber : '';
  const clientPassportNumber = policyHolderData ? policyHolderData.clientPassportNumber : '';
  const beneficiary: TFormBeneficiaryCandidate = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
  const beneficiaryCandidateInfo = beneficiary?.beneficiaryCandidateInfo;
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const waqfInsuranceBenefits = AdditionalForms?.waqfInsuranceBenefits
    ? JSON.parse(AdditionalForms.waqfInsuranceBenefits)
    : '';
  const [modalSubmit, setModalSubmit] = useState(false);
  const [loading, setLoading] = useState(false)
  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');
  const formLampung = ['H14', 'H15'].includes(RSQSData?.product?.key!)

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TWakaf>({
    defaultValues: useMemo(() => {
      let result = defaultWakaf;
      if (AdditionalForms && AdditionalForms?.waqfInsuranceBenefits) {
        result = waqfInsuranceBenefits;
      }
      return result as TWakaf;
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


  const { fields } = useFieldArray({
    name: 'beneficiaryCandidateInfo',
    control,
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (AdditionalForms?.waqfInsuranceBenefits) {
      setValue(
        'beneficiaryCandidateInfo',
        waqfInsuranceBenefits?.beneficiaryCandidateInfo?.map((item: any) => {
          return {
            btnSignBeneficiary: item.btnSignBeneficiary,
            beneficiaryName: item.beneficiaryName,
            IdBeneficiary: item.IdBeneficiary,
            signBeneficiary: item.signBeneficiary,
            beneficiaryDate: item.beneficiaryDate,
          };
        }),
      );
      return
    }
    setValue(
      'beneficiaryCandidateInfo',
      beneficiaryCandidateInfo?.map((item: TBeneficiaryCandidateInfo) => {
        return {
          btnSignBeneficiary: false,
          beneficiaryName: item?.fullname,
          IdBeneficiary: '',
          signBeneficiary: '',
          beneficiaryDate: '',
        };
      }),
    );
  }, [beneficiaryCandidateInfo?.length, AdditionalForms?.waqfInsuranceBenefits])

  const validatedDonation = (value: string) => {
    const numericValue = parseInt(value);
    const waqfPledge = beneficiary.waqfPledge?.key;
    if (numericValue % 5 === 0) {
      if (waqfPledge === '≤ 45%') {
        if (numericValue > 45) {
          return 'maksimal kurang dari sama dengan 45%';
        }
      } else {
        if (numericValue <= 45) {
          return 'minimal lebih besar dari 45';
        }
        if (numericValue > 95) {
          return 'maksimal 95';
        }
      }
    } else {
      return 'harus kelipatan 5';
    }
  };

  const [tempData, setTempData] = useState<TWakaf>(waqfInsuranceBenefits);

  const handleInsuredBenefitChange = (index: number) => {
    setValue(`beneficiaryCandidateInfo.${index}.btnSignBeneficiary`, true);
    setValue(`beneficiaryCandidateInfo.${index}.beneficiaryDate`, moment());
    if (index) {
      setValue(`beneficiaryCandidateInfo.${index}.signBeneficiary`, '');
    }
    updateFormData();
  };

  const updateFormData = () => {
    setTempData(getValues());
  };


  const onBack = () => {
    const isLampungForm = getConditionLampung(RSQSData, RSPAJData, isHealth)
    const backRoutes = isDoksul
      ? EposRoutes.SPAJ_BENEFICIARY_CANDIDATE
      : isLampungForm
        ? EposRoutes.LAMPUNG_FORM
        : policyHolderData?.clientReceiveSummary?.key === 'Y'
          ? EposRoutes.PRINT_ELECTRONIC_POLICY
          : EposRoutes.SQS_SIGNATURE

    if (additionalFormsId) {
      onSave(getValues());
    }

    navigation.dispatch(StackActions.replace(backRoutes));
    return null;
  };

  const filledIdNumberToBenef = () => {
    let benefDataTemp: TFormBeneficiaryCandidate = beneficiary;
    const wakafFormDataTemp: TWakaf = getValues();
    benefDataTemp.beneficiaryCandidateInfo.map((beenfData: TBeneficiaryCandidateInfo, index: number) => {
      const candidateWakafInfo = wakafFormDataTemp.beneficiaryCandidateInfo.find((item) => { return item.beneficiaryName === beenfData.fullname })
      benefDataTemp.beneficiaryCandidateInfo[index].idNumber = candidateWakafInfo?.IdBeneficiary!;
    })

    return benefDataTemp;
  }

  const onSave = async (data: TWakaf) => {
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'beneficiary',
      value: JSON.stringify(filledIdNumberToBenef())
    });
    const _AdditionalForms = {
      ...AdditionalForms?.toJSON(),
      waqfInsuranceBenefits: JSON.stringify(data),
    } as IAdditionalForms;
    onUpdateAdditionalForms(_AdditionalForms);

    updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.WAKAF,
    });
  };

  const onSubmitDoksul = async () => {
    setLoading(true)
    onSave(getValues());
    const doksulData = await generateDoksulSubmission(SummaryProposalById?.doksulType);

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
        showModalFailedSubmitDoksul(onSubmitDoksul);
      }
    }).catch((err) => {
      setLoading(false)
    })
  };

  const nextRoutes = () => {
    const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData.convDataResult) : ''
    const flagForm = RSPAJData?.flagForm ? JSON.parse(RSPAJData.flagForm) : ''
    const _flagForm = flagForm?.filter((item) => item.label === 'SKA')

    if (_flagForm?.length > 0) {
      return EposRoutes.INSURANCE_ATTACHMENT_LETTER;
    } else if (formLampung && (convDataResult.convFlag == 'GIO' || convDataResult.convFlag == 'FUW')) {
      return EposRoutes.FORM_CONVERSION
    } else {
      return EposRoutes.SPAJ_SIGNATURE
    }
  }

  const onContinue: SubmitHandler<TWakaf> = async (data) => {
    await onSave(data);
    if (isDoksul) {
      setModalSubmit(true);

    } else {
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: nextRoutes(),
      })
      navigation.dispatch(StackActions.replace(nextRoutes()));
    }
  };

  const titleHeader = 'Janji Wakaf Manfaat Asuransi Jiwa Syariah'

  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing, plaiStyles.flex]}>
            {!isDoksul ? (
              <EposHeader />
            ) : (
              <DoksulHeader
                title={'Formulir Pendukung'}
                onPress={onBack}
              />
            )}
            <Text style={[plaiStyles.fontHeaderTitle, plaiStyles.mt16]}>Janji Wakaf Manfaat Asuransi Jiwa Syariah</Text>
            <ScrollView scrollEnabled={true}>
              {wqfStatement?.map((item, index) => (
                <View style={[plaiStyles.flex, plaiStyles.row]} key={index}>
                  <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mt16, plaiStyles.mr8]}>{`\u2022`}</Text>
                  <Text
                    style={[
                      plaiStyles.fontGrey66Thin,
                      plaiStyles.flex,
                      plaiStyles.flexWrap,
                      plaiStyles.mt10,
                      plaiStyles.lineH20,
                    ]}
                  >
                    {item.key}
                  </Text>
                </View>
              ))}
              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Dengan mengucap Bismillahirrahmanirrahim, Kami, selaku Penerima Manfaat yang namanya tercantum di dalam
                Polis di bawah ini:
              </Text>

              <SectionField title={'Pemegang Polis'} value={SummaryProposalById?.policyHolderName} />

              <SectionField
                title={'Nomor Polis/SPAJ'}
                value={SummaryProposalById?.spajNumber ? SummaryProposalById.spajNumber : '-'}
              />

              {isDoksul ? (
                <Controller
                  name={'idNumber'}
                  control={control}
                  rules={ValidationForm({ isRequired: true, maxLength: 16, minLength: 16 })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'NIK/Paspor'}
                      placeholder={'Masukkan nomor'}
                      value={value}
                      setValue={(value) => onChange(sanitizedText(value))}
                      error={errors?.idNumber}
                      maxLength={16}
                      id="input-idcard-number"
                    />
                  )}
                />
              ) : (
                <SectionField
                  title={'NIK/Paspor'}
                  value={clientPassportNumber ? clientPassportNumber : clientIdCardNumber}
                />
              )}

              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Dengan ini <Text style={[plaiStyles.fontGrey33Bold]}>BERJANJI</Text> untuk mewakafkan Santunan
              </Text>

              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Asuransi dan/atau Nilai Tunai yang terbentuk ketika Pemegang Polis meninggal dunia dan permohonan klaimnya
                disetujui oleh Prudential Syariah untuk{' '}
              </Text>

              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                <Text style={[plaiStyles.fontGrey33Bold]}>KEPENTINGAN UMUM, </Text>dengan pembagian dan{' '}
              </Text>

              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Lembaga Wakaf sebagai berikut, sesuai dengan yang disepakati oleh Pemegang Polis:
              </Text>

              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt24]}>Wakaf Atas Santunan </Text>
              <Controller
                name={'waqfDonation'}
                control={control}
                rules={ValidationForm({ isRequired: true, validate: validatedDonation })}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    label={'Nominal (Rp) / Persentase (%)'}
                    placeholder={'Masukkan Nominal / Persentase'}
                    value={value}
                    setValue={(item) => onChange(sanitizedText(item))}
                    error={errors?.waqfDonation}
                    id="input-waqf-donation"
                  />
                )}
              />
              <Text style={[plaiStyles.mt8, plaiStyles.fontGrey99, plaiStyles.font12]}>
                Maksimal Persentase {beneficiary.waqfPledge?.key == '≤ 45%' ? '45' : '95'}%
              </Text>

              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt24]}>Wakaf Atas Nilai Tunai</Text>
              <Controller
                name={'waqfCashValue'}
                control={control}
                rules={ValidationForm({ isRequired: true, validate: validationCashValue })}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    label={'Nominal (Rp) / Persentase (%)'}
                    placeholder={'Masukkan Nominal / Persentase'}
                    value={value}
                    setValue={(item) => onChange(sanitizeNumberWithDot(item))}
                    error={errors?.waqfCashValue}
                    id="input-waqf-cash-value"
                  />
                )}
              />
              <Text style={[plaiStyles.mt8, plaiStyles.fontGrey99, plaiStyles.font12]}>Maksimal Persentase 33.33%</Text>

              <Controller
                name={`waqfInstitution`}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value } }) => (
                  <>
                    <DropdownField
                      labelMap={{
                        title: 'Lembaga Wakaf (Nazhir)',
                        placeholder: 'Pilih Lembaga Wakaf',
                      }}
                      data={waqfInstitutionList}
                      selected={value}
                      onSelected={onChange}
                      error={errors?.waqfInstitution}
                      id="dropwdown-waqf-institution"
                    />
                  </>
                )}
              />

              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Kami mengerti, setuju dan sepakat atas syarat dan ketentuan pemberian dan penyaluran wakaf atas Santunan
                Asuransi dan/atau Nilai Tunai ini sebagai berikut:
              </Text>

              {wqfAggrement?.map((item, index) => (
                <View style={[plaiStyles.flex, plaiStyles.row]} key={index}>
                  <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mt16, plaiStyles.mr8]}>{index + 1}</Text>
                  <Text
                    style={[
                      plaiStyles.fontGrey33Thin,
                      plaiStyles.flex,
                      plaiStyles.flexWrap,
                      plaiStyles.mt10,
                      plaiStyles.lineH20,
                    ]}
                  >
                    {item.key}
                  </Text>
                </View>
              ))}

              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Seluruh Penerima Manfaat di bawah ini masing-masing menyatakan dan menjamin bahwa informasi dan keterangan
                mengenai identitas seluruh Penerima Manfaat yang tercantum di dalam Janji Wakaf Manfaat Asuransi Jiwa
                Syariah ini adalah informasi dan keterangan yang benar, akurat dan tidak terdapat kekeliruan pada
                informasi dan keterangan tersebut.
              </Text>

              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                Demikian Janji Wakaf Manfaat Asuransi Jiwa Syariah ini dibuat oleh seluruh Penerima Manfaat dalam keadaan
                sehat, tanpa adanya paksaan dari pihak manapun dan dapat dipertanggungjawabkan secara hukum. Semoga wakaf
                ini diterima oleh Allah SWT, serta dapat menjadi bekal di akhirat dan bermanfaat untuk kepentingan umum.
              </Text>

              <FormProvider {...formContext}>
                <SignatureForm
                  title={t('Epos:candidate_policyholder_signature')}
                  signature='signPolicyHolder'
                  location='policyHolderSignLocation'
                  signatureDate='policyHolderSignDate'
                />
              </FormProvider>

              {fields.map((field: any, index: number) => {
                const btnSignBeneficiary = getValues(`beneficiaryCandidateInfo.${index}.btnSignBeneficiary`)
                const signBeneficiary = watch(`beneficiaryCandidateInfo.${index}.signBeneficiary`)
                const beneficiaryDate = getValues(`beneficiaryCandidateInfo.${index}.beneficiaryDate`)

                return (
                  <View style={plaiStyles.mt16} key={field.id}>
                    <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.font14]}>
                      Penerima Manfaat {index + 1}.
                    </Text>
                    <Text style={[plaiStyles.mt16, plaiStyles.fontGrey33, plaiStyles.lineH24, plaiStyles.font16]}>
                      {field.beneficiaryName}
                    </Text>

                    <Controller
                      name={`beneficiaryCandidateInfo.${index}.IdBeneficiary`}
                      control={control}
                      rules={ValidationForm({ isRequired: true, minLength: 16, maxLength: 16 })}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={t('Epos:idcard_number')}
                          placeholder={t('Epos:enter_number')}
                          maxLength={16}
                          value={value}
                          setValue={(value) => onChange(sanitizedText(value))}
                          error={errors?.beneficiaryCandidateInfo?.[index]?.IdBeneficiary}
                          keyboardType="phone-pad"
                          id={`input-id-beneficiary-${index}`}
                        />
                      )}
                    />

                    <Text
                      style={[
                        plaiStyles.fontGrey33Bold,
                        plaiStyles.mt16,
                        plaiStyles.mb16,
                        plaiStyles.lineH24,
                        plaiStyles.font16,
                      ]}
                    >
                      Tanda tangan Calon Penerima Manfaat {index + 1}
                    </Text>

                    <Controller
                      name={`beneficiaryCandidateInfo.${index}.signBeneficiary`}
                      control={control}
                      rules={ValidationForm({ isRequired: true })}
                      render={({ field: { value, onChange } }) => (
                        <>
                          {!btnSignBeneficiary ? (
                            <Button
                              style={[plaiStyles.bgBtnSecondary]}
                              textStyle={plaiStyles.fontRed}
                              text={t('Epos:start_signature')}
                              onPress={() => handleInsuredBenefitChange(index)}
                              {...pruTestID(`start-sign-beneficiary-button-${index}`)}
                            />
                          ) : (
                            <SignaturePad
                              textReset={t('Epos:replay')}
                              textSave={t('Epos:save')}
                              value={value}
                              fileType='png'
                              onChange={onChange}
                              error={errors?.beneficiaryCandidateInfo?.[index]?.signBeneficiary}
                              testID={`sign-beneficiary-${index}`}
                            />
                          )}
                        </>
                      )}
                    />

                    {btnSignBeneficiary && (
                      <SignatureTime
                        signature={signBeneficiary}
                        date={beneficiaryDate}
                      />
                    )}
                  </View>
                );
              })}

              <Text style={[plaiStyles.mt16, plaiStyles.fontGrey33, plaiStyles.lineH24, plaiStyles.font16]}>Note:</Text>

              {wqfNotes?.map((item, index) => (
                <View style={[plaiStyles.flex, plaiStyles.row]} key={index}>
                  <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mt16, plaiStyles.mr8]}>{index + 1}</Text>
                  <Text
                    style={[
                      plaiStyles.fontGrey33Thin,
                      plaiStyles.flex,
                      plaiStyles.flexWrap,
                      plaiStyles.mt10,
                      plaiStyles.lineH20,
                    ]}
                  >
                    {item.key}
                  </Text>
                </View>
              ))}

              <SectionInfoPerson
                containerStyle={[plaiStyles.my16]}
                type='agent'
                keyLeft={authState?.agentProfile?.displayName?.enUs}
                keyRight={authState?.agentProfile?.agentCode}
              />

            </ScrollView>
          </View>
        </>
        {isDoksul ? (
          <View style={[plaiStyles.row, plaiStyles.mt12, plaiStyles.px20, plaiStyles.py20]}>
            <Button

              style={[!isValid ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, plaiStyles.flex]}
              onPress={handleSubmit(onContinue)}
              disabled={!isValid}
              text='Submit'
              {...pruTestID(`submit-doksul-button`)}
            />
          </View>
        ) : (
          <EposFooter
            position={6}
            leftButton={{
              onPress: onBack,
            }}
            rightButton={{
              disabled: !isValid,
              onPress: handleSubmit(onContinue),
            }}
          />
        )}


        <ModalInformation
          title={'Submit Dokumen'}
          desc={'Apakah Anda yakin ingin submit dokumen susulan?'}
          visible={modalSubmit}
          buttonPrimary={{
            text: 'Ya',
            onPress: onSubmitDoksul,
          }}
          buttonSecondary={{
            text: 'Tidak',
            onPress: () => setModalSubmit(!modalSubmit),
          }}
        />
      </PruScreen>
    </>
  );
};
