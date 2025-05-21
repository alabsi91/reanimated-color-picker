import React, { useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { OpacitySlider, Panel5, PreviewText } from 'reanimated-color-picker';

import BaseContainer from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial color; one of the grid colors
const initialColor = '#ad3e00';

export default function Example() {
  const [resultColor, setResultColor] = useState(initialColor);

  const currentColor = useSharedValue(initialColor);

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
    <BaseContainer name='Panel5 Grid' backgroundColor={currentColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbSize={24}
          thumbShape='circle'
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
        >
          <Panel5 style={[colorPickerStyle.panelStyle, { borderRadius: 4 }]} />
          <OpacitySlider style={colorPickerStyle.sliderStyle} adaptSpectrum />
          <Divider />
          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsla' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
