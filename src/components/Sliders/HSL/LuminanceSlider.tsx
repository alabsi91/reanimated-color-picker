import React from 'react';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { SliderCore } from '@sliders/SliderCore';
import { styles } from '@styles';
import Thumb from '@thumb';
import { enableAndroidHardwareTextures, getStyle, isRtl } from '@utils';

import type { SliderProps } from '@types';

/** @see [LuminanceSlider](https://alabsi91.github.io/reanimated-color-picker/api/sliders/hsl/luminance-slider/) */
export function LuminanceSlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const boundedThumb = props.boundedThumb ?? ctx.boundedThumb;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};
  const thumbScaleAnimationValue = props.thumbScaleAnimationValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleAnimationDuration ?? ctx.thumbScaleAnimationDuration;
  const adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum;
  const sliderThickness = props.sliderThickness ?? ctx.sliderThickness;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const widthStyle = getStyle(style, 'width');
  const heightStyle = getStyle(style, 'height');

  const width = useSharedValue(vertical ? sliderThickness : typeof widthStyle === 'number' ? widthStyle : 0);
  const height = useSharedValue(!vertical ? sliderThickness : typeof heightStyle === 'number' ? heightStyle : 0);
  const handleScale = useSharedValue(1);

  // HSL saturation is mathematically undefined (collapses to 0) when luminance is 0 or 100,
  // because those represent pure black and white regardless of saturation.
  // This ref holds the last valid saturation so we can restore it when luminance moves away from the boundary.
  const hslSaturationValue = useSharedValue(0);
  const hslLuminanceValue = useSharedValue(0);

  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);

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
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const percent = (hsl.value.l / 100) * length;
    const pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2);
    const posY = vertical ? pos : height.value / 2 - thumbSize / 2;
    const posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [height, width, hsl, handleScale, vertical, reverse, boundedThumb, thumbSize]);

  const activeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `hsl(${hsl.value.h}, ${adaptSpectrum ? hsl.value.s : 100}%, ${50}%)`,
    };
  }, [hsl, adaptSpectrum]);

  const imageStyle = useAnimatedStyle(() => {
    const imageRotate = vertical ? (reverse ? '90deg' : '270deg') : reverse ? '0deg' : '180deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((!reverse && isRtl) || (reverse && !isRtl) ? 1 : -1);

    return {
      width: vertical ? height.value : '100%',
      height: vertical ? width.value : '100%',
      borderRadius,
      transform: [
        { rotate: imageRotate },
        { translateX: vertical ? ((height.value - width.value) / 2) * (reverse ? 1 : -1) : 0 },
        { translateY: vertical ? imageTranslateY : 0 },
      ],
    };
  }, [height, width, borderRadius, reverse, vertical]);

  const onBegin = () => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
  };

  const onUpdate = (newValue: number) => {
    'worklet';

    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: hsl.value.s, l: newValue }).object(false);

    if (saturationValue.value === s && brightnessValue.value === v) {
      return;
    }

    saturationValue.value = s;
    brightnessValue.value = v;

    onGestureChange();
  };

  const onEnd = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const getAdaptiveColor = () => {
    'worklet';
    const { h, l } = hsl.value;
    return { h, s: 100, l };
  };

  return (
    <SliderCore
      style={[style, { position: 'relative', borderRadius, borderWidth: 0, padding: 0 }, activeColorStyle]}
      label={props.accessibilityLabel ?? 'Luminance Slider'}
      hint={props.accessibilityHint}
      currentValue={hslLuminanceValue}
      width={width}
      height={height}
      thumbSize={thumbSize}
      boundedThumb={boundedThumb}
      sliderThickness={sliderThickness}
      gestures={gestures}
      vertical={vertical}
      reverse={reverse}
      onBegin={onBegin}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <Animated.View
        style={[styles.panelImage, imageStyle, { borderRadius, flexDirection: isRtl ? 'row-reverse' : 'row' }]}
        renderToHardwareTextureAndroid={enableAndroidHardwareTextures}
        aria-hidden
      >
        <Image source={require('@assets/blackGradient.png')} style={{ flex: 1 }} tintColor='#fff' resizeMode='stretch' />
        <Image
          source={require('@assets/blackGradient.png')}
          style={{ flex: 1, transform: [{ scaleX: -1 }] }}
          resizeMode='stretch'
        />
      </Animated.View>

      <Thumb
        thumbShape={thumbShape}
        thumbSize={thumbSize}
        thumbColor={thumbColor}
        renderThumb={renderThumb}
        innerStyle={thumbInnerStyle}
        thumbAnimatedStyle={thumbAnimatedStyle}
        style={thumbStyle}
        vertical={vertical}
        getAdaptiveColor={getAdaptiveColor}
      />
    </SliderCore>
  );
}
