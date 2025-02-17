import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ModalMenu, plaiStyles } from 'plai_common_frontend';
import { PruColor } from 'common_ui_components';
import Icon from 'react-native-vector-icons/Feather';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposDoksulRoutes } from '../../navigation';

export const DoksulHeader = ({
  title,
  onPress,
  onPressKebab,
}: {
  title: string;
  onPress: () => void;
  onPressKebab?: () => void;
}) => {
  const [additionalMenu, setAdditionalMenu] = useState(false)
  const navigation = useNavigation();

  const dataAdditionalMenu = [
    {
      text: 'Lihat Dokumen Susulan', onPress: () => {
        navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.LANDING_DOKSUL });
      }
    },
    { text: 'Beranda', onPress: () => navigation.navigate('home') },
  ]

  return (
    <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
      <Pressable style={[plaiStyles.row]} onPress={onPress}>
        <Icon name="arrow-left" size={25} color={PruColor.grey33} />
        <Text
          style={[
            plaiStyles.selfCenter,
            plaiStyles.fontGrey33,
            plaiStyles.font20,
            plaiStyles.lineH24,
            plaiStyles.ml14,
          ]}
        >
          {title}
        </Text>
      </Pressable>
      <Pressable onPress={() => setAdditionalMenu(true)}>
        <Icon name="more-vertical" size={20} color={PruColor.grey33} />
      </Pressable>
      <ModalMenu visible={additionalMenu} onClose={() => setAdditionalMenu(!additionalMenu)} data={dataAdditionalMenu} />
    </View>
  );
};
