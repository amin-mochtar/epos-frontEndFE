import React, { memo, useMemo, useState } from 'react';
import { TouchableOpacity, Text, View, Animated, Image } from 'react-native';
import { BSCStyles } from './bottom-sheet-calculate.style';
import { color } from 'common_ui_components/app/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { success, urgent } from '../../../../../assets';
import { CopyClipboard, plaiStyles, TCommonConstantData } from 'plai_common_frontend';
import { ScrollView } from 'react-native-gesture-handler';
import { pruTestID } from 'common_services_frontend';

export type BottomSheet = {
  premi: string,
  minimumSA: string,
  maksimumSA: string,
  premiUnaplied: string;
  minusUnaplied: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  wordingSelected: TCommonConstantData;
  isSharia: boolean;
  currency: string;
};

export const BottomSheet = memo(({
  premi,
  minimumSA,
  maksimumSA,
  premiUnaplied,
  minusUnaplied = false,
  visible,
  setVisible,
  wordingSelected,
  isSharia,
  currency
}: BottomSheet) => {
  const sheetHeight = useMemo(() => new Animated.Value(visible ? 260 : 78), [visible]);

  const animatedContainer = {
    height: sheetHeight,
    borderTopLeftRadius: visible ? 10 : 0,
    borderTopRightRadius: visible ? 10 : 0,
  };

  const library: { [key: string]: string; } = {
    "12": "Perbulan",
    "04": "Per 3 Bulan",
    "02": "Per 6 Bulan",
    "01": "Pertahun",
  };
  const customWording = useMemo(() => library[String(wordingSelected?.key!) as string], [wordingSelected]);
  const validationChecker = useMemo(() => Number(premiUnaplied.replace(/\./g, '')) == 0 ? false : undefined, [premiUnaplied]);

  return (
    <Animated.View style={[BSCStyles.container, animatedContainer]}>
      <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.justifyBetween]}>
        <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.justifyBetween]}>
          <ScrollView
            style={[!visible ? { maxHeight: 78 } : {}]}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.font14, plaiStyles.lineH18]}>
                Anggaran {customWording}
              </Text>
              <View style={[plaiStyles.row]}>
                <Text style={[plaiStyles.font14, plaiStyles.fontBold, plaiStyles.lineH24]}>{currency + premi}</Text>
              </View>
              <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.font14, plaiStyles.lineH18, plaiStyles.mt10,]}>
                Minimum {isSharia ? 'Santunan Asuransi' : 'Uang Pertanggungan'}
              </Text>
              <View style={[plaiStyles.row]}>
                <Text style={[plaiStyles.font14, plaiStyles.fontBold, plaiStyles.lineH24]}>{currency + minimumSA}</Text>
              </View>
              <Text
                style={[
                  plaiStyles.fontGrey66Thin,
                  plaiStyles.font14,
                  plaiStyles.lineH18,
                  plaiStyles.mt10,
                ]}>
                Maksimum {isSharia ? 'Santunan Asuransi' : 'Uang Pertanggungan'}
              </Text>
              <View style={[plaiStyles.row]}>
                <Text style={[plaiStyles.font14, plaiStyles.fontBold, plaiStyles.lineH24, plaiStyles.pr8]}>{currency + maksimumSA}</Text>
                <CopyClipboard copy={maksimumSA} style={[plaiStyles.selfCenter]} />
              </View>
              <Text
                style={[
                  plaiStyles.fontGrey66Thin,
                  plaiStyles.font14,
                  plaiStyles.lineH18,
                  plaiStyles.mt10,
                ]}>
                Premi Un-Applied
              </Text>
              <View style={[plaiStyles.row]}>
                <Text style={[plaiStyles.font14, plaiStyles.fontBold, plaiStyles.lineH24]}>{`${minusUnaplied ? `-` : ``}${currency}${premiUnaplied}`}</Text>
                <Image style={[plaiStyles.ml8, plaiStyles.selfCenter]} source={(Number(premiUnaplied.replace(/\./g, '')) < 60000 && Number(premiUnaplied.replace(/\./g, '')) > -1 && !minusUnaplied) ? success : urgent} />
              </View>
              {
                visible ? <View style={[plaiStyles.mt16]}>
                  <Text style={[plaiStyles.fontYellow, plaiStyles.lineH20]}>
                    Tekan Hitung untuk memulai perhitungan dengan Kalkulator manfaat
                  </Text>
                </View> : <></>
              }
            </View>
          </ScrollView>
          <TouchableOpacity
            style={[plaiStyles.styleWrapperIconRed]}
            onPress={() => setVisible(!visible)}
            {...pruTestID('bottom-sheet-calculator-chevron-button')}
          >
            <Icon
              style={[plaiStyles.alignCenter, plaiStyles.pb4]}
              name={visible ? 'chevron-down' : 'chevron-up'}
              size={16}
              color={color.red}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
});
