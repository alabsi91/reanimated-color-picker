import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { SliderCore } from '@sliders/SliderCore';
import Thumb from '@thumb';
import { ConditionalRendering, getStyle, isRtl } from '@utils';

import type { SliderProps } from '@types';

/** @see [HSLSaturationSlider](https://alabsi91.github.io/reanimated-color-picker/api/sliders/hsl/saturation-slider/) */
export function HSLSaturationSlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const boundedThumb = props.boundedThumb ?? ctx.boundedThumb;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};
  const thumbScaleAnimationValue = props.thumbScaleAnimationValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleAnimationDuration ?? ctx.thumbScaleAnimationDuration;
  const adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum;
  const sliderThickness = props.sliderThickness ?? ctx.sliderThickness;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const getWidth = getStyle(style, 'width');
  const getHeight = getStyle(style, 'height');

  const width = useSharedValue(vertical ? sliderThickness : typeof getWidth === 'number' ? getWidth : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof getHeight === 'number' ? getHeight : 0);
  const handleScale = useSharedValue(1);

  // HSL saturation is mathematically undefined (collapses to 0) when luminance is 0 or 100,
  // because those represent pure black and white regardless of saturation.
  // This ref holds the last valid saturation so we can restore it when luminance moves away from the boundary.
  const hslSaturationValue = useSharedValue(0);

  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);

    // At l=0 (black) or l=100 (white), the conversion loses saturation information.
    // Substitute the last known saturation so it's restored when luminance changes.
    if (l === 0 || l === 100) {
      return { h, s: hslSaturationValue.value, l };
    }

    hslSaturationValue.value = s;
    return { h, s, l };
  }, [hueValue, saturationValue, brightnessValue]);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const percent = (hsl.value.s / 100) * length;
    const pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2);
    const posY = vertical ? pos : height.value / 2 - thumbSize / 2;
    const posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [width, height, hsl, handleScale, vertical, reverse, boundedThumb, thumbSize]);

  const activeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `hsl(${hsl.value.h}, 100%, 50%)`,
    };
  }, [hsl]);

  const activeBrightnessStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) {
      return {};
    }

    if (hsl.value.l < 50) {
      return {
        backgroundColor: `rgba(0, 0, 0, ${1 - hsl.value.l / 50})`,
      };
    }

    return {
      backgroundColor: `rgba(255, 255, 255, ${(hsl.value.l - 50) / 50})`,
    };
  }, [hsl, adaptSpectrum]);

  const imageStyle = useAnimatedStyle(() => {
    const imageRotate = vertical ? (reverse ? '270deg' : '90deg') : reverse ? '180deg' : '0deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((reverse && isRtl) || (!reverse && !isRtl) ? 1 : -1);

    return {
      // Width and height are intentionally swapped to correct dimensions after the rotation
      width: vertical ? height.value : '100%',
      height: vertical ? width.value : '100%',
      transform: [
        { rotate: imageRotate },
        { translateX: vertical ? ((height.value - width.value) / 2) * (reverse ? -1 : 1) : 0 },
        { translateY: vertical ? imageTranslateY : 0 },
      ],
    };
  }, [width, height, vertical, reverse]);

  const onBegin = () => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
  };

  const onUpdate = (newValue: number) => {
    'worklet';

    // Converting back from HSL→HSV at l=0 or l=100 would zero out HSV saturation and brightness,
    // locking the slider. Nudging l by ±0.01 keeps the conversion well-behaved without any
    // visible effect on the output color (values are rounded before use).
    const l = hsl.value.l === 0 ? 0.01 : hsl.value.l === 100 ? 99.99 : hsl.value.l;
    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: newValue, l }).object(false);

    if (saturationValue.value === s && brightnessValue.value === v) {
      return;
    }

    saturationValue.value = s;
    brightnessValue.value = v;

    onGestureChange();
  };

  const onEnd = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const getAdaptiveColor = (hsva: { h: number; s: number; v: number; a: number }) => {
    'worklet';

    if (adaptSpectrum) {
      return hsva;
    }

    const { h, s } = hsl.value;
    return { h, s, l: 50 };
  };

  return (
    <SliderCore
      style={[style, { position: 'relative', borderRadius, borderWidth: 0, padding: 0 }, activeColorStyle]}
      label={props.accessibilityLabel ?? 'HSL Saturation Slider'}
      hint={props.accessibilityHint}
      currentValue={hslSaturationValue}
      width={width}
      height={height}
      thumbSize={thumbSize}
      boundedThumb={boundedThumb}
      sliderThickness={sliderThickness}
      gestures={gestures}
      vertical={vertical}
      reverse={reverse}
      onBegin={onBegin}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <View style={{ flex: 1, borderRadius, overflow: 'hidden' }} aria-hidden>
        <Animated.Image source={require('@assets/blackGradient.png')} style={imageStyle} tintColor='#888' />
      </View>

      <ConditionalRendering if={adaptSpectrum}>
        <Animated.View style={[{ borderRadius }, activeBrightnessStyle, StyleSheet.absoluteFill]} aria-hidden />
      </ConditionalRendering>

      <Thumb
        thumbShape={thumbShape}
        thumbSize={thumbSize}
        thumbColor={thumbColor}
        renderThumb={renderThumb}
        innerStyle={thumbInnerStyle}
        thumbAnimatedStyle={thumbAnimatedStyle}
        style={thumbStyle}
        vertical={vertical}
        getAdaptiveColor={getAdaptiveColor}
      />
    </SliderCore>
  );
}
