import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl } from '@utils';

import type { Panel4Props } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function Panel4({
  thumbColor: localThumbColor,
  boundedThumb: localBoundedThumb,
  renderThumb: localRenderThumb,
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  reverseHue = false,
  reverseHorizontalChannels = false,
  style = {},
}: Panel4Props) {
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
  } = usePickerContext();

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
      calcThumb = boundedThumb ? 0 : thumbSize / 2,
      // luminance
      lum = (((2 - saturationValue.value / 100) * (brightnessValue.value / 100)) / 2) * 100,
      posPercentX = (lum / 100) * length.x,
      posX = (reverseHorizontalChannels ? posPercentX : length.x - posPercentX) - calcThumb,
      // hue
      percentY = (hueValue.value / 360) * length.y,
      posY = (reverseHue ? percentY : length.y - percentY) - calcThumb;

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [
    thumbSize,
    boundedThumb,
    reverseHue,
    reverseHorizontalChannels,
    width,
    height,
    saturationValue,
    brightnessValue,
    hueValue,
    handleScale,
  ]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0),
      lengthY = height.value - (boundedThumb ? thumbSize : 0),
      posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX),
      posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY),
      valueX = Math.round((posX / lengthX) * 200),
      valueY = Math.round((posY / lengthY) * 360),
      newHueValue = reverseHue ? valueY : 360 - valueY,
      newSaturationValue = clamp(reverseHorizontalChannels ? 200 - valueX : valueX, 100),
      newBrightnessValue = clamp(reverseHorizontalChannels ? valueX : 200 - valueX, 100);
    if (
      hueValue.value === newHueValue &&
      saturationValue.value === newSaturationValue &&
      brightnessValue.value === newBrightnessValue
    )
      return;

    hueValue.value = newHueValue;
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

  const rotatePanelImage = useAnimatedStyle(() => {
    return {
      width: height.value,
      height: width.value,
      transform: [
        { scaleY: reverseHue ? -1 : 1 },
        { rotate: '270deg' },
        { translateX: ((width.value - height.value) / 2) * (reverseHue ? -1 : 1) },
        { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) },
      ],
    };
  }, [reverseHue, height, width]);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, { height: getHeight }, style, { position: 'relative', borderWidth: 0, padding: 0 }]}
      >
        <Animated.Image
          source={require('@assets/Hue.png')}
          style={[styles.panel_image, { borderRadius }, rotatePanelImage]}
          resizeMode='stretch'
        />

        <View
          style={[
            styles.panel_image,
            {
              borderRadius,
              flexDirection: isRtl ? 'row-reverse' : 'row',
              transform: [{ scaleX: reverseHorizontalChannels ? -1 : 1 }],
            },
          ]}
        >
          <Image source={require('@assets/blackGradient.png')} style={{ flex: 1, tintColor: '#fff' }} resizeMode='stretch' />
          <Image
            source={require('@assets/blackGradient.png')}
            style={{ flex: 1, transform: [{ scaleX: -1 }] }}
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
