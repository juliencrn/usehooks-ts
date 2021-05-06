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
import { reduceLayoutWidth } from './styleUtils'
import Thanks from './thanks'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& #gatsby-focus-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },

    ...reduceLayoutWidth(theme),

    '&::before': {
      content: '""',
      display: 'block',
      ...theme.mixins.toolbar,
    },
  },
}))

const Layout: FC = ({ children }) => {
  const { title } = useSiteMetadata()
  const { breakpoints } = useMuiTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [isSidebarOpened, setOpenSidebar] = useState(false)
  const classes = useStyles({ isSidebarOpened })
  const [theme] = useTheme()

  const handleCloseSidebar = () => {
    if (isMobile) {
      setOpenSidebar(false)
    }
  }

  const handleOpenSidebar = () => setOpenSidebar(true)

  useEffect(() => {
    // Hide sidebar by default on small screen
    if (isMobile && isSidebarOpened) {
      handleCloseSidebar()
    }

    // Show sidebar by default on large screen
    if (!isMobile && !isSidebarOpened) {
      handleOpenSidebar()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <div className={classes.root}>
        <Thanks isSidebarOpened={isSidebarOpened} />

        <Header siteTitle={title} onOpenSidebar={handleOpenSidebar} />

        <Sidebar open={isSidebarOpened} onClose={handleCloseSidebar} />

        <main className={classes.main}>{children}</main>

        <Footer isSidebarOpened={isSidebarOpened} />

        <BackToTop />
      </div>
    </ThemeProvider>
  )
}

export default Layout
