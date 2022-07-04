import React, { useState, useMemo, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { runOnJS, useDerivedValue } from 'react-native-reanimated';
import { CONTRAST_RATIO } from '../ColorsConversionFormulas';
import { CTX, getStyle } from '../GlobalStyles';

const CONTRAST_RATIO_MIN = 4.5;

const ReText = ({ text, style }) => {
  const [color, setColor] = useState(text.value);

  useDerivedValue(() => {
    runOnJS(setColor)(text.value);
  }, [text.value]);

  return <Animated.Text style={[styles.previewText, ...style]}>{color}</Animated.Text>;
};

export function Preview({ style = {}, textStyle = {}, colorFormat = 'hex', hideInitialColor = false, hideText = false }) {
  const { initialColor, returnedResults, value, previewColorStyle, previewText, previewTextColorStyle, previewColorFormat } =
    useContext(CTX);

  previewColorFormat.current = colorFormat;
  const justifyContent = getStyle(style, 'justifyContent', 'center');

  const initialColorText = useMemo(() => {
    const { h, s, b } = initialColor.current;
    const formated = returnedResults(initialColor.current)[colorFormat];
    const contrast = CONTRAST_RATIO(h, s, b, '#fff');
    const color = contrast < CONTRAST_RATIO_MIN ? '#000' : '#fff';
    return { formated, color };
  }, [value, colorFormat]);

  useEffect(() => {
    previewText.value = returnedResults(initialColor.current)[colorFormat];
  }, []);

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
        {!hideText && <ReText text={previewText} style={[textStyle, previewTextColorStyle]} />}
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
