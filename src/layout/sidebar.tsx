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

import { RootState } from '../redux/store'
import { openDrawer, closeDrawer } from '../redux/appModule'
import { filterHook } from '../shared/filterHooks'
import useHookList from '../hooks/privateHooks/useHookList'

const drawerWidth = 280

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
  const { posts, hooks, demos } = useHookList()
  const extendedPosts = filterHook(posts.nodes, hooks.nodes, demos.nodes)
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
            {extendedPosts.map(({ post: { frontmatter, fields } }) => (
              <ListItem
                button
                to={`/react-hook${fields.path}`}
                key={fields.path}
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
