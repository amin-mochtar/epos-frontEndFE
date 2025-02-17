import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InputField, plaiStyles, onChangeNumber, GlobalPromptModal } from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../../../components';
import { color } from 'common_ui_components/app/theme';
import { TWStyles } from './topup-withdrawals.style';
import { Button } from 'common_ui_components/app/components-ui';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { PruHeader, PruIconFont, PruScreen } from 'common_ui_components';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEposRealm, useObject } from '../../../database';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { EposRoutes } from '../../../navigation';
import { NoticeBar } from '../calculator/components';
import { ISQSDetail, TObjectSQSByKey } from '../../../utilities';
import ModalTopupWithdrawal from './components/modal-topup-withdrawal';
import { isEqual } from "lodash";

type FormValues = {
  topUp: {
    year: string;
    value: string;
  }[];
  withdrawl: {
    year: string;
    value: string;
  }[];
};

const DefaultTWData: FormValues = {
  topUp: [{ year: '', value: '' }],
  withdrawl: [{ year: '', value: '' }],
};

type ErrorMessageStateObject = {
  field: number;
  word: string;
};

type ErrorMessageState = {
  topUp: ErrorMessageStateObject[];
  withdrawal: ErrorMessageStateObject[];
};

export const TopupWithdrawalsScreen = () => {
  const { selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { updateSQSByKey } = useEposRealm();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const param = route.params as { value: number };
  // const [yearTopup, setYearTopup] = useState('');
  // const [topup, setTopup] = useState('');
  // const [yearWithdrawals, setYearWithdrawals] = useState('');
  // const [withdrawal, setWithdrawal] = useState('');
  const [slideValue, setSlideValue] = useState<number[]>([0, 0]);
  const [visible, setVisible] = useState(false);
  const [usePeriodYear, setUsePeriodYear] = useState(false);
  const [valueTopUp, setvalueTopUp] = useState<string>('');
  const [visibleWithdrawl, setVisibleWithdrawl] = useState(false);
  const [usePeriodYearWithdrawl, setUsePeriodYearWithdrawl] = useState(false);
  const [valueWithdrawl, setvalueWithdrawl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessageState>({ topUp: [], withdrawal: [] });
  const defaultValues = useMemo(() => {
    let result = DefaultTWData;
    let topUp = DefaultTWData.topUp;
    let withdrawl = DefaultTWData.withdrawl;
    if (RSQSData) {
      if (RSQSData.calculatorTopup) topUp = JSON.parse(RSQSData.calculatorTopup);
      if (RSQSData.calculatorWithdrawl) withdrawl = JSON.parse(RSQSData.calculatorWithdrawl);
    }
    result = {
      topUp: topUp,
      withdrawl: withdrawl,
    };
    return result as FormValues;
  }, [])
  const initialTopup = useRef<FormValues['topUp']>(defaultValues.topUp);

  // const reset = (setState1: (value: string) => void, setState2: (value: string) => void) => {
  //   setState1('')
  //   setState2('')
  // }
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues
  });

  const topUpInfo = useWatch({ control, name: 'topUp' });
  const withdrawlInfo = useWatch({ control, name: 'withdrawl' });

  useEffect(() => {
    const filterTopup = topUpInfo.some((el) => el.value == '');
    const filterWithdrawal = withdrawlInfo.some((el) => el.value == '');
    if (filterTopup) setErrorMessage((prev) => ({ ...prev, topUp: [] }));
    if (filterWithdrawal) setErrorMessage((prev) => ({ ...prev, withdrawal: [] }));
  }, [topUpInfo, withdrawlInfo]);

  const {
    fields: FieldTopUp,
    append: appendTopUp,
    remove: removeTopUp,
    // insert: insertTopUp,
    // update: updateTopUp,
    // replace: replaceTopUp,
  } = useFieldArray({ name: 'topUp', control });

  const {
    fields: FieldWithdrawl,
    append: appendWithdrawl,
    remove: removeWithdrawl,
  } = useFieldArray({ name: 'withdrawl', control });

  const onAddTopUp = useCallback(() => {
    setValue(`topUp.${0}.value`, valueTopUp);
    if (valueTopUp) {
      if (usePeriodYear) {
        setValue(`topUp.${0}.year`, slideValue[0].toString());
        for (let index = slideValue[0]; index < slideValue[1]; index++) {
          appendTopUp({
            year: (index + 1).toString(),
            value: valueTopUp,
          });
        }
      } else {
        setValue(`topUp.${0}.year`, '1');
        for (let index = 1; index < slideValue[0]; index++) {
          appendTopUp({
            year: (index + 1).toString(),
            value: valueTopUp,
          });
        }
      }
    }
  }, [valueTopUp, slideValue]);

  const onAddWithdrawl = useCallback(() => {
    setValue(`withdrawl.${0}.value`, valueWithdrawl);
    if (valueWithdrawl) {
      if (usePeriodYearWithdrawl) {
        setValue(`withdrawl.${0}.year`, slideValue[0].toString());
        for (let index = slideValue[0]; index < slideValue[1]; index++) {
          appendWithdrawl({
            year: (index + 1).toString(),
            value: valueWithdrawl,
          });
        }
      } else {
        setValue(`withdrawl.${0}.year`, '1');
        for (let index = 1; index < slideValue[0]; index++) {
          appendWithdrawl({
            year: (index + 1).toString(),
            value: valueWithdrawl,
          });
        }
      }
    }
  }, [valueWithdrawl, slideValue]);

  const onSave = async () => {
    const topupValue = getValues().topUp
    const params = [
      {
        key: 'calculatorTopup',
        value: JSON.stringify(topupValue),
      },
      {
        key: 'calculatorWithdrawl',
        value: JSON.stringify(getValues().withdrawl),
      },
    ] as TObjectSQSByKey[];
    const isTopupEmpty = topupValue.find(({ value }) => value === '')
    if (isTopupEmpty && !isEqual(initialTopup.current, topupValue)) {
      params.push({
        key: 'fundTopup',
        value: ''
      })
    }
    await updateSQSByKey(RSQSData?.sqsId ?? '', params);
    navigation.dispatch(StackActions.replace(EposRoutes.CALCULATOR));
  };

  //Validation handle masih kasar karena butuh cepet
  const checkValues = (data: any, wording: string) => {
    const array: ErrorMessageStateObject[] = [];
    data.forEach((item: any, i: number) => {
      if (wording === 'topUp') {
        if (Number(item.value.replace(/\./g, '')) < 1000000) {
          array.push({ field: i, word: `Minimum Top Up adalah Rp.1.000.000` });
        }
        if (Number(item.value.replace(/\./g, '')) % 1000 !== 0) {
          array.push({ field: i, word: `Jumlah Top Up harus kelipatan 1.000` });
        }
        if(getPeriodInsured(RSQSData) < item.year){
          array.push({field: i, word: `Top-Up tidak dapat dilakukan apabila rencana masa pembayaran Premi kurang dari tahun Top-up`})
        }
      } else if (wording === 'withdrawal') {
        if (Number(item.value.replace(/\./g, '')) % 1000 !== 0) {
          array.push({ field: i, word: `Jumlah Penarikan harus kelipatan 1.000` })
        } else if (Number(item.value.replace(/\./g, '')) < 500000) {
          array.push({ field: i, word: `Minimum penarikan adalah Rp.500.000` });
        } else {
          array.push({ field: i, word: '' });
        }
      }

    });

    setErrorMessage((prevState: ErrorMessageState) => ({
      ...prevState,
      [wording]: array,
    }));
    const filteredArray = array.filter(val => val.word !== '');
    const isPassed = filteredArray.length < 1;
    return isPassed;
  };

  const getValidation = (
    topUp: any[],
    withdrawal: any[],
    withdrawalValidToCheck: boolean,
    topUpValidToCheck: boolean,
  ) => {
    let topUpValid = true;
    let widthdrawalValid = true;
    if (topUpValidToCheck) topUpValid = checkValues(topUp, 'topUp');
    if (withdrawalValidToCheck) widthdrawalValid = checkValues(withdrawal, 'withdrawal');

    // Jika validasi gagal untuk kedua jenis, pastikan errorMessage diperbarui dengan pesan kesalahan yang sesuai
    if (!topUpValid || !widthdrawalValid) {
      setErrorMessage((prevState: ErrorMessageState) => ({
        ...prevState,
        topUp: topUp.length > 0 ? prevState.topUp : [],
        withdrawal: withdrawal.length > 0 ? prevState.withdrawal : [],
      }));
    }

    return topUpValid && widthdrawalValid;
  };
  //Validation handle end

  const showModalSameBalance = () => {
    GlobalPromptModal.show({
      title: 'Informasi',
      subtitle:
        'Pilihan Dana Investasi Saldo Unit Premi Top-up akan disamakan dengan Pilihan Dana Investasi Saldo Unit Premi Berkala',
      buttonPrimary: {
        text: 'OK',
        onPress: () => {
          GlobalPromptModal.close();
          onSave();
        },
      },
    });
  };

  const setSameBalanceTopupPercentage = useCallback(async () => {
    const fund = RSQSData?.fund ? JSON.parse(RSQSData.fund) : {};
    const params = [
      {
        key: 'fundTopup',
        value: JSON.stringify(fund),
      },
    ];
    //@ts-ignore
    await updateSQSByKey(RSQSData?.sqsId ?? '', params);
  }, [RSQSData?.sqsId, RSQSData?.fund]);

  const showModalSetBalance = () => {
    GlobalPromptModal.show({
      title: 'Informasi',
      subtitle:
        'Apakah pilihan Dana Investasi Saldo Unit Premi Top-up akan disamakan dengan Pilihan Dana Investasi Saldo Unit Premi Berkala?',
      buttonPrimary: {
        text: 'Ya',
        onPress: () => {
          GlobalPromptModal.close();
          setSameBalanceTopupPercentage();
          setTimeout(() => {
            showModalSameBalance();
          }, 600);
        },
      },
      buttonSecondary: {
        text: 'Tidak',
        onPress: () => {
          GlobalPromptModal.close();
          navigation.dispatch(StackActions.replace(EposRoutes.INVESTMENT_FUND));
        },
      },
    });
  };

  const onContinue = useCallback(() => {
    setErrorMessage({ topUp: [], withdrawal: [] });
    const topUp = getValues('topUp');
    const withdrawl = getValues('withdrawl');
    const withdrawalValidToCheck = withdrawl.every((item) => item.value !== '' || item.year !== '');
    const topUpValidToCheck = topUp.every((item) => item.value !== '' || item.year !== '');
    const isPassed = getValidation(topUp, withdrawl, withdrawalValidToCheck, topUpValidToCheck);
    if (withdrawalValidToCheck || topUpValidToCheck) {
      if (isPassed) {
        if (RSQSData?.fundTopup && JSON.parse(RSQSData?.fundTopup).length > 0) {
          onSave();
          return;
        }
        showModalSetBalance();
        return;
      }
      return;
    }
    onSave();
  }, [RSQSData?.fundTopup, onSave, getValues, getValidation, showModalSetBalance]);

  const onChangeSliderTopup = (val: any) => {
    !usePeriodYear ? setSlideValue([val, 0]) : setSlideValue(val);
  };

  const onChangeSwitchTopup = (value: any) => {
    setSlideValue([1, param.value || 10]);
    setUsePeriodYear(value);
  };

  const onSaveTopup = () => {
    onAddTopUp();
    setVisible(false);
    // removeTopUp(0)
  };

  const onCloseModalTopup = () => {
    setSlideValue([1, param.value || 0]);
    setVisible(false);
  };

  const onSetTopupValue = (value: string) => onChangeNumber(value, setvalueTopUp);

  const onCloseModalWithdrawal = () => {
    setSlideValue([1, param.value || 10]);
    setVisibleWithdrawl(false);
  };

  const onChangeSliderWithdrawal = (val: any) => {
    !usePeriodYearWithdrawl ? setSlideValue([val, 0]) : setSlideValue(val);
  };

  const onSetValueWithdrawal = (value: string) => {
    onChangeNumber(value, setvalueWithdrawl);
  };

  const onChangeSwitchWithdrawal = (value: any) => {
    setSlideValue([1, param.value || 10]);
    setUsePeriodYearWithdrawl(value);
  };

  const onSaveWithdrawal = () => {
    onAddWithdrawl();
    setVisibleWithdrawl(false);
    // removeTopUp(0)
  };

  const renderAlert = (index: number) => {
    if(errorMessage.topUp.length){
      const _alertMaps = errorMessage.topUp.filter(item => {
        return item.field === index
      })
      if(_alertMaps.length > 0){
        return _alertMaps.map((item) => <NoticeBar message={item.word} type={'BLOCKED'} />)
      }
      return <></>
    }
    return <></>
  }

  const Currency = useMemo(() => <Text style={[plaiStyles.fontGrey66, plaiStyles.font16]}>IDR</Text>, []);
  return (
    <PruScreen>
      <PruHeader
        headerText="Top Up / Penarikan"
        leftIcon="arrow_back"
        onLeftPress={() => navigation.dispatch(StackActions.replace(EposRoutes.CALCULATOR))}
      />
      <View style={[plaiStyles.pb16, plaiStyles.flex]}>
        <ScrollView style={plaiStyles.px16}>
          <SectionTitle text="Top Up" />
          {FieldTopUp.map((fields: any, index: number) => {
            return (
              <View key={fields.id}>
                <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
                  <Controller
                    name={`topUp.${index}.year`}
                    control={control}
                    rules={{ required: `${t('Calculator:substandart_type_required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        required={false}
                        containerStyle={TWStyles.inputLeft}
                        label={'Tahun'}
                        placeholder={t('Calculator:enter_year')}
                        value={value}
                        setValue={(value: string) => {
                          onChangeNumber(value, onChange);
                        }}
                        keyboardType="phone-pad"
                        maxLength={3}
                      />
                    )}
                  />
                  <Controller
                    name={`topUp.${index}.value`}
                    control={control}
                    rules={{ required: `${t('Calculator:substandart_type_required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        required={false}
                        containerStyle={TWStyles.inputRight}
                        label={t('Calculator:topup_amount')}
                        placeholder=" Top Up"
                        value={value}
                        setValue={(value: any) => onChangeNumber(value, onChange)}
                        leftItem={Currency}
                        keyboardType="phone-pad"
                      />
                    )}
                  />
                </View>
                {renderAlert(index)}
                {FieldTopUp.length > 1 && (
                  <View>
                    <Button
                      style={[
                        plaiStyles.flex,
                        plaiStyles.row,
                        plaiStyles.py8,
                        plaiStyles.borderGreycc,
                        plaiStyles.mt24,
                      ]}
                      onPress={() => {
                        removeTopUp(index);
                      }}
                    >
                      <PruIconFont style={plaiStyles.pr10} name={'delete'} size={16} color={color.grey33} />
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.ml10]}>{t('Calculator:remove')}</Text>
                    </Button>
                  </View>
                )}
              </View>
            );
          })}

          <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
            textStyle={plaiStyles.fontRed}
            text={t('Calculator:add_topup')}
            onPress={() => {
              setErrorMessage({ topUp: [], withdrawal: [] });
              setVisible(true);
            }}
          />
          <Button
            style={[plaiStyles.borderGreycc, plaiStyles.mt16]}
            textStyle={plaiStyles.fontGrey33}
            text="Reset Top Up"
            onPress={() => {
              setSlideValue([1, param.value]);
              setValue('topUp.0.year', '');
              setValue('topUp.0.value', '');
              setValue('topUp', [{ year: '', value: '' }]);
              setErrorMessage({ topUp: [], withdrawal: [] });
            }}
          />

          <SectionTitle text={t('Calculator:withdrawal')} />
          {FieldWithdrawl.map((fields: any, index: number) => {
            return (
              <View key={fields.id}>
                <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
                  <Controller
                    name={`withdrawl.${index}.year`}
                    control={control}
                    rules={{ required: `${t('Calculator:substandart_type_required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        required={false}
                        containerStyle={TWStyles.inputLeft}
                        label={'Tahun'}
                        placeholder="Masukan Tahun"
                        value={value}
                        setValue={(value: string) => {
                          onChangeNumber(value, onChange);
                        }}
                        keyboardType="phone-pad"
                        maxLength={3}
                      />
                    )}
                  />
                  <Controller
                    name={`withdrawl.${index}.value`}
                    control={control}
                    rules={{ required: `${t('Calculator:substandart_type_required')}` }}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        required={false}
                        containerStyle={TWStyles.inputRight}
                        label={'Jumlah Penarikan'}
                        placeholder="Penarikan"
                        value={value}
                        setValue={(value: any) => onChangeNumber(value, onChange)}
                        leftItem={Currency}
                        keyboardType="phone-pad"
                      />
                    )}
                  />
                </View>
                {errorMessage.withdrawal.length ? (
                  errorMessage.withdrawal[index].word && errorMessage.withdrawal[index]?.field !== -1 && (
                    <NoticeBar message={errorMessage.withdrawal[index].word} type={'BLOCKED'} />
                  )
                ) : (
                  <></>
                )}
                {FieldWithdrawl.length > 1 && (
                  <View>
                    <Button
                      style={[
                        plaiStyles.flex,
                        plaiStyles.row,
                        plaiStyles.py8,
                        plaiStyles.borderGreycc,
                        plaiStyles.mt24,
                      ]}
                      onPress={() => {
                        removeWithdrawl(index);
                      }}
                    >
                      <PruIconFont style={plaiStyles.pr10} name={'delete'} size={16} color={color.grey33} />
                      <Text style={[plaiStyles.fontGrey33, plaiStyles.ml10]}>{t('Calculator:remove')}</Text>
                    </Button>
                  </View>
                )}
              </View>
            );
          })}
          <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
            textStyle={plaiStyles.fontRed}
            text={t('Calculator:add_withdrawal')}
            onPress={() => {
              setErrorMessage({ topUp: [], withdrawal: [] });
              setVisibleWithdrawl(true);
            }}
          />
          <Button
            style={[plaiStyles.borderGreycc, plaiStyles.mt16]}
            textStyle={plaiStyles.fontGrey33}
            text={t('Calculator:reset_withdrawal')}
            onPress={() => {
              setValue('withdrawl.0.year', '');
              setValue('withdrawl.0.value', '');
              setValue('withdrawl', [{ year: '', value: '' }]);
              setErrorMessage({ topUp: [], withdrawal: [] });
            }}
          />
        </ScrollView>

        <ModalTopupWithdrawal
          isShow={visible}
          variant="top-up"
          onClose={onCloseModalTopup}
          isUsePeriodYear={usePeriodYear}
          maxValue={param?.value as number}
          setSlideValue={setSlideValue}
          slideValue={slideValue}
          onSetValue={onSetTopupValue}
          onChangeSlider={onChangeSliderTopup}
          onChangeSwitch={onChangeSwitchTopup}
          value={valueTopUp}
          onSave={onSaveTopup}
        />
        <ModalTopupWithdrawal
          isShow={visibleWithdrawl}
          variant="withdrawal"
          onClose={onCloseModalWithdrawal}
          isUsePeriodYear={usePeriodYearWithdrawl}
          slideValue={slideValue}
          onChangeSlider={onChangeSliderWithdrawal}
          onSetValue={onSetValueWithdrawal}
          value={valueWithdrawl}
          onChangeSwitch={onChangeSwitchWithdrawal}
          maxValue={param?.value as number}
          onSave={onSaveWithdrawal}
          setSlideValue={setSlideValue}
        />
        <View style={TWStyles.footerHeader}>
          <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
            textStyle={plaiStyles.fontRed}
            text={t('Calculator:remove_data')}
            onPress={() => {
              setValue('topUp', DefaultTWData.topUp);
              setValue('withdrawl', DefaultTWData.withdrawl);
              setValue('topUp.0.year', '');
              setValue('topUp.0.value', '');
              setValue('withdrawl.0.year', '');
              setValue('withdrawl.0.value', '');
            }}
          />
          <Button
            style={[plaiStyles.bgBtnRed, plaiStyles.mt16]}
            textStyle={plaiStyles.fontWhite}
            text={t('Calculator:save_continue')}
            onPress={() => {
              onContinue();
            }}
          />
        </View>
      </View>
    </PruScreen>
  );
};

//#region
function getPeriodInsured(RSQSData: any){
  if(RSQSData.calculator){
    return Number(JSON.parse(RSQSData?.calculator).mainBenefits[0].periodInsured.key || '0')
  }
  return 0
}
//#endregion
