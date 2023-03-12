import React, { useContext } from 'react';
import { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import BuiltinThumbs from './BuiltinThumbs/index';
import colorKit from '../../colorKit/colorKit';
import { CTX } from '../../ColorPicker';
import { styles } from '../../styles';

import type { BuiltinThumbsProps, ThumbProps } from '../../types';

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
}: ThumbProps) {
  const { width, height, borderRadius } = { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 };
  const { hueValue, saturationValue, brightnessValue, alphaValue, value } = useContext(CTX);

  const resultColor = useSharedValue('#ffffff');
  const solidColor = useAnimatedStyle(() => ({ backgroundColor: resultColor.value }));
  const setResultColor = (color: { h: number; s: number; v: number; a?: number }) => {
    resultColor.value = colorKit.HEX(color);
  };

  const adaptiveColor = useSharedValue('#ffffff');
  const setAdaptiveColor = (color1: { h: number; s: number; v: number; a?: number }) => {
    const color = adaptiveColor.value === '#ffffff' ? '#000000' : '#ffffff';
    const contrast = colorKit.contrastRatio(color1, adaptiveColor.value);
    adaptiveColor.value = contrast < 4.5 ? color : adaptiveColor.value;
  };

  /**
   * Get the current color and calculate its contrast ratio against white or black,
   * depending on the channel and whether 'adaptSpectrum' is enabled
   */
  const getColorForAdaptiveColor = () => {
    'worklet';
    if (adaptSpectrum) {
      if (channel === 'a') {
        return alphaValue.value > 0.5
          ? { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value }
          : { h: 0, s: 0, v: 70 };
      }
      return { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    }

    switch (channel) {
      case 'h':
        return { h: hueValue.value, s: 100, v: 100 };
      case 'v':
        return { h: hueValue.value, s: 100, v: brightnessValue.value };
      case 's':
        return { h: hueValue.value, s: saturationValue.value, v: 70 };
      case 'a':
        return { h: hueValue.value, s: alphaValue.value * 100, v: 70 };
      default:
        return { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    }
  };

  // When the values of channels change
  useDerivedValue(() => {
    alphaValue.value; // to keep track with `alphaValue` changes
    runOnJS(setAdaptiveColor)(getColorForAdaptiveColor());
    runOnJS(setResultColor)({ h: hueValue.value, s: saturationValue.value, v: brightnessValue.value });
  });

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

  // normalize 'thumbeShape' string to match 'BuiltinThumbs' keys.
  const thumb_Shape = (thumbShape.toLowerCase().charAt(0).toUpperCase() + thumbShape.slice(1)) as keyof typeof BuiltinThumbs;

  if (thumb_Shape in BuiltinThumbs) {
    const SelectedThumb = BuiltinThumbs[thumb_Shape];
    return <SelectedThumb {...thumbProps} />;
  }

  // default to the 'Ring' thumb
  return <BuiltinThumbs.Ring {...thumbProps} />;
}
