'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [99],
  {
    8526: (e, t, n) => {
      n.r(t),
        n.d(t, {
          assets: () => r,
          contentTitle: () => c,
          default: () => h,
          frontMatter: () => o,
          metadata: () => s,
          toc: () => d,
        });
      var i = n(5893),
        l = n(1151);
      const o = {
          sidebar_position: 2,
          sidebar_label: 'InputWidget',
          description: 'The input widget component allows you to input color values in various formats.',
        },
        c = '<InputWidget />',
        s = {
          id: 'API/Preview/InputWidget',
          title: '<InputWidget />',
          description: 'The input widget component allows you to input color values in various formats.',
          source: '@site/docs/API/Preview/InputWidget.md',
          sourceDirName: 'API/Preview',
          slug: '/API/Preview/InputWidget',
          permalink: '/reanimated-color-picker/docs/API/Preview/InputWidget',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 2,
          frontMatter: {
            sidebar_position: 2,
            sidebar_label: 'InputWidget',
            description: 'The input widget component allows you to input color values in various formats.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'PreviewText', permalink: '/reanimated-color-picker/docs/API/Preview/PreviewText' },
          next: { title: 'Swatches', permalink: '/reanimated-color-picker/docs/API/Preview/Swatches' },
        },
        r = {},
        d = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>defaultFormat</code>', id: 'defaultformat', level: 3 },
          { value: '<code>disableAlphaChannel</code>', id: 'disablealphachannel', level: 3 },
          { value: '<code>formats</code>', id: 'formats', level: 3 },
          { value: '<code>inputStyle</code>', id: 'inputstyle', level: 3 },
          { value: '<code>inputProps</code>', id: 'inputprops', level: 3 },
          { value: '<code>inputTitleStyle</code>', id: 'inputtitlestyle', level: 3 },
          { value: '<code>containerStyle</code>', id: 'containerstyle', level: 3 },
          { value: '<code>iconColor</code>', id: 'iconcolor', level: 3 },
          { value: '<code>iconStyle</code>', id: 'iconstyle', level: 3 },
        ];
      function a(e) {
        const t = {
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          img: 'img',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, l.a)(),
          ...e.components,
        };
        return (0, i.jsxs)(i.Fragment, {
          children: [
            (0, i.jsx)(t.h1, { id: 'inputwidget-', children: (0, i.jsx)(t.code, { children: '<InputWidget />' }) }),
            '\n',
            (0, i.jsx)(t.p, {
              children: (0, i.jsx)(t.img, { alt: 'InputWidget', src: n(1807).Z + '', width: '300', height: '455' }),
            }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsx)(t.li, {
                  children:
                    'The input widget component allows you to input color values in various formats, including RGB, HEX, HSL, HWB, and HSV. The component features a button that lets you cycle through these formats, making it easy to switch between them and find the one that suits your needs.',
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'defaultformat', children: (0, i.jsx)(t.code, { children: 'defaultFormat' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'defaultFormat' }),
                    ' prop determines the initial color format for the input widget component.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'It accepts one of the following values: ',
                    (0, i.jsx)(t.code, { children: "'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV'" }),
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'disablealphachannel', children: (0, i.jsx)(t.code, { children: 'disableAlphaChannel' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsx)(t.li, {
                  children:
                    'This prop allows you to disable the alpha channel input. If set to true, the input widget will ignore the alpha channel and prevent users from setting the opacity of the selected color.',
                }),
                '\n',
                (0, i.jsx)(t.li, { children: (0, i.jsx)(t.code, { children: 'type: boolean' }) }),
                '\n',
                (0, i.jsx)(t.li, { children: (0, i.jsx)(t.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'formats', children: (0, i.jsx)(t.code, { children: 'formats' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'formats' }),
                    ' prop determines which color formats are included in the input widget component and the order they appear when cycling through them.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'It accepts an array of the following values: ',
                    (0, i.jsx)(t.code, { children: "'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV'" }),
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'inputstyle', children: (0, i.jsx)(t.code, { children: 'inputStyle' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'inputStyle' }),
                    ' prop sets the style for the ',
                    (0, i.jsx)(t.code, { children: 'InputText' }),
                    ' components that make up the input fields for each color format.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(t.li, {
                  children: ['It accepts a ', (0, i.jsx)(t.code, { children: 'StyleProp<TextStyle>' }), ' object.'],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'inputprops', children: (0, i.jsx)(t.code, { children: 'inputProps' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'inputProps' }),
                    ' prop sets the props for the ',
                    (0, i.jsx)(t.code, { children: 'TextInput' }),
                    ' components that make up the input fields for each color format.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(t.li, { children: ['It accepts an ', (0, i.jsx)(t.code, { children: 'InputProps' }), ' object.'] }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'inputtitlestyle', children: (0, i.jsx)(t.code, { children: 'inputTitleStyle' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'inputTitleStyle' }),
                    ' prop sets the style for the ',
                    (0, i.jsx)(t.code, { children: 'Text' }),
                    ' component that displays the title for the input fields.',
                  ],
                }),
                '\n',
                (0, i.jsx)(t.li, {
                  children:
                    'This title is located below the input fields and indicates which color format is currently displayed.',
                }),
                '\n',
                (0, i.jsxs)(t.li, {
                  children: ['It accepts a ', (0, i.jsx)(t.code, { children: 'StyleProp<TextStyle>' }), ' object.'],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'containerstyle', children: (0, i.jsx)(t.code, { children: 'containerStyle' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'containerStyle' }),
                    ' prop sets the style for the ',
                    (0, i.jsx)(t.code, { children: 'View' }),
                    ' component that wraps around all the input fields and the cycle button.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(t.li, {
                  children: ['It accepts a ', (0, i.jsx)(t.code, { children: 'StyleProp<ViewStyle>' }), ' object.'],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'iconcolor', children: (0, i.jsx)(t.code, { children: 'iconColor' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'iconColor' }),
                    ' prop sets the color for the cycle button icon, which is an Image component that cycles through the available color formats when clicked.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(t.li, {
                  children: ['It accepts a ', (0, i.jsx)(t.code, { children: 'string' }), ' representing a color value.'],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(t.h3, { id: 'iconstyle', children: (0, i.jsx)(t.code, { children: 'iconStyle' }) }),
            '\n',
            (0, i.jsxs)(t.ul, {
              children: [
                '\n',
                (0, i.jsxs)(t.li, {
                  children: [
                    'The ',
                    (0, i.jsx)(t.code, { children: 'iconStyle' }),
                    ' prop sets the style for the cycle button icon.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(t.li, {
                  children: ['It accepts a ', (0, i.jsx)(t.code, { children: 'StyleProp<ImageStyle>' }), ' object.'],
                }),
                '\n',
              ],
            }),
          ],
        });
      }
      function h(e = {}) {
        const { wrapper: t } = { ...(0, l.a)(), ...e.components };
        return t ? (0, i.jsx)(t, { ...e, children: (0, i.jsx)(a, { ...e }) }) : a(e);
      }
    },
    1807: (e, t, n) => {
      n.d(t, { Z: () => i });
      const i = n.p + 'assets/images/InputWidgets-01952ad7ad083d25cd90fcba19bfc4ad.png';
    },
    1151: (e, t, n) => {
      n.d(t, { Z: () => s, a: () => c });
      var i = n(7294);
      const l = {},
        o = i.createContext(l);
      function c(e) {
        const t = i.useContext(o);
        return i.useMemo(
          function () {
            return 'function' == typeof e ? e(t) : { ...t, ...e };
          },
          [t, e],
        );
      }
      function s(e) {
        let t;
        return (
          (t = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(l)
              : e.components || l
            : c(e.components)),
          i.createElement(o.Provider, { value: t }, e.children)
        );
      }
    },
  },
]);
