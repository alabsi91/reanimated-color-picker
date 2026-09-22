# `<ColorPicker />`

The `ColorPicker` component is responsible for managing all built-in components.

> [!caution] All built-in components must be wrapped within the `ColorPicker` component.

You can nest components freely to achieve any layout:

```jsx
<ColorPicker>
  <Preview />

  <View>
    <Panel1 />
    <HueSlider vertical />
  </View>

  <View>
    <Text>Opacity</Text>
    <OpacitySlider />
  </View>

  <Swatches />
</ColorPicker>
```

## Props

### `value`

The initial color displayed when the picker loads. If updated, the picker reflects the new color automatically.

Accepts `hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hsv`, `hsva`, `hwb`, `hwba`, and named colors.

`type: string` · `default: "#fff"`

---

### `adaptSpectrum`

A global property that allows slider background color spectrums to adapt to changes in brightness and saturation across all descendant slider components.

`type: boolean` · `default: false`

---

### `boundedThumb`

![boundedThumb](https://alabsi91.github.io/reanimated-color-picker/sources/assets/images/boundedThumb.png)

A global property for all descendant sliders and panels. Determines whether the thumb is constrained within the boundaries of the slider. When `false`, half of the thumb extends beyond the slider edges.

`type: boolean` · `default: false`

---

### `sliderThickness`

A global property for the thickness of all descendant sliders. Refers to `width` for vertical sliders and `height` for horizontal ones.

`type: number` · `default: 25`

---

### `thumbAnimationDuration`

A global property for the duration of the thumb animation when the `value` prop changes.

`type: number` · `default: 200`

---

### `thumbSize`

A global property for the thumb size of all descendant slider components.

`type: number` · `default: 35`

---

### `thumbColor`

A global property for the thumb color of all descendant slider components.

`type: string` · `default: undefined`

---

### `thumbShape`

A global property for the thumb shape and appearance of all descendant slider components.

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

A global property for the thumb's `View` style across all descendant slider components.

`type: ViewStyle`[^style-override]

---

### `thumbInnerStyle`

A global property for the thumb's inner `View` style across all descendant slider components.

`type: ViewStyle`[^style-override]

---

### `thumbScaleAnimationValue`

A global property for the scale value of the thumb animation when active.

`type: number` · `default: 1.2`

---

### `thumbScaleAnimationDuration`

A global property for the duration of the thumb scale animation when active.

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

### `style`

The container style of the `ColorPicker`.

`type: ViewStyle`[^style-override]

---

### `enableColorAnnouncements`

Enables accessibility announcements when the color changes.

When enabled, color updates are announced using the format defined by [`colorAnnouncementFormat`](#colorannouncementformat).

`type: boolean` · `default: true`

---

### `colorAnnouncementFormat`

Defines the format used when announcing color values for accessibility.

Accepts `hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hsv`, `hsva`, `hwb`, and `hwba`.

`type: keyof ColorFormatsObject` · `default: "rgb"`

---

## Events

### `onChange`

Fires every time the user modifies the color. Accepts `worklet` functions only — use [`onChangeJS`](#onchangejs) for regular functions.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

```ts
type ColorFormatsObject = {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  hwb: string;
  hwba: string;
};
```

---

### `onChangeJS`

Fires every time the user modifies the color. Accepts regular functions only — use [`onChange`](#onchange) for `worklet` functions.

> [!important]
> Avoid using `setState` inside `onChange` to prevent performance issues. Instead, use `useSharedValue` from `react-native-reanimated`.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

```ts
type ColorFormatsObject = {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  hwb: string;
  hwba: string;
};
```

---

### `onComplete`

Fires when the user releases the slider handle or taps a swatch. Accepts `worklet` functions only — use [`onCompleteJS`](#oncompletejs) for regular functions.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

```ts
type ColorFormatsObject = {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  hwb: string;
  hwba: string;
};
```

---

### `onCompleteJS`

Fires when the user releases the slider handle or taps a swatch. Accepts regular functions only — use [`onComplete`](#oncomplete) for `worklet` functions.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

```ts
type ColorFormatsObject = {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  hwb: string;
  hwba: string;
};
```

---

## Methods

### `setColor`

Sets the displayed color without triggering `onChange` or `onComplete`. Useful for updating the picker color independently of the `value` prop.

`type: (color: SupportedColorFormats, duration?: number) => void`

```tsx
import ColorPicker from "reanimated-color-picker";

import type { ColorPickerRef } from "reanimated-color-picker";

function MyComponent() {
  const pickerRef = useRef<ColorPickerRef>(null);

  const setNewColorHandle = () => {
    if (pickerRef.current) {
      pickerRef.current.setColor("orange");
    }
  };

  return <ColorPicker ref={pickerRef}>{/* ... */}</ColorPicker>;
}
```

[^style-override]: Certain style properties will be overridden.
