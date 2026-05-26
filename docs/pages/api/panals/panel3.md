---
sidebar.order: 3
---

# `<Panel3 />`

A wheel-style circular panel for adjusting hue and either saturation or brightness. Move the thumb around the center to change hue, and toward or away from the center to adjust the channel set by `centerChannel`.

![centerChannel: "saturation"](@assets/images/panel3-saturation.png)
_`centerChannel: "saturation"`_

![centerChannel: "brightness"](@assets/images/panel3-brightness.png)
_`centerChannel: "brightness"`_

![centerChannel: "hsl-saturation"](@assets/images/panel3-hsl-saturation.png)
_`centerChannel: "hsl-saturation"`_

> [!tip]
> For more control, add a slider next to `Panel3` that adjusts the opposite channel. For example, if `centerChannel` is `"saturation"`, pair it with a [`<BrightnessSlider />`](~/api/sliders/hsb/brightness-slider/), and vice versa.

## Props

### `centerChannel`

Determines which color channel is adjusted when moving the thumb toward or away from the center.

`type: "saturation" | "brightness" | "hsl-saturation"` · `default: "saturation"`

---

### `rotate`

The degree of rotation applied to the hue circle.

`type: number` · `default: 0`

---

### `renderCenterLine`

Controls whether a line is rendered from the center of the panel to the thumb.

`type: boolean` · `default: false`

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

### `adaptSpectrum`

The slider background color spectrum adapts to changes in saturation and brightness.

`type: boolean` · `default: false`

---

### `style`

The panel's container style.

`type: ViewStyle`[^style-override]

[^style-override]: Certain style properties will be overridden.
