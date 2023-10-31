import { HSL, HSV, RGB } from './colorConversion';
import colorsRegex from './colorsRegex';
import namedColors from './namedColors';

import type { ColorFormats, hslaT, hslT, hsvaT, hsvT, hwbaT, hwbT, rgbaT, rgbT, SupportedColorFormats } from './types';

/** - Identify the color format of a given `string` or `object`, and return `null` for invalid colors. */
export function getFormat(color: SupportedColorFormats): ColorFormats | 'named' | null {
  'worklet';
  // color int
  if (typeof color === 'number') {
    if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) return 'hex8';
    return null;
  }

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

/** - Get the `red` channel value of a given color. */
export function getRed(color: SupportedColorFormats): number {
  'worklet';
  const { r } = RGB(color).object();
  return r;
}

/** - Get the `green` channel value of a given color. */
export function getGreen(color: SupportedColorFormats): number {
  'worklet';
  const { g } = RGB(color).object();
  return g;
}

/** - Get the `blue` channel value of a given color. */
export function getBlue(color: SupportedColorFormats): number {
  'worklet';
  const { b } = RGB(color).object();
  return b;
}

/** - Get the `hue` channel value of a given color. */
export function getHue(color: SupportedColorFormats): number {
  'worklet';
  const { h } = HSL(color).object();
  return h;
}

/** - Get the `saturation` value of a given color. */
export function getSaturation(color: SupportedColorFormats): number {
  'worklet';
  const { s } = HSL(color).object();
  return s;
}

/**
 * - Get color's HSL `luminosity` channel value.
 * - If you want the overall `luminosity` of a color use `getLuminanceWCAG` method.
 */
export function getLuminance(color: SupportedColorFormats): number {
  'worklet';
  const { l } = HSL(color).object();
  return l;
}

/** - Get the HSV's `value` (brightness) channel value of a given color. */
export function getBrightness(color: SupportedColorFormats): number {
  'worklet';
  const { v } = HSV(color).object();
  return v;
}

/** - Returns the perceived `luminance` of a color, from `0-1` as defined by Web Content Accessibility Guidelines (Version 2.0). */
export function getLuminanceWCAG(color: SupportedColorFormats): number {
  'worklet';
  const { r, g, b } = RGB(color).object();
  const a = [r, g, b].map(v => (v / 255 <= 0.03928 ? v / 255 / 12.92 : Math.pow((v / 255 + 0.055) / 1.055, 2.4)));
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/** - Returns a boolean indicating whether the color is considered "dark" or not */
export function isDark(color: SupportedColorFormats): boolean {
  'worklet';
  const luminance = getLuminanceWCAG(color);
  return luminance < 0.5;
}

/** - Returns a boolean indicating whether the color is considered "light" or not */
export function isLight(color: SupportedColorFormats): boolean {
  'worklet';
  const luminance = getLuminanceWCAG(color);
  return luminance >= 0.5;
}

/**
 * - Check if two colors are similar within a specified tolerance.
 * @example
 * const tolerance = 0;
 * const isEqual = colorKit.areColorsEqual("#f00", "red", tolerance); // true
 */
export function areColorsEqual(color1: SupportedColorFormats, color2: SupportedColorFormats, tolerance = 0): boolean {
  'worklet';
  const rgb1 = RGB(color1).object();
  const rgb2 = RGB(color2).object();

  const deltaR = rgb1.r - rgb2.r;
  const deltaG = rgb1.g - rgb2.g;
  const deltaB = rgb1.b - rgb2.b;
  const difference = Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB);

  return difference <= tolerance;
}

/** - Calculates the contrast ratio between two colors, useful for ensuring accessibility and readability. */
export function contrastRatio(color1: SupportedColorFormats, color2: SupportedColorFormats): number {
  'worklet';
  const luminance1 = getLuminanceWCAG(color1);
  const luminance2 = getLuminanceWCAG(color2);
  const contrast = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
  return Math.round(contrast * 100) / 100;
}
