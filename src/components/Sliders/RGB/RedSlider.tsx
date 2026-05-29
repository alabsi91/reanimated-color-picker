import React, { useLayoutEffect, useRef } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl, isWeb, RenderNativeOnly } from '@utils';

import type { SliderProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function RedSlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
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

  const containerRef = useRef<Animated.View>(null);
  const width = useSharedValue(vertical ? sliderThickness : typeof widthStyle === 'number' ? widthStyle : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof heightStyle === 'number' ? heightStyle : 0);
  const handleScale = useSharedValue(1);

  const rgb = useDerivedValue(() => {
    return colorKit.runOnUI().RGB({ h: hueValue.value, s: saturationValue.value, v: brightnessValue.value }).object(false);
  }, [hueValue, saturationValue, brightnessValue]);

  const handleStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const percent = (rgb.value.r / 255) * length;
    const pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2);
    const posY = vertical ? pos : height.value / 2 - thumbSize / 2;
    const posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [rgb, width, height, handleScale, vertical, reverse, boundedThumb, thumbSize]);

  const imageStyle = useAnimatedStyle(() => {
    if (isWeb) {
      return {};
    }

    const imageRotate = vertical ? (reverse ? '90deg' : '270deg') : reverse ? '0deg' : '180deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((reverse && isRtl) || (!reverse && !isRtl) ? -1 : 1);
    const tintColor = adaptSpectrum ? `rgb(255, ${Math.round(rgb.value.g)}, ${Math.round(rgb.value.b)})` : 'rgb(255, 0, 0)';

    return {
      tintColor,
      width: vertical ? height.value : '100%',
      height: vertical ? width.value : '100%',
      transform: [
        { rotate: imageRotate },
        { translateX: vertical ? ((height.value - width.value) / 2) * (reverse ? 1 : -1) : 0 },
        { translateY: vertical ? imageTranslateY : 0 },
      ],
    };
  }, [rgb, width, height, adaptSpectrum, vertical, reverse]);

  const sliderBackground = useAnimatedStyle(() => {
    const g = Math.round(rgb.value.g);
    const b = Math.round(rgb.value.b);

    if (isWeb) {
      const deg = vertical ? (reverse ? 180 : 0) : reverse ? 90 : 270;
      return {
        background: adaptSpectrum
          ? `linear-gradient(${deg}deg, rgb(255, ${g}, ${b}) 0%, rgb(0, ${g}, ${b}) 100%)`
          : 'linear-gradient(180deg, rgb(255, 0, 0) 0%, rgb(0, 0, 0) 100%)',
      };
    }

    return {
      backgroundColor: adaptSpectrum ? `rgb(0, ${g}, ${b})` : 'rgb(0, 0, 0)',
    };
  }, [rgb, adaptSpectrum, reverse, vertical]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const pos = clamp((vertical ? y : x) - (boundedThumb ? thumbSize / 2 : 0), length);
    const value = (pos / length) * 255;
    const newRedValue = reverse ? 255 - value : value;

    if (newRedValue === rgb.value.r) return;

    const { h, s, v } = colorKit.runOnUI().HSV({ r: newRedValue, g: rgb.value.g, b: rgb.value.b }).object(false);

    hueValue.value = h;
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

    return { r: rgb.value.r, g: 0, b: 0 };
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={[style, { position: 'relative', borderRadius, borderWidth: 0, padding: 0 }, thicknessStyle, sliderBackground]}
      >
        <RenderNativeOnly>
          <View style={{ flex: 1, borderRadius, overflow: 'hidden' }}>
            <Animated.Image source={require('@assets/blackGradient.png')} style={imageStyle} />
          </View>
        </RenderNativeOnly>

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
