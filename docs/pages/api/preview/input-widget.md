---
sidebar.order: 3
---

# `<InputWidget />`

![InputWidget](@assets/images/InputWidgets.png)

An input component for entering color values in RGB, HEX, HSL, HWB, and HSV formats. Includes a cycle button to switch between formats.

## Props

### `defaultFormat`

The initial color format shown when the component loads.

`type: 'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV'`

---

### `formats`

The color formats included in the cycle and the order they appear.

`type: Array<'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV'>`

---

### `disableAlphaChannel`

Disables the alpha channel input, preventing users from setting the color's opacity.

`type: boolean` · `default: false`

---

### `inputStyle`

The style of the text input fields.

`type: TextStyle`[^style-override]

---

### `inputProps`

Additional props passed to the `TextInput` components.

`type: InputProps`

---

### `inputTitleStyle`

The style of the title displayed below the input fields indicating the current color format.

`type: TextStyle`[^style-override]

---

### `containerStyle`

The style of the container wrapping the input fields and cycle button.

`type: ViewStyle`[^style-override]

---

### `iconColor`

The color of the cycle button icon.

`type: string`

---

### `iconStyle`

The style of the cycle button icon.

`type: ImageStyle`[^style-override]

---

[^style-override]: Certain style properties will be overridden.
