import React, { useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';
import { CTX } from '../GlobalStyles';

import type { SharedValue } from 'react-native-reanimated';
import type { PreviewTextProps } from '../types';

export function PreviewText({ style = {}, colorFormat = 'hex' }: PreviewTextProps) {
  const { returnedResults, colorHash } = useContext(CTX);

  const [text, setText] = useState(returnedResults()[colorFormat]);

  const updateText = (_t: SharedValue<string>) => {
    setText(returnedResults()[colorFormat]);
  };

  useDerivedValue(() => {
    runOnJS(updateText)(colorHash); // passing a value is not necessary, but it doesn't work without it.
  }, [colorHash.value, colorFormat]);

  return <Text style={[styles.previewText, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  previewText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
