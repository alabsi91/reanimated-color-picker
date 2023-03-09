import React, { useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import { clamp } from '../../../GlobalStyles';
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
    if (typeof red !== 'number' || isNaN(red)) return;
    red = clamp(red, 255);
    setRgbValues(prev => ({ ...prev, r: red }));
    onChange(`rgba(${red}, ${rgbValues.g}, ${rgbValues.b}, ${rgbValues.a})`);
  };
  const onGreenChange = (text: string) => {
    let green = +text;
    if (typeof green !== 'number' || isNaN(green)) return;
    green = clamp(green, 255);
    setRgbValues(prev => ({ ...prev, g: green }));
    onChange(`rgba(${rgbValues.r}, ${green}, ${rgbValues.b}, ${rgbValues.a})`);
  };
  const onBlueChange = (text: string) => {
    let blue = +text;
    if (typeof blue !== 'number' || isNaN(blue)) return;
    blue = clamp(blue, 255);
    setRgbValues(prev => ({ ...prev, b: blue }));
    onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${blue}, ${rgbValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = +text;
    if (typeof alpha !== 'number' || isNaN(alpha)) return;
    alpha = clamp(alpha, 1);
    setRgbValues(prev => ({ ...prev, a: alpha }));
    onChange(`rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha})`);
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
          value={rgbValues.r + ''}
          onChangeText={onRedChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>R</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={rgbValues.g + ''}
          onChangeText={onGreenChange}
          onBlur={onBlur}
          onFocus={onFocus}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>G</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={rgbValues.b + ''}
          onChangeText={onBlueChange}
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
          value={rgbValues.a + ''}
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
