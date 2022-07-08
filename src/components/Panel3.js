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
import styles, { CTX } from '../GlobalStyles';
import Thumb from './Thumbs';

export function Panel3({ thumbShape, thumbSize, thumbColor, style = {} }) {
  const {
    registerHandle,
    solidColor,
    onGestureEventFinish,
    updateHue,
    updateSaturation,
    thumbSize: thumbsSize,
  } = useContext(CTX);

  thumbSize = thumbSize ?? thumbsSize;

  const idX = useRef('panel3' + Math.random()).current;
  const idY = useRef('panel3' + Math.random()).current;

  const [width, setWidth] = useState(0);

  const borderRadius = width / 2;

  const handlePosX = useSharedValue(0);
  const handlePosY = useSharedValue(0);
  const handleScale = useSharedValue(1);

  useEffect(() => {
    registerHandle({
      id: idX,
      channel: 'h',
      axis: 'angle',
      width,
      height: width,
      thumbSize,
      isReversed: false,
      handle: [handlePosX, handlePosY],
    });
    registerHandle({
      id: idY,
      channel: 's',
      axis: 'angle',
      width,
      height: width,
      thumbSize,
      isReversed: false,
      handle: [handlePosX, handlePosY],
    });
  }, [width, thumbSize]);

  const handleStyle = useAnimatedStyle(() => ({
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
      onActive: event => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const center = width / 2;
        const dx = center - event.x;
        const dy = center - event.y;
        const radius = clamp(Math.sqrt(dx * dx + dy * dy), width / 2); // distance from center
        const theta = Math.atan2(dy, dx) * (180 / Math.PI); // [0 - 180] range
        const angle = theta < 0 ? 360 + theta : theta; // [0 - 360] range

        const radiusPercent = radius / (width / 2);

        const hue = Math.round(angle);
        const saturation = Math.round(radiusPercent * 100);

        runOnJS(updateHS)(hue, saturation);
      },
      onFinish: () => {
        handleScale.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }) => {
    setWidth(Math.round(layout.width));
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, style, { position: 'relative', borderRadius, aspectRatio: 1 }]}
      >
        <ImageBackground
          source={require('../assets/Panel3.png')}
          style={[styles.panel_image, { borderRadius }]}
          resizeMode='stretch'
        />
        <Thumb {...{ channel: 's', thumbShape, thumbSize, thumbColor, handleStyle, solidColor }} />
      </Animated.View>
    </PanGestureHandler>
  );
}
