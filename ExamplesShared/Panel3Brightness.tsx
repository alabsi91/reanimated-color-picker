import React, { useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, OpacitySlider, Panel3, Preview, SaturationSlider, Swatches } from 'reanimated-color-picker';

import BaseContainer from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useSharedValue(customSwatches[0]);

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
    <BaseContainer name='Panel3 Brightness' backgroundColor={currentColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbShape='circle'
          thumbSize={25}
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
          adaptSpectrum
        >
          <Preview style={colorPickerStyle.previewStyle} textStyle={colorPickerStyle.previewTxt} />
          <Divider />
          <Panel3 style={colorPickerStyle.panelStyle} centerChannel='brightness' />
          <SaturationSlider style={colorPickerStyle.sliderStyle} />
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
          <Divider />
          <Swatches
            style={colorPickerStyle.swatchesContainer}
            swatchStyle={colorPickerStyle.swatchStyle}
            colors={customSwatches}
          />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
