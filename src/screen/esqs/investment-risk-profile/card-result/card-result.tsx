import { View, Text, Image } from 'react-native';
import React, { memo } from 'react';
import { ModalContainer, plaiStyles } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../../navigation';
import LinearGradient from 'react-native-linear-gradient';
import { agresifIcon, konservatifIcon, moderatIcon } from '../../../../assets';
import { PruColor } from 'common_ui_components';
import { pruTestID } from 'common_services_frontend';

export const MAP_RESULT = {
  moderate: {
    primary: '#E05233',
    secondary: '#EBBB13',
    title: 'Moderat',
    description:
      'Calon pemegang polis bersedia untuk menerima risiko sedang serta siap dengan tingkat imbal hasil dan risiko yang tidak terlalu besar',
    icon: moderatIcon,
  },
  aggressive: {
    primary: '#9A0D0D',
    secondary: '#D51C1C',
    title: 'Agresif',
    description:
      'Calon pemegang polis bersedia untuk menerima risiko tinggi serta siap dengan tingkat imbal hasil dan risiko yang besar',
    icon: agresifIcon,
  },
  conservative: {
    primary: '#198109',
    secondary: '#80BA35',
    title: 'Konservatif',
    description:
      'Calon pemegang polis hanya bersedia untuk menerima risiko paling rendah, menginginkan investasi yang relatif aman dan tingkat imbal hasil yang cenderung stabil',
    icon: konservatifIcon,
  },
};

export type TCardResult = {
  visible: boolean;
  onClose: () => void;
  result: keyof typeof MAP_RESULT;
  changeRiskProfile?: boolean;
};

export const CardResult = memo(({ visible, onClose, result, changeRiskProfile }: TCardResult) => {
  const navigation = useNavigation();

  const onPressNext = () => {
    onClose();
    navigation.dispatch(
      StackActions.replace(
        changeRiskProfile ? EposRoutes.INVESTMENT_FUND : EposRoutes.POLICY_OWNER_DATA
      )
    );
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} titleHeader="Profil Risiko Nasabah">
      <LinearGradient
        colors={[MAP_RESULT[result].primary, MAP_RESULT[result].secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[plaiStyles.br8, plaiStyles.mb24]}
      >
        <View style={[plaiStyles.py24, plaiStyles.px16, plaiStyles.alignCenter]}>
          <View
            style={[
              plaiStyles.px8,
              plaiStyles.py8,
              plaiStyles.br18,
            ]}
          >
            <Image source={MAP_RESULT[result].icon} width={24} height={24} />
          </View>
          <Text style={[plaiStyles.fontWhiteBold, plaiStyles.font16, plaiStyles.mt16]}>
            {MAP_RESULT[result].title}
          </Text>
          <Text style={[plaiStyles.fontWhiteThin, plaiStyles.textCenter, plaiStyles.mt4]}>
            {MAP_RESULT[result].description}
          </Text>
        </View>
      </LinearGradient>
      <Button style={[plaiStyles.btnMedium]} onPress={onPressNext} text="Selanjutnya" {...pruTestID('btn-risk-profile-result')} />
    </ModalContainer>
  );
});
