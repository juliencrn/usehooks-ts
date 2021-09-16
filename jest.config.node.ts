import type { Config } from '@jest/types'

import base from './jest.config.base'

const config: Config.InitialOptions = {
  ...base,
  testEnvironment: 'node',
}

export default config
