import React, { useMemo } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { clamp, ConditionalRendering } from '@utils';
import WidgetTextInput from './WidgetTextInput';

import type { WidgetProps } from '@types';

export default function HwbWidget(props: WidgetProps) {
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

  const { value } = usePickerContext();

  const initialHwb = useMemo(() => colorKit.HWB(value).object(), [value]);

  const h = useSharedValue(initialHwb.h.toString());
  const w = useSharedValue(initialHwb.w.toString());
  const b = useSharedValue(initialHwb.b.toString());
  const a = useSharedValue(initialHwb.a.toString());

  useDerivedValue(() => {
    const currentColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };

    const hwb = colorKit.runOnUI().HWB(colorResult(currentColor).hwba).object(false);

    h.value = hwb.h.toString();
    w.value = hwb.w.toString();
    b.value = hwb.b.toString();
    a.value = hwb.a.toString();
  }, [hueValue, saturationValue, brightnessValue, alphaValue]);

  const onHueEndEditing = (text: string) => {
    const hue = clamp(+text, 360);

    // Force update in case `h` value has not changed
    h.value = '';

    onChange({ h: hue, w: +w.value, b: +b.value, a: +a.value });
  };

  const onWhiteEndEditing = (text: string) => {
    const whiteness = clamp(+text, 100);
    w.value = '';
    onChange({ h: +h.value, w: whiteness, b: +b.value, a: +a.value });
  };

  const onBlackEndEditing = (text: string) => {
    const blackness = clamp(+text, 100);
    b.value = '';
    onChange({ h: +h.value, w: +w.value, b: blackness, a: +a.value });
  };

  const onAlphaEndEditing = (text: string) => {
    const alpha = clamp(+text, 1);
    a.value = '';
    onChange({ h: +h.value, w: +w.value, b: +b.value, a: alpha });
  };

  return (
    <>
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={h}
        title='H'
        label='Hue channel in HWB color format'
        onEndEditing={onHueEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={w}
        title='W'
        label='Whiteness channel in HWB color format'
        onEndEditing={onWhiteEndEditing}
        inputProps={inputProps}
      />
      <WidgetTextInput
        inputStyle={inputStyle}
        textStyle={inputTitleStyle}
        textValue={b}
        title='B'
        label='Blackness channel in HWB color format'
        onEndEditing={onBlackEndEditing}
        inputProps={inputProps}
      />
      <ConditionalRendering if={!disableAlphaChannel}>
        <WidgetTextInput
          inputStyle={inputStyle}
          textStyle={inputTitleStyle}
          textValue={a}
          title='A'
          label='Alpha channel in HWB color format'
          onEndEditing={onAlphaEndEditing}
          inputProps={inputProps}
          decimal
        />
      </ConditionalRendering>
    </>
  );
}
