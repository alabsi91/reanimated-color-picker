import React, { useLayoutEffect, useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import Thumb from '@thumb';
import { clamp, getStyle, HSVA2HSLA_string, isRtl, isWeb, RenderNativeOnly, RenderWebOnly } from '@utils';

import type { SliderProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function OpacitySlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
  const { hueValue, saturationValue, brightnessValue, alphaValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

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

  const containerRef = useRef<Animated.View>(null);
  const width = useSharedValue(vertical ? sliderThickness : typeof getWidth === 'number' ? getWidth : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof getHeight === 'number' ? getHeight : 0);
  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const percent = alphaValue.value * length;
    const pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2);
    const posY = vertical ? pos : height.value / 2 - thumbSize / 2;
    const posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [width, height, alphaValue, handleScale]);

  const activeColorStyle = useAnimatedStyle(() => {
    if (!isWeb) {
      return { backgroundColor: '#0000' };
    }

    const deg = vertical ? (reverse ? 1 : 180) : reverse ? 270 : 90;
    const color = HSVA2HSLA_string(
      hueValue.value,
      adaptSpectrum ? saturationValue.value : 100,
      adaptSpectrum ? brightnessValue.value : 100,
    );

    return {
      background: `linear-gradient(${deg}deg, transparent 0%, ${color} 100%)`,
    };
  }, [hueValue, saturationValue, brightnessValue]);

  const imageStyle = useAnimatedStyle(() => {
    if (isWeb) {
      return {};
    }

    const imageRotate = vertical ? (reverse ? '90deg' : '270deg') : reverse ? '0deg' : '180deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((reverse && isRtl) || (!reverse && !isRtl) ? -1 : 1);

    return {
      width: vertical ? height.value : '100%',
      height: vertical ? width.value : '100%',
      transform: [
        { rotate: imageRotate },
        { translateX: vertical ? ((height.value - width.value) / 2) * (reverse ? 1 : -1) : 0 },
        { translateY: vertical ? imageTranslateY : 0 },
      ],
    };
  }, [width, height, hueValue, saturationValue, brightnessValue]);

  const imageTintColorProp = useAnimatedProps(() => {
    return {
      tintColor: HSVA2HSLA_string(
        hueValue.value,
        adaptSpectrum ? saturationValue.value : 100,
        adaptSpectrum ? brightnessValue.value : 100,
      ),
    };
  }, [hueValue, saturationValue, brightnessValue]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const posX = clamp((vertical ? y : x) - (boundedThumb ? thumbSize / 2 : 0), length);
    const value = posX / length;
    const newOpacityValue = reverse ? 1 - value : value;

    if (alphaValue.value === newOpacityValue) return;

    alphaValue.value = newOpacityValue;

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

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={[
          style,
          { position: 'relative', borderRadius, borderWidth: 0, padding: 0 },
          thicknessStyle,
          isWeb ? webTransparentTexture : {},
        ]}
      >
        <RenderNativeOnly>
          <Image
            source={require('@assets/transparent-texture.png')}
            style={[{ width: '100%', height: '100%', borderRadius }, StyleSheet.absoluteFill]}
            resizeMode='repeat'
          />
          <View style={{ flex: 1, borderRadius, overflow: 'hidden' }}>
            <Animated.Image
              source={require('@assets/blackGradient.png')}
              style={imageStyle}
              resizeMode='stretch'
              animatedProps={imageTintColorProp}
            />
          </View>
        </RenderNativeOnly>

        <RenderWebOnly>
          <Animated.View style={[{ flex: 1, borderRadius }, activeColorStyle]} />
        </RenderWebOnly>

        <Thumb
          channel='a'
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

const webTransparentTexture = {
  flex: undefined,
  backgroundImage:
    'repeating-linear-gradient(45deg, #c1c1c1 25%, transparent 25%, transparent 75%, #c1c1c1 75%, #c1c1c1), repeating-linear-gradient(45deg, #c1c1c1 25%, #fff 25%, #fff 75%, #c1c1c1 75%, #c1c1c1)',
  backgroundPosition: '0px 0px, 8px 8px',
  backgroundSize: '16px 16px',
};
