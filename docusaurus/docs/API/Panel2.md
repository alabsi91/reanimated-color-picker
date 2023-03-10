---
sidebar_position: 7
sidebar_label: Panel2
description: A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.
---

# `<Panel2 />`

![panel2](../../../images/panel2.png)

- A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.

- Move the handle horizontally to change the color's saturation.

- Move the handle vertically to change the color's hue.

:::tip

- Add [`<BrightnessSlider />`](./BrightnessSlider) component also to gain control over the three color channels.

:::

## Props

### `thumbSize`

- Panel's handle (thumb) size (height\*width).
- `type: number`
- `default: 35`

### `thumbColor`

- Change thumb's color.
- `type: string`
- `default`: interactive\*

:::info **\*interactive**

- The thumb color will be changed depending on the contrast ratio if no color value is passed.

:::

### `thumbShape`

- Change thumb's shape and apperance.
- `type: string`
- `values`: <shapes/>
- `default: 'ring'`

### `thumbStyle`

- Thumb's containing View's style.
- `type: ViewStyle`

### `thumbInnerStyle`

- Thumb's inner View(s) style.
- `type: ViewStyle`

### `renderThumb`

- Function which receives `ThumbProps` and returns a custom thumb component.
- Overrides `thumbShape`
- `type: (props: ThumbProps) => ReactElement`
- Example Usage:

```jsx
renderThumb={({ handleStyle, width, height }) => (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        handleStyle,
        { backgroundColor: 'red', width, height },
      ]}
    />
  )}
```

### `reverse`

- Reverse (flip) hue direction.
- `type: boolean`
- `default: false`

### `style`

- Panel's container style.
- `type: ViewStyle`

:::info note

- Certain style properties will be overridden.

:::
