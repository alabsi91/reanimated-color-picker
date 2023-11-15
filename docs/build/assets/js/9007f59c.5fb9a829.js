'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [257],
  {
    5599: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => c,
          contentTitle: () => d,
          default: () => x,
          frontMatter: () => r,
          metadata: () => h,
          toc: () => o,
        });
      var l = t(5893),
        i = t(1151),
        s = t(435);
      const r = {
          sidebar_position: 13,
          sidebar_label: 'Panel4',
          description: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
        },
        d = '<Panel4 />',
        h = {
          id: 'API/Panel4',
          title: '<Panel4 />',
          description: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
          source: '@site/docs/API/Panel4.mdx',
          sourceDirName: 'API',
          slug: '/API/Panel4',
          permalink: '/reanimated-color-picker/docs/API/Panel4',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 13,
          frontMatter: {
            sidebar_position: 13,
            sidebar_label: 'Panel4',
            description: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Panel3', permalink: '/reanimated-color-picker/docs/API/Panel3' },
          next: { title: 'Panel5', permalink: '/reanimated-color-picker/docs/API/Panel5' },
        },
        c = {},
        o = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>boundedThumb</code>', id: 'boundedthumb', level: 3 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>reverseHue</code>', id: 'reversehue', level: 3 },
          { value: '<code>reverseHorizontalChannels</code>', id: 'reversehorizontalchannels', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
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
          ...(0, i.a)(),
          ...e.components,
        };
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)(n.h1, { id: 'panel4-', children: (0, l.jsx)(n.code, { children: '<Panel4 />' }) }),
            '\n',
            (0, l.jsx)(n.p, { children: (0, l.jsx)(n.img, { alt: 'panel4', src: t(1923).Z + '', width: '200', height: '200' }) }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(n.p, {
                      children: "To adjust the color's saturation and brightness, move the handle horizontally..",
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: ['\n', (0, l.jsx)(n.p, { children: "Move the handle vertically to change the color's hue." }), '\n'],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.admonition, {
              type: 'danger',
              children: (0, l.jsx)(n.p, {
                children:
                  'This panel cannot show all colors because it has a limited range of colors it can display. For example, if the input color has 50% saturation and 50% brightness, the panel thumb (handle) location won\u2019t be accurate because it cannot show that color. This means that the color you select may not be exactly what you see in the panel.',
              }),
            }),
            '\n',
            (0, l.jsx)(n.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'boundedthumb', children: (0, l.jsx)(n.code, { children: 'boundedThumb' }) }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, {
                  children:
                    'Determines whether the panel slider thumb (or handle) should be constrained to stay within the boundaries of the panel.',
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, l.jsx)(n.code, { children: 'true' }),
                    ', the thumb will not be allowed to move beyond the edges of the panel.',
                  ],
                }),
                '\n',
                (0, l.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, l.jsx)(n.code, { children: 'false' }),
                    ', part of it will be outside of the panel bounds.',
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
                (0, l.jsx)(n.li, { children: "Panel's handle (thumb) size (height*width)." }),
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
                (0, l.jsx)(n.li, { children: "Change thumb's color." }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: 'default' }), ': interactive*'] }),
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
                      children: 'The thumb color will be changed depending on the contrast ratio if no color value is passed.',
                    }),
                    '\n',
                  ],
                }),
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, { id: 'thumbshape', children: (0, l.jsx)(n.code, { children: 'thumbShape' }) }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: "Change thumb's shape and appearance." }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: 'values' }), ': ', (0, l.jsx)('shapes', {})] }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: "default: 'ring'" }) }),
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
            '\n',
            '\n',
            (0, l.jsx)(s.ZP, {}),
            '\n',
            (0, l.jsx)(n.h3, { id: 'reversehue', children: (0, l.jsx)(n.code, { children: 'reverseHue' }) }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, { children: 'Reverse (flip) hue direction.' }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsx)(n.h3, {
              id: 'reversehorizontalchannels',
              children: (0, l.jsx)(n.code, { children: 'reverseHorizontalChannels' }),
            }),
            '\n',
            (0, l.jsxs)(n.ul, {
              children: [
                '\n',
                (0, l.jsx)(n.li, {
                  children: "Reverse (flip) the direction of the horizontal channel's brightness and saturation..",
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
                (0, l.jsx)(n.li, { children: "Panel's container style." }),
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
        });
      }
      function x(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, t) => {
      t.d(n, { ZP: () => r });
      var l = t(5893),
        i = t(1151);
      function s(e) {
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
                  "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\r\nimport type { RenderThumbProps } from 'reanimated-color-picker';\r\n\r\nfunction MyCustomThumb({ width, height, positionStyle, adaptiveColor, currentColor, initialColor }: RenderThumbProps) {\r\n  const animatedStyle = useAnimatedStyle(() => ({\r\n    borderColor: adaptiveColor.value,\r\n    backgroundColor: currentColor.value,\r\n  }));\r\n\r\n  return (\r\n    <Animated.View\r\n      style={[{ width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' }, animatedStyle, positionStyle]}\r\n    >\r\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\r\n    </Animated.View>\r\n  );\r\n}\n",
              }),
            }),
          ],
        });
      }
      function r(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, l.jsx)(n, { ...e, children: (0, l.jsx)(s, { ...e }) }) : s(e);
      }
    },
    1923: (e, n, t) => {
      t.d(n, { Z: () => l });
      const l = t.p + 'assets/images/panel4-fdad34ed193f56d62d7c09ca309bedf6.png';
    },
    1151: (e, n, t) => {
      t.d(n, { Z: () => d, a: () => r });
      var l = t(7294);
      const i = {},
        s = l.createContext(i);
      function r(e) {
        const n = l.useContext(s);
        return l.useMemo(
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
            : r(e.components)),
          l.createElement(s.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
