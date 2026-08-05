import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import rehypeExpressiveCode from "rehype-expressive-code";

import type { Plugin } from "@staticbolt/core";
import type { Root } from "hast";
import type { RehypeExpressiveCodeOptions } from "rehype-expressive-code";

/**
 * Persistent cross-build caches for expressive-code rendering.
 *
 * Highlighting is deterministic for the same input, engine version, and config, so results are stored in
 * `node_modules/.cache/color-picker-docs/` keyed by content hash and reused on subsequent builds. Register `ecCachePlugin()` to
 * persist the caches at the end of a build.
 */

const CACHE_DIRECTORY = join(process.cwd(), "node_modules/.cache/color-picker-docs");

export function sha1(input: string): string {
  return createHash("sha1").update(input).digest("hex");
}

/** Invalidates all cached entries when the expressive-code version or its configuration changes. */
export const ecCacheSalt = (() => {
  let version = "unknown";
  let config = "";

  try {
    version = (
      JSON.parse(readFileSync(join(process.cwd(), "node_modules/rehype-expressive-code/package.json"), "utf8")) as {
        version: string;
      }
    ).version;
  } catch {
    /* fall back to "unknown" */
  }

  try {
    config = readFileSync(join(process.cwd(), "ec.config.ts"), "utf8");
  } catch {
    /* no config file */
  }

  return sha1(`${version} ${config}`);
})();

const registry: PersistentCache[] = [];

export class PersistentCache {
  private readonly filePath: string;
  private readonly entries = new Map<string, string>();
  private dirty = false;

  constructor(name: string) {
    this.filePath = join(CACHE_DIRECTORY, `${name}.json`);

    try {
      const stored = JSON.parse(readFileSync(this.filePath, "utf8")) as Record<string, string>;
      for (const [key, value] of Object.entries(stored)) {
        this.entries.set(key, value);
      }
    } catch {
      /* no cache yet */
    }

    registry.push(this);
  }

  get(key: string): string | undefined {
    return this.entries.get(key);
  }

  set(key: string, value: string): void {
    this.entries.set(key, value);
    this.dirty = true;
  }

  save(): void {
    if (!this.dirty) return;
    mkdirSync(dirname(this.filePath), { recursive: true });
    writeFileSync(this.filePath, JSON.stringify(Object.fromEntries(this.entries)));
    this.dirty = false;
  }
}

/** Saves all persistent expressive-code caches once the build is done. */
export function ecCachePlugin(): Plugin {
  return {
    name: "ec-cache",

    postBuild() {
      for (const cache of registry) {
        cache.save();
      }
    },
  };
}

const markdownCache = new PersistentCache("markdown-expressive-code");

/**
 * Drop-in replacement for `[rehypeExpressiveCode, options]` in a rehype plugin list that caches the transformed tree per document
 * across builds. Unchanged markdown files skip highlighting entirely.
 */
export function cachedRehypeExpressiveCode(this: unknown, options: RehypeExpressiveCodeOptions) {
  const transformer = (rehypeExpressiveCode as (this: unknown, options_: RehypeExpressiveCodeOptions) => unknown).call(
    this,
    options
  ) as (tree: Root, ...rest: unknown[]) => Promise<Root | undefined> | Root | undefined;

  return async (tree: Root, ...rest: unknown[]): Promise<Root | undefined> => {
    const key = sha1(ecCacheSalt + JSON.stringify(tree));

    const hit = markdownCache.get(key);
    if (hit !== undefined) {
      const cached = JSON.parse(hit) as Root;
      tree.children = cached.children;
      return;
    }

    const result = await transformer(tree, ...rest);
    markdownCache.set(key, JSON.stringify(result ?? tree));

    return result;
  };
}
