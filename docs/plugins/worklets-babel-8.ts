import workletsOxcBabelPlugin from "react-native-worklets/plugin-oxc/babel.js";

import type * as babel from "@babel/core";

/**
 * The worklets OXC Babel plugin, made to run under Babel 8.
 *
 * The plugin calls `parse` synchronously. Babel 8 allows a synchronous parse only through `parseSync`, so this
 * wrapper gives the plugin a Babel API where `parse` is `parseSync`.
 */
export function workletsBabel8Plugin(babelApi: typeof babel) {
  const babelApiWithSyncParse = Object.create(babelApi, { parse: { value: babelApi.parseSync } });
  return workletsOxcBabelPlugin(babelApiWithSyncParse);
}
