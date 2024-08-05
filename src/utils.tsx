import React from 'react';
import { I18nManager, Platform, StyleSheet } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

export const isRtl = I18nManager.isRTL;
export const isWeb = Platform.OS === 'web';

/** - Get a specific property from a react native style object */
export function getStyle<T extends keyof ViewStyle>(style: StyleProp<ViewStyle>, property: T): ViewStyle[T] | undefined {
  const flattened = StyleSheet.flatten(style);
  return flattened[property];
}

/** - Clamp a number value between `0` and a max value */
export const clamp = (v: number, max: number) => {
  'worklet';
  return Math.min(Math.max(v, 0), max);
};

/** - Convert `HSV` color to an `HSLA` string representation */
export const HSVA2HSLA_string = (h: number, s: number, v: number, a = 1) => {
  'worklet';

  s = s / 100;
  v = v / 100;

  const l = ((2 - s) * v) / 2,
    sl = s * v,
    sln = l !== 0 && l !== 1 ? sl / (l < 0.5 ? l * 2 : 2 - l * 2) : sl;

  return `hsla(${h}, ${sln * 100}%, ${l * 100}%, ${a})`;
};

/** - Render children only if the `render` property is `true` */
export function ConditionalRendering(props: { children: React.ReactNode; if: boolean }) {
  if (!props.if) return null;
  return <>{props.children}</>;
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

/**
 * Enable Android hardware texture rendering for Android Nougat(API 24) to Pie(API 28) to address an issue when applying a
 * transform on a View with a border radius > 0.
 *
 * See: https://github.com/facebook/react-native/issues/18266
 */
export const enableAndroidHardwareTextures = Platform.OS === 'android' && Platform.Version >= 24 && Platform.Version <= 28;
