import React from 'react';
import { StyleProp, Text, View, ViewStyle, StyleSheet } from 'react-native';
import { plaiStyles } from 'plai_common_frontend';
import { TCommonOptionalData } from '../../../../../utilities';
import { PruColor } from 'common_ui_components';
import { detailProductStyles } from './detail-product.style';

type DetailProductProps = {
  label: string;
  value: string | TCommonOptionalData;
  style?: StyleProp<ViewStyle>;
  additionalDesc?: string
};

export const DetailProduct = ({ label, value, style, additionalDesc}: DetailProductProps) => {
  const isValueText = !Array.isArray(value);
  return (
    <View style={[plaiStyles.mt16, style]}>
      {label.toUpperCase().includes('PRU') ? (
        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
          <Text style={plaiStyles.fontRedBold}>{label.substring(0, 3)}</Text>
          {label.substring(3)}
        </Text>
      ) : (
        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>{label}</Text>
      )}
      {isValueText ? (
        <>
          {value.toUpperCase().includes('PRU') ? (
            <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.mt4, plaiStyles.lineH18]}>
              <Text style={plaiStyles.fontRedBold}>{value.substring(0, 3)}</Text>
              {value.substring(3)}
            </Text>
          ) : (
            <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.mt4, plaiStyles.lineH18]}>
              {String(value)}
            </Text>
          )}
        </>
      ) : (
        <>
          {value.map((item: any, index: number) => {
            return (
              <View
                style={StyleSheet.flatten({ ...detailProductStyles.row, marginBottom: 8, width: '90%' })}
                key={index}
              >
                <Text style={StyleSheet.flatten({ ...detailProductStyles.amount, marginRight: 8, marginBottom: 0 })}>
                  {item.value}
                </Text>
                {item.label.includes('PRU') ? (
                  <Text style={detailProductStyles.product}>
                    <Text style={StyleSheet.flatten({ color: PruColor.red })}>{item.label.substring(0, 3)}</Text>
                    {item.label.substring(3)}
                  </Text>
                ) : (
                  <Text style={detailProductStyles.product}>{item.label}</Text>
                )}
              </View>
            );
          })}
        </>
      )}
      {Boolean(additionalDesc) &&
        <Text style={detailProductStyles.additionalDesc}>
          {additionalDesc}
        </Text>
      }

    </View>
  );
};
