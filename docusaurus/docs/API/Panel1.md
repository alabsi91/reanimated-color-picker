---
sidebar_position: 6
sidebar_label: Panel1
description: A square-shaped slider (adobe style) is used for changing the color's brightness and saturation.
---

# `<Panel1 />`

![panel1](../../../images/panel1.png)

- A square-shaped slider (adobe style) is used for changing the color's brightness and saturation.

- Move the handle horizontally to change the color's saturation.

- Move the handle vertically to change the color's brightness.

:::tip

- Add [`<HueSlider />`](./HueSlider) also to get control of the color three channels.

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
