import { selectAll } from "hast-util-select";
import { visit } from "unist-util-visit";

import type { Element, Parent } from "hast";
import type { Node } from "unist";

export default function wrapTables() {
  return (tree: Node) => {
    const tables = selectAll("table", tree as Element);

    for (const table of tables) {
      visit(tree, table, (node, index, parent) => {
        if (!parent || typeof index !== "number") return;

        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: { class: "table-wrapper" },
          children: [node],
        };

        (parent as Parent).children[index] = wrapper;
      });
    }
  };
}
