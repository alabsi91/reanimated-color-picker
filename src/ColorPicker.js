import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
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

const CONTRAST_RATIO_MIN = 4.5;

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
  const hue = useRef(initialColor.current.h);
  const saturation = useRef(initialColor.current.s);
  const brightness = useRef(initialColor.current.b);
  const alpha = useRef(initialColor.current.a);
  const colorHash = useSharedValue(`${hue.current},${saturation.current},${brightness.current},${alpha.current}`); // to track color changes

  const registeredHandles = useRef([]); // all registered handles properties.

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

  // preview background color.
  const previewColor = useSharedValue(color_hex());
  const previewColorStyle = useAnimatedStyle(() => ({ backgroundColor: previewColor.value }));

  // current color without the alpha channel.
  const solidColor = useAnimatedStyle(() => ({
    backgroundColor: previewColor.value.length > 7 ? previewColor.value.substring(0, 7) : previewColor.value,
  }));

  // current color's hue.
  const activeHue = useSharedValue(HSL_HEX(hue.current, 100, 50));
  const activeHueStyle = useAnimatedStyle(() => ({ backgroundColor: activeHue.value }));

  // white or black color depending on the contrast ratio.
  const invertedColor = useSharedValue('#ffffff');
  const invertedColorHue = useSharedValue('#ffffff');
  const invertedColorBrightness = useSharedValue('#ffffff');
  const invertedColorSaturation = useSharedValue('#ffffff');
  const invertedColorOpacity = useSharedValue('#ffffff');

  const onGestureEventFinish = () => {
    onComplete?.(returnedResults());
  };

  // set white or black color depending on the contrast ratio.
  const setInvertedColor = () => {
    setInverted({}, invertedColor);
    setInverted({ s: 100, b: 50 }, invertedColorHue);
    setInverted({ s: 100 }, invertedColorBrightness);
    setInverted({ b: 60 }, invertedColorSaturation);
    setInverted({ s: alpha.current, b: 60 }, invertedColorOpacity);
  };
  const setInverted = ({ h = hue.current, s = saturation.current, b = brightness.current }, color2) => {
    const inverted = color2.value === '#ffffff' ? '#000000' : '#ffffff';
    const contrast = CONTRAST_RATIO({ h, s, b }, color2.value);
    color2.value = contrast < CONTRAST_RATIO_MIN ? inverted : color2.value;
  };

  const updateBrightness = brightnessChannel => {
    brightness.current = brightnessChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();

    // update handles positions.
    const brightnessHandles = registeredHandles.current.filter(setting => setting.channel === 'b');
    applySettings(brightnessHandles, false);

    onChange?.(returnedResults());
  };

  const updateSaturation = saturationChannel => {
    saturation.current = saturationChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();

    // change handles positions.
    const saturationHandles = registeredHandles.current.filter(setting => setting.channel === 's');
    applySettings(saturationHandles, false);

    onChange?.(returnedResults());
  };

  const updateHue = hueChannel => {
    hue.current = hueChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();
    activeHue.value = HSL_HEX(hueChannel, 100, 50); // update only hue color.
    // update handles positions.
    const hueHandles = registeredHandles.current.filter(setting => setting.channel === 'h');
    applySettings(hueHandles, false);

    onChange?.(returnedResults());
  };

  const updateOpacity = alphaChannel => {
    alpha.current = alphaChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();
    // update handles positions.
    const opacityHandles = registeredHandles.current.filter(setting => setting.channel === 'a');
    applySettings(opacityHandles, false);

    onChange?.(returnedResults());
  };

  const applySettings = (settings = registeredHandles.current, withAnimation = true) => {
    const duration = 150;
    const color = { h: hue.current, s: saturation.current, b: brightness.current, a: alpha.current };

    for (let i = 0; i < settings.length; i++) {
      const { isReversed, width, height, thumbSize, axis, channel, handle } = settings[i];
      const channelMax = channel === 'h' ? 360 : 100;
      const length = axis === 'y' ? height : width; // height for vertical axis, width for horizontal axis.
      const percent = (color[channel] / channelMax) * length;

      if (axis === 'angle') {
        const [handleX, handleY] = handle;
        const center = width / 2;
        const distance = (color.s / 100) * (width / 2);
        const posX = width - Math.round(Math.cos((color.h * Math.PI) / 180) * distance + center) - thumbSize / 2;
        const posY = width - Math.round(Math.sin((color.h * Math.PI) / 180) * distance + center) - thumbSize / 2;
        handleX.value = withAnimation ? withTiming(posX, { duration }) : posX;
        handleY.value = withAnimation ? withTiming(posY, { duration }) : posY;
      }

      const pos = (isReversed ? length - percent : percent) - thumbSize / 2;
      handle.value = withAnimation ? withTiming(pos, { duration }) : pos;
    }
  };

  const registerHandle = settings => {
    const currentSettings = registeredHandles.current;
    const index = registeredHandles.current.findIndex(current => current.id && current.id === settings.id);

    // update handle
    if (index !== -1) {
      currentSettings[index] = settings;
      registeredHandles.current = currentSettings;
      applySettings([settings]); // update handle position only when settings updated because it will for sure.
      return;
    }
    registeredHandles.current.push(settings);
  };

  const setColor = color => {
    const { h, s, b, a } = COLOR_HSVA(color);

    hue.current = h;
    saturation.current = s;
    brightness.current = b;
    alpha.current = a;
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    // for colors
    previewColor.value = color_hex(); // update result color.
    activeHue.value = HSL_HEX(h, 100, 50);

    setInvertedColor();

    applySettings();
  };

  // when value change, update handles pos.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setInvertedColor();
      return;
    }

    initialColor.current = COLOR_HSVA(value);
    setColor(value);
  }, [value]);

  const ctxValue = {
    activeHueStyle,

    invertedColor,
    invertedColorHue,
    invertedColorBrightness,
    invertedColorSaturation,
    invertedColorOpacity,
    previewColorStyle,
    solidColor,
    colorHash,

    setColor,

    updateSaturation,
    updateBrightness,
    updateOpacity,
    updateHue,

    slidersThickness,
    thumbsSize,

    initialColor,
    value,
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
