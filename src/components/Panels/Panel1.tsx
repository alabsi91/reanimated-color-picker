import React from 'react';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { PanelCore } from '@panels/PanelCore';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl } from '@utils';

import type { PanelProps } from '@types';

/** @see [Panel1](https://alabsi91.github.io/reanimated-color-picker/api/panels/panel1/) */
export function Panel1({ gestures = [], style = {}, ...props }: PanelProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const boundedThumb = props.boundedThumb ?? ctx.boundedThumb;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const thumbScaleAnimationValue = props.thumbScaleUpValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleUpDuration ?? ctx.thumbScaleAnimationDuration;
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const heightStyle = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const handleScale = useSharedValue(1);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const length = {
      x: width.value - (boundedThumb ? thumbSize : 0),
      y: height.value - (boundedThumb ? thumbSize : 0),
    };
    const percentX = (saturationValue.value / 100) * length.x;
    const posX = percentX - (boundedThumb ? 0 : thumbSize / 2);
    const percentY = (brightnessValue.value / 100) * length.y;
    const posY = length.y - percentY - (boundedThumb ? 0 : thumbSize / 2);

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [handleScale, saturationValue, brightnessValue, width, height, boundedThumb, thumbSize]);

  const activeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `hsl(${hueValue.value}, 100%, 50%)`,
    };
  }, [hueValue]);

  const brightnessImageStyle = useAnimatedStyle(() => {
    return {
      // Width and height are intentionally swapped to correct dimensions after the 270° rotation
      width: height.value,
      height: width.value,
      transform: [
        { rotate: '270deg' },
        { translateX: (width.value - height.value) / 2 },
        { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) },
      ],
    };
  }, [width, height]);

  const onBegin = () => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
  };

  const onUpdate = (newXValue: number, newYValue: number) => {
    'worklet';

    if (saturationValue.value === newXValue && brightnessValue.value === newYValue) {
      return;
    }

    saturationValue.value = newXValue;
    brightnessValue.value = newYValue;

    onGestureChange();
  };

  const onGestureUpdate = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0);
    const lengthY = height.value - (boundedThumb ? thumbSize : 0);
    const posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX);
    const posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY);
    const valueX = (posX / lengthX) * 100;
    const valueY = (posY / lengthY) * 100;
    const newXValue = valueX;
    const newYValue = 100 - valueY;

    onUpdate(newXValue, newYValue);
  };

  const onEnd = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  return (
    <PanelCore
      style={[
        styles.panelContainer,
        style,
        { position: 'relative', height: heightStyle, borderWidth: 0, padding: 0 },
        activeColorStyle,
      ]}
      label={props.accessibilityLabel ?? 'Saturation and brightness 2D slider'}
      hint={props.accessibilityHint ?? 'Double tap to switch between brightness and saturation'}
      labelX='Saturation'
      labelY='Brightness'
      currentXValue={saturationValue}
      currentYValue={brightnessValue}
      width={width}
      height={height}
      gestures={gestures}
      onGestureUpdate={onGestureUpdate}
      onBegin={onBegin}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <View style={[styles.panelImage, { borderRadius }]} aria-hidden>
        <Image source={require('@assets/blackGradient.png')} style={styles.panelImage} tintColor='#fff' resizeMode='stretch' />
        <Animated.Image
          source={require('@assets/blackGradient.png')}
          style={[styles.panelImage, brightnessImageStyle]}
          resizeMode='stretch'
        />
      </View>

      <Thumb
        thumbShape={thumbShape}
        thumbSize={thumbSize}
        thumbColor={thumbColor}
        renderThumb={renderThumb}
        innerStyle={thumbInnerStyle}
        thumbAnimatedStyle={thumbAnimatedStyle}
        style={thumbStyle}
      />
    </PanelCore>
  );
}
