import { View, Text, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { LoadingFull, plaiStyles } from 'plai_common_frontend';
import { DoksulHeader, EposFooter, EposHeader, SectionField, SectionInfoPerson } from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { ScrollView } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { listHospital, ISPAJData, ISQSDetail, ISummaryProposal, WR_SHARIA_CONVENT, TPolicyType, showModalDialogSubmitDoksul, showModalFailedSubmitDoksul } from '../../../utilities';
import { TLampungForm, defaultLampungForm } from './lampung-form.type';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IAdditionalForms, useEposRealm, useObject } from '../../../database';
import moment from 'moment';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { SignatureForm } from '../../../components/signature-form/signature-form';
import { useDoksulSubmission } from '../../../hooks';
import { postSubmissionDoksul } from '../../../network/services';

export const LampungFormScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { onUpdateAdditionalForms, updateSummaryByKey, updateSPAJByKey } = useEposRealm();
  const { spajId, proposalId, additionalFormsId, isDoksul, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const { generateDoksulSubmission } = useDoksulSubmission();
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const clientReceiveSummary = policyHolderData?.clientReceiveSummary;
  const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
  const waqfProgram = beneficiary?.waqfProgram;
  const dataLampungForms = AdditionalForms?.lampungForm ? JSON.parse(AdditionalForms.lampungForm) : '';
  const policyType = SummaryProposalById?.shariaFlag || 'conventional';
  const { lifeAssured_2 } = WR_SHARIA_CONVENT[policyType as TPolicyType];
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TLampungForm>({
    defaultValues: useMemo(() => {
      let result = defaultLampungForm;
      if (AdditionalForms && AdditionalForms?.lampungForm) {
        result = dataLampungForms;
      }
      return result as TLampungForm;
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


  const onBack = () => {
    if (additionalFormsId) {
      onSave(getValues());
    }

    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
    } else {
      const backRoutes = clientReceiveSummary?.key === 'Y' ? EposRoutes.PRINT_ELECTRONIC_POLICY : EposRoutes.SQS_SIGNATURE
      navigation.dispatch(StackActions.replace(backRoutes));
    }
    return null;
  };


  const onSave = async (data: TLampungForm) => {


    const _AdditionalForms = {
      ...AdditionalForms?.toJSON(),
      lampungForm: JSON.stringify(data),
    } as IAdditionalForms;
    onUpdateAdditionalForms(_AdditionalForms);

    updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.LAMPUNG_FORM,
    });
  };

  const submitDoksul = async () => {
    setLoading(true)
    await onSave(getValues());
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
        showModalFailedSubmitDoksul(submitDoksul);
      }
    }).catch((err) => {
      setLoading(false)
    })
  };

  const nextRoutes = () => {
    const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData.convDataResult) : ''
    const flagForm = RSPAJData?.flagForm ? JSON.parse(RSPAJData.flagForm) : ''
    const _flagForm = flagForm?.filter((item) => item.label === 'SKA')
    const isProductPWM = RSQSData?.product?.key === 'H14' || RSQSData?.product?.key === 'H15';

    if (waqfProgram?.key === 'Y') {
      return EposRoutes.WAKAF
    } else if (_flagForm?.length > 0) {
      return EposRoutes.INSURANCE_ATTACHMENT_LETTER;
    } else if (isProductPWM && (convDataResult.convFlag == 'GIO' || convDataResult.convFlag == 'FUW')) {
      return EposRoutes.FORM_CONVERSION
    } else {
      return EposRoutes.SPAJ_SIGNATURE
    }
  }

  const onContinue: SubmitHandler<TLampungForm> = useCallback((data) => {
    if (isDoksul) {
      showModalDialogSubmitDoksul(submitDoksul)
    } else {
      onSave(data);
      navigation.dispatch(StackActions.replace(nextRoutes()));
    }
  }, []);

  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing, plaiStyles.flex]}>
            {!isDoksul ? (
              <EposHeader onPressSpajCompleteness={onBack} />
            ) : (
              <DoksulHeader
                title={'Formulir Pendukung'}
                onPress={onBack}
              />
            )}
            <ScrollView scrollEnabled={true}>
              <Text style={[plaiStyles.fontHeaderTitle]}>{t('Epos:approval_of_treatment_at_certainh_ospitals').toUpperCase()}</Text>
              <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.mb8, plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>
                {t('Epos:other_than_prumed_additional_insurance')}
              </Text>
              <SectionField title={'Nama (Calon) Pemegang Polis'} value={SummaryProposalById?.policyHolderName} />
              <Text style={[plaiStyles.mt8, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                {`(Selanjutnya disebut SAYA)`}
              </Text>
              <SectionField
                title={`Nama (Calon) ${lifeAssured_2} Utama ${policyType === 'sharia' ? `(Yang Diasuransikan)` : ''}`}
                value={SummaryProposalById?.lifeAssuredName ? SummaryProposalById?.lifeAssuredName : '-'}
              />
              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                {t('Epos:i_hereby_declare_that_the_following_provisions')}
              </Text>
              <Text style={[plaiStyles.mt24, plaiStyles.mb14, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                {t('Epos:with_due_observance_of_the_general_conditions')}
              </Text>
              {listHospital?.map((item, index) => (
                <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt16]} key={index}>
                  <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr8]}>{`${index + 1}. `}</Text>
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
              ))}
              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                {t('Epos:hereinafter_referred')}
              </Text>
              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                {t('Epos:furthermore')}
              </Text>
              <Text style={[plaiStyles.mt24, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                {t('Epos:i_make_this_statement_consciously_and_without_coercion')}
              </Text>

              <FormProvider {...formContext}>
                <SignatureForm
                  title={t('Epos:candidate_policyholder_signature')}
                  signature='signPolicyHolder'
                  location='policyHolderSignLocation'
                  signatureDate='policyHolderSignDate'
                />

                <SectionInfoPerson
                  type='agent'
                  keyLeft={authState?.agentProfile?.displayName?.enUs}
                  keyRight={authState?.agentProfile?.agentCode}
                />

                <SignatureForm
                  title={t('Epos:marketer_signature')}
                  signature='signMarketer'
                  location='marketerSignLocation'
                  signatureDate='marketerSignDate'
                />
              </FormProvider>
            </ScrollView>

            {isDoksul ? (
              <View style={plaiStyles.bgwhite}>
                <Button
                  style={[!isValid ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, plaiStyles.mt24, plaiStyles.mb16]}
                  textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
                  text={'Submit'}
                  onPress={handleSubmit(onContinue)}
                />
              </View>
            ) : (
              <EposFooter
                position={6}
                leftButton={{
                  onPress: onBack
                }}
                rightButton={{
                  disabled: !isValid,
                  text: 'Selanjutnya',
                  onPress: handleSubmit(onContinue),
                }}
              />
            )}
          </View>
        </>
      </PruScreen>
    </>
  );
};
