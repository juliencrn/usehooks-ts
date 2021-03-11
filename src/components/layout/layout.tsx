import React, { FC, useEffect, useState } from 'react'
import {
  makeStyles,
  ThemeProvider,
  Theme,
  useTheme as useMuiTheme,
} from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

import { useSiteMetadata } from '~/hooks'
import themes from '~/theme'

import BackToTop from '../backToTop'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'
import useTheme from './useTheme'

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
  const { breakpoints } = useMuiTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [openSidebar, setOpenSidebar] = useState(false)
  const [theme] = useTheme()

  const handleCloseSidebar = () => {
    if (isMobile) {
      setOpenSidebar(false)
    }
  }

  const handleOpenSidebar = () => setOpenSidebar(true)

  useEffect(() => {
    // Hide sidebar by default on small screen
    if (isMobile && openSidebar) {
      handleCloseSidebar()
    }

    // Show sidebar by default on large screen
    if (!isMobile && !openSidebar) {
      handleOpenSidebar()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <div className={classes.root}>
        <Header siteTitle={title} onOpenSidebar={handleOpenSidebar} />

        <Sidebar open={openSidebar} onClose={handleCloseSidebar} />

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
