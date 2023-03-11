import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '../../../styles';
import { BuiltinThumbsProps } from '../../../types';

export default function Rect({
  width,
  height,
  adaptiveColor,
  handleStyle,
  innerStyle,
  style,
  vertical,
  solidColor,
}: BuiltinThumbsProps) {
  const computedStyle = { width, height };
  const pillStyle = {
    borderWidth: 1,
    width: vertical ? '100%' : 14,
    height: vertical ? 14 : '100%',
  };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }));

  return (
    <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
      <Animated.View style={[pillStyle, styles.shadow, adaptiveColorStyle, solidColor, innerStyle]} />
    </Animated.View>
  );
}
