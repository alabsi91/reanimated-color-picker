'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [639],
  {
    3905: (e, a, t) => {
      t.d(a, { Zo: () => s, kt: () => h });
      var n = t(7294);
      function l(e, a, t) {
        return a in e ? Object.defineProperty(e, a, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : (e[a] = t), e;
      }
      function r(e, a) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          a &&
            (n = n.filter(function (a) {
              return Object.getOwnPropertyDescriptor(e, a).enumerable;
            })),
            t.push.apply(t, n);
        }
        return t;
      }
      function o(e) {
        for (var a = 1; a < arguments.length; a++) {
          var t = null != arguments[a] ? arguments[a] : {};
          a % 2
            ? r(Object(t), !0).forEach(function (a) {
                l(e, a, t[a]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : r(Object(t)).forEach(function (a) {
                Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(t, a));
              });
        }
        return e;
      }
      function i(e, a) {
        if (null == e) return {};
        var t,
          n,
          l = (function (e, a) {
            if (null == e) return {};
            var t,
              n,
              l = {},
              r = Object.keys(e);
            for (n = 0; n < r.length; n++) (t = r[n]), a.indexOf(t) >= 0 || (l[t] = e[t]);
            return l;
          })(e, a);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (n = 0; n < r.length; n++)
            (t = r[n]), a.indexOf(t) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, t) && (l[t] = e[t]));
        }
        return l;
      }
      var c = n.createContext({}),
        d = function (e) {
          var a = n.useContext(c),
            t = a;
          return e && (t = 'function' == typeof e ? e(a) : o(o({}, a), e)), t;
        },
        s = function (e) {
          var a = d(e.components);
          return n.createElement(c.Provider, { value: a }, e.children);
        },
        p = 'mdxType',
        u = {
          inlineCode: 'code',
          wrapper: function (e) {
            var a = e.children;
            return n.createElement(n.Fragment, {}, a);
          },
        },
        m = n.forwardRef(function (e, a) {
          var t = e.components,
            l = e.mdxType,
            r = e.originalType,
            c = e.parentName,
            s = i(e, ['components', 'mdxType', 'originalType', 'parentName']),
            p = d(t),
            m = l,
            h = p[''.concat(c, '.').concat(m)] || p[m] || u[m] || r;
          return t ? n.createElement(h, o(o({ ref: a }, s), {}, { components: t })) : n.createElement(h, o({ ref: a }, s));
        });
      function h(e, a) {
        var t = arguments,
          l = a && a.mdxType;
        if ('string' == typeof e || l) {
          var r = t.length,
            o = new Array(r);
          o[0] = m;
          var i = {};
          for (var c in a) hasOwnProperty.call(a, c) && (i[c] = a[c]);
          (i.originalType = e), (i[p] = 'string' == typeof e ? e : l), (o[1] = i);
          for (var d = 2; d < r; d++) o[d] = t[d];
          return n.createElement.apply(null, o);
        }
        return n.createElement.apply(null, t);
      }
      m.displayName = 'MDXCreateElement';
    },
    8362: (e, a, t) => {
      t.r(a),
        t.d(a, {
          assets: () => c,
          contentTitle: () => o,
          default: () => p,
          frontMatter: () => r,
          metadata: () => i,
          toc: () => d,
        });
      var n = t(7462),
        l = (t(7294), t(3905));
      const r = { sidebar_position: 6 },
        o = void 0,
        i = {
          unversionedId: 'ColorKit',
          id: 'ColorKit',
          title: 'ColorKit',
          description: 'colorKit is a collection of color tools that are utilized internally within the ColorPicker.',
          source: '@site/docs/ColorKit.mdx',
          sourceDirName: '.',
          slug: '/ColorKit',
          permalink: '/reanimated-color-picker/docs/ColorKit',
          draft: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 6,
          frontMatter: { sidebar_position: 6 },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Swatches', permalink: '/reanimated-color-picker/docs/API/Swatches' },
          next: { title: 'Examples', permalink: '/reanimated-color-picker/docs/Examples' },
        },
        c = {},
        d = [
          { value: 'Supported Colors', id: 'supported-colors', level: 2 },
          { value: 'RBG', id: 'rbg', level: 4 },
          { value: 'HEX', id: 'hex', level: 4 },
          { value: 'HSL', id: 'hsl', level: 4 },
          { value: 'HSV', id: 'hsv', level: 4 },
          { value: 'HWB', id: 'hwb', level: 4 },
          { value: 'Color ints', id: 'color-ints', level: 4 },
          { value: 'Color keywords', id: 'color-keywords', level: 4 },
          { value: 'Color Conversion', id: 'color-conversion', level: 2 },
          { value: 'RGB', id: 'rgb', level: 3 },
          { value: 'HEX', id: 'hex-1', level: 3 },
          { value: 'HSL', id: 'hsl-1', level: 3 },
          { value: 'HSV', id: 'hsv-1', level: 3 },
          { value: 'HWB', id: 'hwb-1', level: 3 },
          { value: 'Color Information', id: 'color-information', level: 2 },
          { value: '<code>getFormat</code>', id: 'getformat', level: 3 },
          { value: '<code>getRed</code>', id: 'getred', level: 3 },
          { value: '<code>getGreen</code>', id: 'getgreen', level: 3 },
          { value: '<code>getBlue</code>', id: 'getblue', level: 3 },
          { value: '<code>getHue</code>', id: 'gethue', level: 3 },
          { value: '<code>getLuminance</code>', id: 'getluminance', level: 3 },
          { value: '<code>getBrightness</code>', id: 'getbrightness', level: 3 },
          { value: '<code>getAlpha</code>', id: 'getalpha', level: 3 },
          { value: '<code>getLuminanceWCAG</code>', id: 'getluminancewcag', level: 3 },
          { value: '<code>areColorsEqual</code>', id: 'arecolorsequal', level: 3 },
          { value: '<code>contrastRatio</code>', id: 'contrastratio', level: 3 },
          { value: '<code>isDark</code>', id: 'isdark', level: 3 },
          { value: '<code>isLight</code>', id: 'islight', level: 3 },
          { value: 'Color Manipulation', id: 'color-manipulation', level: 2 },
          { value: '<code>setRed</code>', id: 'setred', level: 3 },
          { value: '<code>increaseRed</code>', id: 'increasered', level: 3 },
          { value: '<code>decreaseRed</code>', id: 'decreasered', level: 3 },
          { value: '<code>setGreen</code>', id: 'setgreen', level: 3 },
          { value: '<code>increaseGreen</code>', id: 'increasegreen', level: 3 },
          { value: '<code>decreaseGreen</code>', id: 'decreasegreen', level: 3 },
          { value: '<code>setBlue</code>', id: 'setblue', level: 3 },
          { value: '<code>increaseBlue</code>', id: 'increaseblue', level: 3 },
          { value: '<code>decreaseBlue</code>', id: 'decreaseblue', level: 3 },
          { value: '<code>setHue</code>', id: 'sethue', level: 3 },
          { value: '<code>increaseHue</code>', id: 'increasehue', level: 3 },
          { value: '<code>decreaseHue</code>', id: 'decreasehue', level: 3 },
          { value: '<code>spin</code>', id: 'spin', level: 3 },
          { value: '<code>setSaturation</code>', id: 'setsaturation', level: 3 },
          { value: '<code>saturate</code>', id: 'saturate', level: 3 },
          { value: '<code>desaturate</code>', id: 'desaturate', level: 3 },
          { value: '<code>setLuminance</code>', id: 'setluminance', level: 3 },
          { value: '<code>brighten</code>', id: 'brighten', level: 3 },
          { value: '<code>darken</code>', id: 'darken', level: 3 },
          { value: '<code>setBrightness</code>', id: 'setbrightness', level: 3 },
          { value: '<code>increaseBrightness</code>', id: 'increasebrightness', level: 3 },
          { value: '<code>decreaseBrightness</code>', id: 'decreasebrightness', level: 3 },
          { value: '<code>setAlpha</code>', id: 'setalpha', level: 3 },
          { value: '<code>increaseAlpha</code>', id: 'increasealpha', level: 3 },
          { value: '<code>decreaseAlpha</code>', id: 'decreasealpha', level: 3 },
          { value: 'Color Utilities', id: 'color-utilities', level: 2 },
          { value: '<code>blend</code>', id: 'blend', level: 3 },
          { value: '<code>invert</code>', id: 'invert', level: 3 },
          { value: '<code>grayscale</code>', id: 'grayscale', level: 3 },
          { value: '<code>adjustContrast</code>', id: 'adjustcontrast', level: 3 },
          { value: '<code>randomHslColor</code>', id: 'randomhslcolor', level: 3 },
          { value: '<code>randomHsvColor</code>', id: 'randomhsvcolor', level: 3 },
          { value: '<code>randomRgbColor</code>', id: 'randomrgbcolor', level: 3 },
          { value: '<code>randomHwbColor</code>', id: 'randomhwbcolor', level: 3 },
        ],
        s = { toc: d };
      function p(e) {
        let { components: a, ...t } = e;
        return (0, l.kt)(
          'wrapper',
          (0, n.Z)({}, s, t, { components: a, mdxType: 'MDXLayout' }),
          (0, l.kt)(
            'p',
            null,
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'colorKit'),
            ' is a collection of color tools that are utilized internally within the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'ColorPicker'),
            '.'
          ),
          (0, l.kt)('h2', { id: 'supported-colors' }, 'Supported Colors'),
          (0, l.kt)('h4', { id: 'rbg' }, 'RBG'),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'rgb(255, 0, 255)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'rgb(255 0 255)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'rgba(255, 0, 255, 1.0)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'rgba(255 0 255 / 1.0)'")),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{r: number, g: number, b: number, a: number}')
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{r: number, g: number, b: number}')
            )
          ),
          (0, l.kt)('h4', { id: 'hex' }, 'HEX'),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'#f0f'"), ' (#rgb)'),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'#ff00ff'"), ' (#rrggbb)'),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'#f0ff"), "' (#rgba)"),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'#ff00ff00'"), ' (#rrggbbaa)')
          ),
          (0, l.kt)('h4', { id: 'hsl' }, 'HSL'),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsl(360, 100%, 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsl(360deg, 100%, 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsl(360 100% 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsl(360deg 100% 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsla(360, 100%, 100%, 1.0)'")),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsla(360deg, 100%, 100%, 1.0)'")
            ),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsla(360 100% 100% / 1.0)'")),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsla(360deg 100% 100% / 1.0)'")
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{h: number, s: number, l: number}')
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{h: number, s: number, l: number, a: number}')
            )
          ),
          (0, l.kt)('h4', { id: 'hsv' }, 'HSV'),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsv(360, 100%, 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsv(360deg, 100%, 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsv(360 100% 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsv(360deg 100% 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsva(360, 100%, 100%, 1.0)'")),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsva(360deg, 100%, 100%, 1.0)'")
            ),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsva(360 100% 100% / 1.0)'")),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, "'hsva(360deg 100% 100% / 1.0)'")
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{h: number, s: number, v: number}')
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{h: number, s: number, v: number, a: number}')
            )
          ),
          (0, l.kt)('h4', { id: 'hwb' }, 'HWB'),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwb(360, 100%, 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwb(360deg, 100%, 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwb(360 100% 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwb(360deg 100% 100%)'")),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwba(360, 100%, 100%, 1.0)'")),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwba(360deg, 100%, 100%, 1.0)'")
            ),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwba(360 100% 100% / 1.0)'")),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, "'hwba(360deg 100% 100% / 1.0)'")
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{h: number, w: number, b: number}')
            ),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              (0, l.kt)('inlineCode', { parentName: 'li' }, '{h: number, w: number, b: number, a: number}')
            )
          ),
          (0, l.kt)('h4', { id: 'color-ints' }, 'Color ints'),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, '0xf0f'), ' (0xrgb)'),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, '0xff00ff'), ' (0xrrggbb)'),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, '0xf0ff'), ' (0xrgba)'),
            (0, l.kt)('li', { parentName: 'ul' }, (0, l.kt)('inlineCode', { parentName: 'li' }, '0xff00ff00'), ' (0xrrggbbaa)')
          ),
          (0, l.kt)('h4', { id: 'color-keywords' }, 'Color keywords'),
          (0, l.kt)(
            'p',
            null,
            'Named colors implementation follows the ',
            (0, l.kt)('a', { parentName: 'p', href: 'https://www.w3.org/TR/css-color-3/#svg-color' }, 'CSS3/SVG specification'),
            '.'
          ),
          (0, l.kt)(
            'ul',
            null,
            (0, l.kt)('li', { parentName: 'ul' }, 'aliceblue (', (0, l.kt)('inlineCode', { parentName: 'li' }, '#f0f8ff'), ')'),
            (0, l.kt)(
              'li',
              { parentName: 'ul' },
              'antiquewhite (',
              (0, l.kt)('inlineCode', { parentName: 'li' }, '#faebd7'),
              ')'
            ),
            (0, l.kt)('li', { parentName: 'ul' }, 'aqua (', (0, l.kt)('inlineCode', { parentName: 'li' }, '#00ffff'), ')'),
            (0, l.kt)('li', { parentName: 'ul' }, 'aquamarine (', (0, l.kt)('inlineCode', { parentName: 'li' }, '#7fffd4'), ')'),
            (0, l.kt)('li', { parentName: 'ul' }, 'azure (', (0, l.kt)('inlineCode', { parentName: 'li' }, '#f0ffff'), ')'),
            (0, l.kt)('li', { parentName: 'ul' }, 'and more ...')
          ),
          (0, l.kt)('h2', { id: 'color-conversion' }, 'Color Conversion'),
          (0, l.kt)('h3', { id: 'rgb' }, 'RGB'),
          (0, l.kt)(
            'p',
            null,
            'Convert any of the ',
            (0, l.kt)('a', { parentName: 'p', href: '#supported-colors' }, 'supported color'),
            ' formats into the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'RGB'),
            ' format.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.RGB('hsl(360, 100%, 100%)').string(); // rgb(255, 255, 255)\ncolorKit.RGB('hsl(360, 100%, 100%)').string(true); // rgba(255, 255, 255, 1) force rbga\ncolorKit.RGB('#f0ff').object(); // { r: 255, g: 0, b: 255, a: 1 }\ncolorKit.RGB({ h: 360, s: 100, v: 50 }).array(); // [128, 0, 0, 1]\n"
            )
          ),
          (0, l.kt)('h3', { id: 'hex-1' }, 'HEX'),
          (0, l.kt)(
            'p',
            null,
            'Convert any of the ',
            (0, l.kt)('a', { parentName: 'p', href: '#supported-colors' }, 'supported color'),
            ' formats into the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'HEX'),
            ' format.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HEX('red'); //  #ff0000\ncolorKit.HEX('hsv(360, 10%, 100%)'); // #ffe6e6\ncolorKit.HEX('rgba(25, 255, 255, 1)'); // #19ffff\ncolorKit.HEX({ h: 360, s: 100, l: 50 }); // #ff0000\n"
            )
          ),
          (0, l.kt)('h3', { id: 'hsl-1' }, 'HSL'),
          (0, l.kt)(
            'p',
            null,
            'Convert any of the ',
            (0, l.kt)('a', { parentName: 'p', href: '#supported-colors' }, 'supported color'),
            ' formats into the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'HSL'),
            ' format.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HSL('orange').string(); // hsl(39, 100%, 50%)\ncolorKit.HSL('#503e7a').string(true); // hsla(258, 33%, 36%, 1)\ncolorKit.HSL('rgb(114, 99, 29)').object(); // { h: 49, s: 59, l: 28, a: 1 }\ncolorKit.HSL({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 28, 22, 1]\n"
            )
          ),
          (0, l.kt)('h3', { id: 'hsv-1' }, 'HSV'),
          (0, l.kt)(
            'p',
            null,
            'Convert any of the ',
            (0, l.kt)('a', { parentName: 'p', href: '#supported-colors' }, 'supported color'),
            ' formats into the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'HSV'),
            ' format.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HSV('orange').string(true); // hsva(258, 49%, 48%, 1)\ncolorKit.HSV('#503e7a').string(); // hsv(258, 49%, 48%)\ncolorKit.HSV('rgb(114, 99, 29)').object(); // { h: 49, s: 75, l: 45, a: 1 }\ncolorKit.HSV({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 44, 28, 1]\n"
            )
          ),
          (0, l.kt)('h3', { id: 'hwb-1' }, 'HWB'),
          (0, l.kt)(
            'p',
            null,
            'Convert any of the ',
            (0, l.kt)('a', { parentName: 'p', href: '#supported-colors' }, 'supported color'),
            ' formats into the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'HWB'),
            ' format.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HWB('orange').string(); // hwb(39, 0%, 0%)\ncolorKit.HWB('#503e7a').string(true); // hwba(258, 24%, 52%, 1)\ncolorKit.HWB('rgb(114, 99, 29)').object(); // { h: 49, w: 12, l: 55, a: 1 }\ncolorKit.HWB({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 16, 72, 1]\n"
            )
          ),
          (0, l.kt)('h2', { id: 'color-information' }, 'Color Information'),
          (0, l.kt)('h3', { id: 'getformat' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getFormat')),
          (0, l.kt)(
            'p',
            null,
            'Identify the color format of a given ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'string'),
            ' or ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'object'),
            ', and return ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'null'),
            ' for invalid colors.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.getFormat('orange'); // named\n\ncolorKit.getFormat('rgb(211, 168, 151)'); // rgb\ncolorKit.getFormat('rgba(211, 168, 151, 1)'); // rgba\ncolorKit.getFormat({ r: 211, g: 168, b: 151 }); // rgb\ncolorKit.getFormat({ r: 211, g: 168, b: 151, a: 1 }); // rgba\n\ncolorKit.getFormat('hsl(224, 77%, 28%)'); // hsl\ncolorKit.getFormat('hsla(224, 77%, 28%, 1)'); // hsla\ncolorKit.getFormat({ h: 224, s: 77, l: 28 }); // hsl\ncolorKit.getFormat({ h: 224, s: 77, l: 28, a: 1 }); // hsla\n\ncolorKit.getFormat('hsva(289, 99%, 40%, 1)'); // hsv\ncolorKit.getFormat('hsv(289, 99%, 40%)'); // hsva\ncolorKit.getFormat({ h: 289, s: 99, v: 40 }); // hsv\ncolorKit.getFormat({ h: 289, s: 99, v: 40, a: 1 }); // hsva\n\ncolorKit.getFormat('hwba(289, 99%, 40%, 1)'); // hwb\ncolorKit.getFormat('hwb(289, 99%, 40%)'); // hwba\ncolorKit.getFormat({ h: 289, w: 99, b: 40 }); // hwb\ncolorKit.getFormat({ h: 289, w: 99, b: 40, a: 1 }); // hwba\n\ncolorKit.getFormat('#fff'); // hex3\ncolorKit.getFormat('#ffff'); // hex4\ncolorKit.getFormat('#ffffffff'); // hex8\n\ncolorKit.getFormat('rgb(211, 168, 151, 1)'); // null (should be 'rgba(211, 168, 151, 1)')\n"
            )
          ),
          (0, l.kt)('h3', { id: 'getred' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getRed')),
          (0, l.kt)(
            'p',
            null,
            'Get the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'red'),
            ' channel value of a given color.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)('code', { parentName: 'pre', className: 'language-js' }, "colorKit.getRed('red'); // 255\n")
          ),
          (0, l.kt)('h3', { id: 'getgreen' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getGreen')),
          (0, l.kt)(
            'p',
            null,
            'Get the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'green'),
            ' channel value of a given color.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)('code', { parentName: 'pre', className: 'language-js' }, "colorKit.getGreen('rgb(0, 200, 0)'); // 200\n")
          ),
          (0, l.kt)('h3', { id: 'getblue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getBlue')),
          (0, l.kt)(
            'p',
            null,
            'Get the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'green'),
            ' channel value of a given color.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)('code', { parentName: 'pre', className: 'language-js' }, "colorKit.getBlue('hsl(200, 60%, 50%)'); // 204\n")
          ),
          (0, l.kt)('h3', { id: 'gethue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getHue')),
          (0, l.kt)(
            'p',
            null,
            'Get the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'hue'),
            ' channel value of a given color.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)('code', { parentName: 'pre', className: 'language-js' }, "colorKit.getHue('#87c270'); // 103\n")
          ),
          (0, l.kt)('h3', { id: 'getluminance' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getLuminance')),
          (0, l.kt)('p', null, "Get color's HSL ", (0, l.kt)('inlineCode', { parentName: 'p' }, 'luminosity'), ' channel value.'),
          (0, l.kt)(
            'p',
            null,
            'If you want the overall ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'luminosity'),
            ' of a color use ',
            (0, l.kt)(
              'a',
              { parentName: 'p', href: '#getluminancewcag' },
              (0, l.kt)('inlineCode', { parentName: 'a' }, 'getLuminanceWCAG')
            ),
            ' method.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              'colorKit.getLuminance({ r: 67, g: 59, b: 79, a: 1 }); // 27\n'
            )
          ),
          (0, l.kt)('h3', { id: 'getbrightness' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getBrightness')),
          (0, l.kt)(
            'p',
            null,
            "Get the HSV's ",
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'value'),
            ' (brightness) channel value of a given color.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              'colorKit.getBrightness({ h: 127, s: 36, l: 8, a: 1 }); // 11\n'
            )
          ),
          (0, l.kt)('h3', { id: 'getalpha' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getAlpha')),
          (0, l.kt)(
            'p',
            null,
            'Get the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'alpha'),
            ' channel value of a given color.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)('code', { parentName: 'pre', className: 'language-js' }, "colorKit.getAlpha('#d2c765c7'); // 0.78\n")
          ),
          (0, l.kt)('h3', { id: 'getluminancewcag' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'getLuminanceWCAG')),
          (0, l.kt)(
            'p',
            null,
            'Returns the perceived ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'luminance'),
            ' of the given color, from ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, '0-1'),
            ' as defined by ',
            (0, l.kt)(
              'a',
              { parentName: 'p', href: 'https://www.w3.org/TR/WCAG20/' },
              'Web Content Accessibility Guidelines (Version 2.0)'
            ),
            '.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.getLuminanceWCAG('rgba(176, 7, 120, 1)'); // 0.10738130030129947\n"
            )
          ),
          (0, l.kt)('h3', { id: 'arecolorsequal' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'areColorsEqual')),
          (0, l.kt)('p', null, 'Check if two colors are similar within a specified tolerance.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "const tolerance = 0;\nconst isEqual = colorKit.areColorsEqual('#F00', 'red', tolerance); // true\n"
            )
          ),
          (0, l.kt)('h3', { id: 'contrastratio' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'contrastRatio')),
          (0, l.kt)(
            'p',
            null,
            'Calculates the contrast ratio between two colors, useful for ensuring accessibility and readability.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.contrastRatio('yellow', 'rgba(40, 38, 43, 1)'); // 13.95\n"
            )
          ),
          (0, l.kt)('h3', { id: 'isdark' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'isDark')),
          (0, l.kt)('p', null, 'Returns a boolean indicating whether the color is considered "dark" or not.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.isDark('hsla(224, 77%, 28%, 1)'); // true\n"
            )
          ),
          (0, l.kt)('h3', { id: 'islight' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'isLight')),
          (0, l.kt)('p', null, 'Returns a boolean indicating whether the color is considered "light" or not.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.isLight('hsla(224, 77%, 28%, 1)'); // false\n"
            )
          ),
          (0, l.kt)('h2', { id: 'color-manipulation' }, 'Color Manipulation'),
          (0, l.kt)('h3', { id: 'setred' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setRed')),
          (0, l.kt)(
            'p',
            null,
            'Set the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'red'),
            ' value of a color to a specific amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.setRed('#a5a2a1', 150).hex(); // #c8a2a1\ncolorKit.setRed('#a5a2a1', 200).rgb().string(); // rgb(200, 162, 161)\ncolorKit.setRed('#a5a2a1', 200).rgb().object(); // { r: 200, g: 162, b: 161, a: 1 }\ncolorKit.setRed('#a5a2a1', 200).rgb().array(); // [200, 162, 161, 1]\ncolorKit.setRed('#a5a2a1', 200).hsl().string(); // hsl(2, 26%, 71%)\ncolorKit.setRed('#a5a2a1', 200).hsl().object(); // { h: 2, s: 26, l: 71, a: 1 }\ncolorKit.setRed('#a5a2a1', 200).hsl().array(); // [2, 26, 71, 1]\ncolorKit.setRed('#a5a2a1', 200).hsv().string(); // hsv(2, 20%, 78%)\ncolorKit.setRed('#a5a2a1', 200).hsv().object(); // { h: 2, s: 20, l: 78, a: 1 }\ncolorKit.setRed('#a5a2a1', 200).hsv().array(); // [2, 20, 78, 1]\n"
            )
          ),
          (0, l.kt)('h3', { id: 'increasered' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'increaseRed')),
          (0, l.kt)(
            'p',
            null,
            'Increase the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'red'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.increaseRed('#bb661b', 50).hex(); // #ed661b\ncolorKit.increaseRed('#bb661b', '50%').hex(); // #ff661b\n"
            )
          ),
          (0, l.kt)('h3', { id: 'decreasered' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'decreaseRed')),
          (0, l.kt)(
            'p',
            null,
            'Decrease the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'red'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.decreaseRed('#bb661b', 50).hex(); // #89661b\ncolorKit.decreaseRed('#bb661b', '50%').hex(); // #5e661b\n"
            )
          ),
          (0, l.kt)('h3', { id: 'setgreen' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setGreen')),
          (0, l.kt)(
            'p',
            null,
            'Set the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'green'),
            ' value of a color to a specific amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.setGreen('#d7e2d0', 50).hex(); // #d732d0\n"
            )
          ),
          (0, l.kt)('h3', { id: 'increasegreen' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'increaseGreen')),
          (0, l.kt)(
            'p',
            null,
            'Increase the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'green'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.increaseGreen('#d7e2d0', 50).hex(); // #d7ffd0\ncolorKit.increaseGreen('#d7e2d0', '10%').hex(); // #d7f9d0\n"
            )
          ),
          (0, l.kt)('h3', { id: 'decreasegreen' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'decreaseGreen')),
          (0, l.kt)(
            'p',
            null,
            'Decrease the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'green'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.decreaseGreen('#d7e2d0', 50).hex(); // #d7b0d0\ncolorKit.decreaseGreen('#d7e2d0', '10%').hex(); // #d7cbd0\n"
            )
          ),
          (0, l.kt)('h3', { id: 'setblue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setBlue')),
          (0, l.kt)(
            'p',
            null,
            'Set the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'blue'),
            ' value of a color to a specific amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.setBlue('#5d8e92', 50).hex(); // #5d3292\n"
            )
          ),
          (0, l.kt)('h3', { id: 'increaseblue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'increaseBlue')),
          (0, l.kt)(
            'p',
            null,
            'Increase the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'blue'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.increaseBlue('#5d8e92', 50).hex(); // #5d8ec4\ncolorKit.increaseBlue('#5d8e92', '50%').hex(); // #5d8edb\n"
            )
          ),
          (0, l.kt)('h3', { id: 'decreaseblue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'decreaseBlue')),
          (0, l.kt)(
            'p',
            null,
            'Decrease the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'blue'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.decreaseBlue('#5d8e92', 50).hex(); // #5d8e60\ncolorKit.decreaseBlue('#5d8e92', '50%').hex(); // #5d8e49\n"
            )
          ),
          (0, l.kt)('h3', { id: 'sethue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setHue')),
          (0, l.kt)(
            'p',
            null,
            'Set the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'hue'),
            ' value of a color to a specific amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.setHue('#2c1a51', 50).hex(); // #51481a\n"
            )
          ),
          (0, l.kt)('h3', { id: 'increasehue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'increaseHue')),
          (0, l.kt)(
            'p',
            null,
            'Increase the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'Hue'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.increaseHue('#2c1a51', 50).hex(); // #511a48\ncolorKit.increaseHue('#2c1a51', '50%').hex(); // #511a1a\n"
            )
          ),
          (0, l.kt)('h3', { id: 'decreasehue' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'decreaseHue')),
          (0, l.kt)(
            'p',
            null,
            'Decrease the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'Hue'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.decreaseHue('#2c1a51', 50).hex(); // #1a3651\ncolorKit.decreaseHue('#2c1a51', '50%').hex(); // #1a5123\n"
            )
          ),
          (0, l.kt)('h3', { id: 'spin' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'spin')),
          (0, l.kt)(
            'p',
            null,
            'Spin the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'hue'),
            ' channel by a certain percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.spin('#2c1a51', 350).hex(); // #231a51\ncolorKit.spin('#2c1a51', '350%').hex(); // #40511a\n"
            )
          ),
          (0, l.kt)('h3', { id: 'setsaturation' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setSaturation')),
          (0, l.kt)(
            'p',
            null,
            'Set the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'saturation'),
            ' value of a color to a specific amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.setSaturation('#482e45', 100).hex(); // #750068\n"
            )
          ),
          (0, l.kt)('h3', { id: 'saturate' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'saturate')),
          (0, l.kt)(
            'p',
            null,
            'Increase the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'saturation'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.saturate('#482e45', 50).hex(); // #65105b\ncolorKit.saturate('#482e45', '50%').hex(); // #4e2749\n"
            )
          ),
          (0, l.kt)('h3', { id: 'desaturate' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'desaturate')),
          (0, l.kt)(
            'p',
            null,
            'Decrease the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'saturation'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.desaturate('#482e45', 50).hex(); // #3b3b3b\ncolorKit.desaturate('#482e45', '50%').hex(); // #413440\n"
            )
          ),
          (0, l.kt)('h3', { id: 'setluminance' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setLuminance')),
          (0, l.kt)(
            'p',
            null,
            "Set HSL's ",
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'luminosity'),
            ' channel for a given color to a specific amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.setLuminance('#dadafc', 50).hex(); // #1313ec\n"
            )
          ),
          (0, l.kt)('h3', { id: 'brighten' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'brighten')),
          (0, l.kt)(
            'p',
            null,
            'Increase the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'brightness'),
            ' of the given color by a certain percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.brighten('#dadafc', 50).hex(); // #ffffff\ncolorKit.brighten('#dadafc', '5%').hex(); // #f1f1fe\n"
            )
          ),
          (0, l.kt)('h3', { id: 'darken' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'darken')),
          (0, l.kt)(
            'p',
            null,
            'Decrease the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'brightness'),
            ' of the given color by a certain percentage/amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.darken('#dadafc', 50).hex(); // #1010c6\ncolorKit.darken('#dadafc', '50%').hex(); // #1212d9\n"
            )
          ),
          (0, l.kt)('h3', { id: 'setbrightness' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setBrightness')),
          (0, l.kt)(
            'p',
            null,
            "Set HSV's ",
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'value'),
            ' (brightness) channel for a given color to a specific amount.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.setBrightness('#dadafc', 50).hex(); // #6f6f80\n"
            )
          ),
          (0, l.kt)('h3', { id: 'increasebrightness' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'increaseBrightness')),
          (0, l.kt)(
            'p',
            null,
            "Increase HSV's ",
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'value'),
            ' (brightness) channel value of a color by the given percentage/amount'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.increaseBrightness('#dadafc', 50).hex(); // #dedeff\ncolorKit.increaseBrightness('#dadafc', '5%').hex(); // #dedeff\n"
            )
          ),
          (0, l.kt)('h3', { id: 'decreasebrightness' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'decreaseBrightness')),
          (0, l.kt)(
            'p',
            null,
            "Decrease HSV's ",
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'value'),
            ' (brightness) channel value of a color by the given percentage/amount'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.decreaseBrightness('#dadafc', 50).hex(); // #6d6d7d\ncolorKit.decreaseBrightness('#dadafc', '50%').hex(); // #6f6f80\n"
            )
          ),
          (0, l.kt)('h3', { id: 'setalpha' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'setAlpha')),
          (0, l.kt)(
            'p',
            null,
            'Set the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'alpha'),
            ' value of a color to a specific amount.'
          ),
          (0, l.kt)('h3', { id: 'increasealpha' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'increaseAlpha')),
          (0, l.kt)(
            'p',
            null,
            'Increase the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'alpha'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)('h3', { id: 'decreasealpha' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'decreaseAlpha')),
          (0, l.kt)(
            'p',
            null,
            'Decrease the ',
            (0, l.kt)('inlineCode', { parentName: 'p' }, 'alpha'),
            ' value of a color by the given percentage/amount.'
          ),
          (0, l.kt)('h2', { id: 'color-utilities' }, 'Color Utilities'),
          (0, l.kt)('h3', { id: 'blend' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'blend')),
          (0, l.kt)('p', null, 'Blends two colors by a certain amount.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.blend('red', 'yellow', 50).hex(); // #ff8000\n"
            )
          ),
          (0, l.kt)('h3', { id: 'invert' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'invert')),
          (0, l.kt)(
            'p',
            null,
            'Invert (negate) a color, black becomes white, white becomes black, blue becomes orange and so on.'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)('code', { parentName: 'pre', className: 'language-js' }, "colorKit.invert('#000').hex(); // #ffffff\n")
          ),
          (0, l.kt)('h3', { id: 'grayscale' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'grayscale')),
          (0, l.kt)('p', null, 'Completely desaturates a color into greyscale.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.grayscale('#172140').hex(); // #212121\n"
            )
          ),
          (0, l.kt)('h3', { id: 'adjustcontrast' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'adjustContrast')),
          (0, l.kt)(
            'p',
            null,
            'Returns the first color (text color) with the desired contrast ratio against the second color (background color).'
          ),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              "colorKit.adjustContrast('rgb(50, 50, 50)', '#fff', 4.5).hex(); // #777777\n"
            )
          ),
          (0, l.kt)('h3', { id: 'randomhslcolor' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'randomHslColor')),
          (0, l.kt)('p', null, 'Generate a random color from ', (0, l.kt)('inlineCode', { parentName: 'p' }, 'HSL'), ' values.'),
          (0, l.kt)('p', null, 'You can provide a range between two values for each channel.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              'colorKit.randomHslColor({ h: [0, 360], s: [0, 100], l: [0, 100], a: [1, 1] }).hex(); // #b07345\ncolorKit.randomHslColor().hex(); // #d0bfd6\n'
            )
          ),
          (0, l.kt)('h3', { id: 'randomhsvcolor' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'randomHsvColor')),
          (0, l.kt)('p', null, 'Generate a random color from ', (0, l.kt)('inlineCode', { parentName: 'p' }, 'HSV'), ' values.'),
          (0, l.kt)('p', null, 'You can provide a range between two values for each channel.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              'colorKit.randomHsvColor({ h: [0, 360], s: [0, 100], v: [0, 100], a: [1, 1] }).hex(); // #59078c\ncolorKit.randomHsvColor().hex(); // #2b553f\n'
            )
          ),
          (0, l.kt)('h3', { id: 'randomrgbcolor' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'randomRgbColor')),
          (0, l.kt)('p', null, 'Generate a random color from ', (0, l.kt)('inlineCode', { parentName: 'p' }, 'rgb'), ' values.'),
          (0, l.kt)('p', null, 'You can provide a range between two values for each channel.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              'colorKit.randomRgbColor({ r: [0, 360], g: [0, 100], b: [0, 100], a: [1, 1] }).hex(); // #ff0f0b\ncolorKit.randomRgbColor().hex(); // #b07345\n'
            )
          ),
          (0, l.kt)('h3', { id: 'randomhwbcolor' }, (0, l.kt)('inlineCode', { parentName: 'h3' }, 'randomHwbColor')),
          (0, l.kt)('p', null, 'Generate a random color from ', (0, l.kt)('inlineCode', { parentName: 'p' }, 'hwb'), ' values.'),
          (0, l.kt)('p', null, 'You can provide a range between two values for each channel.'),
          (0, l.kt)(
            'pre',
            null,
            (0, l.kt)(
              'code',
              { parentName: 'pre', className: 'language-js' },
              'colorKit.randomHwbColor({ h: [0, 360], w: [0, 100], b: [0, 100], a: [1, 1] }).hex(); // #ff0f0b\ncolorKit.randomHwbColor().hex(); // #b07345\n'
            )
          )
        );
      }
      p.isMDXComponent = !0;
    },
  },
]);
