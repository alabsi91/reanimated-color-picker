import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';

import type { BuiltinThumbsProps } from '@types';

export default function Hollow({
  width,
  height,
  borderRadius,
  thumbColor,
  adaptiveColor,
  handleStyle,
  innerStyle,
  style,
}: BuiltinThumbsProps) {
  const computedStyle = { width, height, borderRadius, borderWidth: 2 };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || adaptiveColor.value }));
  const adaptiveColorBgStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || adaptiveColor.value }));
  return (
    <Animated.View style={[styles.handle, style, computedStyle, adaptiveColorStyle, handleStyle]}>
      <Animated.View style={[{ width: 4, height: 4, borderRadius: 2 }, adaptiveColorBgStyle, styles.shadow, innerStyle]} />
    </Animated.View>
  );
}
