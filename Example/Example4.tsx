import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View, Text, I18nManager } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import ColorPicker, { Swatches, Preview, OpacitySlider, BrightnessSlider, HueSlider, SaturationSlider } from 'reanimated-color-picker';

const customSwatches = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];
const isRTL = I18nManager.isRTL;

interface porpsType {
  color: SharedValue<string>;
  onSelectColor: (param: { hex: string }) => void;
}

export default function Example4({ onSelectColor, color }: porpsType) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title='Color Picker 4' onPress={() => setShowModal(true)} />

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide' statusBarTranslucent>
        <View style={styles.container}>
          <ColorPicker
            value={color.value}
            sliderThickness={30}
            thumbSize={35}
            thumbShape='pill'
            onComplete={onSelectColor}
            style={{ width: '75%', justifyContent: 'center' }}
          >
            <Preview
              style={[styles.previewStyle, styles.shadow]}
              textStyle={{ fontSize: 18 }}
              colorFormat='rgba'
              hideInitialColor
            />

            <Text style={styles.sliderLabel}>Hue:</Text>
            <HueSlider style={styles.sliderStyle} />

            <Text style={styles.sliderLabel}>Brightness:</Text>
            <BrightnessSlider style={styles.sliderStyle} />

            <Text style={styles.sliderLabel}>Saturation:</Text>
            <SaturationSlider style={styles.sliderStyle} />

            <Text style={styles.sliderLabel}>Opacity:</Text>
            <OpacitySlider style={styles.sliderStyle} />

            <Swatches style={{ marginTop: 30 }} swatchStyle={[styles.swatchStyle, styles.shadow]} colors={customSwatches} />
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
  },
  sliderStyle: {
    borderRadius: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderLabel: {
    fontSize: 20,
    color: '#000',
    alignSelf: isRTL ? 'flex-end' : 'flex-start',
    marginBottom: 10,
  },
  previewStyle: {
    height: 55,
    borderRadius: 50,
    marginBottom: 30,
  },
  swatchStyle: {
    borderRadius: 25,
    height: 45,
    width: 45,
    marginHorizontal: 5,
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
