import React, { useRef } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

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
  const hwb = useRef(colorKit.HWB(returnedResults().hwba).object(false));

  const h = useSharedValue(hwb.current.h.toString());
  const w = useSharedValue(hwb.current.w.toString());
  const b = useSharedValue(hwb.current.b.toString());
  const a = useSharedValue(hwb.current.a.toString());

  useDerivedValue(() => {
    [hueValue, saturationValue, brightnessValue, alphaValue]; // track changes on Native
    hwb.current = colorKit.runOnUI().HWB(returnedResults().hwba).object(false);
    h.value = hwb.current.h.toString();
    w.value = hwb.current.w.toString();
    b.value = hwb.current.b.toString();
    a.value = hwb.current.a.toString();
  }, [hueValue, saturationValue, brightnessValue, alphaValue, h, w, b, a]); // track changes on WEB

  const onHueEndEditing = (text: string) => {
    const hue = clamp(+text, 360);
    h.value = ''; // force update in case the value of `h` didn't change
    onChange({ h: hue, w: +w.value, b: +b.value, a: +a.value });
  };

  const onWhiteEndEditing = (text: string) => {
    const whiteness = clamp(+text, 100);
    w.value = ''; // force update in case the value of `w` didn't change
    onChange({ h: +h.value, w: whiteness, b: +b.value, a: +a.value });
  };

  const onBlackEndEditing = (text: string) => {
    const blackness = clamp(+text, 100);
    b.value = ''; // force update in case the value of `b` didn't change
    onChange({ h: +h.value, w: +w.value, b: blackness, a: +a.value });
  };

  const onAlphaEndEditing = (text: string) => {
    const alpha = clamp(+text, 1);
    a.value = ''; // force update in case the value of `a` didn't change
    onChange({ h: +h.value, w: +w.value, b: +b.value, a: alpha });
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
        textValue={w}
        title='W'
        onEndEditing={onWhiteEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={b}
        title='B'
        onEndEditing={onBlackEndEditing}
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
