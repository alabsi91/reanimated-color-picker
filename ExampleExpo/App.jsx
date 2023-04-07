import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Panel1Example from './src/Panel1Example';
import Panel2Saturation from './src/Panel2Saturation';
import Panel2Brightness from './src/Panel2Brightness';
import WheelSaturation from './src/Panel3Saturation';
import WheelBrightness from './src/Panel3Brightness';
import Panel4Example from './src/Panel4Example';
import Panel5Example from './src/Panel5Example';
import CircularHue from './src/CircularHue';
import HorizontalSliders from './src/HorizontalSliders';
import VerticalSliders from './src/VerticalSliders';
import HorizontalRgbSliders from './src/HorizontalRgbSliders';
import VerticalRgbSliders from './src/VerticalRgbSliders';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='transparent' translucent />

      <View style={[styles.container, { paddingTop: 20, backgroundColor: '#202124' }]}>
        <View style={[styles.container, { width: 240, alignSelf: 'center' }]}>
          <Panel1Example />
          <Panel2Saturation />
          <Panel2Brightness />
          <WheelSaturation />
          <WheelBrightness />
          <Panel4Example />
          <Panel5Example />
          <CircularHue />
          <HorizontalSliders />
          <VerticalSliders />
          <HorizontalRgbSliders />
          <VerticalRgbSliders />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
