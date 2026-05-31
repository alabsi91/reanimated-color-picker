import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import { ConditionalRendering, getStyle, isWeb } from '@utils';
import { PreviewText } from './PreviewText';

import type { PreviewProps } from '@types';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** @see [Preview](https://alabsi91.github.io/reanimated-color-picker/api/preview/preview/) */
export function Preview({
  style = {},
  textStyle = {},
  colorFormat = 'hex',
  hideInitialColor = false,
  hideText = false,
  disableOpacityTexture = false,
}: PreviewProps) {
  const { hueValue, saturationValue, brightnessValue, alphaValue, colorResult: returnedResults, value } = usePickerContext();

  const justifyContent = getStyle(style, 'justifyContent') ?? 'center';

  const [initialValueFormatted, setInitialValueFormatted] = useState('');
  const alphaStaleValue = useRef(0);

  useEffect(() => {
    setInitialValueFormatted(returnedResults()[colorFormat]);
    alphaStaleValue.current = alphaValue.value;
  }, [value, colorFormat]);

  const initialTextColor = (() => {
    if (alphaStaleValue.current < 0.5) {
      return '#000000';
    }

    const isDark = colorKit.isDark(initialValueFormatted);
    return isDark ? '#ffffff' : '#000000';
  })();

  const previewColor = useDerivedValue(() => {
    return colorKit.runOnUI().HEX({
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    });
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  const previewColorStyle = useAnimatedStyle(() => ({ backgroundColor: previewColor.value }), [previewColor]);

  const previewTextColor = useDerivedValue(() => {
    if (alphaValue.value < 0.5) {
      return '#000000';
    }

    const currentColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };

    const isDark = colorKit.runOnUI().isDark(currentColor);
    return isDark ? '#ffffff' : '#000000';
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  const previewTextStyle = useAnimatedStyle(() => ({ color: previewTextColor.value }), [previewTextColor]);

  return (
    <Wrapper disableTexture={disableOpacityTexture} style={style}>
      <ConditionalRendering if={!hideInitialColor}>
        <View style={[styles.previewContainer, { backgroundColor: value, justifyContent }]}>
          <ConditionalRendering if={!hideText}>
            <Animated.Text style={[styles.previewText, textStyle, { color: initialTextColor }]} accessibilityLiveRegion='none'>
              {initialValueFormatted}
            </Animated.Text>
          </ConditionalRendering>
        </View>
      </ConditionalRendering>

      <Animated.View style={[styles.previewContainer, { justifyContent }, previewColorStyle]}>
        <ConditionalRendering if={!hideText}>
          <PreviewText colorFormat={colorFormat} style={[textStyle, previewTextStyle]} />
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
