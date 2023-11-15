import namedColors from '../namedColors';
import { detectColorFormat } from '../utilities';
import * as from_HEX from './HEX';
import * as from_HSL from './HSL';
import * as from_HSV from './HSV';
import * as from_HWB from './HWB';
import * as from_RGB from './RGB';

import type { hslaT, hslT, hsvaT, hsvT, hwbaT, hwbT, rgbaT, rgbT, SupportedColorFormats } from '../types';

/** - Convert `HSL`, `HSV`, `HWB`, or `RGB` color to the `HEX` color format. */
export function HEX(color: SupportedColorFormats): string {
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // RGB to HEX
  if (colorType === 'rgb' || colorType === 'rgba') {
    return from_RGB.to_HEX(color as string | rgbT | rgbaT);
  }

  // HSL to HEX
  if (colorType === 'hsl' || colorType === 'hsla') {
    return from_HSL.to_HEX(color as string | hslaT | hslT);
  }

  // HSV to HEX
  if (colorType === 'hsv' || colorType === 'hsva') {
    return from_HSV.to_HEX(color as string | hsvaT | hsvT);
  }

  // HWB to HEX
  if (colorType === 'hwb' || colorType === 'hwba') {
    return from_HWB.to_HEX(color as string | hwbaT | hwbT);
  }

  // HEX
  if (colorType?.includes('hex')) {
    return from_HEX.to_normalized(color as string | number);
  }

  // ! error
  console.error(
    '[colorKit.HEX] An error occurred while attempting to convert the provided parameter into an `HEX` color. As a result, the default color "black" will be used instead.'
  );

  return '#000000';
}

/** - Convert `HSL`, `HSV`, `HWB`, or `HEX` color to the `RGB` color format. */
export function RGB(color: SupportedColorFormats) {
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to RGB
  if (colorType?.includes('hex')) {
    const rgb = from_HEX.to_RGBA(color as string | number);
    return from_RGB.to_types(rgb);
  }

  // HSL to RGB
  if (colorType === 'hsl' || colorType === 'hsla') {
    const rgb = from_HSL.to_RGBA(color as string | hslaT | hslT);
    return from_RGB.to_types(rgb);
  }

  // HSV to RGB
  if (colorType === 'hsv' || colorType === 'hsva') {
    const rgb = from_HSV.to_RGBA(color as string | hsvaT | hsvT);
    return from_RGB.to_types(rgb);
  }

  // HWB to RGB
  if (colorType === 'hwb' || colorType === 'hwba') {
    const rgb = from_HWB.to_RGBA(color as string | hwbaT | hwbT);
    return from_RGB.to_types(rgb);
  }

  // RGB to normalized RGB
  if (colorType === 'rgb' || colorType === 'rgba') {
    const rgba =
      typeof color === 'string' ? from_RGB.string_to_object(color) : from_RGB.to_normalized_object(color as rgbaT | rgbT);
    return from_RGB.to_types(rgba);
  }

  // ! error
  console.error(
    '[colorKit.RGB] An error occurred while attempting to convert the provided parameter into an `RGB` color. As a result, the default color "black" will be used instead.'
  );

  return from_RGB.to_types({ r: 0, g: 0, b: 0, a: 1 });
}

/** - Convert `HEX`, `HSV`, `HWB`, or `RGB` color to the `HSL` color format. */
export function HSL(color: SupportedColorFormats) {
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to HSL
  if (colorType?.includes('hex')) {
    const hsla = from_HEX.to_HSLA(color as string);
    return from_HSL.to_types(hsla);
  }

  // RGB to HSL
  if (colorType === 'rgb' || colorType === 'rgba') {
    const hsla = from_RGB.to_HSLA(color as string | rgbaT | rgbT);
    return from_HSL.to_types(hsla);
  }

  // HSV to HSL
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hsla = from_HSV.to_HSLA(color as string | hsvaT | hsvT);
    return from_HSL.to_types(hsla);
  }

  // HWB to HSL
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hsla = from_HWB.to_HSLA(color as string | hwbaT | hwbT);
    return from_HSL.to_types(hsla);
  }

  // HSL to normalized HSL
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hsla =
      typeof color === 'string' ? from_HSL.string_to_object(color) : from_HSL.to_normalized_object(color as hslaT | hslT);
    return from_HSL.to_types(hsla);
  }

  // ! error
  console.error(
    '[colorKit.HSL] An error occurred while attempting to convert the provided parameter into an `HSL` color. As a result, the default color "black" will be used instead.'
  );

  return from_HSL.to_types({ h: 0, s: 0, l: 0, a: 1 });
}

/** - Convert `HSL`, `HEX`, `HSV`, or `RGB` color to the `HWB` color format. */
export function HWB(color: SupportedColorFormats) {
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to HWB
  if (colorType?.includes('hex')) {
    const hwba = from_HEX.to_HWBA(color as string);
    return from_HWB.to_types(hwba);
  }

  // RGB to HWB
  if (colorType === 'rgb' || colorType === 'rgba') {
    const hwba = from_RGB.to_HWBA(color as string | rgbaT | rgbT);
    return from_HWB.to_types(hwba);
  }

  // HSL to HWB
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hwba = from_HSL.to_HWBA(color as string | hslaT | hslT);
    return from_HWB.to_types(hwba);
  }

  // HSV to HWB
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hwba = from_HSV.to_HWBA(color as string | hsvaT | hsvT);
    return from_HWB.to_types(hwba);
  }

  // HWB to normalized HWB
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hwba =
      typeof color === 'string' ? from_HWB.string_to_object(color) : from_HWB.to_normalized_object(color as hwbaT | hwbT);
    return from_HWB.to_types(hwba);
  }

  // ! error
  console.error(
    '[colorKit.HWB] An error occurred while attempting to convert the provided parameter into an `HWB` color. As a result, the default color "black" will be used instead.'
  );

  return from_HWB.to_types({ h: 0, w: 0, b: 100, a: 1 });
}

/** - Convert `HSL`, `HEX`, `HWB`, or `RGB` color to the `HSV` color format. */
export function HSV(color: SupportedColorFormats) {
  // named color
  if (typeof color === 'string') {
    color = color.trim().toLowerCase();

    if (namedColors.hasOwnProperty(color)) {
      color = namedColors[color as keyof typeof namedColors] as string;
    }
  }

  const colorType = detectColorFormat(color);

  // HEX to HSV
  if (colorType?.includes('hex')) {
    const hsva = from_HEX.to_HSVA(color as string);
    return from_HSV.to_types(hsva);
  }

  // RGB to HSV
  if (colorType === 'rgb' || colorType === 'rgba') {
    const hsva = from_RGB.to_HSVA(color as string | rgbaT | rgbT);
    return from_HSV.to_types(hsva);
  }

  // HSL to HSV
  if (colorType === 'hsl' || colorType === 'hsla') {
    const hsva = from_HSL.to_HSVA(color as string | hslaT | hslT);
    return from_HSV.to_types(hsva);
  }

  // HWB to HSV
  if (colorType === 'hwb' || colorType === 'hwba') {
    const hsva = from_HWB.to_HSVA(color as string | hwbaT | hwbT);
    return from_HSV.to_types(hsva);
  }

  // HSV to normalized HSV
  if (colorType === 'hsv' || colorType === 'hsva') {
    const hsva =
      typeof color === 'string' ? from_HSV.string_to_object(color) : from_HSV.to_normalized_object(color as hsvaT | hsvT);
    return from_HSV.to_types(hsva);
  }

  // ! error
  console.error(
    '[colorKit.HSV] An error occurred while attempting to convert the provided parameter into an `HSV` color. As a result, the default color "black" will be used instead.'
  );

  return from_HSV.to_types({ h: 0, s: 0, v: 0, a: 1 });
}
