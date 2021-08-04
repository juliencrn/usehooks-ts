import { CSSProperties } from 'react'

import { Theme } from '@material-ui/core/styles'

import { drawerWidth } from '~/theme'

interface StyleProps {
  isSidebarOpened: boolean
}

// The useStyles where will placed the following function ...
// ... will needs to have StyleProps
export function reduceLayoutWidth(theme: Theme): CSSProperties {
  return {
    transition: theme.transitions.create(['padding'], {
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: (props: StyleProps) =>
        props.isSidebarOpened ? drawerWidth : 0,
    },
  }
}
