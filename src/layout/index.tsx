import React, { FC } from 'react'
import { makeStyles, ThemeProvider, Theme } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Header from './header'
import Footer from './footer'
import themes from '../theme'
import useSiteMetadata from '../hooks/useSiteMetadata'
import useLocalStorage from '../hooks/useLocalStorage'
import BackToTop from '../components/backToTop'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}))

type ThemeMode = 'light' | 'dark'

const Layout: FC<{ container?: boolean }> = ({
  children,
  container = false,
}) => {
  const classes = useStyles()
  const { title } = useSiteMetadata()
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={themes[theme as ThemeMode]}>
      <CssBaseline />
      <div className={classes.root}>
        <Header siteTitle={title} onToggleTheme={toggleTheme} theme={theme} />
        {container ? (
          <Container component="main" maxWidth="md" className={classes.main}>
            {children}
          </Container>
        ) : (
          <main>{children}</main>
        )}
        <Footer />

        <BackToTop />
      </div>
    </ThemeProvider>
  )
}

export default Layout
