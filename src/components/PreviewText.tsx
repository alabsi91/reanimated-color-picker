import usePickerContext from '@context';
import { styles } from '@styles';
import { isWeb } from '@utils';
import React from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedRef, useDerivedValue } from 'react-native-reanimated';

import type { PreviewTextProps } from '@types';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function PreviewText({ style = {}, colorFormat = 'hex' }: PreviewTextProps) {
  const { returnedResults, hueValue, saturationValue, brightnessValue, alphaValue } = usePickerContext();

  const inputRef = useAnimatedRef<TextInput>();

  const colorString = useDerivedValue(() => {
    // Explicitly touch dependencies so Reanimated tracks them and doesn’t prune the worklet
    [colorFormat, hueValue, saturationValue, brightnessValue, alphaValue];

    if (isWeb && inputRef.current) {
      // @ts-expect-error value doesn't exist
      inputRef.current.value = returnedResults()[colorFormat];
      return;
    }

    return returnedResults()[colorFormat];
  }, [colorFormat, hueValue, saturationValue, brightnessValue, alphaValue]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: colorString.value,
      defaultValue: colorString.value,
    } as never;
  }, [colorString]);

  return (
    <AnimatedTextInput
      ref={inputRef}
      underlineColorAndroid='transparent'
      editable={false}
      style={[styles.previewText, style]}
      animatedProps={animatedProps}
      pointerEvents={isWeb ? undefined : 'none'}
    />
  );
}
