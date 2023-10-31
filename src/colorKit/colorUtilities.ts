import { HEX, HSL, HSV, HWB, RGB } from './colorConversion';
import { contrastRatio, isDark } from './colorInformation';
import { clamp100, clampAlpha, clampHue, clampRGB, randomNumber } from './utilities';

import type { ConversionMethods, rgbaT, SupportedColorFormats } from './types';

function returnColorObject(color: SupportedColorFormats) {
  'worklet';
  return {
    hex: () => {
      'worklet';
      return HEX(color);
    },
    rgb: () => {
      'worklet';
      return RGB(color);
    },
    hsl: () => {
      'worklet';
      return HSL(color);
    },
    hsv: () => {
      'worklet';
      return HSV(color);
    },
    hwb: () => {
      'worklet';
      return HWB(color);
    },
  };
}

/**
 * - Blends two colors by a certain amount.
 * @example
 * blend('yellow', 'red', 50).hex(); // #ff8000
 */
export function blend(color1: SupportedColorFormats, color2: SupportedColorFormats, percentage: number): ConversionMethods {
  'worklet';
  percentage = percentage / 100;

  const rgba1 = RGB(color1).object();
  const rgba2 = RGB(color2).object();

  const r = clampRGB(rgba1.r * (1 - percentage) + rgba2.r * percentage),
    g = clampRGB(rgba1.g * (1 - percentage) + rgba2.g * percentage),
    b = clampRGB(rgba1.b * (1 - percentage) + rgba2.b * percentage),
    a = clampAlpha(rgba1.a * (1 - percentage) + rgba2.a * percentage);

  const blendedColor = { r, g, b, a };

  return returnColorObject(blendedColor);
}

/** - Invert (negate) a color, black becomes white, white becomes black, blue becomes orange and so on. */
export function invert(color: SupportedColorFormats): ConversionMethods {
  'worklet';
  const { r, g, b, a } = RGB(color).object();
  const invertedColor = { r: 255 - r, g: 255 - g, b: 255 - b, a };
  return returnColorObject(invertedColor);
}

/** - Completely desaturate a color into grayscale. */
export function grayscale(color: SupportedColorFormats): ConversionMethods {
  'worklet';
  const { r, g, b, a } = RGB(color).object();
  const gray = clampRGB(r * 0.3 + g * 0.59 + b * 0.11);
  const grayColor = { r: gray, g: gray, b: gray, a };

  return returnColorObject(grayColor);
}

/** - Generate a random color from `HSL` values. */
export function randomHslColor({ h = [0, 360], s = [0, 100], l = [0, 100], a = [1, 1] } = {}): ConversionMethods {
  'worklet';
  const random = {
    h: clampHue(randomNumber(h[0], h[1])),
    s: clamp100(randomNumber(s[0], s[1])),
    l: clamp100(randomNumber(l[0], l[1])),
    a: clampAlpha(randomNumber(a[0], a[1])),
  };

  return returnColorObject(random);
}

/** - Generate a random color from `HSV` values. */
export function randomHsvColor({ h = [0, 360], s = [0, 100], v = [0, 100], a = [1, 1] } = {}): ConversionMethods {
  'worklet';
  const random = {
    h: clampHue(randomNumber(h[0], h[1])),
    s: clamp100(randomNumber(s[0], s[1])),
    v: clamp100(randomNumber(v[0], v[1])),
    a: clampAlpha(randomNumber(a[0], a[1])),
  };

  return returnColorObject(random);
}

/** - Generate a random color from `RGB` values. */
export function randomRgbColor({ r = [0, 255], g = [0, 255], b = [0, 255], a = [1, 1] } = {}): ConversionMethods {
  'worklet';
  const random = {
    r: clampRGB(randomNumber(r[0], r[1])),
    g: clampRGB(randomNumber(g[0], g[1])),
    b: clampRGB(randomNumber(b[0], b[1])),
    a: clampAlpha(randomNumber(a[0], a[1])),
  };

  return returnColorObject(random);
}

/** - Generate a random color from `HWB` values. */
export function randomHwbColor({ h = [0, 360], w = [0, 100], b = [0, 100], a = [1, 1] } = {}): ConversionMethods {
  'worklet';
  const random = {
    h: clampHue(randomNumber(h[0], h[1])),
    w: clamp100(randomNumber(w[0], w[1])),
    b: clamp100(randomNumber(b[0], b[1])),
    a: clampAlpha(randomNumber(a[0], a[1])),
  };

  return returnColorObject(random);
}

/** - Returns the first color with the desired contrast ratio against the second color */
export function adjustContrast(color1: SupportedColorFormats, color2: SupportedColorFormats, ratio = 4.5): ConversionMethods {
  'worklet';
  const contrast = contrastRatio(color1, color2);
  const color1RGB = RGB(color1).object();
  const channels = ['r', 'g', 'b'] as const;

  function adjustLuminance(colorRGB: rgbaT, by: number) {
    'worklet';
    const r = clampRGB(colorRGB.r + by);
    const g = clampRGB(colorRGB.g + by);
    const b = clampRGB(colorRGB.b + by);
    return { r, g, b, a: colorRGB.a };
  }

  let newColor = color1RGB;

  //* increase contrast
  if (ratio && contrast < ratio) {
    while (contrastRatio(newColor, color2) < ratio) {
      const adjustBy = isDark(color2) ? 1 : -1; // increase or decrease relative to the background color
      newColor = adjustLuminance(newColor, adjustBy);

      // break if the color reached the limit
      if (channels.every(e => newColor[e] === 0)) break;
      if (channels.every(e => newColor[e] === 255)) break;
    }
    //* decrease contrast
  } else if (ratio && contrast > ratio) {
    while (contrastRatio(newColor, color2) > ratio) {
      const adjustBy = !isDark(color2) ? 1 : -1; // increase or decrease relative to the background color
      newColor = adjustLuminance(newColor, adjustBy);

      // break if the color reached the limit
      if (channels.every(e => newColor[e] === 0)) break;
      if (channels.every(e => newColor[e] === 255)) break;
    }
  }

  return returnColorObject(newColor);
}
