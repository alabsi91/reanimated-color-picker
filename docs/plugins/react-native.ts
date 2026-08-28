import { CUSTOM_ATTRIBUTES, PrintFormattedError, hashContent, isHtmlMetadata, isScriptMetadata } from "@staticbolt/core";

import type { Plugin } from "@staticbolt/core";

export interface ReactNativePluginOptions {
  /**
   * The tag name that marks a component to mount.
   *
   * @default "react-native"
   */
  tagName?: string;

  /**
   * The name of the attribute that points at the component module.
   *
   * @default "src"
   */
  sourceAttribute?: string;

  
  /**
   * The name of the attribute that names the export to mount.
   *
   * @default "export"
   */
  exportAttribute?: string;
}

/**
 * Mounts React Native components into the page in the browser, through `react-native-web`.
 *
 * `<react-native src="…" export="…">` becomes an empty `<div>` followed by a `<script>` that renders the component into it.
 * Nothing renders at build time: the components need a browser, and their static markup would say nothing about them.
 *
 * Every other attribute is written onto that script rather than the div, so a tag can carry `bundle`, `defer` and the rest, which
 * the script plugins then act on.
 *
 * The component is handed to the build as a source of the page, so it is resolved and loaded like any other. The build needs
 * `react-native` aliased to `react-native-web`, and Reanimated's Babel plugin wherever `"worklet"` functions are compiled.
 */
export function reactNativePlugin(options: ReactNativePluginOptions = {}): Plugin {
  const tag = options.tagName ?? "react-native";
  const sourceAttribute = options.sourceAttribute ?? "src";
  const exportAttribute = options.exportAttribute ?? "export";
  const mountAttribute = `data-${tag}`;
  const ownAttributes = [sourceAttribute, exportAttribute];

  const report = PrintFormattedError.create({ function: reactNativePlugin });

  function createMountCode(componentSource: string, exportName: string, mountIndex: number): string {
    const mountSelector = `[${mountAttribute}="${mountIndex}"]`;

    return [
      `import { createElement } from "react";`,
      `import { createRoot } from "react-dom/client";`,
      `import { ${exportName} as Component } from ${JSON.stringify(componentSource)};`,
      ``,
      `const mountPoint = document.querySelector(${JSON.stringify(mountSelector)});`,
      ``,
      `createRoot(mountPoint).render(createElement(Component));`,
    ].join("\n");
  }

  return {
    name: tag,

    sourcesProvider(metadata) {
      if (!isHtmlMetadata(metadata)) return;

      return metadata.ast.querySelectorAll(tag).flatMap(node => {
        if (!node.getAttribute(sourceAttribute)) return [];

        return {
          node,

          get source() {
            return node.getAttribute(sourceAttribute)!;
          },

          set source(newValue) {
            node.setAttribute(sourceAttribute, newValue);
          },
        };
      });
    },

    async transform(metadata) {
      if (!isHtmlMetadata(metadata)) return;

      const nodes = metadata.ast.querySelectorAll(tag);
      if (nodes.length === 0) return;

      for (const [mountIndex, node] of nodes.entries()) {
        const componentSource = node.getAttribute(sourceAttribute);

        if (!componentSource) {
          report(`Missing the "${sourceAttribute}" attribute`, { node, filePath: metadata.filePath });
          continue;
        }

        const exportName = node.getAttribute(exportAttribute) || "default";
        const mountCode = createMountCode(componentSource, exportName, mountIndex);

        const scriptMetadata = await this.load(metadata.filePath, { code: mountCode, type: "js" });
        if (!isScriptMetadata(scriptMetadata)) {
          report(`Failed to create the mount script of "${metadata.filePath}"`, { node, filePath: metadata.filePath });
          continue;
        }

        scriptMetadata.module = true;

        await this.resolveAndLoad(scriptMetadata);
        await this.transformAndSync(scriptMetadata);

        const metadataID = hashContent("module:" + mountCode);
        metadata.scriptsMetadataList.set(metadataID, scriptMetadata);

        // Everything the tag carries beyond the plugin's own attributes belongs to the script
        const forwardedAttributes = Object.entries(node.attributes)
          .filter(([name]) => !ownAttributes.includes(name))
          .map(([name, value]) => (value ? ` ${name}="${value.replaceAll('"', "&quot;")}"` : ` ${name}`))
          .join("");

        const mountPoint = `<div ${mountAttribute}="${mountIndex}"></div>`;
        const scriptTag = `<script type="module" ${CUSTOM_ATTRIBUTES.MetadataID}="${metadataID}"${forwardedAttributes}></script>`;

        node.replaceWith(mountPoint + scriptTag);
      }
    },

    lspHtmlData() {
      return {
        version: 1.1,
        tags: [
          {
            name: tag,
            description:
              "Replaced in the browser by the React Native component it points at, through `react-native-web`." +
              `\n\nEvery attribute other than \`${sourceAttribute}\` and \`${exportAttribute}\` is written onto the script that` +
              " mounts it, so `bundle` and the other script attributes work here.",
            attributes: [
              { name: sourceAttribute, description: "The module the component comes from." },
              { name: exportAttribute, description: "The export to mount. Defaults to the default export." },
            ],
          },
        ],
      };
    },
  };
}
