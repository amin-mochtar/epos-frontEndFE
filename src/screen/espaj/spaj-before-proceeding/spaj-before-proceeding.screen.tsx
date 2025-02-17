import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { Divider, InputField, ModalContainer, plaiStyles, sanitizedText } from 'plai_common_frontend';
import { EposHeader, EposFooter, SectionTitle, OptionCard, TOptionalCardData } from '../../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TFormBeforeProceeding, defaultTFormBeforeProceeding } from './spaj-before-proceeding.type';
import { VALIDATION } from './validation/validation';
import {
  ISPAJData,
  ISQSDetail,
  ISummaryProposal,
  WR_SHARIA_CONVENT,
  checkMainParticipant,
  confirmProspectivePHList,
  magnumGetNavigation,
  magnumResumeCase,
  magnumStartCase,
  premiumPaymentCandidateList,
  statement,
} from '../../../utilities';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, updateEposState } from '../../../redux';
import { useObject, useEposRealm, generateSPAJData } from '../../../database';
import { Button } from 'common_ui_components/app/components-ui';
import { defaultOptionalData, productType } from '../../../utilities/common-function';
import { Categories } from './config-data-completeness';
import { useMappingBootstrap } from '../../../hooks';
import { NavigationItem } from '../spaj-life-style/spaj-life-style.type';

export const SpajBeforeProceedingScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { onUpdateSPAJ, updateSummaryByKey, updateSPAJStatusSubMenu, getSummaryProposalById, updateSPAJByKey, updateSQSByKey } = useEposRealm();
  const _SPAJData = generateSPAJData();
  const { _mappingBootstrap } = useMappingBootstrap()
  const { selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSummaryProposal = getSummaryProposalById(proposalId);
  const spajId = RSummaryProposal?.spajId;
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const additionalLifeAssuredSelf = RSQSData ? RSQSData.additionalLifeAssuredSelf : '';
  const policyHolderIsPremiumPayor = RSQSData ? RSQSData?.policyHolderIsPremiumPayor : '';
  const prospectivePremiumPayor = RSQSData ? RSQSData?.prospectivePremiumPayor : '';
  const defaultconfirmationSQSData = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : null;
  const [policyHolder, setPolicyHolder] = useState(lifeAssuredSelf || '');
  const [policyOwnershipInfo, setPolicyOwnershipInfo] = useState<TOptionalCardData>(
    defaultconfirmationSQSData ? defaultconfirmationSQSData?.policyOwnershipInfo : defaultOptionalData,
  );
  const [spajApproval, setSpajApproval] = useState<TOptionalCardData>(
    defaultconfirmationSQSData ? defaultconfirmationSQSData?.spajApproval : defaultOptionalData,
  );
  const [tempPremiumPayor, setTempPremiumPayor] = useState<TOptionalCardData[]>([defaultOptionalData]);
  const [modalVisible, setModalVisible] = useState(false);
  const defaultValues = useMemo(() => {
    let result = defaultTFormBeforeProceeding;
    if (defaultconfirmationSQSData) {
      result = defaultconfirmationSQSData;
    }
    return result;
  }, [defaultconfirmationSQSData, defaultTFormBeforeProceeding, RSPAJData])
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormBeforeProceeding>({
    defaultValues,
  });

  const { wording, mainParticipant, isTraditional, isPNG, isPrucerah } = useMemo(() => {
    const isPNG = ['U12', 'U13'].includes(RSQSData?.product?.key!)
    const isPrucerah = ['E1O', 'E1OP'].includes(RSQSData?.product?.key!)

    return {
      wording: WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'],
      mainParticipant: checkMainParticipant(RSummaryProposal?.productCode!, RSQSData?.policyType!),
      isTraditional: productType(RSQSData?.product?.key!) === 'TRD',
      isPNG,
      isPrucerah,
    };
  }, []);

  const clientIndex = useMemo(() => {
    let clientIndex = 0

    if (isPrucerah) {
      clientIndex = 1
    }

    return clientIndex
  }, [])

  //default falue
  useEffect(() => {
    // setValue('confirmProspectivePolicyholder', lifeAssuredSelf);
    updateSummaryByKey(proposalId, { key: 'statusProposal', value: 'SPAJ Pending Submit' });

    const isPremiumPayorCondition =
      policyHolderIsPremiumPayor === 'Y' || (policyHolderIsPremiumPayor === 'N' && prospectivePremiumPayor === 'Other');

    const filterKey = lifeAssuredSelf == 'self' ? 'TertanggungUtama' : undefined;

    let premiumPayor =
      premiumPaymentCandidateList(mainParticipant)?.filter((word) => word.key !== filterKey) ||
      premiumPaymentCandidateList;

    if (isPrucerah && additionalLifeAssuredSelf == 'other') {
      premiumPayor.splice(2, 0, {
        label: wording.candidateTitleOne,
        key: 'additionalAssured',
      });
    }

    setTempPremiumPayor(premiumPayor);

    if (!defaultconfirmationSQSData) {
      if (isTraditional) {
        setValue('premiumPaymentCandidate', 'Y');
      } else if (isPNG) {
        setValue(
          'premiumPaymentCandidate',
          isPremiumPayorCondition ? policyHolderIsPremiumPayor : prospectivePremiumPayor,
        );
      }
    }

    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  // reorganize fields when there're changes
  useEffect(() => {
    if (policyOwnershipInfo?.key === 'N') setValue('consequencesPolicy', '');
    if (spajApproval?.key === 'N') setValue('previousSpajId', '');
  }, [policyOwnershipInfo, spajApproval]);

  const onBack = () => {
    if (spajId && defaultconfirmationSQSData) {
      updateSPAJByKey(spajId, {
        key: 'confirmationSQS',
        value: JSON.stringify(defaultconfirmationSQSData)
      })
    }
    navigation.dispatch(StackActions.replace(EposRoutes.LANDING));
    return true;
  }

  const handleMagnumError = async (err: any, proposalId: string) => {
    if (err.ErrorObject?.MessageCode === 'M02007') {
      try {
        await magnumResumeCase(proposalId);
      } catch (resumeError) {
        console.error('Error resuming case:', resumeError);
      }
    } else {
      console.error('Error starting case:', err);
    }
  };
  const initMagnum = async () => {
    try {
      const bootstrap = await _mappingBootstrap();
      try {
        await magnumStartCase(proposalId, bootstrap);
      } catch (err) {
        await handleMagnumError(err, proposalId);
      }
    } catch (error) {
      console.error('Initialization error:', error);
    }
  };
  const getNavigationMagnum = async (): Promise<NavigationItem[]> => {
    await initMagnum();
    const navigation = await magnumGetNavigation(proposalId, clientIndex)
    return Promise.resolve(navigation.Data.NavigationList);
  }
  const onSave: SubmitHandler<TFormBeforeProceeding> = useCallback(async (data) => {
    const premiumPaymentCandidate = getValues('premiumPaymentCandidate');
    if (!data.premiumPaymentCandidate || data.premiumPaymentCandidate === "Y") {
      updateSPAJByKey(spajId!,
        [
          {
            key: "premiumPayor",
            value: ""
          },
          {
            key: "premiumPayorDoc",
            value: ""
          }
        ]
      )
    }
    updateSQSByKey(RSQSData?.sqsId!,
      {
        key: 'prospectivePremiumPayor',
        value: data.premiumPaymentCandidate === "N" ? "Other" : ""
      },
    );
    const _checkCategory = Categories(
      wording,
      lifeAssuredSelf,
      additionalLifeAssuredSelf ?? '',
      premiumPaymentCandidate,
      mainParticipant,
      await getNavigationMagnum(),
      RSQSData?.product?.key!,
      RSQSData?.isGIO,
    );

    const isOtherPayor = premiumPaymentCandidate == 'N'
    if (lifeAssuredSelf !== policyHolder) {
      setModalVisible(true);
    } else {
      if (!spajId) {
        onUpdateSPAJ({
          ..._SPAJData,
          confirmationSQS: JSON.stringify(data),
          DataCompleteness: _checkCategory,
        });
        const spajId = { ..._SPAJData }.spajId;
        dispatch(updateEposState({ spajId }));
        updateSummaryByKey(proposalId, { key: 'spajId', value: spajId });
        updateSummaryByKey(proposalId, { key: 'lastState', value: EposRoutes.SPAJ_DATA_COMPLETENESS });
      } else {
        const _RSPAJData = {
          ...RSPAJData?.toJSON(),
          confirmationSQS: JSON.stringify(data),
        } as ISPAJData;
        onUpdateSPAJ(_RSPAJData);

        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_TOPUP, [{ key: 'status', value: isTraditional }]);

        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE, [
          { key: 'status', value: isOtherPayor ? false : true },
          { key: 'route', value: isOtherPayor ? EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE : '' },
        ]);
      }
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    }
  }, [spajId, RSPAJData, _SPAJData]);

  const onCancel = () => {
    // setValue('confirmProspectivePolicyholder', RSQSData?.lifeAssuredSelf);
    setPolicyHolder(lifeAssuredSelf);
    setModalVisible(!modalVisible);
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <Text style={plaiStyles.fontHeaderTitle}>{`${t('Epos:before_proceeding')} ${wording.additionalLabel}`}</Text>
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
            {`${t('Epos:anwser_of_question_before_proceeding')} ${wording.additionalLabel}`}
          </Text>
          <ScrollView>
            <SectionTitle text={t('Epos:confirmation')} />
            {/* <Controller
              name={VALIDATION.confirmProspectivePolicyholder.name}
              control={control}
              rules={VALIDATION.confirmProspectivePolicyholder.rule}
              render={({ field: { value, onChange } }) => (
                <>
                  <OptionCard
                    label={t('Epos:confirm_statement')}
                    theme="border"
                    data={confirmProspectivePHList}
                    selected={value}
                    onSelected={(value: any) => {
                      setPolicyHolder(value?.key);
                      onChange(value);
                    }}
                    error={errors?.confirmProspectivePolicyholder}
                  />
                </>
              )}
            /> */}

            <Controller
              name={VALIDATION.premiumPaymentCandidate.name}
              control={control}
              rules={VALIDATION.premiumPaymentCandidate.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    label={t('Epos:prospective_premium_payer', { label: wording.premiContribution })}
                    theme="border"
                    data={tempPremiumPayor}
                    selected={value}
                    onSelected={(item) => onChange(item?.key)}
                    error={errors?.premiumPaymentCandidate}
                    onDisabled={() => isPNG}
                    uniqueTestId='premium-payment-candidate'
                  />
                </>
              )}
            />

            <SectionTitle text={t('Epos:policy_ownership_info')} />

            <Controller
              name={VALIDATION.policyOwnershipInfo.name}
              control={control}
              rules={VALIDATION.policyOwnershipInfo.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    label={t('Epos:question_for_insurance_ownership', {
                      companyName: `${wording.companyName}${wording.additionalCompanyName ? ` ${wording.additionalCompanyName}` : ''}`,
                      spaj: wording?.spaj,
                      tertanggung: `${wording.lifeAssured}`,
                      premiContribution: wording.premiContribution,
                      day: ['U17R', 'U17D'].includes(RSQSData?.product?.key!) ? '90' : '365',
                    })}
                    translation={true}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={statement}
                    selected={value}
                    onSelected={(value) => {
                      setPolicyOwnershipInfo(value);
                      onChange(value);
                    }}
                    error={errors?.policyOwnershipInfo}
                    uniqueTestId='policy-ownership-info'
                  />
                </>
              )}
            />

            {policyOwnershipInfo?.key === 'Y' && (
              <Controller
                name={VALIDATION.consequencesPolicy.name}
                control={control}
                rules={VALIDATION.consequencesPolicy.rule}
                render={({ field: { onChange, value } }) => (
                  <>
                    <OptionCard
                      label={t('Epos:consequences_as_stipulated_in_the_policy', { spaj: wording.spaj })}
                      style={[plaiStyles.flex, plaiStyles.row]}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                      theme="border"
                      data={statement}
                      selected={value}
                      onSelected={onChange}
                      error={errors?.consequencesPolicy}
                      uniqueTestId='consequences-policy'
                    />
                  </>
                )}
              />
            )}

            <Controller
              name={VALIDATION.spajApproval.name}
              control={control}
              rules={VALIDATION.spajApproval.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    label={t('Epos:approval_of_spaj', {
                      spaj: `SPAJ${wording.additionalLabel ? ` ${wording.additionalLabel}` : ''}`,
                      label: mainParticipant,
                    })}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={statement}
                    selected={value}
                    onSelected={(value) => {
                      setSpajApproval(value);
                      onChange(value);
                    }}
                    error={errors?.spajApproval}
                    uniqueTestId='spaj-approval'
                  />
                </>
              )}
            />

            {spajApproval?.key === 'Y' && (
              <Controller
                name={VALIDATION.previousSpajId.name}
                control={control}
                rules={VALIDATION.previousSpajId.rule}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    label={t('Epos:previous_spaj_number', { spaj: `SPAJ` })}
                    placeholder={t('Epos:enter_number_spaj', { spaj: `SPAJ` })}
                    value={value}
                    setValue={(item) => onChange(sanitizedText(item))}
                    maxLength={10}
                    keyboardType="phone-pad"
                    error={errors.previousSpajId}
                    id="input-prev-spaj-id"
                  />
                )}
              />
            )}

            <ModalContainer
              visible={modalVisible}
              titleHeader={t('Epos:info')}
              type="center"
              children={
                <>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.selfCenter]}>
                    Apakah anda yakin ingin mengganti Pemegang Polis?
                  </Text>
                  <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
                    <Button
                      style={[plaiStyles.flex, plaiStyles.borderGreycc, plaiStyles.mt16]}
                      textStyle={plaiStyles.fontGrey33}
                      text={'Tidak'}
                      onPress={onCancel}
                    />
                    <Divider width={8} />
                    <Button
                      style={[plaiStyles.bgBtnRed, plaiStyles.flex, plaiStyles.mt16]}
                      textStyle={plaiStyles.fontWhite}
                      text={'Ya'}
                      onPress={() => {
                        navigation.dispatch(StackActions.replace(EposRoutes.POLICY_HOLDER_TARGET));
                        updateSummaryByKey(proposalId, { key: 'lastState', value: EposRoutes.POLICY_HOLDER_TARGET });
                      }}
                    />
                  </View>
                </>
              }
              onClose={() => setModalVisible(!modalVisible)}
            ></ModalContainer>
          </ScrollView>
        </View>
        <EposFooter
          position={6}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: handleSubmit(onSave),
          }}
        />
      </>
    </PruScreen>
  );
};
