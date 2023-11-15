import COLORS_REGEX from '../colorsRegex';
import { clampAlpha, clampRGB, detectColorFormat } from '../utilities';
import { to_HSLA as RGB_to_HSLA, to_HSVA as RGB_to_HSVA, to_HWBA as RGB_to_HWBA } from './RGB';

import type { hslaT, hsvaT, hwbaT, rgbaT } from '../types';

// * HEX

/** - Convert any `HEX` color to 8-digit `HEX` color (#rrggbbaa) */
export function to_normalized(color: string | number): string {
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
export function to_RGBA(color: string | number): rgbaT {
  const hex = to_normalized(color);

  let matches: RegExpMatchArray | null = null;
  const entry = COLORS_REGEX.hex8;
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
export function to_HSVA(color: string | number): hsvaT {
  const rgb = to_RGBA(color);
  const hsva = RGB_to_HSVA(rgb);
  return hsva;
}

/** - Convert any `HEX` color to an `HSLA` object representation */
export function to_HSLA(color: string): hslaT {
  const rgb = to_RGBA(color);
  return RGB_to_HSLA(rgb);
}

/** - Convert any `HEX` color to an `HWBA` object representation */
export function to_HWBA(color: string): hwbaT {
  const rgba = to_RGBA(color);
  return RGB_to_HWBA(rgba);
}
