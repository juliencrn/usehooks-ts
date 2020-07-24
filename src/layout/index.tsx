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

import Header from './header'
import Footer from './footer'
import themes from '../theme'
import useSiteMetadata from '../hooks/useSiteMetadata'
import BackToTop from '../components/backToTop'
import Sidebar from './sidebar'
import { RootState } from '../redux/store'

import './style.css'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
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
    marginBottom: theme.spacing(2),
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
