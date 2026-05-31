import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { SliderCore } from '@sliders/SliderCore';
import Thumb from '@thumb';
import { ConditionalRendering, getStyle, HSVA2HSLA_string, isRtl } from '@utils';

import type { SliderProps } from '@types';

/** @see [HueSlider](https://alabsi91.github.io/reanimated-color-picker/api/sliders/hue/hue-slider/) */
export function HueSlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
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
  const widthStyle = getStyle(style, 'width');
  const heightStyle = getStyle(style, 'height');

  const width = useSharedValue(vertical ? sliderThickness : typeof widthStyle === 'number' ? widthStyle : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof heightStyle === 'number' ? heightStyle : 0);
  const handleScale = useSharedValue(1);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const percent = (hueValue.value / 360) * length;
    const pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2);
    const posY = vertical ? pos : height.value / 2 - thumbSize / 2;
    const posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [width, height, hueValue, handleScale, vertical, reverse, boundedThumb, thumbSize]);

  const activeSaturationStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) {
      return {};
    }

    return {
      backgroundColor: HSVA2HSLA_string(0, 0, brightnessValue.value, 1 - saturationValue.value / 100),
    };
  }, [brightnessValue, saturationValue, adaptSpectrum]);

  const activeBrightnessStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) {
      return {};
    }

    return {
      backgroundColor: HSVA2HSLA_string(0, 0, 0, 1 - brightnessValue.value / 100),
    };
  }, [brightnessValue, adaptSpectrum]);

  const imageStyle = useAnimatedStyle(() => {
    const imageRotate = vertical ? (reverse ? '270deg' : '90deg') : reverse ? '180deg' : '0deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((reverse && isRtl) || (!reverse && !isRtl) ? 1 : -1);

    return {
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

  const onUpdate = (value: number) => {
    'worklet';

    if (hueValue.value === value) {
      return;
    }

    hueValue.value = value;

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

    return { h: hsva.h, s: 100, v: 100 };
  };

  return (
    <SliderCore
      style={[style, { position: 'relative', borderRadius, borderWidth: 0, padding: 0 }]}
      maxValue={360}
      label={props.accessibilityLabel ?? 'Hue Slider'}
      hint={props.accessibilityHint}
      currentValue={hueValue}
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
        <Animated.Image source={require('@assets/Hue.png')} style={imageStyle} />
      </View>

      <ConditionalRendering if={adaptSpectrum}>
        <Animated.View style={[{ borderRadius }, activeBrightnessStyle, StyleSheet.absoluteFill]} aria-hidden />
        <Animated.View style={[{ borderRadius }, activeSaturationStyle, StyleSheet.absoluteFill]} aria-hidden />
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
