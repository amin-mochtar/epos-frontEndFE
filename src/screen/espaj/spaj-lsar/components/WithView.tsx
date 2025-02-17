import {  View } from 'react-native';
import React from 'react';
import { plaiStyles } from 'plai_common_frontend';

type Props = {
  children: React.ReactNode;
};

const WithSpacing = ({ children }: Props) => {
  return <View style={[plaiStyles.my8]}>{children}</View>;
};

export default WithSpacing;
