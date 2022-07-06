import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLOR_HEX } from '../ColorsConversionFormulas';
import styles from '../GlobalStyles';

const isRtl = I18nManager.isRTL;

export default function Thumb({ thumbShape = 'ring', thumbSize, thumbColor = '#ffffff', handleStyle, solidColor, vertical }) {
  const { width, height, borderRadius } = { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 };

  const ring = () => {
    thumbColor = COLOR_HEX(thumbColor);
    const style = { width, height, borderRadius, backgroundColor: thumbColor + 50, borderColor: thumbColor, borderWidth: 1 };
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <Animated.View style={[styles.handleInner, { borderRadius, zIndex: 100 }, solidColor]} />
      </Animated.View>
    );
  };

  const solid = () => {
    const style = { width, height, borderRadius, backgroundColor: thumbColor };
    return <Animated.View style={[styles.handle, style, styles.shadow, handleStyle]} />;
  };

  const line = () => {
    const thikcness = 3;
    const style = { width, height };
    const lineStyle = {
      borderRadius,
      backgroundColor: thumbColor,
      width: vertical ? '100%' : thikcness,
      height: vertical ? thikcness : '100%',
      transform: [{ rotate: '180deg' }],
    };
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <View style={[lineStyle, styles.shadow]} />
      </Animated.View>
    );
  };

  const plus = () => {
    const thikcness = 2;
    const style = { width, height };
    const line1 = {
      borderRadius,
      position: 'absolute',
      backgroundColor: thumbColor,
      width: vertical ? '100%' : thikcness,
      height: vertical ? thikcness : '100%',
      transform: [{ rotate: '180deg' }],
    };
    const line2 = {
      borderRadius,
      backgroundColor: thumbColor,
      width: vertical ? thikcness : '100%',
      height: vertical ? '100%' : thikcness,
      transform: [{ rotate: '180deg' }],
    };
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <View style={[line1, styles.shadow]} />
        <View style={[line2, styles.shadow]} />
      </Animated.View>
    );
  };

  const triangleUp = () => {
    const style = {
      width,
      height,
      ...(vertical
        ? { justifyContent: 'center', alignItems: isRtl ? 'flex-end' : 'flex-start' }
        : { justifyContent: isRtl ? 'flex-end' : 'flex-start' }),
    };
    const triangleStyle = {
      borderBottomColor: thumbColor,
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      transform: [{ rotate: vertical ? '90deg' : '0deg' }],
    };
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <View style={[shapes.triangle, triangleStyle]} />
      </Animated.View>
    );
  };

  const triangleDown = () => {
    const style = {
      width,
      height,
      ...(vertical
        ? { justifyContent: 'center', alignItems: isRtl ? 'flex-start' : 'flex-end' }
        : { justifyContent: isRtl ? 'flex-start' : 'flex-end' }),
    };
    const triangleStyle = {
      borderBottomColor: thumbColor,
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      transform: [{ rotate: vertical ? '270deg' : '180deg' }],
    };
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <View style={[shapes.triangle, triangleStyle]} />
      </Animated.View>
    );
  };

  const doubleTriangle = () => {
    const style = {
      width,
      height,
      flexDirection: vertical ? (isRtl ? 'row' : 'row-reverse') : 'column',
    };
    const triangleUpStyle = {
      borderBottomColor: thumbColor,
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      transform: [{ rotate: vertical ? '90deg' : '0deg' }],
    };
    const triangleDownStyle = {
      borderBottomColor: thumbColor,
      borderBottomWidth: width / 2,
      borderLeftWidth: width / 4,
      borderRightWidth: width / 4,
      ...(vertical ? (isRtl ? { marginEnd: 2 } : { marginStart: 2 }) : { marginBottom: 2 }), // gap between triangles
      transform: [{ rotate: vertical ? '270deg' : '180deg' }],
    };
    return (
      <Animated.View style={[styles.handle, style, handleStyle]}>
        <View style={[shapes.triangle, triangleDownStyle]} />
        <View style={[shapes.triangle, triangleUpStyle]} />
      </Animated.View>
    );
  };

  const thumbs = { ring, solid, line, plus, triangleUp, triangleDown, doubleTriangle };

  const Element = () => (thumbs.hasOwnProperty(thumbShape) ? thumbs[thumbShape]() : thumbs.ring());

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
