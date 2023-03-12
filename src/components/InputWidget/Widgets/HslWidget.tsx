import React, { useRef, useState } from 'react';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit/colorKit';
import { clamp } from '../../../utils';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '../../../types';

export default function HslWidget({
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
  const [hslValues, setHslValues] = useState(colorKit.HSL(returnedResults().hsla).object());

  const isFocesed = useRef(false);

  const updateText = () => {
    const { h, s, l, a } = colorKit.HSL(returnedResults().hsla).object();
    if (!isFocesed.current) setHslValues({ h, s, l, a });
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onHueChange = (text: string) => {
    let hue = +text;
    hue = clamp(isNaN(hue) ? 0 : hue, 360);
    setHslValues(prev => ({ ...prev, h: hue }));
    onChange(`hsla(${hue}, ${hslValues.s}%, ${hslValues.l}%, ${hslValues.a})`);
  };
  const onSaturationChange = (text: string) => {
    let saturation = +text;
    saturation = clamp(isNaN(saturation) ? 0 : saturation, 100);
    setHslValues(prev => ({ ...prev, s: saturation }));
    onChange(`hsla(${hslValues.h}, ${saturation}%, ${hslValues.l}%, ${hslValues.a})`);
  };
  const onLumChange = (text: string) => {
    let lum = +text;
    lum = clamp(isNaN(lum) ? 0 : lum, 100);
    setHslValues(prev => ({ ...prev, l: lum }));
    onChange(`hsla(${hslValues.h}, ${hslValues.s}%, ${lum}%, ${hslValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = parseFloat(text);
    alpha = clamp(isNaN(alpha) ? 0 : alpha, 1);
    setHslValues(prev => ({ ...prev, a: alpha }));
    onChange(`hsla(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%, ${alpha})`);
  };

  const onFocus = () => {
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
  };

  return (
    <>
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hslValues.h}
        title='H'
        onChange={onHueChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hslValues.s}
        title='S'
        onChange={onSaturationChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hslValues.l}
        title='L'
        onChange={onLumChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        value={hslValues.a}
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
