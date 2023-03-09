import React, { useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import styles from '../style';
import { clamp } from '../../../GlobalStyles';
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
    if (typeof hue !== 'number' || isNaN(hue)) return;
    hue = clamp(hue, 360);
    setHsvValues(prev => ({ ...prev, h: hue }));
    onChange(`hsva(${hue}, ${hsvValues.s}%, ${hsvValues.v}%, ${hsvValues.a})`);
  };
  const onSaturationChange = (text: string) => {
    let saturation = +text;
    if (typeof saturation !== 'number' || isNaN(saturation)) return;
    saturation = clamp(saturation, 100);
    setHsvValues(prev => ({ ...prev, s: saturation }));
    onChange(`hsva(${hsvValues.h}, ${saturation}%, ${hsvValues.v}%, ${hsvValues.a})`);
  };
  const onValueChange = (text: string) => {
    let value = +text;
    if (typeof value !== 'number' || isNaN(value)) return;
    value = clamp(value, 100);
    setHsvValues(prev => ({ ...prev, v: value }));
    onChange(`hsva(${hsvValues.h}, ${hsvValues.s}%, ${value}%, ${hsvValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = +text;
    if (typeof alpha !== 'number' || isNaN(alpha)) return;
    alpha = clamp(alpha, 1);
    setHsvValues(prev => ({ ...prev, a: alpha }));
    onChange(`hsva(${hsvValues.h}, ${hsvValues.s}%, ${hsvValues.v}%, ${alpha})`);
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
          value={hsvValues.h + ''}
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
          value={hsvValues.s + ''}
          onChangeText={onSaturationChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>S</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hsvValues.v + ''}
          onChangeText={onValueChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>V</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hsvValues.a + ''}
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
