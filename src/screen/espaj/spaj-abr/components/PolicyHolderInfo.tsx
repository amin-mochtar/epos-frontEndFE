import { View } from 'react-native';
import React, { FC } from 'react';
import { InputField, plaiStyles } from 'plai_common_frontend';
import { SectionTitle } from '../../../../components';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';

type Props = {
  control: Control<UpfrontDecisionModel.FormAbr>;
  errors: FieldErrors<UpfrontDecisionModel.FormAbr>;
  labelLifeStyle: string;
  labelFamilyBackground: string;
  labelEducationalBackground: string;
};

const PolicyHolderInfo: FC<Props> = ({
  control,
  errors,
  labelLifeStyle,
  labelFamilyBackground,
  labelEducationalBackground,
}) => {
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.mb8]}>
      <SectionTitle text="Informasi Pemegang Polis" wrapperStyle={[plaiStyles.mt0, plaiStyles.mb24]} />
      <Controller
        control={control}
        name="policy_holder_info.life_style"
        rules={ValidationForm({ isRequired: true, maxLength: 5000 })}
        render={({ field: { onChange, value } }) => (
          <InputField
            setValue={onChange}
            value={value}
            label={labelLifeStyle}
            placeholder={'Masukkan Informasi'}
            error={errors?.policy_holder_info?.life_style}
            containerStyle={[plaiStyles.mb16, plaiStyles.mt0]}
            multiline
            maxLength={5000}
            rightItem="5000/5000"
          />
        )}
      />
      <Controller
        control={control}
        name="policy_holder_info.family_background"
        rules={ValidationForm({ isRequired: true, maxLength: 5000 })}
        render={({ field: { onChange, value } }) => (
          <InputField
            setValue={onChange}
            value={value}
            label={labelFamilyBackground}
            placeholder={'Masukkan Informasi'}
            error={errors?.policy_holder_info?.family_background}
            containerStyle={[plaiStyles.mb16, plaiStyles.mt0]}
            multiline
            maxLength={5000}
            rightItem="5000/5000"
          />
        )}
      />
      <Controller
        control={control}
        name="policy_holder_info.educational_background"
        rules={ValidationForm({ isRequired: true, maxLength: 5000 })}
        render={({ field: { onChange, value } }) => (
          <InputField
            setValue={onChange}
            value={value}
            label={labelEducationalBackground}
            placeholder={'Masukkan Informasi'}
            error={errors?.policy_holder_info?.educational_background}
            containerStyle={[plaiStyles.mt0]}
            multiline
            maxLength={5000}
            rightItem="5000/5000"
          />
        )}
      />
    </View>
  );
};

export default PolicyHolderInfo;
