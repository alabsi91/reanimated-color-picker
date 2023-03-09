import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import styles from '../style';
import { clamp } from '../../../utils';
import { WidgetProps } from '../types';

export default function HsvWidget({
  onChange,
  returnedResults,
  hueValue,
  saturationValue,
  brightnessValue,
  alphaValue,
  inputStyle,
  inputTitleStyle,
}: WidgetProps) {
  const [hsvValues, setHsvValues] = useState(colorKit.HSV(returnedResults().hsva).object());

  const isFocesed = useRef(false);
  const alphaInputRef = useRef<TextInput>(null!);

  const updateText = () => {
    const { h, s, v, a } = colorKit.HSV(returnedResults().hsva).object();
    if (!isFocesed.current) setHsvValues({ h, s, v, a });
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
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
    if (!hsvValues.a) alphaInputRef.current.setNativeProps({ text: hsvValues.a + '' || '0' });
  };

  useEffect(() => {
    alphaInputRef.current.setNativeProps({ text: hsvValues.a + '' || '0' });
  }, [hsvValues.a]);
  return (
    <>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={hsvValues.h + ''}
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
          value={hsvValues.s + ''}
          onChangeText={onSaturationChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='number-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>S</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={hsvValues.v + ''}
          onChangeText={onValueChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='number-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>V</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          ref={alphaInputRef}
          style={[styles.input, inputStyle]}
          defaultValue={hsvValues.a + ''}
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
