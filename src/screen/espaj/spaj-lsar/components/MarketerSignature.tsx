import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { InputField, SignaturePad, plaiStyles } from 'plai_common_frontend';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import { useTranslation } from 'react-i18next';
import { SectionInfoPerson, SignatureTime } from '../../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { TAction } from '../config';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors: FieldErrors<UpfrontDecisionModel.FormLsar>;
  marketer_name: string;
  marketer_code: string;
  marketerSignDate: string;
  showDate: boolean;
  showSignature: boolean;
  signature: string;
  onChangeShowSignature: (action: TAction['type'], payload: boolean) => void;
  onChangeSignature: (base64Uri: string | null, onChange: () => void) => void;
};

const MarketerSignature: FC<Props> = ({
  marketer_code,
  marketer_name,
  onChangeSignature,
  onChangeShowSignature,
  control,
  errors,
  marketerSignDate,
  showDate,
  showSignature,
  signature,
}) => {
  const { t } = useTranslation();
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.mb8]}>
      <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.mb16]}>Tanda Tangan Tenaga Pemasar</Text>
      <SectionInfoPerson
        containerStyle={[plaiStyles.mt12, plaiStyles.mb16]}
        type='agent'
        keyLeft={marketer_name}
        keyRight={marketer_code}
      />
      <Text style={[plaiStyles.fontGrey33, plaiStyles.font16, plaiStyles.mb16]}>Tanda tangan Pemasar</Text>
      {showSignature ? (
        <>
          <Controller
            control={control}
            name="marketer_signature.e_sign"
            rules={ValidationForm({ isRequired: true })}
            render={({ field: { value, onChange } }) => (
              <SignaturePad
                textReset={t('Epos:replay')}
                textSave={t('Epos:save')}
                value={value}
                fileType='png'
                onChange={(base64Uri: string | null) => {
                  onChangeSignature(base64Uri, onChange);
                }}
                error={errors?.['marketer_signature']?.['e_sign']}
              />
            )}
          />
          <Controller
            name="marketer_signature.location"
            control={control}
            rules={ValidationForm({ isRequired: true })}
            render={({ field: { value, onChange } }) => (
              <InputField
                label="Tempat"
                placeholder="Masukkan lokasi tanda tangan"
                value={value}
                setValue={onChange}
                error={errors?.['marketer_signature']?.['location']}
              />
            )}
          />
          {showDate && <SignatureTime date={marketerSignDate} signature={signature} />}
        </>
      ) : (
        <Button
          style={[plaiStyles.bgBtnSecondary]}
          textStyle={plaiStyles.fontRed}
          text={t('Epos:start_signature')}
          onPress={() => onChangeShowSignature('SET_SHOW_AGENT_SIGNATURE', true)}
        />
      )}
    </View>
  );
};

export default MarketerSignature;
