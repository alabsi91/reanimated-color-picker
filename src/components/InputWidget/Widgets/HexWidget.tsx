import React, { useRef, useState } from 'react';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import { WidgetProps } from '../../../types';
import WidgetTextInput from './WidgetTextInput';

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

  const isFocesed = useRef(false);

  const updateText = () => {
    if (!isFocesed.current) setHexColorText(returnedResults().hex);
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
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
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
