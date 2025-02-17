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

const AgentPovReview: FC<Props> = ({ control, errors }) => {
  const label =
    'Mohon tuliskan pandangan Anda terhadap \n{Calon Pemegang Polis / Tertanggung} \nbaik hal positif maupun negatif, \nyang didasarkan pada informasi yang \nsesuai fakta';
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.mb8]}>
      <SectionTitle text="Pandangan Tenaga Pemasar" wrapperStyle={[plaiStyles.mt0, plaiStyles.mb24]} />
      <Controller
        control={control}
        name="agent_pov_review"
        rules={ValidationForm({ isRequired: true, maxLength: 5000 })}
        render={({ field: { onChange, value } }) => (
          <InputField
            setValue={onChange}
            value={value}
            label={label}
            placeholder={'Masukkan Informasi'}
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

export default AgentPovReview;
