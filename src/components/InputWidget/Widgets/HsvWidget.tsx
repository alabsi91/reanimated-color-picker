import React, { useRef, useState } from 'react';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import WidgetTextInput from './WidgetTextInput';
import colorKit from '@colorKit';
import { clamp, ConditionalRendering } from '@utils';

import type { WidgetProps } from '@types';

export default function HsvWidget({
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
  const [hsvValues, setHsvValues] = useState(colorKit.HSV(returnedResults().hsva).object());

  const isFocused = useRef(false);

  const updateText = () => {
    const { h, s, v, a } = colorKit.HSV(returnedResults().hsva).object();
    if (!isFocused.current) setHsvValues({ h, s, v, a });
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onHueChange = (text: string) => {
    let hue = +text;
    hue = clamp(isNaN(hue) ? 0 : hue, 360);
    setHsvValues(prev => ({ ...prev, h: hue }));
    onChange(`hsva(${hue}, ${hsvValues.s}%, ${hsvValues.v}%, ${hsvValues.a})`);
  };
  const onSaturationChange = (text: string) => {
    let saturation = +text;
    saturation = clamp(isNaN(saturation) ? 0 : saturation, 100);
    setHsvValues(prev => ({ ...prev, s: saturation }));
    onChange(`hsva(${hsvValues.h}, ${saturation}%, ${hsvValues.v}%, ${hsvValues.a})`);
  };
  const onValueChange = (text: string) => {
    let value = +text;
    value = clamp(isNaN(value) ? 0 : value, 100);
    setHsvValues(prev => ({ ...prev, v: value }));
    onChange(`hsva(${hsvValues.h}, ${hsvValues.s}%, ${value}%, ${hsvValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = parseFloat(text);
    alpha = clamp(isNaN(alpha) ? 0 : alpha, 1);
    setHsvValues(prev => ({ ...prev, a: alpha }));
    onChange(`hsva(${hsvValues.h}, ${hsvValues.s}%, ${hsvValues.v}%, ${alpha})`);
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
        value={hsvValues.h}
        title='H'
        onChange={onHueChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hsvValues.s}
        title='S'
        onChange={onSaturationChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hsvValues.v}
        title='V'
        onChange={onValueChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <ConditionalRendering render={!disableAlphaChannel}>
        <WidgetTextInput
          inputStyle={inputStyle}
          textStyle={inputTitleStyle}
          value={hsvValues.a}
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
