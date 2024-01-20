import React from 'react';
import { Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl } from '@utils';

import type { SliderProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function LuminanceSlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
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

  // We need to keep track of the HSL saturation value because, when the luminance is 0 or 100,
  // when converting to/from HSV, the previous saturation value will be lost.
  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);
    if (l === 100 || l === 0) return { h, s: lastHslSaturationValue.value, l };
    lastHslSaturationValue.value = s;
    return { h, s, l };
  }, [hueValue, saturationValue, brightnessValue]);

  const handleStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0),
      percent = (hsl.value.l / 100) * length,
      pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2),
      posY = vertical ? pos : height.value / 2 - thumbSize / 2,
      posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return { transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }] };
  }, [height, width, hsl, handleScale]);

  const activeColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: `hsl(${hsl.value.h}, ${adaptSpectrum ? hsl.value.s : 100}%, ${50}%)` };
  }, [hueValue, saturationValue]);

  const imageStyle = useAnimatedStyle(() => {
    const imageRotate = vertical ? (reverse ? '90deg' : '270deg') : reverse ? '0deg' : '180deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((!reverse && isRtl) || (reverse && !isRtl) ? 1 : -1);

    return {
      width: vertical ? height.value : '100%',
      height: vertical ? width.value : '100%',
      borderRadius,
      transform: [
        { rotate: imageRotate },
        { translateX: vertical ? ((height.value - width.value) / 2) * (reverse ? 1 : -1) : 0 },
        { translateY: vertical ? imageTranslateY : 0 },
      ],
    };
  }, [height, width]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0),
      pos = clamp((vertical ? y : x) - (boundedThumb ? thumbSize / 2 : 0), length),
      value = (pos / length) * 100,
      newLuminanceValue = reverse ? 100 - value : value;

    if (newLuminanceValue === hsl.value.l) return;

    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: hsl.value.s, l: newLuminanceValue }).object(false);

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
        <Animated.View style={[styles.panel_image, imageStyle, { borderRadius, flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <Image source={require('@assets/blackGradient.png')} style={{ flex: 1, tintColor: '#fff' }} resizeMode='stretch' />
          <Image
            source={require('@assets/blackGradient.png')}
            style={{ flex: 1, transform: [{ scaleX: -1 }] }}
            resizeMode='stretch'
          />
        </Animated.View>

        <Thumb
          channel='v'
          thumbShape={thumbShape}
          thumbSize={thumbSize}
          thumbColor={thumbColor}
          renderThumb={renderThumb}
          innerStyle={thumbInnerStyle}
          handleStyle={handleStyle}
          style={thumbStyle}
          vertical={vertical}
        />
      </Animated.View>
    </GestureDetector>
  );
}
