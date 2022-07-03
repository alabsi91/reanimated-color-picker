import React, { useRef, useEffect, useMemo } from 'react';
import { I18nManager, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ALPHA_HEX,
  COLOR_HSVA,
  CONTRAST_RATIO,
  HSL_HEX,
  HSL_RGB,
  HSV_HSL,
} from './ColorsConversionFormulas';

const isRtl = I18nManager.isRTL,
  CONTRAST_RATIO_MIN = 4.5;

export default function ColorPicker({
  tracksHeight = 25,
  thumbsSize = 25 * 1.4,
  value = '#418181',
  onChange,
  onComplete,
  width = 300,
  style = {},
  children = <Text>NO CHILDREN</Text>,
} = {}) {
  const isFirstRender = useRef(true);
  const initialColor = useRef(COLOR_HSVA(value));
  const previewColorFormat = useRef('hex');

  const panel1ThumbeSize = useRef(thumbsSize);
  const panel2ThumbeSize = useRef(thumbsSize);
  const hueThumbeSize = useRef(thumbsSize);
  const brightnessThumbeSize = useRef(thumbsSize);
  const saturationThumbeSize = useRef(thumbsSize);
  const opacityThumbeSize = useRef(thumbsSize);

  const hue = useRef(initialColor.current.h);
  const saturation = useRef(initialColor.current.s);
  const brightness = useRef(initialColor.current.b);
  const alpha = useRef(initialColor.current.a);

  const color_hsl = (
    color = { h: hue.current, s: saturation.current, b: brightness.current },
  ) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };
  const color_hsla = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    },
  ) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return `hsla(${h}, ${s}%, ${l}%, ${color.a / 100})`;
  };
  const color_hex = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    },
  ) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return HSL_HEX(h, s, l) + (color.a === 100 ? '' : ALPHA_HEX(color.a));
  };
  const color_rgb = (
    color = { h: hue.current, s: saturation.current, b: brightness.current },
  ) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    const { r, g, b } = HSL_RGB(h, s, l);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const color_rgba = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    },
  ) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    const { r, g, b } = HSL_RGB(h, s, l);
    return `rgba(${r}, ${g}, ${b}, ${color.a / 100})`;
  };
  const color_hsv = (
    color = { h: hue.current, s: saturation.current, b: brightness.current },
  ) => {
    return `hsv(${color.h}, ${color.s}%, ${color.b}%)`;
  };
  const color_hsva = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    },
  ) => {
    return `hsva(${color.h}, ${color.s}%, ${color.b}%, ${color.a / 100})`;
  };

  const returnedResults = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    },
  ) => {
    return {
      hex: color_hex(color),
      rgb: color_rgb(color),
      rgba: color_rgba(color),
      hsl: color_hsl(color),
      hsla: color_hsla(color),
      hsv: color_hsv(color),
      hsva: color_hsva(color),
    };
  };

  const previewColor = useSharedValue(color_hex());
  const previewColorStyle = useAnimatedStyle(() => ({
    backgroundColor: previewColor.value,
  }));
  const previewColorWithoutOpacity = useAnimatedStyle(() => ({
    backgroundColor:
      previewColor.value.length > 7
        ? previewColor.value.substring(0, 7)
        : previewColor.value,
  }));
  const activeHue = useSharedValue(HSL_HEX(hue.current, 100, 50));
  const activeHueStyle = useAnimatedStyle(() => ({
    backgroundColor: activeHue.value,
  }));

  const saturationPanel1_handlePos = useSharedValue(0); // for saturation panle 1 adobe style
  const brightnessPanel1_handlePos = useSharedValue(0); // for brightness panle 1 adobe style

  const huePanel2_handlePos = useSharedValue(0); // for hue panle 2 windows style
  const saturationPanel2_handlePos = useSharedValue(0); // for saturation panle 2 windows style

  const hue_handlePos = useSharedValue(0); // for hue slider
  const saturationSlider_handlePos = useSharedValue(0); // for saturation slider
  const brightnessSlider_handlePos = useSharedValue(0); // for brightness slider
  const opacity_handlePos = useSharedValue(0); // for opacity slider
  const previewTextColor = useSharedValue('#ffffff'); // for result text color
  const previewText = useSharedValue(
    returnedResults()[previewColorFormat.current],
  ); // for result text

  const previewTextColorStyle = useAnimatedStyle(() => ({
    color: previewTextColor.value,
  }));

  const onGestureEventFinish = () => {
    onComplete?.(returnedResults());
  };

  const updateBrightness = brightnessChannel => {
    brightness.current = brightnessChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(
      hue.current,
      saturation.current,
      brightness.current,
      previewTextColor.value,
    );
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN
        ? previewTextColor.value === '#ffffff'
          ? '#000000'
          : '#ffffff'
        : previewTextColor.value;

    onChange?.(returnedResults());
  };

  const updateSaturation = saturationChannel => {
    saturation.current = saturationChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(
      hue.current,
      saturation.current,
      brightness.current,
      previewTextColor.value,
    );
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN
        ? previewTextColor.value === '#ffffff'
          ? '#000000'
          : '#ffffff'
        : previewTextColor.value;

    onChange?.(returnedResults());
  };

  const updateSB = (saturationChannel, brightnessChannel) => {
    saturation.current = saturationChannel;
    brightness.current = brightnessChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(
      hue.current,
      saturation.current,
      brightness.current,
      previewTextColor.value,
    );
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN
        ? previewTextColor.value === '#ffffff'
          ? '#000000'
          : '#ffffff'
        : previewTextColor.value;

    onChange?.(returnedResults());
  };

  const updateHS = (hueChannel, saturationChannel) => {
    saturation.current = saturationChannel;
    hue.current = hueChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(
      hue.current,
      saturation.current,
      brightness.current,
      previewTextColor.value,
    );
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN
        ? previewTextColor.value === '#ffffff'
          ? '#000000'
          : '#ffffff'
        : previewTextColor.value;

    activeHue.value = HSL_HEX(hueChannel, 100, 50);
    onChange?.(returnedResults());
  };

  const updateHue = hueChannel => {
    hue.current = hueChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update color text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(
      hue.current,
      saturation.current,
      brightness.current,
      previewTextColor.value,
    );
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN
        ? previewTextColor.value === '#ffffff'
          ? '#000000'
          : '#ffffff'
        : previewTextColor.value;

    activeHue.value = HSL_HEX(hueChannel, 100, 50);
    onChange?.(returnedResults());
  };

  const updateOpacity = alphaChannel => {
    alpha.current = alphaChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text

    onChange?.(returnedResults());
  };

  const setHandlesPos = () => {
    const duration = 100;
    const { h, s, b, a } = initialColor.current;

    hue.current = h;
    saturation.current = s;
    brightness.current = b;
    alpha.current = a;
    // for colors
    previewColor.value = color_hex(); // update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    activeHue.value = HSL_HEX(h, 100, 50);
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(
      hue.current,
      saturation.current,
      brightness.current,
      previewTextColor.value,
    );
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN
        ? previewTextColor.value === '#ffffff'
          ? '#000000'
          : '#ffffff'
        : previewTextColor.value;
    //~ saturation
    saturationPanel1_handlePos.value = withTiming(
      isRtl
        ? (s / 100) * width - width + panel1ThumbeSize.current / 2
        : (s / 100) * width - panel1ThumbeSize.current / 2,
      duration,
    ); // panel 1 adobe style
    saturationPanel2_handlePos.value = withTiming(
      width - (s / 100) * width - panel2ThumbeSize.current / 2,
      duration,
    ); // panel 2 windows style
    saturationSlider_handlePos.value = withTiming(
      isRtl
        ? (s / 100) * width - width + saturationThumbeSize.current / 2
        : (s / 100) * width - saturationThumbeSize.current / 2,
      duration,
    );
    //~ brightness
    brightnessPanel1_handlePos.value = withTiming(
      width - (b / 100) * width - panel1ThumbeSize.current / 2,
      duration,
    );
    brightnessSlider_handlePos.value = withTiming(
      isRtl
        ? (b / 100) * width - width + brightnessThumbeSize.current / 2
        : (b / 100) * width - brightnessThumbeSize.current / 2,
      duration,
    );
    //~ hue
    hue_handlePos.value = withTiming(
      isRtl
        ? width - (h / 360) * width - width + hueThumbeSize.current / 2
        : width - (h / 360) * width - hueThumbeSize.current / 2,
      100,
    );
    huePanel2_handlePos.value = withTiming(
      isRtl
        ? (h / 360) * width - width + panel2ThumbeSize.current / 2
        : (h / 360) * width - panel2ThumbeSize.current / 2,
      duration,
    ); // panel 2 windows style
    //~ opacity
    opacity_handlePos.value = withTiming(
      isRtl
        ? (a / 100) * width - width + opacityThumbeSize.current / 2
        : (a / 100) * width - opacityThumbeSize.current / 2,
      duration,
    );
  };

  // when value change, update handles pos.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setHandlesPos();
      return;
    }
    initialColor.current = COLOR_HSVA(value);
    setHandlesPos();
  }, [value, width]);

  const RenderChildren = () =>
    React.Children.map(children, child =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            activeHueStyle,

            previewText,
            previewTextColor,
            previewTextColorStyle,
            previewColorStyle,
            previewColorWithoutOpacity,
            previewColorFormat,

            setHandlesPos,
            saturationPanel1_handlePos,
            brightnessPanel1_handlePos,
            saturationPanel2_handlePos,
            huePanel2_handlePos,
            saturationSlider_handlePos,
            brightnessSlider_handlePos,
            hue_handlePos,
            opacity_handlePos,

            updateSaturation,
            updateBrightness,
            updateSB,
            updateHS,
            updateOpacity,
            updateHue,

            tracksHeight,
            thumbsSize,

            panel1ThumbeSize,
            panel2ThumbeSize,
            saturationThumbeSize,
            brightnessThumbeSize,
            hueThumbeSize,
            opacityThumbeSize,

            value,
            width,
            initialColor,
            returnedResults,

            onGestureEventFinish,
            onChange,
            onComplete,
            ...child.props,
          })
        : null,
    );

  const ColorPickerModules = useMemo(() => RenderChildren(), []);

  return (
    <GestureHandlerRootView style={[styles.wrapper, style]}>
      {ColorPickerModules}
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
