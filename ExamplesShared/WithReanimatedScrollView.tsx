import React from 'react';
import { Text, View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import type { ColorFormatsObject } from 'reanimated-color-picker';

import ColorPicker, { HSLSaturationSlider, HueSlider, LuminanceSlider, OpacitySlider } from 'reanimated-color-picker';
import BaseContainer from './components/BaseContainer';
import { colorPickerStyle } from './components/colorPickerStyle';

/*
 * Using react-native-reanimated ScrollView and cancelling the scroll while using the color picker
 */

export default function Example() {
  const selectedColor = useSharedValue('#f00');

  const onColorSelect = (color: ColorFormatsObject) => {
    'worklet';
    selectedColor.value = color.hex;
  };

  const isScrollEnabled = useSharedValue<boolean | undefined>(true);

  const enableScroll = () => {
    'worklet';
    isScrollEnabled.value = true;
  };

  const disableScroll = () => {
    'worklet';
    isScrollEnabled.value = false;
  };

  // NOTE:
  // You cannot use the same gesture for multiple color picker components.
  // Either pass a new gesture or deep clone the gesture constructor.
  const hueGesture = Gesture.Pan().onBegin(disableScroll).onFinalize(enableScroll);
  const saturationGesture = Gesture.Pan().onBegin(disableScroll).onFinalize(enableScroll);
  const lumGesture = Gesture.Pan().onBegin(disableScroll).onFinalize(enableScroll);
  // Example of how to clone a gesture:
  const opacityGesture = Object.assign(Object.create(Object.getPrototypeOf(hueGesture)), hueGesture);

  return (
    <BaseContainer name='With Reanimated ScrollView'>
      <Animated.ScrollView scrollEnabled={isScrollEnabled} contentContainerStyle={{ height: '150%', justifyContent: 'center' }}>
        <Text style={colorPickerStyle.title}>Color Picker in a ScrollView</Text>

        <View style={colorPickerStyle.pickerContainer}>
          <ColorPicker
            value={selectedColor.value}
            sliderThickness={30}
            thumbSize={30}
            onChange={onColorSelect}
            style={colorPickerStyle.picker}
            boundedThumb
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>H</Text>
                <HueSlider gestures={[hueGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>S</Text>
                <HSLSaturationSlider
                  gestures={[saturationGesture]}
                  style={colorPickerStyle.sliderVerticalStyle}
                  vertical
                  reverse
                />
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>L</Text>
                <LuminanceSlider gestures={[lumGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>A</Text>
                <OpacitySlider gestures={[opacityGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>
            </View>
          </ColorPicker>
        </View>
      </Animated.ScrollView>
    </BaseContainer>
  );
}
