import PrivateMethods from './PrivateMethods';
import colorsRegex from './colorsRegex';
import namedColors from './namedColors';
import { clamp100, clampAlpha, clampHue, clampRGB, randomNumber } from './utilities';

import type {
  SupportedColorFormats,
  ColorFormats,
  ConversionMethods,
  hslaT,
  hslT,
  hsvaT,
  hsvT,
  hwbaT,
  hwbT,
  rgbaT,
  rgbT,
} from './types';

class Colors {
  private _: InstanceType<typeof PrivateMethods>;
  private returnColorObject: (color: SupportedColorFormats) => ConversionMethods;

  constructor() {
    this._ = new PrivateMethods();

    this.returnColorObject = (color: SupportedColorFormats) => {
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
  getFormat(color: SupportedColorFormats): ColorFormats | 'named' | null {
    // color int
    if (typeof color === 'number') color = '#' + color.toString(16);

    // color string
    if (typeof color === 'string') {
      color = color.trim().toLowerCase();
      if (namedColors.hasOwnProperty(color)) return 'named';

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
  /** - Convert `HSL`, `HSLA`, `HSV`, `HSVA` or `HEX` color to `RGBA` color format. */
  RGB(color: SupportedColorFormats) {
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
          const rgba = typeof color === 'string' ? this._.getRgbObject(color) : (color as rgbaT),
            r = clampRGB(rgba.r),
            g = clampRGB(rgba.g),
            b = clampRGB(rgba.b),
            a = clampAlpha(rgba.a ?? 1);

          if (typeof alpha === 'undefined') return a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;

          if (alpha) return `rgba(${r}, ${g}, ${b}, ${a})`;

          return `rgb(${r}, ${g}, ${b})`;
        },
        array: () => {
          const rgba = typeof color === 'string' ? this._.getRgbObject(color) : (color as rgbaT),
            r = clampRGB(rgba.r),
            g = clampRGB(rgba.g),
            b = clampRGB(rgba.b),
            a = clampAlpha(rgba.a ?? 1);

          return [r, g, b, a];
        },
        object: () => {
          const rgba = typeof color === 'string' ? this._.getRgbObject(color) : (color as rgbaT),
            r = clampRGB(rgba.r),
            g = clampRGB(rgba.g),
            b = clampRGB(rgba.b),
            a = clampAlpha(rgba.a ?? 1);

          return { r, g, b, a };
        },
      };
    }

    // ! error
    console.error(
      '[colorKit] An error occurred while attempting to convert the provided parameter into an `RGB` color. As a result, the default color "black" will be used instead.'
    );

    return {
      string: (alpha?: boolean) => (alpha ? 'rgba(0, 0, 0, 1)' : 'rgb(0, 0, 0)'),
      array: () => [0, 0, 0, 1],
      object: () => ({ r: 0, g: 0, b: 0, a: 1 }),
    };
  }

  // * HEX
  /** - Convert `HSL`, `HSLA`, `HSV`, `HSVA`, `RGB` or `RGBA` color to `HEX` color format. */
  HEX(color: SupportedColorFormats): string {
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
    console.error(
      '[colorKit] An error occurred while attempting to convert the provided parameter into an `HEX` color. As a result, the default color "black" will be used instead.'
    );

    return '#000000';
  }

  // * HSL
  /** - Convert `HEX`, `HSV`, `HSVA`, `RGB` or `RGBA` color to `HSLA` color format. */
  HSL(color: SupportedColorFormats) {
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
          const hsla = typeof color === 'string' ? this._.getHslObject(color) : (color as hslaT),
            h = clampHue(hsla.h),
            s = clamp100(hsla.s),
            l = clamp100(hsla.l),
            a = clampAlpha(hsla.a ?? 1);

          if (typeof alpha === 'undefined') return a !== 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;

          if (alpha) return `hsla(${h}, ${s}%, ${l}%, ${a})`;

          return `hsl(${h}, ${s}%, ${l}%)`;
        },
        array: () => {
          const hsla = typeof color === 'string' ? this._.getHslObject(color) : (color as hslaT),
            h = clampHue(hsla.h),
            s = clamp100(hsla.s),
            l = clamp100(hsla.l),
            a = clampAlpha(hsla.a ?? 1);

          return [h, s, l, a];
        },
        object: () => {
          const hsla = typeof color === 'string' ? this._.getHslObject(color) : (color as hslaT),
            h = clampHue(hsla.h),
            s = clamp100(hsla.s),
            l = clamp100(hsla.l),
            a = clampAlpha(hsla.a ?? 1);

          return { h, s, l, a };
        },
      };
    }

    // ! error
    console.error(
      '[colorKit] An error occurred while attempting to convert the provided parameter into an `HSL` color. As a result, the default color "black" will be used instead.'
    );

    return {
      string: (alpha?: boolean) => (alpha ? 'hsla(0, 0%, 0%, 1)' : 'hsl(0, 0%, 0%)'),
      array: () => [0, 0, 0, 1],
      object: () => ({ h: 0, s: 0, l: 0, a: 1 }),
    };
  }

  // * HSV
  /** - Convert `HSL`, `HSLA`, `HEX`, `RGB` or `RGBA` color to `HSVA` color format. */
  HSV(color: SupportedColorFormats) {
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
          const hsva = typeof color === 'string' ? this._.getHsvObject(color) : (color as hsvaT),
            h = clampHue(hsva.h),
            s = clamp100(hsva.s),
            v = clamp100(hsva.v),
            a = clampAlpha(hsva.a ?? 1);

          if (typeof alpha === 'undefined') return a !== 1 ? `hsva(${h}, ${s}%, ${v}%, ${a})` : `hsv(${h}, ${s}%, ${v}%)`;

          if (alpha) return `hsva(${h}, ${s}%, ${v}%, ${a})`;

          return `hsv(${h}, ${s}%, ${v}%)`;
        },
        array: () => {
          const hsva = typeof color === 'string' ? this._.getHsvObject(color) : (color as hsvaT),
            h = clampHue(hsva.h),
            s = clamp100(hsva.s),
            v = clamp100(hsva.v),
            a = clampAlpha(hsva.a ?? 1);

          return [h, s, v, a];
        },
        object: () => {
          const hsva = typeof color === 'string' ? this._.getHsvObject(color) : (color as hsvaT),
            h = clampHue(hsva.h),
            s = clamp100(hsva.s),
            v = clamp100(hsva.v),
            a = clampAlpha(hsva.a ?? 1);

          return { h, s, v, a };
        },
      };
    }

    // ! error
    console.error(
      '[colorKit] An error occurred while attempting to convert the provided parameter into an `HSV` color. As a result, the default color "black" will be used instead.'
    );

    return {
      string: (alpha?: boolean) => (alpha ? 'hsva(0, 0%, 0%, 1)' : 'hsv(0, 0%, 0%)'),
      array: () => [0, 0, 0, 1],
      object: () => ({ h: 0, s: 0, v: 0, a: 1 }),
    };
  }

  // * HWB
  /** - Convert `HSL`, `HSLA`, `HEX`, `RGB` or `RGBA` color to `HWBA` color format. */
  HWB(color: SupportedColorFormats) {
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
          const hwba = typeof color === 'string' ? this._.getHwbObject(color) : (color as hwbaT),
            h = clampHue(hwba.h),
            w = clamp100(hwba.w),
            b = clamp100(hwba.b),
            a = clampAlpha(hwba.a ?? 1);

          if (typeof alpha === 'undefined') return a !== 1 ? `hwba(${h}, ${w}%, ${b}%, ${a})` : `hwb(${h}, ${w}%, ${b}%)`;

          if (alpha) return `hwba(${h}, ${w}%, ${b}%, ${a})`;

          return `hwb(${h}, ${w}%, ${b}%)`;
        },
        array: () => {
          const hwba = typeof color === 'string' ? this._.getHwbObject(color) : (color as hwbaT),
            h = clampHue(hwba.h),
            w = clamp100(hwba.w),
            b = clamp100(hwba.b),
            a = clampAlpha(hwba.a ?? 1);

          return [h, w, b, a];
        },
        object: () => {
          const hwba = typeof color === 'string' ? this._.getHwbObject(color) : (color as hwbaT),
            h = clampHue(hwba.h),
            w = clamp100(hwba.w),
            b = clamp100(hwba.b),
            a = clampAlpha(hwba.a ?? 1);

          return { h, w, b, a };
        },
      };
    }

    // ! error
    console.error(
      '[colorKit] An error occurred while attempting to convert the provided parameter into an `HWB` color. As a result, the default color "black" will be used instead.'
    );

    return {
      string: (alpha?: boolean) => (alpha ? 'hwba(0, 0%, 100%, 1)' : 'hwb(0, 0%, 100%)'),
      array: () => [0, 0, 100, 1],
      object: () => ({ h: 0, w: 0, b: 100, a: 1 }),
    };
  }

  // * color's channels
  /** - Get the `red` channel value of a given color. */
  getRed(color: SupportedColorFormats): number {
    const { r } = this.RGB(color).object();
    return r;
  }
  /** Set the `red` value of a color to a specific amount.*/
  setRed(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { g, b, a } = this.RGB(color).object();
    const newR = clampRGB(amount);
    const newColor = { r: newR, g, b, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `red` value of a color by the given percentage/amount.
   * @example
   * increaseRed(''rgb(100, 100, 100)', 20).hex();
   * increaseRed('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseRed(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const red = typeof amount === 'string' ? r + r * (parseFloat(amount) / 100) : r + amount;
    const newR = clampRGB(red);
    const newColor = { r: newR, g, b, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `red` value of a color by the given percentage/amount
   * @example
   * decreaseRed('rgb(100, 100, 100)', 20).hex();
   * decreaseRed('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseRed(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const red = typeof amount === 'string' ? r - r * (parseFloat(amount) / 100) : r - amount;
    const newR = clampRGB(red);
    const newColor = { r: newR, g, b, a };

    return this.returnColorObject(newColor);
  }

  /** - Get the `green` channel value of a given color. */
  getGreen(color: SupportedColorFormats): number {
    const { g } = this.RGB(color).object();
    return g;
  }
  /** - Set the `green` value of a color to a specific amount.*/
  setGreen(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { r, b, a } = this.RGB(color).object();
    const newG = clampRGB(amount);
    const newColor = { r, g: newG, b, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `green` value of a color by the given percentage.
   * @example
   * increaseGreen('rgb(100, 100, 100)', 20).hex();
   * increaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseGreen(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const green = typeof amount === 'string' ? g + g * (parseFloat(amount) / 100) : g + amount;
    const newG = clampRGB(green);
    const newColor = { r, g: newG, b, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `green` value of a color by the given percentage.
   * @example
   * decreaseGreen('rgb(100, 100, 100)', 20).hex();
   * decreaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseGreen(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const green = typeof amount === 'string' ? g - g * (parseFloat(amount) / 100) : g - amount;
    const newG = clampRGB(green);
    const newColor = { r, g: newG, b, a };

    return this.returnColorObject(newColor);
  }

  /** - Get the `blue` channel value of a given color. */
  getBlue(color: SupportedColorFormats): number {
    const { b } = this.RGB(color).object();
    return b;
  }
  /** - Set the `blue` value of a color to a specific amount.*/
  setBlur(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { r, g, a } = this.RGB(color).object();
    const newB = clampRGB(amount);
    const newColor = { r, g, b: newB, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `blue` value of a color by the given percentage.
   * @example
   * increaseBlue('rgb(100, 100, 100)', 20).hex();
   * increaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseBlue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const blue = typeof amount === 'string' ? b + b * (parseFloat(amount) / 100) : b + amount;
    const newB = clampRGB(blue);
    const newColor = { r, g, b: newB, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `blue` value of a color by the given percentage.
   * @example
   * decreaseBlue('rgb(100, 100, 100)', 20).hex();
   * decreaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseBlue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const blue = typeof amount === 'string' ? b - b * (parseFloat(amount) / 100) : b - amount;
    const newB = clampRGB(blue);
    const newColor = { r, g, b: newB, a };

    return this.returnColorObject(newColor);
  }

  //* hue
  /** - Get the `hue` channel value of a given color. */
  getHue(color: SupportedColorFormats): number {
    const { h } = this.HSL(color).object();
    return h;
  }
  /** - Set the `hue` value of a color to a specific amount.*/
  setHue(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { s, l, a } = this.HSL(color).object();
    const newH = clampHue(amount);
    const newColor = { h: newH, s, l, a };

    return this.returnColorObject(newColor);
  }
  /** Increase the `hue` value of a color by the given percentage/amount.
   * @example
   * increaseHue('rgb(100, 100, 100)', 20).hex();
   * increaseHue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  increaseHue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const hue = typeof amount === 'string' ? h + h * (parseFloat(amount) / 100) : h + amount;
    const newH = clampHue(hue);
    const newColor = { h: newH, s, l, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `hue` value of a color by the given percentage/amount.
   * @example
   * decreaseHue('rgb(100, 100, 100)', 20).hex();
   * decreaseHue('rgb(100, 100, 100)', '20%').rgb().string();
   */
  decreaseHue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const hue = typeof amount === 'string' ? h - h * (parseFloat(amount) / 100) : h - amount;
    const newH = clampHue(hue);
    const newColor = { h: newH, s, l, a };

    return this.returnColorObject(newColor);
  }
  /**
   * - Spin the `hue` channel by a certain percentage/amount.
   * @example
   * spin('red', 20).hex();
   * spin('rgb(255, 0, 0)', '20%').rgb().string();
   */
  spin(color: SupportedColorFormats, degree: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const spin = typeof degree === 'string' ? s * (parseFloat(degree) / 100) : degree;
    const newColor = { h: Math.round((h + spin) % 360), s, l, a };

    return this.returnColorObject(newColor);
  }

  //* saturation
  /** - Get the `saturation` value of a given color. */
  getSaturation(color: SupportedColorFormats): number {
    const { s } = this.HSL(color).object();
    return s;
  }
  /** - Set the `saturation` value of a color to a specific amount.*/
  setSaturation(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { h, l, a } = this.HSL(color).object();
    const newS = clamp100(amount);
    const saturatedColor = { h, s: newS, l, a };

    return this.returnColorObject(saturatedColor);
  }
  /**
   * - Increase the saturation of the given color by a certain percentage/amount.
   * @example
   * saturate('red', 20).hex();
   * saturate('rgb(255, 0, 0)', '20%').rgb().string();
   */
  saturate(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const saturation = typeof amount === 'string' ? s + s * (parseFloat(amount) / 100) : s + amount;
    const newS = clamp100(saturation);
    const saturatedColor = { h, s: newS, l, a };

    return this.returnColorObject(saturatedColor);
  }
  /**
   * - Decrease the saturation of the given color by a certain percentage/amount.
   * @example
   * saturate('red', 20).hex();
   * saturate('rgb(255, 0, 0)', '20%').rgb().string();
   */
  desaturate(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const saturation = typeof amount === 'string' ? s - s * (parseFloat(amount) / 100) : s - amount;
    const newS = clamp100(saturation);
    const desaturatedColor = { h, s: newS, l, a };

    return this.returnColorObject(desaturatedColor);
  }

  //* brightness
  /** - Get color's HSL `luminosity` channel value.
   * - If you want the overall `luminosity` of a color use `getLuminanceWCAG` method.
   */
  getLuminance(color: SupportedColorFormats): number {
    const { l } = this.HSL(color).object();
    return l;
  }
  /** - Set HSL's `luminosity` channel for a given color to a specific amount.*/
  setLuminance(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { h, s, a } = this.HSL(color).object();
    const newL = clamp100(amount);
    const newColor = { h, s, l: newL, a };

    return this.returnColorObject(newColor);
  }
  /**
   * - Increase the brightness of the given color by a certain percentage/amount.
   * @example
   * brighten('red', 20).hex();
   * brighten('rgb(255, 0, 0)', '20%').rgb().string();
   */
  brighten(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const lum = typeof amount === 'string' ? l + l * (parseFloat(amount) / 100) : l + amount;
    const newL = clamp100(lum);
    const brightenedColor = { h, s, l: newL, a };

    return this.returnColorObject(brightenedColor);
  }
  /**
   * - Decrease the brightness of the given color by a certain percentage/amount.
   * @example
   * darken('red', 20).hex();
   * darken('rgb(255, 0, 0)', '20%').rgb().string();
   */
  darken(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, l, a } = this.HSL(color).object();
    const lum = typeof amount === 'string' ? l - l * (parseFloat(amount) / 100) : l - amount;
    const newL = clamp100(lum);
    const darkenedColor = { h, s, l: newL, a };

    return this.returnColorObject(darkenedColor);
  }

  /** - Get the HSV's `value` (brightness) channel value of a given color. */
  getBrightness(color: SupportedColorFormats): number {
    const { v } = this.HSV(color).object();
    return v;
  }
  /** - Set HSV's `value` (brightness) channel for a given color to a specific amount.*/
  setBrightness(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { h, s, a } = this.HSV(color).object();
    const newV = clamp100(amount);
    const newColor = { h, s, v: newV, a };

    return this.returnColorObject(newColor);
  }
  /** Increase HSV's `value` (brightness) channel value of a color by the given percentage/amount.*/
  increaseBrightness(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, v, a } = this.HSV(color).object();
    const value = typeof amount === 'string' ? v + v * (parseFloat(amount) / 100) : v + amount;
    const newV = clamp100(value);
    const newColor = { h, s, v: newV, a };

    return this.returnColorObject(newColor);
  }
  /** Decrease HSV's `value` (brightness) channel value of a color by the given percentage/amount.*/
  decreaseBrightness(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { h, s, v, a } = this.HSV(color).object();
    const value = typeof amount === 'string' ? v - v * (parseFloat(amount) / 100) : v - amount;
    const newV = clamp100(value);
    const newColor = { h, s, v: newV, a };

    return this.returnColorObject(newColor);
  }

  //* alpha
  /** - Get the `alpha` value of a given color. */
  getAlpha(color: SupportedColorFormats): number {
    const { a } = this.RGB(color).object();
    return a;
  }
  /** - Set the `alpha` value of a color to a specific amount.*/
  setAlpha(color: SupportedColorFormats, amount: number): ConversionMethods {
    const { r, g, b } = this.RGB(color).object();
    const newA = clampAlpha(amount);
    const newColor = { r, g, b, a: newA };

    return this.returnColorObject(newColor);
  }
  /** Increase the `alpha` value of a color by the given percentage.*/
  increaseAlpha(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const alpha = typeof amount === 'string' ? a + a * (parseFloat(amount) / 100) : a + amount;
    const newA = clampAlpha(alpha);
    const newColor = { r, g, b, a: newA };

    return this.returnColorObject(newColor);
  }
  /** Decrease the `alpha` value of a color by the given percentage.*/
  decreaseAlpha(color: SupportedColorFormats, amount: number | string): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const alpha = typeof amount === 'string' ? a - a * (parseFloat(amount) / 100) : a - amount;
    const newA = clampAlpha(alpha);
    const newColor = { r, g, b, a: newA };

    return this.returnColorObject(newColor);
  }

  // * tools
  /** - Returns the perceived `luminance` of a color, from `0-1` as defined by Web Content Accessibility Guidelines (Version 2.0). */
  getLuminanceWCAG(color: SupportedColorFormats): number {
    const { r, g, b } = this.RGB(color).object();
    const a = [r, g, b].map(v => (v / 255 <= 0.03928 ? v / 255 / 12.92 : Math.pow((v / 255 + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  /** - Calculates the contrast ratio between two colors, useful for ensuring accessibility and readability. */
  contrastRatio(color1: SupportedColorFormats, color2: SupportedColorFormats): number {
    const luminance1 = this.getLuminanceWCAG(color1);
    const luminance2 = this.getLuminanceWCAG(color2);
    const contrast = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return Math.round(contrast * 100) / 100;
  }

  /** - Returns a boolean indicating whether the color is considered "dark" or not */
  isDark(color: SupportedColorFormats): boolean {
    const luminance = this.getLuminanceWCAG(color);
    return luminance < 0.5;
  }

  /** - Returns a boolean indicating whether the color is considered "light" or not */
  isLight(color: SupportedColorFormats): boolean {
    const luminance = this.getLuminanceWCAG(color);
    return luminance >= 0.5;
  }

  /**
   * - Blends two colors by a certain amount.
   * @example
   * blend('yellow', 'red', 50).hex(); // #ff8000
   */
  blend(color1: SupportedColorFormats, color2: SupportedColorFormats, percentage: number): ConversionMethods {
    percentage = percentage / 100;

    const rgba1 = this.RGB(color1).object();
    const rgba2 = this.RGB(color2).object();

    const r = clampRGB(rgba1.r * (1 - percentage) + rgba2.r * percentage),
      g = clampRGB(rgba1.g * (1 - percentage) + rgba2.g * percentage),
      b = clampRGB(rgba1.b * (1 - percentage) + rgba2.b * percentage),
      a = clampAlpha(rgba1.a * (1 - percentage) + rgba2.a * percentage);

    const blendedColor = { r, g, b, a };

    return this.returnColorObject(blendedColor);
  }

  /** - Invert (negate) a color, black becomes white, white becomes black, blue becomes orange and so on. */
  invert(color: SupportedColorFormats): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const invertedColor = { r: 255 - r, g: 255 - g, b: 255 - b, a };
    return this.returnColorObject(invertedColor);
  }

  /** - Completely desaturate a color into grayscale. */
  grayscale(color: SupportedColorFormats): ConversionMethods {
    const { r, g, b, a } = this.RGB(color).object();
    const gray = clampRGB(r * 0.3 + g * 0.59 + b * 0.11);
    const grayColor = { r: gray, g: gray, b: gray, a };

    return this.returnColorObject(grayColor);
  }

  /** - Generate a random color from `HSL` values. */
  randomHslColor({ h = [0, 360], s = [0, 100], l = [0, 100], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      h: clampHue(randomNumber(h[0], h[1])),
      s: clamp100(randomNumber(s[0], s[1])),
      l: clamp100(randomNumber(l[0], l[1])),
      a: clampAlpha(randomNumber(a[0], a[1])),
    };

    return this.returnColorObject(random);
  }
  /** - Generate a random color from `HSV` values. */
  randomHsvColor({ h = [0, 360], s = [0, 100], v = [0, 100], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      h: clampHue(randomNumber(h[0], h[1])),
      s: clamp100(randomNumber(s[0], s[1])),
      v: clamp100(randomNumber(v[0], v[1])),
      a: clampAlpha(randomNumber(a[0], a[1])),
    };

    return this.returnColorObject(random);
  }
  /** - Generate a random color from `RGB` values. */
  randomRgbColor({ r = [0, 255], g = [0, 255], b = [0, 255], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      r: clampRGB(randomNumber(r[0], r[1])),
      g: clampRGB(randomNumber(g[0], g[1])),
      b: clampRGB(randomNumber(b[0], b[1])),
      a: clampAlpha(randomNumber(a[0], a[1])),
    };

    return this.returnColorObject(random);
  }
  /** - Generate a random color from `HWB` values. */
  randomHwbColor({ h = [0, 360], w = [0, 100], b = [0, 100], a = [1, 1] } = {}): ConversionMethods {
    const random = {
      h: clampHue(randomNumber(h[0], h[1])),
      w: clamp100(randomNumber(w[0], w[1])),
      b: clamp100(randomNumber(b[0], b[1])),
      a: clampAlpha(randomNumber(a[0], a[1])),
    };

    return this.returnColorObject(random);
  }

  /** - Returns the first color with the desired contrast ratio against the second color */
  adjustContrast(color1: SupportedColorFormats, color2: SupportedColorFormats, ratio = 4.5): ConversionMethods {
    const contrast = this.contrastRatio(color1, color2);
    const color1RGB = this.RGB(color1).object();
    const channels = ['r', 'g', 'b'] as const;

    const adjustLuminance = (colorRGB: rgbaT, by: number) => {
      const r = clampRGB(colorRGB.r + by);
      const g = clampRGB(colorRGB.g + by);
      const b = clampRGB(colorRGB.b + by);
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
