import React, { FC, useEffect, useState } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import BackToTop from '../backToTop'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'
import { reduceLayoutWidth } from './styleUtils'
import Thanks from './thanks'
import { useDarkMode, useSiteMetadata } from '~/hooks'
import themes from '~/theme'

const useStyles = makeStyles(theme => ({
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
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [isSidebarOpened, setOpenSidebar] = useState(false)
  const classes = useStyles({ isSidebarOpened })
  const { isDarkMode } = useDarkMode(true)
  const theme = themes[isDarkMode ? 'dark' : 'light']

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        {/* <Thanks isSidebarOpened={isSidebarOpened} /> */}

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
