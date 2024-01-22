import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import Thumb from '@thumb';
import { isRtl } from '@utils';

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

  const thumbShape = props.thumbShape ?? ctx.thumbShape,
    thumbSize = props.thumbSize ?? ctx.thumbSize,
    thumbColor = props.thumbColor ?? ctx.thumbColor,
    renderThumb = props.renderThumb ?? ctx.renderThumb,
    thumbStyle = props.thumbStyle ?? ctx.thumbStyle ?? {},
    sliderThickness = props.sliderThickness ?? ctx.sliderThickness,
    adaptSpectrum = props.adaptSpectrum ?? ctx.adaptSpectrum,
    thumbInnerStyle = props.thumbInnerStyle ?? ctx.thumbInnerStyle ?? {};

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
    if (l === 100 || l === 0) return { h, s: lastHslSaturationValue.value, l };
    lastHslSaturationValue.value = s;
    return { h, s, l };
  }, [hueValue, saturationValue, brightnessValue]);

  const handleStyle = useAnimatedStyle(() => {
    const center = width.value / 2,
      distance = (width.value - sliderThickness) / 2,
      angle = (hsl.value.l / 100) * 180 + thumbSide.value * 180,
      mirroredAngle = ((thumbSide.value === 1 ? 180 - angle : angle) - rotate) % 360,
      posY = width.value - (Math.sin((mirroredAngle * Math.PI) / 180) * distance + center) - thumbSize / 2,
      posX = width.value - (Math.cos((mirroredAngle * Math.PI) / 180) * distance + center) - thumbSize / 2;

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
    return { backgroundColor: `hsl(${hsl.value.h}, ${adaptSpectrum ? hsl.value.s : 100}%, ${50}%)` };
  }, [hueValue, saturationValue]);

  const clipViewStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      backgroundColor: '#fff',
      width: width.value - sliderThickness * 2,
      height: width.value - sliderThickness * 2,
      borderRadius: width.value / 2,
    };
  }, [width]);

  const imageStyle = useAnimatedStyle(() => {
    return {
      borderRadius: width.value / 2,
      transform: [
        { rotate: -rotate + 'deg' },
        { translateX: (width.value - width.value) / 2 },
        { translateY: (width.value - width.value) / 2 },
      ],
    };
  }, [width]);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    if (!isGestureActive.value) return;

    const center = width.value / 2,
      dx = center - x,
      dy = center - y,
      theta = (Math.atan2(dy, dx) + rotate * (Math.PI / 180)) * (180 / Math.PI), // [0 - 180] range
      angle = theta < 0 ? 360 + theta : theta, // [0 - 360] range
      mirroredAngle = angle <= 180 ? angle : 360 - angle,
      newLuminanceValue = (mirroredAngle / 180) * 100;

    thumbSide.value = angle <= 180 ? 0 : 1;

    if (newLuminanceValue === hsl.value.l) return;

    const { s, v } = colorKit.runOnUI().HSV({ h: hsl.value.h, s: hsl.value.s, l: newLuminanceValue }).object(false);

    saturationValue.value = s;
    brightnessValue.value = v;

    onGestureChange();
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';

    const R = width.value / 2,
      dx = R - event.x,
      dy = R - event.y,
      clickR = Math.sqrt(dx * dx + dy * dy);

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
    handleScale.value = withTiming(1.2, { duration: 100 });
    onGestureUpdate(event);
  };

  const onGestureFinish = () => {
    'worklet';
    isGestureActive.value = false;
    handleScale.value = withTiming(1, { duration: 100 });
    onGestureEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureFinish);
  const tap = Gesture.Tap().onTouchesUp(onGestureFinish);
  const longPress = Gesture.LongPress().onTouchesUp(onGestureFinish);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutWidth = layout.width;
    width.value = layoutWidth;
    borderRadius.value = withTiming(layoutWidth / 2, { duration: 5 });
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.panel_container,
          { justifyContent: 'center', alignItems: 'center' },
          style,
          { position: 'relative', aspectRatio: 1, borderWidth: 0, padding: 0 },
          borderRadiusStyle,
        ]}
      >
        <Animated.View
          style={[styles.panel_image, imageStyle, activeColorStyle, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
        >
          <Image
            source={require('@assets/blackGradient.png')}
            style={{ width: '100%', height: '100%', flex: 1 }}
            resizeMode='stretch'
          />
          <Image
            source={require('@assets/blackGradient.png')}
            style={{ width: '100%', height: '100%', flex: 1, tintColor: '#fff', transform: [{ scaleX: -1 }] }}
            resizeMode='stretch'
          />
        </Animated.View>

        <Animated.View style={[clipViewStyle, containerStyle]}>{children}</Animated.View>

        <Thumb
          channel='v'
          thumbShape={thumbShape}
          thumbSize={thumbSize}
          thumbColor={thumbColor}
          renderThumb={renderThumb}
          innerStyle={thumbInnerStyle}
          handleStyle={handleStyle}
          style={thumbStyle}
          adaptSpectrum={adaptSpectrum}
        />
      </Animated.View>
    </GestureDetector>
  );
}
