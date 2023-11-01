import React, { useState } from 'react';
import { Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';

import type { PreviewTextProps } from '@types';

export function PreviewText({ style = {}, colorFormat = 'hex' }: PreviewTextProps) {
  const { returnedResults, hueValue, saturationValue, brightnessValue, alphaValue } = usePickerContext();

  const [text, setText] = useState(returnedResults()[colorFormat]);

  const updateText = () => {
    setText(returnedResults()[colorFormat]);
  };

  useDerivedValue(() => {
    [colorFormat, hueValue, saturationValue, brightnessValue, alphaValue]; // track changes on Native
    runOnJS(updateText)();
  }, [colorFormat, hueValue, saturationValue, brightnessValue, alphaValue]); // track changes on WEB

  return <Text style={[styles.previewText, style]}>{text}</Text>;
}
