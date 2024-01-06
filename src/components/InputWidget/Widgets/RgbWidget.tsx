import React, { useRef } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { clamp, ConditionalRendering } from '@utils';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

export default function RgbWidget({
  onChange,
  returnedResults,
  hueValue,
  saturationValue,
  brightnessValue,
  alphaValue,
  inputStyle,
  inputTitleStyle,
  inputProps,
  disableAlphaChannel,
}: WidgetProps) {
  const rgb = useRef(colorKit.RGB(returnedResults().rgba).object(false));

  const r = useSharedValue(rgb.current.r.toString());
  const g = useSharedValue(rgb.current.g.toString());
  const b = useSharedValue(rgb.current.b.toString());
  const a = useSharedValue(rgb.current.a.toString());

  useDerivedValue(() => {
    [hueValue, saturationValue, brightnessValue, alphaValue]; // track changes on Native
    rgb.current = colorKit.runOnUI().RGB(returnedResults().rgba).object(false);
    r.value = rgb.current.r.toString();
    g.value = rgb.current.g.toString();
    b.value = rgb.current.b.toString();
    a.value = rgb.current.a.toString();
  }, [hueValue, saturationValue, brightnessValue, alphaValue]); // track changes on WEB

  const onRedEndEditing = (text: string) => {
    const red = clamp(+text, 255);
    r.value = ''; // force update in case the value of `r` didn't change
    onChange({ r: red, g: +g.value, b: +b.value, a: +a.value });
  };

  const onGreenEndEditing = (text: string) => {
    const green = clamp(+text, 255);
    g.value = ''; // force update in case the value of `g` didn't change
    onChange({ r: +r.value, g: green, b: +b.value, a: +a.value });
  };

  const onBlueEndEditing = (text: string) => {
    const blue = clamp(+text, 255);
    b.value = ''; // force update in case the value of `b` didn't change
    onChange({ r: +r.value, g: +g.value, b: blue, a: +a.value });
  };

  const onAlphaEndEditing = (text: string) => {
    const alpha = clamp(parseFloat(text), 1);
    a.value = ''; // force update in case the value of `a` didn't change
    onChange({ r: +r.value, g: +g.value, b: +b.value, a: alpha });
  };

  return (
    <>
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={r}
        title='R'
        onEndEditing={onRedEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={g}
        title='G'
        onEndEditing={onGreenEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={b}
        title='B'
        onEndEditing={onBlueEndEditing}
        inputProps={inputProps}
      />
      <ConditionalRendering if={!disableAlphaChannel}>
        <WidgetTextInput
          inputStyle={inputStyle}
          textStyle={inputTitleStyle}
          textValue={a}
          title='A'
          onEndEditing={onAlphaEndEditing}
          inputProps={inputProps}
          decimal
        />
      </ConditionalRendering>
    </>
  );
}
