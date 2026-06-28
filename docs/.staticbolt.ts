import wikiLinkPlugin, { type Options as WikiLinkPluginOptions } from "@flowershow/remark-wiki-link";
import { defineConfig } from "@staticbolt/core";
import * as plugins from "@staticbolt/core/plugins";
import { toString } from "hast-util-to-string";
import postcssPresetEnv from "postcss-preset-env";
import rehypeAutolinkHeadings, { type Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings";
import rehypeCallouts, { type UserOptions as RehypeCalloutsOptions } from "rehype-callouts";
import rehypeExpressiveCode from "rehype-expressive-code";
import remarkFlexibleMarkers, { type FlexibleMarkerOptions } from "remark-flexible-markers";

import { rehypeExpressiveCodeOptions } from "./ec.config.ts";
import * as templatePlugins from "./plugins/index.ts";
import wrapTables from "./plugins/wrap-table.ts";

export default defineConfig({
  plugins: [
    plugins.loadSourcesPlugin({ include: ["./pages/**/*.{html,md}"] }),
    plugins.transformJsPlugin(),
    plugins.transformCssPlugin({ plugins: [postcssPresetEnv() as never] }),
    // plugins.importAsStringPlugin(),
    // plugins.customEasePlugin({ replaceInJS: true }),
    // plugins.i18nPlugin(),
    plugins.bundlePackagesPlugin(),

    templatePlugins.sidebarPlugin({
      layouts: {
        default: "@layouts/default.layout.html",
        plain: "@layouts/plain.layout.html",
      },
    }),

    // Html plugins
    plugins.htmlLayoutPlugin(),
    plugins.htmlPagesPlugin(),
    plugins.htmlInsertPlugin(),
    plugins.htmlInlineScriptPlugin(),
    plugins.htmlInlineStylePlugin(),
    // plugins.HtmlInlineSvgPlugin(),
    plugins.htmlInlineTextPlugin(),
    templatePlugins.HtmlCodeBlockPlugin({ rehypeExpressiveCodeOptions }),
    plugins.htmlSvgoPlugin(),
    plugins.htmlBundleStylePlugin(),
    plugins.htmlBundleScriptPlugin(),
    plugins.htmlIifeScriptPlugin(),
    plugins.htmlMarkdownPlugin(),
    plugins.htmlPreloadPlugin(),
    plugins.htmlFragmentPlugin(),
    plugins.htmlMergeStylesPlugin(),
    plugins.htmlBuildTimeScript(),

    plugins.writeFilesPlugin({ clean: true, minify: { enabled: true } }),
    plugins.convertImagePlugin(),
    plugins.copyAssetsPlugin({
      include: ["pages/**/*", "sources/assets/**/*"],
      exclude: ["pages/**/*.{js,ts,jsx,tsx,css.html,md}"],
    }),
    // plugins.webManifestPlugin(),
    plugins.robotsTextPlugin({
      rules: [{ userAgent: "*", allow: ["/"], disallow: [] }],
      sitemapUrl: "https://alabsi91.github.io/reanimated-color-picker/sitemap.xml",
    }),
    plugins.sitemapPlugin({ sitemapUrl: "https://alabsi91.github.io/reanimated-color-picker/" }),
    templatePlugins.pagefindPlugin(),
    plugins.analyzeOutputPlugin({
      deleteUnused: true,
      exclude: ["pagefind/**", "robots.txt", "sitemap.xml"],
    }),
    plugins.serviceWorkerPlugin({
      globPatterns: ["**/*.{js,css,html}", "sources/assets/images/*.webp"],
      sourcemap: false,
      skipWaiting: true,
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
        wrapTables,
        [
          rehypeAutolinkHeadings,
          { behavior: "append", properties: node => ({ ariaLabel: toString(node) }) } satisfies RehypeAutolinkHeadingsOptions,
        ],
        [rehypeCallouts, {} satisfies RehypeCalloutsOptions],
        [rehypeExpressiveCode, rehypeExpressiveCodeOptions],
      ],
    }),
    plugins.coreHtmlPlugin(),
    plugins.coreScriptPlugin(),
    plugins.coreStylePlugin(),
    // plugins.coreSvgPlugin(),
    // plugins.coreWebManifestPlugin(),

    // Cli plugins
    plugins.buildCliPlugin(),
    plugins.serveCliPlugin(),
    // plugins.generateFontFacesCliPlugin(),
    // plugins.convertFontsCliPlugin(),
    // plugins.materialYouCliPlugin(),
  ],
});
