'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [873],
  {
    3905: (e, t, r) => {
      r.d(t, { Zo: () => c, kt: () => f });
      var n = r(7294);
      function a(e, t, r) {
        return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r), e;
      }
      function l(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function o(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? l(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : l(Object(r)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
              });
        }
        return e;
      }
      function i(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              l = Object.keys(e);
            for (n = 0; n < l.length; n++) (r = l[n]), t.indexOf(r) >= 0 || (a[r] = e[r]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var l = Object.getOwnPropertySymbols(e);
          for (n = 0; n < l.length; n++)
            (r = l[n]), t.indexOf(r) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, r) && (a[r] = e[r]));
        }
        return a;
      }
      var u = n.createContext({}),
        s = function (e) {
          var t = n.useContext(u),
            r = t;
          return e && (r = 'function' == typeof e ? e(t) : o(o({}, t), e)), r;
        },
        c = function (e) {
          var t = s(e.components);
          return n.createElement(u.Provider, { value: t }, e.children);
        },
        d = 'mdxType',
        p = {
          inlineCode: 'code',
          wrapper: function (e) {
            var t = e.children;
            return n.createElement(n.Fragment, {}, t);
          },
        },
        m = n.forwardRef(function (e, t) {
          var r = e.components,
            a = e.mdxType,
            l = e.originalType,
            u = e.parentName,
            c = i(e, ['components', 'mdxType', 'originalType', 'parentName']),
            d = s(r),
            m = a,
            f = d[''.concat(u, '.').concat(m)] || d[m] || p[m] || l;
          return r ? n.createElement(f, o(o({ ref: t }, c), {}, { components: r })) : n.createElement(f, o({ ref: t }, c));
        });
      function f(e, t) {
        var r = arguments,
          a = t && t.mdxType;
        if ('string' == typeof e || a) {
          var l = r.length,
            o = new Array(l);
          o[0] = m;
          var i = {};
          for (var u in t) hasOwnProperty.call(t, u) && (i[u] = t[u]);
          (i.originalType = e), (i[d] = 'string' == typeof e ? e : a), (o[1] = i);
          for (var s = 2; s < l; s++) o[s] = r[s];
          return n.createElement.apply(null, o);
        }
        return n.createElement.apply(null, r);
      }
      m.displayName = 'MDXCreateElement';
    },
    2001: (e, t, r) => {
      r.r(t),
        r.d(t, {
          assets: () => P,
          contentTitle: () => x,
          default: () => C,
          frontMatter: () => T,
          metadata: () => j,
          toc: () => V,
        });
      var n = r(7462),
        a = r(7294),
        l = r(3905),
        o = r(6010),
        i = r(2466),
        u = r(6775),
        s = r(1980),
        c = r(7392),
        d = r(12);
      function p(e) {
        return (function (e) {
          var t;
          return (
            (null ==
            (t = a.Children.map(e, e => {
              if (
                !e ||
                ((0, a.isValidElement)(e) &&
                  (function (e) {
                    const { props: t } = e;
                    return !!t && 'object' == typeof t && 'value' in t;
                  })(e))
              )
                return e;
              throw new Error(
                `Docusaurus error: Bad <Tabs> child <${
                  'string' == typeof e.type ? e.type : e.type.name
                }>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`
              );
            }))
              ? void 0
              : t.filter(Boolean)) ?? []
          );
        })(e).map(e => {
          let {
            props: { value: t, label: r, attributes: n, default: a },
          } = e;
          return { value: t, label: r, attributes: n, default: a };
        });
      }
      function m(e) {
        const { values: t, children: r } = e;
        return (0, a.useMemo)(() => {
          const e = t ?? p(r);
          return (
            (function (e) {
              const t = (0, c.l)(e, (e, t) => e.value === t.value);
              if (t.length > 0)
                throw new Error(
                  `Docusaurus error: Duplicate values "${t
                    .map(e => e.value)
                    .join(', ')}" found in <Tabs>. Every value needs to be unique.`
                );
            })(e),
            e
          );
        }, [t, r]);
      }
      function f(e) {
        let { value: t, tabValues: r } = e;
        return r.some(e => e.value === t);
      }
      function b(e) {
        let { queryString: t = !1, groupId: r } = e;
        const n = (0, u.k6)(),
          l = (function (e) {
            let { queryString: t = !1, groupId: r } = e;
            if ('string' == typeof t) return t;
            if (!1 === t) return null;
            if (!0 === t && !r)
              throw new Error(
                'Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".'
              );
            return r ?? null;
          })({ queryString: t, groupId: r });
        return [
          (0, s._X)(l),
          (0, a.useCallback)(
            e => {
              if (!l) return;
              const t = new URLSearchParams(n.location.search);
              t.set(l, e), n.replace({ ...n.location, search: t.toString() });
            },
            [l, n]
          ),
        ];
      }
      function h(e) {
        const { defaultValue: t, queryString: r = !1, groupId: n } = e,
          l = m(e),
          [o, i] = (0, a.useState)(() =>
            (function (e) {
              let { defaultValue: t, tabValues: r } = e;
              if (0 === r.length)
                throw new Error('Docusaurus error: the <Tabs> component requires at least one <TabItem> children component');
              if (t) {
                if (!f({ value: t, tabValues: r }))
                  throw new Error(
                    `Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r
                      .map(e => e.value)
                      .join(', ')}. If you intend to show no default tab, use defaultValue={null} instead.`
                  );
                return t;
              }
              const n = r.find(e => e.default) ?? r[0];
              if (!n) throw new Error('Unexpected error: 0 tabValues');
              return n.value;
            })({ defaultValue: t, tabValues: l })
          ),
          [u, s] = b({ queryString: r, groupId: n }),
          [c, p] = (function (e) {
            let { groupId: t } = e;
            const r = (function (e) {
                return e ? `docusaurus.tab.${e}` : null;
              })(t),
              [n, l] = (0, d.Nk)(r);
            return [
              n,
              (0, a.useCallback)(
                e => {
                  r && l.set(e);
                },
                [r, l]
              ),
            ];
          })({ groupId: n }),
          h = (() => {
            const e = u ?? c;
            return f({ value: e, tabValues: l }) ? e : null;
          })();
        (0, a.useLayoutEffect)(() => {
          h && i(h);
        }, [h]);
        return {
          selectedValue: o,
          selectValue: (0, a.useCallback)(
            e => {
              if (!f({ value: e, tabValues: l })) throw new Error(`Can't select invalid tab value=${e}`);
              i(e), s(e), p(e);
            },
            [s, p, l]
          ),
          tabValues: l,
        };
      }
      var v = r(2389);
      const y = 'tabList__CuJ',
        g = 'tabItem_LNqP';
      function k(e) {
        let { className: t, block: r, selectedValue: l, selectValue: u, tabValues: s } = e;
        const c = [],
          { blockElementScrollPositionUntilNextRender: d } = (0, i.o5)(),
          p = e => {
            const t = e.currentTarget,
              r = c.indexOf(t),
              n = s[r].value;
            n !== l && (d(t), u(n));
          },
          m = e => {
            var t;
            let r = null;
            switch (e.key) {
              case 'Enter':
                p(e);
                break;
              case 'ArrowRight': {
                const t = c.indexOf(e.currentTarget) + 1;
                r = c[t] ?? c[0];
                break;
              }
              case 'ArrowLeft': {
                const t = c.indexOf(e.currentTarget) - 1;
                r = c[t] ?? c[c.length - 1];
                break;
              }
            }
            null == (t = r) || t.focus();
          };
        return a.createElement(
          'ul',
          { role: 'tablist', 'aria-orientation': 'horizontal', className: (0, o.Z)('tabs', { 'tabs--block': r }, t) },
          s.map(e => {
            let { value: t, label: r, attributes: i } = e;
            return a.createElement(
              'li',
              (0, n.Z)(
                {
                  role: 'tab',
                  tabIndex: l === t ? 0 : -1,
                  'aria-selected': l === t,
                  key: t,
                  ref: e => c.push(e),
                  onKeyDown: m,
                  onClick: p,
                },
                i,
                { className: (0, o.Z)('tabs__item', g, null == i ? void 0 : i.className, { 'tabs__item--active': l === t }) }
              ),
              r ?? t
            );
          })
        );
      }
      function w(e) {
        let { lazy: t, children: r, selectedValue: n } = e;
        const l = (Array.isArray(r) ? r : [r]).filter(Boolean);
        if (t) {
          const e = l.find(e => e.props.value === n);
          return e ? (0, a.cloneElement)(e, { className: 'margin-top--md' }) : null;
        }
        return a.createElement(
          'div',
          { className: 'margin-top--md' },
          l.map((e, t) => (0, a.cloneElement)(e, { key: t, hidden: e.props.value !== n }))
        );
      }
      function E(e) {
        const t = h(e);
        return a.createElement(
          'div',
          { className: (0, o.Z)('tabs-container', y) },
          a.createElement(k, (0, n.Z)({}, e, t)),
          a.createElement(w, (0, n.Z)({}, e, t))
        );
      }
      function N(e) {
        const t = (0, v.Z)();
        return a.createElement(E, (0, n.Z)({ key: String(t) }, e));
      }
      const O = 'tabItem_Ymn6';
      function I(e) {
        let { children: t, hidden: r, className: n } = e;
        return a.createElement('div', { role: 'tabpanel', className: (0, o.Z)(O, n), hidden: r }, t);
      }
      const T = { sidebar_label: 'Installation', sidebar_position: 2 },
        x = void 0,
        j = {
          unversionedId: 'Installation',
          id: 'Installation',
          title: 'Installation',
          description: 'Prerequisites',
          source: '@site/docs/Installation.mdx',
          sourceDirName: '.',
          slug: '/Installation',
          permalink: '/reanimated-color-picker/docs/Installation',
          draft: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 2,
          frontMatter: { sidebar_label: 'Installation', sidebar_position: 2 },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Introduction', permalink: '/reanimated-color-picker/docs/intro' },
          next: { title: 'Usage', permalink: '/reanimated-color-picker/docs/Usage' },
        },
        P = {},
        V = [
          { value: 'Prerequisites', id: 'prerequisites', level: 2 },
          { value: 'Installation', id: 'installation', level: 2 },
        ],
        q = { toc: V };
      function C(e) {
        let { components: t, ...r } = e;
        return (0, l.kt)(
          'wrapper',
          (0, n.Z)({}, q, r, { components: t, mdxType: 'MDXLayout' }),
          (0, l.kt)('h2', { id: 'prerequisites' }, 'Prerequisites'),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)(
                'h3',
                { parentName: 'li', id: 'react-native-reanimated-version-200-or-higher' },
                (0, l.kt)(
                  'a',
                  { parentName: 'h3', href: 'https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation' },
                  'react-native-reanimated'
                ),
                ' version ',
                (0, l.kt)('inlineCode', { parentName: 'h3' }, '2.0.0'),
                ' or higher.'
              )
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)(
                'h3',
                { parentName: 'li', id: 'react-native-gesture-handler-version-200-or-higher' },
                (0, l.kt)(
                  'a',
                  { parentName: 'h3', href: 'https://docs.swmansion.com/react-native-gesture-handler/docs/installation' },
                  'react-native-gesture-handler'
                ),
                ' version ',
                (0, l.kt)('inlineCode', { parentName: 'h3' }, '2.0.0'),
                ' or higher.'
              )
            )
          ),
          (0, l.kt)(
            'admonition',
            { title: 'For Expo users', type: 'info' },
            (0, l.kt)(
              'h4',
              { parentName: 'admonition', id: 'expo-managed-workflow-version-44-or-higher-is-required' },
              (0, l.kt)(
                'a',
                { parentName: 'h4', href: 'https://docs.expo.dev/get-started/installation/' },
                'Expo managed workflow'
              ),
              ' version ',
              (0, l.kt)('inlineCode', { parentName: 'h4' }, '44'),
              ' or higher is required.'
            )
          ),
          (0, l.kt)('h2', { id: 'installation' }, 'Installation'),
          (0, l.kt)('ul', null, (0, l.kt)('li', { parentName: 'ul' }, 'Open a Terminal in the project root and run:')),
          (0, l.kt)(
            N,
            { mdxType: 'Tabs' },
            (0, l.kt)(
              I,
              { value: 'npm', label: 'npm', default: !0, mdxType: 'TabItem' },
              (0, l.kt)(
                'pre',
                null,
                (0, l.kt)('code', { parentName: 'pre', className: 'language-cli' }, 'npm i reanimated-color-picker\n')
              )
            ),
            (0, l.kt)(
              I,
              { value: 'yarn', label: 'yarn', mdxType: 'TabItem' },
              (0, l.kt)(
                'pre',
                null,
                (0, l.kt)('code', { parentName: 'pre', className: 'language-cli' }, 'yarn add reanimated-color-picker\n')
              )
            )
          )
        );
      }
      C.isMDXComponent = !0;
    },
  },
]);
