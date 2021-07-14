import { GatsbyNode } from 'gatsby'

import createHooks from './createPages/createHooks'

export const createPages: GatsbyNode['createPages'] = async args => {
  await Promise.all([createHooks(args)])
}
