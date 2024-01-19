import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import ColorPicker, {
  Swatches,
  OpacitySlider,
  HueSlider,
  colorKit,
  PreviewText,
  SaturationSlider,
  BrightnessSlider,
} from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';

export default function Example() {
  const [showModal, setShowModal] = useState(false);

  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

  const selectedColor = useSharedValue(customSwatches[0]);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const onColorSelect = (color: returnedResults) => {
    'worklet';
    selectedColor.value = color.hex;
  };

  return (
    <>
      <Pressable style={styles.openButton} onPress={() => setShowModal(true)}>
        <Text style={{ color: '#707070', fontWeight: 'bold', textAlign: 'center' }}>Vertical HSB Sliders</Text>
      </Pressable>

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              value={selectedColor.value}
              sliderThickness={30}
              thumbSize={30}
              thumbShape='circle'
              onChange={onColorSelect}
              adaptSpectrum
              boundedThumb
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 300 }}>
                <HueSlider style={styles.sliderStyle} vertical reverse />
                <SaturationSlider style={styles.sliderStyle} vertical reverse />
                <BrightnessSlider style={styles.sliderStyle} vertical reverse />
                <OpacitySlider style={styles.sliderStyle} vertical reverse />
              </View>

              <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />
              <View style={styles.previewTxtContainer}>
                <PreviewText style={{ color: '#707070' }} colorFormat='hsva' />
              </View>
            </ColorPicker>
          </View>

          <Pressable style={styles.closeButton} onPress={() => setShowModal(false)}>
            <Text style={{ color: '#707070', fontWeight: 'bold' }}>Close</Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'orange',
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  sliderStyle: {
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
