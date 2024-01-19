import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import Thumb from '@thumb';
import { clamp, ConditionalRendering, getStyle, isRtl } from '@utils';

import type { SliderProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function HSLSaturationSlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape,
    thumbSize = props.thumbSize ?? ctx.thumbSize,
    thumbColor = props.thumbColor ?? ctx.thumbColor,
    boundedThumb = props.boundedThumb ?? ctx.boundedThumb,
    renderThumb = props.renderThumb ?? ctx.renderThumb,
    thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {},
    thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {},
    adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum,
    sliderThickness = props.sliderThickness ?? ctx.sliderThickness;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5,
    getWidth = getStyle(style, 'width'),
    getHeight = getStyle(style, 'height');

  const width = useSharedValue(vertical ? sliderThickness : typeof getWidth === 'number' ? getWidth : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof getHeight === 'number' ? getHeight : 0);
  const handleScale = useSharedValue(1);
  const lastHslSaturationValue = useSharedValue(0);

  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);
    if (l === 100 || l === 0) return { h, s: lastHslSaturationValue.value, l };
    lastHslSaturationValue.value = s;
    return { h, s, l };
  }, [hueValue, saturationValue, brightnessValue]);

  const handleStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0),
      percent = (hsl.value.s / 100) * length,
      pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2),
      posY = vertical ? pos : height.value / 2 - thumbSize / 2,
      posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return { transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }] };
  }, [width, height, hsl, handleScale]);

  const activeColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: `hsl(${hsl.value.h}, 100%, 50%)` };
  }, [hueValue]);

  const activeBrightnessStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};

    return {
      backgroundColor:
        hsl.value.l < 50 ? `rgba(0, 0, 0, ${1 - hsl.value.l / 50})` : `rgba(255, 255, 255, ${(hsl.value.l - 50) / 50})`,
    };
  }, [adaptSpectrum, brightnessValue]);

  const imageStyle = useAnimatedStyle(() => {
    const imageRotate = vertical ? (reverse ? '270deg' : '90deg') : reverse ? '180deg' : '0deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((reverse && isRtl) || (!reverse && !isRtl) ? 1 : -1);
    return {
      width: vertical ? height.value : '100%',
      height: vertical ? width.value : '100%',
      borderRadius,
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
      value = (pos / length) * 100,
      newSaturationValue = reverse ? 100 - value : value;

    if (newSaturationValue === hsl.value.s) return;

    const l = hsl.value.l === 0 ? 0.01 : hsl.value.l === 100 ? 99.99 : hsl.value.l;
    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: newSaturationValue, l }).object(false);

    saturationValue.value = s;
    brightnessValue.value = v;

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    handleScale.value = withTiming(1.2, { duration: 100 });
    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: 100 });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
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
        style={[{ borderRadius }, style, { position: 'relative', borderWidth: 0, padding: 0 }, thicknessStyle, activeColorStyle]}
      >
        <Animated.Image source={require('@assets/blackGradient.png')} style={[imageStyle, { tintColor: '#888' }]} />

        <ConditionalRendering if={adaptSpectrum}>
          <Animated.View style={[{ borderRadius }, activeBrightnessStyle, StyleSheet.absoluteFillObject]} />
        </ConditionalRendering>

        <Thumb
          channel='s'
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
