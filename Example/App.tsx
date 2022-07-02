import React, { useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  I18nManager,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
  BrightnessSlider,
  SaturationSlider,
  Panel2,
} from 'reanimated-color-picker';

const customSwatches1 = ['#8a00d4', '#d527b7', '#f782c2', '#f9c46b', '#e3e3e3'];
const customSwatches2 = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];
const customSwatches3 = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

const width = Dimensions.get('window').width;
const isRTL = I18nManager.isRTL;

export default function App() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const color = useSharedValue('#e8e8e8');
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color.value,
  }));

  const onSelectColor = ({ hex }: { hex: string }) => {
    console.log('hex :', hex);
    color.value = hex;
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Button title="Color Picker 1" onPress={() => setShowModal1(true)} />
      <Button title="Color Picker 2" onPress={() => setShowModal2(true)} />
      <Button title="Color Picker 3" onPress={() => setShowModal3(true)} />

      <Modal
        onRequestClose={() => setShowModal1(false)}
        visible={showModal1}
        animationType="slide">
        <View style={styles.modalcontainer}>
          <ColorPicker
            value={color.value}
            tracksHeight={30}
            thumbsSize={45}
            width={width * 0.75}
            onComplete={onSelectColor}>
            <Preview style={styles.previewStyle} textStyle={{ fontSize: 18 }} />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches
              swatchStyle={styles.swatchStyle}
              colors={customSwatches1}
            />
          </ColorPicker>
        </View>
      </Modal>

      <Modal
        onRequestClose={() => setShowModal2(false)}
        visible={showModal2}
        animationType="slide">
        <View style={styles.modalcontainer}>
          <ColorPicker
            value={color.value}
            tracksHeight={30}
            thumbsSize={40}
            width={width * 0.75}
            onComplete={onSelectColor}>
            <Preview
              style={{
                height: 80,
                marginBottom: -20,
                borderRadius: 0,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              textStyle={{ fontSize: 16, height: 'auto', paddingTop: 40 }}
              colorFormat="hsl"
              hideInitialColor
            />
            <Panel2 style={{ borderRadius: 0 }} />
            <BrightnessSlider style={{ borderRadius: 0 }} />
            <OpacitySlider style={{ borderRadius: 0 }} />
            <Swatches
              swatchStyle={[styles.swatchStyle, { borderRadius: 0 }]}
              colors={customSwatches2}
            />
          </ColorPicker>
        </View>
      </Modal>

      <Modal
        onRequestClose={() => setShowModal3(false)}
        visible={showModal3}
        animationType="slide">
        <View style={styles.modalcontainer}>
          <ColorPicker
            value={color.value}
            onComplete={onSelectColor}
            style={{ justifyContent: 'center' }}
            width={width * 0.75}
            tracksHeight={30}
            thumbsSize={45}>
            <Preview
              style={[
                styles.previewStyle,
                { borderRadius: 50, marginBottom: 20 },
              ]}
              textStyle={{ fontSize: 18 }}
              colorFormat="rgba"
              hideInitialColor
            />

            <Text style={styles.sliderLabel}>Hue:</Text>
            <HueSlider
              ringColor="gray"
              style={{ borderRadius: 20, marginBottom: 25 }}
            />

            <Text style={styles.sliderLabel}>Brightness:</Text>
            <BrightnessSlider
              ringColor="gray"
              style={{ borderRadius: 20, marginBottom: 25 }}
            />

            <Text style={styles.sliderLabel}>Saturation:</Text>
            <SaturationSlider
              ringColor="gray"
              style={{ borderRadius: 20, marginBottom: 25 }}
            />

            <Text style={styles.sliderLabel}>Opacity:</Text>
            <OpacitySlider
              ringColor="gray"
              style={{ borderRadius: 20, marginBottom: 25 }}
            />

            <Swatches
              style={{ marginTop: 30 }}
              swatchStyle={[
                styles.swatchStyle,
                { borderRadius: 20, width: 40, height: 40 },
              ]}
              colors={customSwatches3}
            />
          </ColorPicker>
        </View>
      </Modal>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 40,
  },
  modalcontainer: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingBottom: 0,
  },
  previewStyle: {
    height: 50,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  swatchStyle: {
    borderRadius: 8,
    height: 35,
    width: 35,
    margin: 2,
  },
  sliderLabel: {
    fontSize: 20,
    color: '#000',
    alignSelf: isRTL ? 'flex-end' : 'flex-start',
    marginBottom: 10,
  },
});
