const sharedPresets = ['@babel/preset-react', '@babel/preset-typescript']
const shared = {
  ignore: ['src/**/*.test.ts'],
  presets: sharedPresets,
}

module.exports = {
  env: {
    esm: shared,
    cjs: {
      ...shared,
      presets: [
        [
          '@babel/env',
          {
            modules: 'commonjs',
          },
        ],
        ...sharedPresets,
      ],
    },
  },
}
