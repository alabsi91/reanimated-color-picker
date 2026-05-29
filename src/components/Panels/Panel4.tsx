import React, { useCallback, useLayoutEffect, useRef } from 'react';
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

/** A square-shaped slider used to adjust the hue, saturation, and brightness channels. */
export function Panel4({
  reverseHue = false,
  reverseHorizontalChannels = false,
  gestures = [],
  style = {},
  ...props
}: Panel4Props) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const boundedThumb = props.boundedThumb ?? ctx.boundedThumb;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const thumbScaleAnimationValue = props.thumbScaleUpValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleUpDuration ?? ctx.thumbScaleAnimationDuration;
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};

  const borderRadius = getStyle(style, 'borderRadius') ?? 5;
  const heightStyle = getStyle(style, 'height') ?? 200;

  const containerRef = useRef<Animated.View>(null);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const handleScale = useSharedValue(1);

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const length = { x: width.value - (boundedThumb ? thumbSize : 0), y: height.value - (boundedThumb ? thumbSize : 0) };
    const thumbOffset = boundedThumb ? 0 : thumbSize / 2;
    // luminance
    const luminance = (((2 - saturationValue.value / 100) * (brightnessValue.value / 100)) / 2) * 100;
    const posPercentX = (luminance / 100) * length.x;
    const posX = (reverseHorizontalChannels ? posPercentX : length.x - posPercentX) - thumbOffset;
    // hue
    const percentY = (hueValue.value / 360) * length.y;
    const posY = (reverseHue ? percentY : length.y - percentY) - thumbOffset;

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [
    width,
    height,
    saturationValue,
    brightnessValue,
    hueValue,
    handleScale,
    boundedThumb,
    thumbSize,
    reverseHorizontalChannels,
    reverseHue,
  ]);

  const panelImageStyle = useAnimatedStyle(() => {
    return {
      // Width and height are intentionally swapped to correct dimensions after the rotation
      width: height.value,
      height: width.value,
      transform: [
        { scaleY: reverseHue ? -1 : 1 },
        { rotate: '270deg' },
        { translateX: ((width.value - height.value) / 2) * (reverseHue ? -1 : 1) },
        { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) },
      ],
    };
  }, [height, width, reverseHue]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0);
    const lengthY = height.value - (boundedThumb ? thumbSize : 0);
    const posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX);
    const posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY);
    const valueX = (posX / lengthX) * 200;
    const valueY = (posY / lengthY) * 360;
    const newHueValue = reverseHue ? valueY : 360 - valueY;
    const newSaturationValue = clamp(reverseHorizontalChannels ? 200 - valueX : valueX, 100);
    const newBrightnessValue = clamp(reverseHorizontalChannels ? valueX : 200 - valueX, 100);

    if (
      hueValue.value === newHueValue &&
      saturationValue.value === newSaturationValue &&
      brightnessValue.value === newBrightnessValue
    ) {
      return;
    }

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

  // useLayoutEffect → paint → onLayout
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, layoutWidth, layoutHeight) => {
      if (!layoutWidth || !layoutHeight) return;
      width.value = layoutWidth;
      height.value = layoutHeight;
    });
  }, []);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!layout.width || !layout.height) return;
    width.value = layout.width;
    height.value = layout.height;
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={[styles.panelContainer, style, { position: 'relative', height: heightStyle, borderWidth: 0, padding: 0 }]}
      >
        <View style={{ flex: 1, borderRadius, overflow: 'hidden' }}>
          <Animated.Image source={require('@assets/Hue.png')} style={[styles.panelImage, panelImageStyle]} resizeMode='stretch' />
        </View>

        <View
          style={[
            styles.panelImage,
            {
              borderRadius,
              flexDirection: isRtl ? 'row-reverse' : 'row',
              transform: [{ scaleX: reverseHorizontalChannels ? -1 : 1 }],
            },
          ]}
        >
          <Image source={require('@assets/blackGradient.png')} style={{ flex: 1 }} tintColor='#fff' resizeMode='stretch' />
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
          thumbAnimatedStyle={thumbAnimatedStyle}
          style={thumbStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
}
