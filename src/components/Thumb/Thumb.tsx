import React from 'react';
import { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import BuiltinThumbs from './BuiltinThumbs/index';

import type { BuiltinThumbsProps, ThumbProps } from '@types';

export default function Thumb({
  handleStyle,
  innerStyle,
  style,
  thumbColor,
  renderThumb: RenderThumb,
  thumbShape = 'ring',
  thumbSize,
  vertical = false,
  adaptSpectrum,
  channel,
  overrideHSV,
}: ThumbProps) {
  const { width, height, borderRadius } = { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 };
  const { hueValue, saturationValue, brightnessValue, alphaValue, value } = usePickerContext();

  const hue = overrideHSV?.hue ?? hueValue,
    saturation = overrideHSV?.saturation ?? saturationValue,
    brightness = overrideHSV?.brightness ?? brightnessValue,
    alpha = overrideHSV?.alpha ?? alphaValue;

  const resultColor = useSharedValue('#ffffff');
  const solidColor = useAnimatedStyle(() => ({ backgroundColor: resultColor.value }), [resultColor]);
  const adaptiveColor = useSharedValue<'#000000' | '#ffffff'>('#ffffff');

  /**
   * Get the current color and calculate its contrast ratio against white or black, depending on the channel and whether
   * 'adaptSpectrum' is enabled
   */
  const getColorForAdaptiveColor = () => {
    'worklet';
    if (adaptSpectrum) {
      if (channel === 'a') {
        if (alpha.value > 0.5) return { h: hue.value, s: saturation.value, v: brightness.value };
        return { h: 0, s: 0, v: 70 };
      }
      return { h: hue.value, s: saturation.value, v: brightness.value };
    }

    if (channel === 'h') return { h: hue.value, s: 100, v: 100 };
    if (channel === 'v') return { h: hue.value, s: 100, v: brightness.value };
    if (channel === 's') return { h: hue.value, s: saturation.value, v: 70 };
    if (channel === 'a') return { h: hue.value, s: alpha.value * 100, v: 70 };
    return { h: hue.value, s: saturation.value, v: brightness.value };
  };

  // When the values of channels change
  useDerivedValue(() => {
    alpha.value; // to track alpha changes too;
    resultColor.value = colorKit.runOnUI().HEX({ h: hue.value, s: saturation.value, v: brightness.value });

    // calculate the contrast ratio
    const compareColor1 = getColorForAdaptiveColor();
    const compareColor2 = adaptiveColor.value === '#000000' ? { h: 0, s: 0, v: 0 } : { h: 0, s: 0, v: 100 };
    const contrast = colorKit.runOnUI().contrastRatio(compareColor1, compareColor2);
    const reversedColor = adaptiveColor.value === '#ffffff' ? '#000000' : '#ffffff';
    adaptiveColor.value = contrast < 4.5 ? reversedColor : adaptiveColor.value;
  }, [alpha, hue, saturation, brightness]);

  const thumbProps: BuiltinThumbsProps = {
    width,
    height,
    borderRadius,
    vertical,
    solidColor,
    adaptiveColor,
    handleStyle,
    innerStyle,
    style,
    thumbColor,
  };

  // render a custom thumb
  if (RenderThumb)
    return (
      <RenderThumb
        positionStyle={[styles.handle, handleStyle]}
        width={width}
        height={height}
        initialColor={value}
        currentColor={resultColor}
        adaptiveColor={adaptiveColor}
      />
    );

  // normalize 'thumbShape' string to match 'BuiltinThumbs' keys.
  const thumb_Shape = (thumbShape.toLowerCase().charAt(0).toUpperCase() + thumbShape.slice(1)) as keyof typeof BuiltinThumbs;

  if (thumb_Shape in BuiltinThumbs) {
    const SelectedThumb = BuiltinThumbs[thumb_Shape];
    return <SelectedThumb {...thumbProps} />;
  }

  // default to the 'Ring' thumb
  return <BuiltinThumbs.Ring {...thumbProps} />;
}
