import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AnimatedStyleProp, SharedValue } from 'react-native-reanimated';

export interface returnedResults {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
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

export type THandleSettings = {
  id: string;
  channel: 'h' | 's' | 'b' | 'a';
  axis: 'x' | 'y' | 'angle';
  width: number;
  height: number;
  thumbSize: number;
  isReversed: boolean;
  handle: SharedValue<number> | SharedValue<number>[];
};

export interface TCTX {
  /** The currently selected color without the saturation and brightness (only the hue channel) */
  activeHueStyle: AnimatedStyleProp<ViewStyle>;

  /** A `white` or a `black` color depending on the contrast ratio (for panels) */
  invertedColor: SharedValue<string>;

  /** A `white` or a `black` color depending on the contrast ratio (for the hue slider) */
  invertedColorHue: SharedValue<string>;

  /** A `white` or a `black` color depending on the contrast ratio (for the brightness slider) */
  invertedColorBrightness: SharedValue<string>;

  /** A `white` or a `black` color depending on the contrast ratio (for the saturation slider) */
  invertedColorSaturation: SharedValue<string>;

  /** A `white` or a `black` color depending on the contrast ratio (for the opacity slider) */
  invertedColorOpacity: SharedValue<string>;

  /** `BackgroundColor` style for the currently selected color (with opacity) */
  previewColorStyle: AnimatedStyleProp<ViewStyle>;

  /** `BackgroundColor` style for the currently selected color (without opacity) */
  solidColor: AnimatedStyleProp<ViewStyle>;

  /** Used to listen to the current color changes */
  colorHash: SharedValue<string>;

  /** The function apply a color to the color picker. */
  setColor: (color: string) => void;

  /** This function updates the hue channel of the color picker. */
  updateHue: (channel: number) => void;

  /** This function updates the saturation channel of the color picker. */
  updateSaturation: (channel: number) => void;

  /** This function updates the brightness channel of the color picker. */
  updateBrightness: (channel: number) => void;

  /** This function updates the opacity channel of the color picker. */
  updateOpacity: (channel: number) => void;

  /** A global style for all sliders children. */
  sliderThickness: number;

  /** A global style for all sliders children. */
  thumbSize: number;

  /** A global style for all sliders children. */
  thumbShape: thumbShapeType;

  /** The initial color in hsva fromat as an object extracted from `value` property */
  initialColor: React.MutableRefObject<{ h: number; s: number; b: number; a: number }>;

  /** The initial color value as a `string` */
  value: string;

  /** The returned results of the color picker. */
  returnedResults: (color?: { h: number; s: number; b: number; a: number }) => returnedResults;

  /** This function to register/update a slider handle to be managed by the color picker wrapper. */
  registerHandle: (settings: THandleSettings) => void;

  /** This function is called when the user lifts the finger from the color picker. */
  onGestureEventFinish: () => void;

  /** This function is called everytime the color is changed. */
  onChange?: (color: returnedResults) => void;
}

export interface ColorPickerProps {
  /**
   * - a global property to change the thickness of all descendant sliders components.
   * - thickness is the width of the slider in vertical mode or the height in horizontal mode.
   */
  sliderThickness?: number;

  /** - a global property to change the thumb size of all descendant sliders components. */
  thumbSize?: number;

  /** - a global property to change the shape and appearance of the thumb of all descendant sliders components. */
  thumbShape?: thumbShapeType;

  /** - color picker wrapper style. */
  style?: StyleProp<ViewStyle>;

  /**
   * - initial color.
   * - Accepts `hex`, `rgb`, `rgba`, `hsl`, `hsla`, and `named color` formats.
   */
  value?: string;

  /** - called when the user moves the sliders. */
  onChange?: (colors: returnedResults) => void;

  /** - called when the user lifts his finger off the sliders. */
  onComplete?: (colors: returnedResults) => void;

  children?: React.ReactNode;
}

export interface SwatchesPorps {
  /**
   * - swatch style.
   * - **Note** some of the style properties will be overwritten.
   */
  swatchStyle?: StyleProp<ViewStyle>;

  /** - swatches container style. */
  style?: StyleProp<ViewStyle>;

  /** - provide your own swatches colors. */
  colors?: string[];
}

export interface PreviewPorps {
  /** - show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva';

  /** - hide initial color preview and show the picked color preview only. */
  hideInitialColor?: boolean;

  /** - hide color preview text. */
  hideText?: boolean;

  /**
   * - preview container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * - preview text style.
   * - **Note** `color` is immutable.
   */
  textStyle?: StyleProp<TextStyle>;
}

export interface PreviewTextProps {
  /** - show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva';

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
  /**
   * - panle container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}

export interface Panel2Props extends PanelProps {
  /** - reverse (flip) hue direction. */
  reverse?: boolean;
}

export interface SliderPorps {
  /** - slider's handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - slider's handle (thumb) color. */
  thumbColor?: string;

  /** - slider's handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /** - reverse slider direction. */
  reverse?: boolean;

  /** - vertical slider. */
  vertical?: boolean;

  /**
   * - slider's container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}
