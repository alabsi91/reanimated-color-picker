import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import { ConditionalRendering, getStyle, isWeb } from '@utils';
import { PreviewText } from './PreviewText';

import type { PreviewProps } from '@types';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export function Preview({
  style = {},
  textStyle = {},
  colorFormat = 'hex',
  hideInitialColor = false,
  hideText = false,
  disableOpacityTexture = false,
}: PreviewProps) {
  const { hueValue, saturationValue, brightnessValue, alphaValue, returnedResults, value } = usePickerContext();

  const justifyContent = getStyle(style, 'justifyContent') ?? 'center';

  const [initialValueFormatted, setInitialValueFormatted] = useState('');

  useEffect(() => {
    setInitialValueFormatted(returnedResults()[colorFormat]);
  }, [value, colorFormat]);

  const initialColorText = useDerivedValue(() => {
    const adaptiveTextColor = alphaValue.value > 0.5 ? value : { h: 0, s: 0, v: 70 };
    const contrast = colorKit.runOnUI().contrastRatio(adaptiveTextColor, '#ffffff');
    return contrast < 4.5 ? '#000000' : '#ffffff';
  }, [alphaValue, value]);

  const textColor = useSharedValue<'#000000' | '#ffffff'>('#ffffff');
  const textColorStyle = useAnimatedStyle(() => ({ color: textColor.value }), [textColor]);

  const previewColor = useSharedValue('#ffffff');
  const previewColorStyle = useAnimatedStyle(() => ({ backgroundColor: previewColor.value }), [previewColor]);

  // When the values of channels change
  useDerivedValue(() => {
    const currentColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value, a: alphaValue.value };

    previewColor.value = colorKit
      .runOnUI()
      .HEX({ h: hueValue.value, s: saturationValue.value, v: brightnessValue.value, a: alphaValue.value });

    // calculate the contrast ratio
    const compareColor1 = alphaValue.value > 0.5 ? currentColor : { h: 0, s: 0, v: 70 };
    const compareColor2 = textColor.value === '#000000' ? { h: 0, s: 0, v: 0 } : { h: 0, s: 0, v: 100 };
    const contrast = colorKit.runOnUI().contrastRatio(compareColor1, compareColor2);
    const reversedColor = textColor.value === '#ffffff' ? '#000000' : '#ffffff';
    textColor.value = contrast < 4.5 ? reversedColor : textColor.value;
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  return (
    <Wrapper disableTexture={disableOpacityTexture} style={style}>
      <ConditionalRendering if={!hideInitialColor}>
        <View style={[styles.previewContainer, { backgroundColor: value, justifyContent }]}>
          <ConditionalRendering if={!hideText}>
            <Animated.Text style={[styles.previewText, { color: initialColorText }, textStyle]}>
              {initialValueFormatted}
            </Animated.Text>
          </ConditionalRendering>
        </View>
      </ConditionalRendering>

      <Animated.View style={[styles.previewContainer, { justifyContent }, previewColorStyle]}>
        <ConditionalRendering if={!hideText}>
          <PreviewText colorFormat={colorFormat} style={[textStyle, textColorStyle]} />
        </ConditionalRendering>
      </Animated.View>
    </Wrapper>
  );
}

type WrapperProps = {
  children: ReactNode;
  disableTexture: boolean;
  style: StyleProp<ViewStyle>;
};

function Wrapper({ children, disableTexture, style }: WrapperProps) {
  if (disableTexture) {
    return <View style={[styles.previewWrapper, style]}>{children}</View>;
  }

  if (isWeb) {
    return <View style={[styles.previewWrapper, previewWrapperWebStyle, style]}>{children}</View>;
  }

  return (
    <ImageBackground
      source={require('@assets/transparent-texture.png')}
      imageStyle={{ width: '100%', height: '100%' }}
      resizeMode='repeat'
      style={[styles.previewWrapper, style]}
    >
      {children}
    </ImageBackground>
  );
}

const previewWrapperWebStyle = {
  backgroundImage:
    'repeating-linear-gradient(45deg, #c1c1c1 25%, transparent 25%, transparent 75%, #c1c1c1 75%, #c1c1c1), repeating-linear-gradient(45deg, #c1c1c1 25%, #fff 25%, #fff 75%, #c1c1c1 75%, #c1c1c1)',
  backgroundPosition: '0px 0px, 8px 8px',
  backgroundSize: '16px 16px',
} as StyleProp<ViewStyle>;
