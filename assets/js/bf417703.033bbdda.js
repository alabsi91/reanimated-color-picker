'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [476],
  {
    9574: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => a,
          contentTitle: () => s,
          default: () => u,
          frontMatter: () => i,
          metadata: () => l,
          toc: () => c,
        });
      var o = t(5893),
        r = t(1151);
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
          ...(0, r.a)(),
          ...e.components,
        };
        return (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsx)(n.h1, { id: 'usage', children: 'Usage' }),
            '\n',
            (0, o.jsxs)(n.ul, {
              children: [
                '\n',
                (0, o.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, o.jsx)(n.p, {
                      children: 'You can add, remove, rearrange, or style the built-in components of the color picker.',
                    }),
                    '\n',
                  ],
                }),
                '\n',
                (0, o.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, o.jsxs)(n.p, {
                      children: [
                        'Please take a look at the functioning examples: ',
                        (0, o.jsx)(n.a, { href: './Examples', children: 'Examples' }),
                      ],
                    }),
                    '\n',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, o.jsxs)(n.admonition, {
              type: 'info',
              children: [
                (0, o.jsxs)(n.p, { children: ['Using inside a ', (0, o.jsx)(n.code, { children: 'ScrollView' })] }),
                (0, o.jsxs)(n.ul, {
                  children: [
                    '\n',
                    (0, o.jsxs)(n.li, {
                      children: [
                        'If you experience gesture conflicts when using the color picker inside a ',
                        (0, o.jsx)(n.code, { children: 'ScrollView' }),
                        ', simply import the ',
                        (0, o.jsx)(n.code, { children: 'ScrollView' }),
                        ' from ',
                        (0, o.jsx)(n.code, { children: 'react-native-gesture-handler' }),
                        ' instead of from ',
                        (0, o.jsx)(n.code, { children: 'react-native' }),
                        '.',
                      ],
                    }),
                    '\n',
                  ],
                }),
                (0, o.jsx)(n.pre, {
                  children: (0, o.jsx)(n.code, {
                    className: 'language-ts',
                    children: "import { ScrollView } from 'react-native-gesture-handler';\n",
                  }),
                }),
              ],
            }),
            '\n',
            (0, o.jsx)('br', {}),
            '\n',
            (0, o.jsx)(n.pre, {
              children: (0, o.jsx)(n.code, {
                className: 'language-jsx',
                children:
                  "import React, { useState } from 'react';\nimport { Button, Modal, StyleSheet, View } from 'react-native';\n\nimport ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';\n\nexport default function App() {\n  const [showModal, setShowModal] = useState(false);\n\n  // Note: \ud83d\udc47 This can be a `worklet` function.\n  const onSelectColor = ({ hex }) => {\n    // do something with the selected color.\n    console.log(hex);\n  };\n\n  return (\n    <View style={styles.container}>\n      <Button title='Color Picker' onPress={() => setShowModal(true)} />\n\n      <Modal visible={showModal} animationType='slide'>\n        <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>\n          <Preview />\n          <Panel1 />\n          <HueSlider />\n          <OpacitySlider />\n          <Swatches />\n        </ColorPicker>\n\n        <Button title='Ok' onPress={() => setShowModal(false)} />\n      </Modal>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n  },\n});\n",
              }),
            }),
          ],
        });
      }
      function u(e = {}) {
        const { wrapper: n } = { ...(0, r.a)(), ...e.components };
        return n ? (0, o.jsx)(n, { ...e, children: (0, o.jsx)(d, { ...e }) }) : d(e);
      }
    },
    1151: (e, n, t) => {
      t.d(n, { Z: () => l, a: () => s });
      var o = t(7294);
      const r = {},
        i = o.createContext(r);
      function s(e) {
        const n = o.useContext(i);
        return o.useMemo(
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
              ? e.components(r)
              : e.components || r
            : s(e.components)),
          o.createElement(i.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
