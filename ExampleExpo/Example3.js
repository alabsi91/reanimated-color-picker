import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import ColorPicker, { Swatches, Preview, OpacitySlider, Panel2, BrightnessSlider } from 'reanimated-color-picker';

const customSwatches = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
];

export default function Example3({ onSelectColor, color }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title='Color Picker 3' onPress={() => setShowModal(true)} />

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <View style={styles.container}>
          <ColorPicker
            value={color.value}
            slidersThickness={25}
            thumbsSize={30}
            style={{ width: '75%', justifyContent: 'center' }}
            onComplete={onSelectColor}
          >
            <View style={styles.panelBrightnessContainer}>
              <BrightnessSlider style={[{ height: '100%', width: 30 }, styles.shadow]} vertical reverse />
              <Panel2 style={[{ flex: 1, marginStart: 20 }, styles.shadow]} />
            </View>
            <OpacitySlider style={[{ marginBottom: 40 }, styles.shadow]} ringColor='#5f0f40' />

            <Preview
              style={[styles.previewStyle, styles.shadow]}
              textStyle={{ fontSize: 16 }}
              hideInitialColor
              colorFormat='hsl'
            />

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
  panelBrightnessContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  previewStyle: {
    height: 55,
    borderRadius: 5,
    marginBottom: 30,
  },
  swatchStyle: {
    borderRadius: 5,
    height: 40,
    width: 40,
    marginHorizontal: 10,
    marginBottom: 15,
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
