import type { ImageFormat, import_as_string, CssLinear } from "@staticbolt/core/plugins";

declare global {
  /** True in production */
  const _production: boolean;

  /**
   * - Replace `cssLinear.[easeName](...args)` with a CSS linear function string `linear(...values)`.
   * - Useful for `element.animate(..., { easing: cssLinear.[easeName](...args) })`.
   */
  const cssLinear: CssLinear;

  const import_as_string: import_as_string;

  const _img: {
    /** The image extension. In production, returns the converted format (e.g. `webp`). In development, returns `png` */
    png: ImageFormat;

    /** The image extension. In production, returns the converted format (e.g. `webp`). In development, returns `jpg` */
    jpg: ImageFormat;

    /** The image extension. In production, returns the converted format (e.g. `webp`). In development, returns `jpeg` */
    jpeg: ImageFormat;
  };
}

export {};
