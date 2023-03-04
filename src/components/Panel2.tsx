import React, { useContext, useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles, { CTX, getStyle } from '../GlobalStyles';
import Thumb from './Thumbs';

import type { LayoutChangeEvent } from 'react-native';
import type { Panel2Props } from '../types';
import { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function Panel2({ thumbShape, thumbSize, thumbColor, reverse = false, style = {} }: Panel2Props) {
  const {
    hueValue,
    saturationValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: thumbsSize,
    thumbColor: thumbsColor,
  } = useContext(CTX);

  const thumb_size = thumbSize ?? thumbsSize;
  const thumb_color = thumbColor ?? thumbsColor;

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

  const clamp = (v: number, max: number) => {
    'worklet';
    return Math.min(Math.max(v, 0), max);
  };

  const setValueFromGestureEvent = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    const posX = clamp(event.x, width.value),
      posY = clamp(event.y, height.value),
      percentX = posX / width.value,
      percentY = posY / height.value;

    hueValue.value = reverse ? 360 - Math.round(percentX * 360) : Math.round(percentX * 360);
    saturationValue.value = Math.round(100 - percentY * 100);

    runOnJS(onGestureChange)();
  };

  const gestureEvent = useAnimatedGestureHandler({
    onStart: event => {
      handleScale.value = withTiming(1.2, { duration: 100 });
      setValueFromGestureEvent(event);
    },
    onActive: event => {
      setValueFromGestureEvent(event);
    },
    onFinish: () => {
      handleScale.value = withTiming(1, { duration: 100 });
      runOnJS(onGestureEnd)();
    },
  });

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    width.value = Math.round(layout.width);
    height.value = Math.round(layout.height);
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, { height: getHeight }, style, { position: 'relative', borderWidth: 0, padding: 0 }]}
      >
        <ImageBackground
          source={require('../assets/Panel2.png')}
          style={[styles.panel_image, { borderRadius, transform: [{ scaleX: reverse ? -1 : 1 }] }]}
          resizeMode='stretch'
        />
        <Thumb {...{ channel: 's', thumbShape, thumbSize: thumb_size, thumbColor: thumb_color, handleStyle }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
