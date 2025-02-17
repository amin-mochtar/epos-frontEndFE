import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { color } from 'common_ui_components/app/theme'
import { plaiStyles } from 'plai_common_frontend'

export const cStyles = {
  wrapperWithTitle: [plaiStyles.mt24, plaiStyles.borderbf0] as ViewStyle,
  wrapperWarning: {
    backgroundColor: '#FFEFE3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 24,
  } as ViewStyle,
  textWarning: {
    color: '#FF872E',
    fontWeight: '500',
    fontSize: 12,
    flexWrap: 'wrap',
    lineHeight: 18,
    width: '95%',
  } as TextStyle,
  textPru: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: color.majorRed,
    marginRight: 5,
  } as TextStyle,
  textBenefit: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: color.black,
  } as TextStyle,
  button: {
    backgroundColor: '#FFE4E6',
    marginBottom: 10,
  } as ViewStyle,
}
