import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import styles from '../style';
import { clamp } from '../../../utils';
import { WidgetProps } from '../types';

export default function HwbWidget({
  onChange,
  returnedResults,
  hueValue,
  saturationValue,
  brightnessValue,
  alphaValue,
  inputStyle,
  inputTitleStyle,
}: WidgetProps) {
  const [hwbValues, setHwbValues] = useState(colorKit.HWB(returnedResults().hwba).object());

  const isFocesed = useRef(false);
  const alphaInputRef = useRef<TextInput>(null!);

  const updateText = () => {
    const { h, w, b, a } = colorKit.HWB(returnedResults().hwba).object();
    if (!isFocesed.current) setHwbValues({ h, w, b, a });
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onHueChange = (text: string) => {
    let hue = +text;
    hue = clamp(isNaN(hue) ? 0 : hue, 360);
    setHwbValues(prev => ({ ...prev, h: hue }));
    onChange(`hwba(${hue}, ${hwbValues.w}%, ${hwbValues.b}%, ${hwbValues.a})`);
  };
  const onWhiteChange = (text: string) => {
    let whitness = +text;
    whitness = clamp(isNaN(whitness) ? 0 : whitness, 100);
    setHwbValues(prev => ({ ...prev, w: whitness }));
    onChange(`hwba(${hwbValues.h}, ${whitness}%, ${hwbValues.b}%, ${hwbValues.a})`);
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
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
    alphaInputRef.current.setNativeProps({ text: clamp(hwbValues.a, 1) + '' });
  };

  useEffect(() => {
    alphaInputRef.current.setNativeProps({ text: hwbValues.a + '' || '0' });
  }, [hwbValues.a]);

  return (
    <>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={hwbValues.h + ''}
          onChangeText={onHueChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='number-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>H</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={hwbValues.w + ''}
          onChangeText={onWhiteChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='number-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>W</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={hwbValues.b + ''}
          onChangeText={onBlackChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='number-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>B</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          ref={alphaInputRef}
          style={[styles.input, inputStyle]}
          defaultValue={hwbValues.a + ''}
          onChangeText={onAlphaChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='decimal-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>A</Text>
      </View>
    </>
  );
}
