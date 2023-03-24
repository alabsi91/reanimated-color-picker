import React, { useContext, useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { clamp, getStyle } from '@utils';
import { styles } from '@styles';
import CTX from '@context';
import Thumb from '../Thumb/Thumb';

import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { PanelProps } from '@types';

export function Panel1({
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbColor: localThumbColor,
  renderThumb: localRenderThumb,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  style = {},
}: PanelProps) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: globalThumbsSize,
    thumbShape: globalThumbShape,
    thumbColor: globalThumbsColor,
    renderThumb: globalRenderThumbs,
    thumbStyle: globalThumbsStyle,
    thumbInnerStyle: globalThumbsInnerStyle,
  } = useContext(CTX);

  const thumbShape = localThumbShape ?? globalThumbShape,
    thumbSize = localThumbSize ?? globalThumbsSize,
    thumbColor = localThumbColor ?? globalThumbsColor,
    renderThumb = localRenderThumb ?? globalRenderThumbs,
    thumbStyle = localThumbStyle ?? globalThumbsStyle ?? {},
    thumbInnerStyle = localThumbInnerStyle ?? globalThumbsInnerStyle ?? {};

  const borderRadius = getStyle(style, 'borderRadius') ?? 5,
    getHeight = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0),
    height = useSharedValue(0);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const percentX = (saturationValue.value / 100) * width.value;
    const posX = percentX - thumbSize / 2;
    const percentY = (brightnessValue.value / 100) * height.value;
    const posY = height.value - percentY - thumbSize / 2;
    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [localThumbSize]);

  const activeColorStyle = useAnimatedStyle(() => ({ backgroundColor: `hsl(${hueValue.value}, 100%, 50%)` }));

  const onGestureUpdate = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    const posX = clamp(event.x, width.value),
      posY = clamp(event.y, height.value),
      percentX = posX / width.value,
      percentY = posY / height.value;

    saturationValue.value = Math.round(percentX * 100);
    brightnessValue.value = Math.round(100 - percentY * 100);

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
        style={[
          styles.panel_container,
          { height: getHeight },
          style,
          { position: 'relative', borderWidth: 0, padding: 0 },
          activeColorStyle,
        ]}
      >
        <ImageBackground
          source={require('@assets/Panel1.png')}
          style={[styles.panel_image, { borderRadius }]}
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
