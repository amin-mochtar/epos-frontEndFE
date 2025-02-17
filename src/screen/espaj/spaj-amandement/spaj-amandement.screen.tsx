import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  DropdownField,
  InputField,
  ModalContainer,
  ModalInformation,
  plaiStyles,
  InputDate,
  TRadioData,
  TCommonConstantData,
  LoadingFull
} from 'plai_common_frontend';
import {
  DoksulHeader,
  EposFooter,
  EposHeader,
  NumberTitle,
  OptionCard,
  SectionTitle,
} from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import {
  ISPAJData,
  ISQSDetail,
  DEFAULT_OPTIONAL_DATA,
  GenderList,
  WR_SHARIA_CONVENT,
  categoryDoksulList,
  categoryList,
  maritalStatusList,
  paymentFreqList,
  statement,
  subCategoryList,
  validateObject,
  checkMainParticipant,
} from '../../../utilities';
import { TFOrmAmendment, defaultAmendmentDetail, defaultCommonValue, defaultFormAmendment, fieldNias } from './spaj-amendment.type';
import { showModalMaintenance, ValidationForm } from '../../../utilities/common-function';
import { useSelector } from 'react-redux';
import { EposState, TCheckStatusMicrosite } from '../../../redux';
import { RootState } from 'redux/reducer';
import { useEposRealm, useObject } from '../../../database';
import moment from 'moment';
import { getPaymentFrequencyList } from '../../esqs/policy-owner-data/policy-owner-data.function';

export const SPAJAmandementScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const currentDate = moment();
  const { spajId, proposalId, selectedSQSId, isDoksul, sqsData } = useSelector<RootState, EposState>((state) => state.epos);
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu } = useEposRealm();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : '';
  const additionalInsured = RSPAJData?.additionalInsured ? JSON.parse(RSPAJData.additionalInsured) : '';
  const defaultAmandment = RSPAJData?.amandment ? JSON.parse(RSPAJData.amandment) : '';
  const premiumPayor = RSPAJData?.premiumPayor ? JSON.parse(RSPAJData.premiumPayor) : ''
  const _listCategory = isDoksul ? categoryDoksulList : categoryList

  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const [isAttentionModal, setIsAttentionModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const keyofCategory = ['PN', 'PTL', 'PJK', 'PSP', 'UA', 'UNI', 'UNT', 'UAE', 'AD', 'MD'];
  const keyofRedirect = ['UA', 'UNI', 'UNT', 'UAE'];
  const keyofAmendment = ['PN', 'AD', 'MD'];

  const [validationModal, setvalidationModal] = useState(false);
  const [alertMessage, setalertMessage] = useState<{ title: string; desc: string; }>({ title: '', desc: '' });
  const [loadingValidate, setloadingValidate] = useState(false);
  const mainParticipant = useMemo(() => checkMainParticipant(RSQSData?.product?.key, RSQSData?.policyType,), []);


  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<TFOrmAmendment>({
    defaultValues: useMemo(() => {
      let result = defaultFormAmendment;
      if (spajId) {
        if (RSPAJData && RSPAJData?.amandment) {
          result = defaultAmandment;
        }
      }
      return result as TFOrmAmendment;
    }, [spajId]),
  });

  const paymentFrequencyList = useMemo(
    () => getPaymentFrequencyList(RSQSData?.insuranceGoal || sqsData.insuranceGoal),
    []
  );

  const subCategories = useMemo(() => {
    let result = subCategoryList(wording.mainParticipant);
    if (lifeAssuredSelf === 'self') {
      result = subCategoryList(wording.mainParticipant).filter(item => item.key === 'PP');
    } else if (RSQSData?.additionalLifeAssuredSelf !== 'other') {
      result = subCategoryList(wording.mainParticipant).filter(item => item.key !== 'T/PT');
    }

    return result.map(item => (
      item.key === 'T/PU'
        ? { ...item, label: checkMainParticipant(RSQSData?.product?.key!, RSQSData?.policyType!) }
        : item
    ));
  }, []);

  const { append, remove } = useFieldArray({
    name: 'amendmentDetail',
    control,
  });
  const fields = watch("amendmentDetail")
  const fillAmendment = watch('fillAmendment')

  useEffect(() => {
    if (defaultAmandment === null || defaultAmandment === '') {
      setValue('fillAmendment', { key: 'N', label: t('Epos:no') });
    }
  }, []);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, [isValid]);


  // handle for value fillAmendment is 'Y'
  const handleStatementFillAmendment = () => {
    //showing popup countdown
    setIsAttentionModal(true);
    // Set default values for amendmentDetail
    setValue('amendmentDetail', [defaultAmendmentDetail]);
  };


  const defaultCondition = (statementAmendment: TCommonConstantData) => {
    const isAmendmentY = statementAmendment?.key === 'Y';
    const isAmendmentN = statementAmendment?.key === 'N';

    if (isAmendmentN) {
      // Handle the case where fillAmendment is 'N'
      setValue('amendmentDetail', []);
      setCountdown(5);
    } else if (!defaultAmandment && isAmendmentY) {
      // If no defaultAmandment and fillAmendment is 'Y'
      handleStatementFillAmendment();
    } else if (defaultAmandment && isAmendmentY && fields.length === 0) {
      // If defaultAmandment exists, fillAmendment is 'Y', and fields are empty
      handleStatementFillAmendment();
    }
  }


  useEffect(() => {
    defaultCondition(fillAmendment);

    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);

  }, [fillAmendment, countdown]);


  const onCancel = () => {
    setCountdown(5);
    setValue('amendmentDetail', []);
    setValue('fillAmendment', { key: 'N', label: t('Epos:no') });
    setIsAttentionModal(!isAttentionModal);
  };


  const handleNonRedirectCategory = (index: number, value: TCommonConstantData) => {
    const listCategory = fields.map((item) => item?.category);
    const foundCategory = listCategory.some((item) => item?.key === value?.key);

    if (!foundCategory) {
      setValue(`amendmentDetail.${index}.category`, value);
    }

    if (getValues(`amendmentDetail.${index}.category`)?.key === value?.key) {
      setValue(`amendmentDetail.${index}.detailCategory`, [{ subCategory: defaultCommonValue }]);
    }

    if (value.key === 'UPM') {
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_BENEFICIARY_CANDIDATE));
    }
  };


  const listCategories = (index: number) => {
    const _amanDementDetailList = [...getValues('amendmentDetail')]
    const selectedKeys = _amanDementDetailList.map((item) => item.category?.key);
    return categorySelected(selectedKeys as string[], index)
  }


  const categorySelected = (selectedKeys: string[], index: number) => {
    return _listCategory.map((item) => {
      // after selected one of the options status will be updated "disable" on other options except itself
      const alareadySelected = selectedKeys.includes(item.key) && selectedKeys[index] !== item.key
      return {
        ...item,
        disabled: alareadySelected
      }
    })
  }

  const handleCategoryChange = (index: number, value: TCommonConstantData) => {
    handleNonRedirectCategory(index, value);
  };


  const subCategorySelected = (index: number, value: TCommonConstantData) => {
    const selectedCategory = getValues(`amendmentDetail.${index}.category`)?.key;
    const isRedirectCategory = typeof selectedCategory === 'string' && keyofRedirect.includes(selectedCategory);
    const subCategories = getValues(`amendmentDetail.${index}.detailCategory`)?.map((item) => item.subCategory);

    const navigateTo =
      // redirect to step 1 LA (PH#LA)
      lifeAssuredSelf !== 'self' && ['T/PU', 'T/PT'].includes(value.key!)
        ? EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE
        // redirect to step 1 PH (PH#LA or PH=LA)
        : value.key === 'PP'
          ? EposRoutes.SPAJ_POLICY_OWNER_DATA
          : null;

    let routeParams = undefined
    if (value.key == 'T/PT') {
      routeParams = {
        isAdditionalAssured: true
      }
    }

    return {
      isRedirect: isRedirectCategory,
      navigate: navigateTo,
      subCategories,
      routeParams
    }
  }


  const handleSubCategoryChange = (index: number, value: TCommonConstantData) => {
    const { isRedirect, navigate, subCategories, routeParams } = subCategorySelected(index, value)

    if (isRedirect && navigate) {
      onSave();
      updateSummaryByKey(proposalId, { key: 'lastState', value: navigate });
      navigation.dispatch(StackActions.replace(navigate, routeParams));

    } else if (!subCategories?.some((item) => item?.key === value?.key)) {
      return value
    }

  };


  const removeDetailCategory = (categoryIndex: number, detailCategoryIndex: number) => {
    const updatedFields = [...getValues('amendmentDetail')];
    if (categoryIndex >= 0 && categoryIndex < updatedFields.length) {
      const category = updatedFields[categoryIndex];
      if (
        category &&
        category.detailCategory &&
        detailCategoryIndex >= 0 &&
        detailCategoryIndex < category.detailCategory.length
      ) {
        category.detailCategory.splice(detailCategoryIndex, 1);
        setValue('amendmentDetail', updatedFields);
      }
    }
  };


  const addDetailCategory = (categoryIndex: number) => {
    const updatedFields = [...getValues(`amendmentDetail`)];
    if (categoryIndex >= 0 && categoryIndex < updatedFields.length) {
      const category = updatedFields[categoryIndex];
      if (category && !category.detailCategory) {
        category.detailCategory = [];
      }
      if (category && category.detailCategory) {
        category.detailCategory.push({
          subCategory: DEFAULT_OPTIONAL_DATA,
          amendment: '',
          birthDate: '',
          gender: DEFAULT_OPTIONAL_DATA,
          maritalStatus: DEFAULT_OPTIONAL_DATA,
        });
      }
      setValue('amendmentDetail', updatedFields);
    }
  };


  const onBack = () => {
    onSave();

    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    }

    return true;
  };


  const onSave = () => {
    updateSPAJByKey(RSPAJData?.spajId ?? '',
      {
        key: 'amandment',
        value: JSON.stringify(getValues())
      },
    );

    updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.SPAJ_AMANDEMENT,
    });

    updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_AMANDEMENT, {
      key: 'status',
      value: isValid, // if all field are fill then status sub menu from data completeness is true
    });
  };


  const onSubmit = () => {
    onSave();
    const nextRoutes = isDoksul ? EposRoutes.SPAJ_SIGNATURE : EposRoutes.SPAJ_DATA_COMPLETENESS;
    navigation.dispatch(StackActions.replace(nextRoutes));
  };


  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          {!isDoksul ?
            <>
              <EposHeader onPressSpajCompleteness={onBack} />
              <NumberTitle number="7" text={`1/1 ${t('Epos:amendment')}`} />
            </> :
            <></>}
          <ScrollView>
            {!isDoksul ? (
              <>
                <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:amendment')}</Text>
                <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
                  {t('Epos:specify_amendment')}
                </Text>
              </>
            ) : (
              <DoksulHeader
                title={t('Epos:amendment')}
                onPress={onBack}
              />
            )}
            {!isDoksul && <SectionTitle text={t('Epos:amendment')} />}
            <Controller
              name={`fillAmendment`}
              rules={ValidationForm({ validate: validateObject })}
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    required={false}
                    label={t('Epos:do_you_fill_in_amend', { spaj: wording?.spaj })}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={statement}
                    selected={value}
                    onSelected={onChange}
                    translation={true}
                    uniqueTestId='amendment'
                  />
                </>
              )}
            />
            {fillAmendment?.key === 'Y' && (
              <>
                {fields.map((field: any, index: number) => {
                  const selectedCategory = getValues(`amendmentDetail.${index}.category`)?.key;
                  const isSelectedCategory =
                    typeof selectedCategory === 'string' && keyofCategory.includes(selectedCategory);

                  return (
                    <View key={field.id}>
                      <>
                        {isDoksul && (<SectionTitle text={`Kategori ${index + 1}`} />)}
                        <Controller
                          name={`amendmentDetail.${index}.category`}
                          control={control}
                          rules={ValidationForm({ validate: validateObject })}
                          render={({ field }) => (
                            <DropdownField
                              labelMap={{
                                title: t('Epos:category'),
                                placeholder: t('Epos:select_category'),
                              }}
                              data={listCategories(index)}
                              selected={field.value}
                              onSelected={(item) => handleCategoryChange(index, item)}
                              error={errors.amendmentDetail?.[index]?.category}
                              id={`input-${index}-category`}
                            />
                          )}
                        />

                        {isSelectedCategory &&
                          field?.detailCategory.map((subCategory: any, subIndex: number) => {
                            return (
                              <View key={subCategory.id}>
                                {!isDoksul && (
                                  <Controller
                                    name={`amendmentDetail.${index}.detailCategory.${subIndex}.subCategory`}
                                    control={control}
                                    rules={ValidationForm({ validate: validateObject })}
                                    render={({ field: { onChange, value } }) => (
                                      <DropdownField
                                        labelMap={{
                                          title: t('Epos:sub_category'),
                                          placeholder: t('Epos:select_sub_category'),
                                        }}
                                        data={subCategories}
                                        selected={value}
                                        onSelected={(value) => onChange(handleSubCategoryChange(index, value))}
                                        error={errors.amendmentDetail?.[index]?.detailCategory?.[subIndex]?.subCategory}
                                        id={`input-${index}-detailCategory-${subIndex}-subCategory`}
                                      />
                                    )}
                                  />
                                )}

                                {keyofAmendment.includes(selectedCategory) ? (
                                  <Controller
                                    name={`amendmentDetail.${index}.detailCategory.${subIndex}.amendment`}
                                    control={control}
                                    rules={ValidationForm({ isRequired: true })}
                                    render={({ field: { onChange, value } }) => {
                                      return (
                                        <InputField
                                          label={t('Epos:amendments_other_desc')}
                                          placeholder={t('Epos:enter_amendment')}
                                          value={value}
                                          setValue={onChange}
                                          rightItem="counter"
                                          multiline
                                          maxLength={5000}
                                          error={errors?.amendmentDetail?.[index]?.detailCategory?.[subIndex]?.amendment}
                                          id={`input-${index}-detailCategory-${subIndex}-amendment`}
                                        />
                                      );
                                    }}
                                  />
                                ) : null}

                                {selectedCategory === 'PTL' && (
                                  <Controller
                                    name={`amendmentDetail.${index}.detailCategory.${subIndex}.birthDate`}
                                    control={control}
                                    rules={ValidationForm({ validate: validateObject })}
                                    render={({ field: { onChange, value } }) => (
                                      <InputDate
                                        formatDate="YYYY-MM-DD"
                                        label={t('Epos:date_of_birth')}
                                        placeholder={t('Epos:select_date')}
                                        maxDate={moment().toISOString()}
                                        value={value}
                                        setValue={onChange}
                                        error={errors.amendmentDetail?.[index]?.detailCategory?.[subIndex]?.birthDate}
                                        id={`input-${index}-detailCategory-${subIndex}-birthDate`}
                                      />
                                    )}
                                  />
                                )}

                                {selectedCategory === 'PJK' && (
                                  <Controller
                                    name={`amendmentDetail.${index}.detailCategory.${subIndex}.gender`}
                                    control={control}
                                    rules={ValidationForm({ validate: validateObject })}
                                    render={({ field: { onChange, value } }) => (
                                      <OptionCard
                                        label={t('Epos:gender')}
                                        style={[plaiStyles.flex, plaiStyles.row]}
                                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                                        theme="border"
                                        data={GenderList}
                                        selected={value}
                                        onSelected={onChange}
                                        error={errors.amendmentDetail?.[index]?.detailCategory?.[subIndex]?.gender}
                                        id={`input-${index}-detailCategory-${subIndex}-gender`}
                                      />
                                    )}
                                  />
                                )}

                                {selectedCategory === 'PSP' && (
                                  <Controller
                                    name={`amendmentDetail.${index}.detailCategory.${subIndex}.maritalStatus`}
                                    control={control}
                                    rules={ValidationForm({ validate: validateObject })}
                                    render={({ field: { onChange, value } }) => (
                                      <OptionCard
                                        label={t('Epos:marital_status')}
                                        theme="border"
                                        data={maritalStatusList}
                                        selected={value}
                                        onSelected={onChange}
                                        error={
                                          errors.amendmentDetail?.[index]?.detailCategory?.[subIndex]?.maritalStatus
                                        }
                                        id={`input-${index}-detailCategory-${subIndex}-maritalStatus`}
                                      />
                                    )}
                                  />
                                )}

                                {field.detailCategory.length > 1 && (
                                  <Button
                                    style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                                    textStyle={plaiStyles.fontGrey33}
                                    text={t('Epos:remove_subcategory')}
                                    onPress={() => removeDetailCategory(index, subIndex)}
                                  />
                                )}
                              </View>
                            );
                          })}

                        {lifeAssuredSelf !== 'self' && isSelectedCategory && !isDoksul && (
                          <Button
                            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
                            textStyle={plaiStyles.fontRed}
                            text={t('Epos:add_subcategory')}
                            onPress={() => addDetailCategory(index)}
                            disabled={field.detailCategory.length >= (additionalInsured ? 3 : 2) ? true : false}
                          />
                        )}

                        {selectedCategory === 'HD' && (
                          <Controller
                            name={`amendmentDetail.${index}.healthData`}
                            control={control}
                            rules={ValidationForm({ validate: validateObject })}
                            render={({ field: { onChange, value } }) => {
                              return (
                                <InputField
                                  label={t('Epos:amendments_other_desc')}
                                  placeholder={t('Epos:enter_amendment')}
                                  value={value}
                                  setValue={onChange}
                                  rightItem="counter"
                                  multiline
                                  maxLength={5000}
                                  error={errors?.amendmentDetail?.[index]?.healthData}
                                  id={`input-${index}-healthData`}
                                />
                              );
                            }}
                          />
                        )}

                        {selectedCategory === 'PFB' && (
                          <Controller
                            name={`amendmentDetail.${index}.paymentFrequency`}
                            control={control}
                            rules={ValidationForm({ validate: validateObject })}
                            render={({ field: { onChange, value } }) => (
                              <OptionCard
                                label={t('Epos:frequency_of_payment')}
                                theme="border"
                                data={paymentFrequencyList}
                                selected={value}
                                onSelected={onChange}
                                error={errors.amendmentDetail?.[index]?.paymentFrequency}
                                id={`input-${index}-paymentFrequency`}
                              />
                            )}
                          />
                        )}
                      </>

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
                  style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24, plaiStyles.mb16]}
                  textStyle={plaiStyles.fontRed}
                  text={t('Epos:add_insurance_beneficiaries')}
                  onPress={() => append(defaultAmendmentDetail)}
                  disabled={isDoksul && fields.length > 1 ? true : false}
                />
              </>
            )}
            <ModalContainer
              visible={isAttentionModal}
              titleHeader={t('Epos:info')}
              type="center"
              children={
                <>
                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                    <Trans
                      i18nKey="Epos:filling_in_additionalinformation_amandment"
                      components={{ i: <Text style={[plaiStyles.fontItalic, plaiStyles.fontBold]} /> }}
                    />
                  </Text>

                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt16]}>
                    {t('Epos:please_submit_the_data_information')}
                  </Text>

                  <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt16]}>
                    {t('Epos:are_you_sure_you_will_submit_amendment')}
                  </Text>

                  <Button
                    style={[countdown > 0 ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, plaiStyles.mt24]}
                    textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
                    text={`${t('Epos:yes_sure')} ${countdown > 0 ? `(${countdown} ${t('Epos:second')})` : ''}`}
                    disabled={countdown > 0 ? true : false}
                    onPress={() => setIsAttentionModal(!isAttentionModal)}
                  />

                  <Button
                    style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt16]}
                    textStyle={plaiStyles.fontGrey33}
                    text={t('Epos:cancel')}
                    onPress={onCancel}
                  />
                </>
              }
            >
            </ModalContainer>
            <ModalInformation
              title={alertMessage?.title}
              desc={alertMessage?.desc}
              visible={validationModal}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => setvalidationModal(!validationModal)
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
            disabled: !isValid,
            onPress: handleSubmit(onSubmit),
          }}
        />
      </>
    </PruScreen>
  );
};
