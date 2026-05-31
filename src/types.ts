import type { ReactNode } from 'react';
import type { ImageStyle, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated';
import type { SupportedColorFormats } from './colorKit/types';
import type { Gesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

/** An object containing the current color value in all supported formats. */
export interface ColorFormatsObject {
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

/** The shape of the slider or panel thumb. */
export type ThumbShapeType =
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

/** A color represented in the HSV color space, including an alpha channel. */
export interface HSVObject {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface HSVObjectSharedValue {
  hue: SharedValue<number>;
  saturation: SharedValue<number>;
  brightness: SharedValue<number>;
  alpha: SharedValue<number>;
}

export interface RenderThumbProps {
  /** Determines the position of the thumb. This style must be applied to a Reanimated component. */
  positionStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle | ImageStyle | TextStyle>>>;

  /** The thumb's width in pixels. Used internally for thumb position calculation. Extracted from the `thumbSize` prop. */
  width: number;

  /** The thumb's height in pixels. Used internally for thumb position calculation. Extracted from the `thumbSize` prop. */
  height: number;

  /**
   * A shared value representing the accessible contrast color for the thumb. Resolves to either `'white'` or `'black'` based on
   * the contrast ratio against the current color.
   */
  adaptiveColor: SharedValue<string>;

  /** A shared value representing the current color as a string, without the alpha channel. Updates whenever the color changes. */
  currentColor: SharedValue<string>;

  /** The initial color value passed to the color picker. */
  initialColor: string;
}

/** A component that renders a custom thumb for sliders and panels. */
export type RenderThumbType = React.FC<RenderThumbProps>;

export interface ThumbProps {
  thumbColor?: string;
  thumbAnimatedStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  innerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  renderThumb?: RenderThumbType;
  vertical?: boolean;
  thumbShape?: ThumbShapeType;
  thumbSize: number;
  /**
   * Overrides specific HSV channel values used for this thumb's position calculation. Useful for thumbs located at different
   * positions within the slider that should not rely on the global HSV values.
   */
  overrideHSV?: Partial<HSVObjectSharedValue>;
  /**
   * Provides the color used to calculate this thumb's adaptive contrast color. The adaptive color resolves to either white or
   * black based on the contrast ratio against the returned color.
   *
   * @worklet
   */
  getAdaptiveColor?: (hsva: { h: number; s: number; v: number; a: number }) => SupportedColorFormats;
}

export interface ExtraThumbProps {
  /** The thumb's size in pixels (height × width). */
  thumbSize?: number;

  /** The thumb's color. */
  thumbColor?: string;

  /** The thumb's shape. */
  thumbShape?: ThumbShapeType;

  /** Renders a line from the center of the panel to the thumb. */
  renderCenterLine?: boolean;

  /** The thumb's outer `View` style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** The thumb's inner `View` style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** A function that receives `ThumbProps` and renders a custom thumb. */
  renderThumb?: RenderThumbType;

  /**
   * Called when the user moves the slider. Accepts `worklet` functions only. For regular functions, use `onChangeJS`.
   *
   * @worklet
   */
  onChange?: (colors: ColorFormatsObject) => void;

  /**
   * Called when the user moves the slider. Accepts regular (non-`worklet`) functions only. For `worklet` functions, use
   * `onChange`.
   */
  onChangeJS?: (colors: ColorFormatsObject) => void;

  /** The amount by which to shift the hue channel. Accepts a `number` or a percentage `string`. Negative values are supported. */
  hueTransform?: string | number;

  /**
   * The amount by which to shift the saturation channel. Accepts a `number` or a percentage `string`. Negative values are
   * supported.
   */
  saturationTransform?: string | number;

  /**
   * The amount by which to shift the brightness channel. Accepts a `number` or a percentage `string`. Negative values are
   * supported.
   */
  brightnessTransform?: string | number;

  /**
   * A worklet function to transform the color in HSV color space before it is applied. Receives the current HSVA color object and
   * must return a modified HSVA color object. The returned value determines the thumb's position within the panel.
   *
   * @worklet
   */
  colorTransform?: (color: HSVObject) => HSVObject;
}

export interface BuiltinThumbsProps {
  width: number;
  height: number;
  borderRadius: number;
  thumbColor?: string;
  adaptiveColor: SharedValue<string>;
  thumbAnimatedStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  innerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  solidColor: AnimatedStyle<ViewStyle>;
  renderThumb?: RenderThumbType;
  vertical?: boolean;
}

export interface ColorPickerContext {
  /** The hue channel value shared across all descendant components. */
  hueValue: SharedValue<number>;

  /** The saturation channel value shared across all descendant components. */
  saturationValue: SharedValue<number>;

  /** The brightness channel value shared across all descendant components. */
  brightnessValue: SharedValue<number>;

  /** The alpha channel value shared across all descendant components. */
  alphaValue: SharedValue<number>;

  /** When enabled, the color spectrum adapts to changes in brightness and saturation across all descendant slider components. */
  adaptSpectrum: boolean;

  /** Programmatically applies a color to the color picker. */
  setColor: (color: SupportedColorFormats, duration?: number) => void;

  /** The default slider thickness for all descendant slider components. */
  sliderThickness: number;

  /** The default thumb size for all descendant slider components. */
  thumbSize: number;

  /** The default thumb shape for all descendant slider components. */
  thumbShape: ThumbShapeType;

  /** The default thumb color for all descendant slider components. */
  thumbColor: string | undefined;

  /** The default thumb outer `View` style for all descendant slider components. */
  thumbStyle: StyleProp<ViewStyle>;

  /** The scale factor applied to the thumb when it is active. Default: `1.2` */
  thumbScaleAnimationValue: number;

  /** The duration of the thumb's scale-up animation when active, in milliseconds. Default: `100` */
  thumbScaleAnimationDuration: number;

  /**
   * When enabled, constrains the thumb to stay within the slider's boundaries. When disabled, part of the thumb may extend beyond
   * the slider edges.
   */
  boundedThumb: boolean;

  /** The default thumb inner `View` style for all descendant slider components. */
  thumbInnerStyle: StyleProp<ViewStyle>;

  /** The default custom thumb renderer for all descendant slider components. */
  renderThumb: RenderThumbType | undefined;

  /** The initial color value passed to the color picker. */
  value: string;

  /**
   * Returns the current color in all supported formats.
   *
   * @worklet
   */
  colorResult: (color?: SupportedColorFormats) => ColorFormatsObject;

  /**
   * Called when the user lifts their finger from the color picker.
   *
   * @worklet
   */
  onGestureEnd: (color?: SupportedColorFormats) => void;

  /**
   * Called every time the color changes.
   *
   * @worklet
   */
  onGestureChange: (color?: SupportedColorFormats) => void;
}

export interface Panel3Context {
  /** The current panel width as a shared value. */
  width: SharedValue<number>;

  /** When enabled, the color spectrum adapts to changes in brightness and saturation. */
  adaptSpectrum: boolean;

  /** The color channel adjusted when moving the thumb towards or away from the center. */
  centerChannel: 'saturation' | 'brightness' | 'hsl-saturation';

  /** The current value of the center channel as a shared value. */
  centerChannelValue: SharedValue<number>;

  /** The thumb's shape. */
  thumbShape: ThumbShapeType;

  /** The thumb's size in pixels (height × width). */
  thumbSize: number;

  /** The thumb's color. */
  thumbColor?: string;

  /** The thumb's outer `View` style. */
  thumbStyle: StyleProp<ViewStyle>;

  /** The thumb's inner `View` style. */
  thumbInnerStyle: StyleProp<ViewStyle>;

  /** A function that receives `ThumbProps` and renders a custom thumb. */
  renderThumb?: RenderThumbType;

  /**
   * When enabled, constrains the thumb to stay within the slider's boundaries. When disabled, part of the thumb may extend beyond
   * the slider edges.
   */
  boundedThumb: boolean;

  /** When enabled, renders a line from the center of the panel to the thumb. */
  renderCenterLine: boolean;

  /** The rotation of the hue circle in degrees, from 0 to 360. */
  rotate: number;
}

export interface ColorPickerProps {
  /** When enabled, the color spectrum adapts to changes in brightness and saturation across all descendant slider components. */
  adaptSpectrum?: boolean;

  /**
   * The default thickness for all descendant slider components. Thickness refers to the slider's width in vertical mode, or its
   * height in horizontal mode.
   */
  sliderThickness?: number;

  /** The duration of the thumb animation when the `value` prop changes, in milliseconds. */
  thumbAnimationDuration?: number;

  /** The default thumb size for all descendant slider components. */
  thumbSize?: number;

  /** The default thumb shape for all descendant slider components. */
  thumbShape?: ThumbShapeType;

  /** The default thumb color for all descendant slider components. */
  thumbColor?: string;

  /** The default thumb outer `View` style for all descendant slider components. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** The scale factor applied to the thumb when it is active. Default: `1.2` */
  thumbScaleAnimationValue?: number;

  /** The duration of the thumb's scale-up animation when active, in milliseconds. Default: `100` */
  thumbScaleAnimationDuration?: number;

  /**
   * When enabled, constrains the thumb to stay within the slider's boundaries across all descendant sliders and panels. When
   * disabled, part of the thumb may extend beyond the slider edges.
   */
  boundedThumb?: boolean;

  /** The default thumb inner `View` style for all descendant slider components. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** The default custom thumb renderer for all descendant slider components. */
  renderThumb?: RenderThumbType;

  /** The color picker wrapper style. */
  style?: StyleProp<ViewStyle>;

  /** The initial color value. Accepts `hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hsv`, `hsva`, `hwb`, `hwba`, and named color formats. */
  value?: string;

  /**
   * Enables accessibility announcements when the color changes.
   *
   * When enabled, color updates are announced using the selected format defined by `colorAnnouncementFormat`.
   *
   * @default true
   */
  enableColorAnnouncements?: boolean;

  /**
   * Defines the format used when announcing color values for accessibility.
   *
   * Used only when `enableColorAnnouncements` is true. Must match a key from `ColorFormatsObject` (e.g. "rgb", "hex", "hsl").
   *
   * @default 'rgb'
   */
  colorAnnouncementFormat?: keyof ColorFormatsObject;

  /**
   * Called when the user moves the sliders. Accepts `worklet` functions only. For regular functions, use `onChangeJS`.
   *
   * @worklet
   */
  onChange?: (colors: ColorFormatsObject) => void;

  /**
   * Called when the user moves the sliders. Accepts regular (non-`worklet`) functions only. For `worklet` functions, use
   * `onChange`.
   */
  onChangeJS?: (colors: ColorFormatsObject) => void;

  /**
   * Called when the user lifts their finger off the sliders. Accepts `worklet` functions only. For regular functions, use
   * `onCompleteJS`.
   *
   * @caution As of `react-native-gesture-handler@2.9.0`, the new web implementation does not support the events that trigger this callback.
   * @worklet
   */
  onComplete?: (colors: ColorFormatsObject) => void;

  /**
   * Called when the user lifts their finger off the sliders. Accepts regular (non-`worklet`) functions only. For `worklet`
   * functions, use `onComplete`.
   *
   * @caution As of `react-native-gesture-handler@2.9.0`, the new web implementation does not support the events that trigger this callback.
   */
  onCompleteJS?: (colors: ColorFormatsObject) => void;

  children?: React.ReactNode;
}

export interface ColorPickerRef {
  /** Programmatically applies a color to the color picker. */
  setColor: (color: string, duration?: number) => void;
}

export interface SwatchesProps {
  /** The style of each swatch. Note: certain style properties will be overridden. */
  swatchStyle?: StyleProp<ViewStyle>;

  /** The swatches container style. */
  style?: StyleProp<ViewStyle>;

  /** A custom list of swatch colors. */
  colors?: string[];
}

export interface PreviewProps {
  /** The color format displayed in the preview. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** Hides the initial color preview, showing only the currently selected color. */
  hideInitialColor?: boolean;

  /** Hides the color value text in the preview. */
  hideText?: boolean;

  /** Hides the background texture that appears when the color has transparency. */
  disableOpacityTexture?: boolean;

  /** The preview container style. Note: certain style properties will be overridden. */
  style?: StyleProp<ViewStyle>;

  /** The preview text style. Note: certain style properties will be overridden. */
  textStyle?: StyleProp<TextStyle>;
}

export interface PreviewTextProps {
  /** The color format displayed in the preview text. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** The preview text style. */
  style?: StyleProp<AnimatedStyle<StyleProp<TextStyle>>>;
}

export interface PanelProps {
  /** An accessibility label for the panel. */
  accessibilityLabel?: string;

  /** An accessibility hint for the panel. */
  accessibilityHint?: string;

  /** The thumb's size in pixels (height × width). */
  thumbSize?: number;

  /** The thumb's color. */
  thumbColor?: string;

  /** The thumb's shape. */
  thumbShape?: ThumbShapeType;

  /**
   * When enabled, constrains the thumb to stay within the panel's boundaries. When disabled, part of the thumb may extend beyond
   * the panel edges.
   */
  boundedThumb?: boolean;

  /** The thumb's outer `View` style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** The thumb's inner `View` style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** A function that receives `ThumbProps` and renders a custom thumb. */
  renderThumb?: RenderThumbType;

  /** The scale factor applied to the thumb when it is active. Default: `1.2` */
  thumbScaleUpValue?: number;

  /** The duration of the thumb's scale-up animation when active, in milliseconds. Default: `100` */
  thumbScaleUpDuration?: number;

  /** Additional gestures from `react-native-gesture-handler` to run simultaneously with the panel's gestures. */
  gestures?: Gesture[];

  /** The panel container style. Note: certain style properties will be overridden. */
  style?: StyleProp<ViewStyle>;
}

export interface Panel2Props extends PanelProps {
  /** Reverses the hue direction. */
  reverseHue?: boolean;

  /** Reverses the direction of the vertical channel. */
  reverseVerticalChannel?: boolean;

  /** The color channel adjusted when moving the thumb vertically. */
  verticalChannel?: 'saturation' | 'brightness' | 'hsl-saturation';

  /** When enabled, the color spectrum adapts to changes in brightness and saturation. */
  adaptSpectrum?: boolean;
}

export interface Panel3Props extends PanelProps {
  /** The color channel adjusted when moving the thumb towards or away from the center. */
  centerChannel?: 'saturation' | 'brightness' | 'hsl-saturation';

  /** When enabled, the color spectrum adapts to changes in brightness and saturation. */
  adaptSpectrum?: boolean;

  /** Renders a line from the center of the panel to the thumb. */
  renderCenterLine?: boolean;

  /** Rotates the hue circle in degrees, from 0 to 360. */
  rotate?: number;

  children?: ReactNode;
}

export interface Panel4Props extends PanelProps {
  /** Reverses the hue direction. */
  reverseHue?: boolean;

  /** Reverses the direction of the horizontal brightness and saturation channels. */
  reverseHorizontalChannels?: boolean;
}

export interface Panel5Props {
  /** An accessibility label for the panel. */
  accessibilityLabel?: string;

  /** An accessibility hint for the panel. */
  accessibilityHint?: string;

  /** Additional gestures from `react-native-gesture-handler` to run simultaneously with the panel's gestures. */
  gestures?: Gesture[];

  /** The panel container style. Note: certain style properties will be overridden. */
  style?: StyleProp<ViewStyle>;

  /** The style of the square indicating the selected color. Note: certain style properties will be overridden. */
  selectionStyle?: StyleProp<ViewStyle>;
}

export interface SliderProps {
  /** An accessibility label for the slider. */
  accessibilityLabel?: string;

  /** An accessibility hint for the slider. */
  accessibilityHint?: string;

  /** The thumb's size in pixels (height × width). */
  thumbSize?: number;

  /** The thumb's color. */
  thumbColor?: string;

  /** The thumb's shape. */
  thumbShape?: ThumbShapeType;

  /**
   * When enabled, constrains the thumb to stay within the slider's boundaries. When disabled, part of the thumb may extend beyond
   * the slider edges.
   */
  boundedThumb?: boolean;

  /** The thumb's outer `View` style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** The thumb's inner `View` style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** A function that receives `ThumbProps` and renders a custom thumb. */
  renderThumb?: RenderThumbType;

  /** The scale factor applied to the thumb when it is active. Default: `1.2` */
  thumbScaleAnimationValue?: number;

  /** The duration of the thumb's scale-up animation when active, in milliseconds. Default: `100` */
  thumbScaleAnimationDuration?: number;

  /** The slider's thickness. Thickness refers to the slider's width in vertical mode, or its height in horizontal mode. */
  sliderThickness?: number;

  /** Reverses the slider direction. */
  reverse?: boolean;

  /** Renders the slider vertically. */
  vertical?: boolean;

  /** When enabled, the color spectrum adapts to changes in brightness and saturation. */
  adaptSpectrum?: boolean;

  /** Additional gestures from `react-native-gesture-handler` to run simultaneously with the slider's gestures. */
  gestures?: Gesture[];

  /** The slider container style. Note: certain style properties will be overridden. */
  style?: StyleProp<ViewStyle>;
}

export interface HueCircularProps extends Omit<SliderProps, 'vertical' | 'reverse' | 'boundedThumb'> {
  children?: ReactNode;

  /** The style of the container wrapping the given children. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Rotates the hue circle in degrees, from 0 to 360. */
  rotate?: number;
}

export interface LuminanceCircularProps extends Omit<SliderProps, 'vertical' | 'reverse' | 'boundedThumb'> {
  children?: ReactNode;

  /** The style of the container wrapping the given children. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Rotates the luminance circle in degrees, from 0 to 360. */
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

/** Props passed to each color format input widget. */
export interface WidgetProps {
  /** Called when the color value changes via text input. */
  onChange: (color: SupportedColorFormats) => void;

  /**
   * Returns the current color in all supported formats.
   *
   * @worklet
   */
  colorResult: ColorPickerContext['colorResult'];

  /** The hue channel shared value. */
  hueValue: ColorPickerContext['hueValue'];

  /** The saturation channel shared value. */
  saturationValue: ColorPickerContext['saturationValue'];

  /** The brightness channel shared value. */
  brightnessValue: ColorPickerContext['brightnessValue'];

  /** The alpha channel shared value. */
  alphaValue: ColorPickerContext['alphaValue'];

  /** The style of each text input field. */
  inputStyle: StyleProp<TextStyle>;

  /** The style of the title label below each text input. */
  inputTitleStyle?: StyleProp<TextStyle>;

  /** Additional props forwarded to the underlying `TextInput` components. */
  inputProps: InputProps;

  /** When enabled, hides the alpha channel input field. */
  disableAlphaChannel: boolean;
}

type DefaultFormats = 'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV';

export interface InputWidgetProps {
  /** The initially selected color format. Accepted values: `'HEX'`, `'RGB'`, `'HSL'`, `'HWB'`, `'HSV'`. */
  defaultFormat?: DefaultFormats;

  /** The list of color formats available to cycle through. Accepted values: `'HEX'`, `'RGB'`, `'HSL'`, `'HWB'`, `'HSV'`. */
  formats?: readonly DefaultFormats[];

  /** When enabled, prevents the user from modifying the alpha channel. */
  disableAlphaChannel?: boolean;

  /** The style of each `TextInput` component. */
  inputStyle?: StyleProp<TextStyle>;

  /** Additional props forwarded to the underlying `TextInput` components. */
  inputProps?: InputProps;

  /** The style of the title label below each `TextInput`. */
  inputTitleStyle?: StyleProp<TextStyle>;

  /** The style of the `View` wrapping all input widgets. */
  containerStyle?: StyleProp<ViewStyle>;

  /** The color of the cycle button icon. */
  iconColor?: string;

  /** The style of the cycle button icon (`Image` component). */
  iconStyle?: StyleProp<ImageStyle>;

  /** Accessibility label for the cycle button, used by screen readers to identify the button. */
  cycleButtonAccessibilityLabel?: string;

  /** Accessibility hint for the cycle button, describing what happens when the user activates it. */
  cycleButtonAccessibilityHint?: string;
}
