/** Customization overrides for a single sidebar node, keyed by its real filesystem path relative to the project root. */
export interface SidebarNodeCustomization {
  /**
   * Overrides the auto-generated display title for this node.\
   * When omitted the title derived from the file/folder name is used.
   */
  label?: string;

  /**
   * Overrides whether this directory is collapsed by default.\
   * Has no effect when applied to a link node.\
   * When omitted the value from `SidebarDirectory.collapsed` is used.
   */
  collapsed?: boolean;

  /**
   * Controls the position of this node within its parent's item list.\
   * Nodes with a lower `order` value appear first. Nodes without an explicit `order` keep their original filesystem position
   * relative to one another, after all explicitly ordered nodes.
   *
   * NOTE: `order` is 1-based.
   *
   * ```ts
   * sidebarPlugin({
   *   customizations: {
   *     "pages/contents/components/button": { order: 1 }, // pinned first
   *     "~/contents/components/accordion": { order: 2 }, // pinned second - using alias `~` for 'pages'
   *     // everything else keeps their original position
   *   },
   * });
   * ```
   */
  order?: number;

  /**
   * Arbitrary key/value pairs forwarded as HTML attributes on the directory or link layout tag, e.g. `{ "data-badge": "new" }`.
   *
   * Values are HTML-escaped before being written into the markup.
   */
  data?: Record<string, string>;
}

export interface SidebarPluginOptions {
  /**
   * Glob patterns for files to scan when generating the sidebar.
   *
   * @default ["pages/contents/**\/*.{html,md}"]
   */
  include?: string[];

  /**
   * Glob patterns for files to exclude from sidebar generation.
   *
   * @default [ ]
   */
  exclude?: string[];

  /**
   * The directory segment that acts as the root of the sidebar tree.\
   * Everything before this segment in a file path is ignored abd everything after it becomes the tree structure.
   *
   * Given `baseDirectory: "contents"`, the file `pages/contents/components/accordion/accordion.md` produces the tree path
   * `components > accordion > accordion`.
   *
   * @default "contents"
   */
  baseDirectory?: string;

  /**
   * Per-node customizations, keyed by the real filesystem path of the file or directory relative to the project root.
   *
   * ```ts
   * sidebarPlugin({
   *   customizations: {
   *     // Override a directory's title and keep it open by default
   *     "pages/contents/components/accordion": { title: "Accordion", collapsed: false },
   *
   *     // Add a badge attribute to a link layout
   *     "~/contents/components/button/button.md": { data: { "data-badge": "new" } },
   *   },
   * });
   * ```
   */
  customizations?: Record<string, SidebarNodeCustomization>;

  /** Defines the layout name/path to be used for markdown files. */
  layouts: {
    default: string;
    [key: string]: string;
  };

  /** The layout into which the generated sidebar HTML will be injected. */
  sidebarLayout?: {
    /**
     * Path to the layout file.
     *
     * @default "@parts/sidebar/sidebar.part.html"
     */
    path?: string;

    /**
     * The custom-element tag name used for this layout.
     *
     * If omitted, the tag name will be auto extracted from the layout path
     */
    tag?: string;

    /**
     * The attribute on the layout tag that holds the source path.
     *
     * @default "src"
     */
    sourceAttribute?: string;

    /**
     * The slot name into which the sidebar is inserted.
     *
     * @default "sidebar"
     */
    slotName?: string;
  };

  /** The layout used to render a collapsible directory node. */
  directoryLayout?: {
    /**
     * Path to the directory layout file.
     *
     * @default "@parts/sidebar/directory.part.html"
     */
    path?: string;

    /**
     * The custom-element tag name used for this layout.
     *
     * If omitted, the tag name will be auto extracted from the layout path
     */
    tag?: string;

    /**
     * The attribute on the layout tag that holds the source path.
     *
     * @default "src"
     */
    sourceAttribute?: string;
  };

  /** The layout used to render a single navigation link. */
  linkLayout?: {
    /**
     * Path to the link layout file.
     *
     * @default "@parts/sidebar/item.part.html"
     */
    path?: string;

    /**
     * The custom-element tag name used for this layout.
     *
     * If omitted, the tag name will be auto extracted from the layout path
     */
    tag?: string;

    /**
     * The attribute on the layout tag that holds the source path.
     *
     * @default "src"
     */
    sourceAttribute?: string;
  };
}

export interface SidebarDirectory {
  /** Display title for this directory node, derived from the folder name unless overridden. */
  title: string;

  /**
   * Real filesystem path of this directory relative to the project root, e.g. `"pages/contents/components/accordion"`. Used as
   * the key when looking up entries in `customizations`.
   */
  realPath: string;

  /**
   * Whether the directory node is collapsed by default in the sidebar.
   *
   * @default true
   */
  collapsed: boolean;

  /** Nested sidebar items belonging to this directory. */
  items: SidebarTree;
}

export interface SidebarLink {
  /** Display title for this link, derived from the file name unless overridden. */
  title: string;

  /** Root-relative URL path to the target page, with a trailing slash. */
  filePath: string;

  /**
   * Real filesystem path of the source file relative to the project root, e.g. `"pages/contents/components/button/button.md"`.
   * Used as the key when looking up entries in `customizations`.
   */
  realPath: string;
}

/** A recursive tree of sidebar nodes — either navigable links or collapsible directories. */
export type SidebarTree = (SidebarDirectory | SidebarLink)[];

export type DeepRequired<T, E extends keyof T = never> = { [K in keyof T]-?: K extends E ? T[K] : DeepRequired<T[K]> };

export type RequiredOptions = DeepRequired<SidebarPluginOptions, "customizations">;
