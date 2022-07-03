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
import styles from '../GlobalStyles';

const isRtl = I18nManager.isRTL;

export function Panel1({
  activeHueStyle,
  previewTextColor,
  previewColorWithoutOpacity,
  saturationPanel1_handlePos,
  brightnessPanel1_handlePos,
  saturationPanel2_handlePos,
  saturationSlider_handlePos,
  brightnessSlider_handlePos,
  updateSB,
  onGestureEventFinish,
  setHandlesPos,
  panel1ThumbeSize,
  panel2ThumbeSize,
  brightnessThumbeSize,
  saturationThumbeSize,
  width,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  style = {}, // by user
}) {
  panel1ThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_panelHandle = useSharedValue(1);

  const panel_handleStyle = useAnimatedStyle(() => ({
    backgroundColor:
      previewTextColor.value === '#ffffff' ? '#ffffff50' : '#00000050',
    borderColor: previewTextColor.value,
    transform: [
      { translateX: saturationPanel1_handlePos.value },
      { translateY: brightnessPanel1_handlePos.value },
      { scale: scale_panelHandle.value },
    ],
  }));

  const panel_GestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.x = event.x;
      ctx.y = event.y;
      scale_panelHandle.value = withTiming(1.2, { duration: 100 });
    },
    onActive: (event, ctx) => {
      const clamp = (v, max) => Math.min(Math.max(v, 0), max);

      const x = event.translationX;
      const y = event.translationY;
      const posX = clamp(x + ctx.x, width);
      const posY = clamp(y + ctx.y, width);
      const percentX = posX / width;
      const percentY = posY / width;

      const saturationX = Math.round(percentX * 100);
      const brightnessY = Math.round(100 - percentY * 100);

      saturationPanel1_handlePos.value = isRtl
        ? percentX * width - width + thumbSize / 2
        : percentX * width - thumbSize / 2;
      brightnessPanel1_handlePos.value = percentY * width - thumbSize / 2;

      brightnessSlider_handlePos.value = isRtl
        ? (brightnessY / 100) * width - width + brightnessThumbeSize.current / 2
        : (brightnessY / 100) * width - brightnessThumbeSize.current / 2;

      saturationSlider_handlePos.value = isRtl
        ? (saturationX / 100) * width - width + saturationThumbeSize.current / 2
        : (saturationX / 100) * width - saturationThumbeSize.current / 2;

      // panel 2 windows style
      saturationPanel2_handlePos.value =
        width - (saturationX / 100) * width - panel2ThumbeSize.current / 2;

      runOnJS(updateSB)(saturationX, brightnessY);
    },
    onFinish: () => {
      scale_panelHandle.value = withTiming(1, { duration: 100 });
      runOnJS(onGestureEventFinish)();
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panel_GestureEvent} minDist={0}>
      <Animated.View
        style={[
          styles.panel_container,
          style,
          { width, height: width },
          styles.override,
          activeHueStyle,
        ]}>
        <Image
          source={require('../assets/Background1.png')}
          style={{
            borderRadius: style.borderRadius ?? 5,
            width,
            height: width,
          }}
        />
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
            },
            panel_handleStyle,
          ]}>
          <Animated.View
            style={[
              styles.handleInner,
              { borderRadius: thumbSize / 2 },
              previewColorWithoutOpacity,
            ]}
          />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
