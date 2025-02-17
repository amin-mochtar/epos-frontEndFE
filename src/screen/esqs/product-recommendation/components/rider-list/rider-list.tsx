import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { TRiderList } from './rider-list.type';
import { ShapeItem, plaiStyles } from 'plai_common_frontend';
import Icon from 'react-native-vector-icons/Foundation';
import { PruColor } from 'common_ui_components';

export const RiderList = ({ data, selected, onSelected, errorMessage, handlerTooltip }: TRiderList) => {
  return (
    <View
      style={[plaiStyles.bgwhite, plaiStyles.spacingp, { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }]}
    >
      <Text style={[plaiStyles.font14, plaiStyles.lineH20]}>
        Manfaat Tambahan (<Text style={[plaiStyles.font14, plaiStyles.fontGrey99, plaiStyles.lineH20]}>Opsional</Text>)
      </Text>
      {data.map((item, index) => {
        const isSelected =
          selected == undefined ? false : selected.findIndex((value) => value.key == item.key) > -1;
        const isDisabled = errorMessage[item.key as string] ? true : false;
        return (
          <View key={index}>
            <Pressable key={index} onPress={() => onSelected(item)} disabled={isDisabled}>
              <View style={[plaiStyles.row, plaiStyles.my16]}>
                <View style={[plaiStyles.flex, plaiStyles.row]}>
                  <Text style={[isDisabled ? plaiStyles.fontGreyCCBold : plaiStyles.fontBlackBold, plaiStyles.lineH20]}>
                    <Text
                      style={[
                        plaiStyles.font14,
                        isDisabled ? plaiStyles.fontGreyCCBold : plaiStyles.fontRed,
                        plaiStyles.lineH20,
                      ]}
                    >
                      PRU
                    </Text>
                    {item?.label?.slice(3)}
                  </Text>
                  <Pressable onPress={() => handlerTooltip(item.key)}>
                    <Icon name="info" size={16} color={PruColor.grey99} style={[plaiStyles.lineH20, plaiStyles.ml4]} />
                  </Pressable>
                </View>
                <View style={plaiStyles.ml24}>
                  <ShapeItem disabled={isDisabled} isSelected={isSelected} type="box" />
                </View>
              </View>
            </Pressable>
            {errorMessage[item.key as string] &&
              errorMessage[item.key as string].errorMessageId.map((rule: string) => {
                return (
                  <View style={plaiStyles.mt8}>
                    <Text style={[plaiStyles.fontRed, plaiStyles.font12]}>{rule}</Text>
                  </View>
                );
              })}
          </View>
        );
      })}
    </View>
  );
};
