---
sidebar.order: 1
---

# ColorPicker

The `ColorPicker` component is responsible for managing all built-in components.

> [!caution] All built-in components must be wrapped within `ColorPicker` component.

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

![boundedThumb](@assets/images/boundedThumb.png)

A global property for all descendant sliders and panels. Determines whether the thumb is constrained within the boundaries of the slider. When `false`, part of the thumb may extend beyond the slider edges.

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

<div>
  <markdown src="@parts/markdown/thumb-shape-type.md"></markdown>
</div>

---

### `thumbStyle`

A global property for the thumb's `View` style across all descendant slider components.

`type: ViewStyle`

---

### `thumbInnerStyle`

A global property for the thumb's inner `View` style across all descendant slider components.

`type: ViewStyle`

---

### `thumbScaleAnimationValue`

A global property for the scale value of the thumb animation when active.

`type: number` · `default: 1.2`

---

### `thumbScaleAnimationDuration`

A global property for the duration of the thumb scale animation when active.

`type: number` · `default: 100`

---

<div>
  <markdown src="@parts/markdown/render-thumb.md"></markdown>
</div>

---

### `style`

The container style of the `ColorPicker`.

> [!caution] Certain style properties will be overridden.

`type: ViewStyle`

---

### `onChange`

Fires every time the user modifies the color. Accepts `worklet` functions only — use [`onChangeJS`](#onchangejs) for regular functions.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

<div>
  <markdown src="@parts/markdown/color-format-type.md"></markdown>
</div>

---

### `onChangeJS`

Fires every time the user modifies the color. Accepts regular functions only — use [`onChange`](#onchange) for `worklet` functions.

> [!important]
> Avoid using `setState` inside `onChange` to prevent performance issues. Instead, use `useSharedValue` from `react-native-reanimated`.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

<div>
  <markdown src="@parts/markdown/color-format-type.md"></markdown>
</div>

---

### `onComplete`

Fires when the user releases the slider handle or taps a swatch. Accepts `worklet` functions only — use [`onCompleteJS`](#oncompletejs) for regular functions.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

<div>
  <markdown src="@parts/markdown/color-format-type.md"></markdown>
</div>

---

### `onCompleteJS`

Fires when the user releases the slider handle or taps a swatch. Accepts regular functions only — use [`onComplete`](#oncomplete) for `worklet` functions.

`type: (color: ColorFormatsObject) => void` · `default: undefined`

<div>
  <markdown src="@parts/markdown/color-format-type.md"></markdown>
</div>

---

## Methods

### `setColor`

Sets the displayed color without triggering `onChange` or `onComplete`. Useful for updating the picker color independently of the `value` prop.

`type: (color: string, duration?: number) => void`

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
