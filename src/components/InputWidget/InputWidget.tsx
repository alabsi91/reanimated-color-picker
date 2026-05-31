import React, { useState } from 'react';
import { AccessibilityInfo, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import { ConditionalRendering, getStyle } from '@utils';
import HexWidget from './Widgets/HexWidget';
import HslWidget from './Widgets/HslWidget';
import HsvWidget from './Widgets/HsvWidget';
import HwbWidget from './Widgets/HwbWidget';
import RgbWidget from './Widgets/RgbWidget';

import type { InputWidgetProps } from '@types';
import type { SupportedColorFormats } from '../../colorKit/types';

const defaultFormats = ['HEX', 'RGB', 'HSL', 'HWB', 'HSV'] as const;

/** @see [InputWidget](https://alabsi91.github.io/reanimated-color-picker/api/preview/input-widget/) */
export function InputWidget(props: InputWidgetProps) {
  const {
    defaultFormat = 'HEX',
    formats = defaultFormats,
    iconColor = 'black',
    disableAlphaChannel = false,
    containerStyle = {},
    inputStyle = {},
    inputTitleStyle = {},
    iconStyle = {},
    inputProps = {},
    cycleButtonAccessibilityHint,
    cycleButtonAccessibilityLabel = 'Cycle inputs color format',
  } = props;

  const { setColor, colorResult, hueValue, saturationValue, brightnessValue, alphaValue, onGestureChange, onGestureEnd } =
    usePickerContext();

  const [format, setFormat] = useState<typeof defaultFormat>(
    formats.includes(defaultFormat) ? defaultFormat : (formats[0] ?? 'HEX'),
  );

  const onChange = (color: SupportedColorFormats) => {
    const isHex = colorKit.getFormat(color)?.includes('hex');

    if (disableAlphaChannel && isHex) {
      color = colorKit.setAlpha(color, 1).hsv().object(false);
    }

    setColor(color, 0);
    onGestureChange(color);
    onGestureEnd(color);
  };

  const cycle = () => {
    const index = formats.indexOf(format);
    const nextIndex = (index + 1) % formats.length;
    setFormat(formats[nextIndex]);
    AccessibilityInfo.announceForAccessibility(formats[nextIndex]);
  };

  const inputsProps = {
    onChange,
    colorResult,
    hueValue,
    saturationValue,
    brightnessValue,
    alphaValue,
    inputStyle,
    inputTitleStyle,
    inputProps,
    disableAlphaChannel,
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

      <ConditionalRendering if={formats.length > 1}>
        <View style={{ width: iconWidth, marginLeft: 10 }}>
          <Pressable
            onPress={cycle}
            accessibilityLabel={cycleButtonAccessibilityLabel}
            accessibilityHint={cycleButtonAccessibilityHint}
          >
            <Image style={buttonIconStyle} tintColor={iconColor} source={require('@assets/arrow-icon.png')} />
          </Pressable>

          <Text style={styles.inputTitle} aria-hidden>
            {' '}
          </Text>
        </View>
      </ConditionalRendering>
    </View>
  );
}
