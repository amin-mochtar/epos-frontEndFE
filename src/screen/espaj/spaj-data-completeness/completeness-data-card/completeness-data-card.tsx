import { View, Text, Image, Pressable } from 'react-native';
import React, { memo, useMemo } from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { urgent2, success2 } from '../../../../assets';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Trans } from 'react-i18next';
import { pruTestID } from 'common_services_frontend';
import { ISPAJDataCompleteness } from '../../../../utilities';

type TCompletenessDataCard = {
  sequenceNumber: number;
  categoryKey: string;
  data: ISPAJDataCompleteness[];
  productKey?: string;
};

export const CompletenessDataCard = memo(({ sequenceNumber, categoryKey, data, productKey }: TCompletenessDataCard) => {
  const navigation = useNavigation();

  const sortedData = useMemo(() => {
    return (data ?? []).slice().sort((a, b) => {
      // Providing a default value for undefined 'order'
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      return orderA - orderB;
    });
  }, []);

  const showSubHeader = useMemo(() => {
    return ['E1O', 'E1OP'].includes(productKey ?? '') && categoryKey == 'Data Kesehatan';
  }, [data]);

  return (
    <View style={[plaiStyles.bgwhite, plaiStyles.px16, plaiStyles.py16, plaiStyles.br12, plaiStyles.mb12]}>
      <View style={[plaiStyles.row]}>
        <View style={[plaiStyles.bgBtnRed, plaiStyles.wrapperCircleBtnRed]}>
          <Text style={[plaiStyles.fontWhite]}>{sequenceNumber}</Text>
        </View>
        <Text
          style={[plaiStyles.ml8, plaiStyles.selfCenter, plaiStyles.fontBold, plaiStyles.font18, plaiStyles.lineH24]}
        >
          <Trans
            i18nKey={categoryKey}
            components={{
              i: <Text style={[plaiStyles.fontItalic, plaiStyles.fontBold, plaiStyles.font18]} />
            }}
          />
        </Text>
      </View>
      {showSubHeader && (
        <Text style={[plaiStyles.mt24, plaiStyles.mb12, plaiStyles.fontBold, plaiStyles.font16, plaiStyles.lineH24]}>
          Calon Peserta Tambahan 1
        </Text>
      )}
      {sortedData.map((value: ISPAJDataCompleteness, index: number) => (
        <Pressable
          onPress={() => {
            if (value?.route) {
              navigation.dispatch(StackActions.replace(value?.route, value.params))
            } else {
              return null
            }
          }}
          key={index}
          style={[plaiStyles.borderbf0, plaiStyles.row, plaiStyles.justifyBetween]}
          {...pruTestID(`card-completeness-${categoryKey}-${index}`)}
        >
          <Text style={[plaiStyles.fontBlack, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.my16, plaiStyles.flex]}>
            <Trans
              i18nKey={value?.name}
              components={{
                i: <Text style={[plaiStyles.fontItalic, plaiStyles.fontBlack, plaiStyles.font14]} />
              }}
            />
          </Text>
          <Image style={[plaiStyles.ml8, plaiStyles.selfCenter]} source={value?.status ? success2 : urgent2} testID={`card-completeness-${value?.name ?? ''}-${index}-${value?.status ? 'true' : 'false'}`} />
        </Pressable>
      ))}
    </View>
  );
});
