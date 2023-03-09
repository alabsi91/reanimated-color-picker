import React, { useContext, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';

import { CTX } from '../../GlobalStyles';
import HexWidget from './Widgets/HexWidget';
import RgbWidget from './Widgets/RgbWidget';
import HslWidget from './Widgets/HslWidget';
import HwbWidget from './Widgets/HwbWidget';
import HsvWidget from './Widgets/HsvWidget';
import styles from './style';

import type { InputWidgetProps } from './types';

const defaultFormats = ['HEX', 'RGB', 'HSL', 'HWB', 'HSV'] as const;

export function InputWidget({
  defaultFormat = 'HEX',
  formats = defaultFormats,
  iconColor = 'black',
  containerStyle = {},
  inputStyle = {},
  inputTitleStyle = {},
}: InputWidgetProps) {
  const { setColor, returnedResults, hueValue, saturationValue, brightnessValue, alphaValue } = useContext(CTX);

  const [format, setFormat] = useState<typeof defaultFormat>(
    formats.includes(defaultFormat) ? defaultFormat : formats[0] ?? 'HEX'
  );

  const onChange = (color: string) => {
    setColor(color);
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

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputsWrapper}>
        <Input />
      </View>
      {formats.length > 1 && (
        <View>
          <Pressable onPress={cycle}>
            {/* @ts-expect-error */}
            <Image tintColor={iconColor} style={styles.arrowButton} source={require('../../assets/arrow-icon.png')} />
          </Pressable>
          <Text style={styles.inputTitle} />
        </View>
      )}
    </View>
  );
}
