import React, { ReactNode } from 'react'

import TopLayout from '~/components/layout/layout'
import themes from '~/theme'

const wrapPageElement = ({ element }: { element: ReactNode }) => {
  return <TopLayout themes={themes}>{element}</TopLayout>
}

export default wrapPageElement
