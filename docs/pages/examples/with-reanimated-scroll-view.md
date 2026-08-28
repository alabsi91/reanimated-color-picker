# With Reanimated ScrollView

The other way to settle the scroll conflict: keep `Animated.ScrollView` and turn its `scrollEnabled` off from the UI thread while a
slider is being dragged. Each slider gets its own `Gesture.Pan()` — one gesture cannot be shared between components.

<div class="example-container example-container-scrollable">
  <react-native src="@examples/WithReanimatedScrollView.tsx" bundle></react-native>
</div>

## Code

<div>
  <code-block lang="tsx" title="WithReanimatedScrollView.tsx" collapsible="10">
    <inline-text src="@examples/WithReanimatedScrollView.tsx"></inline-text>
  </code-block>
</div>
