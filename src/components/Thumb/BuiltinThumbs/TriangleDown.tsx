import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';
import { isRtl } from '@utils';

import type { BuiltinThumbsProps } from '@types';
import type { StyleProp, ViewStyle } from 'react-native';

export default function ({
  width,
  height,
  thumbColor,
  adaptiveColor,
  handleStyle,
  innerStyle,
  style,
  vertical,
}: BuiltinThumbsProps) {
  const computedStyle: StyleProp<ViewStyle> = {
    width,
    height,
    ...(vertical
      ? { justifyContent: 'center', alignItems: isRtl ? 'flex-start' : 'flex-end' }
      : { justifyContent: 'flex-start' }),
  };
  const triangleStyle = {
    borderBottomWidth: width / 2,
    borderLeftWidth: width / 4,
    borderRightWidth: width / 4,
    transform: [{ rotate: vertical ? '270deg' : '180deg' }],
  };
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || adaptiveColor.value }));

  return (
    <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
      <Animated.View style={[styles.triangle, triangleStyle, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
