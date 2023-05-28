/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { GatsbyNode } from 'gatsby'

export { createPages } from './src/gatsby/createPages'
export { onCreateNode } from './src/gatsby/onCreateNode'

// importing React in now not required since React 17 and Gatsby 2.28.1,
// but the ecosystem of plugins doesn't support it all yet
export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions,
}) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}
