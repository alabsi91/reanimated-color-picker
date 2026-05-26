// @ts-check
import defineConfig from "stylelint-define-config";

export default defineConfig({
  extends: ["stylelint-config-standard", "@stylistic/stylelint-config", "stylelint-config-recess-order"],
  plugins: ["stylelint-no-unsupported-browser-features", "stylelint-use-logical"],
  ignoreFiles: ["**/dist/**/*", "**/node_modules/**/*"],

  overrides: [
    {
      files: ["*.html", "**/*.html"],
      customSyntax: "postcss-html",
      rules: {
        "custom-property-empty-line-before": null,
        "declaration-property-value-no-unknown": null,
        "@stylistic/declaration-block-trailing-semicolon": null,
        "@stylistic/no-eol-whitespace": null,
        "no-invalid-position-declaration": null
      },
    },
  ],

  rules: {
    "csstools/use-logical": "always",
    "@stylistic/max-line-length": null,
    "@stylistic/declaration-colon-newline-after": null,
    "@stylistic/value-list-comma-newline-after": null,
    "media-feature-range-notation": null,
  },
});
