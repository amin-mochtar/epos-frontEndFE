import React, { memo, useEffect, useState } from 'react';
import { CardFundListType } from './accordion-fund.type';
import { Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FundList } from '../fund-list/fund-list';
import { plaiStyles, setMultipleSelect } from 'plai_common_frontend';
import { dataConverter } from 'policy_frontend/src/utils/data-utils';
import { pruTestID } from 'common_services_frontend';

export const CardFundList = ({
  onSelectedFund,
  onSlideChange,
  openFactSheet,
  data,
  selectedFund,
  valueRiskProfile,
  section,
  setVisible,
}: CardFundListType) => {
  const [expander, setExpander] = useState<number[]>([]);
  const [multipleDoor, setMultipleDoor] = useState<number[]>([]);
  const [numberValidation, setNumberValidation] = useState<number>();

  useEffect(() => {
    if (expander.length === 0) setExpander(valueRiskProfile == 1 ? [0] : valueRiskProfile == 2 ? [0, 1] : [0, 1, 2]);
  }, []);

  useEffect(() => {
    const agresif = valueRiskProfile == 3;
    const flagChecker = numberValidation !== valueRiskProfile - 1;
    const isDataReduced = multipleDoor.length >= expander.length;

    const shouldSetVisible =
      (valueRiskProfile === 1 && (expander.includes(1) || expander.includes(2)) && !isDataReduced) ||
      (valueRiskProfile === 2 && expander.includes(2) && !isDataReduced);

    if (flagChecker && shouldSetVisible && !agresif) {
      setVisible(true);
      setMultipleDoor(expander);
    }
  }, [expander]);

  return (
    <>
      {data.map((item, index) => {
        const tempValueFundRp = item.categoryName == 'Konservatif' ? 1 : item.categoryName == 'Moderat' ? 2 : 3;
        const isDisableFund = tempValueFundRp > valueRiskProfile;
        return (
          <View style={[plaiStyles.px16, plaiStyles.br12, plaiStyles.bgwhite, plaiStyles.mt12]}>
            <TouchableOpacity
              onPress={() => {
                setExpander(setMultipleSelect(expander, index));
                setNumberValidation(index);
              }}
              style={[plaiStyles.row, plaiStyles.alignCenter, plaiStyles.py16]}
              {...pruTestID(`accordion-${item.categoryName}`)}
            >
              <View style={[plaiStyles.flex]}>
                <View style={[plaiStyles.flex, plaiStyles.row]}>
                  <Text style={[plaiStyles.font16, plaiStyles.fontGrey33, plaiStyles.lineH24]}>
                    {item.categoryName}
                  </Text>
                  <Text style={[plaiStyles.font16, plaiStyles.fontGrey33, plaiStyles.lineH24, plaiStyles.ml8]}>
                    {isDisableFund ? '' : `${item.totalValueFund}%`}
                  </Text>
                </View>
                <Text style={[plaiStyles.font14, plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>{`${item.data.length
                  } Product Fund ${isDisableFund ? 'tidak ' : ''}dapat dipilih`}</Text>
              </View>
              <Icon name={item.isExpand ? 'chevron-up' : 'chevron-down'} size={24} />
            </TouchableOpacity>
            {expander.includes(index) ? (
              <FundList
                fund={item.data}
                onSelectedFund={onSelectedFund}
                onSlideChange={onSlideChange}
                selectedFund={selectedFund}
                isDisableFund={isDisableFund}
                section={section}
                indexCategory={index}
                openFactSheet={openFactSheet}
              />
            ) : (
              <></>
            )}
          </View>
        );
      })}
    </>
  );
};
