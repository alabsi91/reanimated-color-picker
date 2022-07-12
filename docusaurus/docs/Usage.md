---
sidebar_position: 4
---

# Usage

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
