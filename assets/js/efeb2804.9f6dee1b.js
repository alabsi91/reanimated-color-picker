'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [753],
  {
    2097: (e, n, l) => {
      l.r(n),
        l.d(n, {
          assets: () => c,
          contentTitle: () => s,
          default: () => j,
          frontMatter: () => d,
          metadata: () => o,
          toc: () => h,
        });
      var r = l(5893),
        i = l(1151),
        t = l(435);
      const d = { sidebar_position: 1, description: 'Responsible for managing the built-in components' },
        s = 'ColorPicker Wrapper',
        o = {
          id: 'API/ColorPicker',
          title: 'ColorPicker Wrapper',
          description: 'Responsible for managing the built-in components',
          source: '@site/docs/API/ColorPicker.mdx',
          sourceDirName: 'API',
          slug: '/API/ColorPicker',
          permalink: '/reanimated-color-picker/docs/API/ColorPicker',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 1,
          frontMatter: { sidebar_position: 1, description: 'Responsible for managing the built-in components' },
          sidebar: 'tutorialSidebar',
          previous: { title: 'API', permalink: '/reanimated-color-picker/docs/category/api' },
          next: { title: 'HueSlider', permalink: '/reanimated-color-picker/docs/API/HueSlider' },
        },
        c = {},
        h = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>value</code>', id: 'value', level: 3 },
          { value: '<code>adaptSpectrum</code>', id: 'adaptspectrum', level: 3 },
          { value: '<code>boundedThumb</code>', id: 'boundedthumb', level: 3 },
          { value: '<code>sliderThickness</code>', id: 'sliderthickness', level: 3 },
          { value: '<code>thumbAnimationDuration</code>', id: 'thumbanimationduration', level: 3 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
          { value: '<code>onChange</code>', id: 'onchange', level: 3 },
          { value: '<code>onComplete</code>', id: 'oncomplete', level: 3 },
          { value: 'Methods', id: 'methods', level: 2 },
          { value: '<code>setColor</code>', id: 'setcolor', level: 3 },
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
          ul: 'ul',
          ...(0, i.a)(),
          ...e.components,
        };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(n.h1, { id: 'colorpicker-wrapper', children: 'ColorPicker Wrapper' }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'The ',
                    (0, r.jsx)(n.code, { children: 'ColorPicker' }),
                    ' Wrapper is responsible for managing the built-in components.',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.admonition, {
              type: 'caution',
              children: (0, r.jsxs)(n.p, {
                children: [
                  'All built-in components should be wrapped within the ',
                  (0, r.jsx)(n.code, { children: 'ColorPicker' }),
                  ' component.',
                ],
              }),
            }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'You can nest components within the ',
                    (0, r.jsx)(n.code, { children: 'ColorPicker' }),
                    ' wrapper to achieve the desired level of customization.',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-jsx',
                children:
                  '<ColorPicker>\r\n  <Preview />\r\n\r\n  <View>\r\n    <Panel1 />\r\n    <HueSlider vertical />\r\n  </View>\r\n\r\n  <View>\r\n    <Text>Opacity</Text>\r\n    <OpacitySlider />\r\n  </View>\r\n\r\n  <Swatches />\r\n</ColorPicker>\n',
              }),
            }),
            '\n',
            (0, r.jsx)(n.h2, { id: 'props', children: 'Props' }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'value', children: (0, r.jsx)(n.code, { children: 'value' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'The initial color that should be displayed when the ',
                    (0, r.jsx)(n.code, { children: 'ColorPicker' }),
                    ' is loaded.',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'If the ',
                    (0, r.jsx)(n.code, { children: 'value' }),
                    ' property is modified, the ',
                    (0, r.jsx)(n.code, { children: 'ColorPicker' }),
                    ' will automatically update the displayed color.',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'Accepts: ',
                    (0, r.jsx)(n.code, {
                      children: "'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba' | named colors",
                    }),
                    ' formats.',
                  ],
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: "default: '#fff'" }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'adaptspectrum', children: (0, r.jsx)(n.code, { children: 'adaptSpectrum' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, {
                  children:
                    'A global property that allows the slider background color spectrum to adapt to changes in brightness and saturation for all descendant slider components.',
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'boundedthumb', children: (0, r.jsx)(n.code, { children: 'boundedThumb' }) }),
            '\n',
            (0, r.jsx)(n.p, {
              children: (0, r.jsx)(n.img, { alt: 'boundedThumb', src: l(2737).Z + '', width: '180', height: '130' }),
            }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: 'A global property for all descendant sliders and panels components.' }),
                '\n',
                (0, r.jsx)(n.li, {
                  children:
                    'Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.',
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, r.jsx)(n.code, { children: 'true' }),
                    ', the thumb will not be allowed to move beyond the edges of the slider.',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'When set to ',
                    (0, r.jsx)(n.code, { children: 'false' }),
                    ', part of it will be outside of the slider bounds.',
                  ],
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: boolean' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: false' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'sliderthickness', children: (0, r.jsx)(n.code, { children: 'sliderThickness' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, {
                  children: 'A global property that allows for changing the thickness of all descendant slider components.',
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'The thickness refers to the ',
                    (0, r.jsx)(n.code, { children: 'width' }),
                    ' of the slider in the case of a ',
                    (0, r.jsx)(n.code, { children: 'vertical' }),
                    ' orientation, and the ',
                    (0, r.jsx)(n.code, { children: 'height' }),
                    ' in the case of a ',
                    (0, r.jsx)(n.code, { children: 'horizontal' }),
                    ' orientation.',
                  ],
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: 25' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, {
              id: 'thumbanimationduration',
              children: (0, r.jsx)(n.code, { children: 'thumbAnimationDuration' }),
            }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, {
                  children: 'A global property to change the duration which the thumbs animate when the value prop changes.',
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: number' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: 200' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'thumbsize', children: (0, r.jsx)(n.code, { children: 'thumbSize' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, {
                  children: 'A global property for changing the thumb size of all descendant slider components.',
                }),
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
                (0, r.jsx)(n.li, {
                  children: 'A global property for changing the thumb color of all descendant slider components.',
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: string' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: undefined' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'thumbshape', children: (0, r.jsx)(n.code, { children: 'thumbShape' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, {
                  children:
                    'A global property that allows for the alteration of the thumb shape and appearance of all descendant slider components.',
                }),
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
                (0, r.jsx)(n.li, {
                  children: "A global property to change the style of the thumb's View for all descendant sliders components.",
                }),
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
                (0, r.jsx)(n.li, {
                  children:
                    "A global property to change the color of the thumb's inner View(s) for all descendant sliders components.",
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: ViewStyle' }) }),
                '\n',
              ],
            }),
            '\n',
            '\n',
            '\n',
            (0, r.jsx)(t.ZP, {}),
            '\n',
            (0, r.jsx)(n.h3, { id: 'style', children: (0, r.jsx)(n.code, { children: 'style' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: ['The container style of the ', (0, r.jsx)(n.code, { children: 'ColorPicker' }), '.'],
                }),
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
            (0, r.jsx)(n.h3, { id: 'onchange', children: (0, r.jsx)(n.code, { children: 'onChange' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: 'Triggers every time the user modifies the color.' }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'The passed color object has the following properties: ',
                    (0, r.jsx)(n.code, { children: 'hex' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'rgb' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'rgba' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hsv' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hsva' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hwb' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hwba' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hsl' }),
                    ', and ',
                    (0, r.jsx)(n.code, { children: 'hsla' }),
                  ],
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: (color: object) => void' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: undefined' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.admonition, {
              type: 'tip',
              children: (0, r.jsxs)(n.ul, {
                children: [
                  '\n',
                  (0, r.jsxs)(n.li, {
                    children: [
                      'To prevent performance issues, it is best to avoid using ',
                      (0, r.jsx)(n.code, { children: 'setState' }),
                      ' in the ',
                      (0, r.jsx)(n.code, { children: 'onChange' }),
                      ' callback.',
                    ],
                  }),
                  '\n',
                  (0, r.jsxs)(n.li, {
                    children: [
                      'It is highly recommended to utilize the ',
                      (0, r.jsx)(n.code, { children: 'useSharedValue' }),
                      ' function from the ',
                      (0, r.jsx)(n.code, { children: 'react-native-reanimated' }),
                      ' library.',
                    ],
                  }),
                  '\n',
                ],
              }),
            }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'oncomplete', children: (0, r.jsx)(n.code, { children: 'onComplete' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsx)(n.li, { children: 'Triggered upon the user releasing the slider handle or clicking on a swatch.' }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    'The passed color object has the following properties: ',
                    (0, r.jsx)(n.code, { children: 'hex' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'rgb' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'rgba' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hsv' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hsva' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hwb' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hwba' }),
                    ', ',
                    (0, r.jsx)(n.code, { children: 'hsl' }),
                    ', and ',
                    (0, r.jsx)(n.code, { children: 'hsla' }),
                  ],
                }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'type: (color: object) => void' }) }),
                '\n',
                (0, r.jsx)(n.li, { children: (0, r.jsx)(n.code, { children: 'default: undefined' }) }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.h2, { id: 'methods', children: 'Methods' }),
            '\n',
            (0, r.jsx)(n.h3, { id: 'setcolor', children: (0, r.jsx)(n.code, { children: 'setColor' }) }),
            '\n',
            (0, r.jsxs)(n.ul, {
              children: [
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, r.jsx)(n.p, { children: 'Set the currently displayed color in the color picker to a new one.' }),
                    '\n',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, r.jsxs)(n.p, {
                      children: [
                        'Note that this won\u2019t trigger any events like ',
                        (0, r.jsx)(n.code, { children: 'onChange' }),
                        ' or ',
                        (0, r.jsx)(n.code, { children: 'onComplete' }),
                        '.',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, r.jsxs)(n.p, {
                      children: [
                        'This is useful if you want to update the displayed color without binding a state to the color picker ',
                        (0, r.jsx)(n.code, { children: 'value' }),
                        ' property.',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, r.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, r.jsx)(n.p, {
                      children: (0, r.jsx)(n.code, { children: 'type: (color: string, duration?: number) => void' }),
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-tsx',
                children:
                  "import ColorPicker from 'reanimated-color-picker';\r\nimport type { ColorPickerRef } from 'reanimated-color-picker';\r\n\r\nfunction MyComponent() {\r\n  const pickerRef = useRef<ColorPickerRef>(null);\r\n\r\n  const setNewColorHandle = () => {\r\n    if (pickerRef.current) {\r\n      pickerRef.current.setColor('orange');\r\n    }\r\n  };\r\n\r\n  return <ColorPicker ref={pickerRef}>{/* the rest of your code */}</ColorPicker>;\r\n}\n",
              }),
            }),
          ],
        });
      }
      function j(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, r.jsx)(n, { ...e, children: (0, r.jsx)(a, { ...e }) }) : a(e);
      }
    },
    435: (e, n, l) => {
      l.d(n, { ZP: () => d });
      var r = l(5893),
        i = l(1151);
      function t(e) {
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
                  "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\r\nimport type { RenderThumbProps } from 'reanimated-color-picker';\r\n\r\nfunction MyCustomThumb({ width, height, positionStyle, adaptiveColor, currentColor, initialColor }: RenderThumbProps) {\r\n  const animatedStyle = useAnimatedStyle(() => ({\r\n    borderColor: adaptiveColor.value,\r\n    backgroundColor: currentColor.value,\r\n  }));\r\n\r\n  return (\r\n    <Animated.View\r\n      style={[{ width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' }, animatedStyle, positionStyle]}\r\n    >\r\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\r\n    </Animated.View>\r\n  );\r\n}\n",
              }),
            }),
          ],
        });
      }
      function d(e = {}) {
        const { wrapper: n } = { ...(0, i.a)(), ...e.components };
        return n ? (0, r.jsx)(n, { ...e, children: (0, r.jsx)(t, { ...e }) }) : t(e);
      }
    },
    2737: (e, n, l) => {
      l.d(n, { Z: () => r });
      const r =
        'data:image/png;base64,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';
    },
    1151: (e, n, l) => {
      l.d(n, { Z: () => s, a: () => d });
      var r = l(7294);
      const i = {},
        t = r.createContext(i);
      function d(e) {
        const n = r.useContext(t);
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
              ? e.components(i)
              : e.components || i
            : d(e.components)),
          r.createElement(t.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
