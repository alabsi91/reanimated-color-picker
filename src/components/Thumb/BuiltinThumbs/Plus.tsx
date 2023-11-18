import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';

import type { BuiltinThumbsProps } from '@types';

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
  } as const;
  const line2 = {
    borderRadius,
    width: vertical ? thickness : '100%',
    height: vertical ? '100%' : thickness,
  } as const;

  const adaptiveColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: thumbColor || adaptiveColor.value,
    };
  }, [thumbColor, adaptiveColor]);

  const adaptiveBorderColorStyle = useAnimatedStyle(() => {
    return {
      borderColor: thumbColor || adaptiveColor.value,
    };
  }, [thumbColor, adaptiveColor]);

  return (
    <Animated.View style={[styles.handle, style, computedStyle, adaptiveBorderColorStyle, handleStyle]}>
      <Animated.View style={[line1, styles.shadow, adaptiveColorStyle, innerStyle]} />
      <Animated.View style={[line2, styles.shadow, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
