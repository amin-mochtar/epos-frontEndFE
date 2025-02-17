import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { PruColor, PruScreen } from 'common_ui_components';
import { EposFooter, EposHeader, InfoBar, NumberTitle, OptionCard, SectionTitle, TOptionalCardData } from '../../..//components';
import {
  DropdownField,
  InputField,
  ModalInformation,
  NoticeBar,
  TRadioData,
  onChangeNumber,
  plaiStyles,
  sanitizedLetterText,
  sanitizedText,
} from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';
import { ISPAJData, ISQSDetail, SPAJCurrencyList, WR_SHARIA_CONVENT, benefitInsuranceList, checkMainParticipant, statement } from '../../../utilities';
import { Button } from 'common_ui_components/app/components-ui';
import {
  TFormPrimaryInsuredActive,
  defaultCommonValue,
  defaultFormPrimaryInsuredActive,
} from './spaj-primary-insured-active-type';
import { ValidationForm, defaultOptionalData } from '../../../utilities/common-function';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';

export const SPAJPrimaryInsuredActiveScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu, getSummaryProposalById } = useEposRealm();
  const { selectedSQSId, proposalId, spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSummaryProposal = getSummaryProposalById(proposalId);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const SPAJDataInfo = RSPAJData?.DataCompleteness?.filter((item) => item.categoryKey == 'Data Informasi');
  const defaultActivePolicy = RSPAJData?.activePolicy ? JSON.parse(RSPAJData.activePolicy!) : null;
  const [otherInsurance, setotherInsurance] = useState<TOptionalCardData>(
    defaultActivePolicy ? defaultActivePolicy?.haveOtherInsurance : defaultOptionalData,
  );
  const [tempData, setTempData] = useState<TFormPrimaryInsuredActive>(defaultActivePolicy);const [currency, setcurrency] = useState<TOptionalCardData>({ label: 'IDR', key: 'IDR' });
  const [isMaxItemsModal, setisMaxItemsModal] = useState(false);
  const isPrucerah = ['E1O', 'E1OP'].includes(RSQSData?.product?.key ?? '');
  const maxItems = 3;

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormPrimaryInsuredActive>({
    defaultValues: useMemo(() => {
      let result = defaultFormPrimaryInsuredActive;
      if (RSPAJData?.activePolicy != null || RSPAJData?.activePolicy != '') {
        result = defaultActivePolicy;
      }
      return result as any;
    }, []),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'insuredDetail',
    control,
  });

  const mainParticipant = useMemo(() => checkMainParticipant(RSummaryProposal?.productCode!, RSQSData?.policyType!), []);
  const insured = useMemo(() => checkMainParticipant(RSummaryProposal?.productCode!, RSQSData?.policyType!, true), []);
  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);

  const TRIPLE_POINT_CODES = ['H14', 'H15', 'U1MR', 'U12', 'U13', 'U17R', 'U17D', 'T1Q', 'T1P'];
  const TWO_POINT_CODES = ['C16', 'E1O', 'E1OP', 'T1RR', 'L1Q'];

  const { pdpNoticebarWarningWording, benefitInsuranceListMemo } = useMemo(() => {
    const { haveOtherInsurance } = getValues();
    const selectedProductCode = RSummaryProposal?.productCode || 'not-found';

    // Determine product type flags
    const isTriplePointProduct = TRIPLE_POINT_CODES.includes(selectedProductCode);
    const isTwoPointProduct = TWO_POINT_CODES.includes(selectedProductCode);
    const hasOtherInsurance = haveOtherInsurance?.key === 'Y';

    // Build warning message parts
    const warningMessageParts = [wording.pdp_notice_bar_have_other_assurance_1];

    if (hasOtherInsurance) {
      if (isTriplePointProduct || isTwoPointProduct) {
        warningMessageParts.push(wording.pdp_notice_bar_have_other_assurance_2);
      }
      if (isTriplePointProduct) {
        warningMessageParts.push(wording.pdp_notice_bar_have_other_assurance_3);
      }
    }

    // Update benefit insurance list
    const updatedBenefitInsuranceList = isTriplePointProduct
      ? benefitInsuranceList.map(item => (
          item.key === 'HBC'
            ? { ...item, label: `${item.label}(***)` }
            : item
        ))
      : benefitInsuranceList;

    return {
      pdpNoticebarWarningWording: warningMessageParts.join('\n'),
      benefitInsuranceListMemo: updatedBenefitInsuranceList,
    };
  }, [getValues().haveOtherInsurance]);

  const sumInsured = useMemo(() => {
    let label = {
      label: t('Epos:sum_insured'),
      placeholder: t('Epos:enter_sum_insured')
    }
    if (RSQSData?.policyType === 'sharia') {
      label = {
        label: t('Epos:insurance_benef'),
        placeholder: t('Epos:enter_insurance_benef')
      }
    }

    return label
  }, [RSQSData?.policyType])

  const toggleMaxItemsModal = useCallback(() => {
    setisMaxItemsModal(!isMaxItemsModal);
  }, [isMaxItemsModal]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid]);

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

  const removeItem = (index: number) => {
    const currentItems = getValues('insuredDetail');
    currentItems.splice(index, 1);
    setValue('insuredDetail', [...currentItems]);
  };

  const onBack = () => {
    let _routeBack =
      RSQSData?.lifeAssuredSelf === 'self'
        ? EposRoutes.SPAJ_POLICY_OWNER_DATA
        : EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE;
    let params = undefined;

    if (isPrucerah) {
      if (RSQSData?.additionalLifeAssuredSelf == 'self') {
        _routeBack = EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE;
      } else {
        _routeBack = EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE;
        params = {
          isAdditionalAssured: true,
        };
      }
    }

    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: _routeBack,
      });
    }

    if (RSPAJData?.activePolicy) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE, { key: 'status', value: true });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE, { key: 'status', value: false });
      }
    }
    navigation.dispatch(StackActions.replace(_routeBack, params));
    return true;
  };

  const onSave = (data: TFormPrimaryInsuredActive) => {
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'activePolicy',
      value: JSON.stringify(data)
    });
  };

  const onSubmit: SubmitHandler<TFormPrimaryInsuredActive> = async (data) => {
    await onSave(data);

    let _nextRoute = EposRoutes.SPAJ_LIFE_STYLE;

    if (isPrucerah) {
      if (RSQSData?.additionalLifeAssuredSelf == 'other') {
        _nextRoute = EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE;
      }
    }

    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: _nextRoute,
    });

    await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE, {
      key: 'status',
      value: true,
    });
    navigation.dispatch(StackActions.replace(_nextRoute));
  };

  const handleInsuredBenefitChange = (index: number, value: TRadioData) => {
    setValue(`insuredDetail.${index}.insuredBenefit`, value);
    if (value?.key === 'O') {
      setValue(`insuredDetail.${index}.otherInsuranceBenefite`, '');
    }
    updateFormData();
  };

  const updateFormData = () => {
    setTempData(getValues());
  };

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

  const HeaderText = () => {
    let _page = 2;
    let _text = SPAJDataInfo?.length ? SPAJDataInfo[1].name : '-';

    if (RSQSData?.lifeAssuredSelf == 'other') {
      _page = 3;
      _text = SPAJDataInfo?.length ? SPAJDataInfo[2].name : '-';
      if (isPrucerah) {
        if (RSQSData?.additionalLifeAssuredSelf == 'other') {
          _page = 4;
          _text = SPAJDataInfo?.length ? SPAJDataInfo[3].name : '-';
        } else {
          _page = 4;
          _text = SPAJDataInfo?.length ? SPAJDataInfo[3].name : '-';
        }
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
          <EposHeader />
          <HeaderText />
          <ScrollView>
            <Controller
              name={'haveOtherInsurance'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <OptionCard
                    label={t('Epos:have_other_insurance_in_policy_pru', {
                      mainParticipant,
                      insured,
                      companyName: wording.companyName,
                      additionalCompanyName: wording.additionalCompanyName
                    })}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={statement}
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
                <SectionTitle wrapperStyle={[plaiStyles.mt24]} text={t('Epos:insurance_details')} />
                {fields.map((field: any, index: number) => {
                  return (
                    <View key={field.id}>
                      <Controller
                        name={`insuredDetail.${index}.insuredBenefit`}
                        control={control}
                        rules={ValidationForm({ isRequired: true })}
                        render={({ field }) => (
                          <DropdownField
                            labelMap={{
                              title: t('Epos:benefits_insurance'),
                              placeholder: t('Epos:select_benefits'),
                            }}
                            data={benefitInsuranceListMemo}
                            selected={field.value}
                            onSelected={(value) => {
                              handleInsuredBenefitChange(index, value);
                            }}
                            error={errors?.insuredDetail?.[index]?.insuredBenefit}
                            id="dropdown-benefit-insurance"
                          />
                        )}
                      />

                      {getValues(`insuredDetail.${index}.insuredBenefit`)?.key === 'O' && (
                        <Controller
                          name={`insuredDetail.${index}.otherInsuranceBenefite`}
                          control={control}
                          rules={ValidationForm({ isRequired: true, maxLength: 25 })}
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
                            additionalInfo={t('Epos:company_name_info')}
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
                            label={sumInsured.label}
                            placeholder={sumInsured.placeholder}
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
                          onPress={() => removeItem(index)}
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

            <InfoBar variant='warn' withIcon={true} iconStyle='style 2' isUseHtmlFormatText={true} content={pdpNoticebarWarningWording} />

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
            onPress: handleSubmit(onSubmit),
          }}
        />
      </>
    </PruScreen>
  );
};
