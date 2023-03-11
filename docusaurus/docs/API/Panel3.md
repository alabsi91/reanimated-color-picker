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

### `style`

- Panel's container style.
- `type: ViewStyle`

:::info note

- Certain style properties will be overridden.

:::
