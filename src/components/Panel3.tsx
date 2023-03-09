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
import styles, { clamp, CTX } from '../GlobalStyles';
import Thumb from './Thumbs';

import type { LayoutChangeEvent } from 'react-native';
import type { PanelProps } from '../types';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function Panel3({ thumbShape, thumbSize, thumbColor, thumbStyle, thumbInnerStyle, style = {} }: PanelProps) {
  const {
    hueValue,
    saturationValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: thumbsSize,
    thumbColor: thumbsColor,
    thumbStyle: thumbsStyle,
    thumbInnerStyle: thumbsInnerStyle,
  } = useContext(CTX);

  const thumb_size = thumbSize ?? thumbsSize;
  const thumb_color = thumbColor ?? thumbsColor;
  const thumb_style = thumbStyle ?? thumbsStyle ?? {};
  const thumb_inner_style = thumbInnerStyle ?? thumbsInnerStyle ?? {};

  const width = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const panelStyle = useAnimatedStyle(() => ({ borderRadius: borderRadius.value }), [thumbSize]);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2,
      distance = (saturationValue.value / 100) * (width.value / 2),
      posY = width.value - Math.round(Math.sin((hueValue.value * Math.PI) / 180) * distance + center) - thumb_size / 2,
      posX = width.value - Math.round(Math.cos((hueValue.value * Math.PI) / 180) * distance + center) - thumb_size / 2;
    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [thumbSize]);

  const setValueFromGestureEvent = (event: PanGestureHandlerEventPayload) => {
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

  const gestureEvent = useAnimatedGestureHandler(
    {
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
    },
    [width.value]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutWidth = Math.round(layout.width);
    width.value = layoutWidth;
    borderRadius.value = withTiming(layoutWidth / 2, { duration: 5 });
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, style, { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 }, panelStyle]}
      >
        <ImageBackground source={require('../assets/Panel3.png')} style={styles.panel_image} resizeMode='stretch' />
        <Thumb
          {...{
            channel: 's',
            thumbShape,
            thumbSize: thumb_size,
            thumbColor: thumb_color,
            innerStyle: thumb_inner_style,
            style: thumb_style,
            handleStyle,
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}
