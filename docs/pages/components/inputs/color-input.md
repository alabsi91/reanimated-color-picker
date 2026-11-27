---
sidebar.order: 2
---

# `<ColorInput />`

<p>
  <img src="@assets/images/ColorInput.png" alt="ColorInput" class="light-scheme-only" />
  <img src="@assets/images/ColorInput-dark.png" alt="ColorInput" class="dark-scheme-only" />
</p>

A compact field with a color swatch and a hex input. Typing a hex value changes the color. Use
[`onSwatchPress`](#onswatchpress) to open the rest of the color picker in a bottom sheet, a popover, or a modal.

## Props

### `disableAlphaChannel`

Prevents the user from changing the color's opacity from the hex input.

`type: boolean` · `default: false`

---

### `style`

The style of the container wrapping the swatch and the hex input.

`type: ViewStyle`[^style-override]

---

### `swatchStyle`

The style of the swatch.

`type: ViewStyle`[^style-override]

---

### `inputStyle`

The style of the hex input.

`type: TextStyle`[^style-override]

---

### `inputProps`

Additional props passed to the hex `TextInput` component.

`type: InputProps`

---

### `swatchAccessibilityLabel`

Accessibility label for the swatch. Used by screen readers to identify the button.

`type: string` · `default: 'Open color picker'`

---

### `swatchAccessibilityHint`

Accessibility hint for the swatch. Describes what happens when the user activates it.

`type: string`

---

## Events

### `onSwatchPress`

Fires when the user presses the swatch. Without it, the swatch only shows the color.

`type: () => void` · `default: undefined`

---

## Example

Put the rest of the color picker inside the same `ColorPicker`, for example in a modal. The field and the picker then show the
same color.

```tsx
<ColorPicker value="#3a7bd5" onCompleteJS={({ hex }) => console.log(hex)}>
  <ColorInput onSwatchPress={() => setIsModalOpen(true)} />

  <Modal visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)} transparent>
    <GestureHandlerRootView style={{ flex: 1, justifyContent: "center" }}>
      <Panel1 />
      <HueSlider />
    </GestureHandlerRootView>
  </Modal>
</ColorPicker>
```

For full examples, see [ColorInput With Modal](~/examples/color-input-with-modal/) and
[ColorInput With Bottom Sheet](~/examples/color-input-with-bottom-sheet/).

[^style-override]: Certain style properties will be overridden.
