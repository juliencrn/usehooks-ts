module.exports = {
  extends: ['custom'],
  overrides: [
    // Track tree-shaking potential error in the lib
    {
      files: ['./src/**/!(*.test|*.spec).ts'],
      extends: ['plugin:jsdoc/recommended'],
      plugins: ['tree-shaking', 'jsdoc'],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 'error',
      },
    },
  ],
  ignorePatterns: ['./dist', './node_modules', './turbo'],
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'jsdoc/require-jsdoc': 'off',
      },
    },
  ],
}
