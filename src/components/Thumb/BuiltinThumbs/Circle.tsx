import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '../../../styles';
import { BuiltinThumbsProps } from '../../../types';

export default function Circle({
  width,
  height,
  borderRadius,
  adaptiveColor,
  handleStyle,
  innerStyle,
  solidColor,
  style,
}: BuiltinThumbsProps) {
  const computedStyle = { width, height };
  const circleStyle = {
    borderRadius,
    borderWidth: 1,
    width: '100%',
    height: '100%',
  };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }));

  return (
    <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
      <Animated.View style={[circleStyle, styles.shadow, adaptiveColorStyle, solidColor, innerStyle]} />
    </Animated.View>
  );
}
