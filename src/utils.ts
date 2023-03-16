import { StyleSheet } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

export function getStyle<T extends keyof ViewStyle>(style: StyleProp<ViewStyle>, property: T): ViewStyle[T] | undefined {
  const flattened = StyleSheet.flatten(style);
  return flattened[property];
}

export function clamp(v: number, max: number) {
  'worklet';
  return Math.min(Math.max(v, 0), max);
}

export function hsva2Hsla(h: number, s: number, v: number, a = 1) {
  'worklet';

  s = s / 100;
  v = v / 100;

  const l = ((2 - s) * v) / 2,
    sl = s * v,
    sln = l !== 0 && l !== 1 ? sl / (l < 0.5 ? l * 2 : 2 - l * 2) : sl;

  return `hsla(${h}, ${sln * 100}%, ${l * 100}%, ${a})`;
}
