import { PruColor } from 'common_ui_components'
import { StyleSheet } from 'react-native'

export const TWStyles = StyleSheet.create({
  inputLeft: {
    width: '40%',
    height: 55,
  },
  inputRight: {
    width: '50%',
    height: 55,
  },
  footerHeader: {
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: PruColor.greycc,
    elevation: 5,
    paddingHorizontal: 16,
    shadowOpacity: 0.4,
    backgroundColor: PruColor.white,
  },
})
