import React, { useState, useContext, useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles, { CTX } from '../GlobalStyles';
import Thumb from './Thumbs';

import type { LayoutChangeEvent } from 'react-native';
import type { PanelProps } from '../types';

export function Panel3({ thumbShape, thumbSize, thumbColor, style = {} }: PanelProps) {
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

  const [width, setWidth] = useState(0);
  const borderRadius = width / 2;

  const handleScale = useSharedValue(1);

  const handlePosX = useDerivedValue(() => {
    const center = width / 2;
    const distance = (saturationValue.value / 100) * (width / 2);
    const posX = width - Math.round(Math.cos((hueValue.value * Math.PI) / 180) * distance + center) - thumb_size / 2;
    return posX;
  }, [width, thumbSize]);

  const handlePosY = useDerivedValue(() => {
    const center = width / 2;
    const distance = (saturationValue.value / 100) * (width / 2);
    const posY = width - Math.round(Math.sin((hueValue.value * Math.PI) / 180) * distance + center) - thumb_size / 2;
    return posY;
  }, [width, thumbSize]);

  const handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: handlePosX.value }, { translateY: handlePosY.value }, { scale: handleScale.value }],
  }));

  const gestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx: { x: number; y: number }) => {
        ctx.x = event.x;
        ctx.y = event.y;
        handleScale.value = withTiming(1.2, { duration: 100 });
      },
      onActive: event => {
        const clamp = (v: number, max: number) => Math.min(Math.max(v, 0), max);

        const center = width / 2,
          dx = center - event.x,
          dy = center - event.y,
          radius = clamp(Math.sqrt(dx * dx + dy * dy), width / 2), // distance from center
          theta = Math.atan2(dy, dx) * (180 / Math.PI), // [0 - 180] range
          angle = theta < 0 ? 360 + theta : theta, // [0 - 360] range
          radiusPercent = radius / (width / 2);

        hueValue.value = Math.round(angle);
        saturationValue.value = Math.round(radiusPercent * 100);

        runOnJS(onGestureChange)();
      },
      onFinish: () => {
        handleScale.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEnd)();
      },
    },
    [width]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setWidth(Math.round(layout.width));
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.panel_container,
          style,
          { position: 'relative', borderRadius, aspectRatio: 1, borderWidth: 0, padding: 0 },
        ]}
      >
        <ImageBackground
          source={require('../assets/Panel3.png')}
          style={[styles.panel_image, { borderRadius }]}
          resizeMode='stretch'
        />
        <Thumb {...{ channel: 's', thumbShape, thumbSize: thumb_size, thumbColor: thumb_color, handleStyle }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
