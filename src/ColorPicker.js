import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Image, I18nManager, Pressable, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ALPHA_HEX, COLOR_HSVA, CONTRAST_RATIO, HSL_HEX, HSL_RGB, HSV_HSL } from './ColorsConversionFormulas';

const isRtl = I18nManager.isRTL,
  HUE_MAX = 360,
  SB_MAX = 100,
  OPACITY_MAX = 100,
  CONTRAST_RATIO_MIN = 4.5,
  SWATCHE_SIZE = 30,
  TRACKS_HEIGHT = 25,
  HANDLES_SCALE = 1.2,
  WIDTH = 300;

const SWATCHES_COLORS = [
  '#f44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
];

const ReText = ({ text, style }) => {
  const [color, setColor] = useState(text.value);

  useDerivedValue(() => {
    runOnJS(setColor)(text.value);
  }, [text.value]);

  return <Animated.Text style={[styles.previewText, ...style]}>{color}</Animated.Text>;
};

export default function ColorPicker({
  tracksHeight = TRACKS_HEIGHT,
  thumbsSize = TRACKS_HEIGHT * 1.4,
  value = '#418181',
  onChange,
  onComplete,
  width = WIDTH,
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

  const color_hsl = (color = { h: hue.current, s: saturation.current, b: brightness.current }) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };
  const color_hsla = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    }
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
    }
  ) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return HSL_HEX(h, s, l) + (color.a === 100 ? '' : ALPHA_HEX(color.a));
  };
  const color_rgb = (color = { h: hue.current, s: saturation.current, b: brightness.current }) => {
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
    }
  ) => {
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    const { r, g, b } = HSL_RGB(h, s, l);
    return `rgba(${r}, ${g}, ${b}, ${color.a / 100})`;
  };
  const color_hsv = (color = { h: hue.current, s: saturation.current, b: brightness.current }) => {
    return `hsv(${color.h}, ${color.s}%, ${color.b}%)`;
  };
  const color_hsva = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    }
  ) => {
    return `hsva(${color.h}, ${color.s}%, ${color.b}%, ${color.a / 100})`;
  };

  const returnedResults = (
    color = {
      h: hue.current,
      s: saturation.current,
      b: brightness.current,
      a: alpha.current,
    }
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
    backgroundColor: previewColor.value.length > 7 ? previewColor.value.substring(0, 7) : previewColor.value,
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
  const previewText = useSharedValue(returnedResults()[previewColorFormat.current]); // for result text

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
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;

    onChange?.(returnedResults());
  };

  const updateSaturation = saturationChannel => {
    saturation.current = saturationChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;

    onChange?.(returnedResults());
  };

  const updateSB = (saturationChannel, brightnessChannel) => {
    saturation.current = saturationChannel;
    brightness.current = brightnessChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;

    onChange?.(returnedResults());
  };

  const updateHS = (hueChannel, saturationChannel) => {
    saturation.current = saturationChannel;
    hue.current = hueChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update result text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;

    activeHue.value = HSL_HEX(hueChannel, 100, 50);
    onChange?.(returnedResults());
  };

  const updateHue = hueChannel => {
    hue.current = hueChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update color text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;

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
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;
    //~ saturation
    saturationPanel1_handlePos.value = withTiming(
      isRtl ? (s / SB_MAX) * width - width + panel1ThumbeSize.current / 2 : (s / SB_MAX) * width - panel1ThumbeSize.current / 2,
      duration
    ); // panel 1 adobe style
    saturationPanel2_handlePos.value = withTiming(width - (s / SB_MAX) * width - panel2ThumbeSize.current / 2, duration); // panel 2 windows style
    saturationSlider_handlePos.value = withTiming(
      isRtl
        ? (s / SB_MAX) * width - width + saturationThumbeSize.current / 2
        : (s / SB_MAX) * width - saturationThumbeSize.current / 2,
      duration
    );
    //~ brightness
    brightnessPanel1_handlePos.value = withTiming(width - (b / SB_MAX) * width - panel1ThumbeSize.current / 2, duration);
    brightnessSlider_handlePos.value = withTiming(
      isRtl
        ? (b / SB_MAX) * width - width + brightnessThumbeSize.current / 2
        : (b / SB_MAX) * width - brightnessThumbeSize.current / 2,
      duration
    );
    //~ hue
    hue_handlePos.value = withTiming(
      isRtl
        ? width - (h / HUE_MAX) * width - width + hueThumbeSize.current / 2
        : width - (h / HUE_MAX) * width - hueThumbeSize.current / 2,
      100
    );
    huePanel2_handlePos.value = withTiming(
      isRtl ? (h / HUE_MAX) * width - width + panel2ThumbeSize.current / 2 : (h / HUE_MAX) * width - panel2ThumbeSize.current / 2,
      duration
    ); // panel 2 windows style
    //~ opacity
    opacity_handlePos.value = withTiming(
      isRtl
        ? (a / OPACITY_MAX) * width - width + opacityThumbeSize.current / 2
        : (a / OPACITY_MAX) * width - opacityThumbeSize.current / 2,
      duration
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
        : null
    );

  const ColorPickerModules = useMemo(() => RenderChildren(), []);

  return <GestureHandlerRootView style={[styles.wrapper, style]}>{ColorPickerModules}</GestureHandlerRootView>;
}

export function Panel1({
  activeHueStyle,
  previewTextColor,
  previewColorWithoutOpacity,
  saturationPanel1_handlePos,
  brightnessPanel1_handlePos,
  saturationPanel2_handlePos,
  saturationSlider_handlePos,
  brightnessSlider_handlePos,
  updateSB,
  onGestureEventFinish,
  setHandlesPos,
  panel1ThumbeSize,
  panel2ThumbeSize,
  brightnessThumbeSize,
  saturationThumbeSize,
  width,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  style = {}, // by user
}) {
  panel1ThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_panelHandle = useSharedValue(1);

  const panel_handleStyle = useAnimatedStyle(() => ({
    backgroundColor: previewTextColor.value === '#ffffff' ? '#ffffff50' : '#00000050',
    borderColor: previewTextColor.value,
    transform: [
      { translateX: saturationPanel1_handlePos.value },
      { translateY: brightnessPanel1_handlePos.value },
      { scale: scale_panelHandle.value },
    ],
  }));

  const panel_GestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.x = event.x;
      ctx.y = event.y;
      scale_panelHandle.value = withTiming(HANDLES_SCALE, { duration: 100 });
    },
    onActive: (event, ctx) => {
      const clamp = (v, max) => Math.min(Math.max(v, 0), max);

      const x = event.translationX;
      const y = event.translationY;
      const posX = clamp(x + ctx.x, width);
      const posY = clamp(y + ctx.y, width);
      const percentX = posX / width;
      const percentY = posY / width;

      const saturationX = Math.round(percentX * SB_MAX);
      const brightnessY = Math.round(SB_MAX - percentY * SB_MAX);

      saturationPanel1_handlePos.value = isRtl ? percentX * width - width + thumbSize / 2 : percentX * width - thumbSize / 2;
      brightnessPanel1_handlePos.value = percentY * width - thumbSize / 2;

      brightnessSlider_handlePos.value = isRtl
        ? (brightnessY / SB_MAX) * width - width + brightnessThumbeSize.current / 2
        : (brightnessY / SB_MAX) * width - brightnessThumbeSize.current / 2;

      saturationSlider_handlePos.value = isRtl
        ? (saturationX / SB_MAX) * width - width + saturationThumbeSize.current / 2
        : (saturationX / SB_MAX) * width - saturationThumbeSize.current / 2;

      // panel 2 windows style
      saturationPanel2_handlePos.value = width - (saturationX / SB_MAX) * width - panel2ThumbeSize.current / 2;

      runOnJS(updateSB)(saturationX, brightnessY);
    },
    onFinish: () => {
      scale_panelHandle.value = withTiming(1, { duration: 100 });
      runOnJS(onGestureEventFinish)();
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panel_GestureEvent} minDist={0}>
      <Animated.View style={[styles.panel_container, style, { width, height: width }, styles.override, activeHueStyle]}>
        <Image
          source={require('./assets/Background1.png')}
          style={{
            borderRadius: style.borderRadius ?? 5,
            width,
            height: width,
          }}
        />
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
            },
            panel_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export function Panel2({
  previewTextColor,
  previewColorWithoutOpacity,
  saturationPanel1_handlePos,
  saturationPanel2_handlePos,
  huePanel2_handlePos,
  hue_handlePos,
  saturationSlider_handlePos,
  onGestureEventFinish,
  setHandlesPos,
  panel1ThumbeSize,
  panel2ThumbeSize,
  hueThumbeSize,
  saturationThumbeSize,
  updateHS,
  width,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  style = {}, // by user
}) {
  panel2ThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_panelHandle = useSharedValue(1);

  const panel_handleStyle = useAnimatedStyle(() => ({
    backgroundColor: previewTextColor.value === '#ffffff' ? '#ffffff50' : '#00000050',
    borderColor: previewTextColor.value,
    transform: [
      { translateX: huePanel2_handlePos.value },
      { translateY: saturationPanel2_handlePos.value },
      { scale: scale_panelHandle.value },
    ],
  }));

  const panel_GestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.x = event.x;
      ctx.y = event.y;
      scale_panelHandle.value = withTiming(HANDLES_SCALE, { duration: 100 });
    },
    onActive: (event, ctx) => {
      const clamp = (v, max) => Math.min(Math.max(v, 0), max);

      const x = event.translationX;
      const y = event.translationY;
      const posX = clamp(x + ctx.x, width);
      const posY = clamp(y + ctx.y, width);
      const percentX = posX / width;
      const percentY = posY / width;

      const hueX = Math.round(percentX * HUE_MAX);
      const saturationY = Math.round(SB_MAX - percentY * SB_MAX);

      huePanel2_handlePos.value = isRtl ? percentX * width - width + thumbSize / 2 : percentX * width - thumbSize / 2;

      saturationPanel2_handlePos.value = percentY * width - thumbSize / 2;

      hue_handlePos.value = isRtl
        ? width - (hueX / HUE_MAX) * width - width + hueThumbeSize.current / 2
        : width - (hueX / HUE_MAX) * width - hueThumbeSize.current / 2;

      saturationSlider_handlePos.value = isRtl
        ? (saturationY / SB_MAX) * width - width + saturationThumbeSize.current / 2
        : (saturationY / SB_MAX) * width - saturationThumbeSize.current / 2;

      // panel 1 adobe style
      saturationPanel1_handlePos.value = isRtl
        ? (saturationY / SB_MAX) * width - width + panel1ThumbeSize.current / 2
        : (saturationY / SB_MAX) * width - panel1ThumbeSize.current / 2;

      runOnJS(updateHS)(hueX, saturationY);
    },
    onFinish: () => {
      scale_panelHandle.value = withTiming(1, { duration: 100 });
      runOnJS(onGestureEventFinish)();
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panel_GestureEvent} minDist={0}>
      <Animated.View style={[styles.panel_container, style, { width, height: width }, styles.override]}>
        <Image
          source={require('./assets/Background2.png')}
          style={{
            borderRadius: style.borderRadius ?? 5,
            width,
            height: width,
          }}
        />
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
            },
            panel_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export function Preview({
  width,
  initialColor,
  returnedResults,
  value,
  previewColorStyle,
  previewText,
  previewTextColorStyle,
  previewColorFormat,
  style = {}, // by user
  textStyle = {}, // by user
  colorFormat = 'hex', // by user
  hideInitialColor = false, // by user
  hideText = false, // by user
}) {
  previewColorFormat.current = colorFormat;

  const initialColorText = useMemo(() => {
    const { h, s, b } = initialColor.current;
    const formated = returnedResults(initialColor.current)[previewColorFormat.current];
    const contrast = CONTRAST_RATIO(h, s, b, '#fff');
    const color = contrast < CONTRAST_RATIO_MIN ? '#000' : '#fff';
    return { formated, color };
  }, [value, colorFormat]);

  return (
    <View style={[styles.preview, { width }, style]}>
      {!hideInitialColor && (
        <View style={{ backgroundColor: value, flex: 1 }}>
          {!hideText && (
            <Text style={[{ color: initialColorText.color }, styles.previewText, textStyle]}>{initialColorText.formated}</Text>
          )}
        </View>
      )}
      <Animated.View style={[{ flex: 1 }, previewColorStyle]}>
        {!hideText && <ReText text={previewText} style={[textStyle, previewTextColorStyle]} />}
      </Animated.View>
    </View>
  );
}

export function HueSlider({
  width,
  hueThumbeSize,
  setHandlesPos,
  updateHue,
  onGestureEventFinish,
  hue_handlePos,
  huePanel2_handlePos,
  previewColorWithoutOpacity,
  tracksHeight,
  panel2ThumbeSize,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  ringColor = '#ffffff', // by user
  style = {}, // by user
}) {
  const trackHeight = style.height ?? tracksHeight;
  hueThumbeSize.current = thumbSize;

  ringColor = COLOR_HSVA(ringColor);
  ringColor = HSV_HSL(ringColor.h, ringColor.s, ringColor.b);
  ringColor = HSL_HEX(ringColor.h, ringColor.s, ringColor.l);

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_hueHandle = useSharedValue(1);

  const hue_handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: hue_handlePos.value },
      { translateY: -(thumbSize - trackHeight) / 2 },
      { scale: scale_hueHandle.value },
    ],
  }));

  const HueGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.x = event.x;
        scale_hueHandle.value = withTiming(HANDLES_SCALE, { duration: 100 });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const hueX = HUE_MAX - Math.round(percent * HUE_MAX);

        hue_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;

        // panel 2 windows style
        huePanel2_handlePos.value = isRtl
          ? (hueX / HUE_MAX) * width - width + panel2ThumbeSize.current / 2
          : (hueX / HUE_MAX) * width - panel2ThumbeSize.current / 2;

        runOnJS(updateHue)(hueX);
      },
      onFinish: () => {
        scale_hueHandle.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width]
  );

  return (
    <PanGestureHandler onGestureEvent={HueGestureEvent} minDist={0}>
      <Animated.View style={[{ position: 'relative', height: tracksHeight }, style, { width }, styles.override]}>
        <View style={[styles.sliderImageContainer, { borderRadius: style.borderRadius ?? 5 }]}>
          <Image source={require('./assets/Hue.png')} style={styles.sliderImage} />
        </View>
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: ringColor + 50,
              borderColor: ringColor,
            },
            hue_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export function SaturationSlider({
  width,
  saturationThumbeSize,
  panel2ThumbeSize,
  panel1ThumbeSize,
  setHandlesPos,
  updateSaturation,
  onGestureEventFinish,
  saturationPanel1_handlePos,
  saturationPanel2_handlePos,
  saturationSlider_handlePos,
  previewColorWithoutOpacity,
  tracksHeight,
  activeHueStyle,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  ringColor = '#ffffff', // by user
  style = {}, // by user
}) {
  const trackHeight = style.height ?? tracksHeight;
  saturationThumbeSize.current = thumbSize;

  ringColor = COLOR_HSVA(ringColor);
  ringColor = HSV_HSL(ringColor.h, ringColor.s, ringColor.b);
  ringColor = HSL_HEX(ringColor.h, ringColor.s, ringColor.l);

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_saturationHandle = useSharedValue(1); // for handles scale.

  const saturation_handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: saturationSlider_handlePos.value },
      { translateY: -(thumbSize - trackHeight) / 2 },
      { scale: scale_saturationHandle.value },
    ],
  }));

  const SaturationGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.x = event.x;
        scale_saturationHandle.value = withTiming(HANDLES_SCALE, {
          duration: 100,
        });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const saturationX = Math.round(percent * SB_MAX);

        saturationSlider_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;
        // panel 2 windows style
        saturationPanel1_handlePos.value = isRtl
          ? (saturationX / SB_MAX) * width - width + panel1ThumbeSize.current / 2
          : (saturationX / SB_MAX) * width - panel1ThumbeSize.current / 2;
        // panel 2 windows style
        saturationPanel2_handlePos.value = width - (saturationX / SB_MAX) * width - panel2ThumbeSize.current / 2;

        runOnJS(updateSaturation)(saturationX);
      },
      onFinish: () => {
        scale_saturationHandle.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width]
  );

  return (
    <PanGestureHandler onGestureEvent={SaturationGestureEvent} minDist={0}>
      <Animated.View style={[{ position: 'relative', height: tracksHeight }, style, { width }, styles.override]}>
        <Animated.View style={[styles.sliderImageContainer, { borderRadius: style.borderRadius ?? 5 }, activeHueStyle]}>
          <Image source={require('./assets/Saturation.png')} style={styles.sliderImage} />
        </Animated.View>
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: ringColor + 50,
              borderColor: ringColor,
            },
            saturation_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export function BrightnessSlider({
  width,
  brightnessThumbeSize,
  panel1ThumbeSize,
  setHandlesPos,
  updateBrightness,
  onGestureEventFinish,
  brightnessPanel1_handlePos,
  brightnessSlider_handlePos,
  previewColorWithoutOpacity,
  tracksHeight,
  activeHueStyle,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  ringColor = '#ffffff', // by user
  style = {}, // by user
}) {
  const trackHeight = style.height ?? tracksHeight;
  brightnessThumbeSize.current = thumbSize;

  ringColor = COLOR_HSVA(ringColor);
  ringColor = HSV_HSL(ringColor.h, ringColor.s, ringColor.b);
  ringColor = HSL_HEX(ringColor.h, ringColor.s, ringColor.l);

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_brightnessHandle = useSharedValue(1); // for handles scale.

  const brightness_handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: brightnessSlider_handlePos.value },
      { translateY: -(thumbSize - trackHeight) / 2 },
      { scale: scale_brightnessHandle.value },
    ],
  }));

  const BrightnessGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.x = event.x;
        scale_brightnessHandle.value = withTiming(HANDLES_SCALE, {
          duration: 100,
        });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const brightnessX = Math.round(percent * SB_MAX);

        brightnessSlider_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;
        brightnessPanel1_handlePos.value = width - (brightnessX / SB_MAX) * width - panel1ThumbeSize.current / 2;

        runOnJS(updateBrightness)(brightnessX);
      },
      onFinish: () => {
        scale_brightnessHandle.value = withTiming(1, { duration: 100 });
        runOnJS(onGestureEventFinish)();
      },
    },
    [width]
  );

  return (
    <PanGestureHandler onGestureEvent={BrightnessGestureEvent} minDist={0}>
      <Animated.View style={[{ position: 'relative', height: tracksHeight }, style, { width }, styles.override]}>
        <Animated.View style={[styles.sliderImageContainer, { borderRadius: style.borderRadius ?? 5 }, activeHueStyle]}>
          <Image source={require('./assets/Brightness.png')} style={styles.sliderImage} />
        </Animated.View>
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: ringColor + 50,
              borderColor: ringColor,
            },
            brightness_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export function OpacitySlider({
  width,
  opacityThumbeSize,
  setHandlesPos,
  activeHueStyle,
  opacity_handlePos,
  updateOpacity,
  onGestureEventFinish,
  previewColorWithoutOpacity,
  tracksHeight,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  ringColor = '#ffffff', // by user
  style = {}, // by user
}) {
  const trackHeight = style.height ?? tracksHeight;
  opacityThumbeSize.current = thumbSize;

  ringColor = COLOR_HSVA(ringColor);
  ringColor = HSV_HSL(ringColor.h, ringColor.s, ringColor.b);
  ringColor = HSL_HEX(ringColor.h, ringColor.s, ringColor.l);

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_opacityHandle = useSharedValue(1);

  const opacity_handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: opacity_handlePos.value },
      { translateY: -(thumbSize - trackHeight) / 2 },
      { scale: scale_opacityHandle.value },
    ],
  }));

  const opacityGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.x = event.x;
      scale_opacityHandle.value = withTiming(HANDLES_SCALE, { duration: 100 });
    },
    onActive: (event, ctx) => {
      const clamp = (v, max) => Math.min(Math.max(v, 0), max);

      const x = event.translationX;
      const pos = clamp(x + ctx.x, width);
      const percent = pos / width;

      const opacityX = Math.round(percent * OPACITY_MAX);

      opacity_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;

      runOnJS(updateOpacity)(opacityX);
    },
    onFinish: () => {
      scale_opacityHandle.value = withTiming(1, { duration: 100 });
      runOnJS(onGestureEventFinish)();
    },
  });

  return (
    <PanGestureHandler onGestureEvent={opacityGestureEvent} minDist={0}>
      <Animated.View style={[{ position: 'relative', height: tracksHeight }, style, { width }, styles.override]}>
        <Animated.View style={[styles.sliderImageContainer, { borderRadius: style.borderRadius ?? 5 }, activeHueStyle]}>
          <Image source={require('./assets/Opacity.png')} style={styles.sliderImage} />
        </Animated.View>
        <Animated.View
          style={[
            styles.handle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: ringColor + 50,
              borderColor: ringColor,
            },
            opacity_handleStyle,
          ]}
        >
          <Animated.View style={[styles.handleInner, { borderRadius: thumbSize / 2 }, previewColorWithoutOpacity]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export function Swatches({
  width,
  initialColor,
  setHandlesPos,
  onChange,
  onComplete,
  returnedResults,
  colors = SWATCHES_COLORS, // by user
  style = {}, // by user
  swatchStyle = {}, // by user
}) {
  const onPress = swatch => {
    initialColor.current = COLOR_HSVA(swatch);
    setHandlesPos();
    onChange?.(returnedResults());
    onComplete?.(returnedResults());
  };
  return (
    <View style={[styles.swatcheContainer, { width }, style]}>
      {colors.map((swatch, i) => (
        <Pressable
          key={swatch + i}
          onPress={() => onPress(swatch)}
          style={[styles.swatch, swatchStyle, { backgroundColor: swatch }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flex: 1,
  },
  panel_container: {
    position: 'relative',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'red',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  handle: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleInner: {
    width: '75%',
    height: '75%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderImage: {
    width: '100%',
    height: 80,
  },
  preview: {
    flexDirection: 'row',
    height: TRACKS_HEIGHT,
    borderRadius: 5,
    overflow: 'hidden',
  },
  previewText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  swatcheContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  swatch: {
    width: SWATCHE_SIZE,
    height: SWATCHE_SIZE,
    borderRadius: SWATCHE_SIZE / 2,
    marginHorizontal: 5,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  override: {
    padding: 0,
    borderWidth: 0,
  },
});
