import { StyleSheet } from 'react-native';
import { color } from 'common_ui_components/app/theme';

export const SubStyles = StyleSheet.create({
  wrapperSelect: {
    borderBottomColor: '#D6DADE',
    borderBottomWidth: 1,
    marginTop: 24,
  },
  btnRemove: {
    borderColor: color.grey99,
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginTop: 24,
  },
  btnAdd: {
    backgroundColor: '#FFE4E6',
    marginTop: 24,
  },
  footerHeader: {
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: color.greycc,
    elevation: 5,
    paddingHorizontal: 16,
    shadowOpacity: 0.4,
    backgroundColor: color.white,
  },
  btnRemoveData: {
    backgroundColor: '#FFE4E6',
    marginTop: 20,
    paddingVertical: 12,
  },
  btn: {
    borderRadius: 10,
    shadowOpacity: 0,
    height: 48,
    marginTop: 16,
  },
});
