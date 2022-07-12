---
sidebar_position: 7
sidebar_label: HueSlider
description: A slider to change the color's hue.
---

# `<HueSlider />`

![hue](../../../images/hue.png)

- A slider to change the color's hue.

## thumbSize

- The size of the slider's thumb.
- `type: number`
- `default: 35`

## thumbColor

- The color of the slider's thumb.
- `type: string`
- `default: interactive*`

:::info **\*interactive**

- The thumb color will be changed depending on the contrast ratio if no color value is passed.

:::

## thumbShape

- The shape and appearance of the slider's thumb.
- `type: string`
- `default: 'ring'`
- `values: 'ring' | 'solid' | 'hollow' | 'line' | 'plus' | 'pill' | 'triangleUp' | 'triangleDown' | 'doubleTriangle' | 'rect' | 'circle'`

## reverse

- Reverse the slider direction.
- `type: boolean`
- `default: false`

## vertical

- Change the slider orientation.
- `type: boolean`
- `default: false`

## style

- The style of the slider's container.
- `type: ViewStyle`


:::note

- Some style properties will be overwritten.

:::