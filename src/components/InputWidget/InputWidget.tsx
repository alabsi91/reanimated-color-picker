import React, { useContext, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { styles } from '@styles';
import { ConditionalRendering, getStyle } from '@utils';
import pickerContext from '@context';
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
    useContext(pickerContext);

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

  const gap = getStyle(containerStyle, 'gap') ?? 5;
  const iconWidth = getStyle(iconStyle, 'width') ?? 24;
  const buttonIconStyle = StyleSheet.flatten([styles.arrowButton, iconStyle]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputsWrapper, { gap }]}>
        <Input />
      </View>

      <ConditionalRendering render={formats.length > 1}>
        <View style={{ width: iconWidth }}>
          <Pressable onPress={cycle}>
            <Image style={[buttonIconStyle, { tintColor: iconColor }]} source={require('@assets/arrow-icon.png')} />
          </Pressable>
          <Text style={styles.inputTitle}> </Text>
        </View>
      </ConditionalRendering>
    </View>
  );
}
