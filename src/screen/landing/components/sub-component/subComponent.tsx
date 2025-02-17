import { plaiStyles } from "plai_common_frontend";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";

export const LHComponent = ({ isMultipleSync }: { isMultipleSync: boolean }) => {
  return !isMultipleSync ? (
    <Text style={[plaiStyles.fontGrey99Thin, plaiStyles.pt16]}>
      Data diperbarui Senin, 27 Februari 2023 pukul 10.59
    </Text>
  ) : (
    <></>
  );
};


export const LFComponent = ({ allDataloaded, loading }: { allDataloaded: boolean; loading: boolean }) => {
  return allDataloaded ? (
    <Text style={[plaiStyles.textCenter, plaiStyles.mt4, plaiStyles.mb4, plaiStyles.fontGrey99Bold]}>
      Tidak ada data
    </Text>
  ) : loading ? (
    <ActivityIndicator size="small" style={[plaiStyles.justifyCenter, plaiStyles.alignCenter, plaiStyles.mt10]} />
  ) : (
    <></>
  );
};

