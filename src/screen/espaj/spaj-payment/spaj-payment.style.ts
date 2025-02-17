import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { color } from 'common_ui_components/app/theme'
import { plaiStyles } from 'plai_common_frontend'

export const cStyles = {
  wrapperWithTitle: [plaiStyles.mt24, plaiStyles.borderbf0] as ViewStyle,
  wrapperSuccess: {
    backgroundColor: '#EBF3FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 24
  } as ViewStyle,
  textSuccess: {
    color: '#4386E5',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  } as TextStyle
}
