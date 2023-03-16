import React, { useRef, useState } from 'react';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import WidgetTextInput from './WidgetTextInput';
import colorKit from '@colorKit';

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
  const [hexColor, setHexColorText] = useState(returnedResults().hex);

  const isFocused = useRef(false);

  const updateText = () => {
    if (!isFocused.current) setHexColorText(returnedResults().hex);
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onTextChange = (text: string) => {
    setHexColorText(text);
    const isHex = colorKit.getFormat(text)?.includes('hex');
    if (isHex) onChange(text);
  };

  const onFocus = () => {
    isFocused.current = true;
  };
  const onBlur = () => {
    isFocused.current = false;
    const isHex = colorKit.getFormat(hexColor)?.includes('hex');
    if (isHex) return;
    setHexColorText(returnedResults().hex);
  };
  return (
    <WidgetTextInput
      inputStyle={inputStyle}
      textStyle={inputTitleStyle}
      value={hexColor}
      title='HEX'
      onChange={onTextChange}
      onBlur={onBlur}
      onFocus={onFocus}
      inputProps={inputProps}
      textKeyboard
    />
  );
}
