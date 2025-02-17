import { View } from 'react-native';
import React, { FC } from 'react';
import { SectionTitle } from '../../../../components';
import { DropdownField, InputField, plaiStyles, PROVINCE_DATA, sanitizedLetterText, sanitizedText } from 'plai_common_frontend';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm, } from '../../../../utilities';
import { useTranslation } from 'react-i18next';
import { useZipCode } from '../../../../hooks';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors: FieldErrors<UpfrontDecisionModel.FormLsar>;
  setValue: UseFormSetValue<UpfrontDecisionModel.FormLsar>;
};

const CustomerCompanyAddress: FC<Props> = ({ control, errors, setValue }) => {
  const { t } = useTranslation();
  const { onZipCodeAutoFill } = useZipCode()
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite]}>
      <SectionTitle text="Alamat Perusahaan" wrapperStyle={[plaiStyles.mt0]} />
      <Controller
        name={'customer_company_address.address'}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { onChange, value } }) => (
          <InputField
            label={t('Epos:company_address')}
            placeholder={t('Epos:enter_address')}
            maxLength={44}
            value={value}
            setValue={(value) => onChange(sanitizedLetterText(value))}
            error={errors?.customer_company_address?.address}
            rightItem=""
          />
        )}
      />
      <Controller
        name={'customer_company_address.neighborhood_1'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputField
            required={false}
            label={t('Epos:neighbourdhood1')}
            placeholder={t('Epos:enter_neighbourdhood1')}
            maxLength={3}
            value={value}
            setValue={(value) => onChange(sanitizedText(value))}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        name={'customer_company_address.neighborhood_2'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputField
            required={false}
            label={t('Epos:neighbourdhood2')}
            placeholder={t('Epos:enter_neighbourdhood2')}
            maxLength={3}
            value={value}
            setValue={(value) => onChange(sanitizedText(value))}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        name={'customer_company_address.km'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputField
            required={false}
            label={'KM'}
            placeholder={t('Epos:enter_km')}
            maxLength={3}
            value={value}
            setValue={(value) => onChange(sanitizedText(value))}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        name={'customer_company_address.postal_code'}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { onChange, value } }) => (
          <InputField
            label={t('Epos:post_code')}
            placeholder={t('Epos:enter_post_code')}
            maxLength={5}
            value={value}
            setValue={(value) => onChange(sanitizedText(value))}
            onBlur={() => {
              onZipCodeAutoFill(setValue, ['customer_company_address.district', 'customer_company_address.province', 'customer_company_address.city_regency'], value)
            }}
            error={errors?.customer_company_address?.postal_code}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        name={'customer_company_address.district'}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { onChange, value } }) => (
          <InputField
            label={t('Epos:district')}
            placeholder={t('Epos:enter_district')}
            value={value}
            setValue={(value) => onChange(sanitizedLetterText(value))}
            error={errors?.customer_company_address?.district}
          />
        )}
      />
      <Controller
        name={'customer_company_address.urban_village'}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { onChange, value } }) => (
          <InputField
            label={t('Epos:urban_village')}
            placeholder={t('Epos:enter_urban_village')}
            value={value}
            setValue={(value) => onChange(sanitizedLetterText(value))}
            error={errors?.customer_company_address?.urban_village}
          />
        )}
      />
      <Controller
        name={'customer_company_address.province'}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { onChange, value } }) => (
          <DropdownField
            labelMap={{
              title: t('Epos:provice'),
              placeholder: t('Epos:select_provice'),
            }}
            search={{
              isOnChangeSearch: true,
            }}
            keyMap={{
              search: 'label',
            }}
            data={PROVINCE_DATA}
            selected={value}
            onSelected={onChange}
            error={errors?.customer_company_address?.province}
          />
        )}
      />
      <Controller
        name={'customer_company_address.city_regency'}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { onChange, value } }) => (
          <InputField
            label={t('Epos:city_regency')}
            placeholder={t('Epos:enter_city')}
            value={value}
            setValue={(value) => onChange(sanitizedLetterText(value))}
            error={errors?.customer_company_address?.city_regency}
          />
        )}
      />
    </View>
  );
};

export default CustomerCompanyAddress;
