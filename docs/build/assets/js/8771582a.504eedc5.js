'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [287],
  {
    462: (e, n, s) => {
      s.r(n),
        s.d(n, {
          assets: () => t,
          contentTitle: () => o,
          default: () => c,
          frontMatter: () => i,
          metadata: () => l,
          toc: () => d,
        });
      var r = s(5893),
        A = s(1151);
      const i = {
          sidebar_position: 4,
          sidebar_label: 'Panel5',
          description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
        },
        o = '<Panel5 />',
        l = {
          id: 'API/Panels/Panel5',
          title: '<Panel5 />',
          description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
          source: '@site/docs/API/Panels/Panel5.mdx',
          sourceDirName: 'API/Panels',
          slug: '/API/Panels/Panel5',
          permalink: '/reanimated-color-picker/docs/API/Panels/Panel5',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 4,
          frontMatter: {
            sidebar_position: 4,
            sidebar_label: 'Panel5',
            description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Panel4', permalink: '/reanimated-color-picker/docs/API/Panels/Panel4' },
          next: { title: 'Sliders', permalink: '/reanimated-color-picker/docs/category/sliders' },
        },
        t = {},
        d = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>gestures</code>', id: 'gestures', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>selectionStyle</code>', id: 'selectionstyle', level: 3 },
        ];
      function a(e) {
        const n = {
          admonition: 'admonition',
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          img: 'img',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, A.a)(),
          ...e.components,
        };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(n.h1, { id: 'panel5-', children: (0, r.jsx)(n.code, { children: '<Panel5 />' }) }),
            '\n',
            (0, r.jsx)(n.p, { children: (0, r.jsx)(n.img, { alt: 'panel5', src: s(8589).Z + '', width: '240', height: '200' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.' }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.admonition, {
              type: 'danger',
              children: (0, r.jsx)(n.p, {
                children:
                  'This panel is limited to displaying only a fixed range of colors, and therefore cannot show all colors.',
              }),
            }),
            '\n',
            (0, r.jsx)(n.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'gestures', children: (0, r.jsx)(n.code, { children: 'gestures' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'An array of gestures or composed gestures from ',
                    (0, r.jsx)(n.code, { children: 'react-native-gesture-handler' }),
                    '.',
                  ],
                }),
                '\n',
                (0, r.jsx)(n.li, { children: 'These gestures will run simultaneously with the color picker gestures.' }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: Gesture[]' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: []' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'style', children: (0, r.jsx)(n.code, { children: 'style' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: "Panel's container style." }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'selectionstyle', children: (0, r.jsx)(n.code, { children: 'selectionStyle' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: 'The style of the square that indicates the selected color.' }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.admonition, {
              title: 'note',
              type: 'info',
              children: (0, r.jsxs)(n.ul, {
                children: ['\n', (0, r.jsx)(n.li, { children: 'Certain style properties will be overridden.' }), '\n'],
              }),
            }),
          ],
        });
      }
      function c(e = {}) {
        const { wrapper: n } = { ...(0, A.a)(), ...e.components };
        return n ? (0, r.jsx)(n, { ...e, children: (0, r.jsx)(a, { ...e }) }) : a(e);
      }
    },
    8589: (e, n, s) => {
      s.d(n, { Z: () => r });
      const r =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADICAYAAADWfGxSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASKSURBVHgB7dzLapwFGMbxdw5NJjM0R5MekiYxtLUUBHEhFnHRvRtv2BsoxYU7EQVpa2tSKB6nNpnPjZfwLvrg73cBH3Pg/727Z7QaVkM1en3xujqdn59Xp4uLi+r0vn++/9v3fd8/39OnT6vTuIBYAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZg0/HnX1Wn0Yvr1Wn75bPqdGfU+87aHP1YnU7rRXVa7bdOntXqRrVazavVyd1qNducVqffF1vVyQWGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYNM6OKxWy4PqtPH6XXW6MVmvTtuTi+r00eh5dVr2TpTV0L2JtVmt9u/13qSNN2vV6dV4UZ1cYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2HX34sDoNf96uTrvfX1ano8W16nRz/Kw6fVq9lvvV6vK4Wl3tjarT8Wer6rT5alqdfpr2jpS5wBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBsOhzfq1Yvz6rTYue8Ot1an1enk8l31enj6rXcq1ZvD3s3rFa9E2p195NqNTzfqE5PljaxgP8IGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIJNa/9utVr0bmwdzH6oTsez3k2s08lmdbqzt1+tbvVuitWDanV1NFSn8dbj6nRQf1Wn7V97N7ZcYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2Hd3v3cR69KJa7Xz7qDrdn82q04PJN9VpOPuiWh0tq9XG39VpPO3dxBpdPqxOi8k/1en0Zu/zXGAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAINv16q1qdnfa+E3ZPdqvT/mxUnWa3ezfFRoe9m13DrXfVaq9306k2q9f4TnVam/T+fofzy+rkAkMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUOw6ePr1eqDk2o1/7J3w2prrVqt7Z5Vq52d6jTa7t1gGnavqtOwqFajce/vt35tVZ2OFr3Pc4EhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAh2OjJm2GoRuu/tT6u1n6pVjd6J7ZqvvFzdVpbX1arWe8G0zDvfV5d6/1DhvmsOr0der/vyz/eVicXGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIL9C+bjhZjLoiutAAAAAElFTkSuQmCC';
    },
    1151: (e, n, s) => {
      s.d(n, { Z: () => l, a: () => o });
      var r = s(7294);
      const A = {},
        i = r.createContext(A);
      function o(e) {
        const n = r.useContext(i);
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e],
        );
      }
      function l(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(A)
              : e.components || A
            : o(e.components)),
          r.createElement(i.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
