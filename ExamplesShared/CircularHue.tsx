import React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, HueCircular, Panel1, PreviewText, Swatches } from 'reanimated-color-picker';
import BaseContainer from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

export default function Example() {
  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

  const selectedColor = useSharedValue(customSwatches[0]);

  const onColorSelect = (color: ColorFormatsObject) => {
    'worklet';
    selectedColor.value = color.hex;
  };

  return (
    <BaseContainer name='Circular Hue' backgroundColor={selectedColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={selectedColor.value}
          sliderThickness={20}
          thumbSize={24}
          onChange={onColorSelect}
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
