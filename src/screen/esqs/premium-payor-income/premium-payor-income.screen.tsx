import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  CheckboxGroup,
  Divider,
  DropdownField,
  InputField,
  ModalInformation,
  TCheckboxData,
  plaiStyles,
  setMultipleSelect,
  SALARY_RANGE_DATA,
  TCommonConstantData,
  TRadioData
} from 'plai_common_frontend';
import { EposFooter, EposHeader, SectionTitle, TOptionalCardData, HeaderTitle } from '../../../components';
import { EposRoutes } from '../../../navigation';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { OCCUPATION_SIMPLE, WR_SHARIA_CONVENT, minMaxSalaryData, sanitizeTextLetterAndNumber, ICommonObjectData, ISQSDetail } from '../../../utilities';
import { Controller, useForm } from 'react-hook-form';
import { TFormPayorIncome, defaultForm } from './premium-payor-income.type';
import { VALIDATION } from './validation-form';

const ALERT_INFORMATION =
  'Produk Asuransi Yang Dikaitkan Investasi memilki karakteristik mengikuti nilai pasar sehingga dapat saja mengalami penurunan nilai. Untuk memberikan perlindungan terhadap anda, mohon pastikan anda memiliki sumber penghasilan yang memadai untuk menghadapi risiko ini.';

export const PremiumPayorIncomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const [policyHolderIsPremiumPayor, setPolicyHolderIsPremiumPayor] = useState<string>(
    RSQSData?.policyHolderIsPremiumPayor || '',
  );
  const [prospectivePremiumPayor, setProspectivePremiumPayor] = useState<string>(
    RSQSData?.prospectivePremiumPayor || '',
  );
  const { onUpdateSQS, updateSummaryByKey, getCustomerStorageById } = useEposRealm();
  const [showAlert, setShowAlert] = useState(false);
  const [showInput, setShowInput] = useState<{ [key: string]: boolean; }>({
    other: false,
    personalBusiness: false,
    investment: false,
  });

  const { lifeAssuredData, MIN_INCOME, clientIncome } = useMemo(() => {
    const lifeAssuredData: unknown = getCustomerStorageById(RSQSData?.clientIdSelected[0] as string);
    const additionalValidationPolicyInformation = JSON.parse(RSQSData?.additionalValidationPolicyInformation!);
    // @ts-ignore
    const clientIncome = policyHolderIsPremiumPayor === 'N' ? 0 : minMaxSalaryData[lifeAssuredData?.clientIncome!.key].max;
    const libraryValidation = {
      B: 50000000,
      C: 25000000,
      D: 10000000,
      E: 10000000
    };
    // @ts-ignore
    const MIN_INCOME = policyHolderIsPremiumPayor === 'N' ? 10000000 : libraryValidation[additionalValidationPolicyInformation.lastEducationalStatus.key];

    return {
      lifeAssuredData,
      MIN_INCOME,
      clientIncome,
    };
  }, []);

  useMemo;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    getValues,
    trigger,
    watch
  } = useForm<TFormPayorIncome>({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      let result = defaultForm;
      if (RSQSData != null && RSQSData.premiumPayorIncomeData) {
        result = RSQSData.premiumPayorIncomeData ? JSON.parse(RSQSData.premiumPayorIncomeData!) : '';
      }
      return result as TFormPayorIncome;
    }, []),
  });
  const [income, setIncome] = useState<TCommonConstantData>(getValues('totalIncome'));
  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const sourceWatch = watch('source');
  useEffect(() => {
    if (RSQSData?.premiumPayorIncomeData) {
      const _premiumPayorIncome = JSON.parse(RSQSData.premiumPayorIncomeData) as TFormPayorIncome;
      setShowInput({
        other: _premiumPayorIncome.source.find((source) => source.key == 'other') == undefined ? false : true,
        personalBusiness: _premiumPayorIncome.source.find((source) => source.key == 'personalBusiness') == undefined ? false : true,
        investment: _premiumPayorIncome.source.find((source) => source.key == 'investment') == undefined ? false : true,
      });
    }
    if (getValues('source') === undefined) setValue('source', []);
    if (RSQSData?.clientIdSelected.length! > 0) {
      const clientIncome: ICommonObjectData = { label: lifeAssuredData?.clientIncome?.label, key: lifeAssuredData?.clientIncome?.key };
      // setIncome(clientIncome);
    }
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    trigger();
  }, [sourceWatch]);

  const onChangeSource = (item: TCheckboxData) => {
    const _source = setMultipleSelect(getValues('source'), item, 'key');
    if (item.key == 'other' || item.key == 'personalBusiness' || item.key == 'investment') {
      const selected = _source.find((source: { [key: string]: string; }) => source.key == item.key);

      setShowInput((prev) => {
        return {
          ...prev,
          [item.key]: selected == undefined ? false : true,
        };
      });
    }
    setValue('source', _source);
  };

  const onBack = () => {
    onSave(EposRoutes.VALIDATION_INCOME);
    return true;
  };

  const onValidateInput = (value: string, field: string) => {
    const _isRequired = showInput[field] ? value != '' : true;
    return _isRequired || t('Epos:required');
  };

  const onDisableSourceIncome = (item: TCommonConstantData | undefined) => {
    return useMemo(() => {
      const clientNoIncome = income?.key !== '0';
      const source = getValues('source');
      if (clientNoIncome) {
        if (source.length && source[0].key === 'noIncome') setValue('source', []);
        return item?.key === 'noIncome';
      }
      else if (!clientNoIncome) {
        setValue('source', [
          {
            key: 'noIncome',
            label: 'Tidak Berpenghasilan',
          },
        ]);
        return true;
      } else {
        return false;
      }
    }, [income?.key]);
  };

  const onSave = async (route?: string) => {
    const _sqsData = {
      ...RSQSData?.toJSON(),
      premiumPayorIncomeData: JSON.stringify(getValues()),
    } as ISQSDetail;
    await onUpdateSQS(_sqsData!);
    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: route || EposRoutes.CALCULATOR,
    });
    navigation.dispatch(StackActions.replace(route || EposRoutes.CALCULATOR));
  };

  const onContinue = () => {
    // @ts-ignore
    const _totalIncome = parseInt(clientIncome) + parseInt(minMaxSalaryData[getValues('totalIncome').key].max);
    if (_totalIncome <= MIN_INCOME) {
      setShowAlert(true);
    } else {
      onSave();
    }
  };

  return (
    <PruScreen backgroundColor={PruColor.background}>
      <View style={plaiStyles.px16}>
        <EposHeader />
        <HeaderTitle title={`Data Penghasilan Calon Pembayar ${wording.premiContribution}`} titleStyle={plaiStyles.fontHeaderTitle} />
      </View>
      <ScrollView style={[plaiStyles.px16, plaiStyles.flex]}>
        <SectionTitle text="Total Penghasilan" />
        <Controller
          name={VALIDATION.totalIncome.name}
          control={control}
          rules={VALIDATION.totalIncome.rule}
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
              selected={value as { [key: string]: string; }}
              onSelected={(item) => {
                onChange(item);
                setIncome(item);
              }}
            />
          )}
        />
        <SectionTitle text={t('Epos:source_income_fund_per_month')} />
        <Controller
          name={VALIDATION.source.name}
          control={control}
          rules={VALIDATION.source.rule}
          render={({ field: { value } }) => (
            <CheckboxGroup
              insideStyle={[plaiStyles.rowReverse, plaiStyles.justifyBetween, plaiStyles.py16, plaiStyles.borderbf0]}
              data={OCCUPATION_SIMPLE}
              selected={value as TCheckboxData[]}
              onSelected={onChangeSource}
              onDisabled={(item) => onDisableSourceIncome(item)}
            />
          )}
        />
        {showInput.other && (
          <Controller
            name={VALIDATION.other.name}
            control={control}
            rules={{ validate: (_value) => onValidateInput(_value as string, 'other') }}
            render={({ field: { onChange, value } }) => (
              <InputField
                containerStyle={[plaiStyles.flex, plaiStyles.mt12, plaiStyles.bgwhite, plaiStyles.br12]}
                label={'Lainnya'}
                required={true}
                placeholder={'Masukkan Lainnya'}
                value={value as string}
                setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                error={errors.other}
              />
            )}
          />
        )}
        {showInput.personalBusiness && (
          <Controller
            name={VALIDATION.personalBusiness.name}
            control={control}
            rules={{ validate: (_value) => onValidateInput(_value as string, 'personalBusiness') }}
            render={({ field: { onChange, value } }) => (
              <InputField
                containerStyle={[plaiStyles.flex, plaiStyles.mt12, plaiStyles.bgwhite, plaiStyles.br12]}
                label={'Bisnis Pribadi'}
                required={true}
                placeholder={'Masukan bisnis pribadi'}
                value={value as string}
                setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                error={errors.personalBusiness}
              />
            )}
          />
        )}
        {showInput.investment && (
          <Controller
            name={VALIDATION.investment.name}
            control={control}
            rules={{ validate: (_value) => onValidateInput(_value as string, 'investment') }}
            render={({ field: { onChange, value } }) => (
              <InputField
                containerStyle={[plaiStyles.flex, plaiStyles.mt12, plaiStyles.bgwhite, plaiStyles.br12]}
                label={'Investasi'}
                required={true}
                placeholder={'Masukan investasi'}
                value={value as string}
                setValue={(item) => onChange(sanitizeTextLetterAndNumber(item))}
                error={errors.investment}
              />
            )}
          />
        )}
        <Divider height={16} />
      </ScrollView>
      <EposFooter
        position={8}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: !isValid,
          onPress: handleSubmit(onContinue),
        }}
      />
      <ModalInformation
        visible={showAlert}
        title={'Informasi'}
        desc={ALERT_INFORMATION}
        buttonPrimary={{
          text: 'Ok',
          onPress: () => setShowAlert(false),
        }}
      />
    </PruScreen>
  );
};
