import React, { useCallback } from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, ConditionalRendering, HSVA2HSLA_string } from '@utils';

import type { Panel3Props } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

/**
 * - The circle-shaped slider, with its wheel style design, is utilized to adjust the hue and (saturation or brightness) of colors.
 */
export function Panel3({
  adaptSpectrum: localAdaptSpectrum,
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbColor: localThumbColor,
  boundedThumb: localBoundedThumb,
  renderThumb: localRenderThumb,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  renderCenterLine = false,
  centerChannel = 'saturation',
  style = {},
}: Panel3Props) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    adaptSpectrum: globalAdaptSpectrum,
    thumbSize: globalThumbsSize,
    thumbShape: globalThumbShape,
    thumbColor: globalThumbsColor,
    boundedThumb: globalBoundedThumb,
    renderThumb: globalRenderThumbs,
    thumbStyle: globalThumbsStyle,
    thumbInnerStyle: globalThumbsInnerStyle,
  } = usePickerContext();

  const thumbShape = localThumbShape ?? globalThumbShape,
    thumbSize = localThumbSize ?? globalThumbsSize,
    thumbColor = localThumbColor ?? globalThumbsColor,
    boundedThumb = localBoundedThumb ?? globalBoundedThumb,
    renderThumb = localRenderThumb ?? globalRenderThumbs,
    thumbStyle = localThumbStyle ?? globalThumbsStyle ?? {},
    thumbInnerStyle = localThumbInnerStyle ?? globalThumbsInnerStyle ?? {},
    adaptSpectrum = localAdaptSpectrum ?? globalAdaptSpectrum,
    channelValue = centerChannel === 'brightness' ? brightnessValue : saturationValue;

  const borderRadius = 2000;

  const isGestureActive = useSharedValue(false);
  const width = useSharedValue(0);
  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0),
      distance = (channelValue.value / 100) * (width.value / 2 - (boundedThumb ? thumbSize / 2 : 0)),
      posY =
        width.value -
        Math.round(Math.sin((hueValue.value * Math.PI) / 180) * distance + center) -
        (boundedThumb ? thumbSize : thumbSize / 2),
      posX =
        width.value -
        Math.round(Math.cos((hueValue.value * Math.PI) / 180) * distance + center) -
        (boundedThumb ? thumbSize : thumbSize / 2);
    return {
      transform: [
        { translateX: posX },
        { translateY: posY },
        { scale: handleScale.value },
        { rotate: hueValue.value + 90 + 'deg' },
      ],
    };
  }, [thumbSize, boundedThumb, width, channelValue, hueValue, handleScale]);

  const spectrumStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};
    if (centerChannel === 'brightness') return { backgroundColor: HSVA2HSLA_string(0, 0, 100, 1 - saturationValue.value / 100) };
    return { backgroundColor: HSVA2HSLA_string(0, 0, 0, 1 - brightnessValue.value / 100) };
  }, [adaptSpectrum, centerChannel, saturationValue, brightnessValue]);

  const centerLineStyle = useAnimatedStyle(() => {
    if (!renderCenterLine) return {};

    const lineThickness = 1,
      center = width.value / 2 - (boundedThumb ? thumbSize / 2 : 0),
      distance = (channelValue.value / 100) * center,
      angle = ((hueValue.value * Math.PI) / Math.PI + 180) % 360; // reversed angle

    return {
      top: (width.value - lineThickness) / 2,
      left: (width.value - distance) / 2,
      height: lineThickness,
      width: distance,
      transform: [{ rotate: angle + 'deg' }, { translateX: distance / 2 }, { translateY: 0 }],
    };
  }, [renderCenterLine, boundedThumb, thumbSize, width, hueValue, channelValue]);

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
      newHueValue = Math.round(angle),
      newChannelValue = Math.round(radiusPercent * 100);

    if (hueValue.value === newHueValue && channelValue.value === newChannelValue) return;

    hueValue.value = newHueValue;
    channelValue.value = newChannelValue;
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
  const composed = Gesture.Exclusive(pan, tap, longPress);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutWidth = layout.width;
    width.value = layoutWidth;
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.panel_container,
          style,
          { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0, borderRadius },
        ]}
      >
        <ImageBackground source={require('@assets/circularHue.png')} style={styles.panel_image} resizeMode='stretch'>
          <ConditionalRendering if={adaptSpectrum && centerChannel === 'brightness'}>
            <Animated.View style={[{ borderRadius }, spectrumStyle, StyleSheet.absoluteFillObject]} />
          </ConditionalRendering>

          <Image
            source={require('@assets/blackRadial.png')}
            style={[styles.panel_image, { tintColor: centerChannel === 'saturation' ? '#fff' : undefined }]}
            resizeMode='stretch'
          />

          <ConditionalRendering if={adaptSpectrum && centerChannel === 'saturation'}>
            <Animated.View style={[{ borderRadius }, spectrumStyle, StyleSheet.absoluteFillObject]} />
          </ConditionalRendering>
        </ImageBackground>

        <ConditionalRendering if={renderCenterLine}>
          <Animated.View style={[styles.panel3Line, centerLineStyle]} />
        </ConditionalRendering>

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
  );
}
