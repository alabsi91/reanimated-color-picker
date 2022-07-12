---
sidebar_position: 4
sidebar_label: Panel1
description: A square-shaped slider (adobe style) is used for changing the color's brightness and saturation.
---

# `<Panel1 />`

![panel1](../../../images/panel1.png)

- A square-shaped slider (adobe style) is used for changing the color's brightness and saturation.

:::note 

- You need to add [`<HueSlider />`](#small_orange_diamondhueslider-) alongside with it.

:::

| Property   |    Type     |    Default     | Description                                                                                                                                                     |
| :--------- | :---------: | :------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| thumbSize  |  `number`   |      `35`      | panel's handle (thumb) size (height\*width)                                                                                                                     |
| thumbColor |  `string`   | interactive`*` | change thumb's color                                                                                                                                            |
| thumbShape |  `string`   |    `'ring'`    | change thumb's shape: `'ring'`, `'solid'`, `'hollow'`, `'line'`, `'plus'`, `'pill'`, `'triangleUp'`, `'triangleDown'`, `'doubleTriangle'`, `'rect'`, `'circle'` |
| style      | `ViewStyle` |       /        | panel's container style                                                                                                                                         |

:::note

- Some style properties will be overwritten.

:::

:::info **\*interactive**

- The thumb color will be changed depending on the contrast ratio if no color value is passed.

:::
