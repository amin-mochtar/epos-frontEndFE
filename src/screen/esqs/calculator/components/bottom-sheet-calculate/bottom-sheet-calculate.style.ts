import { Platform, StyleSheet } from 'react-native';
import { color } from 'common_ui_components/app/theme';

const isAndroid = Platform.OS === 'android';

export const BSCStyles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: isAndroid ? color.black : color.greycc,
    elevation: 24,
    padding: 16,
    shadowOpacity: 0.4,
    borderTopColor: isAndroid ? color.greyf0 : color.greyf4,
    borderTopWidth: 1,
  },
});
