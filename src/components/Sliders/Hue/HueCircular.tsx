import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { CircularSliderCore } from '@sliders/CircularSliderCore';
import { styles } from '@styles';
import Thumb from '@thumb';
import { ConditionalRendering, HSVA2HSLA_string } from '@utils';

import type { HueCircularProps } from '@types';

/** @see [HueCircular](https://alabsi91.github.io/reanimated-color-picker/api/sliders/hue/hue-circular-slider/) */
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

  const onBegin = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    const radius = width.value / 2;
    const dx = radius - x;
    const dy = radius - y;
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
  };

  const onUpdate = (newValue: number) => {
    'worklet';

    if (hueValue.value === newValue) {
      return;
    }

    hueValue.value = newValue;

    onGestureChange();
  };

  const onGestureUpdate = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = width.value / 2;
    const dx = center - x;
    const dy = center - y;
    const theta = Math.atan2(dy, dx) * (180 / Math.PI); // [0 - 180] range
    const angle = theta < 0 ? 360 + theta : theta; // [0 - 360] range
    const newHueValue = (angle + rotate) % 360;

    onUpdate(newHueValue);
  };

  const onEnd = () => {
    'worklet';
    isGestureActive.value = false;
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
    <CircularSliderCore
      style={[
        styles.panelContainer,
        { justifyContent: 'center', alignItems: 'center' },
        style,
        { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 },
        borderRadiusStyle,
      ]}
      label={props.accessibilityLabel ?? 'Hue circular slider'}
      hint={props.accessibilityHint}
      currentValue={hueValue}
      maxValue={360}
      width={width}
      borderRadius={borderRadius}
      gestures={gestures}
      onGestureUpdate={onGestureUpdate}
      onBegin={onBegin}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <ImageBackground
        source={require('@assets/circularHue.png')}
        style={[styles.panelImage, { transform: [{ rotate: -rotate + 'deg' }] }]}
        resizeMode='stretch'
        aria-hidden
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
    </CircularSliderCore>
  );
}
