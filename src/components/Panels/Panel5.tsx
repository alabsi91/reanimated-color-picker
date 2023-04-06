import React, { useContext, useCallback } from 'react';
import { Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { getStyle, isRtl, decimalToHex } from '@utils';
import { styles } from '@styles';
import colorKit from '@colorKit';
import CTX from '@context';

import type { LayoutChangeEvent } from 'react-native';
import type { Panel5Props } from '@types';

export function Panel5({ style = {} }: Panel5Props) {
  const { alphaValue, setColor, onGestureChange, onGestureEnd } = useContext(CTX);

  const borderRadius = getStyle(style, 'borderRadius') ?? 0;

  const squareSize = useSharedValue(0),
    posX = useSharedValue(0),
    posY = useSharedValue(0),
    scale = useSharedValue(1),
    adaptiveColor = useSharedValue('#000');

  const selectedStyle = useAnimatedStyle(() => {
    return {
      top: posY.value * squareSize.value,
      [isRtl ? 'right' : 'left']: posX.value * squareSize.value,
      width: squareSize.value,
      height: squareSize.value,
      borderColor: adaptiveColor.value,
      transform: [{ scale: scale.value }],
    };
  });

  const setAdaptiveColor = (color1: string) => {
    const color = adaptiveColor.value === '#ffffff' ? '#000000' : '#ffffff';
    const contrast = colorKit.contrastRatio(color1, adaptiveColor.value);
    adaptiveColor.value = contrast < 4.5 ? color : adaptiveColor.value;
  };

  const tap = Gesture.Tap().onStart(({ x, y }) => {
    const row = Math.floor(y / squareSize.value);
    const column = Math.floor(x / squareSize.value);
    const color = gridColors[row][column] + decimalToHex(alphaValue.value);

    posX.value = withTiming(column, { duration: 300, easing: Easing.elastic(0.8) });
    posY.value = withTiming(row, { duration: 300, easing: Easing.elastic(0.8) });
    scale.value = withSequence(
      withTiming(1.2, { duration: 150, easing: Easing.elastic(2) }),
      withTiming(1, { duration: 150, easing: Easing.elastic(2) })
    );

    runOnJS(setAdaptiveColor)(color);
    runOnJS(setColor)(color, 50);
    runOnJS(onGestureChange)(color);
    runOnJS(onGestureEnd)(color);
  });

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    squareSize.value = layout.width / 12;
  }, []);

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        onLayout={onLayout}
        style={[styles.panel_container, style, { position: 'relative', borderWidth: 0, padding: 0, aspectRatio: 1.2 }]}
      >
        <Image source={require('@assets/grid.png')} style={[styles.panel_image, { borderRadius }]} resizeMode='stretch' />
        <Animated.View style={[styles.selected, selectedStyle]} />
      </Animated.View>
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
