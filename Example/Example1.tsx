import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, InputWidget } from 'reanimated-color-picker';

const customSwatches = ['#001219', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6'];

interface propsType {
  color: SharedValue<string>;
  onSelectColor: (param: { hex: string }) => void;
}

export default function Example1({ onSelectColor, color }: propsType) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title='Color Picker 1' onPress={() => setShowModal(true)} />

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
          <ColorPicker
            value={color.value}
            sliderThickness={25}
            thumbSize={30}
            style={{ width: '75%', justifyContent: 'space-around' }}
            onComplete={onSelectColor}
          >
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Panel1 style={styles.shadow} />

              <View style={styles.hueOpacityPreviewContainer}>
                <Preview style={[styles.previewStyle, styles.shadow]} hideInitialColor hideText />

                <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                  <HueSlider thumbShape='triangleDown' style={[{ marginBottom: 20 }, styles.shadow]} thumbColor='#00121a' />
                  <OpacitySlider thumbShape='triangleUp' style={styles.shadow} thumbColor='#00121a' />
                </View>
              </View>

              <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={150}>
                <InputWidget
                  containerStyle={{ backgroundColor: '#e8e8e8', marginTop: 20 }}
                  inputStyle={{ marginHorizontal: 5 }}
                />
              </KeyboardAvoidingView>
            </View>

            <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />
          </ColorPicker>

          <Button title='Close' onPress={() => setShowModal(false)} />
        </ScrollView>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingBottom: 10,
  },
  hueOpacityPreviewContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  previewStyle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginEnd: 20,
  },
  swatchesContainer: {
    flex: 0.25,
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 40,
    width: 40,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
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
