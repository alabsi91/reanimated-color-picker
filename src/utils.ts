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

  // both hsv and hsl values are in [0, 100]
  const l = ((2 - s / 100) * v) / 2;

  if (l !== 0) {
    if (l === 100) {
      s = 0;
    } else if (l < 50) {
      s = (s * v) / (l * 2);
    } else {
      s = (s * v) / (200 - l * 2);
    }
  }

  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}
