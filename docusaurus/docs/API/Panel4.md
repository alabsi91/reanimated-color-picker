---
sidebar_position: 9
sidebar_label: Panel4
description: "A slider with a square shape is used to adjust the channels of hue, saturation, and brightness."
---

# `<Panel4 />`

![panel4](../../../images/panel4.png)

- A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.

- To adjust the color's saturation and brightness, move the handle horizontally..

- Move the handle vertically to change the color's hue.

:::caution

This panel is designed for simple use and doesn't allow simultaneous adjustment of saturation and brightness. As a result, it's not possible to select specific colors like 'gray'.

:::

## Props

### `imageSource`

- Allows for a higher quality image to be provided for the slider background.
- Check out the `Figma` link for the uncompressed assets here 👉 [color picker assets](https://www.figma.com/file/1NAZsgrXejzzDsakZtQyuP/reanimated-color-picker-assets?node-id=0%3A1&t=CZzURph1MOPimwI2-1).
- `type: ImageSourcePropType`
- `default: undefined`

### `boundedThumb`

- Determines whether the panel slider thumb (or handle) should be constrained to stay within the boundaries of the panel.
- When set to `true`, the thumb will not be allowed to move beyond the edges of the panel.
- When set to `false`, part of it will be outside of the panel bounds.
- `type: boolean`
- `default: false`

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

#### `ThumbProps`

|      Prop       |         Type          | Description                                                                                       |
| :-------------: | :-------------------: | :------------------------------------------------------------------------------------------------ |
| `positionStyle` |      `StyleProp`      | This style determines the position of the thumb and is a crucial element that should be included. |
|     `width`     |       `number`        | Extracted from the `thumbSize` prop and it's important for thumb position calculation.            |
|    `height`     |       `number`        | Extracted from the `thumbSize` prop and it's important for thumb position calculation.            |
| `adaptiveColor` | `SharedValue<string>` | White or black based on the contrast ratio.                                                       |
| `currentColor`  | `SharedValue<string>` | This shared value will update whenever the color changes.                                         |
| `initialColor`  |       `string`        | The initial color value as a `string`.                                                            |

- Example Usage:

```jsx
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { RenderThumbProps } from 'reanimated-color-picker';

function MyCustomThumb({
  width,
  height,
  positionStyle,
  adaptiveColor,
  currentColor,
  initialColor,
}: RenderThumbProps) {

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: adaptiveColor.value,
    backgroundColor: currentColor.value,
  }));

  return (
    <Animated.View
      style={[
        { width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' },
        animatedStyle,
        positionStyle,
        ]}
    >
      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />
    </Animated.View>
  );
}
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
