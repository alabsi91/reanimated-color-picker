import React from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { PanelCore } from '@panels/PanelCore';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, ConditionalRendering } from '@utils';
import { Panel3ContextProvider } from './Panel3Context';

import type { Panel3Props } from '@types';

/** @see [Panel3](https://alabsi91.github.io/reanimated-color-picker/api/panels/panel3/) */
export function Panel3({
  renderCenterLine = false,
  centerChannel = 'saturation',
  gestures = [],
  style = {},
  rotate = 0,
  children,
  ...props
}: Panel3Props) {
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
  const adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum;

  const isGestureActive = useSharedValue(false);
  const width = useSharedValue(0);
  const handleScale = useSharedValue(1);
  const lastHslSaturationValue = useSharedValue(0);
  const borderRadius = 2000;

  // We need to keep track of the HSL saturation value because, when the luminance is 0 or 100,
  // converting to/from HSV causes the previous saturation value to be lost.
  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };

    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);
    if (l === 100 || l === 0) {
      return {
        h,
        s: lastHslSaturationValue.value,
        l,
      };
    }

    lastHslSaturationValue.value = s;

    return {
      h,
      s,
      l,
    };
  }, [hueValue, saturationValue, brightnessValue]);

  const centerChannelValue = useDerivedValue(() => {
    if (centerChannel === 'brightness') {
      return brightnessValue.value;
    }

    if (centerChannel === 'hsl-saturation') {
      return hsl.value.s;
    }

    return saturationValue.value;
  }, [brightnessValue, saturationValue, hsl]);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0);
    const rotatedHue = (hueValue.value - rotate) % 360;
    const distance = (centerChannelValue.value / 100) * (width.value / 2 - (boundedThumb ? thumbSize / 2 : 0));
    const angle = (rotatedHue * Math.PI) / 180;
    const posY = width.value - (Math.sin(angle) * distance + center) - (boundedThumb ? thumbSize : thumbSize / 2);
    const posX = width.value - (Math.cos(angle) * distance + center) - (boundedThumb ? thumbSize : thumbSize / 2);

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }, { rotate: rotatedHue + 90 + 'deg' }],
    };
  }, [width, centerChannelValue, hueValue, handleScale, boundedThumb, thumbSize, rotate]);

  const spectrumStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) {
      return {};
    }

    if (centerChannel === 'brightness') {
      return { backgroundColor: `rgba(255, 255, 255, ${1 - saturationValue.value / 100})` };
    }

    if (centerChannel === 'hsl-saturation') {
      if (hsl.value.l < 50) {
        return { backgroundColor: `rgba(0, 0, 0, ${1 - hsl.value.l / 50})` };
      }

      return { backgroundColor: `rgba(255, 255, 255, ${(hsl.value.l - 50) / 50})` };
    }

    return { backgroundColor: `rgba(0, 0, 0, ${1 - brightnessValue.value / 100})` };
  }, [saturationValue, brightnessValue, hsl, adaptSpectrum, centerChannel]);

  const centerLineStyle = useAnimatedStyle(() => {
    if (!renderCenterLine) {
      return {};
    }

    const lineThickness = 1;
    const center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0);
    const rotatedHue = (hueValue.value - rotate) % 360;
    const distance = (centerChannelValue.value / 100) * center;
    const angle = (rotatedHue + 180) % 360; // reversed angle

    return {
      top: (width.value - lineThickness) / 2,
      left: (width.value - distance) / 2,
      height: lineThickness,
      width: distance,
      transform: [{ rotate: angle + 'deg' }, { translateX: distance / 2 }],
    };
  }, [width, hueValue, centerChannelValue, renderCenterLine, boundedThumb, thumbSize, rotate]);

  const onBegin = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    const radius = width.value / 2;
    const dx = radius - x;
    const dy = radius - y;
    const pressDistance = Math.sqrt(dx * dx + dy * dy);

    // Check if the press is outside the circle
    if (pressDistance > radius) {
      isGestureActive.value = false;
      return;
    }

    isGestureActive.value = true;
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
  };

  const onUpdate = (newXValue: number, newYValue: number) => {
    'worklet';

    if (hueValue.value === newXValue && centerChannelValue.value === newYValue) {
      return;
    }

    hueValue.value = newXValue;

    if (centerChannel === 'hsl-saturation') {
      // To prevent locking this slider when the luminance is 0 or 100,
      // this should not affect the resulting color, as the value will be rounded.
      const l = hsl.value.l === 0 ? 0.01 : hsl.value.l === 100 ? 99.99 : hsl.value.l;
      const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: newYValue, l }).object(false);
      saturationValue.value = s;
      brightnessValue.value = v;
    }
    // Vertical channel is brightness
    else if (centerChannel === 'brightness') {
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

    if (!isGestureActive.value) return;

    const center = (width.value - (boundedThumb ? thumbSize : 0)) / 2;
    const dx = center - x + (boundedThumb ? thumbSize / 2 : 0);
    const dy = center - y + (boundedThumb ? thumbSize / 2 : 0);
    const radius = clamp(Math.sqrt(dx * dx + dy * dy), center); // distance from center
    const theta = Math.atan2(dy, dx) * (180 / Math.PI); // [0 - 180] range
    const angle = theta < 0 ? 360 + theta : theta; // [0 - 360] range
    const radiusPercent = radius / center;
    const newHueValue = (angle + rotate) % 360;
    const newChannelValue = radiusPercent * 100;

    onUpdate(newHueValue, newChannelValue);
  };

  const onEnd = () => {
    'worklet';
    isGestureActive.value = false;
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const getAdaptiveColor = (hsva: { h: number; s: number; v: number; a: number }) => {
    'worklet';

    if (adaptSpectrum) {
      return hsva;
    }

    switch (centerChannel) {
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
    <Panel3ContextProvider
      value={{
        width,
        adaptSpectrum,
        centerChannel,
        centerChannelValue,
        thumbShape,
        thumbColor,
        thumbStyle,
        thumbInnerStyle,
        renderThumb,
        boundedThumb,
        renderCenterLine,
        thumbSize,
        rotate,
      }}
    >
      <PanelCore
        style={[styles.panelContainer, style, { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0, borderRadius }]}
        label={props.accessibilityLabel ?? `Hue and ${centerChannel} wheel slider`}
        hint={props.accessibilityHint ?? `Double tap to switch between hue and ${centerChannel}`}
        labelX='Hue'
        currentXValue={hueValue}
        maxXValue={360}
        labelY={centerChannel}
        currentYValue={centerChannelValue}
        width={width}
        gestures={gestures}
        onGestureUpdate={onGestureUpdate}
        onBegin={onBegin}
        onUpdate={onUpdate}
        onEnd={onEnd}
      >
        <ImageBackground
          source={require('@assets/circularHue.png')}
          style={styles.panelImage}
          imageStyle={{ transform: [{ rotate: -rotate + 'deg' }] }}
          resizeMode='stretch'
          aria-hidden
        >
          <ConditionalRendering if={adaptSpectrum && centerChannel === 'brightness'}>
            <Animated.View style={[{ borderRadius }, spectrumStyle, StyleSheet.absoluteFill]} />
          </ConditionalRendering>

          <Image
            source={require('@assets/blackRadial.png')}
            style={styles.panelImage}
            tintColor={centerChannel === 'saturation' ? '#fff' : centerChannel === 'hsl-saturation' ? '#888' : undefined}
            resizeMode='stretch'
          />

          <ConditionalRendering if={adaptSpectrum && (centerChannel === 'saturation' || centerChannel === 'hsl-saturation')}>
            <Animated.View style={[{ borderRadius }, spectrumStyle, StyleSheet.absoluteFill]} />
          </ConditionalRendering>
        </ImageBackground>

        <ConditionalRendering if={renderCenterLine}>
          <Animated.View style={[styles.panel3Line, centerLineStyle]} aria-hidden />
        </ConditionalRendering>

        {children}

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
    </Panel3ContextProvider>
  );
}
