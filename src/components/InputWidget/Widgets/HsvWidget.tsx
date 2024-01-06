import React, { useRef } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { clamp, ConditionalRendering } from '@utils';
import WidgetTextInput from './WidgetTextInput';

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
  const hsv = useRef(colorKit.HSV(returnedResults().hsva).object(false));

  const h = useSharedValue(hsv.current.h.toString());
  const s = useSharedValue(hsv.current.s.toString());
  const v = useSharedValue(hsv.current.v.toString());
  const a = useSharedValue(hsv.current.a.toString());

  useDerivedValue(() => {
    [hueValue, saturationValue, brightnessValue, alphaValue]; // track changes on Native
    hsv.current = colorKit.runOnUI().HSV(returnedResults().hsva).object(false);
    h.value = hsv.current.h.toString();
    s.value = hsv.current.s.toString();
    v.value = hsv.current.v.toString();
    a.value = hsv.current.a.toString();
  }, [hueValue, saturationValue, brightnessValue, alphaValue, h, s, v, a]); // track changes on WEB

  const onHueEndEditing = (text: string) => {
    const hue = clamp(+text, 360);
    h.value = ''; // force update in case the value of `h` didn't change
    onChange({ h: hue, s: +s.value, v: +v.value, a: +a.value });
  };

  const onSaturationEndEditing = (text: string) => {
    const saturation = clamp(+text, 100);
    s.value = ''; // force update in case the value of `s` didn't change
    onChange({ h: +h.value, s: saturation, v: +v.value, a: +a.value });
  };

  const onValueEndEditing = (text: string) => {
    const value = clamp(+text, 100);
    v.value = ''; // force update in case the value of `v` didn't change
    onChange({ h: +h.value, s: +s.value, v: value, a: +a.value });
  };

  const onAlphaEndEditing = (text: string) => {
    const alpha = clamp(+text, 1);
    a.value = ''; // force update in case the value of `a` didn't change
    onChange({ h: +h.value, s: +s.value, v: +v.value, a: alpha });
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
        textValue={v}
        title='V'
        onEndEditing={onValueEndEditing}
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
