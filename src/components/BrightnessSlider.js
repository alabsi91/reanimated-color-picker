import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { I18nManager, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CTX, getStyle } from '../GlobalStyles';
import Thumb from './Thumbs';

const isRtl = I18nManager.isRTL;

export function BrightnessSlider({ thumbShape, thumbSize, thumbColor, style = {}, vertical, reverse }) {
  const {
    registerHandle,
    updateBrightness,
    onGestureEventFinish,
    solidColor,
    sliderThickness,
    activeHueStyle,
    thumbSize: thumbsSize,
    thumbShape: thumbsShape,
  } = useContext(CTX);

  thumbSize = thumbSize ?? thumbsSize;
  thumbShape = thumbShape ?? thumbsShape;
  const borderRadius = getStyle(style, 'borderRadius', 5);

  const id = useRef('brightness' + Math.random()).current;

  const [width, setWidth] = useState(getStyle(style, 'width', sliderThickness));
  const [height, setHeight] = useState(getStyle(style, 'height', sliderThickness));

  const handlePos = useSharedValue(0);
  const handleScale = useSharedValue(1);

  useEffect(() => {
    registerHandle({
      id,
      channel: 'b',
      axis: vertical ? 'y' : 'x',
      width,
      height,
      thumbSize,
      isReversed: reverse,
      handle: handlePos,
    });
  }, [height, width, thumbSize, vertical, reverse]);

  const handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: vertical ? handlePos.value : height / 2 - thumbSize / 2 },
      { translateX: vertical ? width / 2 - thumbSize / 2 : handlePos.value },
      { scale: handleScale.value },
    ],
  }));

  const gestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.x = event.x;
        ctx.y = event.y;
        handleScale.value = withTiming(1.2, { duration: 100 });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const y = event.translationY;
        const posX = clamp(x + ctx.x, width);
        const posY = clamp(y + ctx.y, height);
        const percentX = posX / width;
        const percentY = posY / height;

        const brightnessX = reverse ? 100 - Math.round(percentX * 100) : Math.round(percentX * 100);
        const brightnessY = reverse ? 100 - Math.round(percentY * 100) : Math.round(percentY * 100);

        const brightness = vertical ? brightnessY : brightnessX;

        runOnJS(updateBrightness)(brightness);
      },
      onFinish: () => {
        handleScale.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [height, width, thumbSize, vertical, reverse]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }) => {
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
        style={[
          { borderRadius },
          vertical ? { width } : { height },
          style,
          { position: 'relative', borderWidth: 0, padding: 0 },
          activeHueStyle,
        ]}
      >
        <Image source={require('../assets/Brightness.png')} style={imageStyle} />
        <Thumb {...{ channel: 'b', thumbShape, thumbSize, thumbColor, handleStyle, solidColor, vertical }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
