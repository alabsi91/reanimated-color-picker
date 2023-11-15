import colorsRegex from '../colorsRegex';
import { clamp100, clampAlpha, clampHue, clampRGB, detectColorFormat } from '../utilities';
import { to_HEX as from_RGB_to_HEX } from './RGB';

import type { hslaT, hsvaT, hsvT, hwbaT, rgbaT } from '../types';

// * HSV

/** - Parse `HSV` or `HSVA` color string to an `object` */
export function string_to_object(color: string): hsvaT {
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
export function to_normalized_object(color: hsvaT | hsvT): hsvaT {
  return {
    h: clampHue(color.h),
    s: clamp100(color.s),
    v: clamp100(color.v),
    a: clampAlpha((color as hsvaT).a ?? 1),
  };
}

/** - Convert `HSV` color to an `RGBA` object representation */
export function to_RGBA(color: hsvaT | hsvT | string): rgbaT {
  const hsva = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);

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
export function to_HSLA(color: hsvaT | hsvT | string): hslaT {
  const hsva = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);

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
export function to_HEX(color: hsvaT | hsvT | string): string {
  const rgba = to_RGBA(color);
  const hex = from_RGB_to_HEX(rgba);
  return hex;
}
/**
 *  - Convert `HSV` color to an `HWBA` object representation */
export function to_HWBA(color: hsvaT | hsvT | string): hwbaT {
  const { h, s, v, a } = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);

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
export function to_types({ h, s, v, a }: hsvaT) {
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
