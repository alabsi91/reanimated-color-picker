import React, { useRef } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { clamp, ConditionalRendering } from '@utils';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

export default function HslWidget(props: WidgetProps) {
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
    disableAlphaChannel,
  } = props;

  const hsl = useRef(colorKit.HSL(colorResult().hsla).object(false));

  const h = useSharedValue(hsl.current.h.toString());
  const s = useSharedValue(hsl.current.s.toString());
  const l = useSharedValue(hsl.current.l.toString());
  const a = useSharedValue(hsl.current.a.toString());

  useDerivedValue(() => {
    const currentColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };

    hsl.current = colorKit.runOnUI().HSL(colorResult(currentColor).hsla).object(false);

    h.value = hsl.current.h.toString();
    s.value = hsl.current.s.toString();
    l.value = hsl.current.l.toString();
    a.value = hsl.current.a.toString();
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  const onHueEndEditing = (text: string) => {
    const hue = clamp(+text, 360);

    // Force update in case `h` value has not changed
    h.value = '';

    onChange({ h: hue, s: +s.value, l: +l.value, a: +a.value });
  };

  const onSaturationEndEditing = (text: string) => {
    const saturation = clamp(+text, 100);
    s.value = '';
    onChange({ h: +h.value, s: saturation, l: +l.value, a: +a.value });
  };

  const onLumEndEditing = (text: string) => {
    const lum = clamp(+text, 100);
    l.value = '';
    onChange({ h: +h.value, s: +s.value, l: lum, a: +a.value });
  };

  const onAlphaEndEditing = (text: string) => {
    const alpha = clamp(+text, 1);
    a.value = '';
    onChange({ h: +h.value, s: +s.value, l: +l.value, a: alpha });
  };

  return (
    <>
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={h}
        title='H'
        label='Hue channel in HSL color format'
        onEndEditing={onHueEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={s}
        title='S'
        label='Saturation channel in HSL color format'
        onEndEditing={onSaturationEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={l}
        title='L'
        label='Luminosity channel in HSL color format'
        onEndEditing={onLumEndEditing}
        inputProps={inputProps}
      />
      <ConditionalRendering if={!disableAlphaChannel}>
        <WidgetTextInput
          inputStyle={inputStyle}
          textStyle={inputTitleStyle}
          textValue={a}
          title='A'
          label='Alpha channel in HSL color format'
          onEndEditing={onAlphaEndEditing}
          inputProps={inputProps}
          decimal
        />
      </ConditionalRendering>
    </>
  );
}
