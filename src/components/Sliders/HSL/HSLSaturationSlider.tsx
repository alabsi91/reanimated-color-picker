import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
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

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const boundedThumb = props.boundedThumb ?? ctx.boundedThumb;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};
  const thumbScaleAnimationValue = props.thumbScaleAnimationValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleAnimationDuration ?? ctx.thumbScaleAnimationDuration;
  const adaptSpectrum = false;
  const sliderThickness = props.sliderThickness ?? ctx.sliderThickness;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const getWidth = getStyle(style, 'width');
  const getHeight = getStyle(style, 'height');

  const containerRef = useRef<Animated.View>(null);
  const width = useSharedValue(vertical ? sliderThickness : typeof getWidth === 'number' ? getWidth : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof getHeight === 'number' ? getHeight : 0);
  const handleScale = useSharedValue(1);
  const lastHslSaturationValue = useSharedValue(0);

  // We need to keep track of the HSL saturation value because, when the luminance is 0 or 100,
  // when converting to/from HSV, the previous saturation value will be lost.
  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);

    if (l === 100 || l === 0) {
      return {
        h,
        s: lastHslSaturationValue.value,
        l,
      };
    }

    lastHslSaturationValue.value = s;

    return {
      h,
      s,
      l,
    };
  }, [hueValue, saturationValue, brightnessValue]);

  const handleStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const percent = (hsl.value.s / 100) * length;
    const pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2);
    const posY = vertical ? pos : height.value / 2 - thumbSize / 2;
    const posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [width, height, hsl, handleScale]);

  const activeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `hsl(${hsl.value.h}, 100%, 50%)`,
    };
  }, [hueValue]);

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
  }, [adaptSpectrum, brightnessValue]);

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

    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const pos = clamp((vertical ? y : x) - (boundedThumb ? thumbSize / 2 : 0), length);
    const value = (pos / length) * 100;
    const newSaturationValue = reverse ? 100 - value : value;

    if (newSaturationValue === hsl.value.s) return;

    // To prevent locking this slider when the luminance is 0 or 100,
    // this should not affect the resulting color, as the value will be rounded.
    const l = hsl.value.l === 0 ? 0.01 : hsl.value.l === 100 ? 99.99 : hsl.value.l;

    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: newSaturationValue, l }).object(false);

    saturationValue.value = s;
    brightnessValue.value = v;

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

  // useLayoutEffect → paint → onLayout
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, layoutWidth, layoutHeight) => {
      if (!vertical && layoutWidth) {
        width.value = layoutWidth;
      }

      if (vertical && layoutHeight) {
        height.value = layoutHeight;
      }
    });
  }, []);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!vertical && layout.width) {
      width.value = layout.width;
    }

    if (vertical && layout.height) {
      height.value = layout.height;
    }
  };

  const thicknessStyle = vertical ? { width: sliderThickness } : { height: sliderThickness };

  const getAdaptiveColor = (hsva: { h: number; s: number; v: number; a: number }) => {
    'worklet';

    if (adaptSpectrum) {
      return hsva;
    }

    const { h, s } = colorKit.runOnUI().HSL(hsva).object();
    return { h, s, l: 50 };
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={[style, { position: 'relative', borderRadius, borderWidth: 0, padding: 0 }, thicknessStyle, activeColorStyle]}
      >
        <View style={{ flex: 1, borderRadius, overflow: 'hidden' }}>
          <Animated.Image source={require('@assets/blackGradient.png')} style={imageStyle} tintColor='#888' />
        </View>

        <ConditionalRendering if={adaptSpectrum}>
          <Animated.View style={[{ borderRadius }, activeBrightnessStyle, StyleSheet.absoluteFill]} />
        </ConditionalRendering>

        <Thumb
          thumbShape={thumbShape}
          thumbSize={thumbSize}
          thumbColor={thumbColor}
          renderThumb={renderThumb}
          innerStyle={thumbInnerStyle}
          handleStyle={handleStyle}
          style={thumbStyle}
          vertical={vertical}
          getAdaptiveColor={getAdaptiveColor}
        />
      </Animated.View>
    </GestureDetector>
  );
}
