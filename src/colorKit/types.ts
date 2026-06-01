type NAMED_COLORS =
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen';

export type ColorFormats = 'hex3' | 'hex4' | 'hex6' | 'hex8' | 'hsl' | 'hsla' | 'rgb' | 'rgba' | 'hsva' | 'hsv' | 'hwba' | 'hwb';

export type ColorString = NAMED_COLORS | (string & NonNullable<unknown>);

export interface RgbT {
  r: number;
  g: number;
  b: number;
}

export interface RgbaT extends RgbT {
  a: number;
}

export interface HslT {
  h: number;
  s: number;
  l: number;
}

export interface HslaT extends HslT {
  a: number;
}

export interface HsvT {
  h: number;
  s: number;
  v: number;
}

export interface HsvaT extends HsvT {
  a: number;
}

export interface HwbT {
  h: number;
  w: number;
  b: number;
}

export interface HwbaT extends HwbT {
  a: number;
}

export type ColorObjectWithoutAlpha = RgbT | HslT | HsvT | HwbT;
export type ColorObjectWithAlpha = RgbaT | HslaT | HsvaT | HwbaT;
export type ColorObject = ColorObjectWithoutAlpha | ColorObjectWithAlpha;

export type SupportedColorFormats = ColorString | ColorObject | number;

export interface ColorTypes<T extends object> {
  object: (roundValues?: boolean) => T;
  string: (alpha?: boolean) => string;
  array: (roundValues?: boolean) => number[];
}

export interface ConversionMethods {
  hex: () => string;
  rgb: () => ColorTypes<RgbaT>;
  hsl: () => ColorTypes<HslaT>;
  hsv: () => ColorTypes<HsvaT>;
  hwb: () => ColorTypes<HwbaT>;
}

export type ColorParseResult =
  | { format: 'named'; value: RgbT }
  | { format: 'hex3'; value: RgbT }
  | { format: 'hex6'; value: RgbT }
  | { format: 'rgb'; value: RgbT }
  | { format: 'hex4'; value: RgbaT }
  | { format: 'hex8'; value: RgbaT }
  | { format: 'rgba'; value: RgbaT }
  | { format: 'hsl'; value: HslT }
  | { format: 'hsla'; value: HslaT }
  | { format: 'hsv'; value: HsvT }
  | { format: 'hsva'; value: HsvaT }
  | { format: 'hwb'; value: HwbT }
  | { format: 'hwba'; value: HwbaT };
