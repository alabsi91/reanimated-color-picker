import React, { useContext } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { clamp, getStyle, HSVA2HSLA, isRtl } from '@utils';
import CTX from '@context';
import Thumb from '@thumb';

import type { SliderProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function BrightnessSlider({
  adaptSpectrum: localAdaptSpectrum,
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbColor: localThumbColor,
  boundedThumb: localBoundedThumb,
  renderThumb: localRenderThumb,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  sliderThickness: localSliderThickness,
  style = {},
  vertical = false,
  reverse = false,
}: SliderProps) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    adaptSpectrum: globalAdaptSpectrum,
    thumbSize: globalThumbSize,
    thumbShape: globalThumbShape,
    thumbColor: globalThumbColor,
    boundedThumb: globalBoundedThumb,
    renderThumb: globalRenderThumb,
    thumbStyle: globalThumbStyle,
    thumbInnerStyle: globalThumbInnerStyle,
    sliderThickness: globalSliderThickness,
  } = useContext(CTX);

  const thumbShape = localThumbShape ?? globalThumbShape,
    thumbSize = localThumbSize ?? globalThumbSize,
    thumbColor = localThumbColor ?? globalThumbColor,
    boundedThumb = localBoundedThumb ?? globalBoundedThumb,
    renderThumb = localRenderThumb ?? globalRenderThumb,
    thumbStyle = localThumbStyle ?? globalThumbStyle ?? {},
    thumbInnerStyle = localThumbInnerStyle ?? globalThumbInnerStyle ?? {},
    adaptSpectrum = localAdaptSpectrum ?? globalAdaptSpectrum,
    sliderThickness = localSliderThickness ?? globalSliderThickness;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5,
    getWidth = getStyle(style, 'width'),
    getHeight = getStyle(style, 'height');

  const width = useSharedValue(vertical ? sliderThickness : typeof getWidth === 'number' ? getWidth : 0),
    height = useSharedValue(!vertical ? sliderThickness : typeof getHeight === 'number' ? getHeight : 0);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0),
      percent = (brightnessValue.value / 100) * length,
      pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2),
      posY = vertical ? pos : height.value / 2 - thumbSize / 2,
      posX = vertical ? width.value / 2 - thumbSize / 2 : pos;
    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [localThumbSize, vertical, reverse]);

  const activeColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: HSVA2HSLA(hueValue.value, adaptSpectrum ? saturationValue.value : 100, 100) };
  });

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0),
      pos = clamp((vertical ? y : x) - (boundedThumb ? thumbSize / 2 : 0), length),
      value = Math.round((pos / length) * 100),
      newBrightnessValue = reverse ? 100 - value : value;

    if (brightnessValue.value === newBrightnessValue) return;

    brightnessValue.value = newBrightnessValue;
    runOnJS(onGestureChange)();
  };
  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    handleScale.value = withTiming(1.2, { duration: 100 });
    onGestureUpdate(event);
  };
  const onGestureFinish = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: 100 });
    runOnJS(onGestureEnd)();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Exclusive(pan, tap, longPress);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!vertical) width.value = withTiming(layout.width, { duration: 5 });
    if (vertical) height.value = withTiming(layout.height, { duration: 5 });
  };

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
  }, [vertical, reverse, sliderThickness]);

  const thicknessStyle = vertical ? { width: sliderThickness } : { height: sliderThickness };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[{ borderRadius }, style, { position: 'relative', borderWidth: 0, padding: 0 }, thicknessStyle, activeColorStyle]}
      >
        <Animated.Image source={require('@assets/blackGradient.png')} style={imageStyle} />
        <Thumb
          {...{
            channel: 'v',
            thumbShape,
            thumbSize,
            thumbColor,
            renderThumb,
            handleStyle,
            innerStyle: thumbInnerStyle,
            style: thumbStyle,
            vertical,
            adaptSpectrum,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}
