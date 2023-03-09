---
sidebar_position: 8
sidebar_label: Panel3
description: The circle-shaped slider, with its wheel style design, is utilized to adjust the hue and saturation of colors.
---

# `<Panel3 />`

![panel2](../../../images/panel3.png)

- The circle-shaped slider, with its wheel style design, is utilized to adjust the hue and saturation of colors.
- Move the handle around the center to change the color's hue.
- Move the handle away or toward the center to change the color's saturation.

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

- Change thumb's shape and appearance.
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

:::tip Example Usage

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
:::

### `style`

- Panel's container style.
- `type: ViewStyle`

:::info note

- Certain style properties will be overridden.

:::
