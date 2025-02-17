import React, { memo } from 'react'
import { plaiStyles, ShapeItem, TextDecoration } from "plai_common_frontend"
import { Pressable, Text, View } from "react-native"
import { useTranslation } from 'react-i18next'
import { TAgreemnetPolicyElectronic } from './agrement-policy-electronic.type'

export const AgreementPolicyElectronic = memo(({ label, isSelected, onPress, error }: TAgreemnetPolicyElectronic) => {
  const { t } = useTranslation();

  return (
    <>
      <Pressable
        style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt16]}
        onPress={onPress}
      >
        <View style={[plaiStyles.justifyCenter]}>
          <ShapeItem type="box" isSelected={isSelected} />
        </View>
        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.flex, plaiStyles.ml16]}>
          <TextDecoration label={label} />
        </Text>
      </Pressable>
      {error && (
        <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
          {t('Epos:required')}
        </Text>
      )}
    </>
  )
})