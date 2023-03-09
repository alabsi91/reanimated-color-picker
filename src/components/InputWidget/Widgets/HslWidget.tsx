import React, { useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import { clamp } from '../../../utils';
import { WidgetProps } from '../types';
import styles from '../style';

export default function HslWidget({
  onChange,
  returnedResults,
  hueValue,
  saturationValue,
  brightnessValue,
  alphaValue,
  inputStyle,
  inputTitleStyle,
}: WidgetProps) {
  const [hslValues, setHslValues] = useState(colorKit.HSL(returnedResults().hsla).object());

  const isFocesed = useRef(false);

  const updateText = () => {
    const { h, s, l, a } = colorKit.HSL(returnedResults().hsla).object();
    if (!isFocesed.current) setHslValues({ h, s, l, a });
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onHueChange = (text: string) => {
    let hue = +text;
    if (typeof hue !== 'number' || isNaN(hue)) return;
    hue = clamp(hue, 360);
    setHslValues(prev => ({ ...prev, h: hue }));
    onChange(`hsla(${hue}, ${hslValues.s}%, ${hslValues.l}%, ${hslValues.a})`);
  };
  const onSaturationChange = (text: string) => {
    let saturation = +text;
    if (typeof saturation !== 'number' || isNaN(saturation)) return;
    saturation = clamp(saturation, 100);
    setHslValues(prev => ({ ...prev, s: saturation }));
    onChange(`hsla(${hslValues.h}, ${saturation}%, ${hslValues.l}%, ${hslValues.a})`);
  };
  const onLumChange = (text: string) => {
    let lum = +text;
    if (typeof lum !== 'number' || isNaN(lum)) return;
    lum = clamp(lum, 100);
    setHslValues(prev => ({ ...prev, l: lum }));
    onChange(`hsla(${hslValues.h}, ${hslValues.s}%, ${lum}%, ${hslValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = +text;
    if (typeof alpha !== 'number' || isNaN(alpha)) return;
    alpha = clamp(alpha, 1);
    setHslValues(prev => ({ ...prev, a: alpha }));
    onChange(`hsla(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%, ${alpha})`);
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
          value={hslValues.h + ''}
          onChangeText={onHueChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>H</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hslValues.s + ''}
          onChangeText={onSaturationChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>S</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hslValues.l + ''}
          onChangeText={onLumChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>L</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType='number-pad'
          value={hslValues.a + ''}
          onChangeText={onAlphaChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>A</Text>
      </View>
    </>
  );
}
