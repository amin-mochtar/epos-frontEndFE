import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import { EposFooter, EposHeader, NumberTitle, OptionCard, SectionTitle, TOptionalCardData } from '../../../components';
import {
  DropdownField,
  InputField,
  onChangeNumber,
  plaiStyles,
  sanitizedText,
  TextDecoration,
} from 'plai_common_frontend';
import { CHANNEL, FUND, statement, ISPAJData, ISQSDetail, } from '../../../utilities';
import { Button } from 'common_ui_components/app/components-ui';
import { TFormSPAJTopup, defaultFormSPAJTopup } from './spaj-topup.type';
import { ValidationForm, defaultOptionalData, productType } from '../../../utilities/common-function';
import { useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import i18n from 'i18next';

const validationTopupAmount = (value: string) => {
  //eslint-disable-next-line
  const cleanValue = value?.replace(/[.\.]/g, '');
  const numericValue = parseFloat(cleanValue);
  if (numericValue % 1000 !== 0) {
    return i18n.t('Epos:max_multiple');
  }
  if (numericValue < 1000000) {
    return i18n.t('Epos:min_one_million');
  }
};

const validationPersentace = (value: number) => {
  return value % 5 === 0 || 'Alokasi persentase dana yang anda input harus kelipatan 5';
};

export const SPAJTopupScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu } = useEposRealm();
  const { proposalId, spajId, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const defaultTopup = RSPAJData?.topup ? JSON.parse(RSPAJData.topup!) : null;
  const productRecommendation = RSQSData?.product;
  const [additionalTopup, setadditionalTopup] = useState<TOptionalCardData>(
    defaultTopup ? defaultTopup?.additionalTopup : defaultOptionalData,
  );
  const [isMultiple, setIsMultiple] = useState(false);
  const [isTopupMin, setIsTopupMin] = useState(false);

  const { isTraditional, isProductPIA, fundList, calculatorTopup } = useMemo(() => {
    const _isTraditional = productType(RSQSData?.product?.key!) == 'TRD';
    return {
      isTraditional: _isTraditional,
      isProductPIA: ['U17R', 'U17D'].includes(RSQSData?.product?.key!),
      // @ts-ignore
      fundList: CHANNEL[RSQSData?.product?.key]?.CURRENCY?.FUND?.map((item) => (!_isTraditional ? FUND[item] : [])),
      calculatorTopup: RSQSData?.calculatorTopup ? JSON.parse(RSQSData?.calculatorTopup) : [],

    };
  }, []);

  const resultFundList = useMemo(() => fundList?.map((value: any) => {
    return { label: value.descriptionInd, key: value.code };
  }), [fundList]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<TFormSPAJTopup>({
    defaultValues: useMemo(() => {
      let result = defaultFormSPAJTopup;
      if (RSPAJData != null && RSPAJData.topup) {
        result = defaultTopup;
      }
      return result as TFormSPAJTopup;
    }, []),
  });

  const label = useMemo(() => {
    return {
      spaj: RSQSData?.policyType == 'sharia' ? 'SPAJ SYARIAH' : 'SPAJ',
    };
  }, []);

  const { fields, append } = useFieldArray({
    name: 'topupGoal',
    control,
  });

  useEffect(() => {
    if (isTraditional) {
      setValue('additionalTopup', 'N');
      setadditionalTopup({ key: 'N', label: i18n.t('Epos:no') });
    } else {
      if (isProductPIA && calculatorTopup.length) {
        setValue('additionalTopup', 'Y');
        setadditionalTopup({ key: 'Y', label: i18n.t('Epos:yes') });
      } else {
        if (!defaultTopup) {
          setValue('additionalTopup', 'N');
          setadditionalTopup({ key: 'N', label: i18n.t('Epos:no') });
        }
      }
    }

    setValue('currency', 'IDR');
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid]);

  useEffect(() => {
    if (additionalTopup?.key === 'Y') {
      if (fields?.length === 0) {
        append({
          invesmentType: '',
          persentace: '0',
        });
      }
    } else if (additionalTopup?.key === 'N') {
      setValue('topup', '');
      setValue('topupGoal', [
        {
          invesmentType: '',
          persentace: '0',
        },
      ]);
      updateSPAJByKey(RSPAJData.spajId,
        {
          key: 'topupPremiumPyor',
          value: '',
        },
      );
    }
  }, [additionalTopup]);


  const TopupGoal = useWatch({ control, name: 'topupGoal' });
  const calculateAccumulatedPercentage = () => {
    return TopupGoal?.reduce((total, item) => total + parseFloat(item.persentace || '0'), 0);
  };

  const AddItem = () => {
    if (TopupGoal?.length < 10) {
      const currentItems = getValues('topupGoal');
      setValue('topupGoal', [
        ...currentItems,
        {
          invesmentType: '',
          persentace: '0',
        },
      ]);
    }
  };

  const removeItem = (index: number) => {
    const currentItems = getValues('topupGoal');
    currentItems.splice(index, 1);
    setValue('topupGoal', [...currentItems]);
  };


  const onBack = () => {
    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.SPAJ_DATA_COMPLETENESS,
      });
    }

    if (RSPAJData?.topup) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_TOPUP, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_TOPUP, {
          key: 'status',
          value: false,
        });
      }
    }
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    return true;
  };

  const onSave = (data: TFormSPAJTopup) => {
    updateSPAJByKey(RSPAJData.spajId,
      {
        key: 'topup',
        value: JSON.stringify(data)
      },
    );
  };

  const onSubmit: SubmitHandler<TFormSPAJTopup> = async (data) => {
    const totalPercentage = await calculateAccumulatedPercentage();
    const nextRoutes =
      additionalTopup?.key === 'N' ? EposRoutes.SPAJ_BENEFICIARY_CANDIDATE : EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER;
    if (isTraditional || additionalTopup?.key === 'N' || (additionalTopup?.key === 'Y' && totalPercentage === 100)) {
      await onSave(data);
      await updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: nextRoutes,
      });
      await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_TOPUP, {
        key: 'status',
        value: true,
      });
      navigation.dispatch(StackActions.replace(nextRoutes));
    }
  };


  const totalAccumulate = calculateAccumulatedPercentage();
  const isAccumulate = totalAccumulate > 100 || totalAccumulate < 100;

  const validateMultiple = (value: string) => {
    const cleanValue = value?.replace(/[.\.]/g, ''); //eslint-disable-line
    const numericValue = parseFloat(cleanValue);
    setIsMultiple(numericValue % 1000 !== 0);
    setIsTopupMin(numericValue < 1000000);
  };


  const listFunds = (index: number) => {

    const topupGoal = [...getValues('topupGoal')]
    const selectedKeys = topupGoal.map((item) => item.invesmentType.key)

    return resultFundList.map((item) => {
      const alareadySelected = selectedKeys.includes(item.key) && selectedKeys[index] !== item.key

      return {
        ...item,
        disabled: alareadySelected
      }
    })
  }


  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          <NumberTitle number="4" text={`1/2 ${t('Epos:topup')}`} />
          <ScrollView>
            <Text style={plaiStyles.fontHeaderTitle}>
              <Trans
                i18nKey='Epos:topup'
                components={{
                  i: <Text style={[plaiStyles.fontItalic]} />
                }}
              />
            </Text>
            <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
              <Trans
                i18nKey='Epos:input_topup_if_you_want'
                components={{
                  i: <Text style={[plaiStyles.fontItalic]} />
                }}
              />
            </Text>
            <SectionTitle text={t('Epos:topup_fund_addition')} />
            <Controller
              name={'additionalTopup'}
              control={control}
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    required={true}
                    label={`Apakah Anda ingin mengajukan penambahan dana (<i>Top-Up</i>) untuk SPAJ${RSQSData?.policyType === "sharia" ? " SYARIAH " : ""} elektronik ini?`}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={statement}
                    onDisabled={(item: TCommonOptionalData) => isProductPIA ? calculatorTopup.length > 1 && item.key === 'N' : isTraditional}
                    selected={value}
                    onSelected={(value) => {
                      onChange(value);
                      setadditionalTopup(value);
                    }}
                    error={errors?.additionalTopup}
                    translation={true}
                    uniqueTestId='fill-topup-amendment'
                  />
                </>
              )}
            />

            {isTraditional && (<View
              style={[
                plaiStyles.mt32,
                plaiStyles.bgOrange,
                plaiStyles.pt8,
                plaiStyles.pb8,
                plaiStyles.br4,
              ]}
            >
              <Text style={[plaiStyles.ml10, plaiStyles.fontYellow, plaiStyles.font12]}>
                Penambahan <Text style={[plaiStyles.fontItalic]}>Top-up</Text> hanya berlaku pada Produk Unit Link.
              </Text>
            </View>)}

            {additionalTopup?.key === 'Y' && (
              <>
                <SectionTitle text={t('Epos:topup_amount')} />
                <Controller
                  name={'currency'}
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:currency')}
                      placeholder={t('Epos:enter_currency')}
                      value={value}
                      setValue={onChange}
                      error={errors?.currency}
                      editable={false}
                      id="input-currency"
                    />
                  )}
                />
                <Controller
                  name={'topup'}
                  control={control}
                  rules={ValidationForm({ isRequired: true, validate: validationTopupAmount })}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <InputField
                        label={t('Epos:topup_amount_label')}
                        placeholder={'0'}
                        value={value}
                        setValue={(value) => {
                          onChangeNumber(value, onChange);
                          validateMultiple(value);
                        }}
                        keyboardType="phone-pad"
                        maxLength={16}
                        id="input-topup-amount"
                      />
                      {isMultiple && (
                        <View
                          style={[
                            plaiStyles.bgBtnRedLight,
                            plaiStyles.mt8,
                            plaiStyles.pt8,
                            plaiStyles.pb8,
                            plaiStyles.br4,
                          ]}
                        >
                          <Text style={[plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16, plaiStyles.ml8]}>
                            <TextDecoration label={t('Epos:max_multiple')} />
                          </Text>
                        </View>
                      )}

                      {isTopupMin && (
                        <View
                          style={[
                            plaiStyles.bgBtnRedLight,
                            plaiStyles.mt8,
                            plaiStyles.pt8,
                            plaiStyles.pb8,
                            plaiStyles.br4,
                          ]}
                        >
                          <Text style={[plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16, plaiStyles.ml8]}>
                            <TextDecoration label={t('Epos:min_one_million')} />
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                />
                <SectionTitle text={t('Epos:topup_purpose_fund_allocation')} />

                <View
                  style={[
                    plaiStyles.flex,
                    plaiStyles.row,
                    plaiStyles.justifyBetween,
                    plaiStyles.mt24,
                    plaiStyles.mb16,
                    plaiStyles.bgGreyB8,
                    plaiStyles.pt8,
                    plaiStyles.pb8,
                    plaiStyles.br4,
                  ]}
                >
                  <Text style={[plaiStyles.ml10]}>Total Persentase</Text>
                  <Text style={[plaiStyles.mr10, plaiStyles.fontBold]}>{totalAccumulate}%</Text>
                </View>

                {isAccumulate && (
                  <View
                    style={[
                      plaiStyles.justifyBetween,
                      plaiStyles.mb24,
                      plaiStyles.bgOrange,
                      plaiStyles.pt8,
                      plaiStyles.pb8,
                      plaiStyles.br4,
                    ]}
                  >
                    <Text style={[plaiStyles.ml10, plaiStyles.fontYellow, plaiStyles.font12]}>
                      Total persentase alokasi dana harus 100%
                    </Text>
                  </View>
                )}

                {fields.map((field: any, index: number) => {
                  return (
                    <View key={field.id}>
                      <Controller
                        name={`topupGoal.${index}.invesmentType`}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field: { onChange, value } }) => (
                          <DropdownField
                            labelMap={{
                              title: t('Epos:select_invesment_fund_type'),
                              placeholder: t('Epos:select_invesment_fund_type'),
                            }}
                            data={listFunds(index)}
                            selected={value}
                            onSelected={onChange}
                            // onPressClose={onClose}
                            error={errors?.topupGoal?.[index]?.invesmentType}
                            id={`dropdown-topup-${index}-invesmentType`}
                          />
                        )}
                      />

                      <Controller
                        name={`topupGoal.${index}.persentace`}
                        control={control}
                        rules={ValidationForm({ isRequired: true, validate: validationPersentace })}
                        render={({ field: { onChange, value } }) => (
                          <InputField
                            label={t('Epos:percentage')}
                            placeholder={t('Epos:enter_percentage')}
                            value={value}
                            setValue={(item) => {
                              onChange(sanitizedText(item));
                            }}
                            maxLength={3}
                            keyboardType="phone-pad"
                            error={errors?.topupGoal?.[index]?.persentace}
                            id={`input-topupGoal-${index}-persentance`}
                          />
                        )}
                      />

                      {fields.length > 1 && (
                        <Button
                          style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                          textStyle={plaiStyles.fontGrey33}
                          text={t('Calculator:remove')}
                          onPress={() => {
                            removeItem(index);
                          }}
                        />
                      )}
                    </View>
                  );
                })}
                <Button
                  style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
                  textStyle={plaiStyles.fontRed}
                  text={t('Epos:add_investment_funds')}
                  onPress={AddItem}
                />
              </>
            )}

          </ScrollView>
        </View>
        <EposFooter
          position={6}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: handleSubmit(onSubmit),
          }}
        />
      </>
    </PruScreen>
  );
};
