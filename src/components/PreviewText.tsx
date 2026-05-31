import usePickerContext from '@context';
import { styles } from '@styles';
import { isWeb } from '@utils';
import React from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedRef, useDerivedValue } from 'react-native-reanimated';

import type { PreviewTextProps } from '@types';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/** @see [PreviewText](https://alabsi91.github.io/reanimated-color-picker/api/preview/preview-text/) */
export function PreviewText({ style = {}, colorFormat = 'hex' }: PreviewTextProps) {
  const { colorResult: returnedResults, hueValue, saturationValue, brightnessValue, alphaValue } = usePickerContext();

  const inputRef = useAnimatedRef<TextInput>();

  const colorString = useDerivedValue(() => {
    const currentColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
      a: alphaValue.value,
    };

    if (isWeb && inputRef.current) {
      // @ts-expect-error value doesn't exist
      inputRef.current.value = returnedResults(currentColor)[colorFormat];
      return;
    }

    return returnedResults(currentColor)[colorFormat];
  }, [colorFormat, hueValue, saturationValue, brightnessValue, alphaValue]);

  const animatedProps = useAnimatedProps(() => {
    return { text: colorString.value, defaultValue: colorString.value } as never;
  }, [colorString]);

  return (
    <AnimatedTextInput
      ref={inputRef}
      underlineColorAndroid='transparent'
      editable={false}
      style={[styles.previewText, style]}
      animatedProps={animatedProps}
      pointerEvents={isWeb ? undefined : 'none'}
      id={'color-picker-preview-text-' + colorFormat}
      role='presentation'
      autoCapitalize='none'
      autoComplete='off'
      autoCorrect={false}
      focusable={false}
      autoFocus={false}
      tabIndex={-1}
      onFocus={() => inputRef.current?.blur()}
      readOnly
    />
  );
}
