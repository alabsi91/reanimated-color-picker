import React, { useContext, useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Thumb from './Thumb/Thumb';
import { clamp, getStyle } from '../utils';
import { CTX } from '../ColorPicker';
import { styles } from '../styles';

import type { LayoutChangeEvent } from 'react-native';
import type { Panel2Props } from '../types';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function Panel2({
  thumbColor,
  renderThumb,
  thumbShape,
  thumbSize,
  thumbStyle,
  thumbInnerStyle,
  reverse = false,
  style = {},
}: Panel2Props) {
  const {
    hueValue,
    saturationValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: thumbsSize,
    thumbColor: thumbsColor,
    renderThumb: renderThumbs,
    thumbStyle: thumbsStyle,
    thumbInnerStyle: thumbsInnerStyle,
  } = useContext(CTX);

  const thumb_size = thumbSize ?? thumbsSize;
  const thumb_color = thumbColor ?? thumbsColor;
  const render_thumb = renderThumb ?? renderThumbs;
  const thumb_style = thumbStyle ?? thumbsStyle ?? {};
  const thumb_inner_style = thumbInnerStyle ?? thumbsInnerStyle ?? {};

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const getHeight = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const percentX = (hueValue.value / 360) * width.value;
    const posX = (reverse ? width.value - percentX : percentX) - thumb_size / 2;
    const percentY = (saturationValue.value / 100) * height.value;
    const posY = height.value - percentY - thumb_size / 2;
    return { transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }] };
  }, [thumbSize, reverse]);

  const onGestureUpdate = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    const posX = clamp(event.x, width.value),
      posY = clamp(event.y, height.value),
      percentX = posX / width.value,
      percentY = posY / height.value;

    hueValue.value = reverse ? 360 - Math.round(percentX * 360) : Math.round(percentX * 360);
    saturationValue.value = Math.round(100 - percentY * 100);

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
    width.value = Math.round(layout.width);
    height.value = Math.round(layout.height);
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, { height: getHeight }, style, { position: 'relative', borderWidth: 0, padding: 0 }]}
      >
        <ImageBackground
          source={require('../assets/Panel2.png')}
          style={[styles.panel_image, { borderRadius, transform: [{ scaleX: reverse ? -1 : 1 }] }]}
          resizeMode='stretch'
        />
        <Thumb
          {...{
            channel: 's',
            thumbShape,
            thumbSize: thumb_size,
            thumbColor: thumb_color,
            renderThumb: render_thumb,
            innerStyle: thumb_inner_style,
            style: thumb_style,
            handleStyle,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}
