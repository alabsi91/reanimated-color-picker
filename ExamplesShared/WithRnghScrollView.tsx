import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { HSLSaturationSlider, HueSlider, LuminanceSlider, OpacitySlider } from 'reanimated-color-picker';

import BaseContainer from './components/BaseContainer';
import { colorPickerStyle } from './components/colorPickerStyle';

/*
 * Using react-native-gesture-handler ScrollView to prevent scrolling while using the color picker
 */
export default function Example() {
  const [resultColor, setResultColor] = useState('#f00');

  const currentColor = useSharedValue('#f00');

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <BaseContainer name='With RNGH ScrollView'>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ height: '150%', justifyContent: 'center' }}>
          <Text style={colorPickerStyle.title}>Color Picker in a ScrollView</Text>

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
                  <HueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={colorPickerStyle.sliderTitle}>S</Text>
                  <HSLSaturationSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={colorPickerStyle.sliderTitle}>L</Text>
                  <LuminanceSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={colorPickerStyle.sliderTitle}>A</Text>
                  <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>
              </View>
            </ColorPicker>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </BaseContainer>
  );
}
