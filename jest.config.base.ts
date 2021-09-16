import { Config } from '@jest/types'
import glob from 'glob'

const packages = glob
  .sync(`./packages/*`)
  .map(p => p.replace(/^\./, `<rootDir>`))

const ignoreDirs = [
  'build/',
  'dist/',
  'node_modules/',
  `\\.cache`,
  'scripts/',
  'public/',
  'generators/',
  'generated/',
]

const config: Config.InitialOptions = {
  roots: packages,
  transform: {
    '^.+\\.[jt]sx?$': `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: ignoreDirs,
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  coveragePathIgnorePatterns: ignoreDirs,
  coverageDirectory: '<rootDir>/coverage/',
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

export default config
