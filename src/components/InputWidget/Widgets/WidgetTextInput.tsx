import React, { useEffect, useRef } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';

import { styles } from '@styles';
import { isWeb } from '@utils';

import type { InputProps } from '@types';
import type { NativeSyntheticEvent, StyleProp, TextInputSubmitEditingEventData, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

type Props = {
  textValue: SharedValue<string>;
  textKeyboard?: boolean;
  decimal?: boolean;
  title: string;
  inputStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  onEndEditing: (text: string) => void;
  inputProps: InputProps;
};

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function WidgetTextInput({
  textValue,
  decimal = false,
  textKeyboard = false,
  title,
  inputStyle,
  textStyle,
  inputProps,
  onEndEditing,
}: Props) {
  const inputRef = useRef<TextInput | null>(null);

  const animatedProps = useAnimatedProps(() => ({ text: textValue.value } as never), [textValue]);

  const submit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const text = e.nativeEvent.text;

    // number input mode
    if (decimal || !textKeyboard) {
      const num = parseFloat(text);
      if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
        textValue.value = ''; // reset input
        return;
      }
    }

    onEndEditing(text);
  };

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      if (!inputRef.current) return;
      inputRef.current.blur();
    });

    return () => hideSubscription.remove();
  }, []);

  // for web platform only
  useDerivedValue(() => {
    if (!isWeb || !inputRef.current) return;

    // @ts-expect-error value doesn't exist
    inputRef.current.value = textValue.value;
  }, [textValue]);

  return (
    <View style={styles.inputsContainer}>
      <AnimatedTextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        defaultValue={textValue.value}
        maxLength={decimal ? 4 : textKeyboard ? 9 : 3}
        onEndEditing={submit}
        onBlur={e => {
          if (isWeb) submit(e);
        }}
        enterKeyHint='enter'
        returnKeyType='done'
        keyboardType={decimal ? 'decimal-pad' : textKeyboard ? 'default' : 'number-pad'}
        inputMode={decimal ? 'decimal' : textKeyboard ? 'text' : 'numeric'}
        autoComplete='off'
        autoCorrect={false}
        autoFocus={false}
        {...inputProps}
        selectTextOnFocus={!textKeyboard}
        animatedProps={animatedProps}
      />
      <Text style={[styles.inputTitle, textStyle]}>{title}</Text>
    </View>
  );
}
