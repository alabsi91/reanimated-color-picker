import React, { useRef, useState } from 'react';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { clamp, ConditionalRendering } from '@utils';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

export default function HwbWidget({
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
  const [hwbValues, setHwbValues] = useState(colorKit.HWB(returnedResults().hwba).object());

  const isFocused = useRef(false);

  const updateText = () => {
    const { h, w, b, a } = colorKit.HWB(returnedResults().hwba).object();
    if (!isFocused.current) setHwbValues({ h, w, b, a });
  };

  useDerivedValue(() => {
    [hueValue, saturationValue, brightnessValue, alphaValue]; // track changes on Native
    runOnJS(updateText)();
  }, [hueValue, saturationValue, brightnessValue, alphaValue]); // track changes on WEB

  const onHueChange = (text: string) => {
    let hue = +text;
    hue = clamp(isNaN(hue) ? 0 : hue, 360);
    setHwbValues(prev => ({ ...prev, h: hue }));
    onChange(`hwba(${hue}, ${hwbValues.w}%, ${hwbValues.b}%, ${hwbValues.a})`);
  };
  const onWhiteChange = (text: string) => {
    let whiteness = +text;
    whiteness = clamp(isNaN(whiteness) ? 0 : whiteness, 100);
    setHwbValues(prev => ({ ...prev, w: whiteness }));
    onChange(`hwba(${hwbValues.h}, ${whiteness}%, ${hwbValues.b}%, ${hwbValues.a})`);
  };
  const onBlackChange = (text: string) => {
    let blackness = +text;
    blackness = clamp(isNaN(blackness) ? 0 : blackness, 100);
    setHwbValues(prev => ({ ...prev, b: blackness }));
    onChange(`hwba(${hwbValues.h}, ${hwbValues.w}%, ${blackness}%, ${hwbValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = parseFloat(text);
    alpha = clamp(isNaN(alpha) ? 0 : alpha, 1);
    setHwbValues(prev => ({ ...prev, a: alpha }));
    onChange(`hwba(${hwbValues.h}, ${hwbValues.w}%, ${hwbValues.b}%, ${alpha})`);
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
        value={hwbValues.h}
        title='H'
        onChange={onHueChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hwbValues.w}
        title='W'
        onChange={onWhiteChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hwbValues.b}
        title='B'
        onChange={onBlackChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <ConditionalRendering if={!disableAlphaChannel}>
        <WidgetTextInput
          inputStyle={inputStyle}
          textStyle={inputTitleStyle}
          value={hwbValues.a}
          title='A'
          onChange={onAlphaChange}
          onBlur={onBlur}
          onFocus={onFocus}
          inputProps={inputProps}
          decimal
        />
      </ConditionalRendering>
    </>
  );
}
