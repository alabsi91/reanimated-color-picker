import colorsRegex from './colorsRegex';
import { clamp100, clampAlpha, clampHue, clampRGB } from './utilities';

import type { SupportedColorFormats, ColorFormats, hslaT, hslT, hsvaT, hsvT, hwbaT, hwbT, rgbaT, rgbT } from './types';

export default class PrivateMethods {
  /** - Identify the color format of a given `string` or `object` */
  detectColorFormat(color: SupportedColorFormats): ColorFormats | null {
    // color int
    if (typeof color === 'number') color = '#' + color.toString(16);

    // color string
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();
      for (const key in colorsRegex) {
        const format = key as ColorFormats;
        const entry = colorsRegex[format];
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
      console.error(
        '[colorKit] is unable to parse the string into an `RGB` or `RGBA` object. As a result, the color "black" will be returned instead.'
      );
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = colorsRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match)
      console.error('[colorKit] An error occurred while attempting to destructuring `RGB` values from the given string!!');

    return {
      r: clampRGB(parseInt(match?.[1] ?? '0', 10)),
      g: clampRGB(parseInt(match?.[2] ?? '0', 10)),
      b: clampRGB(parseInt(match?.[3] ?? '0', 10)),
      a: clampAlpha(parseFloat(match?.[4] ?? '1')),
    };
  }
  /** - Convert an `RGB` or `RGBA` color to its corresponding `Hex` color */
  RGB_HEX(color: string | rgbaT | rgbT): string {
    const { r, g, b, a } =
      typeof color === 'string'
        ? this.getRgbObject(color.trim().toLowerCase())
        : { r: color.r, g: color.g, b: color.b, a: (color as rgbaT).a ?? 1 };

    const toHex = (c: number): string => {
      c = clampRGB(c);
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const red = toHex(r),
      green = toHex(g),
      blue = toHex(b),
      alpha = a === 1 ? '' : toHex(a * 255);
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

    h = clampHue(h * 360);
    s = clamp100(s * 100);
    l = clamp100(l * 100);

    return { h, s, l, a: clampAlpha(a) };
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
      h: clampHue(h * 360),
      s: clamp100(s * 100),
      v: clamp100(v * 100),
      a: clampAlpha(a),
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

    const white = Math.min(red, green, blue) * 100;
    const black = (1 - Math.max(red, green, blue)) * 100;

    return {
      h: clampHue(h),
      w: clamp100(white),
      b: clamp100(black),
      a: clampAlpha(a),
    };
  }

  // * HEX * 100
  /** - Convert any `HEX` color to 8-digit `HEX` color (#rrggbbaa) */
  normalizeHexColor(color: string | number): string {
    if (typeof color === 'number') color = '#' + color.toString(16); // color int

    const colorType = this.detectColorFormat(color.trim().toLowerCase());

    if (!colorType?.includes('hex')) {
      console.error(
        '[colorKit] is unable to normalize the `HEX` string provided. As a result, the color "black" will be returned instead.'
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
  HEX_RGBA(color: string | number): rgbaT {
    if (typeof color === 'number') color = '#' + color.toString(16); // color int

    const hex = this.normalizeHexColor(color.trim().toLowerCase());

    let match: RegExpMatchArray | null = null;
    const entry = colorsRegex.hex8;
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(hex)) match = hex.match(entry[i]);
    } else match = hex.match(entry);

    if (!match)
      console.error('[colorKit] An error occurred while attempting to destructuring `HEX` values from the given string!!');

    return {
      r: clampRGB(parseInt(match?.[1] ?? '0', 16)),
      g: clampRGB(parseInt(match?.[2] ?? '0', 16)),
      b: clampRGB(parseInt(match?.[3] ?? '0', 16)),
      a: clampAlpha(parseInt(match?.[4] ?? '0', 16) / 255),
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
      console.error(
        '[colorKit] is unable to parse the string into an `HSL` or `HSLA` object. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, s: 0, l: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = colorsRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match)
      console.error('[colorKit] An error occurred while attempting to destructuring `HSL` values from the given string!!');

    return {
      h: clampHue(parseInt(match?.[1] ?? '0', 10)),
      s: clamp100(parseInt(match?.[2] ?? '0', 10)),
      l: clamp100(parseInt(match?.[3] ?? '0', 10)),
      a: clampAlpha(parseFloat(match?.[4] ?? '1')),
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
      r: clampRGB(r * 255),
      g: clampRGB(g * 255),
      b: clampRGB(b * 255),
      a: clampAlpha(a),
    };
  }
  /** - Convert `HSL` or `HSLA` color to `HEX` color */
  HSL_HEX(color: string | hslaT | hslT): string {
    const hsla =
      typeof color === 'string'
        ? this.getHslObject(color.trim().toLowerCase())
        : { h: color.h, s: color.s, l: color.l, a: (color as hslaT).a ?? 1 };

    const toHex = (c: number): string => {
      c = clampRGB(c);
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const { r, g, b, a } = this.HSL_RGBA(hsla),
      red = toHex(r),
      green = toHex(g),
      blue = toHex(b),
      alpha = a === 1 ? '' : toHex(a * 255);

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
      h: clampHue(h),
      s: clamp100(sNew * 100),
      v: clamp100(v * 100),
      a: clampAlpha(a),
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
      console.error(
        '[colorKit] is unable to parse the string into an `HSV` or `HSVA` object. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, s: 0, v: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = colorsRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match)
      console.error('[colorKit] An error occurred while attempting to destructuring `HSL` values from the given string!!');

    return {
      h: clampHue(parseInt(match?.[1] ?? '0', 10)),
      s: clamp100(parseInt(match?.[2] ?? '0', 10)),
      v: clamp100(parseInt(match?.[3] ?? '0', 10)),
      a: clampAlpha(parseFloat(match?.[4] ?? '1')),
    };
  }
  /** - Convert `HSV` color to an `RGBA` object representation */
  HSV_RGBA(color: hsvaT | hsvT | string): rgbaT {
    const hsva = typeof color === 'string' ? this.getHsvObject(color.trim().toLowerCase()) : color;

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
      r: clampRGB(r * 255),
      g: clampRGB(g * 255),
      b: clampRGB(b * 255),
      a: clampAlpha(a),
    };
  }
  /** - Convert `HSV` color to an `HSLA` object representation */
  HSV_HSLA(color: hsvaT | hsvT | string): hslaT {
    const hsva = typeof color === 'string' ? this.getHsvObject(color.trim().toLowerCase()) : color;

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
  HSV_HEX(color: hsvaT | hsvT | string): string {
    const rgba = this.HSV_RGBA(color);
    const hex = this.RGB_HEX(rgba);
    return hex;
  }
  /** - Convert `HSV` color to an `HWBA` object representation */
  HSV_HWBA(color: hsvaT | hsvT | string): hwbaT {
    const hsva = typeof color === 'string' ? this.getHsvObject(color.trim().toLowerCase()) : color;

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

  // * HWB
  /** - Get `HWB` or `HWBA` color values as an `object` */
  getHwbObject(color: string): hwbaT {
    color = color.trim().toLowerCase();
    const colorType = this.detectColorFormat(color);

    if (!colorType?.includes('hwb')) {
      console.error(
        '[colorKit] is unable to parse the string into an `HWB` or `HWBA` object. As a result, the color "black" will be returned instead.'
      );
      return { h: 0, w: 0, b: 0, a: 1 };
    }

    let match: RegExpMatchArray | null = null;
    const entry = colorsRegex[colorType];
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) if (entry[i].test(color)) match = color.match(entry[i]);
    } else match = color.match(entry);

    if (!match)
      console.error('[colorKit] An error occurred while attempting to destructuring `HWB` values from the given string!!');

    return {
      h: clampHue(parseInt(match?.[1] ?? '0', 10)),
      w: clamp100(parseInt(match?.[2] ?? '0', 10)),
      b: clamp100(parseInt(match?.[3] ?? '100', 10)),
      a: clampAlpha(parseFloat(match?.[4] ?? '1')),
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
      const gray = clampRGB((w * 255) / (w + b));
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
      r: clampRGB(red * 255),
      g: clampRGB(green * 255),
      b: clampRGB(blue * 255),
      a: clampAlpha(a),
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
  HWB_HSLA(color: hwbaT | hwbT | string): hslaT {
    const hsva = this.HWB_HSVA(color);
    return this.HSV_HSLA(hsva);
  }
}
