import React, { useState, useMemo, useContext } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { styles } from '@styles';
import { ConditionalRendering, getStyle, isWeb } from '@utils';
import colorKit from '@colorKit';
import CTX from '@context';

import type { StyleProp, TextStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { PreviewProps } from '@types';

const ReText = ({ text, style, hash }: { text: () => string; style: StyleProp<TextStyle>[]; hash: SharedValue<number>[] }) => {
  const [color, setColor] = useState(text());

  const updateText = () => {
    setColor(text());
  };

  useDerivedValue(() => {
    hash.forEach(e => e.value);
    runOnJS(updateText)();
  });

  return <Animated.Text style={[styles.previewInitialText, ...style]}>{color}</Animated.Text>;
};

export function Preview({
  style = {},
  textStyle = {},
  colorFormat = 'hex',
  hideInitialColor = false,
  hideText = false,
}: PreviewProps) {
  const { hueValue, saturationValue, brightnessValue, alphaValue, returnedResults, value } = useContext(CTX);

  const justifyContent = getStyle(style, 'justifyContent') ?? 'center';

  // To track changes in the color channel values of the ReText component.
  const colorHash = [hueValue, saturationValue, brightnessValue, alphaValue];

  const initialColorText = useMemo(() => {
    const adaptiveTextColor = alphaValue.value > 0.5 ? value : { h: 0, s: 0, v: 70 };
    const contrast = colorKit.contrastRatio(adaptiveTextColor, '#fff');
    const color = contrast < 4.5 ? '#000' : '#fff';
    return { formatted: returnedResults()[colorFormat], color };
  }, [value, colorFormat]);

  const textColor = useSharedValue('#fff');
  const textColorStyle = useAnimatedStyle(() => ({ color: textColor.value }));
  const setTextColor = (color1: { h: number; s: number; v: number; a?: number }) => {
    const color = textColor.value === '#ffffff' ? '#000000' : '#ffffff';
    const contrast = colorKit.contrastRatio(color1, textColor.value);
    textColor.value = contrast < 4.5 ? color : textColor.value;
  };

  const previewColor = useSharedValue('#fff');
  const previewColorStyle = useAnimatedStyle(() => ({ backgroundColor: previewColor.value }));
  const setPreviewColor = (color: { h: number; s: number; v: number; a: number }) => {
    previewColor.value = colorKit.HEX(color);
  };

  // When the values of channels change
  useDerivedValue(() => {
    const currentColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value, a: alphaValue.value };
    const adaptiveTextColor = alphaValue.value > 0.5 ? currentColor : { h: 0, s: 0, v: 70 };
    runOnJS(setPreviewColor)(currentColor);
    runOnJS(setTextColor)(adaptiveTextColor);
  });

  return (
    <Wrapper style={style}>
      <ConditionalRendering render={!hideInitialColor}>
        <View style={[styles.previewContainer, { backgroundColor: value, justifyContent }]}>
          <ConditionalRendering render={!hideText}>
            <Text style={[{ color: initialColorText.color }, styles.previewInitialText, textStyle]}>
              {initialColorText.formatted}
            </Text>
          </ConditionalRendering>
        </View>
      </ConditionalRendering>

      <Animated.View style={[styles.previewContainer, { justifyContent }, previewColorStyle]}>
        <ConditionalRendering render={!hideText}>
          <ReText text={() => returnedResults()[colorFormat]} hash={colorHash} style={[textStyle, textColorStyle]} />
        </ConditionalRendering>
      </Animated.View>
    </Wrapper>
  );
}

function Wrapper({ children, style }: { children: ReactNode; style: {} | null }) {
  if (isWeb) {
    return <View style={[styles.previewWrapper, previewWrapperWeb, style]}>{children}</View>;
  }

  return (
    <ImageBackground
      source={require('@assets/transparent-texture.png')}
      resizeMode='repeat'
      style={[styles.previewWrapper, style]}
    >
      {children}
    </ImageBackground>
  );
}

const previewWrapperWeb = {
  backgroundImage:
    'repeating-linear-gradient(45deg, #c1c1c1 25%, transparent 25%, transparent 75%, #c1c1c1 75%, #c1c1c1), repeating-linear-gradient(45deg, #c1c1c1 25%, #fff 25%, #fff 75%, #c1c1c1 75%, #c1c1c1)',
  backgroundPosition: '0px 0px, 8px 8px',
  backgroundSize: '16px 16px',
};
