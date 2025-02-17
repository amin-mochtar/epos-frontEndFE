import { View } from 'react-native';
import React, { FC } from 'react';
import { SectionTitle } from '../../../../components';
import { InputField, plaiStyles } from 'plai_common_frontend';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';

type Props = {
  control: Control<UpfrontDecisionModel.FormAbr>;
  errors: FieldErrors<UpfrontDecisionModel.FormAbr>;
};

const PolicyApplicationInfo: FC<Props> = ({ control, errors }) => {
  const label = 'Mohon jelaskan bagaimana awal mula\npengajuan Aplikasi Calon Tertanggung';
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.mb8]}>
      <SectionTitle text="Informasi Pengajuan Polis" wrapperStyle={[plaiStyles.mt0, plaiStyles.mb24]} />
      <Controller
        control={control}
        name="policy_application_reason"
        rules={ValidationForm({ isRequired: true, maxLength: 5000 })}
        render={({ field: { onChange, value } }) => (
          <InputField
            setValue={onChange}
            value={value}
            label={label}
            placeholder={'Masukkan Penjelasan'}
            error={errors?.policy_application_reason}
            containerStyle={(plaiStyles.mb16, plaiStyles.mt0)}
            multiline
            maxLength={5000}
            rightItem="5000/5000"
          />
        )}
      />
    </View>
  );
};

export default PolicyApplicationInfo;
