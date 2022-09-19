import type { Config } from 'jest'

const ignoreDirs = [
  'dist/',
  'node_modules/',
  'scripts/',
  'generated/',
  'website/',
  'tests/',
  'packages/',
]

export default async (): Promise<Config> => ({
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: false,
  silent: true,
  roots: ['./src'],
  transform: {
    '^.+\\.[t]sx?$': `ts-jest`,
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ignoreDirs,
  coveragePathIgnorePatterns: ignoreDirs,
  coverageDirectory: '<rootDir>/coverage/',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([t]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
})
