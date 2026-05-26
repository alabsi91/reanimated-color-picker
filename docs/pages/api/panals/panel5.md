---
sidebar.order: 5
---

# `<Panel5 />`

![panel5](@assets/images/panel5.png)

A grid of 120 colors arranged in 12 columns and 10 rows.

> [!danger] Be aware
> This panel is limited to a fixed range of colors and cannot display all colors.

## Props

### `gestures`

An array of gestures or composed gestures from `react-native-gesture-handler` that run simultaneously with the color picker's gestures.

`type: Gesture[]` · `default: []`

---

### `style`

The panel's container style.

`type: ViewStyle`[^style-override]

---

### `selectionStyle`

The style of the square that indicates the selected color.

`type: ViewStyle`[^style-override]

[^style-override]: Certain style properties will be overridden.
