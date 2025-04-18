import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl } from '@utils';

import type { Panel4Props } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

/** - A slider with a square shape is used to adjust the channels of hue, saturation, and brightness. */
export function Panel4({
  reverseHue = false,
  reverseHorizontalChannels = false,
  gestures = [],
  style = {},
  ...props
}: Panel4Props) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape,
    thumbSize = props.thumbSize ?? ctx.thumbSize,
    thumbColor = props.thumbColor ?? ctx.thumbColor,
    boundedThumb = props.boundedThumb ?? ctx.boundedThumb,
    renderThumb = props.renderThumb ?? ctx.renderThumb,
    thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {},
    thumbScaleAnimationValue = props.thumbScaleUpValue ?? ctx.thumbScaleAnimationValue,
    thumbScaleAnimationDuration = props.thumbScaleUpDuration ?? ctx.thumbScaleAnimationDuration,
    thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const getHeight = getStyle(style, 'height') ?? 200;

  const width = useSharedValue(0);
  const height = useSharedValue(0);
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
  }, [width, height, saturationValue, brightnessValue, hueValue, handleScale]);

  const panelImageStyle = useAnimatedStyle(() => {
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
  }, [height, width]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0),
      lengthY = height.value - (boundedThumb ? thumbSize : 0),
      posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX),
      posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY),
      valueX = (posX / lengthX) * 200,
      valueY = (posY / lengthY) * 360,
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

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });
    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onEnd(onGestureFinish);
  const longPress = Gesture.LongPress().onEnd(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    width.value = layout.width;
    height.value = layout.height;
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, style, { position: 'relative', height: getHeight, borderWidth: 0, padding: 0 }]}
      >
        <View style={{ flex: 1, borderRadius, overflow: 'hidden' }}>
          <Animated.Image
            source={require('@assets/Hue.png')}
            style={[styles.panel_image, panelImageStyle]}
            resizeMode='stretch'
          />
        </View>

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
          thumbShape={thumbShape}
          thumbSize={thumbSize}
          thumbColor={thumbColor}
          renderThumb={renderThumb}
          innerStyle={thumbInnerStyle}
          handleStyle={handleStyle}
          style={thumbStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
}
