import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { plaiStyles, DropdownField, numberWithCommas } from 'plai_common_frontend';
import Styles from './quick-quote-details.styles';
import { PruColor, PruHeader, PruScreen } from 'common_ui_components';
import { ProgressStep } from '../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IQuickQuoteResult, TCommonOptionalData } from '../../../utilities';

export const QuickQuoteDetailsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { data } = params as { data: IQuickQuoteResult };
  const [risk, setRisk] = useState(
    data.detail.stepIndicator.map((item: any) => {
      return {
        [item.label]: item.value,
      };
    }),
  );
  const [years, setYears] = useState({
    label: data?.detail?.option?.value || '120',
    key: data?.detail?.option?.value || '120',
  });
  const progressStepLabel = useMemo(() => {
    if (risk?.length > 0) {
      return risk.map((item: any) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return `${key + '\n'}${numberWithCommas(String(value || 0))}`;
      });
    }
    return [];
  }, [risk]);
  const onChangeYears = (data: any) => {
    setYears(data);
  };

  useEffect(() => {
    if (data.detail.ilustration?.length > 0) {
      const findByYears = data.detail.ilustration.find((item: any) => item.customerAge === years.key);
      if (findByYears) {
        const { lowClient, medClient, highClient, benClient } = findByYears;
        const value = [lowClient, medClient, highClient, benClient];
        setRisk(
          data.detail.stepIndicator.map((item: any, index: number) => {
            return {
              [item.label]: value[index] || '0',
            };
          }),
        );
      }
    }
  }, [years]);
  return (
    <PruScreen>
      <View style={Styles.container}>
        <PruHeader headerText="Detail Quick Quote" leftIcon="arrow_back" onLeftPress={() => navigation.goBack()} />
        <ScrollView>
          <View style={Styles.contentWrapper}>
            <Text style={Styles.quickQuote1}>Quick Quote 1</Text>
            <Text style={Styles.proteksiJiwa}>{data.insuranceGoal}</Text>
            <View style={Styles.lineHorizontal} />
            {data?.detail?.listItem.map((item: TCommonOptionalData, index: number) => {
              return (
                <View key={index}>
                  {item.label!.toUpperCase().includes('PRU') ? (
                    <Text style={Styles.product}>
                      <Text style={StyleSheet.flatten({ color: PruColor.red })}>{item.label!.substring(0, 3)}</Text>
                      {item.label!.substring(3)}
                    </Text>
                  ) : (
                    <Text style={Styles.product}>{item.label}</Text>
                  )}

                  {item.value.toUpperCase().includes('PRU') ? (
                    <Text style={Styles.amount}>
                      <Text style={StyleSheet.flatten({ color: PruColor.red })}>{item.value.substring(0, 3)}</Text>
                      {item.value.substring(3)}
                    </Text>
                  ) : (
                    <Text style={Styles.amount}>{item.value}</Text>
                  )}
                </View>
              );
            })}

            {/* rider */}
            {data.detail.rider.length > 0 && (
              <View style={StyleSheet.flatten({ ...Styles.lineHorizontal, marginTop: 16 })} />
            )}
            {data.detail.rider.map((item: any, index: number) => {
              return (
                <View key={index}>
                  {item.label.includes('PRU') ? (
                    <Text style={Styles.product}>
                      <Text style={StyleSheet.flatten({ color: PruColor.red })}>{item.label.substring(0, 3)}</Text>
                      {item.label.substring(3)}
                    </Text>
                  ) : (
                    <Text style={Styles.product}>{item.label}</Text>
                  )}

                  <Text style={Styles.amount}>{item.value}</Text>
                </View>
              );
            })}

            {/* investment funds  */}
            {data?.detail?.investmentFunds && (
              <>
                <View style={StyleSheet.flatten({ ...Styles.lineHorizontal, marginTop: 16 })} />
                <Text style={Styles.amount}>{data.detail.investmentFunds.label}</Text>
              </>
            )}
            {(data?.detail?.investmentFunds?.value || []).map((item: any, index: number) => {
              return (
                <View key={index} style={StyleSheet.flatten({ ...Styles.row, marginBottom: 8, width: '90%' })}>
                  <Text style={StyleSheet.flatten({ ...Styles.amount, marginRight: 8, marginBottom: 0 })}>
                    {item.value}
                  </Text>
                  {item.label.includes('PRU') ? (
                    <Text style={Styles.product}>
                      <Text style={StyleSheet.flatten({ color: PruColor.red })}>{item.label.substring(0, 3)}</Text>
                      {item.label.substring(3)}
                    </Text>
                  ) : (
                    <Text style={Styles.product}>{item.label}</Text>
                  )}
                </View>
              );
            })}

            {/* investment funds topup */}
            {data?.detail?.investmentFundsTopup && (
              <>
                <View style={StyleSheet.flatten({ ...Styles.lineHorizontal, marginTop: 16 })} />
                <Text style={Styles.amount}>{data?.detail?.investmentFundsTopup.label}</Text>
              </>
            )}
            {(data?.detail?.investmentFundsTopup?.value || []).map((item: any, index: number) => {
              return (
                <View key={index} style={StyleSheet.flatten({ ...Styles.row, marginBottom: 8, width: '90%' })}>
                  <Text style={StyleSheet.flatten({ ...Styles.amount, marginRight: 8, marginBottom: 0 })}>
                    {item.value}
                  </Text>
                  {item.label.includes('PRU') ? (
                    <Text style={Styles.product}>
                      <Text style={StyleSheet.flatten({ color: PruColor.red })}>{item.label.substring(0, 3)}</Text>
                      {item.label.substring(3)}
                    </Text>
                  ) : (
                    <Text style={Styles.product}>{item.label}</Text>
                  )}
                </View>
              );
            })}

            {(data?.detail?.assumedCashValue && data.detail.ilustration) && (
              <>
                <View style={StyleSheet.flatten({ ...Styles.lineHorizontal, marginTop: 16 })} />
                <View>
                  <Text style={Styles.asumsiNilaiTunai}>{data.detail.assumedCashValue.label}</Text>
                  <Text style={Styles.asumsiNilaiTunaiTahun}>{data.detail.assumedCashValue.value}</Text>
                </View>
              </>
            )}

            {(data?.detail?.option && data.detail.ilustration) && (
              <DropdownField
                containerStyle={plaiStyles.mt16}
                labelMap={{
                  title: data?.detail?.option?.label || 'Pilih Usia',
                  placeholder: data?.detail?.option?.label || 'Pilih Usia',
                }}
                data={data.detail.optionData}
                selected={years}
                onSelected={onChangeYears}
              />
            )}

            {(data?.detail?.stepIndicator.length > 0 && data.detail.ilustration) && (
              <View style={Styles.progressStepWrapper}>
                <ProgressStep
                  direction="vertical"
                  currentPosition={progressStepLabel.length}
                  renderLabel={({ label }) => <Text style={Styles.stepLabel}>{label}</Text>}
                  labels={progressStepLabel}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </PruScreen>
  );
};
