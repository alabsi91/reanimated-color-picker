import COLORS_REGEX from '../colorsRegex';
import { clamp100, clampAlpha, clampHue, clampRGB, detectColorFormat, numberToHexString } from '../utilities';

import type { ColorTypes, hslaT, hsvaT, hwbaT, rgbaT, rgbT } from '../types';

// * RGB

/** - Parse `RGB` or `RGBA` color string to an `object` */
export function string_to_object(color: string): rgbaT {
  color = color.trim().toLowerCase();
  const colorType = detectColorFormat(color);

  if (!colorType || !colorType.includes('rgb')) {
    console.error(
      '[colorKit.getRgbObject] is unable to parse the string into an `RGB` object. As a result, the color "black" will be returned instead.'
    );
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  let matches: RegExpMatchArray | null = null;
  const entry = COLORS_REGEX[colorType];
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
export function to_normalized_object(color: rgbaT | rgbT): rgbaT {
  return {
    r: clampRGB(color.r),
    g: clampRGB(color.g),
    b: clampRGB(color.b),
    a: clampAlpha((color as rgbaT).a ?? 1),
  };
}

/** - Convert an `RGB` or `RGBA` color to its corresponding `Hex` color */
export function to_HEX(color: string | rgbaT | rgbT): string {
  const { r, g, b, a } = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);

  const red = numberToHexString(r),
    green = numberToHexString(g),
    blue = numberToHexString(b),
    alpha = a === 1 ? '' : numberToHexString(a * 255);

  return `#${red + green + blue + alpha}`;
}

/** - Convert an `RGB` or `RGBA` color to an `HSLA` object representation */
export function to_HSLA(color: string | rgbaT | rgbT): hslaT {
  const rgb = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color),
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
export function to_HSVA(color: string | rgbaT | rgbT): hsvaT {
  const rgb = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color),
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
export function to_HWBA(color: string | rgbaT | rgbT): hwbaT {
  const rgb = typeof color === 'string' ? string_to_object(color) : to_normalized_object(color),
    red = rgb.r / 255,
    green = rgb.g / 255,
    blue = rgb.b / 255,
    a = rgb.a;

  const { h } = to_HSLA(color);

  const white = Math.min(red, green, blue) * 100;
  const black = (1 - Math.max(red, green, blue)) * 100;

  return {
    h: clampHue(h),
    w: clamp100(white),
    b: clamp100(black),
    a: clampAlpha(a),
  };
}

/** - Convert `RGB` or `RGBA` color to an `RGBA` object representation */
export function to_RGBA(color: string | rgbaT | rgbT): rgbaT {
  return typeof color === 'string' ? string_to_object(color) : to_normalized_object(color);
}

/** - Return the `RGB` color as a string, an array, or an object */
export function to_types({ r, g, b, a }: rgbaT): ColorTypes<rgbaT> {
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
