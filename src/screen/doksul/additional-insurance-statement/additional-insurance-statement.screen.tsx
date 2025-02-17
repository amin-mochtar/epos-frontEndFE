import { View, Text, ScrollView, FlatList, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { LoadingFull, plaiStyles, TextDecoration } from 'plai_common_frontend';
import { EposFooter, EposHeader, SectionInfoPerson, SectionTitle } from '../../../components';
import { ISQSDetail, ISummaryProposal, showModalDialogSubmitDoksul, showModalFailedSubmitDoksul, WR_SHARIA_CONVENT } from '../../../utilities';
import { TFormAddInsuranceStatement, defaultFormAddInsuranceStatement } from './additional-insurance-statement.type';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { getAdditionalInsuranceStatementList } from './additional-insurance-statement.data';
import { SignatureForm } from '../../../components/signature-form/signature-form';
import { useDoksulSubmission } from '../../../hooks';
import RNFS from 'react-native-fs';
import { postSubmissionDoksul } from '../../../network/services';

export const AdditionalInsuranceStatementScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const { selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const { onUpdateSQS, updateSummaryByKey } = useEposRealm();
  const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { generateDoksulSubmission } = useDoksulSubmission();
  const additionalBenefits = RSQSData?.additionalBenefits || []
  const calculator = RSQSData?.calculator ? JSON.parse(RSQSData.calculator) : '';
  const additionalInsuranceStatement = RSQSData?.additionalInsuranceStatement
    ? JSON.parse(RSQSData.additionalInsuranceStatement)
    : '';
  const [dataAuth, setDataAuth] = useState<any>();
  const { period } = WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'];
  const wordingSaver =
    additionalBenefits[0]?.key === 'H171' || additionalBenefits[0]?.key === 'H1H1'
      ? 'PruPrime Saver'
      : 'PruWell Saver';
  const additionalInsuranceStatementList =
    getAdditionalInsuranceStatementList(RSQSData?.policyType || 'conventional', RSQSData?.product, additionalBenefits[0]?.label || "");

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, ...rest },
    ...methods
  } = useForm<TFormAddInsuranceStatement>({
    defaultValues: useMemo(() => {
      let result = defaultFormAddInsuranceStatement;
      if (RSQSData?.additionalInsuranceStatement != null || RSQSData?.additionalInsuranceStatement != '') {
        result = additionalInsuranceStatement;
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
    if (authState?.agentProfile) {
      setDataAuth(authState.agentProfile);
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  const onBack = () => {
    onSave(getValues());
    navigation.dispatch(StackActions.replace(EposRoutes.CALCULATOR));
    return null;
  };

  const onSave = (data: TFormAddInsuranceStatement) => {
    const _sqsData = {
      ...RSQSData?.toJSON(),
      additionalInsuranceStatement: JSON.stringify(data),
    } as ISQSDetail;
    onUpdateSQS(_sqsData);

    updateSummaryByKey(proposalId, { key: 'lastState', value: EposDoksulRoutes.ADDITIONAL_INSURANCE_STATEMENT });
  };

  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<TFormAddInsuranceStatement> = async (data) => {
    setLoading(true)
    const doksulData = await generateDoksulSubmission(SummaryProposalById?.doksulType);
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
          const data = getValues();
          onSubmit(data);
          setLoading(false)
        });
      }
    }).catch((err) => {
      setLoading(false)
    })
  };

  const onContinue = () => {
    onSave(getValues());
    if (RSQSData?.isChangePH) {
      navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER })
    } else {
      showModalDialogSubmitDoksul(() => onSubmit(getValues()))
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
              <Text style={plaiStyles.fontHeaderTitle}>Pernyataan Pemilihan Asuransi Tambahan</Text>

              <Text style={[plaiStyles.mt24, plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>
                Dengan ini SAYA menyatakan setuju dengan Pemilihan Manfaat Asuransi Tambahan di bawah ini:
              </Text>

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
                <Text style={[plaiStyles.fontGrey66Thin]}>Asuransi Tambahan : </Text>
                {additionalBenefits?.length > 0 ? (
                  <>
                    <View>
                      {additionalBenefits?.map((item: any) => (
                        <Text style={[plaiStyles.mt8, plaiStyles.font14, plaiStyles.fontRed, plaiStyles.lineH20]}>
                          PRU
                          <Text style={[plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>{item?.label.slice(3)}</Text>
                        </Text>
                      ))}
                    </View>

                    <View style={[plaiStyles.mt16]}>
                      <Text style={[plaiStyles.fontGrey66Thin]}>Tipe Plan</Text>
                      <Text style={[plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>
                        {calculator?.benefits[0]?.planRider?.label}
                      </Text>
                    </View>
                    {/* Butuh enchancement tambahan */}
                    <View style={[plaiStyles.mt16]}>
                      <Text style={[plaiStyles.fontGrey66Thin]}>{wordingSaver}</Text>
                      <Text style={[plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>
                        {calculator?.benefits[0].saverRider?.label}
                      </Text>
                    </View>
                    {/* Butuh Enchancement tambahan */}
                    <View style={[plaiStyles.mt16]}>
                      <Text style={[plaiStyles.fontGrey66Thin]}>{`${period} Sampai Usia`}</Text>
                      <Text style={[plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>
                        {calculator?.benefits[0].periodRider?.label}
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text style={[plaiStyles.fontBlackBold, plaiStyles.mt8, plaiStyles.lineH20]}>Tidak Memilih Asuransi Tambahan</Text>
                )}
              </View>

              {additionalBenefits?.length > 0 && (
                <>
                  <SectionTitle style={plaiStyles.mt24} text={'Catatan'} />
                  <FlatList
                    data={additionalInsuranceStatementList}
                    style={[plaiStyles.mt8]}
                    renderItem={({ item }) => {
                      return (
                        <View style={[plaiStyles.row, plaiStyles.mt16,]}>
                          <Text>{`\u2022 `}</Text>
                          <View style={[plaiStyles.flex]}>
                            <Text style={[plaiStyles.lineH20, plaiStyles.fontGrey33Thin]}>
                              <TextDecoration label={item.key} />
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                </>
              )}
              <FormProvider {...formContext}>
                <SignatureForm
                  title={t('Epos:candidate_policyholder_signature')}
                  signature='signPolicyHolder'
                  location='policyHolderSignLocation'
                  signatureDate='policyHolderSignDate'
                />

                <SectionInfoPerson
                  type='agent'
                  keyLeft={dataAuth?.displayName?.enUs}
                  keyRight={dataAuth?.agentCode}
                />

                <SectionInfoPerson
                  containerStyle={[plaiStyles.mt16]}
                  type='other'
                  labelLeft={t('Epos:marketer_code')}
                  keyLeft={dataAuth?.agentCode}
                  labelRight={'PRYFLYER'}
                  keyRight='-'
                />

                <SignatureForm
                  title={t('Epos:signature_marketer')}
                  signature='signMarketer'
                  location='marketerSignLocation'
                  signatureDate='marketerSignDate'
                />
              </FormProvider>
            </ScrollView>
          </View>
          <EposFooter
            position={7}
            leftButton={{
              text: 'Kembali',
              onPress: () => navigation.dispatch(StackActions.replace(EposDoksulRoutes.CONFIRM_PRODUCT_DOKSUL)),
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
