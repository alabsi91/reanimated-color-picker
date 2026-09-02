# All Examples

The full source of every example app, shared by the bare and Expo workflows.

## Shared Components

Every example below imports these from `./components`.

### `BaseContainer`

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, type SharedValue } from 'react-native-reanimated';

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
        <Animated.View style={[styles.wrapper, backgroundColorStyle]}>
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
        </Animated.View>
      </Modal>
    </>
  );
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

    ...Platform.select({
      web: { boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 2px' },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      },
    }),
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
import { Platform, StyleSheet } from "react-native";

const shadow = Platform.select({
  web: { boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 2px" },
  default: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export const colorPickerStyle = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Quicksand",
    fontWeight: "bold",
    marginVertical: 20,
    color: "gray",
  },
  picker: {
    gap: 20,
  },
  pickerContainer: {
    alignSelf: "center",
    width: 300,
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 20,
    ...shadow,
  },
  panelStyle: {
    borderRadius: 16,
    ...shadow,
  },
  sliderStyle: {
    borderRadius: 20,
    ...shadow,
  },
  sliderVerticalStyle: {
    borderRadius: 20,
    height: 300,
    ...shadow,
  },
  sliderTitle: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 4,
    fontFamily: "Quicksand",
  },
  previewStyle: {
    height: 40,
    borderRadius: 14,
  },
  previewTxt: {
    color: "#707070",
    fontFamily: "Quicksand",
  },
  inputStyle: {
    color: "#707070",
    paddingVertical: 2,
    borderColor: "#707070",
    fontSize: 12,
    marginLeft: 5,
  },
  swatchesContainer: {
    alignItems: "center",
    flexWrap: "nowrap",
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
        <Panel1 style={colorPickerStyle.panelStyle} />
        <HueSlider style={colorPickerStyle.sliderStyle} />
        <OpacitySlider style={colorPickerStyle.sliderStyle} />

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
          <Panel2 style={colorPickerStyle.panelStyle} thumbShape='ring' reverseVerticalChannel reverseHue />
          <BrightnessSlider style={colorPickerStyle.sliderStyle} />
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
          <Panel2 style={colorPickerStyle.panelStyle} verticalChannel='brightness' thumbShape='ring' thumbSize={30} />
          <SaturationSlider style={colorPickerStyle.sliderStyle} />
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
          <Panel2 style={colorPickerStyle.panelStyle} thumbShape='ring' verticalChannel='hsl-saturation' />
          <LuminanceSlider style={colorPickerStyle.sliderStyle} />
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
        <Panel3 style={colorPickerStyle.panelStyle} renderCenterLine adaptSpectrum>
          <ExtraThumb thumbShape='circle' hueTransform={120} />
          <ExtraThumb thumbShape='circle' hueTransform={140} />
          <ExtraThumb thumbShape='circle' hueTransform={160} />
          <ExtraThumb thumbShape='circle' hueTransform={180} />
          <ExtraThumb thumbShape='circle' hueTransform={200} />
          <ExtraThumb thumbShape='circle' hueTransform={220} />
          <ExtraThumb thumbShape='circle' hueTransform={240} />
        </Panel3>
        <BrightnessSlider style={colorPickerStyle.sliderStyle} />
        <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
        <Panel3 style={colorPickerStyle.panelStyle} centerChannel='brightness' />
        <SaturationSlider style={colorPickerStyle.sliderStyle} />
        <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
        <Panel3 style={colorPickerStyle.panelStyle} centerChannel='hsl-saturation' />
        <LuminanceSlider style={colorPickerStyle.sliderStyle} />
        <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
        <Panel4 style={colorPickerStyle.panelStyle} thumbShape='ring' />
        <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
        <Panel5 style={[colorPickerStyle.panelStyle, { borderRadius: 4 }]} />
        <OpacitySlider style={colorPickerStyle.sliderStyle} adaptSpectrum />
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
          <HueSlider style={colorPickerStyle.sliderStyle} />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Saturation</Text>
          <SaturationSlider style={colorPickerStyle.sliderStyle} reverse />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Brightness</Text>
          <BrightnessSlider style={colorPickerStyle.sliderStyle} />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Opacity</Text>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
            <HueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>S</Text>
            <SaturationSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>B</Text>
            <BrightnessSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>A</Text>
            <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
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
          <HueSlider style={colorPickerStyle.sliderStyle} />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Saturation</Text>
          <HSLSaturationSlider style={colorPickerStyle.sliderStyle} reverse />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Luminance</Text>
          <LuminanceSlider style={colorPickerStyle.sliderStyle} />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Opacity</Text>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
            <HueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>S</Text>
            <HSLSaturationSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>L</Text>
            <LuminanceSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>A</Text>
            <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
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
          <RedSlider style={colorPickerStyle.sliderStyle} />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Green</Text>
          <GreenSlider style={colorPickerStyle.sliderStyle} />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Blue</Text>
          <BlueSlider style={colorPickerStyle.sliderStyle} />
        </View>

        <View>
          <Text style={colorPickerStyle.sliderTitle}>Opacity</Text>
          <OpacitySlider style={colorPickerStyle.sliderStyle} />
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
            <RedSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>G</Text>
            <GreenSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>B</Text>
            <BlueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={colorPickerStyle.sliderTitle}>A</Text>
            <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
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
                <HueSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>S</Text>
                <HSLSaturationSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>L</Text>
                <LuminanceSlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={colorPickerStyle.sliderTitle}>A</Text>
                <OpacitySlider style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
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
              <HueSlider gestures={[hueGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>S</Text>
              <HSLSaturationSlider gestures={[saturationGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>L</Text>
              <LuminanceSlider gestures={[lumGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={colorPickerStyle.sliderTitle}>A</Text>
              <OpacitySlider gestures={[opacityGesture]} style={colorPickerStyle.sliderVerticalStyle} vertical reverse />
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
```
