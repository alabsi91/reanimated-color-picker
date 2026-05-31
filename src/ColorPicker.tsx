import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { PickerContextProvider } from '@context';
import { isWeb } from '@utils';

import type { ColorPickerContext, ColorPickerProps, ColorPickerRef } from '@types';
import type { SupportedColorFormats } from './colorKit/types';

// @ts-expect-error no global
if (isWeb && !global.setImmediate) {
  // @ts-expect-error no global
  global.setImmediate = setTimeout;
}

function ColorPickerWrapper(props: ColorPickerProps, ref: React.ForwardedRef<ColorPickerRef>) {
  const {
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
    colorAnnouncementFormat = 'rgb',
    enableColorAnnouncements = true,
    onChange,
    onChangeJS,
    onComplete,
    onCompleteJS,
    style = {},
    children = <Text>NO CHILDREN</Text>,
  } = props;

  const initialColor = useRef(colorKit.HSV(value).object(false)).current;
  const hueValue = useSharedValue(initialColor.h);
  const saturationValue = useSharedValue(initialColor.s);
  const brightnessValue = useSharedValue(initialColor.v);
  const alphaValue = useSharedValue(initialColor.a);

  /**
   * Returns lazy getters for the provided color in multiple formats.
   *
   * @worklet
   */
  const colorResult = (inputColor?: SupportedColorFormats) => {
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

  const announceColor = (color: string) => {
    AccessibilityInfo.announceForAccessibility(color);
  };

  /** @worklet */
  const onGestureEnd = (color?: SupportedColorFormats) => {
    'worklet';

    const colorObject = colorResult(color);

    if (enableColorAnnouncements && colorAnnouncementFormat in colorObject) {
      runOnJS(announceColor)(colorObject[colorAnnouncementFormat]);
    }

    if (onComplete) {
      onComplete(colorObject);
    }

    if (onCompleteJS) {
      runOnJS(onCompleteJS)(colorObject);
    }
  };

  /** @worklet */
  const onGestureChange = (color?: SupportedColorFormats) => {
    'worklet';

    if (!onChange && !onChangeJS) {
      return;
    }

    const colorObject = colorResult(color);

    if (onChange) {
      onChange(colorObject);
    }

    if (onChangeJS) {
      runOnJS(onChangeJS)(colorObject);
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
    const currentColors = colorResult();

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

    colorResult,
    onGestureEnd,
    onGestureChange,
  };

  return (
    <GestureHandlerRootView style={[{ direction: isWeb ? 'ltr' : undefined }, style]}>
      <PickerContextProvider value={ctxValue}>{children}</PickerContextProvider>
    </GestureHandlerRootView>
  );
}

/** @see [ColorPicker](https://alabsi91.github.io/reanimated-color-picker/api/color-picker-wrapper/) */
const ColorPicker = forwardRef<ColorPickerRef, ColorPickerProps>(ColorPickerWrapper);

export default ColorPicker;
