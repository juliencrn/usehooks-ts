import React from 'react'
import Headroom from 'react-headroom'
import { Link as GatsbyLink } from 'gatsby'

import { makeStyles, Theme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'

import WbSunnyIcon from '@material-ui/icons/WbSunny'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import GitHubIcon from '@material-ui/icons/GitHub'
import InfoIcon from '@material-ui/icons/Info'
import RssFeedIcon from '@material-ui/icons/RssFeed'

import useSiteMetadata from '../hooks/useSiteMetadata'
import Search from '../components/search'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background:
      theme.palette.type === 'light'
        ? theme.gradient.primary
        : theme.palette.background.paper,
    color: theme.palette.common.white,
  },
  toolbar: {},
  title: {
    flexGrow: 1,
    fontFamily: 'Fira Code',
  },
  link: {
    textDecoration: 'none',
  },
}))

export interface HeaderProps {
  siteTitle?: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

function Header({ siteTitle = '', onToggleTheme, theme }: HeaderProps) {
  const classes = useStyles()
  const { social } = useSiteMetadata()

  return (
    <Headroom>
      <AppBar component="header" position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
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

          <IconButton component={GatsbyLink} to="/about" color="inherit">
            <InfoIcon />
          </IconButton>
          <IconButton color="inherit" onClick={onToggleTheme}>
            {theme === 'light' ? <Brightness3Icon /> : <WbSunnyIcon />}
          </IconButton>

          <Hidden xsDown>
            <IconButton color="inherit" href={social.github} target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" href="/rss.xml" target="_blank">
              <RssFeedIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Headroom>
  )
}

export default Header
