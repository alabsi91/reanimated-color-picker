# `<HueCircular />`

![HueCircular](@assets/images/HueCircular.png)

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

[^interactive]: The thumb color adjusts automatically based on contrast ratio when no value is provided.

[^style-override]: Certain style properties will be overridden.
