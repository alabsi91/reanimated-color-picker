import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import colorKit from './colorKit';
import { CTX } from './GlobalStyles';

import type { SharedValue } from 'react-native-reanimated';
import type { ColorPickerProps, TCTX, THandleSettings } from './types';

const CONTRAST_RATIO_MIN = 4.5;

export default function ColorPicker({
  sliderThickness = 25,
  thumbSize = 35,
  thumbShape = 'ring',
  value = '#418181',
  onChange,
  onComplete,
  style = {},
  children = <Text>NO CHILDREN</Text>,
}: ColorPickerProps) {
  const isFirstRender = useRef(true);

  const initialColor = useRef(colorKit.HSV(value).object());
  const hue = useRef(initialColor.current.h);
  const saturation = useRef(initialColor.current.s);
  const brightness = useRef(initialColor.current.v);
  const alpha = useRef(initialColor.current.a);
  const colorHash = useSharedValue(`${hue.current},${saturation.current},${brightness.current},${alpha.current}`); // to track color changes

  const registeredHandles = useRef<THandleSettings[]>([]); // all registered handles properties.

  /** It takes the current values of the hue, saturation, brightness, and alpha sliders and returns a hexadecimal color value. */
  const color_hex = () =>
    colorKit.HEX({
      h: hue.current,
      s: saturation.current,
      v: brightness.current,
      a: alpha.current,
    });

  /** Converts HSVA color values as an object to an object of formated color as a string. */
  const returnedResults = (
    color = {
      h: hue.current,
      s: saturation.current,
      v: brightness.current,
      a: alpha.current,
    }
  ) => {
    return {
      hex: colorKit.HEX(color),
      rgb: colorKit.RGB(color).string(false),
      rgba: colorKit.RGB(color).string(true),
      hsl: colorKit.HSL(color).string(false),
      hsla: colorKit.HSL(color).string(true),
      hsv: colorKit.HSV(color).string(false),
      hsva: colorKit.HSV(color).string(true),
      hwb: colorKit.HWB(color).string(false),
      hwba: colorKit.HWB(color).string(true),
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
  const activeHue = useSharedValue(colorKit.HEX({ h: hue.current, s: 100, l: 50, a: 1 }));
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
    setInverted({}, invertedColor); // for panel thumb.
    setInverted({ s: 100, v: 100 }, invertedColorHue); // for hue thumb.
    setInverted({ s: 100 }, invertedColorBrightness); // for brightness thumb.
    setInverted({ v: 70 }, invertedColorSaturation); // for saturation thumb.
    setInverted({ s: alpha.current, v: 70 }, invertedColorOpacity); // for opacity thumb.
  };
  const setInverted = ({ h = hue.current, s = saturation.current, v = brightness.current }, color2: SharedValue<string>) => {
    const inverted = color2.value === '#ffffff' ? '#000000' : '#ffffff';
    const contrast = colorKit.contrastRatio({ h, s, v, a: 1 }, color2.value);
    color2.value = contrast < CONTRAST_RATIO_MIN ? inverted : color2.value;
  };

  /** This function updates the brightness channel of the color picker. */
  const updateBrightness = (brightnessChannel: number) => {
    brightness.current = brightnessChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();

    // update handles positions.
    const brightnessHandles = registeredHandles.current.filter(setting => setting.channel === 'v');
    applySettings(brightnessHandles, false);

    onChange?.(returnedResults());
  };

  /**
   * This function updates the saturation channel of the color picker.
   * @param saturationChannel The new saturation channel value.
   */
  const updateSaturation = (saturationChannel: number) => {
    saturation.current = saturationChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();

    // change handles positions.
    const saturationHandles = registeredHandles.current.filter(setting => setting.channel === 's');
    applySettings(saturationHandles, false);

    onChange?.(returnedResults());
  };

  /** This function updates the hue channel of the color picker. */
  const updateHue = (hueChannel: number) => {
    hue.current = hueChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();
    activeHue.value = colorKit.HEX({ h: hueChannel, s: 100, l: 50, a: 1 }); // update only hue color.
    // update handles positions.
    const hueHandles = registeredHandles.current.filter(setting => setting.channel === 'h');
    applySettings(hueHandles, false);

    onChange?.(returnedResults());
  };

  /** This function updates the opacity channel of the color picker. */
  const updateOpacity = (alphaChannel: number) => {
    alpha.current = alphaChannel;
    previewColor.value = color_hex();
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    setInvertedColor();
    // update handles positions.
    const opacityHandles = registeredHandles.current.filter(setting => setting.channel === 'a');
    applySettings(opacityHandles, false);

    onChange?.(returnedResults());
  };

  /**
   * This function updates the color picker's handles positions.
   * @param settings - an array of objects that contain every handle's settings.
   * @param withAnimation - whether to animate the changes or not.
   */
  const applySettings = (settings = registeredHandles.current, withAnimation = true) => {
    const duration = 150;
    const color = { h: hue.current, s: saturation.current, v: brightness.current, a: alpha.current };

    for (let i = 0; i < settings.length; i++) {
      const { isReversed, width, height, axis, channel, handle, thumbSize: handleSize } = settings[i];
      const channelMax = channel === 'h' ? 360 : 100;
      const length = axis === 'y' ? height : width; // height for vertical axis, width for horizontal axis.
      const percent = ((channel === 'a' ? color[channel] * 100 : color[channel]) / channelMax) * length;

      if (axis === 'angle') {
        const [handleX, handleY] = handle as SharedValue<number>[];
        const center = width / 2;
        const distance = (color.s / 100) * (width / 2);
        const posX = width - Math.round(Math.cos((color.h * Math.PI) / 180) * distance + center) - handleSize / 2;
        const posY = width - Math.round(Math.sin((color.h * Math.PI) / 180) * distance + center) - handleSize / 2;
        handleX.value = withAnimation ? withTiming(posX, { duration }) : posX;
        handleY.value = withAnimation ? withTiming(posY, { duration }) : posY;
      }

      const pos = (isReversed ? length - percent : percent) - thumbSize / 2;
      (handle as SharedValue<number>).value = withAnimation ? withTiming(pos, { duration }) : pos;
    }
  };

  /** Registers/Update a slider handle to be updated when the color picker's color changes. */
  const registerHandle = (settings: THandleSettings) => {
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

  /**
   * The function apply a color to the color picker.
   * @param color - color to be set in any format.
   */
  const setColor = (color: string) => {
    const { h, s, v, a } = colorKit.HSV(color).object(); // convert color to HSBA object.

    hue.current = h;
    saturation.current = s;
    brightness.current = v;
    alpha.current = a;
    colorHash.value = `${hue.current},${saturation.current},${brightness.current},${alpha.current}`;

    // for colors
    previewColor.value = color_hex(); // update result color.
    activeHue.value = colorKit.HEX({ h, s: 100, l: 50, a: 1 });

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

    initialColor.current = colorKit.HSV(value).object();
    setColor(value);
  }, [value]);

  const ctxValue: TCTX = {
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

    sliderThickness,
    thumbSize,
    thumbShape,

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
