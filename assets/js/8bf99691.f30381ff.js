'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [405],
  {
    3306: (e, n, r) => {
      r.r(n),
        r.d(n, {
          assets: () => c,
          contentTitle: () => s,
          default: () => m,
          frontMatter: () => i,
          metadata: () => l,
          toc: () => d,
        });
      var o = r(5893),
        t = r(1151),
        a = r(7391);
      const i = { sidebar_position: 7 },
        s = 'Examples',
        l = {
          id: 'Examples',
          title: 'Examples',
          description: '- ### Bare workflow - typescript',
          source: '@site/docs/Examples.mdx',
          sourceDirName: '.',
          slug: '/Examples',
          permalink: '/reanimated-color-picker/docs/Examples',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 7,
          frontMatter: { sidebar_position: 7 },
          sidebar: 'tutorialSidebar',
          previous: { title: 'ColorKit', permalink: '/reanimated-color-picker/docs/ColorKit' },
        },
        c = {},
        d = [
          { value: 'Bare workflow - typescript', id: 'bare-workflow---typescript', level: 3 },
          { value: 'Expo managed workflow', id: 'expo-managed-workflow', level: 3 },
          { value: 'Expo snack', id: 'expo-snack', level: 3 },
        ];
      function p(e) {
        const n = {
          a: 'a',
          admonition: 'admonition',
          h1: 'h1',
          h3: 'h3',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, t.a)(),
          ...e.components,
        };
        return (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsx)(n.h1, { id: 'examples', children: 'Examples' }),
            '\n',
            (0, o.jsxs)(n.ul, {
              children: [
                '\n',
                (0, o.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, o.jsx)(n.h3, {
                      id: 'bare-workflow---typescript',
                      children: (0, o.jsx)(n.a, {
                        href: 'https://github.com/alabsi91/reanimated-color-picker/tree/main/Example',
                        children: 'Bare workflow - typescript',
                      }),
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, o.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, o.jsx)(n.h3, {
                      id: 'expo-managed-workflow',
                      children: (0, o.jsx)(n.a, {
                        href: 'https://github.com/alabsi91/reanimated-color-picker/tree/main/ExampleExpo',
                        children: 'Expo managed workflow',
                      }),
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, o.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, o.jsx)(n.h3, {
                      id: 'expo-snack',
                      children: (0, o.jsx)(n.a, {
                        href: 'https://snack.expo.dev/@alabsi91/reanimated-color-picker',
                        children: 'Expo snack',
                      }),
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, o.jsx)(n.admonition, {
              title: 'note',
              type: 'info',
              children: (0, o.jsx)(n.p, { children: 'if the example is not loading, please try to refresh the page.' }),
            }),
            '\n',
            '\n',
            '\n',
            (0, o.jsx)(a.Z, {}),
          ],
        });
      }
      function m(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, o.jsx)(n, { ...e, children: (0, o.jsx)(p, { ...e }) }) : p(e);
      }
    },
    7391: (e, n, r) => {
      r.d(n, { Z: () => t });
      r(7294);
      var o = r(5893);
      function t() {
        return (0, o.jsx)('div', {
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
    1151: (e, n, r) => {
      r.d(n, { Z: () => s, a: () => i });
      var o = r(7294);
      const t = {},
        a = o.createContext(t);
      function i(e) {
        const n = o.useContext(a);
        return o.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e],
        );
      }
      function s(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(t)
              : e.components || t
            : i(e.components)),
          o.createElement(a.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
