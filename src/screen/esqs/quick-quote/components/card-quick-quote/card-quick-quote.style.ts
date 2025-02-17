import { PruColor } from 'common_ui_components'
import { ViewStyle } from 'react-native'

export const cQQStyle = {
  header: {
    borderBottomColor: PruColor.greyf0,
    borderBottomWidth: 1,
  } as ViewStyle,
  headerSelected: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#FFE4E6',
  } as ViewStyle,
  wrapperSelected: {
    borderColor: PruColor.majorRed,
    borderWidth: 2,
  } as ViewStyle,
}
