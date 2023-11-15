'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [617],
  {
    1136: (e, n, i) => {
      i.r(n),
        i.d(n, {
          assets: () => h,
          contentTitle: () => s,
          default: () => u,
          frontMatter: () => d,
          metadata: () => c,
          toc: () => o,
        });
      var r = i(5893),
        t = i(1151),
        l = i(435);
      const d = { sidebar_position: 9, sidebar_label: 'HueCircular', description: "A slider to change the color's opacity." },
        s = '<HueCircular />',
        c = {
          id: 'API/HueCircular',
          title: '<HueCircular />',
          description: "A slider to change the color's opacity.",
          source: '@site/docs/API/HueCircular.mdx',
          sourceDirName: 'API',
          slug: '/API/HueCircular',
          permalink: '/reanimated-color-picker/docs/API/HueCircular',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 9,
          frontMatter: {
            sidebar_position: 9,
            sidebar_label: 'HueCircular',
            description: "A slider to change the color's opacity.",
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'BlueSlider', permalink: '/reanimated-color-picker/docs/API/BlueSlider' },
          next: { title: 'Panel1', permalink: '/reanimated-color-picker/docs/API/Panel1' },
        },
        h = {},
        o = [
          {
            value: 'A circular slider to change the color&#39;s hue.',
            id: 'a-circular-slider-to-change-the-colors-hue',
            level: 3,
          },
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>sliderThickness</code>', id: 'sliderthickness', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>renderThumb</code>', id: 'renderthumb', level: 3 },
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
        };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(n.h1, { id: 'huecircular-', children: (0, r.jsx)(n.code, { children: '<HueCircular />' }) }),
            '\n',
            (0, r.jsx)(n.p, {
              children: (0, r.jsx)(n.img, { alt: 'HueCircular', src: i(1759).Z + '', width: '200', height: '200' }),
            }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, r.jsx)(n.h3, {
                      id: 'a-circular-slider-to-change-the-colors-hue',
                      children: "A circular slider to change the color's hue.",
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'thumbsize', children: (0, r.jsx)(n.code, { children: 'thumbSize' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: "The size of the slider's thumb." }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: 35' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'thumbcolor', children: (0, r.jsx)(n.code, { children: 'thumbColor' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: "The color of the slider's thumb." }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: interactive*' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsxs)(n.admonition, {
              type: 'info',
              children: [
                (0, r.jsx)(n.mdxAdmonitionTitle, { children: (0, r.jsx)(n.strong, { children: '*interactive' }) }),
                (0, r.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, r.jsx)(n.li, {
                      children:
                        'The color of the thumb will be adjusted according to the contrast ratio, in the absence of a specific color value.',
                    }),
                    '\n',
                  ],
                }),
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'sliderthickness', children: (0, r.jsx)(n.code, { children: 'sliderThickness' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: 'The thickness of the slider.' }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: 25' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'thumbshape', children: (0, r.jsx)(n.code, { children: 'thumbShape' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: "The shape and appearance of the slider's thumb." }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: "default: 'ring'" }) }),
                '\n',
                (0, r.jsxs)(n.li, { children: [(0, r.jsx)(n.code, { children: 'values:' }), (0, r.jsx)('shapes', {})] }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'thumbstyle', children: (0, r.jsx)(n.code, { children: 'thumbStyle' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: "Thumb's containing View's style." }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'thumbinnerstyle', children: (0, r.jsx)(n.code, { children: 'thumbInnerStyle' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: "Thumb's inner View(s) style." }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'renderthumb', children: (0, r.jsx)(n.code, { children: 'renderThumb' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'Function which receives ',
                    (0, r.jsx)(n.code, { children: 'ThumbProps' }),
                    ' and returns a custom thumb component.',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, { children: ['Overrides ', (0, r.jsx)(n.code, { children: 'thumbShape' })] }),
                '\n',
              ],
            }),
            '\n',
            '\n',
            '\n',
            (0, r.jsx)(l.ZP, {}),
            '\n',
            (0, r.jsx)(n.h3, { id: 'adaptspectrum', children: (0, r.jsx)(n.code, { children: 'adaptSpectrum' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, {
                  children: 'Slider background color spectrum adapts to changes in saturation and brightness.',
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'style', children: (0, r.jsx)(n.code, { children: 'style' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: "The style of the slider's container." }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.admonition, {
              title: 'note',
              type: 'info',
              children: (0, r.jsxs)(n.ul, {
                children: ['\n', (0, r.jsx)(n.li, { children: 'Certain style properties will be overridden.' }), '\n'],
              }),
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'containerstyle', children: (0, r.jsx)(n.code, { children: 'containerStyle' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: 'The style of the container that wraps the given children.' }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
          ],
        });
      }
      function u(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, r.jsx)(n, { ...e, children: (0, r.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, i) => {
      i.d(n, { ZP: () => d });
      var r = i(5893),
        t = i(1151);
      function l(e) {
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
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(n.h3, { id: 'renderthumb', children: (0, r.jsx)(n.code, { children: 'renderThumb' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'Function which receives ',
                    (0, r.jsx)(n.code, { children: 'ThumbProps' }),
                    ' and returns a custom thumb component.',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, { children: ['Overrides ', (0, r.jsx)(n.code, { children: 'thumbShape' })] }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h4, { id: 'thumbprops', children: (0, r.jsx)(n.code, { children: 'ThumbProps' }) }),
            '\n',
            (0, r.jsxs)(n.table, {
              children: [
                (0, r.jsx)(n.thead, {
                  children: (0, r.jsxs)(n.tr, {
                    children: [
                      (0, r.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Prop' }),
                      (0, r.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Type' }),
                      (0, r.jsx)(n.th, { style: { textAlign: 'left' }, children: 'Description' }),
                    ],
                  }),
                }),
                (0, r.jsxs)(n.tbody, {
                  children: [
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'positionStyle' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'StyleProp' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children:
                            'This style determines the position of the thumb and is a crucial element that should be included.',
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, { style: { textAlign: 'center' }, children: (0, r.jsx)(n.code, { children: 'width' }) }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, r.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, r.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'height' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, r.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, r.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'adaptiveColor' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'White or black based on the contrast ratio.',
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'currentColor' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'This shared value will update whenever the color changes.',
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'initialColor' }),
                        }),
                        (0, r.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, r.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, r.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: ['The initial color value as a ', (0, r.jsx)(n.code, { children: 'string' }), '.'],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, r.jsxs)(n.ul, { children: ['\n', (0, r.jsx)(n.li, { children: 'Example Usage:' }), '\n'] }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-tsx',
                children:
                  "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\r\nimport type { RenderThumbProps } from 'reanimated-color-picker';\r\n\r\nfunction MyCustomThumb({\r\n  width,\r\n  height,\r\n  positionStyle,\r\n  adaptiveColor,\r\n  currentColor,\r\n  initialColor,\r\n}: RenderThumbProps) {\r\n\r\n  const animatedStyle = useAnimatedStyle(() => ({\r\n    borderColor: adaptiveColor.value,\r\n    backgroundColor: currentColor.value,\r\n  }));\r\n\r\n  return (\r\n    <Animated.View\r\n      style={[\r\n        { width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' },\r\n        animatedStyle,\r\n        positionStyle,\r\n        ]}\r\n    >\r\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\r\n    </Animated.View>\r\n  );\r\n}\n",
              }),
            }),
          ],
        });
      }
      function d(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, r.jsx)(n, { ...e, children: (0, r.jsx)(l, { ...e }) }) : l(e);
      }
    },
    1759: (e, n, i) => {
      i.d(n, { Z: () => r });
      const r = i.p + 'assets/images/HueCircular-3b05147e1c8a1622bff99e7baa3db115.png';
    },
    1151: (e, n, i) => {
      i.d(n, { Z: () => s, a: () => d });
      var r = i(7294);
      const t = {},
        l = r.createContext(t);
      function d(e) {
        const n = r.useContext(l);
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e]
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
          r.createElement(l.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
