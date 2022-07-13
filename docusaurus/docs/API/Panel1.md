---
sidebar_position: 6
sidebar_label: Panel1
description: A square-shaped slider (adobe style) is used for changing the color's brightness and saturation.
---

# `<Panel1 />`

![panel1](../../../images/panel1.png)

- A square-shaped slider (adobe style) is used for changing the color's brightness and saturation.

:::info note

- You need to add [`<HueSlider />`](#small_orange_diamondhueslider-) alongside with it.

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

### `style`

- Panel's container style.
- `type: ViewStyle`

:::info note

- Some style properties will be overwritten.

:::
