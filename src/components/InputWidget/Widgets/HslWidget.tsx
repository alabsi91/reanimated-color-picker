import React, { useRef } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { clamp, ConditionalRendering } from '@utils';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

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
  disableAlphaChannel,
}: WidgetProps) {
  const hsl = useRef(colorKit.HSL(returnedResults().hsla).object(false));

  const h = useSharedValue(hsl.current.h.toString());
  const s = useSharedValue(hsl.current.s.toString());
  const l = useSharedValue(hsl.current.l.toString());
  const a = useSharedValue(hsl.current.a.toString());

  useDerivedValue(() => {
    [hueValue, saturationValue, brightnessValue, alphaValue]; // track changes on Native
    hsl.current = colorKit.runOnUI().HSL(returnedResults().hsla).object(false);
    h.value = hsl.current.h.toString();
    s.value = hsl.current.s.toString();
    l.value = hsl.current.l.toString();
    a.value = hsl.current.a.toString();
  }, [hueValue, saturationValue, brightnessValue, alphaValue, h, s, l, a]); // track changes on WEB

  const onHueEndEditing = (text: string) => {
    const hue = clamp(+text, 360);
    h.value = ''; // force update in case the value of h didn't change
    onChange({ h: hue, s: +s.value, l: +l.value, a: +a.value });
  };

  const onSaturationEndEditing = (text: string) => {
    const saturation = clamp(+text, 100);
    s.value = ''; // force update in case the value of `s` didn't change
    onChange({ h: +h.value, s: saturation, l: +l.value, a: +a.value });
  };

  const onLumEndEditing = (text: string) => {
    const lum = clamp(+text, 100);
    l.value = ''; // force update in case the value of `l` didn't change
    onChange({ h: +h.value, s: +s.value, l: lum, a: +a.value });
  };

  const onAlphaEndEditing = (text: string) => {
    const alpha = clamp(+text, 1);
    a.value = ''; // force update in case the value of `a` didn't change
    onChange({ h: +h.value, s: +s.value, l: +l.value, a: alpha });
  };

  return (
    <>
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={h}
        title='H'
        onEndEditing={onHueEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={s}
        title='S'
        onEndEditing={onSaturationEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={l}
        title='L'
        onEndEditing={onLumEndEditing}
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
