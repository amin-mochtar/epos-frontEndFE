import { View, Text, FlatList, BackHandler, ListRenderItemInfo } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EposFooter,
  EposHeader,
  CardPolicyType,
  OptionCard,
  SectionTitle,
  TOptionalCardData,
  EposPMKModal,
  HeaderTitle,
} from '../../../components';
import {
  QDOMICILE_ACEH,
  QDOMICILE_SUMATERAUTARA,
  INSURANCE_GOALS_OPTION,
  IndonesianLanguageCapability,
  DisabilityCategoryStatus,
  ValidationDisabilityCategoryStatus,
  educationList,
  TCommonOptionalData,
  ISQSDetail,
  TPOJK,
  defaultOptionalData,
  deepCompare,
} from '../../../utilities';
import { EposRoutes } from '../../../navigation';
import { isEmpty } from 'lodash';
import { PruColor, PruScreen } from 'common_ui_components';
import { plaiStyles, setMultipleSelect, DropdownField, GlobalPromptModal } from 'plai_common_frontend';
import { useDispatch, useSelector } from 'react-redux';
import { EposState, updateSqs } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
// @ts-ignore
import { RootState } from 'redux/reducer';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { VALIDATION } from './validation/validation';
import { TInsuranceGoalsItem } from './insurance-goals.type';
import { useTranslation } from 'react-i18next';
import dummyCityJSON from './dummyCityJSON.json';
import useVunerableCustomer from './hooks/useVunerableCustomer';
import { defaultTFormDataPOJK, INSURANCE_GOALS_VALIDATION_CITY } from './insurance-goals.data';

export const InsuranceGoalsScreen = () => {
  const sumateraUtaraCity = dummyCityJSON.SUMATERA_UTARA.sort((a, b) => a.key.localeCompare(b.key));
  const route = useRoute();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const params = route.params as { sqsState: string } | undefined;
  const navigation = useNavigation();
  const { sqsData, selectedSQSId, proposalId, ProspectDetail, isDoksul } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const agentProfileState = useSelector((state: any) => {
    return state.auth?.agentProfile;
  });
  const { onUpdateSQS, updateSummaryByKey } = useEposRealm();

  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const [isShowPMKModal, setIsShowPMKModal] = useState<boolean>(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isDomicileAceh, setIsDomicileAceh] = useState<boolean | undefined>(undefined);

  const [isDomicileSumatraUtara, setIsDomicileSumatraUtara] = useState<boolean | undefined>(undefined);
  const [additionalPassed, setAdditionalPassed] = useState<boolean | undefined>(undefined);
  const [additionalQuestion, setAdditionalQuestion] = useState<boolean>(false);
  const [showValidationGoalsCount, setShowValidationGoalsCount] = useState<boolean>(false);
  const defaultValues = useMemo(() => {
    let result = defaultTFormDataPOJK;
    if (RSQSData != null) {
      result = RSQSData.additionalValidationPolicyInformation
        ? JSON.parse(RSQSData.additionalValidationPolicyInformation)
        : '';
    } else if (sqsData.additionalValidationPolicyInformation) {
      result = JSON.parse(sqsData.additionalValidationPolicyInformation);
    }
    return result as TPOJK;
  }, []);

  const { control, setValue, getValues, watch } = useForm<TPOJK>({
    defaultValues,
  });

  const onSelectCantHandlePolis = () => {
    GlobalPromptModal.show({
      title: 'Tidak Dapat Melanjutkan',
      subtitle:
        'Anda tidak dapat menjadi Calon Pemegang Polis karena tidak mampu memahami penjelasan tenaga pemasar produk dan ketentuan polis.',
      buttonPrimary: {
        text: 'Tutup',
        onPress: () => GlobalPromptModal.close(),
      },
    });
  };

  const initialVulnerable = useMemo(() => {
    if (RSQSData?.vulnerablityCustomer) {
      return JSON.parse(RSQSData.vulnerablityCustomer as string);
    }
    if (sqsData?.vulnerablityCustomer) {
      return JSON.parse(sqsData.vulnerablityCustomer as string);
    }
    return undefined;
  }, [RSQSData, sqsData]);

  const lifeAssuredSelf = useMemo(
    () => (RSQSData ? RSQSData?.lifeAssuredSelf! : sqsData?.lifeAssuredSelf!),
    [RSQSData, sqsData],
  );

  const {
    VulnerableModule,
    isValid: isVulnerableValid,
    getValues: getValueVulnerable,
  } = useVunerableCustomer({
    onSelectNone: onSelectCantHandlePolis,
    initialValue: initialVulnerable,
  });

  useEffect(() => {
    populateInitialData();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  const onBack = () => {
    let route = EposRoutes.POLICY_HOLDER_TARGET;
    if (params?.sqsState) {
      route = EposRoutes.QUICK_QUOTE;
    } else {
      onSave(EposRoutes.POLICY_HOLDER_TARGET);
    }
    navigation.dispatch(StackActions.replace(route));
    return true;
  };

  const onSave = async (route?: string) => {
    const additionalValidationPolicyInformation = getValues();
    const vulnerableData = getValueVulnerable();
    if (selectedSQSId && !isDoksul && RSQSData) {
      const _sqsData = {
        ...RSQSData?.toJSON(),
        insuranceGoal: selectedGoals,
        isDomicileAceh: isDomicileAceh,
        isDomicileSumatraUtara: isDomicileSumatraUtara,
        vulnerablityCustomer: JSON.stringify(vulnerableData),
        additionalValidationPolicyInformation: JSON.stringify(additionalValidationPolicyInformation),
      } as ISQSDetail;
      await onUpdateSQS(_sqsData!);
      await updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: route || EposRoutes.INSURANCE_GOALS,
      });
    } else {
      dispatch(updateSqs({ key: 'insuranceGoal', payload: selectedGoals }));
      dispatch(updateSqs({ key: 'isDomicileAceh', payload: isDomicileAceh }));
      dispatch(updateSqs({ key: 'isDomicileSumatraUtara', payload: isDomicileSumatraUtara }));
      dispatch(updateSqs({ key: 'vulnerablityCustomer', payload: JSON.stringify(vulnerableData) }));
      dispatch(
        updateSqs({
          key: 'additionalValidationPolicyInformation',
          payload: JSON.stringify(additionalValidationPolicyInformation),
        }),
      );
    }
  };

  const onContinue = async () => {
    let nextRoutes = EposRoutes.POLICY_SUBMISSION_TYPE;

    if (params?.sqsState) {
      const realmData = {
        insuranceGoal: RSQSData.insuranceGoal,
        isDomicileAceh: RSQSData.isDomicileAceh,
        isDomicileSumatraUtara: RSQSData.isDomicileSumatraUtara,
        vulnerablityCustomer: RSQSData && RSQSData.vulnerablityCustomer ? JSON.parse(RSQSData.vulnerablityCustomer) : '',
        additionalValidationPolicyInformation: RSQSData && RSQSData.additionalValidationPolicyInformation ? JSON.parse(RSQSData.additionalValidationPolicyInformation) : '',
      };

      const formData = {
        insuranceGoal: selectedGoals,
        isDomicileAceh: isDomicileAceh,
        isDomicileSumatraUtara: isDomicileSumatraUtara,
        vulnerablityCustomer: getValueVulnerable(),
        additionalValidationPolicyInformation: getValues(),
      };

      const isDifference = deepCompare(realmData, formData);
      if (isDifference === false) {
        nextRoutes = EposRoutes.QUICK_QUOTE;
      }
    }

    await onSave();
    navigation.dispatch(StackActions.replace(nextRoutes));
  };

  const populateInitialData = () => {
    let goal: string[] = [];
    let isAceh = false;
    let isSumatraUtara = false;
    let additionalValidationPolicyInformation: TCommonOptionalData = {};
    if (sqsData) {
      goal = sqsData?.insuranceGoal;
      isAceh = sqsData?.isDomicileAceh!;
      isSumatraUtara = sqsData?.isDomicileSumatraUtara!;
      additionalValidationPolicyInformation = sqsData?.additionalValidationPolicyInformation
        ? JSON.parse(sqsData?.additionalValidationPolicyInformation)
        : {};
    }
    if (RSQSData?.insuranceGoal) {
      goal = RSQSData.insuranceGoal;
      isAceh = RSQSData.isDomicileAceh;
      isSumatraUtara = RSQSData.isDomicileSumatraUtara;
      additionalValidationPolicyInformation = JSON.parse(RSQSData.additionalValidationPolicyInformation as string);
    }
    if (additionalValidationPolicyInformation && Object.keys(additionalValidationPolicyInformation).length !== 0) {
      if (additionalValidationPolicyInformation?.disabilityCategoryStatus?.key !== 'HEALTHY') {
        setAdditionalQuestion(true);
        const item = lifeAssuredSelf !== 'self' ? { label: 'Ya', key: 'YES' } : { label: '', key: '' };
        setValue('validateDisabilityCategoryStatus', item);
        if (item.key === 'YES') setAdditionalPassed(true);
      } else {
        setAdditionalQuestion(false);
      }
      for (const key in additionalValidationPolicyInformation) {
        if (Object.prototype.hasOwnProperty.call(additionalValidationPolicyInformation, key)) {
          setAdditionalPassed(true);
        } else {
          setAdditionalPassed(undefined);
        }
      }
    } else {
      setAdditionalPassed(false)
    }
    setSelectedGoals(goal);
    setIsDomicileAceh(isAceh);
    setIsDomicileSumatraUtara(isSumatraUtara);
    if (ProspectDetail?.education) {
      const education = educationList.find((item) => item.key == ProspectDetail?.education) as TOptionalCardData;
      setValue('lastEducationalStatus', education);
    }
  };

  const onGoalsMoreThanFive = (value: boolean) => {
    setShowValidationGoalsCount(value);
  };

  const onSelectGoal = (value: string) => {
    setSelectedGoals(setMultipleSelect(selectedGoals, value));
  };
  const onSelectDomicileAceh = (value: TOptionalCardData) => {
    if (!agentProfileState?.contract[1]?.contractDate && value?.key === true) {
      setIsShowPMKModal(true);
    } else {
      setIsDomicileAceh(value.key as boolean);
    }
  };
  const onSelectDomicileSumatraUtara = (value: TOptionalCardData) => {
    setIsDomicileSumatraUtara(value.key as boolean);
    if (value.key === true) setAdditionalPassed(undefined);
    else {
      setValue('selectedCitySumatraUtara', defaultOptionalData);
      setAdditionalPassed(true);
    }
  };

  const onChangeLastEducation = (item: TCommonOptionalData, onChange: (item: TCommonOptionalData) => void) => {
    if (item.key === 'H') {
      setTimeout(
        () =>
          GlobalPromptModal.show({
            title: 'Informasi',
            subtitle: 'Tidak dapat melanjutkan pembuatan polis, silakan cek pendidikan Nasabah.',
            testID: 'education-modal',
            buttonPrimary: {
              text: 'Tutup',
              onPress: () => {
                setValue('lastEducationalStatus', { key: '', label: '' });
                GlobalPromptModal.close();
              },
            },
          }),
        500,
      );
      return;
    }
    onChange(item);
  };

  const onChangeLanguangeCapability = (item: TOptionalCardData, onChange: (item: TOptionalCardData) => void) => {
    if (item.key === 'NOILC') {
      GlobalPromptModal.show({
        title: 'Informasi',
        subtitle:
          'Mohon pastikan kembali bahwa Pemegang Polis dapat secara mandiri mampu memahami ketentuan Polis secara menyeluruh.',
        testID: 'languange-modal',
        buttonPrimary: {
          text: 'Tutup',
          onPress: () => {
            setValue('indonesianLanguageCapability', defaultOptionalData);
            GlobalPromptModal.close();
          },
        },
      });
      return;
    }
    onChange(item);
  };

  const onChangeDisabilityCategory = (item: TOptionalCardData, onChange: (item: TOptionalCardData) => void) => {
    if (item.key !== 'HEALTHY') {
      setAdditionalQuestion(true);
      GlobalPromptModal.show({
        title: 'Informasi',
        subtitle: 'Disabilitas Sensorik tidak bisa menjadi Pemegang Polis.',
        buttonPrimary: {
          text: 'Tutup',
          onPress: () => {
            GlobalPromptModal.close();
          },
        },
      });
      onChange(item);
      setAdditionalQuestion(true);
      return;
    }
    setAdditionalQuestion(false);
    setValue('disabilityCategoryStatus', { key: '', label: '' });
    onChange(item);
  };

  const onChangeDisabilityStatus = useCallback(
    (item: TOptionalCardData, onChange: (item: TOptionalCardData) => void) => {
      if (item.key === 'YES') {
        GlobalPromptModal.show({
          title: 'Informasi',
          subtitle: 'Silakan mengganti Calon Pemegang Polis dengan Orang lain.',
          buttonPrimary: {
            text: 'Ubah Calon Pemegang Polis',
            onPress: () => {
              GlobalPromptModal.close();
              navigation.dispatch(StackActions.replace(EposRoutes.POLICY_HOLDER_TARGET));
            },
          },
        });
        return;
      }
      if (item.key === 'NO') {
        GlobalPromptModal.show({
          title: 'Informasi',
          subtitle: 'Disabilitas Sensorik tidak bisa menjadi Pemegang Polis.',
          buttonPrimary: {
            text: 'Tutup',
            onPress: () => {
              setValue('validateDisabilityCategoryStatus', defaultOptionalData);
              GlobalPromptModal.close();
            },
          },
        });
        return;
      }
      onChange(item);
    },
    [lifeAssuredSelf],
  );

  const onChangeSumatraUtaraCity = (item: TCommonOptionalData, onChange: (item: TCommonOptionalData) => void) => {
    if (INSURANCE_GOALS_VALIDATION_CITY.includes(item.key as string)) {
      setTimeout(
        () =>
          GlobalPromptModal.show({
            title: 'Tidak Dapat Melanjutkan',
            subtitle: 'Sehubungan dengan Kebijakan Internal Perusahaan, Pengajuan SPAJ ini tidak dapat di proses.',
            buttonPrimary: {
              text: 'Tutup',
              onPress: () => {
                setValue('selectedCitySumatraUtara', defaultOptionalData);
                GlobalPromptModal.close();
              },
            },
          }),
        500,
      );
      return;
    }
    setAdditionalPassed(true);
    onChange(item);
  };

  const checkedIsDisabilityPassed = useCallback(() => {
    const isDisability = watch('disabilityCategoryStatus');
    if (isDisability?.key !== 'HEALTHY' && lifeAssuredSelf !== 'self') return false;
    if (isDisability?.key !== 'HEALTHY') {
      return true;
    }
    return false;
  }, [lifeAssuredSelf]);
  // Logic end

  const renderItemGoals = useCallback(
    ({ item, index }: ListRenderItemInfo<TInsuranceGoalsItem>) => {
      const isOdd = index % 2 == 0;
      const separator = isOdd ? plaiStyles.mr4 : plaiStyles.ml4;
      const isSelected = selectedGoals.findIndex((goal) => goal == item.key) > -1;
      return (
        <CardPolicyType
          key={index}
          data={item}
          isSelected={isSelected}
          style={separator}
          onPress={onSelectGoal}
          selectedGoals={selectedGoals}
          callbackValidation={onGoalsMoreThanFive}
          uniqueTestId="insurance-goals"
        />
      );
    },
    [selectedGoals, onSelectGoal, onGoalsMoreThanFive],
  );
  const lastEducationalStatus = useWatch({ control, name: "lastEducationalStatus" })
  const indonesianLanguageCapability = useWatch({ control, name: "indonesianLanguageCapability" })
  const disabilityCategoryStatus = useWatch({ control, name: "disabilityCategoryStatus" })

  const disabledCondition = [
    Boolean(!disabilityCategoryStatus.key),
    Boolean(!indonesianLanguageCapability.key),
    Boolean(!getValues('lastEducationalStatus').key),
    isEmpty(selectedGoals),
    isDomicileAceh == undefined,
    isDomicileSumatraUtara == undefined,
    additionalPassed == undefined,
    !isVulnerableValid,
    checkedIsDisabilityPassed(),
  ]

  const rightButtonConfig = useMemo(() => {
    return {
      disabled: disabledCondition.includes(true),
      onPress: onContinue,
    };
  }, [
    selectedGoals,
    isDomicileAceh,
    isDomicileSumatraUtara,
    additionalPassed,
    isVulnerableValid,
    lastEducationalStatus,
    indonesianLanguageCapability,
    disabilityCategoryStatus,
    checkedIsDisabilityPassed,
    onContinue,
  ]);

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      <View style={[plaiStyles.spacing, plaiStyles.flex]}>
        <EposHeader />
        <FlatList
          data={INSURANCE_GOALS_OPTION}
          renderItem={renderItemGoals}
          numColumns={2}
          ListHeaderComponent={<HeaderTitle title="Tujuan nasabah mengajukan asuransi" tagTitle={true} />}
          ListFooterComponent={
            <>
              {showValidationGoalsCount && (
                <Text style={[plaiStyles.fontYellow, plaiStyles.font14]}>
                  Pemilihan tujuan asuransi tidak boleh lebih dari 5
                </Text>
              )}
              <SectionTitle text={t('Informasi Calon Pemegang Polis')} />
              <View style={[plaiStyles.borderDefault, plaiStyles.px16, plaiStyles.mt16, plaiStyles.mb24]}>
                <Controller
                  name={VALIDATION.lastEducationalStatus.name}
                  control={control}
                  rules={VALIDATION.lastEducationalStatus.rule}
                  render={({ field: { value, onChange } }) => (
                    <DropdownField
                      containerStyle={plaiStyles.mt16}
                      labelMap={{
                        title: t('Pendidikan Formal Terakhir'),
                        placeholder: t('Pilih Pendidikan'),
                      }}
                      data={educationList}
                      selected={value}
                      onSelected={(item) => onChangeLastEducation(item, onChange)}
                      id="last-educational-status"
                    />
                  )}
                />
                <Controller
                  name={VALIDATION.indonesianLanguageCapability.name}
                  control={control}
                  rules={VALIDATION.indonesianLanguageCapability.rule}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24]}>
                        {String(t('Apakah Calon Pemegang Polis dapat berbahasa Indonesia?'))}
                        <Text style={plaiStyles.fontRed}> *</Text>
                      </Text>
                      <OptionCard
                        data={IndonesianLanguageCapability}
                        theme="border"
                        style={[plaiStyles.row]}
                        spaceItem={8}
                        insideStyle={[plaiStyles.flex]}
                        selected={value}
                        onSelected={(item) => onChangeLanguangeCapability(item, onChange)}
                        uniqueTestId="id-lang-capability"
                      />
                    </>
                  )}
                />
                <Controller
                  name={VALIDATION.disabilityCategoryStatus.name}
                  control={control}
                  rules={VALIDATION.disabilityCategoryStatus.rule}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.mt24]}>
                        {String(t('Apakah Nasabah termasuk ke dalam Disabilitas Sensorik?'))}
                        <Text style={plaiStyles.fontRed}> *</Text>
                      </Text>
                      <OptionCard
                        data={DisabilityCategoryStatus}
                        theme="border"
                        selected={value}
                        onSelected={(item) => onChangeDisabilityCategory(item, onChange)}
                        style={[plaiStyles.mb24]}
                        uniqueTestId="disability-status"
                      />
                    </>
                  )}
                />
                {additionalQuestion && (
                  <Controller
                    name={VALIDATION.validateDisabilityCategoryStatus.name}
                    control={control}
                    rules={VALIDATION.validateDisabilityCategoryStatus.rule}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                          {String(
                            t(
                              'Apakah Terdapat Calon Pemegang polis lain dengan Insurable interest yang mampu menjadi PH?',
                            ),
                          )}
                          <Text style={plaiStyles.fontRed}> *</Text>
                        </Text>
                        <OptionCard
                          theme="border"
                          style={[plaiStyles.row, plaiStyles.mb16]}
                          spaceItem={8}
                          insideStyle={[plaiStyles.flex]}
                          data={ValidationDisabilityCategoryStatus}
                          selected={value}
                          onSelected={(item) => onChangeDisabilityStatus(item, onChange)}
                          uniqueTestId="validate-disability-status"
                        />
                      </>
                    )}
                  />
                )}
              </View>
              <VulnerableModule />
              {/* Untuk Section domisili aceh */}
              <SectionTitle wrapperStyle={plaiStyles.mt16} text="Apakah nasabah berdomisili di Aceh?" />

              <OptionCard
                style={[plaiStyles.mt4, plaiStyles.pb24]}
                data={QDOMICILE_ACEH}
                selected={isDomicileAceh}
                onSelected={onSelectDomicileAceh}
                uniqueTestId="domicile-aceh"
              />
              {/* Untuk Section domisili Sumatera */}
              <SectionTitle wrapperStyle={plaiStyles.mt16} text="Apakah nasabah berdomisili di Sumatera Utara?" />
              <OptionCard
                style={[plaiStyles.mt4]}
                data={QDOMICILE_SUMATERAUTARA}
                selected={isDomicileSumatraUtara}
                onSelected={onSelectDomicileSumatraUtara}
                uniqueTestId="domicile-sumatra-utara"
              />
              {isDomicileSumatraUtara && (
                <Controller
                  name={VALIDATION.selectedCitySumatraUtara.name}
                  control={control}
                  rules={VALIDATION.selectedCitySumatraUtara.rule}
                  render={({ field: { value, onChange } }) => (
                    <DropdownField
                      containerStyle={[plaiStyles.borderDefault, plaiStyles.px12, plaiStyles.pt10]}
                      selected={value}
                      labelMap={{
                        title: t('Kota'),
                        placeholder: t('Pilih Kota'),
                      }}
                      keyMap={{
                        value: 'zipcode',
                        label: 'key',
                        search: 'key',
                      }}
                      search={{
                        isOnChangeSearch: true,
                      }}
                      data={sumateraUtaraCity}
                      onSelected={(item) => onChangeSumatraUtaraCity(item, onChange)}
                      id="sumatra-utara-city-list"
                    />
                  )}
                />
              )}
            </>
          }
        />
      </View>

      <EposPMKModal isSharia={true} isShow={isShowPMKModal} onPressModal={() => setIsShowPMKModal(false)} />

      <EposFooter
        position={3}
        leftButton={{
          text: params?.sqsState ? 'Batalkan' : undefined,
          onPress: onBack,
        }}
        rightButton={rightButtonConfig}
      />
    </PruScreen>
  );
};