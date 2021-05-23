import { GatsbyNode } from 'gatsby'

import createHooks from './createPages/createHooks'
import createStaticPages from './createPages/createStaticPage'

export const createPages: GatsbyNode['createPages'] = async args => {
  await Promise.all([createStaticPages(args), createHooks(args)])
}
