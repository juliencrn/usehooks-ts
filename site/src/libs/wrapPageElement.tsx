import React, { ReactNode } from 'react'

import TopLayout from '~/components/layout/layout'

const wrapPageElement = ({ element }: { element: ReactNode }) => {
  return <TopLayout>{element}</TopLayout>
}

export default wrapPageElement
