---
sidebar_position: 7
sidebar_label: Panel2
description: A square-shaped slider (windows style) is used for changing the color's hue and saturation.
---

# `<Panel2 />`

![panel2](../../../images/panel2.png)

- A square-shaped slider (windows style) is used for changing the color's hue and saturation.

- Move the handle horizontally to change the color's saturation.

- Move the handle vertically to change the color's hue.

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

- Change thumb's shape and apperance.
- `type: string`
- `values`: <shapes/>
- `default: 'ring'`

### `reverse`

- Reverse (flip) hue direction.
- `type: boolean`
- `default: false`

### `style`

- Panel's container style.
- `type: ViewStyle`

:::info note

- Some style properties will be overwritten.

:::
