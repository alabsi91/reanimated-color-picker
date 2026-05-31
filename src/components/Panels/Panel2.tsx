import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { PanelCore } from '@panels/PanelCore';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, ConditionalRendering, getStyle, isRtl } from '@utils';

import type { Panel2Props } from '@types';

/** @see [Panel2](https://alabsi91.github.io/reanimated-color-picker/api/panels/panel2/) */
export function Panel2({
  verticalChannel = 'saturation',
  reverseHue = false,
  reverseVerticalChannel = false,
  gestures = [],
  style = {},
  ...props
}: Panel2Props) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const boundedThumb = props.boundedThumb ?? ctx.boundedThumb;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};
  const thumbScaleAnimationValue = props.thumbScaleUpValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleUpDuration ?? ctx.thumbScaleAnimationDuration;
  const adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const heightStyle = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const handleScale = useSharedValue(1);

  // HSL saturation is mathematically undefined (collapses to 0) when luminance is 0 or 100,
  // because those represent pure black and white regardless of saturation.
  // This ref holds the last valid saturation so we can restore it when luminance moves away from the boundary.
  const hslSaturationValue = useSharedValue(0);

  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);

    // At l=0 (black) or l=100 (white), the conversion loses saturation information.
    // Substitute the last known saturation so it's restored when luminance changes.
    if (l === 100 || l === 0) {
      return { h, s: hslSaturationValue.value, l };
    }

    hslSaturationValue.value = s;

    return { h, s, l };
  }, [hueValue, saturationValue, brightnessValue]);

  const verticalChannelValue = useDerivedValue(() => {
    if (verticalChannel === 'brightness') {
      return brightnessValue.value;
    }

    if (verticalChannel === 'hsl-saturation') {
      return hsl.value.s;
    }

    return saturationValue.value;
  }, [brightnessValue, saturationValue, hsl]);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const length = {
      x: width.value - (boundedThumb ? thumbSize : 0),
      y: height.value - (boundedThumb ? thumbSize : 0),
    };
    const percentX = (hueValue.value / 360) * length.x;
    const posX = (reverseHue ? length.x - percentX : percentX) - (boundedThumb ? 0 : thumbSize / 2);
    const percentY = (verticalChannelValue.value / 100) * length.y;
    const posY = (reverseVerticalChannel ? percentY : length.y - percentY) - (boundedThumb ? 0 : thumbSize / 2);

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [[width, height, hueValue, verticalChannelValue, handleScale, reverseHue, reverseVerticalChannel, boundedThumb, thumbSize]]);

  const spectrumStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};

    if (verticalChannel === 'brightness') {
      return {
        backgroundColor: `rgba(255, 255, 255, ${1 - saturationValue.value / 100})`,
      };
    }

    if (verticalChannel === 'hsl-saturation') {
      if (hsl.value.l < 50) {
        return {
          backgroundColor: `rgba(0, 0, 0, ${1 - hsl.value.l / 50})`,
        };
      }

      return {
        backgroundColor: `rgba(255, 255, 255, ${(hsl.value.l - 50) / 50})`,
      };
    }

    return {
      backgroundColor: `rgba(0, 0, 0, ${1 - brightnessValue.value / 100})`,
    };
  }, [saturationValue, brightnessValue, hsl, adaptSpectrum, verticalChannel]);

  const panelImageStyle = useAnimatedStyle(() => {
    return {
      // Width and height are intentionally swapped to correct dimensions after the rotation
      width: height.value,
      height: width.value,
      transform: [
        { rotate: reverseVerticalChannel ? '90deg' : '270deg' },
        { translateX: ((width.value - height.value) / 2) * (reverseVerticalChannel ? -1 : 1) },
        { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) * (reverseVerticalChannel ? -1 : 1) },
      ],
    };
  }, [width, height, reverseVerticalChannel]);

  const onBegin = () => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
  };

  const onUpdate = (newXValue: number, newYValue: number) => {
    'worklet';

    if (hueValue.value === newXValue && verticalChannelValue.value === newYValue) {
      return;
    }

    hueValue.value = newXValue;

    if (verticalChannel === 'hsl-saturation') {
      // Converting back from HSL→HSV at l=0 or l=100 would zero out HSV saturation and brightness,
      // locking the slider. Nudging l by ±0.01 keeps the conversion well-behaved without any
      // visible effect on the output color (values are rounded before use).
      const l = hsl.value.l === 0 ? 0.01 : hsl.value.l === 100 ? 99.99 : hsl.value.l;
      const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: newYValue, l }).object(false);
      saturationValue.value = s;
      brightnessValue.value = v;
    }
    // Vertical channel is brightness
    else if (verticalChannel === 'brightness') {
      brightnessValue.value = newYValue;
    }
    // Vertical channel is saturation
    else {
      saturationValue.value = newYValue;
    }

    onGestureChange();
  };

  const onGestureUpdate = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0);
    const lengthY = height.value - (boundedThumb ? thumbSize : 0);
    const posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX);
    const posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY);
    const valueX = (posX / lengthX) * 360;
    const valueY = (posY / lengthY) * 100;
    const newXValue = reverseHue ? 360 - valueX : valueX;
    const newYValue = reverseVerticalChannel ? valueY : 100 - valueY;

    onUpdate(newXValue, newYValue);
  };

  const onEnd = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const getAdaptiveColor = (hsva: { h: number; s: number; v: number; a: number }) => {
    'worklet';

    if (adaptSpectrum) {
      return hsva;
    }

    switch (verticalChannel) {
      case 'saturation':
        return { h: hsva.h, s: hsva.s, v: 100 };
      case 'brightness':
        return { h: hsva.h, s: 100, v: hsva.v };
      case 'hsl-saturation': {
        const { h, s } = hsl.value;
        return { h, s, l: 50 };
      }
      default:
        return hsva;
    }
  };

  return (
    <PanelCore
      style={[styles.panelContainer, style, { position: 'relative', height: heightStyle, borderWidth: 0, padding: 0 }]}
      label={props.accessibilityHint ?? `Hue and ${verticalChannel} 2D slider`}
      hint={props.accessibilityHint ?? `Double tap to switch between hue and ${verticalChannel}`}
      labelX='Hue'
      currentXValue={hueValue}
      maxXValue={360}
      labelY={verticalChannel}
      currentYValue={verticalChannelValue}
      reverseX={reverseHue}
      reverseY={reverseVerticalChannel}
      width={width}
      height={height}
      gestures={gestures}
      onGestureUpdate={onGestureUpdate}
      onBegin={onBegin}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <ImageBackground
        source={require('@assets/Hue.png')}
        style={[styles.panelImage, { position: 'relative', borderRadius, transform: [{ scaleX: reverseHue ? -1 : 1 }] }]}
        resizeMode='stretch'
        aria-hidden
      >
        <ConditionalRendering if={adaptSpectrum && verticalChannel === 'brightness'}>
          <Animated.View style={[spectrumStyle, StyleSheet.absoluteFill]} />
        </ConditionalRendering>

        <Animated.Image
          source={require('@assets/blackGradient.png')}
          style={[styles.panelImage, panelImageStyle]}
          tintColor={verticalChannel === 'saturation' ? '#fff' : verticalChannel === 'hsl-saturation' ? '#888' : undefined}
          resizeMode='stretch'
        />

        <ConditionalRendering if={adaptSpectrum && (verticalChannel === 'saturation' || verticalChannel === 'hsl-saturation')}>
          <Animated.View style={[spectrumStyle, StyleSheet.absoluteFill]} />
        </ConditionalRendering>
      </ImageBackground>

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
    </PanelCore>
  );
}
