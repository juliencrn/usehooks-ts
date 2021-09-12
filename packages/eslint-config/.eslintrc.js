module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'react',
    'simple-import-sort',
    'prettier',
    'jsx-a11y',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types':
      'off',
    '@typescript-eslint/no-unused-vars':
      [
        'warn',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/exports':
      'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'], // side effect (E.g.`import 'normalize.css'`)
          ['^react$'],
          ['^[^.]'], // Libs
          ['^../|^~/|^./'],
        ],
      },
    ],
  },
}
