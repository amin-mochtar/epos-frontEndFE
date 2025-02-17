import { TextInput, ViewStyle } from 'react-native'

export type TypeEposInput = React.ComponentPropsWithRef<typeof TextInput> & {
  //optional style container
  containerStyle?: ViewStyle

  // required for input default
  label: string

  // required for input default
  placeholder: string

  // required (received state value)
  value: any

  // required (state function for change state value)
  setValue: (value: any) => void

  // optional for input with the value from params (exp: budget-input component)
  itemRight?: any

  // required (error validation)
  error: any
}
