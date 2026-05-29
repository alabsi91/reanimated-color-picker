import React, { useCallback, useLayoutEffect, useRef } from 'react';
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

/** A square-shaped panel slider, similar to Adobe's style, used to adjust color brightness and saturation. */
export function Panel1({ gestures = [], style = {}, ...props }: PanelProps) {
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
    const length = {
      x: width.value - (boundedThumb ? thumbSize : 0),
      y: height.value - (boundedThumb ? thumbSize : 0),
    };
    const percentX = (saturationValue.value / 100) * length.x;
    const posX = percentX - (boundedThumb ? 0 : thumbSize / 2);
    const percentY = (brightnessValue.value / 100) * length.y;
    const posY = length.y - percentY - (boundedThumb ? 0 : thumbSize / 2);

    return {
      transform: [{ translateX: posX }, { translateY: posY }, { scale: handleScale.value }],
    };
  }, [handleScale, saturationValue, brightnessValue, width, height, boundedThumb, thumbSize]);

  const activeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `hsl(${hueValue.value}, 100%, 50%)`,
    };
  }, [hueValue]);

  const brightnessImageStyle = useAnimatedStyle(() => {
    return {
      // Width and height are intentionally swapped to correct dimensions after the 270° rotation
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

    const lengthX = width.value - (boundedThumb ? thumbSize : 0);
    const lengthY = height.value - (boundedThumb ? thumbSize : 0);
    const posX = clamp(x - (boundedThumb ? thumbSize / 2 : 0), lengthX);
    const posY = clamp(y - (boundedThumb ? thumbSize / 2 : 0), lengthY);
    const newSaturationValue = (posX / lengthX) * 100;
    const newBrightnessValue = 100 - (posY / lengthY) * 100;

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
        style={[
          styles.panelContainer,
          style,
          { position: 'relative', height: heightStyle, borderWidth: 0, padding: 0 },
          activeColorStyle,
        ]}
      >
        <View style={[styles.panelImage, { borderRadius }]}>
          <Image source={require('@assets/blackGradient.png')} style={styles.panelImage} tintColor='#fff' resizeMode='stretch' />
          <Animated.Image
            source={require('@assets/blackGradient.png')}
            style={[styles.panelImage, brightnessImageStyle]}
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
