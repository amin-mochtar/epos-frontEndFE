import { View, Text } from 'react-native';
import React from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { TOptionField } from './option-filed.type';
import { OptionCard } from '../option-card/option-card';

export const OptionFiled = ({
  label,
  theme = 'default',
  type = 'radio',
  data,
  style,
  insideStyle,
  selected,
  onDisabled,
  children,
  onSelected,
  required = true,
  error,
}: TOptionField) => {
  return (
    <View>
      <Text style={[plaiStyles.fontGrey33, plaiStyles.mt24, plaiStyles.lineH24]}>
        {label} {required && <Text style={plaiStyles.fontRed}> *</Text>}
      </Text>
      <OptionCard
        theme={theme}
        type={type}
        style={style}
        insideStyle={insideStyle}
        data={data}
        selected={selected}
        onSelected={onSelected}
        children={children}
        onDisabled={onDisabled}
      />
      {error && (
        <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
          {error?.message}
        </Text>
      )}
    </View>
  );
};
