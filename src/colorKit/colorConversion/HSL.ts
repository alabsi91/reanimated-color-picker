import colorsRegex from '../colorsRegex';
import { calculateHueValue, clamp100, clampAlpha, clampHue, clampRGB, detectColorFormat, numberToHexString } from '../utilities';
import { to_HWBA as from_HSV_to_HWBA } from './HSV';

import type { hslaT, hslT, hsvaT, hwbaT, rgbaT } from '../types';

// * HSL

/** - Parse `HSL` or `HSLA` color string to an `object` */
export function string_to_object(color: string): hslaT {
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
export function to_normalized_object(color: hslaT | hslT): hslaT {
  return {
    h: clampHue(color.h),
    s: clamp100(color.s),
    l: clamp100(color.l),
    a: clampAlpha((color as hslaT).a ?? 1),
  };
}

/** - Convert `HSL` or `HSLA` color to an `RGBA` object representation */
export function to_RGBA(color: string | hslaT | hslT): rgbaT {
  const hsla = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);

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
export function to_HEX(color: string | hslaT | hslT): string {
  const hsla = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);
  const rgb = to_RGBA(hsla);

  const r = numberToHexString(rgb.r),
    g = numberToHexString(rgb.g),
    b = numberToHexString(rgb.b),
    a = rgb.a === 1 ? '' : numberToHexString(rgb.a * 255);

  return `#${r + g + b + a}`;
}

/** - Convert `HSL` or `HSLA` color to an `HSVA` object representation */
export function to_HSVA(color: string | hslaT | hslT): hsvaT {
  const hsla = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);
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
export function to_HWBA(color: string | hslaT | hslT): hwbaT {
  const hsva = to_HSVA(color);
  return from_HSV_to_HWBA(hsva);
}

/** - Return the `HSL` color as a string, an array, or an object */
export function to_types({ h, s, l, a }: hslaT) {
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
