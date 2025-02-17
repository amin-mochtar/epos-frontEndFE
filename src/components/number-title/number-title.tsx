import { View, Text } from 'react-native';
import React from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { Trans } from 'react-i18next';

export const NumberTitle = ({ number, text }: { number: string; text: string }) => {
  return (
    <View style={[plaiStyles.row, plaiStyles.mb14, plaiStyles.alignCenter]}>
      <View
        style={[
          plaiStyles.wh24,
          plaiStyles.br18,
          plaiStyles.bgBtnRed,
          plaiStyles.alignCenter,
          plaiStyles.justifyCenter,
        ]}
      >
        <Text style={[plaiStyles.fontWhite]}>{number}</Text>
      </View>
      <Text style={[plaiStyles.ml8, plaiStyles.selfCenter, plaiStyles.fontRed, plaiStyles.lineH24]}>
        <Trans
          i18nKey={text}
          components={{
            i: <Text style={[plaiStyles.fontItalic]} />
          }}
        />
      </Text>
    </View>
  );
};
