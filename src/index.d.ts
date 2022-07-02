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
  /** - hue and opacity sliders track height. */
  tracksHeight?: number;

  /** - sliders handles (thumbs) size (height*width). */
  thumbsSize?: number;

  /** - color picker component width. */
  width?: number;

  /**
   * - color picker wrapper style.
   * - if you want to change the width use the width prop.
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

  /**
   * - opacity slider container style.
   * - **Note** some of the style properties will be overwritten.
   */
  style?: StyleProp<ViewStyle>;
}

declare const ColorPicker: React.FunctionComponent<ColorPickerProps>;
export declare const Preview: React.FunctionComponent<PreviewPorps>;
export declare const Panel1: React.FunctionComponent<PanelProps>;
export declare const Panel2: React.FunctionComponent<PanelProps>;
export declare const HueSlider: React.FunctionComponent<HueProps>;
export declare const BrightnessSlider: React.FunctionComponent<BrightnessProps>;
export declare const SaturationSlider: React.FunctionComponent<SaturationProps>;
export declare const OpacitySlider: React.FunctionComponent<OpacityProps>;
export declare const Swatches: React.FunctionComponent<SwatchesPorps>;

export default ColorPicker;
