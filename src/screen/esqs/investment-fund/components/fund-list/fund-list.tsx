import React, { useState } from 'react';
import { DataFund } from './fund-list.type';
import { Pressable, Text, View } from 'react-native';
import { ellipseTrack } from '../../../../../assets';
import Slider from '@react-native-assets/slider';
import { PruColor } from 'common_ui_components';
import { ShapeItem, plaiStyles } from 'plai_common_frontend';
import { pruTestID } from 'common_services_frontend';

export const FundList = ({
  onSelectedFund,
  onSlideChange,
  openFactSheet,
  fund,
  selectedFund,
  isDisableFund,
  section,
  indexCategory,
}: DataFund) => {
  return (
    <>
      {fund.map((item, index) => {
        const isSelected = selectedFund.findIndex((value) => value.type == item.type) > -1;
        const fontColor = isDisableFund ? plaiStyles.fontGrey99 : plaiStyles.fontGrey33;
        return (
          <View style={[plaiStyles.py16, plaiStyles.borderTop]}>
            <View style={[plaiStyles.row, plaiStyles.mb12]}>
              <View style={[plaiStyles.flex, plaiStyles.mr16]}>
                <Text style={[plaiStyles.font16, fontColor, plaiStyles.lineH20]}>{item.desc_fund}</Text>
                <Pressable onPress={() => openFactSheet(item)}>
                  <Text style={[plaiStyles.fontRed, plaiStyles.lineH18, plaiStyles.mt8]}>Lihat Factsheet</Text>
                </Pressable>
              </View>
              {isDisableFund ? (
                <></>
              ) : (
                <Pressable {...pruTestID(`checkbox-${item.type}`)} onPress={() => onSelectedFund(item, section)}>
                  <ShapeItem isSelected={isSelected} type="box" />
                </Pressable>
              )}
            </View>
            {isSelected && (
              <>
                <Slider
                  testID={`slider-fund-${item.type}`}
                  value={item.percent}
                  maximumValue={100}
                  minimumTrackTintColor={PruColor.majorRed}
                  step={5}
                  onValueChange={(value) => {
                    onSlideChange(value, index, section, indexCategory);
                  }}
                  thumbImage={ellipseTrack}
                  style={plaiStyles.w100}
                  trackHeight={7}
                  thumbSize={16}
                />
                <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
                  <Text style={plaiStyles.fontGrey66Thin}>{`${item.percent}%`}</Text>
                  <Text style={plaiStyles.fontGrey66Thin}>100%</Text>
                </View>
              </>
            )}
          </View>
        );
      })}
    </>
  );
};
