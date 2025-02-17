import { View, Text, ScrollView } from 'react-native';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { PruColor, PruScreen } from 'common_ui_components';
import { EposFooter, EposHeader, NumberTitle, OptionCard, SectionTitle, TOptionalCardData } from '../../../components';
import {
  DropdownField,
  InputField,
  plaiStyles,
  onChangeNumber,
  sanitizedText,
  ModalContainer,
  TRadioData,
  sanitizedLetterText,
  ModalInformation,
} from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';
import { SPAJCurrencyList, WR_SHARIA_CONVENT, benefitInsuranceList, checkMainParticipant, questions, statement } from '../../../utilities';
import { Button } from 'common_ui_components/app/components-ui';
import {
  TFormAdditionalInsuredActive,
  defaultCommonValue,
  defaultFormAdditionalInsuredActive,
} from './spaj-additional-insured-active.type';
import { ValidationForm } from '../../../utilities/common-function';
import { useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/reducer';
import { EposState } from '../../../redux';
import { TFormPrimaryInsuredActive } from '../spaj-primary-insured-active/spaj-primary-insured-active-type';
import { defaultOptionalData } from 'epos_frontend/src/utilities';
import { ISPAJData, ISQSDetail } from 'epos_frontend/src/database';

export const SPAJAdditionalInsuredActiveScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { onUpdateSPAJ, updateSummaryByKey, updateSPAJStatusSubMenu } = useEposRealm();
  const { proposalId, selectedSQSId, spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const [currency, setcurrency] = useState<TOptionalCardData>({ title: 'IDR', key: 'IDR' });
  const defaultAdditionalActivePolicy = RSPAJData?.additionalActivePolicy
    ? JSON.parse(RSPAJData.additionalActivePolicy!)
    : null;
  const [otherInsurance, setotherInsurance] = useState<TOptionalCardData>(defaultAdditionalActivePolicy ? defaultAdditionalActivePolicy?.haveOtherInsurance : defaultOptionalData);
  const [beneficiaryInsurance, setbeneficiaryInsurance] = useState<TRadioData>({ label: '', key: '' });
  const [isMaxItemsModal, setisMaxItemsModal] = useState(false);
  const mainParticipant = useMemo(() => checkMainParticipant(RSQSData?.product?.key!, RSQSData?.policyType!), []);
  const insured = useMemo(() => checkMainParticipant(RSQSData?.product?.key!, RSQSData?.policyType!, true), []);
  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const maxItems = 3;

  const isPruCerah = ['E1O', 'E1OP'].includes(RSQSData?.product?.key!);

  const SPAJDataInfo = RSPAJData?.DataCompleteness?.filter((item) => item.categoryKey == 'Data Informasi');

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<TFormAdditionalInsuredActive>({
    defaultValues: useMemo(() => {
      let result = defaultFormAdditionalInsuredActive;

      if (RSPAJData?.additionalActivePolicy) {
        result = defaultAdditionalActivePolicy;
      }

      return result as any;
    }, []),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'insuredDetail',
    control,
  });

  useEffect(() => {
    if (otherInsurance?.key === 'Y') {

      if (fields.length === 0) {
        append({
          insuredBenefit: defaultCommonValue, 
          otherInsuranceBenefite: '',
          company: '',
          currency: '',
          sumInsured: '',
          substandard: '',
        });
      }
    }

    if (otherInsurance?.key === 'N') {
      setValue('insuredDetail', [
        {
          insuredBenefit: defaultCommonValue,
          otherInsuranceBenefite: '',
          company: '',
          currency: '',
          sumInsured: '',
          substandard: '',
        },
      ]);
    }
  }, [otherInsurance]);

  const toggleMaxItemsModal = useCallback(() => {
    setisMaxItemsModal(!isMaxItemsModal);
  }, [isMaxItemsModal]);

  const onAddItem = () => {
    if (fields?.length < maxItems) {
      append({
        insuredBenefit: defaultCommonValue,
        otherInsuranceBenefite: '',
        company: '',
        currency: '',
        sumInsured: '',
        substandard: '',
      });
    } else {
      toggleMaxItemsModal();
    }
  };

  const onSave = (data: TFormPrimaryInsuredActive) => {
    const _spajData = {
      ...RSPAJData?.toJSON(),
      additionalActivePolicy: JSON.stringify(data),
    } as ISPAJData;
    onUpdateSPAJ(_spajData);
  };

  const onBack = () => {
    let _backRoute = EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE;
    if (RSQSData?.additionalLifeAssuredSelf == 'other') {
      _backRoute = EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE;
    }

    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: _backRoute,
      });
    }

    if (RSPAJData?.additionalActivePolicy) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE, { key: 'status', value: true });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE, { key: 'status', value: false });
      }
    }

    navigation.dispatch(StackActions.replace(_backRoute));
    return null;
  };

  const onSubmit: SubmitHandler<TFormAdditionalInsuredActive> = async (data) => {
    onSave(data);

    let _nextRoute = EposRoutes.SPAJ_LIFE_STYLE;

    if (RSQSData?.additionalLifeAssuredSelf == 'self') {
      _nextRoute = EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE;
    }

    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: _nextRoute,
    });

    await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE, {
      key: 'status',
      value: true,
    });
    navigation.dispatch(StackActions.replace(_nextRoute));
  };

  const HeaderText = () => {
    let _page = 2;
    let _text = SPAJDataInfo?.length ? SPAJDataInfo[1].name : '-';

    if (isPruCerah) {
      if (RSQSData?.additionalLifeAssuredSelf == 'other') {
        _page = 5;
        _text = SPAJDataInfo?.length ? SPAJDataInfo[4].name : '-';
      } else {
        _page = 3;
        _text = SPAJDataInfo?.length ? SPAJDataInfo[2].name : '-';
      }
    }

    return (
      <>
        <NumberTitle number="2" text={`${_page}/${SPAJDataInfo?.length} ${t('Epos:active_policy')}`} />
        <Text style={plaiStyles.fontHeaderTitle}>{_text}</Text>
      </>
    );
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          <HeaderText />
          <ScrollView>
            <Controller
              name={'haveOtherInsurance'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    label={t('Epos:have_other_insurance_in_policy_pru', { mainParticipant, insured, companyName: wording.companyName })}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={questions}
                    selected={value}
                    onSelected={(value) => {
                      onChange(value);
                      setotherInsurance(value);
                    }}
                    required={false}
                    uniqueTestId='have-other-insurance'
                  />
                </>
              )}
            />
            {otherInsurance?.key === 'Y' && (
              <>
                <SectionTitle style={[plaiStyles.mt24]} text={t('Epos:insurance_details')} />
                {fields.map((item: any, index: number) => {
                  return (
                    <View key={item.id}>
                      <Controller
                        name={`insuredDetail.${index}.insuredBenefit`}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <DropdownField
                            labelMap={{
                              title: t('Epos:benefits_insurance'),
                              placeholder: t('Epos:select_benefits'),
                            }}
                            data={benefitInsuranceList}
                            selected={value}
                            onSelected={(value) => {
                              setbeneficiaryInsurance(value);
                              onChange(value);
                            }}
                            error={errors?.insuredDetail?.[index]?.insuredBenefit}
                            id="dropdown-benefit-insurance"
                          />
                        )}
                      />

                      {beneficiaryInsurance?.key === 'O' && (
                        <Controller
                          name={`insuredDetail.${index}.otherInsuranceBenefite`}
                          control={control}
                          rules={ValidationForm({ isRequired: true })}
                          render={({ field: { onChange, value } }) => (
                            <InputField
                              label={t('Epos:other_benefite')}
                              placeholder={t('Epos:other')}
                              value={value}
                              setValue={(val) => onChange(sanitizedLetterText(val))}
                              error={errors?.insuredDetail?.[index]?.otherInsuranceBenefite}
                              id="input-other-insurance-benefit"
                            />
                          )}
                        />
                      )}

                      <Controller
                        name={`insuredDetail.${index}.company`}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:company')}
                            placeholder={t('Epos:enter_company_name')}
                            value={value}
                            setValue={onChange}
                            error={errors?.insuredDetail?.[index]?.company}
                            maxLength={60}
                            id="input-insured-company"
                          />
                        )}
                      />

                      <Controller
                        name={`insuredDetail.${index}.currency`}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        defaultValue={'IDR'}
                        render={({ field: { onChange, value } }) => (
                          <OptionCard
                            label={t('Epos:currency')}
                            required={true}
                            style={[plaiStyles.flex, plaiStyles.row]}
                            insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                            theme="border"
                            data={SPAJCurrencyList}
                            selected={value}
                            onSelected={(value) => {
                              onChange(value);
                              setcurrency(value);
                            }}
                            error={errors?.insuredDetail?.[index]?.currency}
                            uniqueTestId='insured-currency'
                          />
                        )}
                      />

                      <Controller
                        name={`insuredDetail.${index}.sumInsured`}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:sum_insured')}
                            placeholder={t('Epos:enter_sum_insured')}
                            value={value}
                            setValue={(value) => {
                              if (currency?.title === 'USD') {
                                onChange(sanitizedText(value));
                              } else {
                                onChangeNumber(value, onChange);
                              }
                            }}
                            keyboardType="phone-pad"
                            leftItem={<Text style={[plaiStyles.fontGrey66, plaiStyles.font16]}>{currency?.title}</Text>}
                            error={errors?.insuredDetail?.[index]?.sumInsured}
                            id="input-sum-insured"
                          />
                        )}
                      />

                      <Controller
                        name={`insuredDetail.${index}.substandard`}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <OptionCard
                            label={t('Epos:substandart')}
                            style={[plaiStyles.flex, plaiStyles.row]}
                            insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                            theme="border"
                            data={statement}
                            selected={value}
                            onSelected={onChange}
                            error={errors?.insuredDetail?.[index]?.substandard}
                            translation={true}
                            uniqueTestId='insured-substandard'
                          />
                        )}
                      />

                      {fields.length > 1 && (
                        <Button
                          style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                          textStyle={plaiStyles.fontGrey33}
                          text={t('Calculator:remove')}
                          onPress={() => remove(index)}
                        />
                      )}
                    </View>
                  );
                })}
                <Button
                  style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
                  textStyle={plaiStyles.fontRed}
                  text={t('Epos:add_policy')}
                  onPress={onAddItem}
                />
              </>
            )}

            <ModalInformation
              visible={isMaxItemsModal}
              title={t('Epos:info')}
              desc={t('Epos:maxpolicies')}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => {
                  toggleMaxItemsModal();
                },
              }}
            />
          </ScrollView>
        </View>
        <EposFooter
          position={6}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            // onPress: () => navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS)),
            onPress: handleSubmit(onSubmit),
          }}
        />
      </>
    </PruScreen>
  );
};

