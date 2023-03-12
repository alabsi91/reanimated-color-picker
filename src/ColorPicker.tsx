import React, { createContext, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from './colorKit';

import type { AnyFormat } from './colorKit';
import type { ColorPickerProps, TCTX } from './types';

try {
  const { enableExperimentalWebImplementation } = require('react-native-gesture-handler');
  enableExperimentalWebImplementation(true);
} catch (error) {
  // ignore
}

export const CTX = createContext<TCTX>(null!);

export default function ColorPicker({
  sliderThickness = 25,
  thumbAnimationDuration = 200,
  thumbSize = 35,
  thumbShape = 'ring',
  thumbColor,
  renderThumb,
  thumbStyle,
  thumbInnerStyle,
  value = '#fff',
  onChange,
  onComplete,
  style = {},
  children = <Text>NO CHILDREN</Text>,
}: ColorPickerProps) {
  const initialColor = useRef(colorKit.HSV(value).object()).current;
  // color's channles values.
  const hueValue = useSharedValue(initialColor.h);
  const saturationValue = useSharedValue(initialColor.s);
  const brightnessValue = useSharedValue(initialColor.v);
  const alphaValue = useSharedValue(initialColor.a);

  const returnedResults = (color?: AnyFormat) => {
    color = color ?? {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };
    return {
      hex: colorKit.HEX(color),
      rgb: colorKit.RGB(color).string(false),
      rgba: colorKit.RGB(color).string(true),
      hsl: colorKit.HSL(color).string(false),
      hsla: colorKit.HSL(color).string(true),
      hsv: colorKit.HSV(color).string(false),
      hsva: colorKit.HSV(color).string(true),
      hwb: colorKit.HWB(color).string(false),
      hwba: colorKit.HWB(color).string(true),
    };
  };

  const onGestureEnd = (color?: AnyFormat) => {
    onComplete?.(returnedResults(color));
  };

  const onGestureChange = (color?: AnyFormat) => {
    onChange?.(returnedResults(color));
  };

  const setColor = (color: string) => {
    const { h, s, v, a } = colorKit.HSV(color).object();

    hueValue.value = withTiming(h, { duration: thumbAnimationDuration });
    saturationValue.value = withTiming(s, { duration: thumbAnimationDuration });
    brightnessValue.value = withTiming(v, { duration: thumbAnimationDuration });
    alphaValue.value = withTiming(a, { duration: thumbAnimationDuration });
  };

  useEffect(() => {
    setColor(value);
  }, [value]);

  const ctxValue: TCTX = {
    hueValue,
    saturationValue,
    brightnessValue,
    alphaValue,

    sliderThickness,
    thumbSize,
    thumbShape,
    thumbColor,
    renderThumb,
    thumbStyle,
    thumbInnerStyle,

    value,
    setColor,

    returnedResults,
    onGestureEnd,
    onGestureChange,
  };

  return (
    <GestureHandlerRootView style={[styles.wrapper, style]}>
      <CTX.Provider value={ctxValue}>{children}</CTX.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flex: 1,
  },
});
