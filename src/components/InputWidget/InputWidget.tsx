import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { styles } from '@styles';
import CTX from '@context';
import HexWidget from './Widgets/HexWidget';
import RgbWidget from './Widgets/RgbWidget';
import HslWidget from './Widgets/HslWidget';
import HwbWidget from './Widgets/HwbWidget';
import HsvWidget from './Widgets/HsvWidget';

import type { InputWidgetProps } from '@types';

const defaultFormats = ['HEX', 'RGB', 'HSL', 'HWB', 'HSV'] as const;

export function InputWidget({
  defaultFormat = 'HEX',
  formats = defaultFormats,
  iconColor = 'black',
  containerStyle = {},
  inputStyle = {},
  inputTitleStyle = {},
  iconStyle = {},
  inputProps = {},
}: InputWidgetProps) {
  const { setColor, returnedResults, hueValue, saturationValue, brightnessValue, alphaValue, onGestureChange, onGestureEnd } =
    useContext(CTX);

  const [format, setFormat] = useState<typeof defaultFormat>(
    formats.includes(defaultFormat) ? defaultFormat : formats[0] ?? 'HEX'
  );

  const onChange = (color: string) => {
    setColor(color);
    onGestureChange(color);
    onGestureEnd(color);
  };

  const cycle = () => {
    const index = formats.indexOf(format);
    const nextIndex = (index + 1) % formats.length;
    setFormat(formats[nextIndex]);
  };

  const inputsProps = {
    onChange,
    returnedResults,
    hueValue,
    saturationValue,
    brightnessValue,
    alphaValue,
    inputStyle,
    inputTitleStyle,
    inputProps,
  };
  const Input = () => {
    switch (format) {
      case 'HEX':
        return <HexWidget {...inputsProps} />;
      case 'RGB':
        return <RgbWidget {...inputsProps} />;
      case 'HSL':
        return <HslWidget {...inputsProps} />;
      case 'HWB':
        return <HwbWidget {...inputsProps} />;
      case 'HSV':
        return <HsvWidget {...inputsProps} />;
    }
  };

  const opacity = useSharedValue(0);
  const fadeStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  useEffect(() => {
    opacity.value = withSequence(withTiming(0, { duration: 0 }), withTiming(1));
  }, [format]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.inputsWrapper, fadeStyle]}>
        <Input />
      </Animated.View>
      {formats.length > 1 && (
        <View>
          <Pressable onPress={cycle}>
            <Image
              // @ts-expect-error
              tintColor={iconColor}
              style={[styles.arrowButton, iconStyle]}
              source={require('@assets/arrow-icon.png')}
            />
          </Pressable>
          <Text style={styles.inputTitle}> </Text>
        </View>
      )}
    </View>
  );
}
