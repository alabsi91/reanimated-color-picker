import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '../../../styles';

import type { BuiltinThumbsProps } from '../../../types';

export default function Line({
  width,
  height,
  borderRadius,
  thumbColor,
  adaptiveColor,
  handleStyle,
  innerStyle,
  style,
  vertical,
}: BuiltinThumbsProps) {
  const thickness = 3;
  const computedStyle = { width, height };
  const lineStyle = {
    borderRadius,
    backgroundColor: thumbColor,
    width: vertical ? '100%' : thickness,
    height: vertical ? thickness : '100%',
  };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || adaptiveColor.value }));

  return (
    <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
      <Animated.View style={[lineStyle, styles.shadow, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
