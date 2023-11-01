'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [873],
  {
    2783: (e, r, n) => {
      n.r(r),
        n.d(r, {
          assets: () => N,
          contentTitle: () => E,
          default: () => C,
          frontMatter: () => V,
          metadata: () => T,
          toc: () => _,
        });
      var t = n(5893),
        a = n(1151),
        i = n(7294),
        l = n(4334),
        o = n(2466),
        s = n(6550),
        u = n(469),
        c = n(1980),
        d = n(7392),
        h = n(12);
      function p(e) {
        return (
          i.Children.toArray(e)
            .filter(e => '\n' !== e)
            .map(e => {
              if (
                !e ||
                ((0, i.isValidElement)(e) &&
                  (function (e) {
                    const { props: r } = e;
                    return !!r && 'object' == typeof r && 'value' in r;
                  })(e))
              )
                return e;
              throw new Error(
                `Docusaurus error: Bad <Tabs> child <${
                  'string' == typeof e.type ? e.type : e.type.name
                }>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`
              );
            })
            ?.filter(Boolean) ?? []
        );
      }
      function m(e) {
        const { values: r, children: n } = e;
        return (0, i.useMemo)(() => {
          const e =
            r ??
            (function (e) {
              return p(e).map(e => {
                let {
                  props: { value: r, label: n, attributes: t, default: a },
                } = e;
                return { value: r, label: n, attributes: t, default: a };
              });
            })(n);
          return (
            (function (e) {
              const r = (0, d.l)(e, (e, r) => e.value === r.value);
              if (r.length > 0)
                throw new Error(
                  `Docusaurus error: Duplicate values "${r
                    .map(e => e.value)
                    .join(', ')}" found in <Tabs>. Every value needs to be unique.`
                );
            })(e),
            e
          );
        }, [r, n]);
      }
      function f(e) {
        let { value: r, tabValues: n } = e;
        return n.some(e => e.value === r);
      }
      function v(e) {
        let { queryString: r = !1, groupId: n } = e;
        const t = (0, s.k6)(),
          a = (function (e) {
            let { queryString: r = !1, groupId: n } = e;
            if ('string' == typeof r) return r;
            if (!1 === r) return null;
            if (!0 === r && !n)
              throw new Error(
                'Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".'
              );
            return n ?? null;
          })({ queryString: r, groupId: n });
        return [
          (0, c._X)(a),
          (0, i.useCallback)(
            e => {
              if (!a) return;
              const r = new URLSearchParams(t.location.search);
              r.set(a, e), t.replace({ ...t.location, search: r.toString() });
            },
            [a, t]
          ),
        ];
      }
      function b(e) {
        const { defaultValue: r, queryString: n = !1, groupId: t } = e,
          a = m(e),
          [l, o] = (0, i.useState)(() =>
            (function (e) {
              let { defaultValue: r, tabValues: n } = e;
              if (0 === n.length)
                throw new Error('Docusaurus error: the <Tabs> component requires at least one <TabItem> children component');
              if (r) {
                if (!f({ value: r, tabValues: n }))
                  throw new Error(
                    `Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${n
                      .map(e => e.value)
                      .join(', ')}. If you intend to show no default tab, use defaultValue={null} instead.`
                  );
                return r;
              }
              const t = n.find(e => e.default) ?? n[0];
              if (!t) throw new Error('Unexpected error: 0 tabValues');
              return t.value;
            })({ defaultValue: r, tabValues: a })
          ),
          [s, c] = v({ queryString: n, groupId: t }),
          [d, p] = (function (e) {
            let { groupId: r } = e;
            const n = (function (e) {
                return e ? `docusaurus.tab.${e}` : null;
              })(r),
              [t, a] = (0, h.Nk)(n);
            return [
              t,
              (0, i.useCallback)(
                e => {
                  n && a.set(e);
                },
                [n, a]
              ),
            ];
          })({ groupId: t }),
          b = (() => {
            const e = s ?? d;
            return f({ value: e, tabValues: a }) ? e : null;
          })();
        (0, u.Z)(() => {
          b && o(b);
        }, [b]);
        return {
          selectedValue: l,
          selectValue: (0, i.useCallback)(
            e => {
              if (!f({ value: e, tabValues: a })) throw new Error(`Can't select invalid tab value=${e}`);
              o(e), c(e), p(e);
            },
            [c, p, a]
          ),
          tabValues: a,
        };
      }
      var g = n(2389);
      const x = { tabList: 'tabList__CuJ', tabItem: 'tabItem_LNqP' };
      function j(e) {
        let { className: r, block: n, selectedValue: a, selectValue: i, tabValues: s } = e;
        const u = [],
          { blockElementScrollPositionUntilNextRender: c } = (0, o.o5)(),
          d = e => {
            const r = e.currentTarget,
              n = u.indexOf(r),
              t = s[n].value;
            t !== a && (c(r), i(t));
          },
          h = e => {
            let r = null;
            switch (e.key) {
              case 'Enter':
                d(e);
                break;
              case 'ArrowRight': {
                const n = u.indexOf(e.currentTarget) + 1;
                r = u[n] ?? u[0];
                break;
              }
              case 'ArrowLeft': {
                const n = u.indexOf(e.currentTarget) - 1;
                r = u[n] ?? u[u.length - 1];
                break;
              }
            }
            r?.focus();
          };
        return (0, t.jsx)('ul', {
          role: 'tablist',
          'aria-orientation': 'horizontal',
          className: (0, l.Z)('tabs', { 'tabs--block': n }, r),
          children: s.map(e => {
            let { value: r, label: n, attributes: i } = e;
            return (0, t.jsx)(
              'li',
              {
                role: 'tab',
                tabIndex: a === r ? 0 : -1,
                'aria-selected': a === r,
                ref: e => u.push(e),
                onKeyDown: h,
                onClick: d,
                ...i,
                className: (0, l.Z)('tabs__item', x.tabItem, i?.className, { 'tabs__item--active': a === r }),
                children: n ?? r,
              },
              r
            );
          }),
        });
      }
      function w(e) {
        let { lazy: r, children: n, selectedValue: a } = e;
        const l = (Array.isArray(n) ? n : [n]).filter(Boolean);
        if (r) {
          const e = l.find(e => e.props.value === a);
          return e ? (0, i.cloneElement)(e, { className: 'margin-top--md' }) : null;
        }
        return (0, t.jsx)('div', {
          className: 'margin-top--md',
          children: l.map((e, r) => (0, i.cloneElement)(e, { key: r, hidden: e.props.value !== a })),
        });
      }
      function y(e) {
        const r = b(e);
        return (0, t.jsxs)('div', {
          className: (0, l.Z)('tabs-container', x.tabList),
          children: [(0, t.jsx)(j, { ...e, ...r }), (0, t.jsx)(w, { ...e, ...r })],
        });
      }
      function k(e) {
        const r = (0, g.Z)();
        return (0, t.jsx)(y, { ...e, children: p(e.children) }, String(r));
      }
      const I = { tabItem: 'tabItem_Ymn6' };
      function q(e) {
        let { children: r, hidden: n, className: a } = e;
        return (0, t.jsx)('div', { role: 'tabpanel', className: (0, l.Z)(I.tabItem, a), hidden: n, children: r });
      }
      const V = { sidebar_label: 'Installation', sidebar_position: 2 },
        E = void 0,
        T = {
          id: 'Installation',
          title: 'Installation',
          description: 'Prerequisites',
          source: '@site/docs/Installation.mdx',
          sourceDirName: '.',
          slug: '/Installation',
          permalink: '/reanimated-color-picker/docs/Installation',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 2,
          frontMatter: { sidebar_label: 'Installation', sidebar_position: 2 },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Introduction', permalink: '/reanimated-color-picker/docs/intro' },
          next: { title: 'Usage', permalink: '/reanimated-color-picker/docs/Usage' },
        },
        N = {},
        _ = [
          { value: 'Prerequisites', id: 'prerequisites', level: 2 },
          {
            value: 'react-native-reanimated version <code>2.0.0</code> or higher.',
            id: 'react-native-reanimated-version-200-or-higher',
            level: 3,
          },
          {
            value: 'react-native-gesture-handler version <code>2.0.0</code> or higher.',
            id: 'react-native-gesture-handler-version-200-or-higher',
            level: 3,
          },
          {
            value: 'Expo managed workflow version <code>44</code> or higher is required.',
            id: 'expo-managed-workflow-version-44-or-higher-is-required',
            level: 4,
          },
          { value: 'Installation', id: 'installation', level: 2 },
        ];
      function S(e) {
        const r = {
          a: 'a',
          admonition: 'admonition',
          code: 'code',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          li: 'li',
          pre: 'pre',
          ul: 'ul',
          ...(0, a.a)(),
          ...e.components,
        };
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(r.h2, { id: 'prerequisites', children: 'Prerequisites' }),
            '\n',
            (0, t.jsxs)(r.ul, {
              children: [
                '\n',
                (0, t.jsxs)(r.li, {
                  children: [
                    '\n',
                    (0, t.jsxs)(r.h3, {
                      id: 'react-native-reanimated-version-200-or-higher',
                      children: [
                        (0, t.jsx)(r.a, {
                          href: 'https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation',
                          children: 'react-native-reanimated',
                        }),
                        ' version ',
                        (0, t.jsx)(r.code, { children: '2.0.0' }),
                        ' or higher.',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, t.jsxs)(r.li, {
                  children: [
                    '\n',
                    (0, t.jsxs)(r.h3, {
                      id: 'react-native-gesture-handler-version-200-or-higher',
                      children: [
                        (0, t.jsx)(r.a, {
                          href: 'https://docs.swmansion.com/react-native-gesture-handler/docs/installation',
                          children: 'react-native-gesture-handler',
                        }),
                        ' version ',
                        (0, t.jsx)(r.code, { children: '2.0.0' }),
                        ' or higher.',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(r.admonition, {
              title: 'For Expo users',
              type: 'info',
              children: (0, t.jsxs)(r.h4, {
                id: 'expo-managed-workflow-version-44-or-higher-is-required',
                children: [
                  (0, t.jsx)(r.a, { href: 'https://docs.expo.dev/get-started/installation/', children: 'Expo managed workflow' }),
                  ' version ',
                  (0, t.jsx)(r.code, { children: '44' }),
                  ' or higher is required.',
                ],
              }),
            }),
            '\n',
            (0, t.jsx)(r.h2, { id: 'installation', children: 'Installation' }),
            '\n',
            (0, t.jsxs)(r.ul, {
              children: ['\n', (0, t.jsx)(r.li, { children: 'Open a Terminal in the project root and run:' }), '\n'],
            }),
            '\n',
            (0, t.jsxs)(k, {
              children: [
                (0, t.jsx)(q, {
                  value: 'npm',
                  label: 'npm',
                  default: !0,
                  children: (0, t.jsx)(r.pre, {
                    children: (0, t.jsx)(r.code, { className: 'language-cli', children: 'npm i reanimated-color-picker\n' }),
                  }),
                }),
                (0, t.jsx)(q, {
                  value: 'yarn',
                  label: 'yarn',
                  children: (0, t.jsx)(r.pre, {
                    children: (0, t.jsx)(r.code, { className: 'language-cli', children: 'yarn add reanimated-color-picker\n' }),
                  }),
                }),
              ],
            }),
          ],
        });
      }
      function C(e = {}) {
        const { wrapper: r } = { ...(0, a.a)(), ...e.components };
        return r ? (0, t.jsx)(r, { ...e, children: (0, t.jsx)(S, { ...e }) }) : S(e);
      }
    },
    1151: (e, r, n) => {
      n.d(r, { Z: () => o, a: () => l });
      var t = n(7294);
      const a = {},
        i = t.createContext(a);
      function l(e) {
        const r = t.useContext(i);
        return t.useMemo(
          function () {
            return 'function' == typeof e ? e(r) : { ...r, ...e };
          },
          [r, e]
        );
      }
      function o(e) {
        let r;
        return (
          (r = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(a)
              : e.components || a
            : l(e.components)),
          t.createElement(i.Provider, { value: r }, e.children)
        );
      }
    },
  },
]);
