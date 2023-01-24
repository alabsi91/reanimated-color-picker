type ColorFormats = 'hex3' | 'hex4' | 'hex6' | 'hex8' | 'hsl' | 'hsla' | 'rgb' | 'rgba' | 'hsva' | 'hsv' | 'hwba' | 'hwb';
type ColorString = keyof typeof namedColors | string;
type rgbaT = { r: number; g: number; b: number; a: number };
type rgbT = Omit<rgbaT, 'a'>;
type hslaT = { h: number; s: number; l: number; a: number };
type hslT = Omit<hslaT, 'a'>;
type hsvaT = { h: number; s: number; v: number; a: number };
type hsvT = Omit<hsvaT, 'a'>;
type hwbaT = { h: number; w: number; b: number; a: number };
type hwbT = Omit<hwbaT, 'a'>;
type AnyFormat = ColorString | rgbaT | rgbT | hslaT | hslT | hsvaT | hsvT | hwbaT | hwbT | number;
type colorTypes<T extends {}> = {
  object: () => T;
  string: (alpha?: boolean) => string;
  array: () => number[];
};
type ConversionMethods = {
  hex: () => string;
  rgb: () => colorTypes<rgbaT>;
  hsl: () => colorTypes<hslaT>;
  hsv: () => colorTypes<hsvaT>;
  hwb: () => colorTypes<hwbaT>;
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const namedColors = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};

const formatRegex: Record<ColorFormats, RegExp | RegExp[]> = {
  hex3: /^#([A-Fa-f0-9]{3})$/, // #rgb
  hex4: /^#([A-Fa-f0-9]{3}[A-Fa-f0-9]{1})$/, // #rgba
  hex6: /^#([A-Fa-f0-9]{6})$/, // #rrggbb
  hex8: /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, // #rrggbbaa

  hsl: [
    /^hsl\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
    /^hsl\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
  ],
  hsla: [
    /^hsla\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
    /^hsla\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
  ],

  hsv: [
    /^hsv\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
    /^hsv\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
  ],
  hsva: [
    /^hsva\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
    /^hsva\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
  ],

  hwb: [
    /^hwb\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
    /^hwb\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
  ],
  hwba: [
    /^hwba\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
    /^hwba\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
  ],

  rgb: [/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i, /^rgb\s*\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\)$/i],
  rgba: [
    /^rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/i,
    /^rgba\s*\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\/\s*([\d.]+)\s*\)$/i,
  ],
};

class PrivateMethods {
  /** - Identify the color format of a given `string` or `object` */
  detectColorFormat(color: AnyFormat): ColorFormats | null {
    // color int
    if (typeof color === 'number') color = '#' + color.toString(16);

    // color string
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();
      for (const key in formatRegex) {
        const format = key as ColorFormats;
        const entry = formatRegex[format];
        if (Array.isArray(entry)) {
          for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) return format;
          continue;
        }
        if (entry.test(color)) return format;
      }
    }

    // color object
    if (typeof color === 'object') {
      const rgbaKeys = ['r', 'g', 'b', 'a'] as (keyof rgbaT)[];
      const isRgbaOb = rgbaKeys.every(k => color.hasOwnProperty(k) && typeof (color as rgbaT)[k] === 'number');
      if (isRgbaOb) return 'rgba';

      const rgbKeys = ['r', 'g', 'b'] as (keyof rgbT)[];
      const isRgbOb = rgbKeys.every(k => color.hasOwnProperty(k) && typeof (color as rgbT)[k] === 'number');
      if (isRgbOb) return 'rgb';

      const hslaKeys = ['h', 's', 'l', 'a'] as (keyof hslaT)[];
      const isHslaOb = hslaKeys.every(k => color.hasOwnProperty(k) && typeof (color as hslaT)[k] === 'number');
      if (isHslaOb) return 'hsla';

      const hslKeys = ['h', 's', 'l'] as (keyof hslT)[];
      const isHslOb = hslKeys.every(k => color.hasOwnProperty(k) && typeof (color as hslT)[k] === 'number');
      if (isHslOb) return 'hsl';

      const hsvaKeys = ['h', 's', 'v', 'a'] as (keyof hsvaT)[];
      const isHsvaOb = hsvaKeys.every(k => color.hasOwnProperty(k) && typeof (color as hsvaT)[k] === 'number');
      if (isHsvaOb) return 'hsva';

      const hsvKeys = ['h', 's', 'v'] as (keyof hsvT)[];
      const isHsvOb = hsvKeys.every(k => color.hasOwnProperty(k) && typeof (color as hsvT)[k] === 'number');
      if (isHsvOb) return 'hsv';

      const hwbaKeys = ['h', 'w', 'b', 'a'] as (keyof hwbaT)[];
      const isHwbaOb = hwbaKeys.every(k => color.hasOwnProperty(k) && typeof (color as hwbaT)[k] === 'number');
      if (isHwbaOb) return 'hwba';

      const hwbKeys = ['h', 'w', 'b'] as (keyof hwbT)[];
      const isHwbOb = hwbKeys.every(k => color.hasOwnProperty(k) && typeof (color as hwbT)[k] === 'number');
      if (isHwbOb) return 'hwb';
    }

    return null;
  }

  // * RGB
  /** - Get `RGB` or `RGBA` color values as an `object` */
  getRgbObject(color: string): rgbaT {
    color = color.trim().toLowerCase();
    const colorType = this.detectColorFormat(color);

    if (!colorType?.includes('rgb')) {
      console.error('The string provided is not an RGB or RGBA color!! returning the color "black" instead.');
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = formatRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match) console.error('Error occurred while destructuring RGB values from the given string!!');

    return {
      r: parseInt(match?.[1] ?? '0', 10),
      g: parseInt(match?.[2] ?? '0', 10),
      b: parseInt(match?.[3] ?? '0', 10),
      a: parseFloat(match?.[4] ?? '1'),
    };
  }
  /** - Convert an `RGB` or `RGBA` color to its corresponding `Hex` color */
  RGB_HEX(color: string | rgbaT | rgbT): string {
    const { r, g, b, a } =
      typeof color === 'string'
        ? this.getRgbObject(color.trim().toLowerCase())
        : { r: color.r, g: color.g, b: color.b, a: (color as rgbaT).a ?? 1 };

    const toHex = (c: number): string => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const red = toHex(r),
      green = toHex(g),
      blue = toHex(b),
      alpha = a === 1 ? '' : toHex(Math.round(a * 255));
    return `#${red + green + blue + alpha}`;
  }
  /** - Convert an `RGB` or `RGBA` color to an `HSLA` object representation */
  RGB_HSLA(color: string | rgbaT | rgbT): hslaT {
    const rgb = typeof color === 'string' ? this.getRgbObject(color.trim().toLowerCase()) : color,
      r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      a = (rgb as rgbaT).a ?? 1;

    let max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l, a };
  }
  /** - Convert `RGB` or `RGBA` color to an `HSVA`  object representation */
  RGB_HSVA(color: string | rgbaT | rgbT): hsvaT {
    const rgb = typeof color === 'string' ? this.getRgbObject(color.trim().toLowerCase()) : color,
      r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      a = (rgb as rgbaT).a ?? 1;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      d = max - min;

    let v = max,
      h = 0,
      s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else if (max === b) {
        h = (r - g) / d + 4;
      }
      h = h / 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
      a,
    };
  }
  /** - Convert `RGB` or `RGBA` color to an `HWBA`  object representation */
  RGB_HWBA(color: string | rgbaT | rgbT): hwbaT {
    const rgb = typeof color === 'string' ? this.getRgbObject(color.trim().toLowerCase()) : color,
      red = rgb.r / 255,
      green = rgb.g / 255,
      blue = rgb.b / 255,
      a = (rgb as rgbaT).a ?? 1;

    const { h } = this.RGB_HSLA(color);

    const white = clamp(Math.round(Math.min(red, green, blue) * 100), 0, 100);
    const black = clamp(Math.round((1 - Math.max(red, green, blue)) * 100), 0, 100);

    return {
      h,
      w: white,
      b: black,
      a,
    };
  }

  // * HEX * 100
  /** - Convert any `HEX` color to 8-digit `HEX` color (#rrggbbaa) */
  normalizeHexColor(color: string | number): string {
    if (typeof color === 'number') color = '#' + color.toString(16); // color int

    const colorType = this.detectColorFormat(color.trim().toLowerCase());

    if (!colorType?.includes('hex')) {
      console.error('The string provided is not an HEX color!! returning the color "black" instead');
      return '#000000ff';
    }

    const hex = color.replace(/^#/, '').split('');

    if (hex.length === 3) return `#${hex.map(x => x + x).join('')}ff`;
    if (hex.length === 4) return `#${hex.map(x => x + x).join('')}`;
    if (hex.length === 6) return `#${hex.join('')}ff`;

    return color;
  }
  /** - Convert any `HEX` color to an `RGBA` object representation */
  HEX_RGBA(color: string | number): rgbaT {
    if (typeof color === 'number') color = '#' + color.toString(16); // color int

    const hex = this.normalizeHexColor(color.trim().toLowerCase());

    let match: RegExpMatchArray | null = null;
    const entry = formatRegex.hex8;
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(hex)) match = hex.match(entry[i]);
    } else match = hex.match(entry);

    if (!match) console.error('Error occurred while destructuring HEX values from the given string!!');

    return {
      r: parseInt(match?.[1] ?? '0', 16),
      g: parseInt(match?.[2] ?? '0', 16),
      b: parseInt(match?.[3] ?? '0', 16),
      a: +(parseInt(match?.[4] ?? '0', 16) / 255).toFixed(2),
    };
  }
  /** - Convert any `HEX` color to an `HSVA` object representation */
  HEX_HSVA(color: string | number): hsvaT {
    const rgb = this.HEX_RGBA(color);
    const hsva = this.RGB_HSVA(rgb);
    return hsva;
  }
  /** - Convert any `HEX` color to an `HSLA` object representation */
  HEX_HSLA(color: string): hslaT {
    const rgb = this.HEX_RGBA(color);
    return this.RGB_HSLA(rgb);
  }
  /** - Convert any `HEX` color to an `HWBA` object representation */
  HEX_HWBA(color: string): hwbaT {
    const rgba = this.HEX_RGBA(color);
    return this.RGB_HWBA(rgba);
  }

  // * HSL
  /** - Get `HSL` or `HSLA` color values as an `object` */
  getHslObject(color: string): hslaT {
    color = color.trim().toLowerCase();
    const colorType = this.detectColorFormat(color);

    if (!colorType?.includes('hsl')) {
      console.error('The string provided is not an HSL or HSLA color!! returning the color "black" instead');
      return { h: 0, s: 0, l: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = formatRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match) console.error('Error occurred while destructuring HSL values from the given string!!');

    return {
      h: parseInt(match?.[1] ?? '0', 10),
      s: parseInt(match?.[2] ?? '0', 10),
      l: parseInt(match?.[3] ?? '0', 10),
      a: parseFloat(match?.[4] ?? '1'),
    };
  }
  /** - Convert `HSL` or `HSLA` color to an `RGBA` object representation */
  HSL_RGBA(color: string | hslaT | hslT): rgbaT {
    const hsla = typeof color === 'string' ? this.getHslObject(color.trim().toLowerCase()) : color;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const h = hsla.h / 360,
      s = hsla.s / 100,
      l = hsla.l / 100,
      a = (hsla as hslaT).a ?? 1;

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s,
      p = 2 * l - q;

    const r = hue2rgb(p, q, h + 1 / 3),
      g = hue2rgb(p, q, h),
      b = hue2rgb(p, q, h - 1 / 3);

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: a,
    };
  }
  /** - Convert `HSL` or `HSLA` color to `HEX` color */
  HSL_HEX(color: string | hslaT | hslT): string {
    const hsla =
      typeof color === 'string'
        ? this.getHslObject(color.trim().toLowerCase())
        : { h: color.h, s: color.s, l: color.l, a: (color as hslaT).a ?? 1 };

    const toHex = (c: number): string => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const { r, g, b, a } = this.HSL_RGBA(hsla),
      red = toHex(r),
      green = toHex(g),
      blue = toHex(b),
      alpha = a === 1 ? '' : toHex(Math.round(a * 255));

    return `#${red + green + blue + alpha}`;
  }
  /** - Convert `HSL` or `HSLA` color to an `HSVA` object representation */
  HSL_HSVA(color: string | hslaT | hslT): hsvaT {
    const hsla = typeof color === 'string' ? this.getHslObject(color.trim().toLowerCase()) : color;
    const h = hsla.h;

    const s = hsla.s / 100,
      l = hsla.l / 100,
      a = (hsla as hslaT).a ?? 1,
      v = l + s * Math.min(l, 1 - l),
      sNew = v === 0 ? 0 : 2 - (2 * l) / v;

    return {
      h,
      s: clamp(Math.round(sNew * 100), 0, 100),
      v: clamp(Math.round(v * 100), 0, 100),
      a,
    };
  }
  /** - Convert `HSL` or `HSLA` color to an `HWBA` object representation */
  HSL_HWBA(color: string | hslaT | hslT): hwbaT {
    const hsva = this.HSL_HSVA(color);
    return this.HSV_HWBA(hsva);
  }

  // * HSV
  /** - Get `HSV` or `HSVA` color values as an `object` */
  getHsvObject(color: string): hsvaT {
    color = color.trim().toLowerCase();
    const colorType = this.detectColorFormat(color);

    if (!colorType?.includes('hsv')) {
      console.error('The string provided is not an HSV or HSVA color!! returning the color "black" instead');
      return { h: 0, s: 0, v: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = formatRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match) console.error('Error occurred while destructuring HSV values from the given string!!');

    return {
      h: parseInt(match?.[1] ?? '0', 10),
      s: parseInt(match?.[2] ?? '0', 10),
      v: parseInt(match?.[3] ?? '0', 10),
      a: parseFloat(match?.[4] ?? '1'),
    };
  }
  /** - Convert `HSV` color to an `RGBA` object representation */
  HSV_RGBA(color: hsvaT | hsvT | string): rgbaT {
    const hsva = typeof color === 'string' ? this.getHsvObject(color.trim().toLowerCase()) : color;

    const h = hsva.h / 360;
    const s = hsva.s / 100;
    const v = hsva.v / 100;
    const a = (hsva as hsvaT).a ?? 1;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0,
      g = 0,
      b = 0;
    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    return {
      r: clamp(Math.round(r * 255), 0, 255),
      g: clamp(Math.round(g * 255), 0, 255),
      b: clamp(Math.round(b * 255), 0, 255),
      a,
    };
  }
  /** - Convert `HSV` color to an `HSLA` object representation */
  HSV_HSLA(color: hsvaT | hsvT | string): hslaT {
    const hsva = typeof color === 'string' ? this.getHsvObject(color.trim().toLowerCase()) : color;

    const h = hsva.h;
    const s = hsva.s / 100;
    const v = hsva.v / 100;
    const a = (hsva as hsvaT).a ?? 1;

    const l = ((2 - s) * v) / 2;
    const sl = s * v;
    const sln = l !== 0 && l !== 1 ? sl / (l < 0.5 ? l * 2 : 2 - l * 2) : sl;

    return { h, s: clamp(Math.round(sln * 100), 0, 100), l: clamp(Math.round(l * 100), 0, 100), a };
  }
  /** - Convert `HSV` color to an `Hex` color */
  HSV_HEX(color: hsvaT | hsvT | string): string {
    const rgba = this.HSV_RGBA(color);
    const hex = this.RGB_HEX(rgba);
    return hex;
  }
  /** - Convert `HSV` color to an `HWBA` object representation */
  HSV_HWBA(color: hsvaT | hsvT | string): hwbaT {
    const hsva = typeof color === 'string' ? this.getHsvObject(color.trim().toLowerCase()) : color;

    const { h, s, v } = hsva;
    const a = (hsva as hsvaT).a ?? 1;

    const w = clamp(Math.round((1 - s / 100) * v), 0, 100);
    const b = clamp(Math.round((1 - v / 100) * 100), 0, 100);

    return { h, w, b, a };
  }

  // * HWB
  /** - Get `HWB` or `HWBA` color values as an `object` */
  getHwbObject(color: string): hwbaT {
    color = color.trim().toLowerCase();
    const colorType = this.detectColorFormat(color);

    if (!colorType?.includes('hwb')) {
      console.error('The string provided is not an HWB or HWBA color!! returning the color "black" instead');
      return { h: 0, w: 0, b: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = formatRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match) console.error('Error occurred while destructuring HWB values from the given string!!');

    return {
      h: parseInt(match?.[1] ?? '0', 10),
      w: parseInt(match?.[2] ?? '0', 10),
      b: parseInt(match?.[3] ?? '100', 10),
      a: parseFloat(match?.[4] ?? '1'),
    };
  }
  /** - Convert `HWB` or `HWBA` color to an `RGBA` object representation */
  HWB_RGBA(color: hwbaT | hwbT | string): rgbaT {
    const hwba = typeof color === 'string' ? this.getHwbObject(color.trim().toLowerCase()) : color;

    const h = hwba.h / 360,
      w = hwba.w / 100,
      b = hwba.b / 100,
      a = (hwba as hwbaT)?.a ?? 1;

    if (w + b >= 1) {
      const gray = clamp(Math.round((w * 255) / (w + b)), 0, 255);
      return {
        r: gray,
        g: gray,
        b: gray,
        a,
      };
    }

    const calcHue = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const red = calcHue(0, 1, h + 1 / 3) * (1 - w - b) + w,
      green = calcHue(0, 1, h) * (1 - w - b) + w,
      blue = calcHue(0, 1, h - 1 / 3) * (1 - w - b) + w;

    return {
      r: clamp(Math.round(red * 255), 0, 255),
      g: clamp(Math.round(green * 255), 0, 255),
      b: clamp(Math.round(blue * 255), 0, 255),
      a,
    };
  }
  /** - Convert `HWB` or `HWBA` color to an `Hex` color */
  HWB_HEX(color: hwbaT | hwbT | string): string {
    const rgba = this.HWB_RGBA(color);
    return this.RGB_HEX(rgba);
  }
  /** - Convert `HWB` or `HWBA` color to an `HSVA` object representation */
  HWB_HSVA(color: hwbaT | hwbT | string): hsvaT {
    const hwba = typeof color === 'string' ? this.getHwbObject(color.trim().toLowerCase()) : color;

    const h = hwba.h % 360,
      w = hwba.w / 100,
      b = hwba.b / 100,
      a = (hwba as hwbaT)?.a ?? 1;

    const v = clamp(Math.round((1 - b) * 100), 0, 100);
    const s = clamp(Math.round((1 - w / (v / 100)) * 100), 0, 100);

    return { h, s, v, a };
  }
  /** - Convert `HWB` or `HWBA` color to an `HSLA` object representation */
  HWB_HSLA(color: hwbaT | hwbT | string): hslaT {
    const hsva = this.HWB_HSVA(color);
    return this.HSV_HSLA(hsva);
  }
}

class Colors {
  private _: InstanceType<typeof PrivateMethods>;
  private returnColorObject: (color: AnyFormat) => ConversionMethods;

  constructor() {
    this._ = new PrivateMethods();

    this.returnColorObject = (color: AnyFormat) => {
      return {
        hex: () => this.HEX(color),
        rgb: () => this.RGB(color),
        hsl: () => this.HSL(color),
        hsv: () => this.HSV(color),
        hwb: () => this.HWB(color),
      };
    };
  }

  /** - Identify the color format of a given `string` or `object`, and return `null` for invalid colors. */
  getFormat(color: AnyFormat): ColorFormats | 'named' | null {
    // color int
    if (typeof color === 'number') color = '#' + color.toString(16);

    // color string
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();
      if (namedColors.hasOwnProperty(color)) return 'named';

      for (const key in formatRegex) {
        const format = key as ColorFormats;
        const entry = formatRegex[format];
        if (Array.isArray(entry)) {
          for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) return format;
          continue;
        }
        if (entry.test(color)) return format;
      }
    }

    // color object
    if (typeof color === 'object') {
      const rgbaKeys = ['r', 'g', 'b', 'a'] as (keyof rgbaT)[];
      const isRgbaOb = rgbaKeys.every(k => color.hasOwnProperty(k) && typeof (color as rgbaT)[k] === 'number');
      if (isRgbaOb) return 'rgba';

      const rgbKeys = ['r', 'g', 'b'] as (keyof rgbT)[];
      const isRgbOb = rgbKeys.every(k => color.hasOwnProperty(k) && typeof (color as rgbT)[k] === 'number');
      if (isRgbOb) return 'rgb';

      const hslaKeys = ['h', 's', 'l', 'a'] as (keyof hslaT)[];
      const isHslaOb = hslaKeys.every(k => color.hasOwnProperty(k) && typeof (color as hslaT)[k] === 'number');
      if (isHslaOb) return 'hsla';

      const hslKeys = ['h', 's', 'l'] as (keyof hslT)[];
      const isHslOb = hslKeys.every(k => color.hasOwnProperty(k) && typeof (color as hslT)[k] === 'number');
      if (isHslOb) return 'hsl';

      const hsvaKeys = ['h', 's', 'v', 'a'] as (keyof hsvaT)[];
      const isHsvaOb = hsvaKeys.every(k => color.hasOwnProperty(k) && typeof (color as hsvaT)[k] === 'number');
      if (isHsvaOb) return 'hsva';

      const hsvKeys = ['h', 's', 'v'] as (keyof hsvT)[];
      const isHsvOb = hsvKeys.every(k => color.hasOwnProperty(k) && typeof (color as hsvT)[k] === 'number');
      if (isHsvOb) return 'hsv';

      const hwbaKeys = ['h', 'w', 'b', 'a'] as (keyof hwbaT)[];
      const isHwbaOb = hwbaKeys.every(k => color.hasOwnProperty(k) && typeof (color as hwbaT)[k] === 'number');
      if (isHwbaOb) return 'hwba';

      const hwbKeys = ['h', 'w', 'b'] as (keyof hwbT)[];
      const isHwbOb = hwbKeys.every(k => color.hasOwnProperty(k) && typeof (color as hwbT)[k] === 'number');
      if (isHwbOb) return 'hwb';
    }

    return null;
  }

  // * RGB
  /** - Convert `HSL`, `HSLA`, `HSV`, `HSVA` or `HEX` color to `RGBA` color format. */
  RGB(color: AnyFormat) {
    if (typeof color === 'string') color = color.trim().toLowerCase();

    color =
      typeof color === 'string' && namedColors.hasOwnProperty(color)
        ? (namedColors[color as keyof typeof namedColors] as string)
        : color;

    const colorType = this._.detectColorFormat(color);

    if (colorType?.includes('hex')) {
      return {
        string: (alpha?: boolean) => {
          const { r, g, b, a } = this._.HEX_RGBA(color as string);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;

          if (alpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

          return `rgb(${r}, ${g}, ${b})`;
        },
        array: () => {
          const { r, g, b, a } = this._.HEX_RGBA(color as string);
          return [r, g, b, a];
        },
        object: () => this._.HEX_RGBA(color as string),
      };
    }

    if (colorType === 'hsl' || colorType === 'hsla') {
      return {
        string: (alpha?: boolean) => {
          const { r, g, b, a } = this._.HSL_RGBA(color as hslaT | hslT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;

          if (alpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

          return `rgb(${r}, ${g}, ${b})`;
        },
        array: () => {
          const { r, g, b, a } = this._.HSL_RGBA(color as hslaT | hslT);
          return [r, g, b, a];
        },
        object: () => this._.HSL_RGBA(color as hslaT | hslT),
      };
    }

    if (colorType === 'hsv' || colorType === 'hsva') {
      return {
        string: (alpha?: boolean) => {
          const { r, g, b, a } = this._.HSV_RGBA(color as hsvaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;

          if (alpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

          return `rgb(${r}, ${g}, ${b})`;
        },
        array: () => {
          const { r, g, b, a } = this._.HSV_RGBA(color as hsvaT | hsvT);
          return [r, g, b, a];
        },
        object: () => this._.HSV_RGBA(color as hsvaT | hsvT),
      };
    }

    if (colorType === 'hwb' || colorType === 'hwba') {
      return {
        string: (alpha?: boolean) => {
          const { r, g, b, a } = this._.HWB_RGBA(color as hwbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;

          if (alpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

          return `rgb(${r}, ${g}, ${b})`;
        },
        array: () => {
          const { r, g, b, a } = this._.HWB_RGBA(color as hwbaT | hwbT);
          return [r, g, b, a];
        },
        object: () => this._.HWB_RGBA(color as hwbaT | hwbT),
      };
    }

    if (colorType === 'rgb' || colorType === 'rgba') {
      return {
        string: (alpha?: boolean) => {
          const { r, g, b, a } = typeof color === 'string' ? this._.getRgbObject(color) : (color as rgbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;

          if (alpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

          return `rgb(${r}, ${g}, ${b})`;
        },
        array: () => {
          const { r, g, b, a } = typeof color === 'string' ? this._.getRgbObject(color) : (color as rgbaT);
          return [r, g, b, a ?? 1];
        },
        object: () => {
          const { r, g, b, a } = typeof color === 'string' ? this._.getRgbObject(color) : (color as rgbaT);
          return { r, g, b, a: a ?? 1 };
        },
      };
    }

    // ! error
    console.error('error converting color to RGB!! returning the color "black" instead');
    return {
      string: (alpha?: boolean) => (alpha ? 'rgba(0, 0, 0, 1)' : 'rgb(0, 0, 0)'),
      array: () => [0, 0, 0, 1],
      object: () => ({ r: 0, g: 0, b: 0, a: 1 }),
    };
  }

  // * HEX
  /** - Convert `HSL`, `HSLA`, `HSV`, `HSVA`, `RGB` or `RGBA` color to `HEX` color format. */
  HEX(color: AnyFormat): string {
    if (typeof color === 'string') color = color.trim().toLowerCase();

    color =
      typeof color === 'string' && namedColors.hasOwnProperty(color)
        ? (namedColors[color as keyof typeof namedColors] as string)
        : color;

    const colorType = this._.detectColorFormat(color);

    if (colorType === 'rgb' || colorType === 'rgba') {
      return this._.RGB_HEX(color as string | rgbaT);
    }

    if (colorType === 'hsl' || colorType === 'hsla') {
      return this._.HSL_HEX(color as string | hslaT | hslT);
    }

    if (colorType === 'hsv' || colorType === 'hsva') {
      return this._.HSV_HEX(color as hsvaT | hsvT);
    }

    if (colorType === 'hwb' || colorType === 'hwba') {
      return this._.HWB_HEX(color as hwbaT | hwbT);
    }

    if (colorType?.includes('hex')) return color as string;

    // ! error
    console.error('error converting color to HEX!! returning the color "black" instead');
    return '#000000';
  }

  // * HSL
  /** - Convert `HEX`, `HSV`, `HSVA`, `RGB` or `RGBA` color to `HSLA` color format. */
  HSL(color: AnyFormat) {
    if (typeof color === 'string') color = color.trim().toLowerCase();

    color =
      typeof color === 'string' && namedColors.hasOwnProperty(color)
        ? (namedColors[color as keyof typeof namedColors] as string)
        : color;

    const colorType = this._.detectColorFormat(color);

    if (colorType?.includes('hex')) {
      return {
        string: (alpha?: boolean) => {
          const { h, s, l, a } = this._.HEX_HSLA(color as string);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;

          if (alpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

          return `hsl(${h}, ${s}%, ${l}%)`;
        },
        array: () => {
          const { h, s, l, a } = this._.HEX_HSLA(color as string);
          return [h, s, l, a];
        },
        object: () => this._.HEX_HSLA(color as string),
      };
    }

    if (colorType === 'rgb' || colorType === 'rgba') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, l, a } = this._.RGB_HSLA(color as rgbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;

          if (alpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

          return `hsl(${h}, ${s}%, ${l}%)`;
        },
        array: () => {
          const { h, s, l, a } = this._.RGB_HSLA(color as rgbaT);
          return [h, s, l, a];
        },
        object: () => this._.RGB_HSLA(color as rgbaT | rgbT),
      };
    }

    if (colorType === 'hsv' || colorType === 'hsva') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, l, a } = this._.HSV_HSLA(color as hsvaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;

          if (alpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

          return `hsl(${h}, ${s}%, ${l}%)`;
        },
        array: () => {
          const { h, s, l, a } = this._.HSV_HSLA(color as hsvaT | hsvT);
          return [h, s, l, a];
        },
        object: () => this._.HSV_HSLA(color as hsvaT | hsvT),
      };
    }

    if (colorType === 'hwb' || colorType === 'hwba') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, l, a } = this._.HWB_HSLA(color as hwbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;

          if (alpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

          return `hsl(${h}, ${s}%, ${l}%)`;
        },
        array: () => {
          const { h, s, l, a } = this._.HWB_HSLA(color as hwbaT | hwbT);
          return [h, s, l, a];
        },
        object: () => this._.HWB_HSLA(color as hwbaT | hwbT),
      };
    }

    if (colorType === 'hsl' || colorType === 'hsla') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, l, a } = typeof color === 'string' ? this._.getHslObject(color) : (color as hslaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;

          if (alpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

          return `hsl(${h}, ${s}%, ${l}%)`;
        },
        array: () => {
          const { h, s, l, a } = typeof color === 'string' ? this._.getHslObject(color) : (color as hslaT);
          return [h, s, l, a ?? 1];
        },
        object: () => {
          const { h, s, l, a } = typeof color === 'string' ? this._.getHslObject(color) : (color as hslaT);
          return { h, s, l, a: a ?? 1 };
        },
      };
    }

    // ! error
    console.error('error converting color to HSL!! returning the color "black" instead');
    return {
      string: (alpha?: boolean) => (alpha ? 'hsla(0, 0%, 0%, 1)' : 'hsl(0, 0%, 0%)'),
      array: () => [0, 0, 0, 1],
      object: () => ({ h: 0, s: 0, l: 0, a: 1 }),
    };
  }

  // * HSV
  /** - Convert `HSL`, `HSLA`, `HEX`, `RGB` or `RGBA` color to `HSVA` color format. */
  HSV(color: AnyFormat) {
    if (typeof color === 'string') color = color.trim().toLowerCase();

    color =
      typeof color === 'string' && namedColors.hasOwnProperty(color)
        ? (namedColors[color as keyof typeof namedColors] as string)
        : color;

    const colorType = this._.detectColorFormat(color);

    if (colorType?.includes('hex')) {
      return {
        string: (alpha?: boolean) => {
          const { h, s, v, a } = this._.HEX_HSVA(color as string);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsva(${h}, ${s}%, ${v}%, ${a})` : `hsv(${h}, ${s}%, ${v}%)`;

          if (alpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

          return `hsv(${h}, ${s}%, ${v}%)`;
        },
        array: () => {
          const { h, s, v, a } = this._.HEX_HSVA(color as string);
          return [h, s, v, a];
        },
        object: () => this._.HEX_HSVA(color as string),
      };
    }

    if (colorType === 'rgb' || colorType === 'rgba') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, v, a } = this._.RGB_HSVA(color as rgbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsva(${h}, ${s}%, ${v}%, ${a})` : `hsv(${h}, ${s}%, ${v}%)`;

          if (alpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

          return `hsv(${h}, ${s}%, ${v}%)`;
        },
        array: () => {
          const { h, s, v, a } = this._.RGB_HSVA(color as rgbaT);
          return [h, s, v, a];
        },
        object: () => this._.RGB_HSVA(color as rgbaT | rgbT),
      };
    }

    if (colorType === 'hsl' || colorType === 'hsla') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, v, a } = this._.HSL_HSVA(color as hslaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsva(${h}, ${s}%, ${v}%, ${a})` : `hsv(${h}, ${s}%, ${v}%)`;

          if (alpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

          return `hsv(${h}, ${s}%, ${v}%)`;
        },
        array: () => {
          const { h, s, v, a } = this._.HSL_HSVA(color as hslaT | hslT);
          return [h, s, v, a];
        },
        object: () => this._.HSL_HSVA(color as hslaT | hslT),
      };
    }

    if (colorType === 'hwb' || colorType === 'hwba') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, v, a } = this._.HWB_HSVA(color as hwbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsva(${h}, ${s}%, ${v}%, ${a})` : `hsv(${h}, ${s}%, ${v}%)`;

          if (alpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

          return `hsv(${h}, ${s}%, ${v}%)`;
        },
        array: () => {
          const { h, s, v, a } = this._.HWB_HSVA(color as hwbaT | hwbT);
          return [h, s, v, a];
        },
        object: () => this._.HWB_HSVA(color as hwbaT | hwbT),
      };
    }

    if (colorType === 'hsv' || colorType === 'hsva') {
      return {
        string: (alpha?: boolean) => {
          const { h, s, v, a } = typeof color === 'string' ? this._.getHsvObject(color) : (color as hsvaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hsva(${h}, ${s}%, ${v}%, ${a})` : `hsv(${h}, ${s}%, ${v}%)`;

          if (alpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

          return `hsv(${h}, ${s}%, ${v}%)`;
        },
        array: () => {
          const { h, s, v, a } = typeof color === 'string' ? this._.getHsvObject(color) : (color as hsvaT);
          return [h, s, v, a ?? 1];
        },
        object: () => {
          const { h, s, v, a } = typeof color === 'string' ? this._.getHsvObject(color) : (color as hsvaT);
          return { h, s, v, a: a ?? 1 };
        },
      };
    }

    // ! error
    console.error('error converting color to HSV!! returning the color "black" instead');
    return {
      string: (alpha?: boolean) => (alpha ? 'hsva(0, 0%, 0%, 1)' : 'hsv(0, 0%, 0%)'),
      array: () => [0, 0, 0, 1],
      object: () => ({ h: 0, s: 0, v: 0, a: 1 }),
    };
  }

  // * HWB
  /** - Convert `HSL`, `HSLA`, `HEX`, `RGB` or `RGBA` color to `HWBA` color format. */
  HWB(color: AnyFormat) {
    if (typeof color === 'string') color = color.trim().toLowerCase();

    color =
      typeof color === 'string' && namedColors.hasOwnProperty(color)
        ? (namedColors[color as keyof typeof namedColors] as string)
        : color;

    const colorType = this._.detectColorFormat(color);

    if (colorType?.includes('hex')) {
      return {
        string: (alpha?: boolean) => {
          const { h, w, b, a } = this._.HEX_HWBA(color as string);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hwba(${h}, ${w}%, ${b}%, ${a})` : `hwb(${h}, ${w}%, ${b}%)`;

          if (alpha) return `hwba(${h}, ${w}%, ${b}%, ${a ?? 1})`;

          return `hwb(${h}, ${w}%, ${b}%)`;
        },
        array: () => {
          const { h, w, b, a } = this._.HEX_HWBA(color as string);
          return [h, w, b, a];
        },
        object: () => this._.HEX_HWBA(color as string),
      };
    }

    if (colorType === 'rgb' || colorType === 'rgba') {
      return {
        string: (alpha?: boolean) => {
          const { h, w, b, a } = this._.RGB_HWBA(color as rgbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hwba(${h}, ${w}%, ${b}%, ${a})` : `hwb(${h}, ${w}%, ${b}%)`;

          if (alpha) return `hwba(${h}, ${w}%, ${b}%, ${a ?? 1})`;

          return `hwb(${h}, ${w}%, ${b}%)`;
        },
        array: () => {
          const { h, w, b, a } = this._.RGB_HWBA(color as rgbaT);
          return [h, w, b, a];
        },
        object: () => this._.RGB_HWBA(color as rgbaT | rgbT),
      };
    }

    if (colorType === 'hsl' || colorType === 'hsla') {
      return {
        string: (alpha?: boolean) => {
          const { h, w, b, a } = this._.HSL_HWBA(color as hslaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hwba(${h}, ${w}%, ${b}%, ${a})` : `hwb(${h}, ${w}%, ${b}%)`;

          if (alpha) return `hwba(${h}, ${w}%, ${b}%, ${a ?? 1})`;

          return `hwb(${h}, ${w}%, ${b}%)`;
        },
        array: () => {
          const { h, w, b, a } = this._.HSL_HWBA(color as hslaT | hslT);
          return [h, w, b, a];
        },
        object: () => this._.HSL_HWBA(color as hslaT | hslT),
      };
    }

    if (colorType === 'hsv' || colorType === 'hsva') {
      return {
        string: (alpha?: boolean) => {
          const { h, w, b, a } = this._.HSV_HWBA(color as hsvaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hwba(${h}, ${w}%, ${b}%, ${a})` : `hwb(${h}, ${w}%, ${b}%)`;

          if (alpha) return `hwba(${h}, ${w}%, ${b}%, ${a ?? 1})`;

          return `hwb(${h}, ${w}%, ${b}%)`;
        },
        array: () => {
          const { h, w, b, a } = this._.HSV_HWBA(color as hsvaT | hsvT);
          return [h, w, b, a];
        },
        object: () => this._.HSV_HWBA(color as hsvaT | hsvT),
      };
    }

    if (colorType === 'hwb' || colorType === 'hwba') {
      return {
        string: (alpha?: boolean) => {
          const { h, w, b, a } = typeof color === 'string' ? this._.getHwbObject(color) : (color as hwbaT);

          if (typeof alpha === 'undefined')
            return typeof a === 'number' && a !== 1 ? `hwba(${h}, ${w}%, ${b}%, ${a})` : `hwb(${h}, ${w}%, ${b}%)`;

          if (alpha) return `hwba(${h}, ${w}%, ${b}%, ${a ?? 1})`;

          return `hwb(${h}, ${w}%, ${b}%)`;
        },
        array: () => {
          const { h, w, b, a } = typeof color === 'string' ? this._.getHwbObject(color) : (color as hwbaT);
          return [h, w, b, a ?? 1];
        },
        object: () => {
          const { h, w, b, a } = typeof color === 'string' ? this._.getHwbObject(color) : (color as hwbaT);
          return { h, w, b, a: a ?? 1 };
        },
      };
    }

    // ! error
    console.error('error converting color to HWB!! returning the color "black" instead');
    return {
      string: (alpha?: boolean) => (alpha ? 'hwba(0, 0%, 100%, 1)' : 'hwb(0, 0%, 100%)'),
      array: () => [0, 0, 100, 1],
      object: () => ({ h: 0, w: 0, b: 100, a: 1 }),
    };
  }

  // * color's channels
  /** - Get the `red` channel value of a given color. */
  getRed(color: AnyFormat): number {
    const { r } = this.RGB(color).object();
    return r;
  }
  /** Set the `red` value of a color to a specific amount.*/
  setRed(color: AnyFormat, amount: number): ConversionMethods {
    const { g, b, a } = this.RGB(color).object();
    const newR = Math.round(clamp(amount, 0, 255));
    const newColor = { r: newR, g, b, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `red` value of a color by the given percentage/amount.
   * @example
   * increaseRed(''rgb(100, 100, 100)', 20).hex();
   * increaseRed('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseRed(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const red = typeof amount === 'string' ? r + r * (parseFloat(amount) / 100) : r + amount;
    const newR = Math.round(clamp(red, 0, 255));
    const newColor = { r: newR, g, b, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `red` value of a color by the given percentage/amount
   * @example
   * decreaseRed('rgb(100, 100, 100)', 20).hex();
   * decreaseRed('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseRed(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const red = typeof amount === 'string' ? r - r * (parseFloat(amount) / 100) : r - amount;
    const newR = Math.round(clamp(red, 0, 255));
    const newColor = { r: newR, g, b, a };

    return this.returnColorObject(newColor);
  }

  /** - Get the `green` channel value of a given color. */
  getGreen(color: AnyFormat): number {
    const { g } = this.RGB(color).object();
    return g;
  }
  /** - Set the `green` value of a color to a specific amount.*/
  setGreen(color: AnyFormat, amount: number): ConversionMethods {
    const { r, b, a } = this.RGB(color).object();
    const newG = Math.round(clamp(amount, 0, 255));
    const newColor = { r, g: newG, b, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `green` value of a color by the given percentage.
   * @example
   * increaseGreen('rgb(100, 100, 100)', 20).hex();
   * increaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseGreen(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const green = typeof amount === 'string' ? g + g * (parseFloat(amount) / 100) : g + amount;
    const newG = Math.round(clamp(green, 0, 255));
    const newColor = { r, g: newG, b, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `green` value of a color by the given percentage.
   * @example
   * decreaseGreen('rgb(100, 100, 100)', 20).hex();
   * decreaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseGreen(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const green = typeof amount === 'string' ? g - g * (parseFloat(amount) / 100) : g - amount;
    const newG = Math.round(clamp(green, 0, 255));
    const newColor = { r, g: newG, b, a };

    return this.returnColorObject(newColor);
  }

  /** - Get the `blue` channel value of a given color. */
  getBlue(color: AnyFormat): number {
    const { b } = this.RGB(color).object();
    return b;
  }
  /** - Set the `blue` value of a color to a specific amount.*/
  setBlur(color: AnyFormat, amount: number): ConversionMethods {
    const { r, g, a } = this.RGB(color).object();
    const newB = Math.round(clamp(amount, 0, 255));
    const newColor = { r, g, b: newB, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `blue` value of a color by the given percentage.
   * @example
   * increaseBlue('rgb(100, 100, 100)', 20).hex();
   * increaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseBlue(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const blue = typeof amount === 'string' ? b + b * (parseFloat(amount) / 100) : b + amount;
    const newB = Math.round(clamp(blue, 0, 255));
    const newColor = { r, g, b: newB, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `blue` value of a color by the given percentage.
   * @example
   * decreaseBlue('rgb(100, 100, 100)', 20).hex();
   * decreaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseBlue(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const blue = typeof amount === 'string' ? b - b * (parseFloat(amount) / 100) : b - amount;
    const newB = Math.round(clamp(blue, 0, 255));
    const newColor = { r, g, b: newB, a };

    return this.returnColorObject(newColor);
  }

  //* hue
  /** - Get the `hue` channel value of a given color. */
  getHue(color: AnyFormat): number {
    const { h } = this.HSL(color).object();
    return h;
  }
  /** - Set the `hue` value of a color to a specific amount.*/
  setHue(color: AnyFormat, amount: number): ConversionMethods {
    const { s, l, a } = this.HSL(color).object();
    const newH = Math.round(clamp(amount, 0, 360));
    const newColor = { h: newH, s, l, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `hue` value of a color by the given percentage/amount.
   * @example
   * increaseHue('rgb(100, 100, 100)', 20).hex();
   * increaseHue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseHue(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const hue = typeof amount === 'string' ? h + h * (parseFloat(amount) / 100) : h + amount;
    const newH = Math.round(clamp(hue, 0, 360));
    const newColor = { h: newH, s, l, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `hue` value of a color by the given percentage/amount.
   * @example
   * decreaseHue('rgb(100, 100, 100)', 20).hex();
   * decreaseHue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseHue(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const hue = typeof amount === 'string' ? h - h * (parseFloat(amount) / 100) : h - amount;
    const newH = Math.round(clamp(hue, 0, 360));
    const newColor = { h: newH, s, l, a };

    return this.returnColorObject(newColor);
  }
  /**
   * - Spin the `hue` channel by a certain percentage/amount.
   * @example
   * spin('red', 20).hex();
   * spin('rgb(255, 0, 0)', '20%').rgb().string();
   */
  spin(color: AnyFormat, degree: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const spin = typeof degree === 'string' ? s * (parseFloat(degree) / 100) : degree;
    const newColor = { h: Math.round((h + spin) % 360), s, l, a };

    return this.returnColorObject(newColor);
  }

  //* saturation
  /** - Get the `saturation` value of a given color. */
  getSaturation(color: AnyFormat): number {
    const { s } = this.HSL(color).object();
    return s;
  }
  /** - Set the `saturation` value of a color to a specific amount.*/
  setSaturation(color: AnyFormat, amount: number): ConversionMethods {
    const { h, l, a } = this.HSL(color).object();
    const newS = Math.round(clamp(amount, 0, 100));
    const saturatedColor = { h, s: newS, l, a };

    return this.returnColorObject(saturatedColor);
  }
  /**
   * - Increase the saturation of the given color by a certain percentage/amount.
   * @example
   * saturate('red', 20).hex();
   * saturate('rgb(255, 0, 0)', '20%').rgb().string();
   */
  saturate(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const saturation = typeof amount === 'string' ? s + s * (parseFloat(amount) / 100) : s + amount;
    const newS = Math.round(clamp(saturation, 0, 100));
    const saturatedColor = { h, s: newS, l, a };

    return this.returnColorObject(saturatedColor);
  }
  /**
   * - Decrease the saturation of the given color by a certain percentage/amount.
   * @example
   * saturate('red', 20).hex();
   * saturate('rgb(255, 0, 0)', '20%').rgb().string();
   */
  desaturate(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const saturation = typeof amount === 'string' ? s - s * (parseFloat(amount) / 100) : s - amount;
    const newS = Math.round(clamp(saturation, 0, 100));
    const desaturatedColor = { h, s: newS, l, a };

    return this.returnColorObject(desaturatedColor);
  }

  //* brightness
  /** - Get color's HSL `luminosity` channel value.
   * - If you want the overall `luminosity` of a color use `getLuminanceWCAG` method.
   */
  getLuminance(color: AnyFormat): number {
    const { l } = this.HSL(color).object();
    return l;
  }
  /** - Set HSL's `luminosity` channel for a given color to a specific amount.*/
  setLuminance(color: AnyFormat, amount: number): ConversionMethods {
    const { h, s, a } = this.HSL(color).object();
    const newL = Math.round(clamp(amount, 0, 100));
    const newColor = { h, s, l: newL, a };

    return this.returnColorObject(newColor);
  }
  /**
   * - Increase the brightness of the given color by a certain percentage/amount.
   * @example
   * brighten('red', 20).hex();
   * brighten('rgb(255, 0, 0)', '20%').rgb().string();
   */
  brighten(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const lum = typeof amount === 'string' ? l + l * (parseFloat(amount) / 100) : l + amount;
    const newL = Math.round(clamp(lum, 0, 100));
    const brightenedColor = { h, s, l: newL, a };

    return this.returnColorObject(brightenedColor);
  }
  /**
   * - Decrease the brightness of the given color by a certain percentage/amount.
   * @example
   * darken('red', 20).hex();
   * darken('rgb(255, 0, 0)', '20%').rgb().string();
   */
  darken(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const lum = typeof amount === 'string' ? l - l * (parseFloat(amount) / 100) : l - amount;
    const newL = Math.round(clamp(lum, 0, 100));
    const darkenedColor = { h, s, l: newL, a };

    return this.returnColorObject(darkenedColor);
  }

  /** - Get the HSV's `value` (brightness) channel value of a given color. */
  getBrightness(color: AnyFormat): number {
    const { v } = this.HSV(color).object();
    return v;
  }
  /** - Set HSV's `value` (brightness) channel for a given color to a specific amount.*/
  setBrightness(color: AnyFormat, amount: number): ConversionMethods {
    const { h, s, a } = this.HSV(color).object();
    const newV = Math.round(clamp(amount, 0, 100));
    const newColor = { h, s, v: newV, a };

    return this.returnColorObject(newColor);
  }
  /** Increase HSV's `value` (brightness) channel value of a color by the given percentage/amount.*/
  increaseBrightness(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, v, a } = this.HSV(color).object();
    const value = typeof amount === 'string' ? v + v * (parseFloat(amount) / 100) : v + amount;
    const newV = Math.round(clamp(value, 0, 100));
    const newColor = { h, s, v: newV, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease HSV's `value` (brightness) channel value of a color by the given percentage/amount.*/
  decreaseBrightness(color: AnyFormat, amount: number | string): ConversionMethods {
    const { h, s, v, a } = this.HSV(color).object();
    const value = typeof amount === 'string' ? v - v * (parseFloat(amount) / 100) : v - amount;
    const newV = Math.round(clamp(value, 0, 100));
    const newColor = { h, s, v: newV, a };

    return this.returnColorObject(newColor);
  }

  //* alpha
  /** - Get the `alpha` value of a given color. */
  getAlpha(color: AnyFormat): number {
    const { a } = this.RGB(color).object();
    return a;
  }
  /** - Set the `alpha` value of a color to a specific amount.*/
  setAlpha(color: AnyFormat, amount: number): ConversionMethods {
    const { r, g, b } = this.RGB(color).object();
    const newA = Math.round(clamp(amount, 0, 1));
    const newColor = { r, g, b, a: newA };

    return this.returnColorObject(newColor);
  }
  /** Increase the `alpha` value of a color by the given percentage.*/
  increaseAlpha(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const alpha = typeof amount === 'string' ? a + a * (parseFloat(amount) / 100) : a + amount;
    const newA = Math.round(clamp(alpha, 0, 1));
    const newColor = { r, g, b, a: newA };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `alpha` value of a color by the given percentage.*/
  decreaseAlpha(color: AnyFormat, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const alpha = typeof amount === 'string' ? a - a * (parseFloat(amount) / 100) : a - amount;
    const newA = Math.round(clamp(alpha, 0, 1));
    const newColor = { r, g, b, a: newA };

    return this.returnColorObject(newColor);
  }

  // * tools
  /** - Returns the perceived `luminance` of a color, from `0-1` as defined by Web Content Accessibility Guidelines (Version 2.0). */
  getLuminanceWCAG(color: AnyFormat): number {
    const { r, g, b } = this.RGB(color).object();
    const a = [r, g, b].map(v => (v / 255 <= 0.03928 ? v / 255 / 12.92 : Math.pow((v / 255 + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  /** - Calculates the contrast ratio between two colors, useful for ensuring accessibility and readability. */
  contrastRatio(color1: AnyFormat, color2: AnyFormat): number {
    const luminance1 = this.getLuminanceWCAG(color1);
    const luminance2 = this.getLuminanceWCAG(color2);
    const contrast = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return Math.round(contrast * 100) / 100;
  }

  /** - Returns a boolean indicating whether the color is considered "dark" or not */
  isDark(color: AnyFormat): boolean {
    const luminance = this.getLuminanceWCAG(color);
    return luminance < 0.5;
  }

  /** - Returns a boolean indicating whether the color is considered "light" or not */
  isLight(color: AnyFormat): boolean {
    const luminance = this.getLuminanceWCAG(color);
    return luminance >= 0.5;
  }

  /**
   * - Blends two colors by a certain amount.
   * @example
   * blend('yellow', 'red', 50).hex(); // #ff8000
   */
  blend(color1: AnyFormat, color2: AnyFormat, percentage: number): ConversionMethods {
    percentage = percentage / 100;

    const rgba1 = this.RGB(color1).object();
    const rgba2 = this.RGB(color2).object();

    const r = Math.round(clamp(rgba1.r * (1 - percentage) + rgba2.r * percentage, 0, 255)),
      g = Math.round(clamp(rgba1.g * (1 - percentage) + rgba2.g * percentage, 0, 255)),
      b = Math.round(clamp(rgba1.b * (1 - percentage) + rgba2.b * percentage, 0, 255)),
      a = Math.round(clamp(rgba1.a * (1 - percentage) + rgba2.a * percentage, 0, 1));

    const blendedColor = { r, g, b, a };

    return this.returnColorObject(blendedColor);
  }

  /** - Invert (negate) a color, black becomes white, white becomes black, blue becomes orange and so on. */
  invert(color: AnyFormat): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const invertedColor = { r: 255 - r, g: 255 - g, b: 255 - b, a };
    return this.returnColorObject(invertedColor);
  }

  /** - Completely desaturates a color into greyscale. */
  grayscale(color: AnyFormat): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const gray = Math.round(clamp(r * 0.3 + g * 0.59 + b * 0.11, 0, 255));
    const grayColor = { r: gray, g: gray, b: gray, a };

    return this.returnColorObject(grayColor);
  }

  /** - Generate a random color from `HSL` values. */
  randomHslColor({ h = [0, 360], s = [0, 100], l = [0, 100], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      h: Math.round(clamp(randomNumber(h[0], h[1]), 0, 360)),
      s: Math.round(clamp(randomNumber(s[0], s[1]), 0, 100)),
      l: Math.round(clamp(randomNumber(l[0], l[1]), 0, 100)),
      a: +clamp(randomNumber(a[0], a[1]), 0, 1).toFixed(2),
    };

    return this.returnColorObject(random);
  }
  /** - Generate a random color from `HSV` values. */
  randomHsvColor({ h = [0, 360], s = [0, 100], v = [0, 100], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      h: Math.round(clamp(randomNumber(h[0], h[1]), 0, 360)),
      s: Math.round(clamp(randomNumber(s[0], s[1]), 0, 100)),
      v: Math.round(clamp(randomNumber(v[0], v[1]), 0, 100)),
      a: +clamp(randomNumber(a[0], a[1]), 0, 1).toFixed(2),
    };

    return this.returnColorObject(random);
  }
  /** - Generate a random color from `RGB` values. */
  randomRgbColor({ r = [0, 255], g = [0, 255], b = [0, 255], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      r: Math.round(clamp(randomNumber(r[0], r[1]), 0, 255)),
      g: Math.round(clamp(randomNumber(g[0], g[1]), 0, 255)),
      b: Math.round(clamp(randomNumber(b[0], b[1]), 0, 255)),
      a: +clamp(randomNumber(a[0], a[1]), 0, 1).toFixed(2),
    };

    return this.returnColorObject(random);
  }
  /** - Generate a random color from `HWB` values. */
  randomHwbColor({ h = [0, 360], w = [0, 100], b = [0, 100], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      h: Math.round(clamp(randomNumber(h[0], h[1]), 0, 360)),
      w: Math.round(clamp(randomNumber(w[0], w[1]), 0, 100)),
      b: Math.round(clamp(randomNumber(b[0], b[1]), 0, 100)),
      a: +clamp(randomNumber(a[0], a[1]), 0, 1).toFixed(2),
    };

    return this.returnColorObject(random);
  }

  /** - Returns the first color with the desired contrast ratio against the second color */
  adjustContrast(color1: AnyFormat, color2: AnyFormat, ratio = 4.5): ConversionMethods {
    const contrast = this.contrastRatio(color1, color2);
    const color1RGB = this.RGB(color1).object();
    const channels = ['r', 'g', 'b'] as const;

    const adjustLuminance = (colorRGB: rgbaT, by: number) => {
      const r = clamp(colorRGB.r + by, 0, 255);
      const g = clamp(colorRGB.g + by, 0, 255);
      const b = clamp(colorRGB.b + by, 0, 255);
      return { r, g, b, a: colorRGB.a };
    };

    let newColor = color1RGB;

    //* increase contrast
    if (ratio && contrast < ratio) {
      while (this.contrastRatio(newColor, color2) < ratio) {
        const increase = this.isDark(color2); // if the background color is dark
        newColor = adjustLuminance(newColor, increase ? 1 : -1);

        // break if the color reached the limit
        if (channels.every(e => newColor[e] === 0)) break;
        if (channels.every(e => newColor[e] === 255)) break;
      }
      //* decrease contrast
    } else if (ratio && contrast > ratio) {
      while (this.contrastRatio(newColor, color2) > ratio) {
        const increase = !this.isDark(color2); // if the background color is light
        newColor = adjustLuminance(newColor, increase ? 1 : -1);

        // break if the color reached the limit
        if (channels.every(e => newColor[e] === 0)) break;
        if (channels.every(e => newColor[e] === 255)) break;
      }
    }

    return this.returnColorObject(newColor);
  }
}

const colorKit = new Colors();

export default colorKit;
