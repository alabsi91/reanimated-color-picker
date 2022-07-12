---
sidebar_position: 8
sidebar_label: SaturationSlider
description: A slider to change the color's saturation.
---

# `<SaturationSlider />`

![saturation](../../../images/saturation.png)

- A slider to change the color's saturation.

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
