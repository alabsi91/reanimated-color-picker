'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [206],
  {
    9325: (e, i, s) => {
      s.r(i),
        s.d(i, {
          assets: () => c,
          contentTitle: () => n,
          default: () => h,
          frontMatter: () => r,
          metadata: () => t,
          toc: () => d,
        });
      var l = s(5893),
        a = s(1151);
      const r = { sidebar_label: 'Introduction', sidebar_position: 1, hide_table_of_contents: !0 },
        n = 'Reanimated Color Picker',
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
        c = {},
        d = [
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
      function o(e) {
        const i = {
          a: 'a',
          h1: 'h1',
          h3: 'h3',
          h4: 'h4',
          img: 'img',
          li: 'li',
          p: 'p',
          ul: 'ul',
          ...(0, a.a)(),
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
                  (0, l.jsx)(i.img, { alt: 'Example_1', src: s(2456).Z + '', width: '240', height: '352' }),
                  '\r\n',
                  (0, l.jsx)(i.img, { alt: 'Example_7', src: s(7519).Z + '', width: '244', height: '352' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_2', src: s(3548).Z + '', width: '240', height: '340' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_3', src: s(8661).Z + '', width: '240', height: '340' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_4', src: s(5537).Z + '', width: '240', height: '434' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_5', src: s(1208).Z + '', width: '240', height: '435' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_8', src: s(2451).Z + '', width: '240', height: '340' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_9', src: s(2030).Z + '', width: '217', height: '340' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_10', src: s(6977).Z + '', width: '252', height: '375' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_11', src: s(2285).Z + '', width: '228', height: '375' }),
                ],
              }),
            }),
            '\n',
            (0, l.jsx)('div', {
              className: 'example-images',
              children: (0, l.jsxs)(i.p, {
                children: [
                  (0, l.jsx)(i.img, { alt: 'Example_6', src: s(6742).Z + '', width: '240', height: '278' }),
                  ' ',
                  (0, l.jsx)(i.img, { alt: 'Example_12', src: s(9846).Z + '', width: '230', height: '278' }),
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
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/ColorPicker', children: 'ColorPicker Wrapper' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/HueSlider', children: 'HueSlider' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/BrightnessSlider', children: 'BrightnessSlider' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/SaturationSlider', children: 'SaturationSlider' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/OpacitySlider', children: 'OpacitySlider' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/RedSlider', children: 'RedSlider' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/GreenSlider', children: 'GreenSlider' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/BlueSlider', children: 'BlueSlider' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/HueCircular', children: 'HueCircular' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panel1', children: 'Panel1' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panel2', children: 'Panel2' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panel3', children: 'Panel3' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panel4', children: 'Panel4' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Panel5', children: 'Panel5' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Preview', children: 'Preview' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/PreviewText', children: 'PreviewText' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/InputWidget', children: 'InputWidget' }) }),
                '\n',
                (0, l.jsx)(i.li, { children: (0, l.jsx)(i.a, { href: './API/Swatches', children: 'Swatches' }) }),
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
      function h(e = {}) {
        const { wrapper: i } = { ...(0, a.a)(), ...e.components };
        return i ? (0, l.jsx)(i, { ...e, children: (0, l.jsx)(o, { ...e }) }) : o(e);
      }
    },
    2456: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_1-0ed7e534ba652c042cf6754d8c149bef.png';
    },
    6977: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_10-731b20b59e6c13fa697c1951b32f1616.png';
    },
    2285: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_11-21b588267bf89dfaa5f67cc80507a7ec.png';
    },
    9846: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_12-ee0469e990f3ae0d1507fb1466bb7c3e.png';
    },
    3548: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_2-350479b77ee618f64f2fdcb3827e8d08.png';
    },
    8661: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_3-174fa0683db3c8e470687e7c3b50c423.png';
    },
    5537: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_4-e46ec0b407ba49c9be6eb8d7c4fb2855.png';
    },
    1208: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_5-cef58d35c07395a6f562cdb3c417ee54.png';
    },
    6742: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_6-7747b4e33a80534c65d19bf5daef8399.png';
    },
    7519: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_7-f6591b25248729dcb1bef359e1802215.png';
    },
    2451: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_8-128db863c06d8621e2d3f7181c003866.png';
    },
    2030: (e, i, s) => {
      s.d(i, { Z: () => l });
      const l = s.p + 'assets/images/example_9-37a112525d3cfa90f12d537be5d1fbd4.png';
    },
    1151: (e, i, s) => {
      s.d(i, { Z: () => t, a: () => n });
      var l = s(7294);
      const a = {},
        r = l.createContext(a);
      function n(e) {
        const i = l.useContext(r);
        return l.useMemo(
          function () {
            return 'function' == typeof e ? e(i) : { ...i, ...e };
          },
          [i, e]
        );
      }
      function t(e) {
        let i;
        return (
          (i = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(a)
              : e.components || a
            : n(e.components)),
          l.createElement(r.Provider, { value: i }, e.children)
        );
      }
    },
  },
]);
