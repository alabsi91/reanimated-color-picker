import React from 'react';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { CircularSliderCore } from '@sliders/CircularSliderCore';
import { styles } from '@styles';
import Thumb from '@thumb';

import type { LuminanceCircularProps } from '@types';

/** @see [LuminanceCircular](https://alabsi91.github.io/reanimated-color-picker/api/sliders/hsl/luminance-circular-slider/) */
export function LuminanceCircular({
  children,
  gestures = [],
  style = {},
  containerStyle = {},
  rotate = 0,
  ...props
}: LuminanceCircularProps) {
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
  const thumbSide = useSharedValue<0 | 1>(0); // to determine in which side of the circle the thumb is

  // HSL saturation is mathematically undefined (collapses to 0) when luminance is 0 or 100,
  // because those represent pure black and white regardless of saturation.
  // This ref holds the last valid saturation so we can restore it when luminance moves away from the boundary.
  const hslSaturationValue = useSharedValue(0);
  const hslLuminanceValue = useSharedValue(0);

  const hsl = useDerivedValue(() => {
    const currentHsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(currentHsvColor).object(false);

    hslLuminanceValue.value = l;

    // At l=0 (black) or l=100 (white), the conversion loses saturation information.
    // Substitute the last known saturation so it's restored when luminance changes.
    if (l === 100 || l === 0) {
      return { h, s: hslSaturationValue.value, l };
    }

    hslSaturationValue.value = s;
    return { h, s, l };
  }, [hueValue, saturationValue, brightnessValue, hslLuminanceValue]);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const center = width.value / 2;
    const distance = (width.value - sliderThickness) / 2;
    const angle = (hsl.value.l / 100) * 180 + thumbSide.value * 180;
    const mirroredAngle = ((thumbSide.value === 1 ? 180 - angle : angle) - rotate) % 360;
    const posY = width.value - (Math.sin((mirroredAngle * Math.PI) / 180) * distance + center) - thumbSize / 2;
    const posX = width.value - (Math.cos((mirroredAngle * Math.PI) / 180) * distance + center) - thumbSize / 2;

    return {
      transform: [
        { translateX: posX },
        { translateY: posY },
        { scale: handleScale.value },
        { rotate: mirroredAngle + 90 + 'deg' },
      ],
    };
  }, [width, hsl, handleScale, thumbSide, rotate]);

  const activeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `hsl(${hsl.value.h}, ${adaptSpectrum ? hsl.value.s : 100}%, ${50}%)`,
      borderRadius: width.value / 2,
    };
  }, [hsl, width, adaptSpectrum]);

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

    if (newValue === hsl.value.l) {
      return;
    }

    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: hsl.value.s, l: newValue }).object(false);

    saturationValue.value = s;
    brightnessValue.value = v;

    onGestureChange();
  };

  const onGestureUpdate = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = width.value / 2;
    const dx = center - x;
    const dy = center - y;
    const theta = (Math.atan2(dy, dx) + rotate * (Math.PI / 180)) * (180 / Math.PI); // [0 - 180] range
    const angle = theta < 0 ? 360 + theta : theta; // [0 - 360] range
    const mirroredAngle = angle <= 180 ? angle : 360 - angle;
    const newLuminanceValue = (mirroredAngle / 180) * 100;

    thumbSide.value = angle <= 180 ? 0 : 1;

    onUpdate(newLuminanceValue);
  };

  const onEnd = () => {
    'worklet';
    isGestureActive.value = false;
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const getAdaptiveColor = () => {
    'worklet';
    const { h, l } = hsl.value;
    return { h, s: 100, l };
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
      label={props.accessibilityLabel ?? 'Luminance circular slider'}
      hint={props.accessibilityHint}
      currentValue={hslLuminanceValue}
      width={width}
      borderRadius={borderRadius}
      gestures={gestures}
      onGestureUpdate={onGestureUpdate}
      onBegin={onBegin}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <Animated.View style={[styles.panelImage, activeColorStyle, { transform: [{ rotate: -rotate + 'deg' }] }]} aria-hidden>
        <Image
          source={require('@assets/angular-luminance.png')}
          style={{ width: '100%', height: '100%', flex: 1 }}
          resizeMode='stretch'
        />
      </Animated.View>

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
