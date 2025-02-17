import { StyleProp, ViewStyle } from 'react-native';
import { TSelectionData } from './selection.type';
import { ICustomerStorage } from '../../../../utilities';

export type TConversionType = {
  //style container
  containerStyle?: StyleProp<ViewStyle>;
  // Label
  labelMap: {
    // On Top Form
    title?: string;
    // Title on Modal
    titleHeaeder?: string;
    // Placeholder
    placeholder?: string;
    // Prefix when use group
    group?: string;
  };
  // Key
  keyMap?: {
    // Key for Search By
    search?: keyof ICustomerStorage;
    // Key for Grouping selection
    group?: string;
    // Key for Show selected value Label
    // default is label
    label?: keyof ICustomerStorage;
    // Key for Show selected value subLabel
    // default same as label
    subLabel?: keyof ICustomerStorage;
    // key for label on modal
    // default same as label
    labelOption?: keyof ICustomerStorage;
    // key for compare value selected
    // default is key
    value?: keyof ICustomerStorage;
  };
  // List data for selection
  data: TSelectionData;
  // Selected Data
  selected?: ICustomerStorage
  // Function For set Selected Data
  onSelected?: (value: ICustomerStorage) => void;
  // Search by field entered
  // For show icon stars on right label
  // Default True
  required?: boolean | undefined;
  // Groupping by field entered
  // the theme for data list
  theme?: 'checkbox' | 'radio-button';
  // error message validation
  error?: any;
  // function when pressed close
  onPressClose?: () => void;
  // Config for Search
  // This Work When Keymap Search is not undefined
  search?: {
    isOnChangeSearch?: boolean;
    minLength?: number;
  };
  disabledBackdropPress?: boolean;

  // id for testing component
  id?: string;

  // button text
  buttonPrimaryText?: string;

  onDisabled?: boolean;
  lastPage?: string;

  //when submit data
  handlerTransformDataCustomer?: () => void;
};
