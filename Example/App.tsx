import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import Example4 from './Example4';

export default function App() {
  const color = useSharedValue('#ff006f');
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color.value,
  }));

  const onSelectColor = ({ hex }: { hex: string }) => {
    console.log('hex :', hex);
    color.value = hex;
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Example1 color={color} onSelectColor={onSelectColor} />
      <Example2 color={color} onSelectColor={onSelectColor} />
      <Example3 color={color} onSelectColor={onSelectColor} />
      <Example4 color={color} onSelectColor={onSelectColor} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 40,
  },
});
