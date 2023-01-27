import React, { useState, useContext, useCallback } from 'react';
import { I18nManager, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CTX, getStyle } from '../GlobalStyles';
import Thumb from './Thumbs';

import type { LayoutChangeEvent } from 'react-native';
import type { SliderPorps } from '../types';

const isRtl = I18nManager.isRTL;

export function HueSlider({ thumbShape, thumbSize, thumbColor, style = {}, vertical = false, reverse = false }: SliderPorps) {
  const {
    onGestureChange,
    onGestureEnd,
    hueValue,
    sliderThickness,
    thumbSize: thumbsSize,
    thumbShape: thumbsShape,
    thumbColor: thumbsColor,
  } = useContext(CTX);

  thumbShape = thumbShape ?? thumbsShape;
  const thumb_size = thumbSize ?? thumbsSize;
  const thumb_color = thumbColor ?? thumbsColor;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const getWidth = getStyle(style, 'width');
  const getHeight = getStyle(style, 'height');

  const [width, setWidth] = useState(typeof getWidth === 'number' ? getWidth : sliderThickness);
  const [height, setHeight] = useState(typeof getHeight === 'number' ? getHeight : sliderThickness);

  const handleScale = useSharedValue(1);

  const handlePos = useDerivedValue(() => {
    const length = vertical ? height : width;
    const percent = (hueValue.value / 360) * length;
    const pos = (reverse ? length - percent : percent) - thumb_size / 2;
    return pos;
  }, [height, width, thumbSize, vertical, reverse]);

  const handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: vertical ? handlePos.value : height / 2 - thumb_size / 2 },
      { translateX: vertical ? width / 2 - thumb_size / 2 : handlePos.value },
      { scale: handleScale.value },
    ],
  }));

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
          percentY = posY / height,
          hueX = reverse ? 360 - Math.round(percentX * 360) : Math.round(percentX * 360),
          hueY = reverse ? 360 - Math.round(percentY * 360) : Math.round(percentY * 360);

        hueValue.value = vertical ? hueY : hueX;

        runOnJS(onGestureChange)();
      },
      onFinish: () => {
        handleScale.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEnd)();
      },
    },
    [height, width, thumbSize, vertical, reverse]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setWidth(Math.round(layout.width));
    setHeight(Math.round(layout.height));
  }, []);

  const imageRotate = vertical ? (reverse ? '270deg' : '90deg') : reverse ? '180deg' : '0deg';
  const imageTranslateY = (reverse && isRtl) || (!reverse && !isRtl) ? height / 2 - width / 2 : -height / 2 + width / 2;
  const imageStyle = typeof height === 'number' &&
    typeof width === 'number' && {
      width: vertical ? height : width,
      height: vertical ? width : height,
      borderRadius,
      transform: [
        { rotate: imageRotate },
        { translateX: vertical ? (reverse ? -height / 2 + width / 2 : height / 2 - width / 2) : 0 },
        { translateY: vertical ? imageTranslateY : 0 },
      ],
    };

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[{ borderRadius }, vertical ? { width } : { height }, style, { position: 'relative', borderWidth: 0, padding: 0 }]}
      >
        <Image source={require('../assets/Hue.png')} style={imageStyle} />
        <Thumb {...{ channel: 'h', thumbShape, thumbSize: thumb_size, thumbColor: thumb_color, handleStyle, vertical }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
