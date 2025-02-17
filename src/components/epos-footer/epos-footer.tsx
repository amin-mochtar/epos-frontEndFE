import { View, Text, Dimensions } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { PruActivityIndicator, PruColor } from 'common_ui_components';
import { Button } from 'common_ui_components/app/components-ui';
import * as Progress from 'react-native-progress';
import { plaiStyles } from 'plai_common_frontend';
import { pruTestID } from 'common_services_frontend';
import LoadingBar from 'common_ui_components/app/screens/WebviewScreen/LoadingBar';

type EposFooterProps = {
  leftButton: {
    text?: string;
    onPress: () => void;
  };
  rightButton: {
    text?: string;
    disabled: boolean;
    onPress: () => void;
  };
  position: number;
  totalStep?: number;
  isPrimaryButtonOnly?: boolean;
  loading?: boolean;
};
type Debounce = (func: () => void | Promise<void> | boolean, wait: number) => () => void;

const debounce: Debounce = (func, wait) => {
  let timeout: ReturnType<typeof setTimeout>;
  return async () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await func();
    }, wait);
  };
};

export const EposFooter = memo(({ leftButton, rightButton, position, totalStep = 15, isPrimaryButtonOnly = false, loading = false }: EposFooterProps) => {
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const primaryButtonWidth = isPrimaryButtonOnly ? '100%' : '40%';
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsEnabled(true);
    }, 300);
    return () => clearTimeout(timer); // Cleanup timer
  }, [position]);
  const debouncedLeftButtonPress = useCallback(
    debounce(() => {
      if (buttonsEnabled && !loading) {
        leftButton.onPress();
        setButtonsEnabled(false);
        setTimeout(() => {
          setButtonsEnabled(true);
        }, 500);
      }
    }, 300),
    [leftButton.onPress, buttonsEnabled],
  );
  const debouncedRightButtonPress = useCallback(
    debounce(() => {
      if (buttonsEnabled && !rightButton.disabled) {
        rightButton.onPress();
        setButtonsEnabled(false);
        setTimeout(() => {
          setButtonsEnabled(true);
        }, 500);
      }
    }, 300),
    [rightButton.onPress, rightButton.disabled, buttonsEnabled],
  );

  return (
    <View style={plaiStyles.bgwhite}>
      <Progress.Bar
        progress={position / totalStep}
        width={Dimensions.get('window').width}
        borderRadius={0}
        borderWidth={0}
        color={PruColor.majorRed}
        unfilledColor="#D9D9D9"
      />
      <View
        style={[
          plaiStyles.row,
          plaiStyles.justifyBetween,
          plaiStyles.alignCenter,
          plaiStyles.bgwhite,
          plaiStyles.px20,
          plaiStyles.py24,
        ]}
        {...pruTestID('epos-footer-left-button')}
      >
        {!isPrimaryButtonOnly && <Text style={[plaiStyles.flex, plaiStyles.fontGrey33Bold, plaiStyles.px16]} onPress={debouncedLeftButtonPress}>
          {leftButton.text || 'Sebelumnya'}
        </Text>}
        {
          loading ? (
            <Button
              style={[plaiStyles.bgBtnRed, { width: primaryButtonWidth },]}
              onPress={debouncedRightButtonPress}
              {...pruTestID('epos-footer-right-button')}
            >
              <PruActivityIndicator color='white' />
            </Button>
          ) : <Button
            text={rightButton.text || 'Selanjutnya'}
            style={[rightButton.disabled ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, { width: primaryButtonWidth },]}
            onPress={debouncedRightButtonPress}
            disabled={rightButton.disabled}
            {...pruTestID('epos-footer-right-button')}
          />
        }

      </View>
    </View>
  );
});
