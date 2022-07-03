import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { runOnJS, useDerivedValue } from 'react-native-reanimated';
import { CONTRAST_RATIO } from '../ColorsConversionFormulas';

const CONTRAST_RATIO_MIN = 4.5;

const ReText = ({ text, style }) => {
  const [color, setColor] = useState(text.value);

  useDerivedValue(() => {
    runOnJS(setColor)(text.value);
  }, [text.value]);

  return (
    <Animated.Text style={[styles.previewText, ...style]}>
      {color}
    </Animated.Text>
  );
};

export function Preview({
  width,
  initialColor,
  returnedResults,
  value,
  previewColorStyle,
  previewText,
  previewTextColorStyle,
  previewColorFormat,
  style = {}, // by user
  textStyle = {}, // by user
  colorFormat = 'hex', // by user
  hideInitialColor = false, // by user
  hideText = false, // by user
}) {
  previewColorFormat.current = colorFormat;

  const initialColorText = useMemo(() => {
    const { h, s, b } = initialColor.current;
    const formated = returnedResults(initialColor.current)[
      previewColorFormat.current
    ];
    const contrast = CONTRAST_RATIO(h, s, b, '#fff');
    const color = contrast < CONTRAST_RATIO_MIN ? '#000' : '#fff';
    return { formated, color };
  }, [value, colorFormat]);

  return (
    <View style={[styles.previewWrapper, { width }, style]}>
      {!hideInitialColor && (
        <View
          style={[
            styles.previewContainer,
            {
              backgroundColor: value,
              justifyContent: style.justifyContent ?? 'center',
            },
          ]}>
          {!hideText && (
            <Text
              style={[
                { color: initialColorText.color },
                styles.previewText,
                textStyle,
              ]}>
              {initialColorText.formated}
            </Text>
          )}
        </View>
      )}
      <Animated.View
        style={[
          styles.previewContainer,
          { justifyContent: style.justifyContent ?? 'center' },
          previewColorStyle,
        ]}>
        {!hideText && (
          <ReText
            text={previewText}
            style={[textStyle, previewTextColorStyle]}
          />
        )}
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
