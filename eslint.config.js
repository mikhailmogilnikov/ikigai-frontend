import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactX from 'eslint-plugin-react-x';

import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import pluginLingui from 'eslint-plugin-lingui';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';

export default tseslint.config(
  ...pluginQuery.configs['flat/recommended'],
  ...pluginRouter.configs['flat/recommended'],

  pluginLingui.configs['flat/recommended'],
  { ignores: ['dist', './vite.config.ts', './src/shared/api/sсhema/generated.ts'] },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    settings: { react: { version: '19.0' } },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      prettier: prettier,
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactX.configs['recommended-typescript'].rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'warn',
      'prettier/prettier': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'import/order': [
        'warn',
        {
          groups: ['type', 'builtin', 'object', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'external',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
        },
      ],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'lingui/no-unlocalized-strings': [
        'error',
        {
          ignore: [
            // Ignore strings which are a single "word" (no spaces)
            // and doesn't start with an uppercase letter
            '^(?![A-Z])\\S+$',
            // Ignore UPPERCASE literals
            // Example: const test = "FOO"
            '^[A-Z0-9_-]+$',
          ],
          ignoreNames: [
            // Ignore matching className (case-insensitive)
            { regex: { pattern: 'className', flags: 'i' } },
            // Ignore UPPERCASE names
            // Example: test.FOO = "ola!"
            { regex: { pattern: '^[A-Z0-9_-]+$' } },
            'styleName',
            'src',
            'srcSet',
            'type',
            'id',
            'width',
            'height',
            'displayName',
            'Authorization',
            'colors',
          ],
          ignoreFunctions: [
            'cva',
            'cn',
            'clsx',
            'tv',
            'track',
            'Error',
            'console.*',
            '*headers.set',
            '*.addEventListener',
            '*.removeEventListener',
            '*.postMessage',
            '*.getElementById',
            '*.dispatch',
            '*.commit',
            '*.includes',
            '*.indexOf',
            '*.endsWith',
            '*.startsWith',
            'require',
            '*.matchMedia',
            'devtools',
          ],
          // Following settings require typed linting https://typescript-eslint.io/getting-started/typed-linting/
          useTsTypes: true,
          ignoreMethodsOnTypes: [
            // Ignore specified methods on Map and Set types
            'Map.get',
            'Map.has',
            'Set.has',
          ],
        },
      ],
    },
  },
  {
    files: ['**/mocks/**/*.ts', '**/mocks/**/*.tsx'],
    rules: {
      'lingui/no-unlocalized-strings': 'off',
    },
  },
);
