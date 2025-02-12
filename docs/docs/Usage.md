---
sidebar_position: 4
---

# Usage

- You can add, remove, rearrange, or style the built-in components of the color picker.

- Please take a look at the functioning examples: [Examples](./Examples)

:::info
Using inside a `ScrollView`

- If you experience gesture conflicts when using the color picker inside a `ScrollView`, simply import the `ScrollView` from `react-native-gesture-handler` instead of from `react-native`.

```ts
import { ScrollView } from 'react-native-gesture-handler';
```

:::

<br/>

```jsx
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  // Note: use `onCompleteJS` and `onChangeJS` for non-worklet functions
  const onSelectColor = ({ hex }) => {
    'worklet';
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
