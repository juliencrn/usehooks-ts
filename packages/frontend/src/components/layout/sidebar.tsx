import React, { useRef } from 'react'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Link as GatsbyLink } from 'gatsby'
import { useOnClickOutside } from 'usehooks-ts'

import useHookList from '~/hooks/useHookList'
import { filterHook, sortPosts } from '~/shared/filterHooks'
import { drawerWidth } from '~/theme'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
    // Like as boxShadow(1), but to the right instead bottom
    boxShadow: `
      2px 0px 1px -1px rgba(0,0,0,0.2),
      1px 0px 1px 0px rgba(0,0,0,0.14),
      1px 0px 3px 0px rgba(0,0,0,0.12)
    `,
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
  title: {
    margin: theme.spacing(3, 2, 0),
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
  const sortedPosts = sortPosts(extendedPosts)
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
          <Typography variant="h6" className={classes.title}>
            Summary
          </Typography>

          <List dense>
            {sortedPosts.map(({ post: { frontmatter, fields } }) => (
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
