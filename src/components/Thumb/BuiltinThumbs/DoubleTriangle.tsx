import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { styles } from '@styles';
import { enableAndroidHardwareTextures, isRtl } from '@utils';

import type { BuiltinThumbsProps } from '@types';
import type { StyleProp, ViewStyle } from 'react-native';

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
  const computedStyle: StyleProp<ViewStyle> = {
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
  const adaptiveColorStyle = useAnimatedStyle(() => {
    return {
      borderBottomColor: thumbColor || adaptiveColor.value,
    };
  }, [thumbColor, adaptiveColor]);

  return (
    <Animated.View
      style={[styles.handle, style, computedStyle, handleStyle]}
      renderToHardwareTextureAndroid={enableAndroidHardwareTextures}
    >
      <Animated.View style={[styles.triangle, triangleDownStyle, adaptiveColorStyle, innerStyle]} />
      <View style={{ width: '50%', height: '50%' }} />
      <Animated.View style={[styles.triangle, triangleUpStyle, adaptiveColorStyle, innerStyle]} />
    </Animated.View>
  );
}
