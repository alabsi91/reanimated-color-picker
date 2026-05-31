import React from 'react';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { PanelCore } from '@panels/PanelCore';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl } from '@utils';

import type { Panel4Props } from '@types';

/** @see [Panel4](https://alabsi91.github.io/reanimated-color-picker/api/panels/panel4/) */
export function Panel4({
  reverseHue = false,
  reverseHorizontalChannels = false,
  gestures = [],
  style = {},
  ...props
}: Panel4Props) {
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

  // combined brightness and saturation mapped to 0–200
  const brightnessPlusSaturation = useDerivedValue(() => {
    const base = (2 - saturationValue.value / 100) * brightnessValue.value;
    return reverseHorizontalChannels ? base : 200 - base;
  }, [brightnessValue, saturationValue, reverseHorizontalChannels]);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const length = { x: width.value - (boundedThumb ? thumbSize : 0), y: height.value - (boundedThumb ? thumbSize : 0) };
    const thumbOffset = boundedThumb ? 0 : thumbSize / 2;
    // brightness and saturation
    const brightnessAndSaturation = (((2 - saturationValue.value / 100) * (brightnessValue.value / 100)) / 2) * 100;
    const posPercentX = (brightnessAndSaturation / 100) * length.x;
    const posX = (reverseHorizontalChannels ? posPercentX : length.x - posPercentX) - thumbOffset;
    // hue
    const percentY = (hueValue.value / 360) * length.y;
    const posY = (reverseHue ? percentY : length.y - percentY) - thumbOffset;

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [
    width,
    height,
    saturationValue,
    brightnessValue,
    hueValue,
    handleScale,
    boundedThumb,
    thumbSize,
    reverseHorizontalChannels,
    reverseHue,
  ]);

  const panelImageStyle = useAnimatedStyle(() => {
    return {
      // Width and height are intentionally swapped to correct dimensions after the rotation
      width: height.value,
      height: width.value,
      transform: [
        { scaleY: reverseHue ? -1 : 1 },
        { rotate: '270deg' },
        { translateX: ((width.value - height.value) / 2) * (reverseHue ? -1 : 1) },
        { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) },
      ],
    };
  }, [height, width, reverseHue]);

  const onBegin = () => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
  };

  const onUpdate = (newXValue: number, newYValue: number) => {
    'worklet';

    const maxX = 200; // saturation + brightness
    const newSaturationValue = clamp(reverseHorizontalChannels ? maxX - newXValue : newXValue, 100);
    const newBrightnessValue = clamp(reverseHorizontalChannels ? newXValue : maxX - newXValue, 100);

    if (
      hueValue.value === newYValue &&
      saturationValue.value === newSaturationValue &&
      brightnessValue.value === newBrightnessValue
    ) {
      return;
    }

    hueValue.value = newYValue;
    saturationValue.value = newSaturationValue;
    brightnessValue.value = newBrightnessValue;

    onGestureChange();
  };

  const onGestureUpdate = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    const maxY = 360; // hue
    const maxX = 200; // saturation + brightness
    const lengthX = width.value - (boundedThumb ? thumbSize : 0);
    const lengthY = height.value - (boundedThumb ? thumbSize : 0);
    const posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX);
    const posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY);
    const valueX = (posX / lengthX) * maxX;
    const valueY = (posY / lengthY) * maxY;
    const newHueValue = reverseHue ? valueY : maxY - valueY;

    onUpdate(valueX, newHueValue);
  };

  const onEnd = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  return (
    <PanelCore
      style={[styles.panelContainer, style, { position: 'relative', height: heightStyle, borderWidth: 0, padding: 0 }]}
      label={props.accessibilityLabel ?? 'Hue, saturation, and brightness 2D slider'}
      hint={props.accessibilityHint ?? 'Double tap to switch between hue and saturation/brightness'}
      labelX='Saturation/Brightness'
      currentXValue={brightnessPlusSaturation}
      maxXValue={200} // saturation + brightness
      labelY='Hue'
      currentYValue={hueValue}
      maxYValue={360}
      // reverseX={reverseHorizontalChannels} // Handled in onUpdate
      reverseY={reverseHue}
      width={width}
      height={height}
      gestures={gestures}
      onGestureUpdate={onGestureUpdate}
      onBegin={onBegin}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <View style={{ flex: 1, borderRadius, overflow: 'hidden' }} aria-hidden>
        <Animated.Image source={require('@assets/Hue.png')} style={[styles.panelImage, panelImageStyle]} resizeMode='stretch' />
      </View>

      <View
        style={[
          styles.panelImage,
          {
            borderRadius,
            flexDirection: isRtl ? 'row-reverse' : 'row',
            transform: [{ scaleX: reverseHorizontalChannels ? -1 : 1 }],
          },
        ]}
        aria-hidden
      >
        <Image source={require('@assets/blackGradient.png')} style={{ flex: 1 }} tintColor='#fff' resizeMode='stretch' />
        <Image
          source={require('@assets/blackGradient.png')}
          style={{ flex: 1, transform: [{ scaleX: -1 }] }}
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
