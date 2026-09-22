# `<Panel2 />`

A Windows-style square panel for adjusting hue and either saturation or brightness. Move the thumb horizontally to change hue, and vertically to adjust the channel set by `verticalChannel`.

![verticalChannel: "saturation"](https://alabsi91.github.io/reanimated-color-picker/sources/assets/images/panel2-saturation.png)  
_`verticalChannel: "saturation"`_

![verticalChannel: "brightness"](https://alabsi91.github.io/reanimated-color-picker/sources/assets/images/panel2-brightness.png)  
_`verticalChannel: "brightness"`_

![verticalChannel: "hsl-saturation"](https://alabsi91.github.io/reanimated-color-picker/sources/assets/images/panel2-hsl-saturation.png)  
_`verticalChannel: "hsl-saturation"`_

> [!tip]
> For more control, add a slider next to `Panel2` that adjusts the opposite channel. For example, if `verticalChannel` is `"saturation"`, pair it with a [`<BrightnessSlider />`](https://alabsi91.github.io/reanimated-color-picker/components/sliders/hsb/brightness-slider/), and vice versa.

## Props

### `verticalChannel`

Determines which color channel is adjusted when moving the thumb vertically.

`type: "saturation" | "brightness" | "hsl-saturation"` · `default: "saturation"`

---

### `boundedThumb`

Determines whether the thumb is constrained within the boundaries of the panel. When `false`, part of the thumb may extend beyond the panel edges.

`type: boolean` · `default: false`

---

### `thumbSize`

The thumb's height and width.

`type: number` · `default: 35`

---

### `thumbColor`

The thumb's color. Defaults to an adaptive color based on contrast ratio.

`type: string` · `default: interactive`[^interactive]

[^interactive]: The thumb color adjusts automatically based on contrast ratio when no value is provided.

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

### `gestures`

An array of gestures or composed gestures from `react-native-gesture-handler` that run simultaneously with the color picker's gestures.

`type: Gesture[]` · `default: []`

---

### `adaptSpectrum`

The slider background color spectrum adapts to changes in saturation and brightness.

`type: boolean` · `default: false`

---

### `reverseHue`

Reverses the hue direction.

`type: boolean` · `default: false`

---

### `reverseVerticalChannel`

Reverses the direction of the vertical channel (saturation or brightness).

`type: boolean` · `default: false`

---

### `style`

The panel's container style.

`type: ViewStyle`[^style-override]

---

### `accessibilityLabel`

Panel's label for accessibility.

`type: string`

---

### `accessibilityHint`

Panel's hint for accessibility.

`type: string`

[^style-override]: Certain style properties will be overridden.
