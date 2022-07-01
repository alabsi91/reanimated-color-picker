# :red_circle: :green_circle: :large_blue_circle: Reanimated Color Picker :large_blue_circle: :green_circle: :red_circle:

![npm](https://img.shields.io/npm/v/reanimated-color-picker?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/alabsi91/reanimated-color-picker?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/alabsi91/reanimated-color-picker?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-IOS%20%7C%20Android%20%7C%20Expo%20%7C%20Web-informational?style=for-the-badge)

### - Pure javascript color picker for react-native.

# :small_blue_diamond: Table of contents

- :one: [Prerequisites](#small_blue_diamondprerequisites).

- :two: [Installation](#small_blue_diamondinstallation).

- :three: [Usage](#small_blue_diamondusage).

- :four: [Api](#small_blue_diamondapi).

  - [ColorPicker Wrapper](#small_red_trianglecolorpicker-wrapper)
  - [Build In Components](#small_red_trianglebuild-in-components)
    - [`<Preview />`](#small_orange_diamondpreview-).
    - [`<Panel />`](#small_orange_diamondpanel-).
    - [`<HueSlider />`](#small_orange_diamondhueslider-).
    - [`<SaturationSlider />`](#small_orange_diamondsaturationslider-).
    - [`<BrightnessSlider />`](#small_orange_diamondbrightnessslider-).
    - [`<OpacitySlider />`](#small_orange_diamondopacityslider-).
    - [`<Swatches />`](#small_orange_diamondswatches-).

- :five: [License](#small_blue_diamondlicense).

# :small_blue_diamond:Prerequisites

- Press the links bellow to follow the installation instructions.

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation).

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation).

# :small_blue_diamond:Installation

> **Note**
> First we need to install [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)(>=2.0.0) and [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)(>=2.0.0),

- Open a Terminal in the project root and run:

```
npm i reanimated-color-picker
```

# :small_blue_diamond:Usage

- You can add, remove, rearrange or style the color picker build in components.
- You can also add your own components.

```jsx
import React, { useState } from 'react';
import { Button, Modal, View } from 'react-native';

import ColorPicker, { Panel, Swatches, Preview, OpacitySlider, HueSlider } from './lib/index';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({ hex }) => {
    // do something with the selected color
    console.log(hex);
  };

  return (
    <View style={styles.container}>
      <Button title='Color Picker' onPress={() => setShowModal1(true)} />

      <Modal visible={showModal}>
        <ColorPicker value='red' onComplete={onSelectColor}>
          <Preview />
          <Panel />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title='Ok' onPress={() => setShowModal(false)} />
      </Modal>
    </View>
  );
}
```

# :small_blue_diamond:Api

## :small_red_triangle:ColorPicker Wrapper

- The `ColorPicker` Wrapper is responsible for managing the build in components.

- It has the following props:

### :small_orange_diamond:value

- The initial value of the color picker.
- Accepts `'hex'`, `'rgb'`, `'rgba'`, `'hsl'`, `'hsla'`, and `named color` formats.
- `type: string`
- `default: '#418181'`

### :small_orange_diamond:tracksHeight

- Change all sliders track height.
- `type: number`
- `default: 25`

### :small_orange_diamond:thumbsSize

- Change all sliders thumb size.
- `type: number`
- `default: 35`

### :small_orange_diamond:width

- The width of the color picker wrapper.
- All of build in components will inherit this width.
- `type: number`
- `default: 300`

### :small_orange_diamond:style

- Color picker wrapper style.
- If you want to change the width use the `width` property.
- `type: object`

> **Note** some of the style properties will be overwritten.

### :small_orange_diamond:onChange

- Called every time the color value changes.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsl`, `hsla`
- `type: (color: object) => void`
- `default: null`

### :small_orange_diamond:onComplete

- Called when the user lifts his finger from the slider or when clicks on a swatch.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsl`, `hsla`
- `type: (color: object) => void`
- `default: null`

## :small_red_triangle:Build In Components

### :small_orange_diamond:`<Preview />`

- The preview of the selected and the initial color.

| Property         |  Type   | Default | Description                                                                                   |
| :--------------- | :-----: | :-----: | :-------------------------------------------------------------------------------------------- |
| colorFormat      | string  | `'hex'` | preview color text format: `'hex'`, `'rgb'`, `'rgba'`, `'hsl'`, `'hsla'`, `'hsv'` or `'hsva'` |
| hideInitialColor | boolean | `false` | hide the initial color preview part                                                           |
| style            | object  |    /    | preview container style                                                                       |
| textStyle        | object  |    /    | preview text style                                                                            |

> **Note** some of the style properties will be overwritten.

### :small_orange_diamond:`<Panel />`

- A square to change color brightness and saturation.

| Property  |  Type  | Default | Description                               |
| :-------- | :----: | :-----: | :---------------------------------------- |
| thumbSize | number |  `35`   | panel handle (thumb) size (height\*width) |
| style     | object |    /    | panle container style                     |

> **Note** some of the style properties will be overwritten.

### :small_orange_diamond:`<HueSlider />`

- A slider to changes color hue.

| Property  |  Type  | Default | Description                                    |
| :-------- | :----: | :-----: | :--------------------------------------------- |
| thumbSize | number |  `35`   | hue slider handle (thumb) size (height\*width) |
| ringColor | string | `#fff`  | the color of the ring around the slider handle |
| style     | object |    /    | hue slider container style                     |

> **Note** some of the style properties will be overwritten.

### :small_orange_diamond:`<SaturationSlider />`

- A slider to changes color saturation.

| Property  |  Type  | Default | Description                                           |
| :-------- | :----: | :-----: | :---------------------------------------------------- |
| thumbSize | number |  `35`   | saturation slider handle (thumb) size (height\*width) |
| ringColor | string | `#fff`  | the color of the ring around the slider handle        |
| style     | object |    /    | saturation slider container style                     |

> **Note** some of the style properties will be overwritten.

### :small_orange_diamond:`<BrightnessSlider />`

- A slider to changes color brightness.

| Property  |  Type  | Default | Description                                           |
| :-------- | :----: | :-----: | :---------------------------------------------------- |
| thumbSize | number |  `35`   | brightness slider handle (thumb) size (height\*width) |
| ringColor | string | `#fff`  | the color of the ring around the slider handle        |
| style     | object |    /    | brightness slider container style                     |

> **Note** some of the style properties will be overwritten.

### :small_orange_diamond:`<OpacitySlider />`

- A slider to changes color opacity.

| Property  |  Type  | Default | Description                                        |
| :-------- | :----: | :-----: | :------------------------------------------------- |
| thumbSize | number |  `35`   | opacity slider handle (thumb) size (height\*width) |
| ringColor | string | `#fff`  | the color of the ring around the slider handle     |
| style     | object |    /    | opacity slider container style                     |

> **Note** some of the style properties will be overwritten.

### :small_orange_diamond:`<Swatches />`

- A list of swatches to select a color.

| Property     |   Type    |     Default     | Description                         |
| :----------- | :-------: | :-------------: | :---------------------------------- |
| colors       | string[ ] | material colors | to provide your own swatches colors |
| style        |  object   |        /        | swatches container style            |
| swatcheStyle |  object   |        /        | swatche style                       |

> **Note** some of the style properties will be overwritten.

# :small_blue_diamond:License

- [**MIT**](https://github.com/alabsi91/reanimated-color-picker/blob/main/LICENSE)
