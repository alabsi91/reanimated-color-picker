import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { BrightnessSlider, InputWidget, OpacitySlider, Panel2, colorKit } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial random color
const initialColor = colorKit.randomRgbColor().hex();

export default function Example() {
  const [resultColor, setResultColor] = useState(initialColor);

  const currentColor = useContainerBackgroundColor(initialColor);

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
    <KeyboardAvoidingView behavior='position'>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbSize={30}
          thumbShape='rect'
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
        >
          <Panel2 style={colorPickerStyle.panelStyle} thumbShape='ring' reverseVerticalChannel reverseHue />
          <BrightnessSlider style={colorPickerStyle.sliderStyle} />
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
          <Divider />
          <InputWidget inputStyle={colorPickerStyle.inputStyle} iconColor='#707070' />
        </ColorPicker>
      </View>
    </KeyboardAvoidingView>
  );
}
