# All Examples

The full source of every example app, shared by the bare and Expo workflows.

## Shared Components

Every example below imports these from `./components`.

### `BaseContainer`

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, type SharedValue } from 'react-native-reanimated';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

type RegisterBackgroundColor = (color: SharedValue<string>) => void;

const RegisterBackgroundColorContext = createContext<RegisterBackgroundColor | null>(null);

/**
 * The color the example follows, tinting the modal background while the example runs inside a `BaseContainer`.
 *
 * Rendered on its own, outside a container, it is an ordinary shared value and nothing paints with it.
 */
export function useContainerBackgroundColor(initialColor: string): SharedValue<string> {
  const color = useSharedValue(initialColor);
  const registerBackgroundColor = useContext(RegisterBackgroundColorContext);

  useEffect(() => registerBackgroundColor?.(color), [registerBackgroundColor, color]);

  return color;
}

type BaseContainerProps = {
  name: string;
  children: React.ReactNode;
};

export default function BaseContainer({ name, children }: BaseContainerProps) {
  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<SharedValue<string> | null>(null);

  const backgroundColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: backgroundColor ? backgroundColor.value : '#aaa' };
  });

  return (
    <>
      <Pressable style={styles.btn} onPress={() => setShowModal(true)}>
        <Text style={styles.btnTxt}>{name} </Text>
      </Pressable>

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Animated.View style={[styles.wrapper, backgroundColorStyle]}>
            <SafeAreaPaddingView>
              <View style={styles.container}>
                <RegisterBackgroundColorContext.Provider value={setBackgroundColor}>
                  {children}
                </RegisterBackgroundColorContext.Provider>
              </View>
              <View style={styles.closeBtnContainer}>
                <Pressable style={styles.btn} onPress={() => setShowModal(false)}>
                  <Text style={styles.btnTxt}>Close</Text>
                </Pressable>
              </View>
            </SafeAreaPaddingView>
          </Animated.View>
        </SafeAreaProvider>
      </Modal>
    </>
  );
}

/** Pads its children by the safe area insets, known from the first render. */
function SafeAreaPaddingView({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  const paddingStyle = {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  };

  return <View style={[styles.wrapper, paddingStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#707070',
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 300,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  closeBtnContainer: {
    marginVertical: 24,
    marginHorizontal: 16,
    alignItems: 'center',
  },
});
```

### `Divider`

```tsx
import React from 'react';
import { View } from 'react-native';

export default function Divider() {
  return <View style={{ height: 1, backgroundColor: '#bebdbe' }} />;
}
```

### `colorPickerStyle`

```ts
import { StyleSheet } from 'react-native';

const border = {
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: 'rgba(0, 0, 0, 0.15)',
};

export const colorPickerStyle = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'gray',
  },
  picker: {
    gap: 20,
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#eae5f1',
    padding: 20,
    borderRadius: 20,
    ...border,
  },
  panelStyle: {
    borderRadius: 16,
  },
  sliderStyle: {
    borderRadius: 20,
  },
  sliderVerticalStyle: {
    borderRadius: 20,
    height: 300,
  },
  sliderBorderContainer: {
    borderRadius: 20 + StyleSheet.hairlineWidth,
    ...border,
  },
  panelBorderContainer: {
    borderRadius: 16 + StyleSheet.hairlineWidth,
    ...border,
  },
  gridPanelBorderContainer: {
    borderRadius: 4 + StyleSheet.hairlineWidth,
    ...border,
  },
  wheelPanelBorderContainer: {
    borderRadius: 2000,
    ...border,
  },
  sliderTitle: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 4,
    fontFamily: 'Quicksand',
  },
  previewStyle: {
    height: 40,
    borderRadius: 14,
  },
  previewTxt: {
    color: '#707070',
    fontFamily: 'Quicksand',
  },
  inputStyle: {
    color: '#707070',
    paddingVertical: 2,
    borderColor: '#707070',
    fontSize: 12,
    marginLeft: 5,
  },
  swatchesContainer: {
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
```

## Panel1

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, HueSlider, OpacitySlider, Panel1, PreviewText, Swatches } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbSize={24}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        boundedThumb
      >
        <View style={colorPickerStyle.panelBorderContainer}>
          <Panel1 style={colorPickerStyle.panelStyle} />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <HueSlider style={colorPickerStyle.sliderStyle} />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
        </View>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hwba' />
      </ColorPicker>
    </View>
  );
}
```

## Panel2 — Saturation

```tsx
import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { BrightnessSlider, InputWidget, OpacitySlider, Panel2, colorKit } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial random color
const initialColor = colorKit.randomRgbColor().hex();

export default function Example() {
  const [resultColor, setResultColor] = useState(initialColor);

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <KeyboardAvoidingView behavior='position'>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbSize={30}
          thumbShape='rect'
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
        >
          <View style={colorPickerStyle.panelBorderContainer}>
            <Panel2 style={colorPickerStyle.panelStyle} thumbShape='ring' reverseVerticalChannel reverseHue />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <BrightnessSlider style={colorPickerStyle.sliderStyle} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
          </View>
          <Divider />
          <InputWidget inputStyle={colorPickerStyle.inputStyle} iconColor='#707070' />
        </ColorPicker>
      </View>
    </KeyboardAvoidingView>
  );
}
```

## Panel2 — Brightness

```tsx
import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, InputWidget, OpacitySlider, Panel2, SaturationSlider } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial random color
const initialColor = colorKit.randomRgbColor().hex();

export default function Example() {
  const [resultColor, setResultColor] = useState(initialColor);

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <KeyboardAvoidingView behavior='position'>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={26}
          thumbSize={13}
          thumbShape='doubleTriangle'
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
          adaptSpectrum
        >
          <View style={colorPickerStyle.panelBorderContainer}>
            <Panel2 style={colorPickerStyle.panelStyle} verticalChannel='brightness' thumbShape='ring' thumbSize={30} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <SaturationSlider style={colorPickerStyle.sliderStyle} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
          </View>
          <Divider />
          <InputWidget inputStyle={colorPickerStyle.inputStyle} iconColor='#707070' />
        </ColorPicker>
      </View>
    </KeyboardAvoidingView>
  );
}
```

## Panel2 — HSL Saturation

```tsx
import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { InputWidget, LuminanceSlider, OpacitySlider, Panel2, colorKit } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial random color
const initialColor = colorKit.randomRgbColor().hex();

export default function Example() {
  const [resultColor, setResultColor] = useState(initialColor);

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <KeyboardAvoidingView behavior='position'>
      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbSize={30}
          thumbShape='rect'
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
          adaptSpectrum
        >
          <View style={colorPickerStyle.panelBorderContainer}>
            <Panel2 style={colorPickerStyle.panelStyle} thumbShape='ring' verticalChannel='hsl-saturation' />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <LuminanceSlider style={colorPickerStyle.sliderStyle} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
          </View>
          <Divider />
          <InputWidget inputStyle={colorPickerStyle.inputStyle} iconColor='#707070' />
        </ColorPicker>
      </View>
    </KeyboardAvoidingView>
  );
}
```

## Panel3 — Saturation

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BrightnessSlider,
  ExtraThumb,
  OpacitySlider,
  Panel3,
  Preview,
  Swatches,
  colorKit,
} from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbSize={27}
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
      >
        <Preview style={colorPickerStyle.previewStyle} textStyle={colorPickerStyle.previewTxt} />
        <Divider />
        <View style={colorPickerStyle.wheelPanelBorderContainer}>
          <Panel3 style={colorPickerStyle.panelStyle} renderCenterLine adaptSpectrum>
            <ExtraThumb thumbShape='circle' hueTransform={120} />
            <ExtraThumb thumbShape='circle' hueTransform={140} />
            <ExtraThumb thumbShape='circle' hueTransform={160} />
            <ExtraThumb thumbShape='circle' hueTransform={180} />
            <ExtraThumb thumbShape='circle' hueTransform={200} />
            <ExtraThumb thumbShape='circle' hueTransform={220} />
            <ExtraThumb thumbShape='circle' hueTransform={240} />
          </Panel3>
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <BrightnessSlider style={colorPickerStyle.sliderStyle} />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
        </View>
        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
      </ColorPicker>
    </View>
  );
}
```

## Panel3 — Brightness

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, OpacitySlider, Panel3, Preview, SaturationSlider, Swatches } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbShape='circle'
        thumbSize={25}
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        adaptSpectrum
      >
        <Preview style={colorPickerStyle.previewStyle} textStyle={colorPickerStyle.previewTxt} />
        <Divider />
        <View style={colorPickerStyle.wheelPanelBorderContainer}>
          <Panel3 style={colorPickerStyle.panelStyle} centerChannel='brightness' />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <SaturationSlider style={colorPickerStyle.sliderStyle} />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
        </View>
        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
      </ColorPicker>
    </View>
  );
}
```

## Panel3 — HSL Saturation

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { LuminanceSlider, OpacitySlider, Panel3, Preview, Swatches, colorKit } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbShape='circle'
        thumbSize={25}
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        adaptSpectrum
      >
        <Preview style={colorPickerStyle.previewStyle} textStyle={colorPickerStyle.previewTxt} />
        <Divider />
        <View style={colorPickerStyle.wheelPanelBorderContainer}>
          <Panel3 style={colorPickerStyle.panelStyle} centerChannel='hsl-saturation' />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <LuminanceSlider style={colorPickerStyle.sliderStyle} />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
        </View>
        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
      </ColorPicker>
    </View>
  );
}
```

## Panel4

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, OpacitySlider, Panel4, PreviewText } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial random color, within the range that `Panel4` can display
const initialColor = colorKit.randomHsvColor({ s: [100, 100], v: [100, 100] }).hex();

export default function Example() {
  const [resultColor, setResultColor] = useState(initialColor);

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbSize={24}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
      >
        <View style={colorPickerStyle.panelBorderContainer}>
          <Panel4 style={colorPickerStyle.panelStyle} thumbShape='ring' />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
        </View>
        <Divider />
        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hwba' />
      </ColorPicker>
    </View>
  );
}
```

## Panel5

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { OpacitySlider, Panel5, PreviewText } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// initial color; one of the grid colors
const initialColor = '#ad3e00';

export default function Example() {
  const [resultColor, setResultColor] = useState(initialColor);

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbSize={24}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
      >
        <View style={colorPickerStyle.gridPanelBorderContainer}>
          <Panel5 style={[colorPickerStyle.panelStyle, { borderRadius: 4 }]} />
        </View>
        <View style={colorPickerStyle.sliderBorderContainer}>
          <OpacitySlider style={colorPickerStyle.sliderStyle} adaptSpectrum />
        </View>
        <Divider />
        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsla' />
      </ColorPicker>
    </View>
  );
}
```

## Circular Hue

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { colorKit, HueCircular, Panel1, PreviewText, Swatches } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={20}
        thumbSize={24}
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        boundedThumb
      >
        <HueCircular containerStyle={{ justifyContent: 'center' }} thumbShape='pill'>
          <Panel1 style={{ borderRadius: 16, width: '70%', height: '70%', alignSelf: 'center' }} />
        </HueCircular>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsl' />
      </ColorPicker>
    </View>
  );
}
```

## Circular Luminance

```tsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { LuminanceCircular, Panel3, PreviewText, Swatches, colorKit } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={24}
        thumbSize={24}
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        adaptSpectrum
        boundedThumb
      >
        <LuminanceCircular
          containerStyle={styles.hueContainer}
          thumbShape='circle'
          thumbInnerStyle={styles.thumbInner}
          thumbScaleAnimationValue={1}
        >
          <Panel3 style={styles.panelStyle} centerChannel='hsl-saturation' />
        </LuminanceCircular>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsl' />
      </ColorPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  hueContainer: {
    justifyContent: 'center',
  },
  panelStyle: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  thumbInner: {
    borderWidth: 4,
  },
});
```

## HSB — Horizontal

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BrightnessSlider,
  colorKit,
  HueSlider,
  OpacitySlider,
  PreviewText,
  SaturationSlider,
  Swatches,
} from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbSize={24}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        adaptSpectrum
        boundedThumb
      >
        <View>
          <Text style={colorPickerStyle.sliderTitle}>Hue</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <HueSlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Saturation</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <SaturationSlider style={colorPickerStyle.sliderStyle} reverse />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Brightness</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <BrightnessSlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Opacity</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsva' />
      </ColorPicker>
    </View>
  );
}
```

## HSB — Vertical

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BrightnessSlider,
  colorKit,
  HueSlider,
  OpacitySlider,
  PreviewText,
  SaturationSlider,
  Swatches,
} from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={30}
        thumbSize={30}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        adaptSpectrum
        boundedThumb
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>H</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <HueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>S</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <SaturationSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>B</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <BrightnessSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>A</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>
        </View>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsva' />
      </ColorPicker>
    </View>
  );
}
```

## HSL — Horizontal

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  HSLSaturationSlider,
  HueSlider,
  LuminanceSlider,
  OpacitySlider,
  PreviewText,
  Swatches,
  colorKit,
} from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbSize={24}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        adaptSpectrum
        boundedThumb
      >
        <View>
          <Text style={colorPickerStyle.sliderTitle}>Hue</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <HueSlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Saturation</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <HSLSaturationSlider style={colorPickerStyle.sliderStyle} reverse />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Luminance</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <LuminanceSlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Opacity</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsla' />
      </ColorPicker>
    </View>
  );
}
```

## HSL — Vertical

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  HSLSaturationSlider,
  HueSlider,
  LuminanceSlider,
  OpacitySlider,
  PreviewText,
  Swatches,
  colorKit,
} from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={30}
        thumbSize={30}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        style={colorPickerStyle.picker}
        adaptSpectrum
        boundedThumb
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>H</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <HueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>S</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <HSLSaturationSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>L</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <LuminanceSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>A</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>
        </View>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='hsla' />
      </ColorPicker>
    </View>
  );
}
```

## RGB — Horizontal

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BlueSlider,
  colorKit,
  GreenSlider,
  OpacitySlider,
  PreviewText,
  RedSlider,
  Swatches,
} from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={25}
        thumbSize={24}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        thumbAnimationDuration={100}
        style={colorPickerStyle.picker}
        adaptSpectrum
        boundedThumb
      >
        <View>
          <Text style={colorPickerStyle.sliderTitle}>Red</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <RedSlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Green</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <GreenSlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Blue</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <BlueSlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Opacity</Text>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider style={colorPickerStyle.sliderStyle} />
          </View>
        </View>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='rgba' />
      </ColorPicker>
    </View>
  );
}
```

## RGB — Vertical

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, {
  BlueSlider,
  colorKit,
  GreenSlider,
  OpacitySlider,
  PreviewText,
  RedSlider,
  Swatches,
} from 'reanimated-color-picker';
import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [resultColor, setResultColor] = useState(customSwatches[0]);

  const currentColor = useContainerBackgroundColor(customSwatches[0]);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <View style={colorPickerStyle.pickerContainer}>
      <ColorPicker
        value={resultColor}
        sliderThickness={30}
        thumbSize={30}
        thumbShape='circle'
        onChange={onColorChange}
        onCompleteJS={onColorPick}
        thumbAnimationDuration={100}
        style={colorPickerStyle.picker}
        adaptSpectrum
        boundedThumb
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>R</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <RedSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>G</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <GreenSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>B</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <BlueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>A</Text>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>
          </View>
        </View>

        <Divider />
        <Swatches style={colorPickerStyle.swatchesContainer} swatchStyle={colorPickerStyle.swatchStyle} colors={customSwatches} />
        <Divider />

        <PreviewText style={colorPickerStyle.previewTxt} colorFormat='rgba' />
      </ColorPicker>
    </View>
  );
}
```

## `ColorInput` With a Modal

```tsx
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { ColorInput, colorKit, HueSlider, OpacitySlider, Panel1, Swatches } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

const initialColor = '#3a7bd5';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  return (
    <ColorPicker
      value={initialColor}
      sliderThickness={25}
      thumbSize={24}
      thumbShape='circle'
      onChange={onColorChange}
      boundedThumb
    >
      <ColorInput onSwatchPress={() => setIsModalOpen(true)} style={styles.colorInput} inputStyle={styles.colorInputText} />

      <Modal
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        animationType='fade'
        transparent
        statusBarTranslucent
        navigationBarTranslucent
      >
        {/* The modal renders in its own native window and needs its own gesture root view. */}
        <GestureHandlerRootView style={styles.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsModalOpen(false)} aria-label='Close color picker' />

          <View style={[colorPickerStyle.pickerContainer, colorPickerStyle.picker]}>
            <View style={colorPickerStyle.panelBorderContainer}>
              <Panel1 style={colorPickerStyle.panelStyle} />
            </View>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <HueSlider style={colorPickerStyle.sliderStyle} />
            </View>
            <View style={colorPickerStyle.sliderBorderContainer}>
              <OpacitySlider style={colorPickerStyle.sliderStyle} />
            </View>

            <Divider />
            <Swatches
              style={colorPickerStyle.swatchesContainer}
              swatchStyle={colorPickerStyle.swatchStyle}
              colors={customSwatches}
            />
          </View>
        </GestureHandlerRootView>
      </Modal>
    </ColorPicker>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    // The modal grows to the full window after its first frame. The window height keeps the picker from moving.
    height: initialWindowMetrics?.frame.height ?? '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(32, 33, 36, 0.9)',
  },
  colorInput: {
    alignSelf: 'center',
    width: 300,
  },
  colorInputText: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#707070',
    fontFamily: 'Quicksand',
  },
});
```

## `ColorInput` With a Bottom Sheet

```tsx
import { ModalBottomSheet } from '@swmansion/react-native-bottom-sheet';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { ColorInput, colorKit, HueSlider, OpacitySlider, Panel1, Swatches } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import Divider from './components/Divider';
import { colorPickerStyle } from './components/colorPickerStyle';

const initialColor = '#3a7bd5';

// generate 6 random colors for swatches
const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

export default function Example() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPickerInUse, setIsPickerInUse] = useState(false);

  //? NOTE: Each color picker component needs its own gesture.
  const [panelGesture, hueGesture, opacityGesture] = useMemo(
    () =>
      Array.from({ length: 3 }, () =>
        Gesture.Pan()
          .runOnJS(true)
          .onBegin(() => setIsPickerInUse(true))
          .onFinalize(() => setIsPickerInUse(false)),
      ),
    [],
  );

  const currentColor = useContainerBackgroundColor(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  return (
    <ColorPicker
      value={initialColor}
      sliderThickness={25}
      thumbSize={24}
      thumbShape='circle'
      onChange={onColorChange}
      boundedThumb
    >
      <ColorInput onSwatchPress={() => setIsSheetOpen(true)} style={styles.colorInput} inputStyle={styles.colorInputText} />

      <ModalBottomSheet
        // Stops the sheet drag while the picker is in use
        detents={[{ value: 0, programmatic: isPickerInUse }, 'content']}
        index={isSheetOpen ? 1 : 0}
        onIndexChange={index => setIsSheetOpen(index > 0)}
        windowOverlay
        lazy
        maxWidth={340}
        scrimColor='rgba(0, 0, 0, 0.4)'
        surface={<View style={[StyleSheet.absoluteFill, styles.sheetSurface]} />}
        surfaceStyle={styles.sheetSurfaceShape}
      >
        {/* The sheet renders in its own native window and needs its own gesture root view. */}
        <GestureHandlerRootView style={styles.sheetContent}>
          <View style={styles.sheetHandle} />

          <View style={colorPickerStyle.panelBorderContainer}>
            <Panel1 gestures={[panelGesture]} style={colorPickerStyle.panelStyle} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <HueSlider gestures={[hueGesture]} style={colorPickerStyle.sliderStyle} />
          </View>
          <View style={colorPickerStyle.sliderBorderContainer}>
            <OpacitySlider gestures={[opacityGesture]} style={colorPickerStyle.sliderStyle} />
          </View>

          <Divider />
          <Swatches
            style={colorPickerStyle.swatchesContainer}
            swatchStyle={colorPickerStyle.swatchStyle}
            colors={customSwatches}
          />
        </GestureHandlerRootView>
      </ModalBottomSheet>
    </ColorPicker>
  );
}

const styles = StyleSheet.create({
  sheetSurface: {
    backgroundColor: colorPickerStyle.pickerContainer.backgroundColor,
  },
  sheetSurfaceShape: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20 + (initialWindowMetrics?.insets.bottom ?? 0),
    gap: 20,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#bbb',
  },
  colorInput: {
    alignSelf: 'center',
    width: 300,
  },
  colorInputText: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#707070',
    fontFamily: 'Quicksand',
  },
});
```

## Inside a Gesture Handler `ScrollView`

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { HSLSaturationSlider, HueSlider, LuminanceSlider, OpacitySlider } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import { colorPickerStyle } from './components/colorPickerStyle';

/*
 * Using react-native-gesture-handler ScrollView to prevent scrolling while using the color picker
 */
export default function Example() {
  const [resultColor, setResultColor] = useState('#f00');

  const currentColor = useContainerBackgroundColor('#f00');

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: '150%', justifyContent: 'center' }}>
        <Text style={colorPickerStyle.title}>Color Picker in a RNGH ScrollView</Text>

        <View style={colorPickerStyle.pickerContainer}>
          <ColorPicker
            value={resultColor}
            sliderThickness={30}
            thumbSize={30}
            onChange={onColorChange}
            onCompleteJS={onColorPick}
            style={colorPickerStyle.picker}
            boundedThumb
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>H</Text>
                <View style={colorPickerStyle.sliderBorderContainer}>
                  <HueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>S</Text>
                <View style={colorPickerStyle.sliderBorderContainer}>
                  <HSLSaturationSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>L</Text>
                <View style={colorPickerStyle.sliderBorderContainer}>
                  <LuminanceSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>A</Text>
                <View style={colorPickerStyle.sliderBorderContainer}>
                  <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
                </View>
              </View>
            </View>
          </ColorPicker>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
```

## Inside a Reanimated `ScrollView`

```tsx
import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated';

import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { HSLSaturationSlider, HueSlider, LuminanceSlider, OpacitySlider } from 'reanimated-color-picker';

import { useContainerBackgroundColor } from './components/BaseContainer';
import { colorPickerStyle } from './components/colorPickerStyle';

/*
 * Using react-native-reanimated ScrollView and cancelling the scroll while using the color picker
 */
export default function Example() {
  const [resultColor, setResultColor] = useState('#f00');

  const currentColor = useContainerBackgroundColor('#f00');

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  const isScrollEnabled = useSharedValue<boolean | undefined>(true);

  //? NOTE:
  // - You cannot use the same gesture for multiple color picker components.
  // - Either pass a new gesture or deep clone the gesture constructor.
  const [hueGesture, saturationGesture, lumGesture, opacityGesture] = Array.from({ length: 4 }, () =>
    Gesture.Pan()
      .onBegin(() => (isScrollEnabled.value = false))
      .onFinalize(() => (isScrollEnabled.value = true)),
  );

  const animatedProps = useAnimatedProps(
    () => ({ scrollEnabled: isScrollEnabled.value }),
    Platform.OS === 'web' ? [isScrollEnabled] : undefined,
  );

  return (
    <Animated.ScrollView animatedProps={animatedProps} contentContainerStyle={{ height: '150%', justifyContent: 'center' }}>
      <Text style={colorPickerStyle.title}>Color Picker in a Animated.ScrollView</Text>

      <View style={colorPickerStyle.pickerContainer}>
        <ColorPicker
          value={resultColor}
          sliderThickness={30}
          thumbSize={30}
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={colorPickerStyle.picker}
          boundedThumb
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>H</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <HueSlider gestures={[hueGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>S</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <HSLSaturationSlider
                  gestures={[saturationGesture]}
                  style={colorPickerStyle.sliderVerticalStyle}
                  vertical
                  reverse
                />
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>L</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <LuminanceSlider gestures={[lumGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>A</Text>
              <View style={colorPickerStyle.sliderBorderContainer}>
                <OpacitySlider gestures={[opacityGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>
            </View>
          </View>
        </ColorPicker>
      </View>
    </Animated.ScrollView>
  );
}
```

## Examples List

```tsx
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import CircularHue from './CircularHue';
import ColorInputWithBottomSheet from './ColorInputWithBottomSheet';
import ColorInputWithModal from './ColorInputWithModal';
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

// The bottom sheet supports only the New Architecture and the web.
const isBottomSheetSupported = Platform.OS === 'web' || 'nativeFabricUIManager' in globalThis;

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

        <BaseContainer name='ColorInput With Modal'>
          <ColorInputWithModal />
        </BaseContainer>
        {isBottomSheetSupported && (
          <BaseContainer name='ColorInput With Bottom Sheet'>
            <ColorInputWithBottomSheet />
          </BaseContainer>
        )}

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
```
