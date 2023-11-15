import { clamp100, clampAlpha, clampHue, clampRGB } from './utilities';
import { HEX, HSL, HSV, HWB, RGB } from './colorConversion';

import type { ConversionMethods, SupportedColorFormats } from './types';

function returnColorObject(color: SupportedColorFormats) {
  return {
    hex() {
      return HEX(color);
    },
    rgb() {
      return RGB(color);
    },
    hsl() {
      return HSL(color);
    },
    hsv() {
      return HSV(color);
    },
    hwb() {
      return HWB(color);
    },
  };
}

// * Red channel
/** Set the `red` value of a color to a specific amount.*/
export function setRed(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { g, b, a } = RGB(color).object();
  const newR = clampRGB(amount);
  const newColor = { r: newR, g, b, a };

  return returnColorObject(newColor);
}

/** Increase the `red` value of a color by the given percentage/amount.
 * @example
 * increaseRed('rgb(100, 100, 100)', 20).hex();
 * increaseRed('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function increaseRed(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const red = typeof amount === 'string' ? r + r * (parseFloat(amount) / 100) : r + amount;
  const newR = clampRGB(red);
  const newColor = { r: newR, g, b, a };

  return returnColorObject(newColor);
}

/** Decrease the `red` value of a color by the given percentage/amount
 * @example
 * decreaseRed('rgb(100, 100, 100)', 20).hex();
 * decreaseRed('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function decreaseRed(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const red = typeof amount === 'string' ? r - r * (parseFloat(amount) / 100) : r - amount;
  const newR = clampRGB(red);
  const newColor = { r: newR, g, b, a };

  return returnColorObject(newColor);
}

// * Green channel
/** - Set the `green` value of a color to a specific amount.*/
export function setGreen(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { r, b, a } = RGB(color).object();
  const newG = clampRGB(amount);
  const newColor = { r, g: newG, b, a };

  return returnColorObject(newColor);
}

/** Increase the `green` value of a color by the given percentage.
 * @example
 * increaseGreen('rgb(100, 100, 100)', 20).hex();
 * increaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function increaseGreen(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const green = typeof amount === 'string' ? g + g * (parseFloat(amount) / 100) : g + amount;
  const newG = clampRGB(green);
  const newColor = { r, g: newG, b, a };

  return returnColorObject(newColor);
}

/** Decrease the `green` value of a color by the given percentage.
 * @example
 * decreaseGreen('rgb(100, 100, 100)', 20).hex();
 * decreaseGreen('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function decreaseGreen(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const green = typeof amount === 'string' ? g - g * (parseFloat(amount) / 100) : g - amount;
  const newG = clampRGB(green);
  const newColor = { r, g: newG, b, a };

  return returnColorObject(newColor);
}

// * Blue channel
/** - Set the `blue` value of a color to a specific amount.*/
export function setBlue(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { r, g, a } = RGB(color).object();
  const newB = clampRGB(amount);
  const newColor = { r, g, b: newB, a };

  return returnColorObject(newColor);
}

/** Increase the `blue` value of a color by the given percentage.
 * @example
 * increaseBlue('rgb(100, 100, 100)', 20).hex();
 * increaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function increaseBlue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const blue = typeof amount === 'string' ? b + b * (parseFloat(amount) / 100) : b + amount;
  const newB = clampRGB(blue);
  const newColor = { r, g, b: newB, a };

  return returnColorObject(newColor);
}

/** Decrease the `blue` value of a color by the given percentage.
 * @example
 * decreaseBlue('rgb(100, 100, 100)', 20).hex();
 * decreaseBlue('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function decreaseBlue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const blue = typeof amount === 'string' ? b - b * (parseFloat(amount) / 100) : b - amount;
  const newB = clampRGB(blue);
  const newColor = { r, g, b: newB, a };

  return returnColorObject(newColor);
}

//* Alpha channel
/** - Get the `alpha` value of a given color. */
export function getAlpha(color: SupportedColorFormats): number {
  const { a } = RGB(color).object();
  return a;
}

/** - Set the `alpha` value of a color to a specific amount.*/
export function setAlpha(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { r, g, b } = RGB(color).object();
  const newA = clampAlpha(amount);
  const newColor = { r, g, b, a: newA };

  return returnColorObject(newColor);
}

/** Increase the `alpha` value of a color by the given percentage.*/
export function increaseAlpha(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const alpha = typeof amount === 'string' ? a + a * (parseFloat(amount) / 100) : a + amount;
  const newA = clampAlpha(alpha);
  const newColor = { r, g, b, a: newA };

  return returnColorObject(newColor);
}

/** Decrease the `alpha` value of a color by the given percentage.*/
export function decreaseAlpha(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { r, g, b, a } = RGB(color).object();
  const alpha = typeof amount === 'string' ? a - a * (parseFloat(amount) / 100) : a - amount;
  const newA = clampAlpha(alpha);
  const newColor = { r, g, b, a: newA };

  return returnColorObject(newColor);
}

//* Hue
/** - Set the `hue` value of a color to a specific amount.*/
export function setHue(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { s, l, a } = HSL(color).object();
  const newH = clampHue(amount);
  const newColor = { h: newH, s, l, a };

  return returnColorObject(newColor);
}

/** Increase the `hue` value of a color by the given percentage/amount.
 * @example
 * increaseHue('rgb(100, 100, 100)', 20).hex();
 * increaseHue('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function increaseHue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, l, a } = HSL(color).object();
  const hue = typeof amount === 'string' ? h + h * (parseFloat(amount) / 100) : h + amount;
  const newH = clampHue(hue);
  const newColor = { h: newH, s, l, a };

  return returnColorObject(newColor);
}

/** Decrease the `hue` value of a color by the given percentage/amount.
 * @example
 * decreaseHue('rgb(100, 100, 100)', 20).hex();
 * decreaseHue('rgb(100, 100, 100)', '20%').rgb().string();
 */
export function decreaseHue(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, l, a } = HSL(color).object();
  const hue = typeof amount === 'string' ? h - h * (parseFloat(amount) / 100) : h - amount;
  const newH = clampHue(hue);
  const newColor = { h: newH, s, l, a };

  return returnColorObject(newColor);
}

/**
 * - Spin the `hue` channel by a certain percentage/amount.
 * @example
 * spin('red', 20).hex();
 * spin('rgb(255, 0, 0)', '20%').rgb().string();
 */
export function spin(color: SupportedColorFormats, degree: number | string): ConversionMethods {
  const { h, s, l, a } = HSL(color).object();
  const spinDegree = typeof degree === 'string' ? s * (parseFloat(degree) / 100) : degree;
  const newColor = { h: Math.round((h + spinDegree) % 360), s, l, a };

  return returnColorObject(newColor);
}

//* Saturation
/** - Set the `saturation` value of a color to a specific amount.*/
export function setSaturation(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { h, l, a } = HSL(color).object();
  const newS = clamp100(amount);
  const saturatedColor = { h, s: newS, l, a };

  return returnColorObject(saturatedColor);
}

/**
 * - Increase the saturation of the given color by a certain percentage/amount.
 * @example
 * saturate('red', 20).hex();
 * saturate('rgb(255, 0, 0)', '20%').rgb().string();
 */
export function saturate(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, l, a } = HSL(color).object();
  const saturation = typeof amount === 'string' ? s + s * (parseFloat(amount) / 100) : s + amount;
  const newS = clamp100(saturation);
  const saturatedColor = { h, s: newS, l, a };

  return returnColorObject(saturatedColor);
}

/**
 * - Decrease the saturation of the given color by a certain percentage/amount.
 * @example
 * saturate('red', 20).hex();
 * saturate('rgb(255, 0, 0)', '20%').rgb().string();
 */
export function desaturate(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, l, a } = HSL(color).object();
  const saturation = typeof amount === 'string' ? s - s * (parseFloat(amount) / 100) : s - amount;
  const newS = clamp100(saturation);
  const desaturatedColor = { h, s: newS, l, a };

  return returnColorObject(desaturatedColor);
}

//* Brightness
/** - Set HSL's `luminosity` channel for a given color to a specific amount.*/
export function setLuminance(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { h, s, a } = HSL(color).object();
  const newL = clamp100(amount);
  const newColor = { h, s, l: newL, a };

  return returnColorObject(newColor);
}

/**
 * - Increase the brightness of the given color by a certain percentage/amount.
 * @example
 * brighten('red', 20).hex();
 * brighten('rgb(255, 0, 0)', '20%').rgb().string();
 */
export function brighten(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, l, a } = HSL(color).object();
  const lum = typeof amount === 'string' ? l + l * (parseFloat(amount) / 100) : l + amount;
  const newL = clamp100(lum);
  const brightenedColor = { h, s, l: newL, a };

  return returnColorObject(brightenedColor);
}

/**
 * - Decrease the brightness of the given color by a certain percentage/amount.
 * @example
 * darken('red', 20).hex();
 * darken('rgb(255, 0, 0)', '20%').rgb().string();
 */
export function darken(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, l, a } = HSL(color).object();
  const lum = typeof amount === 'string' ? l - l * (parseFloat(amount) / 100) : l - amount;
  const newL = clamp100(lum);
  const darkenedColor = { h, s, l: newL, a };

  return returnColorObject(darkenedColor);
}

/** - Set HSV's `value` (brightness) channel for a given color to a specific amount.*/
export function setBrightness(color: SupportedColorFormats, amount: number): ConversionMethods {
  const { h, s, a } = HSV(color).object();
  const newV = clamp100(amount);
  const newColor = { h, s, v: newV, a };

  return returnColorObject(newColor);
}

/** Increase HSV's `value` (brightness) channel value of a color by the given percentage/amount.*/
export function increaseBrightness(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, v, a } = HSV(color).object();
  const value = typeof amount === 'string' ? v + v * (parseFloat(amount) / 100) : v + amount;
  const newV = clamp100(value);
  const newColor = { h, s, v: newV, a };

  return returnColorObject(newColor);
}

/** Decrease HSV's `value` (brightness) channel value of a color by the given percentage/amount.*/
export function decreaseBrightness(color: SupportedColorFormats, amount: number | string): ConversionMethods {
  const { h, s, v, a } = HSV(color).object();
  const value = typeof amount === 'string' ? v - v * (parseFloat(amount) / 100) : v - amount;
  const newV = clamp100(value);
  const newColor = { h, s, v: newV, a };

  return returnColorObject(newColor);
}
