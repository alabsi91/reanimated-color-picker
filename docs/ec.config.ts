import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginFileIcons } from "@xt0rted/expressive-code-file-icons";
import { pluginColorChips } from "expressive-code-color-chips";

import type { RehypeExpressiveCodeOptions } from "rehype-expressive-code";

export const rehypeExpressiveCodeOptions: RehypeExpressiveCodeOptions = {
  themes: ["laserwave", "rose-pine-dawn"],
  plugins: [pluginLineNumbers(), pluginFileIcons(), pluginColorChips(), pluginCollapsibleSections()],
  defaultProps: {
    wrap: false,
    showLineNumbers: false,
    collapseStyle: "collapsible-auto",
  },
  useDarkModeMediaQuery: false,
  styleOverrides: {
    codeBackground: "var(--sb-code-background)",
    borderColor: "var(--sb-color-gray-5)",
    borderWidth: "1px",
    gutterHighlightForeground: "var(--sb-color-accent-high)",

    collapsibleSections: {
      openBackgroundColorCollapsible: "var(--sb-color-gray-6)",
      closedBackgroundColor: "var(--sb-color-gray-5)",
      closedTextColor: "var(--sb-color-gray-0)",
    },
    frames: {
      shadowColor: "transparent",
      editorBackground: "var(--sb-code-background)",
      editorTabBarBackground: "var(--sb-code-background)",
      terminalBackground: "var(--sb-code-background)",
      terminalTitlebarBackground: "var(--sb-code-background)",
      terminalTitlebarDotsForeground: "var(--sb-color-accent-high)",
      terminalTitlebarBorderBottomColor: "var(--sb-color-gray-5)",
      editorTabBarBorderBottomColor: "var(--sb-color-gray-5)",
      editorActiveTabBackground: "transparent",
      editorActiveTabIndicatorBottomColor: "var(--sb-color-gray-2)",
      editorActiveTabIndicatorTopColor: "transparent",
      editorActiveTabForeground: "var(--sb-color-gray-0)",
      inlineButtonForeground: "var(--sb-color-accent-high)",
      tooltipSuccessBackground: "var(--sb-color-accent)",
    },
    textMarkers: {
      markBackground: "var(--sb-color-gray-6)",
      markBorderColor: "var(--sb-color-accent-high)",
    },
  },
};
