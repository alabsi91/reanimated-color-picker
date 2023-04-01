import React, { useContext, useCallback } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { styles } from '@styles';
import CTX from '@context';
import { clamp, getStyle, hsva2Hsla, isRtl } from '@utils';
import Thumb from '@thumb';

import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { Panel2Props } from '@types';

export function Panel2({
  adaptSpectrum: localAdaptSpectrum,
  thumbColor: localThumbColor,
  boundedThumb: localBoundedThumb,
  renderThumb: localRenderThumb,
  thumbShape: localThumbShape,
  thumbSize: localThumbSize,
  thumbStyle: localThumbStyle,
  thumbInnerStyle: localThumbInnerStyle,
  verticalChannel = 'saturation',
  reverseHue = false,
  style = {},
}: Panel2Props) {
  const {
    hueValue,
    saturationValue,
    brightnessValue,
    onGestureChange,
    onGestureEnd,
    adaptSpectrum: globalAdaptSpectrum,
    thumbSize: globalThumbsSize,
    thumbShape: globalThumbShape,
    thumbColor: globalThumbsColor,
    boundedThumb: globalBoundedThumb,
    renderThumb: globalRenderThumbs,
    thumbStyle: globalThumbsStyle,
    thumbInnerStyle: globalThumbsInnerStyle,
  } = useContext(CTX);

  const thumbShape = localThumbShape ?? globalThumbShape,
    thumbSize = localThumbSize ?? globalThumbsSize,
    thumbColor = localThumbColor ?? globalThumbsColor,
    boundedThumb = localBoundedThumb ?? globalBoundedThumb,
    renderThumb = localRenderThumb ?? globalRenderThumbs,
    thumbStyle = localThumbStyle ?? globalThumbsStyle ?? {},
    thumbInnerStyle = localThumbInnerStyle ?? globalThumbsInnerStyle ?? {},
    adaptSpectrum = localAdaptSpectrum ?? globalAdaptSpectrum,
    channelValue = verticalChannel === 'brightness' ? brightnessValue : saturationValue;

  const borderRadius = getStyle(style, 'borderRadius') ?? 5,
    getHeight = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0),
    height = useSharedValue(0);

  const handleScale = useSharedValue(1);

  const handleStyle = useAnimatedStyle(() => {
    const length = { x: width.value - (boundedThumb ? thumbSize : 0), y: height.value - (boundedThumb ? thumbSize : 0) },
      percentX = (hueValue.value / 360) * length.x,
      posX = (reverseHue ? length.x - percentX : percentX) - (boundedThumb ? 0 : thumbSize / 2),
      percentY = (channelValue.value / 100) * length.y,
      posY = length.y - percentY - (boundedThumb ? 0 : thumbSize / 2);
    return { transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }] };
  }, [localThumbSize, reverseHue]);

  const spectrumStyle = useAnimatedStyle(() => {
    if (!adaptSpectrum) return {};
    if (verticalChannel === 'brightness') return { backgroundColor: hsva2Hsla(0, 0, 100, 1 - saturationValue.value / 100) };
    return { backgroundColor: hsva2Hsla(0, 0, 0, 1 - brightnessValue.value / 100) };
  });

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0),
      lengthY = height.value - (boundedThumb ? thumbSize : 0),
      posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX),
      posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY),
      valueX = Math.round((posX / lengthX) * 360),
      valueY = Math.round((posY / lengthY) * 100),
      newHueValue = reverseHue ? 360 - valueX : valueX,
      newChannelValue = 100 - valueY;

    if (hueValue.value === newHueValue && channelValue.value === newChannelValue) return;

    hueValue.value = newHueValue;
    channelValue.value = newChannelValue;
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

  const rotatePanelImage = useAnimatedStyle(() => ({
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
        style={[styles.panel_container, { height: getHeight }, style, { position: 'relative', borderWidth: 0, padding: 0 }]}
      >
        <ImageBackground
          source={require('@assets/Hue.png')}
          style={[styles.panel_image, { position: 'relative', borderRadius, transform: [{ scaleX: reverseHue ? -1 : 1 }] }]}
          resizeMode='stretch'
        >
          {adaptSpectrum && verticalChannel === 'brightness' && (
            <Animated.View style={[spectrumStyle, StyleSheet.absoluteFillObject]} />
          )}
          <Animated.Image
            source={verticalChannel === 'brightness' ? require('@assets/Brightness.png') : require('@assets/Saturation.png')}
            style={[styles.panel_image, rotatePanelImage]}
            resizeMode='stretch'
          />
          {adaptSpectrum && verticalChannel === 'saturation' && (
            <Animated.View style={[spectrumStyle, StyleSheet.absoluteFillObject]} />
          )}
        </ImageBackground>
        <Thumb
          {...{
            channel: verticalChannel === 'brightness' ? 'v' : 's',
            thumbShape,
            thumbSize,
            thumbColor,
            renderThumb,
            innerStyle: thumbInnerStyle,
            style: thumbStyle,
            handleStyle,
            adaptSpectrum,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}
