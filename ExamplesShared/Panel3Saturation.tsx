import React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BrightnessSlider,
  ExtraThumb,
  OpacitySlider,
  Panel3,
  Preview,
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
    <BaseContainer name='Panel3 Saturation' backgroundColor={selectedColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={selectedColor.value}
          sliderThickness={25}
          thumbSize={27}
          onChange={onColorSelect}
          style={colorPickerStyle.picker}
        >
          <Preview style={colorPickerStyle.previewStyle} textStyle={colorPickerStyle.previewTxt} />
          <Divider />
          <Panel3 style={colorPickerStyle.panelStyle} renderCenterLine adaptSpectrum>
            <ExtraThumb thumbShape='circle' hueTransform={120} />
            <ExtraThumb thumbShape='circle' hueTransform={140} />
            <ExtraThumb thumbShape='circle' hueTransform={160} />
            <ExtraThumb thumbShape='circle' hueTransform={180} />
            <ExtraThumb thumbShape='circle' hueTransform={200} />
            <ExtraThumb thumbShape='circle' hueTransform={220} />
            <ExtraThumb thumbShape='circle' hueTransform={240} />
          </Panel3>
          <BrightnessSlider style={colorPickerStyle.sliderStyle} />
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
