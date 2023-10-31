import colorsRegex from './colorsRegex';
import namedColors from './namedColors';
import { calculateHueValue, clamp100, clampAlpha, clampHue, clampRGB, numberToHexString } from './utilities';

import type { ColorFormats, hslaT, hslT, hsvaT, hsvT, hwbaT, hwbT, rgbaT, rgbT, SupportedColorFormats } from './types';

// ! Caution: The order of functions is crucial,
// ! as the react-native-reanimated Babel plugin will transform worklet functions
// ! and store them in a constant variables.

/** - Identify the color format of a given `string` or `object` */
function detectColorFormat(color: SupportedColorFormats): ColorFormats | null {
  'worklet';
  // color int
  if (typeof color === 'number') {
    if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) return 'hex8';
    return null;
  }

  // color string
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();
    for (const key in colorsRegex) {
      const format = key as ColorFormats;
      const entry = colorsRegex[format];
      if (Array.isArray(entry)) {
        for (let i = 0; i < entry.length; i++) {
          if (entry[i].test(color)) return format;
        }
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
/** - Parse `RGB` or `RGBA` color string to an `object` */
function RGB_Parse_String(color: string): rgbaT {
  'worklet';
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('rgb')) {
    console.error(
      '[colorKit.getRgbObject] is unable to parse the string into an `RGB` object. As a result, the color "black" will be returned instead.'
    );
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  let matches: RegExpMatchArray | null = null;
  const entry = colorsRegex[colorType];
  if (Array.isArray(entry)) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].test(color)) matches = color.match(entry[i]);
    }
  } else {
    matches = color.match(entry);
  }

  if (!matches || matches.length < 4) {
    console.error(
      '[colorKit.getRgbObject] An error occurred while attempting to destructuring `RGB` values from the given string. As a result, the color "black" will be returned instead.'
    );
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  const r = parseInt(matches[1], 10),
    g = parseInt(matches[2], 10),
    b = parseInt(matches[3], 10),
    a = parseFloat(matches[4] ?? '1');

  return {
    r: clampRGB(r),
    g: clampRGB(g),
    b: clampRGB(b),
    a: clampAlpha(a),
  };
}
/** - Ensure that the `RGB` object values are within the correct range and that it has the alpha channel */
function RGB_Normalize_Object(color: rgbaT | rgbT): rgbaT {
  'worklet';
  return {
    r: clampRGB(color.r),
    g: clampRGB(color.g),
    b: clampRGB(color.b),
    a: clampAlpha((color as rgbaT).a ?? 1),
  };
}
/** - Convert an `RGB` or `RGBA` color to its corresponding `Hex` color */
function RGB_HEX(color: string | rgbaT | rgbT): string {
  'worklet';
  const { r, g, b, a } = typeof color === 'string' ? RGB_Parse_String(color) : RGB_Normalize_Object(color);

  const red = numberToHexString(r),
    green = numberToHexString(g),
    blue = numberToHexString(b),
    alpha = a === 1 ? '' : numberToHexString(a * 255);

  return `#${red + green + blue + alpha}`;
}
/** - Convert an `RGB` or `RGBA` color to an `HSLA` object representation */
function RGB_HSLA(color: string | rgbaT | rgbT): hslaT {
  'worklet';
  const rgb = typeof color === 'string' ? RGB_Parse_String(color) : RGB_Normalize_Object(color),
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    a = rgb.a;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }

    h /= 6;
  }

  h = clampHue(h * 360);
  s = clamp100(s * 100);
  l = clamp100(l * 100);

  return { h, s, l, a: clampAlpha(a) };
}
/** - Convert `RGB` or `RGBA` color to an `HSVA` object representation */
function RGB_HSVA(color: string | rgbaT | rgbT): hsvaT {
  'worklet';
  const rgb = typeof color === 'string' ? RGB_Parse_String(color) : RGB_Normalize_Object(color),
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    a = rgb.a;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min,
    v = max,
    s = max === 0 ? 0 : d / max;

  let h = 0;

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
    h: clampHue(h * 360),
    s: clamp100(s * 100),
    v: clamp100(v * 100),
    a: clampAlpha(a),
  };
}
/** - Convert `RGB` or `RGBA` color to an `HWBA` object representation */
function RGB_HWBA(color: string | rgbaT | rgbT): hwbaT {
  'worklet';
  const rgb = typeof color === 'string' ? RGB_Parse_String(color) : RGB_Normalize_Object(color),
    red = rgb.r / 255,
    green = rgb.g / 255,
    blue = rgb.b / 255,
    a = rgb.a;

  const { h } = RGB_HSLA(color);

  const white = Math.min(red, green, blue) * 100;
  const black = (1 - Math.max(red, green, blue)) * 100;

  return {
    h: clampHue(h),
    w: clamp100(white),
    b: clamp100(black),
    a: clampAlpha(a),
  };
}
/** - Return the `RGB` color as a string, an array, or an object */
function RGB_Return_Types({ r, g, b, a }: rgbaT) {
  'worklet';
  return {
    string: (forceAlpha?: boolean) => {
      'worklet';
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
        return `rgb(${r}, ${g}, ${b})`;
      }

      if (forceAlpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

      return `rgb(${r}, ${g}, ${b})`;
    },
    array: () => {
      'worklet';
      return [r, g, b, a];
    },
    object: () => {
      'worklet';
      return { r, g, b, a };
    },
  };
}

// * HEX
/** - Convert any `HEX` color to 8-digit `HEX` color (#rrggbbaa) */
function HEX_Normalize(color: string | number): string {
  'worklet';
  if (typeof color === 'number') {
    return '#' + color.toString(16).padStart(8, '0');
  }

  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hex')) {
    console.error(
      '[colorKit.normalizeHexColor] is unable to normalize the `HEX` string provided. As a result, the color "black" will be returned instead.'
    );
    return '#000000ff';
  }

  const hex = color.replace(/^#/, '').split('');

  if (hex.length === 3) return `#${hex.map(x => x + x).join('')}ff`;
  if (hex.length === 4) return `#${hex.map(x => x + x).join('')}`;
  if (hex.length === 6) return `#${hex.join('')}ff`;

  return color;
}
/** - Convert any `HEX` color to an `RGBA` object representation */
function HEX_RGBA(color: string | number): rgbaT {
  'worklet';

  const hex = HEX_Normalize(color);

  let matches: RegExpMatchArray | null = null;
  const entry = colorsRegex.hex8;
  if (Array.isArray(entry)) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].test(hex)) matches = hex.match(entry[i]);
    }
  } else {
    matches = hex.match(entry);
  }

  if (!matches || matches.length < 4) {
    console.error(
      '[colorKit.HEX_RGBA] An error occurred while attempting to destructuring `HEX` values from the given string. As a result, the color "black" will be returned instead.'
    );
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  const r = parseInt(matches[1], 16),
    g = parseInt(matches[2], 16),
    b = parseInt(matches[3], 16),
    a = parseInt(matches[4], 16) / 255;

  return {
    r: clampRGB(r),
    g: clampRGB(g),
    b: clampRGB(b),
    a: clampAlpha(a),
  };
}
/** - Convert any `HEX` color to an `HSVA` object representation */
function HEX_HSVA(color: string | number): hsvaT {
  'worklet';
  const rgb = HEX_RGBA(color);
  const hsva = RGB_HSVA(rgb);
  return hsva;
}
/** - Convert any `HEX` color to an `HSLA` object representation */
function HEX_HSLA(color: string): hslaT {
  'worklet';
  const rgb = HEX_RGBA(color);
  return RGB_HSLA(rgb);
}
/** - Convert any `HEX` color to an `HWBA` object representation */
function HEX_HWBA(color: string): hwbaT {
  'worklet';
  const rgba = HEX_RGBA(color);
  return RGB_HWBA(rgba);
}

// * HSV
/** - Parse `HSV` or `HSVA` color string to an `object` */
function HSV_Parse_String(color: string): hsvaT {
  'worklet';
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hsv')) {
    console.error(
      '[colorKit.getHsvObject] is unable to parse the string into an `HSV` object. As a result, the color "black" will be returned instead.'
    );
    return { h: 0, s: 0, v: 0, a: 1 };
  }

  let matches: RegExpMatchArray | null = null;
  const entry = colorsRegex[colorType as 'hsv' | 'hsva'];
  if (Array.isArray(entry)) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].test(color)) matches = color.match(entry[i]);
    }
  } else {
    matches = color.match(entry);
  }

  if (!matches || matches.length < 4) {
    console.error(
      '[colorKit.getHsvObject] An error occurred while attempting to destructuring `HSV` values from the given string. As a result, the color "black" will be returned instead.'
    );
    return { h: 0, s: 0, v: 0, a: 1 };
  }

  const h = parseInt(matches[1], 10),
    s = parseInt(matches[2], 10),
    v = parseInt(matches[3], 10),
    a = parseFloat(matches[4] ?? '1');

  return {
    h: clampHue(h),
    s: clamp100(s),
    v: clamp100(v),
    a: clampAlpha(a),
  };
}
/** - Ensure that the `HSV` object values are within the correct range and that it has the alpha channel */
function HSV_Normalize_Object(color: hsvaT | hsvT): hsvaT {
  'worklet';
  return {
    h: clampHue(color.h),
    s: clamp100(color.s),
    v: clamp100(color.v),
    a: clampAlpha((color as hsvaT).a ?? 1),
  };
}
/** - Convert `HSV` color to an `RGBA` object representation */
function HSV_RGBA(color: hsvaT | hsvT | string): rgbaT {
  'worklet';
  const hsva = typeof color === 'string' ? HSV_Parse_String(color) : HSV_Normalize_Object(color);

  const h = hsva.h / 360,
    s = hsva.s / 100,
    v = hsva.v / 100,
    a = hsva.a;

  const i = Math.floor(h * 6),
    f = h * 6 - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s);

  let r = 0,
    g = 0,
    b = 0;

  if (i % 6 === 0) {
    r = v;
    g = t;
    b = p;
  } else if (i % 6 === 1) {
    r = q;
    g = v;
    b = p;
  } else if (i % 6 === 2) {
    r = p;
    g = v;
    b = t;
  } else if (i % 6 === 3) {
    r = p;
    g = q;
    b = v;
  } else if (i % 6 === 4) {
    r = t;
    g = p;
    b = v;
  } else if (i % 6 === 5) {
    r = v;
    g = p;
    b = q;
  }

  return {
    r: clampRGB(r * 255),
    g: clampRGB(g * 255),
    b: clampRGB(b * 255),
    a: clampAlpha(a),
  };
}
/** - Convert `HSV` color to an `HSLA` object representation */
function HSV_HSLA(color: hsvaT | hsvT | string): hslaT {
  'worklet';
  const hsva = typeof color === 'string' ? HSV_Parse_String(color) : HSV_Normalize_Object(color);

  const h = hsva.h,
    s = hsva.s / 100,
    v = hsva.v / 100,
    a = hsva.a;

  const l = ((2 - s) * v) / 2,
    sl = s * v,
    sln = l !== 0 && l !== 1 ? sl / (l < 0.5 ? l * 2 : 2 - l * 2) : sl;

  return {
    h: clampHue(h),
    s: clamp100(sln * 100),
    l: clamp100(l * 100),
    a: clampAlpha(a),
  };
}
/** - Convert `HSV` color to an `Hex` color */
function HSV_HEX(color: hsvaT | hsvT | string): string {
  'worklet';
  const rgba = HSV_RGBA(color);
  const hex = RGB_HEX(rgba);
  return hex;
}
/** - Convert `HSV` color to an `HWBA` object representation */
function HSV_HWBA(color: hsvaT | hsvT | string): hwbaT {
  'worklet';
  const { h, s, v, a } = typeof color === 'string' ? HSV_Parse_String(color) : HSV_Normalize_Object(color);

  const w = (1 - s / 100) * v,
    b = (1 - v / 100) * 100;

  return {
    h: clampHue(h),
    w: clamp100(w),
    b: clamp100(b),
    a: clampAlpha(a),
  };
}
/** - Return the `HSV` color as a string, an array, or an object */
function HSV_Return_Types({ h, s, v, a }: hsvaT) {
  'worklet';
  return {
    string: (forceAlpha?: boolean) => {
      'worklet';
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `hsva(${h}, ${s}%, ${v}%, ${a})`;
        return `hsv(${h}, ${s}%, ${v}%)`;
      }

      if (forceAlpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

      return `hsv(${h}, ${s}%, ${v}%)`;
    },
    array: () => {
      'worklet';
      return [h, s, v, a];
    },
    object: () => {
      'worklet';
      return { h, s, v, a };
    },
  };
}

// * HWB
/** - Parse `HWB` or `HWBA` color strong to an `object` */
function HWB_Parse_String(color: string): hwbaT {
  'worklet';
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hwb')) {
    console.error(
      '[colorKit.getHwbObject] is unable to parse the string into an `HWB` object. As a result, the color "black" will be returned instead.'
    );
    return { h: 0, w: 0, b: 0, a: 1 };
  }

  let matches: RegExpMatchArray | null = null;
  const entry = colorsRegex[colorType as 'hwb' | 'hwba'];
  if (Array.isArray(entry)) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].test(color)) matches = color.match(entry[i]);
    }
  } else {
    matches = color.match(entry);
  }

  if (!matches || matches.length < 4) {
    console.error(
      '[colorKit.getHwbObject] An error occurred while attempting to destructuring `HWB` values from the given string. As a result, the color "black" will be returned instead.'
    );
    return { h: 0, w: 0, b: 0, a: 1 };
  }

  const h = parseInt(matches[1], 10),
    w = parseInt(matches[2], 10),
    b = parseInt(matches[3], 10),
    a = parseFloat(matches[4] ?? '1');

  return {
    h: clampHue(h),
    w: clamp100(w),
    b: clamp100(b),
    a: clampAlpha(a),
  };
}
/** - Ensure that the `HWB` object values are within the correct range and that it has the alpha channel */
function HWB_Normalize_Object(color: hwbaT | hwbT): hwbaT {
  'worklet';
  return {
    h: clampHue(color.h),
    w: clamp100(color.w),
    b: clamp100(color.b),
    a: clampAlpha((color as hwbaT).a ?? 1),
  };
}
/** - Convert `HWB` or `HWBA` color to an `RGBA` object representation */
function HWB_RGBA(color: hwbaT | hwbT | string): rgbaT {
  'worklet';
  const hwba = typeof color === 'string' ? HWB_Parse_String(color) : HWB_Normalize_Object(color);

  const h = hwba.h / 360,
    w = hwba.w / 100,
    b = hwba.b / 100,
    a = hwba.a;

  if (w + b >= 1) {
    const gray = clampRGB((w * 255) / (w + b));
    return {
      r: gray,
      g: gray,
      b: gray,
      a,
    };
  }

  const red = calculateHueValue(0, 1, h + 1 / 3) * (1 - w - b) + w,
    green = calculateHueValue(0, 1, h) * (1 - w - b) + w,
    blue = calculateHueValue(0, 1, h - 1 / 3) * (1 - w - b) + w;

  return {
    r: clampRGB(red * 255),
    g: clampRGB(green * 255),
    b: clampRGB(blue * 255),
    a: clampAlpha(a),
  };
}
/** - Convert `HWB` or `HWBA` color to an `Hex` color */
function HWB_HEX(color: hwbaT | hwbT | string): string {
  'worklet';
  const rgba = HWB_RGBA(color);
  return RGB_HEX(rgba);
}
/** - Convert `HWB` or `HWBA` color to an `HSVA` object representation */
function HWB_HSVA(color: hwbaT | hwbT | string): hsvaT {
  'worklet';
  const hwba = typeof color === 'string' ? HWB_Parse_String(color) : HWB_Normalize_Object(color);

  const h = hwba.h % 360,
    w = hwba.w / 100,
    b = hwba.b / 100,
    a = hwba.a;

  const v = (1 - b) * 100;
  let s = (1 - w / (v / 100)) * 100;
  s = isNaN(s) ? 0 : s;

  return {
    h: clampHue(h),
    s: clamp100(s),
    v: clamp100(v),
    a: clampAlpha(a),
  };
}
/** - Convert `HWB` or `HWBA` color to an `HSLA` object representation */
function HWB_HSLA(color: hwbaT | hwbT | string): hslaT {
  'worklet';
  const hsva = HWB_HSVA(color);
  return HSV_HSLA(hsva);
}
/** - Return the `HWB` color as a string, an array, or an object */
function HWB_Return_Types({ h, w, b, a }: hwbaT) {
  'worklet';
  return {
    string: (forceAlpha?: boolean) => {
      'worklet';
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `hwba(${h}, ${w}%, ${b}%, ${a})`;
        return `hwb(${h}, ${w}%, ${b}%)`;
      }

      if (forceAlpha) return `hwba(${h}, ${w}%, ${b}%, ${a ?? 1})`;

      return `hwb(${h}, ${w}%, ${b}%)`;
    },
    array: () => {
      'worklet';
      return [h, w, b, a];
    },
    object: () => {
      'worklet';
      return { h, w, b, a };
    },
  };
}

// * HSL
/** - Parse `HSL` or `HSLA` color string to an `object` */
function HSL_Parse_String(color: string): hslaT {
  'worklet';
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hsl')) {
    console.error(
      '[colorKit.getHslObject] is unable to parse the string into an `HSL` object. As a result, the color "black" will be returned instead.'
    );
    return { h: 0, s: 0, l: 0, a: 1 };
  }

  let matches: RegExpMatchArray | null = null;
  const entry = colorsRegex[colorType as 'hsl' | 'hsla'];
  if (Array.isArray(entry)) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].test(color)) matches = color.match(entry[i]);
    }
  } else {
    matches = color.match(entry);
  }

  if (!matches || matches.length < 3) {
    console.error(
      '[colorKit.getHslObject] An error occurred while attempting to destructuring `HSL` values from the given string. As a result, the color "black" will be returned instead.'
    );
    return { h: 0, s: 0, l: 0, a: 1 };
  }

  const h = parseInt(matches[1], 10),
    s = parseInt(matches[2], 10),
    l = parseInt(matches[3], 10),
    a = parseFloat(matches[4] ?? '1');

  return {
    h: clampHue(h),
    s: clamp100(s),
    l: clamp100(l),
    a: clampAlpha(a),
  };
}
/** - Ensure that the `HSL` object values are within the correct range and that it has the alpha channel */
function HSL_Normalize_Object(color: hslaT | hslT): hslaT {
  'worklet';
  return {
    h: clampHue(color.h),
    s: clamp100(color.s),
    l: clamp100(color.l),
    a: clampAlpha((color as hslaT).a ?? 1),
  };
}
/** - Convert `HSL` or `HSLA` color to an `RGBA` object representation */
function HSL_RGBA(color: string | hslaT | hslT): rgbaT {
  'worklet';
  const hsla = typeof color === 'string' ? HSL_Parse_String(color) : HSL_Normalize_Object(color);

  const h = hsla.h / 360,
    s = hsla.s / 100,
    l = hsla.l / 100,
    a = hsla.a;

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s,
    p = 2 * l - q;

  const r = calculateHueValue(p, q, h + 1 / 3),
    g = calculateHueValue(p, q, h),
    b = calculateHueValue(p, q, h - 1 / 3);

  return {
    r: clampRGB(r * 255),
    g: clampRGB(g * 255),
    b: clampRGB(b * 255),
    a: clampAlpha(a),
  };
}
/** - Convert `HSL` or `HSLA` color to `HEX` color */
function HSL_HEX(color: string | hslaT | hslT): string {
  'worklet';

  const hsla = typeof color === 'string' ? HSL_Parse_String(color) : HSL_Normalize_Object(color);
  const rgb = HSL_RGBA(hsla);

  const r = numberToHexString(rgb.r),
    g = numberToHexString(rgb.g),
    b = numberToHexString(rgb.b),
    a = rgb.a === 1 ? '' : numberToHexString(rgb.a * 255);

  return `#${r + g + b + a}`;
}
/** - Convert `HSL` or `HSLA` color to an `HSVA` object representation */
function HSL_HSVA(color: string | hslaT | hslT): hsvaT {
  'worklet';
  const hsla = typeof color === 'string' ? HSL_Parse_String(color) : HSL_Normalize_Object(color);
  const h = hsla.h;

  const s = hsla.s / 100,
    l = hsla.l / 100,
    a = (hsla as hslaT).a ?? 1,
    v = l + s * Math.min(l, 1 - l),
    sNew = v === 0 ? 0 : 2 - (2 * l) / v;

  return {
    h: clampHue(h),
    s: clamp100(sNew * 100),
    v: clamp100(v * 100),
    a: clampAlpha(a),
  };
}
/** - Convert `HSL` or `HSLA` color to an `HWBA` object representation */
function HSL_HWBA(color: string | hslaT | hslT): hwbaT {
  'worklet';
  const hsva = HSL_HSVA(color);
  return HSV_HWBA(hsva);
}
/** - Return the `HSL` color as a string, an array, or an object */
function HSL_Return_Types({ h, s, l, a }: hslaT) {
  'worklet';
  return {
    string: (forceAlpha?: boolean) => {
      'worklet';
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `hsla(${h}, ${s}%, ${l}%, ${a})`;
        return `hsl(${h}, ${s}%, ${l}%)`;
      }

      if (forceAlpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

      return `hsl(${h}, ${s}%, ${l}%)`;
    },
    array: () => {
      'worklet';
      return [h, s, l, a];
    },
    object: () => {
      'worklet';
      return { h, s, l, a };
    },
  };
}

/** - Convert `HSL`, `HSV`, `HWB`, or `RGB` color to the `HEX` color format. */
export function HEX(color: SupportedColorFormats): string {
  'worklet';
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // RGB to HEX
  if (colorType === 'rgb' || colorType === 'rgba') {
    return RGB_HEX(color as string | rgbaT);
  }

  // HSL to HEX
  if (colorType === 'hsl' || colorType === 'hsla') {
    return HSL_HEX(color as string | hslaT | hslT);
  }

  // HSV to HEX
  if (colorType === 'hsv' || colorType === 'hsva') {
    return HSV_HEX(color as hsvaT | hsvT);
  }

  // HWB to HEX
  if (colorType === 'hwb' || colorType === 'hwba') {
    return HWB_HEX(color as hwbaT | hwbT);
  }

  // HEX
  if (colorType?.includes('hex')) {
    return HEX_Normalize(color as string | number);
  }

  // ! error
  console.error(
    '[colorKit.HEX] An error occurred while attempting to convert the provided parameter into an `HEX` color. As a result, the default color "black" will be used instead.'
  );

  return '#000000';
}

/** - Convert `HSL`, `HSV`, `HWB`, or `HEX` color to the `RGB` color format. */
export function RGB(color: SupportedColorFormats) {
  'worklet';
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to RGB
  if (colorType?.includes('hex')) {
    const rgb = HEX_RGBA(color as string | number);
    return RGB_Return_Types(rgb);
  }

  // HSL to RGB
  if (colorType === 'hsl' || colorType === 'hsla') {
    const rgb = HSL_RGBA(color as hslaT | hslT);
    return RGB_Return_Types(rgb);
  }

  // HSV to RGB
  if (colorType === 'hsv' || colorType === 'hsva') {
    const rgb = HSV_RGBA(color as hsvaT | hsvT);
    return RGB_Return_Types(rgb);
  }

  // HWB to RGB
  if (colorType === 'hwb' || colorType === 'hwba') {
    const rgb = HWB_RGBA(color as hwbaT | hwbT);
    return RGB_Return_Types(rgb);
  }

  // RGB to normalized RGB
  if (colorType === 'rgb' || colorType === 'rgba') {
    const rgba = typeof color === 'string' ? RGB_Parse_String(color) : RGB_Normalize_Object(color as rgbaT | rgbT);
    return RGB_Return_Types(rgba);
  }

  // ! error
  console.error(
    '[colorKit.RGB] An error occurred while attempting to convert the provided parameter into an `RGB` color. As a result, the default color "black" will be used instead.'
  );

  return RGB_Return_Types({ r: 0, g: 0, b: 0, a: 1 });
}

/** - Convert `HEX`, `HSV`, `HWB`, or `RGB` color to the `HSL` color format. */
export function HSL(color: SupportedColorFormats) {
  'worklet';
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to HSL
  if (colorType?.includes('hex')) {
    const hsla = HEX_HSLA(color as string);
    return HSL_Return_Types(hsla);
  }

  // RGB to HSL
  if (colorType === 'rgb' || colorType === 'rgba') {
    const hsla = RGB_HSLA(color as rgbaT | rgbT);
    return HSL_Return_Types(hsla);
  }

  // HSV to HSL
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hsla = HSV_HSLA(color as hsvaT | hsvT);
    return HSL_Return_Types(hsla);
  }

  // HWB to HSL
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hsla = HWB_HSLA(color as hwbaT | hwbT);
    return HSL_Return_Types(hsla);
  }

  // HSL to normalized HSL
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hsla = typeof color === 'string' ? HSL_Parse_String(color) : HSL_Normalize_Object(color as hslaT | hslT);
    return HSL_Return_Types(hsla);
  }

  // ! error
  console.error(
    '[colorKit.HSL] An error occurred while attempting to convert the provided parameter into an `HSL` color. As a result, the default color "black" will be used instead.'
  );

  return HSL_Return_Types({ h: 0, s: 0, l: 0, a: 1 });
}

/** - Convert `HSL`, `HEX`, `HSV`, or `RGB` color to the `HWB` color format. */
export function HWB(color: SupportedColorFormats) {
  'worklet';
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to HWB
  if (colorType?.includes('hex')) {
    const hwba = HEX_HWBA(color as string);
    return HWB_Return_Types(hwba);
  }

  // RGB to HWB
  if (colorType === 'rgb' || colorType === 'rgba') {
    const hwba = RGB_HWBA(color as rgbaT | rgbT);
    return HWB_Return_Types(hwba);
  }

  // HSL to HWB
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hwba = HSL_HWBA(color as hslaT | hslT);
    return HWB_Return_Types(hwba);
  }

  // HSV to HWB
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hwba = HSV_HWBA(color as hsvaT | hsvT);
    return HWB_Return_Types(hwba);
  }

  // HWB to normalized HWB
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hwba = typeof color === 'string' ? HWB_Parse_String(color) : HWB_Normalize_Object(color as hwbaT | hwbT);
    return HWB_Return_Types(hwba);
  }

  // ! error
  console.error(
    '[colorKit.HWB] An error occurred while attempting to convert the provided parameter into an `HWB` color. As a result, the default color "black" will be used instead.'
  );

  return HWB_Return_Types({ h: 0, w: 0, b: 100, a: 1 });
}

/** - Convert `HSL`, `HEX`, `HWB`, or `RGB` color to the `HSV` color format. */
export function HSV(color: SupportedColorFormats) {
  'worklet';
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to HSV
  if (colorType?.includes('hex')) {
    const hsva = HEX_HSVA(color as string);
    return HSV_Return_Types(hsva);
  }

  // RGB to HSV
  if (colorType === 'rgb' || colorType === 'rgba') {
    const hsva = RGB_HSVA(color as rgbaT | rgbT);
    return HSV_Return_Types(hsva);
  }

  // HSL to HSV
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hsva = HSL_HSVA(color as hslaT | hslT);
    return HSV_Return_Types(hsva);
  }

  // HWB to HSV
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hsva = HWB_HSVA(color as hwbaT | hwbT);
    return HSV_Return_Types(hsva);
  }

  // HSV to normalized HSV
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hsva = typeof color === 'string' ? HSV_Parse_String(color) : HSV_Normalize_Object(color as hsvaT | hsvT);
    return HSV_Return_Types(hsva);
  }

  // ! error
  console.error(
    '[colorKit.HSV] An error occurred while attempting to convert the provided parameter into an `HSV` color. As a result, the default color "black" will be used instead.'
  );

  return HSV_Return_Types({ h: 0, s: 0, v: 0, a: 1 });
}
