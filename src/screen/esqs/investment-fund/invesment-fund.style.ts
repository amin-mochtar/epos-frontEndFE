import { PruColor } from "common_ui_components";
import { StyleSheet } from "react-native";

export const IFStyle = StyleSheet.create({
  boxGreyE6: {
    backgroundColor: PruColor.greye6,
    borderRadius: 8,
    paddingVertical: 8
  },

  wrapperWarning: {
    backgroundColor: '#FFEFE3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 24,
  },
  textWarning: {
    color: '#FF872E',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  },
});