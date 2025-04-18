import React from 'react';
import { Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BrightnessSlider,
  colorKit,
  HueSlider,
  OpacitySlider,
  PreviewText,
  SaturationSlider,
  Swatches,
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
    <BaseContainer name='HSB Horizontal' backgroundColor={selectedColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={selectedColor.value}
          sliderThickness={25}
          thumbSize={24}
          thumbShape='circle'
          onChange={onColorSelect}
          style={colorPickerStyle.picker}
          adaptSpectrum
          boundedThumb
        >
          <View>
            <Text style={colorPickerStyle.sliderTitle}>Hue</Text>
            <HueSlider style={colorPickerStyle.sliderStyle} />
          </View>

          <View>
            <Text style={colorPickerStyle.sliderTitle}>Saturation</Text>
            <SaturationSlider style={colorPickerStyle.sliderStyle} reverse />
          </View>

          <View>
            <Text style={colorPickerStyle.sliderTitle}>Brightness</Text>
            <BrightnessSlider style={colorPickerStyle.sliderStyle} />
          </View>

          <View>
            <Text style={colorPickerStyle.sliderTitle}>Opacity</Text>
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
          </View>

          <Divider />
          <Swatches
            style={colorPickerStyle.swatchesContainer}
            swatchStyle={colorPickerStyle.swatchStyle}
            colors={customSwatches}
          />
          <Divider />

          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsva' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
