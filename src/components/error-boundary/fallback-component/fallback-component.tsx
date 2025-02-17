import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'common_ui_components/app/components-ui';
import { plaiStyles } from 'plai_common_frontend';

export type Props = { error: Error; resetError: () => void };

const FallbackComponent = (props: Props) => {
  return (
    <View style={[plaiStyles.flex, plaiStyles.alignCenter, plaiStyles.justifyCenter, plaiStyles.px24]}>
      <Text style={[plaiStyles.font24, plaiStyles.fontBold, plaiStyles.mb24]}>Oops Theres A Problem With your App</Text>
      <Button onPress={props.resetError}>Back To Proposal</Button>
    </View>
  );
};

export default FallbackComponent;
