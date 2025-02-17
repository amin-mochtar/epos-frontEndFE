import React from 'react';
import { Slider, RangeSlider } from '@react-native-assets/slider';
import { StyleSheet } from 'react-native';
import { plaiStyles } from 'plai_common_frontend';
import { ellipseTrack } from '../../assets';
import { PruColor } from 'common_ui_components';

type TEposRangeSlider = {
  onValueChange: (val: any) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  isRangeSlider?: boolean;
};

// need to refactor params for use on dynamic mode :), need fast work timeline so i build only for use in 1 module
export const EposRangeSlider = ({
  minimumValue,
  maximumValue,
  onValueChange,
  step,
  isRangeSlider,
}: TEposRangeSlider) => {
  return (
    <>
      {isRangeSlider ? (
        <RangeSlider
          onValueChange={onValueChange}
          style={[plaiStyles.w100, plaiStyles.px8]}
          inverted={false}
          slideOnTap={true}
          minimumValue={minimumValue || 0}
          maximumValue={maximumValue || 100}
          step={step}
          thumbImage={ellipseTrack}
          outboundColor="#E6E6E6"
          inboundColor="#E8192C"
          thumbTintColor="#E8192C"
          thumbSize={12}
          trackHeight={4}
        />
      ) : (
        <Slider
          value={1}
          maximumValue={maximumValue}
          minimumValue={minimumValue}
          minimumTrackTintColor={PruColor.majorRed}
          step={1}
          slideOnTap={true}
          onValueChange={onValueChange}
          thumbImage={ellipseTrack}
          style={[plaiStyles.w100, plaiStyles.px8]}
        />
      )}
    </>
  );
};
