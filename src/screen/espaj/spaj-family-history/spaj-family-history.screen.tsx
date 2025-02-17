import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { DropdownField, InputField, plaiStyles, setMultipleSelect } from 'plai_common_frontend';
import { EposFooter, EposHeader, NumberTitle, OptionCard, OptionFiled, SectionTitle } from '../../../components';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { diseaseList, diseaseNameList, questions, relationshipPHList } from '../../../utilities';
import { Button } from 'common_ui_components/app/components-ui';

type TFormDamilyHistory = {
  diseaseHistory: string;
  relationshipPH: string[];
  mother: {
    diseaseName: string;
    ageAtDiagnosis: string;
  }[];
  father: {
    diseaseName: string;
    ageAtDiagnosis: string;
  }[];
};

export const SPAJFamilyBackgroundScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onBack = () => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PHYSICAL_HABITS));
    return null;
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormDamilyHistory>({
    defaultValues: {
      diseaseHistory: '',
      relationshipPH: [],
      mother: [
        {
          diseaseName: '',
          ageAtDiagnosis: '',
        },
      ],
      father: [
        {
          diseaseName: '',
          ageAtDiagnosis: '',
        },
      ],
    },
  });

  const {
    fields: field1,
    append: append1,
    remove: remove1,
  } = useFieldArray({
    name: 'mother',
    control,
  });

  const {
    fields: field2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    name: 'father',
    control,
  });

  const onSubmit: SubmitHandler<TFormDamilyHistory> = async (data) => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_MEDICAL_HISTORY));
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader />
          <NumberTitle number="2" text={`3/4 ${t('Epos:health_data')}`} />
          <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:family_bg')}</Text>
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
            {t('Epos:describe_family_history')}
          </Text>

          <ScrollView>
            <SectionTitle text={t('Epos:medical_history')} />
            <Controller
              name={'diseaseHistory'}
              control={control}
              rules={{ required: `${t('Epos:required')}` }}
              render={({ field: { onChange, value } }) => (
                <>
                  <View style={[plaiStyles.row]}>
                    <View>
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.mt24]}>
                        {t('Epos:following_medical_history_before_age_sixty')}
                      </Text>
                      <FlatList
                        data={diseaseNameList}
                        style={[plaiStyles.mt8]}
                        renderItem={({ item }) => {
                          return (
                            <View style={{ marginBottom: 10 }}>
                              <Text>{`\u2022 ${item.key}`}</Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                    <Text style={plaiStyles.fontRed}> *</Text>
                  </View>
                  <OptionCard
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={questions}
                    selected={value}
                    onSelected={onChange}
                  />
                  {errors.diseaseHistory && (
                    <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
                      {errors?.diseaseHistory?.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              name={'relationshipPH'}
              control={control}
              rules={{ required: `${t('Epos:required')}` }}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionFiled
                    label={t('Epos:relationship_between_family_members')}
                    theme="border"
                    type="checkbox"
                    data={relationshipPHList}
                    selected={value}
                    onSelected={(item) => onChange(setMultipleSelect([...value], item, 'key'))}
                    error={errors?.relationshipPH}
                  />
                </>
              )}
            />

            <SectionTitle style={[plaiStyles.mt24]} text={t('Epos:mother')} />
            {field1.map((fields: any, index: number) => {
              return (
                <View key={fields.id}>
                  <Controller
                    name={`mother.${index}.diseaseName`}
                    control={control}
                    rules={{ required: `${t('Epos:required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <DropdownField
                        labelMap={{
                          title: t('Epos:condition_or_disease'),
                          placeholder: t('Epos:select_condition'),
                        }}
                        data={diseaseList}
                        selected={value}
                        onSelected={onChange}
                        error={errors?.mother?.[index]?.diseaseName}
                      />
                    )}
                  />

                  <Controller
                    name={`mother.${index}.ageAtDiagnosis`}
                    control={control}
                    rules={{ required: `${t('Epos:required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        required={false}
                        label={t('Epos:age_member_at_diagnosis')}
                        placeholder={t('Epos:enter_age')}
                        keyboardType="phone-pad"
                        value={value}
                        setValue={onChange}
                        error={errors?.mother?.[index]?.ageAtDiagnosis}
                      />
                    )}
                  />

                  <Button
                    style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                    textStyle={plaiStyles.fontGrey33}
                    text={t('Calculator:remove')}
                    onPress={() => remove1(index)}
                  />
                </View>
              );
            })}
            <Button
              style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
              textStyle={plaiStyles.fontRed}
              text={t('Epos:add')}
              onPress={() =>
                append1({
                  diseaseName: '',
                  ageAtDiagnosis: '',
                })
              }
            />

            <SectionTitle style={[plaiStyles.mt24]} text={t('Epos:father')} />
            {field2.map((fields: any, index: number) => {
              return (
                <View key={fields.id}>
                  <Controller
                    name={`father.${index}.diseaseName`}
                    control={control}
                    rules={{ required: `${t('Epos:required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <DropdownField
                        labelMap={{
                          title: t('Epos:condition_or_disease'),
                          placeholder: t('Epos:select_condition'),
                        }}
                        data={diseaseList}
                        selected={value}
                        onSelected={onChange}
                        error={errors?.father?.[index]?.diseaseName}
                      />
                    )}
                  />

                  <Controller
                    name={`father.${index}.ageAtDiagnosis`}
                    control={control}
                    rules={{ required: `${t('Epos:required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        required={false}
                        label={t('Epos:age_member_at_diagnosis')}
                        placeholder={t('Epos:enter_age')}
                        keyboardType="phone-pad"
                        value={value}
                        setValue={onChange}
                        error={errors?.father?.[index]?.ageAtDiagnosis}
                      />
                    )}
                  />

                  <Button
                    style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                    textStyle={plaiStyles.fontGrey33}
                    text={t('Epos:remove')}
                    onPress={() => remove2(index)}
                  />
                </View>
              );
            })}
            <Button
              style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
              textStyle={plaiStyles.fontRed}
              text={t('Epos:add')}
              onPress={() =>
                append2({
                  diseaseName: '',
                  ageAtDiagnosis: '',
                })
              }
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
            onPress: () => navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_MEDICAL_HISTORY)),
          }}
        />
      </>
    </PruScreen>
  );
};
