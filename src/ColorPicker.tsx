import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import pickerContext from '@context';
import { isWeb } from '@utils';

import type { ColorPickerContext, ColorPickerProps, ColorPickerRef } from '@types';
import type { SupportedColorFormats } from './colorKit/types';

if (isWeb) {
  // @ts-ignore
  if (!global.setImmediate) global.setImmediate = setTimeout;
  try {
    const { enableExperimentalWebImplementation } = require('react-native-gesture-handler');
    enableExperimentalWebImplementation(true);
  } catch (error) {
    // ignore
  }
}

const ColorPicker = forwardRef<ColorPickerRef, ColorPickerProps>(
  (
    {
      adaptSpectrum = false,
      sliderThickness = 25,
      thumbAnimationDuration = 200,
      thumbSize = 35,
      thumbShape = 'ring',
      boundedThumb = false,
      thumbColor,
      renderThumb,
      thumbStyle,
      thumbInnerStyle,
      value = '#fff',
      onChange,
      onComplete,
      style = {},
      children = <Text>NO CHILDREN</Text>,
    },
    ref
  ) => {
    const initialColor = useRef(colorKit.HSV(value).object()).current;
    // color's channels values.
    const hueValue = useSharedValue(initialColor.h);
    const saturationValue = useSharedValue(initialColor.s);
    const brightnessValue = useSharedValue(initialColor.v);
    const alphaValue = useSharedValue(initialColor.a);

    const returnedResults = (color?: SupportedColorFormats) => {
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

    const onGestureEnd = (color?: SupportedColorFormats) => {
      onComplete?.(returnedResults(color));
    };

    const onGestureChange = (color?: SupportedColorFormats) => {
      onChange?.(returnedResults(color));
    };

    const setColor = (color: string, duration = thumbAnimationDuration) => {
      const { h, s, v, a } = colorKit.HSV(color).object();

      hueValue.value = withTiming(h, { duration });
      saturationValue.value = withTiming(s, { duration });
      brightnessValue.value = withTiming(v, { duration });
      alphaValue.value = withTiming(a, { duration });
    };

    useEffect(() => {
      setColor(value);
    }, [value]);

    // Addressing a sporadic problem where the shared value for color channels fails to update upon component mounting.
    // This issue appears to manifest randomly and might be correlated with the Reanimated library.
    useEffect(() => {
      hueValue.value += 1;
      saturationValue.value += 1;
      brightnessValue.value += 1;
      setColor(value, 100);
    }, []);

    useImperativeHandle(ref, () => ({ setColor }));

    const ctxValue: ColorPickerContext = {
      hueValue,
      saturationValue,
      brightnessValue,
      alphaValue,

      adaptSpectrum,

      sliderThickness,
      thumbSize,
      thumbShape,
      boundedThumb,
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
      <GestureHandlerRootView style={[{ direction: isWeb ? 'ltr' : undefined }, style]}>
        <pickerContext.Provider value={ctxValue}>{children}</pickerContext.Provider>
      </GestureHandlerRootView>
    );
  }
);

export default ColorPicker;
