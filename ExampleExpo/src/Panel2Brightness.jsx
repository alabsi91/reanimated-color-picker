import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import ColorPicker, { Panel2, OpacitySlider, colorKit, InputWidget, SaturationSlider } from 'reanimated-color-picker';

export default function Example() {
  const [showModal, setShowModal] = useState(false);

  const initialColor = colorKit.randomRgbColor().hex();

  const selectedColor = useSharedValue(initialColor);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const onColorSelect = color => {
    selectedColor.value = color.hex;
  };

  return (
    <>
      <Pressable style={styles.openButton} onPress={() => setShowModal(true)}>
        <Text style={{ color: '#707070', fontWeight: 'bold', textAlign: 'center' }}>Panel2 Brightness</Text>
      </Pressable>

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.pickerContainer}>
              <ColorPicker
                value={selectedColor.value}
                sliderThickness={25}
                thumbSize={20}
                thumbShape='doubleTriangle'
                onChange={onColorSelect}
                adaptSpectrum
              >
                <Panel2 style={styles.panelStyle} verticalChannel='brightness' thumbShape='ring' thumbSize={30} />

                <SaturationSlider style={styles.sliderStyle} thumbColor='#fff' />

                <OpacitySlider style={styles.sliderStyle} thumbColor='#fff' />

                <View style={styles.previewTxtContainer}>
                  <InputWidget
                    inputStyle={{ color: '#fff', paddingVertical: 2, borderColor: '#707070', fontSize: 12, marginLeft: 5 }}
                    iconColor='#707070'
                  />
                </View>
              </ColorPicker>
            </View>
          </KeyboardAvoidingView>

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
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#202124',
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
  panelStyle: {
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,

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
