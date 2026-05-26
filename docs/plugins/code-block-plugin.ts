import { isHtmlMetadata } from "@staticbolt/core";
import { ExpressiveCodeBlock } from "expressive-code";
import { toHtml } from "hast-util-to-html";
import { createRenderer } from "rehype-expressive-code";

import type { MetadataBase, Plugin } from "@staticbolt/core";
import type { Element } from "expressive-code/hast";
import type { RehypeExpressiveCodeOptions } from "rehype-expressive-code";

export interface HtmlCodeBlockPlugin {
  /**
   * The tag name.
   *
   * @default "code-block"
   */
  tagName?: string;

  rehypeExpressiveCodeOptions?: RehypeExpressiveCodeOptions;
}

/**
 * A plugin that uses a custom html element. Point it at any local file via the `src` attribute and it will read the file, wrap
 * its contents in a fenced markdown code block, and inject the result into your page. Use the `meta` attribute to specify the
 * language and other metadata for the code block.
 */
export function HtmlCodeBlockPlugin(options: HtmlCodeBlockPlugin = {}): Plugin {
  const tag = options.tagName ?? "code-block";

  const processedMetadata = new Set<MetadataBase>();

  let renderer: Awaited<ReturnType<typeof createRenderer>>;

  return {
    name: "html-code-block",

    async setup() {
      renderer = await createRenderer(options.rehypeExpressiveCodeOptions);
    },

    async transform(metadata) {
      if (!isHtmlMetadata(metadata)) return;

      const document = metadata.ast;
      const elements = document.querySelectorAll(tag);
      const addedStyles = new Set<string>();
      const addedJsModules = new Set<string>();

      let hasExpressiveCode = Boolean(document.querySelector(".expressive-code"));

      for (const node of elements) {
        processedMetadata.add(metadata);

        const contents = (node.getAttribute("code") ?? node.textContent ?? "").trimStart();

        let meta = "";

        const diff = node.hasAttribute("diff");
        if (diff) meta += "diff";

        const lang = node.getAttribute("lang");
        if (lang) meta += diff ? ` lang="${lang}"` : lang;

        const wrap = node.getAttribute("wrap");
        if (wrap) meta += ` wrap=${wrap || "true"}`;

        const preserveIndent = node.getAttribute("preserveIndent");
        if (preserveIndent) meta += ` preserveIndent=${preserveIndent || "true"}`;

        const hangingIndent = node.getAttribute("hangingIndent");
        if (hangingIndent) meta += ` hangingIndent="${hangingIndent}"`;

        const showLineNumbers = node.getAttribute("showLineNumbers");
        if (showLineNumbers) meta += ` showLineNumbers=${showLineNumbers || "true"}`;

        const startLineNumber = node.getAttribute("startLineNumber");
        if (startLineNumber) meta += ` startLineNumber="${startLineNumber}"`;

        const title = node.getAttribute("title");
        if (title) meta += ` title="${title}"`;

        const mark = node.getAttribute("mark");
        if (mark) meta += ` ${mark}`;

        const ins = node.getAttribute("ins");
        if (ins) meta += ` ins="${ins}"`;

        const del = node.getAttribute("del");
        if (del) meta += ` del="${del}"`;

        const frame = node.getAttribute("frame");
        if (frame && ["auto", "code", "terminal", "none"].includes(frame)) {
          meta += ` frame="${frame || "auto"}"`;
        }

        const noIcon = node.hasAttribute("no-icon");
        if (noIcon) meta += ` no-icon`;

        const metaString = node.getAttribute("meta");
        if (metaString) meta += ` ${metaString}`;

        const collapse = node.getAttribute("collapse");
        if (collapse) meta += ` collapse=${collapse}`;

        const codeBlock = new ExpressiveCodeBlock({
          code: contents.trim(),
          language: lang ?? "plaintext",
          meta: meta.trim(),
        });

        const { ec, baseStyles, themeStyles, jsModules } = renderer;
        const { renderedGroupAst, styles } = await ec.render(codeBlock);

        // No need to inject styles and scripts again
        if (hasExpressiveCode) {
          node.replaceWith(toHtml(renderedGroupAst));
          continue;
        }

        hasExpressiveCode = true;

        // Collect styles: base + theme + per-block
        const stylesToPrepend: string[] = [];
        for (const style of [baseStyles, themeStyles, ...styles]) {
          if (!style || addedStyles.has(style)) continue;
          addedStyles.add(style);
          stylesToPrepend.push(style);
        }

        // Collect JS modules
        const scriptsToAdd: string[] = [];
        for (const moduleCode of jsModules) {
          if (addedJsModules.has(moduleCode)) continue;
          addedJsModules.add(moduleCode);
          scriptsToAdd.push(moduleCode);
        }

        // Inject styles + scripts into the AST exactly like rehype-expressive-code does
        const extraElements: Element[] = [];

        if (stylesToPrepend.length > 0) {
          extraElements.push({
            type: "element",
            tagName: "style",
            properties: {},
            children: [{ type: "text", value: stylesToPrepend.join("") }],
          });
        }

        for (const script of scriptsToAdd) {
          extraElements.push({
            type: "element",
            tagName: "script",
            properties: { type: "module" },
            children: [{ type: "text", value: script }],
          });
        }

        if (extraElements.length > 0) {
          const firstChild = renderedGroupAst.children[0];
          const insertIndex = firstChild?.type === "element" && ["style", "link"].includes(firstChild.tagName) ? 1 : 0;
          renderedGroupAst.children.splice(insertIndex, 0, ...extraElements);
        }

        node.replaceWith(toHtml(renderedGroupAst));
      }
    },
  };
}
