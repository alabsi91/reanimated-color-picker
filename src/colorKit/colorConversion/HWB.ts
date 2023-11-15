import COLORS_REGEX from '../colorsRegex';
import { calculateHueValue, clamp100, clampAlpha, clampHue, clampRGB, detectColorFormat } from '../utilities';
import { to_HSLA as HSV_to_HSLA } from './HSV';
import { to_HEX as RGB_to_HEX } from './RGB';

import type { ColorTypes, hslaT, hsvaT, hwbaT, hwbT, rgbaT } from '../types';

// * HWB

/** - Parse `HWB` or `HWBA` color strong to an `object` */
export function string_to_object(color: string): hwbaT {
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('hwb')) {
    console.error(
      '[colorKit.getHwbObject] is unable to parse the string into an `HWB` object. As a result, the color "black" will be returned instead.'
    );
    return { h: 0, w: 0, b: 0, a: 1 };
  }

  let matches: RegExpMatchArray | null = null;
  const entry = COLORS_REGEX[colorType as 'hwb' | 'hwba'];
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
export function to_normalized_object(color: hwbaT | hwbT): hwbaT {
  return {
    h: clampHue(color.h),
    w: clamp100(color.w),
    b: clamp100(color.b),
    a: clampAlpha((color as hwbaT).a ?? 1),
  };
}

/** - Convert `HWB` or `HWBA` color to an `RGBA` object representation */
export function to_RGBA(color: hwbaT | hwbT | string): rgbaT {
  const hwba = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);

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
export function to_HEX(color: hwbaT | hwbT | string): string {
  const rgba = to_RGBA(color);
  return RGB_to_HEX(rgba);
}

/** - Convert `HWB` or `HWBA` color to an `HSVA` object representation */
export function to_HSVA(color: hwbaT | hwbT | string): hsvaT {
  const hwba = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);

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
export function to_HSLA(color: hwbaT | hwbT | string): hslaT {
  const hsva = to_HSVA(color);
  return HSV_to_HSLA(hsva);
}

/** - Convert `HWB` or `HWBA` color to an `HWBA` object representation */
export function to_HWBA(color: hwbaT | hwbT | string): hwbaT {
  return typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);
}

/** - Return the `HWB` color as a string, an array, or an object */
export function to_types({ h, w, b, a }: hwbaT): ColorTypes<hwbaT> {
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
