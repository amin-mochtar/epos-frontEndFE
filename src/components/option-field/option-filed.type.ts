import { StyleProp, ViewStyle } from 'react-native';
import { TOptionalCardData } from '../option-card/option-card.type';

export type TOptionField = {
  label: string;
  type?: 'radio' | 'checkbox';
  theme?: 'simple' | 'simpleborder' | 'border' | 'default';
  data: TOptionalCardData[];
  style?: StyleProp<ViewStyle>;
  insideStyle?: StyleProp<ViewStyle>;
  selected: TOptionalCardData | TOptionalCardData[] | string | boolean | number | string[];
  onSelected: (value: TOptionalCardData) => void;
  children?: React.ReactNode;
  onDisabled?: (item: TOptionalCardData) => boolean;
  required?: boolean;
  error?: any;
};
