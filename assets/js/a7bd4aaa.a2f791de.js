'use strict';
(self.webpackChunkmy_docs = self.webpackChunkmy_docs || []).push([
  [518],
  {
    8564: (n, s, e) => {
      e.r(s), e.d(s, { default: () => l });
      e(7294);
      var r = e(1944),
        o = e(3320),
        t = e(4477),
        c = e(8790),
        i = e(197),
        u = e(5893);
      function a(n) {
        const { version: s } = n;
        return (0, u.jsxs)(u.Fragment, {
          children: [
            (0, u.jsx)(i.Z, { version: s.version, tag: (0, o.os)(s.pluginId, s.version) }),
            (0, u.jsx)(r.d, { children: s.noIndex && (0, u.jsx)('meta', { name: 'robots', content: 'noindex, nofollow' }) }),
          ],
        });
      }
      function d(n) {
        const { version: s, route: e } = n;
        return (0, u.jsx)(r.FG, {
          className: s.className,
          children: (0, u.jsx)(t.q, { version: s, children: (0, c.H)(e.routes) }),
        });
      }
      function l(n) {
        return (0, u.jsxs)(u.Fragment, { children: [(0, u.jsx)(a, { ...n }), (0, u.jsx)(d, { ...n })] });
      }
    },
  },
]);
