import React, { useRef, useState } from 'react';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { clamp } from '@utils';
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
}: WidgetProps) {
  const [rgbValues, setRgbValues] = useState(colorKit.RGB(returnedResults().rgba).object());

  const isFocused = useRef(false);

  const updateText = () => {
    const { r, g, b, a } = colorKit.RGB(returnedResults().rgba).object();
    if (!isFocused.current) setRgbValues({ r, g, b, a });
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onRedChange = (text: string) => {
    let red = +text;
    red = clamp(isNaN(red) ? 0 : red, 255);
    setRgbValues(prev => ({ ...prev, r: red }));
    onChange(`rgba(${red}, ${rgbValues.g}, ${rgbValues.b}, ${rgbValues.a})`);
  };
  const onGreenChange = (text: string) => {
    let green = +text;
    green = clamp(isNaN(green) ? 0 : green, 255);
    setRgbValues(prev => ({ ...prev, g: green }));
    onChange(`rgba(${rgbValues.r}, ${green}, ${rgbValues.b}, ${rgbValues.a})`);
  };
  const onBlueChange = (text: string) => {
    let blue = +text;
    blue = clamp(isNaN(blue) ? 0 : blue, 255);
    setRgbValues(prev => ({ ...prev, b: blue }));
    onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${blue}, ${rgbValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = parseFloat(text);
    alpha = clamp(isNaN(alpha) ? 0 : alpha, 1);
    setRgbValues(prev => ({ ...prev, a: alpha }));
    onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`);
  };

  const onFocus = () => {
    isFocused.current = true;
  };
  const onBlur = () => {
    isFocused.current = false;
  };

  return (
    <>
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={rgbValues.r}
        title='R'
        onChange={onRedChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={rgbValues.g}
        title='G'
        onChange={onGreenChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={rgbValues.b}
        title='B'
        onChange={onBlueChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={rgbValues.a}
        title='A'
        onChange={onAlphaChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
        decimal
      />
    </>
  );
}
