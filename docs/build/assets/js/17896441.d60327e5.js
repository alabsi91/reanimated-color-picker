'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [918],
  {
    7391: (a, e, r) => {
      r.d(e, { Z: () => s });
      r(7294);
      var d = r(5893);
      function s() {
        return (0, d.jsx)('div', {
          'data-snack-id': '@alabsi91/reanimated-color-picker',
          'data-snack-platform': 'web',
          'data-snack-preview': 'true',
          'data-snack-theme': 'dark',
          'data-snack-loading': 'lazy',
          style: {
            overflow: 'hidden',
            background: '#212121',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            height: '800px',
            width: '100%',
          },
        });
      }
    },
    1769: (a, e, r) => {
      r.d(e, { Z: () => o });
      r(7294);
      var d = r(804),
        s = r(7391),
        l = r(5893);
      const o = {
        ...d.Z,
        snack: s.Z,
        Shapes: () =>
          (0, l.jsx)('code', {
            children:
              "'ring' | 'solid' | 'hollow' | 'line' | 'plus' | 'pill' | 'triangleUp' | 'triangleDown' | 'doubleTriangle' | 'rect' | 'circle'",
          }),
        Formats: () =>
          (0, l.jsx)('code', { children: "'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba'" }),
      };
    },
  },
]);
