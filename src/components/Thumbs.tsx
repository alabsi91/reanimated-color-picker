import React, { useContext } from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import type { SharedValue, AnimatedStyleProp } from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';
import type { thumbShapeType } from '../types';
import colorKit from '../colorKit';
import { CTX } from '../ColorPicker';
import { styles } from '../styles';

const isRtl = I18nManager.isRTL;

export type ThumbProps = {
  width: number;
  height: number;
  borderRadius: number;
  thumbColor?: string;
  adaptiveColor: SharedValue<string>;
  handleStyle: {};
  innerStyle?: {};
  style?: {};
  solidColor: AnimatedStyleProp<ViewStyle>;
  renderThumb?: (props: ThumbProps) => JSX.Element;
  vertical?: boolean;
};

const Thumbs = {
  Ring: ({ width, height, borderRadius, thumbColor, adaptiveColor, handleStyle, innerStyle, solidColor, style }: ThumbProps) => {
    const thumb_Color = thumbColor ? colorKit.HEX(thumbColor) : undefined;
    const computedStyle = {
      width,
      height,
      borderRadius,
      backgroundColor: (thumb_Color || '#ffffff') + 50,
      borderColor: thumbColor,
      borderWidth: 1,
    };
    const invertedStyle = useAnimatedStyle(() => ({
      backgroundColor: (thumbColor && thumbColor + '50') || (adaptiveColor.value === '#ffffff' ? '#ffffff50' : '#00000050'),
      borderColor: thumbColor || adaptiveColor.value,
    }));
    return (
      <Animated.View style={[styles.handle, style, computedStyle, invertedStyle, handleStyle]}>
        <Animated.View style={[styles.handleInner, styles.shadow, { borderRadius, zIndex: 100 }, solidColor, innerStyle]} />
      </Animated.View>
    );
  },
  Solid: ({ width, height, borderRadius, thumbColor, adaptiveColor, handleStyle, style }: ThumbProps) => {
    const computedStyle = { width, height, borderRadius, backgroundColor: thumbColor || 'gray', borderWidth: 1 };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }));
    return <Animated.View style={[styles.handle, computedStyle, style, styles.shadow, invertedStyle, handleStyle]} />;
  },
  Hollow: ({ width, height, borderRadius, thumbColor, adaptiveColor, handleStyle, innerStyle, style }: ThumbProps) => {
    const computedStyle = { width, height, borderRadius, borderWidth: 2 };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || inverted.value }));
    const invertedBgStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || inverted.value }));
    return (
      <Animated.View style={[styles.handle, style, computedStyle, invertedStyle, handleStyle]}>
        <Animated.View style={[{ width: 4, height: 4, borderRadius: 2 }, invertedBgStyle, styles.shadow, innerStyle]} />
      </Animated.View>
    );
  },
  Line: ({ width, height, borderRadius, thumbColor, adaptiveColor, handleStyle, innerStyle, style, vertical }: ThumbProps) => {
    const thickness = 3;
    const computedStyle = { width, height };
    const lineStyle = {
      borderRadius,
      backgroundColor: thumbColor,
      width: vertical ? '100%' : thickness,
      height: vertical ? thickness : '100%',
    };
    const invertedStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || adaptiveColor.value }));

    return (
      <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
        <Animated.View style={[lineStyle, styles.shadow, invertedStyle, innerStyle]} />
      </Animated.View>
    );
  },
  Pill: ({ width, height, borderRadius, thumbColor, adaptiveColor, handleStyle, innerStyle, style, vertical }: ThumbProps) => {
    const computedStyle = { width, height };
    const pillStyle = {
      borderRadius,
      borderColor: thumbColor,
      borderWidth: 2,
      width: vertical ? '100%' : 10,
      height: vertical ? 10 : '100%',
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || adaptiveColor.value }));
    return (
      <Animated.View style={[styles.handle, computedStyle, style, handleStyle]}>
        <Animated.View style={[pillStyle, styles.shadow, invertedStyle, innerStyle]} />
      </Animated.View>
    );
  },
  Plus: ({ width, height, borderRadius, thumbColor, adaptiveColor, handleStyle, innerStyle, style, vertical }: ThumbProps) => {
    const thickness = 2;
    const computedStyle = { width, height, borderRadius, borderWidth: thickness };
    const line1 = {
      borderRadius,
      position: 'absolute' as const,
      width: vertical ? '100%' : thickness,
      height: vertical ? thickness : '100%',
    };
    const line2 = {
      borderRadius,
      width: vertical ? thickness : '100%',
      height: vertical ? '100%' : thickness,
    };
    const invertedStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || adaptiveColor.value }));
    const invertedBorderStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || adaptiveColor.value }));

    return (
      <Animated.View style={[styles.handle, style, computedStyle, invertedBorderStyle, handleStyle]}>
        <Animated.View style={[line1, styles.shadow, invertedStyle, innerStyle]} />
        <Animated.View style={[line2, styles.shadow, invertedStyle, innerStyle]} />
      </Animated.View>
    );
  },
  TriangleUp: ({ width, height, thumbColor, adaptiveColor, handleStyle, innerStyle, style, vertical }: ThumbProps) => {
    const computedStyle = {
      width,
      height,
      ...(vertical
        ? { justifyContent: 'center', alignItems: isRtl ? 'flex-end' : 'flex-start' }
        : { justifyContent: 'flex-end' }),
    };
    const triangleStyle = {
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      transform: [{ rotate: vertical ? '90deg' : '0deg' }],
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || adaptiveColor.value }));
    return (
      <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
        <Animated.View style={[shapes.triangle, triangleStyle, invertedStyle, innerStyle]} />
      </Animated.View>
    );
  },
  TriangleDown: ({ width, height, thumbColor, adaptiveColor, handleStyle, innerStyle, style, vertical }: ThumbProps) => {
    const computedStyle = {
      width,
      height,
      ...(vertical
        ? { justifyContent: 'center', alignItems: isRtl ? 'flex-start' : 'flex-end' }
        : { justifyContent: 'flex-start' }),
    };
    const triangleStyle = {
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      transform: [{ rotate: vertical ? '270deg' : '180deg' }],
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || adaptiveColor.value }));
    return (
      <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
        <Animated.View style={[shapes.triangle, triangleStyle, invertedStyle, innerStyle]} />
      </Animated.View>
    );
  },
  DoubleTriangle: ({ width, height, thumbColor, adaptiveColor, handleStyle, innerStyle, style, vertical }: ThumbProps) => {
    const computedStyle = {
      width,
      height,
      flexDirection: vertical ? (isRtl ? 'row' : 'row-reverse') : 'column',
    };
    const triangleUpStyle = {
      borderBottomWidth: 10,
      borderLeftWidth: 5,
      borderRightWidth: 5,
      transform: [{ rotate: vertical ? '90deg' : '0deg' }],
    };
    const triangleDownStyle = {
      borderBottomWidth: 10,
      borderLeftWidth: 5,
      borderRightWidth: 5,
      transform: [{ rotate: vertical ? '270deg' : '180deg' }],
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || adaptiveColor.value }));
    return (
      <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
        <Animated.View style={[shapes.triangle, triangleDownStyle, invertedStyle, innerStyle]} />
        <View style={{ width: '50%', height: '50%' }} />
        <Animated.View style={[shapes.triangle, triangleUpStyle, invertedStyle, innerStyle]} />
      </Animated.View>
    );
  },
  Rect: ({ width, height, adaptiveColor, handleStyle, innerStyle, style, vertical, solidColor }: ThumbProps) => {
    const computedStyle = { width, height };
    const pillStyle = {
      borderWidth: 1,
      width: vertical ? '100%' : 14,
      height: vertical ? 14 : '100%',
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }));
    return (
      <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
        <Animated.View style={[pillStyle, styles.shadow, invertedStyle, solidColor, innerStyle]} />
      </Animated.View>
    );
  },
  Circle: ({ width, height, borderRadius, adaptiveColor, handleStyle, innerStyle, solidColor, style }: ThumbProps) => {
    const computedStyle = { width, height };
    const pillStyle = {
      borderRadius,
      borderWidth: 1,
      width: '100%',
      height: '100%',
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: adaptiveColor.value }));
    return (
      <Animated.View style={[styles.handle, style, computedStyle, handleStyle]}>
        <Animated.View style={[pillStyle, styles.shadow, invertedStyle, solidColor, innerStyle]} />
      </Animated.View>
    );
  },
};

type Props = Omit<ThumbProps, 'borderRadius' | 'height' | 'inverted' | 'width' | 'solidColor'> & {
  adaptSpectrum?: boolean;
  channel?: 'h' | 's' | 'v' | 'a';
  thumbShape?: thumbShapeType;
  thumbSize: number;
};

export default function Thumb({
  handleStyle,
  innerStyle,
  style,
  thumbColor,
  renderThumb,
  thumbShape = 'ring',
  thumbSize,
  vertical = false,
  adaptSpectrum,
  channel,
}: Props) {
  const { width, height, borderRadius } = { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 };
  const { hueValue, saturationValue, brightnessValue, alphaValue } = useContext(CTX);

  const resultColor = useSharedValue('#ffffff');
  const solidColor = useAnimatedStyle(() => ({ backgroundColor: resultColor.value }));
  const setResultColor = (color: { h: number; s: number; v: number; a?: number }) => {
    resultColor.value = colorKit.HEX(color);
  };

  const adaptiveColor = useSharedValue('#ffffff');
  const setAdaptiveColor = (color1: { h: number; s: number; v: number; a?: number }) => {
    const color = adaptiveColor.value === '#ffffff' ? '#000000' : '#ffffff';
    const contrast = colorKit.contrastRatio(color1, adaptiveColor.value);
    adaptiveColor.value = contrast < 4.5 ? color : adaptiveColor.value;
  };

  /**
   * Get the current color and calculate its contrast ratio against white or black,
   * depending on the channel and whether 'adaptSpectrum' is enabled
   */
  const getColorForAdaptiveColor = () => {
    'worklet';
    if (adaptSpectrum) {
      if (channel === 'a') {
        return alphaValue.value > 0.7
          ? { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value }
          : { h: 0, s: 0, v: 70 };
      }
      return { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    }

    switch (channel) {
      case 'h':
        return { h: hueValue.value, s: 100, v: 100 };
      case 'v':
        return { h: hueValue.value, s: 100, v: brightnessValue.value };
      case 's':
        return { h: hueValue.value, s: saturationValue.value, v: 70 };
      case 'a':
        return { h: hueValue.value, s: alphaValue.value * 100, v: 70 };
      default:
        return { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };
    }
  };

  // When the values of channels change
  useDerivedValue(() => {
    alphaValue.value; // to keep track with `alphaValue` changes
    runOnJS(setAdaptiveColor)(getColorForAdaptiveColor());
    runOnJS(setResultColor)({ h: hueValue.value, s: saturationValue.value, v: brightnessValue.value });
  });

  const thumbProps: ThumbProps = {
    width,
    height,
    borderRadius,
    vertical,
    solidColor,
    adaptiveColor,
    handleStyle,
    innerStyle,
    style,
    thumbColor,
  };

  if (renderThumb) {
    return renderThumb(thumbProps);
  }

  const thumb_Shape = (thumbShape.toLowerCase().charAt(0).toUpperCase() + thumbShape.slice(1)) as keyof typeof Thumbs;
  const Element = () => (Thumbs.hasOwnProperty(thumb_Shape) ? Thumbs[thumb_Shape](thumbProps) : Thumbs.Ring(thumbProps));

  return <Element />;
}

const shapes = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
