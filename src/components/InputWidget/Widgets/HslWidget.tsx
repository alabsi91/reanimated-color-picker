import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import { clamp } from '../../../GlobalStyles';
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
  const alphaInputRef = useRef<TextInput>(null!);

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
    hue = clamp(isNaN(hue) ? 0 : hue, 360);
    setHslValues(prev => ({ ...prev, h: hue }));
    onChange(`hsla(${hue}, ${hslValues.s}%, ${hslValues.l}%, ${hslValues.a})`);
  };
  const onSaturationChange = (text: string) => {
    let saturation = +text;
    saturation = clamp(isNaN(saturation) ? 0 : saturation, 100);
    setHslValues(prev => ({ ...prev, s: saturation }));
    onChange(`hsla(${hslValues.h}, ${saturation}%, ${hslValues.l}%, ${hslValues.a})`);
  };
  const onLumChange = (text: string) => {
    let lum = +text;
    lum = clamp(isNaN(lum) ? 0 : lum, 100);
    setHslValues(prev => ({ ...prev, l: lum }));
    onChange(`hsla(${hslValues.h}, ${hslValues.s}%, ${lum}%, ${hslValues.a})`);
  };
  const onAlphaChange = (text: string) => {
    let alpha = parseFloat(text);
    alpha = clamp(isNaN(alpha) ? 0 : alpha, 1);
    setHslValues(prev => ({ ...prev, a: alpha }));
    onChange(`hsla(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%, ${alpha})`);
  };

  const onFocus = () => {
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
    if (!hslValues.a) alphaInputRef.current.setNativeProps({ text: hslValues.a + '' || '0' });
  };

  useEffect(() => {
    alphaInputRef.current.setNativeProps({ text: hslValues.a + '' || '0' });
  }, [hslValues.a]);

  return (
    <>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={hslValues.h + ''}
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
          value={hslValues.s + ''}
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
          keyboardType='number-pad'
          value={hslValues.l + ''}
          onChangeText={onLumChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete='off'
          autoCorrect={false}
          selectTextOnFocus
        />
        <Text style={[styles.inputTitle, inputTitleStyle]}>L</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          ref={alphaInputRef}
          style={[styles.input, inputStyle]}
          defaultValue={hslValues.a + ''}
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
