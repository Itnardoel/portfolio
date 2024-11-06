import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import parser from "astro-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/dist", "**/node_modules", "**/.github"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "plugin:prettier/recommended",
  ),
  {
    plugins: {
      "unused-imports": unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "prettier/prettier": "warn",
      "unused-imports/no-unused-imports": "error",
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.astro"],

    languageOptions: {
      parser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  },
  ...compat
    .extends("plugin:@typescript-eslint/recommended")
    .map((config) => ({ ...config, files: ["**/*.ts", "**/*.tsx"] })),
  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ["**/*.astro/*.js", "*.astro/*.js"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "module",
    },

    rules: {
      "prettier/prettier": "off",
    },
  },
];
