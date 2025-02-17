import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { InputField, SignaturePad, plaiStyles } from 'plai_common_frontend';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import { useTranslation } from 'react-i18next';
import { SectionInfoPerson, SignatureTime } from '../../../../components';
import { Button } from 'common_ui_components/app/components-ui';

type Props = {
  control: Control<UpfrontDecisionModel.FormAbr>;
  errors: FieldErrors<UpfrontDecisionModel.FormAbr>;
  agent_name: string;
  agent_code: string;
  agentSignDate: string;
  showDate: boolean;
  showSignature: boolean;
  signature: string
  onChangeSignature: (base64Uri: string | null, onChange: () => void) => void;
  onChangeShowSignature: () => void;
};

const AgentSignature: FC<Props> = ({
  agent_code,
  agent_name,
  onChangeSignature,
  onChangeShowSignature,
  control,
  errors,
  agentSignDate,
  showDate,
  signature,
  showSignature,
}) => {
  const { t } = useTranslation();

  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.mb8]}>
      <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.mb16]}>Tanda Tangan Tenaga Pemasar</Text>
      <SectionInfoPerson
        containerStyle={[plaiStyles.mt12, plaiStyles.mb16]}
        type='agent'
        keyLeft={agent_name}
        keyRight={agent_code}
      />
      <Text style={[plaiStyles.fontGrey33, plaiStyles.font16, plaiStyles.mb16]}>Tanda tangan Pemasar</Text>
      {showSignature ? (
        <>
          <Controller
            control={control}
            name="agent_signature.e_sign"
            rules={ValidationForm({ isRequired: true })}
            render={({ field: { value, onChange } }) => (
              <SignaturePad
                textReset={t('Epos:replay')}
                textSave={t('Epos:save')}
                fileType='png'
                value={value}
                onChange={(base64Uri: string | null) => {
                  onChangeSignature(base64Uri, onChange);
                }}
                error={errors?.['agent_signature']?.['e_sign']}
              />
            )}
          />
          <Controller
            name="agent_signature.location"
            control={control}
            rules={ValidationForm({ isRequired: true })}
            render={({ field: { value, onChange } }) => (
              <InputField
                label="Tempat"
                placeholder="Masukkan lokasi tanda tangan"
                value={value}
                setValue={onChange}
                error={errors?.['agent_signature']?.['location']}
              />
            )}
          />
          {showDate && <SignatureTime date={agentSignDate} signature={signature} />}
        </>
      ) : (
        <Button
          style={[plaiStyles.bgBtnSecondary]}
          textStyle={plaiStyles.fontRed}
          text={t('Epos:start_signature')}
          onPress={onChangeShowSignature}
        />
      )}
    </View>
  );
};

export default AgentSignature;
