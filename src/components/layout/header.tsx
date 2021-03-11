import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import {
  makeStyles,
  Theme as MuiTheme,
  useTheme as useMuiTheme,
} from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

import WbSunnyIcon from '@material-ui/icons/WbSunny'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import GitHubIcon from '@material-ui/icons/GitHub'
import RssFeedIcon from '@material-ui/icons/RssFeed'

import { useSiteMetadata } from '~/hooks'

import Search from '../search'
import useTheme from './useTheme'

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
  const [theme, toggleTheme] = useTheme()

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

        <IconButton
          aria-label="Switch theme"
          color="inherit"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Brightness3Icon /> : <WbSunnyIcon />}
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
