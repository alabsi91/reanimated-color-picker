import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { Image } from 'react-native';
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

export function Panel2({ thumbSize, style = {}, reverse = false }) {
  const { registerHandle, invertedColor, solidColor, onGestureEventFinish, updateHue, updateSaturation, thumbsSize } =
    useContext(CTX);

  thumbSize = thumbSize ?? thumbsSize;
  const borderRadius = getStyle(style, 'borderRadius', 5);

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
      thumbSize,
      isReversed: reverse,
      handle: handlePosX,
    });
    registerHandle({
      id: idY,
      channel: 's',
      axis: 'y',
      width,
      height,
      thumbSize,
      isReversed: true,
      handle: handlePosY,
    });
  }, [height, width, thumbSize, reverse]);

  const handleStyle = useAnimatedStyle(() => ({
    backgroundColor: invertedColor.value === '#ffffff' ? '#ffffff50' : '#00000050',
    borderColor: invertedColor.value,
    transform: [{ translateX: handlePosX.value }, { translateY: handlePosY.value }, { scale: handleScale.value }],
  }));

  const updateHS = (hue, saturation) => {
    updateHue(hue);
    updateSaturation(saturation);
  };

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

  const onLayout = useCallback(({ nativeEvent: { layout } }) => {
    setWidth(Math.round(layout.width));
    setHeight(Math.round(layout.height));
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View onLayout={onLayout} style={[styles.panel_container, { height: width }, style, { position: 'relative' }]}>
        <Image
          source={require('../assets/Background2.png')}
          style={{ borderRadius, width: '100%', height: '100%', transform: [{ scaleX: reverse ? -1 : 1 }] }}
          resizeMode='stretch'
        />
        <Thumb {...{ thumbShape: 'ring', thumbSize, handleStyle, solidColor }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
