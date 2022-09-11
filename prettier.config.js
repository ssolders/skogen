module.exports = {
  arrowParens: 'avoid',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  plugins: ['prettier-plugin-svelte'],
  svelteSortOrder: 'scripts-markup-options-styles',
  svelteStrictMode: false,
  bracketSameLine: false,
  trailingComma: 'all',
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ["typescript"]
};