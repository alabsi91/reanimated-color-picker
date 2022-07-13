---
sidebar_position: 8
sidebar_label: Panel3
description: A circle-shaped slider is used for changing the color's hue and saturation.
---

# `<Panel3 />`

![panel2](../../../images/panel3.png)

- A circle-shaped slider (wheel style) is used for changing the color's hue and saturation.
- Move the handle around the center to change the color's hue.
- Move the handle away or toward the center to change the color's saturation.

:::tip

- Add [`<BrightnessSlider />`](./BrightnessSlider) also to get control of the color three channels.

:::

## Props

### `thumbSize`

- Panel's handle (thumb) size (height\*width).
- `type: number`
- `default: 35`

### `thumbColor`

- Change thumb's color.
- `type: string`
- `default`: interactive\*

:::info **\*interactive**

- The thumb color will be changed depending on the contrast ratio if no color value is passed.

:::

### `thumbShape`

- Change thumb's shape and appearance.
- `type: string`
- `values`: <shapes/>
- `default: 'ring'`

### `style`

- Panel's container style.
- `type: ViewStyle`

:::info note

- Some style properties will be overwritten.

:::
