'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [454],
  {
    8850: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => h,
          contentTitle: () => d,
          default: () => x,
          frontMatter: () => r,
          metadata: () => c,
          toc: () => o,
        });
      var l = t(5893),
        i = t(1151),
        s = t(435);
      const r = {
          sidebar_position: 1,
          sidebar_label: 'Panel2',
          description: 'A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.',
        },
        d = '<Panel2 />',
        c = {
          id: 'API/Panels/Panel2',
          title: '<Panel2 />',
          description: 'A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.',
          source: '@site/docs/API/Panels/Panel2.mdx',
          sourceDirName: 'API/Panels',
          slug: '/API/Panels/Panel2',
          permalink: '/reanimated-color-picker/docs/API/Panels/Panel2',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 1,
          frontMatter: {
            sidebar_position: 1,
            sidebar_label: 'Panel2',
            description: 'A square-shaped slider (windows style) is utilized to adjust the hue and saturation channels.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Panel1', permalink: '/reanimated-color-picker/docs/API/Panels/Panel1' },
          next: { title: 'Panel3', permalink: '/reanimated-color-picker/docs/API/Panels/Panel3' },
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
          { value: '<code>thumbScaleAnimationValue</code>', id: 'thumbscaleanimationvalue', level: 3 },
          { value: '<code>thumbScaleAnimationDuration</code>', id: 'thumbscaleanimationduration', level: 3 },
          { value: '<code>gestures</code>', id: 'gestures', level: 3 },
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
            table: 'table',
            tbody: 'tbody',
            td: 'td',
            th: 'th',
            thead: 'thead',
            tr: 'tr',
            ul: 'ul',
            ...(0, i.a)(),
            ...e.components,
          },
          { Shapes: r } = n;
        return (
          r ||
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
              (0, l.jsx)(n.h1, { id: 'panel2-', children: (0, l.jsx)(n.code, { children: '<Panel2 />' }) }),
              '\n',
              (0, l.jsxs)(n.table, {
                children: [
                  (0, l.jsx)(n.thead, {
                    children: (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.th, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.strong, { children: 'vertical channel: "saturation"' }),
                        }),
                        (0, l.jsx)(n.th, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.strong, { children: 'vertical channel: "brightness"' }),
                        }),
                        (0, l.jsx)(n.th, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.strong, { children: 'vertical channel: "hsl-saturation"' }),
                        }),
                      ],
                    }),
                  }),
                  (0, l.jsx)(n.tbody, {
                    children: (0, l.jsxs)(n.tr, {
                      children: [
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.img, {
                            alt: 'panel2-saturation',
                            src: t(6452).Z + '',
                            width: '200',
                            height: '200',
                          }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.img, {
                            alt: 'panel2-brightness',
                            src: t(9161).Z + '',
                            width: '200',
                            height: '200',
                          }),
                        }),
                        (0, l.jsx)(n.td, {
                          style: { textAlign: 'center' },
                          children: (0, l.jsx)(n.img, {
                            alt: 'panel2-hsl-saturation',
                            src: t(9536).Z + '',
                            width: '200',
                            height: '200',
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      '\n',
                      (0, l.jsx)(n.p, {
                        children:
                          'A square-shaped slider (windows style) is utilized to adjust the hue and (saturation or brightness) channels.',
                      }),
                      '\n',
                    ],
                  }),
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      '\n',
                      (0, l.jsx)(n.p, { children: "Move the thumb (handle) horizontally to change the color's hue." }),
                      '\n',
                    ],
                  }),
                  '\n',
                  (0, l.jsxs)(n.li, {
                    children: [
                      '\n',
                      (0, l.jsxs)(n.p, {
                        children: [
                          'Drag the thumb (handle) up or down to adjust either the saturation or the brightness of the color, depending on the ',
                          (0, l.jsx)(n.code, { children: 'verticalChannel' }),
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
              (0, l.jsx)(n.admonition, {
                type: 'tip',
                children: (0, l.jsxs)(n.p, {
                  children: [
                    'If you want to give your users more control over the color selection, you can add another slider next to ',
                    (0, l.jsx)(n.code, { children: 'Panel2' }),
                    ' that adjusts the opposite channel. For example, if ',
                    (0, l.jsx)(n.code, { children: 'verticalChannel' }),
                    ' is ',
                    (0, l.jsx)(n.code, { children: '"saturation"' }),
                    ', you can add a ',
                    (0, l.jsx)(n.a, {
                      href: '../Sliders/HSB/BrightnessSlider',
                      children: (0, l.jsx)(n.code, { children: '<BrightnessSlider />' }),
                    }),
                    ', and vice versa.',
                  ],
                }),
              }),
              '\n',
              (0, l.jsx)(n.h2, { id: 'props', children: 'Props' }),
              '\n',
              (0, l.jsx)(n.h3, { id: 'verticalchannel', children: (0, l.jsx)(n.code, { children: 'verticalChannel' }) }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, {
                    children: 'Determines which color channel to adjust when moving the thumb vertically on the slider.',
                  }),
                  '\n',
                  (0, l.jsx)(n.li, {
                    children: (0, l.jsx)(n.code, { children: 'type: "saturation" | "brightness" | "hsl-saturation"' }),
                  }),
                  '\n',
                  (0, l.jsx)(n.li, { children: (0, l.jsx)(n.code, { children: 'default: "saturation"' }) }),
                  '\n',
                ],
              }),
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
                  (0, l.jsxs)(n.li, { children: [(0, l.jsx)(n.code, { children: 'values' }), ': ', (0, l.jsx)(r, {})] }),
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
              (0, l.jsx)(s.ZP, {}),
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
                id: 'reverseverticalchannel',
                children: (0, l.jsx)(n.code, { children: 'reverseVerticalChannel' }),
              }),
              '\n',
              (0, l.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, l.jsx)(n.li, {
                    children: "Reverse (flip) the direction of the vertical channel's saturation or brightness.",
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
          })
        );
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
                  "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\nimport type { RenderThumbProps } from 'reanimated-color-picker';\n\nfunction MyCustomThumb({ width, height, positionStyle, adaptiveColor, currentColor, initialColor }: RenderThumbProps) {\n  const animatedStyle = useAnimatedStyle(() => ({\n    borderColor: adaptiveColor.value,\n    backgroundColor: currentColor.value,\n  }));\n\n  return (\n    <Animated.View\n      style={[{ width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' }, animatedStyle, positionStyle]}\n    >\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\n    </Animated.View>\n  );\n}\n",
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
    9161: (e, n, t) => {
      t.d(n, { Z: () => l });
      const l = t.p + 'assets/images/panel2-brightness-389d07bf3f673e64e02a6b9d52f36e59.png';
    },
    9536: (e, n, t) => {
      t.d(n, { Z: () => l });
      const l = t.p + 'assets/images/panel2-hsl-saturation-c1190fbd46bfd8ff0bdf4bc45be99a8f.png';
    },
    6452: (e, n, t) => {
      t.d(n, { Z: () => l });
      const l = t.p + 'assets/images/panel2-saturation-bc20014dcc48696ed58273d705b447c4.png';
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
          [n, e],
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
