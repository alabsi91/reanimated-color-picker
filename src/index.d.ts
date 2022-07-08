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

type thumbShapeType =
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

interface ColorPickerProps {
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

interface Panel2Props extends PanelProps {
  /** - reverse (flip) hue direction. */
  reverse?: boolean;
}

interface SliderPorps {
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

declare const ColorPicker: React.FunctionComponent<ColorPickerProps>;
export declare const Preview: React.FunctionComponent<PreviewPorps>;
export declare const PreviewText: React.FunctionComponent<PreviewTextProps>;
export declare const Panel1: React.FunctionComponent<PanelProps>;
export declare const Panel2: React.FunctionComponent<Panel2Props>;
export declare const Panel3: React.FunctionComponent<PanelProps>;
export declare const HueSlider: React.FunctionComponent<SliderPorps>;
export declare const BrightnessSlider: React.FunctionComponent<SliderPorps>;
export declare const SaturationSlider: React.FunctionComponent<SliderPorps>;
export declare const OpacitySlider: React.FunctionComponent<SliderPorps>;
export declare const Swatches: React.FunctionComponent<SwatchesPorps>;

export default ColorPicker;
