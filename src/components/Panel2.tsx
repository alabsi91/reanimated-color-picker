import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
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

export function Panel2({ thumbShape, thumbSize, thumbColor, style = {}, reverse = false }: Panel2Props) {
  const {
    registerHandle,
    solidColor,
    onGestureEventFinish,
    updateHue,
    updateSaturation,
    thumbSize: thumbsSize,
  } = useContext(CTX);

  const thumb_Size = thumbSize ?? thumbsSize;
  const borderRadius = getStyle(style, 'borderRadius') ?? 5;

  const idX = useRef('panel2' + Math.random()).current;
  const idY = useRef('panel2' + Math.random()).current;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handlePosX = useSharedValue(0);
  const handlePosY = useSharedValue(0);
  const handleScale = useSharedValue(1);

  useEffect(() => {
    registerHandle({
      id: idX,
      channel: 'h',
      axis: 'x',
      width,
      height,
      thumbSize: thumb_Size,
      isReversed: reverse,
      handle: handlePosX,
    });
    registerHandle({
      id: idY,
      channel: 's',
      axis: 'y',
      width,
      height,
      thumbSize: thumb_Size,
      isReversed: true,
      handle: handlePosY,
    });
  }, [height, width, thumbSize, reverse]);

  const handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: handlePosX.value }, { translateY: handlePosY.value }, { scale: handleScale.value }],
  }));

  const updateHS = (hue: number, saturation: number) => {
    updateHue(hue);
    updateSaturation(saturation);
  };

  const gestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx: { x: number; y: number }) => {
        ctx.x = event.x;
        ctx.y = event.y;
        handleScale.value = withTiming(1.2, { duration: 100 });
      },
      onActive: (event, ctx) => {
        const clamp = (v: number, max: number) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const y = event.translationY;
        const posX = clamp(x + ctx.x, width);
        const posY = clamp(y + ctx.y, height);
        const percentX = posX / width;
        const percentY = posY / height;

        const hueX = reverse ? 360 - Math.round(percentX * 360) : Math.round(percentX * 360);
        const saturationY = Math.round(100 - percentY * 100);

        runOnJS(updateHS)(hueX, saturationY);
      },
      onFinish: () => {
        handleScale.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [height, width, reverse]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setWidth(Math.round(layout.width));
    setHeight(Math.round(layout.height));
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, { height: width }, style, { position: 'relative', borderWidth: 0, padding: 0 }]}
      >
        <ImageBackground
          source={require('../assets/Panel2.png')}
          style={[styles.panel_image, { borderRadius }]}
          resizeMode='stretch'
        />
        <Thumb {...{ channel: 's', thumbShape, thumbSize: thumb_Size, thumbColor, handleStyle, solidColor }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
