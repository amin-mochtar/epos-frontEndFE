import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputField, SignaturePad, plaiStyles, sanitizedLetterText } from 'plai_common_frontend'
import moment from 'moment'
import { Controller, useFormContext } from 'react-hook-form';
import { ValidationForm } from '../../utilities';
import { SignatureTime } from '../signature-time/signature-time';
import { useTranslation } from 'react-i18next';
import { Button } from 'common_ui_components/app/components-ui';
import { pruTestID } from 'common_services_frontend';


type TSignatureForm = {
  title: string,
  onStrokeStart?: () => void,
  onStrokeEnd?: () => void,
  signature: string,
  location: string,
  signatureDate: string,
}

type TSignature = {
  [key: string]: any
}

export const SignatureForm = ({
  title,
  onStrokeStart,
  onStrokeEnd,
  signature,
  location,
  signatureDate }: TSignatureForm) => {

  const {
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<TSignature>();

  const { t } = useTranslation();
  const getSignature = watch(signature)
  const getSignatureDate = getValues(signatureDate)
  const [isSignature, setIsSignature] = useState(!!getSignature)

  useEffect(() => {
    if (!getSignature) {
      setValue(location, '')
      setValue(signatureDate, '')
    }

  }, [getSignature, setValue])

  return (
    <>
      <Text
        style={[
          plaiStyles.fontGrey33Bold,
          plaiStyles.mt16,
          plaiStyles.mb16,
          plaiStyles.lineH24,
          plaiStyles.font16,
        ]}
      >
        {title}
      </Text>

      <Controller
        name={signature}
        control={control}
        rules={ValidationForm({ isRequired: true })}
        render={({ field: { value, onChange } }) => (
          <>
            {!isSignature ? (
              <Button
                style={[plaiStyles.bgBtnSecondary, plaiStyles.mb24]}
                textStyle={plaiStyles.fontRed}
                text={t('Epos:start_signature')}
                onPress={setIsSignature}
                {...pruTestID(`start-button-${signature}`)}
              />
            )
              : (<SignaturePad
                textReset={t('Epos:replay')}
                textSave={t('Epos:save')}
                value={value}
                fileType='png'
                onChange={(item: any) => {
                  setValue(signatureDate, moment());
                  onChange(item);
                }}
                onStrokeStart={onStrokeStart}
                onStrokeEnd={onStrokeEnd}
                error={errors[signature]}
                testID={signature}
                isUseCanvasPathChangeForConditional={true}
              />)}
          </>
        )}
      />

      {isSignature && (
        <>
          <Controller
            name={location}
            control={control}
            rules={ValidationForm({ isRequired: true })}
            render={({ field: { onChange, value } }) => (
              <InputField
                label={t('Epos:place')}
                placeholder={t('Epos:enter_place')}
                value={value}
                setValue={(item) => onChange(sanitizedLetterText(item))}
                error={errors[location]}
                id={`input-place-${signature}`}
              />
            )}
          />
          <View style={[plaiStyles.mb24]}>
            <SignatureTime signature={getSignature} date={getSignatureDate} />
          </View>
        </>
      )}
    </>
  )
}
