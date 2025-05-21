import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BlueSlider,
  colorKit,
  GreenSlider,
  OpacitySlider,
  PreviewText,
  RedSlider,
  Swatches,
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
    <BaseContainer name='RGB Vertical' backgroundColor={currentColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={30}
          thumbSize={30}
          thumbShape='circle'
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          thumbAnimationDuration={100}
          style={colorPickerStyle.picker}
          adaptSpectrum
          boundedThumb
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>R</Text>
              <RedSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>G</Text>
              <GreenSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>B</Text>
              <BlueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
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

          <PreviewText style={colorPickerStyle.previewTxt} colorFormat='rgba' />
        </ColorPicker>
      </View>
    </BaseContainer>
  );
}
