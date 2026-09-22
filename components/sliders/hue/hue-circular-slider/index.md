# `<HueCircular />`

![HueCircular](https://alabsi91.github.io/reanimated-color-picker/sources/assets/images/HueCircular.png)

A circular slider for adjusting the color's hue.

## Props

### `rotate`

The degree of rotation applied to the hue circle.

`type: number` · `default: 0`

---

### `thumbSize`

The size of the slider's thumb.

`type: number` · `default: 35`

---

### `thumbColor`

The thumb's color. Defaults to an adaptive color based on contrast ratio.

`type: string` · `default: interactive`[^interactive]

---

### `sliderThickness`

The slider's thickness.

`type: number` · `default: 25`

---

### `thumbShape`

The thumb's shape and appearance.

`type: ThumbShapeType` · `default: "ring"`

```ts
type ThumbShapeType =
  | "ring"
  | "solid"
  | "hollow"
  | "line"
  | "plus"
  | "pill"
  | "triangleUp"
  | "triangleDown"
  | "doubleTriangle"
  | "rect"
  | "circle";
```

---

### `thumbStyle`

The thumb's containing `View` style.

`type: ViewStyle`[^style-override]

---

### `thumbInnerStyle`

The thumb's inner `View` style.

`type: ViewStyle`[^style-override]

---

### `thumbScaleAnimationValue`

The scale value of the thumb animation when active.

`type: number` · `default: 1.2`

---

### `thumbScaleAnimationDuration`

The duration of the thumb scale animation when active.

`type: number` · `default: 100`

---

### `renderThumb`

A function that receives `RenderThumbProps` and returns a custom thumb component. Overrides `thumbShape`.

`type: (props: RenderThumbProps) => ReactElement`

```ts
interface RenderThumbProps {
  /** Positions the thumb. Must be applied to a Reanimated component. */
  positionStyle: StyleProp<AnimatedStyle<ViewStyle>>;

  /** The thumb's width in pixels, taken from `thumbSize`. */
  width: number;

  /** The thumb's height in pixels, taken from `thumbSize`. */
  height: number;

  /** `"white"` or `"black"`, whichever contrasts with the current color. */
  adaptiveColor: SharedValue<string>;

  /** The current color without the alpha channel. Updates whenever the color changes. */
  currentColor: SharedValue<string>;

  /** The initial color passed to the color picker. */
  initialColor: string;
}
```

#### Example

```tsx
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import type { RenderThumbProps } from "reanimated-color-picker";

function MyCustomThumb({ width, height, positionStyle, adaptiveColor, currentColor, initialColor }: RenderThumbProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: adaptiveColor.value,
    backgroundColor: currentColor.value,
  }));

  return (
    <Animated.View
      style={[{ width, height, borderWidth: 1, borderRadius: width / 2, overflow: "hidden" }, animatedStyle, positionStyle]}
    >
      <View style={{ backgroundColor: initialColor, width: "50%", height, alignSelf: "flex-end" }} />
    </Animated.View>
  );
}
```

---

### `adaptSpectrum`

The slider background color spectrum adapts to changes in saturation and brightness.

`type: boolean` · `default: false`

---

### `style`

The slider's container style.

`type: ViewStyle`[^style-override]

---

### `containerStyle`

The style of the container that wraps the given children.

`type: ViewStyle`[^style-override]

---

### `accessibilityLabel`

Slider's label for accessibility.

`type: string`

---

### `accessibilityHint`

Slider's hint for accessibility.

`type: string`

[^interactive]: The thumb color adjusts automatically based on contrast ratio when no value is provided.

[^style-override]: Certain style properties will be overridden.
