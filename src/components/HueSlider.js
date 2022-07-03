import React, { useEffect } from 'react';
import { View, Image, I18nManager } from 'react-native';
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

export function HueSlider({
  width,
  hueThumbeSize,
  setHandlesPos,
  updateHue,
  onGestureEventFinish,
  hue_handlePos,
  huePanel2_handlePos,
  previewColorWithoutOpacity,
  tracksHeight,
  panel2ThumbeSize,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  ringColor = '#ffffff', // by user
  style = {}, // by user
}) {
  const height = style.height ?? tracksHeight;
  const borderRadius = style.borderRadius ?? 5;

  hueThumbeSize.current = thumbSize;

  ringColor = COLOR_HSVA(ringColor);
  ringColor = HSV_HSL(ringColor.h, ringColor.s, ringColor.b);
  ringColor = HSL_HEX(ringColor.h, ringColor.s, ringColor.l);

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_hueHandle = useSharedValue(1);

  const hue_handleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: hue_handlePos.value }, { translateY: -(thumbSize - height) / 2 }, { scale: scale_hueHandle.value }],
  }));

  const HueGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.x = event.x;
        scale_hueHandle.value = withTiming(1.2, { duration: 100 });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const hueX = 360 - Math.round(percent * 360);

        hue_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;

        // panel 2 windows style
        huePanel2_handlePos.value = isRtl
          ? (hueX / 360) * width - width + panel2ThumbeSize.current / 2
          : (hueX / 360) * width - panel2ThumbeSize.current / 2;

        runOnJS(updateHue)(hueX);
      },
      onFinish: () => {
        scale_hueHandle.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width]
  );

  return (
    <PanGestureHandler onGestureEvent={HueGestureEvent} minDist={0}>
      <Animated.View style={[{ position: 'relative', borderRadius, height }, style, { width }, styles.override]}>
        <Image source={require('../assets/Hue.png')} style={[styles.sliderImage, { height, borderRadius }]} />

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
            hue_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2, zIndex: 100 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
