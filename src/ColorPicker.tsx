import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { PickerContextProvider } from '@context';
import { isWeb } from '@utils';

import type { ColorPickerContext, ColorPickerProps, ColorPickerRef } from '@types';
import type { SupportedColorFormats } from './colorKit/types';

if (isWeb) {
  // @ts-expect-error no global
  if (!global.setImmediate) global.setImmediate = setTimeout;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
      thumbScaleAnimationValue = 1.2,
      thumbScaleAnimationDuration = 100,
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
    ref,
  ) => {
    const initialColor = useRef(colorKit.HSV(value).object(false)).current;
    // color's channels values.
    const hueValue = useSharedValue(initialColor.h);
    const saturationValue = useSharedValue(initialColor.s);
    const brightnessValue = useSharedValue(initialColor.v);
    const alphaValue = useSharedValue(initialColor.a);

    const returnedResults = (inputColor?: SupportedColorFormats) => {
      'worklet';

      const color = inputColor ?? {
        h: hueValue.value,
        s: saturationValue.value,
        v: brightnessValue.value,
        a: alphaValue.value,
      };

      return {
        get hex() {
          return colorKit.runOnUI().HEX(color);
        },
        get rgb() {
          return colorKit.runOnUI().RGB(color).string(false);
        },
        get rgba() {
          return colorKit.runOnUI().RGB(color).string(true);
        },
        get hsl() {
          return colorKit.runOnUI().HSL(color).string(false);
        },
        get hsla() {
          return colorKit.runOnUI().HSL(color).string(true);
        },
        get hsv() {
          return colorKit.runOnUI().HSV(color).string(false);
        },
        get hsva() {
          return colorKit.runOnUI().HSV(color).string(true);
        },
        get hwb() {
          return colorKit.runOnUI().HWB(color).string(false);
        },
        get hwba() {
          return colorKit.runOnUI().HWB(color).string(true);
        },
      };
    };

    const onGestureEnd = (color?: SupportedColorFormats) => {
      'worklet';

      if (!onComplete) return;
      const colorObject = returnedResults(color);

      try {
        // run on the UI thread
        onComplete(colorObject);
      } catch (error) {
        // run on the JS thread
        runOnJS(onComplete)(colorObject);
      }
    };

    const onGestureChange = (color?: SupportedColorFormats) => {
      'worklet';

      if (!onChange) return;
      const colorObject = returnedResults(color);

      try {
        // run on the UI thread
        onChange(colorObject);
      } catch (error) {
        // run on the JS thread
        runOnJS(onChange)(colorObject);
      }
    };

    const setColor = (color: SupportedColorFormats, duration = thumbAnimationDuration) => {
      const { h, s, v, a } = colorKit.HSV(color).object(false);

      hueValue.value = withTiming(h, { duration });
      saturationValue.value = withTiming(s, { duration });
      brightnessValue.value = withTiming(v, { duration });
      alphaValue.value = withTiming(a, { duration });
    };

    useEffect(() => {
      // Ignore value changes if the current color already matches the new color from the value props.
      const newColorFormat = colorKit.getFormat(value);
      const currentColors = returnedResults();

      // null or named color E.g "red"
      if (!newColorFormat || newColorFormat === 'named') {
        setColor(value);
        return;
      }

      // hex color
      if (newColorFormat === 'hex3' || newColorFormat === 'hex4' || newColorFormat === 'hex6' || newColorFormat === 'hex8') {
        if (value !== currentColors.hex) setColor(value);
        return;
      }

      // hsl | hsla | rgb | rgba | hsva | hsv | hwba | hwb
      if (newColorFormat in currentColors) {
        if (value !== currentColors[newColorFormat]) setColor(value);
        return;
      }

      setColor(value);
    }, [value]);

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
      thumbScaleAnimationValue,
      thumbScaleAnimationDuration,

      value,
      setColor,

      returnedResults,
      onGestureEnd,
      onGestureChange,
    };

    return (
      <GestureHandlerRootView style={[{ direction: isWeb ? 'ltr' : undefined }, style]}>
        <PickerContextProvider value={ctxValue}>{children}</PickerContextProvider>
      </GestureHandlerRootView>
    );
  },
);

export default ColorPicker;
