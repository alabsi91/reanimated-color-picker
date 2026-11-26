import React from 'react';
import { Image, View } from 'react-native';

import { styles } from '@styles';
import { isWeb } from '@utils';

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

interface OpacityTextureViewProps {
  children: ReactNode;
  isTextureDisabled?: boolean;
  style: StyleProp<ViewStyle>;
}

/** Shows a checkerboard texture behind its children to make a transparent color visible. */
export function OpacityTextureView({ children, isTextureDisabled = false, style }: OpacityTextureViewProps) {
  if (isTextureDisabled) {
    return <View style={style}>{children}</View>;
  }

  if (isWeb) {
    return <View style={[opacityTextureWebStyle, style]}>{children}</View>;
  }

  return (
    <View style={style}>
      <Image source={require('@assets/transparent-texture.png')} style={styles.panelImage} resizeMode='repeat' />
      {children}
    </View>
  );
}

export const opacityTextureWebStyle = {
  backgroundImage: 'repeating-conic-gradient(#c1c1c1 0 25%, #fff 0 50%)',
  backgroundSize: '16px 16px',
} as ViewStyle;
