import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import CircularHue from './CircularHue';
import HorizontalHsbSliders from './HsbHorizontal';
import VerticalHsbSliders from './HsbVertical';
import HorizontalHslSliders from './HslHorizontal';
import VerticalHslSliders from './HslVertical';
import LuminanceCircular from './LuminanceCircular';
import Panel1Example from './Panel1';
import Panel2Brightness from './Panel2Brightness';
import Panel2HslSaturation from './Panel2HslSaturation';
import Panel2Saturation from './Panel2Saturation';
import WheelBrightness from './Panel3Brightness';
import WheelHSLSaturation from './Panel3HslSaturation';
import WheelSaturation from './Panel3Saturation';
import Panel4Example from './Panel4';
import Panel5Example from './Panel5';
import HorizontalRgbSliders from './RgbHorizontal';
import VerticalRgbSliders from './RgbVertical';

export default function ExamplesList() {
  return (
    <View style={{ flex: 1, paddingTop: 46, paddingBottom: 24, backgroundColor: '#202124' }}>
      <ScrollView contentContainerStyle={styles.container} fadingEdgeLength={50}>
        <Panel1Example />

        <Panel2Saturation />
        <Panel2HslSaturation />
        <Panel2Brightness />

        <WheelSaturation />
        <WheelHSLSaturation />
        <WheelBrightness />

        <Panel4Example />

        <Panel5Example />

        <CircularHue />
        <LuminanceCircular />

        <HorizontalHsbSliders />
        <VerticalHsbSliders />

        <HorizontalHslSliders />
        <VerticalHslSliders />

        <HorizontalRgbSliders />
        <VerticalRgbSliders />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    paddingTop: 16,
    paddingBottom: 54,
    gap: 20,
  },
});
