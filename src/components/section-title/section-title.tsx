import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { memo } from 'react';
import { plaiStyles, TextDecoration } from 'plai_common_frontend';
import { Trans } from 'react-i18next';

export const SectionTitle = memo(({ text, wrapperStyle }: { text: string; wrapperStyle?: StyleProp<ViewStyle>; }) => {
  return (
    <View style={[plaiStyles.borderL4R, plaiStyles.mt16, wrapperStyle]}>
      <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.ml8, plaiStyles.lineH24, plaiStyles.font16]}>
        <TextDecoration label={text} />
      </Text>
    </View>
  );
});
