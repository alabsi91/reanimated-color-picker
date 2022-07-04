import React, { useEffect, useRef, useState, useContext } from 'react';
import { I18nManager, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { COLOR_HEX } from '../ColorsConversionFormulas';
import styles, { CTX, getStyle } from '../GlobalStyles';

const isRtl = I18nManager.isRTL;

export function OpacitySlider({ thumbSize, ringColor = '#ffffff', style = {}, vertical, reverse }) {
  const {
    registerHandle,
    activeHueStyle,
    updateOpacity,
    onGestureEventFinish,
    previewColorWithoutOpacity,
    slidersThickness,
    thumbsSize,
  } = useContext(CTX);

  thumbSize = thumbSize ?? thumbsSize;
  ringColor = COLOR_HEX(ringColor);
  const borderRadius = getStyle(style, 'borderRadius', 5);

  const id = useRef('opacity' + Math.random()).current;

  const [width, setWidth] = useState(getStyle(style, 'width', slidersThickness));
  const [height, setHeight] = useState(getStyle(style, 'height', slidersThickness));

  const handlePos = useSharedValue(0);
  const handleScale = useSharedValue(1);

  useEffect(() => {
    registerHandle({
      id,
      channel: 'a',
      axis: vertical ? 'y' : 'x',
      width,
      height,
      thumbSize: thumbSize,
      isReversed: reverse,
      handle: handlePos,
    });
  }, [width, height]);

  const opacity_handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: vertical ? handlePos.value : height / 2 - thumbSize / 2 },
      { translateX: vertical ? (isRtl ? -width / 2 + thumbSize / 2 : width / 2 - thumbSize / 2) : handlePos.value },
      { scale: handleScale.value },
    ],
  }));

  const opacityGestureEvent = useAnimatedGestureHandler(
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

        const opacityX = reverse ? 100 - Math.round(percentX * 100) : Math.round(percentX * 100);
        const opacityY = reverse ? 100 - Math.round(percentY * 100) : Math.round(percentY * 100);

        const opacity = vertical ? opacityY : opacityX;

        runOnJS(updateOpacity)(opacity);
      },
      onFinish: () => {
        handleScale.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width, height]
  );

  const onLayout = ({ nativeEvent }) => {
    setWidth(nativeEvent.layout.width);
    setHeight(nativeEvent.layout.height);
  };

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
    <PanGestureHandler onGestureEvent={opacityGestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[{ borderRadius }, vertical ? { width } : { height }, style, { position: 'relative' }, activeHueStyle]}
      >
        <Image source={require('../assets/Opacity.png')} style={imageStyle} />
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: ringColor + 50,
              borderColor: ringColor,
            },
            opacity_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
