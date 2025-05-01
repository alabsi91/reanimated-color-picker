import React from 'react';
import { Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  HSLSaturationSlider,
  HueSlider,
  LuminanceSlider,
  OpacitySlider,
  PreviewText,
  Swatches,
  colorKit,
} from 'reanimated-color-picker';
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
    <BaseContainer name='HSL Vertical' backgroundColor={selectedColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={selectedColor.value}
          sliderThickness={30}
          thumbSize={30}
          thumbShape='circle'
          onChange={onColorSelect}
          style={colorPickerStyle.picker}
          adaptSpectrum
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

          <Divider />
          <Swatches
            style={colorPickerStyle.swatchesContainer}
            swatchStyle={colorPickerStyle.swatchStyle}
            colors={customSwatches}
          />
          <Divider />

          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsla' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
