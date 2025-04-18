import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedRef, useDerivedValue } from 'react-native-reanimated';

import usePickerContext from '@context';
import { styles } from '@styles';
import { isWeb } from '@utils';

import type { PreviewTextProps } from '@types';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function PreviewText({ style = {}, colorFormat = 'hex' }: PreviewTextProps) {
  const { returnedResults, hueValue, saturationValue, brightnessValue, alphaValue } = usePickerContext();

  const inputRef = useAnimatedRef<TextInput>();

  const [defaultValue, setDefaultValue] = useState('');

  useEffect(() => {
    setDefaultValue(returnedResults()[colorFormat]);
  }, []);

  const colorString = useDerivedValue(() => {
    [colorFormat, hueValue, saturationValue, brightnessValue, alphaValue]; // track changes on Native

    if (isWeb && inputRef.current) {
      // @ts-expect-error value doesn't exist
      inputRef.current.value = returnedResults()[colorFormat];
      return;
    }

    return returnedResults()[colorFormat];
  }, [colorFormat, hueValue, saturationValue, brightnessValue, alphaValue]); // track changes on WEB

  const animatedProps = useAnimatedProps(() => ({ text: colorString.value }) as never, [colorString]);

  return (
    <AnimatedTextInput
      ref={inputRef}
      underlineColorAndroid='transparent'
      editable={false}
      defaultValue={defaultValue}
      style={[styles.previewText, style]}
      animatedProps={animatedProps}
      pointerEvents='none'
    />
  );
}
