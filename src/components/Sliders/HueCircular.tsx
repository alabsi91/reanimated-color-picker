import React, { useContext, useCallback } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { styles } from '@styles';
import { HSVA2HSLA } from '@utils';
import CTX from '@context';
import Thumb from '@thumb';

import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { HueCircular } from '@types';

export function HueCircular({
  adaptSpectrum: localAdaptSpectrum,
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbColor: localThumbColor,
  renderThumb: localRenderThumb,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  sliderThickness: localSliderThickness,
  children,
  style = {},
  containerStyle = {},
}: HueCircular) {
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
    renderThumb: globalRenderThumbs,
    thumbStyle: globalThumbsStyle,
    thumbInnerStyle: globalThumbsInnerStyle,
    sliderThickness: globalSliderThickness,
  } = useContext(CTX);

  const thumbShape = localThumbShape ?? globalThumbShape,
    thumbSize = localThumbSize ?? globalThumbsSize,
    thumbColor = localThumbColor ?? globalThumbsColor,
    renderThumb = localRenderThumb ?? globalRenderThumbs,
    thumbStyle = localThumbStyle ?? globalThumbsStyle ?? {},
    sliderThickness = localSliderThickness ?? globalSliderThickness,
    adaptSpectrum = localAdaptSpectrum ?? globalAdaptSpectrum,
    thumbInnerStyle = localThumbInnerStyle ?? globalThumbsInnerStyle ?? {};

  const isGestureActive = useSharedValue(false);
  const width = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const borderRadiusStyle = useAnimatedStyle(() => ({ borderRadius: borderRadius.value }), [localThumbSize]);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2,
      distance = (width.value - sliderThickness) / 2,
      posY = width.value - Math.round(Math.sin((hueValue.value * Math.PI) / 180) * distance + center) - thumbSize / 2,
      posX = width.value - Math.round(Math.cos((hueValue.value * Math.PI) / 180) * distance + center) - thumbSize / 2;
    return {
      transform: [
        { translateX: posX },
        { translateY: posY },
        { scale: handleScale.value },
        { rotate: hueValue.value + 90 + 'deg' },
      ],
    };
  }, [localThumbSize]);

  const activeSaturationStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};
    return { backgroundColor: HSVA2HSLA(0, 0, brightnessValue.value, 1 - saturationValue.value / 100) };
  });
  const activeBrightnessStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};
    return { backgroundColor: HSVA2HSLA(0, 0, 0, 1 - brightnessValue.value / 100) };
  });
  const clipViewStyle = useAnimatedStyle(() => ({
    width: width.value - sliderThickness * 2,
    height: width.value - sliderThickness * 2,
    borderRadius: width.value / 2,
  }));

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = width.value / 2,
      dx = center - x,
      dy = center - y,
      theta = Math.atan2(dy, dx) * (180 / Math.PI), // [0 - 180] range
      angle = theta < 0 ? 360 + theta : theta, // [0 - 360] range
      newHueValue = Math.round(angle);

    if (hueValue.value === newHueValue) return;

    hueValue.value = newHueValue;
    runOnJS(onGestureChange)();
  };
  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    const center = width.value / 2;
    const r = width.value / 2 - sliderThickness;
    const distance = Math.sqrt(Math.pow(event.x - center, 2) + Math.pow(event.y - center, 2));
    if (distance > r) isGestureActive.value = true;
    else return;
    handleScale.value = withTiming(1.2, { duration: 100 });
    onGestureUpdate(event);
  };
  const onGestureFinish = () => {
    'worklet';
    isGestureActive.value = false;

    handleScale.value = withTiming(1, { duration: 100 });
    runOnJS(onGestureEnd)();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Exclusive(pan, tap, longPress);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutWidth = layout.width;
    width.value = layoutWidth;
    borderRadius.value = withTiming(layoutWidth / 2, { duration: 5 });
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.panel_container,
          style,
          { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 },
          borderRadiusStyle,
        ]}
      >
        <ImageBackground
          source={require('@assets/circularHue.png')}
          style={[styles.panel_image, { justifyContent: 'center', alignItems: 'center' }]}
          resizeMode='stretch'
        >
          {adaptSpectrum && (
            <>
              <Animated.View style={[borderRadiusStyle, activeBrightnessStyle, StyleSheet.absoluteFillObject]} />
              <Animated.View style={[borderRadiusStyle, activeSaturationStyle, StyleSheet.absoluteFillObject]} />
            </>
          )}
          <Animated.View style={[clipViewStyle, { backgroundColor: '#fff' }, containerStyle]}>{children}</Animated.View>
        </ImageBackground>
        <Thumb
          {...{
            channel: 'h',
            thumbShape,
            thumbSize,
            thumbColor,
            renderThumb,
            innerStyle: thumbInnerStyle,
            style: thumbStyle,
            handleStyle,
            adaptSpectrum,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}
