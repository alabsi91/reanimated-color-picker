import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import { getWebDependencies } from '@utils';
import { OpacityTextureView } from '../OpacityTextureView';
import { useApplyTypedColor } from './useApplyTypedColor';
import HexWidget from './Widgets/HexWidget';

import type { ColorInputProps } from '@types';

/** @see [ColorInput](https://alabsi91.github.io/reanimated-color-picker/components/inputs/color-input/) */
export function ColorInput({
  onSwatchPress,
  disableAlphaChannel = false,
  style = {},
  swatchStyle = {},
  inputStyle = {},
  inputProps = {},
  swatchAccessibilityLabel = 'Open color picker',
  swatchAccessibilityHint,
}: ColorInputProps) {
  const { colorResult, hueValue, saturationValue, brightnessValue, alphaValue } = usePickerContext();

  const applyTypedColor = useApplyTypedColor(disableAlphaChannel);

  const swatchColorStyle = useAnimatedStyle(
    () => ({
      backgroundColor: colorKit.runOnUI().HEX({
        h: hueValue.value,
        s: saturationValue.value,
        v: brightnessValue.value,
        a: alphaValue.value,
      }),
    }),
    getWebDependencies([hueValue, saturationValue, brightnessValue, alphaValue]),
  );

  const isSwatchPressable = onSwatchPress !== undefined;

  return (
    <View style={[styles.colorInputContainer, style]}>
      <HexWidget
        onChange={applyTypedColor}
        colorResult={colorResult}
        hueValue={hueValue}
        saturationValue={saturationValue}
        brightnessValue={brightnessValue}
        alphaValue={alphaValue}
        inputStyle={[styles.colorInputText, inputStyle]}
        inputProps={inputProps}
        disableAlphaChannel={disableAlphaChannel}
        isTitleHidden
      />

      <Pressable
        onPress={onSwatchPress}
        disabled={!isSwatchPressable}
        role={isSwatchPressable ? 'button' : undefined}
        aria-label={swatchAccessibilityLabel}
        aria-hidden={!isSwatchPressable}
        accessibilityHint={swatchAccessibilityHint}
        style={styles.colorInputSwatchButton}
      >
        <View style={[styles.colorInputSwatch, swatchStyle]}>
          <OpacityTextureView style={StyleSheet.absoluteFill}>
            <Animated.View style={[StyleSheet.absoluteFill, swatchColorStyle]} />
          </OpacityTextureView>
        </View>
      </Pressable>
    </View>
  );
}
