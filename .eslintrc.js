module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: [
    'svelte3',
    '@typescript-eslint', // add the TypeScript plugin
    'filenames',
  ],
  overrides: [
    // this stays the same
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn', // remove this later
    '@typescript-eslint/no-non-null-assertion': 'off', // remove this later
    '@typescript-eslint/no-unsafe-member-access': 'off', // remove this later
    '@typescript-eslint/restrict-template-expressions': 'off', // remove  this later
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    'filenames/match-regex': [2, '^([a-zA-Z.])+$', true],
  },
  settings: {
    'svelte3/typescript': () => require('typescript'), // pass the TypeScript package to the Svelte plugin
    // OR
    // 'svelte3/typescript': true, // load TypeScript as peer dependency
    // ...
  },
  ignorePatterns: ['node_modules'],
};