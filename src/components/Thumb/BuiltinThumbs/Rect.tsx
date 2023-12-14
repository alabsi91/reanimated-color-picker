import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';

import type { BuiltinThumbsProps } from '@types';

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
  } as const;
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }), [adaptiveColor]);

  return (
    <Animated.View style={[styles.handle, style, computedStyle, handleStyle]} renderToHardwareTextureAndroid>
      <Animated.View style={[pillStyle, styles.shadow, adaptiveColorStyle, solidColor, innerStyle]} />
    </Animated.View>
  );
}
