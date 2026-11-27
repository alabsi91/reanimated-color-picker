import React, { useMemo } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import { ConditionalRendering, getStyle, getWebDependencies } from '@utils';
import { OpacityTextureView } from './OpacityTextureView';
import { PreviewText } from './PreviewText';

import type { PreviewProps } from '@types';

/** @see [Preview](https://alabsi91.github.io/reanimated-color-picker/components/preview/preview/) */
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

  const initialValueFormatted = useMemo(() => returnedResults(value)[colorFormat], [value, colorFormat]);

  const initialTextColor = useMemo(() => {
    if (colorKit.getAlpha(value) < 0.5) {
      return '#000000';
    }

    return colorKit.isDark(value) ? '#ffffff' : '#000000';
  }, [value]);

  const previewColor = useDerivedValue(
    () => {
      return colorKit.runOnUI().HEX({
        h: hueValue.value,
        s: saturationValue.value,
        v: brightnessValue.value,
        a: alphaValue.value,
      });
    },
    getWebDependencies([hueValue, saturationValue, brightnessValue, alphaValue]),
  );

  const previewColorStyle = useAnimatedStyle(() => ({ backgroundColor: previewColor.value }), getWebDependencies([previewColor]));

  const previewTextColor = useDerivedValue(
    () => {
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
    },
    getWebDependencies([hueValue, saturationValue, brightnessValue, alphaValue]),
  );

  const previewTextStyle = useAnimatedStyle(() => ({ color: previewTextColor.value }), getWebDependencies([previewTextColor]));

  return (
    <OpacityTextureView isTextureDisabled={disableOpacityTexture} style={[styles.previewWrapper, style]}>
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
    </OpacityTextureView>
  );
}
