import { View, Text, TouchableOpacity, Image, ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';
import React, { memo } from 'react';
import { cptStyle } from './card-policy-type.style';
import { plaiStyles } from 'plai_common_frontend';
import { pruTestID } from 'common_services_frontend';

type CardPolicyTypeProps = {
  data: {
    key: string;
    icon: ImageSourcePropType;
    label: string;
  };
  isSelected: boolean;
  uniqueTestId?: string,
  style?: StyleProp<ViewStyle>;
  selectedGoals?: string[] | undefined;
  onPress: (value: string) => void;
  callbackValidation?: (value: boolean) => void;
  disabled?: boolean;
};

export const CardPolicyType = memo(
  ({ data, isSelected, style, selectedGoals, uniqueTestId, onPress, callbackValidation, disabled = false }: CardPolicyTypeProps) => {
    const handlePress = () => {
      if (selectedGoals) {
        // If the item is already selected, deselect it
        if (isSelected) {
          onPress(data.key);
          if (selectedGoals?.length == 5) {
            callbackValidation?.(false);
          }
        } else if (selectedGoals?.length < 5) {
          // If the max limit is not reached, select it
          onPress(data.key);
        } else {
          callbackValidation?.(true);
        }
      } else {
        // if Component not using for product goals.
        if (!disabled) onPress(data.key);
      }
    };
    return (
      <TouchableOpacity onPress={handlePress} style={plaiStyles.flex} {...pruTestID(`option-card-${uniqueTestId ? uniqueTestId + '-' + data.key : data.key}`)} disabled={disabled}>
        <View style={[cptStyle.wrapperCard, isSelected ? cptStyle.colorSelected : cptStyle.defaultColor, style, disabled && plaiStyles.opacity7]}>
          <View style={cptStyle.wrapperImage}>
            <Image style={cptStyle.image} source={data.icon} />
          </View>
          <Text style={[plaiStyles.mt16, plaiStyles.fontGrey33Bold]}>{data.label}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);
