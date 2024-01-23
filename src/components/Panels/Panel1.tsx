import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { clamp, getStyle, isRtl } from '@utils';

import type { PanelProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

/** - A square-shaped slider, reminiscent of Adobe style, is utilized to adjust the brightness and saturation of colors. */
export function Panel1({ gestures = [], style = {}, ...props }: PanelProps) {
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
      percentX = (saturationValue.value / 100) * length.x,
      posX = percentX - (boundedThumb ? 0 : thumbSize / 2),
      percentY = (brightnessValue.value / 100) * length.y,
      posY = length.y - percentY - (boundedThumb ? 0 : thumbSize / 2);

    return { transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }] };
  }, [handleScale, saturationValue, brightnessValue, width, height]);

  const activeColorStyle = useAnimatedStyle(() => ({ backgroundColor: `hsl(${hueValue.value}, 100%, 50%)` }), [hueValue]);

  const brightnessImageStyle = useAnimatedStyle(() => {
    return {
      width: height.value,
      height: width.value,

      transform: [
        { rotate: '270deg' },
        { translateX: (width.value - height.value) / 2 },
        { translateY: ((width.value - height.value) / 2) * (isRtl ? -1 : 1) },
      ],
    };
  }, [width, height]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const lengthX = width.value - (boundedThumb ? thumbSize : 0),
      lengthY = height.value - (boundedThumb ? thumbSize : 0),
      posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX),
      posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY),
      newSaturationValue = (posX / lengthX) * 100,
      newBrightnessValue = 100 - (posY / lengthY) * 100;

    if (saturationValue.value === newSaturationValue && brightnessValue.value === newBrightnessValue) return;

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
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    width.value = layout.width;
    height.value = layout.height;
  }, []);

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
            style={[styles.panel_image, brightnessImageStyle]}
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
