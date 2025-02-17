import React, { memo, useMemo } from 'react'
import { TextInput, View, Text } from 'react-native'
import { TypeEposInput } from './epos-input.type'
import { color } from 'common_ui_components/app/theme'
import { EIStyle } from './epos-input.style'
import { plaiStyles } from 'plai_common_frontend'

export const EposInput = memo(
  ({
    containerStyle,
    label,
    itemRight,
    placeholder,
    value,
    setValue,
    error,
    ...rest
  }: TypeEposInput) => {
    const widthInputStyle = { width: itemRight ? '86.5%' : '100%' }
    const renderedLabel = useMemo(() => {
      return (
        <Text style={EIStyle.label}>
          {label} <Text style={EIStyle.star}> *</Text>
        </Text>
      )
    }, [label])
    return (
      <>
        <View style={[containerStyle]}>
          {renderedLabel}

          <View style={EIStyle.wrapperInput}>
            {itemRight && (
              <View style={EIStyle.wrapperItemRight}>
                <Text style={EIStyle.itemRight}>{itemRight}</Text>
              </View>
            )}

            <TextInput
              style={[widthInputStyle, EIStyle.input]}
              placeholder={placeholder}
              placeholderTextColor={color.greycc}
              value={value}
              onChangeText={setValue}
              {...rest}
            />
          </View>
        </View>
        {error && (
          <Text style={[plaiStyles.mt8, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
            {error?.message}
          </Text>
        )}
      </>
    )
  }
)
