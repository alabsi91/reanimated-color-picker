import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import CircularHue from './CircularHue';
import HorizontalHsbSliders from './HorizontalHsbSliders';
import HorizontalHslSliders from './HorizontalHslSliders';
import HorizontalRgbSliders from './HorizontalRgbSliders';
import Panel1Example from './Panel1Example';
import Panel2Brightness from './Panel2Brightness';
import Panel2Saturation from './Panel2Saturation';
import WheelBrightness from './Panel3Brightness';
import WheelSaturation from './Panel3Saturation';
import Panel4Example from './Panel4Example';
import Panel5Example from './Panel5Example';
import VerticalHsbSliders from './VerticalHsbSliders';
import VerticalHslSliders from './VerticalHslSliders';
import VerticalRgbSliders from './VerticalRgbSliders';

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

          <HorizontalHsbSliders />
          <VerticalHsbSliders />

          <HorizontalHslSliders />
          <VerticalHslSliders />

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
