import React, { useRef } from 'react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { styled } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Link as GatsbyLink } from 'gatsby'
import { useOnClickOutside } from 'usehooks-ts'

import useHookList from '~/hooks/useHookList'
import { filterHook, sortPosts } from '~/shared/filterHooks'
import { drawerWidth } from '~/theme'

const PREFIX = 'Sidebar'

const classes = {
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  canScroll: `${PREFIX}-canScroll`,
  title: `${PREFIX}-title`,
  textMono: `${PREFIX}-textMono`,
  active: `${PREFIX}-active`,
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  // zIndex: isTablet ? 1250 : 1200,
  zIndex: 1300,

  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
    border: 'none',
    // Like as boxShadow(1), but to the right instead bottom
    boxShadow: `
      2px 0px 1px -1px rgba(0,0,0,0.2),
      1px 0px 1px 0px rgba(0,0,0,0.14),
      1px 0px 3px 0px rgba(0,0,0,0.12)
    `,
    backgroundImage: 'none',
  },

  [`& .${classes.drawerHeader}`]: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  [`& .${classes.canScroll}`]: {
    overflow: 'auto',
  },

  [`& .${classes.title}`]: {
    margin: theme.spacing(3, 2, 0),
  },

  [`& .${classes.textMono}`]: {
    fontFamily: 'Fira Code, monospace',
  },

  [`& .${classes.active}`]: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}))

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function Sidebar({ open, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const { posts, hooks, demos } = useHookList()
  const extendedPosts = filterHook(posts.nodes, hooks.nodes, demos.nodes)
  const sortedPosts = sortPosts(extendedPosts)
  const { breakpoints, transitions } = useTheme()
  const isTablet = useMediaQuery(breakpoints.down('lg'))

  useOnClickOutside(sidebarRef, () => {
    if (isTablet) onClose()
  })

  return (
    <StyledDrawer
      PaperProps={{ ref: sidebarRef }}
      variant={isTablet ? 'temporary' : 'persistent'}
      style={{ zIndex: isTablet ? 1250 : 1200 }}
      open={open}
      transitionDuration={transitions.duration.enteringScreen}
      classes={{
        root: classes.drawer,
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
    </StyledDrawer>
  )
}

export default Sidebar
