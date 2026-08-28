---
sidebar.order: 2
---

# `<PreviewText />`

A React Native `<Text>` component that displays the current color as text.

## Props

### `colorFormat`

The color format displayed in the preview text.

`type: ColorFormat`

```ts
type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "hsv" | "hsva" | "hwb" | "hwba";
```

---

### `style`

The preview text style.

`type: TextStyle`[^style-override]

[^style-override]: Certain style properties will be overridden.
