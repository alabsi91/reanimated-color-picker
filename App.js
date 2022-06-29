import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ColorPicker, { Panel, Swatches, Preview, OpacitySlider, HueSlider } from './lib/ColorPicker';

export default function App() {
  const [color, setColor] = useState('#8bc34b');

  useEffect(() => {
    setTimeout(() => {
      setColor('#ffc105');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ColorPicker value={color} width={280} onComplete={({ hex }) => console.log(hex)}>
        <Preview />
        <Panel />
        <OpacitySlider />
        <HueSlider />
        <Swatches />
      </ColorPicker>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1d',
  },
});
