import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, ConditionalRendering, getStyle, isRtl } from '@utils';

import type { Panel2Props } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

/** - A square-shaped slider (windows style) is utilized to adjust the hue and (saturation or brightness) channels. */
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
  const getHeight = getStyle(style, 'height') ?? 200;

  const containerRef = useRef<Animated.View>(null);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const handleScale = useSharedValue(1);
  const lastHslSaturationValue = useSharedValue(0);

  // We need to keep track of the HSL saturation value because, when the luminance is 0 or 100,
  // when converting to/from HSV, the previous saturation value will be lost.
  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);

    if (l === 100 || l === 0) {
      return { h, s: lastHslSaturationValue.value, l };
    }

    lastHslSaturationValue.value = s;

    return {
      h,
      s,
      l,
    };
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

  const handleStyle = useAnimatedStyle(() => {
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
  }, [width, height, hueValue, verticalChannelValue, handleScale]);

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
  }, [saturationValue, brightnessValue, hsl]);

  const panelImageStyle = useAnimatedStyle(() => {
    return {
      width: height.value,
      height: width.value,
      transform: [
        { rotate: reverseVerticalChannel ? '90deg' : '270deg' },
        { translateX: ((width.value - height.value) / 2) * (reverseVerticalChannel ? -1 : 1) },
        { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) * (reverseVerticalChannel ? -1 : 1) },
      ],
    };
  }, [width, height]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0);
    const lengthY = height.value - (boundedThumb ? thumbSize : 0);
    const posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX);
    const posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY);
    const valueX = (posX / lengthX) * 360;
    const valueY = (posY / lengthY) * 100;
    const newHueValue = reverseHue ? 360 - valueX : valueX;
    const newChannelValue = reverseVerticalChannel ? valueY : 100 - valueY;

    if (hueValue.value === newHueValue && verticalChannelValue.value === newChannelValue) return;

    hueValue.value = newHueValue;

    if (verticalChannel === 'hsl-saturation') {
      // To prevent locking this slider when the luminance is 0 or 100,
      // this should not affect the resulting color, as the value will be rounded.
      const l = hsl.value.l === 0 ? 0.01 : hsl.value.l === 100 ? 99.99 : hsl.value.l;
      const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: newChannelValue, l }).object(false);
      saturationValue.value = s;
      brightnessValue.value = v;
    } else if (verticalChannel === 'brightness') {
      brightnessValue.value = newChannelValue;
    } else {
      saturationValue.value = newChannelValue;
    }

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onEnd(onGestureFinish);
  const longPress = Gesture.LongPress().onEnd(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  // useLayoutEffect → paint → onLayout
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, layoutWidth, layoutHeight) => {
      if (!layoutWidth || !layoutHeight) return;
      width.value = layoutWidth;
      height.value = layoutHeight;
    });
  }, []);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!layout.width || !layout.height) return;
    width.value = layout.width;
    height.value = layout.height;
  }, []);

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
      case 'hsl-saturation':
        const { h, s } = hsl.value;
        return { h, s, l: 50 };
      default:
        return hsva;
    }
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={[styles.panelContainer, style, { position: 'relative', height: getHeight, borderWidth: 0, padding: 0 }]}
      >
        <ImageBackground
          source={require('@assets/Hue.png')}
          style={[styles.panelImage, { position: 'relative', borderRadius, transform: [{ scaleX: reverseHue ? -1 : 1 }] }]}
          resizeMode='stretch'
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
          handleStyle={handleStyle}
          style={thumbStyle}
          getAdaptiveColor={getAdaptiveColor}
        />
      </Animated.View>
    </GestureDetector>
  );
}
