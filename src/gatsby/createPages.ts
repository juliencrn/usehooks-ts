import { GatsbyNode } from 'gatsby'

import createStaticPages from './createPages/createStaticPage'
import createHooks from './createPages/createHooks'

export const createPages: GatsbyNode['createPages'] = async args =>
  Promise.all([createStaticPages(args), createHooks(args)])
