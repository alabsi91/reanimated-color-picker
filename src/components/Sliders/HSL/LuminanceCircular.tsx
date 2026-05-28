import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';

import type { LuminanceCircularProps } from '@types';
import type { LayoutChangeEvent } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

export function LuminanceCircular({
  children,
  gestures = [],
  style = {},
  containerStyle = {},
  rotate = 0,
  ...props
}: LuminanceCircularProps) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd, ...ctx } = usePickerContext();

  const thumbShape = props.thumbShape ?? ctx.thumbShape;
  const thumbSize = props.thumbSize ?? ctx.thumbSize;
  const thumbColor = props.thumbColor ?? ctx.thumbColor;
  const renderThumb = props.renderThumb ?? ctx.renderThumb;
  const thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {};
  const sliderThickness = props.sliderThickness ?? ctx.sliderThickness;
  const thumbScaleAnimationValue = props.thumbScaleAnimationValue ?? ctx.thumbScaleAnimationValue;
  const thumbScaleAnimationDuration = props.thumbScaleAnimationDuration ?? ctx.thumbScaleAnimationDuration;
  const adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum;
  const thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};

  const containerRef = useRef<Animated.View>(null);
  const isGestureActive = useSharedValue(false);
  const width = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const borderRadiusStyle = useAnimatedStyle(() => ({ borderRadius: borderRadius.value }), [borderRadius]);

  const handleScale = useSharedValue(1);
  const thumbSide = useSharedValue<0 | 1>(0); // to determine in which side of the circle the thumb is
  const lastHslSaturationValue = useSharedValue(0);

  // We need to keep track of the HSL saturation value because, when the luminance is 0 or 100,
  // when converting to/from HSV, the previous saturation value will be lost.
  const hsl = useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    const { h, s, l } = colorKit.runOnUI().HSL(hsvColor).object(false);

    if (l === 100 || l === 0) {
      return {
        h,
        s: lastHslSaturationValue.value,
        l,
      };
    }

    lastHslSaturationValue.value = s;

    return {
      h,
      s,
      l,
    };
  }, [hueValue, saturationValue, brightnessValue]);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2;
    const distance = (width.value - sliderThickness) / 2;
    const angle = (hsl.value.l / 100) * 180 + thumbSide.value * 180;
    const mirroredAngle = ((thumbSide.value === 1 ? 180 - angle : angle) - rotate) % 360;
    const posY = width.value - (Math.sin((mirroredAngle * Math.PI) / 180) * distance + center) - thumbSize / 2;
    const posX = width.value - (Math.cos((mirroredAngle * Math.PI) / 180) * distance + center) - thumbSize / 2;

    return {
      transform: [
        { translateX: posX },
        { translateY: posY },
        { scale: handleScale.value },
        { rotate: mirroredAngle + 90 + 'deg' },
      ],
    };
  }, [width, hsl, handleScale, thumbSide]);

  const activeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `hsl(${hsl.value.h}, ${adaptSpectrum ? hsl.value.s : 100}%, ${50}%)`,
      borderRadius: width.value / 2,
    };
  }, [hueValue, saturationValue, width]);

  const clipViewStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: width.value - sliderThickness * 2,
      height: width.value - sliderThickness * 2,
      borderRadius: width.value / 2,
    };
  }, [width]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = width.value / 2;
    const dx = center - x;
    const dy = center - y;
    const theta = (Math.atan2(dy, dx) + rotate * (Math.PI / 180)) * (180 / Math.PI); // [0 - 180] range
    const angle = theta < 0 ? 360 + theta : theta; // [0 - 360] range
    const mirroredAngle = angle <= 180 ? angle : 360 - angle;
    const newLuminanceValue = (mirroredAngle / 180) * 100;

    thumbSide.value = angle <= 180 ? 0 : 1;

    if (newLuminanceValue === hsl.value.l) return;

    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: hsl.value.s, l: newLuminanceValue }).object(false);

    saturationValue.value = s;
    brightnessValue.value = v;

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';

    const R = width.value / 2;
    const dx = R - event.x;
    const dy = R - event.y;
    const clickR = Math.sqrt(dx * dx + dy * dy);

    // Check if the press is outside the circle
    if (clickR > R) {
      isGestureActive.value = false;
      return;
    }

    // check if the press inside the circle (not on the actual slider)
    const innerR = width.value / 2 - sliderThickness;
    if (clickR < innerR) {
      isGestureActive.value = false;
      return;
    }

    isGestureActive.value = true;
    handleScale.value = withTiming(thumbScaleAnimationValue, { duration: thumbScaleAnimationDuration });

    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    isGestureActive.value = false;
    handleScale.value = withTiming(1, { duration: thumbScaleAnimationDuration });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onEnd(onGestureFinish);
  const longPress = Gesture.LongPress().onEnd(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  // useLayoutEffect → paint → onLayout
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, layoutWidth) => {
      if (!layoutWidth) return;
      width.value = layoutWidth;
      borderRadius.value = layoutWidth / 2;
    });
  }, []);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!layout.width) return;
    width.value = layout.width;
    borderRadius.value = layout.width / 2;
  }, []);

  const getAdaptiveColor = (hsva: { h: number; s: number; v: number; a: number }) => {
    'worklet';
    const { h, l } = colorKit.runOnUI().HSL(hsva).object();
    return { h, s: 100, l };
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={[
          styles.panelContainer,
          { justifyContent: 'center', alignItems: 'center' },
          style,
          { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 },
          borderRadiusStyle,
        ]}
      >
        <Animated.View style={[styles.panelImage, activeColorStyle, { transform: [{ rotate: -rotate + 'deg' }] }]}>
          <Image
            source={require('@assets/angular-luminance.png')}
            style={{ width: '100%', height: '100%', flex: 1 }}
            resizeMode='stretch'
          />
        </Animated.View>

        <Animated.View style={[clipViewStyle, { backgroundColor: '#fff' }, containerStyle]}>{children}</Animated.View>

        <Thumb
          thumbShape={thumbShape}
          thumbSize={thumbSize}
          thumbColor={thumbColor}
          renderThumb={renderThumb}
          innerStyle={thumbInnerStyle}
          handleStyle={handleStyle}
          style={thumbStyle}
          getAdaptiveColor={getAdaptiveColor}
        />
      </Animated.View>
    </GestureDetector>
  );
}
