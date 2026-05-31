import React, { useRef } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { clamp, ConditionalRendering } from '@utils';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

export default function HsvWidget(props: WidgetProps) {
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

  const hsv = useRef(colorKit.HSV(colorResult().hsva).object(false));

  const h = useSharedValue(hsv.current.h.toString());
  const s = useSharedValue(hsv.current.s.toString());
  const v = useSharedValue(hsv.current.v.toString());
  const a = useSharedValue(hsv.current.a.toString());

  useDerivedValue(() => {
    const currentColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };

    hsv.current = colorKit.runOnUI().HSV(colorResult(currentColor).hsva).object(false);

    h.value = hsv.current.h.toString();
    s.value = hsv.current.s.toString();
    v.value = hsv.current.v.toString();
    a.value = hsv.current.a.toString();
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  const onHueEndEditing = (text: string) => {
    const hue = clamp(+text, 360);

    // Force update in case `h` value has not changed
    h.value = '';

    onChange({ h: hue, s: +s.value, v: +v.value, a: +a.value });
  };

  const onSaturationEndEditing = (text: string) => {
    const saturation = clamp(+text, 100);
    s.value = '';
    onChange({ h: +h.value, s: saturation, v: +v.value, a: +a.value });
  };

  const onValueEndEditing = (text: string) => {
    const value = clamp(+text, 100);
    v.value = '';
    onChange({ h: +h.value, s: +s.value, v: value, a: +a.value });
  };

  const onAlphaEndEditing = (text: string) => {
    const alpha = clamp(+text, 1);
    a.value = '';
    onChange({ h: +h.value, s: +s.value, v: +v.value, a: alpha });
  };

  return (
    <>
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={h}
        title='H'
        label='Hue channel in HSV color format'
        onEndEditing={onHueEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={s}
        title='S'
        label='Saturation channel in HSV color format'
        onEndEditing={onSaturationEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={v}
        title='V'
        label='Brightness channel in HSV color format'
        onEndEditing={onValueEndEditing}
        inputProps={inputProps}
      />
      <ConditionalRendering if={!disableAlphaChannel}>
        <WidgetTextInput
          inputStyle={inputStyle}
          textStyle={inputTitleStyle}
          textValue={a}
          title='A'
          label='Alpha channel in HSV color format'
          onEndEditing={onAlphaEndEditing}
          inputProps={inputProps}
          decimal
        />
      </ConditionalRendering>
    </>
  );
}
