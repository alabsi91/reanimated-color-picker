import type { StyleProp, TextStyle, ViewStyle, ImageStyle, TextInputProps } from 'react-native';
import type { TCTX } from '../../types';

export type InputProps = Omit<
  TextInputProps,
  | 'ref'
  | 'style'
  | 'value'
  | 'maxLength'
  | 'onChangeText'
  | 'onBlur'
  | 'onFocus'
  | 'keyboardType'
  | 'autoComplete'
  | 'autoCorrect'
  | 'selectTextOnFocus'
  | 'defaultValue'
>;

export type WidgetProps = {
  onChange: (color: string) => void;
  returnedResults: TCTX['returnedResults'];
  hueValue: TCTX['hueValue'];
  saturationValue: TCTX['saturationValue'];
  brightnessValue: TCTX['brightnessValue'];
  alphaValue: TCTX['alphaValue'];
  inputStyle: StyleProp<TextStyle>;
  inputTitleStyle?: StyleProp<TextStyle>;
  inputProps: InputProps;
};

type defaultFormats = 'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV';

export type InputWidgetProps = {
  defaultFormat?: defaultFormats;
  formats?: readonly defaultFormats[];
  inputStyle?: StyleProp<TextStyle>;
  inputTitleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
  iconStyle?: StyleProp<ImageStyle>;
  inputProps?: InputProps;
};
