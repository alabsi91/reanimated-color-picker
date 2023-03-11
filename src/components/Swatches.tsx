import React, { useContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { CTX } from '../ColorPicker';

import type { SwatchesPorps } from '../types';

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

export function Swatches({ colors = SWATCHES_COLORS, style = {}, swatchStyle = {} }: SwatchesPorps) {
  const { setColor, onGestureChange, onGestureEnd } = useContext(CTX);

  const onPress = async (swatch: string) => {
    setColor(swatch);
    onGestureChange(swatch);
    onGestureEnd(swatch);
  };

  return (
    <View style={[styles.swatcheContainer, style]}>
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
    alignSelf: 'stretch',
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
