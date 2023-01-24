---
sidebar_position: 6
sidebar_label: Panel1
description: A square-shaped slider, reminiscent of Adobe style, is utilized to adjust the brightness and saturation of colors.
---

# `<Panel1 />`

![panel1](../../../images/panel1.png)

- A square-shaped slider, reminiscent of Adobe style, is utilized to adjust the brightness and saturation of colors..

- Move the handle horizontally to change the color's saturation.

- Move the handle vertically to change the color's brightness.

:::tip

- Add [`<HueSlider />`](./HueSlider) component also to gain control over the three color channels.

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

- The color of the thumb will be adjusted according to the contrast ratio, in the absence of a specific color value.

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

- Certain style properties will be overridden.

:::
