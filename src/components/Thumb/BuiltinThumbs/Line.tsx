import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';

import type { BuiltinThumbsProps } from '@types';

export default function Line({
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
  const thickness = 3;
  const computedStyle = { width, height };
  const lineStyle = {
    borderRadius,
    backgroundColor: thumbColor,
    width: vertical ? '100%' : thickness,
    height: vertical ? thickness : '100%',
  } as const;
  const adaptiveColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: thumbColor || adaptiveColor.value,
    };
  }, [thumbColor, adaptiveColor]);

  return (
    <Animated.View style={[styles.handle, style, computedStyle, handleStyle]} renderToHardwareTextureAndroid>
      <Animated.View style={[lineStyle, styles.shadow, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
