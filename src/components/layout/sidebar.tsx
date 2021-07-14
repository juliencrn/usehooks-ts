import React, { useRef } from 'react'

import { useMediaQuery } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Link as GatsbyLink } from 'gatsby'

import { useOnClickOutside } from '~/hooks'
import useHookList from '~/hooks/privateHooks/useHookList'
import { filterHook } from '~/shared/filterHooks'
import { drawerWidth } from '~/theme'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  canScroll: {
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
  const { breakpoints, transitions } = useTheme()
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
        transitionDuration={transitions.duration.enteringScreen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <div className={classes.canScroll}>
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
