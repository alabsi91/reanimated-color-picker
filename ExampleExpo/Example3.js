import React, { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPicker, { Swatches, Preview, OpacitySlider, Panel2, BrightnessSlider, PreviewText } from 'reanimated-color-picker';

const customSwatches = ['#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8'];

function FormatsTabs() {
  const [Format, setFormat] = useState('hex');
  return (
    <View style={[{ backgroundColor: '#edf2f4', padding: 10, borderRadius: 5, marginTop: 10 }, styles.shadow]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable onPress={() => setFormat('rgba')}>
          <Text style={[styles.tabText, { borderColor: Format === 'rgba' ? '#666666' : '#fff' }]}>RGB</Text>
        </Pressable>
        <Pressable onPress={() => setFormat('hex')}>
          <Text style={[styles.tabText, { borderColor: Format === 'hex' ? '#666666' : '#fff' }]}>HEX</Text>
        </Pressable>
        <Pressable onPress={() => setFormat('hsla')}>
          <Text style={[styles.tabText, { borderColor: Format === 'hsla' ? '#666666' : '#fff' }]}>HSL</Text>
        </Pressable>
        <Pressable onPress={() => setFormat('hsva')}>
          <Text style={[styles.tabText, { borderColor: Format === 'hsva' ? '#666666' : '#fff' }]}>HSV</Text>
        </Pressable>
        <Pressable onPress={() => setFormat('hwba')}>
          <Text style={[styles.tabText, { borderColor: Format === 'hwba' ? '#666666' : '#fff' }]}>HWB</Text>
        </Pressable>
      </View>
      <PreviewText style={{ marginVertical: 20, fontSize: 18, color: '#293241' }} colorFormat={Format} />
    </View>
  );
}

export default function Example3({ onSelectColor, color }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title='Color Picker 3' onPress={() => setShowModal(true)} />

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <View style={styles.container}>
          <ColorPicker
            value={color.value}
            sliderThickness={30}
            thumbSize={33}
            thumbShape='rect'
            onComplete={onSelectColor}
            style={{ width: '75%', justifyContent: 'center' }}
          >
            <View style={styles.panelBrightnessContainer}>
              <Panel2 style={[{ flex: 1, marginEnd: 20 }, styles.shadow]} />
              <BrightnessSlider style={[{ height: '100%' }, styles.shadow]} vertical reverse />
            </View>

            <View style={styles.panelBrightnessContainer}>
              <OpacitySlider style={[{ flex: 1 }, styles.shadow]} reverse />
              <Preview style={[styles.circlePreview, styles.shadow]} hideInitialColor hideText />
            </View>

            <FormatsTabs />

            <Swatches
              style={{ marginTop: 40, justifyContent: 'space-between' }}
              swatchStyle={styles.swatchStyle}
              colors={customSwatches}
            />
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
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  panelBrightnessContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circlePreview: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginStart: 20,
  },
  swatchStyle: {
    borderRadius: 5,
    height: 40,
    width: 40,
  },
  shadow: {
    shadowColor: '#293241',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
