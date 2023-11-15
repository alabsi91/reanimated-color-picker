'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [933],
  {
    4906: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => l,
          contentTitle: () => s,
          default: () => p,
          frontMatter: () => o,
          metadata: () => c,
          toc: () => d,
        });
      var i = r(5893),
        n = r(1151);
      const o = {
          sidebar_position: 16,
          sidebar_label: 'PreviewText',
          description: 'A React Native <Text> component that displays the preview color text.',
        },
        s = '<PreviewText />',
        c = {
          id: 'API/PreviewText',
          title: '<PreviewText />',
          description: 'A React Native <Text> component that displays the preview color text.',
          source: '@site/docs/API/PreviewText.md',
          sourceDirName: 'API',
          slug: '/API/PreviewText',
          permalink: '/reanimated-color-picker/docs/API/PreviewText',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 16,
          frontMatter: {
            sidebar_position: 16,
            sidebar_label: 'PreviewText',
            description: 'A React Native <Text> component that displays the preview color text.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Preview', permalink: '/reanimated-color-picker/docs/API/Preview' },
          next: { title: 'InputWidget', permalink: '/reanimated-color-picker/docs/API/InputWidget' },
        },
        l = {},
        d = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>colorFormat</code>', id: 'colorformat', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
        ];
      function a(e) {
        const t = { code: 'code', h1: 'h1', h2: 'h2', h3: 'h3', li: 'li', ul: 'ul', ...(0, n.a)(), ...e.components };
        return (0, i.jsxs)(i.Fragment, {
          children: [
            (0, i.jsx)(t.h1, { id: 'previewtext-', children: (0, i.jsx)(t.code, { children: '<PreviewText />' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'A React Native ',
                    (0, i.jsx)(t.code, { children: '<Text>' }),
                    ' component that displays the preview color text.',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'colorformat', children: (0, i.jsx)(t.code, { children: 'colorFormat' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsx)(t.li, { children: "Preview color's format." }),
                '\n',
                (0, i.jsx)(t.li, { children: (0, i.jsx)(t.code, { children: 'type: string' }) }),
                '\n',
                (0, i.jsxs)(t.li, { children: [(0, i.jsx)(t.code, { children: 'values:' }), (0, i.jsx)('formats', {})] }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'style', children: (0, i.jsx)(t.code, { children: 'style' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsx)(t.li, { children: 'Preview text style.' }),
                '\n',
                (0, i.jsx)(t.li, { children: (0, i.jsx)(t.code, { children: 'type: TextStyle' }) }),
                '\n',
              ],
            }),
          ],
        });
      }
      function p(e = {}) {
        const { wrapper: t } = { ...(0, n.a)(), ...e.components };
        return t ? (0, i.jsx)(t, { ...e, children: (0, i.jsx)(a, { ...e }) }) : a(e);
      }
    },
    1151: (e, t, r) => {
      r.d(t, { Z: () => c, a: () => s });
      var i = r(7294);
      const n = {},
        o = i.createContext(n);
      function s(e) {
        const t = i.useContext(o);
        return i.useMemo(
          function () {
            return 'function' == typeof e ? e(t) : { ...t, ...e };
          },
          [t, e]
        );
      }
      function c(e) {
        let t;
        return (
          (t = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(n)
              : e.components || n
            : s(e.components)),
          i.createElement(o.Provider, { value: t }, e.children)
        );
      }
    },
  },
]);
