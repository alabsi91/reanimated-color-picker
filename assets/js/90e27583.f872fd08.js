'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [839],
  {
    5692: (e, n, r) => {
      r.r(n),
        r.d(n, {
          assets: () => d,
          contentTitle: () => c,
          default: () => x,
          frontMatter: () => l,
          metadata: () => o,
          toc: () => h,
        });
      var t = r(5893),
        i = r(1151),
        s = r(435);
      const l = {
          sidebar_position: 19,
          sidebar_label: 'ExtraThumb',
          description: 'Adds an extra thumb to the Panel3 component.',
        },
        c = '<ExtraThumb />',
        o = {
          id: 'API/Preview/ExtraThumb',
          title: '<ExtraThumb />',
          description: 'Adds an extra thumb to the Panel3 component.',
          source: '@site/docs/API/Preview/ExtraThumb.mdx',
          sourceDirName: 'API/Preview',
          slug: '/API/Preview/ExtraThumb',
          permalink: '/reanimated-color-picker/docs/API/Preview/ExtraThumb',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 19,
          frontMatter: {
            sidebar_position: 19,
            sidebar_label: 'ExtraThumb',
            description: 'Adds an extra thumb to the Panel3 component.',
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Swatches', permalink: '/reanimated-color-picker/docs/API/Preview/Swatches' },
          next: { title: 'ColorKit', permalink: '/reanimated-color-picker/docs/ColorKit' },
        },
        d = {},
        h = [
          { value: 'Usage', id: 'usage', level: 2 },
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>colorTransform</code>', id: 'colortransform', level: 3 },
          { value: '<code>hueTransform</code>', id: 'huetransform', level: 3 },
          { value: '<code>saturationTransform</code>', id: 'saturationtransform', level: 3 },
          { value: '<code>brightnessTransform</code>', id: 'brightnesstransform', level: 3 },
          { value: '<code>onChange</code>', id: 'onchange', level: 3 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>renderCenterLine</code>', id: 'rendercenterline', level: 3 },
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
            p: 'p',
            pre: 'pre',
            strong: 'strong',
            ul: 'ul',
            ...(0, i.a)(),
            ...e.components,
          },
          { Shapes: l } = n;
        return (
          l ||
            (function (e, n) {
              throw new Error(
                'Expected ' +
                  (n ? 'component' : 'object') +
                  ' `' +
                  e +
                  '` to be defined: you likely forgot to import, pass, or provide it.',
              );
            })('Shapes', !0),
          (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsx)(n.h1, { id: 'extrathumb-', children: (0, t.jsx)(n.code, { children: '<ExtraThumb />' }) }),
              '\n',
              (0, t.jsx)(n.p, {
                children: (0, t.jsx)(n.img, { alt: 'panel3-extraThumbs', src: r(3955).Z + '', width: '318', height: '318' }),
              }),
              '\n',
              (0, t.jsxs)(n.p, {
                children: ['Adds an extra thumb to the ', (0, t.jsx)(n.code, { children: 'Panel3' }), ' component.'],
              }),
              '\n',
              (0, t.jsx)(n.admonition, {
                title: 'Note',
                type: 'info',
                children: (0, t.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, t.jsxs)(n.li, {
                      children: [
                        'This component is used exclusively in the ',
                        (0, t.jsx)(n.code, { children: 'Panel3' }),
                        ' component.',
                      ],
                    }),
                    '\n',
                    (0, t.jsx)(n.li, {
                      children: 'It serves as an indicator for the desired color and does not respond to any gestures.',
                    }),
                    '\n',
                  ],
                }),
              }),
              '\n',
              (0, t.jsx)(n.h2, { id: 'usage', children: 'Usage' }),
              '\n',
              (0, t.jsx)(n.pre, {
                children: (0, t.jsx)(n.code, {
                  className: 'language-jsx',
                  children:
                    "<Panel3 style={styles.panelStyle} renderCenterLine adaptSpectrum>\n  <ExtraThumb thumbShape='circle' hueTransform={120} />\n  <ExtraThumb thumbShape='circle' hueTransform={140} />\n  <ExtraThumb thumbShape='circle' hueTransform={160} />\n  {/* using colorTransform to transform the hue channel */}\n  <ExtraThumb\n    thumbShape='circle'\n    colorTransform={color => {\n      'worklet';\n      return colorKit.runOnUI().spin(color, 180).hsv().object();\n    }}\n  />\n  <ExtraThumb thumbShape='circle' hueTransform={200} />\n  <ExtraThumb thumbShape='circle' hueTransform={220} />\n  <ExtraThumb thumbShape='circle' hueTransform={240} />\n</Panel3>\n",
                }),
              }),
              '\n',
              (0, t.jsx)(n.h2, { id: 'props', children: 'Props' }),
              '\n',
              (0, t.jsx)(n.h3, { id: 'colortransform', children: (0, t.jsx)(n.code, { children: 'colorTransform' }) }),
              '\n',
              (0, t.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, t.jsx)(n.li, {
                    children:
                      "A Worklet function to transform or modify the color in the HSV (Hue, Saturation, Value) color space, taking an HSVA color object as input and returning a new HSVA color object. The returned object determines the thumb's position inside the panel.",
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Type:' }),
                      ' ',
                      (0, t.jsx)(n.code, { children: '(color: HSVObject) => HSVObject' }),
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              (0, t.jsx)(n.h3, { id: 'huetransform', children: (0, t.jsx)(n.code, { children: 'hueTransform' }) }),
              '\n',
              (0, t.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      'An alternative to ',
                      (0, t.jsx)(n.code, { children: 'colorTransform' }),
                      ' for transforming the hue channel, where the transform amount can be a ',
                      (0, t.jsx)(n.code, { children: 'number' }),
                      ' or a ',
                      (0, t.jsx)(n.code, { children: 'string' }),
                      ', allowing negative values. For example, it can be expressed as ',
                      (0, t.jsx)(n.code, { children: "'50%'" }),
                      ' or ',
                      (0, t.jsx)(n.code, { children: '50' }),
                      '.',
                    ],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Type:' }),
                      ' ',
                      (0, t.jsx)(n.code, { children: 'string | number' }),
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              (0, t.jsx)(n.h3, { id: 'saturationtransform', children: (0, t.jsx)(n.code, { children: 'saturationTransform' }) }),
              '\n',
              (0, t.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      'An alternative to ',
                      (0, t.jsx)(n.code, { children: 'colorTransform' }),
                      ' for transforming the saturation channel, where the transform amount can be a ',
                      (0, t.jsx)(n.code, { children: 'number' }),
                      ' or a ',
                      (0, t.jsx)(n.code, { children: 'string' }),
                      ', allowing negative values. For example, it can be expressed as ',
                      (0, t.jsx)(n.code, { children: "'50%'" }),
                      ' or ',
                      (0, t.jsx)(n.code, { children: '50' }),
                      '.',
                    ],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Type:' }),
                      ' ',
                      (0, t.jsx)(n.code, { children: 'string | number' }),
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              (0, t.jsx)(n.h3, { id: 'brightnesstransform', children: (0, t.jsx)(n.code, { children: 'brightnessTransform' }) }),
              '\n',
              (0, t.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      'An alternative to ',
                      (0, t.jsx)(n.code, { children: 'colorTransform' }),
                      ' for transforming the brightness channel, where the transform amount can be a ',
                      (0, t.jsx)(n.code, { children: 'number' }),
                      ' or a ',
                      (0, t.jsx)(n.code, { children: 'string' }),
                      ', allowing negative values. For example, it can be expressed as ',
                      (0, t.jsx)(n.code, { children: "'50%'" }),
                      ' or ',
                      (0, t.jsx)(n.code, { children: '50' }),
                      '.',
                    ],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Type:' }),
                      ' ',
                      (0, t.jsx)(n.code, { children: 'string | number' }),
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              (0, t.jsx)(n.h3, { id: 'onchange', children: (0, t.jsx)(n.code, { children: 'onChange' }) }),
              '\n',
              (0, t.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, t.jsx)(n.li, {
                    children:
                      'Triggers every time the user modifies the color, allowing you to get the transformed color through a worklet function passed as a callback.',
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      'The passed color object has the following properties: ',
                      (0, t.jsx)(n.code, { children: 'hex' }),
                      ', ',
                      (0, t.jsx)(n.code, { children: 'rgb' }),
                      ', ',
                      (0, t.jsx)(n.code, { children: 'rgba' }),
                      ', ',
                      (0, t.jsx)(n.code, { children: 'hsv' }),
                      ', ',
                      (0, t.jsx)(n.code, { children: 'hsva' }),
                      ', ',
                      (0, t.jsx)(n.code, { children: 'hwb' }),
                      ', ',
                      (0, t.jsx)(n.code, { children: 'hwba' }),
                      ', ',
                      (0, t.jsx)(n.code, { children: 'hsl' }),
                      ', and ',
                      (0, t.jsx)(n.code, { children: 'hsla' }),
                    ],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Type:' }),
                      ' ',
                      (0, t.jsx)(n.code, { children: '(color: object) => void' }),
                    ],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Default:' }),
                      ' ',
                      (0, t.jsx)(n.code, { children: 'undefined' }),
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              (0, t.jsx)(n.admonition, {
                type: 'tip',
                children: (0, t.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, t.jsxs)(n.li, {
                      children: [
                        'To prevent performance issues, it is best to avoid using ',
                        (0, t.jsx)(n.code, { children: 'setState' }),
                        ' in the ',
                        (0, t.jsx)(n.code, { children: 'onChange' }),
                        ' callback.',
                      ],
                    }),
                    '\n',
                    (0, t.jsxs)(n.li, {
                      children: [
                        'It is highly recommended to utilize the ',
                        (0, t.jsx)(n.code, { children: 'useSharedValue' }),
                        ' function from the ',
                        (0, t.jsx)(n.code, { children: 'react-native-reanimated' }),
                        ' library.',
                      ],
                    }),
                    '\n',
                  ],
                }),
              }),
              '\n',
              (0, t.jsx)(n.h3, { id: 'thumbsize', children: (0, t.jsx)(n.code, { children: 'thumbSize' }) }),
              '\n',
              (0, t.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, t.jsx)(n.li, { children: 'Thumb size (height*width).' }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [(0, t.jsx)(n.strong, { children: 'Type:' }), ' ', (0, t.jsx)(n.code, { children: 'number' })],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Default:' }),
                      ' inherit from ',
                      (0, t.jsx)(n.code, { children: 'Panel3' }),
                    ],
                  }),
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
                  (0, t.jsxs)(n.li, {
                    children: [(0, t.jsx)(n.strong, { children: 'Type:' }), ' ', (0, t.jsx)(n.code, { children: 'string' })],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Default:' }),
                      ' inherit from ',
                      (0, t.jsx)(n.code, { children: 'Panel3' }),
                    ],
                  }),
                  '\n',
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
                  (0, t.jsxs)(n.li, {
                    children: [(0, t.jsx)(n.strong, { children: 'Type:' }), ' ', (0, t.jsx)(n.code, { children: 'string' })],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, { children: [(0, t.jsx)(n.strong, { children: 'Values:' }), ' ', (0, t.jsx)(l, {})] }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Default:' }),
                      ' inherit from ',
                      (0, t.jsx)(n.code, { children: 'Panel3' }),
                    ],
                  }),
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
                  (0, t.jsxs)(n.li, {
                    children: [(0, t.jsx)(n.strong, { children: 'Type:' }), ' ', (0, t.jsx)(n.code, { children: 'ViewStyle' })],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Default:' }),
                      ' inherit from ',
                      (0, t.jsx)(n.code, { children: 'Panel3' }),
                    ],
                  }),
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
                  (0, t.jsxs)(n.li, {
                    children: [(0, t.jsx)(n.strong, { children: 'Type:' }), ' ', (0, t.jsx)(n.code, { children: 'ViewStyle' })],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Default:' }),
                      ' inherit from ',
                      (0, t.jsx)(n.code, { children: 'Panel3' }),
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              (0, t.jsx)(n.h3, { id: 'rendercenterline', children: (0, t.jsx)(n.code, { children: 'renderCenterLine' }) }),
              '\n',
              (0, t.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, t.jsx)(n.li, {
                    children: 'Controls whether to render a line from the center of the panel to the thumb (handle).',
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [(0, t.jsx)(n.strong, { children: 'Type:' }), ' ', (0, t.jsx)(n.code, { children: 'boolean' })],
                  }),
                  '\n',
                  (0, t.jsxs)(n.li, {
                    children: [
                      (0, t.jsx)(n.strong, { children: 'Default:' }),
                      ' inherit from ',
                      (0, t.jsx)(n.code, { children: 'Panel3' }),
                    ],
                  }),
                  '\n',
                ],
              }),
              '\n',
              '\n',
              '\n',
              (0, t.jsx)(s.ZP, {}),
            ],
          })
        );
      }
      function x(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, r) => {
      r.d(n, { ZP: () => l });
      var t = r(5893),
        i = r(1151);
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
                  "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\nimport type { RenderThumbProps } from 'reanimated-color-picker';\n\nfunction MyCustomThumb({ width, height, positionStyle, adaptiveColor, currentColor, initialColor }: RenderThumbProps) {\n  const animatedStyle = useAnimatedStyle(() => ({\n    borderColor: adaptiveColor.value,\n    backgroundColor: currentColor.value,\n  }));\n\n  return (\n    <Animated.View\n      style={[{ width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' }, animatedStyle, positionStyle]}\n    >\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\n    </Animated.View>\n  );\n}\n",
              }),
            }),
          ],
        });
      }
      function l(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(s, { ...e }) }) : s(e);
      }
    },
    3955: (e, n, r) => {
      r.d(n, { Z: () => t });
      const t = r.p + 'assets/images/panel3-extraThumbs-10b8ca0c3a22276a2024ccb2ec38524b.png';
    },
    1151: (e, n, r) => {
      r.d(n, { Z: () => c, a: () => l });
      var t = r(7294);
      const i = {},
        s = t.createContext(i);
      function l(e) {
        const n = t.useContext(s);
        return t.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e],
        );
      }
      function c(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(i)
              : e.components || i
            : l(e.components)),
          t.createElement(s.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
