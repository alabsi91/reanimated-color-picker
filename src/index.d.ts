import { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface returnedResults {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
}

interface ColorPickerProps {
  /** - global style for all slider components
   * - thickness is the width of the slider in vertical mode or the height in horizontal mode.
   */
  slidersThickness?: number;

  /** - gobal style for all slider components to change handles thumb size (height*width) */
  thumbsSize?: number;

  /**
   * - color picker wrapper style.
   */
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

interface SwatchesPorps {
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

interface PreviewPorps {
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

interface PreviewTextProps {
  /** - show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva';

  /** - preview text style */
  style?: StyleProp<TextStyle>;
}

interface PanelProps {
  /** - panel handle (thumb) size (height*width). */
  thumbSize?: number;

  /**
   * - panle container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}

interface HueProps {
  /** - hue slider handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - hue slider handle (thumb) ring color. */
  ringColor?: string;

  /** - reverse hue slider direction. */
  reverse?: boolean;

  /** - vertical hue slider. */
  vertical?: boolean;

  /**
   * - hue slider container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}

interface BrightnessProps {
  /** - brightness slider handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - brightness slider handle (thumb) ring color. */
  ringColor?: string;

  /** - reverse brightness slider direction. */
  reverse?: boolean;

  /** - vertical brightness slider. */
  vertical?: boolean;

  /**
   * - brightness slider container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}

interface SaturationProps {
  /** - saturation slider handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - saturation slider handle (thumb) ring color. */
  ringColor?: string;

  /** - reverse saturation slider direction. */
  reverse?: boolean;

  /** - vertical saturation slider. */
  vertical?: boolean;

  /**
   * - saturation slider container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}

interface OpacityProps {
  /** - opacity slider handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - opacity slider handle (thumb) ring color. */
  ringColor?: string;

  /** - reverse opacity slider direction. */
  reverse?: boolean;

  /** - vertical opacity slider. */
  vertical?: boolean;

  /**
   * - opacity slider container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}

declare const ColorPicker: React.FunctionComponent<ColorPickerProps>;
export declare const Preview: React.FunctionComponent<PreviewPorps>;
export declare const PreviewText: React.FunctionComponent<PreviewTextProps>;
export declare const Panel1: React.FunctionComponent<PanelProps>;
export declare const Panel2: React.FunctionComponent<PanelProps>;
export declare const HueSlider: React.FunctionComponent<HueProps>;
export declare const BrightnessSlider: React.FunctionComponent<BrightnessProps>;
export declare const SaturationSlider: React.FunctionComponent<SaturationProps>;
export declare const OpacitySlider: React.FunctionComponent<OpacityProps>;
export declare const Swatches: React.FunctionComponent<SwatchesPorps>;

export default ColorPicker;
