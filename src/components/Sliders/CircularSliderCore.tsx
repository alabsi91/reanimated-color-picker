import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnUI, useAnimatedProps } from 'react-native-reanimated';

import { clamp, isRtl, isWeb } from '@utils';

import type { AccessibilityActionEvent, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { Gesture as GestureType } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated';

export interface CircularSliderCoreProps {
  children: React.ReactNode;

  /** Accessibility label for the circular slider. */
  label: string;

  /** Accessibility hint for the circular slider. */
  hint?: string;

  /**
   * Maximum value for the slider.
   *
   * @default 100
   */
  maxValue?: number;

  /**
   * Step size used for value increments.
   *
   * @default 1
   */
  step?: number;

  /** Additional RNGH gestures passed to the gesture handler. */
  gestures: GestureType[];

  /** Style applied to the circular slider container. */
  style: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;

  /** Current slider value as an animated shared value. Can be read-only. */
  currentValue: SharedValue<number>;

  /** Animated shared value controlling the slider width. */
  width: SharedValue<number>;

  /** Animated shared value controlling the slider border radius. */
  borderRadius: SharedValue<number>;

  /**
   * Callback triggered when the gesture updates.
   *
   * @worklet
   */
  onGestureUpdate: (xy: { x: number; y: number }) => void;

  /**
   * Callback triggered when the slider value updates.
   *
   * @worklet
   */
  onUpdate: (newValue: number) => void;

  /**
   * Callback triggered when interaction begins.
   *
   * @worklet
   */
  onBegin: (xy: { x: number; y: number }) => void;

  /**
   * Callback triggered when interaction ends.
   *
   * @worklet
   */
  onEnd: () => void;
}

export function CircularSliderCore(props: CircularSliderCoreProps) {
  const {
    children,
    currentValue,
    label,
    hint,
    borderRadius,
    width,
    gestures,
    style,
    maxValue = 100,
    step = 1,
    onGestureUpdate,
    onBegin,
    onUpdate,
    onEnd,
  } = props;

  const containerRef = useRef<Animated.View>(null);

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    onBegin({ x: event.x, y: event.y });
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

  const setValue = (value: number) => {
    runOnUI(() => {
      'worklet';
      onUpdate(clamp(value, maxValue));
      onEnd();
    })();
  };

  // useLayoutEffect → paint → onLayout
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, layoutWidth) => {
      if (!layoutWidth) return;
      width.value = layoutWidth;
      borderRadius.value = layoutWidth / 2;
    });
  }, []);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!layout.width) return;
    width.value = layout.width;
    borderRadius.value = layout.width / 2;
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
      const value = currentValue.value;

      const interceptAndSetValue = (newValue: number) => {
        event.stopPropagation();
        event.preventDefault();
        setValue(newValue);
      };

      switch (event.key) {
        case 'Home':
          interceptAndSetValue(0);
          break;
        case 'End':
          interceptAndSetValue(maxValue);
          break;
        case 'PageUp':
        case 'PageDown': {
          const jumpSize = Math.min(Math.max(step * 10, step), maxValue * 0.1);
          interceptAndSetValue(event.key === 'PageUp' ? value + jumpSize : value - jumpSize);
          break;
        }
        case 'ArrowUp':
          interceptAndSetValue(value + step);
          break;
        case 'ArrowDown':
          interceptAndSetValue(value - step);
          break;
        case 'ArrowRight':
          interceptAndSetValue(isRtl ? value - step : value + step);
          break;
        case 'ArrowLeft':
          interceptAndSetValue(isRtl ? value + step : value - step);
          break;
      }
    };

    div.addEventListener('keydown', onKeyDown);

    return () => {
      div.removeEventListener('keydown', onKeyDown);
    };
  }, [currentValue, step, maxValue]);

  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    switch (event.nativeEvent.actionName) {
      case 'increment':
        setValue(currentValue.value + step);
        break;
      case 'decrement':
        setValue(currentValue.value - step);
        break;
    }
  };

  const animatedProps = useAnimatedProps(() => {
    const rounded = step < 1 ? currentValue.value.toFixed(2) : Math.round(currentValue.value).toString();

    if (isWeb) {
      return { 'aria-valuetext': `${rounded} of ${maxValue}` } as never;
    }

    return {
      accessibilityValue: {
        min: 0,
        max: maxValue,
        text: `${rounded} of ${maxValue}`,
      },
    };
  }, [currentValue, maxValue, step]);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={style}
        tabIndex={0}
        accessibilityRole='adjustable'
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={onAccessibilityAction}
        animatedProps={animatedProps}
        accessibilityLabel={label}
        accessibilityHint={hint}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        accessible
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
