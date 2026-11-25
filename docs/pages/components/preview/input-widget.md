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

### `cycleButtonStyle`

The style of the cycle button. Add padding to grow the tap area,
or set `display: 'none'` to hide the button.

`type: ViewStyle` · `default: { marginLeft: 10 }`

> [!tip]
> To move the button to the other side, set `containerStyle={{ flexDirection: 'row-reverse' }}`
> and `cycleButtonStyle={{ marginLeft: 0, marginRight: 10 }}`.

---

### `renderCycleButton`

Replaces the cycle button icon with your own content, or keeps the default icon
when it returns `null`. Since the button still handles the press, your content needs no `onPress`.

`type: (state: { format: 'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV' }) => ReactNode` · `default: undefined`

---

### `cycleButtonAccessibilityLabel`

Accessibility label for the cycle button. Used by screen readers to identify the button.

`type: string`

---

### `cycleButtonAccessibilityHint`

Accessibility hint for the cycle button. Describes what happens when the user activates it.

`type: string`

---

## Events

### `onFormatChange`

Fires when the cycle button or [`cycleFormat`](#cycleformat) changes the format.

`type: (format: 'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV') => void` · `default: undefined`

---

## Methods

### `cycleFormat`

Switches the inputs to the next color format in [`formats`](#formats). To use your own button,
hide the cycle button with `cycleButtonStyle` and call `cycleFormat` on press.

`type: () => void`

```tsx
import ColorPicker, { InputWidget } from "reanimated-color-picker";

import type { InputWidgetRef } from "reanimated-color-picker";

function MyComponent() {
  const inputWidgetRef = useRef<InputWidgetRef>(null);

  return (
    <ColorPicker>
      <InputWidget ref={inputWidgetRef} cycleButtonStyle={{ display: "none" }} />

      <Button title="Next format" onPress={() => inputWidgetRef.current?.cycleFormat()} />
    </ColorPicker>
  );
}
```

[^style-override]: Certain style properties will be overridden.
