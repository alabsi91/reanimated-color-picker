import React, { useCallback } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { ConditionalRendering, HSVA2HSLA_string } from '@utils';

import type { HueCircularProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function HueCircular({ children, gestures = [], style = {}, containerStyle = {}, ...props }: HueCircularProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape,
    thumbSize = props.thumbSize ?? ctx.thumbSize,
    thumbColor = props.thumbColor ?? ctx.thumbColor,
    renderThumb = props.renderThumb ?? ctx.renderThumb,
    thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {},
    sliderThickness = props.sliderThickness ?? ctx.sliderThickness,
    thumbScaleAnimationValue = props.thumbScaleAnimationValue ?? ctx.thumbScaleAnimationValue,
    thumbScaleAnimationDuration = props.thumbScaleAnimationDuration ?? ctx.thumbScaleAnimationDuration,
    adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum,
    thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};

  const isGestureActive = useSharedValue(false);
  const width = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const borderRadiusStyle = useAnimatedStyle(() => ({ borderRadius: borderRadius.value }), [borderRadius]);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2,
      distance = (width.value - sliderThickness) / 2,
      posY = width.value - (Math.sin((hueValue.value * Math.PI) / 180) * distance + center) - thumbSize / 2,
      posX = width.value - (Math.cos((hueValue.value * Math.PI) / 180) * distance + center) - thumbSize / 2;

    return {
      transform: [
        { translateX: posX },
        { translateY: posY },
        { scale: handleScale.value },
        { rotate: hueValue.value + 90 + 'deg' },
      ],
    };
  }, [width, hueValue, handleScale]);

  const activeSaturationStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};

    return { backgroundColor: HSVA2HSLA_string(0, 0, brightnessValue.value, 1 - saturationValue.value / 100) };
  }, [brightnessValue, saturationValue]);

  const activeBrightnessStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};

    return { backgroundColor: HSVA2HSLA_string(0, 0, 0, 1 - brightnessValue.value / 100) };
  }, [brightnessValue]);

  const clipViewStyle = useAnimatedStyle(() => {
    return {
      width: width.value - sliderThickness * 2,
      height: width.value - sliderThickness * 2,
      borderRadius: width.value / 2,
    };
  }, [width]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = width.value / 2,
      dx = center - x,
      dy = center - y,
      theta = Math.atan2(dy, dx) * (180 / Math.PI), // [0 - 180] range
      angle = theta < 0 ? 360 + theta : theta, // [0 - 360] range
      newHueValue = angle;

    if (hueValue.value === newHueValue) return;

    hueValue.value = newHueValue;

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';

    const R = width.value / 2,
      dx = R - event.x,
      dy = R - event.y,
      clickR = Math.sqrt(dx * dx + dy * dy);

    // Check if the press is outside the circle
    if (clickR > R) {
      isGestureActive.value = false;
      return;
    }

    // check if the press inside the circle (not on the actual slider)
    const innerR = width.value / 2 - sliderThickness;
    if (clickR < innerR) {
      isGestureActive.value = false;
      return;
    }

    isGestureActive.value = true;
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    isGestureActive.value = false;
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutWidth = layout.width;
    width.value = layoutWidth;
    borderRadius.value = withTiming(layoutWidth / 2, { duration: 5 });
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.panel_container,
          style,
          { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 },
          borderRadiusStyle,
        ]}
      >
        <ImageBackground
          source={require('@assets/circularHue.png')}
          style={[styles.panel_image, { justifyContent: 'center', alignItems: 'center' }]}
          resizeMode='stretch'
        >
          <ConditionalRendering if={adaptSpectrum}>
            <Animated.View style={[borderRadiusStyle, activeBrightnessStyle, StyleSheet.absoluteFillObject]} />
            <Animated.View style={[borderRadiusStyle, activeSaturationStyle, StyleSheet.absoluteFillObject]} />
          </ConditionalRendering>

          <Animated.View style={[clipViewStyle, { backgroundColor: '#fff' }, containerStyle]}>{children}</Animated.View>
        </ImageBackground>
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
        />
      </Animated.View>
    </GestureDetector>
  );
}
