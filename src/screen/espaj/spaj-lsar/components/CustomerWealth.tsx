import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { InputField, onChangeNumber, plaiStyles } from 'plai_common_frontend';
import { SectionTitle } from '../../../../components';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import WithSpacing from './WithView';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors?: FieldErrors<UpfrontDecisionModel.FormLsar>;
};
const CustomerWealth: FC<Props> = ({ control, errors }) => {
  const Currency = <Text>IDR</Text>;
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite]}>
      <SectionTitle text="Kekayaan Nasabah" wrapperStyle={[plaiStyles.mt0]} />
      <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.my16]}>Mohon diisi dengan perkiraan harga pasar</Text>
      <Controller
        name={'customer_wealth.saving'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 15 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Simpanan Tabungan"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              keyboardType="numeric"
              value={value}
              containerStyle={[plaiStyles.mt0]}
              error={errors?.customer_wealth?.saving}
              placeholder="Masukkan jumlah"
              maxLength={15}
              leftItem={Currency}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_wealth.invest_amount'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 15 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Investasi"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              keyboardType="numeric"
              value={value}
              containerStyle={[plaiStyles.mt0]}
              error={errors?.customer_wealth?.saving}
              placeholder="Masukkan jumlah"
              leftItem={Currency}
              maxLength={15}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_wealth.private_property'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 15 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Tanah, Properti Milik Pribadi"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              keyboardType="numeric"
              value={value}
              containerStyle={[plaiStyles.mt0]}
              error={errors?.customer_wealth?.private_property}
              placeholder="Masukkan jumlah"
              leftItem={Currency}
              maxLength={15}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_wealth.share_ownership_value'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 15 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Ekuitas Bisnis (Nilai Kepemilikan Saham)"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              keyboardType="numeric"
              value={value}
              containerStyle={[plaiStyles.mt0]}
              error={errors?.customer_wealth?.share_ownership_value}
              placeholder="Masukkan jumlah"
              leftItem={Currency}
              maxLength={15}
            />
          </WithSpacing>
        )}
      />
    </View>
  );
};

export default CustomerWealth;
