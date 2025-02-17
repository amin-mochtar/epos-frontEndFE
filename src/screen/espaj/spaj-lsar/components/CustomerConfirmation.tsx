import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { SectionTitle } from '../../../../components';
import { InputField, onChangeNumber, plaiStyles } from 'plai_common_frontend';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors?: FieldErrors<UpfrontDecisionModel.FormLsar>;
};

const CustomerConfirmation: FC<Props> = ({ control, errors }) => {
  const sanitizedLetterTextUpperCase = (value: string) => {
    if (value !== undefined && value !== null) {
      const result = value.replace(/^\s+|[^a-zA-Z\s]/g, '');
      return result.toUpperCase();
    }
  };
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite]}>
      <SectionTitle text="Konfirmasi Nasabah" wrapperStyle={[plaiStyles.mt0]} />
      <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.my24]}>Halaman ini berisi data finansial dari nasabah.</Text>
      <Controller
        control={control}
        name="customer_confirmation.full_name"
        rules={ValidationForm({
          isRequired: true,
          maxLength: 60,
          minLength: 3,
          pattern: {
            value: /^[a-zA-Z]+(?:\s?[a-zA-Z]+)*$/,
            message: 'Format penulisan tidak sesuai',
          },
        })}
        render={({ field: { onChange, value } }) => (
          <InputField
            required={false}
            label="Nama Lengkap"
            placeholder='Masukkan nama lengkap'
            setValue={(item) => onChange(sanitizedLetterTextUpperCase(item))}
            value={value}
            containerStyle={plaiStyles.mt0}
            error={errors?.customer_confirmation?.full_name}
            maxLength={60}
            editable={false}
          />
        )}
      />
      <Controller
        control={control}
        name="customer_confirmation.years_known_marketers"
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { onChange, value } }) => (
          <View>
            <InputField
              label="Lama Mengenal Tenaga Pemasar"
              placeholder="Masukkan angka"
              setValue={(value) => onChangeNumber(value, onChange)}
              value={value}
              keyboardType="numeric"
              maxLength={2}
              error={errors?.customer_confirmation?.years_known_marketers}
            />
            <Text style={[plaiStyles.fontGrey33, plaiStyles.font16, styles.yearStyle]}>Tahun</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomerConfirmation;

const styles = StyleSheet.create({
  yearStyle: { position: 'absolute', right: 0, bottom: 8 },
});
