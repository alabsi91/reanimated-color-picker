import { readFileSync } from "node:fs";
import { path } from "@staticbolt/core";
import yaml from "yaml";

import type {
  RequiredOptions,
  SidebarDirectory,
  SidebarLink,
  SidebarNodeCustomization,
  SidebarPluginOptions,
  SidebarTree,
} from "./types.ts";
import type { ValueOrError } from "@staticbolt/core";

export function isItem(item: SidebarDirectory | SidebarLink): item is SidebarLink {
  return "filePath" in item;
}

export function normalizeTitle(string: string): string {
  if (!string) {
    return "";
  }

  // Remove special characters
  string = string.replace(/[-_]/g, " ");

  // Convert to title case
  string = string
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return string;
}

/** Escapes characters that would break out of a double-quoted HTML attribute value. */
export function escapeAttributeValue(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * Recursively sorts a tree level so that nodes with an explicit `order` customization appear first (ascending), followed by the
 * remaining nodes in their original filesystem order. Uses a stable sort so unordered siblings are never resequenced relative to
 * each other.
 */
export function applyOrdering(tree: SidebarTree, customizations: Record<string, SidebarNodeCustomization>): void {
  // Sort links before directories
  tree.sort((a, b) => {
    const aIsLink = isItem(a);
    const bIsLink = isItem(b);
    return aIsLink === bIsLink ? 0 : aIsLink ? -1 : 1;
  });

  const getOrder = (item: SidebarDirectory | SidebarLink) => customizations[item.realPath]?.order;

  // Unordered items keep their current relative sequence
  const unordered = tree.filter(item => getOrder(item) === undefined);

  // Ordered items are inserted lowest-first so each splice lands at the right position
  const ordered = tree.filter(item => getOrder(item) !== undefined).toSorted((a, b) => getOrder(a)! - getOrder(b)!);

  // Build result by splicing ordered items into the unordered base sequence.
  // Inserting in ascending order means each item's 1-based `order` maps directly
  // to its final index, since prior insertions account for the offset.
  const result = [...unordered];
  for (const item of ordered) {
    const index = Math.min(getOrder(item)! - 1, result.length); // order is 1-based
    result.splice(index, 0, item);
  }

  tree.splice(0, tree.length, ...result);

  for (const item of tree) {
    if (!isItem(item)) {
      applyOrdering(item.items, customizations);
    }
  }
}

export function prepareOptions(options: SidebarPluginOptions): RequiredOptions {
  const include = options.include ?? ["pages/**/*.{html,md}"];
  const exclude = options.exclude ?? [];
  const baseDirectory = options.baseDirectory ?? "pages";
  const customizations = options.customizations ?? {};

  const sidebarLayout = (options.sidebarLayout ?? {}) as Required<RequiredOptions["sidebarLayout"]>;
  sidebarLayout.path ??= "@parts/sidebar/sidebar.part.html";
  sidebarLayout.tag ??= path.basename(sidebarLayout.path).split(".")[1];
  sidebarLayout.sourceAttribute ??= "src";
  sidebarLayout.slotName ??= "sidebar";

  const directoryLayout = (options.directoryLayout ?? {}) as Required<RequiredOptions["directoryLayout"]>;
  directoryLayout.path ??= "@parts/sidebar/directory.part.html";
  directoryLayout.tag ??= path.basename(directoryLayout.path).split(".")[1];
  directoryLayout.sourceAttribute ??= "src";

  const linkLayout = (options.linkLayout ?? {}) as Required<RequiredOptions["linkLayout"]>;
  linkLayout.path ??= "@parts/sidebar/item.part.html";
  linkLayout.tag ??= path.basename(linkLayout.path).split(".")[1];
  linkLayout.sourceAttribute ??= "src";

  return {
    layouts: options.layouts,
    include,
    exclude,
    baseDirectory,
    customizations,
    sidebarLayout,
    directoryLayout,
    linkLayout,
  } satisfies RequiredOptions;
}

function readFrontMatter(path: string, stringContent?: string): ValueOrError<Record<string, unknown>> {
  try {
    const fileContent = stringContent ?? readFileSync(path, "utf8");

    const frontMatterString = fileContent.match(/^---\n(.*?)\n---/s)?.[1];
    if (!frontMatterString) {
      return [{}, null];
    }

    return [yaml.parse(frontMatterString) as Record<string, unknown>, null];
  } catch (error) {
    return [null, error as Error];
  }
}

const SIDEBAR_SCHEMA: Record<keyof SidebarNodeCustomization, (v: unknown) => boolean> = {
  label: v => typeof v === "string",
  collapsed: v => typeof v === "boolean",
  order: v => typeof v === "number",
  data: () => false,
};

function parseSidebarFields(frontMatter: Record<string, unknown>, prefix: string): SidebarNodeCustomization {
  const result: SidebarNodeCustomization = {};

  for (const key in frontMatter) {
    if (!key.startsWith(prefix)) continue;

    const field = key.slice(prefix.length) as keyof SidebarNodeCustomization;
    const validate = SIDEBAR_SCHEMA[field];

    // unknown key, discard
    if (!validate) {
      continue;
    }

    const value = frontMatter[key];

    // wrong type, discard
    if (!validate(value)) {
      continue;
    }

    result[field] = value as undefined;
  }

  return result;
}

interface ParsedSidebarFrontmatter {
  node?: SidebarNodeCustomization;
  parent?: SidebarNodeCustomization;
  frontMatter: Record<string, unknown>;
}

export function parseSidebarFrontmatter(file: string): ParsedSidebarFrontmatter {
  const [frontMatter, error] = readFrontMatter(file);
  if (error) {
    console.error(error);
    return { frontMatter: {} };
  }

  const node = parseSidebarFields(frontMatter, "sidebar.");
  const parent = parseSidebarFields(frontMatter, "sidebar.parent.");

  return {
    frontMatter,
    ...(Object.keys(node).length > 0 && { node }),
    ...(Object.keys(parent).length > 0 && { parent }),
  };
}
