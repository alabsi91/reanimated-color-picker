import React, { useCallback, useContext } from 'react';
import { Image, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import pickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl } from '@utils';

import type { PanelProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function Panel1({
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbColor: localThumbColor,
  boundedThumb: localBoundedThumb,
  renderThumb: localRenderThumb,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  style = {},
}: PanelProps) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    thumbSize: globalThumbsSize,
    thumbShape: globalThumbShape,
    thumbColor: globalThumbsColor,
    boundedThumb: globalBoundedThumb,
    renderThumb: globalRenderThumbs,
    thumbStyle: globalThumbsStyle,
    thumbInnerStyle: globalThumbsInnerStyle,
  } = useContext(pickerContext);

  const thumbShape = localThumbShape ?? globalThumbShape,
    thumbSize = localThumbSize ?? globalThumbsSize,
    thumbColor = localThumbColor ?? globalThumbsColor,
    boundedThumb = localBoundedThumb ?? globalBoundedThumb,
    renderThumb = localRenderThumb ?? globalRenderThumbs,
    thumbStyle = localThumbStyle ?? globalThumbsStyle ?? {},
    thumbInnerStyle = localThumbInnerStyle ?? globalThumbsInnerStyle ?? {};

  const borderRadius = getStyle(style, 'borderRadius') ?? 5,
    getHeight = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0),
    height = useSharedValue(0);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const length = { x: width.value - (boundedThumb ? thumbSize : 0), y: height.value - (boundedThumb ? thumbSize : 0) },
      percentX = (saturationValue.value / 100) * length.x,
      posX = percentX - (boundedThumb ? 0 : thumbSize / 2),
      percentY = (brightnessValue.value / 100) * length.y,
      posY = length.y - percentY - (boundedThumb ? 0 : thumbSize / 2);
    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [localThumbSize]);

  const activeColorStyle = useAnimatedStyle(() => ({ backgroundColor: `hsl(${hueValue.value}, 100%, 50%)` }));

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0),
      lengthY = height.value - (boundedThumb ? thumbSize : 0),
      posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX),
      posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY),
      newSaturationValue = Math.round((posX / lengthX) * 100),
      newBrightnessValue = Math.round(100 - (posY / lengthY) * 100);

    if (saturationValue.value === newSaturationValue && brightnessValue.value === newBrightnessValue) return;

    saturationValue.value = newSaturationValue;
    brightnessValue.value = newBrightnessValue;
    runOnJS(onGestureChange)();
  };
  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    handleScale.value = withTiming(1.2, { duration: 100 });
    onGestureUpdate(event);
  };
  const onGestureFinish = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: 100 });
    runOnJS(onGestureEnd)();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Exclusive(pan, tap, longPress);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    width.value = layout.width;
    height.value = layout.height;
  }, []);

  const rotateBrightnessImage = useAnimatedStyle(() => ({
    width: height.value,
    height: width.value,
    transform: [
      { rotate: '270deg' },
      { translateX: (width.value - height.value) / 2 },
      { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
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
        <View style={[styles.panel_image, { borderRadius }]}>
          <Image
            source={require('@assets/blackGradient.png')}
            style={[styles.panel_image, { tintColor: '#fff' }]}
            resizeMode='stretch'
          />
          <Animated.Image
            source={require('@assets/blackGradient.png')}
            style={[styles.panel_image, rotateBrightnessImage]}
            resizeMode='stretch'
          />
        </View>
        <Thumb
          {...{
            thumbShape,
            thumbSize,
            thumbColor,
            renderThumb,
            innerStyle: thumbInnerStyle,
            style: thumbStyle,
            handleStyle,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}
