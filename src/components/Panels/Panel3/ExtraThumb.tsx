import React from 'react';
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { ConditionalRendering, clamp } from '@utils';
import usePanel3Context from './Panel3Context';

import type { ExtraThumbProps } from '@types';

export function ExtraThumb({
  onChange,
  colorTransform,
  hueTransform,
  saturationTransform,
  brightnessTransform,
  renderThumb,
  ...props
}: ExtraThumbProps) {
  const { width, boundedThumb, centerChannel, adaptSpectrum, ...ctx } = usePanel3Context();
  const { hueValue, saturationValue, brightnessValue, alphaValue, returnedResults } = usePickerContext();

  const thumbSize = props.thumbSize ?? ctx.thumbSize,
    thumbShape = props.thumbShape ?? ctx.thumbShape,
    thumbColor = props.thumbColor ?? ctx.thumbColor,
    thumbStyle = props.thumbStyle ?? ctx.thumbStyle,
    thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle,
    renderCenterLine = props.renderCenterLine ?? ctx.renderCenterLine;

  // Calculate color
  const hsv = useDerivedValue(() => {
    const currentColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value, a: alphaValue.value };
    if (!colorTransform) return currentColor;
    const transformedColor = colorTransform(currentColor);

    return transformedColor;
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  // Calculate hue value
  const hue = useDerivedValue(() => {
    if (colorTransform) return hsv.value.h;

    if (!hueTransform) return hueValue.value;

    const changeAmount = typeof hueTransform === 'string' ? hueValue.value * (parseFloat(hueTransform) / 100) : hueTransform;

    return clamp((hueValue.value + changeAmount) % 360, 360);
  }, [hsv, hueValue]);

  // Calculate saturation value
  const saturation = useDerivedValue(() => {
    if (colorTransform) return hsv.value.s;

    if (!saturationTransform) return saturationValue.value;

    const changeAmount =
      typeof saturationTransform === 'string'
        ? saturationValue.value * (parseFloat(saturationTransform) / 100)
        : saturationTransform;

    return clamp(saturationValue.value + changeAmount, 100);
  }, [hsv, saturationValue]);

  // Calculate brightness value
  const brightness = useDerivedValue(() => {
    if (colorTransform) return hsv.value.v;

    if (!brightnessTransform) return brightnessValue.value;

    const changeAmount =
      typeof brightnessTransform === 'string'
        ? brightnessValue.value * (parseFloat(brightnessTransform) / 100)
        : brightnessTransform;

    return clamp(brightnessValue.value + changeAmount, 100);
  }, [hsv, brightnessValue]);

  // Call onChange prop on every value change
  useDerivedValue(() => {
    if (!onChange) return;

    const colors = returnedResults({
      h: hue.value,
      s: saturation.value,
      v: brightness.value,
      a: alphaValue.value,
    });

    try {
      onChange(colors);
    } catch (error) {
      runOnJS(onChange)(colors);
    }
  }, [hue, saturation, brightness]);

  const channelValue = centerChannel === 'brightness' ? brightness : saturation;

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0),
      distance = (channelValue.value / 100) * (width.value / 2 - (boundedThumb ? thumbSize / 2 : 0)),
      posY =
        width.value - (Math.sin((hue.value * Math.PI) / 180) * distance + center) - (boundedThumb ? thumbSize : thumbSize / 2),
      posX =
        width.value - (Math.cos((hue.value * Math.PI) / 180) * distance + center) - (boundedThumb ? thumbSize : thumbSize / 2);

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { rotate: hue.value + 90 + 'deg' }],
    };
  }, [thumbSize, boundedThumb, width, channelValue, hue]);

  const centerLineStyle = useAnimatedStyle(() => {
    if (!renderCenterLine) return {};

    const lineThickness = 1,
      center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0),
      distance = (channelValue.value / 100) * center,
      angle = ((hue.value * Math.PI) / Math.PI + 180) % 360; // reversed angle

    return {
      top: (width.value - lineThickness) / 2,
      left: (width.value - distance) / 2,
      height: lineThickness,
      width: distance,
      transform: [{ rotate: angle + 'deg' }, { translateX: distance / 2 }, { translateY: 0 }],
    };
  }, [renderCenterLine, boundedThumb, thumbSize, width, hue, channelValue]);

  return (
    <>
      <ConditionalRendering if={renderCenterLine}>
        <Animated.View style={[styles.panel3Line, centerLineStyle]} />
      </ConditionalRendering>

      <Thumb
        channel={centerChannel === 'brightness' ? 'v' : 's'}
        thumbShape={thumbShape}
        thumbSize={thumbSize}
        thumbColor={thumbColor}
        renderThumb={renderThumb}
        innerStyle={thumbInnerStyle}
        handleStyle={handleStyle}
        style={thumbStyle}
        adaptSpectrum={adaptSpectrum}
        overrideHSV={{ hue, saturation, brightness }}
      />
    </>
  );
}
