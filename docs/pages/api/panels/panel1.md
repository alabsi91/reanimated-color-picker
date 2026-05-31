---
sidebar.order: 1
---

# `<Panel1 />`

![panel1](@assets/images/panel1.png)

An Adobe-style square panel for adjusting color brightness and saturation. Move the handle horizontally to change saturation, and vertically to change brightness.

> [!tip]
> Add a [`<HueSlider />`](~/api/sliders/hue/hue-slider/) to gain full control over all three color channels.

## Props

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

### `gestures`

An array of gestures or composed gestures from `react-native-gesture-handler` that run simultaneously with the color picker's gestures.

`type: Gesture[]` · `default: []`

---

### `style`

The panel's container style.

## `type: ViewStyle`[^style-override]

---

### `accessibilityLabel`

Panel's label for accessibility.

`type: string`

---

### `accessibilityHint`

Panel's hint for accessibility.

`type: string`

[^style-override]: Certain style properties will be overridden.
