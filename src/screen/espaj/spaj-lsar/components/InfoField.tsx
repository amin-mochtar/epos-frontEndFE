import { StyleProp, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { plaiStyles } from 'plai_common_frontend';

type Props = {
  title: string;
  value?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
};

const InfoField: FC<Props> = ({ title, value, wrapperStyle }) => {
  return (
    <View style={[wrapperStyle, plaiStyles.borderBGreycc, plaiStyles.pb4, plaiStyles.borderDashed]}>
      <Text style={[plaiStyles.fontGrey66, plaiStyles.lineH20]}>{title ?? ''}</Text>
      <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH24, plaiStyles.font16, plaiStyles.mt4]}>{value ?? ''}</Text>
    </View>
  );
};

export default InfoField;

