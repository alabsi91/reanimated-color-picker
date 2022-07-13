---
sidebar_position: 1
description: Responsible for managing the built-in components
---

# ColorPicker Wrapper

- The `ColorPicker` Wrapper is responsible for managing the built-in components.

## Props

### `value`

- The initial value of the color picker.
- Accepts `'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | named colors` formats.
- `type: string`
- `default: '#418181'`

### `sliderThickness`

- A global property to change the thickness of all descendant sliders components.
- The thickness is the slider's width in case of `vertical` orientation and height in case of `horizontal` orientation.
- `type: number`
- `default: 25`

### `thumbSize`

- A global property to change the thumb size of all descendant sliders components.
- `type: number`
- `default: 35`

### `thumbShape`

- A global property to change the shape and appearance of the thumb of all descendant sliders components.
- `type: string`
- `default: 'ring'`
- `values: 'ring' | 'solid' | 'hollow' | 'line' | 'plus' | 'pill' | 'triangleUp' | 'triangleDown' | 'doubleTriangle' | 'rect' | 'circle'`

### `style`

- Color picker's container style.
- If you want to change the width using the `width` property.
- `type: ViewStyle`

:::info note

- Some style properties will be overwritten.

:::

### `onChange`

- Called every time the color value changed.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsl`, and `hsla`
- `type: (color: object) => void`
- `default: null`

### `onComplete`

- Called when the user releases the slider handle or when a swatch is clicked.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsl`, and `hsla`
- `type: (color: object) => void`
- `default: null`
