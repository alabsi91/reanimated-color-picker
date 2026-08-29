import babelPresetReact from "@babel/preset-react";
import wikiLinkPlugin, { type Options as WikiLinkPluginOptions } from "@flowershow/remark-wiki-link";
import { defineConfig } from "@staticbolt/core";
import * as plugins from "@staticbolt/core/plugins";
import { rehypeExpressiveCodeOptions as themeCodeOptions } from "@staticbolt/docs/ec-config";
import * as theme from "@staticbolt/docs/plugins";
import { toString } from "hast-util-to-string";
import postcssPresetEnv from "postcss-preset-env";
import workletsBabelPlugin from "react-native-worklets/plugin/index.js";
import rehypeAutolinkHeadings, { type Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings";
import rehypeCallouts, { type UserOptions as RehypeCalloutsOptions } from "rehype-callouts";
import remarkFlexibleMarkers, { type FlexibleMarkerOptions } from "remark-flexible-markers";

import { reactNativePlugin } from "./plugins/react-native.ts";

const siteUrl = "https://alabsi91.github.io/reanimated-color-picker";

const rehypeExpressiveCodeOptions: typeof themeCodeOptions = {
  ...themeCodeOptions,
  themes: ["laserwave", "rose-pine-dawn"],
};

export default defineConfig({
  plugins: [
    plugins.loadSourcesPlugin({ include: ["./pages/**/*.{html,md}"] }),
    plugins.transformCssPlugin({ plugins: [postcssPresetEnv()] }),
    plugins.transformJsPlugin({
      presets: [[babelPresetReact, { runtime: "automatic", development: false }]],
      plugins: [workletsBabelPlugin],
      define: { global: "globalThis", __DEV__: "false" },
    }),

    plugins.bundlePackagesPlugin({
      alias: { "react-native": "react-native-web" },
      assetsDir: "sources/assets",
      define: { global: "globalThis", "process.env": "{}", __DEV__: "false" },
      babel: [
        {
          include: ["reanimated-color-picker"],
          filter: /\/lib\/module\//,
          plugins: [[workletsBabelPlugin, { omitNativeOnlyData: true }]],
        },
      ],
      chunks: {
        "react-native-packages": {
          include: [
            "react",
            "react-dom/client",
            "react/jsx-runtime",
            "react-native-web",
            "react-native-reanimated",
            "react-native-gesture-handler",
            "reanimated-color-picker",
          ],
        },
      },
    }),

    theme.contentPlugin({
      include: ["pages/**/*.{html,md}"],
      exclude: ["pages/examples-all.md"],
      baseDirectory: "pages",
      collapsed: false,
      layouts: { default: "@layouts/document.layout.html" },
      customizations: {
        "./pages/examples/example-apps.md": {},
        "./pages/examples/panel1.md": {},
        "./pages/examples/panel2-saturation.md": {},
        "./pages/examples/panel2-hsl-saturation.md": {},
        "./pages/examples/panel2-brightness.md": {},
        "./pages/examples/panel3-saturation.md": {},
        "./pages/examples/panel3-hsl-saturation.md": {},
        "./pages/examples/panel3-brightness.md": {},
        "./pages/examples/panel4.md": {},
        "./pages/examples/panel5.md": {},
        "./pages/examples/circular-hue.md": {},
        "./pages/examples/luminance-circular.md": {},
        "./pages/examples/hsb-horizontal.md": {},
        "./pages/examples/hsb-vertical.md": {},
        "./pages/examples/hsl-horizontal.md": {},
        "./pages/examples/hsl-vertical.md": {},
        "./pages/examples/rgb-horizontal.md": {},
        "./pages/examples/rgb-vertical.md": {},
        "./pages/examples/with-rngh-scroll-view.md": {},
        "./pages/examples/with-reanimated-scroll-view.md": {},
      },
    }),

    plugins.webManifestPlugin(),

    // Html plugins
    plugins.htmlEnvOnlyPlugin(),
    plugins.htmlLayoutPlugin(),
    plugins.htmlPagesPlugin(),
    plugins.htmlInsertPlugin(),

    reactNativePlugin(),

    plugins.htmlInlineScriptPlugin(),
    plugins.htmlBundleStylePlugin(),
    plugins.htmlInlineStylePlugin(),
    plugins.htmlInlineTextPlugin(),
    theme.htmlCodeBlockPlugin({ rehypeExpressiveCodeOptions }),
    plugins.htmlSvgoPlugin(),
    plugins.htmlBundleScriptPlugin(),
    plugins.htmlIifeScriptPlugin(),
    plugins.htmlMarkdownPlugin(),
    plugins.htmlPreloadPlugin(),
    plugins.htmlFragmentPlugin(),
    plugins.htmlMergeStylesPlugin(),
    plugins.htmlBuildTimeScript(),

    plugins.writeFilesPlugin({ clean: true, minify: { enabled: true } }),
    plugins.convertImagePlugin({ preset: "drawing" }),
    plugins.copyAssetsPlugin({ exclude: ["sources/assets/manifest.json"] }),
    plugins.robotsTextPlugin({ rules: [{ userAgent: "*", allow: ["/"], disallow: [] }], sitemapUrl: `${siteUrl}/sitemap.xml` }),
    plugins.sitemapPlugin({ sitemapUrl: `${siteUrl}/`, exclude: ["google*.html"] }),
    theme.pagefindPlugin(),
    theme.llmsPlugin({
      siteUrl,
      title: "Reanimated Color Picker",
      summary: "A pure JavaScript color picker for React Native, supporting iOS, Android, Expo, Web and RTL layouts.",
      include: ["pages/**/*.md"],
      exclude: ["pages/examples/**"],
    }),
    plugins.analyzeOutputPlugin({
      deleteUnused: true,
      exclude: [
        "pagefind/**",
        "manifest.json",
        "**/index.md",
        "**/llms.txt",
        "**/llms-full.txt",
        "robots.txt",
        "sitemap.xml",
        "sw.js",
      ],
    }),

    // After cleanup to prevent caching unneeded files
    plugins.serviceWorkerPlugin({
      globPatterns: ["**/*.{js,css,html}", "sources/assets/images/*.webp"],
      sourcemap: false,
      skipWaiting: true,
      clientsClaim: true,
      inlineWorkboxRuntime: true,
      cleanupOutdatedCaches: true,
    }),

    // Core plugins
    plugins.developmentServerPlugin(),
    plugins.coreMarkdownPlugin({
      allowDangerousHtml: true,
      remarkPlugins: [
        [wikiLinkPlugin, {} satisfies WikiLinkPluginOptions],
        [remarkFlexibleMarkers, {} satisfies FlexibleMarkerOptions],
      ],
      rehypePlugins: [
        theme.wrapTables,
        [
          rehypeAutolinkHeadings,
          { behavior: "append", properties: node => ({ ariaLabel: toString(node) }) } satisfies RehypeAutolinkHeadingsOptions,
        ],
        [rehypeCallouts, {} satisfies RehypeCalloutsOptions],
        [theme.cachedRehypeExpressiveCode, rehypeExpressiveCodeOptions],
      ],
    }),
    theme.ecCachePlugin(),
    plugins.coreHtmlPlugin(),
    plugins.coreScriptPlugin(),
    plugins.coreStylePlugin(),
    plugins.coreWebManifestPlugin(),

    // Cli plugins
    plugins.buildCliPlugin(),
    plugins.developmentCliPlugin(),
    plugins.serveCliPlugin(),
  ],
});
