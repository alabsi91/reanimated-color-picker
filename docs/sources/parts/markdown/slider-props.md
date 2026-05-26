### `boundedThumb`

![boundedThumb](@assets/images/boundedThumb.png)

Determines whether the thumb is constrained within the boundaries of the slider. When `false`, part of the thumb may extend beyond the slider edges.

`type: boolean` · `default: false`

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

The slider's thickness — `width` in `vertical` mode, `height` in `horizontal` mode.

`type: number` · `default: 25`

---

### `thumbShape`

The thumb's shape and appearance.

`type: ThumbShapeType` · `default: "ring"`

<div>
  <markdown src="@parts/markdown/thumb-shape-type.md"></markdown>
</div>

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

<div>
  <markdown src="@parts/markdown/render-thumb.md"></markdown>
</div>

---

### `reverse`

Reverses the slider direction.

`type: boolean` · `default: false`

---

### `vertical`

Changes the slider orientation to vertical.

`type: boolean` · `default: false`

---

### `gestures`

An array of gestures or composed gestures from `react-native-gesture-handler` that run simultaneously with the color picker's gestures.

`type: Gesture[]` · `default: []`

---

### `style`

The slider's container style.

`type: ViewStyle`[^style-override]

---

[^interactive]: The thumb color adjusts automatically based on contrast ratio when no value is provided.

[^style-override]: Certain style properties will be overridden.
