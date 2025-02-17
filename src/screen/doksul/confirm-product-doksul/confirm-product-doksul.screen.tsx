import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  ALERT,
  CheckboxGroup,
  LoadingFull,
  ModalInformation,
  plaiStyles,
  setMultipleSelect,
} from 'plai_common_frontend';
import {
  EposFooter,
  EposHeader,
  OptionCard,
  SectionTitle,
  TOptionalCardData,
} from '../../../components';
import {
  QCONFIRMATION_RECOMMENDATION_PRODUCT,
  ilustrationStatementList,
  ICommonObjectData,
  ISQSDetail,
  WR_SHARIA_CONVENT,
  ISummaryProposal,
  showModalFailedSubmitDoksul,
  showModalDialogSubmitDoksul,
} from '../../../utilities';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TFormConfirmProductDoksul, defaultFormConfirmProductDoksul } from './confirm-product-doksul.type';
import { productType, ValidationForm } from '../../../utilities/common-function';
import { useTranslation } from 'react-i18next';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { RootState } from 'redux/reducer';
import { useSelector } from 'react-redux';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { SignatureForm } from '../../../components/signature-form/signature-form';
import RNFS from 'react-native-fs';
import { postSubmissionDoksul } from '../../../network/services';
import { useDoksulSubmission } from '../../../hooks';
import moment from 'moment';

export const ConfirmProductDoksulScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedSQSId, proposalId, isDoksul } = useSelector<RootState, EposState>((state) => state.epos);
  const { onUpdateSQS, updateSummaryByKey, getSummaryProposalById } = useEposRealm();
  const { generateDoksulSubmission } = useDoksulSubmission();
  const summaryProposalById = getSummaryProposalById(proposalId) as ISummaryProposal;
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const product = RSQSData?.product as ICommonObjectData;
  // const isProductPWM = useMemo(() => product.key === 'H14' || product.key === 'H15', [product])
  const additionalBenefits = RSQSData?.additionalBenefits || []
  const confirmationProductDoksul = RSQSData?.confirmationProductDoksul
    ? JSON.parse(RSQSData.confirmationProductDoksul)
    : '';
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [agreementRecommendation, setAgreementRecommendation] = useState<TOptionalCardData>();
  const [loading, setLoading] = useState(false)
  const checkRider = additionalBenefits.length != 0 && additionalBenefits?.map((value: any) => value.key);
  const keyofRider = ['H1H7', 'H1H5', 'H1H1', 'H1H3', 'H161', 'H165'];
  const isRiderChecked = checkRider ? checkRider?.some((item: any) => keyofRider.includes(item)) : false;
  const isUnitLink = productType(product?.key) == 'UL';

  const wording = useMemo(() => WR_SHARIA_CONVENT[summaryProposalById?.shariaFlag || 'conventional'], []);

  const policyHolderStatement = (spaj: string, companyName: string) => {
    return [
      {
        id: '',
        key: t('Epos:policyholder_understanding_statement'),
      },
      {
        id: '1.	',
        key: t('Epos:understanding_and_approval_statement', { spaj, companyName }),
      },
      {
        id: '2.	',
        key: t('Epos:understanding_and_confirmation_statement'),
      },
      {
        id: '3. ',
        key: t('Epos:independent_decision_and_risk_acknowledgment')
      },
      {
        id: '4.	',
        key: t('Epos:data_usage_and_third_party_sharing_approval', { companyName }),
      },
    ]
  };

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TFormConfirmProductDoksul>({
    defaultValues: useMemo(() => {
      let result = defaultFormConfirmProductDoksul;
      if (RSQSData?.confirmationProductDoksul != null || RSQSData?.confirmationProductDoksul != '') {
        result = confirmationProductDoksul;
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

    if (getValues('agreementIlustration') === undefined) {
      setValue('agreementIlustration', []);
    }

    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    if (agreementRecommendation?.key == 'NotFollow') {
      setVisibleAlert(true);
    }
  }, [agreementRecommendation]);


  const onBack = () => {
    onSave(getValues(), EposRoutes.ILLUSTRATION, false);
    return null;
  };

  const onSave = (data: TFormConfirmProductDoksul, _routes?: string, isDoksulScreen?: boolean) => {
    const _sqsData = {
      ...RSQSData?.toJSON(),
      confirmationProductDoksul: JSON.stringify(data),
    } as ISQSDetail;
    onUpdateSQS(_sqsData);
    if (_routes) {
      updateSummaryByKey(proposalId, { key: 'lastState', value: _routes });
      if (route.name == 'SignatureProductPWM') {
        navigation.dispatch(StackActions.replace(_routes));
      } else {
        if (isDoksulScreen) {
          navigation.dispatch(StackActions.replace(_routes));
        } else {
          navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: _routes });
        }
      }
    }
  };

  const onCloseAlert = (goToQuickQuote?: boolean) => {
    setVisibleAlert(false);
    setValue('agreementRecommendation', '');
    setAgreementRecommendation({ label: '', key: '' });
    if (goToQuickQuote) {
      if (route.name == 'SignatureProductPWM') {
        navigation.dispatch(StackActions.replace(EposRoutes.QUICK_QUOTE));
      } else {
        navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.QUICK_QUOTE })
      }
    }
  };

  const onsubmitDoksul = async () => {
    setLoading(true)
    const doksulData = await generateDoksulSubmission(summaryProposalById?.doksulType);
    postSubmissionDoksul({
      params: doksulData,
      onSuccess: (resp) => {
        if (resp?.responseCode == '00') {
          updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
          updateSummaryByKey(proposalId, { key: 'statusProposal', value: 'Submitted' });
          updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
          navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.LINK_SUBMITTED })
          setLoading(false)
          return
        }
        showModalFailedSubmitDoksul(() => {
          setLoading(false)
          onsubmitDoksul()
        });
      }
    }).catch((err) => {
      setLoading(false)
    })
  }

  const onContinue: SubmitHandler<TFormConfirmProductDoksul> = async (data) => {
    if (isDoksul) {
      if (!isUnitLink) {
        if (RSQSData?.isChangePH) {
          await onSave(data, EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER, true);
        } else {
          await onSave(data);
          showModalDialogSubmitDoksul(() => onsubmitDoksul())
        }
      } else {
        await onSave(data, EposDoksulRoutes.ADDITIONAL_INSURANCE_STATEMENT, true);
      }
    } else {
      await onSave(data, EposRoutes.SPAJ_BEFORE_PROCEEDING, true);
    }
  };

  const checkedAll = (data: []) => {
    if (data?.length !== ilustrationStatementList?.length) {
      return 'Wajib diisi semua'
    }
  }

  return (
    <>
      {loading && <LoadingFull />}

      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing, plaiStyles.flex]}>
            <EposHeader />
            <ScrollView scrollEnabled={true}>
              <Text style={plaiStyles.fontHeaderTitle}>Tanda Tangan Analisa Mengerti Kebutuhan Anda & Ilustrasi</Text>

              <View
                style={[
                  plaiStyles.boxShadowProp,
                  plaiStyles.br8,
                  plaiStyles.px20,
                  plaiStyles.py20,
                  plaiStyles.bgwhite,
                  plaiStyles.mt12,
                  plaiStyles.mb12,
                ]}
              >
                <View>
                  <Text style={[plaiStyles.fontGrey66Thin]}>Produk</Text>
                  <Text style={[plaiStyles.mt8, plaiStyles.font14, plaiStyles.fontRed, plaiStyles.lineH20]}>
                    PRU<Text style={[plaiStyles.lineH20, plaiStyles.fontGrey33Bold]}>{product?.label?.slice(3)}</Text>
                  </Text>
                </View>

                {isRiderChecked && (
                  <View style={[plaiStyles.mt16]}>
                    <Text style={[plaiStyles.fontGrey66Thin]}>Manfaat</Text>
                    {additionalBenefits?.map((item: any) => (
                      <Text style={[plaiStyles.mt8, plaiStyles.font14, plaiStyles.fontRed, plaiStyles.lineH20]}>
                        PRU
                        <Text style={[plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>{item?.label.slice(3)}</Text>
                      </Text>
                    ))}
                  </View>
                )}
              </View>

              <Text style={[plaiStyles.mt16, plaiStyles.mb16, plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>
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

              <SectionTitle style={plaiStyles.mt24} text={'Pernyataan Terkait Rekomendasi'} />

              <Controller
                name={'agreementRecommendation'}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value } }) => (
                  <>
                    <OptionCard
                      required={true}
                      style={[plaiStyles.mt12, plaiStyles.mb16]}
                      theme="border"
                      data={QCONFIRMATION_RECOMMENDATION_PRODUCT}
                      selected={value}
                      onSelected={(item) => {
                        onChange(item);
                        setAgreementRecommendation(item);
                      }}
                      error={errors?.agreementRecommendation}
                    />
                  </>
                )}
              />

              {route.name != 'SignatureProductPWM' && (
                <>

                  {policyHolderStatement(wording?.spaj, wording?.companyName)?.map((item, index) => (
                    <View key={index}>
                      <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt16]}>
                        <Text style={[plaiStyles.mr10, plaiStyles.lineH20]}>{item?.id !== ' ' ? item?.id : '\t'}</Text>
                        <Text
                          style={[
                            plaiStyles.fontGrey33Thin,
                            plaiStyles.flex,
                            plaiStyles.flexWrap,
                            plaiStyles.lineH20,
                          ]}
                        >
                          {item?.key}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <FormProvider {...formContext}>
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

                    {isRiderChecked && (
                      <>
                        <SignatureForm
                          title={t('Epos:signature_of_the_policyholder_regarding_the_Statement_of_approval')}
                          signature='signWaitingPeriodPolicyHolder'
                          location='waitingPeriodPolicyHolderLocation'
                          signatureDate='waitingPeriodPolicyHolderDate'
                        />
                      </>
                    )}

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
                  </FormProvider>
                </>
              )}
            </ScrollView>
          </View>
          <ModalInformation
            visible={visibleAlert}
            desc="Silahkan melakukan analisa dan rekomendasi ulang karena nasabah tidak mengikuti rekomendasi"
            image={ALERT}
            title="Notifikasi"
            buttonPrimary={{
              text: 'Ulangi Analisa',
              onPress: () => onCloseAlert(true),
            }}
            buttonSecondary={{
              text: 'Tutup',
              onPress: () => onCloseAlert(false),
            }}
          />
          <EposFooter
            position={7}
            leftButton={{
              text: 'Sebelumnya',
              onPress: onBack,
            }}
            rightButton={{
              disabled: !isValid,
              onPress: handleSubmit(onContinue),
            }}
          />
        </>
      </PruScreen>
    </>
  );
};
