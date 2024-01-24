'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [639],
  {
    7570: (e, n, r) => {
      r.r(n),
        r.d(n, {
          assets: () => i,
          contentTitle: () => s,
          default: () => t,
          frontMatter: () => o,
          metadata: () => d,
          toc: () => a,
        });
      var l = r(5893),
        c = r(1151);
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
          previous: { title: 'ExtraThumb', permalink: '/reanimated-color-picker/docs/API/Preview/ExtraThumb' },
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
          { value: 'Syntax', id: 'syntax', level: 4 },
          { value: 'Example', id: 'example', level: 4 },
          { value: 'HEX', id: 'hex-1', level: 3 },
          { value: 'Syntax', id: 'syntax-1', level: 4 },
          { value: 'Example', id: 'example-1', level: 4 },
          { value: 'HSL', id: 'hsl-1', level: 3 },
          { value: 'Syntax', id: 'syntax-2', level: 4 },
          { value: 'Example', id: 'example-2', level: 4 },
          { value: 'HSV', id: 'hsv-1', level: 3 },
          { value: 'Syntax', id: 'syntax-3', level: 4 },
          { value: 'Example', id: 'example-3', level: 4 },
          { value: 'HWB', id: 'hwb-1', level: 3 },
          { value: 'Syntax', id: 'syntax-4', level: 4 },
          { value: 'Example', id: 'example-4', level: 4 },
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
        const n = {
          a: 'a',
          admonition: 'admonition',
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
            (0, l.jsxs)(n.p, {
              children: [
                (0, l.jsx)(n.code, { children: 'colorKit' }),
                ' is a collection of color tools that are utilized internally within the ',
                (0, l.jsx)(n.code, { children: 'ColorPicker' }),
                '.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h2, { id: 'supported-colors', children: 'Supported Colors' }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'rbg', children: 'RBG' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'rgb(255, 0, 255)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'rgb(255 0 255)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'rgba(255, 0, 255, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'rgba(255 0 255 / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{r: number, g: number, b: number, a: number}' }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{r: number, g: number, b: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'hex', children: 'HEX' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: "'#f0f'" }), ' (#rgb)'] }),
                '\n',
                (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: "'#ff00ff'" }), ' (#rrggbb)'] }),
                '\n',
                (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: "'#f0ff" }), "' (#rgba)"] }),
                '\n',
                (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: "'#ff00ff00'" }), ' (#rrggbbaa)'] }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'hsl', children: 'HSL' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsl(360, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsl(360deg, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsl(360 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsl(360deg 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsla(360, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsla(360deg, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsla(360 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsla(360deg 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{h: number, s: number, l: number}' }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{h: number, s: number, l: number, a: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'hsv', children: 'HSV' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsv(360, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsv(360deg, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsv(360 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsv(360deg 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsva(360, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsva(360deg, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsva(360 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hsva(360deg 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{h: number, s: number, v: number}' }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{h: number, s: number, v: number, a: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'hwb', children: 'HWB' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwb(360, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwb(360deg, 100%, 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwb(360 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwb(360deg 100% 100%)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwba(360, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwba(360deg, 100%, 100%, 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwba(360 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "'hwba(360deg 100% 100% / 1.0)'" }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{h: number, w: number, b: number}' }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: '{h: number, w: number, b: number, a: number}' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'color-ints', children: 'Color ints' }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: '0xff00ffff' }), ' (0xrrggbbaa)'] }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'color-keywords', children: 'Color keywords' }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Named colors implementation follows the ',
                (0, l.jsx)(n.a, { href: 'https://www.w3.org/TR/css-color-3/#svg-color', children: 'CSS3/SVG specification' }),
                '.',
              ],
            }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, { children: ['aliceblue (', (0, l.jsx)(n.code, { children: '#f0f8ff' }), ')'] }),
                '\n',
                (0, l.jsxs)(n.li, { children: ['antiquewhite (', (0, l.jsx)(n.code, { children: '#faebd7' }), ')'] }),
                '\n',
                (0, l.jsxs)(n.li, { children: ['aqua (', (0, l.jsx)(n.code, { children: '#00ffff' }), ')'] }),
                '\n',
                (0, l.jsxs)(n.li, { children: ['aquamarine (', (0, l.jsx)(n.code, { children: '#7fffd4' }), ')'] }),
                '\n',
                (0, l.jsxs)(n.li, { children: ['azure (', (0, l.jsx)(n.code, { children: '#f0ffff' }), ')'] }),
                '\n',
                (0, l.jsx)(n.li, { children: 'and more ...' }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsxs)(n.admonition, {
              title: 'HOW TO RUN ON THE UI THREAD',
              type: 'info',
              children: [
                (0, l.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, l.jsxs)(n.li, {
                      children: [
                        'To execute any of the ',
                        (0, l.jsx)(n.code, { children: 'colorKit' }),
                        ' methods, you can use ',
                        (0, l.jsx)(n.code, { children: 'runOnUI' }),
                        '. For example:',
                      ],
                    }),
                    '\n',
                  ],
                }),
                (0, l.jsx)(n.pre, {
                  children: (0, l.jsx)(n.code, {
                    className: 'language-js',
                    children:
                      "function workletFunction() {\n  'worklet';\n  const rgb = colorKit.runOnUI().RGB('#f0ff').object();\n}\n",
                  }),
                }),
              ],
            }),
            '\n',
            (0, l.jsx)(n.h2, { id: 'color-conversion', children: 'Color Conversion' }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'rgb', children: 'RGB' }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(n.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(n.code, { children: 'RGB' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'syntax', children: 'Syntax' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'colorKit.RGB(color: SupportedColorFormats).string(forceRGBA = false): string;\ncolorKit.RGB(color: SupportedColorFormats).array(roundValues = true): number[];\ncolorKit.RGB(color: SupportedColorFormats).object(roundValues = true): { r: number; g: number; b: number; a: number };\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'example', children: 'Example' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.RGB('hsl(360, 100%, 100%)').string(); // rgb(255, 255, 255)\ncolorKit.RGB('hsl(360, 100%, 100%)').string(true); // rgba(255, 255, 255, 1) force rbga\ncolorKit.RGB('#f0ff').object(); // { r: 255, g: 0, b: 255, a: 1 }\ncolorKit.RGB({ h: 360, s: 100, v: 50 }).array(); // [128, 0, 0, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'hex-1', children: 'HEX' }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(n.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(n.code, { children: 'HEX' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'syntax-1', children: 'Syntax' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-ts',
                children: 'colorKit.HEX(color: SupportedColorFormats): string;\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'example-1', children: 'Example' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HEX('red'); //  #ff0000\ncolorKit.HEX('hsv(360, 10%, 100%)'); // #ffe6e6\ncolorKit.HEX('rgba(25, 255, 255, 1)'); // #19ffff\ncolorKit.HEX({ h: 360, s: 100, l: 50 }); // #ff0000\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'hsl-1', children: 'HSL' }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(n.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(n.code, { children: 'HSL' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'syntax-2', children: 'Syntax' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'colorKit.HSL(color: SupportedColorFormats).string(forceHSLA = false): string;\ncolorKit.HSL(color: SupportedColorFormats).array(roundValues = true): number[];\ncolorKit.HSL(color: SupportedColorFormats).object(roundValues = true): { h: number; s: number; l: number; a: number };\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'example-2', children: 'Example' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HSL('orange').string(); // hsl(39, 100%, 50%)\ncolorKit.HSL('#503e7a').string(true); // hsla(258, 33%, 36%, 1)\ncolorKit.HSL('rgb(114, 99, 29)').object(); // { h: 49, s: 59, l: 28, a: 1 }\ncolorKit.HSL({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 28, 22, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'hsv-1', children: 'HSV' }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(n.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(n.code, { children: 'HSV' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'syntax-3', children: 'Syntax' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'colorKit.HSV(color: SupportedColorFormats).string(forceHSVA = false): string;\ncolorKit.HSV(color: SupportedColorFormats).array(roundValues = true): number[];\ncolorKit.HSV(color: SupportedColorFormats).object(roundValues = true): { h: number; s: number; v: number; a: number };\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'example-3', children: 'Example' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HSV('orange').string(true); // hsva(258, 49%, 48%, 1)\ncolorKit.HSV('#503e7a').string(); // hsv(258, 49%, 48%)\ncolorKit.HSV('rgb(114, 99, 29)').object(); // { h: 49, s: 75, l: 45, a: 1 }\ncolorKit.HSV({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 44, 28, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'hwb-1', children: 'HWB' }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Convert any of the ',
                (0, l.jsx)(n.a, { href: '#supported-colors', children: 'supported color' }),
                ' formats into the ',
                (0, l.jsx)(n.code, { children: 'HWB' }),
                ' format.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'syntax-4', children: 'Syntax' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'colorKit.HWB(color: SupportedColorFormats).string(forceHWBA = false): string;\ncolorKit.HWB(color: SupportedColorFormats).array(roundValues = true): number[];\ncolorKit.HWB(color: SupportedColorFormats).object(roundValues = true): { h: number; w: number; b: number; a: number };\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'example-4', children: 'Example' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "import { colorKit } from 'reanimated-color-picker';\n\ncolorKit.HWB('orange').string(); // hwb(39, 0%, 0%)\ncolorKit.HWB('#503e7a').string(true); // hwba(258, 24%, 52%, 1)\ncolorKit.HWB('rgb(114, 99, 29)').object(); // { h: 49, w: 12, l: 55, a: 1 }\ncolorKit.HWB({ a: 1, h: 336, s: 44, v: 28 }).array(); // [336, 16, 72, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h2, { id: 'color-information', children: 'Color Information' }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getformat', children: (0, l.jsx)(n.code, { children: 'getFormat' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Identify the color format of a given ',
                (0, l.jsx)(n.code, { children: 'string' }),
                ' or ',
                (0, l.jsx)(n.code, { children: 'object' }),
                ', and return ',
                (0, l.jsx)(n.code, { children: 'null' }),
                ' for invalid colors.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.getFormat('orange'); // named\n\ncolorKit.getFormat('rgb(211, 168, 151)'); // rgb\ncolorKit.getFormat('rgba(211, 168, 151, 1)'); // rgba\ncolorKit.getFormat({ r: 211, g: 168, b: 151 }); // rgb\ncolorKit.getFormat({ r: 211, g: 168, b: 151, a: 1 }); // rgba\n\ncolorKit.getFormat('hsl(224, 77%, 28%)'); // hsl\ncolorKit.getFormat('hsla(224, 77%, 28%, 1)'); // hsla\ncolorKit.getFormat({ h: 224, s: 77, l: 28 }); // hsl\ncolorKit.getFormat({ h: 224, s: 77, l: 28, a: 1 }); // hsla\n\ncolorKit.getFormat('hsva(289, 99%, 40%, 1)'); // hsv\ncolorKit.getFormat('hsv(289, 99%, 40%)'); // hsva\ncolorKit.getFormat({ h: 289, s: 99, v: 40 }); // hsv\ncolorKit.getFormat({ h: 289, s: 99, v: 40, a: 1 }); // hsva\n\ncolorKit.getFormat('hwba(289, 99%, 40%, 1)'); // hwb\ncolorKit.getFormat('hwb(289, 99%, 40%)'); // hwba\ncolorKit.getFormat({ h: 289, w: 99, b: 40 }); // hwb\ncolorKit.getFormat({ h: 289, w: 99, b: 40, a: 1 }); // hwba\n\ncolorKit.getFormat('#fff'); // hex3\ncolorKit.getFormat('#ffff'); // hex4\ncolorKit.getFormat('#ffffffff'); // hex8\n\ncolorKit.getFormat('rgb(211, 168, 151, 1)'); // null (should be 'rgba(211, 168, 151, 1)')\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getred', children: (0, l.jsx)(n.code, { children: 'getRed' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Get the ', (0, l.jsx)(n.code, { children: 'red' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, { className: 'language-js', children: "colorKit.getRed('red'); // 255\n" }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getgreen', children: (0, l.jsx)(n.code, { children: 'getGreen' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Get the ', (0, l.jsx)(n.code, { children: 'green' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.getGreen('rgb(0, 200, 0)'); // 200\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getblue', children: (0, l.jsx)(n.code, { children: 'getBlue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Get the ', (0, l.jsx)(n.code, { children: 'green' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.getBlue('hsl(200, 60%, 50%)'); // 204\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'gethue', children: (0, l.jsx)(n.code, { children: 'getHue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Get the ', (0, l.jsx)(n.code, { children: 'hue' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, { className: 'language-js', children: "colorKit.getHue('#87c270'); // 103\n" }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getluminance', children: (0, l.jsx)(n.code, { children: 'getLuminance' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ["Get color's HSL ", (0, l.jsx)(n.code, { children: 'luminosity' }), ' channel value.'],
            }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'If you want the overall ',
                (0, l.jsx)(n.code, { children: 'luminosity' }),
                ' of a color use ',
                (0, l.jsx)(n.a, { href: '#getluminancewcag', children: (0, l.jsx)(n.code, { children: 'getLuminanceWCAG' }) }),
                ' method.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: 'colorKit.getLuminance({ r: 67, g: 59, b: 79, a: 1 }); // 27\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getbrightness', children: (0, l.jsx)(n.code, { children: 'getBrightness' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                "Get the HSV's ",
                (0, l.jsx)(n.code, { children: 'value' }),
                ' (brightness) channel value of a given color.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: 'colorKit.getBrightness({ h: 127, s: 36, l: 8, a: 1 }); // 11\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getalpha', children: (0, l.jsx)(n.code, { children: 'getAlpha' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Get the ', (0, l.jsx)(n.code, { children: 'alpha' }), ' channel value of a given color.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, { className: 'language-js', children: "colorKit.getAlpha('#d2c765c7'); // 0.78\n" }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'getluminancewcag', children: (0, l.jsx)(n.code, { children: 'getLuminanceWCAG' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Returns the perceived ',
                (0, l.jsx)(n.code, { children: 'luminance' }),
                ' of the given color, from ',
                (0, l.jsx)(n.code, { children: '0-1' }),
                ' as defined by ',
                (0, l.jsx)(n.a, {
                  href: 'https://www.w3.org/TR/WCAG20/',
                  children: 'Web Content Accessibility Guidelines (Version 2.0)',
                }),
                '.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.getLuminanceWCAG('rgba(176, 7, 120, 1)'); // 0.10738130030129947\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'arecolorsequal', children: (0, l.jsx)(n.code, { children: 'areColorsEqual' }) }),
            '\n',
            (0, l.jsx)(n.p, { children: 'Check if two colors are similar within a specified tolerance.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "const tolerance = 0;\nconst isEqual = colorKit.areColorsEqual('#F00', 'red', tolerance); // true\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'contrastratio', children: (0, l.jsx)(n.code, { children: 'contrastRatio' }) }),
            '\n',
            (0, l.jsx)(n.p, {
              children: 'Calculates the contrast ratio between two colors, useful for ensuring accessibility and readability.',
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.contrastRatio('yellow', 'rgba(40, 38, 43, 1)'); // 13.95\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'isdark', children: (0, l.jsx)(n.code, { children: 'isDark' }) }),
            '\n',
            (0, l.jsx)(n.p, { children: 'Returns a boolean indicating whether the color is considered "dark" or not.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.isDark('hsla(224, 77%, 28%, 1)'); // true\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'islight', children: (0, l.jsx)(n.code, { children: 'isLight' }) }),
            '\n',
            (0, l.jsx)(n.p, { children: 'Returns a boolean indicating whether the color is considered "light" or not.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.isLight('hsla(224, 77%, 28%, 1)'); // false\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h2, { id: 'color-manipulation', children: 'Color Manipulation' }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'setred', children: (0, l.jsx)(n.code, { children: 'setRed' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Set the ', (0, l.jsx)(n.code, { children: 'red' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.setRed('#a5a2a1', 150).hex(); // #c8a2a1\ncolorKit.setRed('#a5a2a1', 200).rgb().string(); // rgb(200, 162, 161)\ncolorKit.setRed('#a5a2a1', 200).rgb().object(); // { r: 200, g: 162, b: 161, a: 1 }\ncolorKit.setRed('#a5a2a1', 200).rgb().array(); // [200, 162, 161, 1]\ncolorKit.setRed('#a5a2a1', 200).hsl().string(); // hsl(2, 26%, 71%)\ncolorKit.setRed('#a5a2a1', 200).hsl().object(); // { h: 2, s: 26, l: 71, a: 1 }\ncolorKit.setRed('#a5a2a1', 200).hsl().array(); // [2, 26, 71, 1]\ncolorKit.setRed('#a5a2a1', 200).hsv().string(); // hsv(2, 20%, 78%)\ncolorKit.setRed('#a5a2a1', 200).hsv().object(); // { h: 2, s: 20, l: 78, a: 1 }\ncolorKit.setRed('#a5a2a1', 200).hsv().array(); // [2, 20, 78, 1]\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'increasered', children: (0, l.jsx)(n.code, { children: 'increaseRed' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(n.code, { children: 'red' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseRed('#bb661b', 50).hex(); // #ed661b\ncolorKit.increaseRed('#bb661b', '50%').hex(); // #ff661b\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'decreasered', children: (0, l.jsx)(n.code, { children: 'decreaseRed' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(n.code, { children: 'red' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseRed('#bb661b', 50).hex(); // #89661b\ncolorKit.decreaseRed('#bb661b', '50%').hex(); // #5e661b\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'setgreen', children: (0, l.jsx)(n.code, { children: 'setGreen' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Set the ', (0, l.jsx)(n.code, { children: 'green' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.setGreen('#d7e2d0', 50).hex(); // #d732d0\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'increasegreen', children: (0, l.jsx)(n.code, { children: 'increaseGreen' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(n.code, { children: 'green' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseGreen('#d7e2d0', 50).hex(); // #d7ffd0\ncolorKit.increaseGreen('#d7e2d0', '10%').hex(); // #d7f9d0\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'decreasegreen', children: (0, l.jsx)(n.code, { children: 'decreaseGreen' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(n.code, { children: 'green' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseGreen('#d7e2d0', 50).hex(); // #d7b0d0\ncolorKit.decreaseGreen('#d7e2d0', '10%').hex(); // #d7cbd0\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'setblue', children: (0, l.jsx)(n.code, { children: 'setBlue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Set the ', (0, l.jsx)(n.code, { children: 'blue' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.setBlue('#5d8e92', 50).hex(); // #5d3292\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'increaseblue', children: (0, l.jsx)(n.code, { children: 'increaseBlue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(n.code, { children: 'blue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseBlue('#5d8e92', 50).hex(); // #5d8ec4\ncolorKit.increaseBlue('#5d8e92', '50%').hex(); // #5d8edb\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'decreaseblue', children: (0, l.jsx)(n.code, { children: 'decreaseBlue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(n.code, { children: 'blue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseBlue('#5d8e92', 50).hex(); // #5d8e60\ncolorKit.decreaseBlue('#5d8e92', '50%').hex(); // #5d8e49\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'sethue', children: (0, l.jsx)(n.code, { children: 'setHue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Set the ', (0, l.jsx)(n.code, { children: 'hue' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.setHue('#2c1a51', 50).hex(); // #51481a\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'increasehue', children: (0, l.jsx)(n.code, { children: 'increaseHue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(n.code, { children: 'Hue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseHue('#2c1a51', 50).hex(); // #511a48\ncolorKit.increaseHue('#2c1a51', '50%').hex(); // #511a1a\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'decreasehue', children: (0, l.jsx)(n.code, { children: 'decreaseHue' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(n.code, { children: 'Hue' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseHue('#2c1a51', 50).hex(); // #1a3651\ncolorKit.decreaseHue('#2c1a51', '50%').hex(); // #1a5123\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'spin', children: (0, l.jsx)(n.code, { children: 'spin' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Spin the ', (0, l.jsx)(n.code, { children: 'hue' }), ' channel by a certain percentage/amount.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.spin('#2c1a51', 350).hex(); // #231a51\ncolorKit.spin('#2c1a51', '350%').hex(); // #40511a\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'setsaturation', children: (0, l.jsx)(n.code, { children: 'setSaturation' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Set the ', (0, l.jsx)(n.code, { children: 'saturation' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.setSaturation('#482e45', 100).hex(); // #750068\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'saturate', children: (0, l.jsx)(n.code, { children: 'saturate' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(n.code, { children: 'saturation' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.saturate('#482e45', 50).hex(); // #65105b\ncolorKit.saturate('#482e45', '50%').hex(); // #4e2749\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'desaturate', children: (0, l.jsx)(n.code, { children: 'desaturate' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(n.code, { children: 'saturation' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.desaturate('#482e45', 50).hex(); // #3b3b3b\ncolorKit.desaturate('#482e45', '50%').hex(); // #413440\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'setluminance', children: (0, l.jsx)(n.code, { children: 'setLuminance' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                "Set HSL's ",
                (0, l.jsx)(n.code, { children: 'luminosity' }),
                ' channel for a given color to a specific amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.setLuminance('#dadafc', 50).hex(); // #1313ec\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'brighten', children: (0, l.jsx)(n.code, { children: 'brighten' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(n.code, { children: 'brightness' }),
                ' of the given color by a certain percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.brighten('#dadafc', 50).hex(); // #ffffff\ncolorKit.brighten('#dadafc', '5%').hex(); // #f1f1fe\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'darken', children: (0, l.jsx)(n.code, { children: 'darken' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(n.code, { children: 'brightness' }),
                ' of the given color by a certain percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.darken('#dadafc', 50).hex(); // #1010c6\ncolorKit.darken('#dadafc', '50%').hex(); // #1212d9\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'setbrightness', children: (0, l.jsx)(n.code, { children: 'setBrightness' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                "Set HSV's ",
                (0, l.jsx)(n.code, { children: 'value' }),
                ' (brightness) channel for a given color to a specific amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.setBrightness('#dadafc', 50).hex(); // #6f6f80\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'increasebrightness', children: (0, l.jsx)(n.code, { children: 'increaseBrightness' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                "Increase HSV's ",
                (0, l.jsx)(n.code, { children: 'value' }),
                ' (brightness) channel value of a color by the given percentage/amount',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.increaseBrightness('#dadafc', 50).hex(); // #dedeff\ncolorKit.increaseBrightness('#dadafc', '5%').hex(); // #dedeff\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'decreasebrightness', children: (0, l.jsx)(n.code, { children: 'decreaseBrightness' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                "Decrease HSV's ",
                (0, l.jsx)(n.code, { children: 'value' }),
                ' (brightness) channel value of a color by the given percentage/amount',
              ],
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  "colorKit.decreaseBrightness('#dadafc', 50).hex(); // #6d6d7d\ncolorKit.decreaseBrightness('#dadafc', '50%').hex(); // #6f6f80\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'setalpha', children: (0, l.jsx)(n.code, { children: 'setAlpha' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Set the ', (0, l.jsx)(n.code, { children: 'alpha' }), ' value of a color to a specific amount.'],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'increasealpha', children: (0, l.jsx)(n.code, { children: 'increaseAlpha' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Increase the ',
                (0, l.jsx)(n.code, { children: 'alpha' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'decreasealpha', children: (0, l.jsx)(n.code, { children: 'decreaseAlpha' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: [
                'Decrease the ',
                (0, l.jsx)(n.code, { children: 'alpha' }),
                ' value of a color by the given percentage/amount.',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h2, { id: 'color-utilities', children: 'Color Utilities' }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'blend', children: (0, l.jsx)(n.code, { children: 'blend' }) }),
            '\n',
            (0, l.jsx)(n.p, { children: 'Blends two colors by a certain amount.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.blend('red', 'yellow', 50).hex(); // #ff8000\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'invert', children: (0, l.jsx)(n.code, { children: 'invert' }) }),
            '\n',
            (0, l.jsx)(n.p, {
              children: 'Invert (negate) a color, black becomes white, white becomes black, blue becomes orange and so on.',
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, { className: 'language-js', children: "colorKit.invert('#000').hex(); // #ffffff\n" }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'grayscale', children: (0, l.jsx)(n.code, { children: 'grayscale' }) }),
            '\n',
            (0, l.jsx)(n.p, { children: 'Completely desaturates a color into greyscale.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.grayscale('#172140').hex(); // #212121\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'adjustcontrast', children: (0, l.jsx)(n.code, { children: 'adjustContrast' }) }),
            '\n',
            (0, l.jsx)(n.p, {
              children:
                'Returns the first color (text color) with the desired contrast ratio against the second color (background color).',
            }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children: "colorKit.adjustContrast('rgb(50, 50, 50)', '#fff', 4.5).hex(); // #777777\n",
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'randomhslcolor', children: (0, l.jsx)(n.code, { children: 'randomHslColor' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Generate a random color from ', (0, l.jsx)(n.code, { children: 'HSL' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(n.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  'colorKit.randomHslColor({ h: [0, 360], s: [0, 100], l: [0, 100], a: [1, 1] }).hex(); // #b07345\ncolorKit.randomHslColor().hex(); // #d0bfd6\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'randomhsvcolor', children: (0, l.jsx)(n.code, { children: 'randomHsvColor' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Generate a random color from ', (0, l.jsx)(n.code, { children: 'HSV' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(n.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  'colorKit.randomHsvColor({ h: [0, 360], s: [0, 100], v: [0, 100], a: [1, 1] }).hex(); // #59078c\ncolorKit.randomHsvColor().hex(); // #2b553f\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'randomrgbcolor', children: (0, l.jsx)(n.code, { children: 'randomRgbColor' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Generate a random color from ', (0, l.jsx)(n.code, { children: 'rgb' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(n.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  'colorKit.randomRgbColor({ r: [0, 360], g: [0, 100], b: [0, 100], a: [1, 1] }).hex(); // #ff0f0b\ncolorKit.randomRgbColor().hex(); // #b07345\n',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'randomhwbcolor', children: (0, l.jsx)(n.code, { children: 'randomHwbColor' }) }),
            '\n',
            (0, l.jsxs)(n.p, {
              children: ['Generate a random color from ', (0, l.jsx)(n.code, { children: 'hwb' }), ' values.'],
            }),
            '\n',
            (0, l.jsx)(n.p, { children: 'You can provide a range between two values for each channel.' }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-js',
                children:
                  'colorKit.randomHwbColor({ h: [0, 360], w: [0, 100], b: [0, 100], a: [1, 1] }).hex(); // #ff0f0b\ncolorKit.randomHwbColor().hex(); // #b07345\n',
              }),
            }),
          ],
        });
      }
      function t(e = {}) {
        const { wrapper: n } = { ...(0, c.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(h, { ...e }) }) : h(e);
      }
    },
    1151: (e, n, r) => {
      r.d(n, { Z: () => d, a: () => s });
      var l = r(7294);
      const c = {},
        o = l.createContext(c);
      function s(e) {
        const n = l.useContext(o);
        return l.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e],
        );
      }
      function d(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(c)
              : e.components || c
            : s(e.components)),
          l.createElement(o.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
