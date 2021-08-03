import React from 'react'

import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { reduceLayoutWidth } from './styleUtils'
import { useSiteMetadata } from '~/hooks'

interface PropTypes {
  isSidebarOpened: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 0),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,

    ...reduceLayoutWidth(theme),
  },
}))

function Footer(props: PropTypes) {
  const classes = useStyles(props)
  const { author } = useSiteMetadata()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary" align="center">
          Made with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by
          {` `}
          <Link
            href={`http://github.com/${author}`}
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            {author}
          </Link>
          <Hidden xsDown>
            , built using{' '}
            <Link
              href="https://www.typescriptlang.org"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Typescript
            </Link>{' '}
            and{' '}
            <Link
              href="https://www.gatsbyjs.org"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Gatsby
            </Link>{' '}
            and hosted on
            {` `}
            <Link
              href="https://www.netlify.com/"
              color="inherit"
              target="_blank"
              rel="noreferrer"
            >
              Netlify
            </Link>
          </Hidden>
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
