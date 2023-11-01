import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';

import { styles } from '@styles';
import { clamp } from '@utils';

import type { InputProps } from '@types';
import type { StyleProp, TextStyle } from 'react-native';

type Props = {
  value: number | string;
  textKeyboard?: boolean;
  decimal?: boolean;
  title: string;
  inputStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  onBlur: () => void;
  onFocus: () => void;
  onChange: (text: string) => void;
  inputProps: InputProps;
};

export default function WidgetTextInput({
  value,
  decimal = false,
  textKeyboard = false,
  title,
  inputStyle,
  textStyle,
  inputProps,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  const [textValue, setTextValue] = useState(value + '');
  const inputRef = useRef<TextInput>(null!);

  const onTextValueChange = (text: string) => {
    const regex = /^(\d*\.?\d{0,2}|\.\d{1,2})$/;
    const numberValue = parseFloat(text);
    if (isNaN(numberValue) || !regex.test(text)) text = '0';
    if (numberValue < 0 || numberValue > 1) text = clamp(numberValue, 1).toString();
    if (!text.includes('.') && text.length > 1) text = text[1];
    setTextValue(text);
    onChange(text);
  };

  useEffect(() => {
    if (decimal) setTextValue(value + '');
  }, [value]);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      inputRef.current.blur();
    });

    return () => hideSubscription.remove();
  }, []);

  return (
    <View style={styles.inputsContainer}>
      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        value={decimal ? textValue : value + ''}
        maxLength={decimal ? 4 : textKeyboard ? 9 : 3}
        onChangeText={decimal ? onTextValueChange : onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        keyboardType={decimal ? 'decimal-pad' : textKeyboard ? 'default' : 'number-pad'}
        inputMode={decimal ? 'decimal' : textKeyboard ? 'text' : 'numeric'}
        autoComplete='off'
        autoCorrect={false}
        {...inputProps}
        selectTextOnFocus={!textKeyboard}
      />
      <Text style={[styles.inputTitle, textStyle]}>{title}</Text>
    </View>
  );
}
