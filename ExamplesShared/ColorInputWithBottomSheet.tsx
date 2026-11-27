import { ModalBottomSheet } from '@swmansion/react-native-bottom-sheet';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPickerInUse, setIsPickerInUse] = useState(false);

  //? NOTE: Each color picker component needs its own gesture.
  const [panelGesture, hueGesture, opacityGesture] = useMemo(
    () =>
      Array.from({ length: 3 }, () =>
        Gesture.Pan()
          .runOnJS(true)
          .onBegin(() => setIsPickerInUse(true))
          .onFinalize(() => setIsPickerInUse(false)),
      ),
    [],
  );

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
      <ColorInput onSwatchPress={() => setIsSheetOpen(true)} style={styles.colorInput} inputStyle={styles.colorInputText} />

      <ModalBottomSheet
        // Stops the sheet drag while the picker is in use
        detents={[{ value: 0, programmatic: isPickerInUse }, 'content']}
        index={isSheetOpen ? 1 : 0}
        onIndexChange={index => setIsSheetOpen(index > 0)}
        windowOverlay
        lazy
        maxWidth={340}
        scrimColor='rgba(0, 0, 0, 0.4)'
        surface={<View style={[StyleSheet.absoluteFill, styles.sheetSurface]} />}
        surfaceStyle={styles.sheetSurfaceShape}
      >
        {/* The sheet renders in its own native window and needs its own gesture root view. */}
        <GestureHandlerRootView style={styles.sheetContent}>
          <View style={styles.sheetHandle} />

          <View style={colorPickerStyle.panelBorderContainer}>
            <Panel1 gestures={[panelGesture]} style={colorPickerStyle.panelStyle} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <HueSlider gestures={[hueGesture]} style={colorPickerStyle.sliderStyle} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider gestures={[opacityGesture]} style={colorPickerStyle.sliderStyle} />
          </View>

          <Divider />
          <Swatches
            style={colorPickerStyle.swatchesContainer}
            swatchStyle={colorPickerStyle.swatchStyle}
            colors={customSwatches}
          />
        </GestureHandlerRootView>
      </ModalBottomSheet>
    </ColorPicker>
  );
}

const styles = StyleSheet.create({
  sheetSurface: {
    backgroundColor: colorPickerStyle.pickerContainer.backgroundColor,
  },
  sheetSurfaceShape: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20 + (initialWindowMetrics?.insets.bottom ?? 0),
    gap: 20,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#bbb',
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
