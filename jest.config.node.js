const base = require(`./jest.config.base`)

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...base,
  testEnvironment: 'node',
}
