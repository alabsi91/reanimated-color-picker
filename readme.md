:red_circle: :green_circle: :large_blue_circle:

# Reanimated Color Picker

![npm](https://img.shields.io/npm/v/reanimated-color-picker?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/alabsi91/reanimated-color-picker?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/alabsi91/reanimated-color-picker?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-IOS%20%7C%20Android%20%7C%20Expo%20%7C%20Web-informational?style=for-the-badge)

### - Pure JavaScript color picker for react-native.

### - Highly customizable.

### - Supports IOS, Android, Expo, and Web platforms.

### - Supports right to left (RTL) layout.

![Example_1](https://github.com/alabsi91/reanimated-color-picker/blob/main/images/example_1.png?raw=true)
![Example_2](https://github.com/alabsi91/reanimated-color-picker/blob/main/images/example_2.png?raw=true)
![Example_3](https://github.com/alabsi91/reanimated-color-picker/blob/main/images/example_3.png?raw=true) ![Example_4](https://github.com/alabsi91/reanimated-color-picker/blob/main/images/example_4.png?raw=true)


# :small_blue_diamond:Prerequisites

- Use the links below to follow the installation instructions.

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation) version `2.0.0` or higher.

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation) version `2.0.0` or higher.

- For `Expo` managed workflow version `44` or higher is required.

# :small_blue_diamond:Installation

> **Note**
> First we need to install [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)(>=2.0.0) and [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)(>=2.0.0),

- Open a Terminal in the project root and run:

```
npm i reanimated-color-picker
```

# :small_blue_diamond:Usage

### -  We recommend reading the detailed documentation for using ColorPicker [here.](https://alabsi91.github.io/reanimated-color-picker/)

- You can add, remove, rearrange or style the color picker's built-in components.

- Check out the working examples:
  - [Bare workflow](https://github.com/alabsi91/reanimated-color-picker/tree/main/Example)
  - [Expo managed workflow](https://github.com/alabsi91/reanimated-color-picker/tree/main/ExampleExpo)
  - [Expo snack](https://snack.expo.dev/@alabsi91/reanimated-color-picker)

```jsx
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
  };

  return (
    <View style={styles.container}>
      <Button title='Color Picker' onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType='slide'>
        <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title='Ok' onPress={() => setShowModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
```

# :small_blue_diamond:License

- Reanimated Color Picker library is licensed under [**The MIT License.**](https://github.com/alabsi91/reanimated-color-picker/blob/main/LICENSE)
