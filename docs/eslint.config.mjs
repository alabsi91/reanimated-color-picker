import css from "@eslint/css";
import pluginJs from "@eslint/js";
import markdown from "@eslint/markdown";
import html from "@html-eslint/eslint-plugin";
import compat from "eslint-plugin-compat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default defineConfig(
  // global ignores
  globalIgnores(["dist", "eslint.config.mjs"], "wcp-docs"),

  // prettier
  {
    files: [
      "**/*.md",
      "sources/**/*.{ts,tsx,js,jsx,html}",
      "pages/**/*.{html,md}",
      "plugins/**/*.ts",
      "ec.config.ts",
      ".staticbolt.ts",
    ],
    extends: [eslintPluginPrettierRecommended],
    rules: {
      "prettier/prettier": "warn",
    },
  },

  // JavaScript and TypeScript
  {
    files: ["sources/**/*.{js,jsx,ts,tsx}", ".staticbolt.ts", "ec.config.ts", "plugins/**/*.ts"],
    extends: [
      pluginJs.configs.recommended,
      tsEslint.configs.recommendedTypeChecked,
      eslintPluginUnicorn.configs.recommended,
      compat.configs["flat/recommended"],
    ],
    /** @type {import("typescript-eslint").ConfigArray[number]["languageOptions"]} */
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/prefer-spread": "off",
      "unicorn/no-nested-ternary": "off",
      "unicorn/import-style": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/switch-case-braces": "off",
      "unicorn/require-module-specifiers": "off",
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
    },
  },

  // HTML
  {
    files: ["sources/**/*.html", "pages/**/*.html"],
    plugins: { html },
    extends: ["html/recommended", tsEslint.configs.disableTypeChecked],
    languageOptions: { parser: html.parser },
    language: "html/html",
    rules: {
      "html/attrs-newline": "off",
      "html/no-extra-spacing-attrs": "off",
      "html/no-extra-spacing-tags": "off",
      "html/element-newline": "off",
      "html/indent": "off",
      "html/require-closing-tags": "off",
      "html/sort-attrs": "warn",
      "html/use-baseline": ["error", { available: "newly" }],
    },
  },

  // CSS
  // {
  //   files: ["sources/**/*.css"],
  //   plugins: { css },
  //   language: "css/css",
  //   extends: ["css/recommended"],
  //   rules: {
  //     "css/no-invalid-at-rules": "off", // a bug in eslint-plugin-css failing to recognize nested @rules
  //     "css/no-invalid-properties": ["warn", { allowUnknownVariables: true }],
  //     "css/use-baseline": ["warn", { available: "newly" }],
  //     "css/font-family-fallbacks": "off",
  //   },
  // },

  // MARKDOWN
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/commonmark",
    rules: {
      "markdown/no-html": "off",
    },
  }
);
