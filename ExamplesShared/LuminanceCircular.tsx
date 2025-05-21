import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { LuminanceCircular, Panel3, PreviewText, Swatches, colorKit } from 'reanimated-color-picker';

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
    <BaseContainer name='Luminance Circular' backgroundColor={currentColor}>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={24}
          thumbSize={24}
          onChange={onColorChange}
          onCompleteJS={onColorPick}
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
