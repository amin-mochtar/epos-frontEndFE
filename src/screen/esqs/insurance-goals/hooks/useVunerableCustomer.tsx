import { Trans, useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { plaiStyles, setMultipleSelect } from 'plai_common_frontend';
import { useCallback, useEffect, useState } from 'react';
import { OptionCard, SectionTitle, TOptionalCardData } from '../../../../components';
import { additionalValidationSPAJModal, TCommonOptionalData, TVulnerable, ValidationForm, vulnerableCustomerAgreementList } from '../../../../utilities';


type THook = {
  onSelectNone?: () => void;
  initialValue?: TVulnerable;
};

const defaultVulnerable = {
  vulnerableCustomerPrimary: [],
  vulnerableCustomerSub: {
    pergerakan: [],
    intelect: [],
    mental: [],
    none: [],
  },
  vulnerableCustomerAdditional: undefined,
};

const defaultCheckbox = {
  pergerakan: false,
  intelect: false,
  mental: false,
};

export default function useVunerableCustomer({ onSelectNone, initialValue }: THook) {
  const {
    control,
    resetField,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<TVulnerable>({ defaultValues: initialValue ? initialValue : defaultVulnerable });
  const { t } = useTranslation();
  const [isShowCheckbox, setisShowCheckbox] = useState<TCommonOptionalData>(defaultCheckbox);
  const checkBoxHandler = useCallback(
    (item: TCommonOptionalData) => {
      const keyValidation = item.key as string;
      if (keyValidation === 'none') {
        setisShowCheckbox(defaultCheckbox);
        return;
      }
      const selected = { [keyValidation]: !isShowCheckbox[keyValidation] };
      setisShowCheckbox((prev) => ({ ...prev, ...selected }));
    },
    [isShowCheckbox],
  );

  const onPressNone = useCallback((item: TOptionalCardData) => {
    if (item.key == 'N') {
      onSelectNone?.();
      resetField('vulnerableCustomerAdditional');
      return;
    }
    setValue('vulnerableCustomerAdditional', item as TCommonOptionalData);
  }, []);

  useEffect(() => {
    if (initialValue) {
      initialValue.vulnerableCustomerPrimary.map((item) => {
        setisShowCheckbox((prev) => ({ ...prev, [item.key as string]: true }));
      });
    }
  }, []);

  const VulnerableModule = () => {
    return (
      <>
        <SectionTitle wrapperStyle={plaiStyles.mt16} text={t('Epos:vulnerable_customer')} />
        <View style={[plaiStyles.borderDefault, plaiStyles.px16, plaiStyles.py16, plaiStyles.mt16, plaiStyles.mb24]}>
          <Text style={[plaiStyles.fontGrey33Thin]}>
            <Trans
              i18nKey="Epos:vulnerable_customer_question"
              components={{ i: <Text style={[plaiStyles.fontItalic]} /> }}
            />
            <Text style={plaiStyles.fontRed}> *</Text>
          </Text>
          <Controller
            name={'vulnerableCustomerPrimary'}
            control={control}
            rules={ValidationForm({ isRequired: true })}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <OptionCard
                    type="checkbox"
                    theme="border"
                    data={vulnerableCustomerAgreementList}
                    selected={value}
                    onSelected={(item) => {
                      onChange(setMultipleSelect([...value], item, 'key'));
                      checkBoxHandler(item as { [key: string]: string });
                    }}
                    onDisabled={(item: TOptionalCardData) =>
                      (value?.find((e) => e.key !== 'none') && item.key == 'none') ||
                      (value?.find((e) => e.key === 'none') && item.key !== 'none') ||
                      false
                    }
                    uniqueTestId='vulnerable-customer'
                  />
                </>
              );
            }}
          />
          {isShowCheckbox.pergerakan && (
            <>
              <Text style={[plaiStyles.mt24, plaiStyles.mb16, plaiStyles.font14]}>
                {t('Pilih Jenis Disabilitas Pergerakan')}
                <Text style={plaiStyles.fontRed}> *</Text>
              </Text>
              <Controller
                name={'vulnerableCustomerSub.pergerakan'}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value = [] } }) => {
                  return (
                    <>
                      <OptionCard
                        type="checkbox"
                        theme="border"
                        data={vulnerableCustomerAgreementList[0].sub}
                        selected={value as TOptionalCardData[]}
                        onSelected={(item) => {
                          onChange(setMultipleSelect([...value], item, 'key'));
                        }}
                        uniqueTestId='vulnerable-customer-pergerakan'
                      />
                    </>
                  );
                }}
              />
            </>
          )}
          {isShowCheckbox.intelect && (
            <>
              <Text style={[plaiStyles.mt24, plaiStyles.mb16, plaiStyles.font14]}>
                {t('Pilih Jenis Disabilitas Intelektual')}
                <Text style={plaiStyles.fontRed}> *</Text>
              </Text>
              <Controller
                name={'vulnerableCustomerSub.intelect'}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value = [] } }) => {
                  return (
                    <>
                      <OptionCard
                        type="checkbox"
                        theme="border"
                        data={vulnerableCustomerAgreementList[1].sub}
                        selected={value as TOptionalCardData[]}
                        onSelected={(item) => {
                          onChange(setMultipleSelect([...value], item, 'key'));
                        }}
                        uniqueTestId='vulnerable-customer-intelektual'
                      />
                    </>
                  );
                }}
              />
            </>
          )}
          {isShowCheckbox.mental && (
            <>
              <Text style={[plaiStyles.mt24, plaiStyles.mb16, plaiStyles.font14]}>
                {t('Pilih Jenis Disabilitas Mental')}
                <Text style={plaiStyles.fontRed}> *</Text>
              </Text>
              <Controller
                name={'vulnerableCustomerSub.mental'}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value = [] } }) => {
                  return (
                    <>
                      <OptionCard
                        type="checkbox"
                        theme="border"
                        data={vulnerableCustomerAgreementList[2].sub}
                        selected={value as TOptionalCardData[]}
                        onSelected={(item) => {
                          onChange(setMultipleSelect([...value], item, 'key'));
                        }}
                        uniqueTestId='vulnerable-customer-mental'
                      />
                    </>
                  );
                }}
              />
            </>
          )}
          {(isShowCheckbox.pergerakan || isShowCheckbox.intelect || isShowCheckbox.mental) && (
            <Controller
              name={'vulnerableCustomerAdditional'}
              control={control}
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { onChange, value } }) => (
                <>
                  <View style={[plaiStyles.flex, plaiStyles.row]}>
                    <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt16]}>
                      {`Apakah Calon Pemegang Polis cakap hukum dan secara mandiri mampu memahami penjelasan tenaga pemasar produk dan ketentuan polis?`}
                    </Text>
                    <Text style={[plaiStyles.fontRed, plaiStyles.py16]}> *</Text>
                  </View>
                  <OptionCard
                    data={additionalValidationSPAJModal}
                    theme="border"
                    style={[plaiStyles.row]}
                    spaceItem={8}
                    insideStyle={[plaiStyles.flex]}
                    selected={value as TOptionalCardData[]}
                    onSelected={(item) => {
                      onChange(item);
                      onPressNone?.(item);
                    }}
                    uniqueTestId='vulnerable-customer-additional'
                  />
                </>
              )}
            />
          )}
        </View>
      </>
    );
  };

  return { VulnerableModule, isValid, getValues, setValue };
}
