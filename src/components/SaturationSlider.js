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

export function SaturationSlider({
  width,
  saturationThumbeSize,
  panel2ThumbeSize,
  panel1ThumbeSize,
  setHandlesPos,
  updateSaturation,
  onGestureEventFinish,
  saturationPanel1_handlePos,
  saturationPanel2_handlePos,
  saturationSlider_handlePos,
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

  saturationThumbeSize.current = thumbSize;

  ringColor = COLOR_HSVA(ringColor);
  ringColor = HSV_HSL(ringColor.h, ringColor.s, ringColor.b);
  ringColor = HSL_HEX(ringColor.h, ringColor.s, ringColor.l);

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_saturationHandle = useSharedValue(1); // for handles scale.

  const saturation_handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: saturationSlider_handlePos.value },
      { translateY: -(thumbSize - height) / 2 },
      { scale: scale_saturationHandle.value },
    ],
  }));

  const SaturationGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.x = event.x;
        scale_saturationHandle.value = withTiming(1.2, {
          duration: 100,
        });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const saturationX = Math.round(percent * 100);

        saturationSlider_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;
        // panel 2 windows style
        saturationPanel1_handlePos.value = isRtl
          ? (saturationX / 100) * width - width + panel1ThumbeSize.current / 2
          : (saturationX / 100) * width - panel1ThumbeSize.current / 2;
        // panel 2 windows style
        saturationPanel2_handlePos.value = width - (saturationX / 100) * width - panel2ThumbeSize.current / 2;

        runOnJS(updateSaturation)(saturationX);
      },
      onFinish: () => {
        scale_saturationHandle.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width]
  );

  return (
    <PanGestureHandler onGestureEvent={SaturationGestureEvent} minDist={0}>
      <Animated.View style={[{ position: 'relative', borderRadius, height }, style, { width }, styles.override, activeHueStyle]}>
        <Image source={require('../assets/Saturation.png')} style={[styles.sliderImage, { height, borderRadius }]} />
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
            saturation_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
