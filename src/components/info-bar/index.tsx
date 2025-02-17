import { plaiStyles } from 'plai_common_frontend';
import React, { FC } from 'react';
import { Image, ImageSourcePropType, ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import { infoBlue, infoRed, urgent2, blocker_icon, warning_icon } from '../../assets';
import { StyleProp } from 'react-native';
import { Trans } from 'react-i18next';
import { AsteriskWrapper } from './../asterisk/asterisk';

type Props = {
  withIcon?: boolean;
  content?: string;
  variant: 'info' | 'warn' | 'error';
  iconStyle?: 'style 1' | 'style 2';
  containerStyle?: StyleProp<ViewStyle>;
  isUseHtmlFormatText?: boolean;
};

export const InfoBar: FC<Props> = ({ content, withIcon = false, variant = 'info', containerStyle, iconStyle = 'style 1', isUseHtmlFormatText = false }) => {
  const EnumTextColor: Record<Props['variant'], Record<string, any>> = {
    info: plaiStyles.fontBlue,
    warn: plaiStyles.fontYellow,
    error: plaiStyles.fontRed,
  };

  const EnumBgColor: Record<Props['variant'], Record<string, any>> = {
    info: plaiStyles.bgBlue,
    warn: plaiStyles.bgOrangeThin,
    error: plaiStyles.bgBtnSecondary,
  };

  const EnumIcon: Record<Props['variant'], Record<string, ImageSourcePropType | undefined>> = {
    info: infoBlue,
    warn: urgent2,
    error: infoRed,
  };

  const EnumIconStyle2: Record<Props['variant'], Record<string, ImageSourcePropType | undefined>> = {
    info: infoBlue,
    warn: warning_icon,
    error: blocker_icon,
  };

  const iconStyleVariant = {
    'style 1': (variant: Props['variant']) => EnumIcon[variant],
    'style 2': (variant: Props['variant']) => EnumIconStyle2[variant]
  }

  const textWithFormatHTML = (message: string) => {
    return <Trans
      i18nKey={message}
      components={{
        i: <Text style={[{ fontStyle: 'italic' }]} />,
        b: <Text style={[{ fontWeight: 'bold' }]} />,
        u: <Text style={{ textDecorationLine: 'underline' }} />,
        pru: <Text style={{ color: 'red' }} />,
        asterisk: <AsteriskWrapper textStyle={textStyle[iconStyle]} />
      }}
    />
  }

  const textStyle = {
    'style 1': [EnumTextColor[variant], plaiStyles.font12, plaiStyles.lineH18],
    'style 2': [EnumTextColor[variant], plaiStyles.font12, plaiStyles.lineH18, plaiStyles.pr24]
  }

  const imageStyle = {
    'style 1': [plaiStyles.mr8, plaiStyles.mt4, plaiStyles.ml4],
    'style 2': [plaiStyles.mr8]
  }

  const viewStyle = {
    'style 1': [
      plaiStyles.alignCenter,
      EnumBgColor[variant],
      plaiStyles.justifyStart,
      plaiStyles.flex,
      plaiStyles.row,
      plaiStyles.px4,
      plaiStyles.py8,
      { borderRadius: 8 },
      containerStyle,
    ],
    'style 2': [
      EnumBgColor[variant],
      plaiStyles.justifyStart,
      plaiStyles.flex,
      plaiStyles.row,
      plaiStyles.px8,
      plaiStyles.py8,
      plaiStyles.mt10,
      { borderRadius: 8 },
      containerStyle
    ]
  }
  return (
    <View
      style={viewStyle[iconStyle]}
    >
      {withIcon && <Image style={imageStyle[iconStyle]} source={iconStyleVariant[iconStyle](variant)} />}
      <Text style={[...textStyle[iconStyle], plaiStyles.flexShrink]}>
        {!isUseHtmlFormatText ? content ?? 'Please insert content' : textWithFormatHTML(content ?? '')}
      </Text>
    </View>
  );
};
