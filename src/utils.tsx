import React from 'react';
import { StyleSheet, I18nManager, Platform } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

/** - Get a specific property from a react native style object */
export function getStyle<T extends keyof ViewStyle>(style: StyleProp<ViewStyle>, property: T): ViewStyle[T] | undefined {
  const flattened = StyleSheet.flatten(style);
  return flattened[property];
}

/** - Clamp a number value between `0` and a max value */
export function clamp(v: number, max: number) {
  'worklet';
  return Math.min(Math.max(v, 0), max);
}

/** - Convert `HSV` color to an `HSLA` string representation */
export function HSVA2HSLA(h: number, s: number, v: number, a = 1) {
  'worklet';

  s = s / 100;
  v = v / 100;

  const l = ((2 - s) * v) / 2,
    sl = s * v,
    sln = l !== 0 && l !== 1 ? sl / (l < 0.5 ? l * 2 : 2 - l * 2) : sl;

  return `hsla(${h}, ${sln * 100}%, ${l * 100}%, ${a})`;
}

/** - Convert `HSV` color to an `RGBA` object representation */
export function HSVA2RGBA(h: number, s: number, v: number, a = 1) {
  'worklet';

  h = h / 360;
  s = s / 100;
  v = v / 100;

  const i = Math.floor(h * 6),
    f = h * 6 - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s);

  let r = 0,
    g = 0,
    b = 0;
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: clamp(r * 255, 255),
    g: clamp(g * 255, 255),
    b: clamp(b * 255, 255),
    a: clamp(a, 1),
  };
}

/** - Convert `RGBA` color to an `HSVA`  object representation */
export function RGBA2HSVA(r: number, g: number, b: number, a = 1) {
  'worklet';

  r = r / 255;
  g = g / 255;
  b = b / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min;

  let v = max,
    h = 0,
    s = max === 0 ? 0 : d / max;

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
    h: clamp(h * 360, 360),
    s: clamp(s * 100, 100),
    v: clamp(v * 100, 100),
    a: clamp(a, 1),
  };
}

/** - Render children only if the `render` property is `true` */
export function ConditionalRendering({ children, render }: { children: React.ReactNode; render: boolean }) {
  if (!render) return null;
  return <>{children}</>;
}

/** - Render children for native platforms only (Android, IOS) */
export function RenderNativeOnly({ children }: { children: React.ReactNode }) {
  if (isWeb) return null;
  return <>{children}</>;
}

/** - Render children for Web platform only */
export function RenderWebOnly({ children }: { children: React.ReactNode }) {
  if (!isWeb) return null;
  return <>{children}</>;
}

export const isRtl = I18nManager.isRTL;
export const isWeb = Platform.OS === 'web';
