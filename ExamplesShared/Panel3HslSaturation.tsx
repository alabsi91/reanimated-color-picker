import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { LuminanceSlider, OpacitySlider, Panel3, Preview, Swatches, colorKit } from 'reanimated-color-picker';
import BaseContainer from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

export default function Example() {
  const customSwatches = useMemo(() => new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex()), []);

  const [currentValue, setCurrentValue] = useState(customSwatches[0]);

  const selectedColor = useSharedValue(customSwatches[0]);

  const onColorSelect = (color: ColorFormatsObject) => {
    'worklet';
    selectedColor.value = color.hex;
  };

  const onColorCompleteJS = (color: ColorFormatsObject) => setCurrentValue(color.hex);

  return (
    <BaseContainer name='Panel3 HSL Saturation' backgroundColor={selectedColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={currentValue}
          sliderThickness={25}
          thumbShape='circle'
          thumbSize={25}
          onChange={onColorSelect}
          onCompleteJS={onColorCompleteJS}
          style={colorPickerStyle.picker}
          adaptSpectrum
        >
          <Preview style={colorPickerStyle.previewStyle} textStyle={colorPickerStyle.previewTxt} />
          <Divider />
          <Panel3 style={colorPickerStyle.panelStyle} centerChannel='hsl-saturation' />
          <LuminanceSlider style={colorPickerStyle.sliderStyle} />
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
