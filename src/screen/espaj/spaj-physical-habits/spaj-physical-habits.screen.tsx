import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { InputField, plaiStyles } from 'plai_common_frontend';
import { EposFooter, EposHeader, NumberTitle, OptionFiled, SectionTitle } from '../../../components';
import { EposRoutes } from '../../../navigation';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TFormPhysicalHabits } from './spaj-physical-habits.type';
import { VALIDATION } from './validation/validation';
import {
  averageTotalAlcoholList,
  durationtotalAlcoholList,
  questions,
  totalAlcoholconsumedList,
} from '../../../utilities';

export const SPAJPhysicalHabitsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onBack = () => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_LIFE_STYLE));
    return null;
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormPhysicalHabits>({});

  const onSubmit: SubmitHandler<TFormPhysicalHabits> = async (data) => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <NumberTitle number="2" text={`2/4 ${t('Epos:health_data')}`} />
          <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:physical_habits')}</Text>
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
            {t('Epos:describe_physical_habits')}
          </Text>

          <ScrollView>
            <SectionTitle text={t('Epos:physical_data')} />
            <Controller
              name={VALIDATION.height.name}
              control={control}
              rules={VALIDATION.height.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:height_insured_candidate')}
                  placeholder={t('Epos:enter_height')}
                  value={value}
                  setValue={onChange}
                  error={errors.height}
                />
              )}
            />
            <Controller
              name={VALIDATION.weight.name}
              control={control}
              rules={VALIDATION.weight.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:weight_insured_candidate')}
                  placeholder={t('Epos:enter_weight')}
                  value={value}
                  setValue={onChange}
                  error={errors.weight}
                />
              )}
            />
            <SectionTitle text={t('Epos:smoking_status')} />
            <Controller
              name={VALIDATION.smokerStatus.name}
              control={control}
              rules={VALIDATION.smokerStatus.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:last_smoked')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={questions}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.smokerStatus}
                  />
                </>
              )}
            />
            <Controller
              name={VALIDATION.averageCigarettes.name}
              control={control}
              rules={VALIDATION.averageCigarettes.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:average_number_cigarettes')}
                  placeholder={t('Epos:enter_cigarettes')}
                  value={value}
                  setValue={onChange}
                  error={errors.averageCigarettes}
                />
              )}
            />
            <SectionTitle text={t('Epos:alcohol')} />

            <Controller
              name={VALIDATION.durationtotalAlcohol.name}
              control={control}
              rules={VALIDATION.durationtotalAlcohol.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:last_consume_five_or_more_alcohol')}
                    theme="border"
                    data={durationtotalAlcoholList}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.durationtotalAlcohol}
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.averageTotalAlcohol.name}
              control={control}
              rules={VALIDATION.averageTotalAlcohol.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:how_many_days_drink_alcoholic')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="simpleborder"
                    data={averageTotalAlcoholList}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.averageTotalAlcohol}
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.totalAlcoholconsumed.name}
              control={control}
              rules={VALIDATION.totalAlcoholconsumed.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:how_many_drink_alcoholic')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="simpleborder"
                    data={totalAlcoholconsumedList}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.totalAlcoholconsumed}
                  />
                </>
              )}
            />

            <SectionTitle text={t('Epos:medicines')} />

            <Controller
              name={VALIDATION.questionOfMedicine.name}
              control={control}
              rules={VALIDATION.questionOfMedicine.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:last_used_medication')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={questions}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.questionOfMedicine}
                  />
                </>
              )}
            />
            <Controller
              name={VALIDATION.medicineName.name}
              control={control}
              rules={VALIDATION.medicineName.rule}
              render={({ field: { onChange, value } }) => (
                <InputField
                  label={t('Epos:medicines_type')}
                  placeholder={t('Epos:enter_medicine')}
                  value={value}
                  setValue={onChange}
                  error={errors.medicineName}
                />
              )}
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
            onPress: () => navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_FAMILY_BACKGROUND)),
          }}
        />
      </>
    </PruScreen>
  );
};
