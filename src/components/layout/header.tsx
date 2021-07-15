import React from 'react'

import { useMediaQuery } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import {
  makeStyles,
  Theme as MuiTheme,
  useTheme as useMuiTheme,
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import GitHubIcon from '@material-ui/icons/GitHub'
import MenuIcon from '@material-ui/icons/Menu'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { Link as GatsbyLink } from 'gatsby'

import Search from '../search'
import { useDarkMode, useSiteMetadata } from '~/hooks'

const useStyles = makeStyles((theme: MuiTheme) => ({
  appBar: {
    background:
      theme.palette.type === 'light'
        ? theme.gradient.primary
        : theme.palette.background.paper,
    color: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {},
  title: {
    flexGrow: 1,
    fontFamily: 'Fira Code, monospace',
  },
  link: {
    textDecoration: 'none',
  },
}))

export interface HeaderProps {
  siteTitle?: string
  onOpenSidebar: () => void
}

function Header({ siteTitle, onOpenSidebar }: HeaderProps) {
  const classes = useStyles()
  const { author } = useSiteMetadata()
  const { breakpoints } = useMuiTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const { isDarkMode, toggle } = useDarkMode()

  return (
    <AppBar component="header" position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {isMobile && (
          <IconButton
            aria-label="Open menu"
            onClick={onOpenSidebar}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" className={classes.title}>
          <Link
            to="/"
            component={GatsbyLink}
            color="inherit"
            className={classes.link}
          >
            {siteTitle}
          </Link>
        </Typography>

        <Hidden xsDown>
          <Box mx={2}>
            <Search />
          </Box>
        </Hidden>

        <IconButton aria-label="Switch theme" color="inherit" onClick={toggle}>
          {isDarkMode ? <WbSunnyIcon /> : <Brightness3Icon />}
        </IconButton>

        <Hidden xsDown>
          <IconButton
            aria-label="Github"
            color="inherit"
            href={`https://github.com/${author}/useHooks.ts`}
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="RSS"
            color="inherit"
            href="/rss.xml"
            target="_blank"
          >
            <RssFeedIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default Header
