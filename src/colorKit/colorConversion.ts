import colorsRegex from './colorsRegex';
import namedColors from './namedColors';
import { clamp100, clampAlpha, clampHue, clampRGB, calculateHueValue, numberToHexString } from './utilities';

import type { ColorFormats, hslaT, hslT, hsvaT, hsvT, hwbaT, hwbT, rgbaT, rgbT, SupportedColorFormats } from './types';

/** - Identify the color format of a given `string` or `object` */
function detectColorFormat(color: SupportedColorFormats): ColorFormats | null {
  // color int
  if (typeof color === 'number') color = '#' + color.toString(16);

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
function getRgbObject(color: string): rgbaT {
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('rgb')) {
    console.error(
      '[colorKit.getRgbObject] is unable to parse the string into an `RGB` or `RGBA` object. As a result, the color "black" will be returned instead.'
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
/** - Convert an `RGB` or `RGBA` color to its corresponding `Hex` color */
function RGB_HEX(color: string | rgbaT | rgbT): string {
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();
    color = getRgbObject(color);
  } else {
    (color as rgbaT).a ??= 1; // ensure the color having the alpha channel
  }

  const { r, g, b, a } = color as rgbaT;

  const red = numberToHexString(r),
    green = numberToHexString(g),
    blue = numberToHexString(b),
    alpha = a === 1 ? '' : numberToHexString(a * 255);

  return `#${red + green + blue + alpha}`;
}
/** - Convert an `RGB` or `RGBA` color to an `HSLA` object representation */
function RGB_HSLA(color: string | rgbaT | rgbT): hslaT {
  const rgb = typeof color === 'string' ? getRgbObject(color.trim().toLowerCase()) : color,
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
/** - Convert `RGB` or `RGBA` color to an `HSVA`  object representation */
function RGB_HSVA(color: string | rgbaT | rgbT): hsvaT {
  const rgb = typeof color === 'string' ? getRgbObject(color.trim().toLowerCase()) : color,
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
    h: clampHue(h * 360),
    s: clamp100(s * 100),
    v: clamp100(v * 100),
    a: clampAlpha(a),
  };
}
/** - Convert `RGB` or `RGBA` color to an `HWBA`  object representation */
function RGB_HWBA(color: string | rgbaT | rgbT): hwbaT {
  const rgb = typeof color === 'string' ? getRgbObject(color.trim().toLowerCase()) : color,
    red = rgb.r / 255,
    green = rgb.g / 255,
    blue = rgb.b / 255,
    a = (rgb as rgbaT).a ?? 1;

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
function RGB_Return_Types({ r, g, b, a }: rgbaT) {
  return {
    string: (forceAlpha?: boolean) => {
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
        return `rgb(${r}, ${g}, ${b})`;
      }

      if (forceAlpha) return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;

      return `rgb(${r}, ${g}, ${b})`;
    },
    array: () => {
      return [r, g, b, a];
    },
    object: () => {
      return { r, g, b, a };
    },
  };
}
/** - Convert `HSL`, `HSLA`, `HSV`, `HSVA` or `HEX` color to `RGBA` color format. */
export function RGB(color: SupportedColorFormats) {
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
    const rgba = typeof color === 'string' ? getRgbObject(color) : (color as rgbaT),
      r = clampRGB(rgba.r),
      g = clampRGB(rgba.g),
      b = clampRGB(rgba.b),
      a = clampAlpha(rgba.a ?? 1);
    return RGB_Return_Types({ r, g, b, a });
  }

  // ! error
  console.error(
    '[colorKit.RGB] An error occurred while attempting to convert the provided parameter into an `RGB` color. As a result, the default color "black" will be used instead.'
  );

  return RGB_Return_Types({ r: 0, g: 0, b: 0, a: 1 });
}

// * HEX
/** - Convert any `HEX` color to 8-digit `HEX` color (#rrggbbaa) */
function normalizeHexColor(color: string | number): string {
  if (typeof color === 'number') color = '#' + color.toString(16); // color int

  const colorType = detectColorFormat(color.trim().toLowerCase());

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
  if (typeof color === 'number') color = '#' + color.toString(16); // color int

  const hex = normalizeHexColor(color.trim().toLowerCase());

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
  const rgb = HEX_RGBA(color);
  const hsva = RGB_HSVA(rgb);
  return hsva;
}
/** - Convert any `HEX` color to an `HSLA` object representation */
function HEX_HSLA(color: string): hslaT {
  const rgb = HEX_RGBA(color);
  return RGB_HSLA(rgb);
}
/** - Convert any `HEX` color to an `HWBA` object representation */
function HEX_HWBA(color: string): hwbaT {
  const rgba = HEX_RGBA(color);
  return RGB_HWBA(rgba);
}
/** - Convert `HSL`, `HSLA`, `HSV`, `HSVA`, `RGB` or `RGBA` color to `HEX` color format. */
export function HEX(color: SupportedColorFormats): string {
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
  if (colorType?.includes('hex')) return color as string;

  // ! error
  console.error(
    '[colorKit.HEX] An error occurred while attempting to convert the provided parameter into an `HEX` color. As a result, the default color "black" will be used instead.'
  );

  return '#000000';
}

// * HSL
/** - Parse `HSL` or `HSLA` color string to an `object` */
function getHslObject(color: string): hslaT {
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hsl')) {
    console.error(
      '[colorKit.getHslObject] is unable to parse the string into an `HSL` or `HSLA` object. As a result, the color "black" will be returned instead.'
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
/** - Convert `HSL` or `HSLA` color to an `RGBA` object representation */
function HSL_RGBA(color: string | hslaT | hslT): rgbaT {
  const hsla = typeof color === 'string' ? getHslObject(color.trim().toLowerCase()) : color;

  const h = hsla.h / 360,
    s = hsla.s / 100,
    l = hsla.l / 100,
    a = (hsla as hslaT).a ?? 1;

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
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();
    color = getHslObject(color);
  } else {
    (color as hslaT).a ??= 1;
  }

  const hsla = color as hslaT;
  const rgb = HSL_RGBA(hsla);

  const r = numberToHexString(rgb.r),
    g = numberToHexString(rgb.g),
    b = numberToHexString(rgb.b),
    a = rgb.a === 1 ? '' : numberToHexString(rgb.a * 255);

  return `#${r + g + b + a}`;
}
/** - Convert `HSL` or `HSLA` color to an `HSVA` object representation */
function HSL_HSVA(color: string | hslaT | hslT): hsvaT {
  const hsla = typeof color === 'string' ? getHslObject(color.trim().toLowerCase()) : color;
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
  const hsva = HSL_HSVA(color);
  return HSV_HWBA(hsva);
}
function HSL_Return_Types({ h, s, l, a }: hslaT) {
  return {
    string: (forceAlpha?: boolean) => {
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `hsla(${h}, ${s}%, ${l}%, ${a})`;
        return `hsl(${h}, ${s}%, ${l}%)`;
      }

      if (forceAlpha) return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;

      return `hsl(${h}, ${s}%, ${l}%)`;
    },
    array: () => {
      return [h, s, l, a];
    },
    object: () => {
      return { h, s, l, a };
    },
  };
}
/** - Convert `HEX`, `HSV`, `HSVA`, `RGB` or `RGBA` color to `HSLA` color format. */
export function HSL(color: SupportedColorFormats) {
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
    const hsla = typeof color === 'string' ? getHslObject(color) : (color as hslaT),
      h = clampHue(hsla.h),
      s = clamp100(hsla.s),
      l = clamp100(hsla.l),
      a = clampAlpha(hsla.a ?? 1);
    return HSL_Return_Types({ h, s, l, a });
  }

  // ! error
  console.error(
    '[colorKit.HSL] An error occurred while attempting to convert the provided parameter into an `HSL` color. As a result, the default color "black" will be used instead.'
  );

  return HSL_Return_Types({ h: 0, s: 0, l: 0, a: 1 });
}

// * HSV
/** - Parse `HSV` or `HSVA` color string to an `object` */
function getHsvObject(color: string): hsvaT {
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hsv')) {
    console.error(
      '[colorKit.getHsvObject] is unable to parse the string into an `HSV` or `HSVA` object. As a result, the color "black" will be returned instead.'
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
      '[colorKit.getHsvObject] An error occurred while attempting to destructuring `HSL` values from the given string. As a result, the color "black" will be returned instead.'
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
/** - Convert `HSV` color to an `RGBA` object representation */
function HSV_RGBA(color: hsvaT | hsvT | string): rgbaT {
  const hsva = typeof color === 'string' ? getHsvObject(color.trim().toLowerCase()) : color;

  const h = hsva.h / 360,
    s = hsva.s / 100,
    v = hsva.v / 100,
    a = (hsva as hsvaT).a ?? 1;

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
  const hsva = typeof color === 'string' ? getHsvObject(color.trim().toLowerCase()) : color;

  const h = hsva.h,
    s = hsva.s / 100,
    v = hsva.v / 100,
    a = (hsva as hsvaT).a ?? 1;

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
  const rgba = HSV_RGBA(color);
  const hex = RGB_HEX(rgba);
  return hex;
}
/** - Convert `HSV` color to an `HWBA` object representation */
function HSV_HWBA(color: hsvaT | hsvT | string): hwbaT {
  const hsva = typeof color === 'string' ? getHsvObject(color.trim().toLowerCase()) : color;

  const { h, s, v } = hsva,
    a = (hsva as hsvaT).a ?? 1,
    w = (1 - s / 100) * v,
    b = (1 - v / 100) * 100;

  return {
    h: clampHue(h),
    w: clamp100(w),
    b: clamp100(b),
    a: clampAlpha(a),
  };
}
function HSV_Return_Types({ h, s, v, a }: hsvaT) {
  return {
    string: (forceAlpha?: boolean) => {
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `hsva(${h}, ${s}%, ${v}%, ${a})`;
        return `hsv(${h}, ${s}%, ${v}%)`;
      }

      if (forceAlpha) return `hsva(${h}, ${s}%, ${v}%, ${a ?? 1})`;

      return `hsv(${h}, ${s}%, ${v}%)`;
    },
    array: () => {
      return [h, s, v, a];
    },
    object: () => {
      return { h, s, v, a };
    },
  };
}
/** - Convert `HSL`, `HSLA`, `HEX`, `RGB` or `RGBA` color to `HSVA` color format. */
export function HSV(color: SupportedColorFormats) {
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
    const hsva = RGB_HSVA(color as rgbaT);
    return HSV_Return_Types(hsva);
  }

  // HSL to HSV
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hsva = HSL_HSVA(color as hslaT);
    return HSV_Return_Types(hsva);
  }

  // HWB to HSV
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hsva = HWB_HSVA(color as hwbaT);
    return HSV_Return_Types(hsva);
  }

  // HSV to normalized HSV
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hsva = typeof color === 'string' ? getHsvObject(color) : (color as hsvaT),
      h = clampHue(hsva.h),
      s = clamp100(hsva.s),
      v = clamp100(hsva.v),
      a = clampAlpha(hsva.a ?? 1);
    return HSV_Return_Types({ h, s, v, a });
  }

  // ! error
  console.error(
    '[colorKit.HSV] An error occurred while attempting to convert the provided parameter into an `HSV` color. As a result, the default color "black" will be used instead.'
  );

  return HSV_Return_Types({ h: 0, s: 0, v: 0, a: 1 });
}

// * HWB
/** - Parse `HWB` or `HWBA` color strong to an `object` */
function getHwbObject(color: string): hwbaT {
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hwb')) {
    console.error(
      '[colorKit.getHwbObject] is unable to parse the string into an `HWB` or `HWBA` object. As a result, the color "black" will be returned instead.'
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
      '[colorKit.getHwbObject] An error occurred while attempting to destructuring `HWB` values from the given string!!'
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
/** - Convert `HWB` or `HWBA` color to an `RGBA` object representation */
function HWB_RGBA(color: hwbaT | hwbT | string): rgbaT {
  const hwba = typeof color === 'string' ? getHwbObject(color.trim().toLowerCase()) : color;

  const h = hwba.h / 360,
    w = hwba.w / 100,
    b = hwba.b / 100,
    a = (hwba as hwbaT)?.a ?? 1;

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
  const rgba = HWB_RGBA(color);
  return RGB_HEX(rgba);
}
/** - Convert `HWB` or `HWBA` color to an `HSVA` object representation */
function HWB_HSVA(color: hwbaT | hwbT | string): hsvaT {
  const hwba = typeof color === 'string' ? getHwbObject(color.trim().toLowerCase()) : color;

  const h = hwba.h % 360,
    w = hwba.w / 100,
    b = hwba.b / 100,
    a = (hwba as hwbaT)?.a ?? 1;

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
  const hsva = HWB_HSVA(color);
  return HSV_HSLA(hsva);
}
function HWB_Return_Types({ h, w, b, a }: hwbaT) {
  return {
    string: (forceAlpha?: boolean) => {
      // auto
      if (typeof forceAlpha === 'undefined') {
        if (typeof a === 'number' && a !== 1) return `hwba(${h}, ${w}%, ${b}%, ${a})`;
        return `hwb(${h}, ${w}%, ${b}%)`;
      }

      if (forceAlpha) return `hwba(${h}, ${w}%, ${b}%, ${a ?? 1})`;

      return `hwb(${h}, ${w}%, ${b}%)`;
    },
    array: () => {
      return [h, w, b, a];
    },
    object: () => {
      return { h, w, b, a };
    },
  };
}
/** - Convert `HSL`, `HSLA`, `HEX`, `RGB` or `RGBA` color to `HWBA` color format. */
export function HWB(color: SupportedColorFormats) {
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
    const hwba = RGB_HWBA(color as rgbaT);
    return HWB_Return_Types(hwba);
  }

  // HSL to HWB
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hwba = HSL_HWBA(color as hslaT);
    return HWB_Return_Types(hwba);
  }

  // HSV to HWB
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hwba = HSV_HWBA(color as hsvaT);
    return HWB_Return_Types(hwba);
  }

  // HWB to normalized HWB
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hwba = typeof color === 'string' ? getHwbObject(color) : (color as hwbaT),
      h = clampHue(hwba.h),
      w = clamp100(hwba.w),
      b = clamp100(hwba.b),
      a = clampAlpha(hwba.a ?? 1);
    return HWB_Return_Types({ h, w, b, a });
  }

  // ! error
  console.error(
    '[colorKit.HWB] An error occurred while attempting to convert the provided parameter into an `HWB` color. As a result, the default color "black" will be used instead.'
  );

  return HWB_Return_Types({ h: 0, w: 0, b: 100, a: 1 });
}
