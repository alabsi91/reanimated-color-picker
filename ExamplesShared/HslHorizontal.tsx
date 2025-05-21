import React, { useState } from 'react';
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
    <BaseContainer name='HSL Horizontal' backgroundColor={currentColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbSize={24}
          thumbShape='circle'
          onChange={onColorChange}
          onCompleteJS={onColorPick}
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
            <HSLSaturationSlider style={colorPickerStyle.sliderStyle} reverse />
          </View>

          <View>
            <Text style={colorPickerStyle.sliderTitle}>Luminance</Text>
            <LuminanceSlider style={colorPickerStyle.sliderStyle} />
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

          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsla' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
