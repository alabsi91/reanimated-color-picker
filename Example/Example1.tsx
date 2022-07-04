import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

const customSwatches = [
  '#001219',
  '#005f73',
  '#0a9396',
  '#94d2bd',
  '#e9d8a6',
  '#ee9b00',
  '#ca6702',
  '#bb3e03',
  '#ae2012',
  '#9b2226',
];

interface porpsType {
  color: SharedValue<string>;
  onSelectColor: (param: { hex: string }) => void;
}

export default function Example1({ onSelectColor, color }: porpsType) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title='Color Picker 1' onPress={() => setShowModal(true)} />

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <View style={styles.container}>
          <ColorPicker
            value={color.value}
            slidersThickness={25}
            thumbsSize={30}
            style={{ width: '75%', justifyContent: 'center' }}
            onComplete={onSelectColor}
          >
            <Panel1 style={[{ height: 250, marginBottom: 30 }, styles.shadow]} />

            <View style={styles.hueOpacityPreviewContainer}>
              <Preview style={[styles.previewStyle, styles.shadow]} hideInitialColor hideText />

              <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <HueSlider style={[{ marginBottom: 20 }, styles.shadow]} ringColor='gray' />
                <OpacitySlider style={styles.shadow} ringColor='gray' />
              </View>
            </View>

            <Swatches swatchStyle={styles.swatchStyle} colors={customSwatches} />
          </ColorPicker>
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
  },
  hueOpacityPreviewContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  previewStyle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginEnd: 20,
  },
  swatchStyle: {
    borderRadius: 20,
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
