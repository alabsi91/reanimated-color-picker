'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [362],
  {
    3905: (e, t, n) => {
      n.d(t, { Zo: () => s, kt: () => p });
      var r = n(7294);
      function o(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function A(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(n), !0).forEach(function (t) {
                o(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : a(Object(n)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
              });
        }
        return e;
      }
      function i(e, t) {
        if (null == e) return {};
        var n,
          r,
          o = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              o = {},
              a = Object.keys(e);
            for (r = 0; r < a.length; r++) (n = a[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
            return o;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (r = 0; r < a.length; r++)
            (n = a[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
        }
        return o;
      }
      var l = r.createContext({}),
        m = function (e) {
          var t = r.useContext(l),
            n = t;
          return e && (n = 'function' == typeof e ? e(t) : A(A({}, t), e)), n;
        },
        s = function (e) {
          var t = m(e.components);
          return r.createElement(l.Provider, { value: t }, e.children);
        },
        I = 'mdxType',
        c = {
          inlineCode: 'code',
          wrapper: function (e) {
            var t = e.children;
            return r.createElement(r.Fragment, {}, t);
          },
        },
        d = r.forwardRef(function (e, t) {
          var n = e.components,
            o = e.mdxType,
            a = e.originalType,
            l = e.parentName,
            s = i(e, ['components', 'mdxType', 'originalType', 'parentName']),
            I = m(n),
            d = o,
            p = I[''.concat(l, '.').concat(d)] || I[d] || c[d] || a;
          return n ? r.createElement(p, A(A({ ref: t }, s), {}, { components: n })) : r.createElement(p, A({ ref: t }, s));
        });
      function p(e, t) {
        var n = arguments,
          o = t && t.mdxType;
        if ('string' == typeof e || o) {
          var a = n.length,
            A = new Array(a);
          A[0] = d;
          var i = {};
          for (var l in t) hasOwnProperty.call(t, l) && (i[l] = t[l]);
          (i.originalType = e), (i[I] = 'string' == typeof e ? e : o), (A[1] = i);
          for (var m = 2; m < a; m++) A[m] = n[m];
          return r.createElement.apply(null, A);
        }
        return r.createElement.apply(null, n);
      }
      d.displayName = 'MDXCreateElement';
    },
    9620: (e, t, n) => {
      n.r(t),
        n.d(t, {
          assets: () => l,
          contentTitle: () => A,
          default: () => I,
          frontMatter: () => a,
          metadata: () => i,
          toc: () => m,
        });
      var r = n(7462),
        o = (n(7294), n(3905));
      const a = {
          sidebar_position: 14,
          sidebar_label: 'Panel5',
          description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
        },
        A = '<Panel5 />',
        i = {
          unversionedId: 'API/Panel5',
          id: 'API/Panel5',
          title: '<Panel5 />',
          description: 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.',
          source: '@site/docs/API/Panel5.mdx',
          sourceDirName: 'API',
          slug: '/API/Panel5',
          permalink: '/reanimated-color-picker/docs/API/Panel5',
          draft: !1,
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
        m = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>selectionStyle</code>', id: 'selectionstyle', level: 3 },
        ],
        s = { toc: m };
      function I(e) {
        let { components: t, ...a } = e;
        return (0, o.kt)(
          'wrapper',
          (0, r.Z)({}, s, a, { components: t, mdxType: 'MDXLayout' }),
          (0, o.kt)('h1', { id: 'panel5-' }, (0, o.kt)('inlineCode', { parentName: 'h1' }, '<Panel5 />')),
          (0, o.kt)('p', null, (0, o.kt)('img', { alt: 'panel5', src: n(822).Z, width: '240', height: '200' })),
          (0, o.kt)(
            'ul',
            null,
            (0, o.kt)('li', { parentName: 'ul' }, 'This is a grid of 120 colors, arranged in 12 columns and 10 rows of squares.')
          ),
          (0, o.kt)(
            'admonition',
            { type: 'danger' },
            (0, o.kt)(
              'p',
              { parentName: 'admonition' },
              'This panel is limited to displaying only a fixed range of colors, and therefore cannot show all colors.'
            )
          ),
          (0, o.kt)('h2', { id: 'props' }, 'Props'),
          (0, o.kt)('h3', { id: 'style' }, (0, o.kt)('inlineCode', { parentName: 'h3' }, 'style')),
          (0, o.kt)(
            'ul',
            null,
            (0, o.kt)('li', { parentName: 'ul' }, "Panel's container style."),
            (0, o.kt)('li', { parentName: 'ul' }, (0, o.kt)('inlineCode', { parentName: 'li' }, 'type: ViewStyle'))
          ),
          (0, o.kt)('h3', { id: 'selectionstyle' }, (0, o.kt)('inlineCode', { parentName: 'h3' }, 'selectionStyle')),
          (0, o.kt)(
            'ul',
            null,
            (0, o.kt)('li', { parentName: 'ul' }, 'The style of the square that indicates the selected color.'),
            (0, o.kt)('li', { parentName: 'ul' }, (0, o.kt)('inlineCode', { parentName: 'li' }, 'type: ViewStyle'))
          ),
          (0, o.kt)(
            'admonition',
            { title: 'note', type: 'info' },
            (0, o.kt)(
              'ul',
              { parentName: 'admonition' },
              (0, o.kt)('li', { parentName: 'ul' }, 'Certain style properties will be overridden.')
            )
          )
        );
      }
      I.isMDXComponent = !0;
    },
    822: (e, t, n) => {
      n.d(t, { Z: () => r });
      const r =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADICAYAAADWfGxSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASKSURBVHgB7dzLapwFGMbxdw5NJjM0R5MekiYxtLUUBHEhFnHRvRtv2BsoxYU7EQVpa2tSKB6nNpnPjZfwLvrg73cBH3Pg/727Z7QaVkM1en3xujqdn59Xp4uLi+r0vn++/9v3fd8/39OnT6vTuIBYAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZg0/HnX1Wn0Yvr1Wn75bPqdGfU+87aHP1YnU7rRXVa7bdOntXqRrVazavVyd1qNducVqffF1vVyQWGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYNM6OKxWy4PqtPH6XXW6MVmvTtuTi+r00eh5dVr2TpTV0L2JtVmt9u/13qSNN2vV6dV4UZ1cYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2HX34sDoNf96uTrvfX1ano8W16nRz/Kw6fVq9lvvV6vK4Wl3tjarT8Wer6rT5alqdfpr2jpS5wBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBsOhzfq1Yvz6rTYue8Ot1an1enk8l31enj6rXcq1ZvD3s3rFa9E2p195NqNTzfqE5PljaxgP8IGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIJNa/9utVr0bmwdzH6oTsez3k2s08lmdbqzt1+tbvVuitWDanV1NFSn8dbj6nRQf1Wn7V97N7ZcYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2Hd3v3cR69KJa7Xz7qDrdn82q04PJN9VpOPuiWh0tq9XG39VpPO3dxBpdPqxOi8k/1en0Zu/zXGAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAINv16q1qdnfa+E3ZPdqvT/mxUnWa3ezfFRoe9m13DrXfVaq9306k2q9f4TnVam/T+fofzy+rkAkMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUOw6ePr1eqDk2o1/7J3w2prrVqt7Z5Vq52d6jTa7t1gGnavqtOwqFajce/vt35tVZ2OFr3Pc4EhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAh2OjJm2GoRuu/tT6u1n6pVjd6J7ZqvvFzdVpbX1arWe8G0zDvfV5d6/1DhvmsOr0der/vyz/eVicXGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIIJGIL9C+bjhZjLoiutAAAAAElFTkSuQmCC';
    },
  },
]);
