import React, { ReactNode } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Theme, CssBaseline } from '@material-ui/core'
import { Provider } from 'react-redux'

import themes from '../theme'
import Layout from '../layout'
import store from '../redux/store'

function useGetTheme(theme: 'light' | 'dark'): Theme {
  const isServer = typeof window === 'undefined'
  if (!isServer) {
    try {
      const json = window.localStorage.getItem('theme')
      const item = json ? JSON.parse(json) : theme
      if (['light', 'dark'].includes(item)) {
        theme = item
      }
    } catch (error) {
      console.log(error)
    }
  }
  return themes[theme]
}

const wrapRootElement = ({ element }: { element: ReactNode }) => {
  const currentTheme = useGetTheme('light')

  return (
    <Provider store={store}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Layout>{element}</Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default wrapRootElement
