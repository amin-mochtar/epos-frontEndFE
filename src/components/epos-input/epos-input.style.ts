import { StyleSheet, ViewStyle } from 'react-native'
import { color } from 'common_ui_components/app/theme'

export const EIStyle = {
  label: {
    color: color.grey66,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  } as ViewStyle,
  star: { color: color.primaryRed },
  wrapperInput: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 36,
  } as ViewStyle,
  input: {
    fontSize: 14,
    fontWeight: '400',
    color: color.black,
  } as ViewStyle,
  wrapperItemRight: {
    width: '13.5%',
    alignSelf: 'center',
  } as ViewStyle,
  itemRight: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  } as ViewStyle,
  error: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 12,
    color: color.primaryRed,
  } as ViewStyle,
}
