import { readFileSync } from "node:fs";
import { path } from "@staticbolt/core";
import yaml from "yaml";

import { generateTree } from "./generate-tree.ts";
import { prepareOptions } from "./helpers.ts";

import type { SidebarPluginOptions } from "./types.ts";
import type { Plugin } from "@staticbolt/core";

export function sidebarPlugin(options: SidebarPluginOptions): Plugin {
  const prepared = prepareOptions(options);

  const slotRegex = new RegExp(String.raw`<slot\s+name\s*=\s*['"]sidebar['"]\s*(\/>|>\s*<\/\s*slot\s*>)`, "g");

  let tree = "";

  return {
    name: "sidebar-plugin",

    setup() {
      // Resolve "layouts" paths
      for (const key in prepared.layouts) {
        const resolvedPath = this.resolver.resolveAlias(prepared.layouts[key]);
        if (resolvedPath) {
          prepared.layouts[key] = resolvedPath;
        }
      }

      // Resolve "sidebar" layout path
      const resolvedSidebarLayoutPath = this.resolver.resolveAlias(prepared.sidebarLayout.path);
      if (resolvedSidebarLayoutPath) {
        prepared.sidebarLayout.path = resolvedSidebarLayoutPath;
      }

      // Resolve "directory" layout path and make it relative to the "sidebar" layout
      const resolvedDirectoryLayoutPath = this.resolver.resolveAlias(prepared.directoryLayout.path);
      if (resolvedDirectoryLayoutPath) {
        prepared.directoryLayout.path = path.relative(path.dirname(prepared.sidebarLayout.path), resolvedDirectoryLayoutPath);
      }

      // Resolve "link" layout path and make it relative to the "sidebar" layout
      const resolvedLinkLayoutPath = this.resolver.resolveAlias(prepared.linkLayout.path);
      if (resolvedLinkLayoutPath) {
        prepared.linkLayout.path = path.relative(path.dirname(prepared.sidebarLayout.path), resolvedLinkLayoutPath);
      }

      // Resolve customizations paths
      for (const pathKey in prepared.customizations) {
        const resolvedPath = this.resolver.resolveAlias(pathKey);
        if (!resolvedPath) continue;

        prepared.customizations[resolvedPath] = prepared.customizations[pathKey];
        delete prepared.customizations[pathKey];
      }

      tree = generateTree.call(this, prepared);
    },

    read(absolutePath) {
      const relativePath = path.relative(this.root, absolutePath);

      if (relativePath === prepared.sidebarLayout.path) {
        const layoutContent = readFileSync(absolutePath, "utf8");
        return layoutContent.replace(slotRegex, tree);
      }

      if (path.extname(relativePath) !== ".md") {
        return;
      }

      const isIncluded = path.matchPath(relativePath, { include: prepared.include, ignore: prepared.exclude, root: this.root });
      if (!isIncluded) return;

      let pageContent = readFileSync(absolutePath, "utf8");
      const hasFrontMatter = pageContent.startsWith("---");

      const frontMatter: { layout: string } & Record<string, unknown> = {
        layout: "default",
      };

      if (!hasFrontMatter) {
        const layoutPath = prepared.layouts[frontMatter.layout];
        const relativeLayoutPath = path.relative(path.dirname(relativePath), layoutPath);
        frontMatter.layout = relativeLayoutPath;

        const stringFrontMatter = yaml.stringify(frontMatter);
        pageContent = `---\n${stringFrontMatter}\n---\n${pageContent}`;
        return pageContent;
      }

      const frontMatterString = pageContent.match(/^---\n(.*?)\n---/s)?.[1];
      if (!frontMatterString) {
        return pageContent;
      }

      Object.assign(frontMatter, yaml.parse(frontMatterString));

      const layoutPath = prepared.layouts[frontMatter.layout];
      const relativeLayoutPath = path.relative(path.dirname(relativePath), layoutPath);
      frontMatter.layout = relativeLayoutPath;

      // Remove sidebar customizations keys
      for (const key in frontMatter) {
        if (key.startsWith("sidebar.")) {
          delete frontMatter[key];
        }
      }

      pageContent = pageContent.replace(/^---\n(.*?)\n---/s, "");

      const stringFrontMatter = yaml.stringify(frontMatter);
      pageContent = `---\n${stringFrontMatter}\n---\n${pageContent}`;

      return pageContent;
    },

    onFileEvent(_, id) {
      const isIncluded = path.matchPath(id, { include: prepared.include, ignore: prepared.exclude, root: this.root });
      if (!isIncluded) return;

      const result = generateTree.call(this, prepared);
      if (result === tree) return;

      this.log.info("Re-generating sidebar tree");

      tree = result;

      // Force target layout to re-compile
      this.watcher?.emit("change", prepared.sidebarLayout.path);
    },
  };
}
