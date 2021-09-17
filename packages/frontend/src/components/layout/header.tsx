import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import GitHubIcon from '@material-ui/icons/GitHub'
import MenuIcon from '@material-ui/icons/Menu'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { Link as GatsbyLink } from 'gatsby'
import { useDarkMode } from 'usehooks-ts'

import CopyButton from '../CopyButton'
import Search from '../search'
import useSiteMetadata from '~/hooks/useSiteMetadata'

const useStyles = makeStyles(theme => ({
  appBar: {
    background: theme.palette.background.paper,
    color:
      theme.palette.type === 'light'
        ? theme.palette.common.black
        : theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    borderWidth: '10px 0 0',
    borderTopStyle: 'solid',
    borderImage:
      'linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3;',
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Fira Code, monospace',
  },
  npm: {
    padding: theme.spacing(0, 1),
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
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const { isDarkMode, toggle } = useDarkMode()
  const npmCmd = 'npm i usehooks-ts'

  return (
    <AppBar component="header" position="fixed" className={classes.appBar}>
      <Toolbar>
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

        <Hidden smDown>
          <Typography variant="body2" component="div" className={classes.npm}>
            <Hidden mdDown>
              <Link
                href="https://www.npmjs.com/package/usehooks-ts"
                color="inherit"
                className={classes.link}
              >
                {`Now available on npmjs.com`}
              </Link>
              <span>{` --> `}</span>
            </Hidden>
            <span>{npmCmd}</span>
            <span>{` `}</span>
          </Typography>
          <CopyButton value={npmCmd} hideText />
        </Hidden>

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
