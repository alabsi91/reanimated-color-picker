import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { AnyFormat } from './colorKit';

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

type thumbStyleType = ViewStyle;
type thumbInnerStyleType = thumbStyleType;

export interface TCTX {
  /** Color's channels. */
  hueValue: SharedValue<number>;
  saturationValue: SharedValue<number>;
  brightnessValue: SharedValue<number>;
  alphaValue: SharedValue<number>;

  /** apply a color to the color picker. */
  setColor: (color: string) => void;

  /** A global style for all sliders children. */
  sliderThickness: number;

  /** A global style for all sliders children. */
  thumbSize: number;

  /** A global style for all sliders children. */
  thumbShape: thumbShapeType;

  /** A global style for all sliders children. */
  thumbColor: string | undefined;

  /** A global style for all sliders children. */
  thumbStyle?: thumbStyleType;

  /** A global style for all sliders children. */
  thumbInnerStyle?: thumbInnerStyleType;

  /** The initial color value as a `string` */
  value: string;

  /** The returned results of the color picker. */
  returnedResults: (color?: AnyFormat) => returnedResults;

  /** This function is called when the user lifts the finger from the color picker. */
  onGestureEnd: (color?: AnyFormat) => void;

  /** This function is called everytime the color is changed. */
  onGestureChange: (color?: AnyFormat) => void;
}

export interface ColorPickerProps {
  /**
   * - a global property to change the thickness of all descendant sliders components.
   * - thickness is the width of the slider in vertical mode or the height in horizontal mode.
   */
  sliderThickness?: number;

  /** - a global property to change the duration which the thumbs animate when the value prop changes. */
  thumbAnimationDuration?: number;

  /** - a global property to change the thumb size of all descendant sliders components. */
  thumbSize?: number;

  /** - a global property to change the shape and appearance of the thumb of all descendant sliders components. */
  thumbShape?: thumbShapeType;

  /** - a global property to change the color of the thumb of all descendant sliders components. */
  thumbColor?: string;

  /** - a global property to change the style of the thumb's View for all descendant sliders components */
  thumbStyle?: thumbStyleType;

  /** - a global property to change the color of the thumb's inner View(s) for all descendant sliders components. */
  thumbInnerStyle?: thumbInnerStyleType;

  /** - color picker wrapper style. */
  style?: StyleProp<ViewStyle>;

  /**
   * - initial color.
   * - Accepts `hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hsv`, `hsva`, `hwb`, `hwba` and `named color` formats.
   */
  value?: string;

  /** - called when the user moves the sliders. */
  onChange?: (colors: returnedResults) => void;

  /**
   * - called when the user lifts his finger off the sliders.
   * - CAUTION : As of `react-native-gesture-handler@2.9.0` the new web implementation does not support the events which trigger this callback.
   */
  onComplete?: (colors: returnedResults) => void;

  children?: React.ReactNode;
}

export interface SwatchesPorps {
  /**
   * - swatch style.
   * - **Note** Certain style properties will be overridden.
   */
  swatchStyle?: StyleProp<ViewStyle>;

  /** - swatches container style. */
  style?: StyleProp<ViewStyle>;

  /** - provide your own swatches colors. */
  colors?: string[];
}

export interface PreviewPorps {
  /** - show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** - hide initial color preview and show the picked color preview only. */
  hideInitialColor?: boolean;

  /** - hide color preview text. */
  hideText?: boolean;

  /**
   * - preview container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * - preview text style.
   * - **Note** Certain style properties will be overridden..
   */
  textStyle?: StyleProp<TextStyle>;
}

export interface PreviewTextProps {
  /** - show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** - preview text style */
  style?: StyleProp<TextStyle>;
}

export interface PanelProps {
  /** - panel handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - panel handle (thumb) color. */
  thumbColor?: string;

  /** - panel handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /** - slider's handle (thumb) outer View style. */
  thumbStyle?: thumbStyleType;

  /** - slider's handle (thumb) inner View style. */
  thumbInnerStyle?: thumbInnerStyleType;

  /**
   * - panle container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;
}

export interface Panel2Props extends PanelProps {
  /** - reverse (flip) hue direction. */
  reverse?: boolean;
}

export interface SliderProps {
  /** - slider's handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - slider's handle (thumb) color. */
  thumbColor?: string;

  /** - slider's handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /** - slider's handle (thumb) outer View style. */
  thumbStyle?: thumbStyleType;

  /** - slider's handle (thumb) inner View style. */
  thumbInnerStyle?: thumbInnerStyleType;

  /** - reverse slider direction. */
  reverse?: boolean;

  /** - vertical slider. */
  vertical?: boolean;

  /**
   * - slider's container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;
}
