import React from 'react';
import { RiskProfileCardType } from './risk-profile-card.type';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { plaiStyles } from 'plai_common_frontend';
import Icon from 'react-native-vector-icons/Feather';
import { PruColor } from 'common_ui_components';
import { RPCStyle } from './risk-profile-card.style';
import { Pressable } from 'react-native';
import { agresifIcon, konservatifIcon, moderatIcon } from '../../../../../assets';


const MAP_RESULT = {
  moderate: {
    primary: '#E05233',
    secondary: '#EBBB13',
    title: 'Moderat',
    description: 'Bersedia untuk menerima risiko sedang',
    longDescription: "Calon Pemegang polis bersedia untuk menerima risiko sedang serta siap dengan tingkat imbal hasil dan risiko fluktuasi yang tidak terlalu besar. Calon Pemegang polis dengan tipe profil risiko ini masih bisa menoleransi risiko dalam berinvestasi tetapi tidak untuk risiko yang besar. Umumnya, Calon Pemegang Polis mengharapkan imbal hasil di atas rata-rata imbal hasil deposito dan memiliki rencana berinvestasi dalam jangka waktu menengah (misalnya antara 5 - 10 tahun)",
    icon: moderatIcon,
  },
  aggressive: {
    primary: '#9A0D0D',
    secondary: '#D51C1C',
    title: 'Agresif',
    description: 'Bersedia untuk menerima risiko tinggi',
    longDescription: "Calon Pemegang polis bersedia untuk menerima risiko yang tinggi, siap dengan tingkat imbal hasil dan risiko fluktuasi yang besar sampai berkurangnya nilai investasi awal. Tipe profil risiko ini biasanya sudah berpengalaman dalam dunia investasi. Umumnya, Calon Pemegang Polis memiliki rencana berinvestasi dalam jangka waktu lebih panjang (misalnya lebih dari 10 tahun).",
    icon: agresifIcon,
  },
  conservative: {
    primary: '#198109',
    secondary: '#80BA35',
    title: 'Konservatif',
    description: 'Bersedia untuk menerima risiko rendah',
    longDescription: "Calon Pemegang polis hanya bersedia untuk menerima risiko paling rendah (risiko fluktuasi rendah), menginginkan investasi yang relatif aman dan tingkat imbal hasil yang cenderung stabil. Dalam kondisi pasar yang kurang baik, Calon Pemegang Polis lebih mementingkan untuk menjaga aset dan kas yang dimiliki dan menghindari penurunan nilai investasi awal.",
    icon: konservatifIcon,
  },
};

export const RiskProfileCard = ({
  resultRiskProfile,
  confirmPage,
  onClick,
}: RiskProfileCardType) => {
  return (
    <LinearGradient
      colors={[MAP_RESULT[resultRiskProfile].primary, MAP_RESULT[resultRiskProfile].secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[plaiStyles.spacingp, plaiStyles.my24, RPCStyle.br8]}
    >
      <View style={plaiStyles.row}>
        <View style={plaiStyles.flex}>
          <Text style={[plaiStyles.fontWhiteBold, plaiStyles.lineH20, plaiStyles.font16]}>
            {MAP_RESULT[resultRiskProfile].title}
          </Text>
          <Text
            style={[
              plaiStyles.fontWhiteThin,
              plaiStyles.lineH18,
              plaiStyles.font14,
              plaiStyles.mt8,
            ]}
          >
            {
              confirmPage ?
                MAP_RESULT[resultRiskProfile].longDescription
                :
                MAP_RESULT[resultRiskProfile].description
            }
          </Text>
        </View>
        {
          !confirmPage &&
          <Pressable onPress={onClick}>
            <Icon name="edit" color={PruColor.white} size={23}></Icon>
          </Pressable>
        }
      </View>
    </LinearGradient>
  );
};
