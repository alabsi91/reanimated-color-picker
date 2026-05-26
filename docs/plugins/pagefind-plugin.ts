import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as pagefind from "pagefind";

import type { Plugin } from "@staticbolt/core";

export function pagefindPlugin(): Plugin {
  return {
    name: "pagefind",

    async postBuild() {
      if (!this.production) return;

      this.log.info("Indexing using Pagefind...");

      const { index } = await pagefind.createIndex();

      if (!index) {
        throw new Error("Failed to create Pagefind index");
      }

      await index.addDirectory({ path: this.outdir });

      const { files } = await index.getFiles();

      const exclude = new Set([
        "pagefind-component-ui.js",
        "pagefind-component-ui.css",
        "pagefind-ui.js",
        "pagefind-ui.css",
        "pagefind-modular-ui.js",
        "pagefind-modular-ui.css",
        "pagefind-highlight.js",
      ]);

      for (const file of files) {
        if (exclude.has(file.path)) continue;

        const targetPath = join(this.outdir, "pagefind", file.path);
        await mkdir(dirname(targetPath), { recursive: true });
        await writeFile(targetPath, file.content, "utf8");
      }

      await pagefind.close();
    },
  };
}
