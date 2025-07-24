'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [476],
  {
    9574: (e, n, r) => {
      r.r(n),
        r.d(n, {
          assets: () => a,
          contentTitle: () => s,
          default: () => u,
          frontMatter: () => i,
          metadata: () => l,
          toc: () => c,
        });
      var t = r(5893),
        o = r(1151);
      const i = { sidebar_position: 4 },
        s = 'Usage',
        l = {
          id: 'Usage',
          title: 'Usage',
          description: '- You can add, remove, rearrange, or style the built-in components of the color picker.',
          source: '@site/docs/Usage.md',
          sourceDirName: '.',
          slug: '/Usage',
          permalink: '/reanimated-color-picker/docs/Usage',
          draft: !1,
          unlisted: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 4,
          frontMatter: { sidebar_position: 4 },
          sidebar: 'tutorialSidebar',
          previous: { title: 'Installation', permalink: '/reanimated-color-picker/docs/Installation' },
          next: { title: 'API', permalink: '/reanimated-color-picker/docs/category/api' },
        },
        a = {},
        c = [];
      function d(e) {
        const n = {
          a: 'a',
          admonition: 'admonition',
          code: 'code',
          h1: 'h1',
          li: 'li',
          p: 'p',
          pre: 'pre',
          ul: 'ul',
          ...(0, o.a)(),
          ...e.components,
        };
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(n.h1, { id: 'usage', children: 'Usage' }),
            '\n',
            (0, t.jsxs)(n.ul, {
              children: [
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, t.jsx)(n.p, {
                      children: 'You can add, remove, rearrange, or style the built-in components of the color picker.',
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, t.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, t.jsxs)(n.p, {
                      children: [
                        'Please take a look at the functioning examples: ',
                        (0, t.jsx)(n.a, { href: './Examples', children: 'Examples' }),
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, t.jsxs)(n.admonition, {
              type: 'info',
              children: [
                (0, t.jsxs)(n.p, { children: ['Using inside a ', (0, t.jsx)(n.code, { children: 'ScrollView' })] }),
                (0, t.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, t.jsxs)(n.li, {
                      children: [
                        'If you experience gesture conflicts when using the color picker inside a ',
                        (0, t.jsx)(n.code, { children: 'ScrollView' }),
                        ', simply import the ',
                        (0, t.jsx)(n.code, { children: 'ScrollView' }),
                        ' from ',
                        (0, t.jsx)(n.code, { children: 'react-native-gesture-handler' }),
                        ' instead of from ',
                        (0, t.jsx)(n.code, { children: 'react-native' }),
                        '.',
                      ],
                    }),
                    '\n',
                  ],
                }),
                (0, t.jsx)(n.pre, {
                  children: (0, t.jsx)(n.code, {
                    className: 'language-ts',
                    children: "import { ScrollView } from 'react-native-gesture-handler';\n",
                  }),
                }),
              ],
            }),
            '\n',
            (0, t.jsx)('br', {}),
            '\n',
            (0, t.jsx)(n.pre, {
              children: (0, t.jsx)(n.code, {
                className: 'language-jsx',
                children:
                  "import React, { useState } from 'react';\r\nimport { Button, Modal, StyleSheet, View } from 'react-native';\r\n\r\nimport ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';\r\n\r\nexport default function App() {\r\n  const [showModal, setShowModal] = useState(false);\r\n\r\n  // Note: use `onCompleteJS` and `onChangeJS` for non-worklet functions\r\n  const onSelectColor = ({ hex }) => {\r\n    'worklet';\r\n    // do something with the selected color.\r\n    console.log(hex);\r\n  };\r\n\r\n  return (\r\n    <View style={styles.container}>\r\n      <Button title='Color Picker' onPress={() => setShowModal(true)} />\r\n\r\n      <Modal visible={showModal} animationType='slide'>\r\n        <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>\r\n          <Preview />\r\n          <Panel1 />\r\n          <HueSlider />\r\n          <OpacitySlider />\r\n          <Swatches />\r\n        </ColorPicker>\r\n\r\n        <Button title='Ok' onPress={() => setShowModal(false)} />\r\n      </Modal>\r\n    </View>\r\n  );\r\n}\r\n\r\nconst styles = StyleSheet.create({\r\n  container: {\r\n    flex: 1,\r\n    justifyContent: 'center',\r\n  },\r\n});\n",
              }),
            }),
          ],
        });
      }
      function u(e = {}) {
        const { wrapper: n } = { ...(0, o.a)(), ...e.components };
        return n ? (0, t.jsx)(n, { ...e, children: (0, t.jsx)(d, { ...e }) }) : d(e);
      }
    },
    1151: (e, n, r) => {
      r.d(n, { Z: () => l, a: () => s });
      var t = r(7294);
      const o = {},
        i = t.createContext(o);
      function s(e) {
        const n = t.useContext(i);
        return t.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e],
        );
      }
      function l(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(o)
              : e.components || o
            : s(e.components)),
          t.createElement(i.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
