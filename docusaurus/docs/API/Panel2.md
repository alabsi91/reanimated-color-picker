---
sidebar_position: 7
sidebar_label: Panel2
description: A square-shaped slider (windows style) is used for changing the color's hue and saturation.
---

# `<Panel2 />`

![panel2](../../../images/panel2.png)

- A square-shaped slider (windows style) is used for changing the color's hue and saturation.

:::note

- You need to add [`<BrightnessSlider />`](#small_orange_diamondbrightnessslider-) alongside with it.

:::

| Property   |    Type     |    Default     | Description                                 |
| :--------- | :---------: | :------------: | :------------------------------------------ |
| thumbSize  |  `number`   |      `35`      | panel's handle (thumb) size (height\*width) |
| thumbColor |  `string`   | interactive`*` | change thumb's color                        |
| thumbShape |  `string`   |    `'ring'`    | change thumb's shape: <shapes/>             |
| reverse    |  `boolean`  |    `false`     | reverse (flip) hue direction                |
| style      | `ViewStyle` |       /        | panel's container style                     |

:::note

- Some style properties will be overwritten.

:::

:::info **\*interactive**

- The thumb color will be changed depending on the contrast ratio if no color value is passed.

:::
