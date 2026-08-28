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
import WithReanimatedScrollView from './WithReanimatedScrollView';
import WithRnghScrollView from './WithRnghScrollView';
import BaseContainer from './components/BaseContainer';

export default function ExamplesList() {
  return (
    <View style={{ flex: 1, paddingTop: 46, paddingBottom: 24, backgroundColor: '#202124' }}>
      <ScrollView contentContainerStyle={styles.container} fadingEdgeLength={20}>
        <BaseContainer name='Panel1'>
          <Panel1Example />
        </BaseContainer>

        <BaseContainer name='Panel2 Saturation'>
          <Panel2Saturation />
        </BaseContainer>
        <BaseContainer name='Panel2 HSL Saturation'>
          <Panel2HslSaturation />
        </BaseContainer>
        <BaseContainer name='Panel2 Brightness'>
          <Panel2Brightness />
        </BaseContainer>

        <BaseContainer name='Panel3 Saturation'>
          <WheelSaturation />
        </BaseContainer>
        <BaseContainer name='Panel3 HSL Saturation'>
          <WheelHSLSaturation />
        </BaseContainer>
        <BaseContainer name='Panel3 Brightness'>
          <WheelBrightness />
        </BaseContainer>

        <BaseContainer name='Panel4'>
          <Panel4Example />
        </BaseContainer>

        <BaseContainer name='Panel5 Grid'>
          <Panel5Example />
        </BaseContainer>

        <BaseContainer name='Circular Hue'>
          <CircularHue />
        </BaseContainer>
        <BaseContainer name='Luminance Circular'>
          <LuminanceCircular />
        </BaseContainer>

        <BaseContainer name='HSB Horizontal'>
          <HorizontalHsbSliders />
        </BaseContainer>
        <BaseContainer name='HSB Vertical'>
          <VerticalHsbSliders />
        </BaseContainer>

        <BaseContainer name='HSL Horizontal'>
          <HorizontalHslSliders />
        </BaseContainer>
        <BaseContainer name='HSL Vertical'>
          <VerticalHslSliders />
        </BaseContainer>

        <BaseContainer name='RGB Horizontal'>
          <HorizontalRgbSliders />
        </BaseContainer>
        <BaseContainer name='RGB Vertical'>
          <VerticalRgbSliders />
        </BaseContainer>

        <BaseContainer name='With RNGH ScrollView'>
          <WithRnghScrollView />
        </BaseContainer>
        <BaseContainer name='With Reanimated ScrollView'>
          <WithReanimatedScrollView />
        </BaseContainer>
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
