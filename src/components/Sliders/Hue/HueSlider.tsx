import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import Thumb from '@thumb';
import { clamp, ConditionalRendering, getStyle, HSVA2HSLA_string, isRtl } from '@utils';

import type { SliderProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function HueSlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape,
    thumbSize = props.thumbSize ?? ctx.thumbSize,
    thumbColor = props.thumbColor ?? ctx.thumbColor,
    boundedThumb = props.boundedThumb ?? ctx.boundedThumb,
    renderThumb = props.renderThumb ?? ctx.renderThumb,
    thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {},
    thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {},
    thumbScaleAnimationValue = props.thumbScaleAnimationValue ?? ctx.thumbScaleAnimationValue,
    thumbScaleAnimationDuration = props.thumbScaleAnimationDuration ?? ctx.thumbScaleAnimationDuration,
    adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum,
    sliderThickness = props.sliderThickness ?? ctx.sliderThickness;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5,
    getWidth = getStyle(style, 'width'),
    getHeight = getStyle(style, 'height');

  const width = useSharedValue(vertical ? sliderThickness : typeof getWidth === 'number' ? getWidth : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof getHeight === 'number' ? getHeight : 0);
  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0),
      percent = (hueValue.value / 360) * length,
      pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2),
      posY = vertical ? pos : height.value / 2 - thumbSize / 2,
      posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return { transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }] };
  }, [width, height, hueValue, handleScale]);

  const activeSaturationStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};

    return { backgroundColor: HSVA2HSLA_string(0, 0, brightnessValue.value, 1 - saturationValue.value / 100) };
  }, [brightnessValue, saturationValue]);

  const activeBrightnessStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};

    return { backgroundColor: HSVA2HSLA_string(0, 0, 0, 1 - brightnessValue.value / 100) };
  }, [brightnessValue]);

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
  }, [width, height]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0),
      pos = clamp((vertical ? y : x) - (boundedThumb ? thumbSize / 2 : 0), length),
      value = (pos / length) * 360,
      newHueValue = reverse ? 360 - value : value;

    if (hueValue.value === newHueValue) return;

    hueValue.value = newHueValue;

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onEnd(onGestureFinish);
  const longPress = Gesture.LongPress().onEnd(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!vertical) width.value = withTiming(layout.width, { duration: 5 });
    if (vertical) height.value = withTiming(layout.height, { duration: 5 });
  };

  const thicknessStyle = vertical ? { width: sliderThickness } : { height: sliderThickness };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[style, thicknessStyle, { position: 'relative', borderRadius, borderWidth: 0, padding: 0 }]}
      >
        <View style={{ flex: 1, borderRadius, overflow: 'hidden' }}>
          <Animated.Image source={require('@assets/Hue.png')} style={imageStyle} />
        </View>

        <ConditionalRendering if={adaptSpectrum}>
          <Animated.View style={[{ borderRadius }, activeBrightnessStyle, StyleSheet.absoluteFillObject]} />
          <Animated.View style={[{ borderRadius }, activeSaturationStyle, StyleSheet.absoluteFillObject]} />
        </ConditionalRendering>

        <Thumb
          channel='h'
          thumbShape={thumbShape}
          thumbSize={thumbSize}
          thumbColor={thumbColor}
          renderThumb={renderThumb}
          innerStyle={thumbInnerStyle}
          handleStyle={handleStyle}
          style={thumbStyle}
          adaptSpectrum={adaptSpectrum}
          vertical={vertical}
        />
      </Animated.View>
    </GestureDetector>
  );
}
