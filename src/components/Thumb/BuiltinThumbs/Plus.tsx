import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '../../../styles';
import { BuiltinThumbsProps } from '../../../types';

export default function Plus({
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
  const thickness = 2;
  const computedStyle = { width, height, borderRadius, borderWidth: thickness };
  const line1 = {
    borderRadius,
    position: 'absolute' as const,
    width: vertical ? '100%' : thickness,
    height: vertical ? thickness : '100%',
  };
  const line2 = {
    borderRadius,
    width: vertical ? thickness : '100%',
    height: vertical ? '100%' : thickness,
  };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || adaptiveColor.value }));
  const adaptiveBorderColorStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || adaptiveColor.value }));

  return (
    <Animated.View style={[styles.handle, style, computedStyle, adaptiveBorderColorStyle, handleStyle]}>
      <Animated.View style={[line1, styles.shadow, adaptiveColorStyle, innerStyle]} />
      <Animated.View style={[line2, styles.shadow, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
