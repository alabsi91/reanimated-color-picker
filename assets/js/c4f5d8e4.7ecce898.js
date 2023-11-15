'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [195],
  {
    9294: (e, t, n) => {
      n.r(t), n.d(t, { default: () => l });
      n(7294);
      var s = n(9960),
        c = n(2263),
        r = n(7961);
      const a = { heroBanner: 'heroBanner_qdFl', spin: 'spin_vmyB', button: 'button_JGCe', dance6123: 'dance6123_c_Nb' };
      var o = n(5893);
      function l() {
        const { siteConfig: e } = (0, c.Z)();
        return (0, o.jsx)(r.Z, {
          title: e.title,
          description: 'A Pure JavaScript Color Picker for React Native',
          children: (0, o.jsx)('header', {
            className: a.heroBanner,
            children: (0, o.jsxs)('div', {
              className: 'container',
              children: [
                (0, o.jsx)('h1', {
                  className: 'hero__title',
                  style: { color: 'black', textShadow: '0px 0px 5px rgb(250,250,250,1)' },
                  children: e.title,
                }),
                (0, o.jsx)('p', {
                  className: 'hero__subtitle',
                  style: { color: 'black', textShadow: '0px 0px 5px rgb(250,250,250,1)' },
                  children: e.tagline,
                }),
                (0, o.jsx)(s.Z, { className: a.button, to: '/docs/intro', children: 'Documentation' }),
              ],
            }),
          }),
        });
      }
    },
  },
]);
