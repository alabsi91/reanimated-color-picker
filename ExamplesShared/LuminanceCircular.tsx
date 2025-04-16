import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { LuminanceCircular, Panel3, PreviewText, Swatches, colorKit } from 'reanimated-color-picker';
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
    <BaseContainer name='Luminance Circular' backgroundColor={selectedColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={selectedColor.value}
          sliderThickness={24}
          thumbSize={24}
          onChange={onColorSelect}
          style={colorPickerStyle.picker}
          adaptSpectrum
          boundedThumb
        >
          <LuminanceCircular
            containerStyle={styles.hueContainer}
            thumbShape='circle'
            thumbInnerStyle={styles.thumbInner}
            thumbScaleAnimationValue={1}
          >
            <Panel3 style={styles.panelStyle} centerChannel='hsl-saturation' />
          </LuminanceCircular>

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
const styles = StyleSheet.create({
  hueContainer: {
    justifyContent: 'center',
  },
  panelStyle: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  thumbInner: {
    borderWidth: 4,
    borderColor: '#fff',
  },
});
