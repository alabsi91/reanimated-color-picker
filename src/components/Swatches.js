import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { COLOR_HSVA } from '../ColorsConversionFormulas';

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
  swatcheContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
