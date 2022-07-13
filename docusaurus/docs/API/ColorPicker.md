---
sidebar_position: 1
description: Responsible for managing the built-in components
---

# ColorPicker Wrapper

- The `ColorPicker` Wrapper is responsible for managing the built-in components.

:::caution

Every built-in component should be wrapped in the `ColorPicker` component.

:::

- You can nest components inside `ColorPicker` wrapper to reach the desired level of customization.

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

- The initial color that the color picker should show on load.
- If the `value` property is changed, the color picker will update the shown color.
- Accepts: `'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | named colors` formats.
- `type: string`
- `default: '#418181'`

### `sliderThickness`

- A global property to change the thickness of all descendant sliders components.
- The thickness is the slider's width in case of `vertical` orientation and the height in case of `horizontal` orientation.
- `type: number`
- `default: 25`

### `thumbSize`

- A global property to change the thumb size of all descendant sliders components.
- `type: number`
- `default: 35`

### `thumbShape`

- A global property to change thumb's shape and appearance of all descendant sliders components.
- `type: string`
- `default: 'ring'`
- `values:`<shapes/>

### `style`

- Color picker's container style.
- `type: ViewStyle`

:::info note

- Some style properties will be overwritten.

:::

### `onChange`

- Called every time the user changes the color.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsl`, and `hsla`
- `type: (color: object) => void`
- `default: null`

:::tip

- Avoid using `setState` in `onChange` callback as it will cause performance issues.
- Using `useSharedValue` from `react-native-reanimated` library is recommended.

:::

### `onComplete`

- Called when the user releases the slider handle or when a swatch is clicked.
- The passed color object has the following properties: `hex`, `rgb`, `rgba`, `hsl`, and `hsla`
- `type: (color: object) => void`
- `default: null`
