import React from 'react';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import colorKit from '@colorKit';
import usePickerContext from '@context';
import { PanelCore } from '@panels/PanelCore';
import { styles } from '@styles';
import { getStyle, isRtl } from '@utils';

import type { Panel5Props } from '@types';

/** @see [Panel5](https://alabsi91.github.io/reanimated-color-picker/api/panels/panel5/) */
export function Panel5({ gestures = [], style = {}, selectionStyle = {}, accessibilityLabel, accessibilityHint }: Panel5Props) {
  const { hueValue, saturationValue, brightnessValue, onGestureChange, onGestureEnd } = usePickerContext();

  const borderRadius = getStyle(style, 'borderRadius') ?? 0;

  const row = useSharedValue(0);
  const column = useSharedValue(0);
  const adaptiveColor = useSharedValue('#000');
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const squareSize = useDerivedValue(() => Math.max(width.value / 12, height.value / 10), [width, height]);

  const setAdaptiveColor = (color: string) => {
    'worklet';
    const isDark = colorKit.runOnUI().isDark(color);
    adaptiveColor.value = isDark ? '#ffffff' : '#000000';
  };

  // Calculate the position of the selected square on color change.
  // Since color conversion is not 100% accurate, we need to find the closest color in the grid.
  useDerivedValue(() => {
    const hsvColor = {
      h: hueValue.value,
      s: saturationValue.value,
      v: brightnessValue.value,
    };

    for (let y = 0; y < GRID_COLORS.length; y++) {
      for (let x = 0; x < GRID_COLORS[y].length; x++) {
        const gridColor = GRID_COLORS[y][x];

        const areColorsEqual = colorKit.runOnUI().areColorsEqual(gridColor, hsvColor, 5);
        if (!areColorsEqual) continue;

        row.value = y;
        column.value = x;
        setAdaptiveColor(gridColor);

        break;
      }
    }
  }, [hueValue, saturationValue, brightnessValue, row, column]);

  const selectedStyle = useAnimatedStyle(() => {
    const x = column.value * squareSize.value;
    const y = row.value * squareSize.value;

    return {
      width: squareSize.value,
      height: squareSize.value,
      top: y,
      left: isRtl ? undefined : x,
      right: isRtl ? x : undefined,
      borderColor: adaptiveColor.value,
    };
  }, [squareSize, adaptiveColor, row, column]);

  const onUpdate = (newColumn: number, newRow: number) => {
    'worklet';

    const color: string | undefined = GRID_COLORS[newRow]?.[newColumn];
    if (!color) return;

    const { h, s, v } = colorKit.runOnUI().HSV(color).object(false);

    if (hueValue.value === h && saturationValue.value === s && brightnessValue.value === v) {
      return;
    }

    hueValue.value = h;
    saturationValue.value = s;
    brightnessValue.value = v;

    setAdaptiveColor(color);
    onGestureChange();
  };

  const onGestureUpdate = ({ x, y }: { x: number; y: number }) => {
    'worklet';

    if (!squareSize.value) return;

    const newRow = Math.floor(y / squareSize.value);
    const newColumn = Math.floor(x / squareSize.value);

    onUpdate(newColumn, newRow);
  };

  const onEnd = () => {
    'worklet';
    onGestureEnd();
  };

  return (
    <PanelCore
      style={[style, { position: 'relative', borderWidth: 0, padding: 0, aspectRatio: 1.2 }]}
      label={accessibilityLabel ?? '12 by 10 Grid of 120 Colors'}
      hint={accessibilityHint ?? 'Double tap to switch between column and row selection'}
      labelX='Column'
      currentXValue={column}
      maxXValue={12}
      labelY='Row'
      currentYValue={row}
      maxYValue={10}
      reverseY
      width={width}
      height={height}
      gestures={gestures}
      onGestureUpdate={onGestureUpdate}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <Image
        source={require('@assets/grid.png')}
        style={{ borderRadius, width: '100%', height: '100%' }}
        resizeMode='stretch'
        aria-hidden
      />

      <Animated.View style={[styles.selected, selectionStyle, selectedStyle]} aria-hidden />
    </PanelCore>
  );
}

const GRID_COLORS = [
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
