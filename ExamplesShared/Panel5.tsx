import React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, OpacitySlider, Panel5, PreviewText } from 'reanimated-color-picker';
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
    <BaseContainer name='Panel5 Grid' backgroundColor={selectedColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={selectedColor.value}
          sliderThickness={25}
          thumbSize={24}
          thumbShape='circle'
          onChange={onColorSelect}
          style={colorPickerStyle.picker}
        >
          <Panel5 style={colorPickerStyle.panelStyle} />
          <OpacitySlider style={colorPickerStyle.sliderStyle} adaptSpectrum />
          <Divider />
          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsla' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
