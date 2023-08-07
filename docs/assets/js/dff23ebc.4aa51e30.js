'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [110],
  {
    3905: (e, t, n) => {
      n.d(t, { Zo: () => h, kt: () => s });
      var a = n(7294);
      function i(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function r(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? r(Object(n), !0).forEach(function (t) {
                i(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : r(Object(n)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
              });
        }
        return e;
      }
      function o(e, t) {
        if (null == e) return {};
        var n,
          a,
          i = (function (e, t) {
            if (null == e) return {};
            var n,
              a,
              i = {},
              r = Object.keys(e);
            for (a = 0; a < r.length; a++) (n = r[a]), t.indexOf(n) >= 0 || (i[n] = e[n]);
            return i;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (a = 0; a < r.length; a++)
            (n = r[a]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]));
        }
        return i;
      }
      var d = a.createContext({}),
        p = function (e) {
          var t = a.useContext(d),
            n = t;
          return e && (n = 'function' == typeof e ? e(t) : l(l({}, t), e)), n;
        },
        h = function (e) {
          var t = p(e.components);
          return a.createElement(d.Provider, { value: t }, e.children);
        },
        k = 'mdxType',
        u = {
          inlineCode: 'code',
          wrapper: function (e) {
            var t = e.children;
            return a.createElement(a.Fragment, {}, t);
          },
        },
        m = a.forwardRef(function (e, t) {
          var n = e.components,
            i = e.mdxType,
            r = e.originalType,
            d = e.parentName,
            h = o(e, ['components', 'mdxType', 'originalType', 'parentName']),
            k = p(n),
            m = i,
            s = k[''.concat(d, '.').concat(m)] || k[m] || u[m] || r;
          return n ? a.createElement(s, l(l({ ref: t }, h), {}, { components: n })) : a.createElement(s, l({ ref: t }, h));
        });
      function s(e, t) {
        var n = arguments,
          i = t && t.mdxType;
        if ('string' == typeof e || i) {
          var r = n.length,
            l = new Array(r);
          l[0] = m;
          var o = {};
          for (var d in t) hasOwnProperty.call(t, d) && (o[d] = t[d]);
          (o.originalType = e), (o[k] = 'string' == typeof e ? e : i), (l[1] = o);
          for (var p = 2; p < r; p++) l[p] = n[p];
          return a.createElement.apply(null, l);
        }
        return a.createElement.apply(null, n);
      }
      m.displayName = 'MDXCreateElement';
    },
    2961: (e, t, n) => {
      n.r(t),
        n.d(t, {
          assets: () => p,
          contentTitle: () => o,
          default: () => u,
          frontMatter: () => l,
          metadata: () => d,
          toc: () => h,
        });
      var a = n(7462),
        i = (n(7294), n(3905)),
        r = n(2650);
      const l = { sidebar_position: 5, sidebar_label: 'OpacitySlider', description: "A slider to change the color's opacity." },
        o = '<OpacitySlider />',
        d = {
          unversionedId: 'API/OpacitySlider',
          id: 'API/OpacitySlider',
          title: '<OpacitySlider />',
          description: "A slider to change the color's opacity.",
          source: '@site/docs/API/OpacitySlider.mdx',
          sourceDirName: 'API',
          slug: '/API/OpacitySlider',
          permalink: '/reanimated-color-picker/docs/API/OpacitySlider',
          draft: !1,
          tags: [],
          version: 'current',
          sidebarPosition: 5,
          frontMatter: {
            sidebar_position: 5,
            sidebar_label: 'OpacitySlider',
            description: "A slider to change the color's opacity.",
          },
          sidebar: 'tutorialSidebar',
          previous: { title: 'SaturationSlider', permalink: '/reanimated-color-picker/docs/API/SaturationSlider' },
          next: { title: 'RedSlider', permalink: '/reanimated-color-picker/docs/API/RedSlider' },
        },
        p = {},
        h = [
          { value: 'Props', id: 'props', level: 2 },
          { value: '<code>adaptSpectrum</code>', id: 'adaptspectrum', level: 3 },
        ],
        k = { toc: h };
      function u(e) {
        let { components: t, ...l } = e;
        return (0, i.kt)(
          'wrapper',
          (0, a.Z)({}, k, l, { components: t, mdxType: 'MDXLayout' }),
          (0, i.kt)('h1', { id: 'opacityslider-' }, (0, i.kt)('inlineCode', { parentName: 'h1' }, '<OpacitySlider />')),
          (0, i.kt)('p', null, (0, i.kt)('img', { alt: 'opacity', src: n(5048).Z, width: '256', height: '40' })),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              (0, i.kt)(
                'h3',
                { parentName: 'li', id: 'a-slider-to-change-the-colors-opacity' },
                "A slider to change the color's opacity."
              )
            )
          ),
          (0, i.kt)('h2', { id: 'props' }, 'Props'),
          (0, i.kt)('h3', { id: 'adaptspectrum' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'adaptSpectrum')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              'Slider background color spectrum adapts to changes in saturation and brightness.'
            ),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: boolean')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'default: false'))
          ),
          (0, i.kt)(r.ZP, { mdxType: 'SliderProps' })
        );
      }
      u.isMDXComponent = !0;
    },
    6862: (e, t, n) => {
      n.d(t, { ZP: () => l });
      var a = n(7462),
        i = (n(7294), n(3905));
      const r = {
        toc: [
          { value: '<code>renderThumb</code>', id: 'renderthumb', level: 3 },
          { value: '<code>ThumbProps</code>', id: 'thumbprops', level: 4 },
        ],
      };
      function l(e) {
        let { components: t, ...n } = e;
        return (0, i.kt)(
          'wrapper',
          (0, a.Z)({}, r, n, { components: t, mdxType: 'MDXLayout' }),
          (0, i.kt)('h3', { id: 'renderthumb' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'renderThumb')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              'Function which receives ',
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'ThumbProps'),
              ' and returns a custom thumb component.'
            ),
            (0, i.kt)('li', { parentName: 'ul' }, 'Overrides ', (0, i.kt)('inlineCode', { parentName: 'li' }, 'thumbShape'))
          ),
          (0, i.kt)('h4', { id: 'thumbprops' }, (0, i.kt)('inlineCode', { parentName: 'h4' }, 'ThumbProps')),
          (0, i.kt)(
            'table',
            null,
            (0, i.kt)(
              'thead',
              { parentName: 'table' },
              (0, i.kt)(
                'tr',
                { parentName: 'thead' },
                (0, i.kt)('th', { parentName: 'tr', align: 'center' }, 'Prop'),
                (0, i.kt)('th', { parentName: 'tr', align: 'center' }, 'Type'),
                (0, i.kt)('th', { parentName: 'tr', align: 'left' }, 'Description')
              )
            ),
            (0, i.kt)(
              'tbody',
              { parentName: 'table' },
              (0, i.kt)(
                'tr',
                { parentName: 'tbody' },
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'center' },
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'positionStyle')
                ),
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'center' },
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'StyleProp')
                ),
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'left' },
                  'This style determines the position of the thumb and is a crucial element that should be included.'
                )
              ),
              (0, i.kt)(
                'tr',
                { parentName: 'tbody' },
                (0, i.kt)('td', { parentName: 'tr', align: 'center' }, (0, i.kt)('inlineCode', { parentName: 'td' }, 'width')),
                (0, i.kt)('td', { parentName: 'tr', align: 'center' }, (0, i.kt)('inlineCode', { parentName: 'td' }, 'number')),
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'left' },
                  'Extracted from the ',
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'thumbSize'),
                  " prop and it's important for thumb position calculation."
                )
              ),
              (0, i.kt)(
                'tr',
                { parentName: 'tbody' },
                (0, i.kt)('td', { parentName: 'tr', align: 'center' }, (0, i.kt)('inlineCode', { parentName: 'td' }, 'height')),
                (0, i.kt)('td', { parentName: 'tr', align: 'center' }, (0, i.kt)('inlineCode', { parentName: 'td' }, 'number')),
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'left' },
                  'Extracted from the ',
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'thumbSize'),
                  " prop and it's important for thumb position calculation."
                )
              ),
              (0, i.kt)(
                'tr',
                { parentName: 'tbody' },
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'center' },
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'adaptiveColor')
                ),
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'center' },
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'SharedValue<string>')
                ),
                (0, i.kt)('td', { parentName: 'tr', align: 'left' }, 'White or black based on the contrast ratio.')
              ),
              (0, i.kt)(
                'tr',
                { parentName: 'tbody' },
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'center' },
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'currentColor')
                ),
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'center' },
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'SharedValue<string>')
                ),
                (0, i.kt)('td', { parentName: 'tr', align: 'left' }, 'This shared value will update whenever the color changes.')
              ),
              (0, i.kt)(
                'tr',
                { parentName: 'tbody' },
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'center' },
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'initialColor')
                ),
                (0, i.kt)('td', { parentName: 'tr', align: 'center' }, (0, i.kt)('inlineCode', { parentName: 'td' }, 'string')),
                (0, i.kt)(
                  'td',
                  { parentName: 'tr', align: 'left' },
                  'The initial color value as a ',
                  (0, i.kt)('inlineCode', { parentName: 'td' }, 'string'),
                  '.'
                )
              )
            )
          ),
          (0, i.kt)('ul', null, (0, i.kt)('li', { parentName: 'ul' }, 'Example Usage:')),
          (0, i.kt)(
            'pre',
            null,
            (0, i.kt)(
              'code',
              { parentName: 'pre', className: 'language-tsx' },
              "import Animated, { useAnimatedStyle } from 'react-native-reanimated';\nimport type { RenderThumbProps } from 'reanimated-color-picker';\n\nfunction MyCustomThumb({\n  width,\n  height,\n  positionStyle,\n  adaptiveColor,\n  currentColor,\n  initialColor,\n}: RenderThumbProps) {\n\n  const animatedStyle = useAnimatedStyle(() => ({\n    borderColor: adaptiveColor.value,\n    backgroundColor: currentColor.value,\n  }));\n\n  return (\n    <Animated.View\n      style={[\n        { width, height, borderWidth: 1, borderRadius: width / 2, overflow: 'hidden' },\n        animatedStyle,\n        positionStyle,\n        ]}\n    >\n      <View style={{ backgroundColor: initialColor, width: '50%', height, alignSelf: 'flex-end' }} />\n    </Animated.View>\n  );\n}\n"
            )
          )
        );
      }
      l.isMDXComponent = !0;
    },
    2650: (e, t, n) => {
      n.d(t, { ZP: () => o });
      var a = n(7462),
        i = (n(7294), n(3905)),
        r = n(6862);
      const l = {
        toc: [
          { value: '<code>boundedThumb</code>', id: 'boundedthumb', level: 3 },
          { value: '<code>thumbSize</code>', id: 'thumbsize', level: 3 },
          { value: '<code>thumbColor</code>', id: 'thumbcolor', level: 3 },
          { value: '<code>sliderThickness</code>', id: 'sliderthickness', level: 3 },
          { value: '<code>thumbShape</code>', id: 'thumbshape', level: 3 },
          { value: '<code>thumbStyle</code>', id: 'thumbstyle', level: 3 },
          { value: '<code>thumbInnerStyle</code>', id: 'thumbinnerstyle', level: 3 },
          { value: '<code>reverse</code>', id: 'reverse', level: 3 },
          { value: '<code>vertical</code>', id: 'vertical', level: 3 },
          { value: '<code>style</code>', id: 'style', level: 3 },
        ],
      };
      function o(e) {
        let { components: t, ...o } = e;
        return (0, i.kt)(
          'wrapper',
          (0, a.Z)({}, l, o, { components: t, mdxType: 'MDXLayout' }),
          (0, i.kt)('h3', { id: 'boundedthumb' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'boundedThumb')),
          (0, i.kt)('p', null, (0, i.kt)('img', { alt: 'boundedThumb', src: n(9248).Z, width: '180', height: '130' })),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              'Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.'
            ),
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              'When set to ',
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'true'),
              ', the thumb will not be allowed to move beyond the edges of the slider.'
            ),
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              'When set to ',
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'false'),
              ', part of it will be outside of the slider bounds.'
            ),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: boolean')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'default: false'))
          ),
          (0, i.kt)('h3', { id: 'thumbsize' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'thumbSize')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, "The size of the slider's thumb."),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: number')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'default: 35'))
          ),
          (0, i.kt)('h3', { id: 'thumbcolor' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'thumbColor')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, "The color of the slider's thumb."),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: string')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'default: interactive*'))
          ),
          (0, i.kt)(
            'admonition',
            { type: 'info' },
            (0, i.kt)(
              'mdxAdmonitionTitle',
              { parentName: 'admonition' },
              (0, i.kt)('strong', { parentName: 'mdxAdmonitionTitle' }, '*', 'interactive')
            ),
            (0, i.kt)(
              'ul',
              { parentName: 'admonition' },
              (0, i.kt)(
                'li',
                { parentName: 'ul' },
                'The color of the thumb will be adjusted according to the contrast ratio, in the absence of a specific color value.'
              )
            )
          ),
          (0, i.kt)('h3', { id: 'sliderthickness' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'sliderThickness')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              'The thickness is the ',
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'width'),
              ' of the slider in ',
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'vertical'),
              ' mode or the ',
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'height'),
              ' in ',
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'horizontal'),
              ' mode.'
            ),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: number')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'default: 25'))
          ),
          (0, i.kt)('h3', { id: 'thumbshape' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'thumbShape')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, "The shape and appearance of the slider's thumb."),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: string')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, "default: 'ring'")),
            (0, i.kt)(
              'li',
              { parentName: 'ul' },
              (0, i.kt)('inlineCode', { parentName: 'li' }, 'values:'),
              (0, i.kt)('shapes', null)
            )
          ),
          (0, i.kt)('h3', { id: 'thumbstyle' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'thumbStyle')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, "Thumb's containing View's style."),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: ViewStyle'))
          ),
          (0, i.kt)('h3', { id: 'thumbinnerstyle' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'thumbInnerStyle')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, "Thumb's inner View(s) style."),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: ViewStyle'))
          ),
          (0, i.kt)(r.ZP, { mdxType: 'RenderThumb' }),
          (0, i.kt)('h3', { id: 'reverse' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'reverse')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, 'Reverse the slider direction.'),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: boolean')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'default: false'))
          ),
          (0, i.kt)('h3', { id: 'vertical' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'vertical')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, 'Change the slider orientation.'),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: boolean')),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'default: false'))
          ),
          (0, i.kt)('h3', { id: 'style' }, (0, i.kt)('inlineCode', { parentName: 'h3' }, 'style')),
          (0, i.kt)(
            'ul',
            null,
            (0, i.kt)('li', { parentName: 'ul' }, "The style of the slider's container."),
            (0, i.kt)('li', { parentName: 'ul' }, (0, i.kt)('inlineCode', { parentName: 'li' }, 'type: ViewStyle'))
          ),
          (0, i.kt)(
            'admonition',
            { title: 'note', type: 'info' },
            (0, i.kt)(
              'ul',
              { parentName: 'admonition' },
              (0, i.kt)('li', { parentName: 'ul' }, 'Certain style properties will be overridden.')
            )
          )
        );
      }
      o.isMDXComponent = !0;
    },
    9248: (e, t, n) => {
      n.d(t, { Z: () => a });
      const a =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAACCCAYAAADv7uKCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAACRNSURBVHgB7X0JkB3Vee53ZrQMy0iD2SQw0lWKZaT4WQOyJJOXBzPgBAN+RnqPcuK8GKRX5TixnQjZVcQhi+SkEieuIqDYGLvsGAGuJOAyGsdB2CzWEmKwBEgEYoYtukIbisEaSUb7zMl/us/yn6WvYHQ1Glnng1Z3n63Pnf767+/83f0fICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjY6RAIOOwkFLWaHUdLV166aClxorU9dJPSy8tq4QQ9cO2O4faOYRujMHlGE3ttYouWndgtKSFTs0oSQutx0Bv03o0W0ax9Ri2bfZHBeVUm2N0m6Olly/18WQrbat9Wh9qEThEyYeEpG4CB9U2UeYQJA6i3FbrclFpLs/lu/QDRRpYvlsfSKTxdg5ARuXLtd+fUchIgkisSHsTSiJ30vICStL+iJZ9KMlr0KGX02hZQMvtVF/lL0aC3LKbSDwKi+hsdKFV1VN2hQhGxFGrctHbMOsEjDkSgpXX+7ySNVthm6wc1ZesStkF6YpQm8J2rqwrvdJmLex2+Z/Z9vsk2JbU/3LrKoNtUzv+U/i5mdABGJE/QcsGWp6h5YHDVOvXS52WdTqthpLcS6nN22m9BJeOrmHUwKKC0tAkLI/qzpYio9DpVWfY7MuqzEZIHDdsVuoiRVHTH8loK9geEh3Tx7EkDS4w3hdbR+gLwK8nwY8tbIpIHhOZ0BxEvDm0uouWn9DyTZSWeKio62UF9u+5Gvv3z8O1v92BHyw1R6P/wxOt90PryU+8SJWF34aUsYmzbDRtMFJSP6S20IrABbGkI7MhObf0Ql98spLaEpyQiH+lV9dQWQT1qohrr3/vosiELqCt8mJabkBpjetoFp5ePQFPr5yCU9rbsOA24KLpwFcWvo2K4Y1WnzgZpAmZrgb4Ziyy9iHj3ba5HgqSD9JGi+lKaJm5/EhR1/0Gdk/AYLJbvA0Z9cpY5zKdW3EfLTjBoQd8K2i5jJY70UwyL7+vB088+ls4dKgNu0mRPPAVYOps4OukSs6uwZMaSEkN6VZC+mlcmtgzL3wLHhr4YFtom8ivACn9XD+fWchE8wKOdlWXiyvPjslKmTbilqWWOmm5YS7zyEJ3vuf93fSrFgkMdtEtpwMjDELI/kEpVorBloV9fU/WcQRgZP5PWlYetsLGjW1YvnwinnpqAnbubLPp48fvw6xZr+ODH9yGyZNLmfIgkfmVn/TQoM9hP2U9+RAwowe4lQ57M6131OHLBL1ddBCNOq8vhlC2xKc80rAiLOvq2JJS20Bh8lgbwreQMXn58WRAUlOKS4vox+lWZHQEwfal9+uEd+kV6Jw2azGtFuF4wSDm9fWtuRtDBBFaDeB+hsOR+c47p+DWW3uwefME0sJtDcu+9719mH3JXkyddHFx/2uhP3urKNfFvl4uITK3k1PkT2i9vz9wsWm3WuiaG43YbVe49aSfb912iXaM+25UmS61m0+57YzLbrBVYpD6OEDLYOG6k9p9p91mwrnPSlea8Fx3as3dbrE7L3bN+fWEXqdcgEguA3pt7UfntJnziN+34TiCFLL7zNMn3ffGG5v733Hd0vNwFi2PVhZSRP7oR/8PvvWtHuzY0YGBgcOPObZvPwPPrJ+Itc8C554NnN5RWrRChwpn7LZvBCZNLaXH+h+UZ6JYNPnVdotOaxElIc0+X1p4umDpattcTGE94bfNjiVbtNHX60HdX7NtbgqKQEoLD8Btq0Wy7caLCLallzYQlamuL9m+09Ci5UYcZ6CbTIdsHVjwDqspMs9DOQBcWVnoqquuxic/OR+vvlrDUPAzusa+fA/w0Gp9UPsPbMJTy4Er5wGz5+gkJjcKCLcarDiOJ4O5rGC3axHcjKXUHgpWRyXR8YUuHsoIp4u1zjbyqCFCLewr51hs+KpcJrwaXM+LRNkW9iO7cRxCDBZP7t42tG5WsuoupNxySieff/7/x8MPX4pm4KFV5IEmYu/dz89KiQOU9sQy4PepK6d0IPJYmEEjZDx8t4QSDchlPCMykR16CTTFhEAVUQU7pAgvIL+UPQYqWgtVu6+WfWK7azb0QpcpQv+ncCJ6OdRDkx3wn/Q5XHnlbw3ZKlfh5TrwtftZgrMy2E55m+kh5LU3pUZXXlGvvnk6aC0sryASd4Tg8NwzwsvqNp2TLAC/kGwLjlDVD1zCgWGYF3ctuIdoP4c/iDXpxuV3QhFaW2clUVYkC1x/fU/TyWzwUh349sOmJyyDtp+n7nyAHkye2hHfpaUxifDr8JMq4lu7tbSWDTLBb00O3rYQuqjkaoSSOWHjO4kjobBrXzAA8TM+0ya31ZFPhbXg23JfnJX/nWgWuhvlo+nYOqsB4He+04Ojicd+TMTeGKcr6fFfG4APMistDVkZgURo4WRi7Vvakh1Mi1vuh5Rh2lT4RYqVlIFdjunq9gTck7+QwPHFELbgWgm1d9ga70PZzolG6EVw71r4uOWWuRgOfG91wCN9irb0Ae+7jmWkbt3Vt/OoHCdy+NaRvwEEFtJLEUFVEdf24ZPWfzSeHgZyD3Js2QXb4m15V6cuM0xv27W3t2PunGuK9dq1z2DN2mei/A9ceRnOOWcitm7dVuRv2bINzYSWG+ORehL42c9ejP7+4XmI9GKdlteAaZOgO4bihGwnC/2rHwXOqAE764mKwiemSUOFlPDevrP/wHk90rIhpKNfX5Z3DsGto0hYylT7QZ91aX9IyA5ny1UNLH17XtJ7GCz0uedOxLIH7iWynlPs3/Cx34zK3L30Tsy57tpie+bMGW/fEL0zdKPqsfYjj0zFcOKfV+kNphbVagsNDmfMiQeABYI/Ch/IpaSI54UICBbpaRk3EZlmLim4Zo61LBIpfj98yyq8mr50adArj+qG0kfdQisCr1nzNP76b9LPbGbNvARTOy/A1F+ejaMMdT/fEKUqN91zz3ViOLHpdWAP6eZTx+oEfaJ/WqeHLdPZWQvIISqsrAzKy6Auf12UFzXQb9sFJSrsStku9zYIOOEgE5a/GpKRUlYKkpTGNn0J39I7IkIr63vlFZdVSgmF9vZTmy4fhgglKf4zSlXvZgw39pD7+zUi9bTJOkGfuH5Ku+hShLdbJ1xTWljAvW9RZbHDsl6KeuLq7+sDlINBMF9YLCVCi8ptrk/EWGrwkkjse/2I0vnbd679IRNaWVUlFR5Y9iB2796Nv/rLP8M99/4jLfcV+cryfupTHy/K7dr9c8yaNaNIv3He79k2VH11MZhtBdXGY4+txlFADeXL+j7Ui0bHAps0obmlPUhEP7kjYYqYlrVMYLfklESJCK8TK5SLCJ8cGkscqQRjTR2tDK3fnlww5eOLw9SUQXkJ/0UoIzLMJcRFx5AJ/bnPfQbLeh+0UkJZ6C996YuUtrwg+At9L+OPbvlz3PK5hdhMFvqee/8pakPlz5p1Cb5AF4PaVthN5D9KqCHlruNvzQ0nlORQ4G/Ov7WjHBQGpLLgZ1sCaYEQWOuqtixKwkvbj9TdIbggBLfBzj56bcK3+obEaT+yLzdadC1p/3XtxJeJe61ULUMmtLLAX77j63a/jwg8jqztuedOoO3dBanVskuvlfcihErbquVIKj+DkzmQC57pTBA1vHfLqrKSWWhnoznZKpjEDlN1sbjDmy0R1fXbEUh/fyjhxEfKrpu2mublUMRVMBIi423CntWArCIoJAK5kBro2QYbEVz4x/FaEZq/wUNq/bTS91YIVs9v1/c981rxleHfdEKp4iyv8HsZ9MdResiEVlZ3HA34DNQA0aSPUNRRDgx9qJfzjwVO1h4Oaz0Jp5wGvFGHvbVbpAhaMZzyxGZIIAl/YMkGkYWV1tY4IlZZz5cIodzhFOb0qxIW0Q/y1Lio1NhOFskgR6UPmdBKP99ww0ft/tw5Hyq8GUp6jFAo/Rzr5Zkzj43WOU+NRQNSqgFhQWjEhK0aKFpBq/c9ksq4oojVrqWe5ns8OAyrOR9FqjVnSVOCxL9YUra+3IslR7kd/ibh/Y4ha+g77vgGeTb+FI8+0mt64HkwRiDW06JuI697qVdf/TrGjt132C9Rmo1JitBmhKXX6hXSPf2+1TYozjw7tTZbJg14mabLp/S2t2Lpgu+5LckzA5HAVa4jWBWF7WEqUtKhDASA9AjAP86QCa0086f/4OZCMytfc9Wg7pY//ouG7Sjf9TA8VFFQhL4R4bsc6hvA887bhldemYLhwsX0HOdkdf1oEpjvAs+kLjyyxCeuZ/UkN45sI6WjgchqezqdFZdh3bC8tvZC91WE3YhlReoa4+2n8xP9DC5EbvO5oDIvvB7xoLDKgzEC8V1a0o+4P/vZFRhOXHwRkiftrBrwwsrYOhsrHN5tU2Q2FjQ2gdUQ8aZMlhFJ5ZrqkYhIGNeoEhVmCOpfJlxsxJLDpJ0wb9vpcFx9tNSizN/93TrOP38DhgNnkKz4lel6hw3kzqyRH5rkxpsbAy+H9Ir6YjZh52QizzvnzK4Fb+M1JGHQDbAaPMfZ0zTxOW1FlAu4YWH6Qoh/veu7xIn3PrQS/MfWSs/7MNuR1vJhysXAdxbr85O+IZdMCTV0WMA1HVnpyq9cTBVZ3Z5HU/dU0d04fDUtvPr8tX9TP2Wp+VEl4j6kLzeXc+K9D00CFVOQ8nYoK33VVU/gaOJDlwMXTkb07eAp46lXXSQ3VpVffHPIRiSt0hWClRdpq51spspmxikiIGvqZfyyXEx2lx52I/49MkHsuD33pzmhCE2yQ7nuvoryVdIY3//+Q0dNeigif0gFZ2K3fIP/cQXw4O3OZQfh5IFoQHBzGoWvIz0NHX4g6/mmGQnZQNRVie1hbGFTAzz/gXXov+DpMtm+KZ+6xHh7Rrq433QifiSrrPQ0pLS0wqOP/mPTSX1BDfid34AjKLM66mGKctctX+JI3NCihmJWVpRjxDWW2uwUzmZm39jrowVFRPgGhX/0tEV2+WGf0r+Cyxfh1aq4j9jStp+sJfP1t3sxUMh3HKzleIS20vNpUZ9cxdJDufFefvkuXH/9D9EMdL8fWPAxIu1YuMfXmmxjKO3XqCv3LQZ+uhH2JhoZceGt3ha4VubaG6E119vRR7C+HQRTwRLhk8J4MBlbcl5WsC1ZURfBJRM+O4yfVQ4GGnopjkdIsRTvEERqNTi8m5arKwt9+9srceed38Rppw3tQj+/Bnz6BuD//lq57/FJ70zvoTvCUmDF3WWaecAiwxsxHwhqQtg7PrfoCcbLRIKoGlRxMvk2OhVnzuXKoJSoKMsvGN6CsANLd9nA2l2g6n7h/1k9z0lnZ1dNtI5eNxIDNDZAve8na6ZgCNAhdFegjNGxomFh9c3hI4904rnnGn+q1da2D+9+9zb89ke2YVzrr7gwXaI6tt3CS+LpJlRMOh17zp9+QrhYdXz6idEVeYlYdrZ9XVbqYxXTUOhlsBU2tt1Ai8AAi21n49EJP96ci1MXxrYTLD+cykImpp/g8fD8eHlxPLy4D/ZJYV/f+vq0aTN76GcuQ5W+HEmQciXkwfkYIpT0IFIr2WHIXE3qW29VTxfXYdOmNjz44ASsXTsxij46e/a24jH6eeeVLzstv38fXnn+iqRMuJgGgRNrwB/2AIf1PABgUfTTBVleGE4srCLDxECT+wrjMAgtLVfErkw86PPvQGFvjA5P2XEZyZu4DxE6O2fOo7/LdDrpI85aq7lL6Nz29vWtXYUmQH8Nri7iPShj3TXv7buH7u/Gq5rUKiDiSXQNXHp1GSDx83NLr0Yqwqid1KfC6ibTBZsISLiIpFUTDXkRSMvtQT1ZkLHSh1rKAI1qHVpoF3VURvvcAqeihlZbc39CoEbW29Qry2prLuXbuw5PBBCx1ac3N6KMede8AfLTqzux7vFrcNbEDvQQiR9aCtz7ebps+ktiKaJbgkETVeh06cuJMGRuKsxuOAOWJzfMtrtgpG5XkbqUHLIgsyL2gCbygGCEFlxGyAa3/zSpDSn57FU83G7cxuEkhy9t8pQUGnQ3WkikfhZlMBqjq4+c2DMuq+M979uAsSdPwR/O7cCPeh3Z9Is+Tk4YN5t/S/bDDvBBmGzkGmA/DkF5GZX13GHqkywT1NzIj4QXpOrz1di7kZIPfA9IfY3if6PoSpotwWoWa5mnpPBApF5Kqx5aVtHyGZSuvSkYGlQ95UWZT2T+brH/eO98+uvXi1xDZsjA76xPtSUhHKGK82fIKHnHPY6X/m7WZqibeZ7ZshcEJwyDbqMIuQvz5kTofTD/8q+6RXxYhK46N9lE7GcW4C+Set1h/wr9m7PkqIDW1t0oLbaJuLSBlp2Io5eqscZJtKiXnFU95Q1RL0Ip9+AS7ft2bXfjOrLS88hKz/Fkh6eRzbaMvRQpT8bhdPWYWG6otaSygrYHR0F7O4SVHQNcbkB7NtQiXRR/fruvnnwzju4f6uGUnDD1uTQJ21EaeoC1kQn9NsDIrYLVmFlka6xIHSXB1+ull0i88bDtdlNb7cUsst20dNH9skbEq/nEg09Is7YzzKo8SK2/hSWyr60pn/Ksa0+o8kIWedK6CaWuUw4KmbsOgs0m608d4Wtkf5BXzgCLSCu7mWFT7juB9EyzrnxJYlnocH8aC4mMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMEwP5I9ljCP3xrfrwtksv5gPcEmp6iv4NZVCavl5g0yrgrXoceCYV985Lh//FtxdDD+XX36NgA8+oIDPqK/ABlFGTBgT7IFb4X2lXfamd+tI7/CI83odX7kDUvkk3H9v69dRxc6CZYYYOEnkTFJEP7OvCphfKkGA7txFz9gF7+3WAR1pO7SjjR6v5Cy+lKtfeDuyn/H9bDGwjcu+hejYYhw7MYWI/p2a+4tNZyHKfh+woguTS9qBqYlBgUM96ZYPnFs3qeBqCNQMeZSM1KSfPM3tmX3jlZKIFG+vGHoWXFeDR8DKhhwmWyAf2LsDL6zuwqQ/46QZHXhXvzkQmNVDkVgTup7zt68sgMKfXgBkLgLOXAs8SwZ9fQuXq5iguElNqTkMb/cVFUTLxbEICDep8Qy6hCwoztRsL/1L+K+EFrvGiHJltAX92Fj9ik6klvDrhhcPb9YPPKGRCDwOIzHOgYuY9/0QH1q2ke+Nen7zGTIZhJWSwoc5g/0ZgVx3YTO1M6gZ+iZpe93mgvtSv57UVkJtNZM8PUcZIF3otXXAmodOEdGv40YvALK2JhuQo6x9PpvoV/PjwTxHnuIsErC+Z0EcR2iovxq4dC7BiGVlZImOrTAdgU2fESxewAdCjWzil7d8BvEq6+iQ6xOzbgDOnA+sX+uUElyOsTROCzKaKMjIZ5RnLXJYwVtOl8Rnn/LVv4/2JJkxr3Aq73PQUQnEkUV7PyRXf8ufYdkcJesC3An3rF+D+O0nz1lGawZAO4a47YZUQzKodUAPGrwBnzAY+uI40dw3h/IOsV2FDzppK/w7BhUF1xGeRaC9FTtjWfDpy0otEe65d/7iOxDKQJpGF7nzP+7vp1y2iIUHXSIzmr+aCGZRipRhsWdjX92QdIxCWzE/+sIa1K7VG1plMg1rsocHga9tpeZ2295dlVZFTxwLnT6DlbGB8W8XdWZaDyS0PARN7gMtX0KCR1gfr8G/LzEpLrnVdEaNGpB4BSjMdlg0QaSYX8q18Wiz45JORVOB3AL8tX6q4NsLLyrTM7bRXpnParMUogxMeHxjEvL6+NXdjhIFO+jo8uaILP16pJYbQU1KYgZ/efqkO9K4CNm4vSd0I//OicrlmurtAzDKKbU8gMo8lz8iPr6CO7KiIJy1soEYYd52dloJMGfVZxYZ201Jot5hgbjXhx21OufEOIBVwsSqNx5MGUsHOfTdeOqZ0q/l7dU6bOY84fhuOI0ghu888fdJ9b7yxecTM4EVkvh3PPDEHjz+irbIWnYXV1duKyN/8ZyLzanLZ7aSzc+jwDW96kyzvi8D3/x24gKz2OR2sXbZWHo9xnaX0ePMH5Rk2F0ArW+iCEta7Iv1yLfom0qJcd6KIFV2OF2kfZVR/FfFT6W21r/KUz3qw4SLstmR1B3T6gLbIqfKDun3J9mWQZ9aW0GecdZ4icw3HEeiUtMmWQbz5060/wAgAkXkedu74Ah78Nv2FDzEHqnCS4/6HgW8tL4k8FPycLPlDz5ZtXjLZWWbBLhxF6kkfJ6tPF8CevpjMnOAtwaKkR0Fk6Am2FKFlsT/ICO0TSXgEi0npk5/nD8CRdcCrJ4N9vi2KYw6wdNOHFnY2unEcQgwWT9iOObRuXoR/uoue7Cn5wAdO9Kd+i9L+9h7gsR+jKfh7kiqfovZ273dp5pBKU79OXpX3UF9Gh8Mg7q5wilNNtunP0WoyJFLgQzjfl8xVbOy488sYxezSuLo2LfsPUiS4byTU6tnL0TzchOfW1bBrpzdgsk/uvnY/SY2NaCqeofZuvl/v+F4K7NlA1pyeQk66SScEHgTu1RBsJlmRKG13pOfsc6l8SyYccNyRJxEOHNllFVxSsUMvvlykrWluUBlHCG2dF+DxFfBdZfrPv3wl8HKTyWzwdB249WH4dwS9/hn155xP0KBPWenQRcI9ICYn7Lu2mtLti+SknX75dIkU2X3nYOpiaHwc6fVd/ZcJ3Rx049/JB7yrP76bvlwnzbsaRxX/QDLmqToimTOo3g0hS/3umxDJgUBK+ET17aITA/wukM4PWtX/VpO90SWQSjfELbdjZEI3B4vw3PogSZPiH76HYcHXVsO/nes+vEWDwtOvi/M8Yko2eT3P5ATW1lkE1QPEutYdo6qGeUDi3y/iowhElyW4TFHIhD5CFHKjf0cNGzfo8ybceVhD3oifDZNHUVnop16Db11pvY/6dRK58dpqNqlAIEZDJWGUqcswTxP5IwwzH1aiQd6GPaSItlxelV72tbprkz3lZKUyoY8c3dhYh/U388fSz/VhWPHVlYgtIXVqDw0O3zVH76Zv+uHbpvb1znBM4L0fIrVt5VQM5QV/3ucPH8M+pOFfFp788VLKSyIT+shxXUFofp4V9pI77fmXMKzo2+678Qz21YGTp+sdbc+SWthZZPuunLA5ZVlZJR14ezFdG0sU3xHHW0pR2eWHj8eb/Ppoe3s75s65plj39b2Mx364yuaNo7SZMy8p0ubOuRbnnDMRW7duw7LeB3Gco6MYDJr3HgrQxpZtGHbspkFg3+vA7Mkskfp1gNLGX+qn8fel9bZMWfeiLH8B1Lbgpfj616ewn4coz1GZlwzf8eA9EMwu+71qmoU+99yJWPbAvejsvBC7d+/GH31uIf7qL//M5rePOxVf/tIXcffSOwsymzKziOTHOUhD97Nbuf4Db92OYwJlpcOR2+Be7bpL3dqFtbqC1fGIIr3SbO3IVm2FhaedeSpYbQkuUSRrXQTHMxcf33JCp2kW+lOf/DheeOFF3PLHf1HsP/bYajz6SC96e/8Fa9Y+Y8vdccfX7f6smTMKq83zj0OoQSE9Rha+1du7H8cEu/eCsbLEIbrgxtb8dBna3JRYQGReYwudFgOVDdhUTlpfp4vKtlI9EEx4NFFDTyXLvJYRcwvJiS102+3svMArt4XdineRlc5oNrStShljyRZtjoUtq8lpjbv7jpDNYJ9okK99Re7SeDkR9NX/F1Fu2C6iPnDr3jRCt7efil27fu6lKVIrPX1CoCCKxMiAhPuQQEG4FSNvWdKUlV517hjzpAWrz9WtD6d1/aOFwsQpaP4BrKN/I5KLYCnRNEIr8ir9zDGVrHNf3zCP9IcfdXR0wH0uhXJ90lgcE7S36Q1GnFHjgf11Vsjvq+/JK6WTccq5pjT5mGqpUOR2K36i57/m79qRrI5/uYVthwIp/EqxaYRes+ZpfOADlxeDQ4UbPvabhcVW3o5fcPRjbIJE50zAMUHn2XHaqNMYoYMBo5TBjSWknA9DZC4tYmkgkRYffunDK22/jkzm+WjaoPCOr3wD48a1Y9l37sXmLa/j3edOwKd//+bCcv+CYz0mTOzCG+Qas3qU/vT0+wsrPdyDw05zITnvReHhGDBPLI2J5S47XT4acLl/uYvPFwehFQ3dbj641XaxOXyPhWsrkPzwexfa/+Knoon4wl/fhi/f8Y1CT28NiKwGg1N/ebaXZjwixznWY3INxbsc6ssP89dXZFakfmUjhg1XXESSYyzshWW8Lm1TgO1LdCFOUE5in9iCbXNNYr8zjOhqvA1VdlQmttOeb3us5FGqJYlC058UKv/y1l98q8zxXVw4FeVADN7Jx1WXYVjR0wlLGK4j1HscO1fqHW5Vw5u+W/sqxBcY7k0OH9WyIT4Ov3z4loxS/Pq+gw/RXn70fYQQQtTR1kZWeopOYZboghpw/mQMC9Q3hh9+LxytmHVWfmhvUIi0IGXwVKvg9PUHYgKxqg7BPca+jBGVpat65JcTtl1TLxO6OejFhZ3uxPNzfPUwWek//zD4m3GWGO1dwGuLERFCMGoxCcHD38GUkK49Z18N5Z0/RCRlCC8Z+6N9q54mekpfI2hTZgvdVCzBe7uYt0NBa80LyEJ2z8ZRxScuB2aYOwEjgxoMtl9MfphV4N0q1yWVfIcZ9Iv+zpbK8B0VuOEgR5p01V+gSM/Ch3mpfRGV56OAHDmpiSASEJlPuh2/2g2rpRXMA4vrf52IfZSkx4wa8Dv6LuAxgY79rh5g0+1abjAHsoWE7xJzfgXJy8vQc+FoFDZa5fNI5XPrHtr/cPjnSsigfb8vmdDNwxK879J+nDeFnWf2x//EbwAXNpnUKozBFz8SjuDKlfraezT5n19b0rAJaf/h/mkR8F8GdcJBZZW19T+qjTW02w6jkPoSJSwNWyd0+VlCqxBbyBgyCisNzMc1c+FLD5R/8ZPJnfaZG4H/3SRN/RGSMXfcAJzaxs6yJkALpZ03H3h1cWmdPbMo4gtAmLpGQEvmrInJBxnaztKaVskLU0oCzCb7tfl+5XGjFl27pgS30EtxPEKKpRghIFL3YlzH7ei5hqeyc0QbH74cuJmIePoQwwZ21YC/o/oLfr1sW0jfwiqcdQWweSk5/++xXbD5FXE2TKAaGd3pE2pZRCmmMBIN88ailEblG7VbJWVsemdnV020jl43EgM0NkC97ydrpmAEQYfQXWFj25kwWyYyUasmhIp592/PAs+8CDz9YuNGT2krgzbOI+t+8eQyfJeJmafWqs0iXh6VnUBkHktd+NdLgDFSTzshy3h2evoJN21FGdNObatpKKSOcadi2g22lrHtzJQUh8xCnT8o4phyPBYdjz9npqWonooinrLiQNRWHBvPn/5CFmtVzz4p7OtbX582bWYP/bxltFvDSIeUKyEPzscIg5IeROq5eH/PCvob17B2hclBNDD7X9OBy7vKSEsq8uhrOmijjT7aVkYeVWQeN7Ykrr1xs8GQsaJn95Qx7R7vYYdjOlcE/TAD2FBDi1IIFFlSRgNJacuw3w00kBzhUI5rbhnVjtsK38DjQ1jj42hg/Ts7Z86jW890OjkjzlrTH7ifDERvX9/aVRjB0MFnluHZJ7rwFJH64D7fSkfRSBFY8op1anvMSaSZry7P5o/mlqF0TbRRHnl0dJxWThYEG3lUksUfNJMGkQwZoL5xC22tpji8hTYRQ8NIoqkJg/xIo/7ERFWW3i9XbjeWMxlHDCL2bdi14yZ87y7grf50gMRU4MRGhOb7HaS4folI/OpS4PnPU8JOPUOW0PLCSA5YmcGlhyV0ITtEQWRFaiVBijC6wkgOoSWHJpTaB5KzVcWSo3Fo3PRMWqm8dFjeg7YfeRasow66yy0kUj+L//eZRXhpXQ3ryFrvSTiU7G1fxi5Ym29bJRKSBJlEevk0ekK5aj6wtdeRtrgLB7KEywyzJVl7xXHVFx868qhXpxx8uq9bYNtNRdOI3XqpfjQWKVU/ndcOB40iW+jhg41/p4I6vrKOLOp64L82aPkBZ3WF9MPfhhb5XWSRzyQSj6f1f3yVrPLfwQY296QFs8zcWptBoSdJTMBzvW4tB4XOQusA5yI1WFPWlgcpF8F+ehB3OMtcNRCM7wR+e5nQwwxN7G6o8GFv7ahhe52IXS+ncFOLmmTTeEbUPIVjSR+Pp0HhaVTtrKnAm33AK2SN19MDk8GdaYLyiTWLbZkm+xiUxxltNLReWst1ITHsxJtadsCPsh/e+tN5vmwwEsFJD+7dOFw7qVkDhN3PhD6GYORWwefMLLI1W+DNeknwbcqak4vvpd7ETLKCEVM6wvL8UUGe2h9j8yWRVxR5rVpLjyoHhk47S+uucwQq0iSRSBxM6lqZcK1Bl/fLOisvWDsS/oy0jtDxHUDY/YyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJGD/wawHL6B/hNrmQAAAABJRU5ErkJggg==';
    },
    5048: (e, t, n) => {
      n.d(t, { Z: () => a });
      const a =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAoCAYAAAAR+iSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABsBSURBVHgB7T1ZrF1FclX3vgW8PuMVr88GL3jBNl7ABoMtJvMBREASKR8jJWSRRok0yiRSpGiSCFB+RhONNPnjJ4KJooSMQgBlMlGYJDZmsMc23sBgYxt4xrvx8rxgv+Xe0+k+p5fq7upzz3vYFtG8svvdc/pUV1Vv1dXddfogjMAIjEAShBAb5c9yGdTvChm6dFDQK0OPDvtkeBsRt8D/I0AYgREYAQ9kp1cd/Lsy/IkMl2Q4I8Nn+rdPBwV3gFMIc2XolqFfhi0yvCiVQQ98zWFEAYzACGjQHf8FGb4twzYoRvVeGBooGpugUAhvwNdcEVRSAINXxcbt725/GiHbmGXQjXkmEdY/tD5/LjL1p8CVeMWFwCJOhocefCj/FfpehZ07dhZxmREEYc2qNZaOofnervcKWuDSrnpgVURv7+69xb2ipXmvWL7Cw1Hh/f3ve2kV32VLlkX5OPD+gSJOOHpLFi+J6H300UdeXhW9RQsW+fRk+PjQx65cFMhn8+9d4OVLhSOHj9o4w/eee+7xaKnw6Sef5qVG47rnzHX0dLke6zlW5IHgzpo120unwvHPT3iyKN7Tp8+wsppyOXniVCTftGl3R/TOnDnr0VIwedIUR0//fnHuixwNSRlOvGuSx1fJf/HCRT+txJ/QNcHjqfB6L/V6eVVh3Ljxrkw03tUrV22eFK2pv9MOM77TCX2HAG7sl1H9xeOBgQGwbUpDe1u7o6/bSKPR0PVfQG0cwOj726BzFsC5H0oz4icF3uDAoJd/laCt1m7vhZaz2Ww6vrqf1Go1l1dKw0EvKqWFMmTw5kpoPR1pK3vYuCGekyyfl8y6BUqBMqIv8loDV4gQXAcgOBxKg8SLgA4iyXAKNB1k4jx+ghEzpF+Sj5g2kij0GgWfyNFHJPKIWFYh/yE6mpYnEqShGHFheRAqlpaRnyKW1LOICTl6pNPY8hAxLqbygORH/dEdRnUKwckFTvaIJs0OAmkvCDO/1wkTn2mDK/8p2/z5CN2nRespwV9B8zLAdWlD9ElFMO1FOVdYCnDqr8Fv80gabUZoosc87mtC94m4D3YJtVYhZED47h4QPSjgBakIfgwJYEt+8+bt3bVm83XJYYXJ8CMPP+JpWiXwtm3biKYtGs+6h9Y5HB12/HKH62C60NeuWRvh7dq5K6K3etVqH0/S2b1nd9EIhKO3csVKj4fC27dvn0dLheX3L4/offDBBzZPeaFI/KVLlkaj/YcHPoRw1F183+II79DBQ86y0bwXLljo40k4/PERL50K8++d72t3GXf06CceLRXmzZ0X8f3s0x6/kUj82XPmRDw+P/Z50aYIvZkzZ0V4J46f9Gip37vvnu6VsZLhzOnTbnDQaadOnebRUnjnzp7zyljFT548ObJuzn9xweVf07xrwkSXN8330sVLTpnq9tA1vivKx+XLV6J2NXbMWKiNAZjxtwD10QDX3pWd9aoe7cHJ3NHeQTtYfj04OOgrFPmvXm+DULkpq0A9q3VKuZ6sQVNaFT2/gdDsdXgq743Bhp8P+VvHuld2SqZmIyuUkS4Xz7Irh55+AZvWQTwVqYURjQE56meDeyWXFVAFRFEEFlLKHMM0EI8KLfkU9LFs1KtCyxMMXOOgil4EOAkGIrwQCR4hCB43shwwQTdVBHRESODYgbmF8YCBdRbl1bATJXJCebwoKy8uL/QeS9ImwTGc9VLR+a9ugdzkt8kDmQbl0t91OTZd/nepdF6V+K+2w9V/aYdr/9YO1zfXoW9vHRrn0rwzuWR48bUspzvnFZevuEq1ZVOhXYihtfPuToS974F4JnzgKQDREM/IiJelAF2sCWWEpo09LLFAWxbCirhDCdLAIE4DXCO1DZErIaJkqiiWQJ5QFk5hWWQOSszBoSglap7GZBLlTNPqOjEjgzWfg/xUGTlsx0bNGytkBCOh+WsOFyo0bFrHVPG0UkAWrUCc8mey8bcVnd+jQ2Dw0xr0viZx3pLWwUE5AiuDY5DIKq+b52owcBjh6n9LBfGm3AL4lGVarE/8NIPaWGlF/Y3/zENFNrnjGWkCqApdNYTXpRL4XRpZI4S7Je2X3T0jRVjY4Tw4UcGI/nNhbJoAz1UExp04pfE9uhxuSYdNAXJ0SlDDxsjRgpJntF+LCukSQMtVgEh3lkrEOIVqKtSnl1aWAS2bHJNKDlmZw14Ccdm1Ui7k+aRn22HcE7Jjv80/z75E+PJn7dD/yzbIrkFlyL6UlsKOwlJQ1wVZf6i/9r8AE35byvBtiNp2nuUW9Y+ksLEELwVSCfxoO4hue++kh83gHBziyqdMUxHIxAlCj1MIgZnpmRiJDohcg4Bg9OTs1RAERJaAdy245MwUgCkrrFQxJJ9l6ZjOy+Yq1ehpudhHvBXF4miLAkO65jayCAOZELwBxXYKzgII0nmxpE78qiojRG7kT8cMubvxxx15JxUDcTI16l//D9nxLw2xZxFQnf/Kf8np9CnSWbXOU9OBy69LC+TP5fRjPJPY5LvFojddGx4idMnpwOuUnVz02ypX+8XL+a1kvOGRDd4imYJ3f/GuXXwx9fDwuofd1oUO27dV2AaUaXbu3BktvK1ZvcbhQfFMbQPmcyPCw24DksWyvXv32rRl24D79++PFhCjbUAZDhw44HBS24ASDn540ItTuIsWLfIXJIXeBhR+uSyYvyCSj24DGnrz5t3j4aiQbwOS7VGF193dHS0g9hw75vqP5h1uA6o0J46fcOk0zZkzZnp1pH5PnTrlL3BKmDa1ZBswA1t/UyZPifDOyW1AKpsKdhuQ4F04f8GVnW5fyW3AYNs43wbU5THtr+TW11Q5l9/Wb+vfjDl4ugOu/g/cVBj9oFQ6c7Q4kkemtvfk75gNCDfkTvOJv8igra3Nqwv122w0gW5n5tuAWCP5h6gtDgXkbO45tTuQWwA1FM8bokYDRRa0aUTa7vC0bjhyerdoM0/pWC3OjRhUFiAjBiRwTRLBx1O+dD+X0mHXKKAFCCZfKd5CPywxTcM8mrLDVBkhEPNR+HS8EbQF5LjCpRPMc042DpcpD2pJeDQ5OcJfW/U4tPyEN/KnXW5gjN4g5+mHfdnyAfcawrV34KbD9T2S9nWIptTXdwmY/Ps1qBubm3R+Fkhd3wyQ3eAF9VvbvHnzRsm0O3S28RjTyhRBY4so+yaZ6bzINtpE+kDp5LKVZZzTRZjGKeVp8qvzmlR0KRnCDi0CRmFHqjE0LKpIypvmkRLPdQTv114i+yzkl9ylCO/DgYCUa0jTQsY8Q44FXxHhjCHkMfEPpImvdiyvxbRu/LyNnRJ8VVALhdd+Ab4Sx2IqcG2ngCl/VPMG17w9hEqdye4QdwE46N4FYmNNwtMFE8FrGAG85qYNj45+yDTcoGGH6b3GifFIzq1HiODedWIsFsNCuQ0at5JteCIkGw8bJyA9Z9d0KQ8OWjo4AfjbbByjkA8pL0wkicqyTIuEow/XBqAivbBpUAFrLegL8yNKSfsdx+HeuVJ29N0QrUcMfiInwF8mKugmgNr37+8ByjSHG+9rBUBYC89CRg8/gorKPwVy4vF0TS7IrbC2eBlBb8TwO2yrBgE0mjQiDKyLVKLItE90MGOdICbMUyo7BDInRi7hWh1HLJ6HUaXVasRj+HHxiKn0mOwkIQ32nkYzUyPBWBpu/Va0psdZDqwFQht6i46IFeOC+FGy82M7RKv6inf//jrcauj70GOaQ/OykMpBwOiHA2RjgZb0brqoPlyQVbSxbcOGDSusZ5Geg7yz9R0IF95yT8AMvAW6be9us5QM3rp1jCfg9h3RXPnBtQ86PM13165d2gxEy2P16tW+p5iE3bsDT0B5vXLlyoIemUft27Mvki/yBJThg/0feIuCCpYuXRrh5Z6AppHquMWLF0ceiMoTML/Vsqn4hQsXRgt+uScguHuFO3/+vbwnoB3UMI+fO2+eR0vF9fT0RAuSc+bMcXGa5rFjn4PnByDjZs4q8QQki365JyDhqeDUqdOOno6bOm1ahHf2zDmbX7MWM2nS5Iiv9QQkcXdNnOgtRuaegJcuFYuMmlbuCdjV5eVLXV/uvQJjFnfCjRNt0NffyB91dnbmz9SUQOgtu1sJamdg4EwGHdPqTj7525BroJ2LM7i8JXMuzlLueq3u5b9YQMxcXvXiKiQHh0rQLW0fufVHzW4rm4hHHoR4Lq+xbRxElxGkFuIodzt6CqLtrOGBcVoBlfzvoQSFsgdMDbopWx5iK8D8QT4ppqyNwLJxl8gVtY3g8u8NqoLhJbgECd4h1Cq2vWCK5Y34URkEcWXymShkxkqaPfl81MI6DJzUL9gQuQaOwW0DpWxo51cw8LncEXiEzgHAylYKxkIYfudX0FWLOpkVBOO5JxWeNvjwefgoYd6LEFGQBEb5tCqIkEbU2EUink9fun6RSo9BAAAhYhGGtHBDOozhIYZa2xjQQj+6VRoM48L7zJEtW7AKwfcv8GkW0weLyCtDJs5L5xjZ6Yja/29c0bLSEfgC3DZonseofBpn5PTkfiNOqgNB7GwlqnWNVlDzGqfXkZgRgmpyV/OBpC3uabwIrqkSSnXUfKQv6aSCY+Tfsn04UoAQz+NzRD81N0+OlFqiTNgROywTKk9gOUXykTpLrnVY8sjXH1U4IohjcPJbZPhxwNBheXAd3chPZRZMukB5GAugc3oNmldjEZq3UQHkC42BAOodhPr4VKPUOPYPeGUTWUvDgFqKQLRtZJQ2vecad6pCOE1O03CNkUuHicaNkFgY4YjG4ClA2kFTctHyEL58VpYA1+KEZWkfYXphFCHawYgtNFdnnnmYUsop5cR0rOSiH7Zog2a0YuuGR2chHHBoWVPCgfIwFkB9rLRo++OB41Zs/aUgf48gKIOsP+ERmCcofjyvP9ImKyndFtC2detW75AFRXjDoxsiD7/cE1CAt1i2/uH1Ph4UB4LQBUQ1aqkFv/wxWaCzB4IQvDVr10R88wNBjLrTYdUq5kCQPXujV3BXrCheaKSLiNGBIBJ32f3LXJymoQ4EsX4AGnfJkvhAkIMfHYw8GhctXOTyq3/tgSCKnpZn/vwFBR2yiHj0yFF/IU/+UweCAC0/kTgQZO7ciF5PzzHXWDRe7gkY0DuuPAGDvM2YMTPCO3nylGuYepp4t/EEBIeXewJ63pAIU6ZM8WgpUAeC0EVaFSZOnBTJcuH8xYhvyhPQ4Bj+48YXPewOtfCnoe9Gv+6MLu52QKYP+nA9WglRg7b2Nq/tqwNBqHekiqcHguROgWWOQxWhxhIQzHXql468wjwSJLkAwATNBGCgxWmDAU4+jh4dxZl0yOG1kCtZVEYrU5oCGOsBeRkIsWgfWEDJNqAPCBXwsIReUAZRPRDLxnopmj9VBiPhy2HyG61tiHIatk0RnsIrV/2AOFmp7T/sILhmFO34ij1oCIDtcZw6K0AdHhK1Ia5cbgH45wEkTDzvFkmla7CdhzSOUvdVgHQlB4VATb0Ihz4X5BFtsACesjK3gvIQPF0MehTXwSy/kEaVDkF4WXmZ9GnvO/9B0l8CfEUsysqe40s6jAiVfNV8YhBM8gptLkpvBXRxpS9fSbxMzv+xM6aJo+G2AXX7pXFqJyCPDhVkgGshrOevADWWMMfT+IpD0HmgRJhwakYbN8lg6PGUGrWT9Elj8tCNyCEeRUESGQ5EYfoEXkyUUTypysKYJ9C0HDDlwyrdBI+WNFsBrcdUY2RGNBD8s1ZHgnk0DL4QrfNlKk/+7zsq57sT4+f1qRVcMW8S1LvCYkZPAWCVctVgFTEOpeJiUAqgt5STlQN57WuSkgpWo0Nlk5rS0JGYqPhWEM7ZI2A6b7Qazsmh8yqYSonYUCUZKLpyDWtoC8cPiBHIVQ95R6LlYSGA1ZRpIr2HQzqyp7C8ASFBpGzQ4OqdURrCFVD0zN4HNzf2SgVwN0T82mbfPgXQPiPMooCO2Qh9B+ytNz1LvubMDZ7Dg962Rx97tEcuPqygC09JT0B9beJzT8BgATH3BFS3ZLFHnQmYp8tcxtauXRt5+OVnAmaalgblCWjp6UMh97y3J/J4W/nAysiDbt/ehCcgQOQJaHlAQW/psqURvcIT0LbCPNy3aLHD0b+HDh2KXpn1PAE13pHDR6LXru+9Z75PT6iFQeIJqPMyb17JmYAEt1t5ApI8qKDOBLTlost05oxZLl8KmmrB72R0luP06dM9nip4noCioGvPBNR8laz5mYDCL5dJkyf7C4MynM9f/fXjck9AUlbUE9DQ8zwBSVBnAor9dRj3m3dCX/9g3mWMJyDI9dCBsZBvEd5KqI0WULsrg1rd9wTsnCPLeWsTGk1hy1iVeb2e8AQEdGcCknIcFgjYpyyALeo66ZU2PMLVgBn941ETWk8JkKQVKSb8bctnIT3z0pS5RUaGkJZoQTPEHyZwi3ac4UH1EFtmZoA1ZrZwI423nUevQwIikAWYe0+QEnkAvE4DURJMPjNwdVcT2sYV24EhqJeEbjV03iciw0Rt/+VvBb7jnlRyFkO/qQ0XZHqpABrwpscYzU/rQh22FIJJ73Vg4UmJ5Jq5LG0c1bVRDMk5dcawCBSQ7RslSkUwcdG0isozjMJmyw7LEMHXDkEdeVZM6ppWmoh50HxEoqQUeajHW+WBab5n/3EARt9XizpZ53xmfeAmghr92+eIKK+jHylOI6aCYsUqTunJoYBM/0YN23GLpNYTvnJbusrLNPhwNIgsCmZ0RK7zh70mMRqUakpM3iTxI0egyvSBnRs7wgw+XXqNFG8AVWuZkz2M8xSoz4krMvSqIdJGJfcJXNq2SscXka42hq+A9LsASO7P/oNUAMvrcjcgLuyxj8Mt2RLEdgGjHs2oSDmoxb8OOf04+wPwFCO3zuQBZxUPD3oeAHy7aIoZvJhkHJqPoZlOK1cEeAS8/WMyr7E0UhZAQhakpiltsJQWApQ2plA+ZgSJ7kWi5bKjT0k+qsgWyOT7VxAc/cttFwrKj2s8w21QIiFvhXKJ0ocWRqpQSHvx1j+AUWBM/TWvCvjiJwMwZnktoqdO6+1Y1YSbDXeskfP+URBtWty5VK5N/Axg8LiTodVCrsErva8I6oMhXvK3N7+9Vzbu/EMg6kxAz9wTxBMwM4kQ1q9bH33UYfv27fradfRKnwYzZwICeDRLzwQ0cZn2BBSOloqv9Gkw5Qm4bJmTRdMwnoBFTjHnwX0azHoCEnrKEzDPB5HPnglIFGDuCRi8SnzkiD4TkJRL8kxAQkuFud1zo0VF4wlo8yGvZ82cHdELPw2mwozpM11D1PTyT4MF5cJ/GuwMAPHGU7iTJ/OegHb3Rvc/6wlIymYonoAYlMu4seNtHtTHQOa9JhcafzoAg+eFe61cQmdHR/52oDoa7Ku6COcj/wMIHd3gKVnlCah8/8c/hXDkqYbkh+5MwMzhNQeb0WCZnwkYvLpvymeI0POAwLnqwhqjGWTPgtkSLNHa4V577hgU4jBqqWyE8d47GEpmwlEEed6+HCIRD1G+42lRBVm0HNF+fh7vF1442wGAyl5/pdlMNQzBxxm9FD5LviAFxJLDFjwTBhPlnaTFHZeWpxEsD++wEuZ5rq+uyc7/91LJPNkuTX4E+9q7BmWWdz0tTfQxMGyodQkY/c1m0fkDUNOPid+qwenvN+3+P20jdCoavX9hykhA5bUCBnrVV4KsrOZi06ZNPRk2/9RjZK6t9OSHVHh8lkAMyNATYUZFgMulLwPaOBLmJsZv4Dj6pIC5fCHLUpQ9tAqhQBOBSc8koWlSdE3ilFbFxG8ZbkqWRFzk4h0OGsGJQKzyMfGpDktGTgjLheJmfnEk98/1c/V1n/NvDkLXhnqMA4WV0PVb6j19SWt0oowZUIt9d65pwphfa+Zmv1fXmkzXryOc/6cMLv5zMBIw/YzK5MUjxANWRcgE/B79RJjnCSiVwCuZaBaWADd60EvSYbg+FW8rxvS8EaaknPNFnmDlnfpzs+kTBRouGLGHKmCUrAT4hh69NVmVMDOipt2q/QeCXgTKOnLkQvaytVwpoPlMNU4EthOL6MJPg0yZRDjQAgIax7/fD01pDUz4RlsSp/NeuVL/9CCMerwB7QszqE8RuWlv0Tvk7oGchdwhZ3yjNjVh9BNNaO9ON+TxTxTbfif/kq41+B2rkgUoSqydNPTKzv/casA3aGT0deBN39j0hrgh9kkFvlnedgPVvoIZATKIfZgFsKOnVRwp5ytOEyK4o5LoI4yVgI0rgeiY8iKyUDBGNtqAq5QvMxKKlEbnkgkGT+c7okXxg3uvjAV5lJeLYMsxEojUDVKTlJYxuLhQtwF5Zs1VCL55x+WXA2oBhHIKX960rwi6uGDAOPqdG7Dwx6NgwpNt0Pvzhi8XyVt9qpCd33Xa9np7JF+jIaI4W2adch3i8eKln6PfaoCfF6epaZoiqlXDKcHxYZ80+5/lPg5amnrzW1ufqwl4XqJ1V/46sDkTkHoCbt+R07MLb/Lf2tVrXaMwZwIqT0Dw6UVfB5Zhz+49kaed/TqwKcDMeAKi4wHEE5DIR88ENDSH/XXg1JmAC5gzAQ/HXwe2noCkXMyZgHRRaG73PFJW4J8JmLmGMXv2nIjHMe0JiMRMnzl9lk9P6DMBg3JRnoChB+fpk6ejcpk6ZZqfD9BnAhJa6jo8E1DJn38ERIHpc4J8Hdh0sMx9HdiUS+4JmPo6sLdohvnXgc39FDnxHf+UXJD810FoXBHuXBVR8nVg8OnZhTwSr74O3DG1BhOercH5V5tw8nvSQjD0iIekwgPdVkwbSZ0JGOa3hYt3T6vPg7dBCWz65qOvyJ9Xtr617TH5+4zks0ISVC/Zd9mMms5KCigSKBzZBegRjpFdJNK0Ao5nTsMwA/+LMZx89BdJ8qGAZ1pXGeKwPJ+pQYBaOxiTBKtsCXl0aaM6A/A7Tkri8JlIXBMZPAsLwHNfjaq5BX/PSimz0kxVM7jhlOrcDwH65CbNXX/YBgMnmnD9IwHNK4LPC5XTPGbqSI36Yx+qye0+hFM/aMC5lzI/Hca07DsOJc2mRZtSU/ceibFFUnpD7fNDC6hkP4zACPwqgPpArvx5Xgb1rYweGTaDfVmuMqjBUTkXq5diXpLhRbnwPFQatw1GFMAIjEAARBFslOEOGT6DQiGojiznHdCnUe/QQb1n2K1/lQL4kQx/93Xu+AZGFMAIjEAJSGXwGBSKQE19u3UwR3v06qAWm7aoX9npW5rdXyf4P36svSOE9b6ZAAAAAElFTkSuQmCC';
    },
  },
]);
