import React, { useEffect, useLayoutEffect } from 'react';
import { AccessibilityInfo } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnUI, useAnimatedProps, useAnimatedRef, useSharedValue } from 'react-native-reanimated';

import { clamp, isRtl, isWeb } from '@utils';

import type { AccessibilityActionEvent, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { Gesture as GestureType } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated';

export interface PanelCoreProps {
  children: React.ReactNode;

  /** Accessibility label for the panel. */
  label: string;

  /** Accessibility hint for the panel. */
  hint?: string;

  /** Label used for accessibility text on the x-axis. */
  labelX: string;

  /** Label used for accessibility text on the y-axis. */
  labelY: string;

  /**
   * Whether the x-axis is reversed.
   *
   * @default false
   */
  reverseX?: boolean;

  /**
   * Whether the y-axis is reversed.
   *
   * @default false
   */
  reverseY?: boolean;

  /** Current value for the x-axis as an animated shared value. Can be read-only. */
  currentXValue: SharedValue<number>;

  /**
   * Maximum value for the x-axis.
   *
   * @default 100
   */
  maxXValue?: number;

  /**
   * Maximum value for the y-axis.
   *
   * @default 100
   */
  maxYValue?: number;

  /**
   * Step size used for increments and decrements.
   *
   * @default 1
   */
  step?: number;

  /** Current value for the y-axis as an animated shared value. Can be read-only. */
  currentYValue: SharedValue<number>;

  /** Animated shared value controlling the panel width. */
  width: SharedValue<number>;

  /** Animated shared value controlling the panel height. */
  height?: SharedValue<number>;

  /** Additional RNGH gestures passed to the gesture handler. */
  gestures: GestureType[];

  /** Style applied to the panel container. */
  style: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;

  /**
   * Callback triggered when the gesture updates. The consumer is responsible for handling cancellations.
   *
   * @worklet
   */
  onGestureUpdate: (xy: { x: number; y: number }) => void;

  /**
   * Updates the panel values.
   *
   * @worklet
   */
  onUpdate: (newXValue: number, newYValue: number) => void;

  /**
   * Callback triggered when the gesture begins.
   *
   * @worklet
   */
  onBegin?: (xy: { x: number; y: number }) => void;

  /**
   * Callback triggered when the gesture ends.
   *
   * @worklet
   */
  onEnd: () => void;
}

export function PanelCore(props: PanelCoreProps) {
  const {
    children,
    currentXValue,
    currentYValue,
    maxXValue = 100,
    maxYValue = 100,
    reverseX = false,
    reverseY = false,
    step = 1,
    labelX,
    labelY,
    label,
    hint,
    height,
    width,
    gestures,
    style,
    onGestureUpdate,
    onBegin,
    onUpdate,
    onEnd,
  } = props;

  const containerRef = useAnimatedRef<Animated.View>();

  const currentMode = useSharedValue<'x' | 'y'>('x');

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    onBegin?.({ x: event.x, y: event.y });
    onGestureUpdate(event);
  };

  const onGestureEnd = () => {
    'worklet';
    onEnd();
  };

  const pan = Gesture.Pan().onBegin(onGestureBegin).onUpdate(onGestureUpdate).onEnd(onGestureEnd);
  const tap = Gesture.Tap().onEnd(onGestureEnd);
  const longPress = Gesture.LongPress().onEnd(onGestureEnd);
  const composed = Gesture.Simultaneous(Gesture.Exclusive(pan, tap, longPress), ...gestures);

  const setValue = (xValue: number, yValue: number) => {
    runOnUI(() => {
      'worklet';
      onUpdate(clamp(xValue, maxXValue), clamp(yValue, maxYValue));
      onEnd();
    })();
  };

  // useLayoutEffect → paint → onLayout
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, layoutWidth, layoutHeight) => {
      if (!layoutWidth || !layoutHeight) return;
      width.value = layoutWidth;
      if (height) height.value = layoutHeight;
    });
  }, []);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!layout.width || !layout.height) return;
    width.value = layout.width;
    if (height) height.value = layout.height;
  };

  useEffect(() => {
    if (!isWeb) {
      return;
    }

    const div = containerRef.current as HTMLDivElement | null;
    if (!div) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const valueX = currentXValue.value;
      const valueY = currentYValue.value;
      const normalXDirection = (isRtl && reverseX) || (!isRtl && !reverseX);

      const interceptAndSetValue = (mode: 'x' | 'y', x: number, y: number) => {
        event.stopPropagation();
        event.preventDefault();
        currentMode.value = mode;
        setValue(x, y);
      };

      switch (event.key) {
        case 'Home':
          interceptAndSetValue('x', 0, valueY);
          break;
        case 'End':
          interceptAndSetValue('x', maxXValue, valueY);
          break;
        case 'ArrowRight':
          interceptAndSetValue('x', valueX + (normalXDirection ? step : -step), valueY);
          break;
        case 'ArrowLeft':
          interceptAndSetValue('x', valueX + (normalXDirection ? -step : step), valueY);
          break;
        case 'ArrowUp':
          interceptAndSetValue('y', valueX, valueY + (reverseY ? -step : step));
          break;
        case 'ArrowDown':
          interceptAndSetValue('y', valueX, valueY + (reverseY ? step : -step));
          break;
      }
    };

    div.addEventListener('keydown', onKeyDown);

    return () => {
      div.removeEventListener('keydown', onKeyDown);
    };
  }, [currentXValue, currentYValue, maxXValue, maxYValue, reverseX, reverseY, step]);

  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const valueX = currentXValue.value;
    const valueY = currentYValue.value;
    let nextX = valueX;
    let nextY = valueY;

    switch (event.nativeEvent.actionName) {
      case 'activate': {
        const next = currentMode.value === 'x' ? 'y' : 'x';
        currentMode.value = next;
        AccessibilityInfo.announceForAccessibility(
          `Switched to ${next === 'x' ? 'horizontal' : 'vertical'} axis. Swipe up or down to adjust ${next === 'x' ? labelX : labelY}.`,
        );
        return;
      }
      case 'increment': {
        if (currentMode.value === 'x') {
          nextX = valueX + step;
          break;
        }
        nextY = valueY + step;
        break;
      }
      case 'decrement': {
        if (currentMode.value === 'x') {
          nextX = valueX - step;
          break;
        }
        nextY = valueY - step;
        break;
      }
    }

    setValue(nextX, nextY);
  };

  const animatedProps = useAnimatedProps(() => {
    const mode = currentMode.value;
    const axisLabel = mode === 'x' ? labelX : labelY;
    const axisValue = mode === 'x' ? currentXValue.value : currentYValue.value;
    const maxValue = mode === 'x' ? maxXValue : maxYValue;
    const text = `${axisLabel} ${Math.round(axisValue)}`;

    if (isWeb) {
      return { 'aria-valuemax': maxValue.toString(), 'aria-valuetext': text } as never;
    }

    return {
      accessibilityValue: { min: 0, max: maxValue, text },
    };
  }, [currentMode, currentXValue, currentYValue, maxXValue, maxYValue, labelX, labelY]);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={style}
        collapsable={false}
        animatedProps={animatedProps}
        tabIndex={0}
        accessibilityRole='adjustable'
        accessibilityActions={[
          { name: 'increment' },
          { name: 'decrement' },
          { name: 'activate', label: `Switch between ${labelX} and ${labelY}` },
        ]}
        onAccessibilityAction={onAccessibilityAction}
        accessibilityLabel={label}
        accessibilityHint={hint}
        aria-valuemin={0}
        accessible
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
