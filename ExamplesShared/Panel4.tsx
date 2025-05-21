import React, { useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, OpacitySlider, Panel4, PreviewText } from 'reanimated-color-picker';

import BaseContainer from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial random color; in the range thats the `Panel4` can display
const initialColor = colorKit.randomHsvColor({ s: [100, 100], v: [100, 100] }).hex();

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
    <BaseContainer name='Panel4' backgroundColor={currentColor}>
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
          <Panel4 style={colorPickerStyle.panelStyle} thumbShape='ring' />
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
          <Divider />
          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hwba' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
