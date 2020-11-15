import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles, Theme } from '@material-ui/core/styles'

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

import { useSiteMetadata } from '../../hooks'
import Search from '../search'
import { openDrawer, toggleTheme } from '../../redux/appModule'
import { RootState } from '../../redux/store'

const useStyles = makeStyles((theme: Theme) => ({
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
  matches: boolean
}

function Header({ siteTitle = '', matches }: HeaderProps) {
  const classes = useStyles()
  const { author } = useSiteMetadata()
  const dispatch = useDispatch()
  const { theme } = useSelector((state: RootState) => state.app)

  const handleOpenDrawer = () => {
    dispatch(openDrawer())
  }

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <AppBar component="header" position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {!matches && (
          <IconButton
            aria-label="Open menu"
            onClick={handleOpenDrawer}
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
            {/* <Search /> */}
          </Box>
        </Hidden>

        <IconButton
          aria-label="Switch theme"
          color="inherit"
          onClick={handleToggleTheme}
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
