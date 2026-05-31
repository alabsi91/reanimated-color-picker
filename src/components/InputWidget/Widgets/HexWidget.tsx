import React from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

export default function HexWidget(props: WidgetProps) {
  const {
    onChange,
    colorResult,
    hueValue,
    saturationValue,
    brightnessValue,
    alphaValue,
    inputStyle,
    inputTitleStyle,
    inputProps,
  } = props;

  const hexColor = useSharedValue(colorResult().hex);

  useDerivedValue(() => {
    const currentColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };

    hexColor.value = colorResult(currentColor).hex;
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  const onEndEditing = (text: string) => {
    text = text.startsWith('#') ? text : '#' + text;

    // Force update in case `hexColor` value has not changed
    hexColor.value = '';

    const isValidHex = colorKit.getFormat(text)?.includes('hex');
    if (isValidHex) {
      onChange(text);
    }
  };

  return (
    <WidgetTextInput
      inputStyle={inputStyle}
      textStyle={inputTitleStyle}
      textValue={hexColor}
      title='HEX'
      label='Hex color input'
      onEndEditing={onEndEditing}
      inputProps={inputProps}
      textKeyboard
    />
  );
}
