import React, { useRef, useEffect } from 'react';
import { I18nManager, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  COLOR_HSVA,
  CONTRAST_RATIO,
  HEX_FORMAT,
  HSLA_FORMAT,
  HSL_FORMAT,
  HSL_HEX,
  HSVA_FORMAT,
  HSV_FORMAT,
  RGBA_FORMAT,
  RGB_FORMAT,
} from './ColorsConversionFormulas';
import { CTX } from './GlobalStyles';

const isRtl = I18nManager.isRTL,
  CONTRAST_RATIO_MIN = 4.5;

export default function ColorPicker({
  slidersThickness = 25,
  thumbsSize = 25 * 1.4,
  value = '#418181',
  onChange,
  onComplete,
  style = {},
  children = <Text>NO CHILDREN</Text>,
}) {
  const isFirstRender = useRef(true);
  const initialColor = useRef(COLOR_HSVA(value));
  const previewColorFormat = useRef('hex');

  const hue = useRef(initialColor.current.h);
  const saturation = useRef(initialColor.current.s);
  const brightness = useRef(initialColor.current.b);
  const alpha = useRef(initialColor.current.a);

  const registeredHandles = useRef([]); // all handles props goes here.

  const color_hex = () =>
    HEX_FORMAT({
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    });

  const returnedResults = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    }
  ) => {
    return {
      hex: HEX_FORMAT(color),
      rgb: RGB_FORMAT(color),
      rgba: RGBA_FORMAT(color),
      hsl: HSL_FORMAT(color),
      hsla: HSLA_FORMAT(color),
      hsv: HSV_FORMAT(color),
      hsva: HSVA_FORMAT(color),
    };
  };

  const previewColor = useSharedValue(color_hex());
  const previewColorStyle = useAnimatedStyle(() => ({
    backgroundColor: previewColor.value,
  }));
  const previewColorWithoutOpacity = useAnimatedStyle(() => ({
    backgroundColor: previewColor.value.length > 7 ? previewColor.value.substring(0, 7) : previewColor.value,
  }));
  const activeHue = useSharedValue(HSL_HEX(hue.current, 100, 50));
  const activeHueStyle = useAnimatedStyle(() => ({ backgroundColor: activeHue.value }));

  const previewTextColor = useSharedValue('#ffffff'); // for result text color
  const previewText = useSharedValue(returnedResults()[previewColorFormat.current]); // for result text

  const previewTextColorStyle = useAnimatedStyle(() => ({ color: previewTextColor.value }));

  const onGestureEventFinish = () => {
    onComplete?.(returnedResults());
  };

  const updateBrightness = brightnessChannel => {
    brightness.current = brightnessChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on the contrast ratio
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;
    // update handles position.
    const brightnessHandles = registeredHandles.current.filter(setting => setting.channel === 'b');
    applySettings(brightnessHandles, false);
    // call onChange callback if exists.
    onChange?.(returnedResults());
  };

  const updateSaturation = saturationChannel => {
    saturation.current = saturationChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on the contrast ratio
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;
    // change handles position.
    const saturationHandles = registeredHandles.current.filter(setting => setting.channel === 's');
    applySettings(saturationHandles, false);
    // call onChange callback if exists.
    onChange?.(returnedResults());
  };

  const updateHue = hueChannel => {
    hue.current = hueChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update color text
    // change result text color based on the contrast ratio.
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;
    // update only hue color.
    activeHue.value = HSL_HEX(hueChannel, 100, 50);
    // update handles position.
    const hueHandles = registeredHandles.current.filter(setting => setting.channel === 'h');
    applySettings(hueHandles, false);
    // call onChange callback if exists.
    onChange?.(returnedResults());
  };

  const updateOpacity = alphaChannel => {
    alpha.current = alphaChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // update handles position.
    const opacityHandles = registeredHandles.current.filter(setting => setting.channel === 'a');
    applySettings(opacityHandles, false);
    // call onChange callback if exists.
    onChange?.(returnedResults());
  };

  const applySettings = (settings = registeredHandles.current, withAnimation = true) => {
    const duration = 100;
    const color = { h: hue.current, s: saturation.current, b: brightness.current, a: alpha.current };

    for (let i = 0; i < settings.length; i++) {
      const setting = settings[i];
      const { isReversed, width, height, thumbSize } = setting;
      const isVertical = setting.axis === 'y';
      const channel = color[setting.channel];
      const channelMax = setting.channel === 'h' ? 360 : 100;
      const percent = (channel / channelMax) * (isVertical ? height : width);

      // horizontal
      if (isVertical) {
        const pos = (isReversed ? height - percent : percent) - thumbSize / 2;
        setting.handle.value = withAnimation ? withTiming(pos, duration) : pos;
        continue;
      }
      // vertical
      const pos = (isReversed ? width - percent : percent) + (isRtl ? -width + thumbSize / 2 : -thumbSize / 2);
      setting.handle.value = withAnimation ? withTiming(pos, duration) : pos;
    }
  };

  const registerHandle = settings => {
    const currentSettings = registeredHandles.current;
    const index = registeredHandles.current.findIndex(current => current.id && current.id === settings.id);

    // update handle
    if (index !== -1) {
      currentSettings[index] = settings;
      registeredHandles.current = currentSettings;
    } else {
      registeredHandles.current.push(settings);
    }

    applySettings([settings], false);
  };

  const setColor = color => {
    const { h, s, b, a } = COLOR_HSVA(color);

    hue.current = h;
    saturation.current = s;
    brightness.current = b;
    alpha.current = a;

    // for colors
    previewColor.value = color_hex(); // update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    activeHue.value = HSL_HEX(h, 100, 50);

    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;

    applySettings();
  };

  // when value change, update handles pos.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    initialColor.current = COLOR_HSVA(value);
    setColor(value);
  }, [value]);

  const ctxValue = {
    activeHueStyle,

    previewText,
    previewTextColor,
    previewTextColorStyle,
    previewColorStyle,
    previewColorWithoutOpacity,
    previewColorFormat,

    setColor,

    updateSaturation,
    updateBrightness,
    updateOpacity,
    updateHue,

    slidersThickness,
    thumbsSize,

    value,
    initialColor,
    returnedResults,
    registerHandle,

    onGestureEventFinish,
    onChange,
  };

  return (
    <GestureHandlerRootView style={[styles.wrapper, style]}>
      <CTX.Provider value={ctxValue}>{children}</CTX.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flex: 1,
  },
});
