import React, { useEffect } from 'react';
import { Image, I18nManager, StyleSheet } from 'react-native';
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

export function Panel2({
  previewTextColor,
  previewColorWithoutOpacity,
  saturationPanel1_handlePos,
  saturationPanel2_handlePos,
  huePanel2_handlePos,
  hue_handlePos,
  saturationSlider_handlePos,
  onGestureEventFinish,
  setHandlesPos,
  panel1ThumbeSize,
  panel2ThumbeSize,
  hueThumbeSize,
  saturationThumbeSize,
  updateHS,
  width,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  style = {}, // by user
}) {
  panel2ThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_panelHandle = useSharedValue(1);

  const panel_handleStyle = useAnimatedStyle(() => ({
    backgroundColor:
      previewTextColor.value === '#ffffff' ? '#ffffff50' : '#00000050',
    borderColor: previewTextColor.value,
    transform: [
      { translateX: huePanel2_handlePos.value },
      { translateY: saturationPanel2_handlePos.value },
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

      const hueX = Math.round(percentX * 360);
      const saturationY = Math.round(100 - percentY * 100);

      huePanel2_handlePos.value = isRtl
        ? percentX * width - width + thumbSize / 2
        : percentX * width - thumbSize / 2;

      saturationPanel2_handlePos.value = percentY * width - thumbSize / 2;

      hue_handlePos.value = isRtl
        ? width - (hueX / 360) * width - width + hueThumbeSize.current / 2
        : width - (hueX / 360) * width - hueThumbeSize.current / 2;

      saturationSlider_handlePos.value = isRtl
        ? (saturationY / 100) * width - width + saturationThumbeSize.current / 2
        : (saturationY / 100) * width - saturationThumbeSize.current / 2;

      // panel 1 adobe style
      saturationPanel1_handlePos.value = isRtl
        ? (saturationY / 100) * width - width + panel1ThumbeSize.current / 2
        : (saturationY / 100) * width - panel1ThumbeSize.current / 2;

      runOnJS(updateHS)(hueX, saturationY);
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
        ]}>
        <Image
          source={require('../assets/Background2.png')}
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
