import { View, Text } from 'react-native'
import React from 'react'
import { plaiStyles } from 'plai_common_frontend'
import moment from 'moment'
import { useTranslation } from 'react-i18next';

export const SignatureTime = ({ date, signature }: { date: string, signature: string }) => {
  const { t } = useTranslation();

  return (
    <View style={[plaiStyles.mt16]}>
      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>{t('Epos:signature_time')}</Text>
      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt8, plaiStyles.mb8]}>{signature ? `${moment(date).format(
        'DD MMMM YYYY',
      )}, ${moment(date).format('HH:mm:ss')}` : '-'}</Text>
    </View>
  )
}
