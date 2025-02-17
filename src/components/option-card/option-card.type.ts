import { StyleProp, ViewStyle } from 'react-native';

export type TOptionalCardData = {
  key: string | boolean | number;
  title?: string | React.ReactNode;
  label?: string | React.ReactNode;
  detail?: string;
  icon?: string | React.ReactNode;
  caption?: React.ReactNode;
  [key: string]: any;
};

export type OptionCardProps = {
  // if text use Translation
  translation?: boolean;
  // label for show
  label?: string;
  // type selected want to use
  type?: 'radio' | 'checkbox';
  theme?: 'simple' | 'simpleborder' | 'border' | 'default';
  // list data for option selected
  data: TOptionalCardData[];
  style?: StyleProp<ViewStyle>;
  insideStyle?: StyleProp<ViewStyle>;
  // selected data
  selected?: TOptionalCardData | TOptionalCardData[] | string | boolean | number | string[];
  // callback for selected data
  onSelected: (value: TOptionalCardData) => void;
  children?: React.ReactNode;
  // if want to disable option
  onDisabled?: (item: TOptionalCardData) => boolean;
  spaceItem?: number;
  // show * on label
  required?: boolean;
  error?: any;
  icon?: string;
  handlerTooltip?: any;
  uniqueTestId?: string
};
