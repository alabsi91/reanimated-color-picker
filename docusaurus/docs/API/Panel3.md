---
sidebar_position: 8
sidebar_label: Panel3
description: A circle-shaped slider is used for changing the color's hue and saturation.
---

# `<Panel3 />`

![panel2](../../../images/panel3.png)

- A circle-shaped slider is used for changing the color's hue and saturation.
- Move the handle around the center to change the color's hue.
- Move the handle away or toward the center to change the color's saturation.

:::note

- You need to add [`<BrightnessSlider />`](#small_orange_diamondbrightnessslider-) alongside with it.

:::

| Property   |    Type     |    Default     | Description                                 |
| :--------- | :---------: | :------------: | :------------------------------------------ |
| thumbSize  |  `number`   |      `35`      | panel's handle (thumb) size (height\*width) |
| thumbColor |  `string`   | interactive`*` | change thumb's color                        |
| thumbShape |  `string`   |    `'ring'`    | change thumb's shape: <shapes/>             |
| style      | `ViewStyle` |       /        | panel's container style                     |

:::note

- Some style properties will be overwritten.

:::

:::info **\*interactive**

- The thumb color will be changed depending on the contrast ratio if no color value is passed.

:::
