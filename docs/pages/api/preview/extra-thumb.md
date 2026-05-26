---
sidebar.order: 5
---

# `<ExtraThumb />`

![panel3-extraThumbs](@assets/images/panel3-extraThumbs.png)

Adds an extra thumb to the `Panel3` component. Used exclusively as a color indicator — it does not respond to gestures.

> [!note]
> This component only works inside `Panel3`.

## Usage

```jsx
<Panel3 style={styles.panelStyle} renderCenterLine adaptSpectrum>
  <ExtraThumb thumbShape="circle" hueTransform={120} />
  <ExtraThumb thumbShape="circle" hueTransform={140} />
  <ExtraThumb thumbShape="circle" hueTransform={160} />
  {/* using colorTransform to transform the hue channel */}
  <ExtraThumb
    thumbShape="circle"
    colorTransform={color => {
      "worklet";
      return colorKit.runOnUI().spin(color, 180).hsv().object();
    }}
  />
  <ExtraThumb thumbShape="circle" hueTransform={200} />
  <ExtraThumb thumbShape="circle" hueTransform={220} />
  <ExtraThumb thumbShape="circle" hueTransform={240} />
</Panel3>
```

## Props

### `colorTransform`

A worklet function that transforms the color in HSV space. Receives an HSVA object and returns a new HSVA object that determines the thumb's position inside the panel.

`type: (color: HSVObject) => HSVObject`

---

### `hueTransform`

An alternative to `colorTransform` for transforming the hue channel. Accepts negative values and percentage strings (e.g. `'50%'` or `50`).

`type: string | number`

---

### `saturationTransform`

An alternative to `colorTransform` for transforming the saturation channel. Accepts negative values and percentage strings (e.g. `'50%'` or `50`).

`type: string | number`

---

### `brightnessTransform`

An alternative to `colorTransform` for transforming the brightness channel. Accepts negative values and percentage strings (e.g. `'50%'` or `50`).

`type: string | number`

---

### `onChange`

Fires every time the user modifies the color, providing the transformed color via a worklet callback. Accepts `worklet` functions only — use `onChangeJS` for regular functions. The color object exposes: `hex`, `rgb`, `rgba`, `hsv`, `hsva`, `hwb`, `hwba`, `hsl`, and `hsla`.

`type: (color: object) => void` · `default: undefined`

---

### `onChangeJS`

Fires every time the user modifies the color, providing the transformed color via a regular callback. Accepts regular functions only — use `onChange` for `worklet` functions. The color object exposes: `hex`, `rgb`, `rgba`, `hsv`, `hsva`, `hwb`, `hwba`, `hsl`, and `hsla`.

`type: (color: object) => void` · `default: undefined`

> [!tip]
> Avoid using `setState` inside `onChange` to prevent performance issues. Instead, use `useSharedValue` from `react-native-reanimated`.

---

### `thumbSize`

The thumb's height and width.

`type: number` · `default: inherit from Panel3`

---

### `thumbColor`

The thumb's color.

`type: string` · `default: inherit from Panel3`

---

### `thumbShape`

The thumb's shape and appearance.

`type: ThumbShapeType` · `default: inherit from Panel3`

<div>
  <markdown src="@parts/markdown/thumb-shape-type.md"></markdown>
</div>

---

### `thumbStyle`

The thumb's containing `View` style.

`type: ViewStyle`[^style-override] · `default: inherit from Panel3`

---

### `thumbInnerStyle`

The thumb's inner `View` style.

`type: ViewStyle`[^style-override] · `default: inherit from Panel3`

---

### `renderCenterLine`

Controls whether a line is rendered from the center of the panel to the thumb.

`type: boolean` · `default: inherit from Panel3`

---

<div>
  <markdown src="@parts/markdown/render-thumb.md"></markdown>
</div>

---

[^style-override]: Certain style properties will be overridden.
