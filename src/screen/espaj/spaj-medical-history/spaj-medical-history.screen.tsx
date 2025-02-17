import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { plaiStyles, setMultipleSelect } from 'plai_common_frontend';
import { EposFooter, EposHeader, NumberTitle, OptionFiled, SectionTitle } from '../../../components';
import { useTranslation } from 'react-i18next';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { VALIDATION } from './validation/validation';
import { diseaseTypeList, questions, ISPAJData } from '../../../utilities';
import { useObject } from '../../../database';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';

export type TFormMedicalHistory = {
  questionDisease: string;
  healthConditions: string[];
  diseaseInLastFiveYear: string;
  diseaseType: string[];
};

export const SPAJMedicalHistoryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : null;
  const nextRoute =
    confirmationSQS.premiumPaymentCandidate !== 'N' ? EposRoutes.SPAJ_TOPUP : EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE;
  const onBack = () => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_FAMILY_BACKGROUND));
    return null;
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormMedicalHistory>({
    defaultValues: {
      questionDisease: '',
      healthConditions: [],
      diseaseInLastFiveYear: '',
      diseaseType: [],
    },
  });

  const onSubmit: SubmitHandler<TFormMedicalHistory> = async (data) => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE));
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <NumberTitle number="2" text={`4/4 ${t('Epos:health_data')}`} />
          <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:medical_history')}</Text>
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
            {t('Epos:describe_about__health_istory')}
          </Text>

          <ScrollView>
            <SectionTitle text={t('Epos:medical_history')} />
            <Controller
              name={VALIDATION.questionDisease.name}
              control={control}
              rules={VALIDATION.questionDisease.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:has_the_insured_candidate_ever_had_disease')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={questions}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.questionDisease}
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.healthConditions.name}
              control={control}
              rules={VALIDATION.healthConditions.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:select_health_conditions')}
                    theme="border"
                    type="checkbox"
                    data={diseaseTypeList}
                    selected={value}
                    onSelected={(item) => onChange(setMultipleSelect([...value], item, 'key'))}
                    error={errors?.healthConditions}
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.diseaseInLastFiveYear.name}
              control={control}
              rules={VALIDATION.diseaseInLastFiveYear.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:condition_in_last_five_year')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={questions}
                    selected={value}
                    onSelected={onChange}
                    error={errors?.diseaseInLastFiveYear}
                  />
                </>
              )}
            />

            <Controller
              name={VALIDATION.diseaseType.name}
              control={control}
              rules={VALIDATION.diseaseType.rule}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:select_health_conditions')}
                    theme="border"
                    type="checkbox"
                    data={diseaseTypeList}
                    selected={value}
                    onSelected={(item) => onChange(setMultipleSelect([...value], item, 'key'))}
                    error={errors?.diseaseType}
                  />
                </>
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
            onPress: () => navigation.dispatch(StackActions.replace(nextRoute)),
          }}
        />
      </>
    </PruScreen>
  );
};
