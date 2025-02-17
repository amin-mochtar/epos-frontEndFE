import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { InputField, SignaturePad, plaiStyles } from 'plai_common_frontend';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import { SignatureTime } from '../../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { TAction } from '../config';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors: FieldErrors<UpfrontDecisionModel.FormLsar>;
  phSignDate: string;
  insuredSignDate: string;
  showDatePh: boolean;
  showDateInsured: boolean;
  showSignaturePh: boolean;
  showSignatureInsured: boolean;
  phSignature: string;
  insuredSignature: string;
  isOther: boolean;
  onChangeShowSignature: (action: TAction['type'], payload: boolean) => void;
  onChangeSignaturePolicyHolder: (base64Uri: string | null, onChange: () => void) => void;
  onChangeSignatureInsured: (base64Uri: string | null, onChange: () => void) => void;
};

type ButtonProps = {
  onClick: () => void;
};

const CustomerSignature: FC<Props> = ({
  control,
  errors,
  onChangeSignatureInsured,
  onChangeSignaturePolicyHolder,
  onChangeShowSignature,
  phSignDate,
  insuredSignDate,
  showDateInsured,
  showDatePh,
  showSignaturePh,
  showSignatureInsured,
  phSignature,
  insuredSignature,
  isOther,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.mb8]}>
        <Text style={[plaiStyles.fontGrey33, plaiStyles.font16, plaiStyles.mb16]}>
          Tanda tangan Calon Pemegang Polis
        </Text>
        {showSignaturePh ? (
          <>
            <Controller
              control={control}
              name="customer_signature.policy_holder.e_sign"
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { value, onChange } }) => (
                <SignaturePad
                  textReset={t('Epos:replay')}
                  textSave={t('Epos:save')}
                  value={value}
                  fileType='png'
                  onChange={(base64Uri: string | null) => {
                    onChangeSignaturePolicyHolder(base64Uri, onChange);
                  }}
                  error={errors?.customer_signature?.['policy_holder']?.['e_sign']}
                />
              )}
            />
            <Controller
              name="customer_signature.policy_holder.location"
              control={control}
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { value, onChange } }) => (
                <InputField
                  label="Tempat"
                  placeholder="Masukkan lokasi tanda tangan"
                  value={value}
                  setValue={onChange}
                  error={errors?.customer_signature?.['policy_holder']?.['location']}
                />
              )}
            />
            {showDatePh && <SignatureTime date={phSignDate} signature={phSignature} />}
          </>
        ) : (
          <ButtonShowSignature onClick={() => onChangeShowSignature('SET_SHOW_PH_SIGNATURE', true)} />
        )}
      </View>

      {isOther && <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.mb8]}>
        <Text style={[plaiStyles.fontGrey33, plaiStyles.font16, plaiStyles.mb16]}>Tanda tangan Calon Tertanggung</Text>
        {showSignatureInsured ? (
          <>
            <Controller
              control={control}
              name="customer_signature.insured.e_sign"
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { value, onChange } }) => (
                <SignaturePad
                  textReset={t('Epos:replay')}
                  textSave={t('Epos:save')}
                  value={value}
                  fileType='png'
                  onChange={(base64Uri: string | null) => {
                    onChangeSignatureInsured(base64Uri, onChange);
                  }}
                  error={errors?.customer_signature?.['insured']?.['e_sign']}
                />
              )}
            />
            <Controller
              name="customer_signature.insured.location"
              control={control}
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { value, onChange } }) => (
                <InputField
                  label="Tempat"
                  placeholder="Masukkan lokasi tanda tangan"
                  value={value}
                  setValue={onChange}
                  error={errors?.customer_signature?.['insured']?.['location']}
                />
              )}
            />
            {showDateInsured && <SignatureTime date={insuredSignDate} signature={insuredSignature} />}
          </>
        ) : (
          <ButtonShowSignature onClick={() => onChangeShowSignature('SET_SHOW_INSURED_SIGNATURE', true)} />
        )}
      </View>}
    </>
  );
};

export default CustomerSignature;

//#region CHILD COMPONENT

const ButtonShowSignature: FC<ButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button
      style={[plaiStyles.bgBtnSecondary]}
      textStyle={plaiStyles.fontRed}
      text={t('Epos:start_signature')}
      onPress={onClick}
    />
  );
};

//#endregion
