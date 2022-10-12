import React, { useState, useMemo, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { COLOR_HSVA, CONTRAST_RATIO } from '../ColorsConversionFormulas';
import { CTX, getStyle } from '../GlobalStyles';

import type { PreviewPorps } from '../types';
import type { StyleProp, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

const CONTRAST_RATIO_MIN = 4.5;

const ReText = ({ text, style, hash }: { text: () => string; style: StyleProp<TextStyle>; hash: SharedValue<string> }) => {
  const [color, setColor] = useState(text());

  const updateText = (_t: string) => {
    setColor(text());
  };

  useDerivedValue(() => {
    runOnJS(updateText)(hash.value); // passing a value is not necessary, but it doesn't work without it.
  }, [hash.value]);

  const tStyle = Array.isArray(style) ? style : [style];
  return <Animated.Text style={[styles.previewText, ...tStyle]}>{color}</Animated.Text>;
};

export function Preview({
  style = {},
  textStyle = {},
  colorFormat = 'hex',
  hideInitialColor = false,
  hideText = false,
}: PreviewPorps) {
  const { returnedResults, value, previewColorStyle, colorHash, invertedColor } = useContext(CTX);

  const justifyContent = getStyle(style, 'justifyContent') ?? 'center';

  const initialColorText = useMemo(() => {
    const { h, s, b, a } = COLOR_HSVA(value);
    const formated = returnedResults({ h, s, b, a })[colorFormat];
    const contrast = CONTRAST_RATIO({ h, s, b }, '#fff');
    const color = contrast < CONTRAST_RATIO_MIN ? '#000' : '#fff';
    return { formated, color };
  }, [value, colorFormat]);

  const updateText = () => returnedResults()[colorFormat];
  const invertedColorStyle = useAnimatedStyle(() => ({ color: invertedColor.value }));

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
        {!hideText && <ReText text={updateText} hash={colorHash} style={[textStyle, invertedColorStyle]} />}
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
  },
  previewText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
