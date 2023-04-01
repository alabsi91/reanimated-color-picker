import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { isRtl } from '@utils';
import { styles } from '@styles';

import type { BuiltinThumbsProps } from '@types';

export default function DoubleTriangle({
  width,
  height,
  thumbColor,
  adaptiveColor,
  handleStyle,
  innerStyle,
  style,
  vertical,
}: BuiltinThumbsProps) {
  const computedStyle = {
    width,
    height,
    flexDirection: vertical ? (isRtl ? 'row' : 'row-reverse') : 'column',
  };
  const triangleUpStyle = {
    borderBottomWidth: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    transform: [{ rotate: vertical ? '90deg' : '0deg' }],
  };
  const triangleDownStyle = {
    borderBottomWidth: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    transform: [{ rotate: vertical ? '270deg' : '180deg' }],
  };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || adaptiveColor.value }));

  return (
    <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
      <Animated.View style={[styles.triangle, triangleDownStyle, adaptiveColorStyle, innerStyle]} />
      <View style={{ width: '50%', height: '50%' }} />
      <Animated.View style={[styles.triangle, triangleUpStyle, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
