import React, { useCallback, useLayoutEffect, useRef } from 'react';
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

export function HueCircular({
  children,
  gestures = [],
  style = {},
  containerStyle = {},
  rotate = 0,
  ...props
}: HueCircularProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const sliderThickness = props.sliderThickness ?? ctx.sliderThickness;
  const thumbScaleAnimationValue = props.thumbScaleAnimationValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleAnimationDuration ?? ctx.thumbScaleAnimationDuration;
  const adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum;
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};

  const containerRef = useRef<Animated.View>(null);
  const isGestureActive = useSharedValue(false);
  const width = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const borderRadiusStyle = useAnimatedStyle(() => ({ borderRadius: borderRadius.value }), [borderRadius]);

  const handleScale = useSharedValue(1);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const center = width.value / 2;
    const rotatedHue = (hueValue.value - rotate) % 360;
    const distance = (width.value - sliderThickness) / 2;
    const angle = (rotatedHue * Math.PI) / 180;
    const posY = width.value - (Math.sin(angle) * distance + center) - thumbSize / 2;
    const posX = width.value - (Math.cos(angle) * distance + center) - thumbSize / 2;

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }, { rotate: rotatedHue + 90 + 'deg' }],
    };
  }, [width, hueValue, handleScale, thumbSize, sliderThickness, rotate]);

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

  const clipViewStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: width.value - sliderThickness * 2,
      height: width.value - sliderThickness * 2,
      borderRadius: width.value / 2,
    };
  }, [width, sliderThickness]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = width.value / 2;
    const dx = center - x;
    const dy = center - y;
    const theta = Math.atan2(dy, dx) * (180 / Math.PI); // [0 - 180] range
    const angle = theta < 0 ? 360 + theta : theta; // [0 - 360] range
    const newHueValue = (angle + rotate) % 360;

    if (hueValue.value === newHueValue) return;

    hueValue.value = newHueValue;

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';

    const radius = width.value / 2;
    const dx = radius - event.x;
    const dy = radius - event.y;
    const pressDistance = Math.sqrt(dx * dx + dy * dy);

    // Check if the press is outside the circle
    if (pressDistance > radius) {
      isGestureActive.value = false;
      return;
    }

    // check if the press inside the circle (not on the actual slider)
    const innerR = width.value / 2 - sliderThickness;
    if (pressDistance < innerR) {
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
  const tap = Gesture.Tap().onEnd(onGestureFinish);
  const longPress = Gesture.LongPress().onEnd(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  // useLayoutEffect → paint → onLayout
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, layoutWidth) => {
      if (!layoutWidth) return;
      width.value = layoutWidth;
      borderRadius.value = layoutWidth / 2;
    });
  }, []);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutWidth = layout.width;
    if (!layoutWidth) return;

    width.value = layoutWidth;
    borderRadius.value = layoutWidth / 2;
  }, []);

  const getAdaptiveColor = (hsva: { h: number; s: number; v: number; a: number }) => {
    'worklet';

    if (adaptSpectrum) {
      return hsva;
    }

    return { h: hsva.h, s: 100, v: 100 };
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        ref={containerRef}
        style={[
          styles.panelContainer,
          { justifyContent: 'center', alignItems: 'center' },
          style,
          { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 },
          borderRadiusStyle,
        ]}
      >
        <ImageBackground
          source={require('@assets/circularHue.png')}
          style={[styles.panelImage, { transform: [{ rotate: -rotate + 'deg' }] }]}
          resizeMode='stretch'
        >
          <ConditionalRendering if={adaptSpectrum}>
            <Animated.View style={[borderRadiusStyle, activeBrightnessStyle, StyleSheet.absoluteFill]} />
            <Animated.View style={[borderRadiusStyle, activeSaturationStyle, StyleSheet.absoluteFill]} />
          </ConditionalRendering>
        </ImageBackground>

        <Animated.View style={[clipViewStyle, { backgroundColor: '#fff' }, containerStyle]}>{children}</Animated.View>

        <Thumb
          thumbShape={thumbShape}
          thumbSize={thumbSize}
          thumbColor={thumbColor}
          renderThumb={renderThumb}
          innerStyle={thumbInnerStyle}
          thumbAnimatedStyle={thumbAnimatedStyle}
          style={thumbStyle}
          getAdaptiveColor={getAdaptiveColor}
        />
      </Animated.View>
    </GestureDetector>
  );
}
