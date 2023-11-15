import COLORS_REGEX from './colorsRegex';

import type { ColorFormats, hslaT, hslT, hsvaT, hsvT, hwbaT, hwbT, rgbaT, rgbT, SupportedColorFormats } from './types';

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function clampRGB(value: number) {
  return clamp(Math.round(value), 0, 255);
}

export function clampHue(value: number) {
  return clamp(Math.round(value), 0, 360);
}

export function clamp100(value: number) {
  return clamp(Math.round(value), 0, 100);
}

export function clampAlpha(value: number) {
  return clamp(+value.toFixed(2), 0, 1);
}

export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function numberToHexString(c: number): string {
  c = clampRGB(c);
  const hex = c.toString(16).padStart(2, '0');
  return hex;
}

export function calculateHueValue(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/** - Identify the color format of a given `string` or `object` */
export function detectColorFormat(color: SupportedColorFormats): ColorFormats | null {
  // color int
  if (typeof color === 'number') {
    if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) return 'hex8';
    return null;
  }

  // color string
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();
    for (const key in COLORS_REGEX) {
      const format = key as ColorFormats;
      const entry = COLORS_REGEX[format];
      if (Array.isArray(entry)) {
        for (let i = 0; i < entry.length; i++) {
          if (entry[i].test(color)) return format;
        }
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
