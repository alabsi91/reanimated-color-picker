import React, { useContext, useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { clamp } from '@utils';
import { styles } from '@styles';
import CTX from '@context';
import Thumb from '../Thumb/Thumb';

import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { PanelProps } from '@types';

export function Panel3({
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

  const width = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const panelStyle = useAnimatedStyle(() => ({ borderRadius: borderRadius.value }), [localThumbSize]);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2,
      distance = (saturationValue.value / 100) * (width.value / 2),
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

  const onGestureUpdate = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    const center = width.value / 2,
      dx = center - event.x,
      dy = center - event.y,
      radius = clamp(Math.sqrt(dx * dx + dy * dy), width.value / 2), // distance from center
      theta = Math.atan2(dy, dx) * (180 / Math.PI), // [0 - 180] range
      angle = theta < 0 ? 360 + theta : theta, // [0 - 360] range
      radiusPercent = radius / (width.value / 2);

    hueValue.value = Math.round(angle);
    saturationValue.value = Math.round(radiusPercent * 100);

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
    const layoutWidth = Math.round(layout.width);
    width.value = layoutWidth;
    borderRadius.value = withTiming(layoutWidth / 2, { duration: 5 });
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, style, { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 }, panelStyle]}
      >
        <ImageBackground source={require('@assets/Panel3.png')} style={styles.panel_image} resizeMode='stretch' />
        <Thumb
          {...{
            channel: 's',
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
