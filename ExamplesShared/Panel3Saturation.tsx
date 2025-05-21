import React, { useState } from 'react';
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
    <BaseContainer name='Panel3 Saturation' backgroundColor={currentColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbSize={27}
          onChange={onColorChange}
          onCompleteJS={onColorPick}
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
