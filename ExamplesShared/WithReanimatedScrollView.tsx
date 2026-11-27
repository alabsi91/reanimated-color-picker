import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { HSLSaturationSlider, HueSlider, LuminanceSlider, OpacitySlider } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import { colorPickerStyle } from './components/colorPickerStyle';

/*
 * Using react-native-reanimated ScrollView and cancelling the scroll while using the color picker
 */
export default function Example() {
  const [resultColor, setResultColor] = useState('#f00');

  const currentColor = useContainerBackgroundColor('#f00');

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  const isScrollEnabled = useSharedValue<boolean | undefined>(true);

  //? NOTE:
  // - You cannot use the same gesture for multiple color picker components.
  // - Either pass a new gesture or deep clone the gesture constructor.
  const [hueGesture, saturationGesture, lumGesture, opacityGesture] = Array.from({ length: 4 }, () =>
    Gesture.Pan()
      .onBegin(() => (isScrollEnabled.value = false))
      .onFinalize(() => (isScrollEnabled.value = true)),
  );

  const animatedProps = useAnimatedProps(
    () => ({ scrollEnabled: isScrollEnabled.value }),
    Platform.OS === 'web' ? [isScrollEnabled] : undefined,
  );

  return (
    <Animated.ScrollView animatedProps={animatedProps} contentContainerStyle={{ height: '150%', justifyContent: 'center' }}>
      <Text style={colorPickerStyle.title}>Color Picker in a Animated.ScrollView</Text>

      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={30}
          thumbSize={30}
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
          boundedThumb
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>H</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <HueSlider gestures={[hueGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>S</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <HSLSaturationSlider
                  gestures={[saturationGesture]}
                  style={colorPickerStyle.sliderVerticalStyle}
                  vertical
                  reverse
                />
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>L</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <LuminanceSlider gestures={[lumGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>A</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <OpacitySlider gestures={[opacityGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>
            </View>
          </View>
        </ColorPicker>
      </View>
    </Animated.ScrollView>
  );
}
