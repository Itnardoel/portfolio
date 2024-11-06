/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "auto",
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
  overrides: [{ files: ['*.json', '*.md', '*.toml', '*.yml'], options: { useTabs: false } }],
}