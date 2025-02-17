import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { SectionTitle } from '../../../../components';
import { InputField, onChangeNumber, plaiStyles } from 'plai_common_frontend';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import WithSpacing from './WithView';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors: FieldErrors<UpfrontDecisionModel.FormLsar>;
};

const CustomerDebt: FC<Props> = ({ control, errors }) => {
  const Currency = <Text>IDR</Text>;
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.my8]}>
      <SectionTitle text="Hutang" wrapperStyle={[plaiStyles.mt0, plaiStyles.mb16]} />
      <Controller
        name={'customer_debt.kpr_kpa'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 15 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="KPR/KPA"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              keyboardType="numeric"
              value={value}
              containerStyle={[plaiStyles.mt0]}
              error={errors?.customer_debt?.kpr_kpa}
              placeholder="Masukkan jumlah"
              leftItem={Currency}
              maxLength={15}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_debt.private_loan'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 15 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Pinjaman Pribadi (Kendaraan Bermotor/Lainnya)"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              keyboardType="numeric"
              value={value}
              containerStyle={[plaiStyles.mt0]}
              error={errors?.customer_debt?.private_loan}
              placeholder="Masukkan jumlah"
              leftItem={Currency}
              maxLength={15}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_debt.business_loan'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 15 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Pinjaman Bisnis"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              keyboardType="numeric"
              value={value}
              containerStyle={[plaiStyles.mt0]}
              error={errors?.customer_debt?.business_loan}
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

export default CustomerDebt;
