import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnUI, useAnimatedProps } from 'react-native-reanimated';

import { clamp, isRtl, isWeb } from '@utils';

import type { AccessibilityActionEvent, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import type { PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import type { Gesture as GestureType } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated';

export interface SliderCoreProps {
  children: React.ReactNode;

  /** Accessibility label for the slider. */
  label: string;

  /** Accessibility hint for the slider. */
  hint?: string;

  /** Whether the slider is vertical. */
  vertical: boolean;

  /** Whether the slider direction is reversed. */
  reverse: boolean;

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

  /** Whether the thumb is constrained within the slider container. */
  boundedThumb: boolean;

  /** Size of the slider thumb. */
  thumbSize: number;

  /** Thickness of the slider track. */
  sliderThickness: number;

  /** Additional RNGH gestures passed to the gesture handler. */
  gestures: GestureType[];

  /** Style applied to the slider container. */
  style: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;

  /** Current slider value as an animated shared value. Can be read-only. */
  currentValue: SharedValue<number>;

  /** Animated shared value controlling the slider width. */
  width: SharedValue<number>;

  /** Animated shared value controlling the slider height. */
  height: SharedValue<number>;

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
  onBegin: () => void;

  /**
   * Callback triggered when interaction ends.
   *
   * @worklet
   */
  onEnd: () => void;
}

export function SliderCore(props: SliderCoreProps) {
  const {
    children,
    currentValue,
    vertical,
    reverse,
    boundedThumb,
    thumbSize,
    sliderThickness,
    label,
    hint,
    height,
    width,
    gestures,
    style,
    maxValue = 100,
    step = 1,
    onBegin,
    onUpdate,
    onEnd,
  } = props;

  const containerRef = useRef<Animated.View>(null);

  const onGestureUpdate = ({ x, y }: PanGestureHandlerEventPayload) => {
    'worklet';

    const length = (vertical ? height.value : width.value) - (boundedThumb ? thumbSize : 0);
    const pos = clamp((vertical ? y : x) - (boundedThumb ? thumbSize / 2 : 0), length);
    const value = (pos / length) * maxValue;
    const newValue = reverse ? maxValue - value : value;

    onUpdate(newValue);
  };

  const onGestureBegin = (event: PanGestureHandlerEventPayload) => {
    'worklet';
    onBegin();
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
    containerRef.current?.measure((_x, _y, layoutWidth, layoutHeight) => {
      if (!vertical && layoutWidth) {
        width.value = layoutWidth;
      }

      if (vertical && layoutHeight) {
        height.value = layoutHeight;
      }
    });
  }, []);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    if (!vertical && layout.width) {
      width.value = layout.width;
    }

    if (vertical && layout.height) {
      height.value = layout.height;
    }
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

      if (event.key === 'Home') {
        interceptAndSetValue(0);
        return;
      }

      if (event.key === 'End') {
        interceptAndSetValue(maxValue);
        return;
      }

      if (event.key === 'PageUp' || event.key === 'PageDown') {
        const maxJump = maxValue * 0.1;
        const jumpSize = Math.min(Math.max(step * 10, step), maxJump);
        interceptAndSetValue(event.key === 'PageUp' ? value + jumpSize : value - jumpSize);
        return;
      }

      const { incrementKeys, decrementKeys } = getDirectionalKeys();

      if (incrementKeys.has(event.key) || decrementKeys.has(event.key)) {
        interceptAndSetValue(incrementKeys.has(event.key) ? value + step : value - step);
      }
    };

    function getDirectionalKeys() {
      const incrementKeys = new Set<string>();
      const decrementKeys = new Set<string>();

      if (vertical) {
        incrementKeys.add(reverse ? 'ArrowUp' : 'ArrowDown');
        incrementKeys.add(reverse ? 'ArrowLeft' : 'ArrowRight');
        decrementKeys.add(reverse ? 'ArrowDown' : 'ArrowUp');
        decrementKeys.add(reverse ? 'ArrowRight' : 'ArrowLeft');

        return { incrementKeys, decrementKeys };
      }

      const normalDirection = (isRtl && reverse) || (!isRtl && !reverse);
      incrementKeys.add(normalDirection ? 'ArrowRight' : 'ArrowLeft');
      incrementKeys.add('ArrowUp');
      decrementKeys.add(normalDirection ? 'ArrowLeft' : 'ArrowRight');
      decrementKeys.add('ArrowDown');

      return { incrementKeys, decrementKeys };
    }

    div.addEventListener('keydown', onKeyDown);

    return () => {
      div.removeEventListener('keydown', onKeyDown);
    };
  }, [vertical, reverse, currentValue, step, maxValue]);

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

  const thicknessStyle = vertical ? { width: sliderThickness } : { height: sliderThickness };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        ref={containerRef}
        onLayout={onLayout}
        style={[style, thicknessStyle]}
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
