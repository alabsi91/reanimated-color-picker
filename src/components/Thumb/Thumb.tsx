import React from 'react';
import { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

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

  const getColorForAdaptiveColor = ({ h, s, v, a }: { h: number; s: number; v: number; a: number }) => {
    'worklet';

    if (adaptSpectrum) {
      if (channel === 'a') {
        // at low alpha the background (white/checkered) shows through
        return a > 0.5 ? { h, s, v } : { h: 0, s: 0, v: 100 };
      }
      // all other channels adapt to current color values
      return { h, s, v };
    }

    switch (channel) {
      case 'h':
        // hue strip always renders at full saturation + brightness
        return { h, s: 100, v: 100 };
      case 's':
        // goes from gray → full color, brightness stays at max
        return { h, s, v: 100 };
      case 'v':
        // goes from black → full hue at full saturation
        return { h, s: 100, v };
      case 'a':
        // goes from transparent → color; at low alpha white bg dominates
        return a > 0.5 ? { h, s, v } : { h: 0, s: 0, v: 100 };
      default:
        return { h, s, v };
    }
  };

  const currentColor = useDerivedValue(() => {
    return colorKit.runOnUI().HEX({ h: hue.value, s: saturation.value, v: brightness.value });
  }, [hue, saturation, brightness]);

  const solidColor = useAnimatedStyle(() => ({ backgroundColor: thumbColor ?? currentColor.value }), [currentColor]);

  const adaptiveColor = useDerivedValue<string>(() => {
    const compareColor = getColorForAdaptiveColor({ h: hue.value, s: saturation.value, v: brightness.value, a: alpha.value });
    const isDark = colorKit.runOnUI().isDark(compareColor);

    return isDark ? '#ffffff' : '#000000';
  }, [hue, saturation, brightness, alpha]);

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
