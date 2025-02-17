import React, { Fragment, useRef } from 'react';
import { ModalContainer, ShapeItem, TCheckboxData, plaiStyles } from 'plai_common_frontend';
import { Pressable, ScrollView } from 'react-native';
import { Text } from 'react-native';
import { OptionCard, TOptionalCardData } from '../../../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { TSelectionChangeBenefit } from './selection-change-beenfit.type';
import { View } from 'react-native';

export const SelectionChangeBenefit = ({
  titleHeader,
  productName,
  visible,
  onClose,
  data,
  onSelected,
  onPress,
  selected,
  errorMessage,
}: TSelectionChangeBenefit) => {
  return (
    <ModalContainer titleHeader={titleHeader} visible={visible} onClose={onClose}>
      <ScrollView style={plaiStyles.mb24}>
        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH22]}>
          Tambahkan Asuransi tambahan untuk {productName}
        </Text>
        <View style={[plaiStyles.py24]}>
          {data.map((item: TOptionalCardData, index: number) => {
            const isSelected =
              selected == undefined ? false : selected.findIndex((value) => value.key == item.key) > -1;
            const isDiabled =
              errorMessage[item?.key as string] && errorMessage[item?.key as string]?.errorMessageId?.length > 0
                ? true
                : false;
            return (
              <Fragment key={index}>
                <Pressable onPress={() => onSelected(item)} disabled={isDiabled}>
                  <View style={[plaiStyles.row]}>
                    <View style={[plaiStyles.flex]}>
                      <Text
                        style={[isDiabled ? plaiStyles.fontGreyCCBold : plaiStyles.fontBlackBold, plaiStyles.lineH20]}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <View>
                      <ShapeItem disabled={isDiabled} isSelected={isSelected} type={'box'} />
                    </View>
                  </View>
                </Pressable>
                {errorMessage[item.key as string] &&
                  errorMessage[item.key as string].errorMessageId.map((rule: string, key: number) => {
                    return (
                      <View key={key} style={plaiStyles.mt8}>
                        <Text style={[plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH18]}>{rule}</Text>
                      </View>
                    );
                  })}
                {index + 1 != data.length && (
                  <View style={[plaiStyles.py16]}>
                    <View style={[plaiStyles.bgGrey, { height: 2, alignSelf: 'stretch' }]} />
                  </View>
                )}
              </Fragment>
            );
          })}
        </View>
      </ScrollView>
      <Button style={[plaiStyles.btnMedium]} textStyle={plaiStyles.fontWhite} text={'Simpan'} onPress={onPress} />
    </ModalContainer>
  );
};
