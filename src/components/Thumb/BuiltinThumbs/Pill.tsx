import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';

import type { BuiltinThumbsProps } from '@types';

export default function Pill({
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
  const computedStyle = { width, height };
  const pillStyle = {
    borderRadius,
    borderColor: thumbColor,
    borderWidth: 2,
    width: vertical ? '100%' : 10,
    height: vertical ? 10 : '100%',
  } as const;
  const adaptiveColorStyle = useAnimatedStyle(() => {
    return {
      borderColor: thumbColor || adaptiveColor.value,
    };
  }, [thumbColor, adaptiveColor]);

  return (
    <Animated.View style={[styles.handle, computedStyle, style, handleStyle]}>
      <Animated.View style={[pillStyle, styles.shadow, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
