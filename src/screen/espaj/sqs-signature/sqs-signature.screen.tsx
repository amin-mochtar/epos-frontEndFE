import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  CheckboxGroup,
  GlobalPromptModal,
  plaiStyles,
  setMultipleSelect,
  TextDecoration,
} from 'plai_common_frontend';
import { PruScreen } from 'common_ui_components';
import { EposFooter, EposHeader, SectionInfoPerson } from '../../../components';
import { TFormSqsSignature, defaultFormSqsSignature } from './sqs-signature.type';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  ISummaryProposal,
  ISPAJData,
  ISQSDetail,
  WR_SHARIA_CONVENT,
  getWRPolicyHolderStatement,
  ilustrationStatementList,
  getConditionLampung,
} from '../../../utilities';
import { useTranslation } from 'react-i18next';
import { DataAdditionalForms, useEposRealm, useObject } from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, updateEposState } from '../../../redux';
import { productType, ValidationForm } from '../../../utilities/common-function';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { SignatureForm } from '../../../components/signature-form/signature-form';

export const SqsSignatureScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedSQSId, spajId, proposalId } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const { updateSPAJByKey, onUpdateAdditionalForms, updateSummaryByKey, getCustomerStorageById } = useEposRealm();
  const _DataAdditionalForms = DataAdditionalForms();
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const additionalFormsId = SummaryProposalById?.additionalFormsId;
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const lifeAssuredData = getCustomerStorageById(RSQSData?.clientIdSelected[0]!);
  const defaultSQSSignature = RSPAJData?.sqsSignature ? JSON.parse(RSPAJData.sqsSignature) : '';
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const mainInsuredData = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : ''
  const clientResidenceProvince = policyHolderData?.clientResidenceProvince;
  const clientReceiveSummary = policyHolderData?.clientReceiveSummary;
  const beneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData.beneficiary) : '';
  const waqfProgram = beneficiary?.waqfProgram;
  const isHealth = RSQSData?.waitingPeriodType?.includes('HEALTH');
  const isSuccessHitUpfront = RSPAJData?.upfrontDecisionResult?.isNeedRequest === 'true'

  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TFormSqsSignature>({
    defaultValues: useMemo(() => {
      let result = defaultFormSqsSignature;
      if (RSPAJData && RSPAJData?.sqsSignature) {
        result = defaultSQSSignature;
      }
      return result as any;
    }, []),
  });

  const formContext = {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods,
  };

  const { wording, POLICY_HOLDER_STATEMENT } = useMemo(() => {
    const _wording = WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'];
    let _policyHolderStatement = getWRPolicyHolderStatement(_wording.spaj, _wording.companyName);
    if (["T1Q", "T1P"].includes(RSQSData?.product?.key)) {
      _policyHolderStatement.splice(4)
    }
    return {
      wording: _wording,
      POLICY_HOLDER_STATEMENT: _policyHolderStatement,
    };
  }, [RSQSData?.product?.key]);

  const isTraditional = useMemo(() => {
    const product = RSQSData?.product;
    return productType(product?.key!) === "TRD";
  }, []);

  useEffect(() => {
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);


  const nextRoute = () => {
    const convDataResult = RSQSData?.convDataResult ? JSON.parse(RSQSData.convDataResult) : ''
    const flagForm = RSPAJData?.flagForm ? JSON.parse(RSPAJData.flagForm) : ''
    const _flagForm = flagForm?.filter((item) => item.label === 'SKA')
    const isLampungForm = getConditionLampung(RSQSData, RSPAJData, isHealth)
    if (clientReceiveSummary?.key === 'Y') {
      return EposRoutes.PRINT_ELECTRONIC_POLICY;
    } else if (isLampungForm) {
      return EposRoutes.LAMPUNG_FORM;
    } else if (waqfProgram?.key === 'Y') {
      return EposRoutes.WAKAF;
    } else if (_flagForm?.length > 0) {
      return EposRoutes.INSURANCE_ATTACHMENT_LETTER;
    } else if (isTraditional && (convDataResult.convFlag == 'GIO' || convDataResult.convFlag == 'FUW')) {
      return EposRoutes.FORM_CONVERSION
    } else {
      return EposRoutes.SPAJ_SIGNATURE
    }
  };

  const onSave = (data: TFormSqsSignature) => {
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'sqsSignature',
      value: JSON.stringify(data)
    });
  };

  const onBack = useCallback(() => {
    onSave(getValues());
    updateSummaryByKey(proposalId, { key: 'lastState', value: EposRoutes.SQS_SIGNATURE });
    if (isSuccessHitUpfront) {
      GlobalPromptModal.show({
        title: 'Tidak Dapat Kembali',
        subtitle: 'Mohon maaf, Anda tidak dapat kembali ke halaman sebelumnya, karena sistem sudah menganalisa data Anda untuk proses Underwriting.',
        buttonPrimary: {
          text: 'Tutup',
          onPress: () => GlobalPromptModal.close()
        }
      })
      return
    }
    navigation.dispatch(StackActions.replace(EposRoutes.DISCLAIMER));
    return null;
  }, [isSuccessHitUpfront, proposalId]);

  const onContinue = async () => {
    const data = getValues();
    const { ...restData } = data;
    const _nextRoute = nextRoute();

    if (!additionalFormsId) {
      const updatedAdditionalForms = { ..._DataAdditionalForms };
      onUpdateAdditionalForms(updatedAdditionalForms);
      const additionalFormsId = updatedAdditionalForms.additionalFormId;
      dispatch(updateEposState({ additionalFormsId }));
      updateSummaryByKey(proposalId, { key: 'additionalFormsId', value: additionalFormsId });
    }

    await updateSummaryByKey(proposalId, [
      //@ts-ignore
      { key: 'lastState', value: _nextRoute },
    ]);
    await onSave(restData);
    navigation.dispatch(StackActions.replace(_nextRoute));
  };

  const checkedAll = (data: []) => {
    if (data?.length !== ilustrationStatementList?.length) {
      return 'Wajib diisi semua'
    }
  }

  return (
    <PruScreen>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <ScrollView scrollEnabled={true}>
            <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:illustrated_signature')}</Text>
            <Text style={[plaiStyles.mt8, plaiStyles.fontGrey66Thin]}>
              {t('Epos:require_the_signatures_of_marketers')}
            </Text>
            <Text
              style={[
                plaiStyles.fontGrey33Bold,
                plaiStyles.mt32,
                plaiStyles.lineH24,
                plaiStyles.font16,
              ]}
            >
              {t('Epos:marketers_statement')}
            </Text>

            <SectionInfoPerson
              containerStyle={[plaiStyles.mt16]}
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
                title={t('Epos:marketers_signature_on_risk_profile')}
                signature='signRiskProfilemarketer'
                location='riskProfilemarketerLocation'
                signatureDate='riskProfilemarketerDate'
              />

              {/* checkbox start from here  */}

              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt16, plaiStyles.lineH24, plaiStyles.font16]}>
                {t('Epos:prospective_policyholder_statement')}
              </Text>
              {POLICY_HOLDER_STATEMENT}
              <View
                style={[
                  plaiStyles.bgBlue,
                  plaiStyles.py16,
                  plaiStyles.px16,
                  plaiStyles.br8,
                  plaiStyles.mt16,
                  plaiStyles.mb16,
                ]}
              >
                <Text style={[plaiStyles.fontBlue]}>
                  {t('Epos:for_the_security_and_convenience_of_insurance_product_transactions', {
                    companyName: wording.companyName,
                  })}
                </Text>
              </View>

              <SectionInfoPerson
                type='PH'
                keyLeft={SummaryProposalById?.policyHolderName!}
                keyRight={SummaryProposalById?.policyHolderPhone!}
              />

              {!isTraditional && (
                <>
                  <Text style={[plaiStyles.mt16, plaiStyles.mb16, plaiStyles.fontGrey33Thin]}>
                    {t(
                      'Epos:prospective_holder_has_read_carefully_received_explanations_from_the_marketers_understood_and_agree',
                    )}
                  </Text>
                  <Controller
                    name={'agreementIlustration'}
                    control={control}
                    rules={ValidationForm({ isRequired: true, validate: checkedAll })}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <>
                          <CheckboxGroup
                            data={ilustrationStatementList}
                            selected={value}
                            onSelected={(item) => {
                              onChange(setMultipleSelect([...value], item, 'key'));
                            }}
                            insideStyle={[plaiStyles.py16]}
                            textStyle={[plaiStyles.ml10]}
                          />
                          {errors?.agreementIlustration && (
                            <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
                              {t('Epos:required')}
                            </Text>
                          )}
                        </>
                      );
                    }}
                  />
                </>
              )}

              <SignatureForm
                title={t('Epos:candidate_policyholder_signature')}
                signature='signPolicyHolder'
                location='policyHolderSignLocation'
                signatureDate='policyHolderSignDate'
              />

              <SignatureForm
                title={t('Epos:policyholder_signature_on_risk_profile')}
                signature='signRiskProfilePolicyHolder'
                location='riskProfilePolicyHolderLocation'
                signatureDate='riskProfilePolicyHolderDate'
              />

              {!isTraditional && isHealth && (
                <>
                  <SignatureForm
                    title={t('Epos:signature_of_the_policyholder_regarding_the_Statement_of_approval')}
                    signature='signWaitingPeriodPolicyHolder'
                    location='waitingPeriodPolicyHolderLocation'
                    signatureDate='waitingPeriodPolicyHolderDate'
                  />
                </>
              )}
              {/* end here */}
            </FormProvider>
          </ScrollView>
        </View>
        <EposFooter
          position={6}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: !isValid,
            onPress: onContinue,
          }}
        />
      </>
    </PruScreen>
  );
};
