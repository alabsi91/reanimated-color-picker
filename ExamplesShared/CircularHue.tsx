import React, { useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, HueCircular, Panel1, PreviewText, Swatches } from 'reanimated-color-picker';

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
    <BaseContainer name='Circular Hue' backgroundColor={currentColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={20}
          thumbSize={24}
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
          boundedThumb
        >
          <HueCircular containerStyle={{ justifyContent: 'center' }} thumbShape='pill'>
            <Panel1 style={{ borderRadius: 16, width: '70%', height: '70%', alignSelf: 'center' }} />
          </HueCircular>

          <Divider />
          <Swatches
            style={colorPickerStyle.swatchesContainer}
            swatchStyle={colorPickerStyle.swatchStyle}
            colors={customSwatches}
          />
          <Divider />

          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsl' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
