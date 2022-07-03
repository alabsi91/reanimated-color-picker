import React, { useEffect } from 'react';
import { Image, I18nManager } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { COLOR_HSVA, HSL_HEX, HSV_HSL } from '../ColorsConversionFormulas';
import styles from '../GlobalStyles';

const isRtl = I18nManager.isRTL;

export function BrightnessSlider({
  width,
  brightnessThumbeSize,
  panel1ThumbeSize,
  setHandlesPos,
  updateBrightness,
  onGestureEventFinish,
  brightnessPanel1_handlePos,
  brightnessSlider_handlePos,
  previewColorWithoutOpacity,
  tracksHeight,
  activeHueStyle,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  ringColor = '#ffffff', // by user
  style = {}, // by user
}) {
  const height = style.height ?? tracksHeight;
  const borderRadius = style.borderRadius ?? 5;

  brightnessThumbeSize.current = thumbSize;

  ringColor = COLOR_HSVA(ringColor);
  ringColor = HSV_HSL(ringColor.h, ringColor.s, ringColor.b);
  ringColor = HSL_HEX(ringColor.h, ringColor.s, ringColor.l);

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_brightnessHandle = useSharedValue(1); // for handles scale.

  const brightness_handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: brightnessSlider_handlePos.value },
      { translateY: -(thumbSize - height) / 2 },
      { scale: scale_brightnessHandle.value },
    ],
  }));

  const BrightnessGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.x = event.x;
        scale_brightnessHandle.value = withTiming(1.2, {
          duration: 100,
        });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const brightnessX = Math.round(percent * 100);

        brightnessSlider_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;
        brightnessPanel1_handlePos.value = width - (brightnessX / 100) * width - panel1ThumbeSize.current / 2;

        runOnJS(updateBrightness)(brightnessX);
      },
      onFinish: () => {
        scale_brightnessHandle.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width]
  );

  return (
    <PanGestureHandler onGestureEvent={BrightnessGestureEvent} minDist={0}>
      <Animated.View style={[{ position: 'relative', borderRadius, height }, style, { width }, styles.override, activeHueStyle]}>
        <Image source={require('../assets/Brightness.png')} style={[styles.sliderImage, { height, borderRadius }]} />
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: ringColor + 50,
              borderColor: ringColor,
            },
            brightness_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
