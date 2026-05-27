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

  const hue = overrideHSV?.hue ?? hueValue;
  const saturation = overrideHSV?.saturation ?? saturationValue;
  const brightness = overrideHSV?.brightness ?? brightnessValue;
  const alpha = overrideHSV?.alpha ?? alphaValue;

  /**
   * Get the current color and calculate its contrast ratio against white or black, depending on the channel and whether
   * 'adaptSpectrum' is enabled
   */
  const getColorForAdaptiveColor = () => {
    'worklet';

    if (adaptSpectrum) {
      if (channel === 'a') {
        if (alpha.value > 0.5) {
          return { h: hue.value, s: saturation.value, v: brightness.value };
        }

        return { h: 0, s: 0, v: 70 };
      }

      return { h: hue.value, s: saturation.value, v: brightness.value };
    }

    if (channel === 'h') {
      return { h: hue.value, s: 100, v: 100 };
    }

    if (channel === 'v') {
      return { h: hue.value, s: 100, v: brightness.value };
    }

    if (channel === 's') {
      return { h: hue.value, s: saturation.value, v: 70 };
    }

    if (channel === 'a') {
      return { h: hue.value, s: alpha.value * 100, v: 70 };
    }

    return { h: hue.value, s: saturation.value, v: brightness.value };
  };

  const currentColor = useDerivedValue(() => {
    return colorKit.runOnUI().HEX({ h: hue.value, s: saturation.value, v: brightness.value });
  }, [hue, saturation, brightness]);

  const solidColor = useAnimatedStyle(() => ({ backgroundColor: thumbColor ?? currentColor.value }), [currentColor]);

  const isWhite = useSharedValue(true);

  const adaptiveColor = useDerivedValue<string>(() => {
    [alpha, hue, saturation, brightness]; // track changes on Native

    // calculate the contrast ratio
    const compareColor1 = getColorForAdaptiveColor();
    const compareColor2 = isWhite.value ? { h: 0, s: 0, v: 100 } : { h: 0, s: 0, v: 0 };
    const contrast = colorKit.runOnUI().contrastRatio(compareColor1, compareColor2);
    const reversedColor = isWhite.value ? '#000000' : '#ffffff';

    if (contrast < 4.5) {
      isWhite.value = !isWhite.value;
      return reversedColor;
    }

    return isWhite.value ? '#ffffff' : '#000000';
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
  if (RenderThumb) {
    return (
      <RenderThumb
        positionStyle={[styles.handle, handleStyle]}
        width={width}
        height={height}
        initialColor={value}
        currentColor={currentColor}
        adaptiveColor={adaptiveColor}
      />
    );
  }

  // normalize 'thumbShape' string to match 'BuiltinThumbs' keys.
  const thumb_Shape = (thumbShape.toLowerCase().charAt(0).toUpperCase() + thumbShape.slice(1)) as keyof typeof BuiltinThumbs;

  if (thumb_Shape in BuiltinThumbs) {
    const SelectedThumb = BuiltinThumbs[thumb_Shape];
    return <SelectedThumb {...thumbProps} />;
  }

  // default to the 'Ring' thumb
  return <BuiltinThumbs.Ring {...thumbProps} />;
}
