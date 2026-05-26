import { escapeAttributeValue, isItem } from "./helpers.ts";

import type { SidebarDirectory, SidebarLink, SidebarPluginOptions, SidebarTree } from "./types.ts";

function renderDirectory(
  directory: SidebarDirectory,
  items: string,
  { directoryLayout, customizations }: Required<SidebarPluginOptions>
): string {
  const customization = customizations[directory.realPath];

  const data = {
    title: customization?.label ?? directory.title,
    collapsed: customization?.collapsed ?? directory.collapsed,
    ...customization?.data,
  };

  return `<li class="sidebar-list-item">
            <${directoryLayout.tag} dataJson='${escapeAttributeValue(JSON.stringify(data))}' ${directoryLayout.sourceAttribute}="${directoryLayout.path}">
              <ul class="sidebar-list">${items}</ul>
            </${directoryLayout.tag}>
          </li>`;
}

function renderLink(link: SidebarLink, { linkLayout, customizations }: Required<SidebarPluginOptions>): string {
  const customization = customizations[link.realPath];

  const data = {
    title: customization?.label ?? link.title,
    href: encodeURIComponent(link.filePath),
    ...customization?.data,
  };

  return `<li class="sidebar-list-item">
            <${linkLayout.tag} dataJson='${escapeAttributeValue(JSON.stringify(data))}' ${linkLayout.sourceAttribute}="${linkLayout.path}"></${linkLayout.tag}>
          </li>`;
}

export function renderTree(items: SidebarTree, options: Required<SidebarPluginOptions>): string {
  let tree = "";

  for (const item of items) {
    if (isItem(item)) {
      tree += renderLink(item, options);
      continue;
    }

    tree += renderDirectory(item, renderTree(item.items, options), options);
  }

  return tree;
}
