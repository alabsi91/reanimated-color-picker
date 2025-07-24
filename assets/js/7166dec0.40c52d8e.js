'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [114],
  {
    5928: (e, t, i) => {
      i.r(t),
        i.d(t, {
          assets: () => o,
          contentTitle: () => c,
          default: () => h,
          frontMatter: () => r,
          metadata: () => l,
          toc: () => d,
        });
      var n = i(5893),
        s = i(1151);
      const r = {
          sidebar_position: 3,
          sidebar_label: 'Swatches',
          description: 'A list of color swatches is utilized for efficient color selection.',
        },
        c = '<Swatches />',
        l = {
          id: 'API/Preview/Swatches',
          title: '<Swatches />',
          description: 'A list of color swatches is utilized for efficient color selection.',
          source: '@site/docs/API/Preview/Swatches.md',
          sourceDirName: 'API/Preview',
          slug: '/API/Preview/Swatches',
          permalink: '/reanimated-color-picker/docs/API/Preview/Swatches',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 3,
          frontMatter: {
            sidebar_position: 3,
            sidebar_label: 'Swatches',
            description: 'A list of color swatches is utilized for efficient color selection.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'InputWidget', permalink: '/reanimated-color-picker/docs/API/Preview/InputWidget' },
          next: { title: 'ExtraThumb', permalink: '/reanimated-color-picker/docs/API/Preview/ExtraThumb' },
        },
        o = {},
        d = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>colors</code>', id: 'colors', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>swatchStyle</code>', id: 'swatchstyle', level: 3 },
        ];
      function a(e) {
        const t = {
          admonition: 'admonition',
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          img: 'img',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, s.a)(),
          ...e.components,
        };
        return (0, n.jsxs)(n.Fragment, {
          children: [
            (0, n.jsx)(t.h1, { id: 'swatches-', children: (0, n.jsx)(t.code, { children: '<Swatches />' }) }),
            '\n',
            (0, n.jsx)(t.p, {
              children: (0, n.jsx)(t.img, { alt: 'swatches', src: i(3849).Z + '', width: '234', height: '50' }),
            }),
            '\n',
            (0, n.jsxs)(t.ul, {
              children: [
                '\n',
                (0, n.jsx)(t.li, { children: 'A list of color swatches is utilized for efficient color selection.' }),
                '\n',
              ],
            }),
            '\n',
            (0, n.jsx)(t.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, n.jsx)(t.h3, { id: 'colors', children: (0, n.jsx)(t.code, { children: 'colors' }) }),
            '\n',
            (0, n.jsxs)(t.ul, {
              children: [
                '\n',
                (0, n.jsx)(t.li, { children: 'Custom swatches colors.' }),
                '\n',
                (0, n.jsx)(t.li, { children: (0, n.jsx)(t.code, { children: 'type: string[]' }) }),
                '\n',
                (0, n.jsx)(t.li, { children: (0, n.jsx)(t.code, { children: 'default: material colors' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, n.jsx)(t.h3, { id: 'style', children: (0, n.jsx)(t.code, { children: 'style' }) }),
            '\n',
            (0, n.jsxs)(t.ul, {
              children: [
                '\n',
                (0, n.jsx)(t.li, { children: 'Swatches container style.' }),
                '\n',
                (0, n.jsx)(t.li, { children: (0, n.jsx)(t.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, n.jsx)(t.h3, { id: 'swatchstyle', children: (0, n.jsx)(t.code, { children: 'swatchStyle' }) }),
            '\n',
            (0, n.jsxs)(t.ul, {
              children: [
                '\n',
                (0, n.jsx)(t.li, { children: 'Swatch style.' }),
                '\n',
                (0, n.jsx)(t.li, { children: (0, n.jsx)(t.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, n.jsx)(t.admonition, {
              title: 'note',
              type: 'info',
              children: (0, n.jsxs)(t.ul, {
                children: ['\n', (0, n.jsx)(t.li, { children: 'Certain style properties will be overridden.' }), '\n'],
              }),
            }),
          ],
        });
      }
      function h(e = {}) {
        const { wrapper: t } = { ...(0, s.a)(), ...e.components };
        return t ? (0, n.jsx)(t, { ...e, children: (0, n.jsx)(a, { ...e }) }) : a(e);
      }
    },
    3849: (e, t, i) => {
      i.d(t, { Z: () => n });
      const n =
        'data:image/png;base64,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';
    },
    1151: (e, t, i) => {
      i.d(t, { Z: () => l, a: () => c });
      var n = i(7294);
      const s = {},
        r = n.createContext(s);
      function c(e) {
        const t = n.useContext(r);
        return n.useMemo(
          function () {
            return 'function' == typeof e ? e(t) : { ...t, ...e };
          },
          [t, e],
        );
      }
      function l(e) {
        let t;
        return (
          (t = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(s)
              : e.components || s
            : c(e.components)),
          n.createElement(r.Provider, { value: t }, e.children)
        );
      }
    },
  },
]);
