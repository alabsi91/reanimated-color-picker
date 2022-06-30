import React, { useRef, useEffect, useMemo } from 'react';
import { View, Image, I18nManager, Pressable, TextInput, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { ALPHA_HEX, COLOR_HSVA, CONTRAST_RATIO, HSL_HEX, HSL_RGB, HSV_HSL } from './ColorsConversionFormulas';

const PANEL_IMAGE = require('./assets/Background.png'),
  OPACITY_IMAGE = require('./assets/Opacity.png'),
  HUE_IMAGE = require('./assets/Hue.png'),
  SATURATION_IMAGE = require('./assets/Saturation.png'),
  BRIGHTNESS_IMAGE = require('./assets/Brightness.png');

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

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = props => {
  const { text, style, customStyle } = { ...props };

  const animatedProps = useAnimatedProps(() => ({ text: text.value }));

  return (
    <AnimatedTextInput
      underlineColorAndroid='transparent'
      editable={false}
      value={text.value}
      style={[{ fontWeight: 'bold', padding: 0, height: '100%', width: '100%', textAlign: 'center' }, customStyle, style]}
      {...{ animatedProps }}
    />
  );
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

  const panelThumbeSize = useRef(thumbsSize);
  const hueThumbeSize = useRef(thumbsSize);
  const brightnessThumbeSize = useRef(thumbsSize);
  const saturationThumbeSize = useRef(thumbsSize);
  const opacityThumbeSize = useRef(thumbsSize);

  const hue = useRef(initialColor.current.h);
  const saturation = useRef(initialColor.current.s);
  const brightness = useRef(initialColor.current.b);
  const alpha = useRef(initialColor.current.a);

  const color_hsl = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current };
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };
  const color_hsla = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current, a: alpha.current };
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return `hsla(${h}, ${s}%, ${l}%, ${color.a / 100})`;
  };
  const color_hex = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current, a: alpha.current };
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    return HSL_HEX(h, s, l) + (color.a === 100 ? '' : ALPHA_HEX(color.a));
  };
  const color_rgb = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current };
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    const { r, g, b } = HSL_RGB(h, s, l);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const color_rgba = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current, a: alpha.current };
    const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
    const { r, g, b } = HSL_RGB(h, s, l);
    return `rgba(${r}, ${g}, ${b}, ${color.a / 100})`;
  };
  const color_hsv = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current };
    return `hsv(${color.h}, ${color.s}%, ${color.b}%)`;
  };
  const color_hsva = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current, a: alpha.current };
    return `hsva(${color.h}, ${color.s}%, ${color.b}%, ${color.a / 100})`;
  };

  const returnedResults = color => {
    color ??= { h: hue.current, s: saturation.current, b: brightness.current, a: alpha.current };
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
  const previewColorStyle = useAnimatedStyle(() => ({ backgroundColor: previewColor.value }));
  const previewColorWithoutOpacity = useAnimatedStyle(() => ({
    backgroundColor: previewColor.value.length > 7 ? previewColor.value.substring(0, 7) : previewColor.value,
  }));
  const activeHue = useSharedValue(HSL_HEX(hue.current, 100, 50));
  const activeHueStyle = useAnimatedStyle(() => ({ backgroundColor: activeHue.value }));

  const hue_handlePos = useSharedValue(0); // for hue slider
  const saturationPanel_handlePos = useSharedValue(0); // for saturation panle
  const saturationSlider_handlePos = useSharedValue(0); // for saturation slider
  const brightnessPanel_handlePos = useSharedValue(0); // for brightness panel
  const brightnessSlider_handlePos = useSharedValue(0); // for brightness slider
  const opacity_handlePos = useSharedValue(0); // for opacity slider
  const previewTextColor = useSharedValue('#ffffff'); // for result text color
  const previewText = useSharedValue(returnedResults()[previewColorFormat.current]); // for result text

  const resultTextColorST = useAnimatedStyle(() => ({ color: previewTextColor.value }));

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

  const updateHue = hueChannel => {
    hue.current = hueChannel;
    previewColor.value = color_hex(); // to update result color.
    previewText.value = returnedResults()[previewColorFormat.current]; // update color text
    // change result text color based on lightness
    const contrast = CONTRAST_RATIO(hue.current, saturation.current, brightness.current, previewTextColor.value);
    previewTextColor.value =
      contrast < CONTRAST_RATIO_MIN ? (previewTextColor.value === '#ffffff' ? '#000000' : '#ffffff') : previewTextColor.value;

    activeHue.value = HSL_HEX(hueChannel, 100, 50); // to update SV background color.
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
    // saturation
    saturationPanel_handlePos.value = withTiming(
      isRtl ? (s / SB_MAX) * width - width + panelThumbeSize.current / 2 : (s / SB_MAX) * width - panelThumbeSize.current / 2,
      duration
    );
    saturationSlider_handlePos.value = withTiming(
      isRtl
        ? (s / SB_MAX) * width - width + saturationThumbeSize.current / 2
        : (s / SB_MAX) * width - saturationThumbeSize.current / 2,
      duration
    );
    // brightness
    brightnessPanel_handlePos.value = withTiming(width - (b / SB_MAX) * width - panelThumbeSize.current / 2, duration);
    brightnessSlider_handlePos.value = withTiming(
      isRtl
        ? (b / SB_MAX) * width - width + brightnessThumbeSize.current / 2
        : (b / SB_MAX) * width - brightnessThumbeSize.current / 2,
      duration
    );
    // hue
    hue_handlePos.value = withTiming(
      isRtl
        ? width - (h / HUE_MAX) * width - width + hueThumbeSize.current / 2
        : width - (h / HUE_MAX) * width - hueThumbeSize.current / 2,
      100
    );
    // opacity
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
    React.Children.map(children, child => {
      switch (child.type.name) {
        case 'Panel':
          return React.cloneElement(child, {
            activeHueStyle,
            previewTextColor,
            previewColorWithoutOpacity,
            saturationPanel_handlePos,
            saturationSlider_handlePos,
            brightnessPanel_handlePos,
            brightnessSlider_handlePos,
            updateSB,
            onGestureEventFinish,
            setHandlesPos,
            panelThumbeSize,
            brightnessThumbeSize,
            saturationThumbeSize,
            width,
            thumbsSize,
          });
        case 'Preview':
          return React.cloneElement(child, {
            width,
            initialColor,
            returnedResults,
            value,
            previewColorStyle,
            previewText,
            resultTextColorST,
            previewColorFormat,
          });
        case 'HueSlider':
          return React.cloneElement(child, {
            width,
            hueThumbeSize,
            setHandlesPos,
            updateHue,
            onGestureEventFinish,
            hue_handlePos,
            previewColorWithoutOpacity,
            tracksHeight,
            thumbsSize,
          });
        case 'SaturationSlider':
          return React.cloneElement(child, {
            width,
            saturationThumbeSize,
            panelThumbeSize,
            setHandlesPos,
            updateSaturation,
            onGestureEventFinish,
            saturationPanel_handlePos,
            saturationSlider_handlePos,
            previewColorWithoutOpacity,
            tracksHeight,
            activeHueStyle,
            thumbsSize,
          });
        case 'BrightnessSlider':
          return React.cloneElement(child, {
            width,
            brightnessThumbeSize,
            panelThumbeSize,
            setHandlesPos,
            updateBrightness,
            onGestureEventFinish,
            brightnessPanel_handlePos,
            brightnessSlider_handlePos,
            previewColorWithoutOpacity,
            activeHueStyle,
            tracksHeight,
            thumbsSize,
          });
        case 'OpacitySlider':
          return React.cloneElement(child, {
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
          });
        case 'Swatches':
          return React.cloneElement(child, {
            width,
            initialColor,
            setHandlesPos,
            onChange,
            onComplete,
            returnedResults,
          });

        default:
          return child;
      }
    });

  return (
    <GestureHandlerRootView style={[styles.wrapper, style]}>
      <RenderChildren />
    </GestureHandlerRootView>
  );
}

export function Panel({
  activeHueStyle,
  previewTextColor,
  previewColorWithoutOpacity,
  saturationPanel_handlePos,
  saturationSlider_handlePos,
  brightnessPanel_handlePos,
  brightnessSlider_handlePos,
  updateSB,
  onGestureEventFinish,
  setHandlesPos,
  panelThumbeSize,
  brightnessThumbeSize,
  saturationThumbeSize,
  width,
  thumbsSize,
  borderRadius = 5, // by user
  thumbSize = thumbsSize, // by user
}) {
  panelThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_panelHandle = useSharedValue(1);

  const panel_handleStyle = useAnimatedStyle(() => ({
    backgroundColor: previewTextColor.value === '#ffffff' ? '#ffffff50' : '#00000050',
    borderColor: previewTextColor.value,
    transform: [
      { translateX: saturationPanel_handlePos.value },
      { translateY: brightnessPanel_handlePos.value },
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

      saturationPanel_handlePos.value = isRtl ? percentX * width - width + thumbSize / 2 : percentX * width - thumbSize / 2;
      brightnessPanel_handlePos.value = percentY * width - thumbSize / 2;

      brightnessSlider_handlePos.value = isRtl
        ? (brightnessY / SB_MAX) * width - width + brightnessThumbeSize.current / 2
        : (brightnessY / SB_MAX) * width - brightnessThumbeSize.current / 2;
      saturationSlider_handlePos.value = isRtl
        ? (saturationX / SB_MAX) * width - width + saturationThumbeSize.current / 2
        : (saturationX / SB_MAX) * width - saturationThumbeSize.current / 2;

      runOnJS(updateSB)(saturationX, brightnessY);
    },
    onFinish: () => {
      scale_panelHandle.value = withTiming(1, { duration: 100 });
      runOnJS(onGestureEventFinish)();
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panel_GestureEvent} minDist={0}>
      <Animated.View style={[styles.panel_container, { width, height: width, borderRadius }, activeHueStyle]}>
        <Image source={PANEL_IMAGE} style={[styles.panel_image, { borderRadius }]} />
        <Animated.View
          style={[styles.handle, { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 }, panel_handleStyle]}
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
  resultTextColorST,
  previewColorFormat,
  style = {}, // by user
  textStyle = {}, // by user
  colorFormat = 'hex', // by user
  hideInitialColor = false, // by user
}) {
  previewColorFormat.current = colorFormat;

  const initialColorText = useMemo(() => {
    const { h, s, b } = initialColor.current;
    const hsl = HSV_HSL(h, s, b);
    const formated = returnedResults(initialColor.current)[previewColorFormat.current];
    const color = hsl.l < 50 ? '#fff' : '#000';
    return { formated, color };
  }, [value, colorFormat]);

  return (
    <View style={[styles.preview, { width }, style]}>
      {!hideInitialColor && (
        <View style={[styles.previewChildren, { backgroundColor: value }]}>
          <Text style={[{ color: initialColorText.color }, { fontWeight: 'bold' }, textStyle]}>{initialColorText.formated}</Text>
        </View>
      )}
      <Animated.View style={[styles.previewChildren, previewColorStyle]}>
        <ReText text={previewText} style={resultTextColorST} customStyle={textStyle} />
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
  previewColorWithoutOpacity,
  tracksHeight,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  trackHeight = tracksHeight, // by user
  borderRadius = 5, // by user
}) {
  trackHeight = trackHeight <= 80 ? trackHeight : 80;
  hueThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_hueHandle = useSharedValue(1);

  const hue_handleStyle = useAnimatedStyle(() => ({
    backgroundColor: '#ffffff50',
    borderColor: '#ffffff',
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
      <Animated.View style={{ position: 'relative', width, height: trackHeight }}>
        <View style={[styles.sliderImageContainer, { borderRadius }]}>
          <Image source={HUE_IMAGE} style={styles.sliderImage} />
        </View>
        <Animated.View
          style={[styles.handle, { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 }, hue_handleStyle]}
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
  panelThumbeSize,
  setHandlesPos,
  updateSaturation,
  onGestureEventFinish,
  saturationPanel_handlePos,
  saturationSlider_handlePos,
  previewColorWithoutOpacity,
  tracksHeight,
  activeHueStyle,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  trackHeight = tracksHeight, // by user
  borderRadius = 5, // by user
}) {
  trackHeight = trackHeight <= 80 ? trackHeight : 80;
  saturationThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_saturationHandle = useSharedValue(1); // for handles scale.

  const saturation_handleStyle = useAnimatedStyle(() => ({
    backgroundColor: '#ffffff50',
    borderColor: '#ffffff',
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
        scale_saturationHandle.value = withTiming(HANDLES_SCALE, { duration: 100 });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const saturationX = Math.round(percent * SB_MAX);

        saturationSlider_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;
        saturationPanel_handlePos.value = isRtl
          ? (saturationX / SB_MAX) * width - width + panelThumbeSize.current / 2
          : (saturationX / SB_MAX) * width - panelThumbeSize.current / 2;

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
      <Animated.View style={[{ position: 'relative', width, height: trackHeight }]}>
        <Animated.View style={[styles.sliderImageContainer, { borderRadius }, activeHueStyle]}>
          <Image source={SATURATION_IMAGE} style={styles.sliderImage} />
        </Animated.View>
        <Animated.View
          style={[styles.handle, { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 }, saturation_handleStyle]}
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
  panelThumbeSize,
  setHandlesPos,
  updateBrightness,
  onGestureEventFinish,
  brightnessPanel_handlePos,
  brightnessSlider_handlePos,
  previewColorWithoutOpacity,
  tracksHeight,
  activeHueStyle,
  thumbsSize,
  thumbSize = thumbsSize, // by user
  trackHeight = tracksHeight, // by user
  borderRadius = 5, // by user
}) {
  trackHeight = trackHeight <= 80 ? trackHeight : 80;
  brightnessThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_brightnessHandle = useSharedValue(1); // for handles scale.

  const brightness_handleStyle = useAnimatedStyle(() => ({
    backgroundColor: '#ffffff50',
    borderColor: '#ffffff',
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
        scale_brightnessHandle.value = withTiming(HANDLES_SCALE, { duration: 100 });
      },
      onActive: (event, ctx) => {
        const clamp = (v, max) => Math.min(Math.max(v, 0), max);

        const x = event.translationX;
        const pos = clamp(x + ctx.x, width);
        const percent = pos / width;

        const brightnessX = Math.round(percent * SB_MAX);

        brightnessSlider_handlePos.value = isRtl ? percent * width - width + thumbSize / 2 : percent * width - thumbSize / 2;
        brightnessPanel_handlePos.value = width - (brightnessX / SB_MAX) * width - panelThumbeSize.current / 2;

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
      <Animated.View style={[{ position: 'relative', width, height: trackHeight }]}>
        <Animated.View style={[styles.sliderImageContainer, { borderRadius }, activeHueStyle]}>
          <Image source={BRIGHTNESS_IMAGE} style={styles.sliderImage} />
        </Animated.View>
        <Animated.View
          style={[styles.handle, { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 }, brightness_handleStyle]}
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
  trackHeight = tracksHeight, // by user
  borderRadius = 5, // by user
}) {
  trackHeight = trackHeight <= 80 ? trackHeight : 80;
  opacityThumbeSize.current = thumbSize;

  useEffect(() => {
    setHandlesPos();
  }, []);

  const scale_opacityHandle = useSharedValue(1);

  const opacity_handleStyle = useAnimatedStyle(() => ({
    backgroundColor: '#ffffff50',
    borderColor: '#ffffff',
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
      <Animated.View style={{ position: 'relative', width, height: trackHeight }}>
        <Animated.View style={[styles.sliderImageContainer, { borderRadius }, activeHueStyle]}>
          <Image source={OPACITY_IMAGE} style={styles.sliderImage} />
        </Animated.View>
        <Animated.View
          style={[styles.handle, { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 }, opacity_handleStyle]}
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
  colors, // by user
  style = {}, // by user
  swatcheStyle = {}, // by user
}) {
  colors ??= SWATCHES_COLORS;
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
          style={[styles.swatch, swatcheStyle, { backgroundColor: swatch }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  panel_image: {
    width: '100%',
    height: '100%',
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
  previewChildren: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
});
