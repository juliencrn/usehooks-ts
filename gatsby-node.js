/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

require('source-map-support').install()
require('ts-node').register()

// typescript files
exports.createPages = require('./src/gatsby/createPages').createPages
exports.onCreateNode = require('./src/gatsby/onCreateNode').onCreateNode
