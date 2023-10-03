'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [835],
  {
    3905: (e, t, i) => {
      i.d(t, { Zo: () => d, kt: () => k });
      var n = i(7294);
      function r(e, t, i) {
        return t in e ? Object.defineProperty(e, t, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = i), e;
      }
      function a(e, t) {
        var i = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            i.push.apply(i, n);
        }
        return i;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(i), !0).forEach(function (t) {
                r(e, t, i[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
            : a(Object(i)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
              });
        }
        return e;
      }
      function o(e, t) {
        if (null == e) return {};
        var i,
          n,
          r = (function (e, t) {
            if (null == e) return {};
            var i,
              n,
              r = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++) (i = a[n]), t.indexOf(i) >= 0 || (r[i] = e[i]);
            return r;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (i = a[n]), t.indexOf(i) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, i) && (r[i] = e[i]));
        }
        return r;
      }
      var p = n.createContext({}),
        c = function (e) {
          var t = n.useContext(p),
            i = t;
          return e && (i = 'function' == typeof e ? e(t) : l(l({}, t), e)), i;
        },
        d = function (e) {
          var t = c(e.components);
          return n.createElement(p.Provider, { value: t }, e.children);
        },
        u = 'mdxType',
        s = {
          inlineCode: 'code',
          wrapper: function (e) {
            var t = e.children;
            return n.createElement(n.Fragment, {}, t);
          },
        },
        m = n.forwardRef(function (e, t) {
          var i = e.components,
            r = e.mdxType,
            a = e.originalType,
            p = e.parentName,
            d = o(e, ['components', 'mdxType', 'originalType', 'parentName']),
            u = c(i),
            m = r,
            k = u[''.concat(p, '.').concat(m)] || u[m] || s[m] || a;
          return i ? n.createElement(k, l(l({ ref: t }, d), {}, { components: i })) : n.createElement(k, l({ ref: t }, d));
        });
      function k(e, t) {
        var i = arguments,
          r = t && t.mdxType;
        if ('string' == typeof e || r) {
          var a = i.length,
            l = new Array(a);
          l[0] = m;
          var o = {};
          for (var p in t) hasOwnProperty.call(t, p) && (o[p] = t[p]);
          (o.originalType = e), (o[u] = 'string' == typeof e ? e : r), (l[1] = o);
          for (var c = 2; c < a; c++) l[c] = i[c];
          return n.createElement.apply(null, l);
        }
        return n.createElement.apply(null, i);
      }
      m.displayName = 'MDXCreateElement';
    },
    5071: (e, t, i) => {
      i.r(t),
        i.d(t, {
          assets: () => p,
          contentTitle: () => l,
          default: () => u,
          frontMatter: () => a,
          metadata: () => o,
          toc: () => c,
        });
      var n = i(7462),
        r = (i(7294), i(3905));
      const a = {
          sidebar_position: 15,
          sidebar_label: 'Preview',
          description: 'The preview of the selected and the initial color.',
        },
        l = '<Preview />',
        o = {
          unversionedId: 'API/Preview',
          id: 'API/Preview',
          title: '<Preview />',
          description: 'The preview of the selected and the initial color.',
          source: '@site/docs/API/Preview.md',
          sourceDirName: 'API',
          slug: '/API/Preview',
          permalink: '/reanimated-color-picker/docs/API/Preview',
          draft: !1,
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
        p = {},
        c = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>colorFormat</code>', id: 'colorformat', level: 3 },
          { value: '<code>hideInitialColor</code>', id: 'hideinitialcolor', level: 3 },
          { value: '<code>hideText</code>', id: 'hidetext', level: 3 },
          { value: '<code>disableOpacityTexture</code>', id: 'disableopacitytexture', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>textStyle</code>', id: 'textstyle', level: 3 },
        ],
        d = { toc: c };
      function u(e) {
        let { components: t, ...a } = e;
        return (0, r.kt)(
          'wrapper',
          (0, n.Z)({}, d, a, { components: t, mdxType: 'MDXLayout' }),
          (0, r.kt)('h1', { id: 'preview-' }, (0, r.kt)('inlineCode', { parentName: 'h1' }, '<Preview />')),
          (0, r.kt)('p', null, (0, r.kt)('img', { alt: 'preview', src: i(845).Z, width: '300', height: '50' })),
          (0, r.kt)('ul', null, (0, r.kt)('li', { parentName: 'ul' }, 'The preview of the selected and the initial color.')),
          (0, r.kt)(
            'admonition',
            { type: 'tip' },
            (0, r.kt)(
              'ul',
              { parentName: 'admonition' },
              (0, r.kt)(
                'li',
                { parentName: 'ul' },
                'If you want only the preview text, you can use the ',
                (0, r.kt)(
                  'a',
                  { parentName: 'li', href: './PreviewText' },
                  (0, r.kt)('inlineCode', { parentName: 'a' }, '<PreviewText />')
                ),
                ' component.'
              )
            )
          ),
          (0, r.kt)('h2', { id: 'props' }, 'Props'),
          (0, r.kt)('h3', { id: 'colorformat' }, (0, r.kt)('inlineCode', { parentName: 'h3' }, 'colorFormat')),
          (0, r.kt)(
            'ul',
            null,
            (0, r.kt)('li', { parentName: 'ul' }, "Preview color's format."),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'type: string')),
            (0, r.kt)(
              'li',
              { parentName: 'ul' },
              (0, r.kt)('inlineCode', { parentName: 'li' }, 'values:'),
              (0, r.kt)('formats', null)
            ),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, "default: 'hex'"))
          ),
          (0, r.kt)('h3', { id: 'hideinitialcolor' }, (0, r.kt)('inlineCode', { parentName: 'h3' }, 'hideInitialColor')),
          (0, r.kt)(
            'ul',
            null,
            (0, r.kt)('li', { parentName: 'ul' }, 'Hide the initial color preview part.'),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'type: boolean')),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'default: false'))
          ),
          (0, r.kt)('h3', { id: 'hidetext' }, (0, r.kt)('inlineCode', { parentName: 'h3' }, 'hideText')),
          (0, r.kt)(
            'ul',
            null,
            (0, r.kt)('li', { parentName: 'ul' }, 'Hide preview texts.'),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'type: boolean')),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'default: false'))
          ),
          (0, r.kt)(
            'h3',
            { id: 'disableopacitytexture' },
            (0, r.kt)('inlineCode', { parentName: 'h3' }, 'disableOpacityTexture')
          ),
          (0, r.kt)(
            'ul',
            null,
            (0, r.kt)(
              'li',
              { parentName: 'ul' },
              'Hide the preview background texture image that appears when the color has an opacity less than 1.'
            ),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'type: boolean')),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'default: false'))
          ),
          (0, r.kt)('h3', { id: 'style' }, (0, r.kt)('inlineCode', { parentName: 'h3' }, 'style')),
          (0, r.kt)(
            'ul',
            null,
            (0, r.kt)('li', { parentName: 'ul' }, 'Preview container style.'),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'type: ViewStyle'))
          ),
          (0, r.kt)(
            'admonition',
            { title: 'note', type: 'info' },
            (0, r.kt)(
              'ul',
              { parentName: 'admonition' },
              (0, r.kt)('li', { parentName: 'ul' }, 'Certain style properties will be overridden.')
            )
          ),
          (0, r.kt)('h3', { id: 'textstyle' }, (0, r.kt)('inlineCode', { parentName: 'h3' }, 'textStyle')),
          (0, r.kt)(
            'ul',
            null,
            (0, r.kt)('li', { parentName: 'ul' }, 'Preview texts style.'),
            (0, r.kt)('li', { parentName: 'ul' }, (0, r.kt)('inlineCode', { parentName: 'li' }, 'type: TextStyle'))
          )
        );
      }
      u.isMDXComponent = !0;
    },
    845: (e, t, i) => {
      i.d(t, { Z: () => n });
      const n =
        'data:image/png;base64,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';
    },
  },
]);
