import React, { useContext } from 'react';
import { I18nManager, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { COLOR_HEX } from '../ColorsConversionFormulas';
import styles, { CTX } from '../GlobalStyles';

const isRtl = I18nManager.isRTL;

export default function Thumb({ thumbShape = 'ring', thumbSize, thumbColor, handleStyle, vertical, channel }) {
  const { width, height, borderRadius } = { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 };
  const { invertedColorHue, invertedColorBrightness, invertedColorSaturation, invertedColorOpacity, invertedColor, solidColor } =
    useContext(CTX);

  const inverted =
    channel === 'h'
      ? invertedColorHue
      : channel === 'b'
      ? invertedColorBrightness
      : channel === 's'
      ? invertedColorSaturation
      : channel === 'a'
      ? invertedColorOpacity
      : invertedColor;

  const Ring = () => {
    thumbColor = thumbColor ? COLOR_HEX(thumbColor) : null;
    const style = { width, height, borderRadius, backgroundColor: thumbColor + 50, borderColor: thumbColor, borderWidth: 1 };
    const invertedStyle = useAnimatedStyle(() => ({
      backgroundColor: (thumbColor && thumbColor + '50') || (inverted.value === '#ffffff' ? '#ffffff50' : '#00000050'),
      borderColor: thumbColor || inverted.value,
    }));
    return (
      <Animated.View style={[styles.handle, style, invertedStyle, handleStyle]}>
        <Animated.View style={[styles.handleInner, { borderRadius, zIndex: 100 }, solidColor]} />
      </Animated.View>
    );
  };

  const Solid = () => {
    const style = { width, height, borderRadius, backgroundColor: thumbColor || 'gray', borderWidth: 1 };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: inverted.value }));
    return <Animated.View style={[styles.handle, style, styles.shadow, invertedStyle, handleStyle]} />;
  };

  const Hollow = () => {
    const style = { width, height, borderRadius, borderWidth: 2 };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || inverted.value }));
    const invertedBgStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || inverted.value }));
    return (
      <Animated.View style={[styles.handle, style, invertedStyle, handleStyle]}>
        <Animated.View style={[{ width: 4, height: 4, borderRadius: 2 }, invertedBgStyle, styles.shadow]} />
      </Animated.View>
    );
  };

  const Line = () => {
    const thikcness = 3;
    const style = { width, height };
    const lineStyle = {
      borderRadius,
      backgroundColor: thumbColor,
      width: vertical ? '100%' : thikcness,
      height: vertical ? thikcness : '100%',
      transform: [{ rotate: '180deg' }],
    };
    const invertedStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || inverted.value }));

    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <Animated.View style={[lineStyle, styles.shadow, invertedStyle]} />
      </Animated.View>
    );
  };

  const Pill = () => {
    const thikcness = 10;
    const style = { width, height };
    const pillStyle = {
      borderRadius,
      borderColor: thumbColor,
      borderWidth: 2,
      width: vertical ? '100%' : thikcness,
      height: vertical ? thikcness : '100%',
      transform: [{ rotate: '180deg' }],
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || inverted.value }));
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <Animated.View style={[pillStyle, styles.shadow, invertedStyle]} />
      </Animated.View>
    );
  };

  const Plus = () => {
    const thikcness = 1;
    const style = { width, height, borderRadius, borderWidth: thikcness };
    const line1 = {
      borderRadius,
      position: 'absolute',
      width: vertical ? '100%' : thikcness,
      height: vertical ? thikcness : '100%',
      transform: [{ rotate: '180deg' }],
    };
    const line2 = {
      borderRadius,
      width: vertical ? thikcness : '100%',
      height: vertical ? '100%' : thikcness,
      transform: [{ rotate: '180deg' }],
    };
    const invertedStyle = useAnimatedStyle(() => ({ backgroundColor: thumbColor || inverted.value }));
    const invertedBorderStyle = useAnimatedStyle(() => ({ borderColor: thumbColor || inverted.value }));

    return (
      <Animated.View style={[styles.handle, style, invertedBorderStyle, handleStyle]}>
        <Animated.View style={[line1, styles.shadow, invertedStyle]} />
        <Animated.View style={[line2, styles.shadow, invertedStyle]} />
      </Animated.View>
    );
  };

  const TriangleUp = () => {
    const style = {
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
    const invertedStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || inverted.value }));
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <Animated.View style={[shapes.triangle, triangleStyle, invertedStyle]} />
      </Animated.View>
    );
  };

  const TriangleDown = () => {
    const style = {
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
    const invertedStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || inverted.value }));
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <Animated.View style={[shapes.triangle, triangleStyle, invertedStyle]} />
      </Animated.View>
    );
  };

  const DoubleTriangle = () => {
    const style = {
      width,
      height,
      flexDirection: vertical ? (isRtl ? 'row' : 'row-reverse') : 'column',
    };
    const triangleUpStyle = {
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      transform: [{ rotate: vertical ? '90deg' : '0deg' }],
    };
    const triangleDownStyle = {
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      ...(vertical ? (isRtl ? { marginEnd: 2 } : { marginStart: 2 }) : { marginBottom: 2 }), // gap between triangles
      transform: [{ rotate: vertical ? '270deg' : '180deg' }],
    };
    const invertedStyle = useAnimatedStyle(() => ({ borderBottomColor: thumbColor || inverted.value }));
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <Animated.View style={[shapes.triangle, triangleDownStyle, invertedStyle]} />
        <Animated.View style={[shapes.triangle, triangleUpStyle, invertedStyle]} />
      </Animated.View>
    );
  };

  const thumbs = { Ring, Solid, Hollow, Line, Plus, Pill, TriangleUp, TriangleDown, DoubleTriangle };

  thumbShape = thumbShape.toLowerCase().charAt(0).toUpperCase() + thumbShape.slice(1);
  const Element = () => (thumbs.hasOwnProperty(thumbShape) ? thumbs[thumbShape]() : thumbs.Ring());

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
