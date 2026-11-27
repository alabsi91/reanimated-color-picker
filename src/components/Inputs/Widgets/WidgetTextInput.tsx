import React, { useEffect, useRef } from 'react';
import { Keyboard, Platform, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedRef, useDerivedValue } from 'react-native-reanimated';

import { styles } from '@styles';
import { ConditionalRendering, getWebDependencies, isWeb } from '@utils';

import type { InputProps } from '@types';
import type { BlurEvent, StyleProp, TextInputEndEditingEvent, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

interface WidgetTextInputProps {
  textValue: SharedValue<string>;
  textKeyboard?: boolean;
  decimal?: boolean;
  title: string;
  isTitleHidden?: boolean;
  label: string;
  inputStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  inputProps: InputProps;
  onEndEditing: (text: string) => void;
}

// Reanimated 3 needs `text` allowlisted for animated props; Reanimated 4 made this a no-op.
Animated.addWhitelistedNativeProps?.({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

let createdInputCount = 0;

export default function WidgetTextInput(props: WidgetTextInputProps) {
  const {
    textValue,
    decimal = false,
    textKeyboard = false,
    title,
    isTitleHidden = false,
    label,
    inputStyle,
    textStyle,
    inputProps,
    onEndEditing,
  } = props;

  const inputIdRef = useRef<string | null>(null);
  inputIdRef.current ??= `_c_${createdInputCount++}`;
  const inputRef = useAnimatedRef<TextInput>();

  const animatedProps = useAnimatedProps(
    () => ({ text: textValue.value, defaultValue: textValue.value }) as never,
    getWebDependencies([textValue]),
  );

  const submit = (e: TextInputEndEditingEvent | BlurEvent) => {
    // @ts-expect-error `text` doesn't exist on BlurEvent (It does)
    const text = e.nativeEvent.text;

    // number input mode
    if (decimal || !textKeyboard) {
      const number = parseFloat(text);
      if (typeof number !== 'number' || isNaN(number) || !isFinite(number)) {
        textValue.value = '';
        return;
      }
    }

    onEndEditing(text);
  };

  // Android hides the keyboard on the back button without a blur
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  // For web platform only
  useDerivedValue(
    () => {
      if (!isWeb || !inputRef.current) return;

      // @ts-expect-error value doesn't exist
      inputRef.current.value = textValue.value;
    },
    getWebDependencies([textValue]),
  );

  return (
    <View style={styles.inputsContainer}>
      <AnimatedTextInput
        ref={inputRef}
        id={inputIdRef.current}
        style={[styles.input, inputStyle]}
        maxLength={decimal ? 4 : textKeyboard ? 9 : 3} // length example: Alpha (1.55), RGB (255), Hue (360), Brightness (100), hex (#00000000)
        onEndEditing={submit}
        onBlur={isWeb ? submit : undefined}
        enterKeyHint='enter'
        returnKeyType='done'
        keyboardType={decimal ? 'decimal-pad' : textKeyboard ? 'default' : 'number-pad'}
        inputMode={decimal ? 'decimal' : textKeyboard ? 'text' : 'numeric'}
        autoComplete='off'
        autoCorrect={false}
        autoFocus={false}
        accessibilityLabel={label}
        {...inputProps}
        selectTextOnFocus={!textKeyboard}
        animatedProps={animatedProps}
      />

      <ConditionalRendering if={!isTitleHidden}>
        <Text style={[styles.inputTitle, textStyle]} accessibilityLabel={label}>
          {title}
        </Text>
      </ConditionalRendering>
    </View>
  );
}
