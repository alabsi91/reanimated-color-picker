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
  /**
   * - The initial input widget color format.
   * - You can select one of the following options: `'HEX'`, `'RGB'`, '`HSL'`, `'HWB'`, or `'HSV'`
   */
  defaultFormat?: defaultFormats;
  /**
   * - What input widgets should be included that can be cycled through.
   * - Avilable options: `'HEX'`, `'RGB'`, '`HSL'`, `'HWB'`, and `'HSV'`
   */
  formats?: readonly defaultFormats[];
  /** - `InputText` components style. */
  inputStyle?: StyleProp<TextStyle>;
  /** - The props for the `TextInput` components. */
  inputProps?: InputProps;
  /** - The style of the `Text` component for the title located below the inputs. */
  inputTitleStyle?: StyleProp<TextStyle>;
  /** - The style of the `View` component that wraps around all the widgets. */
  containerStyle?: StyleProp<ViewStyle>;
  /** - The color of the cycle button icon (`Image` component). */
  iconColor?: string;
  /** - The style of the cycle button (`Image` component). */
  iconStyle?: StyleProp<ImageStyle>;
};
