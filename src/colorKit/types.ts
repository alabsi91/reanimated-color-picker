import type namedColors from './namedColors';

export type ColorFormats = 'hex3' | 'hex4' | 'hex6' | 'hex8' | 'hsl' | 'hsla' | 'rgb' | 'rgba' | 'hsva' | 'hsv' | 'hwba' | 'hwb';

export type ColorString = keyof typeof namedColors | string;

export type rgbaT = { r: number; g: number; b: number; a: number };
export type rgbT = Omit<rgbaT, 'a'>;

export type hslaT = { h: number; s: number; l: number; a: number };
export type hslT = Omit<hslaT, 'a'>;

export type hsvaT = { h: number; s: number; v: number; a: number };
export type hsvT = Omit<hsvaT, 'a'>;

export type hwbaT = { h: number; w: number; b: number; a: number };
export type hwbT = Omit<hwbaT, 'a'>;

export type SupportedColorFormats = ColorString | rgbaT | rgbT | hslaT | hslT | hsvaT | hsvT | hwbaT | hwbT | number;

export type colorTypes<T extends {}> = {
  object: () => T;
  string: (alpha?: boolean) => string;
  array: () => number[];
};

export type ConversionMethods = {
  hex: () => string;
  rgb: () => colorTypes<rgbaT>;
  hsl: () => colorTypes<hslaT>;
  hsv: () => colorTypes<hsvaT>;
  hwb: () => colorTypes<hwbaT>;
};
