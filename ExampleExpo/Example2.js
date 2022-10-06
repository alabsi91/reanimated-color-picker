import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import ColorPicker, { Panel3, Swatches, Preview, OpacitySlider, BrightnessSlider } from 'reanimated-color-picker';

const customSwatches = ['#8a00d4', '#d527b7', '#f782c2', '#f9c46b', '#e3e3e3'];

export default function Example1({ onSelectColor, color }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title='Color Picker 2' onPress={() => setShowModal(true)} />

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <View style={styles.container}>
          <ColorPicker
            value={color.value}
            sliderThickness={30}
            thumbSize={33}
            thumbShape='circle'
            onComplete={onSelectColor}
            style={{ width: '75%', justifyContent: 'space-evenly' }}
          >
            <Preview style={[styles.previewStyle, styles.shadow]} textStyle={{ fontSize: 16 }} />
            <Panel3 style={[styles.shadow]} />

            <BrightnessSlider style={styles.shadow} />
            <OpacitySlider style={styles.shadow} />

            <Swatches swatchStyle={styles.swatchStyle} colors={customSwatches} />
          </ColorPicker>

          <Button title='Close' onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingBottom: 0,
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
  },
  previewStyle: {
    height: 50,
    borderRadius: 10,
  },
  swatchStyle: {
    borderRadius: 8,
    height: 30,
    width: 45,
    margin: 5,
  },
  shadow: {
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
