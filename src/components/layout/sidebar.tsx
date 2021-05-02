import React, { useRef } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Link as GatsbyLink } from 'gatsby'

import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { useMediaQuery } from '@material-ui/core'

import { filterHook } from '~/shared/filterHooks'
import useHookList from '~/hooks/privateHooks/useHookList'
import { useOnClickOutside } from '~/hooks'
import { drawerWidth } from '~/theme'

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

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function Sidebar({ open, onClose }: SidebarProps) {
  const classes = useStyles()
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const { posts, hooks, demos } = useHookList()
  const extendedPosts = filterHook(posts.nodes, hooks.nodes, demos.nodes)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  useOnClickOutside(sidebarRef, () => {
    if (isMobile) onClose()
  })

  return (
    <>
      <Drawer
        PaperProps={{ ref: sidebarRef, component: 'aside' }}
        className={classes.drawer}
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onClose}>
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
              onClick={onClose}
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
                onClick={onClose}
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
