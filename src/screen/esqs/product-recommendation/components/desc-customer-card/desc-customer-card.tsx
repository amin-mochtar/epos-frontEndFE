import { plaiStyles } from 'plai_common_frontend';
import React, { memo, useMemo } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { DescCustomerCardType } from './desc-customer-card.type';
import { PruColor } from 'common_ui_components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { INSURANCE_GOALS_OPTION, WR_SHARIA_CONVENT, calculateAge } from '../../../../../utilities';
import { femaleImageBanner, maleImageBanner } from '../../../../../assets';

export const DescCustomerCard = memo(({ data, lifeAssuredData, mainInsuredData, onPress }: DescCustomerCardType) => {

  const lifeAssuredSelf = data?.lifeAssuredSelf;

  const insuranceGoal = useMemo(() => {
    const _getProduct = INSURANCE_GOALS_OPTION
      .filter((item: any) => data?.insuranceGoal.includes(item?.key))
      .map((value) => value.label);

    if (_getProduct && _getProduct.length <= 1) {
      return _getProduct[0];
    }

    return _getProduct?.slice(0, -1).join(', ') + ' & ' + _getProduct?.pop();
  }, []);

  const ageANB = calculateAge(
    lifeAssuredSelf !== 'self' ? mainInsuredData?.clientDateBirth! : lifeAssuredData?.clientDateBirth!,
    true,
  );
  const wording = useMemo(() => WR_SHARIA_CONVENT[data?.policyType || 'conventional'], []);

  const participant = useMemo(() => {
    const productKey = data?.product?.key || '';

    const keyMapping: Record<string, string> = {
      'U12': wording.lifeAssured,
      'U13': wording.lifeAssured,
      'E1O': wording.lifeAssured_1,
      'E1OP': wording.lifeAssured_1,
    };

    return keyMapping[productKey] || wording.insurancePayor;
  }, []);


  const cardGender = lifeAssuredSelf !== 'self' ? mainInsuredData?.clientGender?.key : lifeAssuredData?.clientGender?.key
  const gender = cardGender === 'M' ? maleImageBanner : femaleImageBanner;

  return (
    <ImageBackground
      source={gender}
      style={[
        plaiStyles.row,
        plaiStyles.spacingp,
        plaiStyles.mt24,
        { borderRadius: 10, overflow: 'hidden' }
      ]}
      resizeMode={'cover'}
    >
      <View style={plaiStyles.flex}>
        <Text style={[plaiStyles.font16, plaiStyles.fontWhiteBold, plaiStyles.lineH24]}>
          {lifeAssuredSelf !== 'self' ? mainInsuredData?.clientName : lifeAssuredData?.clientName} ({ageANB})
        </Text>
        <Text style={[plaiStyles.font14, plaiStyles.fontWhiteThin, plaiStyles.lineH20]}>
          {lifeAssuredSelf !== 'self' ? mainInsuredData?.clientGender?.label : lifeAssuredData?.clientGender?.label},{' '}
          {lifeAssuredSelf !== 'self'
            ? mainInsuredData?.clientSmokeStatus?.label
            : lifeAssuredData?.clientSmokeStatus?.label}
        </Text>
        <Text style={[plaiStyles.font14, plaiStyles.fontWhiteThin, plaiStyles.lineH20, plaiStyles.mt16]}>
          Pekerjaan sebagai{' '}
          {lifeAssuredSelf !== 'self' ? mainInsuredData?.clientJob?.nameInd : lifeAssuredData?.clientJob?.nameInd}.{' '}
          {lifeAssuredSelf !== 'self' ? mainInsuredData?.clientName : lifeAssuredData?.clientName} (Calon {participant})
          Memprioritaskan tujuan keuangan di {insuranceGoal || ''} .
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        {/* <Icon name="edit" color={PruColor.white} size={23} /> */}
      </TouchableOpacity>
    </ImageBackground>
  );
});
