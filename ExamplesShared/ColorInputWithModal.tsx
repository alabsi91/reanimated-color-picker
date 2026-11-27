import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { ColorInput, colorKit, HueSlider, OpacitySlider, Panel1, Swatches } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

const initialColor = '#3a7bd5';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  return (
    <ColorPicker
      value={initialColor}
      sliderThickness={25}
      thumbSize={24}
      thumbShape='circle'
      onChange={onColorChange}
      boundedThumb
    >
      <ColorInput onSwatchPress={() => setIsModalOpen(true)} style={styles.colorInput} inputStyle={styles.colorInputText} />

      <Modal
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        animationType='fade'
        transparent
        statusBarTranslucent
        navigationBarTranslucent
      >
        {/* The modal renders in its own native window and needs its own gesture root view. */}
        <GestureHandlerRootView style={styles.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsModalOpen(false)} aria-label='Close color picker' />

          <View style={[colorPickerStyle.pickerContainer, colorPickerStyle.picker]}>
            <View style={colorPickerStyle.panelBorderContainer}>
              <Panel1 style={colorPickerStyle.panelStyle} />
            </View>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <HueSlider style={colorPickerStyle.sliderStyle} />
            </View>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <OpacitySlider style={colorPickerStyle.sliderStyle} />
            </View>

            <Divider />
            <Swatches
              style={colorPickerStyle.swatchesContainer}
              swatchStyle={colorPickerStyle.swatchStyle}
              colors={customSwatches}
            />
          </View>
        </GestureHandlerRootView>
      </Modal>
    </ColorPicker>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    // The modal grows to the full window after its first frame. The window height keeps the picker from moving.
    height: initialWindowMetrics?.frame.height ?? '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(32, 33, 36, 0.9)',
  },
  colorInput: {
    alignSelf: 'center',
    width: 300,
  },
  colorInputText: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#707070',
    fontFamily: 'Quicksand',
  },
});
