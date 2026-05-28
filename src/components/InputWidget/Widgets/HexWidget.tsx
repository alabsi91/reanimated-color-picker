import React from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

export default function HexWidget({
  onChange,
  returnedResults,
  hueValue,
  saturationValue,
  brightnessValue,
  alphaValue,
  inputStyle,
  inputTitleStyle,
  inputProps,
}: WidgetProps) {
  const hexColor = useSharedValue(returnedResults().hex);

  useDerivedValue(() => {
    const currentColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };

    hexColor.value = returnedResults(currentColor).hex;
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  const onEndEditing = (text: string) => {
    text = text.startsWith('#') ? text : '#' + text;
    const isHex = colorKit.getFormat(text)?.includes('hex');
    hexColor.value = ''; // force update in case the value of `hexColor` didn't change
    if (isHex) {
      onChange(text);
      return;
    }
  };

  return (
    <WidgetTextInput
      inputStyle={inputStyle}
      textStyle={inputTitleStyle}
      textValue={hexColor}
      title='HEX'
      onEndEditing={onEndEditing}
      inputProps={inputProps}
      textKeyboard
    />
  );
}
