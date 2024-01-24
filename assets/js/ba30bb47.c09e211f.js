'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [387],
  {
    8667: (e, n, i) => {
      i.r(n),
        i.d(n, {
          assets: () => h,
          contentTitle: () => s,
          default: () => j,
          frontMatter: () => d,
          metadata: () => c,
          toc: () => o,
        });
      var l = i(5893),
        t = i(1151),
        r = i(51);
      const d = {
          sidebar_position: 1,
          sidebar_label: 'LuminanceSlider',
          description: 'A slider for adjusting the color luminance channel in the HSL color space.',
        },
        s = '<LuminanceSlider />',
        c = {
          id: 'API/Sliders/HSL/LuminanceSlider',
          title: '<LuminanceSlider />',
          description: 'A slider for adjusting the color luminance channel in the HSL color space.',
          source: '@site/docs/API/Sliders/HSL/LuminanceSlider.mdx',
          sourceDirName: 'API/Sliders/HSL',
          slug: '/API/Sliders/HSL/LuminanceSlider',
          permalink: '/reanimated-color-picker/docs/API/Sliders/HSL/LuminanceSlider',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 1,
          frontMatter: {
            sidebar_position: 1,
            sidebar_label: 'LuminanceSlider',
            description: 'A slider for adjusting the color luminance channel in the HSL color space.',
          },
          sidebar: 'tutorialSidebar',
          previous: {
            title: 'HSLSaturationSlider',
            permalink: '/reanimated-color-picker/docs/API/Sliders/HSL/HSLSaturationSlider',
          },
          next: { title: 'LuminanceCircular', permalink: '/reanimated-color-picker/docs/API/Sliders/HSL/LuminanceCircular' },
        },
        h = {},
        o = [
          {
            value: 'A slider for adjusting the color luminance channel in the HSL color space.',
            id: 'a-slider-for-adjusting-the-color-luminance-channel-in-the-hsl-color-space',
            level: 3,
          },
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>adaptSpectrum</code>', id: 'adaptspectrum', level: 3 },
        ];
      function a(e) {
        const n = {
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          img: 'img',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, t.a)(),
          ...e.components,
        };
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)(n.h1, { id: 'luminanceslider-', children: (0, l.jsx)(n.code, { children: '<LuminanceSlider />' }) }),
            '\n',
            (0, l.jsx)(n.p, {
              children: (0, l.jsx)(n.img, { alt: 'luminance', src: i(3346).Z + '', width: '256', height: '40' }),
            }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.h3, {
                      id: 'a-slider-for-adjusting-the-color-luminance-channel-in-the-hsl-color-space',
                      children: 'A slider for adjusting the color luminance channel in the HSL color space.',
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
            '\n',
            '\n',
            (0, l.jsx)(r.ZP, {}),
          ],
        });
      }
      function j(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, i) => {
      i.d(n, { ZP: () => d });
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
      function d(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(r, { ...e }) }) : r(e);
      }
    },
    51: (e, n, i) => {
      i.d(n, { ZP: () => s });
      var l = i(5893),
        t = i(1151),
        r = i(435);
      function d(e) {
        const n = {
            admonition: 'admonition',
            code: 'code',
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
          { Shapes: d } = n;
        return (
          d ||
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
              (0, l.jsx)(n.h3, { id: 'boundedthumb', children: (0, l.jsx)(n.code, { children: 'boundedThumb' }) }),
              '\n',
              (0, l.jsx)(n.p, {
                children: (0, l.jsx)(n.img, { alt: 'boundedThumb', src: i(2737).Z + '', width: '180', height: '130' }),
              }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, {
                    children:
                      'Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.',
                  }),
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      'When set to ',
                      (0, l.jsx)(n.code, { children: 'true' }),
                      ', the thumb will not be allowed to move beyond the edges of the slider.',
                    ],
                  }),
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      'When set to ',
                      (0, l.jsx)(n.code, { children: 'false' }),
                      ', part of it will be outside of the slider bounds.',
                    ],
                  }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: boolean' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: false' }) }),
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
                  (0, l.jsxs)(n.li, {
                    children: [
                      'The thickness is the ',
                      (0, l.jsx)(n.code, { children: 'width' }),
                      ' of the slider in ',
                      (0, l.jsx)(n.code, { children: 'vertical' }),
                      ' mode or the ',
                      (0, l.jsx)(n.code, { children: 'height' }),
                      ' in ',
                      (0, l.jsx)(n.code, { children: 'horizontal' }),
                      ' mode.',
                    ],
                  }),
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
                  (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: 'values:' }), (0, l.jsx)(d, {})] }),
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
              (0, l.jsx)(n.h3, { id: 'reverse', children: (0, l.jsx)(n.code, { children: 'reverse' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: 'Reverse the slider direction.' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: boolean' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: false' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'vertical', children: (0, l.jsx)(n.code, { children: 'vertical' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, { children: 'Change the slider orientation.' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: boolean' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: false' }) }),
                  '\n',
                ],
              }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'gestures', children: (0, l.jsx)(n.code, { children: 'gestures' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      'An array of gestures or composed gestures from ',
                      (0, l.jsx)(n.code, { children: 'react-native-gesture-handler' }),
                      '.',
                    ],
                  }),
                  '\n',
                  (0, l.jsx)(n.li, { children: 'These gestures will run simultaneously with the color picker gestures.' }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: Gesture[]' }) }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: []' }) }),
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
            ],
          })
        );
      }
      function s(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(d, { ...e }) }) : d(e);
      }
    },
    2737: (e, n, i) => {
      i.d(n, { Z: () => l });
      const l =
        'data:image/png;base64,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';
    },
    3346: (e, n, i) => {
      i.d(n, { Z: () => l });
      const l =
        'data:image/png;base64,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';
    },
    1151: (e, n, i) => {
      i.d(n, { Z: () => s, a: () => d });
      var l = i(7294);
      const t = {},
        r = l.createContext(t);
      function d(e) {
        const n = l.useContext(r);
        return l.useMemo(
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
            : d(e.components)),
          l.createElement(r.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
