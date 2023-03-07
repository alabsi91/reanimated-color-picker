import React, { useState, useMemo, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { getStyle } from '../utils';

import type { PreviewPorps } from '../types';
import type { StyleProp, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import colorKit from '../colorKit';
import { CTX } from '../ColorPicker';

const ReText = ({ text, style, hash }: { text: () => string; style: StyleProp<TextStyle>[]; hash: SharedValue<number>[] }) => {
  const [color, setColor] = useState(text());

  const updateText = () => {
    setColor(text());
  };

  useDerivedValue(() => {
    hash.forEach(e => e.value);
    runOnJS(updateText)();
  });

  return <Animated.Text style={[styles.previewText, ...style]}>{color}</Animated.Text>;
};

export function Preview({
  style = {},
  textStyle = {},
  colorFormat = 'hex',
  hideInitialColor = false,
  hideText = false,
}: PreviewPorps) {
  const { hueValue, saturationValue, brightnessValue, alphaValue, returnedResults, value } = useContext(CTX);

  const justifyContent = getStyle(style, 'justifyContent') ?? 'center';

  // To track changes in the color channel values of the ReText component.
  const colorHash = [hueValue, saturationValue, brightnessValue, alphaValue];

  const initialColorText = useMemo(() => {
    const contrast = colorKit.contrastRatio(value, '#fff');
    const color = contrast < 4.5 ? '#000' : '#fff';
    return { formated: returnedResults()[colorFormat], color };
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
    runOnJS(setPreviewColor)({ h: hueValue.value, s: saturationValue.value, v: brightnessValue.value, a: alphaValue.value });
    runOnJS(setTextColor)({ h: hueValue.value, s: saturationValue.value, v: brightnessValue.value });
  });

  return (
    <View style={[styles.previewWrapper, style]}>
      {!hideInitialColor && (
        <View style={[styles.previewContainer, { backgroundColor: value, justifyContent }]}>
          {!hideText && (
            <Text style={[{ color: initialColorText.color }, styles.previewText, textStyle]}>{initialColorText.formated}</Text>
          )}
        </View>
      )}
      <Animated.View style={[styles.previewContainer, { justifyContent }, previewColorStyle]}>
        {!hideText && <ReText text={() => returnedResults()[colorFormat]} hash={colorHash} style={[textStyle, textColorStyle]} />}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewWrapper: {
    flexDirection: 'row',
    height: 25,
    borderRadius: 5,
    overflow: 'hidden',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
