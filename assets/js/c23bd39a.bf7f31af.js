'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [875],
  {
    8311: (e, n, l) => {
      l.r(n),
        l.d(n, {
          assets: () => h,
          contentTitle: () => r,
          default: () => u,
          frontMatter: () => d,
          metadata: () => c,
          toc: () => o,
        });
      var i = l(5893),
        t = l(1151),
        s = l(435);
      const d = {
          sidebar_position: 3,
          sidebar_label: 'Panel4',
          description: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
        },
        r = '<Panel4 />',
        c = {
          id: 'API/Panels/Panel4',
          title: '<Panel4 />',
          description: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
          source: '@site/docs/API/Panels/Panel4.mdx',
          sourceDirName: 'API/Panels',
          slug: '/API/Panels/Panel4',
          permalink: '/reanimated-color-picker/docs/API/Panels/Panel4',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 3,
          frontMatter: {
            sidebar_position: 3,
            sidebar_label: 'Panel4',
            description: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Panel3', permalink: '/reanimated-color-picker/docs/API/Panels/Panel3' },
          next: { title: 'Panel5', permalink: '/reanimated-color-picker/docs/API/Panels/Panel5' },
        },
        h = {},
        o = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>boundedThumb</code>', id: 'boundedthumb', level: 3 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>thumbScaleAnimationValue</code>', id: 'thumbscaleanimationvalue', level: 3 },
          { value: '<code>thumbScaleAnimationDuration</code>', id: 'thumbscaleanimationduration', level: 3 },
          { value: '<code>gestures</code>', id: 'gestures', level: 3 },
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
          ...(0, t.a)(),
          ...e.components,
        };
        return (0, i.jsxs)(i.Fragment, {
          children: [
            (0, i.jsx)(n.h1, { id: 'panel4-', children: (0, i.jsx)(n.code, { children: '<Panel4 />' }) }),
            '\n',
            (0, i.jsx)(n.p, { children: (0, i.jsx)(n.img, { alt: 'panel4', src: l(1923).Z + '', width: '200', height: '200' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, i.jsx)(n.p, {
                      children: 'A slider with a square shape is used to adjust the channels of hue, saturation, and brightness.',
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, i.jsx)(n.p, {
                      children: "To adjust the color's saturation and brightness, move the handle horizontally..",
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, i.jsxs)(n.li, {
                  children: ['\n', (0, i.jsx)(n.p, { children: "Move the handle vertically to change the color's hue." }), '\n'],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.admonition, {
              type: 'danger',
              children: (0, i.jsx)(n.p, {
                children:
                  'This panel cannot show all colors because it has a limited range of colors it can display. For example, if the input color has 50% saturation and 50% brightness, the panel thumb (handle) location won\u2019t be accurate because it cannot show that color. This means that the color you select may not be exactly what you see in the panel.',
              }),
            }),
            '\n',
            (0, i.jsx)(n.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'boundedthumb', children: (0, i.jsx)(n.code, { children: 'boundedThumb' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, {
                  children:
                    'Determines whether the panel slider thumb (or handle) should be constrained to stay within the boundaries of the panel.',
                }),
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, i.jsx)(n.code, { children: 'true' }),
                    ', the thumb will not be allowed to move beyond the edges of the panel.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, i.jsx)(n.code, { children: 'false' }),
                    ', part of it will be outside of the panel bounds.',
                  ],
                }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'thumbsize', children: (0, i.jsx)(n.code, { children: 'thumbSize' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: "Panel's handle (thumb) size (height*width)." }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'default: 35' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'thumbcolor', children: (0, i.jsx)(n.code, { children: 'thumbColor' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: "Change thumb's color." }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, i.jsxs)(n.li, { children: [(0, i.jsx)(n.code, { children: 'default' }), ': interactive*'] }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsxs)(n.admonition, {
              type: 'info',
              children: [
                (0, i.jsx)(n.mdxAdmonitionTitle, { children: (0, i.jsx)(n.strong, { children: '*interactive' }) }),
                (0, i.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, i.jsx)(n.li, {
                      children: 'The thumb color will be changed depending on the contrast ratio if no color value is passed.',
                    }),
                    '\n',
                  ],
                }),
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'thumbshape', children: (0, i.jsx)(n.code, { children: 'thumbShape' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: "Change thumb's shape and appearance." }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, i.jsxs)(n.li, { children: [(0, i.jsx)(n.code, { children: 'values' }), ': ', (0, i.jsx)('shapes', {})] }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: "default: 'ring'" }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'thumbstyle', children: (0, i.jsx)(n.code, { children: 'thumbStyle' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: "Thumb's containing View's style." }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'thumbinnerstyle', children: (0, i.jsx)(n.code, { children: 'thumbInnerStyle' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: "Thumb's inner View(s) style." }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, {
              id: 'thumbscaleanimationvalue',
              children: (0, i.jsx)(n.code, { children: 'thumbScaleAnimationValue' }),
            }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: 'Controls the scale value animation of the thumb when active.' }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'default: 1.2' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, {
              id: 'thumbscaleanimationduration',
              children: (0, i.jsx)(n.code, { children: 'thumbScaleAnimationDuration' }),
            }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: 'Sets the duration of the scale animation of the thumb when active.' }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'default: 100' }) }),
                '\n',
              ],
            }),
            '\n',
            '\n',
            '\n',
            (0, i.jsx)(s.ZP, {}),
            '\n',
            (0, i.jsx)(n.h3, { id: 'gestures', children: (0, i.jsx)(n.code, { children: 'gestures' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    'An array of gestures or composed gestures from ',
                    (0, i.jsx)(n.code, { children: 'react-native-gesture-handler' }),
                    '.',
                  ],
                }),
                '\n',
                (0, i.jsx)(n.li, { children: 'These gestures will run simultaneously with the color picker gestures.' }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: Gesture[]' }) }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'default: []' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'reversehue', children: (0, i.jsx)(n.code, { children: 'reverseHue' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: 'Reverse (flip) hue direction.' }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, {
              id: 'reversehorizontalchannels',
              children: (0, i.jsx)(n.code, { children: 'reverseHorizontalChannels' }),
            }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, {
                  children: "Reverse (flip) the direction of the horizontal channel's brightness and saturation..",
                }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h3, { id: 'style', children: (0, i.jsx)(n.code, { children: 'style' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsx)(n.li, { children: "Panel's container style." }),
                '\n',
                (0, i.jsx)(n.li, { children: (0, i.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.admonition, {
              title: 'note',
              type: 'info',
              children: (0, i.jsxs)(n.ul, {
                children: ['\n', (0, i.jsx)(n.li, { children: 'Certain style properties will be overridden.' }), '\n'],
              }),
            }),
          ],
        });
      }
      function u(e = {}) {
        const { wrapper: n } = { ...(0, t.a)(), ...e.components };
        return n ? (0, i.jsx)(n, { ...e, children: (0, i.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, l) => {
      l.d(n, { ZP: () => d });
      var i = l(5893),
        t = l(1151);
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
          ...(0, t.a)(),
          ...e.components,
        };
        return (0, i.jsxs)(i.Fragment, {
          children: [
            (0, i.jsx)(n.h3, { id: 'renderthumb', children: (0, i.jsx)(n.code, { children: 'renderThumb' }) }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    'Function which receives ',
                    (0, i.jsx)(n.code, { children: 'ThumbProps' }),
                    ' and returns a custom thumb component.',
                  ],
                }),
                '\n',
                (0, i.jsxs)(n.li, { children: ['Overrides ', (0, i.jsx)(n.code, { children: 'thumbShape' })] }),
                '\n',
              ],
            }),
            '\n',
            (0, i.jsx)(n.h4, { id: 'thumbprops', children: (0, i.jsx)(n.code, { children: 'ThumbProps' }) }),
            '\n',
            (0, i.jsxs)(n.table, {
              children: [
                (0, i.jsx)(n.thead, {
                  children: (0, i.jsxs)(n.tr, {
                    children: [
                      (0, i.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Prop' }),
                      (0, i.jsx)(n.th, { style: { textAlign: 'center' }, children: 'Type' }),
                      (0, i.jsx)(n.th, { style: { textAlign: 'left' }, children: 'Description' }),
                    ],
                  }),
                }),
                (0, i.jsxs)(n.tbody, {
                  children: [
                    (0, i.jsxs)(n.tr, {
                      children: [
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'positionStyle' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'StyleProp' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children:
                            'This style determines the position of the thumb and is a crucial element that should be included.',
                        }),
                      ],
                    }),
                    (0, i.jsxs)(n.tr, {
                      children: [
                        (0, i.jsx)(n.td, { style: { textAlign: 'center' }, children: (0, i.jsx)(n.code, { children: 'width' }) }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, i.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, i.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, i.jsxs)(n.tr, {
                      children: [
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'height' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'number' }),
                        }),
                        (0, i.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: [
                            'Extracted from the ',
                            (0, i.jsx)(n.code, { children: 'thumbSize' }),
                            " prop and it's important for thumb position calculation.",
                          ],
                        }),
                      ],
                    }),
                    (0, i.jsxs)(n.tr, {
                      children: [
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'adaptiveColor' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'White or black based on the contrast ratio.',
                        }),
                      ],
                    }),
                    (0, i.jsxs)(n.tr, {
                      children: [
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'currentColor' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'SharedValue<string>' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'left' },
                          children: 'This shared value will update whenever the color changes.',
                        }),
                      ],
                    }),
                    (0, i.jsxs)(n.tr, {
                      children: [
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'initialColor' }),
                        }),
                        (0, i.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, i.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, i.jsxs)(n.td, {
                          style: { textAlign: 'left' },
                          children: ['The initial color value as a ', (0, i.jsx)(n.code, { children: 'string' }), '.'],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, i.jsxs)(n.ul, { children: ['\n', (0, i.jsx)(n.li, { children: 'Example Usage:' }), '\n'] }),
            '\n',
            (0, i.jsx)(n.pre, {
              children: (0, i.jsx)(n.code, {
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
        return n ? (0, i.jsx)(n, { ...e, children: (0, i.jsx)(s, { ...e }) }) : s(e);
      }
    },
    1923: (e, n, l) => {
      l.d(n, { Z: () => i });
      const i = l.p + 'assets/images/panel4-fdad34ed193f56d62d7c09ca309bedf6.png';
    },
    1151: (e, n, l) => {
      l.d(n, { Z: () => r, a: () => d });
      var i = l(7294);
      const t = {},
        s = i.createContext(t);
      function d(e) {
        const n = i.useContext(s);
        return i.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e],
        );
      }
      function r(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(t)
              : e.components || t
            : d(e.components)),
          i.createElement(s.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
