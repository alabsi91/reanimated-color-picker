---
sidebar.parent.order: 4
---

# `<Preview />`

![preview](@assets/images/preview.png)

A preview of the selected and initial color.

> [!tip]
> For text-only preview, use the [`<PreviewText />`](~/api/preview/preview-text/) component instead.

## Props

### `colorFormat`

The color format displayed in the preview.

`type: ColorFormat` · `default: "hex"`

```ts
type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "hsv" | "hsva" | "hwb" | "hwba";
```

---

### `hideInitialColor`

Hides the initial color section of the preview.

`type: boolean` · `default: false`

---

### `hideText`

Hides the preview text.

`type: boolean` · `default: false`

---

### `disableOpacityTexture`

Hides the background texture that appears when the color has an opacity less than 1.

`type: boolean` · `default: false`

---

### `style`

The preview container style.

`type: ViewStyle`[^style-override]

---

### `textStyle`

The preview text style.

`type: TextStyle`[^style-override]

[^style-override]: Certain style properties will be overridden.
