import type { ReactNode } from 'react';
import type { ImageStyle, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyleProp, SharedValue } from 'react-native-reanimated';
import type { SupportedColorFormats } from './colorKit/types';
import type { Gesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

export interface returnedResults {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  hwb: string;
  hwba: string;
}

export type thumbShapeType =
  | 'ring'
  | 'solid'
  | 'hollow'
  | 'line'
  | 'plus'
  | 'pill'
  | 'triangleUp'
  | 'triangleDown'
  | 'doubleTriangle'
  | 'rect'
  | 'circle';

export type HSVObject = {
  h: number;
  s: number;
  v: number;
  a: number;
};

type HSVObjectSharedValue = {
  hue: SharedValue<number>;
  saturation: SharedValue<number>;
  brightness: SharedValue<number>;
  alpha: SharedValue<number>;
};

export type RenderThumbProps = {
  /**
   * - This style determines the position of the thumb and is a crucial element that should be included.
   * - It should be tied to an `Reanimated` component, for example, `<Animated.View style={positionStyle} />`.
   */
  positionStyle: StyleProp<ViewStyle | ImageStyle | TextStyle>;

  /**
   * - A `number` that determines the thumb's width in pixels and is important for thumb position calculation.
   * - It's extracted from the `thumbSize` prop.
   */
  width: number;

  /**
   * - A `number` that determines the thumb's height in pixels and is important for thumb position calculation.
   * - It's extracted from the `thumbSize` prop.
   */
  height: number;

  /**
   * - The `adaptiveColor` is a type of `SharedValue<string>` that determines the color to be displayed based on the contrast ratio.
   * - It can either be a `white` or `black` color.
   */
  adaptiveColor: SharedValue<string>;

  /**
   * - A `SharedValue` of type `string` that represents the current color.
   * - This shared value will update whenever the color changes, but without the alpha channel.
   */
  currentColor: SharedValue<string>;

  /** - The initial color value as a `string` */
  initialColor: string;
};

export type RenderThumbType = React.FC<RenderThumbProps>;

export type ThumbProps = {
  thumbColor?: string;
  handleStyle: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  renderThumb?: RenderThumbType;
  vertical?: boolean;
  adaptSpectrum?: boolean;
  channel?: 'h' | 's' | 'v' | 'a';
  thumbShape?: thumbShapeType;
  thumbSize: number;
  overrideHSV?: Partial<HSVObjectSharedValue>;
};

export interface ExtraThumbProps {
  /** - Panel handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - Panel handle (thumb) color. */
  thumbColor?: string;

  /** - Panel handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /** - Render a line from the center of the Panel to the thumb (handle). */
  renderCenterLine?: boolean;

  /** - Slider's handle (thumb) outer View style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** - Slider's handle (thumb) inner View style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** - Function which receives ThumbProps and renders slider's handle (thumb). */
  renderThumb?: RenderThumbType;

  /** - Called when the user moves the sliders. */
  onChange?: (colors: returnedResults) => void;

  /**
   * - The transform amount for the hue channel.
   * - Can be a `number` or a `string`.
   * - Negative values can be used.
   * - Example: '50%' or `130`
   */
  hueTransform?: string | number;
  /**
   * - The transform amount for the saturation channel.
   * - Can be a `number` or a `string`.
   * - Negative values can be used.
   * - Example: '50%' or `50`
   */
  saturationTransform?: string | number;
  /**
   * - The transform amount for the brightness channel.
   * - Can be a `number` or a `string`.
   * - Negative values can be used.
   * - Example: '50%' or `50`
   */
  brightnessTransform?: string | number;

  /**
   * - Worklet function to transform or modify the color in the HSV (Hue, Saturation, Value) color space.
   * - The function takes an HSVA color object and returns a new HSVA color object.
   * - The returned object will determine the thumb's position inside the panel.
   */
  colorTransform?: (color: HSVObject) => HSVObject;
}

export type BuiltinThumbsProps = {
  width: number;
  height: number;
  borderRadius: number;
  thumbColor?: string;
  adaptiveColor: SharedValue<string>;
  handleStyle: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  solidColor: AnimatedStyleProp<ViewStyle>;
  renderThumb?: RenderThumbType;
  vertical?: boolean;
};

export interface ColorPickerContext {
  /** Color's channels. */
  hueValue: SharedValue<number>;
  saturationValue: SharedValue<number>;
  brightnessValue: SharedValue<number>;
  alphaValue: SharedValue<number>;

  /**
   * A global property that allows the color spectrum to adapt to changes in brightness and saturation for all descendant slider
   * components.
   */
  adaptSpectrum: boolean;

  /** Apply a color to the color picker. */
  setColor: (color: SupportedColorFormats, duration?: number) => void;

  /** A global prop for all sliders children. */
  sliderThickness: number;

  /** A global prop for all sliders children. */
  thumbSize: number;

  /** A global prop for all sliders children. */
  thumbShape: thumbShapeType;

  /** A global prop for all sliders children. */
  thumbColor: string | undefined;

  /** A global prop for all sliders children. */
  thumbStyle: StyleProp<ViewStyle>;

  /** - A global property to controls the scale value animation of the thumb when active. **Default**: `1.2` */
  thumbScaleAnimationValue: number;

  /** - A global property to sets the duration of the scaling-up animation of the thumb when active. **Default**: `100` */
  thumbScaleAnimationDuration: number;

  /**
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb: boolean;

  /** A global style for all sliders children. */
  thumbInnerStyle: StyleProp<ViewStyle>;

  /** A global prop for all sliders children. */
  renderThumb: RenderThumbType | undefined;

  /** The initial color value as a `string` */
  value: string;

  /** The returned results of the color picker. */
  returnedResults: (color?: SupportedColorFormats) => returnedResults;

  /** This function is called when the user lifts the finger from the color picker. */
  onGestureEnd: (color?: SupportedColorFormats) => void;

  /** This function is called every time the color is changed. */
  onGestureChange: (color?: SupportedColorFormats) => void;
}

export interface Panel3Context {
  width: SharedValue<number>;
  adaptSpectrum: boolean;
  centerChannel: 'saturation' | 'brightness' | 'hsl-saturation';
  centerChannelValue: SharedValue<number>;
  thumbShape: thumbShapeType;
  thumbSize: number;
  thumbColor?: string;
  thumbStyle: StyleProp<ViewStyle>;
  thumbInnerStyle: StyleProp<ViewStyle>;
  renderThumb?: RenderThumbType;
  boundedThumb: boolean;
  renderCenterLine: boolean;
  rotate: number;
}

export interface ColorPickerProps {
  /**
   * - A global property that allows the color spectrum to adapt to changes in brightness and saturation for all descendant slider
   *   components.
   */
  adaptSpectrum?: boolean;

  /**
   * - A global property to change the thickness of all descendant sliders components.
   * - Thickness is the width of the slider in vertical mode or the height in horizontal mode.
   */
  sliderThickness?: number;

  /** - A global property to change the duration which the thumbs animate when the value prop changes. */
  thumbAnimationDuration?: number;

  /** - A global property to change the thumb size of all descendant sliders components. */
  thumbSize?: number;

  /** - A global property to change the shape and appearance of the thumb of all descendant sliders components. */
  thumbShape?: thumbShapeType;

  /** - A global property to change the color of the thumb of all descendant sliders components. */
  thumbColor?: string;

  /** - A global property to change the style of the thumb's View for all descendant sliders components */
  thumbStyle?: StyleProp<ViewStyle>;

  /** - A global property to controls the scale value animation of the thumb when active. **Default**: `1.2` */
  thumbScaleAnimationValue?: number;

  /** - A global property to sets the duration of the scaling-up animation of the thumb when active. **Default**: `100` */
  thumbScaleAnimationDuration?: number;

  /**
   * - A global property for all descendant sliders and panels components
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb?: boolean;

  /** - A global property to change the color of the thumb's inner View(s) for all descendant sliders components. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** - A global function for rendering a thumb component based on ThumbProps. */
  renderThumb?: RenderThumbType;

  /** - Color picker wrapper style. */
  style?: StyleProp<ViewStyle>;

  /**
   * - Initial color.
   * - Accepts `hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hsv`, `hsva`, `hwb`, `hwba` and `named color` formats.
   */
  value?: string;

  /** - Called when the user moves the sliders. */
  onChange?: (colors: returnedResults) => void;

  /**
   * - Called when the user lifts his finger off the sliders.
   * - CAUTION : As of `react-native-gesture-handler@2.9.0` the new web implementation does not support the events which trigger
   *   this callback.
   */
  onComplete?: (colors: returnedResults) => void;

  children?: React.ReactNode;
}

export interface ColorPickerRef {
  /** Apply a color to the color picker. */
  setColor: (color: string, duration?: number) => void;
}

export interface SwatchesProps {
  /**
   * - Swatch style.
   * - **Note** Certain style properties will be overridden.
   */
  swatchStyle?: StyleProp<ViewStyle>;

  /** - Swatches container style. */
  style?: StyleProp<ViewStyle>;

  /** - Provide your own swatches colors. */
  colors?: string[];
}

export interface PreviewProps {
  /** - Show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** - Hide initial color preview and show the picked color preview only. */
  hideInitialColor?: boolean;

  /** - Hide color preview text. */
  hideText?: boolean;

  /** - Hide the preview background texture image that appears when the color has an opacity less than 1. */
  disableOpacityTexture?: boolean;

  /**
   * - Preview container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * - Preview text style.
   * - **Note** Certain style properties will be overridden..
   */
  textStyle?: StyleProp<TextStyle>;
}

export interface PreviewTextProps {
  /** - Show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** - Preview text style */
  style?: StyleProp<TextStyle>;
}

export interface PanelProps {
  /** - Panel handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - Panel handle (thumb) color. */
  thumbColor?: string;

  /** - Panel handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /**
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb?: boolean;

  /** - Slider's handle (thumb) outer View style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** - Slider's handle (thumb) inner View style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** - Function which receives ThumbProps and renders slider's handle (thumb). */
  renderThumb?: RenderThumbType;

  /** - Controls the scale value animation of the thumb when active. **Default**: `1.2` */
  thumbScaleUpValue?: number;

  /** - Sets the duration of the scaling-up animation of the thumb when active. **Default**: `100` */
  thumbScaleUpDuration?: number;

  /**
   * - Array of gestures or composed gestures from `react-native-gesture-handler`.
   * - Will run simultaneously with the color picker gestures.
   */
  gestures?: Gesture[];

  /**
   * - Panel container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;
}

export interface Panel2Props extends PanelProps {
  /** - Reverse (flip) hue direction. */
  reverseHue?: boolean;

  /** - Reverse (flip) the direction of the vertical channel's saturation or brightness. */
  reverseVerticalChannel?: boolean;

  /** - Determines which color channel to adjust when moving the thumb vertically on the slider. */
  verticalChannel?: 'saturation' | 'brightness' | 'hsl-saturation';

  /** - Color spectrum adapts to changes in brightness and saturation */
  adaptSpectrum?: boolean;
}

export interface Panel3Props extends PanelProps {
  /** - Determines which color channel to adjust when moving the thumb towards or away from the center of the circular slider. */
  centerChannel?: 'saturation' | 'brightness' | 'hsl-saturation';

  /** - Color spectrum adapts to changes in brightness and saturation */
  adaptSpectrum?: boolean;

  /** - Render a line from the center of the Panel to the thumb (handle). */
  renderCenterLine?: boolean;

  /** - Rotate the hue circle, from 0 to 360 */
  rotate?: number;

  children?: ReactNode;
}

export interface Panel4Props extends PanelProps {
  /** - Reverse (flip) hue direction. */
  reverseHue?: boolean;

  /** - Reverse (flip) the horizontal channel's brightness and saturation. */
  reverseHorizontalChannels?: boolean;
}

export interface Panel5Props {
  /**
   * - Array of gestures or composed gestures from `react-native-gesture-handler`.
   * - Will run simultaneously with the color picker gestures.
   */
  gestures?: Gesture[];

  /**
   * - Panel container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * - The style of the square that indicates the selected color.
   * - **Note** Certain style properties will be overridden.
   */
  selectionStyle?: StyleProp<ViewStyle>;
}

export interface SliderProps {
  /** - Slider's handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - Slider's handle (thumb) color. */
  thumbColor?: string;

  /** - Slider's handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /**
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb?: boolean;

  /** - Slider's handle (thumb) outer View style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** - Slider's handle (thumb) inner View style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** - Function which receives ThumbProps and renders slider's handle (thumb). */
  renderThumb?: RenderThumbType;

  /** - Controls the scale value animation of the thumb when active. **Default**: `1.2` */
  thumbScaleAnimationValue?: number;

  /** - Sets the duration of the scaling-up animation of the thumb when active. **Default**: `100` */
  thumbScaleAnimationDuration?: number;

  /** - Thickness is the width of the slider in vertical mode or the height in horizontal mode. */
  sliderThickness?: number;

  /** - Reverse slider direction. */
  reverse?: boolean;

  /** - Vertical slider. */
  vertical?: boolean;

  /** - Color spectrum adapts to changes in brightness and saturation */
  adaptSpectrum?: boolean;

  /**
   * - Array of gestures or composed gestures from `react-native-gesture-handler`.
   * - Will run simultaneously with the color picker gestures.
   */
  gestures?: Gesture[];

  /**
   * - Slider's container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;
}

export type RgbSliderProps = Omit<SliderProps, 'adaptSpectrum'>;

export interface HueCircularProps extends Omit<SliderProps, 'vertical' | 'reverse' | 'boundedThumb'> {
  children?: ReactNode;

  /** - The style of the container that wraps the given children. */
  containerStyle?: StyleProp<ViewStyle>;

  /** - Rotate the hue circle, from 0 to 360 */
  rotate?: number;
}

export interface LuminanceCircularProps extends Omit<SliderProps, 'vertical' | 'reverse' | 'boundedThumb'> {
  children?: ReactNode;

  /** - The style of the container that wraps the given children. */
  containerStyle?: StyleProp<ViewStyle>;

  /** - Rotate the hue circle, from 0 to 360 */
  rotate?: number;
}

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
  onChange: (color: SupportedColorFormats) => void;
  returnedResults: ColorPickerContext['returnedResults'];
  hueValue: ColorPickerContext['hueValue'];
  saturationValue: ColorPickerContext['saturationValue'];
  brightnessValue: ColorPickerContext['brightnessValue'];
  alphaValue: ColorPickerContext['alphaValue'];
  inputStyle: StyleProp<TextStyle>;
  inputTitleStyle?: StyleProp<TextStyle>;
  inputProps: InputProps;
  disableAlphaChannel: boolean;
};

type defaultFormats = 'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV';

export interface InputWidgetProps {
  /**
   * - The initial input widget color format.
   * - You can select one of the following options: `'HEX'`, `'RGB'`, '`HSL'`, `'HWB'`, or `'HSV'`
   */
  defaultFormat?: defaultFormats;

  /**
   * - What input widgets should be included that can be cycled through.
   * - Available options: `'HEX'`, `'RGB'`, '`HSL'`, `'HWB'`, and `'HSV'`
   */
  formats?: readonly defaultFormats[];

  /** - Limit the user's ability to modify the alpha channel of the selected color. */
  disableAlphaChannel?: boolean;

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
}
