'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [835],
  {
    1388: (e, i, n) => {
      n.r(i),
        n.d(i, {
          assets: () => s,
          contentTitle: () => c,
          default: () => h,
          frontMatter: () => d,
          metadata: () => r,
          toc: () => o,
        });
      var l = n(5893),
        t = n(1151);
      const d = {
          sidebar_position: 15,
          sidebar_label: 'Preview',
          description: 'The preview of the selected and the initial color.',
        },
        c = '<Preview />',
        r = {
          id: 'API/Preview',
          title: '<Preview />',
          description: 'The preview of the selected and the initial color.',
          source: '@site/docs/API/Preview.md',
          sourceDirName: 'API',
          slug: '/API/Preview',
          permalink: '/reanimated-color-picker/docs/API/Preview',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 15,
          frontMatter: {
            sidebar_position: 15,
            sidebar_label: 'Preview',
            description: 'The preview of the selected and the initial color.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Panel5', permalink: '/reanimated-color-picker/docs/API/Panel5' },
          next: { title: 'PreviewText', permalink: '/reanimated-color-picker/docs/API/PreviewText' },
        },
        s = {},
        o = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>colorFormat</code>', id: 'colorformat', level: 3 },
          { value: '<code>hideInitialColor</code>', id: 'hideinitialcolor', level: 3 },
          { value: '<code>hideText</code>', id: 'hidetext', level: 3 },
          { value: '<code>disableOpacityTexture</code>', id: 'disableopacitytexture', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>textStyle</code>', id: 'textstyle', level: 3 },
        ];
      function a(e) {
        const i = {
          a: 'a',
          admonition: 'admonition',
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          img: 'img',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, t.a)(),
          ...e.components,
        };
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)(i.h1, { id: 'preview-', children: (0, l.jsx)(i.code, { children: '<Preview />' }) }),
            '\n',
            (0, l.jsx)(i.p, { children: (0, l.jsx)(i.img, { alt: 'preview', src: n(4783).Z + '', width: '300', height: '50' }) }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: ['\n', (0, l.jsx)(i.li, { children: 'The preview of the selected and the initial color.' }), '\n'],
            }),
            '\n',
            (0, l.jsx)(i.admonition, {
              type: 'tip',
              children: (0, l.jsxs)(i.ul, {
                children: [
                  '\n',
                  (0, l.jsxs)(i.li, {
                    children: [
                      'If you want only the preview text, you can use the ',
                      (0, l.jsx)(i.a, { href: './PreviewText', children: (0, l.jsx)(i.code, { children: '<PreviewText />' }) }),
                      ' component.',
                    ],
                  }),
                  '\n',
                ],
              }),
            }),
            '\n',
            (0, l.jsx)(i.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, l.jsx)(i.h3, { id: 'colorformat', children: (0, l.jsx)(i.code, { children: 'colorFormat' }) }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: [
                '\n',
                (0, l.jsx)(i.li, { children: "Preview color's format." }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'type: string' }) }),
                '\n',
                (0, l.jsxs)(i.li, { children: [(0, l.jsx)(i.code, { children: 'values:' }), (0, l.jsx)('formats', {})] }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: "default: 'hex'" }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(i.h3, { id: 'hideinitialcolor', children: (0, l.jsx)(i.code, { children: 'hideInitialColor' }) }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: [
                '\n',
                (0, l.jsx)(i.li, { children: 'Hide the initial color preview part.' }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'type: boolean' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(i.h3, { id: 'hidetext', children: (0, l.jsx)(i.code, { children: 'hideText' }) }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: [
                '\n',
                (0, l.jsx)(i.li, { children: 'Hide preview texts.' }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'type: boolean' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(i.h3, {
              id: 'disableopacitytexture',
              children: (0, l.jsx)(i.code, { children: 'disableOpacityTexture' }),
            }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: [
                '\n',
                (0, l.jsx)(i.li, {
                  children: 'Hide the preview background texture image that appears when the color has an opacity less than 1.',
                }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'type: boolean' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(i.h3, { id: 'style', children: (0, l.jsx)(i.code, { children: 'style' }) }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: [
                '\n',
                (0, l.jsx)(i.li, { children: 'Preview container style.' }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(i.admonition, {
              title: 'note',
              type: 'info',
              children: (0, l.jsxs)(i.ul, {
                children: ['\n', (0, l.jsx)(i.li, { children: 'Certain style properties will be overridden.' }), '\n'],
              }),
            }),
            '\n',
            (0, l.jsx)(i.h3, { id: 'textstyle', children: (0, l.jsx)(i.code, { children: 'textStyle' }) }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: [
                '\n',
                (0, l.jsx)(i.li, { children: 'Preview texts style.' }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.code, { children: 'type: TextStyle' }) }),
                '\n',
              ],
            }),
          ],
        });
      }
      function h(e = {}) {
        const { wrapper: i } = { ...(0, t.a)(), ...e.components };
        return i ? (0, l.jsx)(i, { ...e, children: (0, l.jsx)(a, { ...e }) }) : a(e);
      }
    },
    4783: (e, i, n) => {
      n.d(i, { Z: () => l });
      const l =
        'data:image/png;base64,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';
    },
    1151: (e, i, n) => {
      n.d(i, { Z: () => r, a: () => c });
      var l = n(7294);
      const t = {},
        d = l.createContext(t);
      function c(e) {
        const i = l.useContext(d);
        return l.useMemo(
          function () {
            return 'function' == typeof e ? e(i) : { ...i, ...e };
          },
          [i, e]
        );
      }
      function r(e) {
        let i;
        return (
          (i = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(t)
              : e.components || t
            : c(e.components)),
          l.createElement(d.Provider, { value: i }, e.children)
        );
      }
    },
  },
]);
