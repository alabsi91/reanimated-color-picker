import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';
import { enableAndroidHardwareTextures } from '@utils';

import type { BuiltinThumbsProps } from '@types';

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
  } as const;
  const adaptiveColorStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }), [adaptiveColor]);

  return (
    <Animated.View
      style={[styles.handle, style, computedStyle, handleStyle]}
      renderToHardwareTextureAndroid={enableAndroidHardwareTextures}
    >
      <Animated.View style={[circleStyle, styles.shadow, adaptiveColorStyle, solidColor, innerStyle]} />
    </Animated.View>
  );
}
