import React, { useContext, useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { styles } from '@styles';
import CTX from '@context';
import { clamp, getStyle } from '@utils';
import Thumb from '@thumb';

import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { Panel4Props } from '@types';

export function Panel4({
  thumbColor: localThumbColor,
  boundedThumb: localBoundedThumb,
  renderThumb: localRenderThumb,
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  reverse = false,
  style = {},
  imageSource,
}: Panel4Props) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: globalThumbsSize,
    thumbShape: globalThumbShape,
    thumbColor: globalThumbsColor,
    boundedThumb: globalBoundedThumb,
    renderThumb: globalRenderThumbs,
    thumbStyle: globalThumbsStyle,
    thumbInnerStyle: globalThumbsInnerStyle,
  } = useContext(CTX);

  const thumbShape = localThumbShape ?? globalThumbShape,
    thumbSize = localThumbSize ?? globalThumbsSize,
    thumbColor = localThumbColor ?? globalThumbsColor,
    boundedThumb = localBoundedThumb ?? globalBoundedThumb,
    renderThumb = localRenderThumb ?? globalRenderThumbs,
    thumbStyle = localThumbStyle ?? globalThumbsStyle ?? {},
    thumbInnerStyle = localThumbInnerStyle ?? globalThumbsInnerStyle ?? {};

  const borderRadius = getStyle(style, 'borderRadius') ?? 5,
    getHeight = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0),
    height = useSharedValue(0);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const length = { x: width.value - (boundedThumb ? thumbSize : 0), y: height.value - (boundedThumb ? thumbSize : 0) },
      saturationPercentX = (saturationValue.value / 100) * (length.x / 2),
      saturationPosX = saturationPercentX - (boundedThumb ? 0 : thumbSize / 2),
      brightnessPercentX = length.x - (brightnessValue.value / 100) * (length.x / 2),
      brightnessPosX = brightnessPercentX - (boundedThumb ? 0 : thumbSize / 2),
      posX = saturationPosX < length.x / 2 - (boundedThumb ? 0 : thumbSize / 2) ? saturationPosX : brightnessPosX,
      percentY = (hueValue.value / 360) * length.y,
      posY = (reverse ? percentY : length.y - percentY) - (boundedThumb ? 0 : thumbSize / 2);

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [localThumbSize, reverse]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0),
      lengthY = height.value - (boundedThumb ? thumbSize : 0),
      posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX),
      posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY),
      valueX = Math.round((posX / lengthX) * 200),
      valueY = Math.round((posY / lengthY) * 360),
      newHueValue = reverse ? valueY : 360 - valueY,
      newSaturationValue = clamp(valueX, 100),
      newBrightnessValue = clamp(200 - valueX, 100);

    if (
      hueValue.value === newHueValue &&
      saturationValue.value === newSaturationValue &&
      brightnessValue.value === newBrightnessValue
    )
      return;

    hueValue.value = newHueValue;
    saturationValue.value = newSaturationValue;
    brightnessValue.value = newBrightnessValue;
    runOnJS(onGestureChange)();
  };
  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    handleScale.value = withTiming(1.2, { duration: 100 });
    onGestureUpdate(event);
  };
  const onGestureFinish = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: 100 });
    runOnJS(onGestureEnd)();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Exclusive(pan, tap, longPress);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    width.value = layout.width;
    height.value = layout.height;
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, { height: getHeight }, style, { position: 'relative', borderWidth: 0, padding: 0 }]}
      >
        <ImageBackground
          source={imageSource ?? require('@assets/Panel4.png')}
          style={[styles.panel_image, { borderRadius, transform: [{ scaleY: reverse ? 1 : -1 }] }]}
          resizeMode='stretch'
        />
        <Thumb
          {...{
            thumbShape,
            thumbSize,
            thumbColor,
            renderThumb,
            innerStyle: thumbInnerStyle,
            style: thumbStyle,
            handleStyle,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}
