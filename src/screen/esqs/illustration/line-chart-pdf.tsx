import { View, Text } from 'react-native';
import React, { LegacyRef, memo, useEffect, useRef, useState } from 'react';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { numberWithCommas } from 'plai_common_frontend';

export const LineChartPDF = React.forwardRef((props: { data: any }, ref: LegacyRef<any>) => {
  const { data } = props;
  const dataChart = [
    {
      data: data.alive99Low,
      svg: { stroke: '#8800cc' },
    },
    {
      data: data.alive99Mid,
      svg: { stroke: 'green' },
    },
    {
      data: data.alive99Hig,
      svg: { stroke: 'red' },
    },
    {
      data: data.akumulasiPremi,
      svg: { stroke: 'black' },
    },
  ];

  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  return (
    <View ref={ref} style={{ flexDirection: 'row', width: 700, height: 300 }}>
      <YAxis
        data={data.alive99Hig.slice(0, 40)}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        formatLabel={(value: number) => `${numberWithCommas(String(value))}`}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={dataChart}
          contentInset={verticalContentInset}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={[
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          ]}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={axesSvg}
        />
      </View>
    </View>
  );
});
