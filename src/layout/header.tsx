import { Link as GatsbyLink } from 'gatsby'
import React, { FC } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Headroom from 'react-headroom'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.background.paper,
    color: theme.palette.common.white,
  },
  toolbar: {},
  title: {
    flexGrow: 1,
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

const Header: FC<HeaderProps> = ({ siteTitle = '', onToggleTheme }) => {
  const classes = useStyles()

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
          <Button color="inherit" onClick={onToggleTheme}>
            Toggle Theme
          </Button>
        </Toolbar>
      </AppBar>
    </Headroom>
  )
}

export default Header
