import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React, { memo, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { eposColor } from '../../utilities';
import { OptionCardProps } from './option-card.type';
import { Divider, plaiStyles, ShapeItem, TextDecoration } from 'plai_common_frontend';
import { pruTestID } from 'common_services_frontend';
import { Trans, useTranslation } from 'react-i18next';
import { PruColor } from 'common_ui_components';
import IconTip from 'react-native-vector-icons/Foundation';

export const OptionCard = memo(
  ({
    translation,
    label,
    type = 'radio',
    theme = 'default',
    data,
    style,
    insideStyle,
    selected,
    onSelected,
    children,
    onDisabled,
    spaceItem,
    required,
    error,
    icon,
    handlerTooltip,
    uniqueTestId,
  }: OptionCardProps) => {
    const isCheckbox = useMemo(() => type == 'checkbox', [type]);
    const { t } = useTranslation();
    return (
      <>
        {label && (
          <Text style={[plaiStyles.fontGrey33, plaiStyles.mt24, plaiStyles.lineH24]}>
            <>
              <TextDecoration label={label} />
              {required && <Text style={plaiStyles.fontRed}> *</Text>}
            </>
          </Text>
        )}
        <View style={[style]}>
          {data?.map((item, index) => {
            const isSelected =
              selected == undefined
                ? false
                : Array.isArray(selected)
                  ? selected.findIndex((value) => (typeof value == 'object' ? value.key : value) == item.key) > -1
                  : (typeof selected == 'object' ? selected.key : selected) == item.key;
            const border = isSelected
              ? plaiStyles.borderSelected
              : theme === 'border' || theme === 'simpleborder'
                ? [plaiStyles.borderGreycc, plaiStyles.br12]
                : plaiStyles.borderDefault;
            let isDisabled = false;
            const _label = item.title || item.label;
            if (onDisabled) isDisabled = onDisabled(item);
            return (
              <React.Fragment key={index}>
                {index % 2 == 1 && spaceItem && <Divider width={spaceItem} />}
                <TouchableOpacity
                  style={[insideStyle, isDisabled && plaiStyles.opacity7,]}
                  {...pruTestID(`optional-card${uniqueTestId ? `${uniqueTestId}-` : ''}-${item.key}`)}
                  onPress={() => (isDisabled ? () => { } : onSelected(item))}
                  disabled={isDisabled}
                >
                  <View style={[border, plaiStyles.mt12, !theme && { minHeight: 100 }]}>
                    <View style={[plaiStyles.row, plaiStyles.spacingp, plaiStyles.alignCenter]}>
                      <View style={[plaiStyles.flex]}>
                        {_label && (
                          <View style={[plaiStyles.flex, plaiStyles.row]}>
                            <Text style={[!isDisabled || isSelected ? plaiStyles.fontGrey33 : plaiStyles.fontGreycc, plaiStyles.lineH24,]}>
                              <TextDecoration label={_label as string} />
                            </Text>
                            {icon && !item?.isHideTitleIcon && (
                              <Pressable onPress={() => handlerTooltip?.(item)}>
                                <IconTip
                                  name={icon}
                                  size={16}
                                  color={PruColor.grey99}
                                  style={[plaiStyles.lineH24, plaiStyles.ml4]}
                                />
                              </Pressable>
                            )}
                          </View>
                        )}
                        {item.detail && (
                          <Text
                            style={[
                              _label ? [plaiStyles.fontGrey66Thin, plaiStyles.mt4] : plaiStyles.fontGrey33Thin,
                              plaiStyles.lineH20,
                            ]}
                          >
                            <TextDecoration label={item.detail as string} />
                          </Text>
                        )}
                        {item.caption && item.caption}
                      </View>
                      {theme != 'simple' && theme != 'simpleborder' && (
                        <View style={[plaiStyles.w15, plaiStyles.alignEnd]}>
                          {item.icon ? (
                            typeof item.icon == 'string' ? (
                              <Icon name={item.icon} size={30} color={eposColor.grey58} />
                            ) : (
                              item.icon
                            )
                          ) : (
                            <ShapeItem isSelected={isSelected} type={isCheckbox ? 'box' : 'circle'} />
                          )}
                        </View>
                      )}
                    </View>
                    {isSelected && children}
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>
        {error && (
          <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
            {error?.message}
          </Text>
        )}
      </>
    );
  },
);
