'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [218],
  {
    1962: (e, n, i) => {
      i.r(n),
        i.d(n, {
          assets: () => o,
          contentTitle: () => d,
          default: () => u,
          frontMatter: () => c,
          metadata: () => s,
          toc: () => h,
        });
      var l = i(5893),
        t = i(1151),
        r = i(435);
      const c = {
          sidebar_position: 3,
          sidebar_label: 'LuminanceCircular',
          description: 'A circular slider for adjusting the color luminance channel in the HSL color space.',
        },
        d = '<LuminanceCircular />',
        s = {
          id: 'API/Sliders/HSL/LuminanceCircular',
          title: '<LuminanceCircular />',
          description: 'A circular slider for adjusting the color luminance channel in the HSL color space.',
          source: '@site/docs/API/Sliders/HSL/LuminanceCircular.mdx',
          sourceDirName: 'API/Sliders/HSL',
          slug: '/API/Sliders/HSL/LuminanceCircular',
          permalink: '/reanimated-color-picker/docs/API/Sliders/HSL/LuminanceCircular',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 3,
          frontMatter: {
            sidebar_position: 3,
            sidebar_label: 'LuminanceCircular',
            description: 'A circular slider for adjusting the color luminance channel in the HSL color space.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'LuminanceSlider', permalink: '/reanimated-color-picker/docs/API/Sliders/HSL/LuminanceSlider' },
          next: { title: 'RGB', permalink: '/reanimated-color-picker/docs/category/rgb' },
        },
        o = {},
        h = [
          {
            value: 'A circular slider for adjusting the color luminance channel in the HSL color space',
            id: 'a-circular-slider-for-adjusting-the-color-luminance-channel-in-the-hsl-color-space',
            level: 3,
          },
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>rotate</code>', id: 'rotate', level: 3 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>sliderThickness</code>', id: 'sliderthickness', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>renderThumb</code>', id: 'renderthumb', level: 3 },
          { value: '<code>thumbScaleAnimationValue</code>', id: 'thumbscaleanimationvalue', level: 3 },
          { value: '<code>thumbScaleAnimationDuration</code>', id: 'thumbscaleanimationduration', level: 3 },
          { value: '<code>adaptSpectrum</code>', id: 'adaptspectrum', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>containerStyle</code>', id: 'containerstyle', level: 3 },
        ];
      function a(e) {
        const n = {
            admonition: 'admonition',
            code: 'code',
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            img: 'img',
            li: 'li',
            mdxAdmonitionTitle: 'mdxAdmonitionTitle',
            p: 'p',
            strong: 'strong',
            ul: 'ul',
            ...(0, t.a)(),
            ...e.components,
          },
          { Shapes: c } = n;
        return (
          c ||
            (function (e, n) {
              throw new Error(
                'Expected ' +
                  (n ? 'component' : 'object') +
                  ' `' +
                  e +
                  '` to be defined: you likely forgot to import, pass, or provide it.',
              );
            })('Shapes', !0),
          (0, l.jsxs)(l.Fragment, {
            children: [
              (0, l.jsx)(n.h1, { id: 'luminancecircular-', children: (0, l.jsx)(n.code, { children: '<LuminanceCircular />' }) }),
              '\n',
              (0, l.jsx)(n.p, {
                children: (0, l.jsx)(n.img, { alt: 'LuminanceCircular', src: i(2781).Z + '', width: '200', height: '200' }),
              }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      '\n',
                      (0, l.jsx)(n.h3, {
                        id: 'a-circular-slider-for-adjusting-the-color-luminance-channel-in-the-hsl-color-space',
                        children: 'A circular slider for adjusting the color luminance channel in the HSL color space',
                      }),
                      '\n',
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h2, { id: 'props', children: 'Props' }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'rotate', children: (0, l.jsx)(n.code, { children: 'rotate' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: 'Specify a degree of rotation for the luminance circle' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: number' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: 0' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'thumbsize', children: (0, l.jsx)(n.code, { children: 'thumbSize' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: "The size of the slider's thumb." }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: number' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: 35' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'thumbcolor', children: (0, l.jsx)(n.code, { children: 'thumbColor' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: "The color of the slider's thumb." }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: string' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: interactive*' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsxs)(n.admonition, {
                type: 'info',
                children: [
                  (0, l.jsx)(n.mdxAdmonitionTitle, { children: (0, l.jsx)(n.strong, { children: '*interactive' }) }),
                  (0, l.jsxs)(n.ul, {
                    children: [
                      '\n',
                      (0, l.jsx)(n.li, {
                        children:
                          'The color of the thumb will be adjusted according to the contrast ratio, in the absence of a specific color value.',
                      }),
                      '\n',
                    ],
                  }),
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'sliderthickness', children: (0, l.jsx)(n.code, { children: 'sliderThickness' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: 'The thickness of the slider.' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: number' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: 25' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'thumbshape', children: (0, l.jsx)(n.code, { children: 'thumbShape' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: "The shape and appearance of the slider's thumb." }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: string' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "default: 'ring'" }) }),
                  '\n',
                  (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: 'values:' }), (0, l.jsx)(c, {})] }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'thumbstyle', children: (0, l.jsx)(n.code, { children: 'thumbStyle' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: "Thumb's containing View's style." }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'thumbinnerstyle', children: (0, l.jsx)(n.code, { children: 'thumbInnerStyle' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: "Thumb's inner View(s) style." }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'renderthumb', children: (0, l.jsx)(n.code, { children: 'renderThumb' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      'Function which receives ',
                      (0, l.jsx)(n.code, { children: 'ThumbProps' }),
                      ' and returns a custom thumb component.',
                    ],
                  }),
                  '\n',
                  (0, l.jsxs)(n.li, { children: ['Overrides ', (0, l.jsx)(n.code, { children: 'thumbShape' })] }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, {
                id: 'thumbscaleanimationvalue',
                children: (0, l.jsx)(n.code, { children: 'thumbScaleAnimationValue' }),
              }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: 'Controls the scale value animation of the thumb when active.' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: number' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: 1.2' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, {
                id: 'thumbscaleanimationduration',
                children: (0, l.jsx)(n.code, { children: 'thumbScaleAnimationDuration' }),
              }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: 'Sets the duration of the scale animation of the thumb when active.' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: number' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: 100' }) }),
                  '\n',
                ],
              }),
              '\n',
              '\n',
              '\n',
              (0, l.jsx)(r.ZP, {}),
              '\n',
              (0, l.jsx)(n.h3, { id: 'adaptspectrum', children: (0, l.jsx)(n.code, { children: 'adaptSpectrum' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, {
                    children: 'Slider background color spectrum adapts to changes in saturation and brightness.',
                  }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: boolean' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: false' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'style', children: (0, l.jsx)(n.code, { children: 'style' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: "The style of the slider's container." }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.admonition, {
                title: 'note',
                type: 'info',
                children: (0, l.jsxs)(n.ul, {
                  children: ['\n', (0, l.jsx)(n.li, { children: 'Certain style properties will be overridden.' }), '\n'],
                }),
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'containerstyle', children: (0, l.jsx)(n.code, { children: 'containerStyle' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: 'The style of the container that wraps the given children.' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                  '\n',
                ],
              }),
            ],
          })
        );
      }
      function u(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, i) => {
      i.d(n, { ZP: () => c });
      var l = i(5893),
        t = i(1151);
      function r(e) {
        const n = {
          code: 'code',
          h3: 'h3',
          h4: 'h4',
          li: 'li',
          pre: 'pre',
          table: 'table',
          tbody: 'tbody',
          td: 'td',
          th: 'th',
          thead: 'thead',
          tr: 'tr',
          ul: 'ul',
          ...(0, t.a)(),
          ...e.components,
        };
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)(n.h3, { id: 'renderthumb', children: (0, l.jsx)(n.code, { children: 'renderThumb' }) }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'Function which receives ',
                    (0, l.jsx)(n.code, { children: 'ThumbProps' }),
                    ' and returns a custom thumb component.',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, { children: ['Overrides ', (0, l.jsx)(n.code, { children: 'thumbShape' })] }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h4, { id: 'thumbprops', children: (0, l.jsx)(n.code, { children: 'ThumbProps' }) }),
            '\n',
            (0, l.jsxs)(n.table, {
              children: [
                (0, l.jsx)(n.thead, {
                  children: (0, l.jsxs)(n.tr, {
                    children: [
                      (0, l.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Prop' }),
                      (0, l.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Type' }),
                      (0, l.jsx)(n.th, { style: { textAlign: 'left' }, children: 'Description' }),
                    ],
                  }),
                }),
                (0, l.jsxs)(n.tbody, {
                  children: [
                    (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'positionStyle' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'StyleProp' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children:
                            'This style determines the position of the thumb and is a crucial element that should be included.',
                        }),
                      ],
                    }),
                    (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.td, { style: { textAlign: 'center' }, children: (0, l.jsx)(n.code, { children: 'width' }) }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, l.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, l.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'height' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, l.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, l.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'adaptiveColor' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'White or black based on the contrast ratio.',
                        }),
                      ],
                    }),
                    (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'currentColor' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'This shared value will update whenever the color changes.',
                        }),
                      ],
                    }),
                    (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'initialColor' }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, l.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: ['The initial color value as a ', (0, l.jsx)(n.code, { children: 'string' }), '.'],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, l.jsxs)(n.ul, { children: ['\n', (0, l.jsx)(n.li, { children: 'Example Usage:' }), '\n'] }),
            '\n',
            (0, l.jsx)(n.pre, {
              children: (0, l.jsx)(n.code, {
                className: 'language-tsx',
                children:
                  "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\nimport type { RenderThumbProps } from 'reanimated-color-picker';\n\nfunction MyCustomThumb({ width, height, positionStyle, adaptiveColor, currentColor, initialColor }: RenderThumbProps) {\n  const animatedStyle = useAnimatedStyle(() => ({\n    borderColor: adaptiveColor.value,\n    backgroundColor: currentColor.value,\n  }));\n\n  return (\n    <Animated.View\n      style={[{ width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' }, animatedStyle, positionStyle]}\n    >\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\n    </Animated.View>\n  );\n}\n",
              }),
            }),
          ],
        });
      }
      function c(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(r, { ...e }) }) : r(e);
      }
    },
    2781: (e, n, i) => {
      i.d(n, { Z: () => l });
      const l = i.p + 'assets/images/LuminanceCircular-70dc877ca2fe4511bf017e519eb3a89c.png';
    },
    1151: (e, n, i) => {
      i.d(n, { Z: () => d, a: () => c });
      var l = i(7294);
      const t = {},
        r = l.createContext(t);
      function c(e) {
        const n = l.useContext(r);
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
              ? e.components(t)
              : e.components || t
            : c(e.components)),
          l.createElement(r.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
