import React, { useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import { CTX } from '../ColorPicker';

import type { PreviewTextProps } from '../types';

export function PreviewText({ style = {}, colorFormat = 'hex' }: PreviewTextProps) {
  const { returnedResults, hueValue, saturationValue, brightnessValue, alphaValue } = useContext(CTX);

  const [text, setText] = useState(returnedResults()[colorFormat]);

  const updateText = () => {
    setText(returnedResults()[colorFormat]);
  };

  useDerivedValue(() => {
    // To track changes in the color channel values of the ReText component.
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value];
    runOnJS(updateText)();
  }, [colorFormat]);

  return <Text style={[styles.previewText, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  previewText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
