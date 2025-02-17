import { PruColor } from "common_ui_components";
import { plaiStyles } from "plai_common_frontend";
import { Pressable, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';


export const CardDoksul = ({ label, onPress }: { label: string; onPress: () => void }) => {
  return (
    <Pressable
      style={[
        plaiStyles.boxShadowProp,
        plaiStyles.br8,
        plaiStyles.px20,
        plaiStyles.py20,
        plaiStyles.bgwhite,
        plaiStyles.mt12,
        plaiStyles.mb12,
      ]}
      onPress={onPress}
    >
      <View style={[plaiStyles.alignCenter, plaiStyles.row, plaiStyles.justifyBetween]}>
        <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16]}>{label}</Text>
        <Icon name="arrow-right" size={25} color={PruColor.grey33} />
      </View>
    </Pressable>
  );
};