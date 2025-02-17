import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckboxGroup,
  InputField,
  LoadingFull,
  ModalInformation,
  RadioGroup,
  TCommonConstantData,
  TextDecoration,
  numberWithCommas,
  plaiStyles,
  setMultipleSelect,
} from 'plai_common_frontend';
import { PruColor, PruScreen } from 'common_ui_components';
import { DoksulHeader, EposFooter, EposHeader, SectionInfoPerson } from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useEposRealm, useObject } from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, updateEposState } from '../../../redux';
import { calculateAge, productType, ValidationForm } from '../../../utilities/common-function';
import {
  agreementSignSpaj,
  marketersChoiceStatement,
  statementMarketerSpaj,
  footerStatement
} from './spaj-signature-statement';
import { TFormSpajSignature, defaultFormSpajSignature } from './spaj-signature.type';
import moment from 'moment';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { getDisclaimerList } from '../disclaimer/disclaimer.function';
import { SignatureForm } from '../../../components/signature-form/signature-form';
import { checkMainParticipant, ICommonObjectData, ISPAJData, ISQSDetail, ISummaryProposal, showModalDialogSubmitDoksul, showModalFailedSubmitDoksul, WR_SHARIA_CONVENT } from '../../../utilities';
import { getConvertUSDToIDR } from '../../../network';
import { useDoksulSubmission } from '../../../hooks';
import RNFS from 'react-native-fs';
import { postSubmissionDoksul } from '../../../network/services';
import { pruTestID } from 'common_services_frontend';
import { note_risk_of_signing_spaj } from './spaj-signature.data';

const sanitizedLetterTextWithoutSpecialCase = (value: string) => {
  if (typeof value === 'string') {
    return value.replace(/[^a-zA-Z0-9\s]/g, '');
  }
  return '';
};

const WORDING_POLICY: { [key: 'conventional' | 'shaira' | string]: string } = {
  conventional: 'Informasi dan panduan pembayaran dapat dilihat pada <i>website</i> www.prudential.co.id - pembayaran Premi (Bayar Premi Konvensional | Prudential Indonesia).',
  sharia: 'Informasi detail mengenai panduan cara pembayaran Kontribusi Asuransi Jiwa Syariah dapat dilihat pada <i>website</i> www.prudentialsyariah.co.id - Cara Pembayaran Kontribusi Asuransi Syariah (prudentialsyariah.co.id)'
}

export const SpajSignatureScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedSQSId, spajId, proposalId, spajNumber, isDoksul, statusDoksul, isDoksulCTA } = useSelector<
    RootState,
    EposState
  >((state) => state.epos);
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const { updateSPAJByKey, updateSummaryByKey, getMultipleCustomer } = useEposRealm();
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const { generateDoksulSubmission } = useDoksulSubmission();
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const additionalLifeAssuredSelf = RSQSData ? RSQSData.additionalLifeAssuredSelf : '';
  const prospectivePremiumPayor = RSQSData ? RSQSData?.prospectivePremiumPayor : '';
  const isPremiumPayorSPAJ = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS).premiumPaymentCandidate : '';
  const additionalBenefits = RSQSData?.additionalBenefits || [];
  const calculatorData = RSQSData?.calculator ? JSON.parse(RSQSData.calculator) : '';
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const topupPremiumPyor = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData.topupPremiumPyor!) : '';
  const isTopupPayor = topupPremiumPyor?.topupPremiPayer ? topupPremiumPyor?.topupPremiPayer?.key === 'O' : '';
  const defaultSPAJSignature = RSPAJData?.spajSignature ? JSON.parse(RSPAJData.spajSignature) : null;
  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');
  const checkRider = additionalBenefits.map((value: any) => value.key);
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState<{ title: string; desc: string; }>({ title: '', desc: '' });
  const isDoksulPremiumPayor = statusDoksul == 'Formulir Pembayar Premi' || statusDoksul == 'Formulir Pembayar Kontribusi'
  const mainParticipant = useMemo(() => {
    if (lifeAssuredSelf != 'self' && (!isDoksul || isDoksulCTA)) {
      const custLA = allCustomerData[1];
      const ageLA = calculateAge(custLA?.clientDateBirth)
      return checkMainParticipant(SummaryProposalById?.productCode, RSQSData?.policyType, false, false, ageLA)
    }
    return checkMainParticipant(SummaryProposalById?.productCode, RSQSData?.policyType)

  }, []);
  const { premiContribution } = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TFormSpajSignature>({
    defaultValues: useMemo(() => {
      let result = defaultFormSpajSignature;
      if (RSPAJData && RSPAJData?.spajSignature) {
        result = defaultSPAJSignature;
      }
      return result as TFormSpajSignature;
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

  const dislaimerPH = useMemo(() =>
    getDisclaimerList(
      RSQSData?.policyType || 'conventional',
      additionalBenefits || '',
      SummaryProposalById ? SummaryProposalById.productName : '',
      calculatorData || '',
      SummaryProposalById ? SummaryProposalById.productCode : '',
    ), []);

  const statementMarketer = useMemo(() =>
    statementMarketerSpaj(
      RSQSData?.policyType || 'conventional',
      SummaryProposalById ? SummaryProposalById.productName : '',
      SummaryProposalById ? SummaryProposalById.productCode : '',
      checkRider ? checkRider : []
    )
    , []);

  const constantAgreementSignSpaj = useMemo(() =>
    agreementSignSpaj(
      RSQSData?.policyType || 'conventional',
      isPremiumPayorSPAJ == 'N' || isDoksulPremiumPayor
    )
    , [isPremiumPayorSPAJ, isDoksulPremiumPayor, RSQSData?.policyType]);


  const isSignPayor = useMemo(() => {
    return prospectivePremiumPayor === 'Other' || isPremiumPayorSPAJ == 'N' || isDoksulPremiumPayor;
  }, [isDoksulPremiumPayor, isPremiumPayorSPAJ, prospectivePremiumPayor]);

  useEffect(() => {
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);


  const isTraditional = useMemo(() => {
    const product = RSQSData?.product;
    return productType(product?.key!) == 'TRD'
  }, []);

  // conversion flag
  const convFlag = useMemo(() => {
    const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData.convDataResult) : '';
    return convDataResult?.convFlag;
  }, [RSQSData]);

  const backRoutes = () => {
    const flagForm = RSPAJData?.flagForm ? JSON.parse(RSPAJData.flagForm) : '';
    const _flagForm = flagForm?.filter((item) => item.label === 'SKA');
    const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
    const waqfProgram = beneficiary?.waqfProgram;
    const formLampung = ['H14', 'H15'].includes(RSQSData?.product?.key!)

    if (statusDoksul == 'Formulir Pembayar Premi' || statusDoksul == 'Formulir Pembayar Kontribusi') {
      return EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE;
    } else if (statusDoksul == 'Amandemen') {
      return EposRoutes.SPAJ_AMANDEMENT;
    } else if (isTraditional && convFlag == 'GIO' || convFlag == 'FUW') {
      return EposRoutes.FORM_CONVERSION;
    } else if (_flagForm?.length > 0) {
      return EposRoutes.INSURANCE_ATTACHMENT_LETTER;
    } else if (waqfProgram?.key === 'Y') {
      return EposRoutes.WAKAF;
    } else if (policyHolderData?.clientResidenceProvince?.key === 'LAMPUNG' && (isHealth || formLampung)) {
      return EposRoutes.LAMPUNG_FORM;
    } else if (policyHolderData?.clientReceiveSummary?.key === 'Y') {
      return EposRoutes.PRINT_ELECTRONIC_POLICY;
    } else {
      return EposRoutes.SQS_SIGNATURE;
    }
  };

  const updateSelection = (
    selectedData: TCommonConstantData[],
    item: TCommonConstantData,
    keyObject = 'key',
    isPremiumPayorSPAJ: string
  ) => {
    let updatedData = setMultipleSelect([...selectedData], item, keyObject);

    const isSelected = (key: string) =>
      updatedData.some((data: TCommonConstantData) => data[keyObject] === key);

    const removeKeys = (keys: string[]) =>
      updatedData.filter((data: TCommonConstantData) => !keys.includes(data[keyObject]));

    const addKeys = (keys: string[]) => {
      keys.forEach(key => {
        updatedData = setMultipleSelect(updatedData, { [keyObject]: key }, keyObject);
      });
    };

    const isASelected = isSelected('A');
    const isBSelected = isSelected('B');
    const isCSelected = (isPremiumPayorSPAJ === 'N' || isDoksulPremiumPayor) && isSelected('C');
    if (item[keyObject] === 'A') {
      if (isASelected) {
        if (!isBSelected && !isCSelected) {
          const keysToAdd = ['B'];
          if (isPremiumPayorSPAJ === 'N' || isDoksulPremiumPayor) keysToAdd.push('C');
          addKeys(keysToAdd);
        } else {
          updatedData = [{ [keyObject]: 'A' }, ...selectedData.filter(data => ['B', 'C'].includes(data[keyObject]))];
        }
      } else {
        updatedData = removeKeys(['B', 'C']);
      }
    } else if (item[keyObject] === 'B' || ((isPremiumPayorSPAJ === 'N' || isDoksulPremiumPayor) && item[keyObject] === 'C')) {
      if (!isBSelected && !isCSelected) {
        updatedData = removeKeys(['A']);
      }
    }

    return updatedData;
  };

  const onBack = () => {
    onSave(getValues());
    // if back to doksul navigation
    if (statusDoksul == 'Dokumen Pendukung') {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL_DOCUMENT });
    } else {
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: backRoutes(),
      })
      navigation.dispatch(StackActions.replace(backRoutes()));
    }
    return null;
  };

  const onSave = async (data: TFormSpajSignature) => {
    try {
      let preparedData: { key: string; value: string }[] = [];
      let scrate = 1
      if (allCustomerData?.[0]?.clientCurrency?.key === 'USD') {
        setLoading(true)
        const result: any = await getConvertUSDToIDR(authState?.token, moment().format('YYYY-MM-DD'));
        if (result?.data) {
          scrate = Number(String(result?.data?.SCRATE || '').substring(0, 5));
        }
      }
      preparedData = [
        {
          key: "rateUsd",
          value: String(scrate)
        },
        {
          key: 'spajSignature',
          value: JSON.stringify(data),
        },
      ];
      setLoading(false)
      updateSPAJByKey(RSPAJData.spajId, preparedData);
    } catch (err) {
      setAlertMessage({
        title: t('Epos:unable_to_connect'),
        desc: t('Epos:unable_to_connect_to_the_server')
      })
      setLoading(false)
      return err;
    }
  };
  const onContinue: SubmitHandler<TFormSpajSignature> = async (data) => {
    setLoading(true)
    await onSave(data);
    if (isDoksul) {
      const doksulData = await generateDoksulSubmission(SummaryProposalById?.doksulType);
      postSubmissionDoksul({
        params: doksulData,
        onSuccess: (resp) => {
          if (resp?.responseCode == '00') {
            setLoading(false)
            updateSummaryByKey(proposalId, { key: 'statusProposal', value: 'Submitted' });
            updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
            updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
            navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.LINK_SUBMITTED })
            return
          }
          showModalFailedSubmitDoksul(() => {
            setLoading(false)
            const data = getValues();
            onContinue(data);
          });
        }
      }).catch((err) => {
        setLoading(false)
      })
    } else {
      await updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.SPAJ_DIGITAL_SIGN,
      });
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DIGITAL_SIGN));
    }
  };


  const checkedAll = (data: []) => {
    if (data?.length !== constantAgreementSignSpaj?.length) {
      return 'Wajib diisi semua';
    }
  };

  const onSubmit = useCallback(() => {
    showModalDialogSubmitDoksul(handleSubmit(onContinue));
  }, [handleSubmit, onContinue])

  const renderHeaderTitleStyle = useMemo(() => {
    if (isDoksul) {
      return [plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.lineH24, plaiStyles.mt16]
    }
    return plaiStyles.fontHeaderTitle
  }, [isDoksul])

  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing, plaiStyles.flex]}>
            {isDoksul ? (
              <DoksulHeader title="Tanda Tangan" onPress={onBack} />
            ) : (
              <EposHeader onPressSpajCompleteness={onBack} />
            )}
            <ScrollView scrollEnabled={true}>
              <Text style={renderHeaderTitleStyle}>
                {isDoksul ? 'Tanda Tangan Dokumen Susulan' : t('Epos:spaj_signature')}
              </Text>
              <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
                {t('Epos:require_the_signatures_of_marketers')}
              </Text>
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt32, plaiStyles.lineH24, plaiStyles.font16]}>
                {t('Epos:statementPH')}
              </Text>
              <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
                {t('Epos:please_read_carefully_before_signing')}
              </Text>

              <SectionInfoPerson
                containerStyle={[plaiStyles.mt16]}
                type='PH'
                keyLeft={SummaryProposalById?.policyHolderName!}
                keyRight={SummaryProposalById?.policyHolderPhone!}
              />

              {/* <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
              SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan
              selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:
            </Text> */}
              {dislaimerPH[1]?.desc?.map((item: TCommonConstantData, index) => (
                <View style={[plaiStyles.mt16]}>
                  {item?.id !== undefined && item?.key &&
                    <View style={[plaiStyles.flex, plaiStyles.row]}>
                      <Text>{item?.id !== ' ' ? item?.id : '\t'}</Text>
                      <Text style={[
                        plaiStyles.fontGrey33Thin,
                        plaiStyles.flex,
                        plaiStyles.flexWrap,
                        plaiStyles.lineH20,]}>
                        <Trans
                          i18nKey={item?.key}
                          components={{
                            i: <Text style={[plaiStyles.fontItalic]} />,
                            b: <Text style={[plaiStyles.fontBold]} />,
                            u: <Text style={{ textDecorationLine: 'underline' }} />,
                            pru: <Text style={[plaiStyles.fontRed]} />
                          }}
                        />
                      </Text>
                    </View>
                  }
                  <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.pl24]}>
                    {item?.subid !== undefined && item?.subkey &&
                      <>
                        <Text >{item?.subid !== ' ' ? item?.subid : '\t'}</Text>
                        <Text style={[
                          plaiStyles.fontGrey33Thin,
                          plaiStyles.flex,
                          plaiStyles.flexWrap,
                          plaiStyles.lineH20,]}>
                          <Trans
                            i18nKey={item?.subkey}
                            components={{
                              i: <Text style={[plaiStyles.fontItalic]} />,
                              b: <Text style={[plaiStyles.fontBold]} />,
                              u: <Text style={{ textDecorationLine: 'underline' }} />,
                              pru: <Text style={[plaiStyles.fontRed]} />
                            }}
                          />
                        </Text>
                      </>
                    }
                    {item?.termid !== undefined && item?.termkey &&
                      <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.pl24]}>
                        <Text>{item?.termid !== ' ' ? item?.termid : '\t '}</Text>
                        <Text style={[
                          plaiStyles.fontGrey33Thin,
                          plaiStyles.flex,
                          plaiStyles.flexWrap,
                          plaiStyles.lineH20,]}>
                          <Trans
                            i18nKey={item?.termkey}
                            components={{
                              i: <Text style={[plaiStyles.fontItalic]} />,
                              b: <Text style={[plaiStyles.fontBold]} />,
                              u: <Text style={{ textDecorationLine: 'underline' }} />,
                              pru: <Text style={[plaiStyles.fontRed]} />
                            }}
                          />
                        </Text>
                      </View>}
                  </View>
                </View>
              ))}
              <Controller
                name={'statementSpaj'}
                control={control}
                rules={ValidationForm({ isRequired: true, validate: checkedAll })}
                render={({ field: { onChange, value } }) => {
                  return (
                    <View style={[plaiStyles.pr4]}>
                      <CheckboxGroup
                        data={constantAgreementSignSpaj}
                        selected={value}
                        onSelected={(item) => {
                          // onChange(setMultipleSelect([...value], item, 'key'));
                          onChange(updateSelection(value, item, 'key', isPremiumPayorSPAJ));
                        }}
                        insideStyle={[plaiStyles.py16]}
                        textStyle={[plaiStyles.px8, plaiStyles.flexShrink]}
                      />
                      {errors?.statementSpaj && (
                        <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
                          {t('Epos:required')}
                        </Text>
                      )}
                    </View>
                  );
                }}
              />

              <FormProvider {...formContext}>
                <SignatureForm
                  title={t('Epos:candidate_policyholder_signature')}
                  signature='signPolicyHolder'
                  location='policyHolderSignLocation'
                  signatureDate='policyHolderSignDate'
                />

                {additionalLifeAssuredSelf && additionalLifeAssuredSelf !== 'self' && (
                  <SignatureForm
                    title={t('Epos:signature_additional_insured')}
                    signature='signAdditionalInsured'
                    location='additionalInsuredSignLocation'
                    signatureDate='additionalInsuredSignDate'
                  />
                )}

                {lifeAssuredSelf !== 'self' && !isDoksul && (
                  <>
                    <SignatureForm
                      title={t('Epos:sign', { mainParticipant })}
                      signature='signPrimaryInsured'
                      location='primaryInsuredSignLocation'
                      signatureDate='primaryInsuredSignDate'
                    />
                  </>
                )}

                {isSignPayor && (
                  <>
                    <SignatureForm
                      title={t('Epos:signature_premium_payer', { premiContribution })}
                      signature='signPremiumPayor'
                      location='premiumPayorSignLocation'
                      signatureDate='premiumPayorSignDate'
                    />
                  </>
                )}

                {isTopupPayor && (
                  <>
                    <SignatureForm
                      title={t('Epos:signature_topup_premium_payer', { premiContribution })}
                      signature='signTopupPayor'
                      location='topupPayorSignLocation'
                      signatureDate='topupPayorSignDate'
                    />
                  </>
                )}

                <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt16, plaiStyles.lineH24, plaiStyles.font16]}>
                  {t('Epos:marketers_statement')}
                </Text>

                <SectionInfoPerson
                  containerStyle={[plaiStyles.mt16]}
                  type='agent'
                  keyLeft={authState?.agentProfile?.displayName?.enUs}
                  keyRight={authState?.agentProfile?.agentCode}
                />

                <Text style={[plaiStyles.mb4, plaiStyles.mt24, plaiStyles.fontGrey33Thin]}>
                  Dengan ini, SAYA menyatakan bahwa:
                </Text>
                {statementMarketer?.map((item, index) => (
                  <View key={index}>
                    <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt16]}>
                      <Text>{item?.id !== ' ' ? item?.id : '\t'}</Text>
                      <Text
                        style={[
                          plaiStyles.fontGrey33Thin,
                          plaiStyles.flex,
                          plaiStyles.flexWrap,
                          plaiStyles.lineH20,
                        ]}
                      >
                        <Trans
                          i18nKey={item.key}
                          components={{
                            i: <Text style={[plaiStyles.fontItalic]} />,
                            b: <Text style={[plaiStyles.fontBold]} />,
                            u: <Text style={{ textDecorationLine: 'underline' }} />,
                            pru: <Text style={[plaiStyles.fontRed]} />
                          }}
                        />
                      </Text>
                    </View>
                  </View>
                ))}

                <SignatureForm
                  title={t('Epos:marketer_signature')}
                  signature='signMarketer'
                  location='marketerSignLocation'
                  signatureDate='marketerSignDate'
                />
              </FormProvider>
              <Controller
                name={'flyersInputField'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    labelStyle={plaiStyles.fontGrey33Thin}
                    label={'Nomor <b>PRU</b>Flyers'}
                    placeholder={'Masukkan nomor'}
                    value={value}
                    setValue={(value) => onChange(sanitizedLetterTextWithoutSpecialCase(value))}
                    required={false}
                    id="input-flyers"
                  />
                )}
              />

              <View style={[plaiStyles.py24]}>
                <Text style={[plaiStyles.mb8, plaiStyles.fontGrey33Thin, plaiStyles.font16]}>{'Unit Tenaga Pemasar'}</Text>
                <Text style={[plaiStyles.fontGrey99Thin,]}>
                  {'TIGA PULUH KARAKTER'}
                </Text>
              </View>

              <Controller
                name={'statementMarketer'}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value } }) => (
                  <>
                    <RadioGroup
                      data={marketersChoiceStatement}
                      selected={value}
                      onSelected={onChange}
                      error={errors?.statementMarketer}
                    />
                  </>
                )}
              />
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt12, plaiStyles.lineH24, plaiStyles.font16]}>
                {t('Epos:note')}
              </Text>
              <Text style={[plaiStyles.mb8, plaiStyles.mt8, plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>
                <Trans
                  i18nKey={note_risk_of_signing_spaj[SummaryProposalById?.productCode || ''] || t('Epos:spajSignRecord')}
                  components={{
                    i: <Text style={[plaiStyles.fontItalic]} />,
                    b: <Text style={[plaiStyles.fontBold]} />,
                    u: <Text style={{ textDecorationLine: 'underline' }} />,
                    pru: <Text style={[plaiStyles.fontRed]} />
                  }}
                />
              </Text>
              <View style={[plaiStyles.bgBlue, plaiStyles.py8, plaiStyles.pr32, plaiStyles.pl14, plaiStyles.mt24, plaiStyles.br8]}>
                <Text style={[plaiStyles.fontBlue, plaiStyles.fontBold, plaiStyles.py14]}>
                  {'Cara pembayaran Polis Anda dapat melalui:'}
                </Text>
                {footerStatement(RSQSData?.policyType ?? 'conventional')?.map((item: TCommonConstantData, index) => {
                  return (
                    <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.pl12, plaiStyles.pr24]}>
                      <Text style={[plaiStyles.fontBlue,]}>{`${index + 1}. `}</Text>
                      <Text style={[plaiStyles.fontBlue,]}>
                        <Trans
                          i18nKey={item?.key}
                          components={{
                            i: <Text style={[plaiStyles.fontItalic]} />,
                            b: <Text style={[plaiStyles.fontBold]} />,
                            u: <Text style={{ textDecorationLine: 'underline' }} />,
                            pru: <Text style={[plaiStyles.fontRed]} />
                          }}
                        />
                      </Text>
                    </View>
                  );
                })}
                <Text style={[plaiStyles.fontBlue, plaiStyles.pt10]}>
                  <Trans
                    i18nKey={WORDING_POLICY[RSQSData?.policyType ?? 'conventional']}
                    components={{
                      i: <Text style={[plaiStyles.fontItalic]} />,
                      b: <Text style={[plaiStyles.fontBold]} />,
                      u: <Text style={{ textDecorationLine: 'underline' }} />,
                      pru: <Text style={[plaiStyles.fontRed]} />
                    }}
                  />
                </Text>
              </View>
            </ScrollView>
          </View>
        </>
        <ModalInformation
          title={alertMessage?.title}
          desc={alertMessage?.desc}
          visible={Boolean(alertMessage?.title)}
          buttonPrimary={{
            text: "Tutup",
            onPress: () => setAlertMessage({ title: "", desc: "" })
          }}
        />
        {isDoksul ? (
          <View style={plaiStyles.bgwhite}>
            <Button
              style={[!isValid ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, plaiStyles.mt24, plaiStyles.mb16, plaiStyles.mx24]}
              disabled={!isValid}
              textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
              text={'Submit'}
              onPress={onSubmit}
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
      </PruScreen>
    </>
  );
};
