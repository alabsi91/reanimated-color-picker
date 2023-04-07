---
sidebar_position: 17
sidebar_label: InputWidget
description: The input widget component allows you to input color values in various formats.
---

# `<InputWidget />`

![InputWidget](../../../images/InputWidgets.png)

- The input widget component allows you to input color values in various formats, including RGB, HEX, HSL, HWB, and HSV. The component features a button that lets you cycle through these formats, making it easy to switch between them and find the one that suits your needs.

## Props

### `defaultFormat`

- The `defaultFormat` prop determines the initial color format for the input widget component.
- It accepts one of the following values: `'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV'`

### `formats`

- The `formats` prop determines which color formats are included in the input widget component and the order they appear when cycling through them.
- It accepts an array of the following values: `'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV'`

### `inputStyle`

- The `inputStyle` prop sets the style for the `InputText` components that make up the input fields for each color format.
- It accepts a `StyleProp<TextStyle>` object.

### `inputProps`

- The `inputProps` prop sets the props for the `TextInput` components that make up the input fields for each color format.
- It accepts an `InputProps` object.

### `inputTitleStyle`

- The `inputTitleStyle` prop sets the style for the `Text` component that displays the title for the input fields.
- This title is located below the input fields and indicates which color format is currently displayed.
- It accepts a `StyleProp<TextStyle>` object.

### `containerStyle`

- The `containerStyle` prop sets the style for the `View` component that wraps around all the input fields and the cycle button.
- It accepts a `StyleProp<ViewStyle>` object.

### `iconColor`

- The `iconColor` prop sets the color for the cycle button icon, which is an Image component that cycles through the available color formats when clicked.
- It accepts a `string` representing a color value.

### `iconStyle`

- The `iconStyle` prop sets the style for the cycle button icon.
- It accepts a `StyleProp<ImageStyle>` object.
