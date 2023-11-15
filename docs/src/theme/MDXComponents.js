import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Snack from '@site/src/components/Snack';

export default {
  ...MDXComponents,
  snack: Snack,
  shapes: () => (
    <code>
      'ring' | 'solid' | 'hollow' | 'line' | 'plus' | 'pill' | 'triangleUp' | 'triangleDown' | 'doubleTriangle' | 'rect' |
      'circle'
    </code>
  ),
  formats: () => <code>'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba'</code>,
};
