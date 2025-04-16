import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, InputWidget, OpacitySlider, Panel2, SaturationSlider } from 'reanimated-color-picker';
import BaseContainer from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

export default function Example() {
  const initialColor = colorKit.randomRgbColor().hex();

  const selectedColor = useSharedValue(initialColor);

  const onColorSelect = (color: ColorFormatsObject) => {
    'worklet';
    selectedColor.value = color.hex;
  };

  return (
    <BaseContainer name='Panel2 Brightness' backgroundColor={selectedColor}>
      <KeyboardAvoidingView behavior='position'>
        <View style={colorPickerStyle.pickerContainer}>
          <ColorPicker
            value={selectedColor.value}
            sliderThickness={26}
            thumbSize={13}
            thumbShape='doubleTriangle'
            onChange={onColorSelect}
            style={colorPickerStyle.picker}
            adaptSpectrum
          >
            <Panel2 style={colorPickerStyle.panelStyle} verticalChannel='brightness' thumbShape='ring' thumbSize={30} />
            <SaturationSlider style={colorPickerStyle.sliderStyle} />
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
            <Divider />
            <InputWidget inputStyle={colorPickerStyle.inputStyle} iconColor='#707070' />
          </ColorPicker>
        </View>
      </KeyboardAvoidingView>
    </BaseContainer>
  );
}
