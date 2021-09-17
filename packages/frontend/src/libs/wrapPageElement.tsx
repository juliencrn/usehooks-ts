import React, { ReactNode } from 'react'

import Layout from '../components/layout'

const wrapPageElement = ({ element }: { element: ReactNode }) => {
  return <Layout>{element}</Layout>
}

export default wrapPageElement
