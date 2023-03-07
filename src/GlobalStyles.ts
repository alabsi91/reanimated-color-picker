import { createContext } from 'react';
import { I18nManager, StyleSheet } from 'react-native';

import type { TCTX } from './types';
import type { StyleProp, ViewStyle } from 'react-native';

const isRtl = I18nManager.isRTL;

export const CTX = createContext<TCTX>(null!);

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

export default StyleSheet.create({
  panel_container: {
    position: 'relative',
    alignSelf: 'stretch',
    borderRadius: 5,
  },
  panel_image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  handle: {
    position: 'absolute',
    ...(isRtl ? { right: 0 } : { left: 0 }),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleInner: {
    width: '75%',
    height: '75%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
