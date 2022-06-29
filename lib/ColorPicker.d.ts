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
   * - **Note** `backgroundColor` is immutable.
   */
  swatcheStyle?: StyleProp<ViewStyle>;

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

  /**
   * - preview container style.
   * - **Note** `backgroundColor` is immutable.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * - preview text style.
   * - **Note** `color` is immutable.
   */
  textStyle?: StyleProp<TextStyle>;
}

interface PanelProps {
  /** - panel border raduis. */
  borderRadius?: number;

  /** - panel handle (thumb) size (height*width). */
  thumbSize?: number;
}

interface HueProps {
  /** - hue slider handle (thumb) size (height*width). */
  thumbSize?: number;

  /**
   * - opacity slider track height.
   * - **Note** max height is `80`
   */
  trackHeight?: number;

  /** - hue slider border raduis. */
  borderRadius?: number;
}

interface OpacityProps {
  /** - opacity slider handle (thumb) size (height*width). */
  thumbSize?: number;

  /**
   * - opacity slider track height.
   * - **Note** max height is `80`
   */
  trackHeight?: number;

  /** - opacity slider border raduis. */
  borderRadius?: number;
}

declare const ColorPicker: React.FunctionComponent<ColorPickerProps>;
declare const Preview: React.FunctionComponent<PreviewPorps>;
declare const Panel: React.FunctionComponent<PanelProps>;
declare const HueSlider: React.FunctionComponent<HueProps>;
declare const OpacitySlider: React.FunctionComponent<OpacityProps>;
declare const Swatches: React.FunctionComponent<SwatchesPorps>;

export default ColorPicker;
export { Preview, Panel, HueSlider, OpacitySlider, Swatches };
