import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';
import { enableAndroidHardwareTextures } from '@utils';

import type { BuiltinThumbsProps } from '@types';

export default function Hollow({
  width,
  height,
  borderRadius,
  thumbColor,
  adaptiveColor,
  handleStyle,
  innerStyle,
  style,
}: BuiltinThumbsProps) {
  const computedStyle = { width, height, borderRadius, borderWidth: 2 };

  const adaptiveColorStyle = useAnimatedStyle(() => {
    return { borderColor: thumbColor ?? adaptiveColor.value };
  }, [adaptiveColor]);

  const adaptiveColorBgStyle = useAnimatedStyle(() => {
    return { backgroundColor: thumbColor ?? adaptiveColor.value };
  }, [adaptiveColor]);

  return (
    <Animated.View
      style={[styles.handle, style, computedStyle, adaptiveColorStyle, handleStyle]}
      renderToHardwareTextureAndroid={enableAndroidHardwareTextures}
    >
      <Animated.View style={[{ width: 4, height: 4, borderRadius: 2 }, adaptiveColorBgStyle, styles.shadow, innerStyle]} />
    </Animated.View>
  );
}
