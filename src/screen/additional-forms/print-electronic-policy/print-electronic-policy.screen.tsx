import { View, Text, BackHandler } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { PruColor, PruScreen } from 'common_ui_components';
import { plaiStyles } from 'plai_common_frontend';
import { EposFooter, EposHeader, SectionField } from '../../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { IAdditionalForms, useEposRealm, useObject } from '../../../database';
import { policyTerms, statementPH } from './print-electronic-policy.data';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { EposRoutes } from '../../../navigation';
import { WR_SHARIA_CONVENT, ISPAJData, ISQSDetail, getConditionLampung } from '../../../utilities';
import { SignatureForm } from '../../../components/signature-form/signature-form';

type TPrintElectronicPolicy = {
  signPolicyHolder: string;
  policyHolderSignLocation: string;
  policyHolderSignDate: any;
};

const defaultPrintElectronicPolicy = {
  signPolicyHolder: '',
  policyHolderSignLocation: '',
  policyHolderSignDate: '',
};

export const PrintElectronicPolicyScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { onUpdateAdditionalForms, updateSummaryByKey, updateSPAJByKey } = useEposRealm();
  const { spajId, additionalFormsId, spajNumber, proposalId, selectedSQSId } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const mainInsuredData = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : ''
  const clientResidenceProvince = policyHolderData?.clientResidenceProvince;
  const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
  const waqfProgram = beneficiary?.waqfProgram;
  const policyBookPrintForm = AdditionalForms?.policyBookPrintForm
    ? JSON.parse(AdditionalForms.policyBookPrintForm)
    : '';
  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TPrintElectronicPolicy>({
    defaultValues: useMemo(() => {
      let result = defaultPrintElectronicPolicy;
      if (AdditionalForms?.policyBookPrintForm != null || AdditionalForms?.policyBookPrintForm != '') {
        result = policyBookPrintForm;
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

  }, []);


  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);

  const _policyTerms = useMemo(() => policyTerms(wording?.premiContribution), []);

  const _statementPH = useMemo(() => statementPH(wording?.spaj), []);

  const nextRoute = () => {
    const isPWM = ['H14', 'H15'].includes(RSQSData?.product?.key!)
    const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData.convDataResult) : '';
    const flagForm = RSPAJData?.flagForm ? JSON.parse(RSPAJData.flagForm) : '';
    const _flagForm = flagForm?.filter((item) => item.label === 'SKA');
    const isLampungForm = getConditionLampung(RSQSData, RSPAJData, isHealth)
    if (isLampungForm) {
      return EposRoutes.LAMPUNG_FORM;
    } else if (waqfProgram?.key === 'Y') {
      return EposRoutes.WAKAF;
    } else if (_flagForm?.length > 0) {
      return EposRoutes.INSURANCE_ATTACHMENT_LETTER;
    } else if (isPWM && (convDataResult.convFlag == 'GIO' || convDataResult.convFlag == 'FUW')) {
      return EposRoutes.FORM_CONVERSION;
    } else {
      return EposRoutes.SPAJ_SIGNATURE;
    }
  };

  const onBack = () => {
    if (additionalFormsId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.SQS_SIGNATURE,
      });
    }
    navigation.dispatch(StackActions.replace(EposRoutes.SQS_SIGNATURE));
    return null;
  };

  const onSave = async (data: TPrintElectronicPolicy) => {

    const _AdditionalForms = {
      ...AdditionalForms?.toJSON(),
      policyBookPrintForm: JSON.stringify(data),
    } as IAdditionalForms;
    onUpdateAdditionalForms(_AdditionalForms);
  };

  const onContinue: SubmitHandler<TPrintElectronicPolicy> = async (data) => {
    await onSave(data);
    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: nextRoute(),
    });
    navigation.dispatch(StackActions.replace(nextRoute()));
  };
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <Text style={plaiStyles.fontHeaderTitle}>Formulir Cetak Buku Polis Versi Elektronik</Text>
          <ScrollView scrollEnabled={true}>
            <Text style={[plaiStyles.mt32, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
              SAYA yang bertanda tangan di bawah ini:
            </Text>
            <SectionField
              title={`Nama ${t('Epos:prospective_policyholder')}`}
              value={policyHolderData ? policyHolderData.clientName : '-'}
            />
            <SectionField title={'Nomor SPAJ'} value={spajNumber ? spajNumber : '-'} />
            <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
              Setuju untuk mengajukan cetak Buku Polis Elektronik
            </Text>

            <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33, plaiStyles.lineH24, plaiStyles.font16]}>
              Ketentuan Cetak Polis:
            </Text>

            {_policyTerms?.map((item, index) => (
              <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt16, plaiStyles.pr24]} key={index}>
                <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr4]}>{`${index + 1}. `}</Text>
                <View>
                  <Text
                    style={[
                      plaiStyles.fontGrey33Thin,
                      plaiStyles.flex,
                      plaiStyles.flexWrap,
                      plaiStyles.lineH20,
                    ]}
                  >
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
                  {item.subKey?.length > 0 &&
                    item.subKey.map((subItem, subIndex) => (
                      <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt10]}>
                        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr4]}>{`${alphabet[subIndex].toLocaleLowerCase()}. `}</Text>
                        <Text key={subIndex} style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.flexShrink]}>
                          <Trans
                            i18nKey={subItem?.item}
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
                </View>
              </View>
            ))}

            <Text style={[plaiStyles.mt16, plaiStyles.mb24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
              Pernyataan Calon Pemegang Polis (harap dibaca dengan teliti sebelum menandatangani Formulir ini) Calon
              Pemegang Polis (selanjutnya disebut "SAYA") menyatakan telah memahami dan menyetujui bahwa:
            </Text>

            {_statementPH?.map((item, index) => (
              <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt16, plaiStyles.pr24]} key={index}>
                <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr4]}>{`${index + 1}. `}</Text>
                <View>
                  <Text
                    style={[
                      plaiStyles.fontGrey33Thin,
                      plaiStyles.flex,
                      plaiStyles.flexWrap,
                      plaiStyles.lineH20,
                    ]}
                  >
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
                  {item.subKey?.length > 0 &&
                    item.subKey.map((subItem, subIndex) => (
                      <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt10]}>
                        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr4]}>{`${alphabet[subIndex].toLocaleLowerCase()}. `}</Text>
                        <Text key={subIndex} style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                          <Trans
                            i18nKey={subItem?.item}
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
                </View>
              </View>
            ))}

            <FormProvider {...formContext}>
              <SignatureForm
                title={`Tanda Tangan Calon Pemegang Polis (sesuai Surat Pengajuan Asuransi Jiwa (SPAJ) atau Kartu Identitas yang berlaku)`}
                signature='signPolicyHolder'
                location='policyHolderSignLocation'
                signatureDate='policyHolderSignDate'
              />
            </FormProvider>
          </ScrollView>
        </View>
      </>
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
    </PruScreen>
  );
};
