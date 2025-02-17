import { View, Text } from 'react-native';
import React from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';

const lineDot: StyleProp<ViewStyle> = {
  borderRadius: 1,
  width: '100%',
  borderStyle: 'dashed',
  borderWidth: 0.8,
  borderColor: '#CCCCCC',
};

export const SectionField = ({ title, value }: { title: string; value: string | undefined }) => {
  return (
    <View>
      <Text style={[plaiStyles.mt24, plaiStyles.fontGrey66, plaiStyles.lineH20]}>{title}</Text>
      <Text style={[plaiStyles.mt8, plaiStyles.mb4, plaiStyles.fontGrey33, plaiStyles.font16, plaiStyles.lineH24]}>{value}</Text>
      <View style={lineDot}></View>
    </View>
  );
};
