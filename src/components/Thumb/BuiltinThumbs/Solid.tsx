import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '../../../styles';
import { BuiltinThumbsProps } from '../../../types';

export default function Solid({
  width,
  height,
  borderRadius,
  thumbColor,
  adaptiveColor,
  handleStyle,
  style,
}: BuiltinThumbsProps) {
  const computedStyle = { width, height, borderRadius, backgroundColor: thumbColor || 'gray', borderWidth: 1 };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }));

  return <Animated.View style={[styles.handle, computedStyle, style, styles.shadow, adaptiveColorStyle, handleStyle]} />;
}
