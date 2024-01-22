import React, { useCallback } from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, ConditionalRendering } from '@utils';
import { Panel3ContextProvider } from './Panel3Context';

import type { Panel3Props } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

/** - The circle-shaped slider, with its wheel style design, is utilized to adjust the hue and (saturation or brightness) of colors. */
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

  const thumbShape = props.thumbShape ?? ctx.thumbShape,
    thumbSize = props.thumbSize ?? ctx.thumbSize,
    thumbColor = props.thumbColor ?? ctx.thumbColor,
    boundedThumb = props.boundedThumb ?? ctx.boundedThumb,
    renderThumb = props.renderThumb ?? ctx.renderThumb,
    thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {},
    thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {},
    adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum;

  const borderRadius = 2000;

  const isGestureActive = useSharedValue(false);
  const width = useSharedValue(0);
  const handleScale = useSharedValue(1);
  const lastHslSaturationValue = useSharedValue(0);

  // We need to keep track of the HSL saturation value because, when the luminance is 0 or 100,
  // when converting to/from HSV, the previous saturation value will be lost.
  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);
    if (l === 100 || l === 0) return { h, s: lastHslSaturationValue.value, l };
    lastHslSaturationValue.value = s;
    return { h, s, l };
  }, [hueValue, saturationValue, brightnessValue]);

  const centerChannelValue = useDerivedValue(() => {
    if (centerChannel === 'brightness') return brightnessValue.value;
    if (centerChannel === 'hsl-saturation') return hsl.value.s;
    return saturationValue.value;
  }, [brightnessValue, saturationValue, hsl]);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0),
      rotatedHue = (hueValue.value - rotate) % 360,
      distance = (centerChannelValue.value / 100) * (width.value / 2 - (boundedThumb ? thumbSize / 2 : 0)),
      angle = (rotatedHue * Math.PI) / 180,
      posY = width.value - (Math.sin(angle) * distance + center) - (boundedThumb ? thumbSize : thumbSize / 2),
      posX = width.value - (Math.cos(angle) * distance + center) - (boundedThumb ? thumbSize : thumbSize / 2);

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }, { rotate: rotatedHue + 90 + 'deg' }],
    };
  }, [width, centerChannelValue, hueValue, handleScale]);

  const spectrumStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};

    if (centerChannel === 'brightness') {
      return { backgroundColor: `hsla(0, 0%, ${100}%, ${1 - saturationValue.value / 100})` };
    }

    if (centerChannel === 'hsl-saturation') {
      return {
        backgroundColor:
          hsl.value.l < 50 ? `rgba(0, 0, 0, ${1 - hsl.value.l / 50})` : `rgba(255, 255, 255, ${(hsl.value.l - 50) / 50})`,
      };
    }

    return { backgroundColor: `rgba(0, 0, 0, ${1 - brightnessValue.value / 100})` };
  }, [saturationValue, brightnessValue]);

  const centerLineStyle = useAnimatedStyle(() => {
    if (!renderCenterLine) return {};

    const lineThickness = 1,
      center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0),
      rotatedHue = (hueValue.value - rotate) % 360,
      distance = (centerChannelValue.value / 100) * center,
      angle = ((rotatedHue * Math.PI) / Math.PI + 180) % 360; // reversed angle

    return {
      top: (width.value - lineThickness) / 2,
      left: (width.value - distance) / 2,
      height: lineThickness,
      width: distance,
      transform: [{ rotate: angle + 'deg' }, { translateX: distance / 2 }, { translateY: 0 }],
    };
  }, [width, hueValue, centerChannelValue]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = (width.value - (boundedThumb ? thumbSize : 0)) / 2,
      dx = center - x + (boundedThumb ? thumbSize / 2 : 0),
      dy = center - y + (boundedThumb ? thumbSize / 2 : 0),
      radius = clamp(Math.sqrt(dx * dx + dy * dy), center), // distance from center
      theta = Math.atan2(dy, dx) * (180 / Math.PI), // [0 - 180] range
      angle = theta < 0 ? 360 + theta : theta, // [0 - 360] range
      radiusPercent = radius / center,
      newHueValue = (angle + rotate) % 360,
      newChannelValue = radiusPercent * 100;

    if (hueValue.value === newHueValue && centerChannelValue.value === newChannelValue) return;

    hueValue.value = newHueValue;

    if (centerChannel === 'hsl-saturation') {
      // To prevent locking this slider when the luminance is 0 or 100,
      // this should not affect the resulting color, as the value will be rounded.
      const l = hsl.value.l === 0 ? 0.01 : hsl.value.l === 100 ? 99.99 : hsl.value.l;
      const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: newChannelValue, l }).object(false);
      saturationValue.value = s;
      brightnessValue.value = v;
    } else if (centerChannel === 'brightness') {
      brightnessValue.value = newChannelValue;
    } else {
      saturationValue.value = newChannelValue;
    }

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    const R = width.value / 2,
      dx = R - event.x,
      dy = R - event.y,
      clickR = Math.sqrt(dx * dx + dy * dy);

    // Check if the press is outside the circle
    if (clickR > R) {
      isGestureActive.value = false;
      return;
    }

    isGestureActive.value = true;

    handleScale.value = withTiming(1.2, { duration: 100 });
    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    isGestureActive.value = false;
    handleScale.value = withTiming(1, { duration: 100 });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutWidth = layout.width;
    width.value = layoutWidth;
  }, []);

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
      <GestureDetector gesture={composed}>
        <Animated.View
          onLayout={onLayout}
          style={[
            styles.panel_container,
            style,
            { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0, borderRadius },
          ]}
        >
          <ImageBackground
            source={require('@assets/circularHue.png')}
            style={styles.panel_image}
            imageStyle={{ transform: [{ rotate: -rotate + 'deg' }] }}
            resizeMode='stretch'
          >
            <ConditionalRendering if={adaptSpectrum && centerChannel === 'brightness'}>
              <Animated.View style={[{ borderRadius }, spectrumStyle, StyleSheet.absoluteFillObject]} />
            </ConditionalRendering>

            <Image
              source={require('@assets/blackRadial.png')}
              style={[
                styles.panel_image,
                { tintColor: centerChannel === 'saturation' ? '#fff' : centerChannel === 'hsl-saturation' ? '#888' : undefined },
              ]}
              resizeMode='stretch'
            />

            <ConditionalRendering if={adaptSpectrum && (centerChannel === 'saturation' || centerChannel === 'hsl-saturation')}>
              <Animated.View style={[{ borderRadius }, spectrumStyle, StyleSheet.absoluteFillObject]} />
            </ConditionalRendering>
          </ImageBackground>

          <ConditionalRendering if={renderCenterLine}>
            <Animated.View style={[styles.panel3Line, centerLineStyle]} />
          </ConditionalRendering>

          {children}

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
          />
        </Animated.View>
      </GestureDetector>
    </Panel3ContextProvider>
  );
}
