import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import { clamp } from '../../../utils';
import { WidgetProps } from '../types';
import styles from '../style';

export default function RgbWidget({
  onChange,
  returnedResults,
  hueValue,
  saturationValue,
  brightnessValue,
  alphaValue,
  inputStyle,
  inputTitleStyle,
}: WidgetProps) {
  const [rgbValues, setRgbValues] = useState(colorKit.RGB(returnedResults().rgba).object());

  const isFocesed = useRef(false);
  const alphaInputRef = useRef<TextInput>(null!);

  const updateText = () => {
    const { r, g, b, a } = colorKit.RGB(returnedResults().rgba).object();
    if (!isFocesed.current) setRgbValues({ r, g, b, a });
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onRedChange = (text: string) => {
    let red = +text;
    red = clamp(isNaN(red) ? 0 : red, 255);
    setRgbValues(prev => ({ ...prev, r: red }));
    onChange(`rgba(${red}, ${rgbValues.g}, ${rgbValues.b}, ${rgbValues.a})`);
  };
  const onGreenChange = (text: string) => {
    let green = +text;
    green = clamp(isNaN(green) ? 0 : green, 255);
    setRgbValues(prev => ({ ...prev, g: green }));
    onChange(`rgba(${rgbValues.r}, ${green}, ${rgbValues.b}, ${rgbValues.a})`);
  };
  const onBlueChange = (text: string) => {
    let blue = +text;
    blue = clamp(isNaN(blue) ? 0 : blue, 255);
    setRgbValues(prev => ({ ...prev, b: blue }));
    onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${blue}, ${rgbValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = parseFloat(text);
    alpha = clamp(isNaN(alpha) ? 0 : alpha, 1);
    setRgbValues(prev => ({ ...prev, a: alpha }));
    onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`);
  };

  const onFocus = () => {
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
    alphaInputRef.current.setNativeProps({ text: clamp(rgbValues.a, 1) + '' });
  };

  useEffect(() => {
    alphaInputRef.current.setNativeProps({ text: rgbValues.a + '' || '0' });
  }, [rgbValues.a]);

  return (
    <>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={rgbValues.r + ''}
          onChangeText={onRedChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='number-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>R</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={rgbValues.g + ''}
          onChangeText={onGreenChange}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType='number-pad'
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>G</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={rgbValues.b + ''}
          onChangeText={onBlueChange}
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
          defaultValue={rgbValues.a + ''}
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
