---
sidebar.order: 4
---

# `<Panel4 />`

![panel4](@assets/images/panel4.png)

A square panel for adjusting hue, saturation, and brightness. Move the handle horizontally to change saturation and brightness, and vertically to change hue.

> [!danger] Be aware
> This panel has a limited color range and cannot display all colors. For example, if the input color has 50% saturation and 50% brightness, the thumb position won't be accurate. The color you select may not exactly match what is shown in the panel.

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

### `reverseHue`

Reverses the hue direction.

`type: boolean` · `default: false`

---

### `reverseHorizontalChannels`

Reverses the direction of the horizontal channels (brightness and saturation).

`type: boolean` · `default: false`

---

### `style`

The panel's container style.

`type: ViewStyle`[^style-override]

[^style-override]: Certain style properties will be overridden.
