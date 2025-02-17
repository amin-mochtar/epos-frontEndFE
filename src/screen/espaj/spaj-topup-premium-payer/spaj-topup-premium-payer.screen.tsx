import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  CheckboxGroup,
  DropdownField,
  InputField,
  TCheckboxData,
  plaiStyles,
  sanitizedLetterText,
  setMultipleSelect,
  OCCUPATION_FULL_DATA,
  SALARY_RANGE_DATA,
  TCommonConstantData,
  onChangeNameFormating
} from 'plai_common_frontend';
import { EposFooter, EposHeader, NumberTitle, OptionCard, SectionTitle, TOptionalCardData } from '../../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { Trans, useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  OCCUPATION_SIMPLE,
  WR_SHARIA_CONVENT,
  questions,
  relationshipPayerList,
  sourceIncomePerYear,
  topupGoalList,
  topupPremiPayerList,
  ISPAJData,
  ISQSDetail,
  validateFormatCompanyName,
} from '../../../utilities';
import { TFormTopupPremiPayer, defaultFormTopupPremiumPayer } from './spaj-topup-premium-payer.type';
import { ValidationForm, defaultOptionalData, sanitizeTextLetterAndNumber } from '../../../utilities/common-function';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';

export type TConditionMapping = {
  condition: any;
  fields: string[];
  result?: { [key: string]: string; }[] | string;
};

export const SPAJTopupPremiumPayerScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu } = useEposRealm();
  const { proposalId, spajId, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const defaultTopupPremiPayor = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData.topupPremiumPyor!) : null;
  const [topupPremiPayer, setTopupPremiPayer] = useState<TOptionalCardData>(
    defaultTopupPremiPayor ? defaultTopupPremiPayor?.topupPremiPayer : defaultOptionalData,
  );
  const [payorRelationship, setPayorRelationship] = useState<TOptionalCardData>(
    defaultTopupPremiPayor ? defaultTopupPremiPayor?.payorRelationship : defaultOptionalData,
  );
  const [nonRoutineIncome, setnonRoutineIncome] = useState<TOptionalCardData>(
    defaultTopupPremiPayor ? defaultTopupPremiPayor?.anyOtherIncome : defaultOptionalData,
  );

  const [nonRoutineSourceIncome, setNonRoutineSourceIncome] = useState(
    defaultTopupPremiPayor ? defaultTopupPremiPayor?.nonRoutineSourceIncome : [],
  );

  const [occupation, setOccupation] = useState(defaultTopupPremiPayor ? defaultTopupPremiPayor?.payorJob : '');
  const [goals, setGoals] = useState(defaultTopupPremiPayor ? defaultTopupPremiPayor?.goals : []);
  const [payorSourceIncome, setpayorSourceIncome] = useState(
    defaultTopupPremiPayor ? defaultTopupPremiPayor?.payorSourceIncome : [],
  );

  const occupationCode = occupation?.code;
  const checkOccupation =
    typeof occupationCode === 'string' && ['UNEM', 'NSTN', 'STDN', 'RETI', 'HSWF'].includes(occupationCode);
  const checkOtherGoals = goals?.map((value: TCheckboxData) => value.key).includes('O');
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const policyHolderIsPremiumPayor = RSQSData ? RSQSData?.policyHolderIsPremiumPayor : '';
  const prospectivePremiumPayor = RSQSData ? RSQSData?.prospectivePremiumPayor : '';

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<TFormTopupPremiPayer>({
    defaultValues: useMemo(() => {
      let result = defaultFormTopupPremiumPayer;
      if (RSPAJData && RSPAJData?.topupPremiumPyor) {
        result = defaultTopupPremiPayor;
      }
      return result as TFormTopupPremiPayer;
    }, []),
  });

  const label = useMemo(() => {
    return {
      premi: RSQSData?.policyType == 'sharia' ? t('Epos:contribution') : t('Epos:premi'),
      _topupPremiPayerList: topupPremiPayerList(RSQSData?.policyType == 'sharia'),
    };
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid]);

  // condition for resetting previously filled fields
  // ini bisa di refactor useEffect nya di buat terpisah aja, jadi 1 useEffect buat handle 1 jenis, misalkan buat goals,
  // jadi dependency nya cuman goals doang, kalau semua di masukin malah jadi berat soalnya setiap dependency yang harus ga ke trigger tapi tetep di olah di useEffect

  useEffect(() => {
    const conditionsMapping: TConditionMapping[] = [
      { condition: nonRoutineIncome?.key === 'N', fields: ['nonRoutineIncome', 'nonRoutineSourceIncome'] },
      {
        condition: checkOccupation,
        fields: ['payorCompanyName'],
      },
      {
        condition: !checkOtherGoals,
        fields: ['otherGoals'],
      },
      {
        condition: payorSourceIncome?.find((item: TOptionalCardData) => item.key == 'investment') == undefined,
        fields: ['invesmentSourceIncome'],
      },
      {
        condition: goals?.find((item: TOptionalCardData) => item.key == 'I') == undefined,
        fields: ['additionalInvestmentGoals'],
      },
      {
        condition: payorSourceIncome?.find((item: TOptionalCardData) => item.key == 'personalBusiness') == undefined,
        fields: ['personalBusinessSourceIncome'],
      },
      {
        condition: payorSourceIncome?.find((item: TOptionalCardData) => item.key == 'other') == undefined,
        fields: ['otherSourceIncome'],
      },
      {
        condition: goals?.find((item: TOptionalCardData) => item.key == 'O') == undefined,
        fields: ['additionalOtherGoals'],
      },
      {
        condition: nonRoutineSourceIncome?.find((item: TOptionalCardData) => item.key == 'I') == undefined,
        fields: ['additionalInvestmentNonRoutineIncome'],
      },
      {
        condition: nonRoutineSourceIncome?.find((item: TOptionalCardData) => item.key == 'O') == undefined,
        fields: ['aditionalOtherNonRoutineIncome'],
      },
      {
        condition: topupPremiPayer?.key !== 'O',
        fields: [
          'otherGoals',
          'payorRelationship',
          'payorName',
          'payorJob',
          'payorCompanyName',
          'payorIncome',
          'payorSourceIncome',
          'otherSourceIncome',
        ],
      },
    ];

    conditionsMapping?.forEach(({ condition, fields, result }: TConditionMapping) => {
      if (condition) {
        fields.forEach((field: any) => setValue(field, result ? result : typeof defaultFormTopupPremiumPayer[field] == 'string' ? '' : []));
      }
    });

    conditionsMapping;
  }, [nonRoutineIncome, checkOccupation, checkOtherGoals, payorSourceIncome, topupPremiPayer, goals, nonRoutineSourceIncome]);

  const onBack = () => {
    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.SPAJ_TOPUP,
      });
    }

    if (RSPAJData?.topupPremiumPyor) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER, {
          key: 'status',
          value: false,
        });
      }
    }

    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_TOPUP));
    return true;
  };


  //check data by policyholder & relationship of premium payers
  const filteredData = label._topupPremiPayerList.filter((currentValue) => {
    if (lifeAssuredSelf === 'self') {
      if (policyHolderIsPremiumPayor === 'Y') {
        return currentValue.key !== 'CP' && currentValue.key !== 'PK';
      } else {
        return prospectivePremiumPayor === 'Other' && currentValue.key !== 'CP';
      }
    } else {
      if (policyHolderIsPremiumPayor === 'Y' || prospectivePremiumPayor === 'TertanggungUtama') {
        return currentValue.key !== 'PK';
      } else {
        return prospectivePremiumPayor === 'Other';
      }
    }
  });

  const relationShipPayerListFiltered = ['U12', 'U13'].includes(RSQSData?.product?.key || '') ?
    relationshipPayerList.filter(item => item.key !== 'B') : relationshipPayerList

  const onDisableSourceIncome = (item: TCommonConstantData | undefined) => {
    const income = watch('payorIncome')
    const source = watch('payorSourceIncome')
    return useMemo(() => {
      if (income?.key !== '0') {
        if (source.length && source[0].key === 'noIncome') setValue('payorSourceIncome', []);
        return item?.key === 'noIncome';
      } else if (income?.key == '0') {
        setValue('payorSourceIncome', [
          {
            key: 'noIncome',
            label: 'Tidak Berpenghasilan',
          },
        ]);
        return true;
      } else {
        return false
      }
    }, [watch('payorIncome')]);
  };

  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);

  const onSave = (data: TFormTopupPremiPayer) => {
    updateSPAJByKey(RSPAJData.spajId,
      {
        key: 'topupPremiumPyor',
        value: JSON.stringify(data)
      });
  };

  const onContinue: SubmitHandler<TFormTopupPremiPayer> = async (data) => {
    await onSave(data);
    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.SPAJ_BENEFICIARY_CANDIDATE,
    });
    await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER, {
      key: 'status',
      value: true,
    });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_BENEFICIARY_CANDIDATE));
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          <NumberTitle number="4" text={`2/2 ${t('Epos:topup')}`} />
          <ScrollView>
            <Text style={plaiStyles.fontHeaderTitle}>
              <Trans
                i18nKey={t('Epos:topup_premi_payer', { premi: label.premi })}
                components={{
                  i: <Text style={[plaiStyles.fontItalic, plaiStyles.fontBold]} />
                }}
              />
            </Text>
            <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
              <Trans
                i18nKey={t('Epos:input_data_related_topup', { premi: wording.premiContribution })}
                components={{
                  i: <Text style={[plaiStyles.fontItalic]} />
                }}
              />
            </Text>
            <SectionTitle text={t('Epos:relationship')} />
            <Controller
              name={'topupPremiPayer'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    required={true}
                    theme="border"
                    label={t('Epos:single_topup_premium_payer', { premi: wording.premiContribution })}
                    data={filteredData}
                    selected={value}
                    onSelected={(value) => {
                      setTopupPremiPayer(value);
                      onChange(value);
                    }}
                    error={errors?.topupPremiPayer}
                    translation={true}
                    uniqueTestId='topup-premi-payer'
                  />
                </>
              )}
            />

            {topupPremiPayer?.key === 'O' && (
              <>
                {checkOtherGoals && (
                  <Controller
                    name={'otherGoals'}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:other')}
                        placeholder={t('Epos:enter_other')}
                        value={value}
                        setValue={(item) => onChange(sanitizedLetterText(item))}
                        error={errors.otherGoals}
                        id="input-other-goal"
                      />
                    )}
                  />
                )}

                <SectionTitle text={t('Epos:data_information')} />

                <Controller
                  name={'payorRelationship'}
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <OptionCard
                        required={true}
                        label={t('Epos:relationship_between_prospective_premium_payers')}
                        theme="border"
                        data={relationShipPayerListFiltered}
                        selected={value}
                        onSelected={(value) => {
                          setPayorRelationship(value);
                          onChange(value);
                        }}
                        error={errors?.payorRelationship}
                        uniqueTestId='payor-relationship'
                      />
                    </>
                  )}
                />

                {payorRelationship?.key === 'o' && (
                  <Text
                    style={[
                      plaiStyles.mt8,
                      plaiStyles.ml4,
                      plaiStyles.fontYellow,
                      plaiStyles.font12,
                      plaiStyles.lineH16,
                    ]}
                  >
                    {t('Epos:please_explain_in_amendment')}
                  </Text>
                )}

                <Controller
                  name={'payorName'}
                  control={control}
                  rules={ValidationForm({ isRequired: true, maxLength: 60 })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:fullname')}
                      placeholder={t('Epos:enter_customer_name')}
                      maxLength={60}
                      value={value}
                      setValue={(item) => onChange(onChangeNameFormating(item))}
                      error={errors.payorName}
                      id="input-payor-name"
                    />
                  )}
                />

                <SectionTitle text={t('Epos:job_information')} />
                <Controller
                  name={'payorJob'}
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:job_type'),
                        placeholder: t('Epos:select_job_type'),
                        group: 'Kelas',
                      }}
                      keyMap={{
                        value: 'code',
                        label: t('Epos:job_type') == 'Job Type' ? 'nameEng' : 'nameInd',
                        group: 'clazz',
                        search: t('Epos:job_type') == 'Job Type' ? 'nameEng' : 'nameInd',
                      }}
                      search={{
                        isOnChangeSearch: true,
                      }}
                      data={OCCUPATION_FULL_DATA}
                      selected={value}
                      onSelected={(value) => {
                        setOccupation(value);
                        onChange(value);
                      }}
                      error={errors.payorJob}
                      id="dropwdown-payor-job"
                    />
                  )}
                />

                <Controller
                  name={'payorCompanyName'}
                  control={control}
                  rules={ValidationForm({ isRequired: checkOccupation ? false : true, validate: validateFormatCompanyName })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:company_name')}
                      placeholder={t('Epos:enter_company_name')}
                      editable={!checkOccupation ? true : false}
                      value={value}
                      setValue={onChange}
                      error={errors?.payorCompanyName}
                      additionalInfo={errors?.payorCompanyName?.message ? '' : t('Epos:company_name_info')}
                      maxLength={60}
                      required={!checkOccupation}
                      id="input-payor-company-name"
                    />
                  )}
                />

                <SectionTitle text={t('Epos:income_information')} />

                <Controller
                  name={'payorIncome'}
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:total_income_per_month'),
                        placeholder: t('Epos:select_total_income'),
                      }}
                      keyMap={{
                        search: 'label',
                      }}
                      data={SALARY_RANGE_DATA}
                      selected={value}
                      onSelected={onChange}
                      error={errors.payorIncome}
                      id="dropwdown-payor-income"
                    />
                  )}
                />

                <Controller
                  name={'payorSourceIncome'}
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <View style={[plaiStyles.mt24]}>
                        <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                          {t('Epos:source_income_fund_per_month')}
                        </Text>
                        <CheckboxGroup
                          data={OCCUPATION_SIMPLE}
                          onSelected={(item) => {
                            setpayorSourceIncome(setMultipleSelect([...value], item, 'key'));
                            onChange(setMultipleSelect([...value], item, 'key'));
                          }}
                          selected={value}
                          insideStyle={[
                            plaiStyles.justifyBetween,
                            plaiStyles.rowReverse,
                            plaiStyles.borderbf0,
                            plaiStyles.py16,
                          ]}
                          onDisabled={(item) => onDisableSourceIncome(item) as boolean}
                        />
                      </View>
                    );
                  }}
                />

                {payorSourceIncome?.map((item: TOptionalCardData) => (
                  <>
                    {item.key === 'investment' && (
                      <Controller
                        name={'invesmentSourceIncome'}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:invesment')}
                            placeholder={t('Epos:enter_invesment')}
                            value={value}
                            setValue={onChange}
                            error={errors.invesmentSourceIncome}
                            id="input-invesment-source-income"
                          />
                        )}
                      />
                    )}

                    {item.key === 'personalBusiness' && (
                      <Controller
                        name={'personalBusinessSourceIncome'}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:personal_business')}
                            placeholder={t('Epos:enter_personal_business')}
                            value={value}
                            setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                            error={errors.personalBusinessSourceIncome}
                            id="input-personal-business-source-income"
                          />
                        )}
                      />
                    )}

                    {item.key === 'other' && (
                      <Controller
                        name={'otherSourceIncome'}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:other')}
                            placeholder={t('Epos:enter_other')}
                            value={value}
                            setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                            error={errors.otherSourceIncome}
                            id="input-other-source-income"
                          />
                        )}
                      />
                    )}
                  </>
                ))}
              </>
            )}

            <Controller
              name={'anyOtherIncome'}
              control={control}
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    label={t('Epos:does_candidate_have_non_recurring_per_year', { premi: label.premi })}
                    required={true}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={questions}
                    selected={value}
                    onSelected={(value) => {
                      setnonRoutineIncome(value);
                      onChange(value);
                    }}
                    error={errors?.anyOtherIncome}
                    translation={true}
                    uniqueTestId="other-incone"
                  />
                </>
              )}
            />

            {nonRoutineIncome?.key == 'Y' && (
              <>
                <Controller
                  name={`nonRoutineIncome`}
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <DropdownField
                      labelMap={{
                        title: t('Epos:nonrution_income_per_year'),
                        placeholder: t('Epos:select_total_income'),
                      }}
                      keyMap={{
                        search: 'label',
                      }}
                      data={SALARY_RANGE_DATA}
                      selected={value}
                      onSelected={onChange}
                      error={errors?.nonRoutineIncome}
                      id="dropdown-non-routine-income"
                    />
                  )}
                />

                <Controller
                  name={`nonRoutineSourceIncome`}
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <View style={[plaiStyles.mt24]}>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                        {t('Epos:source_nonrution_income_year')}
                      </Text>
                      <CheckboxGroup
                        data={sourceIncomePerYear}
                        selected={value?.length > 0 ? value : []}
                        onSelected={(item) => {
                          setNonRoutineSourceIncome(setMultipleSelect([...value], item, 'key'));
                          onChange(setMultipleSelect([...value], item, 'key'))
                        }}
                        insideStyle={[
                          plaiStyles.justifyBetween,
                          plaiStyles.rowReverse,
                          plaiStyles.borderbf0,
                          plaiStyles.py16,
                        ]}
                      />

                      {nonRoutineSourceIncome?.map((item: TOptionalCardData) => (
                        <>
                          {item.key === 'I' && (
                            <Controller
                              name={'additionalInvestmentNonRoutineIncome'}
                              control={control}
                              rules={ValidationForm({ isRequired: true })}
                              render={({ field: { onChange, value } }) => (
                                <InputField
                                  label={t('Epos:invesment')}
                                  placeholder={t('Epos:enter_invesment')}
                                  value={value}
                                  setValue={onChange}
                                  error={errors.additionalInvestmentGoals}
                                  id="input-additional-investment-non-routine-income"
                                />
                              )}
                            />
                          )}

                          {item.key === 'O' && (
                            <Controller
                              name={'aditionalOtherNonRoutineIncome'}
                              control={control}
                              rules={ValidationForm({ isRequired: true })}
                              render={({ field: { onChange, value } }) => (
                                <InputField
                                  label={t('Epos:other')}
                                  placeholder={t('Epos:enter_other')}
                                  value={value}
                                  setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                                  error={errors.additionalOtherGoals}
                                  id="input-additional-other-non-routine-income"
                                />
                              )}
                            />
                          )}
                        </>
                      ))}

                    </View>
                  )}
                />
              </>
            )}

            <SectionTitle text={t('Epos:goals')} />
            <Controller
              name={`goals`}
              control={control}
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { onChange, value } }) => (
                <OptionCard
                  label={t('Epos:purpose_submission_topup')}
                  required={true}
                  data={topupGoalList}
                  type="checkbox"
                  theme="border"
                  selected={value?.length > 0 ? value : []}
                  onSelected={(item) => {
                    setGoals(setMultipleSelect([...value], item, 'key'));
                    onChange(setMultipleSelect([...value], item, 'key'));
                  }}
                  error={errors?.goals}
                  translation={true}
                  uniqueTestId='goal'
                />
              )}
            />

            {goals?.map((item: TOptionalCardData) => (
              <>
                {item.key === 'I' && (
                  <Controller
                    name={'additionalInvestmentGoals'}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:invesment')}
                        placeholder={t('Epos:enter_invesment')}
                        value={value}
                        setValue={onChange}
                        error={errors.additionalInvestmentGoals}
                        id="input-additional-investment-goals"
                      />
                    )}
                  />
                )}

                {item.key === 'O' && (
                  <Controller
                    name={'additionalOtherGoals'}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={t('Epos:other')}
                        placeholder={t('Epos:enter_other')}
                        value={value}
                        setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                        error={errors.additionalOtherGoals}
                        id="input-additional-other-goals"
                      />
                    )}
                  />
                )}
              </>
            ))}
          </ScrollView>
        </View>
        <EposFooter
          position={6}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: handleSubmit(onContinue),
          }}
        />
      </>
    </PruScreen>
  );
};
