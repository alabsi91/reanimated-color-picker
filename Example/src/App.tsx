import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import CircularHue from './CircularHue';
import HorizontalHsbSliders from './HsbHorizontal';
import VerticalHsbSliders from './HsbVertical';
import HorizontalHslSliders from './HslHorizontal';
import VerticalHslSliders from './HslVertical';
import Panel1Example from './Panel1';
import Panel2Brightness from './Panel2Brightness';
import Panel2Saturation from './Panel2Saturation';
import WheelBrightness from './Panel3Brightness';
import WheelHSLSaturation from './Panel3HslSaturation';
import WheelSaturation from './Panel3Saturation';
import Panel4Example from './Panel4';
import Panel5Example from './Panel5';
import HorizontalRgbSliders from './RgbHorizontal';
import VerticalRgbSliders from './RgbVertical';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='transparent' translucent />

      <View style={[styles.container, { paddingTop: 20, backgroundColor: '#202124' }]}>
        <ScrollView contentContainerStyle={[styles.container, { width: 240, alignSelf: 'center' }]}>
          <Panel1Example />

          <Panel2Saturation />
          <Panel2Brightness />

          <WheelSaturation />
          <WheelHSLSaturation />
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
        </ScrollView>
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
