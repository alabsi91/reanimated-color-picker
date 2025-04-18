import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { styles } from '@styles';
import { getStyle, isRtl } from '@utils';

import type { Panel5Props } from '@types';
import type { LayoutChangeEvent } from 'react-native';

const animationOptions = { duration: 300, easing: Easing.elastic(0.8) };

/** - This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares. */
export function Panel5({ gestures = [], style = {}, selectionStyle = {} }: Panel5Props) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd } = usePickerContext();

  const borderRadius = getStyle(style, 'borderRadius') ?? 0;

  const squareSize = useSharedValue(0),
    posX = useSharedValue(0),
    posY = useSharedValue(0),
    adaptiveColor = useSharedValue('#000');

  const setAdaptiveColor = (color1: string) => {
    'worklet';
    const color = adaptiveColor.value === '#ffffff' ? '#000000' : '#ffffff';
    const contrast = colorKit.runOnUI().contrastRatio(color1, adaptiveColor.value);
    adaptiveColor.value = contrast < 4.5 ? color : adaptiveColor.value;
  };

  // Calculate the position of the selected square on color change.
  // Since color conversion is not 100% accurate, we need to find the closest color in the grid.
  useDerivedValue(() => {
    const hsvColor = { h: hueValue.value, s: saturationValue.value, v: brightnessValue.value };

    for (let y = 0; y < gridColors.length; y++) {
      for (let x = 0; x < gridColors[y].length; x++) {
        const gridColor = gridColors[y][x];
        const areColorsEqual = colorKit.runOnUI().areColorsEqual(gridColor, hsvColor, 5);
        if (!areColorsEqual) continue;
        setAdaptiveColor(gridColor);
        posX.value = withTiming(x, animationOptions);
        posY.value = withTiming(y, animationOptions);
        break;
      }
    }
  }, [hueValue, saturationValue, brightnessValue, posX, posY]);

  const selectedStyle = useAnimatedStyle(() => {
    const x = posX.value * squareSize.value;
    const y = posY.value * squareSize.value;

    return {
      width: squareSize.value,
      height: squareSize.value,
      top: y,
      left: isRtl ? undefined : x,
      right: isRtl ? x : undefined,
      borderColor: adaptiveColor.value,
    };
  }, [squareSize, adaptiveColor, posX, posY]);

  const tap = Gesture.Tap().onBegin(({ x, y }) => {
    if (!squareSize.value) return;

    const row = Math.floor(y / squareSize.value);
    const column = Math.floor(x / squareSize.value);

    const color: string | undefined = gridColors[row]?.[column];
    if (!color) return;

    const { h, s, v } = colorKit.runOnUI().HSV(color).object(false);
    hueValue.value = h;
    saturationValue.value = s;
    brightnessValue.value = v;

    setAdaptiveColor(color);
    onGestureChange();
    onGestureEnd();
  });

  const composed = Gesture.Simultaneous(tap, ...gestures);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    squareSize.value = withTiming(layout.width / 12 || layout.height / 10, { duration: 100 });
  }, []);

  return (
    <GestureDetector gesture={composed}>
      <View
        collapsable={false}
        onLayout={onLayout}
        style={[style, { position: 'relative', borderWidth: 0, padding: 0, aspectRatio: 1.2 }]}
      >
        <Image
          source={require('@assets/grid.png')}
          style={{ borderRadius, width: '100%', height: '100%' }}
          resizeMode='stretch'
        />
        <Animated.View style={[styles.selected, selectionStyle, selectedStyle]} />
      </View>
    </GestureDetector>
  );
}

const gridColors = [
  [
    '#FFFFFF',
    '#EBEBEB',
    '#D6D6D6',
    '#C2C2C2',
    '#ADADAD',
    '#999999',
    '#858585',
    '#707070',
    '#5C5C5C',
    '#474747',
    '#333333',
    '#000000',
  ],
  [
    '#00374A',
    '#011D57',
    '#11053B',
    '#2E063D',
    '#3C071B',
    '#5C0701',
    '#5A1C00',
    '#583300',
    '#563D00',
    '#666100',
    '#4F5504',
    '#263E0F',
  ],
  [
    '#004D65',
    '#012F7B',
    '#1A0A52',
    '#450D59',
    '#551029',
    '#831100',
    '#7B2900',
    '#7A4A00',
    '#785800',
    '#8D8602',
    '#6F760A',
    '#38571A',
  ],
  [
    '#016E8F',
    '#0042A9',
    '#2C0977',
    '#61187C',
    '#791A3D',
    '#B51A00',
    '#AD3E00',
    '#A96800',
    '#A67B01',
    '#C4BC00',
    '#9BA50E',
    '#4E7A27',
  ],
  [
    '#008CB4',
    '#0056D6',
    '#371A94',
    '#7A219E',
    '#99244F',
    '#E22400',
    '#DA5100',
    '#D38301',
    '#D19D01',
    '#F5EC00',
    '#C3D117',
    '#669D34',
  ],
  [
    '#00A1D8',
    '#0061FD',
    '#4D22B2',
    '#982ABC',
    '#B92D5D',
    '#FF4015',
    '#FF6A00',
    '#FFAB01',
    '#FCC700',
    '#FEFB41',
    '#D9EC37',
    '#76BB40',
  ],
  [
    '#01C7FC',
    '#3A87FD',
    '#5E30EB',
    '#BE38F3',
    '#E63B7A',
    '#FE6250',
    '#FE8648',
    '#FEB43F',
    '#FECB3E',
    '#FFF76B',
    '#E4EF65',
    '#96D35F',
  ],
  [
    '#52D6FC',
    '#74A7FF',
    '#864FFD',
    '#D357FE',
    '#EE719E',
    '#FF8C82',
    '#FEA57D',
    '#FEC777',
    '#FED977',
    '#FFF994',
    '#EAF28F',
    '#B1DD8B',
  ],
  [
    '#93E3FC',
    '#A7C6FF',
    '#B18CFE',
    '#E292FE',
    '#F4A4C0',
    '#FFB5AF',
    '#FFC5AB',
    '#FED9A8',
    '#FDE4A8',
    '#FFFBB9',
    '#F1F7B7',
    '#CDE8B5',
  ],
  [
    '#CBF0FF',
    '#D2E2FE',
    '#D8C9FE',
    '#EFCAFE',
    '#F9D3E0',
    '#FFDAD8',
    '#FFE2D6',
    '#FEECD4',
    '#FEF1D5',
    '#FDFBDD',
    '#F6FADB',
    '#DEEED4',
  ],
];
