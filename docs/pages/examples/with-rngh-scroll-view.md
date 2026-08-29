# With RNGH ScrollView

Dragging a slider inside a scroll view usually fights the scroll. The fix is to import `ScrollView` from
`react-native-gesture-handler` rather than `react-native` — its gestures negotiate with the picker's instead of racing them.

<div class="example-container example-container-scrollable">
  <react-native src="@examples/WithRnghScrollView.tsx" bundle></react-native>
</div>

## Code

<div>
  <code-block lang="tsx" title="WithRnghScrollView.tsx" collapsible="10">
    <inline-text src="@examples/WithRnghScrollView.tsx"></inline-text>
  </code-block>
</div>

<markdown src="@parts/markdown/color-picker-style.md"></markdown>
