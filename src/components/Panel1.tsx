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
import styles, { CTX, getStyle } from '../GlobalStyles';
import Thumb from './Thumbs';

import type { LayoutChangeEvent } from 'react-native';
import type { PanelProps } from '../types';

export function Panel1({ thumbShape, thumbSize, thumbColor, style = {} }: PanelProps) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: thumbsSize,
    thumbColor: thumbsColor,
  } = useContext(CTX);

  const thumb_size = thumbSize ?? thumbsSize;
  const thumb_color = thumbColor ?? thumbsColor;
  const borderRadius = getStyle(style, 'borderRadius') ?? 5;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleScale = useSharedValue(1);

  const handlePosX = useDerivedValue(() => {
    const percent = (saturationValue.value / 100) * width;
    const pos = percent - thumb_size / 2;
    return pos;
  }, [height, width, thumbSize]);

  const handlePosY = useDerivedValue(() => {
    const percent = (brightnessValue.value / 100) * height;
    const pos = height - percent - thumb_size / 2;
    return pos;
  }, [height, width, thumbSize]);

  const handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: handlePosX.value }, { translateY: handlePosY.value }, { scale: handleScale.value }],
  }));

  const activeHueStyle = useAnimatedStyle(() => ({ backgroundColor: `hsl(${hueValue.value}, 100%, 50%)` }));

  const gestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx: { x: number; y: number }) => {
        ctx.x = event.x;
        ctx.y = event.y;
        handleScale.value = withTiming(1.2, { duration: 100 });
      },
      onActive: (event, ctx) => {
        const clamp = (v: number, max: number) => Math.min(Math.max(v, 0), max);

        const x = event.translationX,
          y = event.translationY,
          posX = clamp(x + ctx.x, width),
          posY = clamp(y + ctx.y, height),
          percentX = posX / width,
          percentY = posY / height;

        saturationValue.value = Math.round(percentX * 100);
        brightnessValue.value = Math.round(100 - percentY * 100);

        runOnJS(onGestureChange)();
      },
      onFinish: () => {
        handleScale.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEnd)();
      },
    },
    [height, width]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setWidth(Math.round(layout.width));
    setHeight(Math.round(layout.height));
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.panel_container,
          { height: width },
          style,
          { position: 'relative', borderWidth: 0, padding: 0 },
          activeHueStyle,
        ]}
      >
        <ImageBackground
          source={require('../assets/Panel1.png')}
          style={[styles.panel_image, { borderRadius }]}
          resizeMode='stretch'
        />
        <Thumb {...{ thumbShape, thumbSize: thumb_size, thumbColor: thumb_color, handleStyle }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
