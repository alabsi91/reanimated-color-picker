'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [206],
  {
    9325: (e, i, s) => {
      s.r(i),
        s.d(i, {
          assets: () => d,
          contentTitle: () => a,
          default: () => o,
          frontMatter: () => r,
          metadata: () => t,
          toc: () => c,
        });
      var l = s(5893),
        n = s(1151);
      const r = { sidebar_label: 'Introduction', sidebar_position: 1, hide_table_of_contents: !0 },
        a = 'Reanimated Color Picker',
        t = {
          id: 'intro',
          title: 'Reanimated Color Picker',
          description: '- A Pure JavaScript Color Picker for React Native.',
          source: '@site/docs/intro.mdx',
          sourceDirName: '.',
          slug: '/intro',
          permalink: '/reanimated-color-picker/docs/intro',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 1,
          frontMatter: { sidebar_label: 'Introduction', sidebar_position: 1, hide_table_of_contents: !0 },
          sidebar: 'tutorialSidebar',
          next: { title: 'Installation', permalink: '/reanimated-color-picker/docs/Installation' },
        },
        d = {},
        c = [
          {
            value: '- A Pure JavaScript Color Picker for React Native.',
            id: '--a-pure-javascript-color-picker-for-react-native',
            level: 4,
          },
          { value: '- Highly customizable.', id: '--highly-customizable', level: 4 },
          {
            value: '- Supports IOS, Android, Expo, and Web platforms.',
            id: '--supports-ios-android-expo-and-web-platforms',
            level: 4,
          },
          { value: '- Supports right-to-left (RTL) layouts.', id: '--supports-right-to-left-rtl-layouts', level: 4 },
          { value: '1. Installation', id: '1-installation', level: 3 },
          { value: '2. Usage', id: '2-usage', level: 3 },
          { value: '3. API', id: '3-api', level: 3 },
          { value: '4. ColorKit', id: '4-colorkit', level: 3 },
          { value: '5. Examples', id: '5-examples', level: 3 },
        ];
      function h(e) {
        const i = {
          a: 'a',
          h1: 'h1',
          h3: 'h3',
          h4: 'h4',
          img: 'img',
          li: 'li',
          p: 'p',
          strong: 'strong',
          ul: 'ul',
          ...(0, n.a)(),
          ...e.components,
        };
        return (0, l.jsxs)(l.Fragment, {
          children: [
            (0, l.jsx)(i.h1, { id: 'reanimated-color-picker', children: 'Reanimated Color Picker' }),
            '\n',
            (0, l.jsx)(i.h4, {
              id: '--a-pure-javascript-color-picker-for-react-native',
              children: '- A Pure JavaScript Color Picker for React Native.',
            }),
            '\n',
            (0, l.jsx)(i.h4, { id: '--highly-customizable', children: '- Highly customizable.' }),
            '\n',
            (0, l.jsx)(i.h4, {
              id: '--supports-ios-android-expo-and-web-platforms',
              children: '- Supports IOS, Android, Expo, and Web platforms.',
            }),
            '\n',
            (0, l.jsx)(i.h4, { id: '--supports-right-to-left-rtl-layouts', children: '- Supports right-to-left (RTL) layouts.' }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_1', src: s(9391).Z + '', width: '240', height: '352' }),
                  '\n',
                  (0, l.jsx)(i.img, { alt: 'Example_7', src: s(4107).Z + '', width: '244', height: '352' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_2', src: s(9736).Z + '', width: '240', height: '340' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_3', src: s(4725).Z + '', width: '240', height: '340' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_4', src: s(2222).Z + '', width: '240', height: '434' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_5', src: s(629).Z + '', width: '240', height: '435' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_8', src: s(2429).Z + '', width: '240', height: '340' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_9', src: s(7995).Z + '', width: '217', height: '340' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_10', src: s(2656).Z + '', width: '252', height: '375' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_11', src: s(9799).Z + '', width: '228', height: '375' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_6', src: s(3452).Z + '', width: '240', height: '278' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_12', src: s(8681).Z + '', width: '230', height: '278' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)(i.h1, { id: 'table-of-contents', children: 'Table of contents' }),
            '\n',
            (0, l.jsxs)(i.h3, {
              id: '1-installation',
              children: ['1. ', (0, l.jsx)(i.a, { href: './Installation', children: 'Installation' })],
            }),
            '\n',
            (0, l.jsxs)(i.h3, { id: '2-usage', children: ['2. ', (0, l.jsx)(i.a, { href: './Usage', children: 'Usage' })] }),
            '\n',
            (0, l.jsxs)(i.h3, { id: '3-api', children: ['3. ', (0, l.jsx)(i.a, { href: './category/api', children: 'API' })] }),
            '\n',
            (0, l.jsxs)(i.ul, {
              children: [
                '\n',
                (0, l.jsxs)(i.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(i.p, {
                      children: (0, l.jsx)(i.a, { href: './API/ColorPicker', children: 'ColorPicker Wrapper' }),
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(i.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(i.p, {
                      children: (0, l.jsx)(i.a, {
                        href: './category/Panels',
                        children: (0, l.jsx)(i.strong, { children: 'Panels' }),
                      }),
                    }),
                    '\n',
                    (0, l.jsxs)(i.ul, {
                      children: [
                        '\n',
                        (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panels/Panel1', children: 'Panel1' }) }),
                        '\n',
                        (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panels/Panel2', children: 'Panel2' }) }),
                        '\n',
                        (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panels/Panel3', children: 'Panel3' }) }),
                        '\n',
                        (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panels/Panel4', children: 'Panel4' }) }),
                        '\n',
                        (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panels/Panel5', children: 'Panel5' }) }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, l.jsxs)(i.li, {
                  children: [
                    '\n',
                    (0, l.jsx)(i.p, {
                      children: (0, l.jsx)(i.a, {
                        href: './category/Sliders',
                        children: (0, l.jsx)(i.strong, { children: 'Sliders' }),
                      }),
                    }),
                    '\n',
                    (0, l.jsxs)(i.ul, {
                      children: [
                        '\n',
                        (0, l.jsxs)(i.li, {
                          children: [
                            '\n',
                            (0, l.jsx)(i.p, {
                              children: (0, l.jsx)(i.a, {
                                href: './category/Hue',
                                children: (0, l.jsx)(i.strong, { children: 'Hue' }),
                              }),
                            }),
                            '\n',
                            (0, l.jsxs)(i.ul, {
                              children: [
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Sliders/Hue/HueSlider', children: 'HueSlider' }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Sliders/Hue/HueCircular', children: 'HueCircular' }),
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(i.li, {
                          children: [
                            '\n',
                            (0, l.jsx)(i.p, {
                              children: (0, l.jsx)(i.a, {
                                href: './category/HSB',
                                children: (0, l.jsx)(i.strong, { children: 'HSB' }),
                              }),
                            }),
                            '\n',
                            (0, l.jsxs)(i.ul, {
                              children: [
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, {
                                    href: './API/Sliders/HSB/BrightnessSlider',
                                    children: 'BrightnessSlider',
                                  }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, {
                                    href: './API/Sliders/HSB/SaturationSlider',
                                    children: 'SaturationSlider',
                                  }),
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(i.li, {
                          children: [
                            '\n',
                            (0, l.jsx)(i.p, {
                              children: (0, l.jsx)(i.a, {
                                href: './category/HSL',
                                children: (0, l.jsx)(i.strong, { children: 'HSL' }),
                              }),
                            }),
                            '\n',
                            (0, l.jsxs)(i.ul, {
                              children: [
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, {
                                    href: './API/Sliders/HSL/LuminanceSlider',
                                    children: 'LuminanceSlider',
                                  }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, {
                                    href: './API/Sliders/HSL/HSLSaturationSlider',
                                    children: 'HSLSaturationSlider',
                                  }),
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(i.li, {
                          children: [
                            '\n',
                            (0, l.jsx)(i.p, {
                              children: (0, l.jsx)(i.a, {
                                href: './category/RGB',
                                children: (0, l.jsx)(i.strong, { children: 'HSL' }),
                              }),
                            }),
                            '\n',
                            (0, l.jsxs)(i.ul, {
                              children: [
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Sliders/RGB/RedSlider', children: 'RedSlider' }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Sliders/RGB/GreenSlider', children: 'GreenSlider' }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Sliders/RGB/BlueSlider', children: 'BlueSlider' }),
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(i.li, {
                          children: [
                            '\n',
                            (0, l.jsx)(i.p, {
                              children: (0, l.jsx)(i.a, { href: './API/Sliders/OpacitySlider', children: 'OpacitySlider' }),
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                        (0, l.jsxs)(i.li, {
                          children: [
                            '\n',
                            (0, l.jsx)(i.p, {
                              children: (0, l.jsx)(i.a, {
                                href: './category/Preview',
                                children: (0, l.jsx)(i.strong, { children: 'Preview' }),
                              }),
                            }),
                            '\n',
                            (0, l.jsxs)(i.ul, {
                              children: [
                                '\n',
                                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Preview', children: 'Preview' }) }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Preview/PreviewText', children: 'PreviewText' }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Preview/InputWidget', children: 'InputWidget' }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Preview/Swatches', children: 'Swatches' }),
                                }),
                                '\n',
                                (0, l.jsx)(i.li, {
                                  children: (0, l.jsx)(i.a, { href: './API/Preview/ExtraThumb', children: 'ExtraThumb' }),
                                }),
                                '\n',
                              ],
                            }),
                            '\n',
                          ],
                        }),
                        '\n',
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, l.jsxs)(i.h3, {
              id: '4-colorkit',
              children: ['4. ', (0, l.jsx)(i.a, { href: './ColorKit', children: 'ColorKit' })],
            }),
            '\n',
            (0, l.jsxs)(i.h3, {
              id: '5-examples',
              children: ['5. ', (0, l.jsx)(i.a, { href: './Examples', children: 'Examples' })],
            }),
          ],
        });
      }
      function o(e = {}) {
        const { wrapper: i } = { ...(0, n.a)(), ...e.components };
        return i ? (0, l.jsx)(i, { ...e, children: (0, l.jsx)(h, { ...e }) }) : h(e);
      }
    },
    9391: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_1-0ed7e534ba652c042cf6754d8c149bef.png';
    },
    2656: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_10-731b20b59e6c13fa697c1951b32f1616.png';
    },
    9799: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_11-21b588267bf89dfaa5f67cc80507a7ec.png';
    },
    8681: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_12-ee0469e990f3ae0d1507fb1466bb7c3e.png';
    },
    9736: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_2-350479b77ee618f64f2fdcb3827e8d08.png';
    },
    4725: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_3-174fa0683db3c8e470687e7c3b50c423.png';
    },
    2222: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_4-3902fe7cb0699213de82952799f49181.png';
    },
    629: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_5-cef58d35c07395a6f562cdb3c417ee54.png';
    },
    3452: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_6-7747b4e33a80534c65d19bf5daef8399.png';
    },
    4107: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_7-f6591b25248729dcb1bef359e1802215.png';
    },
    2429: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_8-128db863c06d8621e2d3f7181c003866.png';
    },
    7995: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_9-37a112525d3cfa90f12d537be5d1fbd4.png';
    },
    1151: (e, i, s) => {
      s.d(i, { Z: () => t, a: () => a });
      var l = s(7294);
      const n = {},
        r = l.createContext(n);
      function a(e) {
        const i = l.useContext(r);
        return l.useMemo(
          function () {
            return 'function' == typeof e ? e(i) : { ...i, ...e };
          },
          [i, e],
        );
      }
      function t(e) {
        let i;
        return (
          (i = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(n)
              : e.components || n
            : a(e.components)),
          l.createElement(r.Provider, { value: i }, e.children)
        );
      }
    },
  },
]);
