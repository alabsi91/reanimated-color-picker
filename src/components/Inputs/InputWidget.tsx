import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { AccessibilityInfo, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import usePickerContext from '@context';
import { styles } from '@styles';
import { ConditionalRendering, getStyle } from '@utils';
import { useApplyTypedColor } from './useApplyTypedColor';
import HexWidget from './Widgets/HexWidget';
import HslWidget from './Widgets/HslWidget';
import HsvWidget from './Widgets/HsvWidget';
import HwbWidget from './Widgets/HwbWidget';
import RgbWidget from './Widgets/RgbWidget';

import type { InputWidgetProps, InputWidgetRef } from '@types';

const defaultFormats = ['HEX', 'RGB', 'HSL', 'HWB', 'HSV'] as const;

const widgets = {
  HEX: HexWidget,
  RGB: RgbWidget,
  HSL: HslWidget,
  HWB: HwbWidget,
  HSV: HsvWidget,
};

function InputWidgetWrapper(props: InputWidgetProps, ref: React.ForwardedRef<InputWidgetRef>) {
  const {
    defaultFormat = 'HEX',
    formats = defaultFormats,
    iconColor = 'black',
    disableAlphaChannel = false,
    containerStyle = {},
    inputStyle = {},
    inputTitleStyle = {},
    iconStyle = {},
    cycleButtonStyle,
    renderCycleButton,
    onFormatChange,
    inputProps = {},
    cycleButtonAccessibilityHint,
    cycleButtonAccessibilityLabel = 'Cycle inputs color format',
  } = props;

  const { colorResult, hueValue, saturationValue, brightnessValue, alphaValue } = usePickerContext();

  const [format, setFormat] = useState<typeof defaultFormat>(
    formats.includes(defaultFormat) ? defaultFormat : (formats[0] ?? 'HEX'),
  );

  const onChange = useApplyTypedColor(disableAlphaChannel);

  const cycleFormat = () => {
    const index = formats.indexOf(format);
    const nextFormat = formats[(index + 1) % formats.length];

    setFormat(nextFormat);
    onFormatChange?.(nextFormat);
    AccessibilityInfo.announceForAccessibility(nextFormat);
  };

  useImperativeHandle(ref, () => ({ cycleFormat }));

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

  const Widget = widgets[format];

  const gap = getStyle(containerStyle, 'gap') ?? 5;
  const buttonIconStyle = StyleSheet.flatten([styles.arrowButton, iconStyle]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputsWrapper, { gap }]}>
        <Widget {...inputsProps} />
      </View>

      <ConditionalRendering if={formats.length > 1}>
        <Pressable
          onPress={cycleFormat}
          style={[styles.cycleButton, cycleButtonStyle]}
          accessibilityLabel={cycleButtonAccessibilityLabel}
          accessibilityHint={cycleButtonAccessibilityHint}
        >
          {renderCycleButton?.({ format }) ?? (
            <Image style={buttonIconStyle} tintColor={iconColor} source={require('@assets/arrow-icon.png')} />
          )}

          <Text style={styles.inputTitle} aria-hidden>
            {' '}
          </Text>
        </Pressable>
      </ConditionalRendering>
    </View>
  );
}

/** @see [InputWidget](https://alabsi91.github.io/reanimated-color-picker/components/inputs/input-widget/) */
export const InputWidget = forwardRef<InputWidgetRef, InputWidgetProps>(InputWidgetWrapper);
