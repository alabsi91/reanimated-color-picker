import React, { useRef, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import colorKit from '../../../colorKit';
import styles from '../style';
import { WidgetProps } from '../types';

export default function HexWidget({
  onChange,
  returnedResults,
  hueValue,
  saturationValue,
  brightnessValue,
  alphaValue,
  inputStyle,
  inputTitleStyle,
}: WidgetProps) {
  const [colorText, setColorText] = useState(returnedResults().hex);

  const isFocesed = useRef(false);

  const updateText = () => {
    if (!isFocesed.current) setColorText(returnedResults().hex);
  };

  useDerivedValue(() => {
    [hueValue.value, saturationValue.value, brightnessValue.value, alphaValue.value]; // To track changes
    runOnJS(updateText)();
  }, []);

  const onTextChange = (text: string) => {
    setColorText(text);
    const isHex = colorKit.getFormat(text)?.includes('hex');
    if (isHex) onChange(text);
  };

  const onFocus = () => {
    isFocesed.current = true;
  };
  const onBlur = () => {
    isFocesed.current = false;
    const isHex = colorKit.getFormat(colorText)?.includes('hex');
    if (isHex) return;
    setColorText(returnedResults().hex);
  };
  return (
    <View style={styles.inputsContainer}>
      <TextInput
        style={[styles.input, inputStyle]}
        value={colorText}
        onChangeText={onTextChange}
        onBlur={onBlur}
        onFocus={onFocus}
        selectTextOnFocus
      />
      <Text style={[styles.inputTitle, inputTitleStyle]}>HEX</Text>
    </View>
  );
}
