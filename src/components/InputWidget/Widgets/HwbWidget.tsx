import React, { useRef, useState } from 'react';
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
    if (typeof hue !== 'number' || isNaN(hue)) return;
    hue = clamp(hue, 360);
    setHwbValues(prev => ({ ...prev, h: hue }));
    onChange(`hwba(${hue}, ${hwbValues.w}%, ${hwbValues.b}%, ${hwbValues.a})`);
  };
  const onWhiteChange = (text: string) => {
    let whitness = +text;
    if (typeof whitness !== 'number' || isNaN(whitness)) return;
    whitness = clamp(whitness, 100);
    setHwbValues(prev => ({ ...prev, w: whitness }));
    onChange(`hwba(${hwbValues.h}, ${whitness}%, ${hwbValues.b}%, ${hwbValues.a})`);
  };
  const onBlackChange = (text: string) => {
    let blackness = +text;
    if (typeof blackness !== 'number' || isNaN(blackness)) return;
    blackness = clamp(blackness, 100);
    setHwbValues(prev => ({ ...prev, b: blackness }));
    onChange(`hwba(${hwbValues.h}, ${hwbValues.w}%, ${blackness}%, ${hwbValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = +text;
    if (typeof alpha !== 'number' || isNaN(alpha)) return;
    alpha = clamp(alpha, 1);
    setHwbValues(prev => ({ ...prev, a: alpha }));
    onChange(`hwba(${hwbValues.h}, ${hwbValues.w}%, ${hwbValues.b}%, ${alpha})`);
  };

  const onFocus = () => {
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
  };
  return (
    <>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hwbValues.h + ''}
          onChangeText={onHueChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>H</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hwbValues.w + ''}
          onChangeText={onWhiteChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>W</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hwbValues.b + ''}
          onChangeText={onBlackChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>B</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hwbValues.a + ''}
          onChangeText={onAlphaChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>A</Text>
      </View>
    </>
  );
}
