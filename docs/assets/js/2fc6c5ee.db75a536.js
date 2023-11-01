'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [639],
  {
    7570: (e, r, n) => {
      n.r(r),
        n.d(r, {
          assets: () => i,
          contentTitle: () => s,
          default: () => t,
          frontMatter: () => o,
          metadata: () => d,
          toc: () => a,
        });
      var l = n(5893),
        c = n(1151);
      const o = { sidebar_position: 6 },
        s = void 0,
        d = {
          id: 'ColorKit',
          title: 'ColorKit',
          description: 'colorKit is a collection of color tools that are utilized internally within the ColorPicker.',
          source: '@site/docs/ColorKit.mdx',
          sourceDirName: '.',
          slug: '/ColorKit',
          permalink: '/reanimated-color-picker/docs/ColorKit',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 6,
          frontMatter: { sidebar_position: 6 },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Swatches', permalink: '/reanimated-color-picker/docs/API/Swatches' },
          next: { title: 'Examples', permalink: '/reanimated-color-picker/docs/Examples' },
        },
        i = {},
        a = [
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
        ];
      function h(e) {
        const r = {
          a: 'a',
          code: 'code',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          li: 'li',
          p: 'p',
          pre: 'pre',
          ul: 'ul',
          ...(0, c.a)(),
          ...e.components,
        };
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsxs)(r.p, {
              children: [
                (0, l.jsx)(r.code, { children: 'colorKit' }),
                ' is a collection of color tools that are utilized internally within the ',
                (0, l.jsx)(r.code, { children: 'ColorPicker' }),
                '.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h2, { id: 'supported-colors', children: 'Supported Colors' }),
            '\n',
            (0, l.jsx)(r.h4, { id: 'rbg', children: 'RBG' }),
            '\n',
            (0, l.jsxs)(r.ul, {
              children: [
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'rgb(255, 0, 255)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'rgb(255 0 255)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'rgba(255, 0, 255, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'rgba(255 0 255 / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{r: number, g: number, b: number, a: number}' }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{r: number, g: number, b: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h4, { id: 'hex', children: 'HEX' }),
            '\n',
            (0, l.jsxs)(r.ul, {
              children: [
                '\n',
                (0, l.jsxs)(r.li, { children: [(0, l.jsx)(r.code, { children: "'#f0f'" }), ' (#rgb)'] }),
                '\n',
                (0, l.jsxs)(r.li, { children: [(0, l.jsx)(r.code, { children: "'#ff00ff'" }), ' (#rrggbb)'] }),
                '\n',
                (0, l.jsxs)(r.li, { children: [(0, l.jsx)(r.code, { children: "'#f0ff" }), "' (#rgba)"] }),
                '\n',
                (0, l.jsxs)(r.li, { children: [(0, l.jsx)(r.code, { children: "'#ff00ff00'" }), ' (#rrggbbaa)'] }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h4, { id: 'hsl', children: 'HSL' }),
            '\n',
            (0, l.jsxs)(r.ul, {
              children: [
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsl(360, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsl(360deg, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsl(360 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsl(360deg 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsla(360, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsla(360deg, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsla(360 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsla(360deg 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{h: number, s: number, l: number}' }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{h: number, s: number, l: number, a: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h4, { id: 'hsv', children: 'HSV' }),
            '\n',
            (0, l.jsxs)(r.ul, {
              children: [
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsv(360, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsv(360deg, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsv(360 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsv(360deg 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsva(360, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsva(360deg, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsva(360 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hsva(360deg 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{h: number, s: number, v: number}' }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{h: number, s: number, v: number, a: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h4, { id: 'hwb', children: 'HWB' }),
            '\n',
            (0, l.jsxs)(r.ul, {
              children: [
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwb(360, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwb(360deg, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwb(360 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwb(360deg 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwba(360, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwba(360deg, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwba(360 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: "'hwba(360deg 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{h: number, w: number, b: number}' }) }),
                '\n',
                (0, l.jsx)(r.li, { children: (0, l.jsx)(r.code, { children: '{h: number, w: number, b: number, a: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h4, { id: 'color-ints', children: 'Color ints' }),
            '\n',
            (0, l.jsxs)(r.ul, {
              children: [
                '\n',
                (0, l.jsxs)(r.li, { children: [(0, l.jsx)(r.code, { children: '0xff00ffff' }), ' (0xrrggbbaa)'] }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h4, { id: 'color-keywords', children: 'Color keywords' }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Named colors implementation follows the ',
                (0, l.jsx)(r.a, { href: 'https://www.w3.org/TR/css-color-3/#svg-color', children: 'CSS3/SVG specification' }),
                '.',
              ],
            }),
            '\n',
            (0, l.jsxs)(r.ul, {
              children: [
                '\n',
                (0, l.jsxs)(r.li, { children: ['aliceblue (', (0, l.jsx)(r.code, { children: '#f0f8ff' }), ')'] }),
                '\n',
                (0, l.jsxs)(r.li, { children: ['antiquewhite (', (0, l.jsx)(r.code, { children: '#faebd7' }), ')'] }),
                '\n',
                (0, l.jsxs)(r.li, { children: ['aqua (', (0, l.jsx)(r.code, { children: '#00ffff' }), ')'] }),
                '\n',
                (0, l.jsxs)(r.li, { children: ['aquamarine (', (0, l.jsx)(r.code, { children: '#7fffd4' }), ')'] }),
                '\n',
                (0, l.jsxs)(r.li, { children: ['azure (', (0, l.jsx)(r.code, { children: '#f0ffff' }), ')'] }),
                '\n',
                (0, l.jsx)(r.li, { children: 'and more ...' }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h2, { id: 'color-conversion', children: 'Color Conversion' }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'rgb', children: 'RGB' }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(r.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(r.code, { children: 'RGB' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\r\n\r\ncolorKit.RGB('hsl(360, 100%, 100%)').string(); // rgb(255, 255, 255)\r\ncolorKit.RGB('hsl(360, 100%, 100%)').string(true); // rgba(255, 255, 255, 1) force rbga\r\ncolorKit.RGB('#f0ff').object(); // { r: 255, g: 0, b: 255, a: 1 }\r\ncolorKit.RGB({ h: 360, s: 100, v: 50 }).array(); // [128, 0, 0, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'hex-1', children: 'HEX' }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(r.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(r.code, { children: 'HEX' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\r\n\r\ncolorKit.HEX('red'); //  #ff0000\r\ncolorKit.HEX('hsv(360, 10%, 100%)'); // #ffe6e6\r\ncolorKit.HEX('rgba(25, 255, 255, 1)'); // #19ffff\r\ncolorKit.HEX({ h: 360, s: 100, l: 50 }); // #ff0000\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'hsl-1', children: 'HSL' }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(r.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(r.code, { children: 'HSL' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\r\n\r\ncolorKit.HSL('orange').string(); // hsl(39, 100%, 50%)\r\ncolorKit.HSL('#503e7a').string(true); // hsla(258, 33%, 36%, 1)\r\ncolorKit.HSL('rgb(114, 99, 29)').object(); // { h: 49, s: 59, l: 28, a: 1 }\r\ncolorKit.HSL({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 28, 22, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'hsv-1', children: 'HSV' }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(r.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(r.code, { children: 'HSV' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\r\n\r\ncolorKit.HSV('orange').string(true); // hsva(258, 49%, 48%, 1)\r\ncolorKit.HSV('#503e7a').string(); // hsv(258, 49%, 48%)\r\ncolorKit.HSV('rgb(114, 99, 29)').object(); // { h: 49, s: 75, l: 45, a: 1 }\r\ncolorKit.HSV({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 44, 28, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'hwb-1', children: 'HWB' }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(r.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(r.code, { children: 'HWB' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\r\n\r\ncolorKit.HWB('orange').string(); // hwb(39, 0%, 0%)\r\ncolorKit.HWB('#503e7a').string(true); // hwba(258, 24%, 52%, 1)\r\ncolorKit.HWB('rgb(114, 99, 29)').object(); // { h: 49, w: 12, l: 55, a: 1 }\r\ncolorKit.HWB({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 16, 72, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h2, { id: 'color-information', children: 'Color Information' }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getformat', children: (0, l.jsx)(r.code, { children: 'getFormat' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Identify the color format of a given ',
                (0, l.jsx)(r.code, { children: 'string' }),
                ' or ',
                (0, l.jsx)(r.code, { children: 'object' }),
                ', and return ',
                (0, l.jsx)(r.code, { children: 'null' }),
                ' for invalid colors.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.getFormat('orange'); // named\r\n\r\ncolorKit.getFormat('rgb(211, 168, 151)'); // rgb\r\ncolorKit.getFormat('rgba(211, 168, 151, 1)'); // rgba\r\ncolorKit.getFormat({ r: 211, g: 168, b: 151 }); // rgb\r\ncolorKit.getFormat({ r: 211, g: 168, b: 151, a: 1 }); // rgba\r\n\r\ncolorKit.getFormat('hsl(224, 77%, 28%)'); // hsl\r\ncolorKit.getFormat('hsla(224, 77%, 28%, 1)'); // hsla\r\ncolorKit.getFormat({ h: 224, s: 77, l: 28 }); // hsl\r\ncolorKit.getFormat({ h: 224, s: 77, l: 28, a: 1 }); // hsla\r\n\r\ncolorKit.getFormat('hsva(289, 99%, 40%, 1)'); // hsv\r\ncolorKit.getFormat('hsv(289, 99%, 40%)'); // hsva\r\ncolorKit.getFormat({ h: 289, s: 99, v: 40 }); // hsv\r\ncolorKit.getFormat({ h: 289, s: 99, v: 40, a: 1 }); // hsva\r\n\r\ncolorKit.getFormat('hwba(289, 99%, 40%, 1)'); // hwb\r\ncolorKit.getFormat('hwb(289, 99%, 40%)'); // hwba\r\ncolorKit.getFormat({ h: 289, w: 99, b: 40 }); // hwb\r\ncolorKit.getFormat({ h: 289, w: 99, b: 40, a: 1 }); // hwba\r\n\r\ncolorKit.getFormat('#fff'); // hex3\r\ncolorKit.getFormat('#ffff'); // hex4\r\ncolorKit.getFormat('#ffffffff'); // hex8\r\n\r\ncolorKit.getFormat('rgb(211, 168, 151, 1)'); // null (should be 'rgba(211, 168, 151, 1)')\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getred', children: (0, l.jsx)(r.code, { children: 'getRed' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Get the ', (0, l.jsx)(r.code, { children: 'red' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, { className: 'language-js', children: "colorKit.getRed('red'); // 255\n" }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getgreen', children: (0, l.jsx)(r.code, { children: 'getGreen' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Get the ', (0, l.jsx)(r.code, { children: 'green' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.getGreen('rgb(0, 200, 0)'); // 200\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getblue', children: (0, l.jsx)(r.code, { children: 'getBlue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Get the ', (0, l.jsx)(r.code, { children: 'green' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.getBlue('hsl(200, 60%, 50%)'); // 204\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'gethue', children: (0, l.jsx)(r.code, { children: 'getHue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Get the ', (0, l.jsx)(r.code, { children: 'hue' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, { className: 'language-js', children: "colorKit.getHue('#87c270'); // 103\n" }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getluminance', children: (0, l.jsx)(r.code, { children: 'getLuminance' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ["Get color's HSL ", (0, l.jsx)(r.code, { children: 'luminosity' }), ' channel value.'],
            }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'If you want the overall ',
                (0, l.jsx)(r.code, { children: 'luminosity' }),
                ' of a color use ',
                (0, l.jsx)(r.a, { href: '#getluminancewcag', children: (0, l.jsx)(r.code, { children: 'getLuminanceWCAG' }) }),
                ' method.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: 'colorKit.getLuminance({ r: 67, g: 59, b: 79, a: 1 }); // 27\n',
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getbrightness', children: (0, l.jsx)(r.code, { children: 'getBrightness' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                "Get the HSV's ",
                (0, l.jsx)(r.code, { children: 'value' }),
                ' (brightness) channel value of a given color.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: 'colorKit.getBrightness({ h: 127, s: 36, l: 8, a: 1 }); // 11\n',
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getalpha', children: (0, l.jsx)(r.code, { children: 'getAlpha' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Get the ', (0, l.jsx)(r.code, { children: 'alpha' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, { className: 'language-js', children: "colorKit.getAlpha('#d2c765c7'); // 0.78\n" }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'getluminancewcag', children: (0, l.jsx)(r.code, { children: 'getLuminanceWCAG' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Returns the perceived ',
                (0, l.jsx)(r.code, { children: 'luminance' }),
                ' of the given color, from ',
                (0, l.jsx)(r.code, { children: '0-1' }),
                ' as defined by ',
                (0, l.jsx)(r.a, {
                  href: 'https://www.w3.org/TR/WCAG20/',
                  children: 'Web Content Accessibility Guidelines (Version 2.0)',
                }),
                '.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.getLuminanceWCAG('rgba(176, 7, 120, 1)'); // 0.10738130030129947\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'arecolorsequal', children: (0, l.jsx)(r.code, { children: 'areColorsEqual' }) }),
            '\n',
            (0, l.jsx)(r.p, { children: 'Check if two colors are similar within a specified tolerance.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "const tolerance = 0;\r\nconst isEqual = colorKit.areColorsEqual('#F00', 'red', tolerance); // true\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'contrastratio', children: (0, l.jsx)(r.code, { children: 'contrastRatio' }) }),
            '\n',
            (0, l.jsx)(r.p, {
              children: 'Calculates the contrast ratio between two colors, useful for ensuring accessibility and readability.',
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.contrastRatio('yellow', 'rgba(40, 38, 43, 1)'); // 13.95\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'isdark', children: (0, l.jsx)(r.code, { children: 'isDark' }) }),
            '\n',
            (0, l.jsx)(r.p, { children: 'Returns a boolean indicating whether the color is considered "dark" or not.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.isDark('hsla(224, 77%, 28%, 1)'); // true\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'islight', children: (0, l.jsx)(r.code, { children: 'isLight' }) }),
            '\n',
            (0, l.jsx)(r.p, { children: 'Returns a boolean indicating whether the color is considered "light" or not.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.isLight('hsla(224, 77%, 28%, 1)'); // false\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h2, { id: 'color-manipulation', children: 'Color Manipulation' }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'setred', children: (0, l.jsx)(r.code, { children: 'setRed' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Set the ', (0, l.jsx)(r.code, { children: 'red' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.setRed('#a5a2a1', 150).hex(); // #c8a2a1\r\ncolorKit.setRed('#a5a2a1', 200).rgb().string(); // rgb(200, 162, 161)\r\ncolorKit.setRed('#a5a2a1', 200).rgb().object(); // { r: 200, g: 162, b: 161, a: 1 }\r\ncolorKit.setRed('#a5a2a1', 200).rgb().array(); // [200, 162, 161, 1]\r\ncolorKit.setRed('#a5a2a1', 200).hsl().string(); // hsl(2, 26%, 71%)\r\ncolorKit.setRed('#a5a2a1', 200).hsl().object(); // { h: 2, s: 26, l: 71, a: 1 }\r\ncolorKit.setRed('#a5a2a1', 200).hsl().array(); // [2, 26, 71, 1]\r\ncolorKit.setRed('#a5a2a1', 200).hsv().string(); // hsv(2, 20%, 78%)\r\ncolorKit.setRed('#a5a2a1', 200).hsv().object(); // { h: 2, s: 20, l: 78, a: 1 }\r\ncolorKit.setRed('#a5a2a1', 200).hsv().array(); // [2, 20, 78, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'increasered', children: (0, l.jsx)(r.code, { children: 'increaseRed' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(r.code, { children: 'red' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseRed('#bb661b', 50).hex(); // #ed661b\r\ncolorKit.increaseRed('#bb661b', '50%').hex(); // #ff661b\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'decreasered', children: (0, l.jsx)(r.code, { children: 'decreaseRed' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(r.code, { children: 'red' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseRed('#bb661b', 50).hex(); // #89661b\r\ncolorKit.decreaseRed('#bb661b', '50%').hex(); // #5e661b\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'setgreen', children: (0, l.jsx)(r.code, { children: 'setGreen' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Set the ', (0, l.jsx)(r.code, { children: 'green' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.setGreen('#d7e2d0', 50).hex(); // #d732d0\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'increasegreen', children: (0, l.jsx)(r.code, { children: 'increaseGreen' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(r.code, { children: 'green' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseGreen('#d7e2d0', 50).hex(); // #d7ffd0\r\ncolorKit.increaseGreen('#d7e2d0', '10%').hex(); // #d7f9d0\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'decreasegreen', children: (0, l.jsx)(r.code, { children: 'decreaseGreen' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(r.code, { children: 'green' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseGreen('#d7e2d0', 50).hex(); // #d7b0d0\r\ncolorKit.decreaseGreen('#d7e2d0', '10%').hex(); // #d7cbd0\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'setblue', children: (0, l.jsx)(r.code, { children: 'setBlue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Set the ', (0, l.jsx)(r.code, { children: 'blue' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.setBlue('#5d8e92', 50).hex(); // #5d3292\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'increaseblue', children: (0, l.jsx)(r.code, { children: 'increaseBlue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(r.code, { children: 'blue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseBlue('#5d8e92', 50).hex(); // #5d8ec4\r\ncolorKit.increaseBlue('#5d8e92', '50%').hex(); // #5d8edb\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'decreaseblue', children: (0, l.jsx)(r.code, { children: 'decreaseBlue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(r.code, { children: 'blue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseBlue('#5d8e92', 50).hex(); // #5d8e60\r\ncolorKit.decreaseBlue('#5d8e92', '50%').hex(); // #5d8e49\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'sethue', children: (0, l.jsx)(r.code, { children: 'setHue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Set the ', (0, l.jsx)(r.code, { children: 'hue' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.setHue('#2c1a51', 50).hex(); // #51481a\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'increasehue', children: (0, l.jsx)(r.code, { children: 'increaseHue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(r.code, { children: 'Hue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseHue('#2c1a51', 50).hex(); // #511a48\r\ncolorKit.increaseHue('#2c1a51', '50%').hex(); // #511a1a\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'decreasehue', children: (0, l.jsx)(r.code, { children: 'decreaseHue' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(r.code, { children: 'Hue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseHue('#2c1a51', 50).hex(); // #1a3651\r\ncolorKit.decreaseHue('#2c1a51', '50%').hex(); // #1a5123\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'spin', children: (0, l.jsx)(r.code, { children: 'spin' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Spin the ', (0, l.jsx)(r.code, { children: 'hue' }), ' channel by a certain percentage/amount.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.spin('#2c1a51', 350).hex(); // #231a51\r\ncolorKit.spin('#2c1a51', '350%').hex(); // #40511a\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'setsaturation', children: (0, l.jsx)(r.code, { children: 'setSaturation' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Set the ', (0, l.jsx)(r.code, { children: 'saturation' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.setSaturation('#482e45', 100).hex(); // #750068\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'saturate', children: (0, l.jsx)(r.code, { children: 'saturate' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(r.code, { children: 'saturation' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.saturate('#482e45', 50).hex(); // #65105b\r\ncolorKit.saturate('#482e45', '50%').hex(); // #4e2749\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'desaturate', children: (0, l.jsx)(r.code, { children: 'desaturate' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(r.code, { children: 'saturation' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.desaturate('#482e45', 50).hex(); // #3b3b3b\r\ncolorKit.desaturate('#482e45', '50%').hex(); // #413440\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'setluminance', children: (0, l.jsx)(r.code, { children: 'setLuminance' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                "Set HSL's ",
                (0, l.jsx)(r.code, { children: 'luminosity' }),
                ' channel for a given color to a specific amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.setLuminance('#dadafc', 50).hex(); // #1313ec\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'brighten', children: (0, l.jsx)(r.code, { children: 'brighten' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(r.code, { children: 'brightness' }),
                ' of the given color by a certain percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.brighten('#dadafc', 50).hex(); // #ffffff\r\ncolorKit.brighten('#dadafc', '5%').hex(); // #f1f1fe\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'darken', children: (0, l.jsx)(r.code, { children: 'darken' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(r.code, { children: 'brightness' }),
                ' of the given color by a certain percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.darken('#dadafc', 50).hex(); // #1010c6\r\ncolorKit.darken('#dadafc', '50%').hex(); // #1212d9\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'setbrightness', children: (0, l.jsx)(r.code, { children: 'setBrightness' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                "Set HSV's ",
                (0, l.jsx)(r.code, { children: 'value' }),
                ' (brightness) channel for a given color to a specific amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.setBrightness('#dadafc', 50).hex(); // #6f6f80\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'increasebrightness', children: (0, l.jsx)(r.code, { children: 'increaseBrightness' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                "Increase HSV's ",
                (0, l.jsx)(r.code, { children: 'value' }),
                ' (brightness) channel value of a color by the given percentage/amount',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseBrightness('#dadafc', 50).hex(); // #dedeff\r\ncolorKit.increaseBrightness('#dadafc', '5%').hex(); // #dedeff\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'decreasebrightness', children: (0, l.jsx)(r.code, { children: 'decreaseBrightness' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                "Decrease HSV's ",
                (0, l.jsx)(r.code, { children: 'value' }),
                ' (brightness) channel value of a color by the given percentage/amount',
              ],
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseBrightness('#dadafc', 50).hex(); // #6d6d7d\r\ncolorKit.decreaseBrightness('#dadafc', '50%').hex(); // #6f6f80\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'setalpha', children: (0, l.jsx)(r.code, { children: 'setAlpha' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Set the ', (0, l.jsx)(r.code, { children: 'alpha' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'increasealpha', children: (0, l.jsx)(r.code, { children: 'increaseAlpha' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(r.code, { children: 'alpha' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'decreasealpha', children: (0, l.jsx)(r.code, { children: 'decreaseAlpha' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(r.code, { children: 'alpha' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(r.h2, { id: 'color-utilities', children: 'Color Utilities' }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'blend', children: (0, l.jsx)(r.code, { children: 'blend' }) }),
            '\n',
            (0, l.jsx)(r.p, { children: 'Blends two colors by a certain amount.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.blend('red', 'yellow', 50).hex(); // #ff8000\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'invert', children: (0, l.jsx)(r.code, { children: 'invert' }) }),
            '\n',
            (0, l.jsx)(r.p, {
              children: 'Invert (negate) a color, black becomes white, white becomes black, blue becomes orange and so on.',
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, { className: 'language-js', children: "colorKit.invert('#000').hex(); // #ffffff\n" }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'grayscale', children: (0, l.jsx)(r.code, { children: 'grayscale' }) }),
            '\n',
            (0, l.jsx)(r.p, { children: 'Completely desaturates a color into greyscale.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.grayscale('#172140').hex(); // #212121\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'adjustcontrast', children: (0, l.jsx)(r.code, { children: 'adjustContrast' }) }),
            '\n',
            (0, l.jsx)(r.p, {
              children:
                'Returns the first color (text color) with the desired contrast ratio against the second color (background color).',
            }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children: "colorKit.adjustContrast('rgb(50, 50, 50)', '#fff', 4.5).hex(); // #777777\n",
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'randomhslcolor', children: (0, l.jsx)(r.code, { children: 'randomHslColor' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Generate a random color from ', (0, l.jsx)(r.code, { children: 'HSL' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(r.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  'colorKit.randomHslColor({ h: [0, 360], s: [0, 100], l: [0, 100], a: [1, 1] }).hex(); // #b07345\r\ncolorKit.randomHslColor().hex(); // #d0bfd6\n',
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'randomhsvcolor', children: (0, l.jsx)(r.code, { children: 'randomHsvColor' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Generate a random color from ', (0, l.jsx)(r.code, { children: 'HSV' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(r.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  'colorKit.randomHsvColor({ h: [0, 360], s: [0, 100], v: [0, 100], a: [1, 1] }).hex(); // #59078c\r\ncolorKit.randomHsvColor().hex(); // #2b553f\n',
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'randomrgbcolor', children: (0, l.jsx)(r.code, { children: 'randomRgbColor' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Generate a random color from ', (0, l.jsx)(r.code, { children: 'rgb' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(r.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  'colorKit.randomRgbColor({ r: [0, 360], g: [0, 100], b: [0, 100], a: [1, 1] }).hex(); // #ff0f0b\r\ncolorKit.randomRgbColor().hex(); // #b07345\n',
              }),
            }),
            '\n',
            (0, l.jsx)(r.h3, { id: 'randomhwbcolor', children: (0, l.jsx)(r.code, { children: 'randomHwbColor' }) }),
            '\n',
            (0, l.jsxs)(r.p, {
              children: ['Generate a random color from ', (0, l.jsx)(r.code, { children: 'hwb' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(r.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(r.pre, {
              children: (0, l.jsx)(r.code, {
                className: 'language-js',
                children:
                  'colorKit.randomHwbColor({ h: [0, 360], w: [0, 100], b: [0, 100], a: [1, 1] }).hex(); // #ff0f0b\r\ncolorKit.randomHwbColor().hex(); // #b07345\n',
              }),
            }),
          ],
        });
      }
      function t(e = {}) {
        const { wrapper: r } = { ...(0, c.a)(), ...e.components };
        return r ? (0, l.jsx)(r, { ...e, children: (0, l.jsx)(h, { ...e }) }) : h(e);
      }
    },
    1151: (e, r, n) => {
      n.d(r, { Z: () => d, a: () => s });
      var l = n(7294);
      const c = {},
        o = l.createContext(c);
      function s(e) {
        const r = l.useContext(o);
        return l.useMemo(
          function () {
            return 'function' == typeof e ? e(r) : { ...r, ...e };
          },
          [r, e]
        );
      }
      function d(e) {
        let r;
        return (
          (r = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(c)
              : e.components || c
            : s(e.components)),
          l.createElement(o.Provider, { value: r }, e.children)
        );
      }
    },
  },
]);
