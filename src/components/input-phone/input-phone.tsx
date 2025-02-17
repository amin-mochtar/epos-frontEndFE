import { View, Text, TextInput, Pressable } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Selection, plaiStyles } from 'plai_common_frontend';
import { PruColor } from 'common_ui_components';

type TInputPhone = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  selectedCode: { [key: string]: string };
  onSelectedCode: (value: { [key: string]: string }) => void;
  error: any;
};

const data = [
  { country: 'Afghanistan', code: '93', iso: 'AF' },
  { country: 'Germany', code: '49', iso: 'DE' },
  { country: 'Hong Kong', code: '852', iso: 'HK' },
  { country: 'India', code: '91', iso: 'IN' },
  { country: 'Indonesia', code: '62', iso: 'ID' },
  { country: 'Japan', code: '81', iso: 'JP' },
  { country: 'United Arab Emirates', code: '971', iso: 'AE' },
  { country: 'United Kingdom', code: '44', iso: 'GB' },
  { country: 'United States', code: '1', iso: 'US' },
];

export const InputPhone = memo(
  ({ label, value, setValue, selectedCode = { label: 'Indonesia', key: '62' }, onSelectedCode, error, ...rest }: TInputPhone) => {
    const [isVisible, setisVisible] = useState(false);
    const renderedLabel = useMemo(() => {
      return (
        <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
          {label} <Text style={plaiStyles.fontRed}> *</Text>
        </Text>
      );
    }, [label]);

    return (
      <>
        <View style={[plaiStyles.mt24, plaiStyles.borderbf0]}>
          <View style={[plaiStyles.justifyBetween, plaiStyles.row]}>
            {renderedLabel}
            <Text style={[plaiStyles.fontGreycc]}>{value ? value.length : '0'}/13</Text>
          </View>

          <View style={[plaiStyles.flex, plaiStyles.row]}>
            <Pressable
              style={[plaiStyles.py8, plaiStyles.selfCenter, plaiStyles.row]}
              onPress={() => setisVisible(true)}
            >
              <Text style={[plaiStyles.fontGrey66]}>{selectedCode?.key}</Text>
              <Icon name="chevron-down" size={16} color={PruColor.grey66} />
            </Pressable>
            <TextInput
              style={[plaiStyles.pl4, plaiStyles.font16, plaiStyles.flex, plaiStyles.py8]}
              placeholder="enter phone number"
              value={value}
              onChangeText={setValue}
              keyboardType="phone-pad"
              {...rest}
            />
          </View>
          <Selection
            titleHeader={'Phone Code'}
            keyMap={{
              search: 'label',
            }}
            visible={isVisible}
            onClose={() => setisVisible(!isVisible)}
            data={data?.map((value) => {
              return { label: value.country, key: value.code };
            })}
            selected={selectedCode}
            onSelected={onSelectedCode}
            button={{
              primaryOnPress: () => setisVisible(!isVisible),
            }}
          />
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
