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
import { clamp, getStyle } from '../utils';
import Thumb from './Thumbs';

import type { LayoutChangeEvent } from 'react-native';
import type { PanelProps } from '../types';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { CTX } from '../ColorPicker';
import { styles } from '../styles';

export function Panel1({ thumbShape, thumbSize, thumbColor, renderThumb, thumbStyle, thumbInnerStyle, style = {} }: PanelProps) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: thumbsSize,
    thumbColor: thumbsColor,
    renderThumb: renderThumbs,
    thumbStyle: thumbsStyle,
    thumbInnerStyle: thumbsInnerStyle,
  } = useContext(CTX);

  const thumb_size = thumbSize ?? thumbsSize;
  const thumb_color = thumbColor ?? thumbsColor;
  const render_thumb = renderThumb ?? renderThumbs;
  const thumb_style = thumbStyle ?? thumbsStyle ?? {};
  const thumb_inner_style = thumbInnerStyle ?? thumbsInnerStyle ?? {};
  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const getHeight = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const percentX = (saturationValue.value / 100) * width.value;
    const posX = percentX - thumb_size / 2;
    const percentY = (brightnessValue.value / 100) * height.value;
    const posY = height.value - percentY - thumb_size / 2;
    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [thumbSize]);

  const activeColorStyle = useAnimatedStyle(() => ({ backgroundColor: `hsl(${hueValue.value}, 100%, 50%)` }));

  const setValueFromGestureEvent = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    const posX = clamp(event.x, width.value),
      posY = clamp(event.y, height.value),
      percentX = posX / width.value,
      percentY = posY / height.value;

    saturationValue.value = Math.round(percentX * 100);
    brightnessValue.value = Math.round(100 - percentY * 100);

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
    [width.value, height.value]
  );

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    width.value = Math.round(layout.width);
    height.value = Math.round(layout.height);
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureEvent} minDist={0}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.panel_container,
          { height: getHeight },
          style,
          { position: 'relative', borderWidth: 0, padding: 0 },
          activeColorStyle,
        ]}
      >
        <ImageBackground
          source={require('../assets/Panel1.png')}
          style={[styles.panel_image, { borderRadius }]}
          resizeMode='stretch'
        />
        <Thumb
          {...{
            thumbShape,
            thumbSize: thumb_size,
            thumbColor: thumb_color,
            renderThumb: render_thumb,
            innerStyle: thumb_inner_style,
            style: thumb_style,
            handleStyle,
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}
