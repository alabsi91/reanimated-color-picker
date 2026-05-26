### `renderThumb`

Function that receives `ThumbProps` and returns a custom thumb component. Overrides `thumbShape`.

`type: (props: ThumbProps) => ReactElement`

#### ThumbProps

**`positionStyle`** `StyleProp`
Determines the position of the thumb — must be included in the component's style.

**`width`** `number`
Extracted from `thumbSize`, used for thumb position calculation.

**`height`** `number`
Extracted from `thumbSize`, used for thumb position calculation.

**`adaptiveColor`** `SharedValue<string>`
White or black based on the contrast ratio of the current color.

**`currentColor`** `SharedValue<string>`
Updates whenever the color changes.

**`initialColor`** `string`
The initial color value.

#### Example

```tsx
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import type { RenderThumbProps } from "reanimated-color-picker";

function MyCustomThumb({ width, height, positionStyle, adaptiveColor, currentColor, initialColor }: RenderThumbProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: adaptiveColor.value,
    backgroundColor: currentColor.value,
  }));

  return (
    <Animated.View
      style={[{ width, height, borderWidth: 1, borderRadius: width / 2, overflow: "hidden" }, animatedStyle, positionStyle]}
    >
      <View style={{ backgroundColor: initialColor, width: "50%", height, alignSelf: "flex-end" }} />
    </Animated.View>
  );
}
```
