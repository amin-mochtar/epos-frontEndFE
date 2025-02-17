import { View, Text, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { PruColor, PruScreen } from 'common_ui_components';
import { LoadingFull, ModalInformation, plaiStyles } from 'plai_common_frontend';
import { DoksulHeader, EposFooter, EposHeader, SectionField, SectionInfoPerson } from '../../../components';
import { IAdditionalForms, useEposRealm, useObject } from '../../../database';
import { EposState } from '../../../redux';
import { RootState } from 'app/redux/reducer';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import {
  FUW_PSSSHARIA_PSSPLUSPROSHARIA_PWMS,
  FUW_PSS_PSSPLUSPRO_PWM,
  GIO_PSSSHARIA_PSSPLUSPROSHARIA_PWMS,
  GIO_PSS_PSSPLUSPRO_PWM,
  agreementPolicyholder,
  agreemnetTerminatePreviousPolicy,
  getPHStatement,
  statementFollowingConversion
} from './form-conversion.data';
import { WR_SHARIA_CONVENT, ISPAJData, ISQSDetail, ISummaryProposal, showModalFailedSubmitDoksul } from '../../../utilities';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import moment from 'moment';
import { Table } from './table-form-conversion';
import { SignatureForm } from '../../../components/signature-form/signature-form';
import { postSubmissionDoksul } from '../../../network/services';
import { useDoksulSubmission } from '../../../hooks';

type TFormConversion = {
  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: any;

  signMarketer: string;
  marketerSignLocation: string;
  marketerSignDate: any;
};

const defaulTFormConversion = {
  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',

  signMarketer: '',
  marketerSignLocation: '',
  marketerSignDate: ''
};


export const FormConversionScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { spajId, selectedSQSId, proposalId, isDoksul, additionalFormsId } = useSelector<RootState, EposState>((state) => state.epos);
  const { updateSummaryByKey, onUpdateAdditionalForms } = useEposRealm();
  const authState = useSelector((state: any) => state.auth);
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const { generateDoksulSubmission } = useDoksulSubmission();
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const formConversion = AdditionalForms?.formConversion ? JSON.parse(AdditionalForms.formConversion) : '';
  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');
  const [loading, setLoading] = useState(false)

  const productName = useMemo(() => {
    if (isDoksul) {
      if (SummaryProposalById?.shariaFlag == 'sharia') {
        return 'Well Medical Syariah'
      } else {
        return 'Well Medical'
      }
    } else {
      return RSQSData?.product?.label?.slice(3) as string
    }
  }, [RSQSData?.product, isDoksul]);

  const {
    company,
    premiContribution,
    insured,
    insurerManager,
    companyName,
    lifeAssured } = useMemo(() => WR_SHARIA_CONVENT[SummaryProposalById?.shariaFlag || 'conventional'], []);
  const [modalSubmit, setModalSubmit] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TFormConversion>({
    defaultValues: useMemo(() => {
      let result = defaulTFormConversion;
      if (AdditionalForms && AdditionalForms?.formConversion) {
        result = formConversion;
      }
      return result as any;
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, [])

  const submitDoksul = async () => {
    setLoading(true);
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
  };


  const onSave = (data: TFormConversion) => {

    const _AdditionalForms = {
      ...AdditionalForms?.toJSON(),
      formConversion: JSON.stringify(data),
    } as IAdditionalForms;
    onUpdateAdditionalForms(_AdditionalForms);
  }


  const backRoutes = () => {
    const flagForm = RSPAJData?.flagForm ? JSON.parse(RSPAJData.flagForm) : ''
    const _flagForm = flagForm?.filter((item) => item.label === 'SKA')
    const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
    const waqfProgram = beneficiary?.waqfProgram;
    const isProductPWM = RSQSData?.product?.key === 'H14' || RSQSData?.product?.key === 'H15';

    if (_flagForm?.length > 0) {
      return EposRoutes.INSURANCE_ATTACHMENT_LETTER;
    } else if (waqfProgram?.key === 'Y') {
      return EposRoutes.WAKAF;
    } else if (policyHolderData?.clientResidenceProvince?.key === 'LAMPUNG' && (isHealth || isProductPWM)) {
      return EposRoutes.LAMPUNG_FORM;
    } else if (policyHolderData?.clientReceiveSummary?.key === 'Y') {
      return EposRoutes.PRINT_ELECTRONIC_POLICY;
    } else {
      return EposRoutes.SQS_SIGNATURE
    }
  }


  const onBack = () => {
    onSave(getValues())
    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
    } else {
      navigation.dispatch(StackActions.replace(backRoutes()));
    }
    return true;
  };


  const onContinue: SubmitHandler<TFormConversion> = async (data) => {
    await onSave(data);
    if (isDoksul) {
      setModalSubmit(true);

    } else {
      await updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.FORM_CONVERSION,
      });
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_SIGNATURE));
    }
  };


  const convDataResult = useMemo(() => {
    if (isDoksul) return SummaryProposalById ? JSON.parse(SummaryProposalById.convData) : ''
    return RSQSData?.convDataResult ? JSON.parse(RSQSData?.convDataResult) : ''
  }, [RSQSData])


  const ListClientNameOW = {
    H10: 'Solusi Sehat',
    H11: 'Solusi Sehat Syariah',
    H12: 'Solusi Sehat Plus Pro',
    H13: 'Solusi Sehat Plus Pro Syariah'
  } as any

  const clientNameOW = ListClientNameOW[convDataResult?.productCode]

  const conversionTypeWording = useMemo(() => {
    if (RSQSData?.isGIO || (isDoksul && convDataResult?.isGio)) {
      if (SummaryProposalById?.shariaFlag === 'conventional') {
        return GIO_PSS_PSSPLUSPRO_PWM(clientNameOW, insured)
      } else {
        return GIO_PSSSHARIA_PSSPLUSPROSHARIA_PWMS(clientNameOW)
      }
    } else {
      if (SummaryProposalById?.shariaFlag === 'conventional') {
        return FUW_PSS_PSSPLUSPRO_PWM(clientNameOW)
      } else {
        return FUW_PSSSHARIA_PSSPLUSPROSHARIA_PWMS(clientNameOW)
      }
    }
  }, [])


  const conversionPSS = useMemo(() =>
    statementFollowingConversion(clientNameOW, productName, lifeAssured, insured, insurerManager)
    , [])


  const isPSSProduct = clientNameOW == 'PRUSolusi Sehat Syariah' || clientNameOW == 'PRUSolusi Sehat'


  const PHStatementList = useMemo(() =>
    getPHStatement(companyName, company, productName, premiContribution, insured, insurerManager, lifeAssured, clientNameOW)
    , []);


  const wordingAgreementTerminatePolicy = useMemo(() => {
    // if previously product is PRUSolusi Sehat Plus Pro and type of conversion 'GIO' then no agreement to terminate the policy
    const notUsingWordingAgreementTerminate = RSQSData?.isGIO || (isDoksul && convDataResult?.isGio) && clientNameOW == 'Solusi Sehat Plus Pro'
    if (!notUsingWordingAgreementTerminate) {
      return agreemnetTerminatePreviousPolicy(clientNameOW, premiContribution, productName, company, insurerManager, insured, lifeAssured)
    }
  }, [])

  const _agreementPolicyholder = useMemo(() =>
    agreementPolicyholder(productName, insurerManager, company)
    , [])


  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>

        <View style={[plaiStyles.px16, plaiStyles.flex]}>
          {!isDoksul ? (
            <EposHeader onPressSpajCompleteness={onBack} />
          ) : (
            <DoksulHeader
              title={'Formulir Pendukung'}
              onPress={onBack}
            />
          )}
          <ScrollView scrollEnabled={true} style={[plaiStyles.flex]}>
            <Text style={plaiStyles.fontHeaderTitle}>Formulir {RSQSData?.isGIO || (isDoksul && convDataResult?.isGio) ? `Campaign` : 'Konversi'}</Text>
            <Text style={[plaiStyles.fontHeaderSubTitle, plaiStyles.mt8]}>
              Konversi Asuransi Kesehatan <Text style={[plaiStyles.fontRed]}>PRU</Text>{clientNameOW} menjadi Asuransi Kesehatan <Text style={[plaiStyles.fontRed]}>PRU</Text>{productName}
            </Text>
            <Text style={[plaiStyles.mt32, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
              SAYA yang bertanda tangan di bawah ini:
            </Text>
            <SectionField
              title={'Nama Pemegang Polis'}
              value={SummaryProposalById?.policyHolderName}
            />
            <Text style={[plaiStyles.mt16, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
              Menyatakan setuju untuk dilakukan pengakhiran Polis <Text style={[plaiStyles.fontRed]}>PRU</Text>{clientNameOW} yang SAYA miliki dan melakukan pembukaan Polis <Text style={[plaiStyles.fontRed]}>PRU</Text>{productName}. Adapun informasi Polis <Text style={[plaiStyles.fontRed]}>PRU</Text>{clientNameOW} adalah sebagai berikut:
            </Text>
            <SectionField
              title={'Nomor Polis'}
              value={convDataResult?.policyNumber ? convDataResult?.policyNumber : '-'}
            />
            <SectionField
              title={'Nama Peserta Yang Diasuransikan'}
              value={SummaryProposalById?.lifeAssuredName}
            />

            {conversionTypeWording?.map((item, index) => (
              <View key={index}>
                <Text
                  style={[
                    plaiStyles.fontGrey33Thin,
                    plaiStyles.flex,
                    plaiStyles.flexWrap,
                    plaiStyles.mt10,
                    plaiStyles.lineH20,
                  ]}
                >
                  {/* {item.key} */}
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
            ))}

            {!RSQSData?.isGIO || (isDoksul && convDataResult?.isGio) && (
              <Table previouslyProduct={clientNameOW} productGoal={productName} />
            )}

            {isPSSProduct && conversionPSS?.map((item, index) => (
              <View key={index}>
                <Text
                  style={[
                    plaiStyles.fontGrey33Thin,
                    plaiStyles.flex,
                    plaiStyles.flexWrap,
                    plaiStyles.mt10,
                    plaiStyles.lineH20,
                  ]}
                >
                  {/* {item.key} */}
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
            ))}

            <Text style={[plaiStyles.mt16, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>Untuk selanjutnya mengajukan permohonan Manfaat Asuransi Kesehatan <Text style={[plaiStyles.fontRed]}>PRU</Text>{productName} dengan Nomor SPAJ</Text>

            <SectionField title={'Nomor Polis/SPAJ'} value={SummaryProposalById?.spajNumber ? SummaryProposalById.spajNumber : '-'} />

            <Text style={[plaiStyles.mt32, plaiStyles.fontBold]}>PERNYATAAN PEMEGANG POLIS</Text>
            <Text style={[plaiStyles.mt8, plaiStyles.mb16, plaiStyles.fontGrey66Thin]}>Harap dibaca dengan teliti sebelum menandatangani Formulir ini</Text>

            {PHStatementList?.map((item, index) => (
              <View key={index}>
                <Text
                  style={[
                    plaiStyles.fontGrey33Thin,
                    plaiStyles.flex,
                    plaiStyles.flexWrap,
                    plaiStyles.mt10,
                    plaiStyles.lineH20,
                  ]}
                >
                  {/* {item.key} */}
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
            ))}

            {wordingAgreementTerminatePolicy?.map((item, index) => (
              <View key={index}>
                <Text
                  style={[
                    plaiStyles.fontGrey33Thin,
                    plaiStyles.flex,
                    plaiStyles.flexWrap,
                    plaiStyles.mt10,
                    plaiStyles.lineH20,
                  ]}
                >
                  {/* {item.key} */}
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
            ))}

            {/* only type conversion "GIO" using agreement from policyholder */}
            {RSQSData?.isGIO || (isDoksul && convDataResult?.isGio) && _agreementPolicyholder?.map((item, index) => (
              <View key={index}>
                <Text
                  style={[
                    plaiStyles.fontGrey33Thin,
                    plaiStyles.flex,
                    plaiStyles.flexWrap,
                    plaiStyles.mt10,
                    plaiStyles.lineH20,
                  ]}
                >
                  {/* {item.key} */}
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
            ))}

            <Text
              style={[
                plaiStyles.fontGrey33Bold,
                plaiStyles.mt32,
                plaiStyles.mb16,
                plaiStyles.lineH24,
                plaiStyles.font16,
              ]}
            >
              {t('Epos:marketers_statement')}
            </Text>

            <SectionInfoPerson
              type='agent'
              keyLeft={authState?.agentProfile?.displayName?.enUs}
              keyRight={authState?.agentProfile?.agentCode}
            />

            <FormProvider {...formContext}>
              <SignatureForm
                title={t('Epos:marketer_signature')}
                signature='signMarketer'
                location='marketerSignLocation'
                signatureDate='marketerSignDate'
              />

              <SignatureForm
                title={t('Epos:candidate_policyholder_signature')}
                signature='signPolicyHolder'
                location='policyHolderSignLocation'
                signatureDate='policyHolderSignDate'
              />
            </FormProvider>
          </ScrollView>
        </View>
        <EposFooter
          position={1}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            text: isDoksul ? 'Submit' : 'Selanjutnya',
            disabled: !isValid,
            onPress: handleSubmit(onContinue),
          }}
        />

        <ModalInformation
          title={'Submit Dokumen'}
          desc={'Apakah Anda yakin submit dokumen susulan'}
          visible={modalSubmit}
          buttonPrimary={{
            text: 'Ya',
            onPress: () => {
              setModalSubmit(!modalSubmit)
              submitDoksul();
            },
          }}
          buttonSecondary={{
            text: 'Tidak',
            onPress: () => setModalSubmit(!modalSubmit),
          }}
        />

      </PruScreen>
    </>
  )
}

