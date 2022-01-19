import React from 'react'

import GitHubIcon from '@mui/icons-material/GitHub'
import MenuIcon from '@mui/icons-material/Menu'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import Hidden from '@mui/material/Hidden'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import useTheme from '@mui/material/styles/useTheme'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Link as GatsbyLink } from 'gatsby'

import useSiteMetadata from '~/hooks/useSiteMetadata'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  color:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.common.white,
  zIndex: theme.zIndex.drawer + 1,
  borderWidth: '10px 0 0',
  borderTopStyle: 'solid',
  borderImage: 'linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3;',

  [`& a`]: {
    textDecoration: 'none',
  },
}))

const Title = styled(Typography)(() => ({
  flexGrow: 1,
  fontFamily: 'Fira Code, monospace',
}))

const TextNpm = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  fontFamily: 'Fira Code, monospace',
}))

export interface HeaderProps {
  siteTitle?: string
  openSidebar: () => void
  openSearch: () => void
}

function Header({ siteTitle, openSidebar, openSearch }: HeaderProps) {
  const { author } = useSiteMetadata()
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('lg'))

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobile && (
          <IconButton
            aria-label="Open menu"
            onClick={openSidebar}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Title variant="h6">
          <Link component={GatsbyLink} to="/" color="inherit">
            {siteTitle}
          </Link>
        </Title>

        <Hidden mdDown>
          <TextNpm variant="body2" as="div" sx={{ mr: 2 }}>
            <Link
              href="https://www.npmjs.com/package/usehooks-ts"
              color="inherit"
              underline="hover"
            >
              {`Now available on npmjs.com`}
            </Link>
          </TextNpm>
        </Hidden>

        <IconButton aria-label="Search" color="inherit" onClick={openSearch}>
          <SearchIcon />
        </IconButton>

        <Hidden xsDown>
          <IconButton
            aria-label="Github"
            color="inherit"
            href={`https://github.com/${author}/usehooks-ts`}
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
