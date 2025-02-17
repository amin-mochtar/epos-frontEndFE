import { View } from 'react-native';
import React, { FC } from 'react';
import { InputField, plaiStyles } from 'plai_common_frontend';
import { OptionCard, SectionTitle } from '../../../../components';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm, statement } from '../../../../utilities';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors: FieldErrors<UpfrontDecisionModel.FormLsar>;
  isNeedBankcruptcyDesc: boolean;
};

const CustomerBankcruptcy: FC<Props> = ({ control, errors, isNeedBankcruptcyDesc }) => {
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.my8]}>
      <SectionTitle text="Informasi Kebangkrutan" wrapperStyle={[plaiStyles.mt0]} />
      <Controller
        name={'bankruptcy_info'}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { value, onChange } }) => (
          <>
            <OptionCard
              label="Apakah Anda pernah mengalami keadaan bangkrut atau pernah menjadi direktur dari sebuah perusahaan yang dalam keadaan bangkrut?"
              data={statement}
              required={true}
              theme="border"
              style={[plaiStyles.row]}
              spaceItem={8}
              insideStyle={[plaiStyles.flex]}
              selected={value}
              onSelected={(value) => {
                onChange(value);
              }}
            />
            {isNeedBankcruptcyDesc && (
              <Controller
                name={'bankruptcy_info.bankruptcy_desc'}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { value, onChange } }) => (
                  <InputField
                    setValue={onChange}
                    value={value ?? ''}
                    label="Keterangan"
                    placeholder={'Masukkan keterangan'}
                    error={errors?.bankruptcy_info?.bankruptcy_desc}
                    containerStyle={[plaiStyles.mb16, plaiStyles.mt24]}
                    maxLength={100}
                    required={true}
                    rightItem=''
                  />
                )}
              />
            )}
          </>
        )}
      />
    </View>
  );
};

export default CustomerBankcruptcy;
