import React, { useLayoutEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link as GatsbyLink } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'

import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import usePostList from '../hooks/usePostList'
import { openDrawer, closeDrawer } from '../redux/appModule'
import { RootState } from '../redux/store'

const drawerWidth = 260

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  scrollable: {
    overflow: 'auto',
  },
  textMono: {
    fontFamily: 'Fira Code, monospace',
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}))

export interface SidebarProps {
  matches: boolean
}

function Sidebar({ matches }: SidebarProps) {
  const classes = useStyles()
  const posts = usePostList()
  const { drawerOpen } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeDrawer())
  }
  const handleOpen = () => {
    dispatch(openDrawer())
  }

  // Close menu on link click if we are on mobile
  const onClickLink = () => {
    if (!matches) handleClose()
  }

  // On window width change "drawerOpen" if necessary
  useLayoutEffect(() => {
    if (matches && !drawerOpen) handleOpen()
    if (!matches && drawerOpen) handleClose()
  }, [matches])

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant={matches ? 'persistent' : 'temporary'}
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <div className={classes.scrollable}>
          <Divider />
          <List>
            <ListItem
              button
              to="/about"
              component={GatsbyLink}
              onClick={onClickLink}
              activeClassName={classes.active}
            >
              <ListItemText primary="About" />
            </ListItem>
          </List>
          <Divider />

          <Divider />
          <List>
            {posts.map(({ frontmatter }) => (
              <ListItem
                button
                to={frontmatter.path}
                key={frontmatter.path}
                component={GatsbyLink}
                onClick={onClickLink}
                activeClassName={classes.active}
              >
                <ListItemText
                  primaryTypographyProps={{ className: classes.textMono }}
                  primary={`${frontmatter.title}()`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default Sidebar
