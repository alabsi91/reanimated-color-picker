import React from 'react';
import { I18nManager, Platform, StyleSheet } from 'react-native';
import { reanimatedVersion } from 'react-native-reanimated';

import type { StyleProp, ViewStyle } from 'react-native';

export const isRtl = I18nManager.isRTL;
export const isWeb = Platform.OS === 'web';

const [reanimatedMajorVersion, reanimatedMinorVersion] = (reanimatedVersion ?? '0.0').split('.').map(Number);

/** Reanimated animates `backgroundImage` from version 4.7. */
export const isLinearGradientSupported =
  isWeb || reanimatedMajorVersion > 4 || (reanimatedMajorVersion === 4 && reanimatedMinorVersion >= 7);

// React Native 0.87 adds `backgroundImage` as the stable name of `experimental_backgroundImage`
const reactNativeVersion = isWeb ? undefined : Platform.constants.reactNativeVersion;
const isBackgroundImageStable = !!reactNativeVersion && (reactNativeVersion.major > 0 || reactNativeVersion.minor >= 87);

/**
 * Reanimated ignores the dependency array on native (the Babel plugin collects the closure) and warns about it since 4.6. Old
 * Reanimated versions still need it on web.
 */
export function getWebDependencies(dependencies: Array<unknown>): Array<unknown> | undefined {
  return isWeb ? dependencies : undefined;
}

/** Get a specific property from a React Native style object */
export function getStyle<T extends ViewStyle, K extends keyof T>(style: StyleProp<T>, property: K): T[K] | undefined {
  if (!style) {
    return undefined;
  }

  const flattened = StyleSheet.flatten(style) as T;
  return flattened[property];
}

/**
 * Clamp a number value between `0` and a max value.
 *
 * @worklet
 */
export const clamp = (v: number, max: number) => {
  'worklet';

  return Math.min(Math.max(v, 0), max);
};

/**
 * Convert an `HSVA` color to an `HSLA` string representation.
 *
 * @worklet
 */
export const HSVA2HSLA_string = (h: number, s: number, v: number, a = 1) => {
  'worklet';

  a = +a.toFixed(2);
  s = s / 100;
  v = v / 100;

  const l = ((2 - s) * v) / 2;
  const sl = s * v;
  const sln = l !== 0 && l !== 1 ? sl / (l < 0.5 ? l * 2 : 2 - l * 2) : sl;

  return `hsla(${h.toFixed(3)}, ${(sln * 100).toFixed(3)}%, ${(l * 100).toFixed(3)}%, ${a})`;
};

export const hueSpectrumColorStops = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'];

/**
 * Create a CSS linear gradient. The angle is physical and does not flip in RTL.
 *
 * @worklet
 */
export const createLinearGradient = (angle: number, colorStops: string[]) => {
  'worklet';

  return `linear-gradient(${angle}deg, ${colorStops.join(', ')})`;
};

/**
 * Create a style that paints linear gradients as one background. The first gradient is on top.
 *
 * @worklet
 */
export const createBackgroundImageStyle = (linearGradients: string[]) => {
  'worklet';

  const backgroundImage = linearGradients.join(', ');

  if (isWeb) {
    return { background: backgroundImage };
  }

  return isBackgroundImageStable ? { backgroundImage } : { experimental_backgroundImage: backgroundImage };
};

/**
 * Create a style that paints a linear gradient along a slider, from its minimum value to its maximum value.
 *
 * @worklet
 */
export const createSliderGradientStyle = (colorStops: string[], vertical: boolean, reverse: boolean) => {
  'worklet';

  const angle = vertical ? (reverse ? 0 : 180) : reverse ? 270 : 90;
  return createBackgroundImageStyle([createLinearGradient(angle, colorStops)]);
};

/** Render children only if the `if` property is `true` */
export function ConditionalRendering(props: { children: React.ReactNode; if: boolean }) {
  if (!props.if) {
    return null;
  }

  return <>{props.children}</>;
}

/** Render children for native platforms only (Android, iOS) */
export function RenderNativeOnly({ children }: { children: React.ReactNode }) {
  if (isWeb) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Enable Android hardware texture rendering for Android Nougat (API 24) to Pie (API 28) to address an issue when applying a
 * transform to a View with a border radius > 0.
 *
 * See: https://github.com/facebook/react-native/issues/18266
 */
export const enableAndroidHardwareTextures = Platform.OS === 'android' && Platform.Version >= 24 && Platform.Version <= 28;
