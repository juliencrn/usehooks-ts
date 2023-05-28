import { ReactNode } from 'react'

import TopLayout from '~/components/layout/layout'

const wrapPageElement = ({ element }: { element: ReactNode }) => (
  <TopLayout>{element}</TopLayout>
)

export default wrapPageElement
