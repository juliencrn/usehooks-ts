import React, { FC } from 'react'
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  Theme,
} from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { RootState } from '~/redux/store'
import { useSiteMetadata } from '~/hooks'
import themes from '~/theme'

import BackToTop from '../backToTop'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'

import './style.css'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  topGutter: {
    ...theme.mixins.toolbar,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: '100%',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    '& #gatsby-focus-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
  },
}))

const Layout: FC = ({ children }) => {
  const classes = useStyles()
  const { title } = useSiteMetadata()
  const { breakpoints } = useTheme()
  const matches = useMediaQuery(breakpoints.up('md'))
  const { theme } = useSelector((state: RootState) => state.app)

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <div className={classes.root}>
        <Header siteTitle={title} matches={matches} />

        <Sidebar matches={matches} />

        <main className={classes.main}>
          <div className={classes.topGutter} />
          <div className={classes.content}>{children}</div>
          <Footer />
        </main>

        <BackToTop />
      </div>
    </ThemeProvider>
  )
}

export default Layout
