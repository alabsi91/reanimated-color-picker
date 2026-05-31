import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { SliderCore } from '@sliders/SliderCore';
import Thumb from '@thumb';
import { getStyle, HSVA2HSLA_string, isRtl, isWeb, RenderNativeOnly, RenderWebOnly } from '@utils';

import type { SliderProps } from '@types';

/** @see [OpacitySlider](https://alabsi91.github.io/reanimated-color-picker/api/sliders/opacity-slider/) */
export function OpacitySlider({ gestures = [], style = {}, vertical = false, reverse = false, ...props }: SliderProps) {
  const { hueValue, saturationValue, brightnessValue, alphaValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

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

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const percent = alphaValue.value * length;
    const pos = (reverse ? length - percent : percent) - (boundedThumb ? 0 : thumbSize / 2);
    const posY = vertical ? pos : height.value / 2 - thumbSize / 2;
    const posX = vertical ? width.value / 2 - thumbSize / 2 : pos;

    return {
      transform: [{ translateY: posY }, { translateX: posX }, { scale: handleScale.value }],
    };
  }, [width, height, alphaValue, handleScale, vertical, reverse, boundedThumb, thumbSize]);

  const activeColorStyle = useAnimatedStyle(() => {
    if (!isWeb) {
      return { backgroundColor: '#0000' };
    }

    const deg = vertical ? (reverse ? 1 : 180) : reverse ? 270 : 90;
    const color = HSVA2HSLA_string(
      hueValue.value,
      adaptSpectrum ? saturationValue.value : 100,
      adaptSpectrum ? brightnessValue.value : 100,
    );

    return {
      background: `linear-gradient(${deg}deg, transparent 0%, ${color} 100%)`,
    };
  }, [hueValue, saturationValue, brightnessValue, vertical, reverse]);

  const imageStyle = useAnimatedStyle(() => {
    if (isWeb) {
      return {};
    }

    const imageRotate = vertical ? (reverse ? '90deg' : '270deg') : reverse ? '0deg' : '180deg';
    const imageTranslateY = ((height.value - width.value) / 2) * ((reverse && isRtl) || (!reverse && !isRtl) ? -1 : 1);

    return {
      width: vertical ? height.value : '100%',
      height: vertical ? width.value : '100%',
      transform: [
        { rotate: imageRotate },
        { translateX: vertical ? ((height.value - width.value) / 2) * (reverse ? 1 : -1) : 0 },
        { translateY: vertical ? imageTranslateY : 0 },
      ],
    };
  }, [width, height, vertical, reverse]);

  const imageTintColorProp = useAnimatedProps(() => {
    return {
      tintColor: HSVA2HSLA_string(
        hueValue.value,
        adaptSpectrum ? saturationValue.value : 100,
        adaptSpectrum ? brightnessValue.value : 100,
      ),
    };
  }, [hueValue, saturationValue, brightnessValue, adaptSpectrum]);

  const onBegin = () => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
  };

  const onUpdate = (newValue: number) => {
    'worklet';

    if (alphaValue.value === newValue) {
      return;
    }

    alphaValue.value = newValue;

    onGestureChange();
  };

  const onEnd = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const getAdaptiveColor = (hsva: { h: number; s: number; v: number; a: number }) => {
    'worklet';
    return hsva.a > 0.5 ? hsva : { h: 0, s: 0, v: 100 };
  };

  return (
    <SliderCore
      style={[style, { position: 'relative', borderRadius, borderWidth: 0, padding: 0 }, isWeb ? webTransparentTexture : {}]}
      maxValue={1}
      step={0.01}
      label={props.accessibilityLabel ?? 'Opacity Slider'}
      hint={props.accessibilityHint}
      currentValue={alphaValue}
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
      <RenderNativeOnly>
        <Image
          source={require('@assets/transparent-texture.png')}
          style={[{ width: '100%', height: '100%', borderRadius }, StyleSheet.absoluteFill]}
          resizeMode='repeat'
          aria-hidden
        />

        <View style={{ flex: 1, borderRadius, overflow: 'hidden' }} aria-hidden>
          <Animated.Image
            source={require('@assets/blackGradient.png')}
            style={imageStyle}
            resizeMode='stretch'
            animatedProps={imageTintColorProp}
          />
        </View>
      </RenderNativeOnly>

      <RenderWebOnly>
        <Animated.View style={[{ flex: 1, borderRadius }, activeColorStyle]} aria-hidden />
      </RenderWebOnly>

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

const webTransparentTexture = {
  flex: undefined,
  backgroundImage:
    'repeating-linear-gradient(45deg, #c1c1c1 25%, transparent 25%, transparent 75%, #c1c1c1 75%, #c1c1c1), repeating-linear-gradient(45deg, #c1c1c1 25%, #fff 25%, #fff 75%, #c1c1c1 75%, #c1c1c1)',
  backgroundPosition: '0px 0px, 8px 8px',
  backgroundSize: '16px 16px',
};
