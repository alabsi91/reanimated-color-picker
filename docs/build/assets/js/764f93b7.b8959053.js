'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [446],
  {
    7150: (e, n, l) => {
      l.r(n),
        l.d(n, {
          assets: () => h,
          contentTitle: () => d,
          default: () => x,
          frontMatter: () => s,
          metadata: () => c,
          toc: () => o,
        });
      var t = l(5893),
        i = l(1151),
        r = l(435);
      const s = {
          sidebar_position: 11,
          sidebar_label: 'Panel2',
          description: 'A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.',
        },
        d = '<Panel2 />',
        c = {
          id: 'API/Panel2',
          title: '<Panel2 />',
          description: 'A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.',
          source: '@site/docs/API/Panel2.mdx',
          sourceDirName: 'API',
          slug: '/API/Panel2',
          permalink: '/reanimated-color-picker/docs/API/Panel2',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 11,
          frontMatter: {
            sidebar_position: 11,
            sidebar_label: 'Panel2',
            description: 'A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Panel1', permalink: '/reanimated-color-picker/docs/API/Panel1' },
          next: { title: 'Panel3', permalink: '/reanimated-color-picker/docs/API/Panel3' },
        },
        h = {},
        o = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>verticalChannel</code>', id: 'verticalchannel', level: 3 },
          { value: '<code>boundedThumb</code>', id: 'boundedthumb', level: 3 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>adaptSpectrum</code>', id: 'adaptspectrum', level: 3 },
          { value: '<code>reverseHue</code>', id: 'reversehue', level: 3 },
          { value: '<code>reverseVerticalChannel</code>', id: 'reverseverticalchannel', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
        ];
      function a(e) {
        const n = {
          a: 'a',
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
          ...(0, i.a)(),
          ...e.components,
        };
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(n.h1, { id: 'panel2-', children: (0, t.jsx)(n.code, { children: '<Panel2 />' }) }),
            '\n',
            (0, t.jsxs)(n.p, {
              children: [
                (0, t.jsx)(n.img, { alt: 'panel2panel2-saturation', src: l(9265).Z + '', width: '200', height: '200' }),
                ' < or > ',
                (0, t.jsx)(n.img, { alt: 'panel2panel2-brightness', src: l(6205).Z + '', width: '200', height: '200' }),
              ],
            }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, t.jsx)(n.p, {
                      children:
                        'A square-shaped slider (windows style) is utilized to adjust the hue and (saturation or brightness) channels.',
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, t.jsx)(n.p, { children: "Move the thumb (handle) horizontally to change the color's hue." }),
                    '\n',
                  ],
                }),
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, t.jsxs)(n.p, {
                      children: [
                        'Drag the thumb (handle) up or down to adjust either the saturation or the brightness of the color, depending on the ',
                        (0, t.jsx)(n.code, { children: 'verticalChannel' }),
                        ' prop.',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.admonition, {
              type: 'tip',
              children: (0, t.jsxs)(n.p, {
                children: [
                  'If you want to give your users more control over the color selection, you can add another slider next to ',
                  (0, t.jsx)(n.code, { children: 'Panel2' }),
                  ' that adjusts the opposite channel. For example, if ',
                  (0, t.jsx)(n.code, { children: 'verticalChannel' }),
                  ' is ',
                  (0, t.jsx)(n.code, { children: '"saturation"' }),
                  ', you can add a ',
                  (0, t.jsx)(n.a, {
                    href: './BrightnessSlider',
                    children: (0, t.jsx)(n.code, { children: '<BrightnessSlider />' }),
                  }),
                  ', and vice versa.',
                ],
              }),
            }),
            '\n',
            (0, t.jsx)(n.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'verticalchannel', children: (0, t.jsx)(n.code, { children: 'verticalChannel' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, {
                  children: 'Determines which color channel to adjust when moving the thumb vertically on the slider.',
                }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: "saturation" | "brightness"' }) }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'default: "saturation"' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'boundedthumb', children: (0, t.jsx)(n.code, { children: 'boundedThumb' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, {
                  children:
                    'Determines whether the panel slider thumb (or handle) should be constrained to stay within the boundaries of the panel.',
                }),
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, t.jsx)(n.code, { children: 'true' }),
                    ', the thumb will not be allowed to move beyond the edges of the panel.',
                  ],
                }),
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, t.jsx)(n.code, { children: 'false' }),
                    ', part of it will be outside of the panel bounds.',
                  ],
                }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'thumbsize', children: (0, t.jsx)(n.code, { children: 'thumbSize' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, { children: "Panel's handle (thumb) size (height*width)." }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'default: 35' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'thumbcolor', children: (0, t.jsx)(n.code, { children: 'thumbColor' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, { children: "Change thumb's color." }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, t.jsxs)(n.li, { children: [(0, t.jsx)(n.code, { children: 'default' }), ': interactive*'] }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsxs)(n.admonition, {
              type: 'info',
              children: [
                (0, t.jsx)(n.mdxAdmonitionTitle, { children: (0, t.jsx)(n.strong, { children: '*interactive' }) }),
                (0, t.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, t.jsx)(n.li, {
                      children: 'The thumb color will be changed depending on the contrast ratio if no color value is passed.',
                    }),
                    '\n',
                  ],
                }),
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'thumbshape', children: (0, t.jsx)(n.code, { children: 'thumbShape' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, { children: "Change thumb's shape and appearance." }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, t.jsxs)(n.li, { children: [(0, t.jsx)(n.code, { children: 'values' }), ': ', (0, t.jsx)('shapes', {})] }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: "default: 'ring'" }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'thumbstyle', children: (0, t.jsx)(n.code, { children: 'thumbStyle' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, { children: "Thumb's containing View's style." }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'thumbinnerstyle', children: (0, t.jsx)(n.code, { children: 'thumbInnerStyle' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, { children: "Thumb's inner View(s) style." }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            '\n',
            '\n',
            (0, t.jsx)(r.ZP, {}),
            '\n',
            (0, t.jsx)(n.h3, { id: 'adaptspectrum', children: (0, t.jsx)(n.code, { children: 'adaptSpectrum' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, {
                  children: 'Slider background color spectrum adapts to changes in saturation and brightness.',
                }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'reversehue', children: (0, t.jsx)(n.code, { children: 'reverseHue' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, { children: 'Reverse (flip) hue direction.' }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, {
              id: 'reverseverticalchannel',
              children: (0, t.jsx)(n.code, { children: 'reverseVerticalChannel' }),
            }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, {
                  children: "Reverse (flip) the direction of the vertical channel's saturation or brightness.",
                }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h3, { id: 'style', children: (0, t.jsx)(n.code, { children: 'style' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsx)(n.li, { children: "Panel's container style." }),
                '\n',
                (0, t.jsx)(n.li, { children: (0, t.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.admonition, {
              title: 'note',
              type: 'info',
              children: (0, t.jsxs)(n.ul, {
                children: ['\n', (0, t.jsx)(n.li, { children: 'Certain style properties will be overridden.' }), '\n'],
              }),
            }),
          ],
        });
      }
      function x(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, l) => {
      l.d(n, { ZP: () => s });
      var t = l(5893),
        i = l(1151);
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
          ...(0, i.a)(),
          ...e.components,
        };
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(n.h3, { id: 'renderthumb', children: (0, t.jsx)(n.code, { children: 'renderThumb' }) }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    'Function which receives ',
                    (0, t.jsx)(n.code, { children: 'ThumbProps' }),
                    ' and returns a custom thumb component.',
                  ],
                }),
                '\n',
                (0, t.jsxs)(n.li, { children: ['Overrides ', (0, t.jsx)(n.code, { children: 'thumbShape' })] }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsx)(n.h4, { id: 'thumbprops', children: (0, t.jsx)(n.code, { children: 'ThumbProps' }) }),
            '\n',
            (0, t.jsxs)(n.table, {
              children: [
                (0, t.jsx)(n.thead, {
                  children: (0, t.jsxs)(n.tr, {
                    children: [
                      (0, t.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Prop' }),
                      (0, t.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Type' }),
                      (0, t.jsx)(n.th, { style: { textAlign: 'left' }, children: 'Description' }),
                    ],
                  }),
                }),
                (0, t.jsxs)(n.tbody, {
                  children: [
                    (0, t.jsxs)(n.tr, {
                      children: [
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'positionStyle' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'StyleProp' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children:
                            'This style determines the position of the thumb and is a crucial element that should be included.',
                        }),
                      ],
                    }),
                    (0, t.jsxs)(n.tr, {
                      children: [
                        (0, t.jsx)(n.td, { style: { textAlign: 'center' }, children: (0, t.jsx)(n.code, { children: 'width' }) }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, t.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, t.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsxs)(n.tr, {
                      children: [
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'height' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, t.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, t.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsxs)(n.tr, {
                      children: [
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'adaptiveColor' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'White or black based on the contrast ratio.',
                        }),
                      ],
                    }),
                    (0, t.jsxs)(n.tr, {
                      children: [
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'currentColor' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'This shared value will update whenever the color changes.',
                        }),
                      ],
                    }),
                    (0, t.jsxs)(n.tr, {
                      children: [
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'initialColor' }),
                        }),
                        (0, t.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, t.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, t.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: ['The initial color value as a ', (0, t.jsx)(n.code, { children: 'string' }), '.'],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, t.jsxs)(n.ul, { children: ['\n', (0, t.jsx)(n.li, { children: 'Example Usage:' }), '\n'] }),
            '\n',
            (0, t.jsx)(n.pre, {
              children: (0, t.jsx)(n.code, {
                className: 'language-tsx',
                children:
                  "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\r\nimport type { RenderThumbProps } from 'reanimated-color-picker';\r\n\r\nfunction MyCustomThumb({\r\n  width,\r\n  height,\r\n  positionStyle,\r\n  adaptiveColor,\r\n  currentColor,\r\n  initialColor,\r\n}: RenderThumbProps) {\r\n\r\n  const animatedStyle = useAnimatedStyle(() => ({\r\n    borderColor: adaptiveColor.value,\r\n    backgroundColor: currentColor.value,\r\n  }));\r\n\r\n  return (\r\n    <Animated.View\r\n      style={[\r\n        { width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' },\r\n        animatedStyle,\r\n        positionStyle,\r\n        ]}\r\n    >\r\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\r\n    </Animated.View>\r\n  );\r\n}\n",
              }),
            }),
          ],
        });
      }
      function s(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(r, { ...e }) }) : r(e);
      }
    },
    6205: (e, n, l) => {
      l.d(n, { Z: () => t });
      const t = l.p + 'assets/images/panel2-brightness-389d07bf3f673e64e02a6b9d52f36e59.png';
    },
    9265: (e, n, l) => {
      l.d(n, { Z: () => t });
      const t = l.p + 'assets/images/panel2-saturation-bc20014dcc48696ed58273d705b447c4.png';
    },
    1151: (e, n, l) => {
      l.d(n, { Z: () => d, a: () => s });
      var t = l(7294);
      const i = {},
        r = t.createContext(i);
      function s(e) {
        const n = t.useContext(r);
        return t.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e]
        );
      }
      function d(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(i)
              : e.components || i
            : s(e.components)),
          t.createElement(r.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
