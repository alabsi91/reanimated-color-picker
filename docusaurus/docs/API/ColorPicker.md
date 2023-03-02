---
sidebar_position: 1
description: Responsible for managing the built-in components
---

# ColorPicker Wrapper

- The `ColorPicker` Wrapper is responsible for managing the built-in components.

:::caution

All built-in components should be wrapped within the `ColorPicker` component.

:::

- You can nest components within the `ColorPicker` wrapper to achieve the desired level of customization.

```jsx
<ColorPicker>
  <Preview />

  <View>
    <Panel1 />
    <HueSlider vertical />
  </View>

  <View>
    <Text>Opacity</Text>
    <OpacitySlider />
  </View>

  <Swatches />
</ColorPicker>
```

## Props

### `value`

- The initial color that should be displayed when the `ColorPicker` is loaded.
- If the `value` property is modified, the `ColorPicker` will automatically update the displayed color.
- Accepts: `'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba' | named colors` formats.
- `type: string`
- `default: '#418181'`

### `sliderThickness`

- A global property that allows for changing the thickness of all descendant slider components.
- The thickness refers to the `width` of the slider in the case of a `vertical` orientation, and the `height` in the case of a `horizontal` orientation.
- `type: number`
- `default: 25`

### `thumbSize`

- A global property for changing the thumb size of all descendant slider components.
- `type: number`
- `default: 35`

### `thumbColor`

- A global property for changing the thumb color of all descendant slider components.
- `type: string`
- `default: undefined`

### `thumbShape`

- A global property that allows for the alteration of the thumb shape and appearance of all descendant slider components.
- `type: string`
- `default: 'ring'`
- `values:`<shapes/>

### `style`

- The container style of the `ColorPicker`.
- `type: ViewStyle`

:::info note

- Certain style properties will be overridden.

:::

### `onChange`

- Triggers every time the user modifies the color.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsv`, `hsva`, `hwb`, `hwba`, `hsl`, and `hsla`
- `type: (color: object) => void`
- `default: null`

:::tip

- To prevent performance issues, it is best to avoid using `setState` in the `onChange` callback.
- It is highly recommended to utilize the `useSharedValue` function from the `react-native-reanimated` library.

:::

### `onComplete`

- Triggered upon the user releasing the slider handle or clicking on a swatch.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsv`, `hsva`, `hwb`, `hwba`, `hsl`, and `hsla`
- `type: (color: object) => void`
- `default: null`