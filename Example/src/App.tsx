import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Panel1Example from './Panel1Example';
import Panel2Saturation from './Panel2Saturation';
import Panel2Brightness from './Panel2Brightness';
import WheelSaturation from './Panel3Saturation';
import WheelBrightness from './Panel3Brightness';
import Panel4Example from './Panel4Example';
import Panel5Example from './Panel5Example';
import CircularHue from './CircularHue';
import HorizontalSliders from './HorizontalSliders';
import VerticalSliders from './VerticalSliders';
import HorizontalRgbSliders from './HorizontalRgbSliders';
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
