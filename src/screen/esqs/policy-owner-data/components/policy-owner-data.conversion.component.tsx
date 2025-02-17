import { View } from 'react-native';
import React, { memo, useState } from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { TConversionType } from './policy-owner-data.conversion.type';
import { ListRegisteredClient } from './policy-owner-data.conversion.component-selection';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'common_services_frontend';

export const ConversionClientSelection = memo(
  ({
    containerStyle,
    labelMap,
    data,
    selected,
    onSelected,
    keyMap,
    required,
    theme,
    error,
    onPressClose = () => { },
    search,
    disabledBackdropPress = false,
    buttonPrimaryText,
    handlerTransformDataCustomer = () => { },
    onDisabled = false,
    lastPage
  }: TConversionType) => {
    const [isVisible, setIsVisible] = useState(required == undefined ? false : true);
    const navigation = useNavigation();
    return (
      <>
        <View style={[plaiStyles.borderbf0, plaiStyles.mt24, containerStyle]}>
          <ListRegisteredClient
            search={search}
            titleHeader={labelMap.titleHeaeder || labelMap.title || 'Select'}
            keyMap={{
              label: keyMap?.labelOption || keyMap?.label,
              subLabel: keyMap?.subLabel || keyMap?.subLabel,
              value: keyMap?.value,
              search: keyMap?.search,
            }}
            visible={isVisible}
            onClose={() => {
              setIsVisible(!isVisible);
              onPressClose();
            }}
            data={data}
            selected={selected}
            onSelected={onSelected}
            group={{
              key: keyMap?.group,
              label: labelMap.group,
            }}
            theme={theme}
            button={{
              type: 'two',
              primaryText: buttonPrimaryText,
              primaryOnPress: () => {
                setIsVisible(!isVisible);
                onPressClose();
                handlerTransformDataCustomer();
              },
              secondaryText: 'List Client',
              secondaryOnPress: () => {
                setIsVisible(!isVisible);
                navigation.navigate(AppRoutes.POLICY_CLIENT_SYNC, { lastPage: lastPage });
              },
            }}
            disabledBackdropPress={disabledBackdropPress}
            disabled={onDisabled}
          />
        </View>
      </>
    );
  },
);
