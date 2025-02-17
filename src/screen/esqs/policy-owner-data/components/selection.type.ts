import { ICustomerStorage } from "../../../../utilities";

export type RegisteredType = 'draft' | 'registered'

export type TSelectionData = Record<RegisteredType, ICustomerStorage[]>

export type TSelection = {
  // Title on top of modal container
  titleHeader: string;
  keyMap?: {
    // Key for Show selected value Label
    // default is label
    label?: keyof ICustomerStorage;
    // Key for Show selected value Label
    // default is label
    subLabel?: keyof ICustomerStorage;
    //The modal container will appear when "visible" is true
    value?: keyof ICustomerStorage;
    // Searchbar show if there is value
    // value: string = field on object want to search
    search?: keyof ICustomerStorage;
  };
  visible: boolean;
  // The function for open/colse modal container
  onClose: () => void;
  // List data for selection
  data: TSelectionData;
  // Selected Data
  selected: ICustomerStorage;
  // Function For set Selected Data
  onSelected?: (value: ICustomerStorage) => void;
  // the theme for list data
  theme?: 'checkbox' | 'radio-button';
  // Groupping by field entered
  group?: {
    key?: string;
    label?: string;
  };
  // Config for Search
  // This Work When Keymap Search is not undefined
  search?: {
    isOnChangeSearch?: boolean;
    minLength?: number;
  };
  // Config for Button
  button?: {
    // One or Two Button
    // Default is One Using Primary
    type?: 'one' | 'two';
    // Button Secondary
    secondaryText?: string;
    secondaryOnPress?: () => void;
    // Button Primary
    primaryText?: string;
    primaryOnPress?: () => void;
  };
  disabledBackdropPress?: boolean;
  disabled: boolean;
};
