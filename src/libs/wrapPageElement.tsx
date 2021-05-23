import React, { ReactNode } from 'react'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import Layout from '../components/layout'
import themes from '../theme'

const wrapPageElement = ({ element }: { element: ReactNode }) => {
  return (
    <ThemeProvider theme={themes['light']}>
      <CssBaseline />
      <Layout>{element}</Layout>
    </ThemeProvider>
  )
}

export default wrapPageElement
