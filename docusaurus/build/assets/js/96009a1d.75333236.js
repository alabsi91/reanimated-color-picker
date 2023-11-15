'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [362],
  {
    761: (e, n, A) => {
      A.r(n),
        A.d(n, {
          assets: () => l,
          contentTitle: () => s,
          default: () => I,
          frontMatter: () => i,
          metadata: () => t,
          toc: () => a,
        });
      var o = A(5893),
        r = A(1151);
      const i = {
          sidebar_position: 14,
          sidebar_label: 'Panel5',
          description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
        },
        s = '<Panel5 />',
        t = {
          id: 'API/Panel5',
          title: '<Panel5 />',
          description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
          source: '@site/docs/API/Panel5.mdx',
          sourceDirName: 'API',
          slug: '/API/Panel5',
          permalink: '/reanimated-color-picker/docs/API/Panel5',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 14,
          frontMatter: {
            sidebar_position: 14,
            sidebar_label: 'Panel5',
            description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Panel4', permalink: '/reanimated-color-picker/docs/API/Panel4' },
          next: { title: 'Preview', permalink: '/reanimated-color-picker/docs/API/Preview' },
        },
        l = {},
        a = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>selectionStyle</code>', id: 'selectionstyle', level: 3 },
        ];
      function d(e) {
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
          ...(0, r.a)(),
          ...e.components,
        };
        return (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsx)(n.h1, { id: 'panel5-', children: (0, o.jsx)(n.code, { children: '<Panel5 />' }) }),
            '\n',
            (0, o.jsx)(n.p, { children: (0, o.jsx)(n.img, { alt: 'panel5', src: A(3824).Z + '', width: '240', height: '200' }) }),
            '\n',
            (0, o.jsxs)(n.ul, {
              children: [
                '\n',
                (0, o.jsx)(n.li, { children: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.' }),
                '\n',
              ],
            }),
            '\n',
            (0, o.jsx)(n.admonition, {
              type: 'danger',
              children: (0, o.jsx)(n.p, {
                children:
                  'This panel is limited to displaying only a fixed range of colors, and therefore cannot show all colors.',
              }),
            }),
            '\n',
            (0, o.jsx)(n.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, o.jsx)(n.h3, { id: 'style', children: (0, o.jsx)(n.code, { children: 'style' }) }),
            '\n',
            (0, o.jsxs)(n.ul, {
              children: [
                '\n',
                (0, o.jsx)(n.li, { children: "Panel's container style." }),
                '\n',
                (0, o.jsx)(n.li, { children: (0, o.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, o.jsx)(n.h3, { id: 'selectionstyle', children: (0, o.jsx)(n.code, { children: 'selectionStyle' }) }),
            '\n',
            (0, o.jsxs)(n.ul, {
              children: [
                '\n',
                (0, o.jsx)(n.li, { children: 'The style of the square that indicates the selected color.' }),
                '\n',
                (0, o.jsx)(n.li, { children: (0, o.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, o.jsx)(n.admonition, {
              title: 'note',
              type: 'info',
              children: (0, o.jsxs)(n.ul, {
                children: ['\n', (0, o.jsx)(n.li, { children: 'Certain style properties will be overridden.' }), '\n'],
              }),
            }),
          ],
        });
      }
      function I(e = {}) {
        const { wrapper: n } = { ...(0, r.a)(), ...e.components };
        return n ? (0, o.jsx)(n, { ...e, children: (0, o.jsx)(d, { ...e }) }) : d(e);
      }
    },
    3824: (e, n, A) => {
      A.d(n, { Z: () => o });
      const o =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADICAYAAADWfGxSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASKSURBVHgB7dzLapwFGMbxdw5NJjM0R5MekiYxtLUUBHEhFnHRvRtv2BsoxYU7EQVpa2tSKB6nNpnPjZfwLvrg73cBH3Pg/727Z7QaVkM1en3xujqdn59Xp4uLi+r0vn++/9v3fd8/39OnT6vTuIBYAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZg0/HnX1Wn0Yvr1Wn75bPqdGfU+87aHP1YnU7rRXVa7bdOntXqRrVazavVyd1qNducVqffF1vVyQWGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYNM6OKxWy4PqtPH6XXW6MVmvTtuTi+r00eh5dVr2TpTV0L2JtVmt9u/13qSNN2vV6dV4UZ1cYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2HX34sDoNf96uTrvfX1ano8W16nRz/Kw6fVq9lvvV6vK4Wl3tjarT8Wer6rT5alqdfpr2jpS5wBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBsOhzfq1Yvz6rTYue8Ot1an1enk8l31enj6rXcq1ZvD3s3rFa9E2p195NqNTzfqE5PljaxgP8IGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIJNa/9utVr0bmwdzH6oTsez3k2s08lmdbqzt1+tbvVuitWDanV1NFSn8dbj6nRQf1Wn7V97N7ZcYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2Hd3v3cR69KJa7Xz7qDrdn82q04PJN9VpOPuiWh0tq9XG39VpPO3dxBpdPqxOi8k/1en0Zu/zXGAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAINv16q1qdnfa+E3ZPdqvT/mxUnWa3ezfFRoe9m13DrXfVaq9306k2q9f4TnVam/T+fofzy+rkAkMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUOw6ePr1eqDk2o1/7J3w2prrVqt7Z5Vq52d6jTa7t1gGnavqtOwqFajce/vt35tVZ2OFr3Pc4EhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAh2OjJm2GoRuu/tT6u1n6pVjd6J7ZqvvFzdVpbX1arWe8G0zDvfV5d6/1DhvmsOr0der/vyz/eVicXGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIL9C+bjhZjLoiutAAAAAElFTkSuQmCC';
    },
    1151: (e, n, A) => {
      A.d(n, { Z: () => t, a: () => s });
      var o = A(7294);
      const r = {},
        i = o.createContext(r);
      function s(e) {
        const n = o.useContext(i);
        return o.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e]
        );
      }
      function t(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(r)
              : e.components || r
            : s(e.components)),
          o.createElement(i.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
